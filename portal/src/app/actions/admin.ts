"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { DATA_TAG, serviceClient } from "@/lib/supabase";

export interface FormState {
  ok?: boolean;
  errors?: Record<string, string>;
  message?: string;
}

function refresh() {
  updateTag(DATA_TAG); // 公開サイトのデータキャッシュを即時破棄
  revalidatePath("/", "layout");
}

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const slugField = z.string().trim().regex(SLUG, "半角英小文字・数字・ハイフンのみ（例: sales-outsourcing）");
const httpUrl = (label: string) =>
  z
    .string()
    .trim()
    .max(500)
    .refine((v) => !v || /^https?:\/\//i.test(v), `${label}は http:// または https:// で始まるURLを入力してください`);
const optional = z.string().trim().max(5000).optional();

const get = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : "";
};
const bool = (fd: FormData, k: string) => fd.get(k) === "on";
const nul = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

function zodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of error.issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

// ───────────────────────── サービス ─────────────────────────
const serviceSchema = z.object({
  slug: slugField,
  name: z.string().trim().min(1, "サービス名を入力してください").max(200),
  company_name: z.string().trim().min(1, "会社名を入力してください").max(200),
  website_url: httpUrl("URL").pipe(z.string().min(1, "URLを入力してください")),
  logo_url: httpUrl("ロゴURL"),
  source_url: httpUrl("情報ソースURL"),
  summary: optional,
  description: optional,
  initial_fee_type: z.enum(["free", "paid", "unknown"]),
  initial_fee: optional,
  monthly_fee_type: z.enum(["free", "paid", "unknown"]),
  monthly_fee: optional,
  success_fee: optional,
  pricing_note: optional,
  success_condition: optional,
  outcome_type: z.enum(["appointment", "meeting", "contract", "hire", "lead", "sale", "click", "matching", "other"]),
  target_companies: optional,
  partner_status: z.enum(["unpartnered", "partner", "premium"]),
  review_status: z.enum(["draft", "needs_review", "verified"]),
  last_verified_at: z.string().regex(/^(\d{4}-\d{2}-\d{2})?$/, "日付の形式が正しくありません"),
  notify_email: z.string().trim().max(200).refine((v) => !v || z.string().email().safeParse(v).success, "メールアドレスの形式が正しくありません"),
  webhook_url: z.string().trim().max(500).refine((v) => !v || /^https:\/\//i.test(v), "Webhook URL は https:// で始まる必要があります"),
});

export async function saveService(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = get(fd, "id") || null;
  const parsed = serviceSchema.safeParse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string")));
  if (!parsed.success) return { errors: zodErrors(parsed.error), message: "入力内容を確認してください。" };
  const d = parsed.data;

  const features = get(fd, "features").split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 8);
  const categoryIds = fd.getAll("category_ids").filter((v): v is string => typeof v === "string");
  const requestedPrimary = get(fd, "primary_category_id");
  const primary = categoryIds.includes(requestedPrimary) ? requestedPrimary : categoryIds[0];

  // 完全成果報酬 = 固定費・月額費用がなく成果発生時のみ費用が発生。初期費用・月額が「0円」と確認できている場合のみ許可
  const wantsFull = bool(fd, "is_full_success_fee");
  if (wantsFull && !(d.initial_fee_type === "free" && d.monthly_fee_type === "free")) {
    return { errors: { is_full_success_fee: "完全成果報酬にするには、初期費用・月額費用をどちらも「0円」にしてください。" }, message: "入力内容を確認してください。" };
  }

  // 公開できるのは「確認済み」のみ（下書き・確認中の情報を誤って公開しない）
  if (bool(fd, "published") && d.review_status !== "verified") {
    return { errors: { review_status: "公開するには「確認済み」にしてください" }, message: "入力内容を確認してください。" };
  }

  const row = {
    slug: d.slug,
    name: d.name,
    company_name: d.company_name,
    review_status: d.review_status,
    summary: nul(d.summary),
    description: nul(d.description),
    logo_url: nul(d.logo_url),
    website_url: d.website_url,
    initial_fee_type: d.initial_fee_type,
    initial_fee: nul(d.initial_fee),
    monthly_fee_type: d.monthly_fee_type,
    monthly_fee: nul(d.monthly_fee),
    success_fee: nul(d.success_fee),
    pricing_note: nul(d.pricing_note),
    success_condition: nul(d.success_condition),
    outcome_type: d.outcome_type,
    is_full_success_fee: wantsFull,
    has_free_consultation: bool(fd, "has_free_consultation"),
    target_companies: nul(d.target_companies),
    features,
    partner_status: d.partner_status,
    featured: bool(fd, "featured"),
    show_in_popular: bool(fd, "show_in_popular"),
    published: bool(fd, "published"),
    source_url: nul(d.source_url),
    last_verified_at: d.last_verified_at || null,
  };

  const db = serviceClient();
  const res = id ? await db.from("services").update(row).eq("id", id).select("id").single() : await db.from("services").insert(row).select("id").single();
  if (res.error || !res.data) {
    const dup = res.error?.code === "23505";
    return { errors: dup ? { slug: "このスラッグは既に使われています" } : {}, message: dup ? "入力内容を確認してください。" : `保存に失敗しました: ${res.error?.message}` };
  }
  const serviceId = res.data.id as string;

  // カテゴリの付け替え
  await db.from("service_categories").delete().eq("service_id", serviceId);
  if (categoryIds.length) {
    const links = categoryIds.map((category_id) => ({ service_id: serviceId, category_id, is_primary: category_id === primary }));
    const { error } = await db.from("service_categories").insert(links);
    if (error) return { message: `カテゴリの保存に失敗しました: ${error.message}` };
  }

  // 提携後の通知先（公開されないテーブル）
  if (d.notify_email || d.webhook_url) {
    await db.from("partner_contacts").upsert({ service_id: serviceId, notify_email: nul(d.notify_email), webhook_url: nul(d.webhook_url), updated_at: new Date().toISOString() });
  } else {
    await db.from("partner_contacts").delete().eq("service_id", serviceId);
  }

  refresh();
  redirect("/admin/services?saved=1");
}

