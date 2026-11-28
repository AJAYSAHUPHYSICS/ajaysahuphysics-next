import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The verified-email staging check (scripts/staging/verified-email.staging.mjs)
// talks to the real staging project, so it never runs in CI. These checks keep
// it safe: they fail if it ever writes a launch switch or the deletion gate,
// stores study data, stops checking the switches, uses a non-synthetic account,
// ignores a clean-up error, treats an unconfirmed removal as done, drops the
// leftover-account sweep, or weakens the assertions that make it meaningful.
const ROOT = path.resolve(__dirname, "..", "..", "..");
// Line endings normalised: a Windows checkout (core.autocrlf=true) has CRLF; git and CI have LF.
const src = readFileSync(path.join(ROOT, "scripts", "staging", "verified-email.staging.mjs"), "utf8").replace(/\r\n/g, "\n");
const code = src.replace(/^\s*\/\/.*$/gm, "");
const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
const STUDY = "bookmarks|checklist_items|revision_rounds|mistakes|goals|streaks";
/** The source of one top-level `const name = async (...) => { ... };` helper. */
const helper = (name: string) => {
  const m = new RegExp(`const ${name} = async [\\s\\S]*?\\n\\};\\n`).exec(code);
  expect(m, `helper ${name} not found`).not.toBeNull();
  return m![0];
};
const finallyBlock = code.slice(code.indexOf("} finally {"), code.indexOf("for (const c of checks) console.log"));

