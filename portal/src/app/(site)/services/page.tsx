import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FilterPanel } from "@/components/FilterPanel";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { PageEvent } from "@/components/Trackers";
import { getCategories, getServices } from "@/lib/data";
import { getPopularServices } from "@/lib/popular";
import { RANKING_NOTE } from "@/lib/ranking";
import { applyFilters, normalize, parseIntent, searchEngine } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";
import { OUTCOME_LABELS, type OutcomeType } from "@/lib/types";

type Params = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export async function generateMetadata({ searchParams }: { searchParams: Promise<Params> }): Promise<Metadata> {
  const sp = await searchParams;
  const q = one(sp.q).trim();
  const hasParams = Object.values(sp).some((v) => (Array.isArray(v) ? v.length : v));
  return buildMetadata({
    title: q ? `「${q.slice(0, 40)}」の成果報酬サービス検索結果` : "成果報酬サービス一覧｜条件で絞り込み・比較",
    description:
      "成果報酬で依頼できるサービスの一覧。成果地点・初期費用0円・月額0円・完全成果報酬などの条件で絞り込み、料金や特徴を比較できます。",
    path: "/services",
    noindex: hasParams, // 検索・絞り込み結果ページは重複を避けるため noindex（一覧本体のみ index）
  });
}

const SORTS = [
  ["popular", "人気順"],
  ["new", "新着順"],
  ["name", "名称順"],
] as const;

