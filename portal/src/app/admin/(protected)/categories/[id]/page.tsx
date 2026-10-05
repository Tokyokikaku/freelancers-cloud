import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { adminCategories } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await adminCategories();
  const category = categories.find((c) => c.id === id);
  if (!category) notFound();
  return (
    <div className="max-w-3xl space-y-5">
      <h1 className="text-2xl">カテゴリを編集：{category.name}</h1>
      <CategoryForm category={category} categories={categories} />
    </div>
  );
}
