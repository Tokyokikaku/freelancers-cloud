import { ServiceForm } from "@/components/admin/ServiceForm";
import { adminCategories } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function NewServicePage() {
  return (
    <div className="max-w-4xl space-y-5">
      <h1 className="text-2xl">サービスを追加</h1>
      <ServiceForm categories={await adminCategories()} />
    </div>
  );
}
