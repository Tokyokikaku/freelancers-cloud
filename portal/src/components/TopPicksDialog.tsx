"use client";
import { useEffect, useRef } from "react";
import type { Offer } from "./top-picks-client";

/** 1社だけ資料請求しようとした人に、同じカテゴリの人気上位サービスとの比較（まとめて資料請求）を提案するポップアップ */
export function TopPicksDialog({
  serviceName,
  offer,
  onAccept,
  onDecline,
  onClose,
}: {
  serviceName: string;
  offer: Offer;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}) {
  const primary = useRef<HTMLButtonElement>(null);
  const n = offer.picks.length;
  useEffect(() => {
    primary.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="picks-title" className="relative max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-xl bg-white p-5 shadow-2xl sm:rounded-xl sm:p-7">
        <button type="button" onClick={onClose} aria-label="閉じる" className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded text-xl text-muted hover:bg-surface">×</button>
        <p className="text-xs font-bold text-cta-600">比較してから選びませんか？</p>
        <h2 id="picks-title" className="mt-1 pr-8 text-xl leading-snug sm:text-2xl">
          「{offer.categoryName}」の<span className="text-brand-700">人気上位{n}サービス</span>と比較しませんか？
        </h2>
        <p className="mt-3 text-sm leading-7 text-body">
          料金や成果地点は、サービスごとに大きく違います。{serviceName}とあわせて、人気上位のサービスの資料も、無料でまとめて請求できます。
        </p>

        <ol className="mt-4 divide-y divide-line overflow-hidden rounded-lg border-2 border-cta-500 bg-warn-50">
          {offer.picks.map((p, i) => (
            <li key={p.slug} className="flex items-center gap-3 px-3 py-2.5">
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-cta-500 text-xs font-black text-white">{i + 1}</span>
              <span className="min-w-0"><b className="block truncate text-sm text-ink">{p.name}</b><span className="block truncate text-[11px] text-muted">{p.company_name}</span></span>
            </li>
          ))}
        </ol>

        <button ref={primary} type="button" onClick={onAccept} className="btn-cta mt-5 w-full py-3.5 text-base">
          上位{n}サービスの資料もまとめて請求（無料）
        </button>
        <button type="button" onClick={onDecline} className="mt-3 block w-full py-2 text-center text-sm text-muted underline hover:text-brand-700">
          {serviceName}だけ請求する
        </button>
      </div>
    </div>
  );
}
