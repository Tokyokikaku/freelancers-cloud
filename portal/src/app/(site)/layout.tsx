import { GoogleAnalytics } from "@next/third-parties/google";
import { SelectionBar } from "@/components/SelectionBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        本文へスキップ
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <SelectionBar />
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          inLanguage: "ja",
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: absoluteUrl("/services?q={search_term_string}") },
            "query-input": "required name=search_term_string",
          },
        }}
      />
    </>
  );
}
