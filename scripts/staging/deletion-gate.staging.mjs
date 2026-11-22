// ─────────────────────────────────────────────────────────────────
// STAGING ONLY: account-deletion gate and sweep, end to end (audit F5,
// runbook section 9, C.3 stage 1). Run: npm run test:staging:deletion-gate
//
// Needs: .env.staging.local (npm run staging:check passes); the staging
// project linked (supabase/.temp/project-ref must equal the target, or the
// run stops); migration 20261122000000 applied; the gated delete-account
// function deployed. Synthetic accounts only (admin API, no email).
//
//   A. gate off (it must be 'false' at the start): a direct request is
//      rejected and records nothing; the function (valid token) and the
//      sweep (valid secret) are rejected; the sweep alert stays quiet.
//   B. gate opened for this run: request and function delete an account,
//      with a deletion-log row; a planted pending request older than the
//      grace window is completed by the real sweep script; calling the
//      function without a request is refused.
//   C. gate closed again with a request still outstanding: the sweep
//      alert fires, the function is rejected, and the documented operator
//      procedure (purge_user_data + delete the auth user) completes it,
//      with the deletion log confirmed. A new direct request is rejected.
//
// Always, in `finally`: every synthetic account is removed and the gate is
// set back to 'false'. The sync switches are only read, never written.
// Evidence prints counts and booleans only: no keys, tokens or emails.
// ─────────────────────────────────────────────────────────────────
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash, randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { redact, stagingTarget } from "../../supabase/staging/guard.mjs";

const ROOT = process.cwd();
const env = {};
for (const line of fs.readFileSync(path.join(ROOT, ".env.staging.local"), "utf8").split(/\r?\n/)) {
  const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
  if (!m || line.trim().startsWith("#")) continue;
  let v = m[2]; if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  env[m[1]] = v;
}
const T = stagingTarget(env); // refuses the production ref and unconfirmed targets
const linked = fs.existsSync(path.join(ROOT, "supabase", ".temp", "project-ref")) ? fs.readFileSync(path.join(ROOT, "supabase", ".temp", "project-ref"), "utf8").trim() : "";
if (linked !== T.ref) { console.log("Stop: the linked Supabase project is not the staging target. Link staging first (supabase/README.md step 3)."); process.exit(2); }
if (!T.sweepSecret) { console.log("Stop: STAGING_SWEEP_SECRET is not set."); process.exit(2); }