describe("verified-email staging check: safety rules", () => {
  it("targets staging only, through the shared guard, and never prints key material unredacted", () => {
    expect(code).toMatch(/import \{ redact, stagingTarget \} from "\.\.\/\.\.\/supabase\/staging\/guard\.mjs"/);
    expect(code).toMatch(/const T = stagingTarget\(env\)/);
    expect(code).toMatch(/createClient\(T\.url, T\.serviceKey/);
    expect(code).not.toMatch(/https:\/\/[a-z0-9]{20}\.supabase\.co/); // no hard-coded project URL
    expect(code).not.toMatch(/sb_(secret|publishable)_|eyJ[A-Za-z0-9_-]{10,}/); // no hard-coded keys
    expect(code).toMatch(/d: redact\(String\(d\), T\)/);
    expect(code).not.toMatch(/console\.log\([^;]*\b(T\.serviceKey|T\.anonKey|T\.sweepSecret|uSession|signIn\.data|access_token|refresh_token|password)\b/);
  });

  it("never writes app_config with the server key; the only app_config write is a student's attempt, which must be refused", () => {
    expect(code).not.toMatch(/admin\s*\.from\(\s*["']app_config["']\s*\)\s*\.(update|upsert|insert|delete)/);
    const writes = code.match(/\.from\(\s*["']app_config["']\s*\)\s*\.(update|upsert|insert|delete)/g) ?? [];
    expect(writes).toHaveLength(1);
    expect(code).toMatch(/V\.c\.from\("app_config"\)\.update\(\{ value: "true" \}\)/);
    expect(code).toMatch(/V: can't change a launch switch/);
  });

  it("refuses to start unless both sync switches and the deletion gate are 'false', and checks them again at the end", () => {
    expect(code).toMatch(/adult_sync_permitted === "false" && c\.minor_sync_permitted === "false" && c\.account_deletion_enabled === "false"/);
    expect(code).toMatch(/if \(!switchesOff\(start\)\)[\s\S]{0,200}process\.exit\(2\)/);
    expect(finallyBlock).toMatch(/check\("end: sync switches and deletion gate still 'false'", switchesOff\(end\)/);
  });

  it("stores no study data: the server key never writes a study table, and every attempted upload must be refused with 0 rows", () => {
    expect(code).not.toMatch(new RegExp(`admin\\s*\\.from\\(\\s*["'](${STUDY})["']\\s*\\)\\s*\\.(insert|upsert|update|delete)`));
    expect(code).toMatch(/error\?\.code === "42501" && \(await count\(t, S\.id\)\) === 0/);
    expect(finallyBlock).toMatch(/check\(`end: \$\{t\} has 0 rows`, !error && n === 0/);
  });

  it("uses synthetic accounts only (admin API, example.com), and sends no email", () => {
    expect(code).toMatch(/const email = `atlas-staging-verified-\$\{tag\}-\$\{RUN\}@example\.com`/);
    expect(code).toMatch(/admin\.auth\.admin\.createUser\(\{ email, password, email_confirm: confirmed \}\)/);
    expect(code).toMatch(/password = randomBytes\(15\)/);
    expect(code).toMatch(/created\.push\(\{ id: data\.user\.id, tag \}\)/); // recorded right after creation, before sign-in
    expect(code.indexOf("created.push(")).toBeLessThan(code.indexOf("signInWithPassword"));
    expect(code).not.toMatch(/inviteUserByEmail|generateLink|resetPasswordForEmail|signUp\(|signInWithOtp|resend\(/);
    expect(code).not.toMatch(/updateUser\(\{[^}]*\b(email|password|phone)\s*:/); // the metadata write changes no address
  });

  it("is wired as its own npm script and never runs the old suite or opens a gate", () => {
    expect(pkg.scripts["test:staging:verified-email"]).toBe("node scripts/staging/staging-env.mjs check && node scripts/staging/verified-email.staging.mjs");
    expect(code).not.toMatch(/journey\.staging|test:staging["'\s]|staging-env\.mjs run/);
    expect(code).not.toMatch(/account_deletion_enabled["']?\s*[,:]\s*["']true/);
  });
});

describe("verified-email staging check: clean-up (fixes 1-3)", () => {
  it("1. attempts purge_user_data and deleteUser separately for every account, checking each returned error", () => {
    // Both loops must walk every account this run created: the clean-up loop and the removal check.
    expect(finallyBlock).toMatch(/for \(const \{ id, tag \} of created\) \{\s*await attempt\(`cleanup: purge_user_data for \$\{tag\}`/);
    expect(finallyBlock).toMatch(/for \(const \{ id, tag \} of created\) \{\s*await attempt\(`end: \$\{tag\} removal confirmed`/);
    expect(finallyBlock).toMatch(/await attempt\(`cleanup: purge_user_data for \$\{tag\}`, async \(\) => \{\s*const \{ data: n, error \} = await admin\.rpc\("purge_user_data", \{ target: id \}\);\s*check\(`cleanup: purge_user_data for \$\{tag\}`, !error,/);
    expect(finallyBlock).toMatch(/await attempt\(`cleanup: deleteUser for \$\{tag\}`, async \(\) => \{\s*const \{ error \} = await admin\.auth\.admin\.deleteUser\(id\);\s*check\(`cleanup: deleteUser for \$\{tag\}`, !error,/);
  });

  it("1. never calls a clean-up action without capturing its result", () => {
    expect(code).not.toMatch(/(^|[;{}]\s*)await admin\.rpc\("purge_user_data"/m);
    expect(code).not.toMatch(/(^|[;{}]\s*)await admin\.auth\.admin\.deleteUser\(/m);
    expect((code.match(/admin\.auth\.admin\.deleteUser\(/g) ?? [])).toHaveLength(1); // only the per-account clean-up deletes
    expect((code.match(/admin\.rpc\("purge_user_data"/g) ?? [])).toHaveLength(1);
  });

  it("1. an exception in one step becomes a failed check and never skips the later steps or the report", () => {
    expect(code).toMatch(/const attempt = async \(n, fn\) => \{ try \{ await fn\(\); \} catch \(e\) \{ check\(n, false, e\?\.message \?\? String\(e\)\); \} \};/);
    for (const step of ["end: sync switches and deletion gate still 'false'", "end: ${tag} removal confirmed", "end: no account from this run remains (Auth user list)", "end: ${t} has 0 rows"]) {
      expect(finallyBlock, step).toContain(`await attempt(${step.includes("${") ? "`" : '"'}${step}`);
    }
    expect(code).toMatch(/process\.exit\(failed \|\| checks\.some\(\(c\) => !c\.ok\) \? 1 : 0\)/); // any unverified step exits non-zero
    expect(code.indexOf("for (const c of checks) console.log")).toBeGreaterThan(code.indexOf("} finally {")); // the report prints after clean-up
  });

  it("2. removal is confirmed only by no user without an error, or an explicit not-found", () => {
    const h = helper("removalConfirmed");
    expect(h).toMatch(/if \(!error\) return \{ ok: !data\?\.user,/);
    expect(h).toMatch(/if \(error\.status === 404 \|\| error\.code === "user_not_found"\) return \{ ok: true,/);
    expect(h).toMatch(/return \{ ok: false, d: `not confirmed:/);
    expect(h.match(/ok: true/g) ?? []).toHaveLength(1);
    expect(finallyBlock).toMatch(/const r = await removalConfirmed\(id\);\s*check\(`end: \$\{tag\} removal confirmed`, r\.ok, r\.d\)/);
  });

  it("3. lists Auth users and fails if any address from this run remains; a failed or partial list is not verified", () => {
    expect(code).toMatch(/const RUN_EMAIL = new RegExp\(`\^atlas-staging-verified-\[a-z\]\+-\$\{RUN\}@example\\\\\.com\$`\)/);
    const h = helper("runAccountsLeft");
    expect(h).toMatch(/admin\.auth\.admin\.listUsers\(\{ page, perPage \}\)/);
    expect(h).toMatch(/if \(error\) return \{ ok: false,/);
    expect(h).toMatch(/if \(RUN_EMAIL\.test\(u\.email \?\? ""\)\) found\.push\(u\.email\)/);
    expect(h).toMatch(/return \{ ok: found\.length === 0,/);
    expect(h).toMatch(/return \{ ok: false, d: "user list not fully read/);
    expect(h).not.toMatch(/delete|purge/i); // detection only
    expect(finallyBlock).toMatch(/const r = await runAccountsLeft\(\);\s*check\("end: no account from this run remains \(Auth user list\)", r\.ok, r\.d\)/);
  });
});

describe("verified-email staging check: the assertions stay meaningful", () => {
  it("U is created unconfirmed and must be refused at sign-in, with no session", () => {
    expect(code).toMatch(/createSynthetic\("u", false\)/);
    expect(code).toMatch(/!uRec\.user\.email_confirmed_at/);
    expect(code).toMatch(/!uSession && !!U\.signIn\.error && \(U\.signIn\.error\.code === "email_not_confirmed"/);
  });

  it("4. if U gets a session, its metadata write is confirmed through the admin API before the fallback assertions run", () => {
    expect(code).toMatch(/const \{ error: mdE \} = await U\.c\.auth\.updateUser\(\{ data: \{ email_verified: true \} \}\)/);
    expect(code).toMatch(/check\("U \(session issued\): updateUser\(\) accepted the self-declared email_verified", !mdE/);
    expect(code).toMatch(/const \{ data: uMd, error: uMdE \} = await admin\.auth\.admin\.getUserById\(U\.id\)/);
    expect(code).toMatch(/const mdSet = !mdE && !uMdE && uMd\?\.user\?\.user_metadata\?\.email_verified === true;/);
    expect(code).toMatch(/check\("U \(session issued\): admin read-back shows user_metadata\.email_verified === true", mdSet/);
    expect(code).toMatch(/if \(mdSet\) \{[\s\S]*uEv2 === false[\s\S]*\} else \{\s*check\("U \(session issued\): remaining fallback checks not run[^"]*", false\)/);
  });

  it("if U gets a session, the database gate is checked with it", () => {
    expect(code).toMatch(/if \(uSession\) \{/);
    expect(code).toMatch(/U \(session issued\): email_verified\(\) is false", uEv === false/);
    expect(code).toMatch(/uEn === "email-not-verified"/);
    expect(code).toMatch(/uAllowed === false/);
    expect(code).toMatch(/uploadsRefused\(U, "U \(session issued\)"\)/);
  });

  it("5. claims no staging evidence for unverified reads: no empty-table read checks, and the gap is stated", () => {
    expect(code).not.toMatch(/reads nothing from/);
    expect(code).not.toMatch(/U\.c\.from\([^)]*\)\.select/);
    expect(code).toMatch(/console\.log\("NOT VERIFIED by this staging test: an authenticated unverified user's reads of the study tables/);
    expect(src).toMatch(/NOT VERIFIED by this staging test: an authenticated UNVERIFIED user's reads/);
  });

  it("V is created confirmed, is trusted as recorded, passes the email gate, and is stopped only by the switch", () => {
    expect(code).toMatch(/createSynthetic\("v", true\)/);
    expect(code).toMatch(/vEv === true && !vEvE/);
    expect(code).toMatch(/vEn === "not-available-yet"/);
    expect(code).toMatch(/vAllowed === false/);
    expect(code).toMatch(/vEn2 === "not-available-yet"/);
  });

  it("V's bypass attempts are all asserted as refused", () => {
    expect(code).toMatch(/V\.c\.from\("profiles"\)\.update\(\{ sync_enabled: true \}\)/);
    expect(code).toMatch(/pv\?\.sync_enabled === false/);
    expect(code).toMatch(/uploadsRefused\(V, "V"\)/);
    expect(code).toMatch(/kind: "parental", version, granted: true, method: "parent-verified"/);
    expect(code).toMatch(/V: can't record a parental or parent-verified consent", !!parental/);
  });

  it("anon can't call email_verified()", () => {
    expect(code).toMatch(/anon\.rpc\("email_verified"\)/);
    expect(code).toMatch(/anonymous: email_verified\(\) refused", !!anonEv/);
  });
});
