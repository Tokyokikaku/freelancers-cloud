import type { FeeType, Service } from "./types";

export const UNKNOWN_TEXT = "要問い合わせ";

export function feeLabel(type: FeeType, detail: string | null): string {
  if (type === "free") return "0円";
  if (type === "paid") return detail?.trim() || "有料（公式サイトをご確認ください）";
  return UNKNOWN_TEXT;
}

export const initialFeeLabel = (s: Service) => feeLabel(s.initial_fee_type, s.initial_fee);
export const monthlyFeeLabel = (s: Service) => feeLabel(s.monthly_fee_type, s.monthly_fee);
export const successFeeLabel = (s: Service) => s.success_fee?.trim() || UNKNOWN_TEXT;
export const successConditionLabel = (s: Service) => s.success_condition?.trim() || UNKNOWN_TEXT;

/** YYYY/MM/DD（日本時間） */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value.length === 10 ? `${value}T00:00:00+09:00` : value);
  if (Number.isNaN(d.getTime())) return "";
  const p = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => p.find((x) => x.type === t)?.value ?? "";
  return `${get("year")}/${get("month")}/${get("day")}`;
}

/** 情報更新日: 最終確認日があればそれ、なければ更新日 */
export const infoUpdatedAt = (s: Service) => formatDate(s.last_verified_at ?? s.updated_at);

export const formatNumber = (n: number) => new Intl.NumberFormat("ja-JP").format(n);
export const formatPercent = (ratio: number, digits = 1) =>
  `${(ratio * 100).toFixed(digits).replace(/\.0+$/, "")}%`;

export function initialOf(name: string): string {
  return Array.from(name.trim())[0] ?? "?";
}
