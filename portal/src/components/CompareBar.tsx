"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAX_COMPARE, useCompare } from "./compare-store";

/** 画面下部の比較バー。1件以上選択すると表示される */
export function CompareBar() {
  const { items, remove, clear } = useCompare();
  const pathname = usePathname();
  if (items.length === 0 || pathname.startsWith("/admin") || pathname === "/compare") return null;
  const href = `/compare?s=${items.map((i) => encodeURIComponent(i.slug)).join(",")}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 shadow-[0_-4px_16px_rgb(15_23_42/0.08)] backdrop-blur" role="region" aria-label="比較リスト">
      <div className="container-page flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
        <p className="text-sm font-bold text-ink">
          比較リスト <span className="text-muted">({items.length}/{MAX_COMPARE})</span>
        </p>
        <ul className="flex min-w-0 flex-1 flex-wrap gap-2">
          {items.map((i) => (
            <li key={i.slug} className="inline-flex max-w-full items-center gap-1 rounded-lg bg-brand-50 py-1 pl-3 pr-1 text-sm text-brand-700">
              <span className="truncate">{i.name}</span>
              <button type="button" onClick={() => remove(i.slug)} className="inline-flex size-7 items-center justify-center rounded-md hover:bg-brand-100" aria-label={`${i.name}を比較リストから外す`}>×</button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button type="button" onClick={clear} className="text-sm text-muted underline">クリア</button>
          {items.length >= 2 ? (
            <Link href={href} className="btn-primary">{items.length}サービスを比較する</Link>
          ) : (
            <span className="text-sm text-muted">あと1サービス以上選ぶと比較できます</span>
          )}
        </div>
      </div>
    </div>
  );
}
