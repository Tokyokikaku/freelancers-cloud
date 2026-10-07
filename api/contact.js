'use strict';

// LPのお問い合わせフォームの受け口。
// 入力を検証して Google Apps Script（docs/contact-gas.gs）に転送する。
// GAS 側でスプレッドシートへの追記と info@tyokikaku.co.jp へのメール送信を行う。

const LIMITS = { name: 100, company: 100, email: 200, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 20000) reject(new Error('too large'));
    });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

const str = (v) => (typeof v === 'string' ? v.trim() : '');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'POST only' });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (!webhook || !secret) {
    console.error('CONTACT_WEBHOOK_URL / CONTACT_WEBHOOK_SECRET が未設定です');
    return send(res, 503, { error: '現在フォームをご利用いただけません。お手数ですが info@tyokikaku.co.jp までメールでご連絡ください。' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (e) {
    return send(res, 400, { error: '送信内容を読み取れませんでした。' });
  }

  // ボット対策：画面には出さない入力欄に値が入っていたら、成功を装って捨てる
  if (str(body.website)) return send(res, 200, { ok: true });

  const data = {
    name: str(body.name),
    company: str(body.company),
    email: str(body.email),
    message: str(body.message),
  };
  if (!data.name || !data.email || !data.message) {
    return send(res, 400, { error: 'お名前・メールアドレス・ご相談内容は必須です。' });
  }
  if (!EMAIL_RE.test(data.email)) {
    return send(res, 400, { error: 'メールアドレスの形式をご確認ください。' });
  }
  for (const key of Object.keys(LIMITS)) {
    if (data[key].length > LIMITS[key]) {
      return send(res, 400, { error: '入力が長すぎる項目があります。' });
    }
  }

  try {
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...data,
        secret,
        userAgent: String(req.headers['user-agent'] || '').slice(0, 300),
      }),
      redirect: 'follow', // GAS は 302 でレスポンスを返す
    });
    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || !result || !result.ok) {
      console.error('GAS error', upstream.status, result);
      return send(res, 502, { error: '送信に失敗しました。時間をおいて再度お試しいただくか、info@tyokikaku.co.jp までメールでご連絡ください。' });
    }
  } catch (e) {
    console.error('GAS fetch failed', e);
    return send(res, 502, { error: '送信に失敗しました。時間をおいて再度お試しいただくか、info@tyokikaku.co.jp までメールでご連絡ください。' });
  }

  return send(res, 200, { ok: true });
};
