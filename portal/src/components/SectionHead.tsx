import Link from "next/link";

/** セクション見出し（小見出し + H2 + リード文 + 右側リンク） */
export function SectionHead({
  eyebrow,
  title,
  lead,
  href,
  hrefLabel,
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
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10 ${center ? "justify-center text-center" : ""}`}>
      <div className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className={`eyebrow ${dark ? "!text-mint-300" : ""}`}>{eyebrow}</p>}
        <h2 className={`text-2xl leading-snug sm:text-3xl sm:leading-snug ${dark ? "!text-white" : ""}`}>{title}</h2>
        {lead && <p className={`mt-3 text-sm leading-7 sm:text-base sm:leading-8 ${dark ? "text-slate-300" : "text-muted"}`}>{lead}</p>}
      </div>
      {href && (
        <Link href={href} className={`text-sm font-bold hover:underline ${dark ? "text-mint-300" : "text-brand-700"}`}>
          {hrefLabel ?? "すべて見る"} →
        </Link>
      )}
    </div>
  );
}
