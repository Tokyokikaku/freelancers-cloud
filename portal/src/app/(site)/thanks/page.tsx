import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { OfficialSiteLink } from "@/components/Trackers";
import { getServiceBySlug } from "@/lib/data";
import { isPartnered } from "@/lib/partner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせを受け付けました",
  description: "お問い合わせを受け付けました。",
  path: "/thanks",
  noindex: true,
});

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service: slug } = await searchParams;
  const service = slug ? await getServiceBySlug(slug) : null;
  const partnered = service ? isPartnered(service) : false;

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="card mx-auto max-w-2xl p-7 text-center sm:p-12">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-good-100 text-good-700"><Icon name="check" className="size-7" /></span>
        <h1 className="mt-5 text-2xl sm:text-3xl">お問い合わせを受け付けました</h1>
        {service && <p className="mt-2 text-sm text-muted">対象サービス：{service.name}</p>}
        <div className="mt-6 space-y-3 text-left text-sm leading-7 sm:text-base sm:leading-8">
          {partnered ? (
            <p>入力いただいた内容は、資料のご案内のため {service?.company_name} に提供されます。担当者からの連絡をお待ちください。</p>
          ) : (
            <>
              <p>資料情報を確認し、公開されている資料または公式の資料請求ページを、ご入力のメールアドレス宛にご案内します。</p>
              <p className="rounded-md bg-surface p-4 text-sm">
                ご入力いただいた内容は、サービス提供会社へは送信されていません。このお問い合わせは、サービス提供会社への資料請求が完了したことを意味するものではありません。
              </p>
            </>
          )}
          <p>ご案内までにお時間をいただく場合があります。お急ぎの場合は、公式サイトから直接お問い合わせください。</p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {service && (
            <OfficialSiteLink href={service.website_url} serviceId={service.id} serviceName={service.name} placement="thanks" className="btn-primary">
              {service.name}の公式サイトを見る <Icon name="external" className="size-4" />
            </OfficialSiteLink>
          )}
          <Link href="/services" className="btn-ghost">他のサービスも比較する</Link>
        </div>
      </div>
    </div>
  );
}
