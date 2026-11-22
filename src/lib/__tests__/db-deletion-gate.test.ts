import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────
// Server-side account deletion gate (audit F5), against real Postgres
// (PGlite) with every statement run as the role a real client uses.
// Proves: off by default; a direct call by a signed-in student is rejected
// and records nothing; a missing, unexpected or unreadable gate fails
// closed; the gate opens only through a deliberate change; no exemptions;
// the sync switches are untouched.
// ─────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..", "..", "..");
const A = "00000000-0000-4000-8000-0000000000d1";
const TEST_ACCOUNT = "00000000-0000-4000-8000-0000000000d2";
let db: PGlite;

async function as(role: "anon" | "authenticated" | "service_role" | "postgres", sub?: string) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role }) : ""]);
  if (role !== "postgres") await db.exec(`set role ${role}`);
}
async function fails(sql: string): Promise<string> {
  try {
    await db.query(sql);
    return "";
  } catch (e) {
    return (e as Error).message;
  }
}
async function setGate(value: string | null) {
  await as("postgres");
  if (value === null) await db.query("delete from public.app_config where key = 'account_deletion_enabled'");
  else await db.query("insert into public.app_config (key, value) values ('account_deletion_enabled', $1) on conflict (key) do update set value = excluded.value", [value]);
}
async function requestsFor(id: string) {
  await as("postgres");
  return Number((await db.query<{ n: number }>("select count(*)::int as n from public.deletion_requests where user_id = $1", [id])).rows[0].n);
}
async function profileOf(id: string) {
  await as("postgres");
  return (await db.query<{ deletion_requested_at: string | null; sync_enabled: boolean }>("select deletion_requested_at, sync_enabled from public.profiles where user_id = $1", [id])).rows[0];
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(readFileSync(path.join(ROOT, "supabase", "tests", "supabase-auth-shim.sql"), "utf8"));
  for (const f of readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort()) {
    await db.exec(readFileSync(path.join(ROOT, "supabase", "migrations", f), "utf8"));
  }
  await db.query("insert into auth.users (id, email) values ($1, 'student@example.test'), ($2, 'atlas-staging-ui-test@example.com')", [A, TEST_ACCOUNT]);
  for (const id of [A, TEST_ACCOUNT]) {
    await as("authenticated", id);
    await db.query("insert into public.profiles (age_band) values ('18-plus')");
  }
}, 60_000);
afterAll(async () => db?.close());

describe("account deletion gate: default", () => {
  it("the migrations create the gate OFF, and leave both sync switches off", async () => {
    await as("postgres");
    const cfg = Object.fromEntries((await db.query<{ key: string; value: string }>("select key, value from public.app_config")).rows.map((r) => [r.key, r.value]));
    expect(cfg.account_deletion_enabled).toBe("false");
    expect(cfg.adult_sync_permitted).toBe("false");
    expect(cfg.minor_sync_permitted).toBe("false");
    await as("authenticated", A);
    expect((await db.query<{ v: boolean }>("select public.account_deletion_enabled() as v")).rows[0].v).toBe(false);
  });
});

describe("account deletion gate: off", () => {
  beforeEach(() => setGate("false"));

  it("a signed-in student's direct call to request_account_deletion() is rejected, and nothing is recorded", async () => {
    await as("authenticated", A);
    expect(await fails("select public.request_account_deletion()")).toMatch(/deletion-disabled/);
    expect(await requestsFor(A)).toBe(0);
    expect((await profileOf(A)).deletion_requested_at).toBeNull();
  });

  it("there is no exemption: a test-style account is rejected the same way", async () => {
    await as("authenticated", TEST_ACCOUNT);
    expect(await fails("select public.request_account_deletion()")).toMatch(/deletion-disabled/);
    expect(await requestsFor(TEST_ACCOUNT)).toBe(0);
  });

  it("signed-out callers are refused before the gate is even considered", async () => {
    await as("anon");
    expect(await fails("select public.request_account_deletion()")).toMatch(/permission denied/);
    expect(await fails("select public.account_deletion_enabled()")).toMatch(/permission denied/);
  });

  it("students can't open the gate themselves", async () => {
    await as("authenticated", A);
    expect(await fails("update public.app_config set value = 'true' where key = 'account_deletion_enabled'")).toMatch(/permission denied/);
    await as("postgres");
    expect((await db.query<{ value: string }>("select value from public.app_config where key = 'account_deletion_enabled'")).rows[0].value).toBe("false");
  });
});

describe("account deletion gate: fails closed", () => {
  it("a missing gate row counts as off", async () => {
    await setGate(null);
    await as("authenticated", A);
    expect((await db.query<{ v: boolean }>("select public.account_deletion_enabled() as v")).rows[0].v).toBe(false);
    expect(await fails("select public.request_account_deletion()")).toMatch(/deletion-disabled/);
    expect(await requestsFor(A)).toBe(0);
  });

  it("any value other than exactly 'true' counts as off", async () => {
    for (const v of ["TRUE", "yes", "1", "on", " true", ""]) {
      await setGate(v);
      await as("authenticated", A);
      expect(await fails("select public.request_account_deletion()"), JSON.stringify(v)).toMatch(/deletion-disabled/);
    }
    expect(await requestsFor(A)).toBe(0);
  });

  it("an unreadable gate rejects the request (error, nothing recorded)", async () => {
    await setGate("true");
    await as("postgres");
    await db.exec("alter table public.app_config rename to app_config_unavailable");
    try {
      await as("authenticated", A);
      expect(await fails("select public.request_account_deletion()")).not.toBe("");
      expect(await requestsFor(A)).toBe(0);
    } finally {
      await as("postgres");
      await db.exec("alter table public.app_config_unavailable rename to app_config");
      await setGate("false");
    }
  });
});

describe("account deletion gate: open", () => {
  it("after a deliberate change to 'true', the same request succeeds (and sync stays off)", async () => {
    await setGate("true");
    await as("authenticated", A);
    expect(await fails("select public.request_account_deletion()")).toBe("");
    expect(await requestsFor(A)).toBe(1);
    const p = await profileOf(A);
    expect(p.deletion_requested_at).not.toBeNull();
    expect(p.sync_enabled).toBe(false);
    await as("postgres");
    const sync = (await db.query<{ value: string }>("select value from public.app_config where key in ('adult_sync_permitted', 'minor_sync_permitted')")).rows;
    expect(sync.every((r) => r.value === "false")).toBe(true);
  });

  it("the server role can read the gate, and can't delete the gate row", async () => {
    await as("service_role");
    expect((await db.query<{ v: boolean }>("select public.account_deletion_enabled() as v")).rows[0].v).toBe(true);
    expect(await fails("delete from public.app_config where key = 'account_deletion_enabled'")).toMatch(/permission denied/);
    await setGate("false");
  });
});
