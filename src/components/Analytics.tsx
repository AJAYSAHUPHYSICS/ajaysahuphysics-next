import Script from "next/script";

// TODO: Once Ajay creates a Google Analytics 4 property, replace this with
// the real Measurement ID (format: G-XXXXXXXXXX) and it will activate
// automatically. Until then, no tracking script loads at all.
const GA_MEASUREMENT_ID = "";

export default function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
