import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー",
  description: "成果報酬ナビにおける個人情報の取り扱い、アクセス解析ツール（Google アナリティクス）の利用について説明します。",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "プライバシーポリシー" }]} />
      <article className="prose-ja mx-auto mt-6 max-w-3xl">
        <h1 className="!mb-6 text-2xl sm:text-4xl">プライバシーポリシー</h1>
        <p className="text-sm text-muted">※ 本文はひな形です。公開前に、事業内容に合わせて法務担当者・専門家の確認を受けてください。</p>
        <p>{OPERATOR_NAME}（以下「当サイト運営者」）は、{SITE_NAME}（以下「本サイト」）における個人情報およびアクセス情報を、以下のとおり取り扱います。</p>

        <h2>1. 取得する情報と利用目的</h2>
        <ul>
          <li><strong>お問い合わせフォームの入力内容</strong>（会社名、氏名、メールアドレス、電話番号、検討時期、興味のあるサービス）：資料・公式の資料請求ページのご案内、お問い合わせへの対応、サービス改善のために利用します。</li>
          <li><strong>閲覧・行動情報</strong>（閲覧ページ、クリック、検索キーワード、流入元、ブラウザに保存する匿名の識別子）：サービスの利用状況の把握、サイト改善、掲載企業への統計情報（個人を特定しない集計値）の提供のために利用します。</li>
        </ul>

        <h2>2. 第三者への提供</h2>
        <p>
          お問い合わせフォームの入力内容は、法令に基づく場合を除き、ご本人の同意なく第三者へ提供しません。
          掲載企業と提携し、フォームに「資料の提供のため当該企業に情報が提供される」旨を明示した場合に限り、その企業へ提供します。
          掲載企業へ提供する閲覧・行動情報は、個人を特定できない統計情報のみです。
        </p>

        <h2>3. アクセス解析ツール・外部送信について</h2>
        <p>
          本サイトでは、アクセス状況を把握するため、Google LLC が提供する「Google アナリティクス」を利用しています。
          Google アナリティクスは Cookie 等を用いて、閲覧ページ・クリック等の情報を Google LLC に送信します。
          これらの情報には個人を特定する情報は含まれません。詳細は
          <a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">Google のポリシー</a>
          をご確認ください。ブラウザの設定、または
          <a href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="noopener noreferrer">オプトアウト用アドオン</a>
          により、情報の送信を停止できます。
        </p>
        <p>
          また、本サイトは自社のデータベースにも、閲覧・クリックなどの行動情報を、ブラウザに保存した匿名の識別子とともに記録しています。
        </p>

        <h2>4. 安全管理</h2>
        <p>取得した個人情報は、アクセス権限の管理など適切な安全管理措置を講じて取り扱います。</p>

        <h2>5. 開示・訂正・削除のご請求</h2>
        <p>ご本人から、保有する個人情報の開示・訂正・削除等のご請求があった場合は、本人確認のうえ対応します。<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までご連絡ください。</p>

        <h2>6. 改定</h2>
        <p>本ポリシーは、必要に応じて改定することがあります。改定後の内容は本ページに掲載します。</p>
      </article>
    </div>
  );
}
