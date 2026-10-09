import { Icon } from "./Icon";

export function SearchBox({
  defaultValue,
  placeholder = "サービス名・カテゴリ・課題から検索",
  size = "md",
  id = "site-search",
  extraHidden,
}: {
  defaultValue?: string;
  placeholder?: string;
  size?: "md" | "lg";
  id?: string;
  extraHidden?: Record<string, string>;
}) {
  const lg = size === "lg";
  return (
    <form action="/services" method="get" role="search" className="w-full">
      <label htmlFor={id} className="sr-only">サイト内検索</label>
      <div className="flex items-stretch overflow-hidden rounded border-2 border-brand-600 bg-white focus-within:ring-2 focus-within:ring-brand-500/30">
        <span className={`flex items-center text-muted ${lg ? "pl-4" : "pl-3"}`}><Icon name="search" className={lg ? "size-6" : "size-5"} /></span>
        <input id={id} name="q" type="search" defaultValue={defaultValue} placeholder={placeholder} autoComplete="off" enterKeyHint="search"
          className={`min-w-0 flex-1 bg-transparent px-3 text-ink placeholder:text-slate-400 focus:outline-none ${lg ? "py-3.5 text-lg" : "py-2 text-base"}`} />
        {extraHidden && Object.entries(extraHidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
        <button type="submit" className={`shrink-0 bg-cta-500 font-bold text-white hover:bg-cta-600 ${lg ? "px-8 text-base" : "px-5 text-sm"}`}>検索</button>
      </div>
    </form>
  );
}
