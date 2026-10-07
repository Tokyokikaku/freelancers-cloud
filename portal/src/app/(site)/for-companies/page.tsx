import type { Metadata } from "next";
import "@/app/hero.css";
import { Icon } from "@/components/Icon";
import { getCategories, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "掲載をご希望の企業さまへ",
  description: `${SITE_NAME}は、成果に応じて料金を支払うサービスだけを集めた比較メディアです。資料請求から商談アポまで、見込み顧客との出会いをつくります。掲載の特徴・基準・アポ化オプションをご案内します。`,
  path: "/for-companies",
});

const mail = (subject: string, lines: string[]) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

const LISTING_MAILTO = mail("【掲載希望】サービス名をご記入ください", [
  "■ 会社名：",
  "■ サービス名：",
  "■ サービスURL（料金が分かるページ）：",
  "■ 何を成果として課金しますか（例：再生数、問い合わせ数、アポ数、採用、売上、順位）：",
  "■ 成果の単価・手数料：",
  "■ 初期費用／月額費用の有無：",
  "■ ご担当者名・ご連絡先：",
]);
const APPO_MAILTO = mail("【アポ化オプション】ご相談", ["■ 会社名：", "■ サービス名：", "■ ご担当者名・ご連絡先：", "■ ご相談内容："]);

const FEATURES = [
  { icon: "compare", title: "成果報酬サービスだけを集めた比較メディア", body: "月額の固定費がなく、実績に応じて課金されるサービスだけを掲載。「成果報酬で頼めるサービスを比べて選びたい」という企業が、比較を目的に訪れます。" },
  { icon: "layers", title: "資料請求は、複数社まとめて", body: "1回の入力で最大10サービスにまとめて資料請求。1社だけ請求しようとした方には、同じカテゴリの人気上位5サービスとの比較をご提案し、比較検討の土俵に乗りやすくします。" },
  { icon: "shield", title: "連絡の取れるリードに絞る", body: "会社のメールアドレス（フリーメール不可）と担当者の携帯電話番号を必須に。固定電話や連番などの適当な入力は受け付けません。第三者提供への同意も、フォーム上で明示的に取得します。" },
  { icon: "chart", title: "広告費で順位を決めない", body: "人気順は、閲覧数やクリックなどの行動データで決まります。掲載料や広告費では順位を動かしません。比較する側から信頼されるメディアであることが、掲載の価値になります。" },
  { icon: "mail", title: "リードをすぐ受け取れる", body: "資料請求があると、会員情報を電子ファイルで提供。提携企業さまには、メール・Webhookでの即時通知にも対応します。管理画面から、リードの確認・CSV出力もできます。" },
  { icon: "check", title: "掲載は無料", body: "掲載料は無料です。編集部が、公式の料金ページをもとに、成果地点・初期費用・月額・成果報酬額を整理して掲載します。確認できない項目は「要問い合わせ」とし、推測では書きません。" },
] as const;

const STEPS = [
  ["01", "お問い合わせ", "下のボタンから、サービスURLと料金体系をお知らせください。"],
  ["02", "編集部が確認", "掲載の基準に沿って、公式の料金ページをもとに掲載内容を確認します。"],
  ["03", "掲載・資料請求の受付", "比較ページに掲載され、資料請求のリードをお届けします。"],
  ["04", "（任意）アポ化オプション", "資料請求のあとの連絡・日程調整を代行し、商談アポにつなげます。"],
] as const;

