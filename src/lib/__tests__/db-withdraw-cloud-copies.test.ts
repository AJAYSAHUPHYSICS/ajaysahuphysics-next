import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CLOUD_COPY_TABLES } from "@/lib/account/cloud-withdrawal";

// Owner decision J, option B (2026-11-27): withdrawing cloud-copy consent deletes
// the cloud copy, fail-closed, and in-flight uploads can't recreate it. Migration
// 20261127000000; these tests run every migration in supabase/migrations
// (1–5 on its own, or 1–7 once #25 is in the tree).
// PGlite has ONE session, so the two orderings of an upload and a withdrawal are
// run one after the other here. The truly concurrent interleaving (an upload whose
// snapshot predates a withdrawal that commits while it waits) needs two sessions:
// db-withdraw-concurrency.test.ts runs it against a real local PostgreSQL.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const WITHDRAW = "20261127000000_withdraw_cloud_copies.sql";
const MIGRATION = read("supabase", "migrations", WITHDRAW);
const files = readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort();
const ZERO = Object.fromEntries(CLOUD_COPY_TABLES.map((t) => [t, 0]));

const S = "00000000-0000-4000-8000-0000000000d1"; // the student who withdraws
const O = "00000000-0000-4000-8000-0000000000d2"; // another student, never touched
const C = "00000000-0000-4000-8000-0000000000d3"; // the row-cap student
const F = "00000000-0000-4000-8000-0000000000d4"; // the failed-insert student

let db: PGlite;
async function as(role: "authenticated" | "anon" | "postgres", sub?: string) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
  if (role !== "postgres") await db.exec(`set role ${role}`);
}
const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<Record<string, T>>(sql, params)).rows[0];
const count = async (sql: string, params: unknown[] = []) => Number((await one<number>(sql, params)).n);
async function fails(sql: string, params: unknown[] = []) {
  try { await db.query(sql, params); return ""; } catch (e) { return (e as Error).message; }
}
type Withdrawal = { withdrawn: boolean; withdrawal_recorded: boolean; deleted: Record<string, number> };
const withdraw = async () => (await one<Withdrawal>("select public.withdraw_cloud_copies() as r")).r;
const enableSync = async () => (await one<string>("select public.enable_sync() as r")).r;
const syncAllowed = async () => (await one<boolean>("select public.sync_allowed() as ok")).ok;
/** The current notice version, read once as the owner (students can't read app_config). */
let VERSION = "";
const grant = (kind: string, granted = true) => db.query("insert into public.consents (kind, version, granted) values ($1, $2, $3)", [kind, VERSION, granted]);
async function profile(sub: string) {
  await as("postgres");
  return (await db.query<{ sync_enabled: boolean; marker: string | null }>("select sync_enabled, cloud_copy_withdrawn_at::text as marker from public.profiles where user_id = $1", [sub])).rows[0];
}

/** The student's own rows in the six cloud-copy tables, counted as the owner. */
async function cloudRows(sub: string) {
  await as("postgres");
  const out: Record<string, number> = {};
  for (const t of CLOUD_COPY_TABLES) out[t] = await count(`select count(*)::int as n from public.${t} where user_id = $1`, [sub]);
  return out;
}
/** One upload per cloud-copy table, as the signed-in student. Returns "" (stored) or the error code, per table. */
async function upload(sub: string, tag: string) {
  await as("authenticated", sub);
  const now = new Date().toISOString();
  const rows: Record<string, [string, unknown[]]> = {
    bookmarks: ["insert into public.bookmarks (bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1, '11', 'kinematics', 'chapter', 'K', 'K', '/class-11/kinematics', $2)", [`b:${tag}`, now]],
    checklist_items: ["insert into public.checklist_items (cls, slug, item, done) values ('11', $1, 'notes', true)", [`slug-${tag}`]],
    revision_rounds: ["insert into public.revision_rounds (cls, slug, round, completed_at) values ('11', $1, 1, $2)", [`slug-${tag}`, now]],
    mistakes: ["insert into public.mistakes (id, cls, slug, chapter_name, resource_type, concept_tag, difficulty, created_at) values (gen_random_uuid(), '11', 'kinematics', 'K', 'dpp', $1, 'easy', $2)", [tag, now]],
    goals: ["insert into public.goals (goal_type, activated_at) values ($1, $2)", [`goal-${tag}`, now]],
    streaks: ["insert into public.streaks (current_days, longest_days) values (1, 2) on conflict (user_id) do update set current_days = excluded.current_days", []],
  };
  const codes: Record<string, string> = {};
  for (const t of CLOUD_COPY_TABLES) {
    try { await db.query(rows[t][0], rows[t][1]); codes[t] = ""; } catch (e) { codes[t] = (e as { code?: string }).code ?? (e as Error).message; }
  }
  await as("postgres");
  return codes;
}
const allStored = (c: Record<string, string>) => Object.values(c).every((x) => x === "");
const allRefused = (c: Record<string, string>) => Object.values(c).every((x) => x === "42501");
/** A student with a profile, full consent and cloud copies on, then one row in each cloud-copy table. */
async function syncingStudent(sub: string, tag: string) {
  await as("authenticated", sub);
  if (!(await one<boolean>("select exists (select 1 from public.profiles where user_id = $1) as e", [sub])).e) {
    await db.query("insert into public.profiles (display_name, age_band) values ('Synthetic', '18-plus')");
  }
  for (const kind of ["terms", "privacy", "cloud-sync"]) await grant(kind);
  expect(await enableSync()).toBe("enabled");
  expect(allStored(await upload(sub, tag))).toBe(true); // positive control: uploads work first
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
  // Like Supabase: new functions in public are executable by anon and authenticated by default,
  // so the migration's own revokes are what keep them out (plain Postgres only grants PUBLIC).
  await db.exec("alter default privileges in schema public grant execute on functions to anon, authenticated");
  for (const f of files) await db.exec(read("supabase", "migrations", f));
  await db.query("insert into auth.users (id, email) values ($1, 's@example.test'), ($2, 'o@example.test'), ($3, 'c@example.test'), ($4, 'f@example.test')", [S, O, C, F]);
  await db.query("update public.app_config set value = 'true' where key = 'adult_sync_permitted'"); // test DB only
  VERSION = (await one<string>("select value as v from public.app_config where key = 'consent_version'")).v;
  await syncingStudent(S, "s1");
  await syncingStudent(O, "o1");
}, 60_000);
afterAll(async () => db?.close());

