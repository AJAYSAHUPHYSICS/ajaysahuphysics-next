// ─────────────────────────────────────────────────────────────────
// Build-time switch for Google Analytics (GA4).
//
// ON by default, which is today's behaviour. Setting
// NEXT_PUBLIC_ANALYTICS=off at build time removes the GA scripts from
// every page and the Google origins from the Content Security Policy
// (scripts/inject-csp.mjs reads the same variable with the same rule).
//
// It exists so the owner can switch analytics off quickly, e.g. if
// counsel advises against it for under-18 visitors (legal checklist
// item L-4). Changing it in production is an owner decision.
// ─────────────────────────────────────────────────────────────────

/** Off only for an explicit "off" / "false" / "0"; anything else (including unset) keeps analytics on. */
export function analyticsEnabled(raw: string | undefined): boolean {
  return !["off", "false", "0"].includes((raw ?? "").trim().toLowerCase());
}

export const ANALYTICS_ENABLED = analyticsEnabled(process.env.NEXT_PUBLIC_ANALYTICS);
