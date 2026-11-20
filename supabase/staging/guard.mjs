// ─────────────────────────────────────────────────────────────────
// Target guard for the staging verification suite (npm run test:staging).
// Plain ESM so the env-check script, the suite and the unit tests share it.
//
// The suite creates synthetic users, flips the adult-sync switch IN
// STAGING (restored afterwards) and deletes accounts, so it must never
// reach production. It refuses to run unless:
//   - STAGING_SUPABASE_URL is a https://<ref>.supabase.co project URL;
//   - <ref> is NOT the production project (public: it ships in the live
//     site's JavaScript);
//   - STAGING_CONFIRM_REF repeats <ref> (the operator confirms the target);
//   - a public key and a server key are present, of the right KIND, not
//     swapped, and (legacy JWT keys) issued for this very project.
// Supports both key formats:
//   new:    sb_publishable_…  /  sb_secret_…
//   legacy: anon JWT          /  service_role JWT
// Error messages never include key values.
// ─────────────────────────────────────────────────────────────────

/** Production Supabase project ref (from the live site's public bundle, 2026-11-20). */
export const PRODUCTION_REF = "dykhwagloqxawgfkmjmc";

/** Decodes a JWT payload without verifying it (only used to classify a key). */
function jwtPayload(token) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(parts[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
  } catch {
    return null;
  }
}

/**
 * Classifies a Supabase API key: "publishable" | "secret" | "legacy-anon" |
 * "legacy-service-role" | "unknown", plus the project ref for legacy JWTs.
 */
export function classifyKey(key) {
  if (key.startsWith("sb_publishable_")) return { kind: "publishable" };
  if (key.startsWith("sb_secret_")) return { kind: "secret" };
  const p = key.startsWith("eyJ") ? jwtPayload(key) : null;
  if (p?.role === "anon") return { kind: "legacy-anon", ref: p.ref };
  if (p?.role === "service_role") return { kind: "legacy-service-role", ref: p.ref };
  return { kind: "unknown" };
}

const first = (env, ...names) => {
  for (const n of names) {
    const v = (env[n] ?? "").trim();
    if (v) return v;
  }
  return "";
};

/**
 * @param {Record<string, string | undefined>} env
 * @returns {{ url: string, ref: string, anonKey: string, serviceKey: string, publicKind: string, serverKind: string, captchaToken?: string, sweepSecret?: string }}
 */
export function stagingTarget(env) {
  const url = (env.STAGING_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
  const m = /^https:\/\/([a-z0-9]{20})\.supabase\.co$/.exec(url);
  if (!m) throw new Error("STAGING_SUPABASE_URL must look like https://<20-character ref>.supabase.co");
  const ref = m[1];
  if (ref === PRODUCTION_REF) throw new Error("Refusing to run: STAGING_SUPABASE_URL is the PRODUCTION project.");
  if ((env.STAGING_CONFIRM_REF ?? "").trim() !== ref) throw new Error("Set STAGING_CONFIRM_REF to the staging project ref to confirm the target.");

  const anonKey = first(env, "STAGING_SUPABASE_PUBLISHABLE_KEY", "STAGING_SUPABASE_ANON_KEY");
  const serviceKey = first(env, "STAGING_SUPABASE_SECRET_KEY", "STAGING_SUPABASE_SERVICE_ROLE_KEY");
  if (!anonKey) throw new Error("STAGING_SUPABASE_PUBLISHABLE_KEY is missing (sb_publishable_…, or the legacy anon key).");
  if (!serviceKey) throw new Error("STAGING_SUPABASE_SECRET_KEY is missing (sb_secret_…, or the legacy service_role key). Keep it in .env.staging.local only.");
  if (anonKey === serviceKey) throw new Error("The public key and the server key must be different keys.");

  const pub = classifyKey(anonKey);
  const srv = classifyKey(serviceKey);
  if (pub.kind === "secret" || pub.kind === "legacy-service-role") throw new Error("The PUBLIC key slot holds a SECRET/service-role key. Swap them: never use a secret key as the public key.");
  if (srv.kind === "publishable" || srv.kind === "legacy-anon") throw new Error("The SERVER key slot holds a publishable/anon key.");
  if (pub.kind === "unknown") throw new Error("The public key is neither an sb_publishable_ key nor a legacy anon key.");
  if (srv.kind === "unknown") throw new Error("The server key is neither an sb_secret_ key nor a legacy service_role key.");
  for (const k of [pub, srv]) if (k.ref && k.ref !== ref) throw new Error(`A legacy key was issued for a different project${k.ref === PRODUCTION_REF ? " (PRODUCTION)" : ""}, not ${ref}.`);

  return {
    url,
    ref,
    anonKey,
    serviceKey,
    publicKind: pub.kind,
    serverKind: srv.kind,
    captchaToken: (env.STAGING_TURNSTILE_TEST_TOKEN ?? "").trim() || undefined,
    sweepSecret: (env.STAGING_SWEEP_SECRET ?? "").trim() || undefined,
  };
}

/** Removes any key material from text before it is logged or saved as evidence. */
export function redact(text, t) {
  let out = text;
  for (const k of [t.anonKey, t.serviceKey, t.sweepSecret]) if (k) out = out.split(k).join("[redacted]");
  return out.replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, "[redacted-jwt]").replace(/sb_(secret|publishable)_[A-Za-z0-9_-]+/g, "[redacted-key]");
}
