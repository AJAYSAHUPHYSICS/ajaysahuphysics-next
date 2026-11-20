// ─────────────────────────────────────────────────────────────────
// Target guard for the staging verification suite (npm run test:staging).
//
// The suite creates synthetic users, flips the adult-sync switch IN
// STAGING (restored afterwards) and deletes accounts, so it must never
// reach production. It refuses to run unless:
//   - STAGING_SUPABASE_URL is a https://<ref>.supabase.co project URL;
//   - <ref> is NOT the production project (public: it ships in the live
//     site's JavaScript);
//   - STAGING_CONFIRM_REF repeats <ref> (the operator confirms the target);
//   - both keys are present and different.
// Error messages never include key values.
// ─────────────────────────────────────────────────────────────────

/** Production Supabase project ref (from the live site's public bundle, 2026-11-20). */
export const PRODUCTION_REF = "dykhwagloqxawgfkmjmc";

export type StagingTarget = {
  url: string;
  ref: string;
  anonKey: string;
  serviceKey: string;
  /** Cloudflare Turnstile test token, when staging has CAPTCHA on with a Turnstile TEST secret. */
  captchaToken?: string;
  /** Sweep secret, to test the scheduled-sweep endpoint. */
  sweepSecret?: string;
};

export function stagingTarget(env: Record<string, string | undefined>): StagingTarget {
  const url = (env.STAGING_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
  const m = /^https:\/\/([a-z0-9]{20})\.supabase\.co$/.exec(url);
  if (!m) throw new Error("STAGING_SUPABASE_URL must look like https://<20-character ref>.supabase.co");
  const ref = m[1];
  if (ref === PRODUCTION_REF) throw new Error("Refusing to run: STAGING_SUPABASE_URL is the PRODUCTION project.");
  if ((env.STAGING_CONFIRM_REF ?? "").trim() !== ref) throw new Error("Set STAGING_CONFIRM_REF to the staging project ref to confirm the target.");
  const anonKey = (env.STAGING_SUPABASE_ANON_KEY ?? "").trim();
  const serviceKey = (env.STAGING_SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  if (!anonKey) throw new Error("STAGING_SUPABASE_ANON_KEY is missing.");
  if (!serviceKey) throw new Error("STAGING_SUPABASE_SERVICE_ROLE_KEY is missing (keep it in your local shell only).");
  if (anonKey === serviceKey) throw new Error("The anon key and the service-role key must be different keys.");
  return { url, ref, anonKey, serviceKey, captchaToken: env.STAGING_TURNSTILE_TEST_TOKEN?.trim() || undefined, sweepSecret: env.STAGING_SWEEP_SECRET?.trim() || undefined };
}

/** Removes any key material from text before it is logged or saved as evidence. */
export function redact(text: string, t: Pick<StagingTarget, "anonKey" | "serviceKey" | "sweepSecret">): string {
  let out = text;
  for (const k of [t.anonKey, t.serviceKey, t.sweepSecret]) if (k) out = out.split(k).join("[redacted]");
  return out.replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, "[redacted-jwt]").replace(/sb_(secret|publishable)_[A-Za-z0-9_-]+/g, "[redacted-key]");
}
