import type { Metadata } from "next";
import Link from "next/link";
import { CostCompare } from "@/components/CostCompare";
import { BulkRequestBar } from "@/components/BulkRequestBar";
import { FaqList } from "@/components/FaqList";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { SearchBox } from "@/components/SearchBox";
import { SectionHead } from "@/components/SectionHead";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQ } from "@/lib/content";
import { getArticles, getCategories, getServices, servicesInCategory } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { getPopularServices } from "@/lib/popular";
import { RANKING_NOTE } from "@/lib/ranking";
import { buildMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({ title: SITE_TITLE, titleAbsolute: true, description: SITE_DESCRIPTION, path: "/" });

const FIXED_FEE_RISKS = [
  ["成果が出なくても、毎月の費用は出ていく", "固定費は「稼働」への支払いです。成果が出なくても請求額は変わらず、成果が出ないリスクはすべて発注側が負います。"],
  ["費用が先に出て、資金繰りを圧迫する", "初期費用と月額費用は成果が出る前から発生します。成果が出るまでが長いほど、先行して出ていく金額は膨らみます。"],
  ["最低契約期間で、やめどきを失う", "3か月・6か月といった最低契約期間があると、成果が見えなくても支払いは続きます。"],
  ["受託側と、成果に向かう動機がずれる", "稼働に対して報酬が支払われる構造では、受託側の売上は成果と直接つながりません。"],
] as const;

const CONFIDENCE = [
  ["成果が出なければ、収益にならない", "稼働しても報酬は発生しません。成果の出し方に再現性がなければ続けられない料金体系です。"],
  ["コストは、提供側が先に負担する", "人件費・広告費・制作費などを先に負担し、成果が出たときに初めて売上になります。"],
  ["発注側と、同じ方向を向ける", "成果が出ることが双方の利益になり、成果を出すことへの動機が仕組みの上で働きます。"],
] as const;

const CHECKS = [
  ["何が「成果」か", "再生数や問い合わせ数か、アポ獲得か、成約か。何を数えて課金するかで、支払う時期も金額も変わります。売上に連動しない成果もあります。"],
  ["「0円」に条件がないか", "予算が一定額以上なら初期費用無料など、条件付きの場合があります。"],
  ["単価・手数料・上限", "成果報酬の単価のほか、管理費、最低金額、返金条件も比べましょう。"],
] as const;

export default async function HomePage() {
  const [categories, services, articles] = await Promise.all([getCategories(), getServices(), getArticles()]);
  const popular = (await getPopularServices(services)).slice(0, 5);
  const fullSuccess = services.filter((s) => s.is_full_success_fee);
  const newest = [...services].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);
  const countOf = (id: string) => servicesInCategory(services, categories, id).length;
  const topCategories = categories.filter((c) => !c.parent_id);
  const childrenOf = (id: string) => categories.filter((c) => c.parent_id === id).sort((a, b) => a.sort_order - b.sort_order);
  const catName = (id: string | null) => categories.find((c) => c.id === id)?.name;
  const keywords = ["営業代行", "テレアポ", "広告運用", "SEO", "人材紹介", "採用代行", "補助金"];

  return (
    <>
      {/* ───── FV ───── */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.04)_0_2px,transparent_2px_14px)] lg:block" />
        <div className="container-page relative grid grid-cols-[minmax(0,1fr)] gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12 lg:py-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-brand-100 sm:text-sm">
              <span className="size-1.5 rounded-full bg-cta-500" />成果報酬サービス比較メディア
            </p>
            <h1 className="mt-4 text-[2rem] font-black leading-[1.25] text-white sm:text-5xl sm:leading-[1.2]">
              <span className="text-cta-500">初期費用なし</span>、<br className="hidden sm:block" />リスクなしで<wbr />事業を推進。
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-brand-100 sm:text-base sm:leading-8">
              再生数・問い合わせ数・アポ数・採用数など、<b className="text-white">実績に応じて支払う</b>サービスだけを集めました。月額の固定費なしで、営業・マーケティング・採用・資金調達までまとめて比較できます。
            </p>
            <div className="mt-6 max-w-2xl">
              <SearchBox size="lg" id="hero-search" placeholder="例：営業代行、広告運用、SEO、人材紹介" />
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                <span className="font-bold text-brand-100">人気のキーワード</span>
                {keywords.map((k) => <Link key={k} href={`/services?q=${encodeURIComponent(k)}`} className="rounded-full border border-white/30 px-3 py-1 text-white hover:bg-white hover:text-brand-700">{k}</Link>)}
              </p>
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/20 border-y border-white/20 py-4 text-center">
              <div className="px-2"><dt className="text-[11px] text-brand-100 sm:text-xs">掲載サービス</dt><dd className="mt-1 font-black"><span className="text-3xl sm:text-4xl">{services.length}</span><span className="ml-0.5 text-xs sm:text-sm">件</span></dd></div>
              <div className="px-2"><dt className="text-[11px] text-brand-100 sm:text-xs">完全成果報酬</dt><dd className="mt-1 font-black"><span className="text-3xl text-cta-500 sm:text-4xl">{fullSuccess.length}</span><span className="ml-0.5 text-xs sm:text-sm">件</span></dd></div>
              <div className="px-2"><dt className="text-[11px] text-brand-100 sm:text-xs">カテゴリ</dt><dd className="mt-1 font-black"><span className="text-3xl sm:text-4xl">{categories.filter((c) => servicesInCategory(services, categories, c.id).length > 0).length}</span><span className="ml-0.5 text-xs sm:text-sm">種</span></dd></div>
            </dl>
          </div>

          <aside aria-label="注目のサービス" className="self-center">
            <div className="rounded-md bg-white text-ink shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)]">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="font-black">注目のサービス</p>
                <Link href="#ranking" className="text-xs font-bold text-brand-700 hover:underline">ランキングを見る</Link>
              </div>
              <ol className="divide-y divide-line">
                {popular.slice(0, 3).map((s, i) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.slug}`} className="block px-4 py-3 hover:bg-brand-50">
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm text-sm font-black text-white ${["bg-gold", "bg-silver", "bg-bronze"][i]}`}>{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-bold">{s.name}</p>
                          <p className="truncate text-xs text-muted">{s.company_name}</p>
                          <ul className="mt-2 grid grid-cols-3 gap-1 text-center text-[11px] leading-tight">
                            <li className="rounded-sm bg-surface px-1 py-1.5"><span className="block text-muted">初期費用</span><b className={s.initial_fee_type === "free" ? "text-good-700" : "text-ink"}>{s.initial_fee_type === "free" ? "0円" : s.initial_fee_type === "paid" ? "あり" : "要確認"}</b></li>
                            <li className="rounded-sm bg-surface px-1 py-1.5"><span className="block text-muted">月額</span><b className={s.monthly_fee_type === "free" ? "text-good-700" : "text-ink"}>{s.monthly_fee_type === "free" ? "0円" : s.monthly_fee_type === "paid" ? "あり" : "要確認"}</b></li>
                            <li className="rounded-sm bg-surface px-1 py-1.5"><span className="block text-muted">成果課金</span><b className="text-ink">{s.pricing_model === "optional_plan" ? "プラン有" : s.success_fee ? "あり" : "要確認"}</b></li>
                          </ul>
                          <p className="mt-2 line-clamp-1 text-xs text-body">成果地点：{s.success_condition ?? "要問い合わせ"}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
              <div className="grid grid-cols-2 gap-px border-t border-line bg-line text-center text-sm font-bold">
                <Link href="/services?full=1" className="bg-white px-3 py-3 text-brand-700 hover:bg-brand-50">完全成果報酬 {fullSuccess.length}件</Link>
                <Link href="/services" className="bg-white px-3 py-3 text-brand-700 hover:bg-brand-50">すべて見る</Link>
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-brand-100 sm:text-xs">
              <li className="rounded-sm border border-white/20 px-2 py-2">固定費を<br />かけない</li>
              <li className="rounded-sm border border-white/20 px-2 py-2">実績に応じて<br />支払う</li>
              <li className="rounded-sm border border-white/20 px-2 py-2">まとめて<br />資料請求</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ───── 全カテゴリ ───── */}
      <section className="border-b border-line bg-white py-8 sm:py-10" aria-labelledby="all-categories">
        <div className="container-page">
          <SectionHead title={<span id="all-categories">カテゴリから探す</span>} lead="実績に応じた課金で依頼できるサービスを、カテゴリ別に探せます。" href="/services" hrefLabel="サービス一覧" />
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topCategories.map((c) => (
              <li key={c.id} className="panel overflow-hidden">
                <Link href={`/category/${c.slug}`} className="flex items-center gap-2.5 bg-brand-700 px-4 py-2.5 font-bold text-white hover:bg-brand-600">
                  <Icon name={c.icon ?? "other"} className="size-5" />
                  <span className="flex-1">{c.name}</span>
                  <span className="text-xs font-normal text-white/80">{countOf(c.id)}件</span>
                </Link>
                {childrenOf(c.id).length > 0 ? (
                  <ul className="divide-y divide-line">
                    {childrenOf(c.id).map((ch) => (
                      <li key={ch.id} className="px-4 py-2">
                        <Link href={`/category/${ch.slug}`} className="flex items-center justify-between text-sm font-bold text-ink hover:text-brand-700 hover:underline">
                          {ch.name}<span className={`text-xs font-normal ${countOf(ch.id) ? "text-muted" : "text-slate-400"}`}>{countOf(ch.id) ? `${countOf(ch.id)}件` : "準備中"}</span>
                        </Link>
                        {childrenOf(ch.id).length > 0 && (
                          <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 pl-2 text-xs">
                            {childrenOf(ch.id).map((g) => (
                              <li key={g.id}><Link href={`/category/${g.slug}`} className="text-body hover:text-brand-700 hover:underline">└ {g.name}<span className="text-muted">（{countOf(g.id)}）</span></Link></li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-sm text-muted">{countOf(c.id) ? "このカテゴリのサービスを見る" : "掲載準備中です"}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── メイン + サイドバー ───── */}
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-8">
        <div className="min-w-0 space-y-12">
          {/* 人気ランキング */}
          <section aria-labelledby="ranking">
            <SectionHead title={<span id="ranking">人気の成果報酬サービスランキング</span>} lead={`${RANKING_NOTE}（直近30日）。広告費の支払額では順位を決めていません。`} href="/services" hrefLabel="サービス一覧" />
            <nav aria-label="カテゴリ別ランキング" className="mb-3 flex flex-wrap gap-1 border-b-2 border-brand-600 text-sm font-bold">
              <span className="rounded-t bg-brand-600 px-4 py-2 text-white">総合</span>
              {topCategories.map((c) => <Link key={c.id} href={`/category/${c.slug}`} className="rounded-t bg-surface px-4 py-2 text-ink hover:bg-brand-50 hover:text-brand-700">{c.name}</Link>)}
            </nav>
            {popular.length > 0 && <BulkRequestBar label="ランキング上位" items={popular.map((r) => ({ id: r.id, slug: r.slug, name: r.name }))} />}
            {popular.length ? (
              <ul className="space-y-3">{popular.map((s, i) => <li key={s.id}><ServiceCard service={s} categories={categories} rank={i + 1} /></li>)}</ul>
            ) : <p className="panel p-8 text-center text-sm text-muted">掲載準備中です。</p>}
          </section>

          {/* 固定費のリスク / 成果報酬の自信 */}
          <section aria-labelledby="risk">
            <SectionHead title={<span id="risk">固定費で外注することの、リスク</span>} lead="月額の固定費で頼むと、再生数・問い合わせ数などの実績が出る前から支払いが始まります。" href="/articles/fixed-fee-outsourcing-risks" hrefLabel="詳しく読む" />
            <div className="panel p-4 sm:p-5">
              <ol className="grid gap-px bg-line sm:grid-cols-2">
                {FIXED_FEE_RISKS.map(([t, b], i) => (
                  <li key={t} className="bg-white p-4">
                    <p className="flex items-start gap-2 font-bold text-ink"><span className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm bg-good-700 text-xs text-white">{i + 1}</span>{t}</p>
                    <p className="mt-2 text-sm leading-7">{b}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-5"><CostCompare /></div>
            </div>
          </section>

          <section aria-labelledby="confidence">
            <SectionHead title={<span id="confidence">成果報酬で提供できるのは、サービスに自信があるから</span>} href="/articles/why-performance-based-services-are-confident" hrefLabel="見極めのポイント" />
            <div className="panel p-4 sm:p-5">
              <p className="text-sm leading-8 sm:text-base">再生数・問い合わせ数・アポ数といった実績が出なければ、報酬は受け取れない。提供する側にとって、成果報酬は決して楽な料金体系ではありません。それでも成果報酬で引き受けるのは、<b className="text-ink">成果を出せる自信と、それを支えるノウハウがある</b>からです。</p>
              <ul className="mt-4 grid gap-px bg-line sm:grid-cols-3">
                {CONFIDENCE.map(([t, b]) => (
                  <li key={t} className="bg-white p-4"><p className="font-bold text-ink">{t}</p><p className="mt-2 text-sm leading-7">{b}</p></li>
                ))}
              </ul>
              <p className="mt-4 border-l-4 border-cta-500 bg-warn-50 p-3 text-sm leading-7">ただし、自信の「根拠」は確認が必要です。実績、成果の定義、単価、返金条件。{SITE_NAME}では、これらを同じ基準で並べて比べられます。</p>
            </div>
          </section>

          {/* 完全成果報酬 */}
          <section aria-labelledby="full">
            <SectionHead title={<span id="full">完全成果報酬サービス</span>} lead="固定費・月額費用がなく、実績の発生に応じてのみ費用が発生するサービス。初期費用・月額費用の両方が0円と確認できたものだけを掲載しています。" href="/services?full=1" hrefLabel="完全成果報酬をすべて見る" />
            {fullSuccess.length ? (
              <ul className="space-y-3">{fullSuccess.slice(0, 3).map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} /></li>)}</ul>
            ) : <p className="panel p-8 text-center text-sm text-muted">現在、掲載準備中です。</p>}
          </section>

          {/* 新着 */}
          <section aria-labelledby="new">
            <SectionHead title={<span id="new">新着サービス</span>} href="/services?sort=new" />
            <ul className="panel divide-y divide-line">
              {newest.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="grid gap-1 px-4 py-3 hover:bg-brand-50 sm:grid-cols-[1fr_auto] sm:items-center">
                    <span><b className="text-brand-700">{s.name}</b><span className="ml-2 text-xs text-muted">{s.company_name}</span></span>
                    <span className="flex flex-wrap gap-1.5 text-xs">
                      {s.is_full_success_fee && <span className="tag bg-brand-700 text-white">完全成果報酬</span>}
                      {s.initial_fee_type === "free" && <span className="tag bg-good-50 text-good-700 ring-1 ring-good-100">初期費用0円</span>}
                      <span className="text-muted">{s.success_condition}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 選ぶ前の確認 */}
          <section aria-labelledby="check">
            <SectionHead title={<span id="check">選ぶ前に確認したい3つのこと</span>} href="/articles/full-performance-based-pricing-checklist" hrefLabel="チェックポイントを読む" />
            <ol className="panel divide-y divide-line">
              {CHECKS.map(([t, b], i) => (
                <li key={t} className="flex gap-3 p-4"><span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span><div><p className="font-bold text-ink">{t}</p><p className="mt-1 text-sm leading-7">{b}</p></div></li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="faq">
            <SectionHead title={<span id="faq">よくある質問</span>} />
            <FaqList items={FAQ} />
          </section>
        </div>

        {/* ───── サイドバー ───── */}
        <aside className="space-y-5 lg:sticky lg:top-36 lg:self-start" aria-label="サイドバー">
          <div className="panel">
            <p className="border-b border-line bg-brand-700 px-4 py-2 text-sm font-bold text-white">新着記事</p>
            <ul className="divide-y divide-line">
              {articles.slice(0, 4).map((a) => (
                <li key={a.id}>
                  <Link href={`/articles/${a.slug}`} className="block px-4 py-3 hover:bg-brand-50">
                    <p className="text-[11px] text-muted">{catName(a.category_id) && <span className="mr-2 tag bg-surface text-body">{catName(a.category_id)}</span>}{formatDate(a.published_at ?? a.created_at)}</p>
                    <p className="mt-1 text-sm font-bold leading-snug text-ink">{a.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-4 py-2 text-right text-xs"><Link href="/articles" className="font-bold text-brand-700 hover:underline">記事一覧 ＞</Link></p>
          </div>

          <div className="panel p-4 text-xs leading-6">
            <p className="font-bold text-ink">{SITE_NAME}の掲載方針</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>公開情報をもとに編集部が作成</li>
              <li>ランキングは広告費で決まりません</li>
              <li>確認できない項目は「要問い合わせ」</li>
              <li>提携がある場合は明示します</li>
            </ul>
            <Link href="/about" className="mt-2 inline-block font-bold text-brand-700 hover:underline">詳しく見る ＞</Link>
          </div>
        </aside>
      </div>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    </>
  );
}
