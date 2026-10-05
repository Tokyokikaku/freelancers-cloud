import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareToggle } from "@/components/CompareToggle";
import { FeeTags } from "@/components/FeeTags";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LeadDialog } from "@/components/LeadDialog";
import { ServiceLogo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { OfficialSiteLink, PageEvent } from "@/components/Trackers";
import { getArticles, getCategories, getServiceBySlug, getServices } from "@/lib/data";
import { infoUpdatedAt, initialFeeLabel, monthlyFeeLabel, successConditionLabel, successFeeLabel } from "@/lib/format";
import { documentCtaLabel, leadDisclaimer, partnerBadge } from "@/lib/partner";
import { buildMetadata, truncate } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { OUTCOME_LABELS } from "@/lib/types";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return (await getServices()).map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) return {};
  const fee =
    s.is_full_success_fee ? "完全成果報酬" : s.initial_fee_type === "free" && s.monthly_fee_type === "free" ? "初期費用・月額0円" : "成果報酬";
  return buildMetadata({
    title: `${s.name}の料金・${fee}・特徴を解説`,
    description: truncate(
      `${s.name}（${s.company_name}）の成果地点・初期費用・月額費用・成果報酬額を掲載。${s.summary ?? ""}最新の条件は公式サイトをご確認ください。`,
      120,
    ),
    path: `/services/${s.slug}`,
  });
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 px-4 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:px-5">
      <dt className="text-sm font-bold text-ink">{label}</dt>
      <dd className="text-sm leading-7">{children}</dd>
    </div>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, categories, all, articles] = await Promise.all([getServiceBySlug(slug), getCategories(), getServices(), getArticles()]);
  if (!service) notFound();

  const cats = service.category_ids.map((id) => categories.find((c) => c.id === id)).filter((c) => !!c);
  const primary = cats[0];
  const related = all
    .filter((s) => s.id !== service.id && s.category_ids.some((id) => service.category_ids.includes(id)))
    .slice(0, 3);
  const relatedArticles = articles.filter((a) => a.service_ids.includes(service.id));
  const badge = partnerBadge(service.partner_status);
  const cta = documentCtaLabel(service.partner_status);
  const paragraphs = (service.description ?? "").split(/\n{2,}/).filter(Boolean);

  const ctas = (placement: string) => (
    <div className="flex flex-col gap-3 sm:flex-row">
      <OfficialSiteLink href={service.website_url} serviceId={service.id} serviceName={service.name} placement={placement} className="btn-primary flex-1 py-3.5 text-base sm:flex-none sm:px-8">
        公式サイトを見る <Icon name="external" className="size-4" />
      </OfficialSiteLink>
      <LeadDialog
        serviceId={service.id}
        serviceName={service.name}
        buttonLabel={cta}
        disclaimer={leadDisclaimer(service.partner_status)}
        partnerStatus={service.partner_status}
        placement={placement}
        className="btn-secondary flex-1 py-3.5 text-base sm:flex-none sm:px-8"
      />
    </div>
  );

  return (
    <div className="container-page py-8 sm:py-10">
      <PageEvent name="service_page_view" params={{ service_id: service.id, service_name: service.name }} />
      <Breadcrumbs
        items={[
          { name: "サービス一覧", href: "/services" },
          ...(primary ? [{ name: primary.name, href: `/category/${primary.slug}` }] : []),
          { name: service.name },
        ]}
      />

      <header className="card mt-5 p-5 sm:p-8">
        <div className="flex items-start gap-4 sm:gap-5">
          <ServiceLogo name={service.name} url={service.logo_url} size={72} />
          <div className="min-w-0 flex-1">
            {badge && <p className="mb-1"><span className="tag bg-slate-100 text-slate-700" title={badge.title}>{badge.label}</span></p>}
            <h1 className="text-2xl sm:text-3xl">{service.name}</h1>
            <p className="mt-1 text-sm text-muted">運営会社：{service.company_name}</p>
          </div>
        </div>
        <div className="mt-5"><FeeTags service={service} size="md" /></div>
        {service.summary && <p className="mt-4 leading-8">{service.summary}</p>}
        <div className="mt-6">{ctas("detail_top")}</div>
        <p className="mt-3 text-xs leading-6 text-muted">
          {service.partner_status === "unpartnered"
            ? "公式サイトは外部サイトです。「資料を確認する」は、入力内容をもとに公開されている資料や公式の資料請求ページをご案内するフォームです。"
            : "公式サイトは外部サイトです。"}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-10">
          <section aria-labelledby="facts">
            <h2 id="facts" className="mb-4 text-xl">料金・基本情報</h2>
            <dl className="card divide-y divide-line">
              <Fact label="サービス名">{service.name}</Fact>
              <Fact label="運営会社">{service.company_name}</Fact>
              <Fact label="カテゴリ">
                {cats.length ? cats.map((c, i) => (
                  <span key={c!.id}>{i > 0 && "、"}<Link href={`/category/${c!.slug}`} className="text-brand-700 underline">{c!.name}</Link></span>
                )) : "要問い合わせ"}
              </Fact>
              <Fact label="成果地点">
                <span className="font-bold text-ink">{successConditionLabel(service)}</span>
                {service.outcome_type !== "other" && <span className="ml-2 tag bg-slate-100 text-slate-700">{OUTCOME_LABELS[service.outcome_type]}</span>}
              </Fact>
              <Fact label="成果報酬額"><span className="font-bold text-ink">{successFeeLabel(service)}</span></Fact>
              <Fact label="初期費用"><span className="font-bold text-ink">{initialFeeLabel(service)}</span></Fact>
              <Fact label="月額費用"><span className="font-bold text-ink">{monthlyFeeLabel(service)}</span></Fact>
              {service.pricing_note && <Fact label="料金の補足">{service.pricing_note}</Fact>}
              <Fact label="完全成果報酬">{service.is_full_success_fee ? "該当（初期費用・月額費用とも0円）" : "該当なし／未確認"}</Fact>
              <Fact label="無料相談">{service.has_free_consultation ? "あり" : "公式サイトをご確認ください"}</Fact>
              <Fact label="対象企業">{service.target_companies || "公式サイトをご確認ください"}</Fact>
              <Fact label="公式サイト">
                <OfficialSiteLink href={service.website_url} serviceId={service.id} serviceName={service.name} placement="detail_facts" className="break-all text-brand-700 underline">
                  {service.website_url}
                </OfficialSiteLink>
              </Fact>
              <Fact label="情報更新日"><time>{infoUpdatedAt(service)}</time></Fact>
              {service.source_url && (
                <Fact label="情報ソース">
                  <a href={service.source_url} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-brand-700 underline">{service.source_url}</a>
                </Fact>
              )}
            </dl>
            <p className="mt-3 flex gap-2 rounded-xl bg-warn-50 p-4 text-sm leading-7 text-warn-700">
              <Icon name="info" className="mt-1 size-4 shrink-0" />
              本ページの情報は公開情報をもとに編集部が作成しています。最新の料金・提供条件については公式サイトをご確認ください。
            </p>
          </section>

          {paragraphs.length > 0 && (
            <section aria-labelledby="overview">
              <h2 id="overview" className="mb-4 text-xl">サービス概要</h2>
              <div className="prose-ja">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
            </section>
          )}

          {service.features.length > 0 && (
            <section aria-labelledby="features">
              <h2 id="features" className="mb-4 text-xl">特徴</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.features.map((f, i) => (
                  <li key={i} className="card flex gap-3 p-4 text-sm leading-7">
                    <Icon name="check" className="mt-1 size-5 shrink-0 text-good-700" />{f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="card bg-brand-50/50 p-5 sm:p-7">
            <h2 className="text-lg">{service.name}を検討する</h2>
            <div className="mt-4">{ctas("detail_bottom")}</div>
          </section>

          {relatedArticles.length > 0 && (
            <section aria-labelledby="articles">
              <h2 id="articles" className="mb-4 text-xl">このサービスに関連する記事</h2>
              <ul className="space-y-2">
                {relatedArticles.map((a) => <li key={a.id}><Link href={`/articles/${a.slug}`} className="text-brand-700 underline">{a.title}</Link></li>)}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-40 lg:self-start">
          <div className="card p-5">
            <h2 className="text-base">他のサービスと比べる</h2>
            <p className="mt-2 text-xs leading-6 text-muted">最大3サービスまで、料金・成果地点・特徴を横並びで比較できます。</p>
            <div className="mt-3"><CompareToggle slug={service.slug} name={service.name} /></div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14" aria-labelledby="related">
          <h2 id="related" className="mb-5 text-xl">同じカテゴリのサービス</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((s) => <li key={s.id}><ServiceCard service={s} categories={categories} compact /></li>)}
          </ul>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          url: absoluteUrl(`/services/${service.slug}`),
          description: truncate(service.summary ?? service.description ?? service.name, 200),
          provider: { "@type": "Organization", name: service.company_name, url: service.website_url },
          areaServed: { "@type": "Country", name: "JP" },
          ...(primary ? { serviceType: primary.name } : {}),
        }}
      />
    </div>
  );
}
