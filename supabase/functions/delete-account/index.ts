// Supabase Edge Function (Deno): account deletion.
// Deploy to STAGING first: `supabase functions deploy delete-account`.
// Secrets (set in Supabase, never in GitHub): SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY (provided by the platform) and
// ATLAS_DELETION_SWEEP_SECRET (for the scheduled sweep).
//
// POST /functions/v1/delete-account            Authorization: Bearer <user JWT>
// POST /functions/v1/delete-account?sweep=1    x-atlas-sweep-secret: <secret>
import { createClient } from "npm:@supabase/supabase-js@2.112.4";
import { deleteOwnAccount, sweep, type Deps } from "./handler.ts";

const url = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const sweepSecret = Deno.env.get("ATLAS_DELETION_SWEEP_SECRET") ?? "";
const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

function safeEqual(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const deps: Deps = {
  async verifyUser(token) {
    const { data, error } = await admin.auth.getUser(token);
    return error || !data.user ? null : data.user.id;
  },
  async requestedAt(userId) {
    const { data } = await admin.from("deletion_requests").select("requested_at").eq("user_id", userId).maybeSingle();
    return data?.requested_at ?? null;
  },
  async pendingBefore(cutoff) {
    const { data } = await admin.from("deletion_requests").select("user_id").lt("requested_at", cutoff).limit(100);
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

const CORS = {
  "Access-Control-Allow-Origin": "https://ajaysahuphysics.com",
  "Access-Control-Allow-Headers": "authorization, content-type, x-client-info, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return new Response(null, { status: 405, headers: CORS });
  const isSweep = new URL(req.url).searchParams.get("sweep") === "1";
  const out = isSweep ? await sweep(deps, req.headers.get("x-atlas-sweep-secret")) : await deleteOwnAccount(deps, req.headers.get("authorization"));
  return new Response(JSON.stringify(out.body), { status: out.status, headers: { ...CORS, "content-type": "application/json" } });
});
