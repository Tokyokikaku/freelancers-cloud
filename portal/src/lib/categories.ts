import type { Category } from "./types";

/** 祖先カテゴリ（ルート → 親の順。自分自身は含まない） */
export function ancestors(categories: Category[], id: string): Category[] {
  const byId = new Map(categories.map((c) => [c.id, c]));
  const chain: Category[] = [];
  for (let cur = byId.get(id)?.parent_id, guard = 0; cur && guard < 10; guard++) {
    const parent = byId.get(cur);
    if (!parent) break;
    chain.unshift(parent);
    cur = parent.parent_id;
  }
  return chain;
}

/** 親子関係に沿って並べ、階層の深さを付ける（表示順は sort_order → 名前） */
export function flattenTree(categories: Category[]): { category: Category; depth: number }[] {
  const ids = new Set(categories.map((c) => c.id));
  const sorter = (a: Category, b: Category) => a.sort_order - b.sort_order || a.name.localeCompare(b.name, "ja");
  const out: { category: Category; depth: number }[] = [];
  const seen = new Set<string>();
  const walk = (parentId: string | null, depth: number) => {
    categories
      .filter((c) => (parentId === null ? !c.parent_id || !ids.has(c.parent_id) : c.parent_id === parentId))
      .sort(sorter)
      .forEach((c) => {
        if (seen.has(c.id)) return;
        seen.add(c.id);
        out.push({ category: c, depth });
        walk(c.id, depth + 1);
      });
  };
  walk(null, 0);
  return out;
}

/** カテゴリとその子孫のID */
export function descendantIds(categories: Category[], id: string): Set<string> {
  const ids = new Set([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const c of categories) {
      if (c.parent_id && ids.has(c.parent_id) && !ids.has(c.id)) {
        ids.add(c.id);
        grew = true;
      }
    }
  }
  return ids;
}
