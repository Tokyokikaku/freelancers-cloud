import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticles, slugOf } from '../lib/articles';
import { SITE } from '../site.config';

export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishedAt,
      link: `/articles/${slugOf(a)}/`,
      categories: a.data.tags,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
