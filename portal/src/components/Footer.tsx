import Link from "next/link";
import { getCategories } from "@/lib/data";
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export async function Footer() {
  const categories = (await getCategories()).filter((c) => !c.parent_id);
  return (
    <footer className="mt-12 border-t border-line bg-white pb-24 pt-10">
      <div className="container-page grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-lockup.svg" alt={SITE_NAME} width={180} height={30} className="h-[30px] w-auto" />
          <p className="mt-3 text-xs leading-6">初期費用なし・リスクなしで事業を推進。再生数・問い合わせ数・アポ数などの実績に応じて支払う「成果報酬サービス」をまとめて比較できる、比較メディアです。</p>
          <p className="mt-3 text-xs leading-6 text-muted">掲載情報は公開情報をもとに編集部が作成しています。掲載企業との広告契約がある場合は、該当サービスに明示します。</p>
        </div>
        <div>
          <p className="border-b border-line pb-2 text-sm font-bold text-ink">カテゴリ</p>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => <li key={c.id}><Link href={`/category/${c.slug}`} className="hover:text-brand-700 hover:underline">成果報酬型の{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="border-b border-line pb-2 text-sm font-bold text-ink">{SITE_NAME}について</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-brand-700 hover:underline">サービス一覧</Link></li>
            <li><Link href="/articles" className="hover:text-brand-700 hover:underline">記事</Link></li>
            <li><Link href="/about" className="hover:text-brand-700 hover:underline">掲載方針・ランキングの算出方法</Link></li>
            <li><Link href="/faq" className="hover:text-brand-700 hover:underline">よくある質問</Link></li>
            <li><a href="https://www.tyokikaku.co.jp/" target="_blank" rel="noopener" className="hover:text-brand-700 hover:underline">運営会社</a></li>
            <li><Link href="/privacy" className="hover:text-brand-700 hover:underline">プライバシーポリシー</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-700 hover:underline">お問い合わせ</a></li>
          </ul>
        </div>
      </div>
      <p className="container-page mt-8 border-t border-line pt-4 text-xs text-muted">© {new Date().getFullYear()} {OPERATOR_NAME}</p>
    </footer>
  );
}
