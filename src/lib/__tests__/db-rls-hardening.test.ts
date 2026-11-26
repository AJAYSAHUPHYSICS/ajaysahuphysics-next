import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────
// Regression tests for the pre-staging security review of the student
// accounts migration (findings H-1, M-1, M-2, M-3, L-2, L-3, L-5, L-12).
// A fresh in-process Postgres (PGlite) with the Supabase auth shim; every
// statement runs as the role a real client would use.
// ─────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..", "..", "..");
const S = "00000000-0000-4000-8000-0000000000c1"; // an adult student
const T = "00000000-0000-4000-8000-0000000000c2"; // a student who deletes their account
let db: PGlite;

async function as(role: "authenticated" | "service_role" | "postgres", sub?: string) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
  if (role !== "postgres") await db.exec(`set role ${role}`);
}
async function fails(sql: string, params: unknown[] = []): Promise<string> {
  try {
    await db.query(sql, params);
    return "";
  } catch (e) {
    return (e as Error).message;
  }
}
const one = async <T>(sql: string, params: unknown[] = []) => Object.values((await db.query<Record<string, T>>(sql, params)).rows[0])[0] as T;
const allowed = () => one<boolean>("select public.sync_allowed()");
const enable = () => one<string>("select public.enable_sync()");
const setSwitch = async (key: string, value: "true" | "false") => {
  await as("service_role");
  await db.query("update public.app_config set value = $2 where key = $1", [key, value]);
};
const consent = (kind: string, granted: boolean, version = "2026-11-draft") => db.query("insert into public.consents (kind, version, granted) values ($1, $2, $3)", [kind, version, granted]);
const addGoal = (g: string) => fails("insert into public.goals (goal_type, activated_at) values ($1, now())", [g]);
const upsertGoal = (g: string, deleted = false) =>
  fails("insert into public.goals (goal_type, activated_at, deleted_at) values ($1, now(), $2) on conflict (user_id, goal_type) do update set activated_at = excluded.activated_at, deleted_at = excluded.deleted_at", [g, deleted ? new Date().toISOString() : null]);

/** Creates an adult profile with current consents and enabled sync (adult switch on). */
async function readyStudent(id: string) {
  await as("authenticated", id);
  await db.query("insert into public.profiles (age_band) values ('18-plus')");
  for (const k of ["terms", "privacy", "cloud-sync"]) await consent(k, true);
  expect(await enable()).toBe("enabled");
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(readFileSync(path.join(ROOT, "supabase", "tests", "supabase-auth-shim.sql"), "utf8"));
  for (const f of readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort()) {
    await db.exec(readFileSync(path.join(ROOT, "supabase", "migrations", f), "utf8"));
  }
  await db.query("insert into auth.users (id, email) values ($1, 'c1@example.test'), ($2, 'c2@example.test')", [S, T]);
  await setSwitch("adult_sync_permitted", "true");
  await readyStudent(S);
  await readyStudent(T);
}, 60_000);
afterAll(async () => db?.close());

describe("H-1: the gate is re-checked on every write", () => {
  it("kill switch: turning the adult switch off stops an already-enabled student's inserts AND updates at once", async () => {
    await as("authenticated", S);
    expect(await addGoal("before-kill")).toBe("");
    await setSwitch("adult_sync_permitted", "false");
    await as("authenticated", S);
    expect(await allowed()).toBe(false);
    expect(await addGoal("after-kill")).toMatch(/row-level security/);
    expect(await upsertGoal("before-kill", true)).toMatch(/row-level security/);
    // profile still says enabled: it's the live check that blocks
    expect(await one<boolean>("select sync_enabled from public.profiles")).toBe(true);
    await setSwitch("adult_sync_permitted", "true");
    await as("authenticated", S);
    expect(await allowed()).toBe(true);
    expect(await addGoal("after-restore")).toBe("");
  });

  it("consent withdrawal blocks further writes until consent is given again", async () => {
    await as("authenticated", S);
    await consent("cloud-sync", false);
    expect(await allowed()).toBe(false);
    expect(await addGoal("after-withdrawal")).toMatch(/row-level security/);
    await consent("cloud-sync", true);
    expect(await allowed()).toBe(true);
    await consent("privacy", false);
    expect(await addGoal("no-privacy")).toMatch(/row-level security/);
    await consent("privacy", true);
    // The Terms of Use consent is no longer required (owner decision 2026-11-26: no such document yet;
    // migration 20261126000000), so withdrawing it changes nothing.
    await consent("terms", false);
    expect(await addGoal("no-terms")).toBe("");
    await consent("terms", true);
    expect(await addGoal("consents-restored")).toBe("");
  });

  it("a new notice version blocks writes until the student accepts it", async () => {
    await as("service_role");
    await db.query("update public.app_config set value = '2027-01' where key = 'consent_version'");
    await as("authenticated", S);
    expect(await allowed()).toBe(false);
    expect(await addGoal("old-notice")).toMatch(/row-level security/);
    for (const k of ["terms", "privacy", "cloud-sync"]) await consent(k, true, "2027-01");
    expect(await allowed()).toBe(true);
    await as("service_role");
    await db.query("update public.app_config set value = '2026-11-draft' where key = 'consent_version'");
  });

  // Owner decision (2026-11-26): no age limit (migration 20261126000000). This
  // test used to prove an under-18 block and a parental-consent requirement.
  it("an enabled student who declares under-18 keeps writing; the minors switch and parental consent play no part", async () => {
    await as("authenticated", T);
    await db.query("update public.profiles set age_band = 'under-18'");
    expect(await allowed()).toBe(true);
    expect(await addGoal("t-any-age")).toBe("");
    await setSwitch("minor_sync_permitted", "true");
    await as("authenticated", T);
    expect(await allowed()).toBe(true);
    expect(await enable()).toBe("enabled");
    // No parental consent can be recorded, so none can be required or withdrawn.
    await as("service_role");
    expect(await fails("insert into public.consents (user_id, kind, version, granted, method) values ($1, 'parental', '2026-11-draft', false, 'parent-verified')", [T])).toMatch(/consents_no_parental/);
    await setSwitch("minor_sync_permitted", "false");
    await as("authenticated", T);
    expect(await allowed()).toBe(true);
    await db.query("update public.profiles set age_band = '18-plus'");
  });
});

