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
type Inventory = {
  atlas_conflicts: { tables: string[]; functions: string[]; indexes: string[] };
  other_public: { relations: { name: string; kind: string }[]; functions: { name: string }[] };
  policies: unknown[];
  public_tables: { name: string; rls: boolean }[];
  sequences: { name: string; owned_by: string | null; client_grants: string[] }[];
  client_grants: { relation: string; kind: string; grantee: string; privilege: string }[];
  default_acls: unknown[];
};
// Unrelated owner objects. Two have names that end like generated sequence
// and primary-key names, so a name-based filter would wrongly hide them.
const UNRELATED = ["unrelated_owner_table", "legacy_seq", "audit_pkey", "unrelated_counter_seq"];

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

  it("names every table, function and index the migrations create", () => {
    const created = new Set(migrations.flatMap((m) => [...m.matchAll(/^create (?:table|function) public\.([a-z_]+)/gm)].map((x) => x[1])));
    expect(created.size).toBeGreaterThan(20);
    for (const name of created) expect(sql, name).toMatch(new RegExp(`\\('${name}'\\)`));
    const indexes = new Set(migrations.flatMap((m) => [...m.matchAll(/^\s*create (?:unique )?index (?:if not exists )?([a-z_]+)/gim)].map((x) => x[1])));
    expect(indexes.size).toBe(8);
    for (const name of indexes) expect(sql, name).toMatch(new RegExp(`\\('${name}'\\)`));
  });

  it("selects unrelated relations by kind, never by a name suffix", () => {
    expect(code).not.toMatch(/_seq'|_pkey'/);
    expect(code).not.toMatch(/information_schema\.role_table_grants/);
  });
});

describe("schema inventory script: runs and reports", () => {
  let db: PGlite;
  beforeAll(async () => {
    db = new PGlite();
    await db.exec(readFileSync(path.join(ROOT, "supabase", "tests", "supabase-auth-shim.sql"), "utf8"));
    await db.exec(`
      create table public.unrelated_owner_table (id int primary key);
      create function public.unrelated_fn() returns int language sql as 'select 1';
      create table public.legacy_seq (id int);
      create view public.audit_pkey as select 1 as x;
      create sequence public.unrelated_counter_seq;
      grant select on public.legacy_seq to anon;
      grant usage, select on sequence public.unrelated_counter_seq to anon;
    `);
  }, 60_000);
  afterAll(async () => db?.close());
  const run = async () => (await db.query<{ inventory: Inventory }>(sql)).rows[0].inventory;
  const relNames = (inv: Inventory) => inv.other_public.relations.map((r) => r.name);

  it("before the migrations: no conflicts, and lists every unrelated object the revokes would affect", async () => {
    const inv = await run();
    expect(inv.atlas_conflicts).toEqual({ tables: [], functions: [], indexes: [] });
    for (const name of UNRELATED) expect(relNames(inv), name).toContain(name);
    expect(relNames(inv)).not.toContain("unrelated_owner_table_pkey"); // indexes are not affected by the revokes
    expect(inv.other_public.functions.map((f) => f.name)).toContain("unrelated_fn");
  });

  it("reports sequences and client grants on sequences and tables", async () => {
    const inv = await run();
    expect(inv.sequences).toContainEqual({ name: "unrelated_counter_seq", owner: "postgres", owned_by: null, client_grants: ["anon:SELECT", "anon:USAGE"] });
    expect(inv.client_grants).toContainEqual({ relation: "unrelated_counter_seq", kind: "S", grantee: "anon", privilege: "USAGE" });
    expect(inv.client_grants).toContainEqual({ relation: "legacy_seq", kind: "r", grantee: "anon", privilege: "SELECT" });
    expect(inv.default_acls.length).toBeGreaterThan(0); // the shim sets default privileges
  });

  it("reports a pre-existing relation that collides with a migration index name", async () => {
    await db.exec("create index goals_user_updated_idx on public.unrelated_owner_table (id)");
    try {
      expect((await run()).atlas_conflicts).toEqual({ tables: [], functions: [], indexes: ["goals_user_updated_idx"] });
    } finally {
      await db.exec("drop index public.goals_user_updated_idx");
    }
  });

  it("after the migrations: every Atlas object is a conflict, RLS is on, and the revokes' effect on unrelated objects is visible", async () => {
    for (const m of migrations) await db.exec(m);
    const inv = await run();
    expect(inv.atlas_conflicts.tables).toHaveLength(12);
    expect(inv.atlas_conflicts.functions).toHaveLength(14);
    expect(inv.atlas_conflicts.indexes).toHaveLength(8);
    expect(inv.public_tables.filter((t) => !UNRELATED.includes(t.name)).every((t) => t.rls)).toBe(true);
    expect(inv.policies.length).toBeGreaterThan(10);
    // Atlas identity sequences are listed with their owner column but are not "other" objects.
    expect(inv.sequences.map((s) => s.owned_by).filter(Boolean).sort()).toEqual(["consents.id", "deletion_log.id"]);
    expect(relNames(inv).sort()).toEqual([...UNRELATED].sort());
    // Audit M-4: the schema-wide revoke removed anon's grants, and
    // `grant usage on all sequences` gave authenticated usage on the unrelated sequence.
    const counter = inv.sequences.find((s) => s.name === "unrelated_counter_seq");
    expect(counter?.client_grants).toEqual(["authenticated:USAGE"]);
    expect(inv.client_grants.filter((g) => g.relation === "legacy_seq" && g.grantee === "anon")).toEqual([]);
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
