import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// supabase/inventory/schema_inventory.sql (audit F10) must stay strictly
// read-only, must name every object the Phase 2B migrations create (so it
// detects conflicts before a production migration), and must run.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const sql = readFileSync(path.join(ROOT, "supabase", "inventory", "schema_inventory.sql"), "utf8");
const code = sql.replace(/--.*$/gm, "");
const migrations = readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort()
  .map((f) => readFileSync(path.join(ROOT, "supabase", "migrations", f), "utf8"));
type Inventory = { atlas_conflicts: { tables: string[]; functions: string[] }; other_public: { relations: { name: string }[]; functions: { name: string }[] }; policies: unknown[]; public_tables: { name: string; rls: boolean }[] };

describe("schema inventory script: read-only", () => {
  it("contains a single SELECT and no write, DDL, privilege, session or procedural statement", () => {
    expect(code).not.toMatch(/\b(insert|update|delete|merge|upsert|truncate|drop|alter|create|grant|revoke|comment|copy|call|do|execute|prepare|vacuum|analy[sz]e|reindex|cluster|lock|listen|notify|refresh|security|set\s+role|set\s+session|reset|begin|commit|rollback|savepoint)\b/i);
    expect(code).not.toMatch(/\b(pg_read_file|pg_ls_dir|lo_import|lo_export|dblink|pg_sleep|set_config)\b/i);
    expect(code.trim().split(";").filter((s) => s.trim()).length).toBe(1);
    expect(code).toMatch(/^\s*with\b[\s\S]*\bselect jsonb_build_object\(/i);
  });

  it("dynamic queries (query_to_xml) only count or list, and only read", () => {
    const dynamic = [...code.matchAll(/query_to_xml\('([^]*?)', false/g)].map((m) => m[1].replace(/''/g, "'"));
    expect(dynamic).toHaveLength(3);
    for (const q of dynamic) expect(q).toMatch(/^select (count\(\*\)|string_agg\(version)[^;]* from (auth\.users|storage\.buckets|supabase_migrations\.schema_migrations)$/);
  });

  it("reads no user data: no email, password or token columns, and no study-table rows", () => {
    expect(code).not.toMatch(/\b(email|encrypted_password|phone|raw_user_meta_data|token|ip_address)\b/i);
    expect(code).not.toMatch(/from\s+public\./i);
  });

  it("names every table and function the migrations create", () => {
    const created = new Set(migrations.flatMap((m) => [...m.matchAll(/^create (?:table|function) public\.([a-z_]+)/gm)].map((x) => x[1])));
    expect(created.size).toBeGreaterThan(20);
    for (const name of created) expect(sql, name).toMatch(new RegExp(`\\('${name}'\\)`));
  });
});

describe("schema inventory script: runs and reports", () => {
  let db: PGlite;
  beforeAll(async () => {
    db = new PGlite();
    await db.exec(readFileSync(path.join(ROOT, "supabase", "tests", "supabase-auth-shim.sql"), "utf8"));
    await db.exec("create table public.unrelated_owner_table (id int primary key); create function public.unrelated_fn() returns int language sql as 'select 1';");
  }, 60_000);
  afterAll(async () => db?.close());
  const run = async () => (await db.query<{ inventory: Inventory }>(sql)).rows[0].inventory;

  it("before the migrations: no conflicts, and lists the unrelated objects the revokes would affect", async () => {
    const inv = await run();
    expect(inv.atlas_conflicts).toEqual({ tables: [], functions: [] });
    expect(inv.other_public.relations.map((r) => r.name)).toContain("unrelated_owner_table");
    expect(inv.other_public.functions.map((f) => f.name)).toContain("unrelated_fn");
  });

  it("after the migrations: every Atlas object is reported as a conflict, with RLS on and policies listed", async () => {
    for (const m of migrations) await db.exec(m);
    const inv = await run();
    expect(inv.atlas_conflicts.tables).toHaveLength(12);
    expect(inv.atlas_conflicts.functions).toHaveLength(14);
    expect(inv.public_tables.filter((t) => t.name !== "unrelated_owner_table").every((t) => t.rls)).toBe(true);
    expect(inv.policies.length).toBeGreaterThan(10);
  });

  it("runs inside a read-only transaction (as the runbook requires)", async () => {
    await db.exec("begin transaction read only");
    try {
      await expect(run()).resolves.toBeTruthy();
    } finally {
      await db.exec("rollback");
    }
  });
});