describe("M-1: row limits allow upserts of existing rows", () => {
  it("at the limit, existing rows (single key) can still be updated and tombstoned; only new rows are refused", async () => {
    await as("postgres");
    await db.query("delete from public.goals where user_id = $1", [S]);
    await as("authenticated", S);
    for (let i = 0; i < 50; i++) expect(await addGoal(`cap-${i}`)).toBe("");
    expect(await addGoal("cap-50")).toMatch(/row limit 50/);
    // Repeating the whole upload (what the sync engine does) succeeds at the limit.
    for (let i = 0; i < 50; i++) expect(await upsertGoal(`cap-${i}`), `cap-${i}`).toBe("");
    expect(await upsertGoal("cap-7", true)).toBe(""); // tombstone
    expect(await upsertGoal("cap-50")).toMatch(/row limit 50/); // genuinely new row
    expect(await one<number>("select count(*)::int from public.goals")).toBe(50);
  });

  it("works for composite keys too (checklist: cls, slug, item)", async () => {
    await as("authenticated", S);
    await db.query("insert into public.checklist_items (cls, slug, item, done) select '11', 'c' || g, 'notes', true from generate_series(1, 400) g");
    const up = (slug: string) => fails("insert into public.checklist_items (cls, slug, item, done) values ('11', $1, 'notes', false) on conflict (user_id, cls, slug, item) do update set done = excluded.done", [slug]);
    expect(await up("c1")).toBe("");
    expect(await up("c400")).toBe("");
    expect(await up("c401")).toMatch(/row limit 400/);
    expect(await fails("insert into public.checklist_items (cls, slug, item, done) values ('12', 'c1', 'notes', true)")).toMatch(/row limit 400/); // same slug, other class = new row
  });
});

describe("M-2 / L-12: protected profile columns", () => {
  it("students can set only display name, class, exam targets and age band", async () => {
    await as("authenticated", S);
    expect(await fails("update public.profiles set display_name = 'Asha', class_level = 12, exam_targets = '{neet}', age_band = '18-plus'")).toBe("");
    for (const [col, val] of [["sync_enabled", "false"], ["deletion_requested_at", "now()"], ["created_at", "now()"], ["updated_at", "now()"], ["user_id", `'${T}'`]]) {
      expect(await fails(`update public.profiles set ${col} = ${val}`), col).toMatch(/permission denied/);
    }
    for (const col of ["sync_enabled", "deletion_requested_at", "created_at", "user_id"]) {
      expect(await fails(`insert into public.profiles (${col}) values (${col === "user_id" ? `'${T}'` : col === "sync_enabled" ? "true" : "now()"})`), col).toMatch(/permission denied/);
    }
  });

  it("the trigger is a second layer: even with a column privilege, a client role can't change sync_enabled, and a client-set setting no longer helps", async () => {
    await as("postgres");
    await db.exec("grant update (sync_enabled) on public.profiles to authenticated");
    try {
      await as("authenticated", S);
      await db.query("select set_config('atlas.trusted_write', 'on', false)"); // the old bypass
      expect(await fails("update public.profiles set sync_enabled = false")).toMatch(/only change through their functions/);
    } finally {
      await as("postgres");
      await db.exec("revoke update (sync_enabled) on public.profiles from authenticated");
    }
    await as("authenticated", S);
    expect(await one<boolean>("select sync_enabled from public.profiles")).toBe(true);
  });
});

