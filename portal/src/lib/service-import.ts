import { z } from "zod";
import type { Category } from "./types";

/** CSV の列（管理画面のエクスポート・テンプレートと同じ並び） */
export const CSV_COLUMNS = [
  "slug", "name", "company_name", "website_url", "summary", "description",
  "initial_fee_type", "initial_fee", "monthly_fee_type", "monthly_fee", "success_fee", "pricing_note",
  "success_condition", "outcome_type", "is_full_success_fee", "has_free_consultation", "target_companies",
  "features", "categories", "source_url", "last_verified_at",
] as const;

/** RFC 4180 準拠の簡易 CSV パーサ（引用符・改行・"" エスケープに対応。BOM は除去） */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^﻿/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((v) => v !== "")) rows.push(row);
  return rows;
}

const httpUrl = z.string().trim().max(500).regex(/^https?:\/\//i, "http(s):// で始まるURLにしてください");
const optText = z.string().trim().max(5000).transform((v) => v || null);
const bool = z.string().trim().transform((v) => /^(true|1|yes|はい|○)$/i.test(v));
const feeType = z.enum(["free", "paid", "unknown"]);

const rowSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug は半角英小文字・数字・ハイフンのみ"),
  name: z.string().trim().min(1, "name が空です").max(200),
  company_name: z.string().trim().min(1, "company_name が空です").max(200),
  website_url: httpUrl,
  summary: optText,
  description: optText,
  initial_fee_type: feeType,
  initial_fee: optText,
  monthly_fee_type: feeType,
  monthly_fee: optText,
  success_fee: optText,
  pricing_note: optText,
  success_condition: optText,
  outcome_type: z.enum(["appointment", "meeting", "contract", "hire", "lead", "sale", "click", "matching", "other"]),
  is_full_success_fee: bool,
  has_free_consultation: bool,
  target_companies: optText,
  features: z.string().transform((v) => v.split("|").map((x) => x.trim()).filter(Boolean).slice(0, 8)),
  categories: z.string().transform((v) => v.split("|").map((x) => x.trim()).filter(Boolean)),
  source_url: z.string().trim().max(500).refine((v) => !v || /^https?:\/\//i.test(v), "source_url は http(s):// で始まるURL").transform((v) => v || null),
  last_verified_at: z.string().trim().regex(/^(\d{4}-\d{2}-\d{2})?$/, "last_verified_at は YYYY-MM-DD").transform((v) => v || null),
});

export type ImportRow = z.output<typeof rowSchema>;
export interface ImportResult {
  rows: ImportRow[];
  errors: { line: number; slug: string; messages: string[] }[];
}

/** CSV → 検証済みの行。カテゴリは slug で突き合わせ、存在しないものはエラーにする */
export function validateCsv(text: string, categories: Pick<Category, "slug">[]): ImportResult | { fatal: string } {
  const table = parseCsv(text);
  if (table.length < 2) return { fatal: "ヘッダー行とデータ行が必要です" };
  const header = table[0].map((h) => h.trim());
  const missing = ["slug", "name", "company_name", "website_url"].filter((c) => !header.includes(c));
  if (missing.length) return { fatal: `必須の列がありません: ${missing.join(", ")}` };
  if (table.length - 1 > 500) return { fatal: "一度に取り込めるのは500行までです" };

  const known = new Set(categories.map((c) => c.slug));
  const seen = new Set<string>();
  const rows: ImportRow[] = [];
  const errors: ImportResult["errors"] = [];
  table.slice(1).forEach((cells, i) => {
    const raw: Record<string, string> = {};
    for (const col of CSV_COLUMNS) {
      const idx = header.indexOf(col);
      raw[col] = idx >= 0 ? (cells[idx] ?? "") : "";
    }
    if (!raw.initial_fee_type) raw.initial_fee_type = "unknown";
    if (!raw.monthly_fee_type) raw.monthly_fee_type = "unknown";
    if (!raw.outcome_type) raw.outcome_type = "other";
    const parsed = rowSchema.safeParse(raw);
    const line = i + 2;
    const messages: string[] = [];
    if (!parsed.success) for (const issue of parsed.error.issues) messages.push(`${String(issue.path[0])}: ${issue.message}`);
    else {
      const r = parsed.data;
      if (seen.has(r.slug)) messages.push("slug: CSV内で重複しています");
      seen.add(r.slug);
      const unknownCats = r.categories.filter((c) => !known.has(c));
      if (unknownCats.length) messages.push(`categories: 未登録のカテゴリ ${unknownCats.join(", ")}`);
      if (r.categories.length === 0) messages.push("categories: 1つ以上指定してください");
      if (r.is_full_success_fee && !(r.initial_fee_type === "free" && r.monthly_fee_type === "free"))
        messages.push("is_full_success_fee: 完全成果報酬は初期費用・月額費用がともに free の場合のみ");
      if (!messages.length) rows.push(r);
    }
    if (messages.length) errors.push({ line, slug: raw.slug || "(slug なし)", messages });
  });
  return { rows, errors };
}
