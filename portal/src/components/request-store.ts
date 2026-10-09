"use client";
import { useSyncExternalStore } from "react";
import { MAX_REQUEST_SERVICES } from "@/lib/lead-options";

/** 資料請求リスト（BOXILの「資料請求リスト」に相当）。この端末の localStorage に保存する。 */
const KEY = "snv_request";

export interface RequestItem {
  id: string;
  slug: string;
  name: string;
}

const listeners = new Set<() => void>();
let cache: { raw: string | null; items: RequestItem[] } = { raw: null, items: [] };
const EMPTY: RequestItem[] = [];

function read(): RequestItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.items;
    const parsed = raw ? (JSON.parse(raw) as RequestItem[]) : [];
    const items = Array.isArray(parsed)
      ? parsed.filter((i) => i && typeof i.slug === "string" && typeof i.name === "string" && typeof i.id === "string").slice(0, MAX_REQUEST_SERVICES)
      : [];
    cache = { raw, items };
    return items;
  } catch {
    return EMPTY;
  }
}

function write(items: RequestItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX_REQUEST_SERVICES)));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useRequestList() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    items,
    has: (slug: string) => items.some((i) => i.slug === slug),
    full: items.length >= MAX_REQUEST_SERVICES,
    toggle(item: RequestItem) {
      const cur = read();
      if (cur.some((i) => i.slug === item.slug)) write(cur.filter((i) => i.slug !== item.slug));
      else if (cur.length < MAX_REQUEST_SERVICES) write([...cur, item]);
    },
    add(list: RequestItem[]) {
      const cur = read();
      const merged = [...cur];
      for (const i of list) if (!merged.some((m) => m.slug === i.slug) && merged.length < MAX_REQUEST_SERVICES) merged.push(i);
      write(merged);
    },
    remove: (slug: string) => write(read().filter((i) => i.slug !== slug)),
    removeMany: (slugs: string[]) => write(read().filter((i) => !slugs.includes(i.slug))),
    set: (list: RequestItem[]) => write(list),
    clear: () => write([]),
  };
}

/** solo: 1社だけ請求する（人気上位サービスを自動で選ばない） */
export const requestHref = (slugs: string[], opts: { solo?: boolean } = {}) =>
  `/request?s=${slugs.map(encodeURIComponent).join(",")}${opts.solo ? "&solo=1" : ""}`;
