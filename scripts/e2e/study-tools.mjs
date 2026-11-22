// ─────────────────────────────────────────────────────────────────
// End-to-end test of the study tools (no extra dependencies): serves the
// static export, drives headless Chrome over the DevTools protocol, and
// uses the real UI: bookmarks (search, remove), mistakes (category,
// explanation, resolve, reopen, repeated-question flag), revision rounds,
// activity and streak; reloads to confirm persistence in the existing
// storage formats; checks for horizontal overflow at phone, tablet,
// laptop and desktop widths; checks hydration with the clock moved past the
// build day (M1); fails on any exception or console error.
//
//   npm run build && npm run test:e2e
//   CHROME_PATH=/path/to/chrome npm run test:e2e   (override the browser)
// Synthetic data only, in a throwaway browser profile.
// ─────────────────────────────────────────────────────────────────
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { A11Y_AUDIT } from "./a11y-audit.mjs";

const OUT = path.resolve(process.argv[2] ?? "out");
const PROFILE = process.argv[3] ?? fs.mkdtempSync(path.join(os.tmpdir(), "atlas-e2e-"));
if (!fs.existsSync(path.join(OUT, "index.html"))) { console.error("No build in " + OUT + "; run npm run build first."); process.exit(2); }
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml" };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(OUT, p);
  if (p.endsWith("/")) f = path.join(f, "index.html");
  else if (!path.extname(p) && fs.existsSync(path.join(f, "index.html"))) { res.writeHead(301, { location: p + "/" }); res.end(); return; }
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(8767);
const BASE = "http://localhost:8767";
const CHROME = process.env.CHROME_PATH ?? ({ win32: "C:/Program Files/Google/Chrome/Application/chrome.exe", darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" }[process.platform] ?? "google-chrome");
fs.mkdirSync(PROFILE, { recursive: true });
// CI runners (recent Ubuntu) restrict the unprivileged user namespaces Chrome's
// sandbox needs, so Chrome exits at start. These scripts load only the local
// static build, so the sandbox is turned off in CI only.
const CI_FLAGS = process.env.CI ? ["--no-sandbox", "--disable-dev-shm-usage"] : [];
let chromeErr = "";
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-first-run", ...CI_FLAGS, `--user-data-dir=${PROFILE}`, "--remote-debugging-port=9336", "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
chrome.stderr.on("data", (d) => (chromeErr += d));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 120; i++) { try { await (await fetch("http://127.0.0.1:9336/json/version")).json(); break; } catch { if (i === 119) { console.error("Chrome did not start: " + chromeErr.slice(-800)); process.exit(1); } await sleep(250); } }
const t = (await (await fetch("http://127.0.0.1:9336/json/list")).json()).find((x) => x.type === "page");
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0; const pending = new Map(); const events = [];
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } else if (m.method) events.push(m); });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value;
await send("Runtime.enable"); await send("Page.enable");
const go = async (p) => { await send("Page.navigate", { url: BASE + p }); await sleep(2500); };
const ls = (k) => ev(`localStorage.getItem(${JSON.stringify(k)})`).then((v) => JSON.parse(v ?? "null"));
const clickText = (selector, text) => ev(`(() => { const el = [...document.querySelectorAll(${JSON.stringify(selector)})].find(e => e.textContent.trim().startsWith(${JSON.stringify(text)})); if (!el) return false; el.click(); return true; })()`);
const setSelect = (sel, value) => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return false; Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(el, ${JSON.stringify(value)}); el.dispatchEvent(new Event('change', { bubbles: true })); return true; })()`);
const setText = (sel, value) => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return false; Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(el, ${JSON.stringify(value)}); el.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`);
const checks = [];
const check = (name, ok, detail = "") => checks.push({ name, ok: !!ok, detail });

