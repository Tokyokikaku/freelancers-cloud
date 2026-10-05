import "server-only";

/** リード通知。Resend（メール）と Webhook を fetch で呼ぶだけの薄い実装。未設定ならスキップ。 */

export async function sendMail(opts: { to: string; subject: string; text: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to: [opts.to], subject: opts.subject, text: opts.text }),
    });
    if (!res.ok) console.error("[mail] resend failed", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("[mail] resend error", e);
    return false;
  }
}

export async function postWebhook(url: string, payload: unknown): Promise<boolean> {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const res = await fetch(u, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch (e) {
    console.error("[webhook] failed", e);
    return false;
  }
}
