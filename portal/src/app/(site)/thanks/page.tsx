import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ThanksRecommend } from "@/components/ThanksRecommend";
import { comparisonMaterials } from "@/lib/comparison";
import { getCategories, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせを受け付けました",
  description: "お問い合わせを受け付けました。",
  path: "/thanks",
  noindex: true,
});

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ s?: string; service?: string; c?: string }> }) {
  const sp = await searchParams;
  const slugs = Array.from(new Set((sp.s ?? sp.service ?? "").split(",").map((x) => x.trim()).filter(Boolean))).slice(0, 10);
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  const compareSlugs = (sp.c ?? "").split(",").map((x) => x.trim()).filter(Boolean).slice(0, 3);
  const materials = comparisonMaterials(services, categories);
  const comparisons = compareSlugs.map((c) => materials.find((m) => m.categorySlug === c)).filter((m) => !!m);
  const requested = slugs.map((s) => services.find((x) => x.slug === s)).filter((x) => !!x);

  // 続けて請求できるサービス: 請求したサービスと同じカテゴリ → なければ完全成果報酬
  const catIds = new Set(requested.flatMap((s) => s!.category_ids));
  const sameCategory = services.filter((s) => !slugs.includes(s.slug) && s.category_ids.some((id) => catIds.has(id)));
  const rest = services.filter((s) => !slugs.includes(s.slug) && !sameCategory.includes(s) && s.is_full_success_fee);
  const recommend = [...sameCategory, ...rest].slice(0, 5).map((s) => ({
    slug: s.slug,
    name: s.name,
    company_name: s.company_name,
    tags: [s.is_full_success_fee ? "完全成果報酬" : "", s.initial_fee_type === "free" ? "初期費用0円" : ""].filter(Boolean),
  }));

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="panel p-6 text-center sm:p-10">
          <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Icon name="check" className="size-7" /></span>
          <h1 className="mt-4 text-2xl sm:text-3xl">資料請求を受け付けました</h1>
          <p className="mt-2 text-sm text-muted">{requested.length + comparisons.length ? `${requested.length + comparisons.length}件の資料について、入力内容を確認しました。` : "入力内容を確認しました。"}</p>

          {requested.length + comparisons.length > 0 && (
            <ul className="mt-6 divide-y divide-line rounded-md border border-line text-left">
              {comparisons.map((m) => (
                <li key={m!.categorySlug} className="flex flex-wrap items-center gap-2 p-3">
                  <span className="tag bg-cta-500 text-white">比較資料</span>
                  <b className="min-w-0 text-ink">{m!.title}</b>
                </li>
              ))}
              {requested.map((s) => (
                <li key={s!.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
                  <span className="min-w-0"><b className="text-ink">{s!.name}</b><span className="block text-xs text-muted">{s!.company_name}</span></span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 space-y-3 text-left text-sm leading-7 sm:text-base sm:leading-8">
            <p>資料は、サービス運営会社もしくは成果報酬ナビから、ご登録のメールアドレス宛にお送りします。ご入力いただいた連絡先に、サービス運営会社からご案内を差し上げる場合があります。</p>
            <p>ご案内までにお時間をいただく場合があります。</p>
          </div>
        </div>

        <ThanksRecommend items={recommend} />

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/services" className="btn-ghost">他のサービスも比較する</Link>
          <Link href="/" className="btn-ghost">トップへ戻る</Link>
        </div>
      </div>
    </div>
  );
}
