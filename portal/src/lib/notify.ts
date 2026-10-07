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
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    // Apps Script の Web アプリは 302 で結果を返す。実行は POST 時点で完了しているので、リダイレクト先の応答で成否を判断する
    const res = await fetch(u, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: process.env.NOTIFY_WEBHOOK_SECRET ?? "", type, at: new Date().toISOString(), ...data }),
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    // Apps Script は成功時に "ok" を返す（URL違い・権限エラーでも HTTP 200 の HTML が返るため、本文で判定する）
    const body = (await res.text()).trim();
    if (!res.ok || body !== "ok") console.error("[notify] operator webhook failed", res.status, body.slice(0, 80));
    return res.ok && body === "ok";
  } catch (e) {
    console.error("[notify] operator webhook error", e);
    return false;
  }
}
