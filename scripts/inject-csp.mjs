// ─────────────────────────────────────────────────────────────────
// Post-build: add a Content Security Policy to every exported page.
//
// GitHub Pages can't send response headers, so the policy is delivered as
// <meta http-equiv="Content-Security-Policy">, inserted as the first element
// after <meta charset> so it applies before any script runs.
//
// Next.js's static export emits inline bootstrap scripts on every page. Their
// exact text is known after the build, so each page lists the SHA-256 of
// its own inline scripts: no 'unsafe-inline' and no 'unsafe-eval' for
// scripts. Inline styles stay allowed (React style attributes).
//
// Limits of a meta-tag policy (documented in SECURITY_REVIEW.md):
// frame-ancestors, report-uri and sandbox are ignored in <meta>, so
// clickjacking protection still needs a host that can send headers.
//
// Runs automatically after `npm run build` (npm "postbuild"). Idempotent.
// ─────────────────────────────────────────────────────────────────
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const OUT = path.resolve(process.argv[2] ?? "out");

/** Supabase origin for connect-src: the configured project, else any Supabase project. */
function supabaseOrigin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url) {
    try {
      const u = new URL(url);
      if (u.protocol === "https:") return u.origin;
    } catch {
      /* fall through */
    }
  }
  return "https://*.supabase.co";
}

const GOOGLE_TAG = "https://*.googletagmanager.com";
const GOOGLE_ANALYTICS = ["https://*.google-analytics.com", "https://*.analytics.google.com"];

export function buildPolicy(scriptHashes) {
  const directives = {
    "default-src": ["'self'"],
    "script-src": ["'self'", ...scriptHashes.map((h) => `'sha256-${h}'`), GOOGLE_TAG],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", GOOGLE_TAG, ...GOOGLE_ANALYTICS],
    "font-src": ["'self'"],
    "connect-src": ["'self'", supabaseOrigin(), GOOGLE_TAG, ...GOOGLE_ANALYTICS],
    "frame-src": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "manifest-src": ["'self'"],
    "worker-src": ["'self'"],
  };
  return [...Object.entries(directives).map(([k, v]) => `${k} ${v.join(" ")}`), "upgrade-insecure-requests"].join("; ");
}

/** Inline scripts the browser executes (no src; JS type or none). Data blocks such as JSON-LD are skipped. */
export function executableInlineScripts(html) {
  const out = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1]?.toLowerCase();
    if (type && !["text/javascript", "application/javascript", "module"].includes(type)) continue;
    out.push(m[2]);
  }
  return out;
}

export const sha256 = (text) => createHash("sha256").update(text, "utf8").digest("base64");
const CSP_META = /<meta http-equiv="Content-Security-Policy" content="[^"]*"\s*\/?>/i;

export function injectCsp(html) {
  const withoutOld = html.replace(CSP_META, "");
  const hashes = [...new Set(executableInlineScripts(withoutOld).map(sha256))].sort();
  const meta = `<meta http-equiv="Content-Security-Policy" content="${buildPolicy(hashes).replace(/"/g, "&quot;")}"/>`;
  const charset = /<meta charSet="utf-8"\s*\/?>/i;
  if (charset.test(withoutOld)) return withoutOld.replace(charset, (m) => m + meta);
  if (/<head[^>]*>/i.test(withoutOld)) return withoutOld.replace(/<head[^>]*>/i, (m) => m + meta);
  throw new Error("no <head> to place the CSP in");
}

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const pages = walk(OUT).filter((f) => f.endsWith(".html"));
  if (pages.length === 0) throw new Error(`inject-csp: no HTML in ${OUT}; run the build first`);
  let scripts = 0;
  for (const f of pages) {
    const html = injectCsp(readFileSync(f, "utf8"));
    scripts += executableInlineScripts(html).length;
    writeFileSync(f, html);
  }
  console.log(`inject-csp: ${pages.length} pages, ${scripts} inline scripts hash-listed, connect-src Supabase origin ${supabaseOrigin()}`);
}
