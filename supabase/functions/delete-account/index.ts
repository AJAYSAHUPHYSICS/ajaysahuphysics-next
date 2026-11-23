// Supabase Edge Function (Deno): account deletion.
// Deploy to STAGING first:
//   supabase functions deploy delete-account --no-verify-jwt
// (supabase/config.toml also pins verify_jwt = false for this function.)
// Deletion gate (audit F5): every request checks
// public.account_deletion_enabled() first; see handler.ts.
// --no-verify-jwt: the platform's gateway check only understands legacy JWT
// keys, and it would block the scheduled sweep (which carries no user
// token). Authorisation happens here instead: every user request is
// verified with the Auth server (auth.getUser), and the sweep needs the
// sweep secret (constant-time compare). A request with neither gets 401.
//
// Provided by the platform: SUPABASE_URL, SUPABASE_SECRET_KEYS (preferred)
// and the legacy SUPABASE_SERVICE_ROLE_KEY (fallback; see runtime-config.ts).
// Set by the owner (Supabase secrets, never in GitHub):
//   ATLAS_DELETION_SWEEP_SECRET   for the scheduled sweep
//   ATLAS_ALLOWED_ORIGINS         staging only, e.g. http://localhost:3000
//
// POST /functions/v1/delete-account            Authorization: Bearer <user JWT>
// POST /functions/v1/delete-account?sweep=1    x-atlas-sweep-secret: <secret>
import { createClient } from "npm:@supabase/supabase-js@2.112.4";
import { deleteOwnAccount, sweep, type Deps } from "./handler.ts";
import { allowedOrigins, corsHeaders, serverKeyFrom } from "./runtime-config.ts";

const url = Deno.env.get("SUPABASE_URL")!;
const serverKey = serverKeyFrom((name) => Deno.env.get(name));
const sweepSecret = Deno.env.get("ATLAS_DELETION_SWEEP_SECRET") ?? "";
const admin = createClient(url, serverKey.key, { auth: { persistSession: false, autoRefreshToken: false } });

function safeEqual(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const deps: Deps = {
  async deletionEnabled() {
    const { data, error } = await admin.rpc("account_deletion_enabled");
    if (error) throw new Error(error.message);
    return data === true;
  },
  async rateWait(userId) {
    const { data, error } = await admin.rpc("deletion_rate_wait", { target: userId, act: "function" });
    if (error) throw new Error(error.message);
    return Number(data);
  },
  async verifyUser(token) {
    const { data, error } = await admin.auth.getUser(token);
    return error || !data.user ? null : data.user.id;
  },
  async requestedAt(userId) {
    const { data, error } = await admin.from("deletion_requests").select("requested_at").eq("user_id", userId).maybeSingle();
    if (error) throw new Error(error.message);
    return data?.requested_at ?? null;
  },
  async pendingBefore(cutoff) {
    // Errors are thrown, never read as "no pending requests" (audit F6).
    const { data, error } = await admin.from("deletion_requests").select("user_id").lt("requested_at", cutoff).limit(100);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: { user_id: string }) => r.user_id);
  },
  async purge(userId) {
    const { data, error } = await admin.rpc("purge_user_data", { target: userId });
    if (error) throw new Error(error.message);
    return Number(data ?? 0);
  },
  async deleteAuthUser(userId) {
    const { error } = await admin.auth.admin.deleteUser(userId);
    return !error || /not found/i.test(error.message);
  },
  isSweepSecret: (s) => safeEqual(s, sweepSecret),
  now: () => Date.now(),
};

const ORIGINS = allowedOrigins(Deno.env.get("ATLAS_ALLOWED_ORIGINS"));

Deno.serve(async (req) => {
  const CORS = corsHeaders(req.headers.get("origin"), ORIGINS);
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return new Response(null, { status: 405, headers: CORS });
  const isSweep = new URL(req.url).searchParams.get("sweep") === "1";
  const out = isSweep ? await sweep(deps, req.headers.get("x-atlas-sweep-secret")) : await deleteOwnAccount(deps, req.headers.get("authorization"));
  const retry = typeof out.body.retryAfterSeconds === "number" ? { "retry-after": String(out.body.retryAfterSeconds) } : {};
  return new Response(JSON.stringify(out.body), { status: out.status, headers: { ...CORS, ...retry, "content-type": "application/json" } });
});
