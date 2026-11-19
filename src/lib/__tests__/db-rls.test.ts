import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────
// Database security tests for supabase/migrations, run against a real
// Postgres (PGlite, in-process; no Docker) with a shim of Supabase's auth
// schema. Every statement below runs as the role a real client would use
// (anon / authenticated with a JWT "sub" / service_role), so these are
// genuine Row Level Security checks, not mocks.
// ─────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..", "..", "..");
const A = "00000000-0000-4000-8000-00000000000a";
const B = "00000000-0000-4000-8000-00000000000b";
const MID = "11111111-1111-4111-8111-111111111111";
let db: PGlite;

async function as(role: "anon" | "authenticated" | "service_role" | "postgres", sub?: string) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
  if (role !== "postgres") await db.exec(`set role ${role}`);
}
/** Runs SQL and returns the error message (or "" when it succeeded). */
async function fails(sql: string, params: unknown[] = []): Promise<string> {
  try {
    await db.query(sql, params);
    return "";
  } catch (e) {
    return (e as Error).message;
  }
}
const rows = async <T = Record<string, unknown>>(sql: string, params: unknown[] = []) => (await db.query<T>(sql, params)).rows;
const bookmark = (id: string) => [id, "11", "kinematics", "chapter", "Kinematics", "Kinematics", "/class-11/kinematics", new Date().toISOString()];
const insertBookmark = "insert into public.bookmarks (bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1,$2,$3,$4,$5,$6,$7,$8)";
const upsertBookmark = `${insertBookmark} on conflict (user_id, bookmark_id) do update set label = excluded.label, deleted_at = null`;

async function consentAll(version = "2026-11-draft") {
  for (const kind of ["terms", "privacy", "cloud-sync"]) await db.query("insert into public.consents (kind, version, granted) values ($1, $2, true)", [kind, version]);
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(readFileSync(path.join(ROOT, "supabase", "tests", "supabase-auth-shim.sql"), "utf8"));
  for (const f of readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort()) {
    await db.exec(readFileSync(path.join(ROOT, "supabase", "migrations", f), "utf8"));
  }
  await db.query("insert into auth.users (id, email) values ($1, 'a@example.test'), ($2, 'b@example.test')", [A, B]);
}, 60_000);
afterAll(async () => db?.close());

describe("anonymous visitors", () => {
  it("can't read or write any table, or call any function", async () => {
    await as("anon");
    for (const t of ["profiles", "consents", "bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks", "app_config", "deletion_requests", "deletion_log"]) {
      expect(await fails(`select * from public.${t}`), t).toMatch(/permission denied/);
    }
    expect(await fails(insertBookmark, bookmark("x"))).toMatch(/permission denied/);
    for (const fn of ["enable_sync()", "export_my_data()", "request_account_deletion()", "sync_allowed()"]) expect(await fails(`select public.${fn}`), fn).toMatch(/permission denied/);
  });
});

