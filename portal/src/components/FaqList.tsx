import { Icon } from "./Icon";

export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
            <span>Q. {f.q}</span>
            <Icon name="arrow" className="size-4 shrink-0 rotate-90 transition group-open:-rotate-90" />
          </summary>
          <p className="mt-3 text-sm leading-7">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
