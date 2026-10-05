import { NextResponse } from "next/server";
import { adminCategories, adminServices } from "@/lib/admin-data";
import { getAdminUser } from "@/lib/auth";
import { csvResponse, toCsv } from "@/lib/csv";
import { CSV_COLUMNS } from "@/lib/service-import";

export const dynamic = "force-dynamic";

/** サービス全件のCSV（取込用テンプレートと同じ列）。features は | 区切り、categories は slug を | 区切り */
export async function GET() {
  if (!(await getAdminUser())) return new NextResponse("Unauthorized", { status: 401 });
  const [services, categories] = await Promise.all([adminServices(), adminCategories()]);
  const slugOf = new Map(categories.map((c) => [c.id, c.slug]));
  const rows: (string | number | null)[][] = [[...CSV_COLUMNS]];
  for (const s of services) {
    rows.push([
      s.slug, s.name, s.company_name, s.website_url, s.summary, s.description,
      s.initial_fee_type, s.initial_fee, s.monthly_fee_type, s.monthly_fee, s.success_fee, s.pricing_note,
      s.success_condition, s.outcome_type, String(s.is_full_success_fee), String(s.has_free_consultation), s.target_companies,
      s.features.join("|"), s.category_ids.map((id) => slugOf.get(id) ?? "").filter(Boolean).join("|"), s.source_url, s.last_verified_at,
    ]);
  }
  return csvResponse(`services-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(rows));
}
