import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// The documented rollback (supabase/rollback/student_accounts_down.sql) must
// remove exactly what the migrations created, leave Supabase's auth schema
// and users untouched, and allow the migrations to be re-applied.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const migrations = () => readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort().map((f) => read("supabase", "migrations", f));
const U = "00000000-0000-4000-8000-0000000000e1";
let db: PGlite;
const count = async (sql: string) => Number(Object.values((await db.query<Record<string, unknown>>(sql)).rows[0])[0]);
const atlasObjects = () => count("select (select count(*) from pg_class where relnamespace = 'public'::regnamespace) + (select count(*) from pg_proc where pronamespace = 'public'::regnamespace)");

beforeAll(async () => {
  db = new PGlite();
  await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
  await db.exec("create table public.unrelated_owner_table (id int primary key); insert into public.unrelated_owner_table values (1);");
  for (const m of migrations()) await db.exec(m);
  await db.query("insert into auth.users (id, email) values ($1, 'rollback@example.test')", [U]);
  await db.exec(`set role authenticated; select set_config('request.jwt.claims', '{"sub":"${U}"}', false); insert into public.profiles (age_band) values ('18-plus'); reset role;`);
}, 60_000);
afterAll(async () => db?.close());

describe("rollback script", () => {
  it("removes every Atlas table and function, and nothing else", async () => {
    expect(await atlasObjects()).toBeGreaterThan(30);
    await db.exec(read("supabase", "rollback", "student_accounts_down.sql"));
    const left = await db.query<{ name: string }>("select relname as name from pg_class where relnamespace = 'public'::regnamespace union all select proname from pg_proc where pronamespace = 'public'::regnamespace");
    expect(left.rows.map((r) => r.name).sort()).toEqual(["unrelated_owner_table", "unrelated_owner_table_pkey"]);
  });

  it("leaves Supabase's auth schema and users intact", async () => {
    expect(await count(`select count(*) from auth.users where id = '${U}'`)).toBe(1);
    expect(await count("select count(*) from pg_proc where proname = 'uid' and pronamespace = 'auth'::regnamespace")).toBe(1);
  });

  it("the migrations re-apply cleanly afterwards", async () => {
    for (const m of migrations()) await db.exec(m);
    expect(await count("select count(*) from pg_class where relnamespace = 'public'::regnamespace and relkind = 'r'")).toBe(13); // 12 Atlas tables (deletion_rate since 20261122010000) + the unrelated one
    const cfg = (await db.query<{ key: string; value: string }>("select key, value from public.app_config order by key")).rows;
    expect(cfg.filter((r) => r.key !== "consent_version")).toEqual([
      { key: "account_deletion_enabled", value: "false" },
      { key: "adult_sync_permitted", value: "false" },
      { key: "minor_sync_permitted", value: "false" },
    ]);
  });
});

// ── The full rollback procedure covers every migration (owner review, 2026-11-28) ──
// student_accounts_down.sql lists the procedure as "step N: <file> undoes <versions>", newest first,
// and one history cleanup for all migrations. Each individual rollback carries its own cleanup line.
const nocr = (s: string) => s.replace(/\r/g, "");
const migrationFiles = () => readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort();
const versionOf = (f: string) => f.slice(0, 14);
const FULL = nocr(read("supabase", "rollback", "student_accounts_down.sql"));
const steps = [...FULL.matchAll(/^--\s+step (\d+): (\S+)(?: \(this file\))?\s+undoes ((?:\d{14}\s*)+)$/gm)].map((m) => ({
  n: Number(m[1]),
  file: m[2],
  versions: m[3].trim().split(/\s+/),
}));
const cleanupOf = (text: string) => {
  const m = nocr(text).match(/^--\s+(delete from supabase_migrations\.schema_migrations where version (?:= '\d{14}'|in \((?:'\d{14}'(?:, )?)+\));)$/m);
  if (!m) throw new Error("no executable history cleanup line");
  return m[1];
};
const versionsIn = (stmt: string) => [...stmt.matchAll(/'(\d{14})'/g)].map((m) => m[1]);

