import Link from "next/link";
import { getCategories } from "@/lib/data";
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export async function Footer() {
  const categories = (await getCategories()).filter((c) => !c.parent_id);
  return (
    <footer className="mt-16 border-t border-line bg-surface pb-24 pt-12">
      <div className="container-page grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-ink">{SITE_NAME}</p>
          <p className="mt-2 text-sm leading-7">成果報酬で使えるサービスを、まとめて比較できる検索・比較メディアです。固定費をかけずに使えるサービスが、すぐ見つかる。</p>
          <p className="mt-4 text-xs leading-6 text-muted">
            掲載情報は公開情報をもとに編集部が作成しています。掲載企業との広告契約がある場合は、該当サービスに明示します。
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-ink">カテゴリから探す</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}><Link href={`/category/${c.slug}`} className="hover:text-brand-700 hover:underline">成果報酬型の{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-ink">サイト情報</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/services" className="hover:underline">サービス一覧</Link></li>
            <li><Link href="/articles" className="hover:underline">記事</Link></li>
            <li><Link href="/about" className="hover:underline">成果報酬ナビとは・掲載方針</Link></li>
            <li><Link href="/privacy" className="hover:underline">プライバシーポリシー</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">お問い合わせ</a></li>
          </ul>
        </div>
      </div>
      <p className="container-page mt-10 text-xs text-muted">© {new Date().getFullYear()} {OPERATOR_NAME}</p>
    </footer>
  );
}
