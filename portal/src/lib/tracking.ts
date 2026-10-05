"use client";
import type { EventName } from "./types";

/** ブラウザ側の行動計測。GA4（gtag）と自前DB（/api/events）の両方へ送る。 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const VID_KEY = "snv_vid";
const SID_KEY = "snv_sid";
const ATTR_KEY = "snv_attr";

export interface Attribution {
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
}

function uuid(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  }
}

function readOrCreate(storage: Storage | undefined, key: string): string {
  try {
    if (!storage) return uuid();
    let v = storage.getItem(key);
    if (!v) {
      v = uuid();
      storage.setItem(key, v);
    }
    return v;
  } catch {
    return uuid();
  }
}

export const getVisitorId = () => readOrCreate(typeof window === "undefined" ? undefined : window.localStorage, VID_KEY);
export const getSessionId = () => readOrCreate(typeof window === "undefined" ? undefined : window.sessionStorage, SID_KEY);

/** 流入元。最初のページで UTM パラメータ → なければ外部リファラのホスト → なければ direct を保存する */
export function getAttribution(): Attribution {
  const empty: Attribution = { source: "direct", medium: "", campaign: "", referrer: "" };
  if (typeof window === "undefined") return empty;
  try {
    const saved = window.sessionStorage.getItem(ATTR_KEY);
    if (saved) return JSON.parse(saved) as Attribution;
    const params = new URLSearchParams(window.location.search);
    let referrerHost = "";
    try {
      const r = document.referrer ? new URL(document.referrer) : null;
      if (r && r.host !== window.location.host) referrerHost = r.host;
    } catch {}
    const attr: Attribution = {
      source: params.get("utm_source") || referrerHost || "direct",
      medium: params.get("utm_medium") || (referrerHost ? "referral" : ""),
      campaign: params.get("utm_campaign") || "",
      referrer: document.referrer.slice(0, 500),
    };
    window.sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
    return attr;
  } catch {
    return empty;
  }
}

export interface TrackParams {
  service_id?: string;
  service_name?: string;
  category_id?: string;
  category_name?: string;
  query?: string;
  results_count?: number;
  [key: string]: string | number | undefined;
}

/**
 * @param store false の場合は GA4 のみへ送る（サーバー側で保存済みのイベント用）
 */
export function track(name: EventName, params: TrackParams = {}, opts: { store?: boolean } = {}): void {
  if (typeof window === "undefined") return;
  const { store = true } = opts;

  try {
    window.gtag?.("event", name, params);
  } catch {}

  if (!store) return;
  try {
    const a = getAttribution();
    const body = JSON.stringify({
      event_name: name,
      service_id: params.service_id,
      category_id: params.category_id,
      query: params.query,
      results_count: params.results_count,
      path: window.location.pathname,
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      source: a.source,
      medium: a.medium,
      campaign: a.campaign,
      referrer: a.referrer,
    });
    const blob = new Blob([body], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/events", blob)) {
      void fetch("/api/events", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
    }
  } catch {}
}
