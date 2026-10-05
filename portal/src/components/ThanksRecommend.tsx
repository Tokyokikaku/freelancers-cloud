"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { requestHref } from "./request-store";

export interface RecommendItem {
  slug: string;
  name: string;
  company_name: string;
  tags: string[];
}

/** 完了後の追加請求。保存済みの入力内容があれば、請求画面で自動入力される */
export function ThanksRecommend({ items }: { items: RecommendItem[] }) {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);
  if (items.length === 0) return null;
  const toggle = (slug: string) => setPicked((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]));
  return (
    <section className="panel mt-6 overflow-hidden" aria-labelledby="more">
      <h2 id="more" className="border-b border-line bg-warn-50 px-4 py-3 text-base">続けて、ほかのサービスの資料も請求しませんか？</h2>
      <ul className="divide-y divide-line">
        {items.map((s) => (
          <li key={s.slug}>
            <label className="flex cursor-pointer items-start gap-3 p-3 hover:bg-surface/60 sm:p-4">
              <input type="checkbox" checked={picked.includes(s.slug)} onChange={() => toggle(s.slug)} className="mt-1 size-5 accent-cta-500" aria-label={`${s.name}を請求する`} />
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-ink">{s.name}</span>
                <span className="block text-xs text-muted">{s.company_name}</span>
                {s.tags.length > 0 && <span className="mt-1 flex flex-wrap gap-1.5">{s.tags.map((t) => <span key={t} className="tag bg-good-50 text-good-700 ring-1 ring-good-100">{t}</span>)}</span>}
              </span>
              <Link href={`/services/${s.slug}`} target="_blank" className="shrink-0 text-xs text-brand-700 underline" onClick={(e) => e.stopPropagation()}>詳細</Link>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/60 p-3 sm:p-4">
        <button type="button" className="text-sm font-bold text-brand-700 underline" onClick={() => setPicked(items.map((i) => i.slug))}>すべて選択</button>
        <button type="button" disabled={picked.length === 0} onClick={() => router.push(requestHref(picked))} className="btn-cta px-6 disabled:opacity-50">
          {picked.length ? `${picked.length}件を続けて請求する` : "サービスを選んでください"}
        </button>
      </div>
    </section>
  );
}
