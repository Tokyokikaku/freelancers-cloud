"use client";
import { useSyncExternalStore } from "react";

export const MAX_COMPARE = 3;
const KEY = "snv_compare";

export interface CompareItem {
  slug: string;
  name: string;
}

const listeners = new Set<() => void>();
let cache: { raw: string | null; items: CompareItem[] } = { raw: null, items: [] };
const EMPTY: CompareItem[] = [];

function read(): CompareItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.items;
    const parsed = raw ? (JSON.parse(raw) as CompareItem[]) : [];
    const items = Array.isArray(parsed)
      ? parsed.filter((i) => i && typeof i.slug === "string" && typeof i.name === "string").slice(0, MAX_COMPARE)
      : [];
    cache = { raw, items };
    return items;
  } catch {
    return EMPTY;
  }
}

function write(items: CompareItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
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

export function useCompare() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    items,
    has: (slug: string) => items.some((i) => i.slug === slug),
    toggle(item: CompareItem) {
      const cur = read();
      if (cur.some((i) => i.slug === item.slug)) write(cur.filter((i) => i.slug !== item.slug));
      else if (cur.length < MAX_COMPARE) write([...cur, item]);
    },
    remove: (slug: string) => write(read().filter((i) => i.slug !== slug)),
    clear: () => write([]),
  };
}
