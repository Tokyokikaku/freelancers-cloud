import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { FAQ_GROUPS } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "よくある質問",
  description: `${SITE_NAME}についてのよくある質問。成果報酬の考え方、資料請求の流れ、営業連絡・個人情報の取り扱い、掲載情報、掲載のお申し込みについてお答えします。`,
  path: "/faq",
});

export default function FaqPage() {
  const all = FAQ_GROUPS.flatMap((g) => g.items);
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "よくある質問" }]} />
      <div className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-2xl sm:text-4xl">よくある質問</h1>
        <p className="mt-3 text-sm leading-7 text-body">{SITE_NAME}のご利用にあたって、よくいただくご質問をまとめました。</p>

        <nav aria-label="カテゴリ" className="mt-5">
          <ul className="flex flex-wrap gap-2">
            {FAQ_GROUPS.map((g) => (
              <li key={g.id}><a href={`#${g.id}`} className="tag bg-brand-50 px-3 py-1.5 text-sm text-brand-700 hover:bg-brand-100">{g.title}</a></li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 space-y-10">
          {FAQ_GROUPS.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-24">
              <h2 id={`${g.id}-h`} className="mb-3 border-l-4 border-cta-500 pl-3 text-xl">{g.title}</h2>
              <FaqList items={g.items} />
            </section>
          ))}
        </div>

        <div className="panel mt-10 p-5 text-center text-sm leading-7">
          <p className="font-bold text-ink">解決しない場合は、お問い合わせください。</p>
          <p className="mt-1"><a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-brand-700 underline">{CONTACT_EMAIL}</a></p>
          <p className="mt-3"><Link href="/privacy" className="text-brand-700 underline">プライバシーポリシー</Link>　<Link href="/about" className="text-brand-700 underline">掲載方針</Link></p>
        </div>
      </div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: all.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    </div>
  );
}