describe("M-3: no sync during a pending deletion, even with a re-created profile", () => {
  it("a profile re-created after a purge can't enable sync or write while the deletion request exists", async () => {
    // Deletion is gated (20261122000000, audit F5); the owner opens the gate first.
    await as("postgres");
    await db.query("update public.app_config set value = 'true' where key = 'account_deletion_enabled'");
    await as("authenticated", T);
    expect(await allowed()).toBe(true);
    await db.query("select public.request_account_deletion()");
    expect(await allowed()).toBe(false);
    // The purge succeeds but removing the auth user fails, so the request stays pending.
    await as("service_role");
    await db.query("select public.purge_user_data($1)", [T]);
    await as("authenticated", T);
    expect(await one<number>("select count(*)::int from public.profiles")).toBe(0);
    await db.query("insert into public.profiles (age_band) values ('18-plus')");
    for (const k of ["terms", "privacy", "cloud-sync"]) await consent(k, true);
    expect(await enable()).toBe("deletion-pending");
    expect(await allowed()).toBe(false);
    expect(await addGoal("during-pending-deletion")).toMatch(/row-level security/);
  });
});

describe("server role (service_role): least privilege (migration 20261121000000)", () => {
  const TABLES = ["app_config", "profiles", "consents", "bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks", "deletion_requests", "deletion_log"];
  it("can read every Atlas table, but can't update, delete or truncate student data directly", async () => {
    await as("postgres");
    for (const t of TABLES) {
      const priv = async (p: string) => one<boolean>(`select has_table_privilege('service_role', 'public.${t}', '${p}')`);
      expect(await priv("select"), `${t} select`).toBe(true);
      expect(await priv("delete"), `${t} delete`).toBe(false);
      expect(await priv("truncate"), `${t} truncate`).toBe(false);
      if (t !== "app_config") expect(await priv("update"), `${t} update`).toBe(false);
      if (t !== "consents") expect(await priv("insert"), `${t} insert`).toBe(false);
    }
    await as("service_role");
    expect(await fails("delete from public.goals")).toMatch(/permission denied/);
    expect(await fails("update public.mistakes set note = 'x'")).toMatch(/permission denied/);
    expect(await fails("truncate public.bookmarks")).toMatch(/permission denied/);
    expect(await fails("update public.app_config set key = 'consent_version' where key = 'adult_sync_permitted'")).toMatch(/permission denied/); // only the value column
    expect(await fails("select count(*) from public.deletion_requests")).toBe("");
  });
});

describe("L-2, L-3, L-5", () => {
  it("L-2: consent history is capped per student", async () => {
    await as("authenticated", S);
    const have = await one<number>("select count(*)::int from public.consents");
    for (let i = have; i < 200; i++) await consent("privacy", true);
    expect(await fails("insert into public.consents (kind, version, granted) values ('privacy', '2026-11-draft', true)")).toMatch(/row limit 200/);
  });

  it("L-3: bookmark paths must be same-site (no protocol-relative //host)", async () => {
    await as("authenticated", S);
    const ins = (id: string, p: string) => fails("insert into public.bookmarks (bookmark_id, cls, slug, type, chapter_name, label, path, bookmarked_at) values ($1,'11','kinematics','chapter','K','K',$2,now())", [id, p]);
    expect(await ins("p1", "/class-11/kinematics")).toBe("");
    expect(await ins("p2", "/class-11/kinematics/notes/")).toBe("");
    expect(await ins("p3", "//localhost")).toMatch(/check constraint/);
    expect(await ins("p4", "//evil/x")).toMatch(/check constraint/);
    expect(await ins("p5", "/")).toMatch(/check constraint/);
  });

  it("L-5: policies evaluate auth.uid() and sync_allowed() once per statement", async () => {
    await as("postgres");
    const pol = await db.query<{ tablename: string; policyname: string; qual: string | null; with_check: string | null }>("select tablename, policyname, qual, with_check from pg_policies where schemaname = 'public'");
    expect(pol.rows.length).toBe(23);
    for (const p of pol.rows) {
      const text = `${p.qual ?? ""} ${p.with_check ?? ""}`;
      expect(text, p.policyname).toMatch(/\(\s*SELECT auth\.uid\(\)/i);
      expect(text.replace(/\(\s*SELECT auth\.uid\(\)[^)]*\)/gi, ""), p.policyname).not.toMatch(/auth\.uid\(\)/);
      if (/_own_(insert|update)$/.test(p.policyname) && !/^(profiles|consents)_/.test(p.policyname)) expect(text, p.policyname).toMatch(/\(\s*SELECT (public\.)?sync_allowed\(\)/i);
    }
  });
});
