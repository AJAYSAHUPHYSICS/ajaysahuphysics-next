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
// ─────────────────────────────────────────────────────────────────

export type Deps = {
  /** Verifies a user access token; returns the user id or null. */
  verifyUser(accessToken: string): Promise<string | null>;
  /** When the user recorded their deletion request, or null. */
  requestedAt(userId: string): Promise<string | null>;
  /** Pending requests older than the cutoff (sweep mode). */
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

export async function deleteOwnAccount(deps: Deps, authorization: string | null): Promise<Outcome> {
  const token = /^Bearer (.+)$/.exec(authorization ?? "")?.[1];
  if (!token) return { status: 401, body: { error: "not-signed-in" } };
  const userId = await deps.verifyUser(token);
  if (!userId) return { status: 401, body: { error: "not-signed-in" } };
  if (!(await deps.requestedAt(userId))) return { status: 409, body: { error: "request-deletion-first" } };
  return finish(deps, userId);
}

export async function sweep(deps: Deps, secret: string | null, graceHours = 24): Promise<Outcome> {
  if (!secret || !deps.isSweepSecret(secret)) return { status: 401, body: { error: "forbidden" } };
  const cutoff = new Date(deps.now() - graceHours * 3_600_000).toISOString();
  const ids = await deps.pendingBefore(cutoff);
  const results = [];
  for (const id of ids) results.push((await finish(deps, id)).body.status);
  return { status: 200, body: { processed: ids.length, completed: results.filter((r) => r === "deleted").length, pending: results.filter((r) => r === "pending").length } };
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
