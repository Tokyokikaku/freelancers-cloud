// お問い合わせフォームの受付（Vercel Function）
// Resend (https://resend.com) 経由で info@tyokikaku.co.jp 宛にメールを送ります。
//
// 環境変数:
//   RESEND_API_KEY  必須。Resend の API キー
//   CONTACT_FROM    必須。Resend で認証済みドメインの送信元（例: 外注ドットコム <noreply@example.com>）
//   CONTACT_TO      任意。通知の宛先（既定: info@tyokikaku.co.jp）

const DEFAULT_TO = 'info@tyokikaku.co.jp';

const FIELDS = [
  ['company', '会社名・団体名', 100, true],
  ['name', 'お名前', 100, true],
  ['email', 'メールアドレス', 200, true],
  ['tel', '電話番号', 30, false],
  ['category', 'ご相談内容', 50, true],
  ['budget', 'ご予算', 50, false],
  ['timing', 'ご希望の時期', 50, false],
  ['message', 'ご相談内容の詳細', 3000, true],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const parseBody = (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  try {
    return JSON.parse(req.body || '{}');
  } catch {
    return null;
  }
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = parseBody(req);
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'invalid_body' });

  // スパム対策の隠し入力欄。入力されていたら成功を装って何もしない
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const values = {};
  for (const [key, label, max, required] of FIELDS) {
    const value = typeof body[key] === 'string' ? body[key].trim() : '';
    if (required && !value) return res.status(400).json({ error: 'missing_field', field: key });
    if (value.length > max) return res.status(400).json({ error: 'too_long', field: key });
    values[key] = value;
  }
  if (!EMAIL_RE.test(values.email)) return res.status(400).json({ error: 'invalid_email', field: 'email' });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) return res.status(503).json({ error: 'not_configured' });

  const lines = FIELDS.map(([key, label]) => `■${label}\n${values[key] || '（未入力）'}`);
  const text = `外注ドットコムのお問い合わせフォームから送信がありました。\n\n${lines.join('\n\n')}\n`;
  // 件名に改行を含められないように整形
  const subject = `【お問い合わせ】${values.company} ${values.name} 様`.replace(/[\r\n]+/g, ' ');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO || DEFAULT_TO],
        reply_to: values.email,
        subject,
        text,
      }),
    });
    if (!response.ok) {
      console.error('Resend error', response.status, await response.text());
      return res.status(502).json({ error: 'send_failed' });
    }
  } catch (error) {
    console.error('Resend request failed', error);
    return res.status(502).json({ error: 'send_failed' });
  }

  return res.status(200).json({ ok: true });
};
