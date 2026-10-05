import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** 下層ページの見出しエリア（パンくず + H1 + リード文） */
export function PageHeader({ crumbs, title, lead, children }: { crumbs: Crumb[]; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="border-b border-line bg-soft">
      <div className="container-page py-8 sm:py-12">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 text-2xl leading-snug sm:text-4xl sm:leading-snug">{title}</h1>
        {lead && <p className="mt-4 max-w-3xl text-sm leading-8 sm:text-base">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
