import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

// Owner decisions (2026-11-23), enforced by migration 20261124000000:
//   K  unverified accounts get no cloud-sync access: they can neither READ
//      nor WRITE cloud-sync records (the six study tables);
//   -  export and account deletion stay available to them;
//   -  existing Auth accounts are trusted as Supabase Auth records them
//      (email_confirmed_at as it stands, including auto-confirmed ones).
const ROOT = path.resolve(__dirname, "..", "..", "..");
const DIR = path.join(ROOT, "supabase", "migrations");
const FIX = "20261124000000_require_verified_email_for_sync.sql";
// Applied after FIX; it replaces sync_allowed() and enable_sync() again, keeping email_verified().
const AGE = "20261126000000_remove_age_restrictions.sql";
const FIX_INDEX_AFTER = 6;
// Added after AGE; independent of this gate (owner decision J, 2026-11-27).
const CONSENT_TS = "20261126100000_consent_recorded_at_server_only.sql";
const WITHDRAW = "20261127000000_withdraw_cloud_copies.sql";
const files = readdirSync(DIR).filter((f) => f.endsWith(".sql")).sort();
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const STUDY = ["bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks"] as const;

const E = "00000000-0000-4000-8000-0000000000a0"; // existing account, auto-confirmed at sign-up (pre-H1 shape)
const V = "00000000-0000-4000-8000-0000000000a1"; // new account, verified at sign-up
const N = "00000000-0000-4000-8000-0000000000a3"; // new account, verified later
const U = "00000000-0000-4000-8000-0000000000a2"; // unverified

let db: PGlite;
async function as(role: "authenticated" | "anon" | "postgres", sub?: string) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
  if (role !== "postgres") await db.exec(`set role ${role}`);
}
async function fails(sql: string, params: unknown[] = []) {
  try { await db.query(sql, params); return ""; } catch (e) { return (e as Error).message; }
}
const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<Record<string, T>>(sql, params)).rows[0];
const count = async (sql: string, params: unknown[] = []) => Number((await one<number>(sql, params)).n);
const insertBookmark = "insert into public.bookmarks (bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1, '11', 'kinematics', 'chapter', 'Kinematics', 'Kinematics', '/class-11/kinematics', now())";
const enableSync = async () => (await one<string>("select public.enable_sync() as r")).r;
const syncAllowed = async () => (await one<boolean>("select public.sync_allowed() as ok")).ok;
const visibleStudyRows = async () => { let n = 0; for (const t of STUDY) n += await count(`select count(*)::int as n from public.${t}`); return n; };

async function adultWithFullConsent(sub: string) {
  await as("authenticated", sub);
  await db.query("insert into public.profiles (age_band) values ('18-plus')");
  // The current notice version, as the migrations seed it (db-rls.test.ts uses the same).
  for (const kind of ["terms", "privacy", "cloud-sync"]) await db.query("insert into public.consents (kind, version, granted) values ($1, '2026-11-draft', true)", [kind]);
  await as("postgres");
}
// One row in each of the six study tables, written as the table owner (as if
// synced while the account was still verified, or by any other path).
async function plantStudyRows(sub: string) {
  await db.query("insert into public.bookmarks (user_id, bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1, 'p:1', '11', 'kinematics', 'chapter', 'K', 'K', '/class-11/kinematics', now())", [sub]);
  await db.query("insert into public.checklist_items (user_id, cls, slug, item, done) values ($1, '11', 'kinematics', 'notes', true)", [sub]);
  await db.query("insert into public.revision_rounds (user_id, cls, slug, round, completed_at) values ($1, '11', 'kinematics', 1, now())", [sub]);
  await db.query("insert into public.mistakes (user_id, id, cls, slug, chapter_name, resource_type, concept_tag, difficulty, created_at) values ($1, gen_random_uuid(), '11', 'kinematics', 'K', 'dpp', 'c', 'easy', now())", [sub]);
  await db.query("insert into public.goals (user_id, goal_type, activated_at) values ($1, 'daily-study', now())", [sub]);
  await db.query("insert into public.streaks (user_id, current_days, longest_days) values ($1, 1, 2)", [sub]);
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
  for (const f of files) await db.exec(read("supabase", "migrations", f));
  await db.query("update public.app_config set value = 'true' where key in ('adult_sync_permitted', 'account_deletion_enabled')"); // test DB only
  await db.query(`insert into auth.users (id, email, email_confirmed_at) values
    ($1, 'existing@example.test', timestamptz '2026-06-01 10:00+00'),
    ($2, 'verified@example.test', now()),
    ($3, 'later@example.test', null),
    ($4, 'unverified@example.test', null)`, [E, V, N, U]);
  for (const s of [E, V, N, U]) await adultWithFullConsent(s);
  for (const s of [E, U]) await plantStudyRows(s);
}, 60_000);
afterAll(async () => db?.close());
// Each test starts as the owner, so one failing test can't leave a student role behind for the next.
beforeEach(async () => { if (db) await as("postgres"); });

