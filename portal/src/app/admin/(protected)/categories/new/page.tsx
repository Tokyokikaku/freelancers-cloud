import { CategoryForm } from "@/components/admin/CategoryForm";
import { adminCategories } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function NewCategoryPage() {
  return (
    <div className="max-w-3xl space-y-5">
      <h1 className="text-2xl">カテゴリを追加</h1>
      <CategoryForm categories={await adminCategories()} />
    </div>
  );
}
