import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { describe, expect, it } from "vitest";

// Audit F7 (build switches in the deploy) and F8 (no analytics on auth pages).
const ROOT = path.resolve(__dirname, "..", "..", "..");
const gaInit = readFileSync(path.join(ROOT, "public", "ga-init.js"), "utf8");
const deploy = readFileSync(path.join(ROOT, ".github", "workflows", "deploy.yml"), "utf8");

/** Runs public/ga-init.js as a classic script on the given path; returns what it queued for GA. */
function runGaInit(pathname: string): unknown[][] {
  const window: { dataLayer?: unknown[]; location: { pathname: string } } = { location: { pathname } };
  vm.runInNewContext(gaInit, { window, Date });
  return (window.dataLayer ?? []).map((args) => Array.from(args as ArrayLike<unknown>));
}

describe("GA4 bootstrap skips auth pages (F8)", () => {
  it.each(["/", "/dashboard/", "/privacy/", "/account/", "/chapters/authority/"])("configures GA on %s", (p) => {
    const queued = runGaInit(p);
    expect(queued.map((a) => a[0])).toEqual(["js", "config"]);
    expect(queued[1]).toEqual(["config", "G-3R7SSPSTKT"]);
  });

  it.each(["/auth/callback/", "/auth/reset-password/", "/preview/auth/callback/"])("sends nothing on %s (one-time codes in the URL)", (p) => {
    expect(runGaInit(p)).toEqual([]);
  });

  it("still defines gtag on auth pages, so trackEvent calls are harmless no-ops", () => {
    const window: Record<string, unknown> = { location: { pathname: "/auth/callback/" } };
    const ctx = vm.createContext({ window, Date });
    vm.runInContext(gaInit, ctx);
    expect(vm.runInContext("typeof gtag", ctx)).toBe("function");
  });
});

describe("deploy build passes the owner's build switches (F7)", () => {
  const buildEnv = deploy.slice(deploy.indexOf("name: Build static site"), deploy.indexOf("name: Setup Pages"));

  it("passes NEXT_PUBLIC_ANALYTICS and NEXT_PUBLIC_TURNSTILE_SITE_KEY from repository variables", () => {
    expect(buildEnv).toMatch(/NEXT_PUBLIC_ANALYTICS: \$\{\{ vars\.NEXT_PUBLIC_ANALYTICS \}\}/);
    expect(buildEnv).toMatch(/NEXT_PUBLIC_TURNSTILE_SITE_KEY: \$\{\{ vars\.NEXT_PUBLIC_TURNSTILE_SITE_KEY \}\}/);
  });

  it("keeps the Supabase values as secrets and never reads the switches from secrets", () => {
    expect(buildEnv).toMatch(/NEXT_PUBLIC_SUPABASE_URL: \$\{\{ secrets\.NEXT_PUBLIC_SUPABASE_URL \}\}/);
    expect(buildEnv).toMatch(/NEXT_PUBLIC_SUPABASE_ANON_KEY: \$\{\{ secrets\.NEXT_PUBLIC_SUPABASE_ANON_KEY \}\}/);
    expect(buildEnv).not.toMatch(/secrets\.NEXT_PUBLIC_(ANALYTICS|TURNSTILE)/);
  });

  it("an unset variable builds today's behaviour: analytics on, CAPTCHA off", async () => {
    const { analyticsEnabled } = await import("@/lib/analytics-config");
    const { captchaSiteKey } = await import("@/lib/auth/captcha");
    expect(analyticsEnabled("")).toBe(true);
    expect(captchaSiteKey("")).toBeNull();
  });
});
