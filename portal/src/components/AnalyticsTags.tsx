import Script from "next/script";

/** GA4 と Microsoft Clarity。計測対象にするレイアウト（(site)・(lp)）にだけ置く。/admin 配下には置かない。tracking.ts の window.gtag はここで定義される。 */
export function AnalyticsTags() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-58167SQGHH" strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-58167SQGHH');`}
      </Script>
      <Script id="clarity-init" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "yxzhuvoxaf");`}
      </Script>
    </>
  );
}
