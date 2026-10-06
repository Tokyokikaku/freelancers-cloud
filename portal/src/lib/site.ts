export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "成果報酬ナビ";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const OPERATOR_NAME = process.env.NEXT_PUBLIC_OPERATOR_NAME || "成果報酬ナビ編集部";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@tyokikaku.co.jp";
export const SITE_TAGLINE = "初期費用なし、リスクなしで事業を推進。";
export const SITE_TITLE = `初期費用なし・リスクなしで事業を推進｜成果報酬サービスを比較｜${SITE_NAME}`;
export const SITE_DESCRIPTION =
  "再生数・問い合わせ数・アポ数などの実績に応じて支払う成果報酬サービスを比較。必須の月額固定費なし。営業代行・広告運用・採用・補助金申請支援などを、初期費用0円・月額0円・完全成果報酬などの条件で探せます。";

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