describe("migration order", () => {
  it("runs after the five Phase 2 migrations; only the age-restriction removal (which keeps this gate) and the two decision J migrations follow it", () => {
    expect(files.indexOf(FIX)).toBe(5);
    expect(files.slice(FIX_INDEX_AFTER)).toEqual([AGE, CONSENT_TS, WITHDRAW]);
    expect(files).toHaveLength(9);
  });
});

describe("existing account (trusted as it stands, decision 1)", () => {
  it("an account confirmed when it was created is treated as verified: enable, read and write", async () => {
    await as("authenticated", E);
    expect(await enableSync()).toBe("enabled");
    expect(await syncAllowed()).toBe(true);
    expect(await visibleStudyRows()).toBe(STUDY.length); // its six planted rows
    expect(await fails(insertBookmark, ["e:2"])).toBe("");
    await as("postgres");
  });
});

describe("newly verified accounts", () => {
  it("verified at sign-up: enable, write and read back", async () => {
    await as("authenticated", V);
    expect(await enableSync()).toBe("enabled");
    expect(await fails(insertBookmark, ["v:1"])).toBe("");
    expect(await count("select count(*)::int as n from public.bookmarks")).toBe(1);
    await as("postgres");
  });

  it("verified later: blocked before, full access after", async () => {
    await as("authenticated", N);
    expect(await enableSync()).toBe("email-not-verified");
    await as("postgres");
    await db.query("update auth.users set email_confirmed_at = now() where id = $1", [N]);
    await as("authenticated", N);
    expect(await enableSync()).toBe("enabled");
    expect(await fails(insertBookmark, ["n:1"])).toBe("");
    expect(await count("select count(*)::int as n from public.bookmarks")).toBe(1);
    await as("postgres");
  });
});

