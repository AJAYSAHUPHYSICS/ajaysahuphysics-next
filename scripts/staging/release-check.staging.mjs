// ─────────────────────────────────────────────────────────────────
// STAGING ONLY: safe release verification (owner decision, 2026-11-22).
// Replaces `npm run test:staging` for the release: it never turns cloud sync
// on. Run: npm run test:staging:release
//
// Hard rules (src/lib/__tests__/staging-release-check.test.ts enforces them
// on this file's source):
//   * it never writes app_config: no sync switch and no deletion-gate change;
//   * it stops before doing anything unless adult_sync_permitted,
//     minor_sync_permitted and account_deletion_enabled are all 'false';
//   * it stores no study data. Its only study-table writes are single
//     synthetic rows that the server must REFUSE while sync is off, with
//     "0 rows stored" checked afterwards;
//   * synthetic accounts only (admin API, no email), all removed in `finally`.
//
// VERIFIED here: anonymous denial (12 tables, 5 RPCs); password sign-in,
// generic errors, session refresh, sign-out revoking the refresh token;
// profile and consent rules (own rows only, consents append-only); sync
// safeguards with every precondition met (adult with full consent:
// sync_allowed false, enable_sync "not-available-yet"; under-18:
// "not-available-for-under-18"; uploads refused on all 6 study tables;
// students can't flip sync_enabled or app_config); A-versus-B isolation;
// export (own data only, documented shape); deletion safeguards with the
// gate off (direct request, function and sweep all refused, nothing recorded).
//
// NOT TESTED here, on purpose (needs sync on, an inbox or the gate open):
// two-device sync, merging, tombstones, interrupted uploads, account
// switching, large syncs; confirmation and reset emails (the manual inbox
// checklist); CAPTCHA; deletion end to end (npm run test:staging:deletion-gate,
// which opens only the deletion gate); browser login (F9 evidence).
// ─────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { randomBytes, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { redact, stagingTarget } from "../../supabase/staging/guard.mjs";

const env = {};
for (const line of fs.readFileSync(path.join(process.cwd(), ".env.staging.local"), "utf8").split(/\r?\n/)) {
  const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
  if (!m || line.trim().startsWith("#")) continue;
  let v = m[2]; if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  env[m[1]] = v;
}
const T = stagingTarget(env); // refuses the production ref and unconfirmed targets
const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const admin = createClient(T.url, T.serviceKey, opts);
const FN = `${T.url}/functions/v1/delete-account`;
const RUN = Date.now().toString(36);
const created = [];
const checks = [];
const check = (n, ok, d = "") => checks.push({ n, ok: !!ok, d: redact(String(d), T) });
const TABLES = ["app_config", "profiles", "consents", "bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks", "deletion_requests", "deletion_log", "deletion_rate"];
const STUDY = ["bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks"];

const config = async () => Object.fromEntries(((await admin.from("app_config").select("key,value")).data ?? []).map((r) => [r.key, r.value]));
const switchesOff = (c) => c.adult_sync_permitted === "false" && c.minor_sync_permitted === "false" && c.account_deletion_enabled === "false";
const count = async (table, id) => (await admin.from(table).select("*", { count: "exact", head: true }).eq("user_id", id)).count;
const user = async (tag) => {
  const email = `atlas-staging-release-${tag}-${RUN}@example.com`;
  const password = randomBytes(15).toString("base64url");
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw new Error("createUser: " + error.message);
  created.push(data.user.id);
  const c = createClient(T.url, T.anonKey, opts);
  const { data: s, error: se } = await c.auth.signInWithPassword({ email, password });
  if (se) throw new Error("signIn: " + se.message);
  return { id: data.user.id, email, password, c, session: s.session };
};
const now = new Date().toISOString();
const studyRow = {
  bookmarks: { bookmark_id: "11:kinematics:chapter", cls: "11", slug: "kinematics", type: "chapter", chapter_name: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarked_at: now },
  checklist_items: { cls: "11", slug: "kinematics", item: "notes", done: true },
  revision_rounds: { cls: "11", slug: "kinematics", round: 1, completed_at: now },
  mistakes: { id: randomUUID(), cls: "12", slug: "atoms", chapter_name: "Atoms", resource_type: "pyq", concept_tag: "Synthetic", difficulty: "medium", created_at: now },
  goals: { goal_type: "synthetic-goal", activated_at: now },
  streaks: { current_days: 1, longest_days: 1 },
};

const start = await config();
if (!switchesOff(start)) {
  console.log("Stop: a sync switch or the deletion gate is not 'false' on staging. Nothing was changed.");
  process.exit(2);
}
check("start: adult_sync_permitted, minor_sync_permitted and account_deletion_enabled are 'false'", true, JSON.stringify(start));

