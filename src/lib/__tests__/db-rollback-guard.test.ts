import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// Tracker T-18 (audit F11): a database rollback must never silently lose
// pending deletion requests (promises to students) or the deletion log.
// export_before_rollback.sql exports them read-only, with an ack that is a
// SHA-256 of every field of every row. The rollback locks both tables,
// recomputes it, and refuses, before any DROP, unless it matches, so an
// export is valid only for the exact records it contains.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const EXPORT = read("supabase", "rollback", "export_before_rollback.sql");
const ROLLBACK = read("supabase", "rollback", "student_accounts_down.sql");
const strip = (s: string) => s.replace(/--.*$/gm, "");
const exportCode = strip(EXPORT);
const migrations = () => readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort().map((f) => read("supabase", "migrations", f));
const U1 = "00000000-0000-4000-8000-0000000000f1";
const U2 = "00000000-0000-4000-8000-0000000000f2";
const ACK = /^v2:(\d+)\/(\d+):([0-9a-f]{64})$/;
type Export = { pending_deletion_requests: { user_id: string; attempts: number }[]; deletion_log: { user_hash: string; rows_deleted: number }[]; ack: string };

describe("export_before_rollback.sql: read-only", () => {
  it("is a single query with no write, DDL, privilege, session, lock or procedural statement", () => {
    expect(exportCode).not.toMatch(/\b(insert|update|delete|merge|truncate|drop|alter|create|grant|revoke|copy|call|do|execute|prepare|lock|set|reset|begin|commit|rollback)\b/i);
    expect(exportCode.trim().split(";").filter((s) => s.trim()).length).toBe(1);
    expect(exportCode).toMatch(/^\s*with\b[\s\S]*\bselect jsonb_build_object\(/i);
  });
});

describe("rollback guard", () => {
  let db: PGlite;
  const tables = async () => Number((await db.query<{ n: number }>("select count(*)::int as n from pg_class where relnamespace = 'public'::regnamespace and relkind = 'r'")).rows[0].n);
  const runExport = async () => (await db.query<{ export: Export }>(EXPORT)).rows[0].export;
  const exportAck = async () => (await runExport()).ack;
  const rows = async (t: string) => (await db.query(`select * from public.${t} order by 1`)).rows;
  // Returns the refusal message, or null if the rollback ran.
  const rollback = async (ack?: string): Promise<string | null> => {
    try {
      await db.exec((ack === undefined ? "" : `set atlas.rollback_exported = '${ack}';\n`) + ROLLBACK);
      return null;
    } catch (e) {
      return String((e as Error).message);
    } finally {
      await db.exec("rollback; reset atlas.rollback_exported;").catch(() => undefined); // leave no aborted transaction behind
    }
  };
  // A refused rollback must leave every table and every deletion record exactly as it was.
  const expectRefusedAndUntouched = async (ack: string | undefined) => {
    const before = { tables: await tables(), req: await rows("deletion_requests"), log: await rows("deletion_log") };
    const msg = await rollback(ack);
    expect(msg).toMatch(/Rollback refused/);
    expect({ tables: await tables(), req: await rows("deletion_requests"), log: await rows("deletion_log") }).toEqual(before);
    return msg as string;
  };

  beforeEach(async () => {
    db = new PGlite();
    await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
    for (const m of migrations()) await db.exec(m);
    await db.query("insert into auth.users (id, email) values ($1, 'f1@example.test'), ($2, 'f2@example.test')", [U1, U2]);
  }, 60_000);
  afterEach(async () => db?.close());

  describe("structure", () => {
    it("the guard locks both tables and runs before anything is dropped; the ack is reset at the end", () => {
      const guardAt = ROLLBACK.indexOf("-- guard:start"), firstDrop = ROLLBACK.search(/^drop /m);
      expect(guardAt).toBeGreaterThan(ROLLBACK.indexOf("begin;"));
      expect(guardAt).toBeLessThan(firstDrop);
      const guard = strip(ROLLBACK.slice(guardAt, ROLLBACK.indexOf("-- guard:end")));
      for (const t of ["deletion_requests", "deletion_log"]) {
        const lock = guard.indexOf(`lock table public.${t} in exclusive mode`), read = guard.indexOf(`from public.${t}`);
        expect(lock, t).toBeGreaterThan(-1);
        expect(lock, t).toBeLessThan(read); // locked before it is read
      }
      expect(strip(ROLLBACK).trim()).toMatch(/commit;\s*reset atlas\.rollback_exported;$/);
    });
  });

  describe("the export", () => {
    it("returns the records and a v2 content ack, inside a read-only transaction", async () => {
      await db.query("insert into public.deletion_requests (user_id, attempts) values ($1, 2)", [U1]);
      await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('abc123', 7)");
      await db.exec("begin transaction read only");
      try {
        const out = await runExport();
        expect(out.pending_deletion_requests).toEqual([expect.objectContaining({ user_id: U1, attempts: 2 })]);
        expect(out.deletion_log).toEqual([expect.objectContaining({ user_hash: "abc123", rows_deleted: 7 })]);
        expect(out.ack).toMatch(ACK);
        expect(ACK.exec(out.ack)!.slice(1, 3)).toEqual(["1", "1"]);
      } finally { await db.exec("rollback"); }
    });

    it("the ack depends on the records' content, not only their number", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      const a = await exportAck();
      await db.query("delete from public.deletion_requests");
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U2]);
      const b = await exportAck();
      expect(a.split(":")[1]).toBe(b.split(":")[1]); // same counts
      expect(a).not.toBe(b);
    });

    it("the ack doesn't depend on the session time zone", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      await db.query("insert into public.deletion_log (user_hash, requested_at, rows_deleted) values ('h', now() - interval '2 days', 3)");
      await db.exec("set timezone = 'UTC'");
      const utc = await exportAck();
      await db.exec("set timezone = 'Asia/Kolkata'");
      expect(await exportAck()).toBe(utc);
      expect(await rollback(utc)).toBeNull(); // exported in UTC, rolled back in IST
      await db.exec("reset timezone");
    });
  });

  describe("refusals: rollback doesn't start, and nothing changes", () => {
    it("with no ack while a deletion request is pending", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      expect(await expectRefusedAndUntouched(undefined)).toMatch(/1 pending deletion request\(s\) and 0 deletion-log row\(s\)/);
    });

    it("with no ack while only the deletion log has rows", async () => {
      await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('h', 1)");
      expect(await expectRefusedAndUntouched(undefined)).toMatch(/0 pending deletion request\(s\) and 1 deletion-log row\(s\)/);
    });

    it("a request that arrived after the export", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      const ack = await exportAck();
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U2]);
      await expectRefusedAndUntouched(ack);
    });

    it("a request replaced by another, with the count unchanged", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      const ack = await exportAck();
      await db.query("delete from public.deletion_requests");
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U2]);
      await expectRefusedAndUntouched(ack);
    });

    it("a request's attempt count changed (e.g. by a sweep), with the count unchanged", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      const ack = await exportAck();
      await db.query("update public.deletion_requests set attempts = attempts + 1");
      await expectRefusedAndUntouched(ack);
    });

    it("a deletion-log row edited, with the count unchanged", async () => {
      await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('h1', 1)");
      const ack = await exportAck();
      await db.query("update public.deletion_log set user_hash = 'h2'");
      await expectRefusedAndUntouched(ack);
    });

    it("a deletion-log row replaced by another, with the count unchanged", async () => {
      await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('h1', 1)");
      const ack = await exportAck();
      await db.query("delete from public.deletion_log");
      await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('h1', 1)"); // same values, new id
      await expectRefusedAndUntouched(ack);
    });

    it("an export can't be reused after the records change, even if they change back in count", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      const ack = await exportAck();
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U2]);
      await db.query("delete from public.deletion_requests where user_id = $1", [U1]);
      await expectRefusedAndUntouched(ack); // count is 1 again, but it's U2 now
      expect(await rollback(await exportAck())).toBeNull(); // a fresh export works
    });

    it("the old count-only ack format and arbitrary values", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      for (const bad of ["1/0", "v2:1/0:" + "0".repeat(64), "yes", ""]) await expectRefusedAndUntouched(bad);
    });

    it("the refusal never discloses a valid ack", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      const valid = await exportAck();
      const msg = await expectRefusedAndUntouched("wrong");
      expect(msg).not.toContain(valid);
      expect(msg).not.toMatch(/[0-9a-f]{64}/);
      expect(msg).toContain("<ack from that export>");
    });
  });

  describe("proceeding", () => {
    it("with a fresh export's ack; auth users are kept, so pending deletions can still be completed", async () => {
      await db.query("insert into public.deletion_requests (user_id) values ($1)", [U1]);
      await db.query("insert into public.deletion_log (user_hash, rows_deleted) values ('h', 1)");
      expect(await rollback(await exportAck())).toBeNull();
      expect(await tables()).toBe(0);
      expect((await db.query("select 1 from auth.users where id = $1", [U1])).rows).toHaveLength(1);
    });

    it("needs no ack when both tables are empty", async () => {
      expect(await rollback()).toBeNull();
      expect(await tables()).toBe(0);
    });
  });
});