describe("unverified account: no cloud-sync access (decision 2)", () => {
  it("can't enable sync", async () => {
    await as("authenticated", U);
    expect(await enableSync()).toBe("email-not-verified");
    expect(await syncAllowed()).toBe(false);
    await as("postgres");
    expect((await one<boolean>("select sync_enabled from public.profiles where user_id = $1", [U])).sync_enabled).toBe(false);
  });

  it("read attempts: sees none of its own cloud rows, in any of the six tables", async () => {
    await as("authenticated", U);
    for (const t of STUDY) expect(await count(`select count(*)::int as n from public.${t}`), t).toBe(0);
    await as("postgres");
    for (const t of STUDY) expect(await count(`select count(*)::int as n from public.${t} where user_id = $1`, [U]), t).toBe(1); // the rows exist
  });

  it("write attempts: inserts are refused, and updates change nothing, even with sync_enabled forced on", async () => {
    await db.query("update public.profiles set sync_enabled = true where user_id = $1", [U]); // as owner, simulating any bypass
    await as("authenticated", U);
    expect(await syncAllowed()).toBe(false);
    expect(await fails(insertBookmark, ["u:1"])).toMatch(/row-level security/);
    expect(await fails("insert into public.goals (goal_type, activated_at) values ('weekly', now())")).toMatch(/row-level security/);
    const upd = await db.query("update public.bookmarks set label = 'changed' where bookmark_id = 'p:1'");
    expect(upd.affectedRows ?? 0).toBe(0);
    await as("postgres");
    expect((await one<string>("select label from public.bookmarks where user_id = $1 and bookmark_id = 'p:1'", [U])).label).toBe("K");
    expect(await count("select count(*)::int as n from public.bookmarks where user_id = $1", [U])).toBe(1);
    await db.query("update public.profiles set sync_enabled = false where user_id = $1", [U]);
  });

  it("keeps its account records: its own profile and consents stay readable", async () => {
    await as("authenticated", U);
    expect(await count("select count(*)::int as n from public.profiles")).toBe(1);
    expect(await count("select count(*)::int as n from public.consents")).toBe(3);
    await as("postgres");
  });

  it("export still returns everything stored about it, including its cloud rows", async () => {
    await as("authenticated", U);
    const x = (await one<Record<string, unknown>>("select public.export_my_data() as x")).x as Record<string, unknown>;
    await as("postgres");
    expect((x.profile as { user_id: string }).user_id).toBe(U);
    for (const k of ["bookmarks", "checklistItems", "revisionRounds", "mistakes", "goals"]) expect((x[k] as unknown[]).length, k).toBe(1);
    expect(x.streak).toBeTruthy();
    expect((x.consents as unknown[]).length).toBe(3);
  });

  it("can't read another student's rows either way", async () => {
    await as("authenticated", V);
    expect(await count("select count(*)::int as n from public.bookmarks where user_id = $1", [U])).toBe(0);
    await as("postgres");
  });

  it("account deletion still works: request, then purge of every study row", async () => {
    await as("authenticated", U);
    expect(await fails("select public.request_account_deletion()")).toBe("");
    await as("postgres");
    expect(await count("select count(*)::int as n from public.deletion_requests where user_id = $1", [U])).toBe(1);
    await db.query("select public.purge_user_data($1)", [U]);
    for (const t of STUDY) expect(await count(`select count(*)::int as n from public.${t} where user_id = $1`, [U]), t).toBe(0);
    expect(await count("select count(*)::int as n from public.profiles where user_id = $1", [U])).toBe(0);
  });
});