describe("the migration: objects, privileges and triggers", () => {
  it("is present and comes after every earlier migration", () => {
    expect(files).toContain(WITHDRAW);
    expect(files[files.length - 1]).toBe(WITHDRAW);
  });

  it("the functions that touch other rows are security definer with an empty search_path; the upload guard runs as the caller", async () => {
    await as("postgres");
    for (const fn of ["withdraw_cloud_copies()", "begin_cloud_withdrawal()", "atlas_upload_lock()", "atlas_withdrawal_guard()"]) {
      expect(await one<string>("select prosecdef::text as d, array_to_string(proconfig, ',') as c from pg_proc where oid = $1::regprocedure", [`public.${fn}`]), fn).toEqual({ d: "true", c: 'search_path=""' });
    }
    expect(await one<string>("select prosecdef::text as d, array_to_string(proconfig, ',') as c from pg_proc where oid = 'public.atlas_upload_guard()'::regprocedure")).toEqual({ d: "false", c: 'search_path=""' });
    expect((await one<string>("select provolatile as v from pg_proc where oid = 'public.atlas_upload_lock()'::regprocedure")).v).toBe("v"); // fresh snapshot
  });

  it("EXECUTE: the two withdrawal steps and the upload lock for signed-in students only; never anon or PUBLIC; trigger functions for no client", async () => {
    await as("postgres");
    const can = async (role: string, fn: string) => (await one<boolean>("select has_function_privilege($1, $2, 'execute') as ok", [role, `public.${fn}`])).ok;
    const isPublic = async (fn: string) => (await one<boolean>("select exists (select 1 from pg_proc p, aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a where p.oid = $1::regprocedure and a.grantee = 0) as pub", [`public.${fn}`])).pub;
    for (const fn of ["withdraw_cloud_copies()", "begin_cloud_withdrawal()", "atlas_upload_lock()"]) {
      expect(await can("authenticated", fn), fn).toBe(true);
      expect(await can("anon", fn), fn).toBe(false);
      expect(await isPublic(fn), fn).toBe(false);
    }
    for (const fn of ["atlas_upload_guard()", "atlas_withdrawal_guard()"]) {
      expect(await can("authenticated", fn), fn).toBe(false);
      expect(await can("anon", fn), fn).toBe(false);
      expect(await isPublic(fn), fn).toBe(false);
    }
  });

  it("no function takes a user id, so a client can't name another student", async () => {
    await as("postgres");
    for (const name of ["withdraw_cloud_copies", "begin_cloud_withdrawal", "atlas_upload_lock"]) {
      expect((await db.query<{ n: number }>("select pronargs::int as n from pg_proc where proname = $1", [name])).rows, name).toEqual([{ n: 0 }]);
    }
  });

  it("each of the six tables has a statement-level BEFORE INSERT OR UPDATE upload guard (it runs before any row is locked)", async () => {
    await as("postgres");
    for (const t of CLOUD_COPY_TABLES) {
      // tgtype bits: 1 = row-level, 2 = BEFORE, 4 = INSERT, 16 = UPDATE.
      const g = await one<number>("select tgtype::int as t from pg_trigger where tgrelid = $1::regclass and tgname = $2 and tgfoid = 'public.atlas_upload_guard()'::regprocedure", [`public.${t}`, `${t}_upload_guard`]);
      expect(g?.t, t).toBe(2 | 4 | 16);
    }
    const p = await one<number>("select tgtype::int as t from pg_trigger where tgrelid = 'public.profiles'::regclass and tgname = 'profiles_withdrawal_guard'");
    expect(p.t).toBe(1 | 2 | 16); // row-level BEFORE UPDATE
  });

  it("the lock is FOR SHARE on the caller's own profile row; the withdrawal's first statement locks that row before any deletion", () => {
    expect(MIGRATION).toMatch(/select p\.sync_enabled into ok from public\.profiles p where p\.user_id = auth\.uid\(\) for share;/);
    const body = MIGRATION.slice(MIGRATION.indexOf("create function public.withdraw_cloud_copies()"));
    expect(body.indexOf("update public.profiles set sync_enabled = false, cloud_copy_withdrawn_at = now() where user_id = me;")).toBeLessThan(body.indexOf("delete from public.bookmarks"));
    expect(MIGRATION).toMatch(/if current_user = 'authenticated' and not public\.atlas_upload_lock\(\) then/);
  });

  it("students can't write the withdrawal marker", async () => {
    await as("postgres");
    for (const priv of ["INSERT", "UPDATE"]) {
      expect((await one<boolean>("select has_column_privilege('authenticated', 'public.profiles', 'cloud_copy_withdrawn_at', $1) as ok", [priv])).ok, priv).toBe(false);
    }
    await as("authenticated", S);
    expect(await fails("update public.profiles set cloud_copy_withdrawn_at = null")).toMatch(/permission denied/);
  });
});

describe("unauthenticated calls", () => {
  it("anon is refused, and a call with no signed-in student changes nothing", async () => {
    const before = await cloudRows(S);
    for (const fn of ["withdraw_cloud_copies", "begin_cloud_withdrawal"]) {
      await as("anon");
      expect(await fails(`select public.${fn}()`), fn).toMatch(/permission denied/);
      await as("authenticated"); // the role, but no JWT subject
      expect(await fails(`select public.${fn}()`), fn).toMatch(/not signed in/);
    }
    expect(await cloudRows(S)).toEqual(before);
    expect((await profile(S)).marker).toBeNull();
  });
});

