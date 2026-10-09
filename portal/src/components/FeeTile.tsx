import { UNKNOWN_TEXT } from "@/lib/format";
import type { FeeType } from "@/lib/types";

/** 比較表の1マス。見出し（グレー）+ 値。値は0円を朱色で強調し、不明は控えめに表示する */
export function FactCell({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-line bg-white ${className}`}>
      <dt className="bg-surface px-2.5 py-1 text-[11px] font-bold text-muted">{label}</dt>
      <dd className="px-2.5 py-2">{children}</dd>
    </div>
  );
}

export function FeeTile({ label, type, detail }: { label: string; type: FeeType; detail: string | null }) {
  return (
    <FactCell label={label}>
      {type === "free" ? (
        <span className="text-2xl font-black leading-none text-good-700">0円</span>
      ) : type === "paid" ? (
        <>
          <span className="text-base font-bold text-warn-700">あり</span>
          {detail && <span className="mt-0.5 line-clamp-2 block text-[11px] leading-5 text-body">{detail}</span>}
        </>
      ) : (
        <span className="text-sm text-muted">{UNKNOWN_TEXT}</span>
      )}
    </FactCell>
  );
}
