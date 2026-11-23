// ─────────────────────────────────────────────────────────────────
// End-to-end test of the study tools (no extra dependencies): serves the
// (checklists, streak extension, activity log and goals included)
// static export, drives a headless browser (scripts/e2e/driver.mjs), and
// uses the real UI: bookmarks (search, remove), mistakes (category,
// explanation, resolve, reopen, repeated-question flag), revision rounds,
// activity and streak; reloads to confirm persistence in the existing
// storage formats; checks for horizontal overflow at phone, tablet,
// laptop and desktop widths; checks hydration with the clock moved past the
// build day (M1); fails on any exception or console error.
//
//   npm run build && npm run test:e2e
//   CHROME_PATH=/path/to/chrome npm run test:e2e   (another Chromium build)
//   npm run test:e2e:firefox | npm run test:e2e:webkit   (Playwright)
// Synthetic data only, in a throwaway browser profile.
// ─────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { A11Y_AUDIT } from "./a11y-audit.mjs";
import { openBrowser, createServer, SCHEME, segmentFile } from "./driver.mjs";

const OUT = path.resolve(process.argv[2] ?? "out");
const PROFILE = process.argv[3] ?? fs.mkdtempSync(path.join(os.tmpdir(), "atlas-e2e-"));
if (!fs.existsSync(path.join(OUT, "index.html"))) { console.error("No build in " + OUT + "; run npm run build first."); process.exit(2); }
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml" };
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = segmentFile(path.join(OUT, p));
  if (p.endsWith("/")) f = path.join(f, "index.html");
  else if (!path.extname(p) && fs.existsSync(path.join(f, "index.html"))) { res.writeHead(301, { location: p + "/" }); res.end(); return; }
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(8767);
const BASE = `${SCHEME}://localhost:8767`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
try { browser = await openBrowser({ debugPort: 9336, profile: PROFILE }); }
catch (e) { console.error(e.message); server.close(); process.exit(1); }
const { ev } = browser;
const go = (p) => browser.go(BASE + p);
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

// Checklists, streaks and goals through the real UI (Phase 2 tools audit).
// The streak is set to "last active yesterday" so a real study action must
// extend it by exactly one day, and a second action the same day must not.
const localKey = (offsetDays) => ev(`(() => { const d = new Date(); d.setDate(d.getDate() + ${offsetDays}); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })()`);
const savedStreak = await ls("atlas:study-streak");
const yesterday = await localKey(-1), today = await localKey(0);
await ev(`localStorage.setItem("atlas:study-streak", JSON.stringify({ current: 4, longest: 5, lastActiveDate: "${yesterday}" }))`);
const logBefore = ((await ls("atlas:activity-log")) ?? []).length;
await go("/class-11/kinematics/");
const box = (item) => `document.getElementById("checklist-11-kinematics-${item}")`;
check("checklist renders on a chapter page", await ev(`!!${box("notes")} && ${box("notes")}.checked === false`));
await ev(`${box("notes")}.click()`); await sleep(300);
check("checklist tick saved", (await ls("atlas:checklist"))?.["11:kinematics"]?.notes === true);
const s1 = await ls("atlas:study-streak");
check("streak extends by one day from yesterday", s1?.current === 5 && s1?.longest === 5 && s1?.lastActiveDate === today, JSON.stringify(s1));
const second = await ev(`["formulaSheet", "dpp", "pyq"].find((k) => !!document.getElementById("checklist-11-kinematics-" + k)) ?? null`);
check("a second checklist item exists on the chapter page", !!second, String(second));
if (second) { await ev(`${box(second)}.click()`); await sleep(300); }
const s2 = await ls("atlas:study-streak");
check("a second action the same day doesn't add another day", s2?.current === 5 && s2?.lastActiveDate === today, JSON.stringify(s2));
const logAfter = (await ls("atlas:activity-log")) ?? [];
const added = logAfter.slice(0, logAfter.length - logBefore);
const count = (list, type) => list.filter((e) => e.slug === "kinematics" && e.type === type).length;
check("activity log: one chapter visit and one entry per checklist tick", added.length === 3 && count(added, "chapter-visited") === 1 && count(added, "resource-completed") === 2, `added=${JSON.stringify(added.map((e) => e.type))}`);
await go("/class-11/kinematics/");
check("after reload: checklist tick still shown", await ev(`${box("notes")}.checked === true`));
await ev(`${box("notes")}.click()`); await sleep(300);
check("untick saved", (await ls("atlas:checklist"))?.["11:kinematics"]?.notes === false);
await go("/class-11/kinematics/");
check("after reload: untick still shown", await ev(`${box("notes")}.checked === false`));
const logReloaded = ((await ls("atlas:activity-log")) ?? []).slice(0, ((await ls("atlas:activity-log")) ?? []).length - logBefore);
check("reloading the same chapter adds no duplicate visit entries", count(logReloaded, "chapter-visited") === 1, `visits=${count(logReloaded, "chapter-visited")}`);
check("unticking doesn't change the streak", (await ls("atlas:study-streak"))?.current === 5);

