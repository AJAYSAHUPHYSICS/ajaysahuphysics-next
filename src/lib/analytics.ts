// ─────────────────────────────────────────────────────────────────
// Analytics event helper
//
// Wraps window.gtag() with an SSR/no-gtag-yet guard, so every call
// site doesn't need to repeat `typeof window !== "undefined" &&
// window.gtag && ...`. This is the single place that talks to GA4
// directly — every tracked interaction in the app should go through
// trackEvent(), not call gtag() itself.
//
// Privacy note: every event below carries only anonymous content
// metadata (a chapter slug, a resource type, a search term the
// student typed) — never a name, phone number, or email. The lead
// capture form and WhatsApp messages already collect what's needed
// for follow-up; analytics stays behavioral, not personal.
// ─────────────────────────────────────────────────────────────────

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, string | number | boolean>
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
