import type { Metadata } from "next";
import Link from "next/link";
import { CostCompare } from "@/components/CostCompare";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { SearchBox } from "@/components/SearchBox";
import { SectionHead } from "@/components/SectionHead";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQ, VALUE_PROPS } from "@/lib/content";
import { getArticles, getCategories, getServices, servicesInCategory } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { getPopularServices } from "@/lib/popular";
import { RANKING_NOTE } from "@/lib/ranking";
import { buildMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({ title: SITE_TITLE, titleAbsolute: true, description: SITE_DESCRIPTION, path: "/" });

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-sm text-muted">{children}</p>;
}

/** 固定費で外注するリスク（詳細は記事 fixed-fee-outsourcing-risks） */
const FIXED_FEE_RISKS = [
  { title: "成果が出なくても、費用は出ていく", body: "固定費は「稼働」に対する支払いです。アポイントが取れなくても、広告の獲得が増えなくても、採用が決まらなくても、請求額は変わりません。成果が出ないリスクは、すべて発注側が負います。" },
  { title: "費用が先に出て、資金繰りを圧迫する", body: "初期費用と月額費用は、成果が出る前から発生します。成果が出るまでの期間が長いほど、先行して出ていく金額は膨らみます。少人数で事業を回す企業ほど重い負担です。" },
  { title: "最低契約期間で、やめどきを失う", body: "3か月・6か月といった最低契約期間があると、成果が見えなくても支払いは続きます。見直しのタイミングを逃し、気づけば惰性で継続していることもあります。" },
  { title: "受託側と、成果に向かう動機がずれる", body: "稼働に対して報酬が支払われる構造では、受託側の売上は成果と直接つながりません。成果にこだわる会社も多いものの、仕組みの上では「成果が出なくても報酬は得られる」状態です。" },
] as const;

const CONFIDENCE = [
  { title: "成果が出なければ、収益にならない", body: "稼働しても報酬は発生しません。成果の出し方に再現性がなければ、事業として続けられない料金体系です。" },
  { title: "コストは、提供側が先に負担する", body: "人件費・広告費・制作費などを先に負担し、成果が出たときに初めて売上になります。リスクは提供側が引き受けています。" },
  { title: "発注側と、同じ方向を向ける", body: "成果が出ることが双方の利益になります。成果を出すことへの動機が、仕組みの上で働きます。" },
] as const;

const CHECKS = [
  { title: "何が「成果」か", body: "アポイント獲得か、商談実施か、成約か。成果の定義で、支払う時期も金額も変わります。" },
  { title: "「0円」に条件がないか", body: "予算が一定額以上なら初期費用無料など、条件付きの場合があります。料金タイルと詳細ページで確認できます。" },
  { title: "単価・手数料・上限", body: "成果報酬の単価のほか、管理費、最低金額、返金条件も比べるポイントです。" },
] as const;

