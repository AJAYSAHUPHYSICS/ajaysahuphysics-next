import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Owner decision K: unverified accounts must not get cloud-sync access.
// Migration 20261124000000 enforces it in the database (sync_allowed, RLS
// write policies, enable_sync), independently of the Auth "Confirm email"
// setting and of anything the browser does.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const DIR = path.join(ROOT, "supabase", "migrations");
const FIX = "20261124000000_require_verified_email_for_sync.sql";
const files = readdirSync(DIR).filter((f) => f.endsWith(".sql")).sort();
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const V = "00000000-0000-4000-8000-0000000000a1"; // verified
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
const insertBookmark = "insert into public.bookmarks (bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1, '11', 'kinematics', 'chapter', 'Kinematics', 'Kinematics', '/class-11/kinematics', now())";
async function adultWithFullConsent(sub: string) {
  await as("authenticated", sub);
  await db.query("insert into public.profiles (age_band) values ('18-plus')");
  // The current notice version, as the migrations seed it (db-rls.test.ts uses the same).
  for (const kind of ["terms", "privacy", "cloud-sync"]) await db.query("insert into public.consents (kind, version, granted) values ($1, '2026-11-draft', true)", [kind]);
}
const enableSync = async () => (await one<string>("select public.enable_sync() as r")).r;
const syncAllowed = async () => (await one<boolean>("select public.sync_allowed() as ok")).ok;

describe("verified email required for cloud sync (decision K)", () => {
  beforeAll(async () => {
    db = new PGlite();
    await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
    for (const f of files) await db.exec(read("supabase", "migrations", f));
    await db.query("update public.app_config set value = 'true' where key = 'adult_sync_permitted'"); // test DB only
    await db.query("insert into auth.users (id, email, email_confirmed_at) values ($1, 'v@example.test', now()), ($2, 'u@example.test', null)", [V, U]);
    await adultWithFullConsent(V);
    await adultWithFullConsent(U);
    await as("postgres");
  }, 60_000);
  afterAll(async () => db?.close());

  it("the migration runs after the five Phase 2 migrations", () => {
    expect(files.indexOf(FIX)).toBe(files.length - 1);
    expect(files).toHaveLength(6);
  });

  it("a verified adult with full consent can enable sync and upload", async () => {
    await as("authenticated", V);
    expect(await enableSync()).toBe("enabled");
    expect(await syncAllowed()).toBe(true);
    expect(await fails(insertBookmark, ["v:1"])).toBe("");
    await as("postgres");
  });

  it("an unverified adult with full consent gets 'email-not-verified', and sync stays off", async () => {
    await as("authenticated", U);
    expect(await enableSync()).toBe("email-not-verified");
    expect(await syncAllowed()).toBe(false);
    await as("postgres");
    expect((await one<boolean>("select sync_enabled from public.profiles where user_id = $1", [U])).sync_enabled).toBe(false);
  });

  it("even with sync_enabled forced on, an unverified account can't upload (RLS, not the client)", async () => {
    await db.query("update public.profiles set sync_enabled = true where user_id = $1", [U]); // as owner, simulating any bypass
    await as("authenticated", U);
    expect(await syncAllowed()).toBe(false);
    expect(await fails(insertBookmark, ["u:1"])).toMatch(/row-level security/);
    await as("postgres");
    expect((await db.query("select 1 from public.bookmarks where user_id = $1", [U])).rows).toHaveLength(0);
  });

  it("an unverified account can still read, export and request deletion of its own data", async () => {
    await as("authenticated", U);
    expect(await fails("select * from public.profiles")).toBe("");
    const exported = (await one<{ profile: { user_id: string } }>("select public.export_my_data() as x")).x;
    expect(exported.profile.user_id).toBe(U);
    await as("postgres");
  });

  it("once the address is verified, the same account can enable sync", async () => {
    await db.query("update public.profiles set sync_enabled = false where user_id = $1", [U]);
    await db.query("update auth.users set email_confirmed_at = now() where id = $1", [U]);
    await as("authenticated", U);
    expect(await enableSync()).toBe("enabled");
    expect(await syncAllowed()).toBe(true);
    await as("postgres");
    await db.query("update auth.users set email_confirmed_at = null where id = $1", [U]); // un-verify again
    await as("authenticated", U);
    expect(await syncAllowed()).toBe(false); // checked on every write, not only when enabling
    expect(await fails(insertBookmark, ["u:2"])).toMatch(/row-level security/);
    await as("postgres");
  });

  it("email_verified() is not callable by clients, and a missing user is unverified", async () => {
    for (const role of ["anon", "authenticated"]) {
      expect((await one<boolean>("select has_function_privilege($1, 'public.email_verified()', 'execute') as ok", [role])).ok, role).toBe(false);
    }
    await as("authenticated", "00000000-0000-4000-8000-0000000000ff");
    expect(await syncAllowed()).toBe(false);
    await as("postgres");
  });

  it("the existing client privileges on sync_allowed and enable_sync are unchanged", async () => {
    for (const fn of ["public.sync_allowed()", "public.enable_sync()"]) {
      expect((await one<boolean>("select has_function_privilege('authenticated', $1, 'execute') as ok", [fn])).ok, fn).toBe(true);
      expect((await one<boolean>("select has_function_privilege('anon', $1, 'execute') as ok", [fn])).ok, fn).toBe(false);
    }
  });

  it("the rollback restores the previous functions exactly and drops email_verified()", async () => {
    const before = (await one<string>("select string_agg(pg_get_functiondef(p.oid), E'\\n' order by p.proname) as d from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in ('sync_allowed', 'enable_sync')")).d;
    await db.exec(read("supabase", "rollback", "verified_email_down.sql"));
    expect((await db.query("select 1 from pg_proc where proname = 'email_verified'")).rows).toHaveLength(0);
    const fresh = new PGlite();
    try {
      await fresh.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
      for (const f of files.filter((f) => f !== FIX)) await fresh.exec(read("supabase", "migrations", f));
      const q = "select string_agg(pg_get_functiondef(p.oid), E'\\n' order by p.proname) as d from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in ('sync_allowed', 'enable_sync')";
      const original = (await fresh.query<{ d: string }>(q)).rows[0].d;
      // Compared without carriage returns: a Windows checkout stores CRLF in function bodies.
      const norm = (d: string) => d.replace(/\r/g, "");
      expect(norm((await one<string>(q)).d)).toBe(norm(original));
      expect(norm(before)).not.toBe(norm(original));
    } finally { await fresh.close(); }
    await db.exec(read("supabase", "migrations", FIX)); // and it re-applies cleanly
    expect((await db.query("select 1 from pg_proc where proname = 'email_verified'")).rows).toHaveLength(1);
  });
});
