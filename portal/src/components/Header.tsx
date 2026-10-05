import Link from "next/link";
import { getCategories } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";
import { Icon } from "./Icon";
import { SearchBox } from "./SearchBox";

export async function Header() {
  const categories = (await getCategories()).filter((c) => !c.parent_id);
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-page flex items-center gap-3 py-3 lg:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-ink" aria-label={`${SITE_NAME} トップへ`}>
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-600 text-white" aria-hidden="true">
            <Icon name="scale" className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">{SITE_NAME}</span>
        </Link>

        <div className="hidden min-w-0 flex-1 md:block lg:max-w-xl">
          <SearchBox id="header-search" />
        </div>

        <nav aria-label="メインメニュー" className="ml-auto hidden items-center gap-5 text-sm font-bold text-ink lg:flex">
          <Link href="/services" className="hover:text-brand-700">サービス一覧</Link>
          <Link href="/articles" className="hover:text-brand-700">記事</Link>
          <Link href="/about" className="hover:text-brand-700">成果報酬ナビとは</Link>
          <Link href="/services" className="btn-primary !min-h-10 !px-4 !py-2">サービスを探す</Link>
        </nav>

        <details className="group relative ml-auto md:ml-0 lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg border border-line [&::-webkit-details-marker]:hidden" aria-label="メニューを開く">
            <Icon name="menu" className="size-6 group-open:hidden" />
            <Icon name="close" className="hidden size-6 group-open:block" />
          </summary>
          <div className="absolute right-0 top-14 w-[min(88vw,20rem)] rounded-2xl border border-line bg-white p-4 shadow-xl">
            <ul className="space-y-1 text-sm font-bold text-ink">
              <li><Link className="block rounded-lg px-3 py-2.5 hover:bg-surface" href="/services">サービス一覧</Link></li>
              <li><Link className="block rounded-lg px-3 py-2.5 hover:bg-surface" href="/articles">記事</Link></li>
              <li><Link className="block rounded-lg px-3 py-2.5 hover:bg-surface" href="/about">成果報酬ナビとは</Link></li>
            </ul>
            <p className="mt-3 px-3 text-xs font-bold text-muted">カテゴリから探す</p>
            <ul className="mt-1 grid grid-cols-2 gap-1 text-sm">
              {categories.map((c) => (
                <li key={c.id}><Link className="block rounded-lg px-3 py-2 hover:bg-surface" href={`/category/${c.slug}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
        </details>
      </div>

      <div className="container-page pb-3 md:hidden">
        <SearchBox id="header-search-sm" />
      </div>

      <nav aria-label="カテゴリ" className="hidden border-t border-line bg-surface md:block">
        <ul className="container-page flex gap-1 overflow-x-auto py-1.5 text-sm">
          {categories.map((c) => (
            <li key={c.id} className="shrink-0">
              <Link href={`/category/${c.slug}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-body hover:bg-white hover:text-brand-700">
                <Icon name={c.icon ?? "other"} className="size-4" />{c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
