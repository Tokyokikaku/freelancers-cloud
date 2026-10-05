import type { Service } from "@/lib/types";

/** 料金条件のタグ。確認できている条件だけを強調し、不明な項目はタグにしない */
export function FeeTags({ service, size = "sm" }: { service: Service; size?: "sm" | "md" }) {
  const cls = size === "md" ? "text-sm px-2.5 py-1" : "";
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="料金条件">
      {service.is_full_success_fee && (
        <li className={`tag bg-brand-700 text-white ${cls}`}>完全成果報酬</li>
      )}
      {service.initial_fee_type === "free" && (
        <li className={`tag bg-good-100 text-good-700 ${cls}`}>初期費用0円</li>
      )}
      {service.monthly_fee_type === "free" && (
        <li className={`tag bg-good-100 text-good-700 ${cls}`}>月額0円</li>
      )}
      {service.initial_fee_type === "paid" && (
        <li className={`tag bg-warn-50 text-warn-700 ${cls}`}>初期費用あり</li>
      )}
      {service.monthly_fee_type === "paid" && (
        <li className={`tag bg-warn-50 text-warn-700 ${cls}`}>月額費用あり</li>
      )}
      {service.has_free_consultation && (
        <li className={`tag bg-brand-50 text-brand-700 ${cls}`}>無料相談あり</li>
      )}
    </ul>
  );
}