describe("a withdrawal", () => {
  let consentsBefore: { id: number; kind: string; granted: boolean }[];
  let otherBefore: { rows: Record<string, number>; consents: number; sync: boolean };
  let logBefore: number;
  let result: Withdrawal;
  let rowsBefore: Record<string, number>;

  beforeAll(async () => {
    await as("postgres");
    consentsBefore = (await db.query<{ id: number; kind: string; granted: boolean }>("select id::int as id, kind, granted from public.consents where user_id = $1 order by id", [S])).rows;
    otherBefore = {
      rows: await cloudRows(O),
      consents: await count("select count(*)::int as n from public.consents where user_id = $1", [O]),
      sync: (await profile(O)).sync_enabled,
    };
    logBefore = await count("select count(*)::int as n from public.deletion_log");
    rowsBefore = await cloudRows(S);
    expect(Object.values(rowsBefore).every((n) => n === 1)).toBe(true);
    await as("authenticated", S);
    result = await withdraw();
  });

  it("1. stops uploads: sync off, the marker set, sync_allowed() false, every upload refused", async () => {
    const p = await profile(S);
    expect(p.sync_enabled).toBe(false);
    expect(p.marker).not.toBeNull();
    await as("authenticated", S);
    expect(await syncAllowed()).toBe(false);
    expect(allRefused(await upload(S, "after"))).toBe(true);
  });

  it("2. deletes the existing cloud copy, in all six tables, and reports exactly what it deleted", async () => {
    expect(await cloudRows(S)).toEqual(ZERO);
    expect(result).toEqual({ withdrawn: true, withdrawal_recorded: true, deleted: rowsBefore });
  });

  it("3. keeps the consent history: earlier rows unchanged, one withdrawal appended", async () => {
    await as("postgres");
    const after = (await db.query<{ id: number; kind: string; granted: boolean; method: string }>("select id::int as id, kind, granted, method from public.consents where user_id = $1 order by id", [S])).rows;
    expect(after.slice(0, consentsBefore.length).map(({ id, kind, granted }) => ({ id, kind, granted }))).toEqual(consentsBefore);
    expect(after.slice(consentsBefore.length)).toEqual([{ id: expect.any(Number), kind: "cloud-sync", granted: false, method: "self" }]);
  });

  it("4. keeps the profile and the account; it isn't an account deletion", async () => {
    await as("postgres");
    expect(await one<string>("select display_name as n from public.profiles where user_id = $1", [S])).toEqual({ n: "Synthetic" });
    expect(await count("select count(*)::int as n from auth.users where id = $1", [S])).toBe(1);
    expect(await count("select count(*)::int as n from public.deletion_log")).toBe(logBefore);
    expect(await count("select count(*)::int as n from public.deletion_requests where user_id = $1", [S])).toBe(0);
  });

  it("5. never touches another student's records", async () => {
    expect(await cloudRows(O)).toEqual(otherBefore.rows);
    await as("postgres");
    expect(await count("select count(*)::int as n from public.consents where user_id = $1", [O])).toBe(otherBefore.consents);
    expect((await profile(O)).sync_enabled).toBe(otherBefore.sync);
    expect((await profile(O)).marker).toBeNull();
    expect(allStored(await upload(O, "o2"))).toBe(true); // O still syncs
  });

  it("6. is safe to repeat: nothing more deleted, no second withdrawal row, still reported as recorded", async () => {
    await as("postgres");
    const n = await count("select count(*)::int as n from public.consents where user_id = $1", [S]);
    await as("authenticated", S);
    expect(await withdraw()).toEqual({ withdrawn: true, withdrawal_recorded: true, deleted: ZERO });
    await as("postgres");
    expect(await count("select count(*)::int as n from public.consents where user_id = $1", [S])).toBe(n);
  });

  it("7. re-enabling needs a fresh, explicit cloud-copy consent; it clears the marker", async () => {
    await as("authenticated", S);
    expect(await enableSync()).toBe("consent-required");
    expect(await syncAllowed()).toBe(false);
    await grant("cloud-sync");
    expect(await enableSync()).toBe("enabled");
    expect((await profile(S)).marker).toBeNull();
    expect(allStored(await upload(S, "s2"))).toBe(true);
  });
});

describe("a failed deletion", () => {
  it("rolls back completely (no partial deletion); the marker from begin_cloud_withdrawal() keeps uploads off; the retry succeeds", async () => {
    const before = await cloudRows(S);
    expect(Object.values(before).every((n) => n >= 1)).toBe(true);
    await as("postgres");
    await db.exec("create function public.test_refuse_delete() returns trigger language plpgsql as $$ begin raise exception 'simulated failure'; end $$");
    await db.exec("create trigger test_refuse_delete before delete on public.mistakes for each row execute function public.test_refuse_delete()");
    try {
      // The app's order: record the withdrawal, begin_cloud_withdrawal(), then withdraw_cloud_copies().
      await as("authenticated", S);
      await grant("cloud-sync", false);
      expect((await one<boolean>("select public.begin_cloud_withdrawal() as ok")).ok).toBe(true);
      expect(await fails("select public.withdraw_cloud_copies()")).toMatch(/simulated failure/);
      expect(await cloudRows(S)).toEqual(before); // bookmarks etc. were deleted before mistakes: all rolled back
      expect((await profile(S)).sync_enabled).toBe(false);
      expect((await profile(S)).marker).not.toBeNull();
      await as("authenticated", S);
      expect(await syncAllowed()).toBe(false);
      expect(allRefused(await upload(S, "s3"))).toBe(true);
    } finally {
      await as("postgres");
      await db.exec("drop trigger test_refuse_delete on public.mistakes; drop function public.test_refuse_delete()");
    }
    await as("authenticated", S);
    expect((await withdraw()).deleted).toEqual(before);
    expect(await cloudRows(S)).toEqual(ZERO);
  });
});

