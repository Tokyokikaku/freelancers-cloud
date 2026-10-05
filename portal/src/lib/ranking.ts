import type { Service, ServiceStats } from "./types";

export const RANKING_WINDOW_DAYS = 30;
export const RANKING_NOTE = "閲覧数・ユーザー行動などをもとに算出";

/**
 * 人気スコア（直近30日）。広告主の支払額・提携状態は一切使わない。
 *   score = 40·log10(1+閲覧数) + 30·補正済み公式サイトCTR + 30·補正済み資料ボタンCTR
 * CTR は閲覧数が少ないサービスが偶然上位にならないよう、事前確率（5%）を20閲覧分だけ混ぜて補正する。
 */
const PRIOR_RATE = 0.05;
const PRIOR_WEIGHT = 20;
const smoothed = (clicks: number, views: number) => (clicks + PRIOR_RATE * PRIOR_WEIGHT) / (views + PRIOR_WEIGHT);

export function popularityScore(st?: ServiceStats): number {
  if (!st || st.page_views === 0) return 0;
  return (
    40 * Math.log10(1 + st.page_views) +
    30 * smoothed(st.official_clicks, st.page_views) +
    30 * smoothed(st.document_clicks, st.page_views)
  );
}

/** 人気順に並べる。同点（データ未蓄積含む）は おすすめ → 新着 → 名称 の順で安定ソート */
export function rankByPopularity(services: Service[], stats: ServiceStats[], opts: { onlyEligible?: boolean } = {}): Service[] {
  const { onlyEligible = true } = opts;
  const byId = new Map(stats.map((s) => [s.service_id, s]));
  return services
    .filter((s) => !onlyEligible || s.show_in_popular)
    .map((s) => ({ s, score: popularityScore(byId.get(s.id)) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(b.s.featured) - Number(a.s.featured) ||
        b.s.created_at.localeCompare(a.s.created_at) ||
        a.s.name.localeCompare(b.s.name, "ja"),
    )
    .map((x) => x.s);
}
