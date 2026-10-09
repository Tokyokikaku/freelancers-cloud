"use server";

import { z } from "zod";
import { checkEmail } from "@/lib/contact-validation";
import { CONSENT_VERSION } from "@/lib/lead-options";
import { notifyOperator, sendMail } from "@/lib/notify";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { hasServiceRole, serviceClient } from "@/lib/supabase";

export interface ListingState {
  ok: boolean;
  errors?: Partial<Record<string, string>>;
  message?: string;
}

const TOPICS = ["listing", "listing_appo", "appo"] as const;
const TOPIC_LABEL: Record<(typeof TOPICS)[number], string> = {
  listing: "掲載希望",
  listing_appo: "掲載希望＋アポ化オプション",
  appo: "アポ化オプションのご相談",
};

const text = (label: string, max: number) =>
  z.string().trim().min(1, `${label}を入力してください`).max(max, `${label}は${max}文字以内で入力してください`);
const optional = (max: number) => z.string().trim().max(max, `${max}文字以内で入力してください`).optional();

const schema = z.object({
  topic: z.enum(TOPICS),
  company: text("会社名", 100),
  service_name: optional(100),
  service_url: z
    .string()
    .trim()
    .max(300, "300文字以内で入力してください")
    .refine((v) => v === "" || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v), "http(s)から始まるURLを入力してください")
    .optional(),
  name: text("ご担当者名", 60),
  email: z.string().trim().max(200).superRefine((v, ctx) => {
    const e = checkEmail(v);
    if (e) ctx.addIssue({ code: "custom", message: e });
  }),
  phone: z.string().trim().min(1, "電話番号を入力してください").max(30, "30文字以内で入力してください").refine((v) => /^\d{10,11}$/.test(v.replace(/[\s\-－ー−()（）]/g, "").replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))), "電話番号を正しく入力してください"),
  message: optional(1000),
  consent: z.literal("on", { message: "プライバシーポリシーへの同意が必要です" }),
  website: z.string().max(0).optional(), // ハニーポット
});

export async function submitListingInquiry(_prev: ListingState, formData: FormData): Promise<ListingState> {
  const raw: Record<string, string> = {};
  for (const [k, v] of formData.entries()) if (typeof v === "string") raw[k] = v;

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { ok: false, errors };
  }
  const d = parsed.data;
  if (d.website) return { ok: true }; // ボット：成功したように見せて破棄

  const row = {
    topic: d.topic,
    company: d.company,
    service_name: d.service_name || null,
    service_url: d.service_url || null,
    name: d.name,
    email: d.email,
    phone: d.phone || null,
    message: d.message || null,
    consent_version: CONSENT_VERSION,
  };

  let saved = false;
  if (hasServiceRole) {
    const { error } = await serviceClient().from("listing_inquiries").insert(row);
    if (error) console.error("[listing] insert failed:", error.message);
    else saved = true;
  }

  const hooked = await notifyOperator("listing", { ...row, topic_label: TOPIC_LABEL[d.topic] });

  let mailed = false;
  const operator = process.env.LEAD_NOTIFY_EMAIL;
  if (operator) {
    mailed = await sendMail({
      to: operator,
      subject: `[${SITE_NAME}] ${TOPIC_LABEL[d.topic]}: ${d.company}${d.service_name ? ` / ${d.service_name}` : ""}`.slice(0, 200),
      text:
        `種別: ${TOPIC_LABEL[d.topic]}\n会社名: ${d.company}\nサービス名: ${d.service_name || "-"}\nサービスURL: ${d.service_url || "-"}\n` +
        `ご担当者名: ${d.name}\nメール: ${d.email}\n電話: ${d.phone}\n\nご相談内容:\n${d.message || "-"}\n`,
    });
  }

  if (!saved && !mailed && !hooked) {
    console.warn("[listing] 保存先（Supabase / メール / NOTIFY_WEBHOOK_URL）が未設定です");
    return { ok: false, message: `現在フォームから送信できません。お手数ですが ${CONTACT_EMAIL} までメールでご連絡ください。` };
  }
  return { ok: true };
}