describe("issue A: fail-closed withdrawal state, and the consent history cap", () => {
  const consentCount = async (sub: string) => { await as("postgres"); return count("select count(*)::int as n from public.consents where user_id = $1", [sub]); };
  const history = async (sub: string) => { await as("postgres"); return (await db.query("select id::int as id, kind, version, granted, method, recorded_at::text as at from public.consents where user_id = $1 order by id", [sub])).rows; };
  /** Fills the student's consent history to `total` rows with old-version grants, as the owner, `ago` in the past. */
  async function fill(sub: string, total: number, ago = "2 days") {
    const n = total - (await consentCount(sub));
    await db.query(`insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'privacy', 'old-version', true, now() - interval '${ago}' from generate_series(1, $2::int)`, [sub, n]);
    expect(await consentCount(sub)).toBe(total);
  }
  let before: unknown[];

  it("at the full 200-row limit, the withdrawal is still recorded, the copy is deleted, and both are reported", async () => {
    await syncingStudent(C, "c1");
    await fill(C, 200);
    before = await history(C);
    // The app's order: record the withdrawal, begin_cloud_withdrawal(), withdraw_cloud_copies().
    await as("authenticated", C);
    await grant("cloud-sync", false); // not refused by the cap
    expect((await one<boolean>("select public.begin_cloud_withdrawal() as ok")).ok).toBe(true);
    const r = await withdraw();
    expect(r.withdrawal_recorded).toBe(true);
    expect(Object.values(r.deleted).reduce((a, b) => a + b, 0)).toBe(6);
    expect(await cloudRows(C)).toEqual(ZERO);
    expect(await consentCount(C)).toBe(201);
    expect((await profile(C)).marker).not.toBeNull();
  });

  it("withdraw_cloud_copies() records the withdrawal itself at the limit, when the app's own insert never arrived", async () => {
    await as("authenticated", C);
    await grant("cloud-sync"); // a fresh grant (recorded: see below), then a withdrawal with no app insert
    const n = await consentCount(C);
    await as("authenticated", C);
    const r = await withdraw();
    expect(r.withdrawal_recorded).toBe(true);
    expect(await consentCount(C)).toBe(n + 1);
  });

  it("history is never deleted or rewritten: every earlier row is unchanged", async () => {
    expect((await history(C)).slice(0, before.length)).toEqual(before);
  });

  it("requirement 2: at the limit, a repeated withdrawal (already withdrawn) is skipped, never stored again; a repeated grant is refused", async () => {
    // C's latest cloud-copy decision is now a withdrawal (the previous test).
    const n = await consentCount(C);
    await as("authenticated", C);
    for (let i = 0; i < 5; i++) expect(await fails("insert into public.consents (kind, version, granted) values ('cloud-sync', $1, false)", [VERSION])).toBe("");
    await as("authenticated", C);
    expect(await withdraw()).toMatchObject({ withdrawal_recorded: true });
    expect(await consentCount(C)).toBe(n); // six retries, no new row
    await as("authenticated", C);
    expect(await fails("insert into public.consents (kind, version, granted) values ('privacy', $1, true)", [VERSION])).toMatch(/row limit 200 reached for consents/);
    expect(await consentCount(C)).toBe(n);
  });

  it("attempted reactivation with the old grant is refused, for every path, including the table owner", async () => {
    await as("authenticated", C);
    expect(await enableSync()).toBe("consent-required");
    expect(await syncAllowed()).toBe(false);
    expect(allRefused(await upload(C, "c2"))).toBe(true);
    await as("authenticated", C);
    expect(await fails("update public.profiles set sync_enabled = true")).toMatch(/permission denied|can only change/);
    await as("postgres");
    expect(await fails("update public.profiles set sync_enabled = true where user_id = $1", [C])).toMatch(/cloud-copy-withdrawn/);
    expect((await profile(C)).sync_enabled).toBe(false);
  });

  it("at the limit, a fresh consent is recorded and turns cloud copies back on; the marker is cleared", async () => {
    await as("authenticated", C);
    await grant("cloud-sync");
    expect(await enableSync()).toBe("enabled");
    expect((await profile(C)).marker).toBeNull();
    expect(allStored(await upload(C, "c3"))).toBe(true);
  });

  // Students can't choose recorded_at: db-consent-recorded-at.test.ts (migration 20261126100000).

  it("a failed withdrawal-row insert (not the cap): reported, sync blocked, and an old grant can't reactivate", async () => {
    await syncingStudent(F, "f1");
    await as("postgres");
    await db.exec("create function public.test_refuse_withdrawal() returns trigger language plpgsql as $$ begin if new.kind = 'cloud-sync' and not new.granted then raise exception 'simulated insert failure'; end if; return new; end $$");
    await db.exec("create trigger test_refuse_withdrawal before insert on public.consents for each row execute function public.test_refuse_withdrawal()");
    try {
      await as("authenticated", F);
      expect(await fails("insert into public.consents (kind, version, granted) values ('cloud-sync', $1, false)", [VERSION])).toMatch(/simulated insert failure/);
      expect((await one<boolean>("select public.begin_cloud_withdrawal() as ok")).ok).toBe(true);
      const r = await withdraw();
      expect(r.withdrawal_recorded).toBe(false);
      expect(await cloudRows(F)).toEqual(ZERO);
      await as("authenticated", F);
      expect(await fails("select public.enable_sync()")).toMatch(/cloud-copy-withdrawn/);
      expect(await syncAllowed()).toBe(false);
    } finally {
      await as("postgres");
      await db.exec("drop trigger test_refuse_withdrawal on public.consents; drop function public.test_refuse_withdrawal()");
    }
  });

  it("recovery: once a valid new consent is recorded after the withdrawal, sync can be turned on again", async () => {
    await as("authenticated", F);
    await grant("cloud-sync");
    expect(await enableSync()).toBe("enabled");
    expect((await profile(F)).marker).toBeNull();
    expect(allStored(await upload(F, "f2"))).toBe(true);
  });

  it("begin_cloud_withdrawal() alone (the deletion never ran) already blocks an old grant", async () => {
    await as("authenticated", F);
    expect((await one<boolean>("select public.begin_cloud_withdrawal() as ok")).ok).toBe(true);
    expect(await fails("select public.enable_sync()")).toMatch(/cloud-copy-withdrawn/);
    expect(allRefused(await upload(F, "f3"))).toBe(true);
    await as("authenticated", F);
    await withdraw(); // tidy up: the copy goes
    expect(await cloudRows(F)).toEqual(ZERO);
  });

  it("the cap function is security definer with an empty search_path, executable by no client, and on consents_cap", async () => {
    await as("postgres");
    expect(await one<string>("select prosecdef::text as d, array_to_string(proconfig, ',') as c from pg_proc where oid = 'public.atlas_consent_cap()'::regprocedure")).toEqual({ d: "true", c: 'search_path=""' });
    for (const role of ["authenticated", "anon"]) {
      expect((await one<boolean>("select has_function_privilege($1, 'public.atlas_consent_cap()', 'execute') as ok", [role])).ok, role).toBe(false);
    }
    expect((await one<string>("select tgfoid::regprocedure::text as f from pg_trigger where tgrelid = 'public.consents'::regclass and tgname = 'consents_cap'")).f).toBe("atlas_consent_cap()");
  });
});

