import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { CostCompare } from "@/components/CostCompare";
import { BulkRequestBar } from "@/components/BulkRequestBar";
import { FaqList } from "@/components/FaqList";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
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
  const heroPhoto = existsSync(path.join(process.cwd(), "public/hero/person.jpg"));
  const categoryCount = categories.filter((c) => servicesInCategory(services, categories, c.id).length > 0).length;

  return (
    <>
      {/* ───── FV ───── */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.04)_0_2px,transparent_2px_14px)] lg:block" />
        <div className="container-page relative grid grid-cols-[minmax(0,1fr)] gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12 lg:py-14">
          <div>
            <p className="text-sm font-bold tracking-wide text-cta-500 sm:text-base">初期費用なし・リスクなしで事業を推進</p>
            <h1 className="mt-3 text-[2.1rem] font-black leading-[1.2] text-white sm:text-[3.4rem] sm:leading-[1.15]">
              払うのは、<br />実績が出た<wbr />分だけ。
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-brand-100 sm:text-base sm:leading-8">
              再生数・問い合わせ数・アポ数・採用数に応じて課金される<b className="text-white">{services.length}サービス</b>を、月額の固定費なしで比較。成果が出るかわからない段階で、毎月の固定費を払い続ける必要はありません。
            </p>
            <p className="mt-7 flex flex-wrap gap-3">
              <Link href="#all-categories" className="btn btn-cta min-h-12 px-6 text-base">カテゴリから探す</Link>
              <Link href="/services" className="btn min-h-12 border border-white/40 px-6 text-base text-white hover:bg-white hover:text-brand-700">サービス一覧を見る</Link>
            </p>
            <ul className="mt-8 flex items-center gap-4 sm:gap-6" aria-label="掲載の規模">
              {[[services.length, "件", "掲載サービス"], [categoryCount, "種", "カテゴリ"]].map(([n, u, l]) => (
                <li key={l as string} className="flex size-[6.5rem] shrink-0 flex-col items-center justify-center rounded-full bg-gold text-navy-950 ring-4 ring-gold/30 ring-offset-2 ring-offset-brand-900 sm:size-28">
                  <span className="text-[11px] font-bold leading-none sm:text-xs">{l}</span>
                  <span className="mt-1 leading-none"><b className="text-[2rem] font-black sm:text-4xl">{n}</b><span className="text-xs font-bold sm:text-sm">{u}</span></span>
                </li>
              ))}
            </ul>
          </div>

          {heroPhoto ? (
            <div className="relative mx-auto w-full max-w-md self-end lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/person.jpg" alt="スーツ姿の男性のイメージ写真" width={720} height={820} className="aspect-[4/4.2] w-full rounded-md object-cover object-top" />
              <p className="absolute bottom-3 right-3 rounded-sm bg-brand-900/80 px-2 py-1 text-[10px] text-white">イメージ写真</p>
            </div>
          ) : (
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
                  <Link href="/services?full=1" className="bg-white px-3 py-3 text-brand-700 hover:bg-brand-50">完全成果報酬のサービス</Link>
                  <Link href="/services" className="bg-white px-3 py-3 text-brand-700 hover:bg-brand-50">すべて見る</Link>
                </div>
              </div>
            </aside>
          )}
        </div>
        <div className="relative border-t border-white/15 bg-black/15">
          <div className="container-page py-5 sm:py-6">
            <p className="mb-3 text-sm font-bold text-white">カテゴリから探す</p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {topCategories.filter((c) => countOf(c.id) > 0).map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.slug}`} className="flex h-full flex-col rounded-sm border border-white/20 bg-white/5 p-3 text-white hover:bg-white hover:text-brand-700">
                    <span className="flex items-center gap-2 text-sm font-bold"><Icon name={c.icon ?? "other"} className="size-5 shrink-0" /><span className="min-w-0 flex-1 leading-tight">{c.name}</span></span>
                    <span className="mt-1 text-[11px] opacity-80">{countOf(c.id)}件</span>
                    <span className="mt-1 line-clamp-2 text-[11px] leading-snug opacity-80">{childrenOf(c.id).slice(0, 3).map((x) => x.name).join("・")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
