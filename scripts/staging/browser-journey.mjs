// ─────────────────────────────────────────────────────────────────
// Real browser journey against the STAGING project (npm run test:staging:browser).
//
// Prerequisites:
//   - .env.staging.local is filled (npm run staging:check passes);
//   - .env.development.local holds the STAGING URL + PUBLISHABLE key;
//   - `npm run dev` is running on http://localhost:3000;
//   - the staging function allows that origin (ATLAS_ALLOWED_ORIGINS).
// It creates ONE synthetic account with the admin API (no email), drives the
// real UI in headless Chrome:
//   - wrong password → generic message; login; session restored on reload;
//   - account page; account export; sync shown as unavailable;
//   - logout keeps device progress; delete account from the UI → server
//     user gone, device progress kept; phone width.
// Then it removes the account (also on failure). Never prints credentials.
// ─────────────────────────────────────────────────────────────────
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { stagingTarget } from "../../supabase/staging/guard.mjs";
const ROOT = process.cwd();
const env = {};
for (const line of fs.readFileSync(path.join(ROOT, ".env.staging.local"), "utf8").split(/\r?\n/)) {
  const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
  if (!m || line.trim().startsWith("#")) continue;
  let v = m[2]; if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  env[m[1]] = v;
}
const T = stagingTarget(env);
const admin = createClient(T.url, T.serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const BASE = "http://localhost:3000";
try {
  await fetch(BASE + "/");
} catch {
  console.log("Start the dev server first: npm run dev (with STAGING values in .env.development.local)");
  process.exit(2);
}
const RUN = Date.now().toString(36);
const email = `atlas-staging-ui-${RUN}@example.com`;
const password = randomBytes(15).toString("base64url");
const { data: created, error: ce } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
if (ce) throw new Error("createUser: " + ce.message);
const uid = created.user.id;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(process.env.CHROME_PATH ?? ({ win32: "C:/Program Files/Google/Chrome/Application/chrome.exe", darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" }[process.platform] ?? "google-chrome"), ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), "atlas-bj-"))}`, "--remote-debugging-port=9344", "about:blank"], { stdio: "ignore" });
await sleep(1500);
const t = (await (await fetch("http://127.0.0.1:9344/json/list")).json()).find((x) => x.type === "page");
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const errs = []; const failedReqs = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d.result); pending.delete(d.id); }
  if (d.method === "Runtime.exceptionThrown") errs.push("EXC " + (d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text).slice(0, 200));
  if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") errs.push("ERR " + d.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 200));
  if (d.method === "Network.loadingFailed" && !/net::ERR_ABORTED/.test(d.params.errorText)) failedReqs.push(d.params.errorText + " " + (d.params.corsErrorStatus ? JSON.stringify(d.params.corsErrorStatus) : "")); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => { const r = await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true }); return r.result?.value; };
