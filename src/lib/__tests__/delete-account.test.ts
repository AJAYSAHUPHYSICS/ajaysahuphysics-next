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
  };
  const deps: Deps = {
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
    expect(await sweep(deps, "sweep-secret")).toEqual({ status: 200, body: { processed: 1, completed: 1, pending: 0 } });
    expect(state.users.has("u1")).toBe(false);
    expect(state.users.has("u2")).toBe(true);
  });
});
