// ─────────────────────────────────────────────────────────────────
// Browser driver for the E2E scripts (study-tools.mjs, keyboard.mjs).
//
//   E2E_BROWSER=chrome   (default) headless Chrome over the DevTools
//                        protocol, no extra dependency. CHROME_PATH picks
//                        another Chromium build, e.g. Microsoft Edge.
//   E2E_BROWSER=firefox  Playwright's Firefox   } dev dependency `playwright`;
//   E2E_BROWSER=webkit   Playwright's WebKit    } `npx playwright install firefox webkit`
//
// Every driver offers the same small surface, so the checks are written once:
//   go(url)  ev(expression)  viewport(w, h)  key(name, { shift })
//   withInitScript(source, fn)  exceptions  consoleErrors  close()
// ev() returns undefined when the expression throws (like CDP's
// Runtime.evaluate), so a check reads "did not run" rather than crashing.
// ─────────────────────────────────────────────────────────────────
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import os from "node:os";
import path from "node:path";

export const BROWSER = (process.env.E2E_BROWSER ?? "chrome").toLowerCase();

// The site's CSP ends with `upgrade-insecure-requests`. Chrome and Firefox
// don't upgrade requests to localhost; WebKit does, so over plain HTTP every
// script and stylesheet fails to load. For WebKit the build is therefore
// served over HTTPS with a throwaway self-signed localhost certificate, as
// production is, rather than weakening the CSP under test.
export const SCHEME = BROWSER === "webkit" ? "https" : "http";

// Next.js requests segment-prefetch files by dotted names, such as
// `dashboard/__next.dashboard.__PAGE__.txt`. A Linux build (CI, production)
// writes exactly that. A Windows build writes `__next.dashboard/__PAGE__.txt`
// instead, so every prefetch 404s locally. Serve that layout under the dotted
// name, so local runs match production; it only applies when the dotted file
// is missing and the Windows one exists.
export function segmentFile(file) {
  if (fs.existsSync(file)) return file;
  const m = /^__next\.(.+)\.txt$/.exec(path.basename(file));
  if (!m) return file;
  const alt = path.join(path.dirname(file), "__next." + m[1].split(".").join(path.sep) + ".txt");
  return fs.existsSync(alt) ? alt : file;
}
export function createServer(handler) {
  if (SCHEME === "http") return http.createServer(handler);
  return https.createServer(selfSignedLocalhost(), handler);
}
function selfSignedLocalhost() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "atlas-e2e-tls-"));
  const key = path.join(dir, "key.pem"), cert = path.join(dir, "cert.pem");
  const args = ["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-keyout", key, "-out", cert, "-days", "1", "-subj", "/CN=localhost", "-addext", "subjectAltName=DNS:localhost"];
  const candidates = [process.env.OPENSSL, "openssl", "C:/Program Files/Git/usr/bin/openssl.exe", "C:/Program Files/Git/mingw64/bin/openssl.exe"].filter(Boolean);
  for (const exe of candidates) {
    const r = spawnSync(exe, args, { stdio: "ignore" });
    if (r.status === 0) {
      const pair = { key: fs.readFileSync(key), cert: fs.readFileSync(cert) };
      fs.rmSync(dir, { recursive: true, force: true });
      return pair;
    }
  }
  throw new Error("E2E_BROWSER=webkit serves over HTTPS and needs openssl (set OPENSSL=/path/to/openssl)");
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SETTLE_MS = 2500; // after each navigation, as before

export async function openBrowser({ debugPort, profile }) {
  if (BROWSER === "chrome") return openCdp({ debugPort, profile });
  if (BROWSER === "firefox" || BROWSER === "webkit") return openPlaywright(BROWSER);
  throw new Error(`E2E_BROWSER must be chrome, firefox or webkit (got "${BROWSER}")`);
}

