import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RANKING_NOTE, RANKING_WINDOW_DAYS } from "@/lib/ranking";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "成果報酬ナビとは・掲載方針",
  description: "成果報酬ナビの目的、掲載情報の作成方法、人気ランキングの算出方法、広告・提携の扱いについて説明します。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: `${SITE_NAME}とは` }]} />
      <article className="prose-ja mx-auto mt-6 max-w-3xl">
        <h1 className="!mb-6 text-2xl sm:text-4xl">{SITE_NAME}とは・掲載方針</h1>
        <p>
          {SITE_NAME}は、成果が発生するまで料金が発生しないサービスを探したい企業のための、成果報酬サービスの検索・比較メディアです。
          営業・マーケティング・採用・資金調達などのサービスを、成果地点と料金条件を揃えて比較できます。
        </p>

        <h2>掲載情報の作成方法</h2>
        <ul>
          <li>公式サイト、公式のプレスリリースなどの公開情報をもとに、編集部が作成しています。</li>
          <li>確認できなかった料金・成果報酬額・条件は、推測で記載せず「要問い合わせ」「公式サイトをご確認ください」と表示します。</li>
          <li>各サービスページに情報更新日を表示しています。料金や提供条件は変更されることがあるため、最新の情報は公式サイトでご確認ください。</li>
        </ul>

        <h2>「完全成果報酬」の定義</h2>
        <p>固定費・月額費用がなく、成果発生時のみ費用が発生するサービスを「完全成果報酬」と表示しています。初期費用と月額費用の両方が0円と確認できたサービスだけが対象です。</p>

        <h2>人気ランキングの算出方法</h2>
        <p>
          人気順は「{RANKING_NOTE}」しています。直近{RANKING_WINDOW_DAYS}日間の、サービスページの閲覧数、公式サイトのクリック率、資料ボタンのクリック率をもとにスコア化しており、
          掲載企業の広告費の支払額や提携の有無では順位を決めていません。
        </p>

        <h2>広告・提携について</h2>
        <p>
          掲載しているサービスは、原則として、サービス提供会社と掲載契約などを結んでいない状態で、編集部が公開情報をもとに紹介しています。
          広告契約などの提携がある場合は、該当サービスのページにその旨を明示します。提携の有無にかかわらず、掲載情報の作成基準は同じです。
        </p>

        <h2>資料を確認するフォームについて</h2>
        <p>
          提携前のサービスについては、フォームの入力内容をサービス提供会社へ送信しません。入力内容をもとに、公開されている資料や公式の資料請求ページをご案内します。
        </p>

        <h2>掲載内容の訂正・削除のご依頼</h2>
        <p>
          掲載内容に誤りがある場合や、掲載の訂正・停止をご希望の場合は、<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までご連絡ください。確認のうえ対応します。
        </p>

        <h2>運営者</h2>
        <p>{OPERATOR_NAME}</p>
      </article>
    </div>
  );
}