const now = Date.now();
const M1 = "3f1c2b9a-1d2e-4f3a-8b4c-5d6e7f8a9b0c";
await go("/about/");
await ev(`(() => {
  localStorage.setItem("atlas:bookmarks", JSON.stringify([
    { id: "11:kinematics:chapter", cls: "11", slug: "kinematics", type: "chapter", chapterName: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarkedAt: ${now - 86400000} },
    { id: "12:atoms:notes", cls: "12", slug: "atoms", type: "notes", chapterName: "Atoms", label: "Notes", path: "/class-12/atoms/notes", bookmarkedAt: ${now} }]));
  localStorage.setItem("atlas:mistakes", JSON.stringify([
    { id: "${M1}", cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "16", conceptTag: "E2EConcept", difficulty: "medium", note: "", createdAt: ${now - 3600000}, resolvedAt: null },
    { id: "m-2", cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "16", conceptTag: "E2EConcept again", difficulty: "hard", note: "", createdAt: ${now}, resolvedAt: null }]));
  localStorage.setItem("atlas:revision", JSON.stringify({ "11:kinematics": [{ round: 1, completedAt: ${now - 3 * 86400000} }] }));
  localStorage.setItem("atlas:study-streak", JSON.stringify({ current: 2, longest: 5, lastActiveDate: null }));
})()`);

// Bookmarks
await go("/dashboard/bookmarks/");
check("bookmarks listed", (await ev("document.body.innerText")).includes("2 of 2 bookmarks"));
check("rebuilt resource not linked", (await ev(`[...document.querySelectorAll('main a')].some(a => a.getAttribute('href') === '/class-12/atoms/notes')`)) === false);
await ev(`(() => { const i = document.querySelector('input[type=search]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(i, 'atom'); i.dispatchEvent(new Event('input', { bubbles: true })); })()`);
await sleep(300);
check("search filters", (await ev("document.body.innerText")).includes("1 of 2 bookmarks"));
await ev(`[...document.querySelectorAll("main li button")].find(b => b.textContent.trim() === "Remove").click()`);
await sleep(300);
check("remove persists", (await ls("atlas:bookmarks")).length === 1);
await go("/dashboard/bookmarks/");
check("after reload: 1 bookmark", (await ev("document.body.innerText")).includes("1 of 1 bookmarks"));

// Mistakes
await go("/dashboard/mistakes/");
check("repeated question flagged", (await ev("document.body.innerText")).includes("got wrong 2 times"));
check("question shown 1-based", (await ev("document.body.innerText")).includes("question 17"));
await setSelect(`select[id="cat-${M1}"]`, "formula");
await sleep(300);
check("category saved", (await ls("atlas:mistakes")).find((m) => m.id === M1)?.category === "formula");
await ev(`document.getElementById("cat-${M1}").closest("li").querySelector("button[aria-expanded]").click()`);
await sleep(300);
const hasTa = await ev(`!!document.getElementById("note-${M1}")`);
await setText(`textarea[id="note-${M1}"]`, "Mixed up n and l");
await sleep(200);
const taVal = await ev(`document.getElementById("note-${M1}")?.value`);
const saveBtn = await ev(`[...document.getElementById("note-${M1}").closest("li").querySelectorAll("button")].map(b => b.textContent.trim()).join("|")`);
await ev(`[...document.getElementById("note-${M1}").closest("li").querySelectorAll("button")].find(b => b.textContent.trim() === "Save").click()`);
await sleep(300);
check("explanation saved", (await ls("atlas:mistakes")).find((m) => m.id === M1)?.note === "Mixed up n and l", `textarea=${hasTa} value=${taVal} buttons=${saveBtn}`);
await clickText("main button", "Mark resolved");
await sleep(300);
const resolvedOne = (await ls("atlas:mistakes")).filter((m) => m.resolvedAt !== null).length;
check("resolve saved", resolvedOne === 1);
await setSelect('main label select', "resolved");
await sleep(300);
await clickText("main button", "Reopen");
await sleep(300);
check("reopen saved", (await ls("atlas:mistakes")).every((m) => m.resolvedAt === null));
await go("/dashboard/mistakes/");
check("after reload: note shown", (await ev("document.body.innerText")).includes("Mixed up n and l"));
check("format preserved (no unexpected fields)", (await ls("atlas:mistakes")).every((m) => Object.keys(m).every((k) => ["id","cls","slug","chapterName","resourceType","questionId","conceptTag","difficulty","note","createdAt","resolvedAt","category"].includes(k))));

// Revision
await go("/dashboard/revision/");
check("overdue chapter listed", (await ev("document.body.innerText")).includes("Kinematics"));
await clickText("main button", "Round 2");
await sleep(300);
check("round 2 saved", ((await ls("atlas:revision"))["11:kinematics"] ?? []).some((e) => e.round === 2));

