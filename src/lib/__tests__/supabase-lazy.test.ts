import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { hasStoredSession, sessionStorageKey } from "@/lib/supabase-loader";

// The Supabase client is ~60 KB gzipped. Site-wide components must load it
// lazily so signed-out visitors never download it just to render the navbar.
const SRC = path.resolve(__dirname, "..", "..");
const read = (p: string) => readFileSync(path.join(SRC, p), "utf8");

describe("lazy Supabase client", () => {
  it("derives the same session key supabase-js uses (sb-<project ref>-auth-token)", () => {
    expect(sessionStorageKey("https://abcdefghijklmnopqrst.supabase.co")).toBe("sb-abcdefghijklmnopqrst-auth-token");
    expect(sessionStorageKey(undefined)).toBeNull();
    expect(sessionStorageKey("not a url")).toBeNull();
  });

  it("detects a saved session without throwing when storage is blocked", () => {
    const url = "https://abcdefghijklmnopqrst.supabase.co";
    const store = (v: string | null) => ({ getItem: (k: string) => (k === "sb-abcdefghijklmnopqrst-auth-token" ? v : null) });
    expect(hasStoredSession(store("{}"), url)).toBe(true);
    expect(hasStoredSession(store(null), url)).toBe(false);
    expect(hasStoredSession({ getItem: () => { throw new Error("SecurityError"); } }, url)).toBe(false);
    expect(hasStoredSession(null, url)).toBe(false);
  });

  it("site-wide components never import the client statically", () => {
    for (const f of ["components/AuthButton.tsx", "lib/auth/use-session.ts", "components/Navbar.tsx"]) {
      expect(read(f), f).not.toMatch(/from ["']@\/lib\/supabase-client["']/);
    }
    expect(read("components/AuthButton.tsx")).toMatch(/dynamic\(\(\) => import\("\.\/AuthModal"\)/);
    expect(read("lib/supabase-loader.ts")).toMatch(/import\("\.\/supabase-client"\)/);
  });
});
