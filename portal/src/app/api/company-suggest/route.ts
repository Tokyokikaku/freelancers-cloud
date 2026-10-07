import { NextResponse, type NextRequest } from "next/server";
import { houjinEnabled, searchCorporations } from "@/lib/houjin";

// 簡易レート制限（同一IPあたり、インスタンス内の best effort）
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 40;
}

export async function GET(req: NextRequest) {
  if (!houjinEnabled) return NextResponse.json({ enabled: false, items: [] });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ enabled: true, items: [] }, { status: 429 });
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 50);
  if (q.length < 2) return NextResponse.json({ enabled: true, items: [] });
  const items = await searchCorporations(q);
  return NextResponse.json({ enabled: true, items }, { headers: { "Cache-Control": "private, max-age=300" } });
}
