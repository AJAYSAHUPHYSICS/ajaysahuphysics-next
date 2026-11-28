// GA4 bootstrap (loaded by src/components/Analytics.tsx). Kept as a static
// file instead of an inline script so the Content Security Policy can forbid
// inline scripts that aren't hash-listed (scripts/inject-csp.mjs).
//
// Not configured on /auth/ pages (audit F8): their address bar can briefly
// hold a one-time sign-in code (?code=…) before the page removes it, and a
// GA page view records the full URL. With no "config", GA has no destination
// and sends nothing from those pages.
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
if (!/(^|\/)auth\//.test(window.location.pathname)) {
  gtag("js", new Date());
  gtag("config", "G-3R7SSPSTKT");
}
