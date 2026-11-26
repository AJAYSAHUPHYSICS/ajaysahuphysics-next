import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

// Owner decision (2026-11-26): there is NO AGE LIMIT. Migration
// 20261126000000_remove_age_restrictions.sql removes every age rule from the
// database, and the parental-consent requirement with it. These tests prove
// that, and that nothing else was weakened: verified email, consent, the
// launch switch, the deletion checks, RLS and the column privileges all
// still hold.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const DIR = path.join(ROOT, "supabase", "migrations");
const AGE = "20261126000000_remove_age_restrictions.sql";
const EMAIL = "20261124000000_require_verified_email_for_sync.sql";
const files = readdirSync(DIR).filter((f) => f.endsWith(".sql")).sort();
const read = (...p: string[]) => readFileSync(path.join(ROOT, ...p), "utf8");
const V = "00000000-0000-4000-8000-0000000000e1"; // verified, no age band
const M = "00000000-0000-4000-8000-0000000000e2"; // verified, declares under-18
const U = "00000000-0000-4000-8000-0000000000e3"; // unverified
const D = "00000000-0000-4000-8000-0000000000e4"; // verified, deletion pending
const VERSION = "2026-11-draft";

let db: PGlite;
async function as(role: "authenticated" | "postgres", sub?: string) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
  if (role !== "postgres") await db.exec(`set role ${role}`);
}
async function fails(sql: string, params: unknown[] = []) {
  try { await db.query(sql, params); return ""; } catch (e) { return (e as Error).message; }
}
const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<Record<string, T>>(sql, params)).rows[0];
const enableSync = async () => (await one<string>("select public.enable_sync() as r")).r;
const syncAllowed = async () => (await one<boolean>("select public.sync_allowed() as ok")).ok;
const setLaunch = (v: "true" | "false") => db.query("update public.app_config set value = $1 where key = 'adult_sync_permitted'", [v]);
const consent = (kind: string, granted = true) => db.query("insert into public.consents (kind, version, granted) values ($1, $2, $3)", [kind, VERSION, granted]);
const insertBookmark = "insert into public.bookmarks (bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1, '11', 'kinematics', 'chapter', 'K', 'K', '/class-11/kinematics', now())";
const fnDef = async (sig: string) => (await one<string>("select pg_get_functiondef($1::regprocedure) as d", [sig])).d;

/** A student who has done everything except the launch switch: verified, profile, privacy and cloud-sync consent. */
async function ready(sub: string, profileSql = "insert into public.profiles default values") {
  await as("authenticated", sub);
  await db.query(profileSql);
  await consent("privacy");
  await consent("cloud-sync");
  await as("postgres");
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
  for (const f of files) await db.exec(read("supabase", "migrations", f));
  await db.query(`insert into auth.users (id, email, email_confirmed_at) values
    ($1, 'v@example.test', now()), ($2, 'm@example.test', now()), ($3, 'u@example.test', null), ($4, 'd@example.test', now())`, [V, M, U, D]);
  await ready(V);
  await ready(M, "insert into public.profiles (age_band) values ('under-18')");
  await ready(U);
  await ready(D);
}, 60_000);
afterAll(async () => db?.close());
beforeEach(async () => { if (db) { await as("postgres"); await setLaunch("false"); } });

describe("migration order", () => {
  it("runs last, after the verified-email migration it depends on", () => {
    expect(files[files.length - 1]).toBe(AGE);
    expect(files.indexOf(EMAIL)).toBe(files.length - 2);
  });
});

