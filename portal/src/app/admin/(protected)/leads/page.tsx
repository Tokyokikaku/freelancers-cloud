import { formatDate, formatNumber } from "@/lib/format";
import { serviceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const db = serviceClient();
  const [{ data, error }, { count }] = await Promise.all([
    db.from("leads").select("*").order("created_at", { ascending: false }).limit(200),
    db.from("leads").select("lead_id", { count: "exact", head: true }),
  ]);
  if (error) throw new Error(error.message);
  const fmt = (v: string) => `${formatDate(v)} ${new Date(v).toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" })}`;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl">リード（{formatNumber(count ?? 0)}件）</h1>
          <p className="mt-1 text-sm text-muted">最新200件を表示。CSVは全件を出力します。個人情報を含むため取り扱いにご注意ください。</p>
        </div>
        <a href="/admin/leads/export" className="btn-primary">CSVエクスポート</a>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[56rem] text-sm">
          <thead className="bg-surface text-left text-xs text-muted">
            <tr>{["発生日時", "サービス", "会社名", "氏名", "メール", "電話", "検討時期", "従業員規模", "流入元 / medium / campaign"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {(data ?? []).map((l) => (
              <tr key={l.lead_id} className="border-t border-line align-top">
                <td className="whitespace-nowrap p-3">{fmt(l.created_at)}</td>
                <td className="p-3 font-bold text-ink">{l.service_name}</td>
                <td className="p-3">{l.company}</td>
                <td className="p-3">{l.name}</td>
                <td className="p-3 break-all">{l.email}</td>
                <td className="p-3">{l.phone ?? "-"}</td>
                <td className="p-3">{l.timing ?? "-"}</td>
                <td className="p-3">{l.employees ?? "-"}</td>
                <td className="p-3 text-xs">{[l.source, l.medium, l.campaign].map((x) => x || "-").join(" / ")}</td>
              </tr>
            ))}
            {(data ?? []).length === 0 && <tr><td colSpan={9} className="p-8 text-center text-muted">リードはまだありません</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
