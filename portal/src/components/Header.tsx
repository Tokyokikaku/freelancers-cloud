import Link from "next/link";
import { getCategories } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";
import { HeaderRequestLink } from "./HeaderRequestLink";
import { Icon } from "./Icon";
import { SearchBox } from "./SearchBox";

export async function Header() {
  const categories = (await getCategories()).filter((c) => !c.parent_id);
  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_1px_0_var(--color-line)]">
      <div className="container-page flex items-center gap-3 py-3 lg:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2" aria-label={`${SITE_NAME} トップへ`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={34} height={34} className="size-7 shrink-0 self-center sm:size-9" />
          <span className="text-[1.2rem] sm:text-[1.45rem] font-[family-name:var(--font-logo)] font-bold tracking-[0.03em] text-brand-700">{SITE_NAME}</span>
          <span className="hidden text-[10px] font-bold text-muted xl:inline">成果報酬サービス比較</span>
        </Link>

        <div className="hidden min-w-0 flex-1 md:block lg:max-w-2xl">
          <SearchBox id="header-search" />
        </div>

        <nav aria-label="メインメニュー" className="ml-auto hidden items-center gap-1 text-sm font-bold text-ink lg:flex">
          <Link href="/services" className="rounded px-3 py-2 hover:bg-brand-50 hover:text-brand-700">サービス一覧</Link>
          <Link href="/articles" className="rounded px-3 py-2 hover:bg-brand-50 hover:text-brand-700">記事</Link>
          <HeaderRequestLink />
          <Link href="/for-companies" className="btn btn-secondary ml-1 whitespace-nowrap">掲載希望企業はこちら</Link>
        </nav>

        <div className="ml-auto lg:hidden"><HeaderRequestLink /></div>
        <details className="group relative lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded border border-line [&::-webkit-details-marker]:hidden" aria-label="メニューを開く">
            <Icon name="menu" className="size-6 group-open:hidden" />
            <Icon name="close" className="hidden size-6 group-open:block" />
          </summary>
          <div className="absolute right-0 top-14 w-[min(88vw,20rem)] rounded-md border border-line bg-white p-4 shadow-xl">
            <ul className="space-y-1 text-sm font-bold text-ink">
              <li><Link className="block rounded px-3 py-2.5 hover:bg-surface" href="/services">サービス一覧</Link></li>
              <li><Link className="block rounded px-3 py-2.5 hover:bg-surface" href="/articles">記事</Link></li>
              <li><Link className="block rounded px-3 py-2.5 hover:bg-surface" href="/about">掲載方針</Link></li>
              <li><Link className="block rounded bg-cta-500 px-3 py-2.5 text-white" href="/for-companies">掲載希望企業はこちら</Link></li>
            </ul>
            <p className="mt-3 px-3 text-xs font-bold text-muted">カテゴリから探す</p>
            <ul className="mt-1 grid grid-cols-2 gap-1 text-sm">
              {categories.map((c) => (
                <li key={c.id}><Link className="block rounded px-3 py-2 hover:bg-surface" href={`/category/${c.slug}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
        </details>
      </div>

      <div className="container-page pb-3 md:hidden"><SearchBox id="header-search-sm" /></div>

      <nav aria-label="カテゴリ" className="hidden bg-brand-700 md:block">
        <ul className="container-page flex justify-center gap-2 overflow-x-auto text-sm font-bold text-white lg:gap-8">
          <li className="shrink-0"><Link href="/" className="relative flex min-h-12 items-center px-4 after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-0 after:-translate-x-1/2 after:bg-cta-500 after:transition-all hover:after:w-10 lg:text-base">TOP</Link></li>
          {categories.map((c) => (
            <li key={c.id} className="shrink-0">
              <Link href={`/category/${c.slug}`} className="relative flex min-h-12 items-center px-4 after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-0 after:-translate-x-1/2 after:bg-cta-500 after:transition-all hover:after:w-10 lg:text-base">{c.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
