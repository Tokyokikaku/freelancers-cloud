import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQ, VALUE_PROPS } from "@/lib/content";
import { getArticles, getCategories, getServices, servicesInCategory } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { getPopularServices } from "@/lib/popular";
import { RANKING_NOTE } from "@/lib/ranking";
import { buildMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: `成果報酬で使えるサービスを、まとめて比較｜${SITE_NAME}`,
  titleAbsolute: true,
  description: SITE_DESCRIPTION,
  path: "/",
});

function SectionHead({ title, lead, href, hrefLabel }: { title: string; lead?: string; href?: string; hrefLabel?: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="h-section">{title}</h2>
        {lead && <p className="mt-2 text-sm text-muted">{lead}</p>}
      </div>
      {href && (
        <Link href={href} className="text-sm font-bold text-brand-700 hover:underline">
          {hrefLabel ?? "すべて見る"} →
        </Link>
      )}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">{children}</p>;
}

export default async function HomePage() {
  const [categories, services, articles] = await Promise.all([getCategories(), getServices(), getArticles()]);
  const popular = (await getPopularServices(services)).slice(0, 6);
  const fullSuccess = services.filter((s) => s.is_full_success_fee).slice(0, 3);
  const newest = [...services].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 3);

  const topCategories = categories.filter((c) => !c.parent_id);
  const countOf = (id: string) => servicesInCategory(services, categories, id).length;
  const popularCategories = [...topCategories].sort((a, b) => countOf(b.id) - countOf(a.id) || a.sort_order - b.sort_order);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="container-page py-14 sm:py-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1 text-sm font-bold text-brand-700">
            <Icon name="scale" className="size-4" /> 成果報酬サービスの検索・比較メディア
          </p>
          <h1 className="max-w-3xl text-3xl leading-tight sm:text-5xl sm:leading-tight">
            成果報酬で使えるサービスを、<wbr />まとめて比較。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 sm:text-lg">
            営業・採用・マーケティング・集客など、成果が発生した場合のみ料金を支払うサービスを簡単に探せます。
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchBox size="lg" id="hero-search" placeholder="例：営業代行、採用、SEO、インフルエンサー" />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href="/services" className="btn-primary px-7 py-3 text-base">
                成果報酬サービスを探す <Icon name="arrow" className="size-4" />
              </Link>
              <Link href="/services?full=1" className="text-sm font-bold text-brand-700 hover:underline">完全成果報酬のサービスだけを見る</Link>
            </div>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2 text-sm">
            {[
              ["初期費用0円", "/services?zero_initial=1"],
              ["月額0円", "/services?zero_monthly=1"],
              ["完全成果報酬", "/services?full=1"],
              ["無料相談あり", "/services?consult=1"],
            ].map(([t, href]) => (
              <li key={t}><Link href={href} className="tag bg-good-100 px-3 py-1 text-good-700 hover:bg-good-50 hover:ring-1 hover:ring-good-700">{t}で探す</Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 人気カテゴリ */}
      <section className="section">
        <div className="container-page">
          <SectionHead title="人気カテゴリ" lead="掲載サービス数の多いカテゴリから探せます。" />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {popularCategories.slice(0, 8).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="card group flex h-full flex-col items-start gap-3 p-4 transition hover:border-brand-500 hover:shadow-md sm:p-5">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={c.icon ?? "other"} className="size-6" />
                  </span>
                  <span className="font-bold text-ink">{c.name}</span>
                  <span className="text-xs text-muted">{countOf(c.id)}サービス</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 人気サービス */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHead title="人気の成果報酬サービス" lead={`${RANKING_NOTE}（直近30日）。広告費の支払額では順位を決めていません。`} href="/services" hrefLabel="サービス一覧へ" />
          {popular.length ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {popular.map((s, i) => (
                <li key={s.id}><ServiceCard service={s} categories={categories} rank={i + 1} compact /></li>
              ))}
            </ul>
          ) : (
            <Empty>掲載準備中です。</Empty>
          )}
        </div>
      </section>

      {/* 探す理由 */}
      <section className="section">
        <div className="container-page">
          <h2 className="h-section mb-8 text-center">成果報酬サービスを探す理由</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {VALUE_PROPS.map((v) => (
              <li key={v.title} className="card p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon name={v.icon} className="size-6" /></span>
                <h3 className="mt-4 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm leading-7">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* カテゴリ一覧 */}
      <section className="section border-y border-line bg-surface">
        <div className="container-page">
          <SectionHead title="カテゴリから探す" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {topCategories.map((c) => {
              const children = categories.filter((x) => x.parent_id === c.id);
              return (
                <div key={c.id} className="card p-5">
                  <h3 className="flex items-center gap-2 text-base">
                    <Icon name={c.icon ?? "other"} className="size-5 text-brand-700" />
                    <Link href={`/category/${c.slug}`} className="hover:text-brand-700 hover:underline">{c.name}</Link>
                  </h3>
                  {children.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {children.map((ch) => (
                        <li key={ch.id}><Link href={`/category/${ch.slug}`} className="text-body hover:text-brand-700 hover:underline">{ch.name}</Link></li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 完全成果報酬 */}
      <section className="section">
        <div className="container-page">
          <SectionHead title="完全成果報酬サービス" lead="固定費・月額費用がなく、成果発生時のみ費用が発生するサービス（初期費用・月額費用とも0円と確認できたもの）。" href="/services?full=1" />
          {fullSuccess.length ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {fullSuccess.map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} compact /></li>)}
            </ul>
          ) : (
            <Empty>現在、掲載準備中です。</Empty>
          )}
        </div>
      </section>

      {/* 新着 */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHead title="新着サービス" href="/services?sort=new" />
          {newest.length ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newest.map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} compact /></li>)}
            </ul>
          ) : (
            <Empty>掲載準備中です。</Empty>
          )}
        </div>
      </section>

      {/* 記事 */}
      <section className="section">
        <div className="container-page">
          <SectionHead title="成果報酬サービスに関する記事" href="/articles" hrefLabel="記事一覧へ" />
          {articles.length ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <li key={a.id}>
                  <Link href={`/articles/${a.slug}`} className="card block h-full p-5 transition hover:border-brand-500 hover:shadow-md">
                    <time className="text-xs text-muted" dateTime={a.published_at ?? undefined}>{formatDate(a.published_at ?? a.created_at)}</time>
                    <h3 className="mt-1 text-base leading-snug">{a.title}</h3>
                    {a.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-7">{a.excerpt}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>記事は準備中です。</Empty>
          )}
        </div>
      </section>

      {/* サイト説明 */}
      <section className="section border-y border-line bg-brand-50/50">
        <div className="container-page max-w-4xl">
          <h2 className="h-section mb-4">{SITE_NAME}について</h2>
          <div className="prose-ja">
            <p>
              {SITE_NAME}は、<strong>成果が発生するまで料金が発生しないサービス</strong>を探したい企業のための、検索・比較メディアです。
              月額固定費のサービスではなく、アポイント獲得・商談・成約・採用決定など、成果に応じて費用が発生するサービスだけを集め、成果地点・初期費用・月額費用・成果報酬額を同じ基準で見比べられるようにしています。
            </p>
            <p>
              掲載情報は公開情報（公式サイト・公式のプレスリリースなど）をもとに編集部が作成しています。確認できていない項目は「要問い合わせ」と表示し、推測で金額や条件を掲載することはしません。
              人気ランキングは、閲覧数やユーザーの行動データをもとに算出しており、掲載企業の広告費では決まりません。
            </p>
            <p><Link href="/about">掲載方針・ランキングの算出方法を見る →</Link></p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-page max-w-4xl">
          <h2 className="h-section mb-6">よくある質問</h2>
          <FaqList items={FAQ} />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
