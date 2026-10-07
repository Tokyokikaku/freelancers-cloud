import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { csvResponse, toCsv } from "@/lib/csv";
import { serviceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminUser())) return new NextResponse("Unauthorized", { status: 401 });
  const db = serviceClient();
  const rows: (string | null)[][] = [["lead_id", "service_id", "service_name", "company", "corporate_number", "company_verified", "name", "email", "phone", "timing", "employees", "industry", "department", "job_title", "message", "request_id", "created_at", "source", "medium", "campaign", "partner_status", "notified_at"]];
  // PostgREST の 1,000 件上限を超えても全件出力できるようページングする
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from("leads").select("*").order("created_at", { ascending: false }).range(from, from + 999);
    if (error) return new NextResponse(error.message, { status: 500 });
    for (const l of data ?? []) {
      rows.push([l.lead_id, l.service_id, l.service_name, l.company, l.corporate_number, l.company_verified ? "確認済み" : "未確認", l.name, l.email, l.phone, l.timing, l.employees, l.industry, l.department, l.job_title, l.message, l.request_id, l.created_at, l.source, l.medium, l.campaign, l.partner_status, l.notified_at]);
    }
    if (!data || data.length < 1000) break;
  }
  const stamp = new Date().toISOString().slice(0, 10);
  return csvResponse(`leads-${stamp}.csv`, toCsv(rows));
}