describe("the consent allowance (owner decision 2026-11-28, Option A: 20 genuine changes per rolling 24 hours, from 200 rows)", () => {
  let k = 0;
  /** A new student with a profile and `old` consent rows from two days ago (old-version grants: one genuine change). */
  async function student(old: number) {
    k += 1;
    const sub = `00000000-0000-4000-8000-0000000000${(0xa0 + k).toString(16)}`;
    await as("postgres");
    await db.query("insert into auth.users (id, email) values ($1, $2)", [sub, `k${k}@example.test`]);
    await as("authenticated", sub);
    await db.query("insert into public.profiles (display_name, age_band) values ('K', '18-plus')");
    await as("postgres");
    await db.exec("alter table public.consents disable trigger consents_cap"); // test setup only
    await db.query("insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'privacy', 'old-version', true, now() - interval '2 days' from generate_series(1, $2::int)", [sub, old]);
    await db.exec("alter table public.consents enable trigger consents_cap");
    return sub;
  }
  /** Plants `n` genuine changes (grant, withdrawal, grant, ...) for one kind/version, `ago` back, a second apart. Test setup only. */
  async function plantChanges(sub: string, n: number, ago: string, version: string) {
    await as("postgres");
    await db.exec("alter table public.consents disable trigger consents_cap");
    await db.query(`insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'terms', $3, g % 2 = 1, now() - interval '${ago}' + g * interval '1 second' from generate_series(1, $2::int) g`, [sub, n, version]);
    await db.exec("alter table public.consents enable trigger consents_cap");
  }
  const total = async (sub: string) => { await as("postgres"); return count("select count(*)::int as n from public.consents where user_id = $1", [sub]); };
  const rows = async (sub: string) => { await as("postgres"); return (await db.query("select id::int as id, kind, version, granted, method, recorded_at::text as at from public.consents where user_id = $1 order by id", [sub])).rows; };
  const tryInsert = async (sub: string, kind: string, granted: boolean) => { await as("authenticated", sub); return fails("insert into public.consents (kind, version, granted) values ($1, $2, $3)", [kind, VERSION, granted]); };

  it("the 200-row threshold: below it any row is recorded (even a repeat); from the 200th row on, the allowance applies", async () => {
    const s = await student(198);
    expect(await tryInsert(s, "privacy", true)).toBe(""); // 199th row: a first grant for VERSION
    expect(await tryInsert(s, "privacy", true)).toBe(""); // 200th row: a repeat, still below the threshold when checked
    expect(await total(s)).toBe(200);
    expect(await tryInsert(s, "privacy", true)).toMatch(/row limit 200 reached for consents/); // a repeat at the threshold
    expect(await tryInsert(s, "cloud-sync", true)).toBe(""); // a genuine grant at the threshold: within the allowance
    expect(await total(s)).toBe(201);
  });

  it("requirement 1: a genuine withdrawal is always recorded, even with the allowance used up", async () => {
    const s = await student(200);
    await plantChanges(s, 20, "1 hour", "burst"); // 20 genuine changes in the window
    await as("postgres");
    await db.exec("alter table public.consents disable trigger consents_cap");
    await db.query("insert into public.consents (user_id, kind, version, granted) values ($1, 'cloud-sync', $2, true)", [s, VERSION]); // a current grant
    await db.exec("alter table public.consents enable trigger consents_cap");
    const n = await total(s);
    expect(await tryInsert(s, "cloud-sync", false)).toBe("");
    expect(await total(s)).toBe(n + 1);
    // ...and repeating it (already withdrawn) adds nothing, at any size (requirement 2).
    for (let i = 0; i < 3; i++) expect(await tryInsert(s, "cloud-sync", false)).toBe("");
    expect(await total(s)).toBe(n + 1);
  });

  it("requirement 2 below the threshold too: repeated withdrawals while withdrawn add no rows", async () => {
    const s = await student(0);
    expect(await tryInsert(s, "cloud-sync", true)).toBe("");
    expect(await tryInsert(s, "cloud-sync", false)).toBe("");
    for (let i = 0; i < 10; i++) expect(await tryInsert(s, "cloud-sync", false)).toBe("");
    expect(await total(s)).toBe(2);
  });

  it("requirement 3: a fresh consent after a withdrawal is accepted while fewer than 20 genuine changes are in the window", async () => {
    const s = await student(200);
    await plantChanges(s, 18, "1 hour", "burst"); // 18 changes
    expect(await tryInsert(s, "cloud-sync", true)).toBe(""); // 19th change: accepted
    expect(await tryInsert(s, "cloud-sync", false)).toBe(""); // 20th: a withdrawal, always recorded
    expect(await tryInsert(s, "cloud-sync", true)).toMatch(/row limit 200 reached for consents/); // the allowance is used
    await as("authenticated", s);
    expect(await enableSync()).toBe("consent-required");
  });

  it("only genuine changes count: 40 repeated rows in the window don't use the allowance", async () => {
    const s = await student(200);
    await as("postgres");
    await db.exec("alter table public.consents disable trigger consents_cap");
    await db.query("insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'terms', 'repeats', true, now() - interval '1 hour' + g * interval '1 second' from generate_series(1, 40) g", [s]); // 1 change + 39 repeats
    await db.exec("alter table public.consents enable trigger consents_cap");
    await plantChanges(s, 18, "2 hours", "burst"); // 18 more changes: 19 in all
    expect(await tryInsert(s, "cloud-sync", true)).toBe(""); // the 20th change: accepted
    expect(await tryInsert(s, "privacy", true)).toMatch(/row limit 200 reached for consents/); // the 21st: refused
  });

  it("the window rolls: changes from more than 24 hours ago don't count; within 24 hours they do", async () => {
    const old = await student(200);
    await plantChanges(old, 20, "24 hours 5 minutes", "yesterday"); // just outside the window
    expect(await tryInsert(old, "cloud-sync", true)).toBe("");
    const recent = await student(200);
    await plantChanges(recent, 20, "23 hours 55 minutes", "today"); // just inside
    expect(await tryInsert(recent, "cloud-sync", true)).toMatch(/row limit 200 reached for consents/);
  });

  it("append-only: the trigger never deletes, updates or rewrites a row; refused and skipped inserts leave history byte-identical", async () => {
    const s = await student(200);
    await plantChanges(s, 20, "1 hour", "burst");
    expect(await tryInsert(s, "privacy", false)).toBe(""); // a first refusal: recorded (appended)
    const before = await rows(s);
    expect(await tryInsert(s, "cloud-sync", true)).toMatch(/row limit 200/); // a fresh grant beyond the allowance: refused
    expect(await tryInsert(s, "privacy", false)).toBe(""); // a repeated refusal: skipped
    await as("postgres");
    expect(await fails("insert into public.consents (user_id, kind, version, granted) values ($1, 'terms', 'burst', true)", [s])).toMatch(/row limit 200/); // the owner too (a repeated grant)
    expect(await rows(s)).toEqual(before);
    // Students still can't update or delete consent rows at all.
    await as("authenticated", s);
    expect(await fails("update public.consents set granted = false")).toMatch(/append-only|permission denied/);
    expect(await fails("delete from public.consents")).toMatch(/append-only|permission denied/);
    expect(await rows(s)).toEqual(before);
  });
});

