"use client";
import { TOP_PICK_COUNT, type CategoryPicks, type PickService, type TopPicksData } from "@/lib/top-picks";

let promise: Promise<TopPicksData | null> | null = null;

/** 人気上位サービスの提案データ。ページ内で1回だけ取得してキャッシュ */
export function loadTopPicks(): Promise<TopPicksData | null> {
  if (!promise) {
    promise = fetch("/api/top-picks")
      .then((r) => (r.ok ? (r.json() as Promise<TopPicksData>) : null))
      .catch(() => null);
  }
  return promise;
}

export interface Offer {
  categoryName: string;
  count: number;
  picks: PickService[];
}

/** 指定サービスに出す提案（自分自身を除く人気上位）。提案できない場合は null */
export function offerFor(data: TopPicksData | null, slug: string): Offer | null {
  const cat = data ? data.offers[slug] : undefined;
  const info: CategoryPicks | undefined = cat && data ? data.categories[cat] : undefined;
  if (!info) return null;
  const picks = info.top.filter((s) => s.slug !== slug).slice(0, TOP_PICK_COUNT);
  return picks.length >= 2 ? { categoryName: info.categoryName, count: info.count, picks } : null;
}

const DECLINED_KEY = "snv_picks_declined";
export function wasDeclined(categoryName: string): boolean {
  try {
    return (window.sessionStorage.getItem(DECLINED_KEY) ?? "").split("|").includes(categoryName);
  } catch {
    return false;
  }
}
export function markDeclined(categoryName: string) {
  try {
    const cur = (window.sessionStorage.getItem(DECLINED_KEY) ?? "").split("|").filter(Boolean);
    if (!cur.includes(categoryName)) window.sessionStorage.setItem(DECLINED_KEY, [...cur, categoryName].join("|"));
  } catch {}
}
