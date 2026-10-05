"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { validateCsv, type ImportRow } from "@/lib/service-import";
import { DATA_TAG, serviceClient } from "@/lib/supabase";

export interface ImportState {
  stage?: "preview" | "done";
  csv?: string;
  fatal?: string;
  rows?: { slug: string; name: string; company_name: string; exists: boolean; locked: boolean }[];
  errors?: { line: number; slug: string; messages: string[] }[];
  inserted?: number;
  updated?: number;
  skipped?: number;
}

/** 取り込み: intent=preview で検証だけ、intent=commit で下書きとして保存。公開済み・確認済みの既存サービスは上書きしない。 */
export async function importServices(_prev: ImportState, fd: FormData): Promise<ImportState> {
  await requireAdmin();
  const db = serviceClient();
  const intent = String(fd.get("intent") ?? "preview");
  let text = String(fd.get("csv") ?? "");
  const file = fd.get("file");
  if (file instanceof File && file.size > 0) text = await file.text();
  if (!text.trim()) return { fatal: "CSVファイルを選ぶか、内容を貼り付けてください" };
  if (text.length > 2_000_000) return { fatal: "CSVが大きすぎます（2MBまで）" };

  const { data: cats } = await db.from("categories").select("id, slug");
  const result = validateCsv(text, cats ?? []);
  if ("fatal" in result) return { fatal: result.fatal };

  const { data: existing } = await db.from("services").select("id, slug, review_status, published").in("slug", result.rows.map((r) => r.slug));
  const bySlug = new Map((existing ?? []).map((e) => [e.slug as string, e]));
  // 確認済み/公開中のデータを誤って CSV で上書きしない（編集は個別画面から）
  const isLocked = (slug: string) => {
    const e = bySlug.get(slug);
    return !!e && (e.review_status === "verified" || e.published);
  };

  if (intent !== "commit") {
    return {
      stage: "preview",
      csv: text,
      errors: result.errors,
      rows: result.rows.map((r) => ({ slug: r.slug, name: r.name, company_name: r.company_name, exists: bySlug.has(r.slug), locked: isLocked(r.slug) })),
    };
  }

  const catId = new Map((cats ?? []).map((c) => [c.slug as string, c.id as string]));
  let inserted = 0, updated = 0, skipped = result.errors.length;
  for (const r of result.rows as ImportRow[]) {
    if (isLocked(r.slug)) { skipped++; continue; }
    const row = {
      slug: r.slug, name: r.name, company_name: r.company_name, website_url: r.website_url,
      summary: r.summary, description: r.description,
      initial_fee_type: r.initial_fee_type, initial_fee: r.initial_fee, monthly_fee_type: r.monthly_fee_type, monthly_fee: r.monthly_fee,
      success_fee: r.success_fee, pricing_note: r.pricing_note, success_condition: r.success_condition,
      outcome_type: r.outcome_type, is_full_success_fee: r.is_full_success_fee, has_free_consultation: r.has_free_consultation,
      target_companies: r.target_companies, features: r.features, source_url: r.source_url, last_verified_at: r.last_verified_at,
      published: false, review_status: "draft",
    };
    const existingRow = bySlug.get(r.slug);
    const res = existingRow
      ? await db.from("services").update(row).eq("id", existingRow.id).select("id").single()
      : await db.from("services").insert(row).select("id").single();
    if (res.error || !res.data) { skipped++; continue; }
    const id = res.data.id as string;
    await db.from("service_categories").delete().eq("service_id", id);
    await db.from("service_categories").insert(r.categories.map((c, i) => ({ service_id: id, category_id: catId.get(c)!, is_primary: i === 0 })));
    existingRow ? updated++ : inserted++;
  }
  updateTag(DATA_TAG);
  revalidatePath("/admin/services");
  return { stage: "done", inserted, updated, skipped, errors: result.errors };
}
