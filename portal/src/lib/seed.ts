import raw from "@/data/seed.json";
import type { Article, Category, OutcomeType, Service, FeeType, PartnerStatus } from "./types";

/** Supabase 未設定（デモモード）で DB の代わりに使うデータ。seed.json から組み立てる。 */
const NOW = "2026-10-05T00:00:00+09:00";

export function seedCategories(): Category[] {
  const idBySlug = new Map(raw.categories.map((c) => [c.slug, `cat_${c.slug}`]));
  return raw.categories.map((c) => ({
    id: idBySlug.get(c.slug)!,
    parent_id: c.parent ? idBySlug.get(c.parent)! : null,
    slug: c.slug,
    name: c.name,
    icon: c.icon,
    description: c.description,
    seo_title: null,
    seo_description: null,
    sort_order: c.sort_order,
    published: true,
  }));
}

export function seedServices(): Service[] {
  return raw.services.map((s) => ({
    id: `svc_${s.slug}`,
    slug: s.slug,
    name: s.name,
    company_name: s.company_name,
    summary: s.summary,
    description: s.description,
    logo_url: s.logo_url,
    website_url: s.website_url,
    initial_fee_type: s.initial_fee_type as FeeType,
    initial_fee: s.initial_fee,
    monthly_fee_type: s.monthly_fee_type as FeeType,
    monthly_fee: s.monthly_fee,
    success_fee: s.success_fee,
    pricing_note: s.pricing_note,
    success_condition: s.success_condition,
    outcome_type: s.outcome_type as OutcomeType,
    is_full_success_fee: s.is_full_success_fee,
    has_free_consultation: s.has_free_consultation,
    target_companies: s.target_companies,
    features: s.features,
    partner_status: s.partner_status as PartnerStatus,
    featured: s.featured,
    show_in_popular: s.show_in_popular,
    published: s.published,
    source_url: s.source_url,
    last_verified_at: s.last_verified_at,
    created_at: NOW,
    updated_at: NOW,
    category_ids: s.categories.map((slug) => `cat_${slug}`),
  }));
}

export function seedArticles(): Article[] {
  return raw.articles.map((a) => ({
    id: `art_${a.slug}`,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    body: a.body,
    category_id: a.category ? `cat_${a.category}` : null,
    seo_title: null,
    seo_description: null,
    published: true,
    published_at: a.published_at,
    created_at: a.published_at,
    updated_at: a.published_at,
    service_ids: a.services.map((slug) => `svc_${slug}`),
  }));
}
