import Link from "next/link";

/** セクション見出し。左に青いバー（比較メディアの定番表現） */
export function SectionHead({ title, lead, href, hrefLabel, eyebrow }: { eyebrow?: string; title: React.ReactNode; lead?: React.ReactNode; href?: string; hrefLabel?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="border-l-[5px] border-brand-600 pl-3 text-xl leading-snug sm:text-[1.4rem]">{title}</h2>
        {lead && <p className="mt-2 text-sm leading-7 text-muted">{lead}</p>}
      </div>
      {href && <Link href={href} className="text-sm font-bold text-brand-700 hover:underline">{hrefLabel ?? "すべて見る"} ＞</Link>}
    </div>
  );
}
