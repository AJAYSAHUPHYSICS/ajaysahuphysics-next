import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Students can't choose consents.recorded_at (migration 20261126100000, owner
// review of decision J). Its own migration, before 20261127000000, so the
// decision J rollback can't reopen it.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const FILE = "20261126100000_consent_recorded_at_server_only.sql";
const WITHDRAW = "20261127000000_withdraw_cloud_copies.sql";
const files = readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort();
const S = "00000000-0000-4000-8000-0000000000f1";

let db: PGlite;
let VERSION = "";
async function as(role: "authenticated" | "postgres", sub?: string) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
  if (role !== "postgres") await db.exec(`set role ${role}`);
}
const canInsert = async (col: string) => {
  await as("postgres");
  return (await db.query<{ ok: boolean }>("select has_column_privilege('authenticated', 'public.consents', $1, 'INSERT') as ok", [col])).rows[0].ok;
};
async function fails(sql: string, params: unknown[] = []) {
  try { await db.query(sql, params); return ""; } catch (e) { return (e as Error).message; }
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
  for (const f of files) await db.exec(read("supabase", "migrations", f));
  await db.query("insert into auth.users (id, email) values ($1, 'f1@example.test')", [S]);
  VERSION = (await db.query<{ v: string }>("select value as v from public.app_config where key = 'consent_version'")).rows[0].v;
}, 60_000);
afterAll(async () => db?.close());

describe("consents.recorded_at comes from the server only", () => {
  it("is its own migration, ordered before the decision J migration", () => {
    expect(files).toContain(FILE);
    expect(files.indexOf(FILE)).toBe(files.indexOf(WITHDRAW) - 1);
    expect(read("supabase", "migrations", WITHDRAW)).not.toMatch(/grant insert|revoke insert/);
  });

  it("students may insert exactly the server role's columns; never recorded_at or id", async () => {
    for (const col of ["recorded_at", "id"]) expect(await canInsert(col), col).toBe(false);
    for (const col of ["user_id", "kind", "version", "granted", "method"]) expect(await canInsert(col), col).toBe(true);
  });

  it("a future-dated grant is refused; an ordinary choice is recorded with the server's time", async () => {
    await as("authenticated", S);
    expect(await fails("insert into public.consents (kind, version, granted, recorded_at) values ('privacy', $1, true, now() + interval '10 years')", [VERSION])).toMatch(/permission denied/);
    await db.query("insert into public.consents (kind, version, granted) values ('privacy', $1, true)", [VERSION]);
    await as("postgres");
    const r = (await db.query<{ ok: boolean }>("select recorded_at <= now() and recorded_at > now() - interval '1 minute' as ok from public.consents where user_id = $1", [S])).rows;
    expect(r).toEqual([{ ok: true }]);
  });

  it("the decision J rollback does NOT reopen it", async () => {
    await as("postgres");
    await db.exec(read("supabase", "rollback", "withdraw_cloud_copies_down.sql"));
    expect(await canInsert("recorded_at")).toBe(false);
    await db.exec(read("supabase", "migrations", WITHDRAW)); // back to the full schema
  });

  it("its own rollback refuses while 20261127000000 is applied (newest first), changing nothing", async () => {
    await as("postgres");
    let refused = "";
    try { await db.exec(read("supabase", "rollback", "consent_recorded_at_server_only_down.sql")); } catch (e) { refused = (e as Error).message; }
    expect(refused).toMatch(/Roll back 20261127000000 first/);
    await db.exec("rollback").catch(() => undefined); // the refused script left its transaction aborted
    expect(await canInsert("recorded_at")).toBe(false);
  });

  it("after step 1, its own rollback (step 2) restores whole-table INSERT, and both migrations re-apply", async () => {
    await as("postgres");
    await db.exec(read("supabase", "rollback", "withdraw_cloud_copies_down.sql"));
    await db.exec(read("supabase", "rollback", "consent_recorded_at_server_only_down.sql"));
    expect(await canInsert("recorded_at")).toBe(true);
    await db.exec(read("supabase", "migrations", FILE));
    await db.exec(read("supabase", "migrations", WITHDRAW));
    expect(await canInsert("recorded_at")).toBe(false);
    expect(await canInsert("kind")).toBe(true);
  });
});
