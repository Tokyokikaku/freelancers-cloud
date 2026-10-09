import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FeeTags } from "@/components/FeeTags";
import { RequestButton } from "@/components/RequestButton";
import { getServices } from "@/lib/data";
import { infoUpdatedAt, initialFeeLabel, monthlyFeeLabel, successConditionLabel, successFeeLabel } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { OUTCOME_LABELS, PRICING_MODEL_LABELS } from "@/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "成果報酬サービスの比較",
  description: "選択した成果報酬サービスの料金・成果地点・対象企業・特徴を横並びで比較できます。",
  path: "/compare",
  noindex: true,
});

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s } = await searchParams;
  const slugs = Array.from(new Set((s ?? "").split(",").map((x) => x.trim()).filter(Boolean))).slice(0, 3);
  const all = await getServices();
  const items = slugs.map((slug) => all.find((x) => x.slug === slug)).filter((x) => !!x);

  const rows: [string, (x: (typeof items)[number]) => React.ReactNode][] = [
    ["料金条件", (x) => <FeeTags service={x} />],
    ["料金モデル", (x) => PRICING_MODEL_LABELS[x.pricing_model]],
    ["初期費用", (x) => initialFeeLabel(x)],
    ["月額料金", (x) => monthlyFeeLabel(x)],
    ["成果報酬額", (x) => successFeeLabel(x)],
    ["成果地点", (x) => <>{successConditionLabel(x)}{x.outcome_type !== "other" && <span className="mt-1 block text-xs text-muted">分類：{OUTCOME_LABELS[x.outcome_type]}</span>}</>],
    ["対象企業", (x) => x.target_companies || "公式サイトをご確認ください"],
    ["無料相談", (x) => (x.has_free_consultation ? "あり" : "公式サイトをご確認ください")],
    ["特徴", (x) => <ul className="list-disc space-y-1 pl-4">{x.features.map((f, i) => <li key={i}>{f}</li>)}</ul>],
    ["情報更新日", (x) => infoUpdatedAt(x)],
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "サービス一覧", href: "/services" }, { name: "比較" }]} />
      <h1 className="mt-4 text-2xl sm:text-3xl">成果報酬サービスの比較</h1>
      <p className="mt-2 text-sm text-muted">最大3サービスを横並びで比較できます。最新の料金・条件は各公式サイトでご確認ください。</p>

      {items.length < 2 ? (
        <div className="card mt-8 p-10 text-center">
          <p className="font-bold text-ink">比較するサービスを2つ以上選んでください</p>
          <p className="mt-2 text-sm text-muted">サービス一覧の各カードにある「比較する」にチェックを入れると、ここで比較できます。</p>
          <Link href="/services" className="btn-primary mt-5">サービス一覧へ</Link>
        </div>
      ) : (
        <div className="card mt-8 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <caption className="sr-only">成果報酬サービス比較表</caption>
            <thead>
              <tr className="border-b border-line bg-surface">
                <th scope="col" className="w-32 p-4 text-left text-muted sm:w-40"><span className="sr-only">項目</span></th>
                {items.map((x) => (
                  <th key={x!.id} scope="col" className="p-4 text-left align-top">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0">
                        <Link href={`/services/${x!.slug}`} className="text-base font-bold text-ink hover:text-brand-700 hover:underline">{x!.name}</Link>
                        <p className="text-xs font-normal text-muted">{x!.company_name}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, render]) => (
                <tr key={label} className="border-b border-line last:border-0">
                  <th scope="row" className="bg-surface p-4 text-left align-top font-bold text-ink">{label}</th>
                  {items.map((x) => <td key={x!.id} className="p-4 align-top leading-7">{render(x!)}</td>)}
                </tr>
              ))}
              <tr>
                <th scope="row" className="bg-surface p-4 text-left align-top font-bold text-ink">資料請求</th>
                {items.map((x) => (
                  <td key={x!.id} className="space-y-2 p-4 align-top">
                    <RequestButton id={x!.id} slug={x!.slug} name={x!.name} partnerStatus={x!.partner_status} placement="compare" className="btn-cta w-full" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
