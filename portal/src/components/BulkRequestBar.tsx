"use client";
import { useRouter } from "next/navigation";
import { MAX_REQUEST_SERVICES } from "@/lib/lead-options";
import { track } from "@/lib/tracking";
import { requestHref, useRequestList, type RequestItem } from "./request-store";

/**
 * 一覧・カテゴリページ上部の「まとめて資料請求」バー。
 * 表示中のサービスを全選択して、1回の入力でまとめて請求できる（BOXIL・ITトレンド型の動線）。
 */
export function BulkRequestBar({ items, label }: { items: RequestItem[]; label: string }) {
  const req = useRequestList();
  const router = useRouter();
  const targets = items.slice(0, MAX_REQUEST_SERVICES);
  const selectedInList = targets.filter((t) => req.has(t.slug)).length;
  const allSelected = targets.length > 0 && selectedInList === targets.length;
  if (items.length === 0) return null;

  const go = () => {
    const slugs = req.items.length ? req.items.map((i) => i.slug) : targets.map((t) => t.slug);
    const list = req.items.length ? req.items : targets;
    list.forEach((i) => track("document_button_click", { service_id: i.id, service_name: i.name, placement: "bulk_bar" }));
    router.push(requestHref(slugs));
  };

  return (
    <section aria-label="まとめて資料請求" className="mb-4 overflow-hidden rounded-md border-2 border-cta-500 bg-warn-50">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 p-3 sm:p-4">
        <div className="min-w-0 flex-1">
          <p className="text-base font-black text-ink sm:text-lg">{label}の資料を、まとめて請求（無料）</p>
          <p className="mt-0.5 text-xs leading-6 text-body sm:text-sm">1回の入力で複数サービスにまとめて請求できます。気になるサービスをチェックするか、全選択してください。</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => (allSelected ? req.removeMany(targets.map((t) => t.slug)) : req.add(targets))}
            className="btn-ghost"
          >
            {allSelected ? "選択を解除" : `表示中の${targets.length}件を全選択`}
          </button>
          <button type="button" onClick={go} className="btn-cta px-5">
            {req.items.length ? `選択中の${req.items.length}件を請求` : "まとめて資料請求"}
          </button>
        </div>
      </div>
      {items.length > MAX_REQUEST_SERVICES && <p className="border-t border-cta-500/30 px-4 py-1.5 text-xs text-muted">一度に請求できるのは最大{MAX_REQUEST_SERVICES}サービスまでです（全選択は上位{MAX_REQUEST_SERVICES}件）。</p>}
    </section>
  );
}
