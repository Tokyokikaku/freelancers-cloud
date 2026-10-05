import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { getArticleBySlug, getArticles, getCategories, getServices } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { buildMetadata, truncate } from "@/lib/seo";
import { absoluteUrl, OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return (await getArticles()).map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seo_title || a.title,
    description: a.seo_description || truncate(a.excerpt || a.body.replace(/[#*|>\-\[\]()]/g, ""), 120),
    path: `/articles/${a.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, services, categories] = await Promise.all([getArticleBySlug(slug), getServices(), getCategories()]);
  if (!article) notFound();
  const related = article.service_ids.map((id) => services.find((s) => s.id === id)).filter((s) => !!s);

  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "記事", href: "/articles" }, { name: article.title }]} />
      <article className="mx-auto mt-6 max-w-3xl">
        <header>
          <h1 className="text-2xl leading-snug sm:text-4xl sm:leading-snug">{article.title}</h1>
          <p className="mt-3 text-sm text-muted">
            <time dateTime={article.published_at ?? undefined}>公開日 {formatDate(article.published_at ?? article.created_at)}</time>
            {" ／ "}
            <time dateTime={article.updated_at}>更新日 {formatDate(article.updated_at)}</time>
          </p>
        </header>
        <div className="prose-ja mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        </div>
        <p className="mt-10 rounded-xl bg-warn-50 p-4 text-sm leading-7 text-warn-700">
          本記事の情報は公開情報をもとに編集部が作成しています。最新の料金・提供条件については、各サービスの公式サイトをご確認ください。
        </p>
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-12 max-w-6xl">
          <h2 className="mb-5 text-xl">この記事で紹介したサービス</h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => <li key={s!.id}><ServiceCard service={s!} categories={categories} compact /></li>)}
          </ul>
        </section>
      )}
      <p className="mx-auto mt-10 max-w-3xl text-center text-sm"><Link href="/articles" className="text-brand-700 underline">記事一覧へ戻る</Link></p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          datePublished: article.published_at ?? article.created_at,
          dateModified: article.updated_at,
          mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
          author: { "@type": "Organization", name: OPERATOR_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
    </div>
  );
}
