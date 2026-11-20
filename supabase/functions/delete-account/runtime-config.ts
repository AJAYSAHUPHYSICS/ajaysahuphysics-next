// ─────────────────────────────────────────────────────────────────
// Runtime configuration for the delete-account Edge Function. Pure, so
// Vitest can test it (index.ts is Deno-only).
//
// Server key: Supabase injects the new secret keys as SUPABASE_SECRET_KEYS
// (a JSON object keyed by name; the default key is "default") alongside the
// legacy SUPABASE_SERVICE_ROLE_KEY. Legacy keys are being deprecated by the
// end of 2026, so the new secret key is preferred and the legacy key is
// only a fallback.
//
// CORS: production allows only https://ajaysahuphysics.com. A staging
// project can allow extra origins (e.g. http://localhost:3000 for manual
// browser checks) with the ATLAS_ALLOWED_ORIGINS secret (comma-separated).
// CORS is a browser courtesy, not access control: every request must
// still carry a valid user token or the sweep secret.
// ─────────────────────────────────────────────────────────────────

export const PRODUCTION_ORIGIN = "https://ajaysahuphysics.com";

export type ServerKey = { key: string; kind: "secret" | "legacy-service-role" };

export function serverKeyFrom(get: (name: string) => string | undefined): ServerKey {
  const raw = get("SUPABASE_SECRET_KEYS");
  if (raw) {
    try {
      const k = (JSON.parse(raw) as Record<string, unknown>)?.default;
      if (typeof k === "string" && k.startsWith("sb_secret_")) return { key: k, kind: "secret" };
    } catch {
      /* fall back to the legacy key */
    }
  }
  const legacy = get("SUPABASE_SERVICE_ROLE_KEY")?.trim();
  if (legacy) return { key: legacy, kind: "legacy-service-role" };
  throw new Error("delete-account: no server key (SUPABASE_SECRET_KEYS.default or SUPABASE_SERVICE_ROLE_KEY)");
}

/** Allowed browser origins: always production, plus exact https/http(localhost) origins from ATLAS_ALLOWED_ORIGINS. */
export function allowedOrigins(raw: string | undefined): string[] {
  const extra = (raw ?? "")
    .split(",")
    .map((s) => s.trim().replace(/\/+$/, ""))
    .filter((s) => /^https:\/\/[a-z0-9.-]+(:\d+)?$/.test(s) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(s));
  return [...new Set([PRODUCTION_ORIGIN, ...extra])];
}

export function corsHeaders(requestOrigin: string | null, allowed: string[]): Record<string, string> {
  const origin = requestOrigin && allowed.includes(requestOrigin) ? requestOrigin : PRODUCTION_ORIGIN;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, content-type, x-client-info, apikey",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}
