import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../site.config';

export type Article = CollectionEntry<'articles'>;

/** 公開記事（draft除外）を新しい順で返す */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

/** 記事のURLスラッグ（samples/foo → foo） */
export function slugOf(a: Article): string {
  return a.id.split('/').pop()!.replace(/\.(md|mdx)$/, '');
}

export const articleUrl = (a: Article) => `/articles/${slugOf(a)}/`;
export const tagUrl = (tag: string) => `/tags/${encodeURIComponent(tag)}/`;

export function collectTags(articles: Article[]): [string, number][] {
  const map = new Map<string, number>();
  for (const a of articles) for (const t of a.data.tags) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ja'));
}

/** タグの重なりが多い順、同点なら新しい順 */
export function relatedArticles(current: Article, all: Article[], limit = 3): Article[] {
  const tags = new Set(current.data.tags);
  return all
    .filter((a) => a.id !== current.id)
    .map((a) => ({
      a,
      score: a.data.tags.filter((t) => tags.has(t)).length + (a.data.type === current.data.type ? 0.5 : 0),
    }))
    .sort((x, y) => y.score - x.score || y.a.data.publishedAt.getTime() - x.a.data.publishedAt.getTime())
    .slice(0, limit)
    .map((x) => x.a);
}

export const formatDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const absoluteUrl = (path: string) => new URL(path, SITE.url).toString();