export default async function ForCompaniesPage() {
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  const serviceCount = services.length;
  const catCount = categories.filter((c) => services.some((s) => s.category_ids.includes(c.id))).length;

  return (
    <div className="bg-white">
      {/* ───── ヒーロー ───── */}
      <section className="fv-bg relative overflow-hidden border-b border-line">
        <div className="fv-bg__shape fv-bg__shape--a" aria-hidden />
        <div className="fv-bg__shape fv-bg__shape--b" aria-hidden />
        <div className="container-page relative py-12 sm:py-20">
          <p className="inline-block border-l-4 border-cta-500 pl-3 text-sm font-bold text-brand-700 sm:text-base">掲載をご希望の企業さまへ</p>
          <h1 className="mt-4 max-w-3xl text-[2rem] font-black leading-[1.25] text-ink sm:text-[3.2rem] sm:leading-[1.2]">
            成果報酬サービスを<br /><span className="text-brand-700">比べて選びたい企業</span>と、<br />出会う。
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-body sm:text-lg sm:leading-9">
            {SITE_NAME}は、成果に応じて料金を支払うサービスだけを集めた比較メディアです。資料請求から商談アポまで、見込み顧客との出会いをつくります。
          </p>
          <p className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={LISTING_MAILTO} className="btn btn-cta min-h-12 px-8 text-base">掲載を希望する（無料）</a>
            <a href="#appo" className="btn btn-secondary min-h-12 px-8 text-base">アポ化オプションを見る</a>
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-ink">
            <div><dt className="text-xs font-bold text-muted">現在の掲載サービス</dt><dd className="font-black"><span className="text-3xl">{serviceCount}</span><span className="ml-1 text-sm">件</span></dd></div>
            <div><dt className="text-xs font-bold text-muted">カテゴリ</dt><dd className="font-black"><span className="text-3xl">{catCount}</span><span className="ml-1 text-sm">種</span></dd></div>
            <div><dt className="text-xs font-bold text-muted">掲載料</dt><dd className="font-black"><span className="text-3xl">0</span><span className="ml-1 text-sm">円</span></dd></div>
          </dl>
        </div>
      </section>

      {/* ───── 特徴 ───── */}
      <section className="py-12 sm:py-16" aria-labelledby="features">
        <div className="container-page">
          <p className="text-center text-sm font-bold text-cta-600">FEATURES</p>
          <h2 id="features" className="mt-1 text-center text-2xl sm:text-3xl">{SITE_NAME}の特徴</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="rounded-lg border border-line bg-white p-5 shadow-[0_8px_24px_-18px_rgb(7_42_90/0.5)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Icon name={f.icon} className="size-6" /></span>
                  <span className="text-xs font-black tracking-widest text-cta-600">POINT {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 text-lg leading-snug">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-body">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── アポ化オプション ───── */}
      <section id="appo" className="scroll-mt-24 border-y border-line bg-brand-900 py-12 text-white sm:py-16" aria-labelledby="appo-title">
        <div className="container-page">
          <p className="text-center text-sm font-bold text-cta-500">OPTION</p>
          <h2 id="appo-title" className="mt-1 text-center text-2xl text-white sm:text-3xl">資料請求を、商談アポにつなげる「アポ化オプション」</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-8 text-brand-100 sm:text-base">
            資料請求だけでは、商談にならないことがあります。「資料請求は来るが、アポにならない」を減らすため、請求後の連絡と日程調整を、成果報酬の営業チームが代行します。
          </p>

          <ol className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-4" aria-label="アポ化の流れ">
            {[
              ["資料請求", "見込み顧客が資料を請求"],
              ["資料送付", "資料をお送りします"],
              ["フォロー連絡", "電話・メールで状況を確認"],
              ["商談アポ成立", "先方担当者との日程が確定"],
            ].map(([t, b], i) => (
              <li key={t} className="relative rounded-lg bg-white/10 p-4 text-center ring-1 ring-white/20">
                <span className="mx-auto inline-flex size-8 items-center justify-center rounded-full bg-cta-500 text-sm font-black text-white">{i + 1}</span>
                <p className="mt-2 font-bold">{t}</p>
                <p className="mt-1 text-xs leading-6 text-brand-100">{b}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6 text-ink">
              <p className="text-xs font-bold text-muted">料金（成果報酬）</p>
              <p className="mt-1 flex items-baseline gap-1"><span className="text-sm font-bold">商談アポ1件あたり</span><b className="text-4xl font-black text-brand-700">50,000</b><span className="font-bold">円（税別）</span></p>
              <ul className="mt-4 space-y-2 text-sm leading-7">
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>アポが成立したときだけ費用が発生</li>
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>初期費用・月額費用はなし</li>
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>資料請求だけで終わらず、商談につなげたい企業さま向け</li>
              </ul>
              <p className="mt-4 text-xs leading-6 text-muted">※ アポの定義（先方の役職・日程確定の条件など）、キャンセル時の扱いは、事前にご相談のうえ取り決めます。</p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 ring-1 ring-white/20">
              <p className="text-sm font-bold text-cta-500">こんなお悩みに</p>
              <ul className="mt-3 space-y-3 text-sm leading-7">
                <li className="flex gap-2"><span aria-hidden>・</span>資料請求は来ているが、商談につながらない</li>
                <li className="flex gap-2"><span aria-hidden>・</span>フォロー連絡をする人手が足りない</li>
                <li className="flex gap-2"><span aria-hidden>・</span>「成果が出ない」と、掲載の継続を迷っている</li>
              </ul>
              <a href={APPO_MAILTO} className="btn btn-cta mt-5 w-full min-h-12 text-base">アポ化オプションについて相談する</a>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 掲載の基準 ───── */}
      <section className="py-12 sm:py-16" aria-labelledby="criteria">
        <div className="container-page max-w-3xl">
          <p className="text-center text-sm font-bold text-cta-600">CRITERIA</p>
          <h2 id="criteria" className="mt-1 text-center text-2xl sm:text-3xl">掲載の基準</h2>
          <ul className="mt-6 space-y-3 rounded-lg border border-line bg-surface/50 p-5 text-sm leading-7 sm:p-6">
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>必須の月額固定費がないこと（初期費用の有無は問いません。有料の場合はその旨を明記します）</li>
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>何を成果として、いくら課金するかが、公式サイト等で確認できること</li>
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>現在も提供しているサービスであること</li>
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>作業量（送信件数など）への課金、アフィリエイトASP、固定費と成果報酬の併用が必須のサービスは、対象外です</li>
          </ul>
          <p className="mt-4 text-center text-xs leading-6 text-muted">掲載の有無・順位は、広告費の支払額では決めません。提携前のサービスを、提携しているように見せることもしません。</p>
        </div>
      </section>

      {/* ───── 流れ ───── */}
      <section className="border-t border-line bg-surface/50 py-12 sm:py-16" aria-labelledby="flow">
        <div className="container-page">
          <p className="text-center text-sm font-bold text-cta-600">FLOW</p>
          <h2 id="flow" className="mt-1 text-center text-2xl sm:text-3xl">掲載までの流れ</h2>
          <ol className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([n, t, b]) => (
              <li key={n} className="rounded-lg border border-line bg-white p-5">
                <span className="text-2xl font-black text-brand-700">{n}</span>
                <h3 className="mt-1 text-base">{t}</h3>
                <p className="mt-2 text-sm leading-7 text-body">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="fv-bg relative overflow-hidden py-12 text-center sm:py-16" aria-labelledby="cta">
        <div className="container-page relative">
          <h2 id="cta" className="text-2xl sm:text-3xl">まずは、サービスのURLをお送りください</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-body">掲載料は無料です。内容を確認のうえ、編集部からご連絡します。</p>
          <p className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={LISTING_MAILTO} className="btn btn-cta min-h-12 px-8 text-base">掲載を希望する（メールで連絡）</a>
            <a href={APPO_MAILTO} className="btn btn-secondary min-h-12 px-8 text-base">アポ化オプションを相談する</a>
          </p>
          <p className="mt-4 text-xs text-muted">メールソフトが開きます。開かない場合は <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> までご連絡ください。</p>
        </div>
      </section>
    </div>
  );
}
