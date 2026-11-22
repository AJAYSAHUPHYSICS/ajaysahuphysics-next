// ─────────────────────────────────────────────────────────────────
// Account deletion: pure core of the `delete-account` Edge Function.
// Dependencies are injected so retries and partial failures can be
// unit-tested (src/lib/__tests__/delete-account.test.ts) without Deno.
//
// Contract
//   * A student may delete only their own account, and only after they have
//     recorded the request themselves (request_account_deletion()), so a
//     stolen access token alone can't delete an account in one call.
//   * Order: purge every study/consent/profile row (purge_user_data, which
//     writes a PII-free audit row), THEN delete the auth user (cascades
//     anything left, including the request row).
//   * Every step is idempotent. If the auth-user deletion fails, the request
//     row stays, the response says "pending", and a later retry (by the
//     student or the scheduled sweep) finishes the job.
//   * The scheduled sweep (service role only) processes pending requests
//     older than a grace window, so deletion completes even if the student
//     never comes back.
//   * Deletion gate (audit F5): both paths check
//     public.account_deletion_enabled() first. Off means 403
//     "deletion-disabled"; an unreadable gate means 503
//     "deletion-unavailable". Either way nothing is purged or deleted
//     (fail closed). There are no exemptions for any account.
//   * Database errors are reported, never treated as "nothing to do"
//     (audit F6): a failed sweep query is a 500, so the scheduler alerts.
//   * Rate limit (audit F6, gap 3): the user path is limited per verified
//     user (public.deletion_rate_wait, 6 calls per 10 minutes) after the
//     token and gate checks: 429 "rate-limited" with retryAfterSeconds. A
//     limiter error is a 503 (fail closed). The sweep (sweep secret) and the
//     operator procedure are not limited.
//   * The sweep reports "stale": requests still pending after the alert
//     threshold. The scheduler fails (alerts) when stale or pending > 0,
//     and when the gate is off while requests are outstanding.
// ─────────────────────────────────────────────────────────────────

export type Deps = {
  /** public.account_deletion_enabled(); throws if it can't be read. */
  deletionEnabled(): Promise<boolean>;
  /** public.deletion_rate_wait(userId, 'function'): 0 = allowed (and counted), else seconds to wait. Throws on error. */
  rateWait(userId: string): Promise<number>;
  /** Verifies a user access token; returns the user id or null. */
  verifyUser(accessToken: string): Promise<string | null>;
  /** When the user recorded their deletion request, or null. Throws on a database error. */
  requestedAt(userId: string): Promise<string | null>;
  /** Pending requests older than the cutoff (sweep mode). Throws on a database error. */
  pendingBefore(cutoffIso: string): Promise<string[]>;
  /** Runs public.purge_user_data(userId); returns rows deleted. */
  purge(userId: string): Promise<number>;
  /** Deletes the auth user; resolves true if deleted or already gone. */
  deleteAuthUser(userId: string): Promise<boolean>;
  /** Constant-time check of the sweep secret. */
  isSweepSecret(secret: string): boolean;
  now(): number;
};

export type Outcome = { status: number; body: Record<string, unknown> };

const DISABLED: Outcome = { status: 403, body: { error: "deletion-disabled" } };
const UNAVAILABLE: Outcome = { status: 503, body: { error: "deletion-unavailable" } };

/** "open" only when the gate reads true; any error is "unreadable" (fail closed). */
async function gate(deps: Deps): Promise<"open" | "off" | "unreadable"> {
  try {
    return (await deps.deletionEnabled()) === true ? "open" : "off";
  } catch {
    return "unreadable";
  }
}

export async function deleteOwnAccount(deps: Deps, authorization: string | null): Promise<Outcome> {
  const token = /^Bearer (.+)$/.exec(authorization ?? "")?.[1];
  if (!token) return { status: 401, body: { error: "not-signed-in" } };
  const userId = await deps.verifyUser(token);
  if (!userId) return { status: 401, body: { error: "not-signed-in" } };
  const g = await gate(deps);
  if (g === "off") return DISABLED;
  if (g === "unreadable") return UNAVAILABLE;
  let wait: number;
  try {
    wait = await deps.rateWait(userId);
  } catch {
    return UNAVAILABLE;
  }
  if (!Number.isFinite(wait) || wait < 0) return UNAVAILABLE;
  if (wait > 0) return { status: 429, body: { error: "rate-limited", retryAfterSeconds: Math.ceil(wait) } };
  let requested: string | null;
  try {
    requested = await deps.requestedAt(userId);
  } catch {
    return UNAVAILABLE;
  }
  if (!requested) return { status: 409, body: { error: "request-deletion-first" } };
  return finish(deps, userId);
}

export async function sweep(deps: Deps, secret: string | null, graceHours = 24, staleHours = 72): Promise<Outcome> {
  if (!secret || !deps.isSweepSecret(secret)) return { status: 401, body: { error: "forbidden" } };
  const g = await gate(deps);
  if (g === "unreadable") return UNAVAILABLE;
  if (g === "off") {
    // Nothing is processed. Requests accepted while the gate was open are
    // still owed (runbook C.3 step 5), so report how many are outstanding.
    try {
      const outstanding = await deps.pendingBefore(new Date(deps.now()).toISOString());
      return { status: 403, body: { error: "deletion-disabled", pendingRequests: outstanding.length } };
    } catch {
      return { status: 500, body: { error: "sweep-query-failed" } };
    }
  }
  const cutoff = new Date(deps.now() - graceHours * 3_600_000).toISOString();
  let ids: string[];
  try {
    ids = await deps.pendingBefore(cutoff);
  } catch {
    return { status: 500, body: { error: "sweep-query-failed" } };
  }
  const results = [];
  for (const id of ids) results.push((await finish(deps, id)).body.status);
  let stale: number;
  try {
    stale = (await deps.pendingBefore(new Date(deps.now() - staleHours * 3_600_000).toISOString())).length;
  } catch {
    return { status: 500, body: { error: "sweep-query-failed" } };
  }
  return { status: 200, body: { processed: ids.length, completed: results.filter((r) => r === "deleted").length, pending: results.filter((r) => r === "pending").length, stale } };
}

async function finish(deps: Deps, userId: string): Promise<Outcome> {
  let rows = 0;
  try {
    rows = await deps.purge(userId);
  } catch {
    return { status: 202, body: { status: "pending", step: "purge" } };
  }
  let gone = false;
  try {
    gone = await deps.deleteAuthUser(userId);
  } catch {
    gone = false;
  }
  if (!gone) return { status: 202, body: { status: "pending", step: "auth-user", rowsDeleted: rows } };
  return { status: 200, body: { status: "deleted", rowsDeleted: rows } };
}
