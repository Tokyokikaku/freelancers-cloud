import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './site.config';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      type: z.enum(['introduction', 'interview']),
      category: z.enum(CATEGORY_SLUGS),
      tags: z.array(z.string()).default([]),
      service: z.object({
        name: z.string(),
        url: z.string().url(),
        developerName: z.string(),
        developerXHandle: z.string().optional(),
        techStack: z.array(z.string()).default([]),
        launchedAt: z.coerce.date().optional(),
      }),
      // 出典URLと確認日は必須。欠けているとビルドエラーになり、出典のない数字は公開されない
      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            sourceUrl: z.string().url(),
            checkedAt: z.coerce.date(),
          }),
        )
        .default([]),
      // 以前の記事との互換用（画面には表示しない）
      verified: z.boolean().default(false),
      // 記事ごとのサムネイル／OGP画像（任意）。サービス画面・他人の投稿のスクショは使わないこと
      ogImage: image().optional(),
      // true にするとトップのニュース帯・一覧に出さない下書き扱い
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
