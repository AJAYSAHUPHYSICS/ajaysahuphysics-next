import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Runs scripts/staging/staging-env.mjs against throwaway git repositories, so
// the real file, git-ignore and env-file checks are exercised end to end.
const SCRIPT = path.resolve(__dirname, "..", "..", "..", "scripts", "staging", "staging-env.mjs");
const REF = "wtuifivaxnhdnfwjsayk"; // staging: the only project the guard allows
const CURRENT_PROD = "dykhwagloqxawgfkmjmc";
const NEW_PROD = "fuznyurpfqgjricivopd";
const UNKNOWN = "abcdefghijklmnopqrst";
const PUBLIC = "sb_publishable_testPUBLICvalue123";
const SECRET = "sb_secret_testSECRETvalue456";
const good = [`STAGING_SUPABASE_URL=https://${REF}.supabase.co`, `STAGING_CONFIRM_REF=${REF}`, `STAGING_SUPABASE_PUBLISHABLE_KEY=${PUBLIC}`, `STAGING_SUPABASE_SECRET_KEY="${SECRET}"`].join("\n");

function repo(files: Record<string, string>, ignore = ".env*\n") {
  const dir = mkdtempSync(path.join(os.tmpdir(), "atlas-stgenv-"));
  execFileSync("git", ["init", "-q"], { cwd: dir });
  writeFileSync(path.join(dir, ".gitignore"), ignore);
  for (const [f, c] of Object.entries(files)) writeFileSync(path.join(dir, f), c);
  return dir;
}
const check = (dir: string, extraEnv: Record<string, string> = {}) => {
  const env = { ...Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith("STAGING_") && !k.startsWith("NEXT_PUBLIC_"))), ...extraEnv } as NodeJS.ProcessEnv;
  const r = spawnSync(process.execPath, [SCRIPT, "check"], { cwd: dir, env, encoding: "utf8" });
  return { code: r.status, out: r.stdout + r.stderr };
};

describe("staging environment checker", () => {
  it("accepts a valid, git-ignored staging file and prints no key values", () => {
    const r = check(repo({ ".env.staging.local": good }));
    expect(r.out).toContain("staging-env: OK");
    expect(r.out).toContain(`target ref:        ${REF}`);
    expect(r.out).toMatch(/public key:\s+publishable/);
    expect(r.out).toMatch(/server key:\s+secret/);
    expect(r.out).not.toMatch(/testPUBLICvalue|testSECRETvalue/);
    expect(r.code).toBe(0);
  }, 30_000);

  it("refuses a staging file that is not git-ignored", () => {
    const r = check(repo({ ".env.staging.local": good }, "node_modules\n"));
    expect(r.out).toMatch(/not git-ignored/);
    expect(r.code).toBe(1);
  }, 30_000);

  it("refuses when a secret key sits in an env file Next.js loads (it could reach browser code)", () => {
    const r = check(repo({ ".env.staging.local": good, ".env.local": `NEXT_PUBLIC_SUPABASE_ANON_KEY=${SECRET}\n` }));
    expect(r.out).toMatch(/\.env\.local contains a SECRET\/service-role key in NEXT_PUBLIC_SUPABASE_ANON_KEY/);
    expect(r.out).not.toMatch(/testSECRETvalue/);
    expect(r.code).toBe(1);
  }, 30_000);

  it("refuses browser variables in the staging test file", () => {
    const r = check(repo({ ".env.staging.local": `${good}\nNEXT_PUBLIC_SUPABASE_URL=https://${REF}.supabase.co\n` }));
    expect(r.out).toMatch(/defines NEXT_PUBLIC_SUPABASE_URL/);
    expect(r.code).toBe(1);
  }, 30_000);

  it("refuses BOTH production projects, even when confirmed, and runs nothing", () => {
    for (const prod of [CURRENT_PROD, NEW_PROD]) {
      const r = check(repo({ ".env.staging.local": good.split(REF).join(prod) }));
      expect(r.out, prod).toMatch(/PRODUCTION/);
      expect(r.out, prod).toMatch(/nothing was run/);
      expect(r.out, prod).not.toMatch(/testPUBLICvalue|testSECRETvalue/);
      expect(r.code, prod).toBe(1);
    }
  }, 60_000);

  it("refuses an unknown project, even when confirmed", () => {
    const r = check(repo({ ".env.staging.local": good.split(REF).join(UNKNOWN) }));
    expect(r.out).toMatch(/not the staging project/);
    expect(r.code).toBe(1);
  }, 30_000);

  it("refuses a missing or wrong confirmation", () => {
    for (const confirm of ["", UNKNOWN, REF.toUpperCase()]) {
      const r = check(repo({ ".env.staging.local": good.replace(`STAGING_CONFIRM_REF=${REF}`, `STAGING_CONFIRM_REF=${confirm}`) }));
      expect(r.out, confirm).toMatch(/CONFIRM/);
      expect(r.code, confirm).toBe(1);
    }
  }, 60_000);

  it("warns when the local site's public URL points anywhere but staging, without printing the value", () => {
    const site = (url: string) => check(repo({ ".env.staging.local": good, ".env.development.local": `NEXT_PUBLIC_SUPABASE_URL=${url}\n` }));
    for (const prod of [CURRENT_PROD, NEW_PROD]) {
      const r = site(`https://${prod}.supabase.co`);
      expect(r.out, prod).toMatch(/\.env\.development\.local points the local site at a PRODUCTION project/);
      expect(r.out, prod).not.toContain(prod);
      expect(r.code, prod).toBe(0); // a warning: the staging test target itself is fine
    }
    for (const url of [`https://${UNKNOWN}.supabase.co`, `https://${REF.toUpperCase()}.supabase.co`, "http://localhost:54321"]) {
      const r = site(url);
      expect(r.out, url).toMatch(/\.env\.development\.local points the local site at a Supabase URL that is not the staging project/);
      expect(r.out, url).not.toContain(url);
      expect(r.code, url).toBe(0);
    }
    const ok = site(`https://${REF}.supabase.co`);
    expect(ok.out).not.toMatch(/points the local site/);
    expect(ok.out).toContain("staging-env: OK");
  }, 120_000);

  it("also warns for a shell NEXT_PUBLIC_SUPABASE_URL that isn't staging", () => {
    const r = check(repo({ ".env.staging.local": good }), { NEXT_PUBLIC_SUPABASE_URL: `https://${NEW_PROD}.supabase.co` });
    expect(r.out).toMatch(/Shell variable NEXT_PUBLIC_SUPABASE_URL points the local site at a PRODUCTION project/);
    expect(r.out).not.toContain(NEW_PROD);
  }, 30_000);

  it("refuses swapped keys", () => {
    const swapped = good.replace(PUBLIC, "TMP").replace(SECRET, PUBLIC).replace("TMP", SECRET);
    const r = check(repo({ ".env.staging.local": swapped }));
    expect(r.out).toMatch(/PUBLIC key slot holds a SECRET/);
    expect(r.out).not.toMatch(/testSECRETvalue|testPUBLICvalue/);
    expect(r.code).toBe(1);
  }, 30_000);
});
