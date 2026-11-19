import Script from "next/script";

const GA_MEASUREMENT_ID = "G-3R7SSPSTKT";

// The GA4 init code lives in public/ga-init.js (not inline), so the page's
// Content Security Policy needs no 'unsafe-inline' for scripts. Keep the
// measurement ID there in sync with this one (a build check verifies it).
export default function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script src="/ga-init.js" strategy="afterInteractive" />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
    </>
  );
}