const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const admin = createClient(T.url, T.serviceKey, opts);
const FN = `${T.url}/functions/v1/delete-account`;
const RUN = Date.now().toString(36);
const created = [];
const checks = [];
const check = (n, ok, d = "") => checks.push({ n, ok: !!ok, d: redact(String(d), T) });
const hash = (id) => createHash("sha256").update(id, "utf8").digest("hex");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const config = async () => Object.fromEntries(((await admin.from("app_config").select("key,value")).data ?? []).map((r) => [r.key, r.value]));
const setGate = async (value) => {
  const { error } = await admin.from("app_config").update({ value, updated_at: new Date().toISOString() }).eq("key", "account_deletion_enabled");
  if (error) throw new Error("setGate: " + error.message);
};
const user = async (tag) => {
  const email = `atlas-staging-gate-${tag}-${RUN}@example.com`;
  const password = randomBytes(15).toString("base64url");
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw new Error("createUser: " + error.message);
  created.push(data.user.id);
  const c = createClient(T.url, T.anonKey, opts);
  const { data: s, error: se } = await c.auth.signInWithPassword({ email, password });
  if (se) throw new Error("signIn: " + se.message);
  await c.from("profiles").insert({ display_name: "Synthetic " + tag });
  return { id: data.user.id, c, token: s.session.access_token };
};
const exists = async (id) => !!(await admin.auth.admin.getUserById(id)).data?.user;
const requests = async (id) => (await admin.from("deletion_requests").select("*", { count: "exact", head: true }).eq("user_id", id)).count;
const logged = async (id) => (await admin.from("deletion_log").select("*", { count: "exact", head: true }).eq("user_hash", hash(id))).count;
const callFn = async (token) => {
  const res = await fetch(FN, { method: "POST", headers: { authorization: `Bearer ${token}`, apikey: T.anonKey } });
  return { status: res.status, body: await res.json().catch(() => null) };
};
const sweepScript = () => {
  const r = spawnSync(process.execPath, [path.join(ROOT, "scripts", "deletion-sweep.mjs")], { env: { ...process.env, ATLAS_SWEEP_URL: FN, ATLAS_DELETION_SWEEP_SECRET: T.sweepSecret }, encoding: "utf8" });
  return { code: r.status, out: (r.stdout + r.stderr).trim() };
};
// Owner-level SQL on the LINKED staging project (checked above), used only to
// backdate a synthetic request. The SQL goes through a temp file so no
// argument needs shell quoting (Windows runs npx through a shell).
const sql = (q) => {
  const file = path.join(os.tmpdir(), `atlas-gate-${RUN}-${randomBytes(4).toString("hex")}.sql`);
  fs.writeFileSync(file, q);
  try {
    const r = spawnSync(process.platform === "win32" ? "npx.cmd" : "npx", ["--yes", "supabase@2.122.1", "db", "query", "--linked", "--file", file], { cwd: ROOT, encoding: "utf8", shell: process.platform === "win32" });
    if (r.status !== 0) throw new Error("db query failed: " + redact((r.stderr || r.stdout).slice(-300), T));
  } finally {
    fs.rmSync(file, { force: true });
  }
};

