// ─────────────────────────────────────────────────────────────────
// STAGING ONLY: verified-email check (decision K; tracker T-29).
// Run: npm run test:staging:verified-email
// Needs migrations 20261124000000 and 20261126000000 applied to staging.
//
// Hard rules (src/lib/__tests__/staging-verified-email-check.test.ts enforces
// them on this file's source):
//   * it never writes app_config: no sync switch and no deletion-gate change;
//   * it stops before doing anything unless adult_sync_permitted,
//     minor_sync_permitted and account_deletion_enabled are all 'false', and
//     checks them again at the end;
//   * it stores no study data: the server key never writes a study table, and
//     every study-table write it attempts must be REFUSED, with 0 rows stored;
//   * synthetic accounts only (admin API, which sends no email). Clean-up runs
//     in `finally`: purge_user_data() and deleteUser() are attempted separately
//     for every account this run created, each result is recorded, and the run
//     fails unless removal is CONFIRMED (not found), and an Auth user list shows
//     no account from this run. That sweep only detects; it never deletes.
//
// Accounts:
//   U  unverified: created with email_confirm false (email_confirmed_at null);
//   V  verified:   created with email_confirm true. Supabase Auth records it as
//                  confirmed, and the database trusts that record as it stands
//                  (owner decision M), which is what V checks.
//
// VERIFIED here:
//   * Auth boundary: U can't sign in while "Confirm email" is on, so an
//     unverified account never gets a session to read or write cloud data;
//   * V passes the email gate (email_verified() true) but can't turn cloud
//     copies on while the launch switch is off ("not-available-yet");
//   * bypass attempts by V are refused: setting sync_enabled, uploading to the
//     six study tables, changing a launch switch, recording a parental consent;
//   * anon can't call email_verified().
// If U ever DOES get a session (Confirm email off), the Auth check fails and
// the same session is used to check the database gate directly:
// email_verified() false; U really sets "email_verified": true in its own user
// metadata (checked through the admin API) and email_verified() stays false;
// enable_sync() "email-not-verified"; sync_allowed() false; no uploads.
//
// NOT VERIFIED by this staging test: an authenticated UNVERIFIED user's reads
// of the study tables. With "Confirm email" on, no unverified session exists,
// and planting study rows would break the no-study-data rule, so any read
// check here would pass on empty tables and prove nothing. That read policy is
// covered separately, against the real migrations, by
// src/lib/__tests__/db-verified-email.test.ts (PGlite).
//
// Side effect: each successful purge_user_data() adds one row to deletion_log
// (a SHA-256 hash of the synthetic user id and a row count; no email, no id):
// normally 2 per run (U: 0 rows, V: 3 rows).
// ─────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { redact, stagingTarget } from "../../supabase/staging/guard.mjs";

const env = {};
for (const line of fs.readFileSync(path.join(process.cwd(), ".env.staging.local"), "utf8").split(/\r?\n/)) {
  const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
  if (!m || line.trim().startsWith("#")) continue;
  let v = m[2]; if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  env[m[1]] = v;
}
const T = stagingTarget(env); // refuses both production refs and unconfirmed targets
const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const admin = createClient(T.url, T.serviceKey, opts);
const RUN = Date.now().toString(36);
const RUN_EMAIL = new RegExp(`^atlas-staging-verified-[a-z]+-${RUN}@example\\.com$`);
const created = [];
const checks = [];
const check = (n, ok, d = "") => checks.push({ n, ok: !!ok, d: redact(String(d), T) });
/** Runs one step; an exception becomes a failed check instead of skipping the steps after it. */
const attempt = async (n, fn) => { try { await fn(); } catch (e) { check(n, false, e?.message ?? String(e)); } };
const STUDY = ["bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks"];

const config = async () => Object.fromEntries(((await admin.from("app_config").select("key,value")).data ?? []).map((r) => [r.key, r.value]));
const switchesOff = (c) => c.adult_sync_permitted === "false" && c.minor_sync_permitted === "false" && c.account_deletion_enabled === "false";
const count = async (table, id) => (await admin.from(table).select("*", { count: "exact", head: true }).eq("user_id", id)).count;
const createSynthetic = async (tag, confirmed) => {
  const email = `atlas-staging-verified-${tag}-${RUN}@example.com`;
  const password = randomBytes(15).toString("base64url");
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: confirmed });
  if (error) throw new Error("createUser: " + error.message);
  created.push({ id: data.user.id, tag });
  const c = createClient(T.url, T.anonKey, opts);
  const signIn = await c.auth.signInWithPassword({ email, password });
  return { id: data.user.id, c, signIn };
};
/**
 * Removal is CONFIRMED only by "no user and no error", or an explicit not-found
 * (HTTP 404 / user_not_found). Any other error, or an ambiguous answer, is NOT confirmed.
 */
