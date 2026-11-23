import { describe, expect, it } from "vitest";
import { deleteOwnAccount, sweep, type Deps } from "../../../supabase/functions/delete-account/handler";

// Account deletion core (the Edge Function's logic), with an in-memory
// backend that can fail at chosen steps.
function backend(over: Partial<Deps> = {}) {
  const state = {
    users: new Set(["u1", "u2"]),
    rows: new Map([["u1", 12], ["u2", 5]]),
    requests: new Map<string, string>(),
    purgeCalls: 0,
    failPurge: 0,
    failAuthDelete: 0,
    gate: true as boolean | "unreadable",
    rateCalls: new Map<string, number>(),
    rateLimit: 6,
    rateChecks: 0,
  };
  const deps: Deps = {
    // In-memory stand-in for public.deletion_rate_wait (atomic per call).
    rateWait: async (id) => {
      state.rateChecks++;
      const n = state.rateCalls.get(id) ?? 0;
      if (n >= state.rateLimit) return 420;
      state.rateCalls.set(id, n + 1);
      return 0;
    },
    deletionEnabled: async () => {
      if (state.gate === "unreadable") throw new Error("app_config unavailable");
      return state.gate;
    },
    verifyUser: async (t) => (t === "token-u1" ? "u1" : t === "token-u2" ? "u2" : null),
    requestedAt: async (id) => state.requests.get(id) ?? null,
    pendingBefore: async (cutoff) => [...state.requests].filter(([, at]) => at < cutoff).map(([id]) => id),
    purge: async (id) => {
      state.purgeCalls++;
      if (state.failPurge-- > 0) throw new Error("db timeout");
      const n = state.rows.get(id) ?? 0;
      state.rows.delete(id);
      return n;
    },
    deleteAuthUser: async (id) => {
      if (state.failAuthDelete-- > 0) throw new Error("auth api 500");
      state.users.delete(id);
      state.requests.delete(id); // cascade
      return true;
    },
    isSweepSecret: (s) => s === "sweep-secret",
    now: () => Date.parse("2026-11-20T12:00:00Z"),
    ...over,
  };
  return { state, deps };
}

describe("delete-account", () => {
  it("refuses without a valid token, and before the student has recorded a request", async () => {
    const { deps, state } = backend();
    expect((await deleteOwnAccount(deps, null)).status).toBe(401);
    expect((await deleteOwnAccount(deps, "Bearer forged")).status).toBe(401);
    expect(await deleteOwnAccount(deps, "Bearer token-u1")).toEqual({ status: 409, body: { error: "request-deletion-first" } });
    expect(state.users.has("u1")).toBe(true);
  });

  it("deletes only the caller: data first, then the auth user", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-20T11:00:00Z");
    expect(await deleteOwnAccount(deps, "Bearer token-u1")).toEqual({ status: 200, body: { status: "deleted", rowsDeleted: 12 } });
    expect(state.users.has("u1")).toBe(false);
    expect(state.rows.has("u1")).toBe(false);
    expect(state.users.has("u2")).toBe(true);
    expect(state.rows.get("u2")).toBe(5);
  });

  it("survives a failure at either step and completes on retry without double effects", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-20T11:00:00Z");
    state.failPurge = 1;
    expect((await deleteOwnAccount(deps, "Bearer token-u1")).body).toMatchObject({ status: "pending", step: "purge" });
    expect(state.users.has("u1")).toBe(true);
    state.failAuthDelete = 1;
    expect((await deleteOwnAccount(deps, "Bearer token-u1")).body).toMatchObject({ status: "pending", step: "auth-user", rowsDeleted: 12 });
    expect(state.rows.has("u1")).toBe(false);
    expect(state.requests.has("u1")).toBe(true); // still recorded, so it will be retried
    expect((await deleteOwnAccount(deps, "Bearer token-u1")).body).toEqual({ status: "deleted", rowsDeleted: 0 });
    expect(state.users.has("u1")).toBe(false);
  });

  it("the scheduled sweep needs the secret and finishes requests older than the grace window", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-18T09:00:00Z"); // old
    state.requests.set("u2", "2026-11-20T11:30:00Z"); // within 24 h grace
    expect((await sweep(deps, "wrong")).status).toBe(401);
    expect((await sweep(deps, null)).status).toBe(401);
    expect(await sweep(deps, "sweep-secret")).toEqual({ status: 200, body: { processed: 1, completed: 1, pending: 0, stale: 0 } });
    expect(state.users.has("u1")).toBe(false);
    expect(state.users.has("u2")).toBe(true);
  });
});