let failed = false;
try {
  const start = await config();
  check("start: gate is off", start.account_deletion_enabled === "false", JSON.stringify(start));
  check("start: sync switches off", start.adult_sync_permitted === "false" && start.minor_sync_permitted === "false");
  if (start.account_deletion_enabled !== "false") throw new Error("The staging gate must be 'false' at the start; not changing anything.");

  // ── A. Gate off ──────────────────────────────────────────────
  const U = await user("u");
  const { data: g0 } = await U.c.rpc("account_deletion_enabled");
  check("A: account_deletion_enabled() is false for a student", g0 === false);
  const r0 = await U.c.rpc("request_account_deletion");
  check("A: direct request_account_deletion() rejected", /deletion-disabled/.test(r0.error?.message ?? ""), r0.error?.message ?? "accepted!");
  check("A: no deletion request recorded", (await requests(U.id)) === 0);
  const f0 = await callFn(U.token);
  check("A: function with a valid user token rejected (403 deletion-disabled)", f0.status === 403 && f0.body?.error === "deletion-disabled", `${f0.status} ${JSON.stringify(f0.body)}`);
  const s0 = await fetch(`${FN}?sweep=1`, { method: "POST", headers: { "x-atlas-sweep-secret": T.sweepSecret } });
  const s0b = await s0.json().catch(() => null);
  check("A: sweep with the valid secret rejected (403, 0 outstanding)", s0.status === 403 && s0b?.error === "deletion-disabled" && s0b?.pendingRequests === 0, `${s0.status} ${JSON.stringify(s0b)}`);
  check("A: account still exists, nothing purged", (await exists(U.id)) && (await admin.from("profiles").select("*", { count: "exact", head: true }).eq("user_id", U.id)).count === 1);
  const a0 = sweepScript();
  check("A: sweep alert quiet (exit 0, gate off, nothing owed)", a0.code === 0 && /gate is off/i.test(a0.out), a0.out);
  const n0 = await fetch(FN, { method: "POST" });
  check("A: no token is still 401", n0.status === 401, String(n0.status));

  // ── B. Gate open (this run only) ─────────────────────────────
  await setGate("true");
  const { data: g1 } = await U.c.rpc("account_deletion_enabled");
  check("B: gate reads open", g1 === true);
  const r1 = await U.c.rpc("request_account_deletion");
  check("B: request accepted", !r1.error, r1.error?.message ?? "");
  const f1 = await callFn(U.token);
  check("B: function deletes the account (200 deleted)", f1.status === 200 && f1.body?.status === "deleted", `${f1.status} ${JSON.stringify(f1.body)}`);
  check("B: auth user gone", !(await exists(U.id)));
  check("B: deletion-log row (PII-free hash)", (await logged(U.id)) === 1);

  const V = await user("v");
  check("B: planted request accepted", !(await V.c.rpc("request_account_deletion")).error);
  sql(`update public.deletion_requests set requested_at = now() - interval '2 days' where user_id = '${V.id}'`);
  const b1 = sweepScript();
  check("B: real sweep script completes the planted request (exit 0, completed 1, stale 0)", b1.code === 0 && /completed 1, pending 0, stale 0/.test(b1.out), b1.out);
  check("B: swept account gone, with a deletion-log row", !(await exists(V.id)) && (await logged(V.id)) === 1);

  const W = await user("w");
  const f2 = await callFn(W.token);
  check("B: function without a recorded request refused (409)", f2.status === 409 && f2.body?.error === "request-deletion-first", `${f2.status} ${JSON.stringify(f2.body)}`);
  check("B: that account still exists", await exists(W.id));
  check("B: W's request accepted while open", !(await W.c.rpc("request_account_deletion")).error);

  // ── C. Gate closed again, with W's request outstanding ───────
  await setGate("false");
  const c1 = sweepScript();
  check("C: sweep alert fires: gate off with 1 outstanding (exit 1)", c1.code === 1 && /1 deletion request\(s\) are outstanding/.test(c1.out), c1.out);
  const f3 = await callFn(W.token);
  check("C: function rejected while closed, account kept", f3.status === 403 && (await exists(W.id)), `${f3.status}`);
  const { error: pe } = await admin.rpc("purge_user_data", { target: W.id });
  const { error: de } = await admin.auth.admin.deleteUser(W.id);
  check("C: operator procedure: purge then delete the auth user", !pe && !de, (pe ?? de)?.message ?? "");
  check("C: operator procedure verified: account, rows and request gone; log confirmed", !(await exists(W.id)) && (await requests(W.id)) === 0 && (await admin.from("profiles").select("*", { count: "exact", head: true }).eq("user_id", W.id)).count === 0 && (await logged(W.id)) === 1);
  const X = await user("x");
  const r2 = await X.c.rpc("request_account_deletion");
  check("C: a new direct request is rejected again", /deletion-disabled/.test(r2.error?.message ?? ""), r2.error?.message ?? "accepted!");
  const c2 = sweepScript();
  check("C: sweep alert quiet again once nothing is owed", c2.code === 0, c2.out);
} catch (e) {
  failed = true;
  check("run completed without an exception", false, e.message);
} finally {
  for (const id of created) if (await exists(id)) { await admin.rpc("purge_user_data", { target: id }); await admin.auth.admin.deleteUser(id); }
  try { await setGate("false"); } catch (e) { check("gate restored to 'false'", false, e.message); }
  await sleep(300);
  const end = await config();
  check("end: gate is off", end.account_deletion_enabled === "false", JSON.stringify(end));
  check("end: sync switches off", end.adult_sync_permitted === "false" && end.minor_sync_permitted === "false");
  let left = 0;
  for (const id of created) if (await exists(id)) left++;
  check("end: every synthetic account removed", left === 0, `left=${left}`);
}
for (const c of checks) console.log(`${c.ok ? "ok  " : "FAIL"} ${c.n}${c.d && !c.ok ? " :: " + c.d : ""}`);
console.log(`deletion gate (staging): ${checks.filter((c) => c.ok).length}/${checks.length} passed`);
process.exit(failed || checks.some((c) => !c.ok) ? 1 : 0);
