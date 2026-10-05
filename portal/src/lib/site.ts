export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "成果報酬ナビ";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const OPERATOR_NAME = process.env.NEXT_PUBLIC_OPERATOR_NAME || "成果報酬ナビ編集部";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@tyokikaku.co.jp";
export const SITE_TAGLINE = "固定費をかけずに使えるサービスが、すぐ見つかる。";
export const SITE_DESCRIPTION =
  "成果報酬で依頼できる営業代行・採用・マーケティング・集客サービスを比較。初期費用・月額費用・成果地点・成果報酬額から自社に合ったサービスを探せます。";

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
