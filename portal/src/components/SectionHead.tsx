import Link from "next/link";

/** セクション見出し。上に細い罫線、見出しは明朝体。装飾は付けない */
export function SectionHead({
  title,
  lead,
  href,
  hrefLabel,
  eyebrow,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  href?: string;
  hrefLabel?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-4 border-t-2 pt-5 sm:mb-10 ${dark ? "border-white" : "border-ink"} ${center ? "text-center" : ""}`}>
      <div className={`max-w-2xl ${center ? "mx-auto" : ""}`}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className={`text-2xl leading-snug sm:text-[1.75rem] sm:leading-snug ${dark ? "!text-white" : ""}`}>{title}</h2>
        {lead && <p className={`mt-3 text-sm leading-7 sm:text-base sm:leading-8 ${dark ? "text-slate-300" : "text-body"}`}>{lead}</p>}
      </div>
      {href && (
        <Link href={href} className={`text-sm font-bold underline-offset-4 hover:underline ${dark ? "text-white" : "text-brand-700"}`}>
          {hrefLabel ?? "すべて見る"} →
        </Link>
      )}
    </div>
  );
}
