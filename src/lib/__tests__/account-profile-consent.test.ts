import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  CONSENT_VERSION, PROFILE_COLUMNS, SELF_CONSENT_KINDS,
  consentChanges, consentsComplete, currentConsents, profileRow,
  type ConsentRecord,
} from "@/lib/account/profile-consent";

// The account page's profile and consent forms (src/app/account/AccountClient.tsx)
// write only what this module builds. These tests check that module against the
// real migrations. Owner decisions (2026-11-26): no age limit, so the forms never
// ask for an age band; no Terms of Use consent, because no such document exists yet.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const MIGRATIONS = readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort();
const FIRST = read("supabase", "migrations", "20261120000000_student_accounts.sql");
// The database's age-free eligibility arrives with PR #25 (migration 20261126000000).
// Until then the end-to-end eligibility test below is skipped, never inverted.
const AGE_FREE = MIGRATIONS.includes("20261126000000_remove_age_restrictions.sql");
const S = "00000000-0000-4000-8000-0000000000c1";

describe("profileRow", () => {
  const base = { displayName: "", classLevel: "", examTargets: [] as string[] };

  it("every field is optional: an empty form is a valid profile, with no age", () => {
    expect(profileRow(base)).toEqual({ ok: true, row: { display_name: null, class_level: null, exam_targets: [] } });
  });

  it("trims the name, converts the class, and orders and de-duplicates exam targets", () => {
    const r = profileRow({ displayName: "  Asha  ", classLevel: "12", examTargets: ["neet", "boards", "neet"] });
    expect(r).toEqual({ ok: true, row: { display_name: "Asha", class_level: 12, exam_targets: ["boards", "neet"] } });
  });

  it("refuses what the table's check constraints would refuse", () => {
    for (const bad of [{ ...base, classLevel: "10" }, { ...base, examTargets: ["cbse"] }, { ...base, displayName: "x".repeat(61) }]) {
      expect(profileRow(bad).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("never produces an age band or any column a student can't write", () => {
    const r = profileRow({ displayName: "A", classLevel: "11", examTargets: ["jee-main"] });
    expect(r.ok && Object.keys(r.row).sort()).toEqual([...PROFILE_COLUMNS].sort());
    expect(PROFILE_COLUMNS).not.toContain("age_band");
  });
});

describe("consents", () => {
  const rec = (kind: string, granted: boolean, recorded_at: string, id: number, version = CONSENT_VERSION): ConsentRecord => ({ kind, version, granted, recorded_at, id });

  it("only the privacy acknowledgement and the cloud-copy consent are asked for: no terms, never parental", () => {
    expect([...SELF_CONSENT_KINDS]).toEqual(["privacy", "cloud-sync"]);
  });

  it("takes the latest decision per kind for the current version, as public.latest_consent does", () => {
    const state = currentConsents([
      rec("privacy", false, "2026-11-25T10:00:00Z", 3),
      rec("privacy", true, "2026-11-25T10:00:00Z", 4), // same time: the higher id wins
      rec("cloud-sync", true, "2026-11-25T09:00:00Z", 5),
      rec("cloud-sync", false, "2026-11-25T11:00:00Z", 6),
      rec("cloud-sync", true, "2026-11-25T12:00:00Z", 7, "2025-old"), // another version doesn't count
      rec("terms", true, "2026-11-25T12:00:00Z", 8), // no longer asked for, so ignored
    ]);
    expect(state).toEqual({ privacy: true, "cloud-sync": false });
    expect(consentsComplete(state)).toBe(false);
  });

  it("compares timestamps as instants, not text: offsets and fractional seconds don't change the order", () => {
    const state = currentConsents([
      rec("privacy", true, "2026-11-25T10:00:00.5+00:00", 1),
      rec("privacy", false, "2026-11-25T15:29:59+05:30", 2), // 09:59:59Z, earlier, though it sorts later as text
    ]);
    expect(state.privacy).toBe(true);
  });

  it("appends only the decisions that changed, never a parental consent and never a method", () => {
    const rows = consentChanges({ privacy: null, "cloud-sync": true }, { privacy: true, "cloud-sync": false });
    expect(rows).toEqual([{ kind: "privacy", version: CONSENT_VERSION, granted: true }, { kind: "cloud-sync", version: CONSENT_VERSION, granted: false }]);
    for (const r of rows) expect(Object.keys(r).sort()).toEqual(["granted", "kind", "version"]);
  });
});

describe("drift guards against the migrations", () => {
  it("CONSENT_VERSION matches the consent_version the database checks", () => {
    expect(FIRST).toMatch(new RegExp(`\\('consent_version', '${CONSENT_VERSION}'\\)`));
  });

  it("PROFILE_COLUMNS are among the profile columns granted to authenticated for insert and update", () => {
    for (const op of ["insert", "update"]) {
      const m = FIRST.match(new RegExp(`grant ${op} \\(([^)]+)\\) on public\\.profiles to authenticated`));
      expect(m, op).not.toBeNull();
      const granted = m![1].split(",").map((s) => s.trim());
      for (const c of PROFILE_COLUMNS) expect(granted, `${op} ${c}`).toContain(c);
    }
  });
});

describe("the forms' writes against the real migrations (PGlite)", () => {
  let db: PGlite;
  async function as(role: "authenticated" | "postgres", sub?: string) {
    await db.exec("reset role");
    await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
    if (role !== "postgres") await db.exec(`set role ${role}`);
  }
  const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<Record<string, T>>(sql, params)).rows[0];
  const enableSync = async () => (await one<string>("select public.enable_sync() as r")).r;
  async function writeProfile(input: Parameters<typeof profileRow>[0], mode: "insert" | "update") {
    const r = profileRow(input);
    if (!r.ok) throw new Error(r.errors.join(" "));
    const cols = Object.keys(r.row);
    const vals = cols.map((c) => (r.row as Record<string, unknown>)[c]);
    const param = (c: string, i: number) => (c === "exam_targets" ? `$${i + 1}::text[]` : `$${i + 1}`);
    if (mode === "insert") await db.query(`insert into public.profiles (${cols.join(", ")}) values (${cols.map(param).join(", ")})`, vals);
    else await db.query(`update public.profiles set ${cols.map((c, i) => `${c} = ${param(c, i)}`).join(", ")} where user_id = $${cols.length + 1}`, [...vals, S]);
  }
  async function writeConsents(wanted: Record<(typeof SELF_CONSENT_KINDS)[number], boolean>) {
    const records = (await db.query<ConsentRecord>("select id::int as id, kind, version, granted, recorded_at::text as recorded_at from public.consents where user_id = $1", [S])).rows;
    for (const row of consentChanges(currentConsents(records), wanted)) await db.query("insert into public.consents (kind, version, granted) values ($1, $2, $3)", [row.kind, row.version, row.granted]);
  }

  beforeAll(async () => {
    db = new PGlite();
    await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
    for (const f of MIGRATIONS) await db.exec(read("supabase", "migrations", f));
    await db.query("insert into auth.users (id, email) values ($1, 'student@example.test')", [S]);
  }, 60_000);
  afterAll(async () => db?.close());

  it("an empty profile form creates the profile; an update of every field is allowed; no age band is ever stored", async () => {
    await as("authenticated", S);
    expect(await enableSync()).toBe("no-profile");
    await writeProfile({ displayName: "", classLevel: "", examTargets: [] }, "insert");
    await writeProfile({ displayName: "Asha", classLevel: "12", examTargets: ["boards", "jee-main"] }, "update");
    const p = await one<string | null>("select display_name, class_level::text, array_to_string(exam_targets, ',') as t, age_band from public.profiles");
    expect(p).toMatchObject({ display_name: "Asha", class_level: "12", t: "boards,jee-main", age_band: null });
  });

  it("consent choices are appended; re-saving unchanged choices appends nothing", async () => {
    await as("authenticated", S);
    await writeConsents({ privacy: true, "cloud-sync": true });
    const n = Number((await one<number>("select count(*)::int as n from public.consents")).n);
    expect(n).toBe(2);
    await writeConsents({ privacy: true, "cloud-sync": true });
    expect(Number((await one<number>("select count(*)::int as n from public.consents")).n)).toBe(n);
    expect((await db.query("select 1 from public.consents where kind = 'terms'")).rows).toHaveLength(0);
  });

  it.runIf(AGE_FREE)("with #25's migrations: the forms' writes alone make a student of any age eligible, apart from the launch switch", async () => {
    await as("authenticated", S);
    expect(await enableSync()).toBe("not-available-yet"); // profile + privacy + cloud-sync; no age band, no terms
    await as("postgres");
    await db.query("update public.app_config set value = 'true' where key = 'adult_sync_permitted'");
    try {
      await as("authenticated", S);
      expect(await enableSync()).toBe("enabled");
    } finally {
      await as("postgres");
      await db.query("update public.app_config set value = 'false' where key = 'adult_sync_permitted'");
      await db.query("select set_config('request.jwt.claims', '', false)");
      await db.query("update public.profiles set sync_enabled = false where user_id = $1", [S]);
    }
  });

  it("withdrawing the cloud-copy consent is recorded as a new row and blocks sync; disable_sync() is callable", async () => {
    await as("authenticated", S);
    await writeConsents({ privacy: true, "cloud-sync": false });
    expect(await enableSync()).not.toBe("enabled");
    expect((await one<boolean>("select public.sync_allowed() as ok")).ok).toBe(false);
    await db.query("select public.disable_sync()");
    expect((await one<boolean>("select sync_enabled as s from public.profiles")).s).toBe(false);
    const latest = await one<boolean>("select granted as g from public.consents where kind = 'cloud-sync' order by recorded_at desc, id desc limit 1");
    expect(latest.g).toBe(false);
  });

  it("the forms can't be used to write what only the server may write", async () => {
    await as("authenticated", S);
    const err = async (sql: string, params: unknown[] = []) => { try { await db.query(sql, params); return ""; } catch (e) { return (e as Error).message; } };
    expect(await err("update public.profiles set sync_enabled = true")).toMatch(/permission denied|can only change/);
    expect(await err("insert into public.consents (kind, version, granted) values ('parental', $1, true)", [CONSENT_VERSION])).toMatch(/row-level security|violates/);
    expect(await err("insert into public.consents (kind, version, granted, method) values ('privacy', $1, true, 'parent-verified')", [CONSENT_VERSION])).toMatch(/row-level security|violates/);
    await as("postgres");
  });
});

describe("account page wiring", () => {
  const src = read("src", "app", "account", "AccountClient.tsx");

  it("profile and consent forms stay dormant with the code switch off, and need the account database", () => {
    expect(src).toMatch(/const accountRecords = CLOUD_SYNC_ENABLED && cloudReady === true && userId !== null;/);
    expect(src).toMatch(/\{accountRecords \? \(\s*<section className=\{card\} aria-labelledby="acct-profile"/);
    expect(src).toMatch(/\{accountRecords \? \(\s*<section className=\{card\} aria-labelledby="acct-consent"/);
  });

  it("writes profiles only from profileRow() and consents only from consentChanges()", () => {
    expect(src).toMatch(/from\("profiles"\)\.update\(r\.row\)/);
    expect(src).toMatch(/from\("profiles"\)\.insert\(r\.row\)/);
    expect(src).toMatch(/const rows = consentChanges\(consents, wanted\);[\s\S]*from\("consents"\)\.insert\(rows\)/);
    expect(src.match(/from\("(profiles|consents)"\)\.(insert|update|upsert)/g)).toHaveLength(3);
  });

  it("students can turn cloud copies off; withdrawing the cloud-copy consent turns them off AND deletes the cloud copy (decision J)", () => {
    expect(src.match(/rpc\("disable_sync"\)/g)?.length).toBe(1); // "Turn off cloud copies" keeps the copy
    expect(src).toMatch(/onClick=\{disableSync\}>Turn off cloud copies</);
    // A withdrawal is detected only when a granted cloud-copy consent is withdrawn. withdrawCloudCopy() then runs
    // begin_cloud_withdrawal() BEFORE it records the rows (it is handed the insert), then deletes the copy.
    // Without a withdrawal, the rows are inserted directly.
    expect(src).toMatch(/const withdrawing = consents\["cloud-sync"\] === true && rows\.some\(\(r\) => r\.kind === "cloud-sync" && !r\.granted\);/);
    expect(src).toMatch(/const insert = \(\) => client\.from\("consents"\)\.insert\(rows\);\s*const withdrawal = withdrawing \? await withdrawCloudCopy\(supabase, window\.localStorage, insert\) : null;\s*const error = withdrawal \? withdrawal\.recordError : \(await insert\(\)\)\.error;/);
    expect(src.slice(src.indexOf("async function saveConsents"), src.indexOf("async function deleteCloudCopy")).match(/insert\(\)/g)).toHaveLength(1); // never twice
    // The notice comes only from withdrawalNotice(), which claims deletion only on the server's confirmation.
    expect(src).toMatch(/setNotice\(withdrawalNotice\(withdrawal\)/);
    expect(src).toMatch(/setNotice\(withdrawalNotice\(r\)\)/);
    // A retry is always offered after an unconfirmed deletion, and whenever the latest decision is a withdrawal.
    expect(src).toMatch(/setRetryWithdrawal\(withdrawalOutcome\(withdrawal\) === "deletion-failed-retry"\)/);
    expect(src).toMatch(/setRetryWithdrawal\(withdrawalOutcome\(r\) === "deletion-failed-retry"\)/);
    expect(src).toMatch(/\{consents\["cloud-sync"\] === false \|\| retryWithdrawal \? \(\s*<button[^>]*onClick=\{deleteCloudCopy\}>Delete my cloud copy<\/button>/);
    // Never the browser's progress: no device-data removal anywhere in the withdrawal path.
    const withdrawalCode = src.slice(src.indexOf("async function saveConsents"), src.indexOf("async function disableSync"));
    expect(withdrawalCode).not.toMatch(/removeDeviceData|localStorage\.(removeItem|clear|setItem)/);
  });

  it("distinguishes the error states, and claims success only after the server confirmed it (owner review, task 4)", () => {
    // Turning cloud copies back on after a withdrawal: "fresh consent required", from the server's own answer.
    expect(src).toMatch(/const \{ data, error \} = await supabase\.rpc\("enable_sync"\);\s*setBusy\(false\);[\s\S]*?const fresh = reactivationNotice\(\{ data, error \}, consents\["cloud-sync"\]\);\s*setNotice\(fresh \?\? /);
    // A consent change refused by the daily allowance gets its own message.
    expect(src).toMatch(/isConsentLimitError\(error\) \? CONSENT_LIMIT_NOTICE : "We couldn't record your choices\. Please try again\."/);
    // "Your choices are recorded." only on the branch where the insert returned no error.
    expect(src).toMatch(/\} else if \(error\) \{[\s\S]*?\} else \{\s*setNotice\("Your choices are recorded\."\);/);
    // Every notice in the withdrawal and enable paths is set after its server call returned.
    const paths: [string, string][] = [["async function saveConsents", "async function deleteCloudCopy"], ["async function deleteCloudCopy", "async function disableSync"], ["async function enableSync", "async function deleteAccount"]];
    for (const [from, to] of paths) {
      const code = src.slice(src.indexOf(from), src.indexOf(to));
      const firstAwait = code.search(/await (supabase|withdrawCloudCopy)/);
      expect(firstAwait, from).toBeGreaterThan(0);
      const early = [...code.matchAll(/setNotice\(/g)].filter((m) => (m.index ?? 0) < firstAwait && !code.startsWith('setNotice("Nothing changed.")', m.index ?? 0));
      expect(early, `${from}: a notice before the server answered`).toEqual([]);
    }
  });

  it("the cloud-copy label says what is copied and what a withdrawal does (decision J, option B)", () => {
    expect(src).toContain('"cloud-sync": "Keep a copy of my bookmarks, chapter checklist, revision rounds, mistakes, goals and study streak with my account (cloud copies). I can withdraw this at any time: uploads stop, the copy stored with my account is deleted, and the progress saved in this browser stays here.",');
  });

  it("no age question, no age-based message, no terms consent, and the privacy notice is called a draft", () => {
    expect(src).not.toMatch(/age_band|ageBand|AGE_BANDS|under-18|Under 18|under 18|age-band-required|not-available-for-under-18|parental-consent-required/);
    expect(src).not.toMatch(/^\s*terms:\s*"/m); // no terms label in CONSENT_LABELS
    expect(src).not.toMatch(/accept the terms/i);
    expect(src).toMatch(/privacy: "I have read the privacy notice\. It is a draft, pending legal review\."/);
  });
});
