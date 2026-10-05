import type { Category, OutcomeType, Service } from "./types";

/**
 * サイト内検索。MVP は辞書 + 全文一致 + 文字bigramの簡易スコアリング。
 * 将来 AI 検索（埋め込み検索や LLM による意図解析）に置き換える場合は、`SearchEngine` を実装して
 * `searchEngine` を差し替えるだけでよい（呼び出し側は変更不要）。
 */
export interface SearchResult {
  service: Service;
  score: number;
}
export interface SearchContext {
  categories: Category[];
}
export interface SearchEngine {
  search(services: Service[], query: string, ctx: SearchContext): SearchResult[] | Promise<SearchResult[]>;
}

/** 自然文から読み取る「意図」。例: 「商談が取れた時だけ料金が発生する営業代行」→ 成果地点=商談 + 完全成果報酬 + カテゴリ=営業 */
export interface SearchIntent {
  outcome: OutcomeType[];
  zeroInitial: boolean;
  zeroMonthly: boolean;
  fullSuccess: boolean;
  freeConsultation: boolean;
}

const OUTCOME_KEYWORDS: [OutcomeType, string[]][] = [
  ["appointment", ["アポ", "アポイント", "テレアポ", "面談獲得"]],
  ["meeting", ["商談"]],
  ["contract", ["成約", "受注", "契約"]],
  ["hire", ["採用", "入社", "内定", "雇用"]],
  ["lead", ["リード", "問い合わせ", "問合せ", "資料請求", "見込み客", "見込客"]],
  ["sale", ["購入", "売上", "売り上げ", "販売", "注文", "コンバージョン", "cv"]],
  ["click", ["クリック", "表示"]],
  ["matching", ["マッチング"]],
];

export function normalize(text: string): string {
  return text.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

export function parseIntent(rawQuery: string): SearchIntent {
  const q = normalize(rawQuery);
  const outcome = OUTCOME_KEYWORDS.filter(([, words]) => words.some((w) => q.includes(w))).map(([o]) => o);
  return {
    outcome,
    zeroInitial: /初期費用(が)?(0|ゼロ|無料|なし|不要)/.test(q),
    zeroMonthly: /月額(費用|料金)?(が)?(0|ゼロ|無料|なし|不要)/.test(q),
    fullSuccess: /完全(成果|成功)報酬|(成果|成功)報酬のみ|(時|とき|場合|だけ|のみ).{0,6}(料金|費用|報酬).{0,4}(発生|かかる)|固定費(なし|不要|0)/.test(q),
    freeConsultation: /無料相談/.test(q),
  };
}

/** 検索語として使わない助詞・定型句（意図解析で拾い済みの語は除外） */
const NOISE = /(が|を|に|は|で|の|も|と|から|まで|だけ|のみ|時|とき|場合|料金|費用|発生する|発生|できる|したい|探したい|サービス|会社|おすすめ)/g;

function bigrams(s: string): string[] {
  const chars = Array.from(s);
  if (chars.length < 2) return chars;
  const out: string[] = [];
  for (let i = 0; i < chars.length - 1; i++) out.push(chars[i] + chars[i + 1]);
  return out;
}

interface Doc {
  name: string;
  company: string;
  categories: string;
  condition: string;
  features: string;
  summary: string;
  description: string;
}

function toDoc(s: Service, catById: Map<string, Category>): Doc {
  return {
    name: normalize(s.name),
    company: normalize(s.company_name),
    categories: normalize(s.category_ids.map((id) => catById.get(id)?.name ?? "").join(" ")),
    condition: normalize(`${s.success_condition ?? ""} ${s.success_fee ?? ""}`),
    features: normalize(s.features.join(" ")),
    summary: normalize(s.summary ?? ""),
    description: normalize(s.description ?? ""),
  };
}

const WEIGHTS: Record<keyof Doc, number> = {
  name: 10,
  company: 6,
  categories: 5,
  condition: 4,
  features: 3,
  summary: 3,
  description: 1,
};

export const defaultSearchEngine: SearchEngine = {
  search(services, rawQuery, ctx) {
    const q = normalize(rawQuery);
    if (!q) return services.map((service) => ({ service, score: 0 }));

    const catById = new Map(ctx.categories.map((c) => [c.id, c]));
    const intent = parseIntent(q);
    const terms = q.split(" ").filter(Boolean);
    // 問い合わせ文全体に含まれるカテゴリ名（例: 「…営業代行」→ 営業代行 / 営業）
    const mentionedCategoryIds = new Set(
      ctx.categories.filter((c) => q.includes(normalize(c.name))).map((c) => c.id),
    );

    const results: SearchResult[] = [];
    for (const service of services) {
      const doc = toDoc(service, catById);
      const all = Object.values(doc).join(" ");
      let score = 0;

      for (const term of terms) {
        let hit = false;
        for (const key of Object.keys(WEIGHTS) as (keyof Doc)[]) {
          if (doc[key].includes(term)) {
            score += WEIGHTS[key];
            hit = true;
          }
        }
        if (!hit && term.length >= 3) {
          // 完全一致しない自然文は、助詞を除いた文字bigramの一致率で部分点を与える
          const grams = bigrams(term.replace(NOISE, ""));
          if (grams.length >= 2) {
            const coverage = grams.filter((g) => all.includes(g)).length / grams.length;
            if (coverage >= 0.6) score += 3 * coverage;
          }
        }
      }

      if (intent.outcome.includes(service.outcome_type)) score += 6;
      if (intent.fullSuccess && service.is_full_success_fee) score += 5;
      if (intent.zeroInitial && service.initial_fee_type === "free") score += 3;
      if (intent.zeroMonthly && service.monthly_fee_type === "free") score += 3;
      if (intent.freeConsultation && service.has_free_consultation) score += 3;
      if (service.category_ids.some((id) => mentionedCategoryIds.has(id))) score += 6;

      if (score > 0) results.push({ service, score });
    }
    results.sort((a, b) => b.score - a.score || a.service.name.localeCompare(b.service.name, "ja"));
    // 最上位に対して関連度が極端に低い結果（助詞や共通語だけの偶然一致）は除外する
    const top = results[0]?.score ?? 0;
    return results.filter((r) => r.score >= top * 0.3);
  },
};

export const searchEngine: SearchEngine = defaultSearchEngine;

// ───────────── 絞り込み ─────────────
export interface ServiceFilters {
  category?: string; // カテゴリ slug
  outcome?: OutcomeType;
  zeroInitial?: boolean;
  zeroMonthly?: boolean;
  fullSuccess?: boolean;
  freeConsultation?: boolean;
}

export function applyFilters(services: Service[], f: ServiceFilters, categories: Category[]): Service[] {
  let allowed: Set<string> | null = null;
  if (f.category) {
    const root = categories.find((c) => c.slug === f.category);
    if (root) {
      allowed = new Set([root.id]);
      let grew = true;
      while (grew) {
        grew = false;
        for (const c of categories) {
          if (c.parent_id && allowed.has(c.parent_id) && !allowed.has(c.id)) {
            allowed.add(c.id);
            grew = true;
          }
        }
      }
    }
  }
  return services.filter(
    (s) =>
      (!allowed || s.category_ids.some((id) => allowed!.has(id))) &&
      (!f.outcome || s.outcome_type === f.outcome) &&
      (!f.zeroInitial || s.initial_fee_type === "free") &&
      (!f.zeroMonthly || s.monthly_fee_type === "free") &&
      (!f.fullSuccess || s.is_full_success_fee) &&
      (!f.freeConsultation || s.has_free_consultation),
  );
}