describe("delete-account: deletion gate (audit F5)", () => {
  it("gate off: a valid user token with a recorded request is rejected, and nothing is purged or deleted", async () => {
    const { deps, state } = backend();
    state.gate = false;
    state.requests.set("u1", "2026-11-20T11:00:00Z");
    expect(await deleteOwnAccount(deps, "Bearer token-u1")).toEqual({ status: 403, body: { error: "deletion-disabled" } });
    expect(state.purgeCalls).toBe(0);
    expect(state.users.has("u1")).toBe(true);
    expect(state.rows.get("u1")).toBe(12);
  });

  it("gate off: a sweep with the valid secret is rejected, nothing is processed, and outstanding requests are counted", async () => {
    const { deps, state } = backend();
    state.gate = false;
    state.requests.set("u1", "2026-11-18T09:00:00Z");
    expect(await sweep(deps, "sweep-secret")).toEqual({ status: 403, body: { error: "deletion-disabled", pendingRequests: 1 } });
    expect(state.purgeCalls).toBe(0);
    expect(state.users.has("u1")).toBe(true);
  });

  it("an unreadable gate fails closed on both paths", async () => {
    const { deps, state } = backend();
    state.gate = "unreadable";
    state.requests.set("u1", "2026-11-18T09:00:00Z");
    expect(await deleteOwnAccount(deps, "Bearer token-u1")).toEqual({ status: 503, body: { error: "deletion-unavailable" } });
    expect(await sweep(deps, "sweep-secret")).toEqual({ status: 503, body: { error: "deletion-unavailable" } });
    expect(state.purgeCalls).toBe(0);
    expect(state.users.has("u1")).toBe(true);
  });

  it("the gate never weakens authentication: no token or a wrong secret is still 401 when the gate is off", async () => {
    const { deps, state } = backend();
    state.gate = false;
    expect((await deleteOwnAccount(deps, null)).status).toBe(401);
    expect((await deleteOwnAccount(deps, "Bearer forged")).status).toBe(401);
    expect((await sweep(deps, "wrong")).status).toBe(401);
  });

  it("gate open: the same requests succeed, with no exemption or special case for any account", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-18T09:00:00Z");
    state.requests.set("u2", "2026-11-20T11:00:00Z");
    expect((await deleteOwnAccount(deps, "Bearer token-u2")).body).toEqual({ status: "deleted", rowsDeleted: 5 });
    expect((await sweep(deps, "sweep-secret")).body).toEqual({ processed: 1, completed: 1, pending: 0, stale: 0 });
    expect(state.users.size).toBe(0);
  });
});

describe("delete-account: database errors are reported (audit F6)", () => {
  it("a failed sweep query is a 500, not 'processed: 0'", async () => {
    const { deps } = backend({ pendingBefore: async () => { throw new Error("db down"); } });
    expect(await sweep(deps, "sweep-secret")).toEqual({ status: 500, body: { error: "sweep-query-failed" } });
  });

  it("with the gate off, a failed outstanding-request count is also a 500", async () => {
    const { deps, state } = backend({ pendingBefore: async () => { throw new Error("db down"); } });
    state.gate = false;
    expect(await sweep(deps, "sweep-secret")).toEqual({ status: 500, body: { error: "sweep-query-failed" } });
  });

  it("a failed request lookup on the user path is a 503, not 'request-deletion-first'", async () => {
    const { deps, state } = backend({ requestedAt: async () => { throw new Error("db down"); } });
    state.requests.set("u1", "2026-11-20T11:00:00Z");
    expect(await deleteOwnAccount(deps, "Bearer token-u1")).toEqual({ status: 503, body: { error: "deletion-unavailable" } });
    expect(state.purgeCalls).toBe(0);
  });

  it("requests still pending past the alert threshold are reported as stale", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-10T09:00:00Z"); // 10 days old
    state.failAuthDelete = 1;
    expect((await sweep(deps, "sweep-secret")).body).toEqual({ processed: 1, completed: 0, pending: 1, stale: 1 });
  });
});

