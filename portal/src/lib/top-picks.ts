import { descendantIds } from "./categories";
import type { Category, Service } from "./types";

/** 「人気上位サービスと比較」の提案を出すカテゴリの最小サービス数 */
export const MIN_CATEGORY_SERVICES = 3;
/** 比較に出す人気上位のサービス数 */
export const TOP_PICK_COUNT = 5;

export interface PickService {
  id: string;
  slug: string;
  name: string;
  company_name: string;
}
export interface CategoryPicks {
  categoryName: string;
  count: number;
  /** 人気順（呼び出し側で自分自身を除いて TOP_PICK_COUNT 件にする） */
  top: PickService[];
}
export interface TopPicksData {
  /** サービスslug → 提案に使うカテゴリslug */
  offers: Record<string, string>;
  categories: Record<string, CategoryPicks>;
}

/**
 * サービスごとに、いちばん絞り込まれた（件数が少ない）カテゴリを選び、そのカテゴリの人気順上位を返す。
 * ranked は人気順に並べたサービス。
 */
export function buildTopPicks(ranked: Service[], categories: Category[]): TopPicksData {
  const catById = new Map(categories.map((c) => [c.id, c]));
  const info = new Map<string, CategoryPicks>();
  for (const c of categories) {
    const ids = descendantIds(categories, c.id);
    const inCat = ranked.filter((s) => s.category_ids.some((id) => ids.has(id)));
    if (inCat.length >= MIN_CATEGORY_SERVICES) {
      info.set(c.slug, {
        categoryName: c.name,
        count: inCat.length,
        top: inCat.slice(0, TOP_PICK_COUNT + 1).map((s) => ({ id: s.id, slug: s.slug, name: s.name, company_name: s.company_name })),
      });
    }
  }
  const offers: Record<string, string> = {};
  for (const s of ranked) {
    let best: { slug: string; count: number } | undefined;
    for (const id of s.category_ids) {
      for (let cur = catById.get(id), guard = 0; cur && guard < 6; cur = cur.parent_id ? catById.get(cur.parent_id) : undefined, guard++) {
        const i = info.get(cur.slug);
        if (i && (!best || i.count < best.count)) best = { slug: cur.slug, count: i.count };
      }
    }
    if (best) offers[s.slug] = best.slug;
  }
  return { offers, categories: Object.fromEntries(info) };
}