export default async function ServicesPage({ searchParams }: { searchParams: Promise<Params> }) {
  const sp = await searchParams;
  const q = one(sp.q).trim().slice(0, 100);
  const filters = {
    category: one(sp.category) || undefined,
    outcome: (one(sp.outcome) in OUTCOME_LABELS ? one(sp.outcome) : undefined) as OutcomeType | undefined,
    zeroInitial: one(sp.zero_initial) === "1",
    zeroMonthly: one(sp.zero_monthly) === "1",
    fullSuccess: one(sp.full) === "1",
    freeConsultation: one(sp.consult) === "1",
  };
  const sortParam = one(sp.sort);
  const sort = q && !sortParam ? "relevance" : SORTS.some(([k]) => k === sortParam) ? sortParam : "popular";

  const [categories, all] = await Promise.all([getCategories(), getServices()]);
  const filtered = applyFilters(all, filters, categories);

  let list = filtered;
  if (q) {
    const hits = await searchEngine.search(filtered, q, { categories });
    const order = new Map(hits.map((h, i) => [h.service.id, i]));
    list = hits.map((h) => h.service);
    if (sort !== "relevance") list = sortList(list);
    else list = list.sort((a, b) => order.get(a.id)! - order.get(b.id)!);
  } else {
    list = sortList(filtered);
  }
  function sortList(items: typeof all) {
    if (sort === "new") return [...items].sort((a, b) => b.created_at.localeCompare(a.created_at));
    if (sort === "name") return [...items].sort((a, b) => a.name.localeCompare(b.name, "ja"));
    return items;
  }
  if (sort === "popular") {
    const ranked = await getPopularServices(list, { onlyEligible: false });
    list = ranked;
  }

  const intent = q ? parseIntent(q) : null;
  const outcomes = (Object.keys(OUTCOME_LABELS) as OutcomeType[]).filter((o) => all.some((s) => s.outcome_type === o));
  const topCategories = categories.filter((c) => !c.parent_id);
  const activeCount = [filters.category, filters.outcome, filters.zeroInitial, filters.zeroMonthly, filters.fullSuccess, filters.freeConsultation].filter(Boolean).length;

  const buildHref = (over: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const base: Record<string, string | undefined> = { q, category: filters.category, outcome: filters.outcome, zero_initial: filters.zeroInitial ? "1" : undefined, zero_monthly: filters.zeroMonthly ? "1" : undefined, full: filters.fullSuccess ? "1" : undefined, consult: filters.freeConsultation ? "1" : undefined, sort: sortParam || undefined, ...over };
    for (const [k, v] of Object.entries(base)) if (v) p.set(k, v);
    const s = p.toString();
    return s ? `/services?${s}` : "/services";
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {q && <PageEvent name="search" params={{ query: q, results_count: list.length }} />}
      <Breadcrumbs items={[{ name: "サービス一覧" }]} />
      <h1 className="mt-4 text-2xl sm:text-3xl">{q ? `「${q}」の検索結果` : "成果報酬サービス一覧"}</h1>
      <p className="mt-2 text-sm text-muted">
        成果報酬で利用できるサービスを、成果地点・料金条件で絞り込んで比較できます。
        {sort === "popular" && <>人気順は{RANKING_NOTE}しています。</>}
      </p>

      <div className="mt-6 max-w-2xl"><SearchBox defaultValue={q} id="list-search" /></div>
      {intent && (intent.outcome.length > 0 || intent.fullSuccess || intent.zeroInitial || intent.zeroMonthly) && (
        <p className="mt-3 text-sm text-muted">
          検索語から読み取った条件:{" "}
          {[...intent.outcome.map((o) => `成果地点＝${OUTCOME_LABELS[o]}`), intent.fullSuccess && "完全成果報酬", intent.zeroInitial && "初期費用0円", intent.zeroMonthly && "月額0円"].filter(Boolean).join(" / ")}
          （該当するサービスを優先表示しています）
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
        <aside>
          <FilterPanel activeCount={activeCount}>
            <form action="/services" method="get" className="space-y-5">
              {q && <input type="hidden" name="q" value={q} />}
              {sortParam && <input type="hidden" name="sort" value={sortParam} />}
              <div>
                <label htmlFor="f-category" className="label">カテゴリ</label>
                <select id="f-category" name="category" defaultValue={filters.category ?? ""} className="input">
                  <option value="">すべて</option>
                  {topCategories.map((c) => (
                    <optgroup key={c.id} label={c.name}>
                      <option value={c.slug}>{c.name}（すべて）</option>
                      {categories.filter((x) => x.parent_id === c.id).map((ch) => <option key={ch.id} value={ch.slug}>{ch.name}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-outcome" className="label">成果地点</label>
                <select id="f-outcome" name="outcome" defaultValue={filters.outcome ?? ""} className="input">
                  <option value="">すべて</option>
                  {outcomes.map((o) => <option key={o} value={o}>{OUTCOME_LABELS[o]}</option>)}
                </select>
              </div>
              <fieldset className="space-y-2.5">
                <legend className="label">料金条件</legend>
                {([
                  ["zero_initial", "初期費用0円", filters.zeroInitial],
                  ["zero_monthly", "月額費用0円", filters.zeroMonthly],
                  ["full", "完全成果報酬", filters.fullSuccess],
                  ["consult", "無料相談あり", filters.freeConsultation],
                ] as const).map(([name, label, checked]) => (
                  <label key={name} className="flex min-h-9 cursor-pointer items-center gap-2.5 text-sm text-ink">
                    <input type="checkbox" name={name} value="1" defaultChecked={checked} className="size-4 accent-brand-600" />
                    {label}
                  </label>
                ))}
                <p className="text-xs leading-6 text-muted">「完全成果報酬」は、固定費・月額費用がなく成果発生時のみ費用が発生するサービスです。</p>
              </fieldset>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex-1">この条件で絞り込む</button>
                {(activeCount > 0) && <Link href={buildHref({ category: undefined, outcome: undefined, zero_initial: undefined, zero_monthly: undefined, full: undefined, consult: undefined })} className="btn-ghost">解除</Link>}
              </div>
            </form>
          </FilterPanel>
        </aside>

        <section aria-live="polite">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm"><strong className="text-lg text-ink">{list.length}</strong> 件のサービス</p>
            <nav aria-label="並び替え" className="flex flex-wrap gap-1.5 text-sm">
              {q && <Link href={buildHref({ sort: undefined })} className={`rounded-lg px-3 py-1.5 ${sort === "relevance" ? "bg-ink font-bold text-white" : "bg-surface hover:bg-slate-200"}`}>関連度順</Link>}
              {SORTS.map(([k, label]) => (
                <Link key={k} href={buildHref({ sort: k })} className={`rounded-lg px-3 py-1.5 ${sort === k ? "bg-ink font-bold text-white" : "bg-surface hover:bg-slate-200"}`}>{label}</Link>
              ))}
            </nav>
          </div>
          {list.length ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {list.map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} /></li>)}
            </ul>
          ) : (
            <div className="card p-10 text-center">
              <p className="font-bold text-ink">条件に合うサービスが見つかりませんでした</p>
              <p className="mt-2 text-sm text-muted">絞り込み条件を減らすか、別のキーワードをお試しください。「{normalize(q)}」</p>
              <Link href="/services" className="btn-secondary mt-5">条件をリセットする</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