const removalConfirmed = async (id) => {
  const { data, error } = await admin.auth.admin.getUserById(id);
  if (!error) return { ok: !data?.user, d: data?.user ? "user still exists" : "not found" };
  if (error.status === 404 || error.code === "user_not_found") return { ok: true, d: "not found" };
  return { ok: false, d: `not confirmed: ${error.status ?? ""} ${error.code ?? ""} ${error.message}` };
};
/** Every Auth user whose address belongs to THIS run. Detection only: nothing here deletes. */
const runAccountsLeft = async () => {
  const perPage = 1000;
  const found = [];
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) return { ok: false, d: `user list failed: ${error.message}` };
    const users = data?.users ?? [];
    for (const u of users) if (RUN_EMAIL.test(u.email ?? "")) found.push(u.email);
    if (users.length < perPage) return { ok: found.length === 0, d: found.length ? `left: ${found.join(", ")}` : "none" };
  }
  return { ok: false, d: "user list not fully read (page limit)" };
};
const now = new Date().toISOString();
const studyRow = {
  bookmarks: { bookmark_id: "11:kinematics:chapter", cls: "11", slug: "kinematics", type: "chapter", chapter_name: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarked_at: now },
  checklist_items: { cls: "11", slug: "kinematics", item: "notes", done: true },
  revision_rounds: { cls: "11", slug: "kinematics", round: 1, completed_at: now },
  mistakes: { id: "00000000-0000-4000-8000-00000000e001", cls: "12", slug: "atoms", chapter_name: "Atoms", resource_type: "pyq", concept_tag: "Synthetic", difficulty: "medium", created_at: now },
  goals: { goal_type: "synthetic-goal", activated_at: now },
  streaks: { current_days: 1, longest_days: 1 },
};
/** A signed-in student records a profile and the privacy and cloud-sync consents (everything but the switch). */
const fullConsent = async (S, version) => {
  const p = await S.c.from("profiles").insert({ display_name: "Synthetic" });
  const results = [p.error];
  for (const kind of ["privacy", "cloud-sync"]) results.push((await S.c.from("consents").insert({ kind, version, granted: true })).error);
  return results.filter(Boolean).map((e) => e.message);
};
/** Every study-table upload must be refused (42501) with 0 rows stored. */
const uploadsRefused = async (S, who) => {
  for (const t of STUDY) {
    const { error } = await S.c.from(t).insert(studyRow[t]);
    check(`${who}: upload to ${t} refused by the server (0 rows stored)`, error?.code === "42501" && (await count(t, S.id)) === 0, error ? `${error.code} ${error.message.slice(0, 60)}` : "accepted!");
  }
};

const start = await config();
if (!switchesOff(start)) {
  console.log("Stop: a sync switch or the deletion gate is not 'false' on staging. Nothing was changed.");
  process.exit(2);
}
check("start: adult_sync_permitted, minor_sync_permitted and account_deletion_enabled are 'false'", true, JSON.stringify(start));
const version = start.consent_version;

