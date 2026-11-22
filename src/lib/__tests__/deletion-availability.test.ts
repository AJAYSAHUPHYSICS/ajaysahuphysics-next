import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DELETION_NOTE, RATE_LIMITED_NOTE, canSubmitDeletion, deletionAvailability, isDeletionDisabledError, isRateLimitedError } from "@/lib/account/deletion-availability";

// Audit F4: the delete control is usable only after BOTH server checks have
// answered true. "Not yet known" (null) is a disabled state.
const ROOT = path.resolve(__dirname, "..", "..", "..");

describe("account deletion availability (F4, F5)", () => {
  it("is disabled while either check is still in flight", () => {
    expect(deletionAvailability(null, null)).toBe("checking");
    expect(deletionAvailability(null, true)).toBe("checking");
    expect(deletionAvailability(true, null)).toBe("checking");
    expect(canSubmitDeletion(deletionAvailability(null, null), "DELETE", false)).toBe(false);
    expect(canSubmitDeletion(deletionAvailability(null, true), "DELETE", false)).toBe(false);
    expect(canSubmitDeletion(deletionAvailability(true, null), "DELETE", false)).toBe(false);
  });

  it("is disabled when the accounts database check failed", () => {
    expect(deletionAvailability(false, true)).toBe("not-set-up");
    expect(deletionAvailability(false, null)).toBe("not-set-up");
    expect(canSubmitDeletion("not-set-up", "DELETE", false)).toBe(false);
  });

  it("is disabled when the server-side deletion gate is off or unreadable", () => {
    expect(deletionAvailability(true, false)).toBe("not-available-yet");
    expect(canSubmitDeletion("not-available-yet", "DELETE", false)).toBe(false);
  });

  it("is enabled only when both are true, DELETE is typed exactly, and nothing is in progress", () => {
    expect(deletionAvailability(true, true)).toBe("available");
    expect(canSubmitDeletion("available", "DELETE", false)).toBe(true);
    expect(canSubmitDeletion("available", "delete", false)).toBe(false);
    expect(canSubmitDeletion("available", "DELETE ", false)).toBe(false);
    expect(canSubmitDeletion("available", "DELETE", true)).toBe(false);
  });

  it("every disabled state explains itself and points to the Contact page where deletion isn't offered", () => {
    expect(DELETION_NOTE.checking).toMatch(/Checking/);
    expect(DELETION_NOTE["not-set-up"]).toMatch(/Contact page/);
    expect(DELETION_NOTE["not-available-yet"]).toMatch(/Contact page/);
  });

  it("recognises the server's gate refusal", () => {
    expect(isDeletionDisabledError({ message: "deletion-disabled" })).toBe(true);
    expect(isDeletionDisabledError({ message: "network error" })).toBe(false);
    expect(isDeletionDisabledError(null)).toBe(false);
  });

  it("recognises a rate-limit refusal from either path, and tells the student what to do", () => {
    expect(isRateLimitedError({ message: "rate-limited" })).toBe(true);
    expect(isRateLimitedError({ message: "Edge Function returned a non-2xx status code", context: { status: 429 } })).toBe(true);
    expect(isRateLimitedError({ message: "x", context: { status: 503 } })).toBe(false);
    expect(isRateLimitedError(null)).toBe(false);
    expect(RATE_LIMITED_NOTE).toMatch(/wait a few minutes.*Contact page/);
  });

  it("the account page uses these rules for the button and the request (no separate inline condition)", () => {
    const src = readFileSync(path.join(ROOT, "src", "app", "account", "AccountClient.tsx"), "utf8");
    expect(src).toMatch(/disabled=\{!canSubmitDeletion\(deletion, deleteText, busy\)\}/);
    expect(src).toMatch(/if \(!supabase \|\| !canSubmitDeletion\(deletion, deleteText, busy\)\) return;/);
    expect(src).toMatch(/supabase\.rpc\("account_deletion_enabled"\)/);
    expect(src).not.toMatch(/cloudReady === false\} onClick=\{deleteAccount\}/);
  });
});
