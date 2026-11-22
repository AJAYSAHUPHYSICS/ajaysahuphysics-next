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
    expect(await count("select count(*) from pg_class where relnamespace = 'public'::regnamespace and relkind = 'r'")).toBe(12); // 11 Atlas tables + the unrelated one
    const cfg = (await db.query<{ key: string; value: string }>("select key, value from public.app_config order by key")).rows;
    expect(cfg.filter((r) => r.key !== "consent_version")).toEqual([
      { key: "account_deletion_enabled", value: "false" },
      { key: "adult_sync_permitted", value: "false" },
      { key: "minor_sync_permitted", value: "false" },
    ]);
  });
});
