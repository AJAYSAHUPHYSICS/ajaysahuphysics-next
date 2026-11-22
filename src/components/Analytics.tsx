import Script from "next/script";
import { ANALYTICS_ENABLED } from "@/lib/analytics-config";

const GA_MEASUREMENT_ID = "G-3R7SSPSTKT";

// The GA4 init code lives in public/ga-init.js (not inline), so the page's
// Content Security Policy needs no 'unsafe-inline' for scripts. Keep the
// measurement ID there in sync with this one (a build check verifies it).
export default function Analytics() {
  // NEXT_PUBLIC_ANALYTICS=off at build time removes GA entirely (lib/analytics-config.ts).
  if (!GA_MEASUREMENT_ID || !ANALYTICS_ENABLED) return null;

  return (
    <>
      <Script src="/ga-init.js" strategy="afterInteractive" />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
    </>
  );
}
