import { describe, expect, it } from "vitest";
import { PRODUCTION_REF, PRODUCTION_REFS, STAGING_REF, classifyKey, normalizeRef, redact, refFromUrl, stagingTarget } from "../../../supabase/staging/guard.mjs";

// The staging verification suite creates and deletes accounts and flips a
// launch switch, so its target guard must make reaching production impossible,
// and it must recognise both Supabase key formats without mixing them up.
// It is an ALLOW-LIST: only the staging project is accepted; everything else,
// both production projects and any unknown project, is refused.
const CURRENT_PROD = "dykhwagloqxawgfkmjmc"; // the live site's project
const NEW_PROD = "fuznyurpfqgjricivopd"; //     the planned migration destination
const UNKNOWN = ["abcdefghijklmnopqrst", "zzzzzzzzzzzzzzzzzzzz", "wtuifivaxnhdnfwjsayj"]; // the last differs from staging by one character
const jwt = (payload: object) => ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", Buffer.from(JSON.stringify(payload)).toString("base64url"), "c2lnbmF0dXJlLXNpZ25hdHVyZQ"].join(".");
const PUBLIC = "sb_publishable_testPUBLICvalue123";
const SECRET = "sb_secret_testSECRETvalue456";
const NEW = {
  STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co`,
  STAGING_CONFIRM_REF: STAGING_REF,
  STAGING_SUPABASE_PUBLISHABLE_KEY: PUBLIC,
  STAGING_SUPABASE_SECRET_KEY: SECRET,
};
const LEGACY = {
  STAGING_SUPABASE_URL: NEW.STAGING_SUPABASE_URL,
  STAGING_CONFIRM_REF: STAGING_REF,
  STAGING_SUPABASE_ANON_KEY: jwt({ role: "anon", ref: STAGING_REF }),
  STAGING_SUPABASE_SERVICE_ROLE_KEY: jwt({ role: "service_role", ref: STAGING_REF }),
};
/** A target "confirmed" by the operator: URL and confirmation agree. */
const confirmed = (ref: string, base: Record<string, string> = NEW) => ({ ...base, STAGING_SUPABASE_URL: `https://${ref}.supabase.co`, STAGING_CONFIRM_REF: ref });
const message = (env: Record<string, string | undefined>) => {
  try {
    stagingTarget(env);
    return "";
  } catch (e) {
    return (e as Error).message;
  }
};
// Key VALUES (a format hint such as "sb_publishable_…" in an error message is fine).
const NO_SECRETS = /testPUBLICvalue|testSECRETvalue|eyJhbGci|sb_(secret|publishable)_[A-Za-z0-9]/;

describe("verified project refs", () => {
  it("staging is the only allowed project; both production projects are listed, and staging is not one of them", () => {
    expect(STAGING_REF).toBe("wtuifivaxnhdnfwjsayk");
    expect([...PRODUCTION_REFS].sort()).toEqual([CURRENT_PROD, NEW_PROD].sort());
    expect(PRODUCTION_REF).toBe(CURRENT_PROD);
    expect(PRODUCTION_REFS).not.toContain(STAGING_REF);
    expect(Object.isFrozen(PRODUCTION_REFS)).toBe(true);
  });
});

describe("staging target guard", () => {
  it("accepts the staging project with new-format keys (trailing slash and surrounding spaces ignored)", () => {
    expect(stagingTarget(NEW)).toMatchObject({ ref: STAGING_REF, url: `https://${STAGING_REF}.supabase.co`, publicKind: "publishable", serverKind: "secret" });
    expect(stagingTarget({ ...NEW, STAGING_SUPABASE_URL: `https://${STAGING_REF}.supabase.co/` }).url).toBe(`https://${STAGING_REF}.supabase.co`);
    expect(stagingTarget({ ...NEW, STAGING_SUPABASE_URL: `  https://${STAGING_REF}.supabase.co  `, STAGING_CONFIRM_REF: ` ${STAGING_REF} ` }).ref).toBe(STAGING_REF);
  });

  it("accepts legacy anon / service_role keys issued for the staging project", () => {
    expect(stagingTarget(LEGACY)).toMatchObject({ ref: STAGING_REF, publicKind: "legacy-anon", serverKind: "legacy-service-role" });
  });

  it("refuses BOTH production projects, even when 'confirmed', with either key format", () => {
    for (const prod of [CURRENT_PROD, NEW_PROD]) {
      expect(message(confirmed(prod)), prod).toMatch(/PRODUCTION/);
      expect(message({ ...confirmed(prod, LEGACY), STAGING_SUPABASE_ANON_KEY: jwt({ role: "anon", ref: prod }), STAGING_SUPABASE_SERVICE_ROLE_KEY: jwt({ role: "service_role", ref: prod }) }), prod).toMatch(/PRODUCTION/);
      // Whitespace around a production URL is trimmed, then refused: it never slips past as "malformed but accepted".
      expect(message({ ...confirmed(prod), STAGING_SUPABASE_URL: `  https://${prod}.supabase.co/  ` }), prod).toMatch(/PRODUCTION/);
    }
  });

  it("refuses unknown projects, even when 'confirmed' (allow-list, not a deny-list)", () => {
    for (const ref of UNKNOWN) {
      const m = message(confirmed(ref));
      expect(m, ref).toMatch(/not the staging project/);
      expect(m, ref).not.toBe("");
    }
  });

  it("refuses a legacy key issued for a production project, and names it as PRODUCTION", () => {
    for (const prod of [CURRENT_PROD, NEW_PROD]) {
      expect(message({ ...LEGACY, STAGING_SUPABASE_SERVICE_ROLE_KEY: jwt({ role: "service_role", ref: prod }) }), prod).toMatch(/different project \(PRODUCTION\)/);
      expect(message({ ...LEGACY, STAGING_SUPABASE_ANON_KEY: jwt({ role: "anon", ref: prod }) }), prod).toMatch(/different project \(PRODUCTION\)/);
    }
  });

  it("refuses a legacy key issued for an unknown project (not labelled PRODUCTION)", () => {
    const m = message({ ...LEGACY, STAGING_SUPABASE_SERVICE_ROLE_KEY: jwt({ role: "service_role", ref: UNKNOWN[0] }) });
    expect(m).toMatch(/different project/);
    expect(m).not.toMatch(/PRODUCTION/);
  });

  it("refuses malformed URLs: case, inner whitespace, wrong length, scheme, host, path or look-alike domain", () => {
    for (const url of [
      `https://${STAGING_REF.toUpperCase()}.supabase.co`,
      `https://Wtuifivaxnhdnfwjsayk.supabase.co`,
      `https://${CURRENT_PROD.toUpperCase()}.supabase.co`,
      `https://${NEW_PROD.toUpperCase()}.supabase.co`,
      `https://wtuifiva xnhdnfwjsayk.supabase.co`,
      `https://${STAGING_REF}x.supabase.co`,
      `https://${STAGING_REF.slice(1)}.supabase.co`,
      `http://${STAGING_REF}.supabase.co`,
      `https://${STAGING_REF}.supabase.co/rest/v1`,
      `https://${STAGING_REF}.supabase.co.evil.example`,
      `https://${STAGING_REF}.supabase.com`,
      "http://localhost:54321",
      "",
    ]) {
      const m = message({ ...NEW, STAGING_SUPABASE_URL: url });
      expect(m, url).not.toBe("");
      expect(m, url).toMatch(/must look like|PRODUCTION|not the staging project/);
    }
  });

  it("refuses a missing, wrong or malformed confirmation: case and inner whitespace don't pass", () => {
    for (const c of [undefined, "", "zzzzzzzzzzzzzzzzzzzz", CURRENT_PROD, NEW_PROD, STAGING_REF.toUpperCase(), "Wtuifivaxnhdnfwjsayk", "wtuifiva xnhdnfwjsayk", `${STAGING_REF}x`, `"${STAGING_REF}"`]) {
      expect(message({ ...NEW, STAGING_CONFIRM_REF: c }), String(c)).toMatch(/CONFIRM/);
    }
  });

  it("refuses swapped or wrong-kind keys", () => {
    expect(message({ ...NEW, STAGING_SUPABASE_PUBLISHABLE_KEY: SECRET, STAGING_SUPABASE_SECRET_KEY: PUBLIC })).toMatch(/PUBLIC key slot holds a SECRET/);
    expect(message({ ...NEW, STAGING_SUPABASE_SECRET_KEY: "sb_publishable_other" })).toMatch(/SERVER key slot holds a publishable/);
    expect(message({ ...NEW, STAGING_SUPABASE_SECRET_KEY: "not-a-key" })).toMatch(/neither/);
    expect(message({})).not.toBe("");
  });

  it("never echoes key values in any refusal", () => {
    const envs = [
      { ...NEW, STAGING_SUPABASE_PUBLISHABLE_KEY: "" },
      { ...NEW, STAGING_SUPABASE_SECRET_KEY: "" },
      { ...NEW, STAGING_SUPABASE_SECRET_KEY: PUBLIC },
      { ...NEW, STAGING_SUPABASE_PUBLISHABLE_KEY: SECRET },
      confirmed(CURRENT_PROD),
      confirmed(NEW_PROD),
      ...UNKNOWN.map((r) => confirmed(r)),
      { ...NEW, STAGING_CONFIRM_REF: "wrong" },
      { ...LEGACY, STAGING_SUPABASE_SERVICE_ROLE_KEY: jwt({ role: "service_role", ref: NEW_PROD }) },
    ];
    for (const env of envs) {
      const m = message(env);
      expect(m).not.toBe("");
      expect(m).not.toMatch(NO_SECRETS);
    }
  });

  it("classifies keys", () => {
    expect(classifyKey("sb_publishable_x").kind).toBe("publishable");
    expect(classifyKey("sb_secret_x").kind).toBe("secret");
    expect(classifyKey(jwt({ role: "anon", ref: "r" }))).toEqual({ kind: "legacy-anon", ref: "r" });
    expect(classifyKey("eyJbroken").kind).toBe("unknown");
  });

  it("normalises refs and URLs one way only: trims surrounding whitespace, never changes case", () => {
    expect(normalizeRef(` ${STAGING_REF}\n`)).toBe(STAGING_REF);
    for (const bad of [STAGING_REF.toUpperCase(), "wtuifiva xnhdnfwjsayk", `${STAGING_REF}x`, "", undefined, null]) expect(normalizeRef(bad), String(bad)).toBeNull();
    expect(refFromUrl(`https://${STAGING_REF}.supabase.co//`)).toBe(STAGING_REF);
    expect(refFromUrl(`https://${STAGING_REF.toUpperCase()}.supabase.co`)).toBeNull();
    expect(refFromUrl(`https://${STAGING_REF}.supabase.co/rest/v1`)).toBeNull();
  });

  it("redacts keys, JWTs and Supabase key strings from evidence", () => {
    const t = stagingTarget(NEW);
    const out = redact(`k=${t.serviceKey} a=${t.anonKey} ${LEGACY.STAGING_SUPABASE_ANON_KEY} sb_secret_abcDEF123`, t);
    expect(out).not.toMatch(/testSECRETvalue|testPUBLICvalue|eyJhbGci|sb_secret_abc/);
  });
});
