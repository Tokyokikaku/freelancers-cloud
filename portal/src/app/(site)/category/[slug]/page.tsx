import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { PageEvent } from "@/components/Trackers";
import { getArticles, getCategories, getServices, servicesInCategory } from "@/lib/data";
import { getPopularServices } from "@/lib/popular";
import { RANKING_NOTE } from "@/lib/ranking";
import { ancestors } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return (await getCategories()).map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

const defaultIntro = (name: string) =>
  `${name}には固定費型と成果報酬型があります。成果報酬型では、あらかじめ決めた成果が発生した場合のみ料金が発生します。成果地点や初期費用・月額費用の有無はサービスごとに異なるため、条件を比較して選びましょう。`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [categories, services] = await Promise.all([getCategories(), getServices()]);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  const n = servicesInCategory(services, categories, cat.id).length;
  return buildMetadata({
    title: cat.seo_title || (n >= 2 ? `成果報酬型の${cat.name}${n}社を比較` : `成果報酬型の${cat.name}サービス一覧`),
    description:
      cat.seo_description ||
      `成果報酬で依頼できる${cat.name}サービスを比較。初期費用、月額費用、成果地点、成果報酬額などから自社に合ったサービスを探せます。`,
    path: `/category/${cat.slug}`,
    noindex: n === 0, // 掲載ゼロのカテゴリは薄いページになるため検索結果に出さない
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, allServices, articles] = await Promise.all([getCategories(), getServices(), getArticles()]);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const inCat = servicesInCategory(allServices, categories, cat.id);
  const ranked = await getPopularServices(inCat, { onlyEligible: false });
  const parent = cat.parent_id ? categories.find((c) => c.id === cat.parent_id) : null;
  const children = categories.filter((c) => c.parent_id === cat.id);
  const siblings = parent ? categories.filter((c) => c.parent_id === parent.id && c.id !== cat.id) : [];
  const relatedArticles = articles.filter((a) => a.category_id === cat.id).slice(0, 4);

  return (
    <>
      <PageEvent name="category_page_view" params={{ category_id: cat.id, category_name: cat.name }} />
      <PageHeader
        crumbs={[...ancestors(categories, cat.id).map((a) => ({ name: a.name, href: `/category/${a.slug}` })), { name: cat.name }]}
        title={`成果報酬型の${cat.name}サービス一覧`}
        lead={cat.description || defaultIntro(cat.name)}
      >
        {siblings.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {siblings.map((c) => (
              <li key={c.id}><Link href={`/category/${c.slug}`} className="tag border border-line bg-white px-3 py-1 text-sm text-ink hover:border-brand-500">{c.name}</Link></li>
            ))}
          </ul>
        )}
      </PageHeader>

    <div className="container-page py-8 sm:py-10">
      {children.length > 0 && (
        <section aria-labelledby="sub" className="mb-8">
          <h2 id="sub" className="mb-3 border-l-[5px] border-brand-600 pl-3 text-lg">{cat.name}のカテゴリ</h2>
          <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {children.map((ch) => {
              const grand = categories.filter((g) => g.parent_id === ch.id);
              return (
                <li key={ch.id} className="bg-white p-3">
                  <Link href={`/category/${ch.slug}`} className="flex items-center justify-between font-bold text-brand-700 hover:underline">
                    {ch.name}<span className="text-xs font-normal text-muted">{servicesInCategory(allServices, categories, ch.id).length}件</span>
                  </Link>
                  {grand.length > 0 && (
                    <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {grand.map((g) => <li key={g.id}><Link href={`/category/${g.slug}`} className="text-body hover:text-brand-700 hover:underline">{g.name}（{servicesInCategory(allServices, categories, g.id).length}）</Link></li>)}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-2" aria-labelledby="list">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="list" className="text-xl sm:text-2xl">{cat.name}の成果報酬サービス（{ranked.length}件）</h2>
            <p className="mt-1 text-sm text-muted">人気順：{RANKING_NOTE}（直近30日）。広告費の支払額は順位に影響しません。</p>
          </div>
          <Link href={`/services?category=${cat.slug}`} className="btn-ghost">条件で絞り込む</Link>
        </div>
        {ranked.length ? (
          <ul className="space-y-3">
            {ranked.map((s, i) => <li key={s.id}><ServiceCard service={s} categories={categories} rank={i + 1} /></li>)}
          </ul>
        ) : (
          <div className="card p-10 text-center">
            <p className="font-bold text-ink">このカテゴリのサービスは掲載準備中です</p>
            <p className="mt-2 text-sm text-muted">他のカテゴリや、キーワード検索をお試しください。</p>
            <Link href="/services" className="btn-secondary mt-5">サービス一覧を見る</Link>
          </div>
        )}
      </section>

      {relatedArticles.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl">関連記事</h2>
          <ul className="space-y-2">
            {relatedArticles.map((a) => <li key={a.id}><Link href={`/articles/${a.slug}`} className="text-brand-700 underline">{a.title}</Link></li>)}
          </ul>
        </section>
      )}

      {ranked.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `成果報酬型の${cat.name}サービス一覧`,
            itemListElement: ranked.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: absoluteUrl(`/services/${s.slug}`) })),
          }}
        />
      )}
    </div>
    </>
  );
}
