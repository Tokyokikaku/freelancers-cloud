import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "ホーム", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="パンくずリスト" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-brand-700 hover:underline">{c.name}</Link>
              ) : (
                <span aria-current={i === all.length - 1 ? "page" : undefined}>{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            ...(c.href ? { item: absoluteUrl(c.href) } : {}),
          })),
        }}
      />
    </>
  );
}
