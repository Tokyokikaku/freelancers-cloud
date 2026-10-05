"use client";
import { MAX_COMPARE, useCompare } from "./compare-store";

export function CompareToggle({ slug, name }: { slug: string; name: string }) {
  const { has, items, toggle } = useCompare();
  const checked = has(slug);
  const full = !checked && items.length >= MAX_COMPARE;
  return (
    <label
      className={`inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded border px-3 text-sm font-bold ${checked ? "border-brand-600 bg-brand-50 text-brand-700" : "border-line text-ink hover:border-brand-500"} ${full ? "cursor-not-allowed opacity-50" : ""}`}
      title={full ? `比較できるのは最大${MAX_COMPARE}サービスまでです` : undefined}
    >
      <input type="checkbox" className="size-4 accent-brand-600" checked={checked} disabled={full} onChange={() => toggle({ slug, name })} aria-label={`${name}を比較リストに追加`} />
      比較する
    </label>
  );
}
