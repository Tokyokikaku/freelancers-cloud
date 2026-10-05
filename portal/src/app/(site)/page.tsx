import type { Metadata } from "next";
import Link from "next/link";
import { CostCompare } from "@/components/CostCompare";
import { FaqList } from "@/components/FaqList";
import { FeeTags } from "@/components/FeeTags";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ServiceLogo } from "@/components/Logo";
import { SearchBox } from "@/components/SearchBox";
import { SectionHead } from "@/components/SectionHead";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQ, VALUE_PROPS } from "@/lib/content";
import { getArticles, getCategories, getServices, servicesInCategory } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { getPopularServices } from "@/lib/popular";
import { RANKING_NOTE } from "@/lib/ranking";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: SITE_TITLE,
  titleAbsolute: true,
  description: SITE_DESCRIPTION,
  path: "/",
});

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-sm text-muted">{children}</p>;
}

const PAINS = [
  { icon: "shield", title: "固定費を払うのは怖い", body: "効果が出るか分からないうちに、毎月の費用や初期費用を払うのは負担が大きい。" },
  { icon: "scale", title: "成果が出た場合だけ払いたい", body: "営業・広告・採用など、結果が出たときにだけ費用が発生する形で依頼したい。" },
  { icon: "layers", title: "どこが成果報酬か探せない", body: "対応しているサービスを1社ずつ調べて、条件を見比べるのは手間がかかる。" },
] as const;

const STEPS = [
  { icon: "search", title: "探す", body: "サービス名・カテゴリ・課題から検索。初期費用0円や完全成果報酬などの条件で絞り込めます。" },
  { icon: "compare", title: "比べる", body: "最大3サービスを横並びで比較。成果地点・料金体系・特徴の違いが一目で分かります。" },
  { icon: "check", title: "確認する", body: "気になるサービスは公式サイトで詳細を確認。資料の案内を希望する場合はフォームから。" },
] as const;

const CHECKS = [
  { title: "「何が成果か」を確認する", body: "アポイント獲得なのか、商談実施なのか、成約なのか。成果の定義で、支払うタイミングも金額も変わります。" },
  { title: "「0円」に条件がないか確認する", body: "予算が一定額以上なら初期費用無料など、条件付きの場合があります。固定費の有無は料金タグと詳細ページで確認できます。" },
  { title: "単価・手数料・上限を確認する", body: "成果報酬の単価のほか、管理費や最低金額、返金条件の有無も比較ポイントです。" },
] as const;

