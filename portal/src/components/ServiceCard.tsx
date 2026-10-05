import Link from "next/link";
import { successConditionLabel, successFeeLabel, UNKNOWN_TEXT } from "@/lib/format";
import { partnerBadge } from "@/lib/partner";
import type { Category, Service } from "@/lib/types";
import { CompareToggle } from "./CompareToggle";
import { FactCell, FeeTile } from "./FeeTile";
import { FeeTags } from "./FeeTags";
import { ServiceLogo } from "./Logo";
import { OfficialSiteLink } from "./Trackers";

const RANK_COLOR = ["bg-gold", "bg-silver", "bg-bronze"];

/** サービスの1件表示。ランキング・一覧・カテゴリで共通の「比較行」 */
export function ServiceCard({ service, categories, rank, compact = false }: { service: Service; categories: Category[]; rank?: number; compact?: boolean }) {
  const cats = service.category_ids
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is Category => Boolean(c))
    .slice(0, 3);
  const badge = partnerBadge(service.partner_status);
  const feeUnknown = successFeeLabel(service) === UNKNOWN_TEXT;

  return (
    <article className="panel overflow-hidden transition-colors hover:border-brand-500">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-surface/70 px-3 py-2 sm:px-4">
        {rank !== undefined && (
          <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-sm text-sm font-black text-white ${RANK_COLOR[rank - 1] ?? "bg-navy-800"}`} aria-label={`${rank}位`}>{rank}</span>
        )}
        <h3 className="min-w-0 flex-1 text-[1.05rem] leading-snug">
          <Link href={`/services/${service.slug}`} className="text-brand-700 hover:underline">{service.name}</Link>
        </h3>
        {badge && <span className="tag bg-slate-200 text-slate-700" title={badge.title}>{badge.label}</span>}
        <FeeTags service={service} omitFees />
      </header>

      <div className="grid gap-4 p-3 sm:p-4 md:grid-cols-[1fr_11.5rem]">
        <div className="min-w-0">
          <div className="flex gap-3">
            <ServiceLogo name={service.name} url={service.logo_url} size={48} />
            <div className="min-w-0">
              <p className="text-xs text-muted">{service.company_name}</p>
              {service.summary && !compact && <p className="mt-1 line-clamp-2 text-sm leading-6">{service.summary}</p>}
              {cats.length > 0 && (
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {cats.map((c) => <li key={c.id}><Link href={`/category/${c.slug}`} className="tag bg-brand-50 text-brand-700 hover:bg-brand-100">{c.name}</Link></li>)}
                </ul>
              )}
            </div>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            <FeeTile label="初期費用" type={service.initial_fee_type} detail={service.initial_fee} />
            <FeeTile label="月額料金" type={service.monthly_fee_type} detail={service.monthly_fee} />
            <FactCell label="成果報酬額">
              <span className={`line-clamp-3 text-sm leading-5 ${feeUnknown ? "text-muted" : "font-bold text-ink"}`}>{successFeeLabel(service)}</span>
            </FactCell>
            <FactCell label="成果地点">
              <span className="line-clamp-3 text-sm font-bold leading-5 text-ink">{successConditionLabel(service)}</span>
            </FactCell>
          </dl>
        </div>

        <div className="flex flex-col gap-2 md:justify-center">
          <Link href={`/services/${service.slug}`} className="btn-cta">詳細を見る</Link>
          <OfficialSiteLink href={service.website_url} serviceId={service.id} serviceName={service.name} placement="card" className="btn-secondary">公式サイトへ</OfficialSiteLink>
          <CompareToggle slug={service.slug} name={service.name} />
        </div>
      </div>
    </article>
  );
}
