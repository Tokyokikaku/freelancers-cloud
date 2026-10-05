import type { PartnerStatus, Service } from "./types";

/**
 * 提携状態に応じた表示文言。
 * 未提携企業に「公式パートナー」等の表現を使わない（仕様 §19）ため、提携関連の文言はこのファイルに集約し、
 * scripts/check-banned-terms.mjs が他ファイルへの混入を検査する。
 */
export const isPartnered = (s: Pick<Service, "partner_status">) => s.partner_status !== "unpartnered";

export function documentCtaLabel(status: PartnerStatus): string {
  return status === "unpartnered" ? "資料請求（無料）" : "無料で資料請求";
}

export function partnerBadge(status: PartnerStatus): { label: string; title: string } | null {
  if (status === "partner") return { label: "掲載パートナー", title: "このサービス提供会社は成果報酬ナビと掲載契約を結んでいます" };
  if (status === "premium") return { label: "PR・優先掲載", title: "掲載契約に基づく優先掲載です（人気ランキングの順位には影響しません）" };
  return null;
}

export function leadDisclaimer(status: PartnerStatus): string {
  if (status === "unpartnered") {
    return "現在、本サービスは当サイト経由での直接の資料請求に対応していない場合があります。ご入力いただいた内容はサービス提供会社へは送信せず、当サイトのコンシェルジュが資料をご用意のうえ、ご入力のメールアドレス宛にご連絡します。";
  }
  return "入力いただいた内容は、資料のご案内のためサービス提供会社に提供されます。";
}
