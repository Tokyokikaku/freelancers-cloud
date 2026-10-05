import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ThanksRecommend } from "@/components/ThanksRecommend";
import { OfficialSiteLink } from "@/components/Trackers";
import { getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせを受け付けました",
  description: "お問い合わせを受け付けました。",
  path: "/thanks",
  noindex: true,
});

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ s?: string; service?: string }> }) {
  const sp = await searchParams;
  const slugs = Array.from(new Set((sp.s ?? sp.service ?? "").split(",").map((x) => x.trim()).filter(Boolean))).slice(0, 10);
  const services = await getServices();
  const requested = slugs.map((s) => services.find((x) => x.slug === s)).filter((x) => !!x);
  const partnered = requested.filter((s) => s!.partner_status !== "unpartnered");
  const hasUnpartnered = requested.some((s) => s!.partner_status === "unpartnered");

  // 続けて請求できるサービス: 請求したサービスと同じカテゴリ → なければ完全成果報酬
  const catIds = new Set(requested.flatMap((s) => s!.category_ids));
  const sameCategory = services.filter((s) => !slugs.includes(s.slug) && s.category_ids.some((id) => catIds.has(id)));
  const rest = services.filter((s) => !slugs.includes(s.slug) && !sameCategory.includes(s) && s.is_full_success_fee);
  const recommend = [...sameCategory, ...rest].slice(0, 5).map((s) => ({
    slug: s.slug,
    name: s.name,
    company_name: s.company_name,
    tags: [s.is_full_success_fee ? "完全成果報酬" : "", s.initial_fee_type === "free" ? "初期費用0円" : ""].filter(Boolean),
  }));

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="panel p-6 text-center sm:p-10">
          <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Icon name="check" className="size-7" /></span>
          <h1 className="mt-4 text-2xl sm:text-3xl">お問い合わせを受け付けました</h1>
          <p className="mt-2 text-sm text-muted">{requested.length ? `${requested.length}件のサービスについて、入力内容を確認しました。` : "入力内容を確認しました。"}</p>

          {requested.length > 0 && (
            <ul className="mt-6 divide-y divide-line rounded-md border border-line text-left">
              {requested.map((s) => (
                <li key={s!.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
                  <span className="min-w-0"><b className="text-ink">{s!.name}</b><span className="block text-xs text-muted">{s!.company_name}</span></span>
                  <OfficialSiteLink href={s!.website_url} serviceId={s!.id} serviceName={s!.name} placement="thanks" className="btn-secondary !min-h-9 !px-3 text-xs">公式サイトへ</OfficialSiteLink>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 space-y-3 text-left text-sm leading-7 sm:text-base sm:leading-8">
            {hasUnpartnered && (
              <>
                <p>資料情報を確認し、公開されている資料または公式の資料請求ページを、ご入力のメールアドレス宛にご案内します。</p>
                <p className="rounded-md bg-surface p-4 text-sm">
                  提携前のサービスには、ご入力いただいた内容を送信していません。このお問い合わせは、サービス提供会社への資料請求が完了したことを意味するものではありません。
                </p>
              </>
            )}
            {partnered.length > 0 && <p>次のサービスには、資料のご案内のため入力内容を提供しました：{partnered.map((s) => s!.name).join("、")}。担当者からの連絡をお待ちください。</p>}
            <p>ご案内までにお時間をいただく場合があります。お急ぎの場合は、各公式サイトから直接お問い合わせください。</p>
          </div>
        </div>

        <ThanksRecommend items={recommend} />

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/services" className="btn-ghost">他のサービスも比較する</Link>
          <Link href="/" className="btn-ghost">トップへ戻る</Link>
        </div>
      </div>
    </div>
  );
}
