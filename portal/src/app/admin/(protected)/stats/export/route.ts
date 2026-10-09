import { NextResponse, type NextRequest } from "next/server";
import { adminServices } from "@/lib/admin-data";
import { getAdminUser } from "@/lib/auth";
import { csvResponse, toCsv } from "@/lib/csv";
import { getServiceStats } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await getAdminUser())) return new NextResponse("Unauthorized", { status: 401 });
  const days = Math.min(365, Math.max(1, Number(req.nextUrl.searchParams.get("days")) || 30));
  const to = new Date();
  const from = new Date(to.getTime() - days * 86400_000);
  const [services, stats] = await Promise.all([adminServices(), getServiceStats(from, to)]);
  const byId = new Map(stats.map((s) => [s.service_id, s]));
  const pct = (n: number, d: number) => (d > 0 ? (n / d).toFixed(4) : "");
  const rows = [
    ["service_id", "service_name", "company_name", "partner_status", "page_views", "unique_users", "official_site_clicks", "official_site_ctr", "document_button_clicks", "lead_form_starts", "leads", "lead_cvr"],
    ...services.map((s) => {
      const st = byId.get(s.id);
      const pv = st?.page_views ?? 0;
      return [s.id, s.name, s.company_name, s.partner_status, pv, st?.unique_users ?? 0, st?.official_clicks ?? 0, pct(st?.official_clicks ?? 0, pv), st?.document_clicks ?? 0, st?.form_starts ?? 0, st?.leads ?? 0, pct(st?.leads ?? 0, pv)];
    }),
  ];
  return csvResponse(`service-stats-${days}d.csv`, toCsv(rows));
}
