// ─────────────────────────────────────────────────────────────────
// Keyboard end-to-end checks (dependency-free; headless Chrome over the
// DevTools protocol, like study-tools.mjs). Run by npm run test:e2e.
//   - the first Tab stop is the skip link, and it leads into <main>
//   - every Tab stop on key pages has a visible focus indicator
//   - the login dialog opens from the keyboard, traps focus, closes on
//     Escape and returns focus to its trigger
//   - the mobile menu is reachable, reports aria-expanded, closes on Escape
// Usage: node scripts/e2e/keyboard.mjs [outDir]   (CHROME_PATH to override)
// ─────────────────────────────────────────────────────────────────
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const OUT = path.resolve(process.argv[2] ?? "out");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let f = path.join(OUT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(8769);
const BASE = "http://localhost:8769";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(process.env.CHROME_PATH ?? ({ win32: "C:/Program Files/Google/Chrome/Application/chrome.exe", darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" }[process.platform] ?? "google-chrome"), ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), "atlas-kb-"))}`, "--remote-debugging-port=9338", "about:blank"], { stdio: "ignore" });
await sleep(1500);
const t = (await (await fetch("http://127.0.0.1:9338/json/list")).json()).find((x) => x.type === "page");
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d.result); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result?.value;
const key = async (k, code, keyCode, shift = false) => { const text = k === "Enter" ? String.fromCharCode(13) : undefined; for (const type of ["keyDown", "keyUp"]) await send("Input.dispatchKeyEvent", { type: type === "keyDown" && text ? "keyDown" : type, key: k, code, windowsVirtualKeyCode: keyCode, modifiers: shift ? 8 : 0, ...(type === "keyDown" && text ? { text } : {}) }); await sleep(60); };
const tab = (shift) => key("Tab", "Tab", 9, shift);
const go = async (p, w = 1280, h = 800) => { await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 }); await send("Page.navigate", { url: BASE + p }); await sleep(2500); };
const FOCUS = `(() => { const el = document.activeElement; if (!el || el === document.body) return null; const s = getComputedStyle(el); const ring = (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== "none"); const r = el.getBoundingClientRect(); return { tag: el.tagName.toLowerCase(), text: (el.getAttribute("aria-label") || el.textContent || el.value || "").trim().replace(/[ \\n]+/g, " ").slice(0, 40), ring, inDialog: !!el.closest("[role=dialog]"), onScreen: r.width > 0 && r.height > 0 }; })()`;
const out = []; const fail = (m) => out.push("FAIL " + m); const ok = (m) => out.push("ok   " + m); const skip = (m) => out.push("skip " + m);
// The account page and the login dialog's focus trap come with the accounts
// platform (PR #7). Without it in the build, those checks are reported as skipped.
const ACCOUNTS = fs.existsSync(path.join(OUT, "account", "index.html"));

await send("Page.enable");
for (const [p, w] of [["/", 1280], ["/dashboard/", 1280], ["/dashboard/mistakes/", 1280], ["/class-11/", 1280], ["/", 360]]) {
  await go(p, w);
  const seen = []; let noRing = [];
  for (let i = 0; i < 40; i++) { await tab(); const f = await ev(FOCUS); if (!f) continue; seen.push(f); if (!f.ring || !f.onScreen) noRing.push(`${f.tag} "${f.text}"${f.onScreen ? "" : " (off-screen)"}`); }
  const first = seen[0];
  (first && /skip to main/i.test(first.text) ? ok : fail)(`${p} @${w}: first Tab stop is the skip link (got ${first?.tag} "${first?.text}")`);
  noRing = [...new Set(noRing)];
  (noRing.length === 0 ? ok : fail)(`${p} @${w}: visible focus on all ${seen.length} tab stops${noRing.length ? " — missing: " + noRing.slice(0, 8).join(", ") : ""}`);
}

// Skip link moves focus to main
await go("/");
await tab(); await key("Enter", "Enter", 13); await sleep(300); await tab();
const afterSkip = await ev(`(() => { const m = document.querySelector("main"); return location.hash + " " + (m && m.contains(document.activeElement)); })()`);
(/ true$/.test(afterSkip) ? ok : fail)(`after the skip link, the next Tab lands inside <main> (${afterSkip})`);

// Auth dialog via keyboard
await go("/");
let opened = false;
for (let i = 0; i < 40 && !opened; i++) { await tab(); const f = await ev(FOCUS); if (f && /Login \/ Sign Up/.test(f.text)) { await key("Enter", "Enter", 13); await sleep(500); opened = await ev("!!document.querySelector('[role=dialog]')"); } }
(opened ? ok : fail)("auth dialog opens from the keyboard");
if (!ACCOUNTS) for (const m of ["focus moves into the dialog on open", "Tab and Shift+Tab stay inside the dialog", "Escape closes the dialog", "focus returns to the trigger", "/account/ tab stops"]) skip(m + " (needs the accounts platform, PR #7)");
if (opened && ACCOUNTS) {
  await go("/account/");
  { const seen = []; const noRing = []; for (let i = 0; i < 40; i++) { await tab(); const f = await ev(FOCUS); if (!f) continue; seen.push(f); if (!f.ring || !f.onScreen) noRing.push(f.tag + " " + f.text); }
    (seen[0] && /skip to main/i.test(seen[0].text) ? ok : fail)("/account/: first Tab stop is the skip link");
    (noRing.length === 0 ? ok : fail)(`/account/: visible focus on all ${seen.length} tab stops ${[...new Set(noRing)].slice(0, 8).join(", ")}`); }
  await go("/");
  for (let i = 0; i < 40; i++) { await tab(); const f = await ev(FOCUS); if (f && /Login [/] Sign Up/.test(f.text)) { await key("Enter", "Enter", 13); await sleep(500); break; } }
  const f0 = await ev(FOCUS);
  (f0?.inDialog ? ok : fail)(`focus moves into the dialog on open (${f0?.tag} "${f0?.text}")`);
  let escaped = false;
  for (let i = 0; i < 25; i++) { await tab(); const f = await ev(FOCUS); if (!f?.inDialog) escaped = true; if (f && !f.ring) fail(`dialog control without visible focus: ${f.tag} "${f.text}"`); }
  for (let i = 0; i < 10; i++) { await tab(true); const f = await ev(FOCUS); if (!f?.inDialog) escaped = true; }
  (!escaped ? ok : fail)("Tab and Shift+Tab stay inside the dialog");
  await ev(`document.getElementById("auth-email")?.focus()`);
  await key("Enter", "Enter", 13); await sleep(300);
  const invalid = await ev(`(() => { const e = document.getElementById("auth-email"); return e ? !e.checkValidity() : null; })()`);
  (invalid ? ok : fail)("empty form is not submitted (email required)");
  await key("Escape", "Escape", 27); await sleep(400);
  const closed = await ev("!document.querySelector('[role=dialog]')");
  const back = await ev(FOCUS);
  (closed ? ok : fail)("Escape closes the dialog");
  (back && /Login \/ Sign Up/.test(back.text) ? ok : fail)(`focus returns to the trigger (${back?.tag} "${back?.text}")`);
}

// Mobile menu
await go("/", 360, 740);
let menuBtn = null;
for (let i = 0; i < 15 && !menuBtn; i++) { await tab(); const f = await ev(FOCUS); if (f && /menu/i.test(f.text)) menuBtn = f; }
(menuBtn ? ok : fail)(`mobile menu button reachable by keyboard (${menuBtn?.text})`);
if (menuBtn) {
  await key("Enter", "Enter", 13); await sleep(400);
  const exp = await ev(`document.activeElement.getAttribute("aria-expanded")`);
  (exp === "true" ? ok : fail)(`menu button reports aria-expanded=true when open (${exp})`);
  await tab(); const f = await ev(FOCUS);
  (f && ["a","button"].includes(f.tag) ? ok : fail)(`next Tab reaches the first menu item (${f?.tag} "${f?.text}")`);
  await key("Escape", "Escape", 27); await sleep(300);
  const expAfter = await ev(`document.querySelector("button[aria-label$=menu]")?.getAttribute("aria-expanded")`);
  (expAfter === "false" ? ok : fail)(`Escape closes the mobile menu (aria-expanded=${expAfter})`);
  const backTo = await ev(FOCUS);
  (backTo && /menu/i.test(backTo.text) ? ok : fail)(`focus returns to the menu button (${backTo?.tag} "${backTo?.text}")`);
}

ws.close(); chrome.kill(); server.close();
for (const l of out) console.log(l);
const n = out.filter((l) => l.startsWith("FAIL")).length;
const k = out.filter((l) => l.startsWith("skip")).length;
console.log(`keyboard: ${out.length - n - k}/${out.length - k} passed${k ? `, ${k} skipped` : ""}`);
process.exit(n ? 1 : 0);
