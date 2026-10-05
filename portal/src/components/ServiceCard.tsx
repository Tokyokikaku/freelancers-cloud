import Link from "next/link";
import { initialFeeLabel, monthlyFeeLabel, successConditionLabel, successFeeLabel, UNKNOWN_TEXT } from "@/lib/format";
import { partnerBadge } from "@/lib/partner";
import type { Category, Service } from "@/lib/types";
import { CompareToggle } from "./CompareToggle";
import { FeeTags } from "./FeeTags";
import { Icon } from "./Icon";
import { ServiceLogo } from "./Logo";
import { OfficialSiteLink } from "./Trackers";

function Row({ label, value }: { label: string; value: string }) {
  const unknown = value === UNKNOWN_TEXT;
  return (
    <div className="rounded-lg bg-surface px-3 py-2">
      <dt className="text-xs font-bold text-muted">{label}</dt>
      <dd className={`mt-0.5 text-sm font-bold ${unknown ? "text-muted" : "text-ink"}`}>{value}</dd>
    </div>
  );
}

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
    <article className="card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <ServiceLogo name={service.name} url={service.logo_url} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {rank !== undefined && (
              <span className="tag bg-ink text-white">{rank}位</span>
            )}
            {badge && <span className="tag bg-slate-100 text-slate-700" title={badge.title}>{badge.label}</span>}
          </div>
          <h3 className="mt-1 text-lg leading-snug">
            <Link href={`/services/${service.slug}`} className="hover:text-brand-700 hover:underline">{service.name}</Link>
          </h3>
          <p className="text-sm text-muted">{service.company_name}</p>
        </div>
      </div>

      <div className="mt-4"><FeeTags service={service} /></div>

      {service.summary && !compact && <p className="mt-3 line-clamp-3 text-sm leading-7">{service.summary}</p>}

      {cats.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <li key={c.id}>
              <Link href={`/category/${c.slug}`} className="tag bg-slate-100 text-slate-700 hover:bg-slate-200">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 grid grid-cols-2 gap-2">
        <div className="col-span-2"><Row label="成果報酬の成果地点" value={successConditionLabel(service)} /></div>
        <Row label="初期費用" value={initialFeeLabel(service)} />
        <Row label="月額料金" value={monthlyFeeLabel(service)} />
        <div className="col-span-2"><Row label="成果報酬額" value={successFeeLabel(service)} /></div>
      </dl>

      <div className="mt-auto flex flex-col gap-2 pt-5">
        <div className="flex flex-wrap gap-2">
          <Link href={`/services/${service.slug}`} className="btn-primary flex-1">
            詳細を見る <Icon name="arrow" className="size-4" />
          </Link>
          <OfficialSiteLink href={service.website_url} serviceId={service.id} serviceName={service.name} placement="card" className="btn-ghost flex-1">
            公式サイト <Icon name="external" className="size-4" />
          </OfficialSiteLink>
        </div>
        <CompareToggle slug={service.slug} name={service.name} />
      </div>
    </article>
  );
}
