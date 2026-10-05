"use client";
import { MAX_REQUEST_SERVICES } from "@/lib/lead-options";
import { useRequestList, type RequestItem } from "./request-store";

/** 「資料請求リストに追加」チェックボックス（一覧の各行） */
export function RequestToggle({ item }: { item: RequestItem }) {
  const { has, full, toggle } = useRequestList();
  const checked = has(item.slug);
  const disabled = !checked && full;
  return (
    <label
      className={`flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded border px-2 text-xs font-bold ${checked ? "border-cta-500 bg-warn-50 text-cta-600" : "border-line text-body hover:border-cta-500"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      title={disabled ? `資料請求リストに入れられるのは最大${MAX_REQUEST_SERVICES}サービスまでです` : undefined}
    >
      <input type="checkbox" className="size-4 accent-cta-500" checked={checked} disabled={disabled} onChange={() => toggle(item)} aria-label={`${item.name}を資料請求リストに追加`} />
      資料請求リストに追加
    </label>
  );
}
