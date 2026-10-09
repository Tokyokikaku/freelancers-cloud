"use client";
import { useRouter } from "next/navigation";
import { requestHref, useRequestList } from "./request-store";

/** ヘッダーの「資料請求リスト」ボタン（件数バッジつき） */
export function HeaderRequestLink() {
  const { items } = useRequestList();
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(items.length ? requestHref(items.map((i) => i.slug)) : "/services")}
      className="relative inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded border border-cta-500 bg-white px-3 text-sm font-bold text-cta-600 hover:bg-warn-50"
    >
      資料請求リスト
      <span className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs text-white ${items.length ? "bg-cta-500" : "bg-slate-400"}`}>{items.length}</span>
    </button>
  );
}
