import type { Metadata } from "next";
import "@/app/hero.css";
import { GoldMedal } from "@/components/GoldMedal";
import { Icon } from "@/components/Icon";
import { FaqList } from "@/components/FaqList";
import { getCategories, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { ListingButton, ListingFormDialog } from "@/components/ListingForm";
import { SITE_NAME } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "掲載をご希望の企業さまへ",
  description: `${SITE_NAME}は、成果に応じて料金を支払うサービスだけを集めた比較メディアです。掲載無料の完全成果報酬で、費用は資料請求が届いたときだけ、1件10,000円（税別）。`,
  path: "/for-companies",
});

const PROBLEMS = [
  ["search", "成果報酬型のサービスを探している企業に、見つけてもらえていない…"],
  ["sales", "集客や営業に手が回らず、新規開拓が止まっている…"],
  ["shield", "広告に先行投資をするのが不安…"],
] as const;

const FEATURES = [
  { icon: "compare", title: "成果報酬を探している企業だけに届く", lead: "", points: ["必須の月額固定費がないサービスだけを集めたメディア", "「成果報酬で頼めるサービスを探したい」企業にアプローチ", "複数社を比較する企業の検討対象に入れるため、受注見込み企業が増える"] },
  { icon: "check", title: "先払いなし。成果が出た分だけ", lead: "資料請求が届かなければ、費用は0円", points: ["掲載料・初期費用・月額費用は 0円", "費用は資料請求1件につき 10,000円（税別）", "掲載の準備もラクラク"] },
  { icon: "shield", title: "担当者の情報が届く", lead: "担当者の連絡先つきで、すぐにアプローチできる", points: ["会社のメールアドレスと担当者の携帯電話番号つき", "担当者に直接連絡をすることが可能なので、商談アポが取りやすい", "請求者の同意を得た情報を、電子ファイルで受け取れる"] },
] as const;

const STEPS = [
  ["問い合わせ", "まずはフォームからお問い合わせください。"],
  ["打ち合わせ", "サービスの内容や課金の条件を、お打ち合わせでうかがいます。"],
  ["資料をご提供", "掲載に必要な資料（サービス資料・料金表など）をご提供ください。"],
  ["掲載開始", "比較ページに掲載され、資料請求の受付がスタートします。"],
] as const;

const FAQS = [
  { q: "掲載に費用はかかりますか？", a: "掲載は無料です。掲載料・初期費用・月額費用はかかりません。費用が発生するのは、資料請求が届いたときだけで、1件につき10,000円（税別）です。" },
  { q: "申し込みから掲載まで、どのくらいかかりますか？", a: "最短で3日です。問い合わせ、打ち合わせ、資料のご提供を経て、掲載を開始します。資料のご準備状況により、日数は前後します。" },
  { q: "どんなサービスが掲載できますか？", a: "成果に応じて課金されるサービスが対象です。固定費と成果報酬の併用が必須のサービスは、掲載対象外です。" },
  { q: "掲載内容は、誰が作りますか？", a: "編集部が、ヒアリング内容や資料情報をもとに作成します。" },
  { q: "リードはどのように受け取れますか？", a: "資料請求が入ると、請求者の会員情報（会社名・氏名・メールアドレス・電話番号など）を電子ファイルで提供します。請求者には、フォーム上で提供への同意をいただいています。" },
  { q: "資料請求のあとの商談化も、お願いできますか？", a: "ご希望の企業さまには、資料請求後のフォローと日程調整を代行し、商談アポにつなげるオプションもご用意しています（商談アポ1件あたり50,000円・税別）。詳しくは担当者にお問い合わせください。" },
] as const;