describe("a student's first refusal is always recorded (owner decision 2026-11-28)", () => {
  let k = 0;
  async function student(old: number, changesInWindow: number) {
    k += 1;
    const sub = `00000000-0000-4000-8000-0000000000${(0xc0 + k).toString(16)}`;
    await as("postgres");
    await db.query("insert into auth.users (id, email) values ($1, $2)", [sub, `r${k}@example.test`]);
    await db.exec("alter table public.consents disable trigger consents_cap"); // test setup only
    await db.query("insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'privacy', 'old-version', true, now() - interval '2 days' from generate_series(1, $2::int)", [sub, old]);
    await db.query("insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'terms', 'burst', g % 2 = 1, now() - interval '1 hour' + g * interval '1 second' from generate_series(1, $2::int) g", [sub, changesInWindow]);
    await db.exec("alter table public.consents enable trigger consents_cap");
    return sub;
  }
  const total = async (sub: string) => { await as("postgres"); return count("select count(*)::int as n from public.consents where user_id = $1", [sub]); };
  const insert = async (sub: string, kind: string, granted: boolean, version = VERSION) => { await as("authenticated", sub); return fails("insert into public.consents (kind, version, granted) values ($1, $2, $3)", [kind, version, granted]); };
  const latest = async (sub: string, kind: string) => { await as("postgres"); return (await one<boolean | null>("select granted as g from public.consents where user_id = $1 and kind = $2 and version = $3 order by recorded_at desc, id desc limit 1", [sub, kind, VERSION]))?.g ?? null; };

  it("1. recorded past the 200-row threshold AND with the 20-change allowance used up, for each self-service kind", async () => {
    const s = await student(200, 20);
    const n = await total(s);
    for (const kind of ["privacy", "cloud-sync"]) expect(await insert(s, kind, false), kind).toBe("");
    expect(await total(s)).toBe(n + 2);
    expect(await latest(s, "privacy")).toBe(false);
    expect(await latest(s, "cloud-sync")).toBe(false);
  });

  it("3. a repeated identical refusal adds no row (at the threshold and below it)", async () => {
    for (const [old, changes] of [[200, 20], [0, 0]]) {
      const s = await student(old, changes);
      expect(await insert(s, "privacy", false)).toBe("");
      const n = await total(s);
      for (let i = 0; i < 5; i++) expect(await insert(s, "privacy", false)).toBe("");
      expect(await total(s), `old ${old}`).toBe(n);
    }
  });

  it("2 and 3. after a grant, the genuine withdrawal is recorded even with the allowance used up; a repeat adds nothing", async () => {
    const s = await student(200, 18);
    expect(await insert(s, "privacy", false)).toBe(""); // first refusal: not a change
    expect(await insert(s, "privacy", true)).toBe(""); // fresh grant: the 19th change
    expect(await insert(s, "cloud-sync", true)).toBe(""); // the 20th change
    const n = await total(s);
    expect(await insert(s, "privacy", false)).toBe(""); // genuine withdrawal: the 21st, always recorded
    expect(await insert(s, "privacy", false)).toBe(""); // repeat: skipped
    expect(await total(s)).toBe(n + 1);
  });

  it("2. a genuine withdrawal is recorded for any notice version, past the threshold with the allowance used up", async () => {
    const s = await student(200, 20); // 200 'privacy' grants under 'old-version'
    const n = await total(s);
    expect(await insert(s, "privacy", false, "old-version")).toBe(""); // withdraws an old-version grant
    expect(await insert(s, "privacy", false, "old-version")).toBe(""); // repeat: skipped
    expect(await total(s)).toBe(n + 1);
  });

  it("4. a fresh grant after a first refusal is a genuine change, subject to the allowance", async () => {
    const used = await student(200, 20);
    expect(await insert(used, "privacy", false)).toBe("");
    expect(await insert(used, "privacy", true)).toMatch(/row limit 200 reached for consents/);
    expect(await latest(used, "privacy")).toBe(false);
    const free = await student(200, 19);
    expect(await insert(free, "privacy", false)).toBe("");
    expect(await insert(free, "privacy", true)).toBe(""); // the 20th change
    expect(await insert(free, "cloud-sync", true)).toMatch(/row limit 200 reached for consents/); // a 21st
  });

  it("a refusals-only history doesn't use the allowance (a first refusal changes nothing)", async () => {
    const s = await student(200, 19);
    expect(await insert(s, "privacy", false)).toBe("");
    expect(await insert(s, "cloud-sync", false)).toBe("");
    expect(await insert(s, "cloud-sync", true)).toBe(""); // still the 20th change
  });

  it("bounded: a first refusal for a version other than the current one is not exempt (any version text could be typed)", async () => {
    const at = await student(200, 0);
    expect(await insert(at, "privacy", false, "made-up-1")).toMatch(/row limit 200 reached for consents/);
    expect(await insert(at, "privacy", false, "made-up-2")).toMatch(/row limit 200 reached for consents/);
    const below = await student(0, 0);
    expect(await insert(below, "privacy", false, "made-up-1")).toBe(""); // below the threshold, as before
  });

  it("6. structure: the per-student advisory lock is taken first, before any count (concurrency: see db-withdraw-concurrency)", () => {
    const body = MIGRATION.slice(MIGRATION.indexOf("create function public.atlas_consent_cap()"), MIGRATION.indexOf("drop trigger consents_cap on public.consents;"));
    const lock = body.indexOf("perform pg_advisory_xact_lock(hashtextextended('atlas-consents:' || new.user_id::text, 0));");
    expect(lock).toBeGreaterThan(0);
    for (const later of ["select c.granted into latest", "select count(*) into total", "select count(*) into recent"]) expect(lock, later).toBeLessThan(body.indexOf(later));
    expect(body).not.toMatch(/\b(update|delete)\s+(from\s+)?public\.consents/i); // the trigger never rewrites history
  });
});

