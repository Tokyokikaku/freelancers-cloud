import type { Metadata } from "next";
import "@/app/hero.css";
import { Icon } from "@/components/Icon";
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

const FEATURES = [
  { icon: "compare", title: "成果報酬サービスを探す企業が集まる", body: "月額の固定費がなく、実績に応じて課金されるサービスだけを掲載。「成果報酬で頼めるサービスを比べて選びたい」という企業が、比較を目的に訪れます。複数社まとめての資料請求にも対応しています。" },
  { icon: "shield", title: "連絡の取れる資料請求だけが届く", body: "会社のメールアドレス（フリーメール不可）と担当者の携帯電話番号を必須に。固定電話や連番などの適当な入力は受け付けません。第三者提供への同意も、フォーム上で明示的に取得します。" },
  { icon: "check", title: "掲載は無料、整理は編集部におまかせ", body: "掲載料は無料です。編集部が、公式の料金ページをもとに、成果地点・初期費用・月額・成果報酬額を整理して掲載します。確認できない項目は「要問い合わせ」とし、推測では書きません。" },
] as const;

const STEPS = [
  ["01", "お問い合わせ", "フォームから、サービスURLと料金体系をお知らせください。"],
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
      <ListingFormDialog />
      {/* ───── ヒーロー ───── */}
      <section className="fv-bg relative overflow-hidden border-b border-line">
        <div className="fv-bg__shape fv-bg__shape--a" aria-hidden />
        <div className="fv-bg__shape fv-bg__shape--b" aria-hidden />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-block border-l-4 border-cta-500 pl-3 text-sm font-bold text-brand-700 sm:text-base">掲載をご希望の企業さまへ</p>
            <h1 className="mt-4 text-[2rem] font-black leading-[1.25] text-ink sm:text-[3.2rem] sm:leading-[1.2]">
              <span className="text-brand-700">成果報酬サービスを探す企業</span>から、<br />資料請求が届く。
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-body sm:text-lg sm:leading-9">
              掲載料は無料。連絡の取れる資料請求だけをお届けし、ご希望なら商談アポの獲得まで代行します。
            </p>
            <p className="mt-7">
              <ListingButton className="btn btn-cta min-h-12 w-full px-8 text-base sm:w-auto">掲載を希望する（無料）</ListingButton>
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-ink">
              <div><dt className="text-xs font-bold text-muted">現在の掲載サービス</dt><dd className="font-black"><span className="text-3xl">{serviceCount}</span><span className="ml-1 text-sm">件</span></dd></div>
              <div><dt className="text-xs font-bold text-muted">カテゴリ</dt><dd className="font-black"><span className="text-3xl">{catCount}</span><span className="ml-1 text-sm">種</span></dd></div>
              <div><dt className="text-xs font-bold text-muted">掲載料</dt><dd className="font-black"><span className="text-3xl">0</span><span className="ml-1 text-sm">円</span></dd></div>
            </dl>
          </div>

          {/* 右：掲載から商談までの流れ（図） */}
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
            <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-end">
              {["掲載料 0円", "初期費用なし", "成果報酬のみ"].map((c) => (
                <li key={c} className="rounded-full border border-cta-500/40 bg-white px-4 py-1.5 text-sm font-black text-cta-600 shadow-sm">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── 特徴 ───── */}
      <section className="py-12 sm:py-16" aria-labelledby="features">
        <div className="container-page">
          <p className="text-center text-sm font-bold text-cta-600">FEATURES</p>
          <h2 id="features" className="mt-1 text-center text-2xl sm:text-3xl">{SITE_NAME}の特徴</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
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
              <ListingButton topic="appo" className="btn btn-cta mt-5 w-full min-h-12 text-base">アポ化オプションについて相談する</ListingButton>
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
          <p className="mt-4 text-center text-xs leading-6 text-muted">提携前のサービスを、提携しているように見せることはしません。</p>
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
            <ListingButton className="btn btn-cta min-h-12 px-8 text-base">掲載を希望する（無料）</ListingButton>
            <ListingButton topic="appo" className="btn btn-secondary min-h-12 px-8 text-base">アポ化オプションを相談する</ListingButton>
          </p>
        </div>
      </section>
    </div>
  );
}
