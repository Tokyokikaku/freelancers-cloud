import { ArticleForm } from "@/components/admin/ArticleForm";
import { adminCategories, adminServices } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const [categories, services] = await Promise.all([adminCategories(), adminServices()]);
  return (
    <div className="max-w-4xl space-y-5">
      <h1 className="text-2xl">記事を追加</h1>
      <ArticleForm categories={categories} services={services.map((s) => ({ id: s.id, name: s.name }))} />
    </div>
  );
}