export async function deleteService(fd: FormData) {
  await requireAdmin();
  const id = get(fd, "id");
  if (id) await serviceClient().from("services").delete().eq("id", id);
  refresh();
  redirect("/admin/services?deleted=1");
}

const FLAGS = new Set(["published", "featured", "show_in_popular"]);
export async function toggleServiceFlag(fd: FormData) {
  await requireAdmin();
  const id = get(fd, "id");
  const field = get(fd, "field");
  if (!id || !FLAGS.has(field)) return;
  const db = serviceClient();
  const value = get(fd, "value") === "true";
  if (field === "published" && value) {
    const { data } = await db.from("services").select("review_status").eq("id", id).maybeSingle();
    if (data?.review_status !== "verified") return; // 確認済みでなければ公開しない
  }
  await db.from("services").update({ [field]: value }).eq("id", id);
  refresh();
  revalidatePath("/admin/services");
}

// ───────────────────────── カテゴリ ─────────────────────────
const categorySchema = z.object({
  slug: slugField,
  name: z.string().trim().min(1, "カテゴリ名を入力してください").max(100),
  icon: z.string().trim().max(40),
  description: optional,
  seo_title: z.string().trim().max(200).optional(),
  seo_description: z.string().trim().max(400).optional(),
  sort_order: z.coerce.number().int().min(-9999).max(9999),
});