export default async function HomePage() {
  const [categories, services, articles] = await Promise.all([getCategories(), getServices(), getArticles()]);
  const popular = (await getPopularServices(services)).slice(0, 6);
  const fullSuccess = services.filter((s) => s.is_full_success_fee);
  const newest = [...services].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 3);

  const countOf = (id: string) => servicesInCategory(services, categories, id).length;
  // サービスが1件もない大カテゴリはLPには出さない（空の棚を見せない）
  const topCategories = categories.filter((c) => !c.parent_id && countOf(c.id) > 0);
  const heroPanel = fullSuccess.slice(0, 3);

  const stats = [
    { value: services.length, label: "掲載サービス" },
    { value: fullSuccess.length, label: "完全成果報酬" },
    { value: services.filter((s) => s.initial_fee_type === "free").length, label: "初期費用0円" },
    { value: topCategories.length, label: "カテゴリ" },
  ];

  const filters = [
    { href: "/services?zero_initial=1", label: "初期費用0円", count: services.filter((s) => s.initial_fee_type === "free").length },
    { href: "/services?zero_monthly=1", label: "月額費用0円", count: services.filter((s) => s.monthly_fee_type === "free").length },
    { href: "/services?full=1", label: "完全成果報酬", count: fullSuccess.length },
    { href: "/services?consult=1", label: "無料相談あり", count: services.filter((s) => s.has_free_consultation).length },
  ];

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="bg-hero relative overflow-hidden text-white">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-page relative grid grid-cols-[minmax(0,1fr)] gap-12 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-bold text-mint-300">
              <Icon name="scale" className="size-4" /> 成果報酬サービスの比較メディア
            </p>
            <h1 className="mt-6 text-[2rem] leading-[1.35] !text-white sm:text-5xl sm:leading-[1.3]">
              <span className="text-mint-300">初期費用なし</span>、<wbr />
              <span className="text-mint-300">リスクなし</span>で、<wbr />
              事業を推進。
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">
              成果が出たときだけ支払う「成果報酬サービス」を、営業・マーケティング・採用・資金調達からまとめて比較。固定費の心配なく、まず始められるサービスが見つかります。
            </p>
            <div className="mt-8 max-w-xl">
              <SearchBox size="lg" id="hero-search" placeholder="例：営業代行、広告運用、SEO、人材紹介" />
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href="/services" className="btn bg-mint-400 px-7 py-3.5 text-base text-navy-900 hover:bg-mint-300">
                  成果報酬サービスを探す <Icon name="arrow" className="size-4" />
                </Link>
                <Link href="/services?full=1" className="btn border border-white/30 px-6 py-3.5 text-base text-white hover:bg-white/10">完全成果報酬だけを見る</Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                {["公開情報をもとに編集部が作成", "ランキングは広告費で決まりません", "閲覧・検索・比較は無料"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5"><Icon name="check" className="size-4 text-mint-400" />{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 完全成果報酬サービスのピックアップ（実データ） */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-brand-500/20 blur-2xl" aria-hidden="true" />
            <div className="relative rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:p-5">
              <div className="flex items-center justify-between px-1 pb-3">
                <p className="text-sm font-bold text-white">完全成果報酬のサービス</p>
                <Link href="/services?full=1" className="text-xs font-bold text-mint-300 hover:underline">すべて見る →</Link>
              </div>
              {heroPanel.length ? (
                <ul className="space-y-3">
                  {heroPanel.map((s) => (
                    <li key={s.id}>
                      <Link href={`/services/${s.slug}`} className="block rounded-2xl bg-white p-4 text-body shadow-lg transition hover:-translate-y-0.5">
                        <div className="flex items-center gap-3">
                          <ServiceLogo name={s.name} url={s.logo_url} size={44} />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-ink">{s.name}</p>
                            <p className="truncate text-xs text-muted">{s.success_condition ? `成果地点：${s.success_condition}` : s.company_name}</p>
                          </div>
                        </div>
                        <div className="mt-3"><FeeTags service={s} /></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-2xl bg-white/10 p-6 text-center text-sm text-slate-300">掲載準備中です。</p>
              )}
              <p className="px-1 pt-3 text-[11px] leading-5 text-slate-400">「完全成果報酬」は、固定費・月額費用がなく成果発生時のみ費用が発生するサービスです。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 数字 ───── */}
      <section className="container-page relative z-10 -mt-8 sm:-mt-10">
        <dl className="card grid grid-cols-2 divide-x divide-y divide-line overflow-hidden sm:grid-cols-4 sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center sm:py-6">
              <dd className="text-3xl font-bold tracking-tight text-brand-700 sm:text-4xl">{s.value}</dd>
              <dt className="mt-1 text-xs font-bold text-muted sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ───── お悩み ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead center eyebrow="Problem" title={<>固定費の不安で、<wbr />動き出せていませんか？</>} />
          <ul className="grid gap-4 md:grid-cols-3">
            {PAINS.map((p) => (
              <li key={p.title} className="card p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600"><Icon name={p.icon} className="size-6" /></span>
                <h3 className="mt-4 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-7">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center text-center">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-600 text-white" aria-hidden="true"><Icon name="arrow" className="size-5 rotate-90" /></span>
            <p className="mt-3 text-lg font-bold text-ink sm:text-xl">その不安は、<span className="marker">成果報酬サービス</span>で小さくできます。</p>
          </div>
        </div>
      </section>

      {/* ───── 固定費型との違い ───── */}
      <section className="section border-y border-line bg-surface">
        <div className="container-page">
          <SectionHead eyebrow="Difference" title="固定費型サービスとの違い" lead="成果報酬型は、成果が発生するまで費用が発生しない（または抑えられる）料金体系です。事業を始める前の固定費リスクを小さくできます。" />
          <CostCompare />
        </div>
      </section>

      {/* ───── 探す理由 ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead center eyebrow="Reason" title="成果報酬サービスを探す理由" />
          <ul className="grid gap-5 md:grid-cols-3">
            {VALUE_PROPS.map((v, i) => (
              <li key={v.title} className="card card-hover relative p-7">
                <span className="absolute right-6 top-5 text-5xl font-bold text-brand-100" aria-hidden="true">0{i + 1}</span>
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lift"><Icon name={v.icon} className="size-7" /></span>
                <h3 className="mt-5 text-xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-7">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── 使い方 ───── */}
      <section className="section bg-soft border-y border-line">
        <div className="container-page">
          <SectionHead center eyebrow="How it works" title="3ステップで、条件に合うサービスが見つかる" />
          <ol className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card relative p-6">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">{i + 1}</span>
                <div className="mt-4 flex items-center gap-2 text-brand-700"><Icon name={s.icon} className="size-5" /><h3 className="text-lg">{s.title}</h3></div>
                <p className="mt-2 text-sm leading-7">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── カテゴリ ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead eyebrow="Category" title="カテゴリから探す" lead="営業・マーケティング・採用・資金調達など、成果報酬で依頼できるサービスをカテゴリ別に比較できます。" href="/services" hrefLabel="サービス一覧へ" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topCategories.map((c) => {
              const children = categories.filter((x) => x.parent_id === c.id);
              return (
                <li key={c.id} className="card card-hover flex flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><Icon name={c.icon ?? "other"} className="size-6" /></span>
                    <div>
                      <h3 className="text-lg"><Link href={`/category/${c.slug}`} className="after:absolute after:inset-0 hover:text-brand-700">成果報酬型の{c.name}</Link></h3>
                      <p className="text-xs text-muted">{countOf(c.id)}サービス</p>
                    </div>
                  </div>
                  {children.length > 0 && (
                    <ul className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                      {children.map((ch) => (
                        <li key={ch.id}><Link href={`/category/${ch.slug}`} className="tag bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700">{ch.name}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───── 人気サービス ───── */}
      <section className="section bg-surface border-y border-line">
        <div className="container-page">
          <SectionHead eyebrow="Popular" title="人気の成果報酬サービス" lead={`${RANKING_NOTE}（直近30日）。広告費の支払額では順位を決めていません。`} href="/services" hrefLabel="サービス一覧へ" />
          {popular.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popular.map((s, i) => <li key={s.id}><ServiceCard service={s} categories={categories} rank={i + 1} compact /></li>)}
            </ul>
          ) : <Empty>掲載準備中です。</Empty>}
        </div>
      </section>

      {/* ───── 完全成果報酬 ───── */}
      <section className="bg-hero relative overflow-hidden py-14 sm:py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-page relative">
          <SectionHead dark eyebrow="Zero risk" title="完全成果報酬サービス" lead="固定費・月額費用がなく、成果発生時のみ費用が発生するサービス。初期費用・月額費用の両方が0円と確認できたものだけを掲載しています。" href="/services?full=1" hrefLabel="完全成果報酬をすべて見る" />
          {fullSuccess.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {fullSuccess.slice(0, 3).map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} compact /></li>)}
            </ul>
          ) : <p className="rounded-2xl bg-white/10 p-8 text-center text-sm text-slate-300">現在、掲載準備中です。</p>}
        </div>
      </section>

      {/* ───── 条件で探す ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead center eyebrow="Filter" title="料金条件から探す" />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {filters.map((f) => (
              <li key={f.label}>
                <Link href={f.href} className="card card-hover flex h-full flex-col items-center p-5 text-center sm:p-6">
                  <span className="rounded-lg bg-good-100 px-3 py-1 text-sm font-bold text-good-700">{f.label}</span>
                  <span className="mt-3 text-3xl font-bold text-ink">{f.count}<span className="ml-1 text-sm font-normal text-muted">サービス</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── 新着 ───── */}
      <section className="section bg-surface border-y border-line">
        <div className="container-page">
          <SectionHead eyebrow="New" title="新着サービス" href="/services?sort=new" />
          {newest.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {newest.map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} compact /></li>)}
            </ul>
          ) : <Empty>掲載準備中です。</Empty>}
        </div>
      </section>

      {/* ───── 選ぶときの注意 ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead eyebrow="Check" title="成果報酬サービスを選ぶ前に、確認したい3つのこと" lead="「成果報酬」の中身はサービスごとに違います。リスクを小さくするために、次の点を比べましょう。" href="/articles/full-performance-based-pricing-checklist" hrefLabel="チェックポイントを読む" />
          <ol className="grid gap-5 md:grid-cols-3">
            {CHECKS.map((c, i) => (
              <li key={c.title} className="card p-6">
                <span className="text-sm font-bold text-brand-600">POINT {i + 1}</span>
                <h3 className="mt-2 text-lg leading-snug">{c.title}</h3>
                <p className="mt-3 text-sm leading-7">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── 記事 ───── */}
      <section className="section bg-surface border-y border-line">
        <div className="container-page">
          <SectionHead eyebrow="Articles" title="成果報酬サービスに関する記事" href="/articles" hrefLabel="記事一覧へ" />
          {articles.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <li key={a.id}>
                  <Link href={`/articles/${a.slug}`} className="card card-hover block h-full p-6">
                    <time className="text-xs text-muted" dateTime={a.published_at ?? undefined}>{formatDate(a.published_at ?? a.created_at)}</time>
                    <h3 className="mt-2 text-base leading-snug">{a.title}</h3>
                    {a.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-7">{a.excerpt}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : <Empty>記事は準備中です。</Empty>}
        </div>
      </section>

      {/* ───── サイト説明 ───── */}
      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="text-2xl sm:text-3xl">{SITE_NAME}について</h2>
            <p className="mt-4 text-sm leading-8 sm:text-base">初期費用なし・リスクなしで事業を推進したい企業のための、成果報酬サービスの検索・比較メディアです。</p>
            <Link href="/about" className="btn-secondary mt-6">掲載方針・ランキングの算出方法</Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["公開情報をもとに編集", "公式サイト・公式のプレスリリースなどをもとに編集部が作成。確認できない項目は「要問い合わせ」と表示します。"],
              ["ランキングは行動データで算出", "閲覧数・公式サイトのクリック率などをもとに算出し、広告費の支払額では決めません。"],
              ["提携の有無を明示", "広告契約などの提携がある場合は、該当サービスに明示します。未提携のサービスを提携しているように見せません。"],
              ["情報更新日を表示", "各サービスページに情報更新日を掲載。最新の料金・条件は公式サイトでご確認ください。"],
            ].map(([t, b]) => (
              <li key={t} className="card p-5"><p className="flex items-center gap-2 font-bold text-ink"><Icon name="check" className="size-4 text-good-700" />{t}</p><p className="mt-2 text-xs leading-6">{b}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="section bg-surface border-y border-line">
        <div className="container-page max-w-4xl">
          <SectionHead center eyebrow="FAQ" title="よくある質問" />
          <FaqList items={FAQ} />
        </div>
      </section>

      {/* ───── 最終CTA ───── */}
      <section className="bg-hero relative overflow-hidden py-16 text-center text-white sm:py-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="container-page relative">
          <h2 className="mx-auto max-w-3xl text-2xl leading-snug !text-white sm:text-4xl sm:leading-snug">
            まずは、<span className="text-mint-300">固定費の心配なく</span>始められる<wbr />サービスを探してみませんか？
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">営業・マーケティング・採用・資金調達。成果報酬で依頼できるサービスを、条件で絞り込んで比較できます。</p>
          <div className="mx-auto mt-8 max-w-xl"><SearchBox size="lg" id="cta-search" placeholder="例：営業代行、広告運用、SEO、人材紹介" /></div>
          <Link href="/services" className="btn mt-6 bg-mint-400 px-8 py-3.5 text-base text-navy-900 hover:bg-mint-300">成果報酬サービスを探す <Icon name="arrow" className="size-4" /></Link>
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
