import "server-only";
import { cache } from "react";
import { hasServiceRole, isSupabaseConfigured, publicClient, serviceClient } from "./supabase";
import { seedArticles, seedCategories, seedServices } from "./seed";
import type { Article, Category, Service, ServiceStats } from "./types";

/**
 * 公開サイト用のデータ取得層。
 * - Supabase 設定済み: DB から取得（anon キー + RLS。結果は Next のデータキャッシュで 5 分保持、管理画面の更新で即時破棄）
 * - 未設定: src/data/seed.json のデモデータ
 * MVP の掲載数（数百件規模）を想定し、絞り込み・検索は取得後に TypeScript 側で行う。
 */

export const getCategories = cache(async (): Promise<Category[]> => {
  if (!isSupabaseConfigured) return seedCategories();
  const { data, error } = await publicClient()
    .from("categories")
    .select("*")
    .eq("published", true)
    .order("sort_order")
    .limit(1000);
  if (error) throw new Error(`categories: ${error.message}`);
  return (data ?? []) as Category[];
});

export const getServices = cache(async (): Promise<Service[]> => {
  if (!isSupabaseConfigured) return seedServices().filter((s) => s.published);
  const { data, error } = await publicClient()
    .from("services")
    .select("*, service_categories(category_id, is_primary)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) throw new Error(`services: ${error.message}`);
  return (data ?? []).map(toService);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toService(row: any): Service {
  const links: { category_id: string; is_primary: boolean }[] = row.service_categories ?? [];
  const sorted = [...links].sort((a, b) => Number(b.is_primary) - Number(a.is_primary));
  const { service_categories: _omit, ...rest } = row;
  void _omit;
  return { ...rest, features: rest.features ?? [], category_ids: sorted.map((l) => l.category_id) } as Service;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

export const getArticles = cache(async (): Promise<Article[]> => {
  if (!isSupabaseConfigured) return seedArticles();
  const { data, error } = await publicClient()
    .from("articles")
    .select("*, article_services(service_id, sort_order)")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(1000);
  if (error) throw new Error(`articles: ${error.message}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => {
    const links: { service_id: string; sort_order: number }[] = row.article_services ?? [];
    const { article_services: _omit, ...rest } = row;
    void _omit;
    return { ...rest, service_ids: links.sort((a, b) => a.sort_order - b.sort_order).map((l) => l.service_id) } as Article;
  });
});

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return (await getArticles()).find((a) => a.slug === slug) ?? null;
}

/** 指定期間のサービス別行動データ（service_role。未設定・失敗時は空） */
export async function getServiceStats(from: Date, to: Date, opts: { cached?: boolean } = {}): Promise<ServiceStats[]> {
  if (!hasServiceRole) return [];
  try {
    const { data, error } = await serviceClient(opts.cached).rpc(
      "service_stats",
      { p_from: from.toISOString(), p_to: to.toISOString() },
      // 公開ページ（ランキング）はキャッシュさせるため GET で呼ぶ
      opts.cached ? { get: true } : undefined,
    );
    if (error) throw error;
    return (data ?? []).map((r: Record<string, unknown>) => ({
      service_id: String(r.service_id),
      page_views: Number(r.page_views),
      unique_users: Number(r.unique_users),
      official_clicks: Number(r.official_clicks),
      document_clicks: Number(r.document_clicks),
      form_starts: Number(r.form_starts),
      leads: Number(r.leads),
    }));
  } catch (e) {
    console.error("[service_stats]", e);
    return [];
  }
}

import { descendantIds } from "./categories";
export { descendantIds };

export function servicesInCategory(services: Service[], categories: Category[], categoryId: string): Service[] {
  const ids = descendantIds(categories, categoryId);
  return services.filter((s) => s.category_ids.some((c) => ids.has(c)));
}
