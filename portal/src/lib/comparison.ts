import { descendantIds } from "./data";
import type { Category, Service } from "./types";

/** カテゴリの「比較資料」を用意できる最小サービス数 */
export const MIN_COMPARISON_SERVICES = 3;
export const MAX_COMPARISON_CATEGORIES = 3;

export interface ComparisonMaterial {
  categorySlug: string;
  categoryName: string;
  /** 例: 成果報酬型テレアポ・商談獲得代行サービス比較資料 */
  title: string;
  count: number;
}

export function comparisonTitle(categoryName: string): string {
  return `成果報酬型${categoryName}${categoryName.endsWith("サービス") ? "" : "サービス"}比較資料`;
}

/** 公開中サービスが MIN 件以上あるカテゴリごとの比較資料 */
export function comparisonMaterials(services: Service[], categories: Category[]): ComparisonMaterial[] {
  const out: ComparisonMaterial[] = [];
  for (const c of categories) {
    const ids = descendantIds(categories, c.id);
    const count = services.filter((s) => s.category_ids.some((id) => ids.has(id))).length;
    if (count >= MIN_COMPARISON_SERVICES) out.push({ categorySlug: c.slug, categoryName: c.name, title: comparisonTitle(c.name), count });
  }
  return out;
}

/** サービスごとに、いちばん絞り込まれた（件数が少ない）比較資料を1つ選ぶ */
export function offersByService(services: Service[], categories: Category[]): Record<string, ComparisonMaterial> {
  const materials = comparisonMaterials(services, categories);
  const bySlug = new Map(materials.map((m) => [m.categorySlug, m]));
  const catById = new Map(categories.map((c) => [c.id, c]));
  const result: Record<string, ComparisonMaterial> = {};
  for (const s of services) {
    let best: ComparisonMaterial | undefined;
    for (const id of s.category_ids) {
      // 自分自身と祖先カテゴリを候補にする
      for (let cur = catById.get(id), guard = 0; cur && guard < 6; cur = cur.parent_id ? catById.get(cur.parent_id) : undefined, guard++) {
        const m = bySlug.get(cur.slug);
        if (m && (!best || m.count < best.count)) best = m;
      }
    }
    if (best) result[s.slug] = best;
  }
  return result;
}
