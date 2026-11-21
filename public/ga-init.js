// GA4 bootstrap (loaded by src/components/Analytics.tsx). Kept as a static
// file instead of an inline script so the Content Security Policy can forbid
// inline scripts that aren't hash-listed (scripts/inject-csp.mjs).
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-3R7SSPSTKT");
