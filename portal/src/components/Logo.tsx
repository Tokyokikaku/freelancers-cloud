import { initialOf } from "@/lib/format";

/** サービスロゴ。未登録の場合は頭文字のアバターを表示する */
export function ServiceLogo({ name, url, size = 56 }: { name: string; url: string | null; size?: number }) {
  const style = { width: size, height: size };
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={`${name}のロゴ`} width={size} height={size} loading="lazy" decoding="async" style={style}
        className="shrink-0 rounded-md border border-line bg-white object-contain p-1" />
    );
  }
  return (
    <span aria-hidden="true" style={{ ...style, fontSize: size * 0.42 }}
      className="inline-flex shrink-0 items-center justify-center rounded-md bg-brand-50 font-bold text-brand-700 ring-1 ring-inset ring-brand-100">
      {initialOf(name)}
    </span>
  );
}
