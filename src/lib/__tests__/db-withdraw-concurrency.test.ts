import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { CLOUD_COPY_TABLES } from "@/lib/account/cloud-withdrawal";

// Owner review of decision J (issue B, tasks 1 and 3): uploads, withdrawals and
// account deletion racing each other, with REAL concurrent sessions. PGlite has
// one session, so this needs a real PostgreSQL server and the `pg` driver.
//
// It runs only when ATLAS_TEST_PG_URL points at a LOCAL server (localhost or
// 127.0.0.1) with a superuser on a disposable cluster (the test shim creates
// the anon/authenticated/service_role roles, which are cluster-wide), e.g.
//   ATLAS_TEST_PG_URL=postgres://postgres:postgres@127.0.0.1:54329/postgres npx vitest run db-withdraw-concurrency
// It creates a throwaway database, applies the auth shim and every migration,
// and drops the database afterwards. It never connects anywhere else.
//
// Every interleaving is deterministic: the first session takes its lock and
// stays open; the second starts and the test waits until pg_blocking_pids()
// shows it waiting for the FIRST session (and checks it hasn't finished); only
// then does the first session commit. A deadlock (40P01) fails the test.
//
// Fail fast, never hang: every session has lock_timeout 10 s (a lock wait that
// never resolves fails with 55P03), and every test has a 20 s limit. Each
// assertion is tagged with the failure it detects, so a broken lock order is
// reported as one of: NOT BLOCKED, UPLOAD NOT REFUSED, ROW REMAINED, DEADLOCK.
const URL_ENV = process.env.ATLAS_TEST_PG_URL ?? "";
const LOCAL_URL = /^postgres(ql)?:\/\/[^@]+@(localhost|127\.0\.0\.1)(:\d+)?\//;
const LOCAL = LOCAL_URL.test(URL_ENV);
// Set by the db-concurrency CI job: the real tests must run there, never silently skip.
const REQUIRED = process.env.ATLAS_REQUIRE_PG === "1";
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const files = readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort();

type Result = { rows: Record<string, unknown>[] };
type Client = { connect(): Promise<void>; end(): Promise<void>; query(sql: string, params?: unknown[]): Promise<Result> };
type PgModule = { Client: new (opts: { connectionString: string }) => Client };

/** A database session, with its backend pid read up front (a pg client runs one query at a time). */
type Session = { c: Client; pid: number; q: (sql: string, params?: unknown[]) => Promise<Result> };
/** A statement started in the background, whose outcome can be checked without waiting. */
type Pending<T> = { done: boolean; result: Promise<T> };
/** Names the failure a database error stands for (deadlock, lock wait timed out), for the mutation report. */
function tagged<T>(p: Promise<T>): Promise<T> {
  return p.catch((e: { code?: string; message?: string }) => {
    if (e?.code === "40P01") e.message = `DEADLOCK: ${e.message}`;
    if (e?.code === "55P03") e.message = `LOCK TIMEOUT (would hang): ${e.message}`;
    throw e;
  });
}
function background<T>(p: Promise<T>): Pending<T> {
  const r: Pending<T> = { done: false, result: p };
  r.result = p.then((v) => { r.done = true; return v; }, (e) => { r.done = true; throw e; });
  r.result.catch(() => {}); // the test awaits it; avoid an unhandled rejection meanwhile
  return r;
}

