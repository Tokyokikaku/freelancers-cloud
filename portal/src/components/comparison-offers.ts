"use client";
import type { ComparisonMaterial } from "@/lib/comparison";

interface Offers {
  offers: Record<string, ComparisonMaterial>;
  materials: ComparisonMaterial[];
}

let promise: Promise<Offers | null> | null = null;

/** サービスごとの比較資料の案内を取得（ページ内で1回だけ取得してキャッシュ） */
export function loadComparisonOffers(): Promise<Offers | null> {
  if (!promise) {
    promise = fetch("/api/compare-offers")
      .then((r) => (r.ok ? (r.json() as Promise<Offers>) : null))
      .catch(() => null);
  }
  return promise;
}

const DECLINED_KEY = "snv_cmp_declined";
export function wasDeclined(categorySlug: string): boolean {
  try {
    return (window.sessionStorage.getItem(DECLINED_KEY) ?? "").split(",").includes(categorySlug);
  } catch {
    return false;
  }
}
export function markDeclined(categorySlug: string) {
  try {
    const cur = (window.sessionStorage.getItem(DECLINED_KEY) ?? "").split(",").filter(Boolean);
    if (!cur.includes(categorySlug)) window.sessionStorage.setItem(DECLINED_KEY, [...cur, categorySlug].join(","));
  } catch {}
}
