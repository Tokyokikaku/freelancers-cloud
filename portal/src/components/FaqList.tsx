import { Icon } from "./Icon";

export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="panel divide-y divide-line">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center gap-3 p-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm bg-brand-600 text-xs text-white">Q</span>
            <span className="flex-1">{f.q}</span>
            <Icon name="arrow" className="size-4 shrink-0 rotate-90 transition group-open:-rotate-90" />
          </summary>
          <div className="flex gap-3 border-t border-dashed border-line bg-surface/50 p-4">
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm bg-cta-500 text-xs font-bold text-white">A</span>
            <p className="text-sm leading-7">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