await send("Runtime.enable"); await send("Page.enable"); await send("Network.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
const go = async (p, wait = 6000) => { await send("Page.navigate", { url: BASE + p }); await sleep(wait); };
const waitFor = async (expr, ms = 15000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(expr)) return true; await sleep(300); } return false; };
const text = () => ev("document.body.innerText");
const click = (label) => ev(`(() => { const b = [...document.querySelectorAll("button, a")].find((x) => x.textContent.trim() === ${JSON.stringify(label)} && x.checkVisibility()); if (!b) return false; b.click(); return true; })()`);
const fill = (sel, v) => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return false; Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, ${JSON.stringify(v)}); el.dispatchEvent(new Event("input", { bubbles: true })); return true; })()`);
const submit = () => ev(`(() => { const f = document.querySelector("[role=dialog] form"); if (!f) return false; f.requestSubmit(); return true; })()`);
const checks = []; const check = (n, ok, d = "") => checks.push({ n, ok: !!ok, d });

try {
  // Device progress before any account exists (local-first).
  await go("/dashboard/", 12000);
  await ev(`localStorage.setItem("atlas:bookmarks", JSON.stringify([{ id: "11:kinematics:chapter", cls: "11", slug: "kinematics", type: "chapter", chapterName: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarkedAt: ${Date.now()} }]))`);
  const seeded = await ev(`localStorage.getItem("atlas:bookmarks")`);

  // 1. Wrong password: generic message.
  await go("/", 9000);
  check("login button visible", await waitFor(`[...document.querySelectorAll("button")].some((b) => b.textContent.trim() === "Login / Sign Up" && b.checkVisibility())`));
  await click("Login / Sign Up"); await sleep(800);
  await fill("#auth-email", email); await fill("#auth-password", "definitely-wrong-123"); await submit();
  const wrongOk = await waitFor(`/couldn't sign you in with those details/i.test(document.querySelector("[role=dialog] [role=alert]")?.textContent || "")`);
  check("wrong password shows the generic message", wrongOk, (await ev(`document.querySelector("[role=dialog] [role=alert]")?.textContent`)) || "");

  // 2. Correct password: signed in.
  await fill("#auth-password", password); await submit();
  check("login succeeds and the dialog closes", await waitFor(`!document.querySelector("[role=dialog]") && [...document.querySelectorAll("a")].some((a) => a.textContent.trim() === "Account")`));

  // 3. Session restored after reload.
  await go("/", 8000);
  check("session restored after reload", await waitFor(`[...document.querySelectorAll("a")].some((a) => a.textContent.trim() === "Account")`));

  // 4. Account page: cloud database detected; export downloads own data.
  await go("/account/", 10000);
  check("account page shows the account email", (await text()).includes(email));
  check("account database detected (export available)", await waitFor(`[...document.querySelectorAll("button")].some((b) => b.textContent.trim() === "Download my account data")`));
  await ev(`(() => { window.__dl = []; const o = URL.createObjectURL; URL.createObjectURL = (b) => { b.text().then((t) => window.__dl.push(t)); return o.call(URL, b); }; })()`);
  await click("Download my account data");
  const gotExport = await waitFor(`window.__dl.length > 0`);
  const exp = gotExport ? JSON.parse(await ev(`window.__dl[0]`)) : null;
  check("account export downloaded with the documented shape", exp && exp.account === email && ["profile", "consents", "bookmarks", "mistakes", "goals", "streak"].every((k) => k in exp), exp ? Object.keys(exp).join(",") : "none");
  const syncNote = await text();
  check("cloud copy shown as unavailable (sync off)", /not available|aren.t available|isn.t available|legal|coming/i.test(syncNote));

  // 5. Logout keeps device progress.
  await click("Log out");
  check("logout returns to signed-out state", await waitFor(`[...document.querySelectorAll("button")].some((b) => /Login \\/ Sign Up|Log in or create an account/.test(b.textContent.trim()))`));
  check("device progress kept after logout", (await ev(`localStorage.getItem("atlas:bookmarks")`)) === seeded);

  // 6. Log in again and delete the account from the UI.
  await go("/", 8000);
  await click("Login / Sign Up"); await sleep(800);
  await fill("#auth-email", email); await fill("#auth-password", password); await submit();
  await waitFor(`!document.querySelector("[role=dialog]")`);
  await go("/account/", 10000);
  await waitFor(`!!document.getElementById("delete-confirm")`);
  await fill("#delete-confirm", "DELETE"); await sleep(400);
  const enabled = await ev(`(() => { const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Delete my account"); return b && !b.disabled; })()`);
  check("delete button enabled after typing DELETE", enabled);
  await click("Delete my account");
  const deletedMsg = await waitFor(`/have been deleted/i.test(document.body.innerText)`, 30000);
  check("UI confirms the account was deleted", deletedMsg, deletedMsg ? "" : (await text()).slice(0, 300));
  const { data: after } = await admin.auth.admin.getUserById(uid);
  check("auth user removed on the server", !after?.user);
  check("device progress still in this browser after account deletion", (await ev(`localStorage.getItem("atlas:bookmarks")`)) === seeded);

  // 7. Mobile: account page has no horizontal overflow.
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await go("/account/", 8000);
  check("account page fits a 390 px phone", (await ev("document.documentElement.scrollWidth - document.documentElement.clientWidth")) <= 1);
} finally {
  const { data: still } = await admin.auth.admin.getUserById(uid);
  if (still?.user) { await admin.rpc("purge_user_data", { target: uid }); await admin.auth.admin.deleteUser(uid); console.log("cleanup: synthetic user removed"); }
  ws.close(); chrome.kill();
}
for (const c of checks) console.log(`${c.ok ? "ok  " : "FAIL"} ${c.n}${c.ok || !c.d ? "" : " :: " + c.d}`);
console.log(`browser journey: ${checks.filter((c) => c.ok).length}/${checks.length} passed; console errors/exceptions: ${errs.length}; failed requests: ${failedReqs.length}`);
for (const e of [...errs, ...failedReqs].slice(0, 10)) console.log("  " + e.replace(/sb_(secret|publishable)_[A-Za-z0-9_-]+/g, "[redacted]"));
process.exit(checks.every((c) => c.ok) && errs.length === 0 && failedReqs.length === 0 ? 0 : 1);