describe("consent gate (enforced in the database)", () => {
  it("a signed-in student without sync enabled can't store study data", async () => {
    await as("authenticated", A);
    await db.query("insert into public.profiles (class_level) values (11)");
    expect(await fails(insertBookmark, bookmark("11:kinematics:chapter"))).toMatch(/row-level security/);
    expect(await fails("update public.profiles set sync_enabled = true where user_id = $1", [A])).toMatch(/only change through their functions/);
    // Even an INSERT can't smuggle sync_enabled = true.
    await as("authenticated", B);
    await db.query("insert into public.profiles (class_level, sync_enabled) values (12, true)");
    expect((await rows<{ sync_enabled: boolean }>("select sync_enabled from public.profiles"))[0].sync_enabled).toBe(false);
  });

  it("enable_sync explains each missing requirement and stays off until the owner's launch switch", async () => {
    await as("authenticated", A);
    const enable = async () => (await rows<{ enable_sync: string }>("select public.enable_sync()"))[0].enable_sync;
    expect(await enable()).toBe("age-band-required");
    await db.query("update public.profiles set age_band = '18-plus'");
    expect(await enable()).toBe("consent-required");
    await consentAll("an-old-version");
    expect(await enable()).toBe("consent-required");
    await consentAll();
    expect(await enable()).toBe("not-available-yet");
    expect(await fails("update public.app_config set value = 'true'")).toMatch(/permission denied/);
    await as("service_role");
    await db.query("update public.app_config set value = 'true' where key = 'adult_sync_permitted'");
    await as("authenticated", A);
    expect(await enable()).toBe("enabled");
    expect((await rows<{ sync_allowed: boolean }>("select public.sync_allowed()"))[0].sync_allowed).toBe(true);
  });

  it("under-18 students can't enable sync without the minors switch AND verified parental consent", async () => {
    await as("authenticated", B);
    await db.query("update public.profiles set age_band = 'under-18'");
    await consentAll();
    const enable = async () => (await rows<{ enable_sync: string }>("select public.enable_sync()"))[0].enable_sync;
    expect(await enable()).toBe("not-available-for-under-18");
    // A student can't record parental consent themselves, under any method.
    expect(await fails("insert into public.consents (kind, version, granted) values ('parental', '2026-11-draft', true)")).toMatch(/row-level security/);
    expect(await fails("insert into public.consents (kind, version, granted, method) values ('privacy', '2026-11-draft', true, 'parent-verified')")).toMatch(/row-level security/);
    await as("service_role");
    await db.query("update public.app_config set value = 'true' where key = 'minor_sync_permitted'");
    await as("authenticated", B);
    expect(await enable()).toBe("parental-consent-required");
    await as("service_role");
    await db.query("insert into public.consents (user_id, kind, version, granted, method) values ($1, 'parental', '2026-11-draft', true, 'parent-verified')", [B]);
    await as("authenticated", B);
    expect(await enable()).toBe("enabled");
    // Restore: minors switch back off for the rest of the suite.
    await as("service_role");
    await db.query("update public.app_config set value = 'false' where key = 'minor_sync_permitted'");
  });

  it("declaring under-18 switches an adult's sync off immediately", async () => {
    await as("authenticated", A);
    await db.query("update public.profiles set age_band = 'under-18'");
    expect((await rows<{ sync_allowed: boolean }>("select public.sync_allowed()"))[0].sync_allowed).toBe(false);
    expect(await fails(insertBookmark, bookmark("blocked"))).toMatch(/row-level security/);
    await db.query("update public.profiles set age_band = '18-plus'");
    expect((await rows<{ enable_sync: string }>("select public.enable_sync()"))[0].enable_sync).toBe("enabled");
  });

  it("consent history is append-only for students", async () => {
    await as("authenticated", A);
    expect(await fails("update public.consents set granted = false")).toMatch(/permission denied/);
    expect(await fails("delete from public.consents")).toMatch(/permission denied/);
  });
});

describe("isolation between students", () => {
  it("each student reads and writes only their own rows", async () => {
    await as("authenticated", A);
    await db.query(insertBookmark, bookmark("11:kinematics:chapter"));
    await db.query("insert into public.mistakes (id, cls, slug, chapter_name, resource_type, question_ref, category, concept_tag, difficulty, note, created_at) values ($1,'12','atoms','Atoms','pyq','legacy:pyq:12/atoms#17','conceptual','Bohr model','medium','A private note',now())", [MID]);
    // Upserts are idempotent: repeating the same upload keeps one row.
    await db.query(upsertBookmark, bookmark("11:kinematics:chapter"));
    expect((await rows("select * from public.bookmarks")).length).toBe(1);

    await as("authenticated", B);
    expect(await rows("select * from public.bookmarks")).toEqual([]);
    expect(await rows("select * from public.mistakes")).toEqual([]);
    expect(await rows("select * from public.profiles where user_id = $1", [A])).toEqual([]);
    const upd = await db.query("update public.mistakes set note = 'hijacked' where id = $1", [MID]);
    expect(upd.affectedRows ?? 0).toBe(0);
    expect(await fails("delete from public.mistakes where id = $1", [MID])).toMatch(/permission denied/);
    // Can't write rows into someone else's account.
    expect(await fails("insert into public.bookmarks (user_id, bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1,'x','11','kinematics','chapter','K','K','/class-11/kinematics',now())", [A])).toMatch(/row-level security/);

    await as("authenticated", A);
    expect((await rows<{ note: string }>("select note from public.mistakes"))[0].note).toBe("A private note");
    // A row can't be moved to another account.
    expect(await fails("update public.bookmarks set user_id = $1", [B])).toMatch(/user_id cannot change|row-level security/);
  });

  it("rejects malformed values and unknown question namespaces", async () => {
    await as("authenticated", A);
    const m = (ref: string | null, category: string | null = null) => fails("insert into public.mistakes (id, cls, slug, chapter_name, resource_type, question_ref, category, concept_tag, difficulty, created_at) values (gen_random_uuid(),'11','kinematics','Kinematics','dpp',$1,$2,'t','easy',now())", [ref, category]);
    expect(await m("legacy:dpp:11/kinematics#3")).toBe("");
    expect(await m("q-c11-kinematics-0001")).toBe("");
    expect(await m("17")).toMatch(/check constraint/);
    expect(await m("legacy:dpp:11/../x#3")).toMatch(/check constraint/);
    expect(await m(null, "guessing")).toMatch(/check constraint/);
    expect(await fails(insertBookmark, ["y", "13", "kinematics", "chapter", "K", "K", "/class-11/kinematics", new Date().toISOString()])).toMatch(/check constraint/);
    expect(await fails(insertBookmark, ["z", "11", "kinematics", "chapter", "K", "K", "https://evil.example/x", new Date().toISOString()])).toMatch(/check constraint/);
  });

  it("enforces per-student row limits", async () => {
    await as("authenticated", A);
    for (let i = 0; i < 50; i++) await db.query("insert into public.goals (goal_type, activated_at) values ($1, now())", [`goal-${i}`]);
    expect(await fails("insert into public.goals (goal_type, activated_at) values ('goal-50', now())")).toMatch(/row limit 50/);
    // Another student's limit is separate.
    await as("authenticated", B);
    expect(await fails("insert into public.goals (goal_type, activated_at) values ('goal-0', now())")).toBe("");
  });
});

