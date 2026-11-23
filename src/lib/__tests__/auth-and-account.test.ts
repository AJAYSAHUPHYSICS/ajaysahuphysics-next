import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { MESSAGES, authRedirect, passwordProblems, requestOutcome, signInErrorMessage } from "@/lib/auth/auth-policy";
import { DEVICE_KEYS, exportDeviceData, removeDeviceData } from "@/lib/account/local-data";

describe("authentication messages never reveal whether an email has an account", () => {
  it("every sign-in failure reads the same", () => {
    const failures = [
      { status: 400, message: "Invalid login credentials" },
      { status: 400, message: "Email not confirmed" },
      { status: 404, message: "User not found" },
      { status: 422, message: "Signups not allowed for this instance" },
      {},
      null,
    ];
    const msgs = new Set(failures.map((f) => signInErrorMessage(f)));
    expect(msgs).toEqual(new Set([MESSAGES.signInFailed]));
    for (const m of msgs) expect(m).not.toMatch(/not found|not confirmed|exists|registered/i);
  });

  it("sign-up and reset requests report the same success whether or not the email exists", () => {
    for (const err of [null, { status: 400, message: "User already registered" }, { status: 422, message: "Email address is invalid" }]) {
      expect(requestOutcome("signup", err)).toEqual({ ok: true, message: MESSAGES.signUpSent });
      expect(requestOutcome("reset", err)).toEqual({ ok: true, message: MESSAGES.resetSent });
    }
    expect(requestOutcome("signup", { status: 429, message: "rate limit" })).toEqual({ ok: false, message: MESSAGES.rateLimited });
    expect(signInErrorMessage({ status: 429 })).toBe(MESSAGES.rateLimited);
    expect(requestOutcome("reset", { name: "AuthRetryableFetchError", message: "Failed to fetch" }).message).toBe(MESSAGES.network);
  });

  it("email links only ever return to this site", () => {
    expect(authRedirect("/auth/callback/", "https://ajaysahuphysics.com")).toBe("https://ajaysahuphysics.com/auth/callback/");
    expect(authRedirect("/auth/callback/", "http://localhost:3000")).toBe("http://localhost:3000/auth/callback/");
    for (const evil of ["https://evil.example", "https://ajaysahuphysics.com.evil.example", "javascript:alert(1)", undefined]) {
      expect(authRedirect("/auth/reset-password/", evil)).toBe("https://ajaysahuphysics.com/auth/reset-password/");
    }
  });
});

describe("password policy", () => {
  it("requires length, rejects common and email-derived passwords, and has no composition rules", () => {
    expect(passwordProblems("short")).toContain("Use at least 10 characters.");
    expect(passwordProblems("password123")).toContain("Choose a less common password.");
    expect(passwordProblems("aaaaaaaaaaaa")).toContain("Choose a less common password.");
    expect(passwordProblems("ravi.kumar.2026!", "ravi.kumar@example.com")).toContain("Don't use your email address in your password.");
    expect(passwordProblems("x".repeat(73))).toContain("That password is too long. Use a shorter one (the limit is 72 bytes, so fewer characters in non-English scripts).");
    const devanagari = "भौतिकी".repeat(5); // 30 characters, 90 UTF-8 bytes
    expect(devanagari.length).toBeLessThan(72);
    expect(passwordProblems(devanagari)).toContain("That password is too long. Use a shorter one (the limit is 72 bytes, so fewer characters in non-English scripts)."); // the limit counts bytes
    expect(passwordProblems("correct horse battery staple")).toEqual([]);
    expect(passwordProblems("mitochondria-rules")).toEqual([]);
  });
});

describe("device data export and removal", () => {
  const make = () => {
    const m = new Map<string, string>([
      ["atlas:bookmarks", '[{"id":"11:kinematics:chapter"}]'],
      ["atlas:recent-searches", '["vectors"]'],
      ["atlas:checklist", "{not json"],
      ["sb-abc-auth-token", "session"],
      ["other-site-key", "keep"],
    ]);
    return { m, s: { getItem: (k: string) => m.get(k) ?? null, removeItem: (k: string) => void m.delete(k) } };
  };

  it("exports every AjaySahuPhysics key (malformed values as stored) and nothing else", () => {
    const { s } = make();
    const out = exportDeviceData(s, new Date("2026-11-20T00:00:00Z"));
    expect(out.exportedAt).toBe("2026-11-20T00:00:00.000Z");
    expect(Object.keys(out.data).sort()).toEqual(["atlas:bookmarks", "atlas:checklist", "atlas:recent-searches"]);
    expect(out.data["atlas:checklist"]).toBe("{not json");
    expect(JSON.stringify(out)).not.toContain("session");
  });

  it("removal clears only the site's own progress keys, never the sign-in session or other keys", () => {
    const { m, s } = make();
    expect(removeDeviceData(s).sort()).toEqual(["atlas:bookmarks", "atlas:checklist", "atlas:recent-searches"]);
    expect([...m.keys()].sort()).toEqual(["other-site-key", "sb-abc-auth-token"]);
    expect(DEVICE_KEYS).toHaveLength(12);
  });

  it("signing out never deletes local progress (the auth button only calls signOut)", () => {
    const src = readFileSync(path.resolve(__dirname, "..", "..", "components", "AuthButton.tsx"), "utf8");
    expect(src).toMatch(/auth\.signOut\(\)/);
    expect(src).not.toMatch(/localStorage|removeDeviceData|removeItem/);
  });
});
