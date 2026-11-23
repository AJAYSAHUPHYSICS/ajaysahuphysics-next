import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { MESSAGES, requestOutcome, signInErrorMessage } from "@/lib/auth/auth-policy";
import { CAPTCHA_SITE_KEY, TURNSTILE_SCRIPT_URL, captchaOptions, captchaSiteKey } from "@/lib/auth/captcha";

const root = path.resolve(__dirname, "..", "..", "..");

describe("CAPTCHA is off unless a site key is configured", () => {
  it("no key (the default build) means no CAPTCHA and unchanged auth options", () => {
    expect(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").toBe("");
    expect(CAPTCHA_SITE_KEY).toBeNull();
    expect(captchaOptions(null)).toEqual({});
  });

  it("accepts only plausible public site keys", () => {
    expect(captchaSiteKey(undefined)).toBeNull();
    expect(captchaSiteKey("   ")).toBeNull();
    expect(captchaSiteKey("short")).toBeNull();
    expect(captchaSiteKey('0x4AAAA"><script>')).toBeNull();
    expect(captchaSiteKey(" 0x4AAAAAAABkMYinukE8nzY ")).toBe("0x4AAAAAAABkMYinukE8nzY");
  });

  it("passes the token to Supabase only when one exists", () => {
    expect(captchaOptions("tok-123")).toEqual({ captchaToken: "tok-123" });
  });

  it("loads the widget only from Cloudflare's fixed URL", () => {
    expect(TURNSTILE_SCRIPT_URL).toBe("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit");
  });
});

describe("a rejected CAPTCHA is reported, and never shown as success", () => {
  const rejected = [{ status: 400, code: "captcha_failed", message: "captcha protection: request disallowed (timeout-or-duplicate)" }, { status: 400, message: "Captcha verification process failed" }];

  it("sign-in shows the CAPTCHA message, not the wrong-password message", () => {
    for (const e of rejected) expect(signInErrorMessage(e)).toBe(MESSAGES.captcha);
  });

  it("sign-up and reset do not claim an email was sent", () => {
    for (const e of rejected) {
      expect(requestOutcome("signup", e)).toEqual({ ok: false, message: MESSAGES.captcha });
      expect(requestOutcome("reset", e)).toEqual({ ok: false, message: MESSAGES.captcha });
    }
  });

  it("the CAPTCHA message is the same for every email (no account probing)", () => {
    expect(MESSAGES.captcha).not.toMatch(/account|registered|exist/i);
  });

  it("every auth request in the modal carries the token", () => {
    const src = readFileSync(path.join(root, "src", "components", "AuthModal.tsx"), "utf8");
    expect(src.match(/captchaOptions\(captchaToken\)/g)?.length).toBe(3);
    expect(src).toMatch(/setCaptchaReset/); // single-use tokens are refreshed after each attempt
  });
});
