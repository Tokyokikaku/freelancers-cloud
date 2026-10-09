import type { MetadataRoute } from "next";
import { getArticles, getCategories, getServices, servicesInCategory } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, categories, articles] = await Promise.all([getServices(), getCategories(), getArticles()]);
  return [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/articles"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    // 掲載ゼロのカテゴリは noindex のため含めない
    ...categories
      .filter((c) => servicesInCategory(services, categories, c.id).length > 0)
      .map((c) => ({ url: absoluteUrl(`/category/${c.slug}`), changeFrequency: "daily" as const, priority: 0.8 })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: new Date(s.last_verified_at ?? s.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/articles/${a.slug}`),
      lastModified: new Date(a.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
