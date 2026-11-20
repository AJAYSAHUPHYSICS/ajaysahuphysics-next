import { describe, expect, it } from "vitest";
import { PRODUCTION_REF, redact, stagingTarget } from "../../../supabase/staging/guard";

// The staging verification suite creates and deletes accounts and flips a
// launch switch, so its target guard must make reaching production impossible.
const STAGING_REF = "abcdefghijklmnopqrst";
const good = {
  STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co`,
  STAGING_CONFIRM_REF: STAGING_REF,
  STAGING_SUPABASE_ANON_KEY: "anon-key-value-123",
  STAGING_SUPABASE_SERVICE_ROLE_KEY: "service-key-value-456",
};

describe("staging target guard", () => {
  it("accepts an explicitly confirmed, non-production project", () => {
    expect(stagingTarget(good)).toMatchObject({ ref: STAGING_REF, url: `https://${STAGING_REF}.supabase.co` });
    expect(stagingTarget({ ...good, STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co/` }).url).toBe(`https://${STAGING_REF}.supabase.co`);
  });

  it("refuses the production project, even when 'confirmed'", () => {
    expect(() => stagingTarget({ ...good, STAGING_SUPABASE_URL: `https://${PRODUCTION_REF}.supabase.co`, STAGING_CONFIRM_REF: PRODUCTION_REF })).toThrow(/PRODUCTION/);
  });

  it("refuses without confirmation, with a wrong confirmation, or with a non-Supabase URL", () => {
    expect(() => stagingTarget({ ...good, STAGING_CONFIRM_REF: undefined })).toThrow(/CONFIRM/);
    expect(() => stagingTarget({ ...good, STAGING_CONFIRM_REF: "zzzzzzzzzzzzzzzzzzzz" })).toThrow(/CONFIRM/);
    expect(() => stagingTarget({ ...good, STAGING_SUPABASE_URL: "http://localhost:54321" })).toThrow(/supabase\.co/);
    expect(() => stagingTarget({ ...good, STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co.evil.example` })).toThrow();
    expect(() => stagingTarget({})).toThrow();
  });

  it("requires two different keys and never echoes them in errors", () => {
    for (const env of [{ ...good, STAGING_SUPABASE_ANON_KEY: "" }, { ...good, STAGING_SUPABASE_SERVICE_ROLE_KEY: "" }, { ...good, STAGING_SUPABASE_SERVICE_ROLE_KEY: good.STAGING_SUPABASE_ANON_KEY }]) {
      let message = "";
      try {
        stagingTarget(env);
      } catch (e) {
        message = (e as Error).message;
      }
      expect(message).not.toBe("");
      expect(message).not.toContain("anon-key-value");
      expect(message).not.toContain("service-key-value");
    }
  });

  it("redacts keys, JWTs and Supabase key strings from evidence", () => {
    const t = stagingTarget(good);
    const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4eHh4eHh4eHgifQ.c2lnbmF0dXJlc2lnbmF0dXJl";
    const out = redact(`k=${t.serviceKey} a=${t.anonKey} ${jwt} sb_secret_abcDEF123`, t);
    expect(out).not.toMatch(/service-key-value|anon-key-value|eyJhbGci|sb_secret_abc/);
  });
});
