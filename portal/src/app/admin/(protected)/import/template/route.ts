import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { csvResponse, toCsv } from "@/lib/csv";
import { CSV_COLUMNS } from "@/lib/service-import";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminUser())) return new NextResponse("Unauthorized", { status: 401 });
  const example = [
    "example-service", "サンプル営業代行", "株式会社サンプル", "https://example.com/", "初期費用0円の成果報酬型テレアポ代行です。",
    "公式サイトで確認できた事実だけを書きます。\n\n確認できなかった項目は「要問い合わせ」とします。",
    "free", "0円（公式サイト記載）", "free", "0円（公式サイト記載）", "アポイント1件につき10,000円", "",
    "アポイントの獲得", "appointment", "true", "false", "BtoB営業を行う企業",
    "初期費用0円|月額0円|アポが取れた時だけ課金", "tele-appointment|sales-outsourcing", "https://example.com/price", "2026-10-05",
  ];
  return csvResponse("services-template.csv", toCsv([[...CSV_COLUMNS], example]));
}
