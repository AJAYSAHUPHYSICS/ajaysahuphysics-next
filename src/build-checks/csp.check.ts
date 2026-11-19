import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { TURNSTILE_ORIGIN, captchaEnabled, executableInlineScripts, sha256 } from "../../scripts/inject-csp.mjs";

// ─────────────────────────────────────────────────────────────────
// Post-build check: every exported page carries a strict Content Security
// Policy (meta tag from scripts/inject-csp.mjs), placed before any script,
// that hash-lists exactly the page's inline scripts. Runs in CI after the
// build (npm run test:build-output).
// ─────────────────────────────────────────────────────────────────

const OUT = path.resolve(__dirname, "..", "..", process.env.ATLAS_OUT_DIR ?? "out");
const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(path.join(d, f)).isDirectory() ? walk(path.join(d, f)) : [path.join(d, f)]));
const pages = () => walk(OUT).filter((f) => f.endsWith(".html"));

function policyOf(html: string): Record<string, string[]> | null {
  const m = /<meta http-equiv="Content-Security-Policy" content="([^"]*)"/i.exec(html);
  if (!m) return null;
  const out: Record<string, string[]> = {};
  for (const part of m[1].replace(/&quot;/g, '"').split(";")) {
    const [name, ...values] = part.trim().split(/\s+/);
    if (name) out[name] = values;
  }
  return out;
}

describe("static export: Content Security Policy", () => {
  it("every page has exactly one CSP meta tag, before any script", () => {
    const bad: string[] = [];
    for (const f of pages()) {
      const html = readFileSync(f, "utf8");
      const metas = html.match(/http-equiv="Content-Security-Policy"/gi) ?? [];
      const metaAt = html.search(/http-equiv="Content-Security-Policy"/i);
      const firstScript = html.search(/<script\b/i);
      if (metas.length !== 1 || metaAt < 0 || (firstScript >= 0 && metaAt > firstScript)) bad.push(path.relative(OUT, f));
    }
    expect(pages().length).toBeGreaterThan(200);
    expect(bad).toEqual([]);
  });

  it("scripts: no 'unsafe-inline' or 'unsafe-eval', and every inline script on the page is hash-listed", () => {
    const bad: string[] = [];
    for (const f of pages()) {
      const html = readFileSync(f, "utf8");
      const p = policyOf(html)!;
      const scriptSrc = p["script-src"] ?? [];
      if (scriptSrc.includes("'unsafe-inline'") || scriptSrc.includes("'unsafe-eval'") || scriptSrc.includes("*")) bad.push(`${path.relative(OUT, f)}: weak script-src`);
      for (const s of executableInlineScripts(html) as string[]) {
        if (!scriptSrc.includes(`'sha256-${sha256(s)}'`)) bad.push(`${path.relative(OUT, f)}: inline script not hash-listed`);
      }
    }
    expect(bad.slice(0, 10)).toEqual([]);
  });

  it("locks down plugins, base URI, framing and form targets", () => {
    for (const f of pages().slice(0, 40)) {
      const p = policyOf(readFileSync(f, "utf8"))!;
      expect(p["object-src"]).toEqual(["'none'"]);
      expect(p["base-uri"]).toEqual(["'self'"]);
      // Framing is off, except Cloudflare's CAPTCHA frame when a Turnstile site key was set for the build.
      expect(p["frame-src"]).toEqual(captchaEnabled() ? [TURNSTILE_ORIGIN] : ["'none'"]);
      expect(p["form-action"]).toEqual(["'self'"]);
      expect(p["default-src"]).toEqual(["'self'"]);
      expect(p).toHaveProperty("upgrade-insecure-requests");
    }
  });

  it("GA4 is bootstrapped from a static file with the same measurement ID (no inline GA code)", () => {
    const init = readFileSync(path.join(OUT, "ga-init.js"), "utf8");
    const home = readFileSync(path.join(OUT, "index.html"), "utf8");
    expect(init).toMatch(/gtag\("config", "G-3R7SSPSTKT"\)/);
    for (const s of executableInlineScripts(home) as string[]) expect(s).not.toMatch(/gtag\(/);
  });
});
