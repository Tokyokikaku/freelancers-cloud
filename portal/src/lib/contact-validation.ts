/**
 * 資料請求フォームの連絡先チェック（サーバー・ブラウザ共通）。
 * - メール: フリーメール・プロバイダメール・使い捨てメールは不可（会社のメールアドレスのみ）
 * - 電話: 担当者の携帯電話（070/080/090）のみ。固定電話・IP電話と、適当な入力は不可
 */

const FREE_MAIL_DOMAINS = [
  // 海外のフリーメール
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "outlook.com", "hotmail.com", "live.com", "msn.com",
  "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com", "pm.me", "mail.com", "gmx.com", "gmx.net",
  "zoho.com", "yandex.com", "yandex.ru", "mail.ru", "qq.com", "163.com", "126.com", "naver.com", "hanmail.net", "daum.net",
  "outlook.jp", "hotmail.co.jp", "live.jp",
  // 国内のフリーメール・キャリアメール・プロバイダメール
  "yahoo.co.jp", "ezweb.ne.jp", "docomo.ne.jp", "softbank.ne.jp", "i.softbank.jp", "au.com", "ymobile.ne.jp", "uqmobile.jp",
  "rakuten.jp", "nifty.com", "biglobe.ne.jp", "ocn.ne.jp", "so-net.ne.jp", "plala.or.jp", "dion.ne.jp", "jcom.zaq.ne.jp",
  "zaq.ne.jp", "ybb.ne.jp", "excite.co.jp", "goo.jp", "infoseek.jp", "mineo.jp", "line.me",
  // 使い捨て（一時）メール
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org", "yopmail.com", "trashmail.com",
  "sharklasers.com", "throwawaymail.com", "dispostable.com", "getnada.com", "maildrop.cc", "fakeinbox.com",
];

export function emailDomain(email: string): string {
  return email.trim().toLowerCase().split("@").pop() ?? "";
}

export function isFreeMail(email: string): boolean {
  const d = emailDomain(email);
  return FREE_MAIL_DOMAINS.some((f) => d === f || d.endsWith(`.${f}`));
}

/** エラーメッセージ。問題なければ null */
export function checkEmail(raw: string): string | null {
  const v = raw.trim();
  if (!v) return "メールアドレスを入力してください";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "メールアドレスの形式が正しくありません";
  if (isFreeMail(v)) return "フリーメール・携帯キャリア・プロバイダのメールアドレスはご利用いただけません。会社のメールアドレスを入力してください";
  return null;
}

/** 全角→半角、記号・空白を除去、+81 を 0 に */
export function normalizePhone(raw: string): string {
  let s = raw.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[＋]/g, "+").replace(/[ー−－‐―–—ｰ]/g, "-");
  s = s.replace(/[\s\-()（）.・]/g, "");
  if (s.startsWith("+81")) s = `0${s.slice(3)}`;
  else if (s.startsWith("0081")) s = `0${s.slice(4)}`;
  return s;
}

export function formatMobile(digits: string): string {
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

/** 連番・同一数字・繰り返しなど、ダミーに多いパターン */
function looksFake(digits: string): boolean {
  const body = digits.slice(3); // 070/080/090 を除く8桁
  if (/^(\d)\1+$/.test(body)) return true; // 00000000, 11111111
  if (/(\d)\1{5,}/.test(body)) return true; // 同じ数字が6連続以上
  const halves = [body.slice(0, 4), body.slice(4)];
  if (halves[0] === halves[1]) return true; // 12341234 など
  const asc = "01234567890123456789";
  const desc = "98765432109876543210";
  for (let i = 0; i + 6 <= body.length; i++) {
    const chunk = body.slice(i, i + 6);
    if (asc.includes(chunk) || desc.includes(chunk)) return true; // 123456, 987654
  }
  if (/^(\d\d)\1{3}$/.test(body)) return true; // 12121212
  if (/^(\d)(\d)(\1\2){3}$/.test(body)) return true;
  return false;
}

/** 担当者の携帯電話（070/080/090）であるか。問題なければ null */
export function checkMobilePhone(raw: string): string | null {
  const v = raw.trim();
  if (!v) return "電話番号（担当者さまの携帯電話）を入力してください";
  if (!/^[0-9０-９+＋\-ー−－‐―–—ｰ\s()（）.・]+$/.test(v)) return "電話番号は数字で入力してください";
  const d = normalizePhone(v);
  if (!/^\d+$/.test(d)) return "電話番号の形式が正しくありません";
  if (!/^0[789]0\d{8}$/.test(d)) {
    if (/^0[1-9]\d{8}$/.test(d) || /^0120|^0800|^050/.test(d)) return "固定電話・IP電話・フリーダイヤルは使用できません。担当者さまの携帯電話番号（070/080/090）を入力してください";
    return "携帯電話番号（070/080/090で始まる11桁）を入力してください";
  }
  if (looksFake(d)) return "入力された電話番号が正しくないようです。連絡の取れる携帯電話番号を入力してください";
  return null;
}
