import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { ListingButton } from "@/components/ListingForm";
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/lib/site";

/** 掲載希望企業向けLP用のレイアウト。サイト共通のヘッダー・フッター（検索・カテゴリ・資料請求リスト）は出さず、申し込みに集中させる */
const NAV = [
  ["#problems", "お悩み"],
  ["#features", "特徴"],
  ["#price", "料金"],
  ["#flow", "流れ"],
  ["#faq", "よくある質問"],
] as const;

export default function LpLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between gap-4 sm:h-16">
          <Link href="/" className="flex items-center gap-2" aria-label={`${SITE_NAME} トップへ`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={32} height={32} className="size-8 shrink-0" />
            <span className="text-xl font-black text-brand-700">{SITE_NAME}</span>
            <span className="hidden text-[0.7rem] font-bold text-muted sm:inline">掲載企業さま向け</span>
          </Link>
          <nav aria-label="ページ内メニュー" className="hidden items-center gap-5 text-sm font-bold text-ink lg:flex">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-brand-700">{label}</a>
            ))}
          </nav>
          <ListingButton className="btn btn-cta min-h-10 whitespace-nowrap px-4 text-sm sm:px-6">無料で掲載を申し込む</ListingButton>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-line bg-white pb-24 pt-8 text-sm sm:pb-10">
        <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">© 2026 {OPERATOR_NAME}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <li><Link href="/" className="hover:text-brand-700 hover:underline">{SITE_NAME}トップ</Link></li>
            <li><Link href="/about" className="hover:text-brand-700 hover:underline">掲載方針</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-700 hover:underline">プライバシーポリシー</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-700 hover:underline">お問い合わせ</a></li>
          </ul>
        </div>
      </footer>
      {/* スマホ：画面下に固定の申し込みボタン */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-2.5 backdrop-blur sm:hidden">
        <ListingButton className="btn btn-cta min-h-12 w-full text-base">無料で掲載を申し込む</ListingButton>
      </div>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
