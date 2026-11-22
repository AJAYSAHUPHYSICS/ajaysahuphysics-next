import { describe, expect, it } from "vitest";
import { PRODUCTION_REF, classifyKey, redact, stagingTarget } from "../../../supabase/staging/guard.mjs";

// The staging verification suite creates and deletes accounts and flips a
// launch switch, so its target guard must make reaching production impossible,
// and it must recognise both Supabase key formats without mixing them up.
const STAGING_REF = "abcdefghijklmnopqrst";
const jwt = (payload: object) => ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", Buffer.from(JSON.stringify(payload)).toString("base64url"), "c2lnbmF0dXJlLXNpZ25hdHVyZQ"].join(".");
const NEW = {
  STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co`,
  STAGING_CONFIRM_REF: STAGING_REF,
  STAGING_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_testPUBLICvalue123",
  STAGING_SUPABASE_SECRET_KEY: "sb_secret_testSECRETvalue456",
};
const LEGACY = {
  STAGING_SUPABASE_URL: NEW.STAGING_SUPABASE_URL,
  STAGING_CONFIRM_REF: STAGING_REF,
  STAGING_SUPABASE_ANON_KEY: jwt({ role: "anon", ref: STAGING_REF }),
  STAGING_SUPABASE_SERVICE_ROLE_KEY: jwt({ role: "service_role", ref: STAGING_REF }),
};
const message = (env: Record<string, string | undefined>) => {
  try {
    stagingTarget(env);
    return "";
  } catch (e) {
    return (e as Error).message;
  }
};

describe("staging target guard", () => {
  it("accepts a confirmed non-production project with new-format keys", () => {
    expect(stagingTarget(NEW)).toMatchObject({ ref: STAGING_REF, publicKind: "publishable", serverKind: "secret" });
    expect(stagingTarget({ ...NEW, STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co/` }).url).toBe(`https://${STAGING_REF}.supabase.co`);
  });

  it("accepts legacy anon / service_role keys issued for this project", () => {
    expect(stagingTarget(LEGACY)).toMatchObject({ publicKind: "legacy-anon", serverKind: "legacy-service-role" });
  });

  it("refuses the production project, even when 'confirmed'", () => {
    expect(message({ ...NEW, STAGING_SUPABASE_URL: `https://${PRODUCTION_REF}.supabase.co`, STAGING_CONFIRM_REF: PRODUCTION_REF })).toMatch(/PRODUCTION/);
  });

  it("refuses a legacy key issued for another project (e.g. production)", () => {
    expect(message({ ...LEGACY, STAGING_SUPABASE_SERVICE_ROLE_KEY: jwt({ role: "service_role", ref: PRODUCTION_REF }) })).toMatch(/different project \(PRODUCTION\)/);
  });

  it("refuses swapped or wrong-kind keys", () => {
    expect(message({ ...NEW, STAGING_SUPABASE_PUBLISHABLE_KEY: NEW.STAGING_SUPABASE_SECRET_KEY, STAGING_SUPABASE_SECRET_KEY: NEW.STAGING_SUPABASE_PUBLISHABLE_KEY })).toMatch(/PUBLIC key slot holds a SECRET/);
    expect(message({ ...NEW, STAGING_SUPABASE_SECRET_KEY: "sb_publishable_other" })).toMatch(/SERVER key slot holds a publishable/);
    expect(message({ ...NEW, STAGING_SUPABASE_SECRET_KEY: "not-a-key" })).toMatch(/neither/);
  });

  it("refuses without confirmation, with a wrong confirmation, or with a non-Supabase URL", () => {
    expect(message({ ...NEW, STAGING_CONFIRM_REF: undefined })).toMatch(/CONFIRM/);
    expect(message({ ...NEW, STAGING_CONFIRM_REF: "zzzzzzzzzzzzzzzzzzzz" })).toMatch(/CONFIRM/);
    expect(message({ ...NEW, STAGING_SUPABASE_URL: "http://localhost:54321" })).toMatch(/supabase\.co/);
    expect(message({ ...NEW, STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co.evil.example` })).not.toBe("");
    expect(message({})).not.toBe("");
  });

  it("never echoes key values in errors", () => {
    for (const env of [{ ...NEW, STAGING_SUPABASE_PUBLISHABLE_KEY: "" }, { ...NEW, STAGING_SUPABASE_SECRET_KEY: "" }, { ...NEW, STAGING_SUPABASE_SECRET_KEY: NEW.STAGING_SUPABASE_PUBLISHABLE_KEY }, { ...NEW, STAGING_SUPABASE_PUBLISHABLE_KEY: NEW.STAGING_SUPABASE_SECRET_KEY }]) {
      const m = message(env);
      expect(m).not.toBe("");
      expect(m).not.toMatch(/testPUBLICvalue|testSECRETvalue/);
    }
  });

  it("classifies keys", () => {
    expect(classifyKey("sb_publishable_x").kind).toBe("publishable");
    expect(classifyKey("sb_secret_x").kind).toBe("secret");
    expect(classifyKey(jwt({ role: "anon", ref: "r" }))).toEqual({ kind: "legacy-anon", ref: "r" });
    expect(classifyKey("eyJbroken").kind).toBe("unknown");
  });

  it("redacts keys, JWTs and Supabase key strings from evidence", () => {
    const t = stagingTarget(NEW);
    const out = redact(`k=${t.serviceKey} a=${t.anonKey} ${LEGACY.STAGING_SUPABASE_ANON_KEY} sb_secret_abcDEF123`, t);
    expect(out).not.toMatch(/testSECRETvalue|testPUBLICvalue|eyJhbGci|sb_secret_abc/);
  });
});
