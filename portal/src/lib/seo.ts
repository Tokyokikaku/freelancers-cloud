import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "./site";

/** ページごとのメタデータを組み立てる（title / description / canonical / OGP / Twitter） */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  titleAbsolute?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const fullTitle = opts.titleAbsolute ? opts.title : `${opts.title}｜${SITE_NAME}`;
  return {
    title: opts.titleAbsolute ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: opts.type ?? "website",
      images: [{ url: absoluteUrl("/og-default.png"), width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: opts.description, images: [absoluteUrl("/og-default.png")] },
  };
}

export function truncate(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}
