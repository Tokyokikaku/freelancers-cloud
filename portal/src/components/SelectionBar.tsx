"use client";
import { usePathname, useRouter } from "next/navigation";
import { requestHref, useRequestList } from "./request-store";
import { track } from "@/lib/tracking";

/**
 * 画面下部の固定バー。資料請求リスト（まとめて資料請求）を扱う。1件以上選ぶと表示される。
 */
export function SelectionBar() {
  const req = useRequestList();
  const router = useRouter();
  const pathname = usePathname();
  if (req.items.length === 0 || pathname.startsWith("/admin") || pathname === "/request" || pathname === "/thanks") return null;

  const goRequest = () => {
    req.items.forEach((i) => track("document_button_click", { service_id: i.id, service_name: i.name, placement: "selection_bar" }));
    router.push(requestHref(req.items.map((i) => i.slug)));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cta-500 bg-white shadow-[0_-4px_12px_rgb(15_23_42/0.12)]" role="region" aria-label="選択中のサービス">
      <div className="container-page flex flex-wrap items-center gap-x-5 gap-y-2 py-2.5">
        {req.items.length > 0 && (
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="text-sm font-bold text-ink">資料請求リスト <span className="rounded-full bg-cta-500 px-2 py-0.5 text-xs text-white">{req.items.length}</span></p>
            <ul className="hidden min-w-0 flex-wrap gap-1.5 md:flex">
              {req.items.slice(0, 4).map((i) => (
                <li key={i.slug} className="inline-flex max-w-[11rem] items-center gap-1 rounded bg-warn-50 py-0.5 pl-2 pr-0.5 text-xs text-ink">
                  <span className="truncate">{i.name}</span>
                  <button type="button" onClick={() => req.remove(i.slug)} className="inline-flex size-6 items-center justify-center rounded hover:bg-white" aria-label={`${i.name}をリストから外す`}>×</button>
                </li>
              ))}
              {req.items.length > 4 && <li className="self-center text-xs text-muted">ほか{req.items.length - 4}件</li>}
            </ul>
            <button type="button" onClick={req.clear} className="text-xs text-muted underline">クリア</button>
          </div>
        )}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {req.items.length > 0 && <button type="button" onClick={goRequest} className="btn-cta px-6">まとめて資料請求（無料）</button>}
        </div>
      </div>
    </div>
  );
}
