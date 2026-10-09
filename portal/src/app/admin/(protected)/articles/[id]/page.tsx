import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { adminArticles, adminCategories, adminServices } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [articles, categories, services] = await Promise.all([adminArticles(), adminCategories(), adminServices()]);
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();
  return (
    <div className="max-w-4xl space-y-5">
      <h1 className="text-2xl">記事を編集：{article.title}</h1>
      <ArticleForm article={article} categories={categories} services={services.map((s) => ({ id: s.id, name: s.name }))} />
    </div>
  );
}
