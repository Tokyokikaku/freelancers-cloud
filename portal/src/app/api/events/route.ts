import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hasServiceRole, serviceClient } from "@/lib/supabase";
import { EVENT_NAMES } from "@/lib/types";

export const runtime = "nodejs";

const uuid = z.string().uuid();
const short = (n: number) => z.string().max(n).optional();

const schema = z.object({
  event_name: z.enum(EVENT_NAMES),
  service_id: uuid.optional(),
  category_id: uuid.optional(),
  query: short(200),
  results_count: z.number().int().min(0).max(100000).optional(),
  path: short(300),
  visitor_id: short(64),
  session_id: short(64),
  source: short(200),
  medium: short(100),
  campaign: short(200),
  referrer: short(500),
});

const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|curl|wget|python-requests|monitor|pingdom|uptime/i;

/**
 * 行動イベントの保存先。ボットは除外し、入力は厳格に検証する。
 * 追加の濫用対策（レート制限など）が必要になったら Vercel WAF / Upstash Ratelimit などを前段に置くこと。
 */
export async function POST(req: NextRequest) {
  if (BOT_RE.test(req.headers.get("user-agent") ?? "")) return new NextResponse(null, { status: 204 });

  let json: unknown;
  try {
    const text = await req.text();
    if (text.length > 4000) return new NextResponse(null, { status: 413 });
    json = JSON.parse(text);
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) return new NextResponse(null, { status: 400 });

  if (!hasServiceRole) return new NextResponse(null, { status: 204 }); // デモモード: 保存しない

  const e = parsed.data;
  // lead_submit はサーバー側（リード保存時）で記録するため、クライアントからは受け付けない
  if (e.event_name === "lead_submit") return new NextResponse(null, { status: 204 });

  const { error } = await serviceClient().from("page_events").insert({
    event_name: e.event_name,
    service_id: e.service_id ?? null,
    category_id: e.category_id ?? null,
    query: e.query ?? null,
    results_count: e.results_count ?? null,
    path: e.path ?? null,
    visitor_id: e.visitor_id ?? null,
    session_id: e.session_id ?? null,
    source: e.source ?? null,
    medium: e.medium || null,
    campaign: e.campaign || null,
    referrer: e.referrer || null,
  });
  if (error) {
    console.error("[events] insert failed:", error.message);
    return new NextResponse(null, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
