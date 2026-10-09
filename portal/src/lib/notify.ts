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

/**
 * 運営者向けの通知（Google スプレッドシート＋Apps Script の Web アプリ想定）。
 * NOTIFY_WEBHOOK_URL 未設定ならスキップ。NOTIFY_WEBHOOK_SECRET は Apps Script 側で照合する。
 */
export async function notifyOperator(type: "listing" | "lead", data: Record<string, unknown>): Promise<boolean> {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return false;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return false;
  }
  if (u.protocol !== "https:") return false;
  const body = JSON.stringify({ secret: process.env.NOTIFY_WEBHOOK_SECRET ?? "", type, at: new Date().toISOString(), ...data });

  // Apps Script の Web アプリは、まれに一時的なエラーページ（HTTP 200 の HTML）を返す。成功は本文が "ok" のときだけとみなし、失敗時は数回やり直す
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      // 実行は POST 時点で完了し、302 のリダイレクト先に結果が返る
      const res = await fetch(u, {
        method: "POST",
        headers: { "content-type": "text/plain;charset=utf-8" },
        body,
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });
      const text = (await res.text()).trim();
      if (res.ok && text === "ok") return true;
      console.error(`[notify] operator webhook failed (try ${attempt})`, res.status, text.slice(0, 80));
    } catch (e) {
      console.error(`[notify] operator webhook error (try ${attempt})`, e);
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, 1000 * attempt));
  }
  return false;
}