describe("privileges", () => {
  it("email_verified() is callable by signed-in students (own status only), never by anon", async () => {
    expect((await one<boolean>("select has_function_privilege('authenticated', 'public.email_verified()', 'execute') as ok")).ok).toBe(true);
    expect((await one<boolean>("select has_function_privilege('anon', 'public.email_verified()', 'execute') as ok")).ok).toBe(false);
    await as("authenticated", "00000000-0000-4000-8000-0000000000ff"); // no such user
    expect((await one<boolean>("select public.email_verified() as ok")).ok).toBe(false);
    expect(await syncAllowed()).toBe(false);
    await as("postgres");
  });

  it("client privileges on sync_allowed and enable_sync are unchanged", async () => {
    for (const fn of ["public.sync_allowed()", "public.enable_sync()"]) {
      expect((await one<boolean>("select has_function_privilege('authenticated', $1, 'execute') as ok", [fn])).ok, fn).toBe(true);
      expect((await one<boolean>("select has_function_privilege('anon', $1, 'execute') as ok", [fn])).ok, fn).toBe(false);
    }
  });

  it("each study table's SELECT policy requires email_verified(); INSERT and UPDATE call sync_allowed()", async () => {
    const pol = (await db.query<{ tablename: string; cmd: string; q: string }>(
      "select tablename, cmd, coalesce(qual, '') || ' ' || coalesce(with_check, '') as q from pg_policies where schemaname = 'public' and tablename = any($1)", [STUDY as unknown as string[]])).rows;
    for (const t of STUDY) {
      expect(pol.find((p) => p.tablename === t && p.cmd === "SELECT")?.q, t).toMatch(/email_verified\(\)/);
      for (const cmd of ["INSERT", "UPDATE"]) expect(pol.find((p) => p.tablename === t && p.cmd === cmd)?.q, `${t} ${cmd}`).toMatch(/sync_allowed\(\)/);
      expect(pol.some((p) => p.tablename === t && p.cmd === "DELETE"), t).toBe(false);
    }
  });

  // The SELECT test above uses .find() and a loose pattern: a second, broader
  // SELECT policy, or a weakened expression such as `true OR email_verified()`,
  // would still pass it. Postgres ORs permissive policies together, so either
  // would bypass the gate. This pins the exact shape.
  const readPolicies = async () => (await db.query<{ tablename: string; policyname: string; permissive: string; roles: string; q: string }>(
    "select tablename, policyname, permissive, roles::text as roles, regexp_replace(regexp_replace(coalesce(qual, ''), '\\s', '', 'g'), '(public|auth)\\.', '', 'g') as q from pg_policies where schemaname = 'public' and tablename = any($1) and cmd in ('SELECT', 'ALL')",
    [STUDY as unknown as string[]])).rows;

  it("each study table has exactly one read policy: permissive, for authenticated only, ownership AND email_verified()", async () => {
    const pol = await readPolicies();
    for (const t of STUDY) {
      const mine = pol.filter((p) => p.tablename === t);
      expect(mine.map((p) => p.policyname), t).toEqual([`${t}_own_select`]);
      expect(mine[0].permissive, t).toBe("PERMISSIVE");
      expect(mine[0].roles, t).toBe("{authenticated}");
      expect(mine[0].q, t).toBe("((user_id=(SELECTuid()ASuid))AND(SELECTemail_verified()ASemail_verified))");
    }
  });

  it("the read-policy guard catches a broader policy added beside the gated one", async () => {
    await db.exec("begin");
    try {
      await db.exec("create policy bookmarks_wide_select on public.bookmarks for select to authenticated using (true)");
      const added = (await readPolicies()).filter((p) => p.tablename === "bookmarks").map((p) => p.policyname).sort();
      expect(added).toEqual(["bookmarks_own_select", "bookmarks_wide_select"]);
    } finally {
      await db.exec("rollback");
    }
    expect((await readPolicies()).filter((p) => p.tablename === "bookmarks")).toHaveLength(1);
  });

  // Every policy on the six study tables, read and write, pinned exactly:
  // INSERT and UPDATE were still checked with .find() and /sync_allowed\(\)/,
  // which would pass an extra permissive write policy or `true OR sync_allowed()`.
  const norm = (s: string | null) => (s ?? "").replace(/\s/g, "").replace(/(public|auth)\./g, "");
  const OWN = "(user_id=(SELECTuid()ASuid))";
  const GATED_READ = `(${OWN}AND(SELECTemail_verified()ASemail_verified))`;
  const GATED_WRITE = `(${OWN}AND(SELECTsync_allowed()ASsync_allowed))`;
  const allPolicies = async () => (await db.query<{ tablename: string; policyname: string; cmd: string; permissive: string; roles: string; qual: string | null; with_check: string | null }>(
    "select tablename, policyname, cmd, permissive, roles::text as roles, qual, with_check from pg_policies where schemaname = 'public' and tablename = any($1) order by tablename, policyname",
    [STUDY as unknown as string[]])).rows;

  it("every policy on each study table is exactly own_select, own_insert and own_update: permissive, authenticated only, with the exact USING and WITH CHECK", async () => {
    const pol = await allPolicies();
    for (const t of STUDY) {
      const shape = pol.filter((p) => p.tablename === t).map((p) => ({ name: p.policyname, cmd: p.cmd, permissive: p.permissive, roles: p.roles, qual: norm(p.qual), check: norm(p.with_check) }));
      expect(shape, t).toEqual([
        { name: `${t}_own_insert`, cmd: "INSERT", permissive: "PERMISSIVE", roles: "{authenticated}", qual: "", check: GATED_WRITE },
        { name: `${t}_own_select`, cmd: "SELECT", permissive: "PERMISSIVE", roles: "{authenticated}", qual: GATED_READ, check: "" },
        { name: `${t}_own_update`, cmd: "UPDATE", permissive: "PERMISSIVE", roles: "{authenticated}", qual: GATED_WRITE, check: GATED_WRITE },
      ]);
    }
  });

  it("the full-shape guard catches an extra write policy, a weakened OR, a widened role and a missing WITH CHECK", async () => {
    const mutations = [
      "create policy goals_wide_insert on public.goals for insert to authenticated with check (true)",
      "alter policy goals_own_insert on public.goals with check (true or (select public.sync_allowed()))",
      "alter policy goals_own_update on public.goals to authenticated, anon",
      "alter policy goals_own_update on public.goals using (user_id = (select auth.uid()))",
    ];
    for (const m of mutations) {
      await db.exec("begin");
      try {
        await db.exec(m);
        const goals = (await allPolicies()).filter((p) => p.tablename === "goals");
        const exact = goals.length === 3
          && goals.every((p) => p.permissive === "PERMISSIVE" && p.roles === "{authenticated}")
          && norm(goals.find((p) => p.cmd === "INSERT")?.with_check ?? null) === GATED_WRITE
          && norm(goals.find((p) => p.cmd === "UPDATE")?.qual ?? null) === GATED_WRITE
          && norm(goals.find((p) => p.cmd === "UPDATE")?.with_check ?? null) === GATED_WRITE;
        expect(exact, m).toBe(false);
      } finally {
        await db.exec("rollback");
      }
    }
    expect((await allPolicies()).filter((p) => p.tablename === "goals")).toHaveLength(3);
  });

  it("the eligibility functions keep security definer and an empty search_path", async () => {
    for (const fn of ["public.sync_allowed()", "public.enable_sync()"]) {
      const f = await one<string>("select prosecdef::text as d, array_to_string(proconfig, ',') as c from pg_proc where oid = $1::regprocedure", [fn]);
      expect(f, fn).toEqual({ d: "true", c: 'search_path=""' });
    }
  });

  it("email_verified() is security definer with search_path pinned to empty", async () => {
    const f = await one<string>("select prosecdef::text as d, array_to_string(proconfig, ',') as c from pg_proc where oid = 'public.email_verified()'::regprocedure");
    expect(f.d).toBe("true");
    expect(f.c).toBe('search_path=""');
  });
});