describe("data rights", () => {
  it("export returns only the caller's own data", async () => {
    await as("authenticated", A);
    const a = (await rows<{ export_my_data: Record<string, unknown[]> }>("select public.export_my_data()"))[0].export_my_data;
    expect(a.bookmarks).toHaveLength(1);
    expect((a.mistakes as { note: string }[]).some((m) => m.note === "A private note")).toBe(true);
    expect(JSON.stringify(a)).not.toContain(B);
    await as("authenticated", B);
    const b = (await rows<{ export_my_data: Record<string, unknown[]> }>("select public.export_my_data()"))[0].export_my_data;
    expect(b.bookmarks).toEqual([]);
    expect(JSON.stringify(b)).not.toContain("A private note");
  });

  it("deletion request is idempotent and stops further uploads at once", async () => {
    await as("authenticated", A);
    const t1 = (await rows<{ request_account_deletion: string }>("select public.request_account_deletion()"))[0].request_account_deletion;
    const t2 = (await rows<{ request_account_deletion: string }>("select public.request_account_deletion()"))[0].request_account_deletion;
    expect(String(t2)).toBe(String(t1));
    expect((await rows<{ sync_allowed: boolean }>("select public.sync_allowed()"))[0].sync_allowed).toBe(false);
    expect((await rows<{ enable_sync: string }>("select public.enable_sync()"))[0].enable_sync).toBe("deletion-pending");
    expect(await fails(insertBookmark, bookmark("after-request"))).toMatch(/row-level security/);
    // Students can't run the purge themselves, or read the internal tables.
    expect(await fails("select public.purge_user_data($1)", [A])).toMatch(/permission denied/);
    expect(await fails("select public.latest_consent('terms')")).toMatch(/permission denied/);
    expect(await fails("select * from public.deletion_requests")).toMatch(/permission denied/);
  });

  it("purge deletes every row the student owns, is retry-safe, logs without the user id, and leaves others intact", async () => {
    await as("service_role");
    const n1 = (await rows<{ purge_user_data: number }>("select public.purge_user_data($1)", [A]))[0].purge_user_data;
    expect(n1).toBeGreaterThan(50);
    const n2 = (await rows<{ purge_user_data: number }>("select public.purge_user_data($1)", [A]))[0].purge_user_data;
    expect(n2).toBe(0);
    await as("postgres");
    for (const t of ["profiles", "consents", "bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks"]) {
      expect((await rows(`select 1 from public.${t} where user_id = $1`, [A])).length, t).toBe(0);
    }
    expect((await rows("select 1 from public.goals where user_id = $1", [B])).length).toBe(1);
    const log = await rows<{ user_hash: string }>("select user_hash from public.deletion_log");
    expect(log).toHaveLength(2);
    expect(JSON.stringify(log)).not.toContain(A);
    // Removing the auth user afterwards cascades cleanly (no orphans, no trigger errors).
    await db.query("delete from auth.users where id = $1", [A]);
    expect((await rows("select 1 from public.deletion_requests where user_id = $1", [A])).length).toBe(0);
    // Deleting a user who never requested deletion also cascades cleanly, consents included.
    await db.query("delete from auth.users where id = $1", [B]);
    expect((await rows("select 1 from public.consents where user_id = $1", [B])).length).toBe(0);
  });
});
