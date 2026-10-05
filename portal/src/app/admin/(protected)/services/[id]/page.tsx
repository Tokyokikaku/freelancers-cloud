import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { adminCategories, adminService } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [found, categories] = await Promise.all([adminService(id), adminCategories()]);
  if (!found) notFound();
  return (
    <div className="max-w-4xl space-y-5">
      <h1 className="text-2xl">サービスを編集：{found.service.name}</h1>
      <ServiceForm service={found.service} categories={categories} contact={found.contact ?? undefined} />
    </div>
  );
}