// Activity
await go("/dashboard/activity/");
const actText = await ev("document.body.innerText");
check("streak shown from store", /Longest streak[^0-9]*5 days/i.test(actText), actText.slice(actText.indexOf("Current streak"), actText.indexOf("Current streak") + 120).replace(/s+/g, " ") + " | stored " + JSON.stringify(await ls("atlas:study-streak")));
check("calendar has 28 days", (await ev("document.querySelectorAll('ol[aria-label^=\"Activity per day\"] li').length")) === 28);

// Accessibility basics on the study pages and the main public pages (scripts/e2e/a11y-audit.mjs).
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
for (const p of ["/dashboard/", "/dashboard/progress/", "/dashboard/bookmarks/", "/dashboard/mistakes/", "/dashboard/revision/", "/dashboard/activity/", "/", "/class-11/", "/class-12/", "/class-11/kinematics/", "/notes/", "/dpp/", "/formula-sheet/", "/pyq/", "/about/", "/contact/", "/jee/", "/neet/"]) {
  await go(p);
  const problems = (await ev(A11Y_AUDIT)) ?? [{ rule: "audit", detail: "did not run" }];
  check(`accessibility basics ${p}`, problems.length === 0, problems.slice(0, 12).map((x) => x.rule + ": " + x.detail).join(" | ") + (problems.length > 12 ? ` (+${problems.length - 12} more)` : ""));
}

// Responsive: no horizontal scroll at phone / tablet / desktop widths.
for (const [w, h] of [[360, 740], [768, 1024], [1024, 768], [1280, 800], [1366, 768], [1536, 864]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
  for (const p of ["/dashboard/", "/dashboard/progress/", "/dashboard/bookmarks/", "/dashboard/mistakes/", "/dashboard/revision/", "/dashboard/activity/"]) {
    await go(p);
    const over = await ev("document.documentElement.scrollWidth - document.documentElement.clientWidth");
    const widest = over > 1 ? await ev(`(() => { let w = null, max = 0; for (const el of document.querySelectorAll("body *")) { const r = el.getBoundingClientRect(); if (r.right > max) { max = r.right; w = el.tagName + "." + String(el.className).slice(0, 60); } } return w + " right=" + Math.round(max); })()`) : "";
    check(`no horizontal overflow ${w}px ${p}`, over <= 1, `overflow ${over}px ${widest}`);
  }
}
// Hydration across a date change (M1): pages are prerendered on the build
// day, but students open them later. Move the browser's clock 3 days ahead
// and reload the date-dependent pages; React error #418 would be thrown here.
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
const shiftScript = await send("Page.addScriptToEvaluateOnNewDocument", { source: `(() => { const R = Date, shift = 3 * 86400000; class D extends R { constructor(...a) { super(...(a.length ? a : [R.now() + shift])); } static now() { return R.now() + shift; } } window.Date = D; })()` });
for (const p of ["/dashboard/activity/", "/dashboard/revision/", "/dashboard/"]) {
  const before = events.filter((e) => e.method === "Runtime.exceptionThrown").length;
  await go(p);
  const shifted = await ev("Date.now() - performance.timeOrigin > 2 * 86400000");
  const thrown = events.filter((e) => e.method === "Runtime.exceptionThrown").slice(before).map((e) => e.params.exceptionDetails.exception?.description?.slice(0, 80));
  check(`hydrates without errors 3 days after the build: ${p}`, shifted && thrown.length === 0, `clock shifted=${shifted}; ${thrown.join(" | ")}`);
}
await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: shiftScript.identifier });

const exceptions = events.filter((e) => e.method === "Runtime.exceptionThrown").map((e) => e.params.exceptionDetails.exception?.description?.slice(0, 160));
const errors = events.filter((e) => e.method === "Runtime.consoleAPICalled" && e.params.type === "error").map((e) => e.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 160));
ws.close(); chrome.kill(); server.close();
const failed = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? "ok  " : "FAIL"} ${c.name}${c.ok ? "" : " " + c.detail}`);
console.log(`e2e: ${checks.length - failed.length}/${checks.length} passed, ${exceptions.length} exceptions, ${errors.length} console errors`);
for (const e of [...exceptions, ...errors]) console.log("  " + e);
process.exit(failed.length || exceptions.length || errors.length ? 1 : 0);
