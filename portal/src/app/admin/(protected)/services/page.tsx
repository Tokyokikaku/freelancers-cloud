import Link from "next/link";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteService, setPartnerStatus, setReviewStatus, toggleServiceFlag } from "@/app/actions/admin";
import { adminCategories, adminServices } from "@/lib/admin-data";
import { PARTNER_STATUS_LABELS, REVIEW_LABELS, type ReviewStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

function Toggle({ id, field, value, label }: { id: string; field: string; value: boolean; label: string }) {
  return (
    <form action={toggleServiceFlag}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={String(!value)} />
      <button type="submit" aria-pressed={value} title={`${label}を${value ? "解除" : "設定"}`}
        className={`min-h-8 rounded-md px-2.5 text-xs font-bold ${value ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
        {label}
      </button>
    </form>
  );
}

export default async function AdminServicesPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string; status?: string }> }) {
  const sp = await searchParams;
  const [all, categories] = await Promise.all([adminServices(), adminCategories()]);
  const filter = (["draft", "needs_review", "verified"] as ReviewStatus[]).find((x) => x === sp.status);
  const services = filter ? all.filter((s) => s.review_status === filter) : all;
  const countBy = (st: ReviewStatus) => all.filter((s) => s.review_status === st).length;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">サービス（{services.length}）</h1>
        <div className="flex gap-2"><Link href="/admin/import" className="btn-ghost">CSV取込</Link><a href="/admin/services/export" className="btn-ghost">CSV出力</a><Link href="/admin/services/new" className="btn-primary">サービスを追加</Link></div>
      </div>
      <nav aria-label="確認状態" className="flex flex-wrap gap-2 text-sm">
        <Link href="/admin/services" className={`rounded px-3 py-1.5 ${!filter ? "bg-ink font-bold text-white" : "bg-white hover:bg-slate-200"}`}>すべて {all.length}</Link>
        {(["draft", "needs_review", "verified"] as ReviewStatus[]).map((st) => (
          <Link key={st} href={`/admin/services?status=${st}`} className={`rounded px-3 py-1.5 ${filter === st ? "bg-ink font-bold text-white" : "bg-white hover:bg-slate-200"}`}>{REVIEW_LABELS[st]} {countBy(st)}</Link>
        ))}
      </nav>
      {sp.saved && <p className="rounded-lg bg-good-50 p-3 text-sm text-good-700">保存しました。</p>}
      {sp.deleted && <p className="rounded-lg bg-good-50 p-3 text-sm text-good-700">削除しました。</p>}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[56rem] text-sm">
          <thead className="bg-surface text-left text-xs text-muted">
            <tr><th className="p-3">サービス</th><th className="p-3">カテゴリ</th><th className="p-3">確認状態</th><th className="p-3">契約状態</th><th className="p-3">設定</th><th className="p-3 text-right">操作</th></tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t border-line align-middle">
                <td className="p-3"><p className="font-bold text-ink">{s.name}</p><p className="text-xs text-muted">{s.company_name} ・ /services/{s.slug}</p></td>
                <td className="p-3 text-xs">{s.category_ids.map((id) => categories.find((c) => c.id === id)?.name).filter(Boolean).join("、") || "-"}</td>
                <td className="p-3">
                  <form action={setReviewStatus} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={s.id} />
                    <select name="status" defaultValue={s.review_status} className="rounded border border-line bg-white px-1.5 py-1 text-xs" aria-label="確認状態">
                      {Object.entries(REVIEW_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    <button type="submit" className="rounded bg-surface px-2 py-1 text-xs font-bold hover:bg-slate-200">更新</button>
                  </form>
                </td>
                <td className="p-3">
                  <form action={setPartnerStatus} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={s.id} />
                    <select name="status" defaultValue={s.partner_status} className="rounded border border-line bg-white px-1.5 py-1 text-xs" aria-label="契約状態">
                      {Object.entries(PARTNER_STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    <button type="submit" className="rounded bg-surface px-2 py-1 text-xs font-bold hover:bg-slate-200">更新</button>
                  </form>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1.5">
                    <Toggle id={s.id} field="published" value={s.published} label="公開" />
                    <Toggle id={s.id} field="featured" value={s.featured} label="おすすめ" />
                    <Toggle id={s.id} field="show_in_popular" value={s.show_in_popular} label="人気対象" />
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/services/${s.id}`} className="btn-ghost !min-h-8 !px-3 !py-1">編集</Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={s.id} />
                      <ConfirmButton message="このサービスを削除しますか？関連するリード・計測データのサービス紐づけも失われます。" className="btn !min-h-8 !px-3 !py-1 text-red-700 hover:bg-red-50">削除</ConfirmButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted">サービスがありません</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
