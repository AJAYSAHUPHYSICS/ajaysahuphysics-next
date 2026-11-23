// ─────────────────────────────────────────────────────────────────
// Keyboard end-to-end checks (headless browser through scripts/e2e/driver.mjs,
// like study-tools.mjs). Run by npm run test:e2e (Chrome) and
// npm run test:e2e:firefox / test:e2e:webkit.
//   - the first Tab stop is the skip link, and it leads into <main>
//   - every Tab stop on key pages has a visible focus indicator
//   - while the accounts UI is off (H1): no login or sign-up control is
//     visible or reachable (desktop and mobile menu); when it is on:
//   - the login dialog opens from the keyboard, traps focus, closes on
//     Escape and returns focus to its trigger
//   - the mobile menu is reachable, reports aria-expanded, closes on Escape
// Usage: node scripts/e2e/keyboard.mjs [outDir]   (E2E_BROWSER, CHROME_PATH)
// ─────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { BROWSER, openBrowser, createServer, SCHEME, segmentFile } from "./driver.mjs";

const OUT = path.resolve(process.argv[2] ?? "out");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  let f = segmentFile(path.join(OUT, decodeURIComponent(new URL(req.url, "http://x").pathname)));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(8769);
const BASE = `${SCHEME}://localhost:8769`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
try { browser = await openBrowser({ debugPort: 9338 }); }
catch (e) { console.error(e.message); server.close(); process.exit(1); }
const { ev } = browser;
const key = (name, shift = false) => browser.key(name, { shift });
const tab = (shift) => key("Tab", shift);
const go = async (p, w = 1280, h = 800) => { await browser.viewport(w, h); await browser.go(BASE + p); };
const FOCUS = `(() => { const el = document.activeElement; if (!el || el === document.body) return null; const s = getComputedStyle(el); const ring = (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== "none"); const r = el.getBoundingClientRect(); return { tag: el.tagName.toLowerCase(), text: (el.getAttribute("aria-label") || el.textContent || el.value || "").trim().replace(/[ \\n]+/g, " ").slice(0, 40), ring, inDialog: !!el.closest("[role=dialog]"), onScreen: r.width > 0 && r.height > 0 }; })()`;
const out = []; const fail = (m) => out.push("FAIL " + m); const ok = (m) => out.push("ok   " + m); const skip = (m) => out.push("skip " + m);
// The account page and the login dialog's focus trap come with the accounts
// platform (PR #7). Without it in the build, those checks are reported as skipped.
const ACCOUNTS = fs.existsSync(path.join(OUT, "account", "index.html"));
// WebKit, like Safari by default, doesn't make links Tab stops (Safari users
// press Option+Tab, or turn on "Press Tab to highlight each item"), and
// Playwright can't change that. Checks that need Tab to reach a link are
// reported as skipped there, never as passed; all the others still run.
const TAB_SKIPS_LINKS = BROWSER === "webkit";
const LINK_SKIP = " (WebKit: Tab skips links, as in Safari by default)";

for (const [p, w] of [["/", 1280], ["/dashboard/", 1280], ["/dashboard/mistakes/", 1280], ["/class-11/", 1280], ["/", 360]]) {
  await go(p, w);
  const seen = []; let noRing = [];
  for (let i = 0; i < 40; i++) { await tab(); const f = await ev(FOCUS); if (!f) continue; seen.push(f); if (!f.ring || !f.onScreen) noRing.push(`${f.tag} "${f.text}"${f.onScreen ? "" : " (off-screen)"}`); }
  const first = seen[0];
  if (TAB_SKIPS_LINKS) skip(`${p} @${w}: first Tab stop is the skip link${LINK_SKIP}`);
  else (first && /skip to main/i.test(first.text) ? ok : fail)(`${p} @${w}: first Tab stop is the skip link (got ${first?.tag} "${first?.text}")`);
  noRing = [...new Set(noRing)];
  (noRing.length === 0 ? ok : fail)(`${p} @${w}: visible focus on all ${seen.length} tab stops${noRing.length ? " — missing: " + noRing.slice(0, 8).join(", ") : ""}`);
}

// Skip link moves focus to main
if (TAB_SKIPS_LINKS) skip("after the skip link, the next Tab lands inside <main>" + LINK_SKIP);
else {
  await go("/");
  await tab(); await key("Enter"); await sleep(300); await tab();
  const afterSkip = await ev(`(() => { const m = document.querySelector("main"); return location.hash + " " + (m && m.contains(document.activeElement)); })()`);
  (/ true$/.test(afterSkip) ? ok : fail)(`after the skip link, the next Tab lands inside <main> (${afterSkip})`);
}