describe("rollback", () => {
  it("restores the previous functions and SELECT policies exactly, drops email_verified(), and re-applies", async () => {
    const fnq = "select string_agg(pg_get_functiondef(p.oid), E'\\n' order by p.proname) as d from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in ('sync_allowed', 'enable_sync')";
    const polq = "select string_agg(tablename || ':' || policyname || ':' || cmd || ':' || coalesce(qual, '') || ':' || coalesce(with_check, ''), E'\\n' order by tablename, policyname) as d from pg_policies where schemaname = 'public'";
    // The later migrations are rolled back first, newest first (student_accounts_down.sql, steps 1-4;
    // each older rollback refuses otherwise).
    await db.exec(read("supabase", "rollback", "withdraw_cloud_copies_down.sql"));
    await db.exec(read("supabase", "rollback", "consent_recorded_at_server_only_down.sql"));
    await db.exec(read("supabase", "rollback", "remove_age_restrictions_down.sql"));
    await db.exec(read("supabase", "rollback", "verified_email_down.sql"));
    expect((await db.query("select 1 from pg_proc where proname = 'email_verified'")).rows).toHaveLength(0);
    const fresh = new PGlite();
    try {
      await fresh.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
      for (const f of files.filter((f) => f !== FIX && f !== AGE && f !== CONSENT_TS && f !== WITHDRAW)) await fresh.exec(read("supabase", "migrations", f));
      // Compared without carriage returns: a Windows checkout stores CRLF in function bodies.
      const norm = (d: string) => d.replace(/\r/g, "");
      for (const q of [fnq, polq]) expect(norm((await one<string>(q)).d)).toBe(norm((await fresh.query<{ d: string }>(q)).rows[0].d));
    } finally { await fresh.close(); }
    await db.exec(read("supabase", "migrations", FIX));
    expect((await db.query("select 1 from pg_proc where proname = 'email_verified'")).rows).toHaveLength(1);
    for (const f of [AGE, CONSENT_TS, WITHDRAW]) await db.exec(read("supabase", "migrations", f)); // re-applied in order
  });
});
