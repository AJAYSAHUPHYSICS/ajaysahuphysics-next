import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// Tracker T-18 (audit F11): a database rollback must never silently lose
// pending deletion requests (promises to students) or the deletion log.
// export_before_rollback.sql exports them read-only; the rollback script
// refuses to run while either table has rows, unless its ack matches the
// current counts.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const EXPORT = read("supabase", "rollback", "export_before_rollback.sql");
const ROLLBACK = read("supabase", "rollback", "student_accounts_down.sql");
const exportCode = EXPORT.replace(/--.*$/gm, "");
const migrations = () => readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort().map((f) => read("supabase", "migrations", f));
const U1 = "00000000-0000-4000-8000-0000000000f1";
const U2 = "00000000-0000-4000-8000-0000000000f2";
type Export = { pending_deletion_requests: { user_id: string; attempts: number }[]; deletion_log: { user_hash: string; rows_deleted: number }[]; ack: string };

describe("export_before_rollback.sql: read-only", () => {
  it("is a single SELECT with no write, DDL, privilege, session or procedural statement", () => {
    expect(exportCode).not.toMatch(/\b(insert|update|delete|merge|truncate|drop|alter|create|grant|revoke|copy|call|do|execute|prepare|lock|set|reset|begin|commit|rollback)\b/i);
    expect(exportCode.trim().split(";").filter((s) => s.trim()).length).toBe(1);
    expect(exportCode).toMatch(/^\s*select jsonb_build_object\(/i);
  });
});

describe("rollback guard", () => {
  let db: PGlite;
  const tables = async () => Number((await db.query<{ n: number }>("select count(*)::int as n from pg_class where relnamespace = 'public'::regnamespace and relkind = 'r'")).rows[0].n);
  const runExport = async () => (await db.query<{ export: Export }>(EXPORT)).rows[0].export;
  const rollback = async (ack?: string) => {
    try {
      await db.exec((ack === undefined ? "" : `set atlas.rollback_exported = '${ack}';\n`) + ROLLBACK);
    } finally {
      await db.exec("rollback; reset atlas.rollback_exported;").catch(() => undefined); // leave no aborted transaction behind
    }
  };

  beforeEach(async () => {
    db = new PGlite();
    await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
    for (const m of migrations()) await db.exec(m);
    await db.query("insert into auth.users (id, email) values ($1, 'f1@example.test'), ($2, 'f2@example.test')", [U1, U2]);
  }, 60_000);
  afterEach(async () => db?.close());

  it("the guard runs before anything is dropped", () => {
    const guard = ROLLBACK.indexOf("-- guard:start"), firstDrop = ROLLBACK.search(/^drop /m);
    expect(guard).toBeGreaterThan(ROLLBACK.indexOf("begin;"));
    expect(guard).toBeLessThan(firstDrop);
    expect(ROLLBACK.replace(/--.*$/gm, "").trim()).toMatch(/commit;\s*reset atlas\.rollback_exported;$/); // the ack never carries over
  });

  it("the export returns pending requests and the log, with the ack, inside a read-only transaction", async () => {
    await db.query("insert into public.deletion_requests (user_id, attempts) values ($1, 2)", [U1]);
    await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('abc123', 7)");
    await db.exec("begin transaction read only");
    try {
      const out = await runExport();
      expect(out.pending_deletion_requests).toEqual([expect.objectContaining({ user_id: U1, attempts: 2 })]);
      expect(out.deletion_log).toEqual([expect.objectContaining({ user_hash: "abc123", rows_deleted: 7 })]);
      expect(out.ack).toBe("1/1");
    } finally { await db.exec("rollback"); }
  });

  it("refuses while a deletion request is pending, and drops nothing", async () => {
    await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
    const before = await tables();
    await expect(rollback()).rejects.toThrow(/Rollback refused: 1 pending deletion request\(s\) and 0 deletion-log row\(s\)/);
    expect(await tables()).toBe(before);
    expect((await db.query("select 1 from public.deletion_requests")).rows).toHaveLength(1);
  });

  it("refuses while only the deletion log has rows", async () => {
    await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('h', 1)");
    await expect(rollback()).rejects.toThrow(/0 pending deletion request\(s\) and 1 deletion-log row\(s\)/);
  });

  it("refuses a stale ack: a request that arrived after the export", async () => {
    await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
    const { ack } = await runExport();
    await db.query("insert into public.deletion_requests (user_id) values ($1)", [U2]);
    await expect(rollback(ack)).rejects.toThrow(/2 pending deletion request\(s\)/);
    expect((await db.query("select 1 from public.deletion_requests")).rows).toHaveLength(2);
  });

  it("proceeds with the current ack; auth users are kept, so pending deletions can still be completed", async () => {
    await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
    await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('h', 1)");
    const { ack } = await runExport();
    await rollback(ack);
    expect(await tables()).toBe(0);
    expect((await db.query("select 1 from auth.users where id = $1", [U1])).rows).toHaveLength(1);
  });

  it("needs no ack when both tables are empty", async () => {
    await rollback();
    expect(await tables()).toBe(0);
  });
});
