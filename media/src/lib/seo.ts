import { SITE } from '../site.config';
import type { Article } from './articles';
import { absoluteUrl, isoDate, slugOf } from './articles';

export function articleJsonLd(a: Article, imageUrl: string) {
  const d = a.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.title,
    description: d.description,
    image: [imageUrl],
    datePublished: isoDate(d.publishedAt),
    dateModified: isoDate(d.updatedAt ?? d.publishedAt),
    mainEntityOfPage: absoluteUrl(`/articles/${slugOf(a)}/`),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    about: { '@type': 'WebSite', name: d.service.name, url: d.service.url },
    keywords: d.tags.join(','),
    inLanguage: SITE.lang,
  };
}
