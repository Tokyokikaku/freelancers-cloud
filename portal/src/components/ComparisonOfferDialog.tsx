"use client";
import { useEffect, useRef } from "react";
import type { ComparisonMaterial } from "@/lib/comparison";

/**
 * 1社だけ資料請求しようとした人に、同じカテゴリの比較資料もあわせて請求することを提案するポップアップ。
 */
export function ComparisonOfferDialog({
  serviceName,
  offer,
  onAccept,
  onDecline,
  onClose,
}: {
  serviceName: string;
  offer: ComparisonMaterial;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}) {
  const primary = useRef<HTMLButtonElement>(null);
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
      <div role="dialog" aria-modal="true" aria-labelledby="cmp-offer-title" className="relative max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-xl bg-white p-5 shadow-2xl sm:rounded-xl sm:p-7">
        <button type="button" onClick={onClose} aria-label="閉じる" className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded text-xl text-muted hover:bg-surface">×</button>
        <p className="text-xs font-bold text-cta-600">比較してから選びませんか？</p>
        <h2 id="cmp-offer-title" className="mt-1 pr-8 text-xl leading-snug sm:text-2xl">
          「{offer.categoryName}」には、ほかに<span className="text-brand-700">{offer.count - 1}サービス</span>あります
        </h2>
        <p className="mt-3 text-sm leading-7 text-body">
          料金や成果地点は、サービスごとに大きく違います。{serviceName}だけで決める前に、比較してみませんか？
        </p>

        <div className="mt-4 flex gap-3 rounded-lg border-2 border-cta-500 bg-warn-50 p-4">
          <span aria-hidden className="mt-0.5 inline-flex size-12 shrink-0 items-center justify-center rounded-md bg-white text-2xl ring-1 ring-cta-500/40">📦</span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-cta-600">無料でお送りします</p>
            <p className="font-black leading-snug text-ink">{offer.title}</p>
            <p className="mt-1 text-xs leading-6 text-body">{offer.count}サービスの初期費用・月額・成果報酬額・成果地点を、1つの資料にまとめて比較できます。</p>
          </div>
        </div>

        <button ref={primary} type="button" onClick={onAccept} className="btn-cta mt-5 w-full py-3.5 text-base">
          比較資料もあわせて請求する（無料）
        </button>
        <button type="button" onClick={onDecline} className="mt-3 block w-full py-2 text-center text-sm text-muted underline hover:text-brand-700">
          {serviceName}だけ請求する
        </button>
      </div>
    </div>
  );
}
