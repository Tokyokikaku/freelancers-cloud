import type { Metadata } from "next";
import "@/app/hero.css";
import { Icon } from "@/components/Icon";
import { FaqList } from "@/components/FaqList";
import { getCategories, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { ListingButton, ListingFormDialog } from "@/components/ListingForm";
import { SITE_NAME } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "掲載をご希望の企業さまへ",
  description: `${SITE_NAME}は、成果に応じて料金を支払うサービスだけを集めた比較メディアです。掲載料は無料。資料請求から商談アポまで、見込み顧客との出会いをつくります。`,
  path: "/for-companies",
});

const PROBLEMS = [
  ["search", "成果報酬のサービスを探している企業に、見つけてもらえていない", "「固定費をかけたくない」企業は、成果報酬で頼めるサービスだけを比べて選びたいと考えています。その探し方に合った場所に、掲載できていますか。"],
  ["mail", "資料請求や問い合わせの質に、ばらつきがある", "フリーメールや固定電話の入力、適当な連絡先では、折り返しても連絡がつきません。"],
  ["chat", "資料請求は来ても、商談にならない", "フォローの人手が足りず、請求から商談までの間で、機会を逃しています。"],
] as const;

const FEATURES = [
  { icon: "compare", title: "成果報酬サービスを探す企業が集まる", body: "月額の固定費がなく、実績に応じて課金されるサービスだけを掲載。「成果報酬で頼めるサービスを比べて選びたい」という企業が、比較を目的に訪れます。複数社まとめての資料請求にも対応しています。" },
  { icon: "shield", title: "連絡の取れる資料請求だけが届く", body: "会社のメールアドレス（フリーメール不可）と担当者の携帯電話番号を必須に。固定電話や連番などの適当な入力は受け付けません。第三者提供への同意も、フォーム上で明示的に取得します。" },
  { icon: "check", title: "掲載は無料、整理は編集部におまかせ", body: "掲載料は無料です。編集部が、公式の料金ページをもとに、成果地点・初期費用・月額・成果報酬額を整理して掲載します。確認できない項目は「要問い合わせ」とし、推測では書きません。" },
] as const;

const STEPS = [
  ["01", "フォームから申し込み", "サービスURLと料金体系をお知らせください。1分ほどで入力できます。"],
  ["02", "編集部が内容を確認", "掲載の基準に沿って、公式の料金ページをもとに掲載内容を確認します。"],
  ["03", "掲載・資料請求の受付", "比較ページに掲載され、資料請求のリードをお届けします。"],
  ["04", "（任意）アポ化オプション", "資料請求後のフォローと日程調整を代行し、商談アポにつなげます。"],
] as const;

const FAQS = [
  { q: "掲載に費用はかかりますか？", a: "掲載は無料です。アポ化オプションをご利用の場合のみ、商談アポが成立した件数に応じて費用が発生します。" },
  { q: "どんなサービスが掲載できますか？", a: "必須の月額固定費がなく、何を成果として、いくらで課金するかが、公式サイト等で確認できるサービスです。作業量（送信件数など）への課金、アフィリエイトASP、固定費と成果報酬の併用が必須のサービスは、対象外です。" },
  { q: "掲載内容は、誰が作りますか？", a: "編集部が、公式の料金ページなどの公開情報をもとに作成します。確認できない項目は「要問い合わせ」と表示します。" },
  { q: "リードはどのように受け取れますか？", a: "資料請求が入ると、請求者の会員情報（会社名・氏名・メールアドレス・電話番号など）を電子ファイルで提供します。請求者には、フォーム上で提供への同意をいただいています。" },
  { q: "アポ化オプションの「アポ」は、どう定義されますか？", a: "先方の役職や、日程確定の条件、キャンセル時の扱いなどは、事前にご相談のうえ取り決めます。お申し込みフォームの「ご相談内容」にご希望をお書きください。" },
  { q: "申し込みから掲載まで、どのくらいかかりますか？", a: "内容を確認のうえ、編集部からご連絡します。掲載内容や公開日は、ご連絡の中でお知らせします。" },
] as const;

