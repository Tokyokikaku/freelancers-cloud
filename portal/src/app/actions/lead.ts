"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getServices } from "@/lib/data";
import { CONSENT_VERSION, EMPLOYEE_OPTIONS, MAX_REQUEST_SERVICES, TIMING_OPTIONS } from "@/lib/lead-options";
import { postWebhook, sendMail } from "@/lib/notify";
import { hasServiceRole, serviceClient } from "@/lib/supabase";
import { OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export interface LeadState {
  ok: boolean;
  errors?: Partial<Record<string, string>>;
  message?: string;
  redirectTo?: string;
  /** 送信したサービス（クライアントの GA4 計測用） */
  sent?: { id: string; name: string }[];
}

const text = (label: string, max: number) =>
  z.string().trim().min(1, `${label}を入力してください`).max(max, `${label}は${max}文字以内で入力してください`);

const schema = z.object({
  company: text("会社名", 100),
  name: text("氏名", 60),
  email: z.string().trim().min(1, "メールアドレスを入力してください").max(200).email("メールアドレスの形式が正しくありません"),
  phone: z.string().trim().max(30).regex(/^[0-9０-９+\-()\s]*$/, "電話番号の形式が正しくありません").optional(),
  timing: z.enum(TIMING_OPTIONS).optional().or(z.literal("")),
  employees: z.enum(EMPLOYEE_OPTIONS).optional().or(z.literal("")),
  message: z.string().trim().max(1000, "ご要望は1000文字以内で入力してください").optional(),
  source: z.string().max(200).optional(),
  medium: z.string().max(100).optional(),
  campaign: z.string().max(200).optional(),
  visitor_id: z.string().max(64).optional(),
  website: z.string().max(0).optional(), // ハニーポット
});

const FIELDS = ["company", "name", "email", "phone", "timing", "employees", "message", "source", "medium", "campaign", "visitor_id", "website"] as const;
const str = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : undefined;
};

/** 資料請求（1〜10サービスまとめて）。サービスごとに1件のリードを保存し、同じ request_id で束ねる。 */
export async function submitLeads(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const slugs = Array.from(new Set(formData.getAll("service_slugs").filter((v): v is string => typeof v === "string"))).slice(0, MAX_REQUEST_SERVICES);
  if (slugs.length === 0) return { ok: false, errors: { services: "請求するサービスを1つ以上選んでください" } };

  const parsed = schema.safeParse(Object.fromEntries(FIELDS.map((k) => [k, str(formData, k)])));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { ok: false, errors };
  }
  const d = parsed.data;

  const all = await getServices();
  const targets = slugs.map((slug) => all.find((s) => s.slug === slug)).filter((s) => !!s);
  if (targets.length === 0) return { ok: false, message: "対象のサービスが見つかりませんでした。ページを再読み込みしてもう一度お試しください。" };

  // 提携済みサービスへ入力内容を提供する場合は、本人の明示的な同意（未チェックのボックスを自分でオン）が必要
  const hasPartner = targets.some((s) => s!.partner_status !== "unpartnered");
  const thirdPartyConsent = formData.get("third_party_consent") === "on";
  if (hasPartner && !thirdPartyConsent) {
    return { ok: false, errors: { consent: "掲載契約のある提供会社への情報提供に同意いただく必要があります" } };
  }

  const redirectTo = `/thanks?s=${targets.map((s) => encodeURIComponent(s!.slug)).join(",")}`;
  const sent = targets.map((s) => ({ id: s!.id, name: s!.name }));

  if (!hasServiceRole) {
    console.warn("[lead] Supabase 未設定のため保存していません（デモモード）");
    return { ok: true, redirectTo, sent };
  }

  const db = serviceClient();
  const requestId = randomUUID();
  const rows = targets.map((s) => ({
    request_id: requestId,
    service_id: s!.id,
    service_name: s!.name,
    company: d.company,
    name: d.name,
    email: d.email,
    phone: d.phone || null,
    timing: d.timing || null,
    employees: d.employees || null,
    message: d.message || null,
    source: d.source || null,
    medium: d.medium || null,
    campaign: d.campaign || null,
    visitor_id: d.visitor_id || null,
    partner_status: s!.partner_status,
    consent_version: CONSENT_VERSION,
    third_party_consent: s!.partner_status !== "unpartnered" && thirdPartyConsent,
  }));
  const { data: leads, error } = await db.from("leads").insert(rows).select("lead_id, service_id, created_at");
  if (error || !leads) {
    console.error("[lead] insert failed:", error?.message);
    return { ok: false, message: "送信に失敗しました。時間をおいてもう一度お試しください。" };
  }

  // 需要データとして lead_submit イベントをサービスごとに記録（失敗してもリード自体は保存済み）
  const { error: evError } = await db.from("page_events").insert(
    targets.map((s) => ({
      event_name: "lead_submit",
      service_id: s!.id,
      path: "/request",
      visitor_id: d.visitor_id || null,
      source: d.source || null,
      medium: d.medium || null,
      campaign: d.campaign || null,
    })),
  );
  if (evError) console.error("[lead] event insert failed:", evError.message);

  const detail =
    `会社名: ${d.company}\n氏名: ${d.name}\nメール: ${d.email}\n電話: ${d.phone || "-"}\n検討時期: ${d.timing || "-"}\n従業員規模: ${d.employees || "-"}\n` +
    `ご要望: ${d.message || "-"}\n流入元: ${d.source || "-"} / ${d.medium || "-"} / ${d.campaign || "-"}\n`;

  const operator = process.env.LEAD_NOTIFY_EMAIL;
  if (operator) {
    await sendMail({
      to: operator,
      subject: `[${SITE_NAME}] 資料請求 ${targets.length}件: ${targets.map((s) => s!.name).join("、")}`.slice(0, 200),
      text: `request_id: ${requestId}\n請求サービス:\n${targets.map((s) => `- ${s!.name}`).join("\n")}\n\n${detail}`,
    });
  }

  // 提携済みサービスにのみ、広告主へメール／Webhook で通知（そのサービスの請求分だけ）
  for (const s of targets.filter((t) => t!.partner_status !== "unpartnered")) {
    const { data: contact } = await db.from("partner_contacts").select("notify_email, webhook_url").eq("service_id", s!.id).maybeSingle();
    const lead = leads.find((l) => l.service_id === s!.id);
    let notified = false;
    if (contact?.notify_email) {
      notified =
        (await sendMail({
          to: contact.notify_email,
          subject: `[${SITE_NAME}] 資料請求がありました: ${s!.name}`,
          text: `${OPERATOR_NAME} 経由で資料請求がありました。\n\nサービス: ${s!.name}\n${detail}`,
        })) || notified;
    }
    if (contact?.webhook_url) {
      notified =
        (await postWebhook(contact.webhook_url, {
          type: "lead.created",
          lead_id: lead?.lead_id,
          request_id: requestId,
          created_at: lead?.created_at,
          service: { id: s!.id, slug: s!.slug, name: s!.name },
          lead: { company: d.company, name: d.name, email: d.email, phone: d.phone || null, timing: d.timing || null, employees: d.employees || null, message: d.message || null },
        })) || notified;
    }
    if (notified && lead) await db.from("leads").update({ notified_at: new Date().toISOString() }).eq("lead_id", lead.lead_id);
  }

  return { ok: true, redirectTo, sent };
}
