import "server-only";

/**
 * 国税庁 法人番号公表サイト Web-API（https://www.houjin-bangou.nta.go.jp/webapi/）
 * アプリケーションID（HOUJIN_BANGOU_APP_ID）を設定すると有効になります。未設定のときは機能ごと無効（入力は自由入力のまま）。
 */
export interface Corporation {
  number: string; // 法人番号（13桁）
  name: string;
  address: string; // 都道府県+市区町村
}

const BASE = process.env.HOUJIN_API_BASE || "https://api.houjin-bangou.nta.go.jp/4";
const APP_ID = process.env.HOUJIN_BANGOU_APP_ID;

export const houjinEnabled = Boolean(APP_ID);

const decode = (s: string) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&").trim();
const tag = (block: string, name: string) => {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

/** XML（type=12）をパースする。閉鎖済みの法人は除く */
export function parseCorporations(xml: string): Corporation[] {
  const out: Corporation[] = [];
  for (const m of xml.matchAll(/<corporation>([\s\S]*?)<\/corporation>/g)) {
    const b = m[1];
    const number = tag(b, "corporateNumber");
    const name = tag(b, "name");
    if (!/^\d{13}$/.test(number) || !name) continue;
    if (tag(b, "closeDate")) continue;
    out.push({ number, name, address: `${tag(b, "prefectureName")}${tag(b, "cityName")}` });
  }
  return out;
}

async function call(path: string, params: Record<string, string>): Promise<string | null> {
  if (!APP_ID) return null;
  const qs = new URLSearchParams({ id: APP_ID, type: "12", ...params });
  try {
    const res = await fetch(`${BASE}/${path}?${qs}`, { next: { revalidate: 60 * 60 * 24 }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** 会社名の部分一致検索。前方一致→株式会社等の付いた名称の順に並べ、最大 limit 件 */
export async function searchCorporations(query: string, limit = 8): Promise<Corporation[]> {
  const q = query.trim();
  const xml = await call("name", { name: q, mode: "2", target: "1", change: "0", history: "0", close: "0" });
  if (!xml) return [];
  const bare = (n: string) => n.replace(/^(株式会社|有限会社|合同会社|合資会社|合名会社)\s*/, "").replace(/\s*(株式会社|有限会社|合同会社)$/, "");
  const rank = (c: Corporation) => (bare(c.name).startsWith(q) || c.name.startsWith(q) ? 0 : 1);
  return parseCorporations(xml)
    .sort((a, b) => rank(a) - rank(b) || a.name.length - b.name.length)
    .slice(0, limit);
}

/** 法人番号から法人を引く（送信時の再確認用）。見つからない・API不可のときは null */
export async function lookupCorporation(number: string): Promise<Corporation | null> {
  if (!/^\d{13}$/.test(number)) return null;
  const xml = await call("num", { number, history: "0" });
  if (!xml) return null;
  return parseCorporations(xml)[0] ?? null;
}