await go("/dashboard/progress/");
const goalButtons = () => ev(`[...document.querySelectorAll("main button")].map((b) => b.textContent.trim()).filter((t) => /^(Track this goal|Stop tracking)$/.test(t))`);
const g0 = await goalButtons();
check("goals card lists goals to track", g0?.length > 0 && g0.every((t) => t === "Track this goal"), JSON.stringify(g0));
await ev(`[...document.querySelectorAll("main button")].find((b) => b.textContent.trim() === "Track this goal").click()`); await sleep(300);
const goals1 = (await ls("atlas:goals")) ?? {};
check("tracking a goal saves it", Object.keys(goals1).length === 1 && Object.values(goals1).every((v) => typeof v === "number"), JSON.stringify(goals1));
await go("/dashboard/progress/");
check("after reload: the goal is still tracked", (await goalButtons())?.filter((t) => t === "Stop tracking").length === 1);
await ev(`[...document.querySelectorAll("main button")].find((b) => b.textContent.trim() === "Stop tracking").click()`); await sleep(300);
check("stopping a goal removes it", Object.keys((await ls("atlas:goals")) ?? {}).length === 0);
await go("/dashboard/progress/");
check("after reload: no goal tracked", (await goalButtons())?.every((t) => t === "Track this goal"));
await ev(`localStorage.setItem("atlas:study-streak", ${JSON.stringify(JSON.stringify(savedStreak))})`);

// Accessibility basics on the study pages and the main public pages (scripts/e2e/a11y-audit.mjs).
await browser.viewport(1280, 800);
for (const p of ["/dashboard/", "/dashboard/progress/", "/dashboard/bookmarks/", "/dashboard/mistakes/", "/dashboard/revision/", "/dashboard/activity/", "/", "/class-11/", "/class-12/", "/class-11/kinematics/", "/notes/", "/dpp/", "/formula-sheet/", "/pyq/", "/about/", "/contact/", "/jee/", "/neet/"]) {
  await go(p);
  const problems = (await ev(A11Y_AUDIT)) ?? [{ rule: "audit", detail: "did not run" }];
  check(`accessibility basics ${p}`, problems.length === 0, problems.slice(0, 12).map((x) => x.rule + ": " + x.detail).join(" | ") + (problems.length > 12 ? ` (+${problems.length - 12} more)` : ""));
}

// Responsive: no horizontal scroll at phone / tablet / desktop widths.
for (const [w, h] of [[360, 740], [768, 1024], [1024, 768], [1280, 800], [1366, 768], [1536, 864]]) {
  await browser.viewport(w, h);
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
await browser.viewport(1280, 800);
const SHIFT_CLOCK = `(() => { const R = Date, shift = 3 * 86400000; class D extends R { constructor(...a) { super(...(a.length ? a : [R.now() + shift])); } static now() { return R.now() + shift; } } window.Date = D; })()`;
await browser.withInitScript(SHIFT_CLOCK, async () => {
  for (const p of ["/dashboard/activity/", "/dashboard/revision/", "/dashboard/"]) {
    const before = browser.exceptions.length;
    await go(p);
    const shifted = await ev("Date.now() - performance.timeOrigin > 2 * 86400000");
    const thrown = browser.exceptions.slice(before).map((e) => e.slice(0, 80));
    check(`hydrates without errors 3 days after the build: ${p}`, shifted && thrown.length === 0, `clock shifted=${shifted}; ${thrown.join(" | ")}`);
  }
});

const { exceptions, consoleErrors: errors } = browser;
await browser.close(); server.close();
const failed = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? "ok  " : "FAIL"} ${c.name}${c.ok ? "" : " " + c.detail}`);
console.log(`e2e (${browser.name}): ${checks.length - failed.length}/${checks.length} passed, ${exceptions.length} exceptions, ${errors.length} console errors` +
  (browser.abortedByNavigation.length ? `; ${browser.abortedByNavigation.length} prefetches aborted by the suite's own page loads (WebKit reports them; not failures)` : ""));
for (const e of [...exceptions, ...errors]) console.log("  " + e);
process.exit(failed.length || exceptions.length || errors.length ? 1 : 0);