let failed = false;
try {
  // ── Anonymous ────────────────────────────────────────────────
  const anon = createClient(T.url, T.anonKey, opts);
  const { error: anonEv } = await anon.rpc("email_verified");
  check("anonymous: email_verified() refused", !!anonEv, anonEv?.code ?? "allowed!");

  // ── U: unverified ────────────────────────────────────────────
  const U = await createSynthetic("u", false);
  const { data: uRec } = await admin.auth.admin.getUserById(U.id);
  check("U: Supabase Auth records the address as unconfirmed (email_confirmed_at null)", !!uRec?.user && !uRec.user.email_confirmed_at);
  const uSession = U.signIn.data?.session;
  check(
    "U: an unconfirmed account can't sign in, so it never gets a session (Confirm email on)",
    !uSession && !!U.signIn.error && (U.signIn.error.code === "email_not_confirmed" || /not confirmed/i.test(U.signIn.error.message)),
    uSession ? "a session was issued!" : `${U.signIn.error?.code ?? ""} ${U.signIn.error?.message ?? ""}`,
  );
  if (uSession) {
    // Confirm email appears OFF. The check above has failed; use the session to test the database gate directly.
    const { data: uEv } = await U.c.rpc("email_verified");
    check("U (session issued): email_verified() is false", uEv === false, String(uEv));
    // A self-declared claim: U writes email_verified: true into its own user metadata.
    const { error: mdE } = await U.c.auth.updateUser({ data: { email_verified: true } });
    check("U (session issued): updateUser() accepted the self-declared email_verified", !mdE, mdE?.message ?? "");
    const { data: uMd, error: uMdE } = await admin.auth.admin.getUserById(U.id);
    const mdSet = !mdE && !uMdE && uMd?.user?.user_metadata?.email_verified === true;
    check("U (session issued): admin read-back shows user_metadata.email_verified === true", mdSet, uMdE?.message ?? String(uMd?.user?.user_metadata?.email_verified));
    if (mdSet) {
      const { data: uEv2 } = await U.c.rpc("email_verified");
      check("U (session issued): the self-declared email_verified in user metadata changes nothing", uEv2 === false, String(uEv2));
      const uConsent = await fullConsent(U, version);
      check("U (session issued): records a profile and the privacy and cloud-sync consents", uConsent.length === 0, uConsent.join("; "));
      const { data: uEn } = await U.c.rpc("enable_sync");
      check('U (session issued): enable_sync() returns "email-not-verified"', uEn === "email-not-verified", String(uEn));
      const { data: uAllowed } = await U.c.rpc("sync_allowed");
      check("U (session issued): sync_allowed() is false", uAllowed === false, String(uAllowed));
      await uploadsRefused(U, "U (session issued)");
    } else {
      check("U (session issued): remaining fallback checks not run, because the metadata write wasn't confirmed", false);
    }
  }

  // ── V: verified (trusted as Supabase records it) ─────────────
  const V = await createSynthetic("v", true);
  const { data: vRec } = await admin.auth.admin.getUserById(V.id);
  check("V: Supabase Auth records the address as confirmed", !!vRec?.user?.email_confirmed_at);
  check("V: signs in", !V.signIn.error && !!V.signIn.data?.session, V.signIn.error?.code ?? "");
  const { data: vEv, error: vEvE } = await V.c.rpc("email_verified");
  check("V: email_verified() is true (the recorded status is trusted as it stands)", vEv === true && !vEvE, vEvE?.code ?? String(vEv));
  const vConsent = await fullConsent(V, version);
  check("V: records a profile and the privacy and cloud-sync consents", vConsent.length === 0, vConsent.join("; "));
  const { data: vEn } = await V.c.rpc("enable_sync");
  check('V: passes the email gate but enable_sync() returns "not-available-yet" (switch off)', vEn === "not-available-yet", String(vEn));
  const { data: vAllowed } = await V.c.rpc("sync_allowed");
  check("V: sync_allowed() is false (switch off)", vAllowed === false, String(vAllowed));

  // ── V: bypass attempts, all refused ──────────────────────────
  await V.c.from("profiles").update({ sync_enabled: true }).eq("user_id", V.id);
  const { data: pv } = await admin.from("profiles").select("sync_enabled").eq("user_id", V.id).single();
  check("V: can't switch sync_enabled on directly", pv?.sync_enabled === false);
  await uploadsRefused(V, "V");
  const { data: cfgW, error: cfgE } = await V.c.from("app_config").update({ value: "true" }).eq("key", "adult_sync_permitted").select();
  check("V: can't change a launch switch", !!cfgE || (cfgW ?? []).length === 0, cfgE?.code ?? "");
  const { error: parental } = await V.c.from("consents").insert({ kind: "parental", version, granted: true, method: "parent-verified" });
  check("V: can't record a parental or parent-verified consent", !!parental, parental?.code ?? "accepted!");
  const { data: vEn2 } = await V.c.rpc("enable_sync");
  check('V: after the attempts, enable_sync() still returns "not-available-yet"', vEn2 === "not-available-yet", String(vEn2));
} catch (e) {
  failed = true;
  check("run completed without an exception", false, e?.message ?? String(e));
} finally {
  // Clean-up: each action for each account is attempted and recorded on its own.
  for (const { id, tag } of created) {
    await attempt(`cleanup: purge_user_data for ${tag}`, async () => {
      const { data: n, error } = await admin.rpc("purge_user_data", { target: id });
      check(`cleanup: purge_user_data for ${tag}`, !error, error ? `${error.code ?? ""} ${error.message}` : `rows_deleted=${n}`);
    });
    await attempt(`cleanup: deleteUser for ${tag}`, async () => {
      const { error } = await admin.auth.admin.deleteUser(id);
      check(`cleanup: deleteUser for ${tag}`, !error, error ? `${error.status ?? ""} ${error.message}` : "");
    });
  }
  // Verification: every step runs even if an earlier one failed.
  await attempt("end: sync switches and deletion gate still 'false'", async () => {
    const end = await config();
    check("end: sync switches and deletion gate still 'false'", switchesOff(end), JSON.stringify(end));
  });
  for (const { id, tag } of created) {
    await attempt(`end: ${tag} removal confirmed`, async () => {
      const r = await removalConfirmed(id);
      check(`end: ${tag} removal confirmed`, r.ok, r.d);
    });
  }
  await attempt("end: no account from this run remains (Auth user list)", async () => {
    const r = await runAccountsLeft();
    check("end: no account from this run remains (Auth user list)", r.ok, r.d);
  });
  for (const t of [...STUDY, "profiles", "consents", "deletion_requests", "deletion_rate"]) {
    await attempt(`end: ${t} has 0 rows`, async () => {
      const { count: n, error } = await admin.from(t).select("*", { count: "exact", head: true });
      check(`end: ${t} has 0 rows`, !error && n === 0, error ? error.message : `rows=${n}`);
    });
  }
}
for (const c of checks) console.log(`${c.ok ? "ok  " : "FAIL"} ${c.n}${c.d && !c.ok ? " :: " + c.d : ""}`);
console.log(`verified-email check (staging): ${checks.filter((c) => c.ok).length}/${checks.length} passed`);
console.log("NOT VERIFIED by this staging test: an authenticated unverified user's reads of the study tables (no unverified session exists while Confirm email is on). That read policy is covered locally by db-verified-email.test.ts.");
process.exit(failed || checks.some((c) => !c.ok) ? 1 : 0);
