import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RequestFlow, type ServiceLite } from "@/components/RequestFlow";
import { comparisonMaterials, MAX_COMPARISON_CATEGORIES, offersByService } from "@/lib/comparison";
import { getCategories, getServices } from "@/lib/data";
import { houjinEnabled } from "@/lib/houjin";
import { MAX_REQUEST_SERVICES } from "@/lib/lead-options";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "資料請求（無料）",
  description: "気になるサービスの資料を、1回の入力でまとめて請求できます。",
  path: "/request",
  noindex: true,
});

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ s?: string; c?: string }> }) {
  const { s, c } = await searchParams;
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  const initial = Array.from(new Set((s ?? "").split(",").map((x) => x.trim()).filter(Boolean))).slice(0, MAX_REQUEST_SERVICES);

  const initialCats = Array.from(new Set((c ?? "").split(",").map((x) => x.trim()).filter(Boolean))).slice(0, MAX_COMPARISON_CATEGORIES);
  const materials = comparisonMaterials(services, categories);
  const offers = offersByService(services, categories);

  const lite: ServiceLite[] = services.map((x) => ({
    id: x.id,
    slug: x.slug,
    name: x.name,
    company_name: x.company_name,
    category_ids: x.category_ids,
    partner_status: x.partner_status,
    initial_fee_type: x.initial_fee_type,
    monthly_fee_type: x.monthly_fee_type,
    is_full_success_fee: x.is_full_success_fee,
    featured: x.featured,
    success_condition: x.success_condition,
    category_names: x.category_ids.map((id) => categories.find((c) => c.id === id)?.name).filter((n): n is string => Boolean(n)),
  }));

  return (
    <div className="bg-white">
      <div className="border-b border-line">
        <div className="container-page py-5">
          <Breadcrumbs items={[{ name: "資料請求" }]} />
          <h1 className="mt-3 border-l-[6px] border-cta-500 pl-3 text-2xl sm:text-[1.9rem]">資料請求（無料）</h1>
          <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm font-bold" aria-label="資料請求の流れ">
            <li className="rounded-full bg-brand-600 px-4 py-1 text-white">1 サービスを選ぶ</li>
            <li className="text-muted">＞</li>
            <li className="rounded-full bg-brand-600 px-4 py-1 text-white">2 情報を入力</li>
            <li className="text-muted">＞</li>
            <li className="rounded-full bg-slate-200 px-4 py-1 text-muted">3 完了</li>
          </ol>
        </div>
      </div>
      <RequestFlow services={lite} initialSlugs={initial} initialCats={initialCats} offers={offers} materials={materials} companySuggest={houjinEnabled} />
    </div>
  );
}
