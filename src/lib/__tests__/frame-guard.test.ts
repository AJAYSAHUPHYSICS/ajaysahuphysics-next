import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { FRAMED_NOTICE, isFramed } from "@/lib/frame-guard";

// Audit F8 (interim): GitHub Pages can't send frame-ancestors or
// X-Frame-Options, so the components with account actions refuse to show
// their controls inside a frame.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");

describe("isFramed", () => {
  it("is false for a top-level page and on the server", () => {
    const w = { self: {}, top: {} };
    w.top = w.self;
    expect(isFramed(w)).toBe(false);
    expect(isFramed(undefined)).toBe(false);
  });

  it("is true inside a frame", () => {
    expect(isFramed({ self: {}, top: {} })).toBe(true);
  });

  it("fails closed: if reading the top window throws, the page counts as framed", () => {
    const w = { self: {}, get top(): unknown { throw new Error("blocked"); } };
    expect(isFramed(w)).toBe(true);
  });

  it("explains what to do without naming any account detail", () => {
    expect(FRAMED_NOTICE).toMatch(/opened directly/);
    expect(FRAMED_NOTICE).not.toMatch(/email|password|account exists/i);
  });
});

describe("where the guard is used", () => {
  it("wraps the account page, the password-reset form and the login dialog", () => {
    expect(read("src", "app", "account", "AccountClient.tsx")).toMatch(/<FrameGuard>\s*<div className="space-y-6">/);
    expect(read("src", "app", "auth", "reset-password", "ResetClient.tsx")).toMatch(/<FrameGuard>\s*<div className="rounded-lg/);
    expect(read("src", "components", "AuthModal.tsx")).toMatch(/aria-labelledby="auth-modal-title"[^\n]*onClick=\{\(e\) => e\.stopPropagation\(\)\}>\s*<FrameGuard>/);
  });

  it("decides after hydration with useSyncExternalStore, so the prerendered HTML still matches", () => {
    const g = read("src", "components", "FrameGuard.tsx");
    expect(g).toMatch(/useSyncExternalStore\(noSubscribe, clientFramed, serverFramed\)/);
    expect(g).toMatch(/const serverFramed = \(\) => false;/);
  });
});
