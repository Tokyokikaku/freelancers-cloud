'use strict';

const crypto = require('crypto');
const { buildSystem } = require('./_prompt');

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const MAX_TOKENS = parseInt(process.env.MAX_OUTPUT_TOKENS, 10) || 32000;
const API_BASE = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/+$/, '');
const MAX_TOTAL_CHARS = 200000;

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > MAX_TOTAL_CHARS * 2) reject(new Error('too large'));
    });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function fail(res, status, message) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ error: message }));
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) return false;
  let total = 0;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m || typeof m.content !== 'string' || !m.content.trim()) return false;
    if (m.role !== (i % 2 === 0 ? 'user' : 'assistant')) return false;
    total += m.content.length;
  }
  return messages[messages.length - 1].role === 'user' && total <= MAX_TOTAL_CHARS;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(res, 405, 'POST only');
  }

  const accessCode = process.env.ACCESS_CODE;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!accessCode || !apiKey) {
    return fail(res, 503, 'サーバ未設定です。環境変数 ANTHROPIC_API_KEY と ACCESS_CODE を設定してください。');
  }
  if (!safeEqual(req.headers['x-access-code'] || '', accessCode)) {
    return fail(res, 401, 'アクセスコードが違います。');
  }

  let body;
  try {
    body = await readBody(req);
  } catch (e) {
    return fail(res, 400, 'リクエストを読み取れませんでした。');
  }
  if (!validateMessages(body.messages)) {
    return fail(res, 400, 'messages が不正、または長すぎます（合計20万字まで）。');
  }

  let upstream;
  try {
    upstream = await fetch(`${API_BASE}/v1/messages`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        stream: true,
        system: buildSystem({ icons: body.icons === true }),
        messages: body.messages.map(({ role, content }) => ({ role, content })),
      }),
    });
  } catch (e) {
    return fail(res, 502, 'Claude API に接続できませんでした。');
  }

  if (!upstream.ok || !upstream.body) {
    let detail = '';
    try { detail = (await upstream.text()).slice(0, 300); } catch (e) { /* ignore */ }
    console.error('upstream error', upstream.status, detail);
    return fail(res, 502, `Claude API がエラーを返しました（${upstream.status}）。`);
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Accel-Buffering', 'no');

  const decoder = new TextDecoder();
  let buf = '';
  let stopReason = null;

  const handleEvent = (block) => {
    const dataLine = block.split('\n').find((l) => l.startsWith('data:'));
    if (!dataLine) return;
    let ev;
    try { ev = JSON.parse(dataLine.slice(5).trim()); } catch (e) { return; }
    if (ev.type === 'content_block_delta' && ev.delta && ev.delta.type === 'text_delta') {
      res.write(ev.delta.text);
    } else if (ev.type === 'message_delta' && ev.delta) {
      stopReason = ev.delta.stop_reason || stopReason;
    } else if (ev.type === 'error') {
      console.error('stream error', ev.error);
      res.write('\n\n⚠️ 生成中にエラーが発生しました。もう一度お試しください。');
    }
  };

  try {
    for await (const chunk of upstream.body) {
      buf += decoder.decode(chunk, { stream: true });
      let idx;
      while ((idx = buf.indexOf('\n\n')) !== -1) {
        handleEvent(buf.slice(0, idx));
        buf = buf.slice(idx + 2);
      }
    }
    if (buf.trim()) handleEvent(buf);
    if (stopReason === 'max_tokens') {
      res.write('\n\n⚠️ 出力が長さの上限に達して途中で切れました。枚数を減らして再生成してください。');
    }
  } catch (e) {
    console.error('stream failed', e);
    res.write('\n\n⚠️ 通信が途中で切れました。もう一度お試しください。');
  }
  res.end();
};