describe("no age-based restriction", () => {
  it("an account is created and used without any age information", async () => {
    await as("authenticated", V);
    expect((await one<string | null>("select age_band as a from public.profiles")).a).toBeNull();
    await as("postgres");
    await setLaunch("true");
    await as("authenticated", V);
    expect(await enableSync()).toBe("enabled");
    expect(await syncAllowed()).toBe(true);
    expect(await fails(insertBookmark, ["v:1"])).toBe("");
  });

  it("a student who declares under-18 gets exactly the same answer: no block, no parental consent", async () => {
    await setLaunch("true");
    await as("authenticated", M);
    expect(await enableSync()).toBe("enabled");
    expect(await syncAllowed()).toBe(true);
    expect(await fails(insertBookmark, ["m:1"])).toBe("");
  });

  it("declaring or changing an age band never switches cloud copies off", async () => {
    await setLaunch("true");
    await as("authenticated", V);
    expect(await enableSync()).toBe("enabled");
    for (const band of ["under-18", "18-plus", null]) {
      await db.query("update public.profiles set age_band = $1", [band]);
      expect((await one<boolean>("select sync_enabled as s from public.profiles")).s, String(band)).toBe(true);
      expect(await syncAllowed(), String(band)).toBe(true);
    }
  });

  it("the old minors switch is inert: it neither opens nor closes sync for anyone", async () => {
    await setLaunch("false");
    await db.query("update public.app_config set value = 'true' where key = 'minor_sync_permitted'");
    try {
      await as("authenticated", M);
      expect(await enableSync()).toBe("not-available-yet");
      expect(await syncAllowed()).toBe(false);
    } finally {
      await as("postgres");
      await db.query("update public.app_config set value = 'false' where key = 'minor_sync_permitted'");
    }
  });

  it("no eligibility function reads an age band or a parental consent any more", async () => {
    for (const sig of ["public.sync_allowed()", "public.enable_sync()", "public.atlas_protect_profile()"]) {
      const d = await fnDef(sig);
      expect(d, sig).not.toMatch(/age_band|under-18|18-plus|parental|minor_sync_permitted/);
    }
    expect((await db.query("select 1 from pg_proc where proname = 'parental_consent_verified'")).rows).toHaveLength(0);
  });

  it("the Terms of Use consent is no longer required (no such document exists yet)", async () => {
    await setLaunch("true");
    await as("authenticated", V);
    expect((await one<number>("select count(*)::int as n from public.consents where kind = 'terms'")).n).toBe(0);
    expect(await enableSync()).toBe("enabled");
  });
});

describe("no parental consent workflow", () => {
  it("a student can't record a parental consent, or use the parent-verified method", async () => {
    await as("authenticated", V);
    expect(await fails("insert into public.consents (kind, version, granted) values ('parental', $1, true)", [VERSION])).toMatch(/row-level security|violates/);
    expect(await fails("insert into public.consents (kind, version, granted, method) values ('privacy', $1, true, 'parent-verified')", [VERSION])).toMatch(/row-level security|violates/);
  });

  it("no role can record one either: the constraint refuses it even for the server", async () => {
    expect(await fails("insert into public.consents (user_id, kind, version, granted, method) values ($1, 'parental', $2, true, 'parent-verified')", [V, VERSION])).toMatch(/consents_no_parental/);
    expect(await fails("insert into public.consents (user_id, kind, version, granted, method) values ($1, 'privacy', $2, true, 'parent-verified')", [V, VERSION])).toMatch(/consents_no_parental/);
    expect(await fails("insert into public.consents (user_id, kind, version, granted) values ($1, 'privacy', $2, true)", [V, VERSION])).toBe("");
  });
});