export default async function ForCompaniesPage() {
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  const serviceCount = services.length;
  const catCount = categories.filter((c) => services.some((s) => s.category_ids.includes(c.id))).length;

  return (
    <div className="bg-white pb-16 sm:pb-0">
      <ListingFormDialog />

      {/* ───── ヒーロー ───── */}
      <section className="fv-bg relative overflow-hidden border-b border-line">
        <div className="fv-bg__shape fv-bg__shape--a" aria-hidden />
        <div className="fv-bg__shape fv-bg__shape--b" aria-hidden />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-block rounded-full bg-cta-500 px-4 py-1 text-xs font-black text-white sm:text-sm">掲載料 0円・初期費用なし</p>
            <h1 className="mt-4 text-[2rem] font-black leading-[1.25] text-ink sm:text-[3.2rem] sm:leading-[1.2]">
              <span className="text-brand-700">成果報酬サービスを探す企業</span>から、<br />資料請求が届く。
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-body sm:text-lg sm:leading-9">
              掲載料は無料。連絡の取れる資料請求だけをお届けし、ご希望なら商談アポの獲得まで代行します。
            </p>
            <p className="mt-7">
              <ListingButton className="btn btn-cta min-h-14 w-full px-10 text-lg shadow-lg sm:w-auto">無料で掲載を申し込む</ListingButton>
            </p>
            <p className="mt-2 text-xs text-muted">入力は1分ほど。内容を確認のうえ、編集部からご連絡します。</p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-ink">
              <div><dt className="text-xs font-bold text-muted">現在の掲載サービス</dt><dd className="font-black"><span className="text-3xl">{serviceCount}</span><span className="ml-1 text-sm">件</span></dd></div>
              <div><dt className="text-xs font-bold text-muted">カテゴリ</dt><dd className="font-black"><span className="text-3xl">{catCount}</span><span className="ml-1 text-sm">種</span></dd></div>
              <div><dt className="text-xs font-bold text-muted">掲載料</dt><dd className="font-black"><span className="text-3xl">0</span><span className="ml-1 text-sm">円</span></dd></div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-label="掲載から商談までの流れ">
            <ol className="relative space-y-4">
              {[
                ["compare", "比較ページに掲載", "成果報酬サービスを探す企業が、料金や成果の条件を見比べます。", "STEP 1", ""],
                ["mail", "資料請求が届く", "まとめて請求された会員情報を、電子ファイルで受け取れます。", "STEP 2", "lg:ml-8"],
                ["check", "商談アポへ（オプション）", "請求後のフォローと日程調整を代行。アポ成立時のみ費用が発生します。", "STEP 3", "lg:ml-16"],
              ].map(([icon, t, b, step, shift]) => (
                <li key={t} className={`flex items-start gap-4 rounded-xl border border-line bg-white/95 p-4 shadow-[0_18px_40px_-24px_rgb(7_42_90/0.55)] sm:p-5 ${shift}`}>
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white"><Icon name={icon} className="size-6" /></span>
                  <div>
                    <p className="text-[0.7rem] font-black tracking-widest text-cta-600">{step}</p>
                    <p className="text-base font-black text-ink">{t}</p>
                    <p className="mt-1 text-xs leading-6 text-body sm:text-sm">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───── お悩み ───── */}
      <section id="problems" className="scroll-mt-20 bg-surface/60 py-12 sm:py-16" aria-labelledby="problems-h">
        <div className="container-page">
          <h2 id="problems-h" className="text-center text-2xl sm:text-3xl">こんなお悩みは、ありませんか？</h2>
          <ul className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {PROBLEMS.map(([icon, t, b]) => (
              <li key={t} className="rounded-lg border border-line bg-white p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600"><Icon name={icon} className="size-6" /></span>
                <h3 className="mt-3 text-base leading-snug">{t}</h3>
                <p className="mt-2 text-sm leading-7 text-body">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-xl font-black text-brand-700 sm:text-2xl">{SITE_NAME}が、解決します。</p>
        </div>
      </section>

      {/* ───── 特徴 ───── */}
      <section id="features" className="scroll-mt-20 py-12 sm:py-16" aria-labelledby="features-h">
        <div className="container-page">
          <p className="text-center text-sm font-bold text-cta-600">FEATURES</p>
          <h2 id="features-h" className="mt-1 text-center text-2xl sm:text-3xl">{SITE_NAME}の特徴</h2>
          <ul className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="relative rounded-xl border border-line bg-white p-6 pt-8 shadow-[0_12px_32px_-22px_rgb(7_42_90/0.5)]">
                <span className="absolute -top-4 left-5 rounded-full bg-brand-700 px-4 py-1 text-sm font-black tracking-widest text-white">POINT {i + 1}</span>
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Icon name={f.icon} className="size-6" /></span>
                <h3 className="mt-3 text-lg leading-snug">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-body">{f.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center"><ListingButton className="btn btn-cta min-h-12 px-8 text-base">無料で掲載を申し込む</ListingButton></p>
        </div>
      </section>

      {/* ───── アポ化オプション ───── */}
      <section id="appo" className="scroll-mt-20 border-y border-line bg-brand-900 py-12 text-white sm:py-16" aria-labelledby="appo-title">
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
              <li key={t} className="rounded-lg bg-white/10 p-4 text-center ring-1 ring-white/20">
                <span className="mx-auto inline-flex size-8 items-center justify-center rounded-full bg-cta-500 text-sm font-black text-white">{i + 1}</span>
                <p className="mt-2 font-bold">{t}</p>
                <p className="mt-1 text-xs leading-6 text-brand-100">{b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center"><ListingButton topic="appo" className="btn btn-cta min-h-12 px-8 text-base">アポ化オプションについて相談する</ListingButton></p>
        </div>
      </section>

      {/* ───── 料金 ───── */}
      <section id="price" className="scroll-mt-20 py-12 sm:py-16" aria-labelledby="price-h">
        <div className="container-page">
          <p className="text-center text-sm font-bold text-cta-600">PRICE</p>
          <h2 id="price-h" className="mt-1 text-center text-2xl sm:text-3xl">料金</h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-xl border-2 border-brand-700 bg-white p-6 text-center">
              <p className="text-sm font-bold text-brand-700">掲載</p>
              <p className="mt-2"><b className="text-5xl font-black text-ink">0</b><span className="ml-1 text-lg font-bold">円</span></p>
              <ul className="mt-4 space-y-2 text-left text-sm leading-7">
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>掲載料・初期費用・月額費用は無料</li>
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>掲載内容の整理は編集部が実施</li>
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>資料請求のリードを電子ファイルで提供</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-cta-500 bg-white p-6 text-center">
              <p className="text-sm font-bold text-cta-600">アポ化オプション（任意）</p>
              <p className="mt-2"><span className="text-sm font-bold">商談アポ1件あたり</span> <b className="text-5xl font-black text-ink">50,000</b><span className="ml-1 text-lg font-bold">円（税別）</span></p>
              <ul className="mt-4 space-y-2 text-left text-sm leading-7">
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>アポが成立したときだけ費用が発生</li>
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>初期費用・月額費用はなし</li>
                <li className="flex gap-2"><span className="text-good-700" aria-hidden>✓</span>フォローから日程調整まで代行</li>
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-4xl text-center text-xs leading-6 text-muted">※ アポの定義（先方の役職・日程確定の条件など）、キャンセル時の扱いは、事前にご相談のうえ取り決めます。</p>
        </div>
      </section>

      {/* ───── 掲載の基準 ───── */}
      <section className="border-t border-line bg-surface/60 py-12 sm:py-16" aria-labelledby="criteria">
        <div className="container-page max-w-3xl">
          <h2 id="criteria" className="text-center text-2xl sm:text-3xl">掲載の基準</h2>
          <ul className="mt-6 space-y-3 rounded-lg border border-line bg-white p-5 text-sm leading-7 sm:p-6">
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>必須の月額固定費がないこと（初期費用の有無は問いません。有料の場合はその旨を明記します）</li>
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>何を成果として、いくら課金するかが、公式サイト等で確認できること</li>
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>現在も提供しているサービスであること</li>
            <li className="flex gap-2"><span className="text-brand-700" aria-hidden>●</span>作業量（送信件数など）への課金、アフィリエイトASP、固定費と成果報酬の併用が必須のサービスは、対象外です</li>
          </ul>
          <p className="mt-4 text-center text-xs leading-6 text-muted">提携前のサービスを、提携しているように見せることはしません。</p>
        </div>
      </section>

      {/* ───── 流れ ───── */}
      <section id="flow" className="scroll-mt-20 py-12 sm:py-16" aria-labelledby="flow-h">
        <div className="container-page">
          <p className="text-center text-sm font-bold text-cta-600">FLOW</p>
          <h2 id="flow-h" className="mt-1 text-center text-2xl sm:text-3xl">掲載までの流れ</h2>
          <ol className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([n, t, b]) => (
              <li key={n} className="rounded-lg border border-line bg-white p-5">
                <span className="text-3xl font-black text-brand-700">{n}</span>
                <h3 className="mt-1 text-base">{t}</h3>
                <p className="mt-2 text-sm leading-7 text-body">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" className="scroll-mt-20 border-t border-line bg-surface/60 py-12 sm:py-16" aria-labelledby="faq-h">
        <div className="container-page max-w-3xl">
          <p className="text-center text-sm font-bold text-cta-600">FAQ</p>
          <h2 id="faq-h" className="mt-1 text-center text-2xl sm:text-3xl">よくある質問</h2>
          <div className="mt-8"><FaqList items={FAQS} /></div>
        </div>
      </section>

      {/* ───── 最終CTA ───── */}
      <section className="fv-bg relative overflow-hidden py-14 text-center sm:py-20" aria-labelledby="cta">
        <div className="container-page relative">
          <h2 id="cta" className="text-2xl sm:text-4xl">まずは、無料で掲載を申し込む</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-body">サービスURLと料金体系をお知らせください。内容を確認のうえ、編集部からご連絡します。</p>
          <p className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ListingButton className="btn btn-cta min-h-14 px-10 text-lg shadow-lg">無料で掲載を申し込む</ListingButton>
            <ListingButton topic="appo" className="btn btn-secondary min-h-14 px-8 text-base">アポ化オプションを相談する</ListingButton>
          </p>
        </div>
      </section>
    </div>
  );
}
