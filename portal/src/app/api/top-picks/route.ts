import { NextResponse } from "next/server";
import { getCategories, getServices } from "@/lib/data";
import { isRequestable } from "@/lib/partner";
import { getPopularServices } from "@/lib/popular";
import { buildTopPicks } from "@/lib/top-picks";

export async function GET() {
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  const ranked = (await getPopularServices(services)).filter(isRequestable); // 資料請求を受け付けているサービスだけを提案する
  return NextResponse.json(buildTopPicks(ranked, categories), {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
