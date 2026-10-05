import Link from "next/link";
import { successConditionLabel, successFeeLabel, UNKNOWN_TEXT } from "@/lib/format";
import { partnerBadge } from "@/lib/partner";
import type { Category, Service } from "@/lib/types";
import { FeeTile } from "./FeeTile";
import { CompareToggle } from "./CompareToggle";
import { FeeTags } from "./FeeTags";
import { Icon } from "./Icon";
import { ServiceLogo } from "./Logo";
import { OfficialSiteLink } from "./Trackers";

export function ServiceCard({
  service,
  categories,
  rank,
  compact = false,
}: {
  service: Service;
  categories: Category[];
  rank?: number;
  compact?: boolean;
}) {
  const cats = service.category_ids
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is Category => Boolean(c))
    .slice(0, 3);
  const badge = partnerBadge(service.partner_status);

  return (
    <article className="card card-hover relative flex h-full flex-col overflow-hidden">
      {service.is_full_success_fee && <div className="h-1 bg-gradient-to-r from-mint-400 to-brand-500" aria-hidden="true" />}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <ServiceLogo name={service.name} url={service.logo_url} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {rank !== undefined && <span className="tag bg-navy-900 text-white">{rank}位</span>}
              {badge && <span className="tag bg-slate-100 text-slate-700" title={badge.title}>{badge.label}</span>}
            </div>
            <h3 className="mt-1 text-[17px] leading-snug">
              <Link href={`/services/${service.slug}`} className="hover:text-brand-700 hover:underline">{service.name}</Link>
            </h3>
            <p className="text-xs text-muted">{service.company_name}</p>
          </div>
        </div>

        {(service.is_full_success_fee || service.has_free_consultation) && <div className="mt-4"><FeeTags service={service} omitFees /></div>}
        {service.summary && !compact && <p className="mt-3 line-clamp-3 text-sm leading-7">{service.summary}</p>}

        <dl className="mt-4 grid grid-cols-2 gap-2">
          <FeeTile label="初期費用" type={service.initial_fee_type} detail={service.initial_fee} />
          <FeeTile label="月額料金" type={service.monthly_fee_type} detail={service.monthly_fee} />
          <div className="col-span-2 rounded-xl bg-brand-50/70 px-3.5 py-3">
            <dt className="text-[11px] font-bold text-brand-700">成果報酬額</dt>
            <dd className={`mt-0.5 text-sm font-bold leading-6 ${successFeeLabel(service) === UNKNOWN_TEXT ? "text-muted" : "text-ink"}`}>{successFeeLabel(service)}</dd>
            <dt className="mt-2 text-[11px] font-bold text-brand-700">成果地点</dt>
            <dd className="mt-0.5 text-sm font-bold leading-6 text-ink">{successConditionLabel(service)}</dd>
          </div>
        </dl>

        {cats.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <li key={c.id}><Link href={`/category/${c.slug}`} className="tag bg-slate-100 text-slate-600 hover:bg-slate-200">{c.name}</Link></li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <div className="flex flex-wrap gap-2">
            <Link href={`/services/${service.slug}`} className="btn-primary flex-1">詳細を見る <Icon name="arrow" className="size-4" /></Link>
            <OfficialSiteLink href={service.website_url} serviceId={service.id} serviceName={service.name} placement="card" className="btn-ghost flex-1">
              公式サイト <Icon name="external" className="size-4" />
            </OfficialSiteLink>
          </div>
          <CompareToggle slug={service.slug} name={service.name} />
        </div>
      </div>
    </article>
  );
}
