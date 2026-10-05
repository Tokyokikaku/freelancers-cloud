import { UNKNOWN_TEXT } from "@/lib/format";
import type { FeeType } from "@/lib/types";

/** 料金タイル。0円は大きく強調し、不明は控えめに表示する */
export function FeeTile({ label, type, detail }: { label: string; type: FeeType; detail: string | null }) {
  const main = type === "free" ? "0円" : type === "paid" ? "あり" : UNKNOWN_TEXT;
  return (
    <div className={`rounded-xl px-3.5 py-3 ${type === "free" ? "bg-good-50 ring-1 ring-inset ring-good-100" : "bg-surface"}`}>
      <dt className="text-[11px] font-bold text-muted">{label}</dt>
      <dd className={`mt-0.5 font-bold ${type === "free" ? "text-2xl text-good-700" : type === "paid" ? "text-lg text-warn-700" : "text-sm leading-8 text-muted"}`}>{main}</dd>
      {type === "paid" && detail && <dd className="mt-0.5 line-clamp-2 text-[11px] leading-5 text-body">{detail}</dd>}
    </div>
  );
}