// ── Chrome / Chromium over CDP (the original harness, unchanged) ──
const CDP_KEYS = { Tab: ["Tab", 9], Enter: ["Enter", 13], Escape: ["Escape", 27] };
async function openCdp({ debugPort, profile }) {
  const exe = process.env.CHROME_PATH ?? ({ win32: "C:/Program Files/Google/Chrome/Application/chrome.exe", darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" }[process.platform] ?? "google-chrome");
  const dir = profile ?? fs.mkdtempSync(path.join(os.tmpdir(), "atlas-e2e-"));
  fs.mkdirSync(dir, { recursive: true });
  // CI runners (recent Ubuntu) restrict the unprivileged user namespaces
  // Chrome's sandbox needs, so Chrome exits at start. These scripts load only
  // the local static build, so the sandbox is turned off in CI only.
  const ciFlags = process.env.CI ? ["--no-sandbox", "--disable-dev-shm-usage"] : [];
  let stderr = "";
  const proc = spawn(exe, ["--headless=new", "--disable-gpu", "--no-first-run", ...ciFlags, `--user-data-dir=${dir}`, `--remote-debugging-port=${debugPort}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  proc.stderr.on("data", (d) => (stderr += d));
  for (let i = 0; i < 120; i++) {
    try { await (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).json(); break; }
    catch { if (i === 119) throw new Error("Chrome did not start: " + stderr.slice(-800)); await sleep(250); }
  }
  const target = (await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json()).find((x) => x.type === "page");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0; const pending = new Map();
  const exceptions = []; const consoleErrors = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); return; }
    if (m.method === "Runtime.exceptionThrown") exceptions.push(m.params.exceptionDetails.exception?.description?.slice(0, 160) ?? "exception");
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") consoleErrors.push(m.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 160));
  });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Runtime.enable"); await send("Page.enable");
  return {
    name: "chrome" + (process.env.CHROME_PATH ? ` (${path.basename(process.env.CHROME_PATH)})` : ""),
    exceptions, consoleErrors, abortedByNavigation: [],
    go: async (url) => { await send("Page.navigate", { url }); await sleep(SETTLE_MS); },
    ev: async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value,
    viewport: (width, height) => send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 }),
    key: async (name, { shift = false } = {}) => {
      const [code, keyCode] = CDP_KEYS[name];
      const text = name === "Enter" ? "\r" : undefined;
      for (const type of ["keyDown", "keyUp"]) await send("Input.dispatchKeyEvent", { type, key: name, code, windowsVirtualKeyCode: keyCode, modifiers: shift ? 8 : 0, ...(type === "keyDown" && text ? { text } : {}) });
      await sleep(60);
    },
    withInitScript: async (source, fn) => {
      const { identifier } = await send("Page.addScriptToEvaluateOnNewDocument", { source });
      try { return await fn(); } finally { await send("Page.removeScriptToEvaluateOnNewDocument", { identifier }); }
    },
    close: async () => { ws.close(); proc.kill(); },
  };
}

// ── Firefox / WebKit through Playwright ──
async function openPlaywright(name) {
  let pw;
  try { pw = await import("playwright"); }
  catch { throw new Error("E2E_BROWSER=" + name + " needs the `playwright` dev dependency: npm ci && npx playwright install firefox webkit"); }
  const browser = await pw[name].launch({ headless: true });
  // ignoreHTTPSErrors only accepts the throwaway localhost certificate above.
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, ignoreHTTPSErrors: SCHEME === "https" });
  const exceptions = []; const consoleErrors = []; const abortedByNavigation = [];
  // WebKit rejects fetches that a page load aborts (Next.js prefetches still
  // in flight) with "… due to access control checks", reported as a page
  // error. Chromium and Firefox stay silent. Such errors are set aside, and
  // counted, only while one of the suite's own page loads is in progress;
  // any other page error, at any time, still fails the run.
  let navigating = false;
  const watch = (p) => {
    p.on("pageerror", (e) => {
      const msg = String(e?.stack ?? e).slice(0, 160);
      if (name === "webkit" && navigating && /due to access control checks/.test(msg)) abortedByNavigation.push(msg);
      else exceptions.push(msg);
    });
    p.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });
    // E2E_DEBUG=1 prints every failed response, to diagnose console errors.
    if (process.env.E2E_DEBUG) p.on("response", (r) => { if (r.status() >= 400) console.error(`[debug] HTTP ${r.status()} ${r.url()}`); });
    return p;
  };
  let page = watch(await context.newPage());
  return {
    name: `${name} ${browser.version()}`,
    exceptions, consoleErrors, abortedByNavigation,
    go: async (url) => {
      navigating = true;
      try { await page.goto(url, { waitUntil: "load" }); } finally { navigating = false; }
      await sleep(SETTLE_MS);
    },
    ev: async (expression) => { try { return await page.evaluate(expression); } catch { return undefined; } },
    // Playwright's Firefox has no mobile emulation; only the size changes.
    viewport: (width, height) => page.setViewportSize({ width, height }),
    key: async (key, { shift = false } = {}) => { await page.keyboard.press(shift ? `Shift+${key}` : key); await sleep(60); },
    // Playwright can't remove an init script, so it runs on a second page in
    // the same context (same localStorage), which is then closed.
    withInitScript: async (source, fn) => {
      const first = page;
      const second = watch(await context.newPage());
      await second.setViewportSize(first.viewportSize());
      await second.addInitScript(source);
      page = second;
      try { return await fn(); } finally { page = first; await second.close(); }
    },
    close: () => browser.close(),
  };
}
