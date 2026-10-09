import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** 公開データの読み取りが可能か（未設定ならデモモード＝src/data/seed.json を使用） */
export const isSupabaseConfigured = Boolean(URL && ANON);
/** 管理・集計・書き込みに使う service_role キーが設定されているか */
export const hasServiceRole = Boolean(URL && SERVICE);

export const DATA_TAG = "db";
export const DATA_REVALIDATE_SECONDS = 300;

/** GET リクエストを Next のデータキャッシュに載せる（POST/PATCH などはそのまま） */
const cachedFetch: typeof fetch = (input, init) => {
  const method = (init?.method ?? "GET").toUpperCase();
  if (method !== "GET") return fetch(input, init);
  return fetch(input, { ...init, next: { revalidate: DATA_REVALIDATE_SECONDS, tags: [DATA_TAG] } });
};

let _public: SupabaseClient | null = null;
/** 公開サイト用（anon キー + RLS で公開済みデータのみ）。結果は 5 分キャッシュ */
export function publicClient(): SupabaseClient {
  if (!URL || !ANON) throw new Error("Supabase is not configured");
  _public ??= createClient(URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: cachedFetch },
  });
  return _public;
}

let _admin: SupabaseClient | null = null;
/** サーバー専用（service_role）。RLS をバイパスするため、必ず管理者確認後／サーバー処理内でのみ使うこと */
export function serviceClient(cache = false): SupabaseClient {
  if (!URL || !SERVICE) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  if (cache) {
    return createClient(URL, SERVICE, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: cachedFetch },
    });
  }
  _admin ??= createClient(URL, SERVICE, { auth: { persistSession: false, autoRefreshToken: false } });
  return _admin;
}
