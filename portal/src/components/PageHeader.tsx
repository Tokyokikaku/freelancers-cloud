import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** 下層ページの見出しエリア */
export function PageHeader({ crumbs, title, lead, children }: { crumbs: Crumb[]; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="border-b border-line bg-white">
      <div className="container-page py-5 sm:py-7">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-3 border-l-[6px] border-brand-600 pl-3 text-2xl leading-snug sm:text-[1.9rem]">{title}</h1>
        {lead && <p className="mt-3 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