// Login and sign-up entry points (owner decision H1). While the accounts UI
// switch (src/lib/auth/accounts-ui.ts) is off, no login or sign-up control may
// be visible or keyboard-reachable anywhere, desktop or mobile menu. The
// dialog checks below run only when the switch is on.
const ACCOUNTS_UI = /ACCOUNTS_UI_ENABLED = true/.test(fs.readFileSync(path.resolve("src", "lib", "auth", "accounts-ui.ts"), "utf8"));
const LOGIN_RE = /log ?in|sign ?up|create an account/i;
const VISIBLE_LOGIN = `[...document.querySelectorAll("a, button, [role=button]")].filter((e) => e.checkVisibility()).map((e) => (e.getAttribute("aria-label") || e.textContent || "").trim()).filter((t) => ${LOGIN_RE}.test(t))`;
if (!ACCOUNTS_UI) {
  for (const [p, w] of [["/", 1280], ["/dashboard/", 1280], ["/class-11/kinematics/", 1280], ["/", 360], ["/dashboard/", 360]]) {
    await go(p, w);
    if (w < 600) { await ev(`document.querySelector("button[aria-label$=menu]")?.click()`); await sleep(400); }
    const found = (await ev(VISIBLE_LOGIN)) ?? ["(check did not run)"];
    (found.length === 0 ? ok : fail)(`${p} @${w}${w < 600 ? " with the menu open" : ""}: no login or sign-up control (H1)${found.length ? " — found: " + found.join(", ") : ""}`);
  }
  await go("/");
  let reachable = null;
  for (let i = 0; i < 40 && !reachable; i++) { await tab(); const f = await ev(FOCUS); if (f && LOGIN_RE.test(f.text)) reachable = f.text; }
  (!reachable ? ok : fail)(`no login or sign-up control is reachable by keyboard (H1)${reachable ? " — reached: " + reachable : ""}`);
  for (const m of ["auth dialog opens from the keyboard", "focus moves into the dialog on open", "Tab and Shift+Tab stay inside the dialog", "Escape closes the dialog", "focus returns to the trigger"]) skip(m + " (login hidden until the release, H1)");
} else {
// Auth dialog via keyboard
await go("/");
let opened = false;
for (let i = 0; i < 40 && !opened; i++) { await tab(); const f = await ev(FOCUS); if (f && /Login \/ Sign Up/.test(f.text)) { await key("Enter"); await sleep(500); opened = await ev("!!document.querySelector('[role=dialog]')"); } }
(opened ? ok : fail)("auth dialog opens from the keyboard");
if (!ACCOUNTS) for (const m of ["focus moves into the dialog on open", "Tab and Shift+Tab stay inside the dialog", "Escape closes the dialog", "focus returns to the trigger", "/account/ tab stops"]) skip(m + " (needs the accounts platform, PR #7)");
if (opened && ACCOUNTS) {
  await go("/account/");
  { const seen = []; const noRing = []; for (let i = 0; i < 40; i++) { await tab(); const f = await ev(FOCUS); if (!f) continue; seen.push(f); if (!f.ring || !f.onScreen) noRing.push(f.tag + " " + f.text); }
    (seen[0] && /skip to main/i.test(seen[0].text) ? ok : fail)("/account/: first Tab stop is the skip link");
    (noRing.length === 0 ? ok : fail)(`/account/: visible focus on all ${seen.length} tab stops ${[...new Set(noRing)].slice(0, 8).join(", ")}`); }
  await go("/");
  for (let i = 0; i < 40; i++) { await tab(); const f = await ev(FOCUS); if (f && /Login [/] Sign Up/.test(f.text)) { await key("Enter"); await sleep(500); break; } }
  const f0 = await ev(FOCUS);
  (f0?.inDialog ? ok : fail)(`focus moves into the dialog on open (${f0?.tag} "${f0?.text}")`);
  let escaped = false;
  for (let i = 0; i < 25; i++) { await tab(); const f = await ev(FOCUS); if (!f?.inDialog) escaped = true; if (f && !f.ring) fail(`dialog control without visible focus: ${f.tag} "${f.text}"`); }
  for (let i = 0; i < 10; i++) { await tab(true); const f = await ev(FOCUS); if (!f?.inDialog) escaped = true; }
  (!escaped ? ok : fail)("Tab and Shift+Tab stay inside the dialog");
  await ev(`document.getElementById("auth-email")?.focus()`);
  await key("Enter"); await sleep(300);
  const invalid = await ev(`(() => { const e = document.getElementById("auth-email"); return e ? !e.checkValidity() : null; })()`);
  (invalid ? ok : fail)("empty form is not submitted (email required)");
  await key("Escape"); await sleep(400);
  const closed = await ev("!document.querySelector('[role=dialog]')");
  const back = await ev(FOCUS);
  (closed ? ok : fail)("Escape closes the dialog");
  (back && /Login \/ Sign Up/.test(back.text) ? ok : fail)(`focus returns to the trigger (${back?.tag} "${back?.text}")`);
}
}

// Mobile menu
await go("/", 360, 740);
let menuBtn = null;
for (let i = 0; i < 15 && !menuBtn; i++) { await tab(); const f = await ev(FOCUS); if (f && /menu/i.test(f.text)) menuBtn = f; }
(menuBtn ? ok : fail)(`mobile menu button reachable by keyboard (${menuBtn?.text})`);
if (menuBtn) {
  await key("Enter"); await sleep(400);
  const exp = await ev(`document.activeElement.getAttribute("aria-expanded")`);
  (exp === "true" ? ok : fail)(`menu button reports aria-expanded=true when open (${exp})`);
  await tab(); const f = await ev(FOCUS);
  if (TAB_SKIPS_LINKS) skip("next Tab reaches the first menu item (a link)" + LINK_SKIP);
  else (f && ["a","button"].includes(f.tag) ? ok : fail)(`next Tab reaches the first menu item (${f?.tag} "${f?.text}")`);
  await key("Escape"); await sleep(300);
  const expAfter = await ev(`document.querySelector("button[aria-label$=menu]")?.getAttribute("aria-expanded")`);
  (expAfter === "false" ? ok : fail)(`Escape closes the mobile menu (aria-expanded=${expAfter})`);
  const backTo = await ev(FOCUS);
  (backTo && /menu/i.test(backTo.text) ? ok : fail)(`focus returns to the menu button (${backTo?.tag} "${backTo?.text}")`);
}

await browser.close(); server.close();
for (const l of out) console.log(l);
const n = out.filter((l) => l.startsWith("FAIL")).length;
const k = out.filter((l) => l.startsWith("skip")).length;
console.log(`keyboard (${browser.name}): ${out.length - n - k}/${out.length - k} passed${k ? `, ${k} skipped` : ""}`);
process.exit(n ? 1 : 0);