export default async function HomePage() {
  const [categories, services, articles] = await Promise.all([getCategories(), getServices(), getArticles()]);
  const popular = (await getPopularServices(services)).slice(0, 6);
  const fullSuccess = services.filter((s) => s.is_full_success_fee);
  const newest = [...services].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 3);
  const countOf = (id: string) => servicesInCategory(services, categories, id).length;
  const topCategories = categories.filter((c) => !c.parent_id && countOf(c.id) > 0);
  const filters = [
    { href: "/services?zero_initial=1", label: "初期費用0円", count: services.filter((s) => s.initial_fee_type === "free").length },
    { href: "/services?zero_monthly=1", label: "月額費用0円", count: services.filter((s) => s.monthly_fee_type === "free").length },
    { href: "/services?full=1", label: "完全成果報酬", count: fullSuccess.length },
    { href: "/services?consult=1", label: "無料相談あり", count: services.filter((s) => s.has_free_consultation).length },
  ];
  const riskArticle = articles.find((a) => a.slug === "fixed-fee-outsourcing-risks");
  const confidenceArticle = articles.find((a) => a.slug === "why-performance-based-services-are-confident");

  return (
    <>
      {/* ───── ファーストビュー ───── */}
      <section className="border-b border-line">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 py-12 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold text-brand-700">成果報酬で頼めるサービスの比較サイト</p>
            <h1 className="mt-4 text-[2.1rem] leading-[1.4] sm:text-[3.4rem] sm:leading-[1.35]">
              <span className="marker">初期費用なし</span>、<wbr />
              リスクなしで、<wbr />
              事業を推進。
            </h1>
            <p className="mt-6 max-w-xl text-base leading-9 sm:text-lg">
              営業代行、広告運用、採用、補助金申請。外注するなら、成果が出たときだけ支払うサービスを選べば、動き出す前の固定費の不安は小さくなります。条件をそろえて、まとめて比べられます。
            </p>
            <div className="mt-8 max-w-xl">
              <SearchBox size="lg" id="hero-search" placeholder="例：営業代行、広告運用、SEO、人材紹介" />
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/services" className="btn-primary px-7 py-3.5 text-base">成果報酬サービスを探す</Link>
                <Link href="/services?full=1" className="text-sm font-bold text-brand-700 underline underline-offset-4">完全成果報酬のサービスだけを見る</Link>
              </div>
            </div>
          </div>

          <aside aria-label="完全成果報酬のサービス">
            <p className="border-b-2 border-ink pb-2 text-sm font-bold text-ink">完全成果報酬のサービス（一部）</p>
            {fullSuccess.length ? (
              <ul className="divide-y divide-line">
                {fullSuccess.slice(0, 4).map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.slug}`} className="group block py-4">
                      <p className="font-bold text-ink group-hover:underline">{s.name}</p>
                      <p className="mt-0.5 text-xs text-muted">成果地点：{s.success_condition ?? "要問い合わせ"}</p>
                      <p className="mt-2 text-sm"><span className="font-bold text-good-700">初期費用 0円</span><span className="mx-2 text-line">|</span><span className="font-bold text-good-700">月額 0円</span></p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p className="py-6 text-sm text-muted">掲載準備中です。</p>}
            <p className="border-t border-line pt-3 text-xs leading-6 text-muted">「完全成果報酬」は、固定費・月額費用がなく、成果発生時のみ費用が発生するサービスです。<Link href="/services?full=1" className="ml-1 font-bold text-brand-700 underline">一覧を見る</Link></p>
          </aside>
        </div>
      </section>

      {/* ───── 固定費で外注するリスク ───── */}
      <section className="section">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 className="text-2xl leading-snug sm:text-[2rem] sm:leading-snug">固定費で外注する<wbr />ことの、リスク。</h2>
            <p className="mt-5 text-sm leading-8 sm:text-base">営業代行も、広告運用も、採用支援も。月額の固定費で頼むと、成果が出る前から支払いが始まります。事業を前に進めるはずの外注が、固定費という負担になることがあります。</p>
            {riskArticle && <p className="mt-5"><Link href={`/articles/${riskArticle.slug}`} className="text-sm font-bold text-brand-700 underline underline-offset-4">固定費で外注するリスクを詳しく読む →</Link></p>}
          </div>
          <ol className="border-t-2 border-ink">
            {FIXED_FEE_RISKS.map((r, i) => (
              <li key={r.title} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-line py-6">
                <span className="font-serif text-xl font-bold text-good-700" aria-hidden="true">{i + 1}</span>
                <div><h3 className="text-lg leading-snug">{r.title}</h3><p className="mt-2 text-sm leading-8">{r.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── 成果報酬だと何が変わるか ───── */}
      <section className="section border-y border-line bg-soft">
        <div className="container-page">
          <SectionHead title="成果報酬なら、支払いは「成果が出たとき」だけ。" lead="成果が出るまで費用が発生しない（または抑えられる）料金体系です。事業を始める前の固定費リスクを小さくできます。" />
          <CostCompare />
        </div>
      </section>

      {/* ───── 成果報酬にできるのは自信があるから ───── */}
      <section className="section">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold text-brand-700">編集部より</p>
            <h2 className="mt-3 text-2xl leading-snug sm:text-[2rem] sm:leading-snug">成果報酬で提供できるのは、<wbr />サービスに自信があるから。</h2>
            <p className="mt-5 text-sm leading-8 sm:text-base">成果が出なければ、報酬は受け取れない。提供する側にとって、成果報酬は決して楽な料金体系ではありません。それでも成果報酬で引き受けるのは、成果を出せる自信と、それを支えるノウハウがあるからです。</p>
            {confidenceArticle && <p className="mt-5"><Link href={`/articles/${confidenceArticle.slug}`} className="text-sm font-bold text-brand-700 underline underline-offset-4">成果報酬の見極めポイントを読む →</Link></p>}
          </div>
          <div>
            <ul className="border-t-2 border-ink">
              {CONFIDENCE.map((c) => (
                <li key={c.title} className="border-b border-line py-5">
                  <h3 className="text-lg leading-snug">{c.title}</h3>
                  <p className="mt-2 text-sm leading-8">{c.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l-4 border-good-700 bg-good-50 p-4 text-sm leading-8">
              ただし、自信の「根拠」は確認が必要です。実績、成果の定義、単価、返金条件。{SITE_NAME}では、これらを同じ基準で並べて比べられます。
            </p>
          </div>
        </div>
      </section>

      {/* ───── 探す理由 ───── */}
      <section className="section border-y border-line bg-soft">
        <div className="container-page">
          <SectionHead title="成果報酬サービスを探す理由" />
          <ul className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {VALUE_PROPS.map((v) => (
              <li key={v.title} className="border-t border-ink pt-4">
                <h3 className="text-lg">{v.title}</h3>
                <p className="mt-2 text-sm leading-8">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── カテゴリ ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead title="カテゴリから探す" lead="営業・マーケティング・採用・資金調達など、成果報酬で依頼できるサービスをカテゴリ別に比較できます。" href="/services" hrefLabel="サービス一覧へ" />
          <ul className="border-t border-line">
            {topCategories.map((c) => {
              const children = categories.filter((x) => x.parent_id === c.id);
              return (
                <li key={c.id} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[14rem_1fr_6rem] sm:items-center sm:gap-6">
                  <h3 className="font-serif text-xl"><Link href={`/category/${c.slug}`} className="hover:text-brand-700 hover:underline">成果報酬型の{c.name}</Link></h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {children.map((ch) => <li key={ch.id}><Link href={`/category/${ch.slug}`} className="text-body underline-offset-4 hover:text-brand-700 hover:underline">{ch.name}</Link></li>)}
                  </ul>
                  <p className="text-sm text-muted sm:text-right">{countOf(c.id)}サービス</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───── 人気サービス ───── */}
      <section className="section border-y border-line bg-soft">
        <div className="container-page">
          <SectionHead title="人気の成果報酬サービス" lead={`${RANKING_NOTE}（直近30日）。広告費の支払額では順位を決めていません。`} href="/services" hrefLabel="サービス一覧へ" />
          {popular.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popular.map((s, i) => <li key={s.id}><ServiceCard service={s} categories={categories} rank={i + 1} compact /></li>)}
            </ul>
          ) : <Empty>掲載準備中です。</Empty>}
        </div>
      </section>

      {/* ───── 完全成果報酬 ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead title="完全成果報酬サービス" lead="固定費・月額費用がなく、成果発生時のみ費用が発生するサービス。初期費用・月額費用の両方が0円と確認できたものだけを掲載しています。" href="/services?full=1" hrefLabel="完全成果報酬をすべて見る" />
          {fullSuccess.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {fullSuccess.slice(0, 3).map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} compact /></li>)}
            </ul>
          ) : <Empty>現在、掲載準備中です。</Empty>}
        </div>
      </section>

      {/* ───── 条件で探す ───── */}
      <section className="border-y border-line bg-soft py-10">
        <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="font-serif text-lg font-bold text-ink">料金条件から探す</p>
          <ul className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <li key={f.label}><Link href={f.href} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-ink/30 bg-white px-4 text-sm font-bold text-ink hover:border-ink">{f.label}<span className="font-normal text-muted">{f.count}</span></Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── 新着 ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead title="新着サービス" href="/services?sort=new" />
          {newest.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {newest.map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} compact /></li>)}
            </ul>
          ) : <Empty>掲載準備中です。</Empty>}
        </div>
      </section>

      {/* ───── 選ぶときの注意 ───── */}
      <section className="section border-y border-line bg-soft">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 className="text-2xl leading-snug sm:text-[1.75rem] sm:leading-snug">選ぶ前に、<wbr />確認したい3つのこと。</h2>
            <p className="mt-4 text-sm leading-8">「成果報酬」の中身はサービスごとに違います。リスクを小さくするために、次の点を比べましょう。</p>
            <p className="mt-4"><Link href="/articles/full-performance-based-pricing-checklist" className="text-sm font-bold text-brand-700 underline underline-offset-4">チェックポイントを読む →</Link></p>
          </div>
          <ol className="border-t-2 border-ink">
            {CHECKS.map((c, i) => (
              <li key={c.title} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-line py-5">
                <span className="font-serif text-xl font-bold text-brand-700" aria-hidden="true">{i + 1}</span>
                <div><h3 className="text-lg">{c.title}</h3><p className="mt-1.5 text-sm leading-8">{c.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── 記事 ───── */}
      <section className="section">
        <div className="container-page">
          <SectionHead title="成果報酬サービスに関する記事" href="/articles" hrefLabel="記事一覧へ" />
          {articles.length ? (
            <ul className="border-t border-line">
              {articles.slice(0, 4).map((a) => (
                <li key={a.id} className="border-b border-line">
                  <Link href={`/articles/${a.slug}`} className="group grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <time className="text-sm text-muted" dateTime={a.published_at ?? undefined}>{formatDate(a.published_at ?? a.created_at)}</time>
                    <div><h3 className="text-base leading-snug group-hover:underline">{a.title}</h3>{a.excerpt && <p className="mt-1.5 line-clamp-2 text-sm leading-7">{a.excerpt}</p>}</div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <Empty>記事は準備中です。</Empty>}
        </div>
      </section>

      {/* ───── サイト説明 ───── */}
      <section className="section border-y border-line bg-soft">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 className="text-2xl sm:text-[1.75rem]">{SITE_NAME}について</h2>
            <p className="mt-4 text-sm leading-8">初期費用なし・リスクなしで事業を推進したい企業のための、成果報酬サービスの比較メディアです。</p>
            <Link href="/about" className="btn-ghost mt-5">掲載方針・ランキングの算出方法</Link>
          </div>
          <dl className="border-t-2 border-ink">
            {[
              ["公開情報をもとに編集", "公式サイト・公式のプレスリリースなどをもとに編集部が作成。確認できない項目は「要問い合わせ」と表示します。"],
              ["ランキングは行動データで算出", "閲覧数・公式サイトのクリック率などをもとに算出し、広告費の支払額では決めません。"],
              ["提携の有無を明示", "広告契約などの提携がある場合は、該当サービスに明示します。未提携のサービスを提携しているように見せません。"],
              ["情報更新日を表示", "各サービスページに情報更新日を掲載。最新の料金・条件は公式サイトでご確認ください。"],
            ].map(([t, b]) => (
              <div key={t} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[13rem_1fr] sm:gap-6"><dt className="font-bold text-ink">{t}</dt><dd className="text-sm leading-7">{b}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="section">
        <div className="container-page max-w-4xl">
          <SectionHead title="よくある質問" />
          <FaqList items={FAQ} />
        </div>
      </section>

      {/* ───── 最終CTA ───── */}
      <section className="bg-brand-600 py-14 text-white sm:py-20">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-2xl leading-snug !text-white sm:text-[2rem] sm:leading-snug">まずは、固定費の心配なく<wbr />始められるサービスを探す。</h2>
            <p className="mt-4 text-sm leading-8 text-white/80">営業・マーケティング・採用・資金調達。成果報酬で依頼できるサービスを、条件で絞り込んで比較できます。</p>
          </div>
          <div><SearchBox size="lg" id="cta-search" placeholder="例：営業代行、広告運用、SEO、人材紹介" /></div>
        </div>
      </section>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    </>
  );
}