describe.runIf(LOCAL)("concurrency (real PostgreSQL, separate sessions): uploads, withdrawals and account deletion", { timeout: 20_000 }, () => {
  let pg: PgModule;
  let admin: Client;
  let dbName = "";
  let url = "";
  let owner: Session;
  let watch: Session;
  const sessions: Session[] = [];
  let VERSION = "";
  let n = 0;

  async function open(): Promise<Session> {
    const c = new pg.Client({ connectionString: url });
    await c.connect();
    await c.query("set lock_timeout = '10s'");
    const pid = (await c.query("select pg_backend_pid() as p")).rows[0].p as number;
    const s = { c, pid, q: (sql: string, params?: unknown[]) => tagged(c.query(sql, params)) };
    sessions.push(s);
    return s;
  }
  /** A session signed in as the student (role authenticated, JWT subject). */
  async function asStudent(sub: string) {
    const s = await open();
    await s.q("set role authenticated");
    await s.q("select set_config('request.jwt.claims', $1, false)", [JSON.stringify({ sub, role: "authenticated" })]);
    return s;
  }
  /** A session as the server role (the delete-account function's purge). */
  async function asServer() {
    const s = await open();
    await s.q("set role service_role");
    return s;
  }
  /** Waits until `waiter` is blocked on a lock held by `holder` (or one of them), then checks it hasn't finished. */
  async function blockedBy(waiter: Session, holder: Session | Session[], pending: Pending<unknown>) {
    const holders = (Array.isArray(holder) ? holder : [holder]).map((h) => h.pid);
    for (let i = 0; i < 400; i++) {
      const r = await watch.q("select pg_blocking_pids($1) as b, wait_event_type as w from pg_stat_activity where pid = $1", [waiter.pid]);
      const row = r.rows[0] as { b: number[]; w: string | null } | undefined;
      if (row?.w === "Lock" && row.b.some((b) => holders.includes(b))) {
        expect(pending.done, "NOT BLOCKED: the waiting session finished before the first one committed").toBe(false);
        return;
      }
      if (pending.done) throw new Error(`NOT BLOCKED: session ${waiter.pid} finished without waiting for ${holders}`);
      await new Promise((res) => setTimeout(res, 10));
    }
    throw new Error(`NOT BLOCKED: session ${waiter.pid} never blocked on session ${holders}`);
  }
  /** Every cloud-copy row the student has, counted by the owner. */
  async function cloudRows(sub: string) {
    const out: Record<string, number> = {};
    for (const t of CLOUD_COPY_TABLES) out[t] = Number((await owner.q(`select count(*)::int as n from public.${t} where user_id = $1`, [sub])).rows[0].n);
    return out;
  }
  const total = (r: Record<string, number>) => Object.values(r).reduce((a, b) => a + b, 0);
  const ZERO = Object.fromEntries(CLOUD_COPY_TABLES.map((t) => [t, 0]));
  /** One upload statement per cloud-copy table (the sync engine's upsert shape for streaks). */
  async function uploadAll(s: Session, tag: string) {
    const now = new Date().toISOString();
    await s.q("insert into public.bookmarks (bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1, '11', 'kinematics', 'chapter', 'K', 'K', '/class-11/kinematics', $2)", [`b:${tag}`, now]);
    await s.q("insert into public.checklist_items (cls, slug, item, done) values ('11', $1, 'notes', true)", [`slug-${tag}`]);
    await s.q("insert into public.revision_rounds (cls, slug, round, completed_at) values ('11', $1, 1, $2)", [`slug-${tag}`, now]);
    await s.q("insert into public.mistakes (id, cls, slug, chapter_name, resource_type, concept_tag, difficulty, created_at) values (gen_random_uuid(), '11', 'kinematics', 'K', 'dpp', $1, 'easy', $2)", [tag, now]);
    await s.q("insert into public.goals (goal_type, activated_at) values ($1, $2)", [`goal-${tag}`, now]);
    await s.q("insert into public.streaks (current_days, longest_days) values (1, 2) on conflict (user_id) do update set current_days = excluded.current_days");
  }
  /** A new student with a profile, full consent, cloud copies on and one row in each table. */
  async function syncingStudent() {
    n += 1;
    const sub = `00000000-0000-4000-8000-${(0xc00 + n).toString(16).padStart(12, "0")}`;
    await owner.q("insert into auth.users (id, email) values ($1, $2)", [sub, `cc${n}@example.test`]);
    const s = await asStudent(sub);
    await s.q("insert into public.profiles (display_name, age_band) values ('CC', '18-plus')");
    for (const k of ["terms", "privacy", "cloud-sync"]) await s.q("insert into public.consents (kind, version, granted) values ($1, $2, true)", [k, VERSION]);
    expect((await s.q("select public.enable_sync() as r")).rows[0].r).toBe("enabled");
    await uploadAll(s, "seed");
    expect(total(await cloudRows(sub)), "SETUP: uploads not stored").toBe(6);
    await s.c.end();
    return sub;
  }
  const profileExists = async (sub: string) => Number((await owner.q("select count(*)::int as n from public.profiles where user_id = $1", [sub])).rows[0].n) === 1;
  const purge = (s: Session, sub: string) => s.q("select public.purge_user_data($1) as n", [sub]);
  const withdraw = (s: Session) => s.q("select public.withdraw_cloud_copies() as r").then((r) => r.rows[0].r as { withdrawn: boolean; withdrawal_recorded: boolean; deleted: Record<string, number> });

  beforeAll(async () => {
    try {
      const name = "pg"; // a devDependency; imported lazily so the rest of the suite never needs it
      pg = (await import(/* @vite-ignore */ name)) as PgModule;
    } catch {
      throw new Error("ATLAS_TEST_PG_URL is set but the `pg` driver isn't installed (npm i -D pg).");
    }
    dbName = `atlas_concurrency_${Date.now().toString(36)}`;
    admin = new pg.Client({ connectionString: URL_ENV });
    await admin.connect();
    await admin.query(`create database ${dbName}`);
    url = URL_ENV.replace(/\/[^/?]*(\?|$)/, `/${dbName}$1`);
    owner = await open();
    watch = await open();
    await owner.q(read("supabase", "tests", "supabase-auth-shim.sql"));
    for (const f of files) await owner.q(read("supabase", "migrations", f));
    await owner.q("update public.app_config set value = 'true' where key in ('adult_sync_permitted', 'account_deletion_enabled')"); // test DB only
    VERSION = (await owner.q("select value from public.app_config where key = 'consent_version'")).rows[0].value as string;
  }, 60_000);

  // Each scenario's sessions are closed when it ends, so a failed scenario can't leave a transaction (and
  // its locks) open for the next one: every failure is reported on its own, never as a cascade.
  afterEach(async () => {
    const keep = new Set([owner?.pid, watch?.pid]);
    for (const s of sessions.splice(0)) {
      if (keep.has(s.pid)) sessions.push(s);
      else await s.c.end().catch(() => {});
    }
  });

  afterAll(async () => {
    for (const s of sessions) await s.c.end().catch(() => {});
    if (admin) {
      if (dbName) await admin.query(`drop database if exists ${dbName} with (force)`).catch(() => {});
      await admin.end();
    }
  });

  // ── Task 1: uploads vs withdrawal ─────────────────────────────────
  it("1. the upload holds the profile lock first: the withdrawal waits, then deletes the committed upload", async () => {
    const sub = await syncingStudent();
    const U = await asStudent(sub);
    const W = await asStudent(sub);
    await U.q("begin");
    await uploadAll(U, "in-flight"); // five new rows and the streak upsert, uncommitted
    await W.q("begin");
    const w = background(withdraw(W));
    await blockedBy(W, U, w);
    await U.q("commit");
    const r = await w.result;
    await W.q("commit");
    expect(r.withdrawn).toBe(true);
    expect(r.withdrawal_recorded).toBe(true);
    expect(total(r.deleted), "ROW REMAINED (in-flight rows not deleted)").toBe(11); // 6 seeded + 5 in-flight (the streak upsert updated the seeded row)
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
    // And after the withdrawal nothing more can be stored.
    await expect(U.q("insert into public.goals (goal_type, activated_at) values ('later', now())"), "UPLOAD NOT REFUSED").rejects.toMatchObject({ code: "42501" });
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
  });

  it("2. the withdrawal holds the profile lock first: the waiting upload (snapshot from before the commit) is refused", async () => {
    const sub = await syncingStudent();
    const U = await asStudent(sub);
    const W = await asStudent(sub);
    await W.q("begin");
    const r = await withdraw(W);
    expect(total(r.deleted), "SETUP: seeded rows").toBe(6);
    await U.q("begin");
    await U.q("select 1"); // U's transaction (and snapshot) starts before the withdrawal commits
    const u = background(U.q("insert into public.goals (goal_type, activated_at) values ('in-flight', now())"));
    await blockedBy(U, W, u);
    await W.q("commit");
    await expect(u.result, "UPLOAD NOT REFUSED").rejects.toMatchObject({ code: "42501", message: 'new row violates row-level security policy for table "goals"' });
    await U.q("rollback");
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
  });

  it("2b. same, for an upsert whose UPDATE half would hit an existing row: refused, nothing remains", async () => {
    const sub = await syncingStudent();
    const U = await asStudent(sub);
    const W = await asStudent(sub);
    await W.q("begin");
    await withdraw(W);
    await U.q("begin");
    const u = background(U.q("insert into public.streaks (current_days, longest_days) values (9, 9) on conflict (user_id) do update set current_days = 9"));
    await blockedBy(U, W, u);
    await W.q("commit");
    await expect(u.result, "UPLOAD NOT REFUSED").rejects.toMatchObject({ code: "42501" });
    await U.q("rollback");
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
  });

  // ── Task 3: account deletion vs uploads and withdrawals ───────────
  it("3. upload first, then account deletion: the purge waits, then deletes the committed upload", async () => {
    const sub = await syncingStudent();
    const U = await asStudent(sub);
    const P = await asServer();
    const logBefore = Number((await owner.q("select count(*)::int as n from public.deletion_log")).rows[0].n);
    await U.q("begin");
    await uploadAll(U, "in-flight");
    await P.q("begin");
    const p = background(purge(P, sub));
    await blockedBy(P, U, p);
    await U.q("commit");
    await p.result;
    await P.q("commit");
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
    expect(await profileExists(sub), "PROFILE REMAINED").toBe(false);
    expect(Number((await owner.q("select count(*)::int as n from public.deletion_log")).rows[0].n)).toBe(logBefore + 1);
  });

  it("4. account deletion first: the waiting upload finds no profile and is refused", async () => {
    const sub = await syncingStudent();
    const U = await asStudent(sub);
    const P = await asServer();
    await P.q("begin");
    await purge(P, sub);
    await U.q("begin");
    await U.q("select 1");
    const u = background(U.q("insert into public.goals (goal_type, activated_at) values ('in-flight', now())"));
    await blockedBy(U, P, u);
    await P.q("commit");
    await expect(u.result, "UPLOAD NOT REFUSED").rejects.toMatchObject({ code: "42501" });
    await U.q("rollback");
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
  });

  it("5. no deadlock: an upload that touches a row the purge reached first, then another row (the old order deadlocked)", async () => {
    const sub = await syncingStudent();
    const U = await asStudent(sub);
    const P = await asServer();
    await U.q("begin");
    await U.q("update public.streaks set longest_days = longest_days + 1"); // the last table the purge deletes from
    await P.q("begin");
    const p = background(purge(P, sub));
    await blockedBy(P, U, p);
    // Before 20261127000000 the purge had already deleted (locked) the bookmark here and waited on the
    // streak, so this statement waited on the purge: a deadlock (40P01). Now the purge waits at the profile.
    await U.q("update public.bookmarks set label = 'edited'");
    await U.q("commit");
    await p.result;
    await P.q("commit");
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
    expect(await profileExists(sub), "PROFILE REMAINED").toBe(false);
  });

  it("6. withdrawal and account deletion, in both orders: no deadlock, nothing remains", async () => {
    for (const withdrawalFirst of [true, false]) {
      const sub = await syncingStudent();
      const W = await asStudent(sub);
      const P = await asServer();
      const [first, second] = withdrawalFirst ? [W, P] : [P, W];
      await first.q("begin");
      await (withdrawalFirst ? withdraw(W) : purge(P, sub));
      await second.q("begin");
      const s = background<unknown>(withdrawalFirst ? purge(P, sub) : withdraw(W));
      await blockedBy(second, first, s);
      await first.q("commit");
      await s.result;
      await second.q("commit");
      expect(await cloudRows(sub), `ROW REMAINED (withdrawal first: ${withdrawalFirst})`).toEqual(ZERO);
      expect(await profileExists(sub), "PROFILE REMAINED").toBe(false);
    }
  });

  it("7. an upload in flight while a withdrawal and an account deletion both wait: all finish, nothing remains", async () => {
    const sub = await syncingStudent();
    const U = await asStudent(sub);
    const W = await asStudent(sub);
    const P = await asServer();
    await U.q("begin");
    await uploadAll(U, "in-flight");
    await W.q("begin");
    const w = background(withdraw(W));
    await blockedBy(W, U, w);
    await P.q("begin");
    const p = background(purge(P, sub));
    await blockedBy(P, [U, W], p); // queued behind W for the same row
    await U.q("commit");
    const r = await w.result; // first in the lock queue
    expect(total(r.deleted), "ROW REMAINED (in-flight rows not deleted)").toBe(11);
    expect(p.done, "NOT BLOCKED: purge finished before the withdrawal committed").toBe(false); // the purge now waits for the withdrawal
    await W.q("commit");
    await p.result;
    await P.q("commit");
    expect(await cloudRows(sub), "ROW REMAINED").toEqual(ZERO);
    expect(await profileExists(sub), "PROFILE REMAINED").toBe(false);
  });

  it("8. a deletion request and the purge, in both orders: no deadlock", async () => {
    for (const requestFirst of [true, false]) {
      const sub = await syncingStudent();
      const R = await asStudent(sub);
      const P = await asServer();
      const [first, second] = requestFirst ? [R, P] : [P, R];
      const request = () => R.q("select public.request_account_deletion() as at");
      await first.q("begin");
      await (requestFirst ? request() : purge(P, sub));
      await second.q("begin");
      const s = background(requestFirst ? purge(P, sub) : request());
      await blockedBy(second, first, s);
      await first.q("commit");
      await s.result;
      await second.q("commit");
      expect(await cloudRows(sub), `ROW REMAINED (request first: ${requestFirst})`).toEqual(ZERO);
      expect(await profileExists(sub), "PROFILE REMAINED").toBe(false);
    }
  });

  // ── The consent allowance under concurrency (owner decision 2026-11-28) ──
  /** A student past the 200-row threshold with `changes` genuine changes in the last 24 hours (planted as the owner). */
  async function cappedStudent(changes: number) {
    n += 1;
    const sub = `00000000-0000-4000-8000-${(0xd00 + n).toString(16).padStart(12, "0")}`;
    await owner.q("insert into auth.users (id, email) values ($1, $2)", [sub, `cap${n}@example.test`]);
    await owner.q("alter table public.consents disable trigger consents_cap"); // test setup only
    await owner.q("insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'privacy', 'old-version', true, now() - interval '2 days' from generate_series(1, 200)", [sub]);
    await owner.q("insert into public.consents (user_id, kind, version, granted, recorded_at) select $1, 'terms', 'burst', g % 2 = 1, now() - interval '1 hour' + g * interval '1 second' from generate_series(1, $2::int) g", [sub, changes]);
    await owner.q("alter table public.consents enable trigger consents_cap");
    return sub;
  }
  const consentRows = async (sub: string, kind: string, granted: boolean) =>
    Number((await owner.q("select count(*)::int as n from public.consents where user_id = $1 and kind = $2 and version = $3 and granted = $4", [sub, kind, VERSION, granted])).rows[0].n);

  it("9. two fresh grants at the same moment with one allowance left: exactly one is recorded", async () => {
    const sub = await cappedStudent(19);
    const A = await asStudent(sub);
    const B = await asStudent(sub);
    await A.q("begin");
    await A.q("insert into public.consents (kind, version, granted) values ('privacy', $1, true)", [VERSION]); // the 20th change, uncommitted
    await B.q("begin");
    const b = background(B.q("insert into public.consents (kind, version, granted) values ('cloud-sync', $1, true)", [VERSION]));
    await blockedBy(B, A, b); // waits on A's per-student lock
    await A.q("commit");
    await expect(b.result, "ALLOWANCE BYPASSED").rejects.toMatchObject({ code: "54000" });
    await B.q("rollback");
    expect(await consentRows(sub, "privacy", true), "ALLOWANCE BYPASSED").toBe(1);
    expect(await consentRows(sub, "cloud-sync", true), "ALLOWANCE BYPASSED").toBe(0);
  });

  it("10. the same first refusal sent twice at the same moment: one row, the second is skipped", async () => {
    const sub = await cappedStudent(20);
    const A = await asStudent(sub);
    const B = await asStudent(sub);
    await A.q("begin");
    await A.q("insert into public.consents (kind, version, granted) values ('privacy', $1, false)", [VERSION]);
    await B.q("begin");
    const b = background(B.q("insert into public.consents (kind, version, granted) values ('privacy', $1, false)", [VERSION]));
    await blockedBy(B, A, b);
    await A.q("commit");
    await b.result; // succeeds, adds nothing
    await B.q("commit");
    expect(await consentRows(sub, "privacy", false), "DUPLICATE ROW").toBe(1);
  });
});

describe("concurrency test guard", () => {
  it("when required (ATLAS_REQUIRE_PG=1, the db-concurrency CI job), a local database is configured, so the real tests run", () => {
    if (REQUIRED) expect(LOCAL, "ATLAS_REQUIRE_PG=1, but ATLAS_TEST_PG_URL isn't a localhost/127.0.0.1 PostgreSQL URL").toBe(true);
  });

  it("only ever targets a local server", () => {
    for (const u of ["postgres://u:p@db.abcdefghijklmnopqrst.supabase.co:5432/postgres", "postgres://u:p@aws-0-x.pooler.supabase.com:6543/postgres", "postgres://u:p@10.0.0.5/postgres", "postgres://u:p@localhost.evil.example/postgres"]) {
      expect(LOCAL_URL.test(u), u).toBe(false);
    }
    expect(LOCAL_URL.test("postgres://postgres:postgres@127.0.0.1:54329/postgres")).toBe(true);
  });
});