export async function saveCategory(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = get(fd, "id") || null;
  const parsed = categorySchema.safeParse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string")));
  if (!parsed.success) return { errors: zodErrors(parsed.error), message: "入力内容を確認してください。" };
  const d = parsed.data;
  const db = serviceClient();

  const parentId = get(fd, "parent_id") || null;
  if (parentId && id) {
    // 自分自身・自分の子孫を親にするとループになる
    const { data: all } = await db.from("categories").select("id, parent_id");
    const parentOf = new Map((all ?? []).map((c) => [c.id as string, c.parent_id as string | null]));
    for (let cur: string | null = parentId, guard = 0; cur && guard < 20; cur = parentOf.get(cur) ?? null, guard++) {
      if (cur === id) return { errors: { parent_id: "自分自身または子カテゴリは親に指定できません" }, message: "入力内容を確認してください。" };
    }
  }

  const row = {
    slug: d.slug,
    name: d.name,
    parent_id: parentId,
    icon: nul(d.icon),
    description: nul(d.description),
    seo_title: nul(d.seo_title),
    seo_description: nul(d.seo_description),
    sort_order: d.sort_order,
    published: bool(fd, "published"),
  };
  const { error } = id ? await db.from("categories").update(row).eq("id", id) : await db.from("categories").insert(row);
  if (error) {
    const dup = error.code === "23505";
    return { errors: dup ? { slug: "このスラッグは既に使われています" } : {}, message: dup ? "入力内容を確認してください。" : `保存に失敗しました: ${error.message}` };
  }
  refresh();
  redirect("/admin/categories?saved=1");
}

export async function deleteCategory(fd: FormData) {
  await requireAdmin();
  const id = get(fd, "id");
  if (id) await serviceClient().from("categories").delete().eq("id", id);
  refresh();
  redirect("/admin/categories?deleted=1");
}

// ───────────────────────── 記事 ─────────────────────────
const articleSchema = z.object({
  slug: slugField,
  title: z.string().trim().min(1, "タイトルを入力してください").max(200),
  excerpt: z.string().trim().max(500).optional(),
  body: z.string().max(200000),
  seo_title: z.string().trim().max(200).optional(),
  seo_description: z.string().trim().max(400).optional(),
});

export async function saveArticle(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = get(fd, "id") || null;
  const parsed = articleSchema.safeParse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string")));
  if (!parsed.success) return { errors: zodErrors(parsed.error), message: "入力内容を確認してください。" };
  const d = parsed.data;
  const db = serviceClient();
  const published = bool(fd, "published");

  let publishedAt: string | null = null;
  if (published) {
    const existing = id ? (await db.from("articles").select("published_at").eq("id", id).maybeSingle()).data : null;
    publishedAt = (existing?.published_at as string | null) ?? new Date().toISOString();
  }
  const row = {
    slug: d.slug,
    title: d.title,
    excerpt: nul(d.excerpt),
    body: d.body,
    category_id: get(fd, "category_id") || null,
    seo_title: nul(d.seo_title),
    seo_description: nul(d.seo_description),
    published,
    published_at: publishedAt,
  };
  const res = id ? await db.from("articles").update(row).eq("id", id).select("id").single() : await db.from("articles").insert(row).select("id").single();
  if (res.error || !res.data) {
    const dup = res.error?.code === "23505";
    return { errors: dup ? { slug: "このスラッグは既に使われています" } : {}, message: dup ? "入力内容を確認してください。" : `保存に失敗しました: ${res.error?.message}` };
  }
  const articleId = res.data.id as string;
  await db.from("article_services").delete().eq("article_id", articleId);
  const serviceIds = fd.getAll("service_ids").filter((v): v is string => typeof v === "string");
  if (serviceIds.length) await db.from("article_services").insert(serviceIds.map((service_id, i) => ({ article_id: articleId, service_id, sort_order: i })));

  refresh();
  redirect("/admin/articles?saved=1");
}

export async function deleteArticle(fd: FormData) {
  await requireAdmin();
  const id = get(fd, "id");
  if (id) await serviceClient().from("articles").delete().eq("id", id);
  refresh();
  redirect("/admin/articles?deleted=1");
}

const STATUSES = new Set(["draft", "needs_review", "verified"]);
export async function setReviewStatus(fd: FormData) {
  await requireAdmin();
  const id = get(fd, "id");
  const status = get(fd, "status");
  if (!id || !STATUSES.has(status)) return;
  // 確認済みを外したら、公開も同時に止める
  await serviceClient().from("services").update(status === "verified" ? { review_status: status } : { review_status: status, published: false }).eq("id", id);
  refresh();
  revalidatePath("/admin/services");
}