describe("every other gate still holds", () => {
  it("verified email is still required", async () => {
    await setLaunch("true");
    await as("authenticated", U);
    expect(await enableSync()).toBe("email-not-verified");
    expect(await syncAllowed()).toBe(false);
    expect(await fails(insertBookmark, ["u:1"])).toMatch(/row-level security/);
  });

  it("the privacy and cloud-copy consents are still required", async () => {
    await setLaunch("true");
    const S = "00000000-0000-4000-8000-0000000000e5";
    await db.query("insert into auth.users (id, email) values ($1, 's@example.test')", [S]);
    await as("authenticated", S);
    await db.query("insert into public.profiles default values");
    expect(await enableSync()).toBe("consent-required");
    await consent("privacy");
    expect(await enableSync()).toBe("consent-required"); // cloud-sync still missing
    await consent("cloud-sync", false);
    expect(await enableSync()).toBe("consent-required"); // declined
    await consent("cloud-sync", true);
    expect(await enableSync()).toBe("enabled");
  });

  it("the launch switch still blocks everyone while it is off", async () => {
    await setLaunch("false");
    for (const s of [V, M]) {
      await as("authenticated", s);
      expect(await enableSync(), s).toBe("not-available-yet");
      expect(await syncAllowed(), s).toBe(false);
      await as("postgres");
    }
  });

  it("a pending account deletion still blocks sync", async () => {
    await setLaunch("true");
    await db.query("insert into public.deletion_requests (user_id) values ($1)", [D]);
    await as("authenticated", D);
    expect(await enableSync()).toBe("deletion-pending");
    expect(await syncAllowed()).toBe(false);
  });

  it("withdrawing the cloud-copy consent stops further syncing immediately", async () => {
    await setLaunch("true");
    await as("authenticated", V);
    expect(await enableSync()).toBe("enabled");
    await consent("cloud-sync", false);
    expect(await syncAllowed()).toBe(false);
    expect(await fails(insertBookmark, ["v:withdrawn"])).toMatch(/row-level security/);
    await consent("cloud-sync", true); // restore for later tests
  });

  it("students still can't set sync_enabled, and may write only the four profile columns", async () => {
    await as("authenticated", V);
    expect(await fails("update public.profiles set sync_enabled = true")).toMatch(/permission denied|can only change/);
    expect(await fails("update public.profiles set deletion_requested_at = now()")).toMatch(/permission denied|can only change/);
    await as("postgres");
    for (const priv of ["INSERT", "UPDATE"]) {
      const cols = (await db.query<{ c: string }>("select column_name as c from information_schema.column_privileges where table_schema = 'public' and table_name = 'profiles' and grantee = 'authenticated' and privilege_type = $1 order by 1", [priv])).rows.map((r) => r.c);
      expect(cols, priv).toEqual(["age_band", "class_level", "display_name", "exam_targets"]);
    }
  });

  it("the eligibility functions keep their privileges and their safe definitions", async () => {
    for (const fn of ["public.sync_allowed()", "public.enable_sync()"]) {
      expect((await one<boolean>("select has_function_privilege('authenticated', $1, 'execute') as ok", [fn])).ok, fn).toBe(true);
      expect((await one<boolean>("select has_function_privilege('anon', $1, 'execute') as ok", [fn])).ok, fn).toBe(false);
      const f = await one<string>("select prosecdef::text as d, array_to_string(proconfig, ',') as c from pg_proc where oid = $1::regprocedure", [fn]);
      expect(f, fn).toEqual({ d: "true", c: 'search_path=""' });
      expect(await fnDef(fn), fn).toMatch(/email_verified\(\)/);
    }
  });
});

describe("rollback", () => {
  const defs = "select string_agg(pg_get_functiondef(p.oid), E'\\n' order by p.proname) as d from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in ('sync_allowed', 'enable_sync', 'atlas_protect_profile', 'parental_consent_verified')";
  const acl = "select proname, coalesce(array_to_string(proacl, ','), 'default') as a from pg_proc where pronamespace = 'public'::regnamespace and proname = 'parental_consent_verified'";

  it("migration 6's rollback refuses to run while this migration is applied", async () => {
    let refused = "";
    try { await db.exec(read("supabase", "rollback", "verified_email_down.sql")); } catch (e) { refused = (e as Error).message; }
    expect(refused).toMatch(/Roll back 20261126000000 first/);
    await db.exec("rollback").catch(() => undefined); // the refused script left its transaction aborted
    expect((await db.query("select 1 from pg_proc where proname = 'email_verified'")).rows).toHaveLength(1);
  });

  it("restores exactly what migration 6 left, then re-applies cleanly", async () => {
    await db.exec(read("supabase", "rollback", "remove_age_restrictions_down.sql"));
    const fresh = new PGlite();
    try {
      await fresh.exec(read("supabase", "tests", "supabase-auth-shim.sql"));
      for (const f of files.filter((f) => f !== AGE)) await fresh.exec(read("supabase", "migrations", f));
      const norm = (d: string) => d.replace(/\r/g, ""); // a Windows checkout stores CRLF in function bodies
      expect(norm((await one<string>(defs)).d)).toBe(norm((await fresh.query<{ d: string }>(defs)).rows[0].d));
      expect((await db.query(acl)).rows).toEqual((await fresh.query(acl)).rows);
    } finally { await fresh.close(); }
    expect((await db.query("select 1 from pg_constraint where conname = 'consents_no_parental'")).rows).toHaveLength(0);
    await db.exec(read("supabase", "migrations", AGE));
    expect((await db.query("select 1 from pg_constraint where conname = 'consents_no_parental'")).rows).toHaveLength(1);
    expect((await db.query("select 1 from pg_proc where proname = 'parental_consent_verified'")).rows).toHaveLength(0);
  });
});