function SectionHead({ en, title, light }: { en: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-sm font-black tracking-[0.25em] ${light ? "text-cta-500" : "text-cta-600"}`}>{en}</p>
      <h2 className={`mt-1 text-2xl sm:text-4xl ${light ? "text-white" : ""}`}>{title}</h2>
      <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-cta-500" aria-hidden />
    </div>
  );
}

const MARK = "bg-[linear-gradient(transparent_62%,#ffd79a_62%)]";

export default async function ForCompaniesPage() {
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  const serviceCount = services.length;
  const catCount = categories.filter((c) => services.some((s) => s.category_ids.includes(c.id))).length;

  return (
    <div className="bg-white pb-16 sm:pb-0">
      <ListingFormDialog />

      {/* ───── ヒーロー ───── */}
      <section className="fv-bg relative overflow-hidden">
        <div className="fv-bg__shape fv-bg__shape--a" aria-hidden />
        <div className="fv-bg__shape fv-bg__shape--b" aria-hidden />
        <div className="fv-bg__dots fv-bg__dots--left" aria-hidden />
        <div className="fv-bg__dots fv-bg__dots--right" aria-hidden />
        <div className="container-page relative grid grid-cols-[minmax(0,1fr)] gap-2 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,34rem)_minmax(0,26rem)] lg:justify-center lg:gap-8">
          <div className="lg:pb-14">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-4 py-1.5 text-xs font-black text-white sm:text-sm">
              <span className="text-cta-500" aria-hidden>★</span>掲載をご希望の企業さまへ
            </p>
            <h1 className="mt-4 text-[2.1rem] font-black leading-[1.2] text-ink sm:text-[3.3rem] sm:leading-[1.15]">
              <span className={`text-brand-700 ${MARK}`}>掲載無料</span>の<br />完全成果報酬。<br />
              <span className="text-[1.55rem] sm:text-[2.2rem]">資料請求<span className="text-cta-600">1件</span>につき<b className="mx-1 text-[2.6rem] text-cta-600 sm:text-[3.6rem]">10,000</b>円</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-body sm:text-base sm:leading-9">
              成果報酬サービスを探す企業から、資料請求が届く比較メディア。<br className="hidden sm:block" />費用がかかるのは、<b className="text-ink">資料請求が届いたときだけ。</b>
            </p>
            <p className="mt-6">
              <ListingButton className="btn btn-cta min-h-14 w-full px-10 text-lg shadow-[0_10px_24px_-10px_rgb(224_120_0/0.8)] sm:w-auto">無料で掲載を申し込む</ListingButton>
            </p>
            <p className="mt-2 text-xs text-muted">内容を確認のうえ、編集部からご連絡します。（金額は税別）</p>
            <div className="mt-6 grid max-w-sm grid-cols-2 gap-3">
              <GoldMedal label="掲載サービス" value={serviceCount} unit="件" />
              <GoldMedal label="カテゴリ" value={catCount} unit="種" />
            </div>
          </div>

          <div className="relative mx-auto h-[21rem] w-full max-w-md sm:h-[30rem] lg:h-auto lg:max-w-none lg:self-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/person.webp" alt="" width={1200} height={1850} className="absolute bottom-0 left-1/2 block h-full w-auto max-w-none -translate-x-1/2" />
            <div className="absolute right-0 top-28 rounded-lg bg-brand-700 px-4 py-3 text-white shadow-[0_18px_40px_-18px_rgb(7_42_90/0.7)] sm:right-0 sm:top-44" aria-hidden>
              <p className="text-[0.7rem] font-bold">成果が出たときだけ</p>
              <p className="text-lg font-black leading-tight">1件 10,000円</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 料金サマリー帯 ───── */}
      <section className="bg-brand-900 text-white" aria-label="料金のポイント">
        <ul className="container-page grid divide-y divide-white/15 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-5">
          {[
            ["掲載料・初期費用・月額", "0円"],
            ["費用が発生するのは", "資料請求が届いたときだけ"],
            ["資料請求1件あたり", "10,000円（税別）"],
          ].map(([k, v]) => (
            <li key={k} className="px-4 py-4 text-center sm:py-2">
              <p className="text-xs font-bold text-brand-100">{k}</p>
              <p className="mt-1 text-xl font-black sm:text-2xl">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── お悩み ───── */}
      <section id="problems" className="scroll-mt-20 bg-surface/70 py-14 sm:py-20" aria-labelledby="problems-h">
        <div className="container-page">
          <h2 id="problems-h" className="text-center text-2xl sm:text-3xl">こんなお悩みは、ありませんか？</h2>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {PROBLEMS.map(([icon, t]) => (
              <li key={t} className="relative flex flex-col items-center rounded-3xl bg-white px-6 pb-8 pt-8 text-center shadow-[0_20px_44px_-26px_rgb(7_42_90/0.6)] ring-1 ring-line md:min-h-[15rem]">
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-500"><Icon name={icon} className="size-8" /></span>
                <p className="mt-5 text-lg font-black leading-8 text-ink sm:text-xl sm:leading-9">{t}</p>
                <span className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 rotate-45 bg-white ring-1 ring-line [clip-path:polygon(100%_0,100%_100%,0_100%)]" aria-hidden />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <span className="mx-auto block h-8 w-0.5 bg-brand-700/40" aria-hidden />
            <p className="mt-2 text-xl font-black text-brand-700 sm:text-3xl"><span className={MARK}>{SITE_NAME}</span>が、解決します。</p>
          </div>
        </div>
      </section>

      {/* ───── 特徴 ───── */}
      <section id="features" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="features-h">
        <div className="container-page">
          <SectionHead en="FEATURES" title={`${SITE_NAME}の3つの特徴`} />
          <ul className="mx-auto mt-10 max-w-4xl space-y-6">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="relative overflow-hidden rounded-3xl bg-white shadow-[0_22px_48px_-28px_rgb(7_42_90/0.6)] ring-1 ring-line md:grid md:grid-cols-[13rem_1fr]">
                <div className="relative flex items-center gap-4 bg-brand-700 px-6 py-5 text-white md:flex-col md:justify-center md:gap-3 md:py-8">
                  <span className="select-none text-5xl font-black leading-none text-white/90 md:text-7xl" aria-hidden>0{i + 1}</span>
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15 md:size-16"><Icon name={f.icon} className="size-8 md:size-9" /></span>
                  <span className="text-xs font-black tracking-[0.25em] text-cta-500 md:text-sm">POINT {i + 1}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl leading-snug text-ink sm:text-2xl">{f.title}</h3>
                  {f.lead && <p className="mt-2 text-base font-bold text-brand-700">{f.lead}</p>}
                  <ul className="mt-4 space-y-2.5">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-base leading-7 text-ink">
                        <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-cta-500 text-white"><Icon name="check" className="size-4" /></span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── 料金 ───── */}
      <section id="price" className="scroll-mt-20 fv-bg relative overflow-hidden py-14 sm:py-20" aria-labelledby="price-h">
        <div className="container-page relative">
          <SectionHead en="PRICE" title="料金は、これだけ" />
          <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-2xl bg-white p-7 text-center shadow-[0_18px_40px_-24px_rgb(7_42_90/0.55)] ring-2 ring-brand-700">
              <p className="inline-block rounded-full bg-brand-700 px-4 py-1 text-sm font-black text-white">掲載</p>
              <p className="mt-4"><b className="text-6xl font-black text-ink">0</b><span className="ml-1 text-xl font-black">円</span></p>
              <p className="mt-2 text-sm font-bold text-body">掲載料・初期費用・月額費用</p>
            </div>
            <div className="flex items-center justify-center text-4xl font-black text-brand-700" aria-hidden>＋</div>
            <div className="rounded-2xl bg-white p-7 text-center shadow-[0_18px_40px_-24px_rgb(7_42_90/0.55)] ring-2 ring-cta-500">
              <p className="inline-block rounded-full bg-cta-500 px-4 py-1 text-sm font-black text-white">資料請求1件につき</p>
              <p className="mt-4"><b className="text-6xl font-black text-ink">10,000</b><span className="ml-1 text-xl font-black">円</span><span className="ml-1 text-xs font-bold text-muted">（税別）</span></p>
              <p className="mt-2 text-sm font-bold text-body">資料請求が届いたときだけ</p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl rounded-xl bg-white/80 p-4 text-center text-sm font-bold leading-7 text-ink ring-1 ring-line">
            例：資料請求が10件届いた場合 → 10件 × 10,000円 ＝ <span className="text-cta-600">100,000円</span>。届かなければ、0円です。
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-6 text-muted">※ 「1件」の数え方、お支払いの方法・時期などの条件は、担当者が個別にご案内します。</p>
          <p className="mt-8 text-center"><ListingButton className="btn btn-cta min-h-14 px-10 text-lg shadow-lg">無料で掲載を申し込む</ListingButton></p>
        </div>
      </section>

      {/* ───── 流れ ───── */}
      <section id="flow" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="flow-h">
        <div className="container-page">
          <SectionHead en="FLOW" title="掲載までの流れ" />
          <p className="mt-5 text-center"><span className="inline-block rounded-full bg-cta-500 px-6 py-2 text-lg font-black text-white shadow-md sm:text-xl">最短 <b className="text-3xl">3</b> 日で掲載開始</span></p>
          <ol className="relative mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <span className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-brand-700/25 lg:block" aria-hidden />
            {STEPS.map(([t, b], i) => (
              <li key={t} className="relative text-center">
                <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-brand-700 text-xl font-black text-white shadow-md ring-4 ring-white">{i + 1}</span>
                <h3 className="mt-3 text-base">{t}</h3>
                <p className="mt-2 text-sm leading-7 text-body">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── 掲載の基準 ───── */}
      <section className="border-t border-line bg-surface/70 py-14 sm:py-20" aria-labelledby="criteria">
        <div className="container-page max-w-3xl">
          <SectionHead en="CRITERIA" title="掲載の基準" />
          <ul className="mt-8 space-y-3 rounded-2xl bg-white p-5 text-sm leading-7 ring-1 ring-line sm:p-7">
            {[
              "必須の月額固定費がないこと（初期費用の有無は問いません。有料の場合はその旨を明記します）",
              "現在も提供しているサービスであること",
              "固定費と成果報酬の併用が必須のサービスは、掲載対象外です",
            ].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white"><Icon name="check" className="size-3.5" /></span>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="faq-h">
        <div className="container-page max-w-3xl">
          <SectionHead en="FAQ" title="よくある質問" />
          <div className="mt-8"><FaqList items={FAQS} /></div>
        </div>
      </section>

      {/* ───── 最終CTA ───── */}
      <section className="relative overflow-hidden bg-brand-900 py-14 text-center text-white sm:py-20" aria-labelledby="cta">
        <div className="fv-bg__shape fv-bg__shape--b opacity-40" aria-hidden />
        <div className="container-page relative">
          <h2 id="cta" className="text-2xl text-white sm:text-4xl">掲載無料、費用は<span className="text-cta-500">資料請求1件 10,000円</span>だけ。</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-brand-100">まずはフォームからお問い合わせください。内容を確認のうえ、編集部からご連絡します。</p>
          <p className="mt-7"><ListingButton className="btn btn-cta min-h-14 px-10 text-lg shadow-lg">無料で掲載を申し込む</ListingButton></p>
        </div>
      </section>
    </div>
  );
}