describe("one lock order: account deletion takes the profile row first", () => {
  const body = (fn: string) => {
    const start = MIGRATION.indexOf(`create or replace function public.${fn}`);
    return MIGRATION.slice(start, MIGRATION.indexOf("end $$;", start));
  };
  it("purge_user_data() locks the profile before the deletion request and any study row", () => {
    const b = body("purge_user_data(target uuid)");
    const lock = b.indexOf("perform 1 from public.profiles where user_id = target for update;");
    expect(lock).toBeGreaterThan(0);
    for (const later of ["from public.deletion_requests", "delete from public.bookmarks", "delete from public.consents"]) expect(lock, later).toBeLessThan(b.indexOf(later));
  });
  it("request_account_deletion() locks the profile before the rate limit and the deletion request, after the gate", () => {
    const b = body("request_account_deletion()");
    const lock = b.indexOf("perform 1 from public.profiles where user_id = auth.uid() for no key update;");
    expect(lock).toBeGreaterThan(b.indexOf("account_deletion_enabled()"));
    expect(lock).toBeLessThan(b.indexOf("deletion_rate_wait"));
    expect(lock).toBeLessThan(b.indexOf("insert into public.deletion_requests"));
  });
  it("deletion protections are unchanged: purge is server-role only, the request keeps its gate and rate limit", async () => {
    await as("postgres");
    for (const role of ["authenticated", "anon"]) {
      expect((await one<boolean>("select has_function_privilege($1, 'public.purge_user_data(uuid)', 'execute') as ok", [role])).ok, role).toBe(false);
    }
    expect((await one<boolean>("select has_function_privilege('service_role', 'public.purge_user_data(uuid)', 'execute') as ok")).ok).toBe(true);
    await as("authenticated", O);
    expect(await fails("select public.request_account_deletion()")).toMatch(/deletion-disabled/); // the gate is off here
    await as("postgres");
    expect(await count("select count(*)::int as n from public.deletion_requests")).toBe(0);
  });
  it("a purge deletes everything, and an upload afterwards finds no profile and is refused", async () => {
    await syncingStudent(F, "f4");
    await as("postgres");
    await db.exec("set role service_role");
    expect((await one<number>("select public.purge_user_data($1) as n", [F])).n).toBeGreaterThan(6);
    await as("postgres");
    expect(await cloudRows(F)).toEqual(ZERO);
    expect(await count("select count(*)::int as n from public.profiles where user_id = $1", [F])).toBe(0);
    expect(allRefused(await upload(F, "f5"))).toBe(true);
  });
});

describe("cloud generation (owner review B1)", () => {
  const gen = async (sub: string) => { await as("postgres"); return (await one<string | null>("select cloud_generation::text as g from public.profiles where user_id = $1", [sub]))?.g ?? null; };
  it("every profile has one; students can read their own but never write it", async () => {
    expect(await gen(O)).toMatch(/^[0-9a-f-]{36}$/);
    await as("postgres");
    for (const priv of ["INSERT", "UPDATE"]) {
      expect((await one<boolean>("select has_column_privilege('authenticated', 'public.profiles', 'cloud_generation', $1) as ok", [priv])).ok, priv).toBe(false);
    }
    await as("authenticated", O);
    expect((await one<string>("select cloud_generation::text as g from public.profiles where user_id = $1", [O])).g).toBe(await gen(O));
    await as("authenticated", O);
    expect(await fails("update public.profiles set cloud_generation = gen_random_uuid()")).toMatch(/permission denied/);
  });
  it("is replaced by begin_cloud_withdrawal() and by withdraw_cloud_copies(), and only for the caller", async () => {
    const other = await gen(O);
    const g0 = await gen(S);
    await as("authenticated", S);
    await db.query("select public.begin_cloud_withdrawal()");
    const g1 = await gen(S);
    await as("authenticated", S);
    await withdraw();
    const g2 = await gen(S);
    expect(new Set([g0, g1, g2]).size).toBe(3);
    expect(await gen(O)).toBe(other);
  });
  it("a profile re-created after account deletion gets a new one", async () => {
    await as("postgres");
    await db.query("insert into auth.users (id, email) values ('00000000-0000-4000-8000-0000000000d9', 'g@example.test')");
    const G = "00000000-0000-4000-8000-0000000000d9";
    await as("authenticated", G);
    await db.query("insert into public.profiles (display_name, age_band) values ('G', '18-plus')");
    const before = await gen(G);
    await as("postgres");
    await db.exec("set role service_role");
    await db.query("select public.purge_user_data($1)", [G]);
    await as("authenticated", G);
    await db.query("insert into public.profiles (display_name, age_band) values ('G', '18-plus')");
    const after = await gen(G);
    expect(after).not.toBeNull();
    expect(after).not.toBe(before);
  });
});

