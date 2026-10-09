import "server-only";
import { toService } from "./data";
import { serviceClient } from "./supabase";
import type { Article, Category, Service } from "./types";

/** 管理画面用の取得（非公開データを含む。呼び出し元で requireAdmin 済みであること） */
export async function adminCategories(): Promise<Category[]> {
  const { data, error } = await serviceClient().from("categories").select("*").order("sort_order").limit(2000);
  if (error) throw new Error(error.message);
  return (data ?? []) as Category[];
}

export async function adminServices(): Promise<Service[]> {
  const { data, error } = await serviceClient().from("services").select("*, service_categories(category_id, is_primary)").order("created_at", { ascending: false }).limit(2000);
  if (error) throw new Error(error.message);
  return (data ?? []).map(toService);
}

export async function adminService(id: string) {
  const db = serviceClient();
  const { data } = await db.from("services").select("*, service_categories(category_id, is_primary)").eq("id", id).maybeSingle();
  if (!data) return null;
  const { data: contact } = await db.from("partner_contacts").select("notify_email, webhook_url").eq("service_id", id).maybeSingle();
  return { service: toService(data), contact: contact as { notify_email: string | null; webhook_url: string | null } | null };
}

export async function adminArticles(): Promise<Article[]> {
  const { data, error } = await serviceClient().from("articles").select("*, article_services(service_id, sort_order)").order("created_at", { ascending: false }).limit(2000);
  if (error) throw new Error(error.message);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => {
    const { article_services: links = [], ...rest } = row;
    return { ...rest, service_ids: links.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order).map((l: { service_id: string }) => l.service_id) } as Article;
  });
}
