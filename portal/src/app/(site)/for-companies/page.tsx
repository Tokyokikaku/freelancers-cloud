import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "掲載希望企業の方へ",
  description: `${SITE_NAME}への掲載をご希望の企業さま向けに、掲載の基準と、ご連絡いただきたい情報をご案内します。`,
  path: "/for-companies",
});

const SUBJECT = "【掲載希望】サービス名をご記入ください";
const BODY = [
  "■ 会社名：",
  "■ サービス名：",
  "■ サービスURL（料金が分かるページ）：",
  "■ 何を成果として課金しますか（例：再生数、問い合わせ数、アポ数、採用、売上、順位）：",
  "■ 成果の単価・手数料：",
  "■ 初期費用／月額費用の有無：",
  "■ ご担当者名・ご連絡先：",
].join("\n");
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export default function ForCompaniesPage() {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "掲載希望企業の方へ" }]} />
      <article className="prose-ja mx-auto mt-6 max-w-3xl">
        <h1 className="!mb-6 text-2xl sm:text-4xl">掲載希望企業の方へ</h1>
        <p>
          {SITE_NAME}は、再生数・問い合わせ数・アポ数・採用・売上・順位など、<strong>測定できる実績に応じて課金されるサービス</strong>を比較できるメディアです。
          掲載をご希望の企業さまは、下記の基準をご確認のうえ、ご連絡ください。
        </p>

        <h2>掲載の基準</h2>
        <ul>
          <li>必須の月額固定費がないこと（初期費用の有無は問いません。有料の場合はその旨を明記します）</li>
          <li>何を成果として、いくら課金するかが公式サイト等で確認できること</li>
          <li>現在も提供しているサービスであること</li>
          <li>作業量（送信件数など）への課金、アフィリエイトASP、固定費と成果報酬の併用が必須のサービスは対象外です</li>
        </ul>

        <h2>掲載にあたってのお約束</h2>
        <ul>
          <li>掲載は無料です。掲載の有無・順位は、広告費の支払額では決めません。</li>
          <li>情報は公式サイトの公開情報をもとに編集部が作成し、確認できない項目は「要問い合わせ」と表示します。</li>
          <li>提携前のサービスを、提携しているように見せることはしません。</li>
        </ul>

        <h2>ご連絡いただきたい情報</h2>
        <ul>
          <li>会社名・サービス名・サービスURL（料金が分かるページ）</li>
          <li>成果の定義と単価（手数料・上限・最低金額を含む）</li>
          <li>初期費用・月額費用の有無</li>
          <li>ご担当者さまのお名前とご連絡先</li>
        </ul>

        <p className="not-prose mt-8">
          <a href={MAILTO} className="btn btn-cta">掲載を希望する（メールで連絡）</a>
        </p>
        <p className="text-sm text-muted">メールソフトが開きます。開かない場合は <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までご連絡ください。内容を確認のうえ、編集部からご連絡します。</p>
        <p className="text-sm"><Link href="/about">掲載方針の詳細</Link></p>
      </article>
    </div>
  );
}
