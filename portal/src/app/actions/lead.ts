"use server";

import { z } from "zod";
import { getServices } from "@/lib/data";
import { TIMING_OPTIONS } from "@/lib/lead-options";
import { postWebhook, sendMail } from "@/lib/notify";
import { hasServiceRole, serviceClient } from "@/lib/supabase";
import { OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export interface LeadState {
  ok: boolean;
  errors?: Partial<Record<string, string>>;
  message?: string;
  redirectTo?: string;
}

const text = (label: string, max: number) =>
  z.string().trim().min(1, `${label}を入力してください`).max(max, `${label}は${max}文字以内で入力してください`);

const schema = z.object({
  service_id: z.string().min(1).max(100),
  company: text("会社名", 100),
  name: text("氏名", 60),
  email: z.string().trim().min(1, "メールアドレスを入力してください").max(200).email("メールアドレスの形式が正しくありません"),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9０-９+\-()\s]*$/, "電話番号の形式が正しくありません")
    .optional(),
  timing: z.enum(TIMING_OPTIONS).optional().or(z.literal("")),
  source: z.string().max(200).optional(),
  medium: z.string().max(100).optional(),
  campaign: z.string().max(200).optional(),
  visitor_id: z.string().max(64).optional(),
  website: z.string().max(0).optional(), // ハニーポット（人間は空のまま）
});

const str = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : undefined;
};

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = schema.safeParse(Object.fromEntries(["service_id", "company", "name", "email", "phone", "timing", "source", "medium", "campaign", "visitor_id", "website"].map((k) => [k, str(formData, k)])));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { ok: false, errors };
  }
  const d = parsed.data;

  const service = (await getServices()).find((s) => s.id === d.service_id);
  if (!service) return { ok: false, message: "対象のサービスが見つかりませんでした。ページを再読み込みしてもう一度お試しください。" };

  const redirectTo = `/thanks?service=${encodeURIComponent(service.slug)}`;

  if (!hasServiceRole) {
    // デモモード（Supabase 未設定）: 保存せず、画面遷移だけ確認できるようにする
    console.warn("[lead] Supabase 未設定のため保存していません（デモモード）");
    return { ok: true, redirectTo };
  }

  const db = serviceClient();
  const { data: lead, error } = await db
    .from("leads")
    .insert({
      service_id: service.id,
      service_name: service.name,
      company: d.company,
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      timing: d.timing || null,
      source: d.source || null,
      medium: d.medium || null,
      campaign: d.campaign || null,
      visitor_id: d.visitor_id || null,
      partner_status: service.partner_status,
    })
    .select("lead_id, created_at")
    .single();
  if (error || !lead) {
    console.error("[lead] insert failed:", error?.message);
    return { ok: false, message: "送信に失敗しました。時間をおいてもう一度お試しください。" };
  }

  // 需要データとして lead_submit イベントも記録（失敗してもリード自体は保存済み）
  await db
    .from("page_events")
    .insert({
      event_name: "lead_submit",
      service_id: service.id,
      path: `/services/${service.slug}`,
      visitor_id: d.visitor_id || null,
      source: d.source || null,
      medium: d.medium || null,
      campaign: d.campaign || null,
    })
    .then(({ error: e }) => e && console.error("[lead] event insert failed:", e.message));

  const summary =
    `サービス: ${service.name}\n会社名: ${d.company}\n氏名: ${d.name}\nメール: ${d.email}\n電話: ${d.phone || "-"}\n` +
    `検討時期: ${d.timing || "-"}\n流入元: ${d.source || "-"} / ${d.medium || "-"} / ${d.campaign || "-"}\nlead_id: ${lead.lead_id}\n`;

  // 運営側への通知（任意）
  const operator = process.env.LEAD_NOTIFY_EMAIL;
  if (operator) {
    await sendMail({ to: operator, subject: `[${SITE_NAME}] 新規リード: ${service.name}`, text: summary });
  }

  // 提携済みサービスの場合のみ、広告主へメール／Webhook で通知
  if (service.partner_status !== "unpartnered") {
    const { data: contact } = await db
      .from("partner_contacts")
      .select("notify_email, webhook_url")
      .eq("service_id", service.id)
      .maybeSingle();
    let notified = false;
    if (contact?.notify_email) {
      notified =
        (await sendMail({
          to: contact.notify_email,
          subject: `[${SITE_NAME}] 資料請求がありました: ${service.name}`,
          text: `${OPERATOR_NAME} 経由で資料請求がありました。\n\n${summary}`,
        })) || notified;
    }
    if (contact?.webhook_url) {
      notified =
        (await postWebhook(contact.webhook_url, {
          type: "lead.created",
          lead_id: lead.lead_id,
          created_at: lead.created_at,
          service: { id: service.id, slug: service.slug, name: service.name },
          lead: { company: d.company, name: d.name, email: d.email, phone: d.phone || null, timing: d.timing || null },
        })) || notified;
    }
    if (notified) await db.from("leads").update({ notified_at: new Date().toISOString() }).eq("lead_id", lead.lead_id);
  }

  return { ok: true, redirectTo };
}