describe("issue B: uploads and withdrawals, both orderings (one session; see the concurrency test for the interleaving)", () => {
  it("withdrawal commits first: a later upload is refused like Row Level Security, and nothing is stored", async () => {
    await as("authenticated", S);
    await grant("cloud-sync");
    expect(await enableSync()).toBe("enabled");
    await withdraw();
    await as("authenticated", S);
    const msg = await fails("insert into public.goals (goal_type, activated_at) values ('late', now())");
    expect(msg).toMatch(/new row violates row-level security policy for table "goals"/);
    expect(await cloudRows(S)).toEqual(ZERO);
  });

  it("upload commits first: the withdrawal that follows deletes what it stored", async () => {
    await as("authenticated", S);
    await grant("cloud-sync");
    expect(await enableSync()).toBe("enabled");
    expect(allStored(await upload(S, "first"))).toBe(true);
    await as("authenticated", S);
    expect(Object.values((await withdraw()).deleted).reduce((a, b) => a + b, 0)).toBe(6);
    expect(await cloudRows(S)).toEqual(ZERO);
  });

  it("an upsert's UPDATE half is guarded too", async () => {
    await as("authenticated", S);
    expect(await fails("insert into public.streaks (current_days, longest_days) values (5, 5) on conflict (user_id) do update set current_days = 5")).toMatch(/row-level security/);
    expect(await fails("update public.goals set deleted_at = now() where goal_type = 'x'")).toMatch(/row-level security/);
  });

  it("the guard leaves the server roles alone (they don't upload)", async () => {
    await as("postgres");
    await db.query("insert into public.goals (user_id, goal_type, activated_at) values ($1, 'owner-planted', now())", [S]);
    expect(await count("select count(*)::int as n from public.goals where user_id = $1", [S])).toBe(1);
    await as("authenticated", S);
    await withdraw();
    expect(await cloudRows(S)).toEqual(ZERO);
  });

  it("atlas_upload_lock() reports the caller's own sync state and nothing else", async () => {
    await as("authenticated", O);
    expect((await one<boolean>("select public.atlas_upload_lock() as ok")).ok).toBe(true);
    await as("authenticated", S);
    expect((await one<boolean>("select public.atlas_upload_lock() as ok")).ok).toBe(false);
  });
});

describe("rollback", () => {
  it("withdraw_cloud_copies_down.sql removes what the migration added, restores what it changed, and the migration re-applies", async () => {
    await as("postgres");
    const NEW = ["withdraw_cloud_copies", "begin_cloud_withdrawal", "atlas_upload_lock", "atlas_upload_guard", "atlas_withdrawal_guard", "atlas_consent_cap"];
    const others = await count("select count(*)::int as n from pg_proc where pronamespace = 'public'::regnamespace and not (proname = any($1))", [NEW]);
    const otherTriggers = await count("select count(*)::int as n from pg_trigger t join pg_class c on c.oid = t.tgrelid where c.relnamespace = 'public'::regnamespace and not t.tgisinternal and t.tgname not like '%upload_guard' and t.tgname <> 'profiles_withdrawal_guard'");
    const consentsBefore = await count("select count(*)::int as n from public.consents");
    const snapshot = async () => (await db.query("select id::int as id, user_id::text as u, kind, version, granted, method, recorded_at::text as at from public.consents order by id")).rows;
    const historyBefore = await snapshot();
    expect(consentsBefore).toBeGreaterThan(200); // includes students past the threshold
    const src = async (fn: string) => (await one<string>("select prosrc as s from pg_proc where oid = $1::regprocedure", [fn])).s;
    const capFn = async () => (await one<string>("select tgfoid::regprocedure::text as f from pg_trigger where tgrelid = 'public.consents'::regclass and tgname = 'consents_cap'")).f;
    await db.exec(read("supabase", "rollback", "withdraw_cloud_copies_down.sql"));
    expect(await count("select count(*)::int as n from pg_proc where proname = any($1)", [NEW])).toBe(0);
    expect(await count("select count(*)::int as n from pg_proc where pronamespace = 'public'::regnamespace")).toBe(others);
    expect(await count("select count(*)::int as n from pg_trigger t join pg_class c on c.oid = t.tgrelid where c.relnamespace = 'public'::regnamespace and not t.tgisinternal")).toBe(otherTriggers);
    expect(await count("select count(*)::int as n from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name in ('cloud_copy_withdrawn_at', 'cloud_generation')")).toBe(0);
    // Restored: the flat cap and the earlier purge / request definitions. History kept.
    // NOT reopened: students still can't choose recorded_at (20261126100000 is separate).
    expect(await capFn()).toBe("atlas_row_cap()");
    expect((await one<boolean>("select has_column_privilege('authenticated', 'public.consents', 'recorded_at', 'INSERT') as ok")).ok).toBe(false);
    expect(await src("public.purge_user_data(uuid)")).not.toMatch(/for update/);
    expect(await src("public.request_account_deletion()")).not.toMatch(/for no key update/);
    expect(await src("public.request_account_deletion()")).toMatch(/deletion_rate_wait/);
    expect(await count("select count(*)::int as n from public.consents")).toBe(consentsBefore);
    expect(await snapshot()).toEqual(historyBefore); // every row unchanged, including those past 200
    // The flat cap is back: a student past 200 rows can no longer record anything (the old behaviour).
    expect(await fails("insert into public.consents (user_id, kind, version, granted) values ($1, 'privacy', 'after-rollback', false)", [C])).toMatch(/row limit 200 reached for consents/);
    await db.exec(MIGRATION);
    expect(await snapshot()).toEqual(historyBefore); // re-applying changes no row either
    expect(await count("select count(*)::int as n from pg_proc where proname = any($1)", [NEW])).toBe(NEW.length);
    expect(await capFn()).toBe("atlas_consent_cap()");
    expect(await src("public.purge_user_data(uuid)")).toMatch(/for update/);
    expect(await count("select count(*)::int as n from public.profiles where cloud_generation is null")).toBe(0); // existing profiles get one
  });

  it("the full rollback drops the functions too (the triggers and the column go with the tables)", () => {
    expect(read("supabase", "rollback", "student_accounts_down.sql")).toMatch(/drop function if exists public\.withdraw_cloud_copies\(\), public\.begin_cloud_withdrawal\(\),\s+public\.atlas_upload_lock\(\), public\.atlas_upload_guard\(\), public\.atlas_withdrawal_guard\(\), public\.atlas_consent_cap\(\);/);
  });
});
