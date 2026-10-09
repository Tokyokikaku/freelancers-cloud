import Link from "next/link";
import { formatNumber, formatPercent } from "@/lib/format";
import { getServiceStats } from "@/lib/data";
import { adminServices } from "@/lib/admin-data";
import { hasServiceRole, serviceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const PERIODS = [7, 30, 90] as const;

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const { days: d } = await searchParams;
  const days = PERIODS.find((p) => String(p) === d) ?? 30;
  const to = new Date();
  const from = new Date(to.getTime() - days * 86400_000);

  const [services, stats] = await Promise.all([adminServices(), getServiceStats(from, to)]);
  const byId = new Map(stats.map((s) => [s.service_id, s]));
  const rows = services
    .map((s) => ({ s, st: byId.get(s.id) ?? { service_id: s.id, page_views: 0, unique_users: 0, official_clicks: 0, document_clicks: 0, form_starts: 0, leads: 0 } }))
    .sort((a, b) => b.st.page_views - a.st.page_views);
  const total = rows.reduce((t, r) => ({ pv: t.pv + r.st.page_views, off: t.off + r.st.official_clicks, doc: t.doc + r.st.document_clicks, leads: t.leads + r.st.leads }), { pv: 0, off: 0, doc: 0, leads: 0 });

  // サイト内検索キーワード（直近の検索イベントから集計）
  let topQueries: [string, number][] = [];
  if (hasServiceRole) {
    const { data } = await serviceClient().from("page_events").select("query").eq("event_name", "search").gte("created_at", from.toISOString()).not("query", "is", null).limit(5000);
    const counts = new Map<string, number>();
    for (const r of data ?? []) {
      const q = String(r.query).trim().toLowerCase();
      if (q) counts.set(q, (counts.get(q) ?? 0) + 1);
    }
    topQueries = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
  }

  const ratio = (n: number, d: number) => (d > 0 ? formatPercent(n / d) : "-");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl">ダッシュボード</h1>
          <p className="mt-1 text-sm text-muted">サービス別の需要データ（直近{days}日）。広告主への提案資料の根拠になります。</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {PERIODS.map((p) => (
            <Link key={p} href={`/admin?days=${p}`} className={`rounded-lg px-3 py-1.5 ${p === days ? "bg-ink font-bold text-white" : "bg-white hover:bg-slate-200"}`}>{p}日</Link>
          ))}
          <Link href={`/admin/stats/export?days=${days}`} className="btn-ghost !min-h-9 !py-1.5">CSVエクスポート</Link>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[["サービスページPV", total.pv], ["公式サイトクリック", total.off], ["資料ボタンクリック", total.doc], ["リード", total.leads]].map(([l, v]) => (
          <div key={l as string} className="card p-4"><dt className="text-xs font-bold text-muted">{l}</dt><dd className="mt-1 text-2xl font-bold text-ink">{formatNumber(v as number)}</dd></div>
        ))}
      </dl>

      <section>
        <h2 className="mb-3 text-lg">サービス別</h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[56rem] text-sm">
            <thead className="bg-surface text-left text-xs text-muted">
              <tr>
                <th className="p-3">サービス</th>
                {["ページPV", "ユニークUU", "公式サイト クリック", "公式サイト CTR", "資料ボタン クリック", "フォーム開始", "リード数", "リードCVR"].map((h) => <th key={h} className="p-3 text-right">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ s, st }) => (
                <tr key={s.id} className="border-t border-line">
                  <td className="p-3 font-bold text-ink"><Link href={`/admin/services/${s.id}`} className="hover:underline">{s.name}</Link>{!s.published && <span className="ml-2 tag bg-slate-100 text-slate-600">非公開</span>}</td>
                  <td className="p-3 text-right">{formatNumber(st.page_views)}</td>
                  <td className="p-3 text-right">{formatNumber(st.unique_users)}</td>
                  <td className="p-3 text-right">{formatNumber(st.official_clicks)}</td>
                  <td className="p-3 text-right">{ratio(st.official_clicks, st.page_views)}</td>
                  <td className="p-3 text-right">{formatNumber(st.document_clicks)}</td>
                  <td className="p-3 text-right">{formatNumber(st.form_starts)}</td>
                  <td className="p-3 text-right font-bold text-ink">{formatNumber(st.leads)}</td>
                  <td className="p-3 text-right">{ratio(st.leads, st.page_views)}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={9} className="p-8 text-center text-muted">サービスが登録されていません</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs leading-6 text-muted">公式サイトCTR = 公式サイトクリック ÷ ページPV ／ リードCVR = リード数 ÷ ページPV ／ ユニークUU = ブラウザ単位の匿名IDの数（ボットは除外）</p>
      </section>

      <section>
        <h2 className="mb-3 text-lg">よく検索されているキーワード</h2>
        {topQueries.length ? (
          <ul className="flex flex-wrap gap-2">{topQueries.map(([q, n]) => <li key={q} className="tag bg-white px-3 py-1 text-sm ring-1 ring-line">{q} <span className="ml-1 text-muted">{n}</span></li>)}</ul>
        ) : <p className="text-sm text-muted">まだ検索データがありません。</p>}
      </section>
    </div>
  );
}
