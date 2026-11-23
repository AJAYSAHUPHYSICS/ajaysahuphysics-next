import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Migration 20261123000000 (tracker T-14): clients must hold no privilege on
// the deletion log's identity sequence, while the deletion path and student
// consent inserts keep working.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const DIR = path.join(ROOT, "supabase", "migrations");
const FIX = "20261123000000_deletion_log_sequence_privilege.sql";
const files = readdirSync(DIR).filter((f) => f.endsWith(".sql")).sort();
const A = "00000000-0000-4000-8000-00000000000a";

async function fresh(upTo: "before-fix" | "all") {
  const db = new PGlite();
  await db.exec(readFileSync(path.join(ROOT, "supabase", "tests", "supabase-auth-shim.sql"), "utf8"));
  for (const f of files) {
    if (upTo === "before-fix" && f >= FIX) break;
    await db.exec(readFileSync(path.join(DIR, f), "utf8"));
  }
  return db;
}
const privileges = async (db: PGlite, role: string, seq: string) =>
  (await db.query<{ p: string }>(
    "select p from unnest(array['USAGE', 'SELECT', 'UPDATE']) p where has_sequence_privilege($1, $2, p)", [role, seq],
  )).rows.map((r) => r.p);

describe("deletion_log_id_seq privileges (T-14)", () => {
  it("the fix runs after the four Phase 2B migrations", () => {
    expect(files.indexOf(FIX)).toBe(files.length - 1);
    expect(files.slice(0, -1)).toEqual([
      "20261120000000_student_accounts.sql", "20261121000000_service_role_grants.sql",
      "20261122000000_account_deletion_gate.sql", "20261122010000_deletion_rate_limit.sql",
    ]);
  });

  it("before the fix, authenticated has USAGE (the finding this migration closes)", async () => {
    const db = await fresh("before-fix");
    try {
      expect(await privileges(db, "authenticated", "public.deletion_log_id_seq")).toContain("USAGE");
    } finally { await db.close(); }
  }, 60_000);

  describe("after all migrations", () => {
    let db: PGlite;
    beforeAll(async () => {
      db = await fresh("all");
      await db.query("insert into auth.users (id, email) values ($1, 'a@example.test')", [A]);
    }, 60_000);
    afterAll(async () => db?.close());
    const as = async (role: "authenticated" | "anon" | "postgres", sub?: string) => {
      await db.exec("reset role");
      await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
      if (role !== "postgres") await db.exec(`set role ${role}`);
    };

    it("no client role holds any privilege on deletion_log_id_seq", async () => {
      for (const role of ["anon", "authenticated"]) expect(await privileges(db, role, "public.deletion_log_id_seq"), role).toEqual([]);
      const acl = (await db.query<{ acl: string | null }>("select relacl::text as acl from pg_class where oid = 'public.deletion_log_id_seq'::regclass")).rows[0].acl ?? "";
      expect(acl).not.toMatch(/(^|[{,])(=|anon=|authenticated=)/); // no PUBLIC, anon or authenticated entry
    });

    it("a signed-in student can't advance the sequence", async () => {
      await as("authenticated", A);
      try {
        await expect(db.query("select nextval('public.deletion_log_id_seq')")).rejects.toThrow(/permission denied/);
      } finally { await as("postgres"); }
    });

    it("the deletion path still writes the log (purge_user_data, as the owner)", async () => {
      const before = (await db.query<{ n: number }>("select count(*)::int as n from public.deletion_log")).rows[0].n;
      await db.query("select public.purge_user_data($1)", [A]);
      expect((await db.query<{ n: number }>("select count(*)::int as n from public.deletion_log")).rows[0].n).toBe(before + 1);
    });

    it("consents_id_seq is unchanged, and students still record consent", async () => {
      expect(await privileges(db, "authenticated", "public.consents_id_seq")).toEqual(["USAGE"]);
      const B = "00000000-0000-4000-8000-00000000000b";
      await db.query("insert into auth.users (id, email) values ($1, 'b@example.test')", [B]);
      await as("authenticated", B);
      try {
        await db.query("insert into public.consents (kind, version, granted) values ('terms', 'v-test', true)");
      } finally { await as("postgres"); }
      expect((await db.query("select 1 from public.consents where user_id = $1", [B])).rows).toHaveLength(1);
    });
  });
});
