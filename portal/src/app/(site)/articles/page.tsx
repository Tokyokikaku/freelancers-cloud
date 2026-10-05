import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getArticles, getCategories } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "成果報酬サービスに関する記事一覧",
  description: "成果報酬型サービスの選び方、料金体系の違い、カテゴリ別の比較ポイントなどをまとめた記事の一覧です。",
  path: "/articles",
});

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "記事" }]} />
      <h1 className="mt-4 text-2xl sm:text-3xl">成果報酬サービスに関する記事</h1>
      <p className="mt-2 text-sm text-muted">成果報酬型サービスの選び方や比較のポイントをまとめています。</p>
      {articles.length ? (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {articles.map((a) => {
            const cat = categories.find((c) => c.id === a.category_id);
            return (
              <li key={a.id}>
                <Link href={`/articles/${a.slug}`} className="card block h-full p-6 transition hover:border-brand-500 hover:shadow-md">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    {cat && <span className="tag bg-slate-100 text-slate-700">{cat.name}</span>}
                    <time dateTime={a.published_at ?? undefined}>{formatDate(a.published_at ?? a.created_at)}</time>
                  </div>
                  <h2 className="mt-2 text-lg leading-snug">{a.title}</h2>
                  {a.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-7">{a.excerpt}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="card mt-8 p-10 text-center text-sm text-muted">記事は準備中です。</p>
      )}
    </div>
  );
}
