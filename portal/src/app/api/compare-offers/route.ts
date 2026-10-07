import { NextResponse } from "next/server";
import { comparisonMaterials, offersByService } from "@/lib/comparison";
import { getCategories, getServices } from "@/lib/data";

export async function GET() {
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  return NextResponse.json(
    { offers: offersByService(services, categories), materials: comparisonMaterials(services, categories) },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
  );
}