describe("delete-account: rate limit (audit F6, gap 3)", () => {
  it("normal and repeated calls within the limit behave as before (idempotent)", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-20T11:00:00Z");
    state.failAuthDelete = 1;
    expect((await deleteOwnAccount(deps, "Bearer token-u1")).body).toMatchObject({ status: "pending" });
    expect((await deleteOwnAccount(deps, "Bearer token-u1")).body).toEqual({ status: "deleted", rowsDeleted: 0 });
    expect(state.rateCalls.get("u1")).toBe(2);
  });

  it("over the limit: 429 with retryAfterSeconds, and nothing is purged or deleted", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-20T11:00:00Z");
    state.rateCalls.set("u1", 6);
    expect(await deleteOwnAccount(deps, "Bearer token-u1")).toEqual({ status: 429, body: { error: "rate-limited", retryAfterSeconds: 420 } });
    expect(state.purgeCalls).toBe(0);
    expect(state.users.has("u1")).toBe(true);
  });

  it("limits are per verified user: one student's limit doesn't affect another", async () => {
    const { deps, state } = backend();
    state.rateCalls.set("u1", 6);
    state.requests.set("u2", "2026-11-20T11:00:00Z");
    expect((await deleteOwnAccount(deps, "Bearer token-u2")).status).toBe(200);
  });

  it("concurrent calls: at most the limit gets through, the account is deleted once, and nothing is a 5xx", async () => {
    const { deps, state } = backend();
    state.requests.set("u1", "2026-11-20T11:00:00Z");
    const out = await Promise.all(Array.from({ length: 10 }, () => deleteOwnAccount(deps, "Bearer token-u1")));
    const statuses = out.map((o) => o.status);
    expect(statuses.filter((s) => s === 429)).toHaveLength(4);
    expect(statuses.every((s) => [200, 409, 429].includes(s))).toBe(true);
    expect(state.users.has("u1")).toBe(false);
    expect(state.rows.has("u1")).toBe(false);
    expect(state.rows.get("u2")).toBe(5);
  });

  it("the limiter is consulted only for a verified user with the gate open", async () => {
    const { deps, state } = backend();
    await deleteOwnAccount(deps, null);
    await deleteOwnAccount(deps, "Bearer forged");
    state.gate = false;
    await deleteOwnAccount(deps, "Bearer token-u1");
    expect(state.rateChecks).toBe(0);
  });

  it("a limiter error or a nonsense value fails closed (503), never through", async () => {
    for (const bad of [async () => { throw new Error("db down"); }, async () => Number.NaN, async () => -1]) {
      const { deps, state } = backend({ rateWait: bad });
      state.requests.set("u1", "2026-11-20T11:00:00Z");
      expect(await deleteOwnAccount(deps, "Bearer token-u1")).toEqual({ status: 503, body: { error: "deletion-unavailable" } });
      expect(state.purgeCalls).toBe(0);
    }
  });

  it("the scheduled sweep is not rate limited (support-assisted completion always works)", async () => {
    const { deps, state } = backend();
    state.rateCalls.set("u1", 6);
    state.requests.set("u1", "2026-11-18T09:00:00Z");
    expect((await sweep(deps, "sweep-secret")).body).toEqual({ processed: 1, completed: 1, pending: 0, stale: 0 });
    expect(state.rateChecks).toBe(0);
    expect(state.users.has("u1")).toBe(false);
  });
});