let failed = false;
try {
  // ── Anonymous ────────────────────────────────────────────────
  const anon = createClient(T.url, T.anonKey, opts);
  for (const t of TABLES) {
    const { data, error } = await anon.from(t).select("*").limit(1);
    check(`anonymous: ${t} not readable`, error || (data ?? []).length === 0, error ? error.code : `rows=${(data ?? []).length}`);
  }
  for (const fn of ["enable_sync", "export_my_data", "request_account_deletion", "sync_allowed", "account_deletion_enabled"]) {
    const { error } = await anon.rpc(fn);
    check(`anonymous: ${fn}() refused`, !!error, error?.code ?? "allowed!");
  }

  // ── Authentication ───────────────────────────────────────────
  const A = await user("a");
  const B = await user("b");
  const probe = createClient(T.url, T.anonKey, opts);
  const wrong = await probe.auth.signInWithPassword({ email: A.email, password: "definitely-wrong-123" });
  const unknown = await probe.auth.signInWithPassword({ email: `atlas-staging-release-nobody-${RUN}@example.com`, password: "definitely-wrong-123" });
  check("auth: wrong password refused", !!wrong.error && !wrong.data.session);
  check("auth: same error for a wrong password and an unknown email (no account enumeration)", wrong.error?.message === unknown.error?.message && wrong.error?.code === unknown.error?.code, `${wrong.error?.code} / ${unknown.error?.code}`);
  const { data: refreshed, error: re } = await A.c.auth.refreshSession({ refresh_token: A.session.refresh_token });
  check("auth: session refresh issues a working token", !re && !!refreshed.session && !!(await A.c.auth.getUser(refreshed.session.access_token)).data.user);
  const C = await user("c");
  const oldRefresh = C.session.refresh_token;
  await C.c.auth.signOut({ scope: "global" });
  const reuse = await probe.auth.refreshSession({ refresh_token: oldRefresh });
  check("auth: after sign-out, the old refresh token is refused", !!reuse.error && !reuse.data.session, reuse.error?.code ?? "accepted!");

  // ── Profiles and consents ────────────────────────────────────
  check("profile: A creates own profile (adult)", !(await A.c.from("profiles").insert({ display_name: "Synthetic A", age_band: "18-plus" })).error);
  check("profile: B creates own profile (under 18)", !(await B.c.from("profiles").insert({ display_name: "Synthetic B", age_band: "under-18" })).error);
  const version = start.consent_version;
  for (const kind of ["terms", "privacy", "cloud-sync"]) {
    const { error } = await A.c.from("consents").insert({ kind, version, granted: true });
    check(`consent: A records "${kind}" for the current version`, !error, error?.message ?? "");
  }
  const { data: cUpd } = await A.c.from("consents").update({ granted: false }).eq("user_id", A.id).select();
  const { data: cDel } = await A.c.from("consents").delete().eq("user_id", A.id).select();
  check("consent: append-only (A can't change or delete a recorded consent)", (cUpd ?? []).length === 0 && (cDel ?? []).length === 0 && (await count("consents", A.id)) === 3);
  const { error: parental } = await A.c.from("consents").insert({ kind: "parental", version, granted: true, method: "parent-verified" });
  check("consent: a student can't record a verified parental consent", !!parental, parental?.code ?? "accepted!");

  // ── Sync safeguards (every precondition met, switches off) ───
  const { data: allowedA } = await A.c.rpc("sync_allowed");
  check("sync: sync_allowed() is false for an adult with full consent (switch off)", allowedA === false, String(allowedA));
  const { data: enA } = await A.c.rpc("enable_sync");
  check('sync: enable_sync() returns "not-available-yet" for that adult', enA === "not-available-yet", String(enA));
  for (const kind of ["terms", "privacy", "cloud-sync"]) await B.c.from("consents").insert({ kind, version, granted: true });
  const { data: enB } = await B.c.rpc("enable_sync");
  check('sync: enable_sync() returns "not-available-for-under-18" for an under-18 student with full consent', enB === "not-available-for-under-18", String(enB));
  const { data: pb } = await admin.from("profiles").select("sync_enabled").eq("user_id", B.id).single();
  check("sync: neither student has sync_enabled", pb?.sync_enabled === false);
  await A.c.from("profiles").update({ sync_enabled: true }).eq("user_id", A.id);
  const { data: pa } = await admin.from("profiles").select("sync_enabled").eq("user_id", A.id).single();
  check("sync: a student can't switch sync_enabled on directly", pa?.sync_enabled === false);
  for (const t of STUDY) {
    const { error } = await A.c.from(t).insert(studyRow[t]);
    check(`sync: upload to ${t} refused by the server (0 rows stored)`, error?.code === "42501" && (await count(t, A.id)) === 0, error ? `${error.code} ${error.message.slice(0, 60)}` : "accepted!");
  }
  const { data: cfgW, error: cfgE } = await A.c.from("app_config").update({ value: "true" }).eq("key", "adult_sync_permitted").select();
  check("sync: a student can't change a launch switch", !!cfgE || (cfgW ?? []).length === 0, cfgE?.code ?? "");

  // ── Isolation, A versus B ────────────────────────────────────
  const { data: aSees } = await A.c.from("profiles").select("user_id");
  check("isolation: A sees only A's profile", (aSees ?? []).length === 1 && aSees[0].user_id === A.id);
  const { data: aC } = await A.c.from("consents").select("user_id");
  check("isolation: A sees only A's consents", (aC ?? []).every((r) => r.user_id === A.id));
  const { data: up } = await A.c.from("profiles").update({ display_name: "hijacked" }).eq("user_id", B.id).select();
  const { data: dl } = await A.c.from("profiles").delete().eq("user_id", B.id).select();
  const { error: asB } = await A.c.from("profiles").insert({ user_id: B.id, display_name: "as B" });
  const { error: cAsB } = await A.c.from("consents").insert({ user_id: B.id, kind: "terms", version, granted: true });
  const { data: bp } = await admin.from("profiles").select("display_name").eq("user_id", B.id).single();
  check("isolation: A can't update, delete or insert as B (profiles, consents)", (up ?? []).length === 0 && (dl ?? []).length === 0 && !!asB && !!cAsB && bp?.display_name === "Synthetic B");

  // ── Export ───────────────────────────────────────────────────
  const { data: exA, error: exE } = await A.c.rpc("export_my_data");
  const keys = ["exportedAt", "profile", "consents", "bookmarks", "checklistItems", "revisionRounds", "mistakes", "goals", "streak", "deletionRequest"];
  check("export: documented shape", !exE && keys.every((k) => k in (exA ?? {})), Object.keys(exA ?? {}).join(","));
  check("export: only A's own data (profile and 3 consents, nothing of B)", exA?.profile?.user_id === A.id && exA?.consents?.length === 3 && !JSON.stringify(exA).includes(B.id));

  // ── Deletion safeguards, gate off (non-destructive) ──────────
  const { data: g } = await A.c.rpc("account_deletion_enabled");
  check("deletion: account_deletion_enabled() is false", g === false);
  const rq = await A.c.rpc("request_account_deletion");
  check("deletion: direct request refused, nothing recorded", /deletion-disabled/.test(rq.error?.message ?? "") && (await count("deletion_requests", A.id)) === 0, rq.error?.message ?? "accepted!");
  const f = await fetch(FN, { method: "POST", headers: { authorization: `Bearer ${A.session.access_token}`, apikey: T.anonKey } });
  check("deletion: function refuses a valid token (403 deletion-disabled)", f.status === 403 && (await f.json().catch(() => null))?.error === "deletion-disabled", String(f.status));
  if (T.sweepSecret) {
    const s = await fetch(`${FN}?sweep=1`, { method: "POST", headers: { "x-atlas-sweep-secret": T.sweepSecret } });
    const sb = await s.json().catch(() => null);
    check("deletion: sweep refused with 0 outstanding requests", s.status === 403 && sb?.pendingRequests === 0, `${s.status} ${JSON.stringify(sb)}`);
  }
  check("deletion: account and data untouched", (await count("profiles", A.id)) === 1 && !!(await admin.auth.admin.getUserById(A.id)).data?.user);
} catch (e) {
  failed = true;
  check("run completed without an exception", false, e.message);
} finally {
  for (const id of created) { await admin.rpc("purge_user_data", { target: id }); await admin.auth.admin.deleteUser(id); }
  const end = await config();
  check("end: sync switches and deletion gate still 'false'", switchesOff(end), JSON.stringify(end));
  let left = 0;
  for (const id of created) if ((await admin.auth.admin.getUserById(id)).data?.user) left++;
  check("end: every synthetic account removed", left === 0, `left=${left}`);
  for (const t of [...STUDY, "profiles", "consents", "deletion_requests", "deletion_rate"]) {
    const { count: n } = await admin.from(t).select("*", { count: "exact", head: true });
    check(`end: ${t} has 0 rows`, n === 0, `rows=${n}`);
  }
}
for (const c of checks) console.log(`${c.ok ? "ok  " : "FAIL"} ${c.n}${c.d && !c.ok ? " :: " + c.d : ""}`);
console.log(`release check (staging): ${checks.filter((c) => c.ok).length}/${checks.length} passed`);
console.log("Not tested here, on purpose: cloud sync with sync on; inbox emails; CAPTCHA; deletion end to end (test:staging:deletion-gate); browser login (F9).");
process.exit(failed || checks.some((c) => !c.ok) ? 1 : 0);