describe("the full rollback procedure covers every migration", () => {
  it("lists every migration exactly once, newest first, ending with this file", () => {
    const all = migrationFiles().map(versionOf);
    expect(steps.map((s) => s.n)).toEqual(steps.map((_, i) => i + 1));
    const covered = steps.flatMap((s) => s.versions);
    expect([...covered].sort()).toEqual([...all].sort()); // nothing missing, nothing extra
    expect(new Set(covered).size).toBe(covered.length); // nothing twice
    expect(covered).toEqual([...all].sort().reverse()); // strictly newest first
    expect(steps[steps.length - 1].file).toBe("student_accounts_down.sql");
  });

  it("every individual rollback file is a step, exists, and names the migration it undoes", () => {
    const individual = readdirSync(path.join(ROOT, "supabase", "rollback")).filter((f) => f.endsWith("_down.sql") && f !== "student_accounts_down.sql").sort();
    expect(steps.slice(0, -1).map((s) => s.file).sort()).toEqual(individual);
    for (const s of steps.slice(0, -1)) {
      expect(s.versions, s.file).toHaveLength(1);
      const head = nocr(read("supabase", "rollback", s.file)).split("\n").slice(0, 3).join("\n");
      expect(head, s.file).toContain(s.versions[0]);
      expect(migrationFiles().some((f) => versionOf(f) === s.versions[0]), s.file).toBe(true);
    }
  });

  it("every migration's history row is removed by exactly one cleanup line (the full one also covers all)", () => {
    const all = migrationFiles().map(versionOf);
    expect(versionsIn(cleanupOf(FULL)).sort()).toEqual([...all].sort());
    for (const s of steps.slice(0, -1)) expect(versionsIn(cleanupOf(read("supabase", "rollback", s.file))), s.file).toEqual(s.versions);
    // The header's migration list (from "ROLLBACK for migrations" up to the procedure) names every file too.
    const list = FULL.slice(FULL.indexOf("-- ROLLBACK for migrations"), FULL.indexOf("-- FULL ROLLBACK PROCEDURE"));
    expect(list.length).toBeGreaterThan(0);
    for (const f of migrationFiles()) expect(list, f).toContain(f);
  });
});

describe("the full rollback procedure, executed", () => {
  let pg: PGlite;
  const left = async () => (await pg.query<{ name: string }>("select relname as name from pg_class where relnamespace = 'public'::regnamespace union all select proname from pg_proc where pronamespace = 'public'::regnamespace")).rows.map((r) => r.name).sort();
  const history = async () => (await pg.query<{ v: string }>("select version as v from supabase_migrations.schema_migrations order by version")).rows.map((r) => r.v);
  async function fullSchema() {
    pg = new PGlite();
    await pg.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
    // The CLI's history table, as Supabase keeps it (test stand-in).
    await pg.exec("create schema supabase_migrations; create table supabase_migrations.schema_migrations (version text primary key)");
    for (const f of migrationFiles()) {
      await pg.exec(read("supabase", "migrations", f));
      await pg.query("insert into supabase_migrations.schema_migrations (version) values ($1)", [versionOf(f)]);
    }
    await pg.query("insert into auth.users (id, email) values ($1, 'procedure@example.test')", [U]);
  }
  afterAll(async () => pg?.close());

  it("steps 2-4 refuse to run out of order, and a refusal changes nothing", async () => {
    await fullSchema();
    const before = await left();
    for (const s of steps.slice(1, -1)) {
      let refused = "";
      try { await pg.exec(read("supabase", "rollback", s.file)); } catch (e) { refused = (e as Error).message; }
      expect(refused, s.file).toMatch(/Roll back \d{14} first/);
      await pg.exec("rollback").catch(() => undefined); // the refused script left its transaction aborted
      expect(await left(), s.file).toEqual(before);
    }
    await pg.close();
  });

  it("steps 1-5 in order, each with its own history cleanup: nothing Atlas remains, history is empty, auth.users intact", async () => {
    await fullSchema();
    for (const s of steps) {
      await pg.exec(read("supabase", "rollback", s.file));
      await pg.exec(cleanupOf(read("supabase", "rollback", s.file)));
      const remaining = await history();
      for (const v of s.versions) expect(remaining, `${s.file} leaves ${v} recorded`).not.toContain(v);
    }
    expect(await left()).toEqual([]);
    expect(await history()).toEqual([]);
    expect(Number((await pg.query<{ n: number }>("select count(*)::int as n from auth.users where id = $1", [U])).rows[0].n)).toBe(1);
  });

  it("after the procedure, all migrations re-apply cleanly", async () => {
    for (const f of migrationFiles()) await pg.exec(read("supabase", "migrations", f));
    expect((await pg.query("select 1 from pg_proc where proname = 'withdraw_cloud_copies'")).rows).toHaveLength(1);
    expect((await pg.query("select 1 from pg_proc where proname = 'email_verified'")).rows).toHaveLength(1);
    await pg.close();
  });

  it("step 5 alone (steps 1-4 skipped) also removes everything, and its cleanup empties the history", async () => {
    await fullSchema();
    await pg.exec(read("supabase", "rollback", "student_accounts_down.sql"));
    await pg.exec(cleanupOf(FULL));
    expect(await left()).toEqual([]);
    expect(await history()).toEqual([]);
  });
});
