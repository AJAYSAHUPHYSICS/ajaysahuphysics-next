import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ACCOUNTS_UI_ENABLED, accountControl } from "@/lib/auth/accounts-ui";

// Owner decision H1 (2026-11-22): no public login or sign-up entry point
// until the Phase 2B release. This hides the UI only; Supabase Auth sign-ups
// are a dashboard setting (see src/lib/auth/accounts-ui.ts).
const ROOT = path.resolve(__dirname, "..", "..", "..");
const SRC = path.join(ROOT, "src");
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) return name === "__tests__" ? [] : sourceFiles(p);
    return /\.(tsx?|mjs)$/.test(name) ? [p] : [];
  });
}

describe("accounts UI switch (H1)", () => {
  it("is off until the release", () => {
    expect(ACCOUNTS_UI_ENABLED).toBe(false);
  });

  it("signed-out visitors get no login control while it is off; signed-in visitors keep theirs", () => {
    expect(accountControl(false)).toBe("none");
    expect(accountControl(true)).toBe("signed-in");
    expect(accountControl(false, false)).toBe("none");
    expect(accountControl(true, false)).toBe("signed-in");
  });

  it("when it is turned on for the release, the login entry point returns", () => {
    expect(accountControl(false, true)).toBe("login");
    expect(accountControl(true, true)).toBe("signed-in");
  });

  it("every component that can open the login dialog goes through the switch", () => {
    const openers = sourceFiles(SRC).filter((f) => {
      const s = readFileSync(f, "utf8");
      return !f.endsWith(path.join("components", "AuthModal.tsx")) && /import\(["']\.\/AuthModal["']\)|from ["'](\.\/|@\/components\/)AuthModal["']/.test(s);
    });
    expect(openers.length, "expected at least the navbar's AuthButton").toBeGreaterThan(0);
    for (const f of openers) {
      expect(readFileSync(f, "utf8"), path.relative(ROOT, f)).toMatch(/accountControl\(|ACCOUNTS_UI_ENABLED/);
    }
  });

  it("no other component calls Supabase sign-up directly", () => {
    const callers = sourceFiles(SRC).filter((f) => /auth\.signUp\(/.test(readFileSync(f, "utf8"))).map((f) => path.relative(ROOT, f).replace(/\\/g, "/"));
    expect(callers).toEqual(["src/components/AuthModal.tsx"]);
  });
});
