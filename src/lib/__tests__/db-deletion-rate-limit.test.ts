import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────
// Account-deletion rate limits (migration 20261122010000, audit F6 gap 3),
// against real Postgres (PGlite), each statement run as the real client role.
// Covers: normal and repeated requests within the limit; enforcement;
// per-user and per-action isolation; window expiry; nothing is counted while
// the gate is off; clients can't call or read the limiter; and the operator
// (support-assisted) procedure is never limited.
// Concurrency is serialised by an advisory lock; PGlite has one connection,
// so parallel calls are verified on staging (deletion-gate.staging.mjs).
// ─────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..", "..", "..");
const A = "00000000-0000-4000-8000-0000000000f1";
const B = "00000000-0000-4000-8000-0000000000f2";
const C = "00000000-0000-4000-8000-0000000000f3";
let db: PGlite;

async function as(role: "anon" | "authenticated" | "service_role" | "postgres", sub?: string) {
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
const one = async <T,>(sql: string, params: unknown[] = []) => Object.values((await db.query<Record<string, T>>(sql, params)).rows[0])[0] as T;
async function setGate(v: "true" | "false") {
  await as("postgres");
  await db.query("update public.app_config set value = $1 where key = 'account_deletion_enabled'", [v]);
}
const wait = async (id: string, act: string) => {
  await as("service_role");
  return one<number>("select public.deletion_rate_wait($1, $2)", [id, act]);
};
const rateRows = async (id: string, act: string) => {
  await as("postgres");
  return Number(await one<number>("select count(*)::int from public.deletion_rate where user_id = $1 and action = $2", [id, act]));
};

beforeAll(async () => {
  db = new PGlite();
  await db.exec(readFileSync(path.join(ROOT, "supabase", "tests", "supabase-auth-shim.sql"), "utf8"));
  for (const f of readdirSync(path.join(ROOT, "supabase", "migrations")).filter((f) => f.endsWith(".sql")).sort()) {
    await db.exec(readFileSync(path.join(ROOT, "supabase", "migrations", f), "utf8"));
  }
  await db.query("insert into auth.users (id, email) values ($1, 'a@example.test'), ($2, 'b@example.test'), ($3, 'c@example.test')", [A, B, C]);
  for (const id of [A, B, C]) {
    await as("authenticated", id);
    await db.query("insert into public.profiles (age_band) values ('18-plus')");
  }
}, 60_000);
afterAll(async () => db?.close());

describe("deletion rate limit: request_account_deletion()", () => {
  it("while the gate is off, nothing is counted (the gate refuses first)", async () => {
    await setGate("false");
    await as("authenticated", A);
    for (let i = 0; i < 8; i++) expect(await fails("select public.request_account_deletion()")).toMatch(/deletion-disabled/);
    expect(await rateRows(A, "request")).toBe(0);
  });

  it("normal and repeated requests within the limit succeed and stay idempotent", async () => {
    await setGate("true");
    await as("authenticated", A);
    const first = await one<string>("select public.request_account_deletion()");
    for (let i = 0; i < 4; i++) expect(String(await one<string>("select public.request_account_deletion()"))).toBe(String(first));
    await as("postgres");
    expect(Number(await one<number>("select count(*)::int from public.deletion_requests where user_id = $1", [A]))).toBe(1);
  });

  it("the 6th request within the hour is refused as rate-limited, and nothing more is recorded", async () => {
    await as("authenticated", A);
    const err = await fails("select public.request_account_deletion()");
    expect(err).toMatch(/rate-limited/);
    expect(err).not.toMatch(new RegExp(A));
    expect(await rateRows(A, "request")).toBe(5);
  });

  it("limits are per user: another student is unaffected", async () => {
    await as("authenticated", B);
    expect(await fails("select public.request_account_deletion()")).toBe("");
    expect(await rateRows(B, "request")).toBe(1);
  });

  it("the window slides: once the oldest call is older than an hour, a new request is allowed", async () => {
    await as("postgres");
    await db.query("update public.deletion_rate set at = at - interval '61 minutes' where user_id = $1 and action = 'request'", [A]);
    await as("authenticated", A);
    expect(await fails("select public.request_account_deletion()")).toBe("");
    expect(await rateRows(A, "request")).toBe(1); // the expired rows were pruned
  });
});

describe("deletion rate limit: the function's counter (deletion_rate_wait)", () => {
  it("allows 6 calls per 10 minutes, then returns the seconds to wait (1..600)", async () => {
    for (let i = 0; i < 6; i++) expect(await wait(C, "function")).toBe(0);
    const w = await wait(C, "function");
    expect(w).toBeGreaterThanOrEqual(1);
    expect(w).toBeLessThanOrEqual(600);
    expect(await rateRows(C, "function")).toBe(6);
  });

  it("actions are counted separately", async () => {
    expect(await rateRows(C, "request")).toBe(0);
    await setGate("true");
    await as("authenticated", C);
    expect(await fails("select public.request_account_deletion()")).toBe("");
  });

  it("rejects unknown actions and a missing user id", async () => {
    await as("service_role");
    expect(await fails("select public.deletion_rate_wait($1, 'other')", [C])).toMatch(/unknown action/);
    expect(await fails("select public.deletion_rate_wait(null, 'function')")).toMatch(/target required/);
  });

  it("students and anonymous callers can't call the limiter or read its table", async () => {
    for (const [role, sub] of [["anon", undefined], ["authenticated", A]] as const) {
      await as(role, sub);
      expect(await fails("select public.deletion_rate_wait($1, 'function')", [A]), role).toMatch(/permission denied/);
      expect(await fails("select * from public.deletion_rate"), role).toMatch(/permission denied/);
      expect(await fails("delete from public.deletion_rate"), role).toMatch(/permission denied/);
    }
    await as("service_role");
    expect(await fails("delete from public.deletion_rate")).toMatch(/permission denied/);
    expect(await fails("insert into public.deletion_rate (user_id, action) values ($1, 'function')", [A])).toMatch(/permission denied/);
  });
});

describe("support-assisted deletion is never rate limited", () => {
  it("a student who has hit both limits is still fully deleted by the operator procedure", async () => {
    await as("postgres");
    expect(await rateRows(C, "function")).toBe(6); // exhausted above
    await as("service_role");
    const n = Number(await one<number>("select public.purge_user_data($1)", [C]));
    expect(n).toBeGreaterThan(0);
    await as("postgres");
    await db.query("delete from auth.users where id = $1", [C]); // the auth-user deletion step
    expect(Number(await one<number>("select count(*)::int from public.profiles where user_id = $1", [C]))).toBe(0);
    expect(Number(await one<number>("select count(*)::int from public.deletion_requests where user_id = $1", [C]))).toBe(0);
    expect(await rateRows(C, "function")).toBe(0); // limiter rows cascade with the user
    await setGate("false");
  });
});
