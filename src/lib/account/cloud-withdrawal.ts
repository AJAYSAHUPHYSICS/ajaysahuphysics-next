// ─────────────────────────────────────────────────────────────────
// Withdrawing cloud-copy consent (owner decision J, option B, 2026-11-27).
//
// The account page calls withdrawCloudCopy(), passing the consent rows to record:
//   1. begin_cloud_withdrawal(): its own database transaction, BEFORE anything
//      else. It turns sync off, sets the durable withdrawal marker and replaces
//      the cloud generation, so even if everything after it fails, an old grant
//      can't turn sync back on (migration 20261127000000);
//   1b. the page's consent rows, including the withdrawal (a new 'cloud-sync'
//      row with granted = false);
//   2. withdraw_cloud_copies(): ONE transaction that turns sync off, makes sure
//      the withdrawal is on record, and deletes this student's rows in the six
//      cloud-copy tables. An upload already in flight either commits first (and
//      is deleted) or is refused;
//   3. only when the server CONFIRMS step 2: this device's sync record (which
//      cloud rows it last agreed on) is cleared with unlinkDevice(), so a later
//      re-enable starts fresh instead of reading the deleted copy as
//      "cloud-incomplete". Study progress in this browser is never touched.
// The page never says the copy is deleted unless step 2 confirmed it.
// ─────────────────────────────────────────────────────────────────
import { unlinkDevice } from "@/lib/sync/engine";
import type { Storage } from "@/lib/sync/adapters";

/** The six cloud-copy tables, exactly as withdraw_cloud_copies() reports them. */
export const CLOUD_COPY_TABLES = ["bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks"] as const;

type RpcResult = { data: unknown; error: unknown };
/** The one client capability this needs: calling a database function (supabase.rpc). */
export type WithdrawalClient = { rpc(fn: "begin_cloud_withdrawal" | "withdraw_cloud_copies"): PromiseLike<RpcResult> };

export type WithdrawalResult =
  /** The server confirmed the cloud copy is deleted (counts per table). */
  | { status: "deleted"; deleted: Record<(typeof CLOUD_COPY_TABLES)[number], number>; recorded: boolean }
  /** Uploads are confirmed off, but the cloud copy was NOT confirmed deleted. */
  | { status: "uploads-off-not-deleted" }
  /** Neither step was confirmed (e.g. offline). */
  | { status: "not-confirmed" };

async function call(client: WithdrawalClient, fn: "begin_cloud_withdrawal" | "withdraw_cloud_copies"): Promise<RpcResult> {
  try {
    return await client.rpc(fn);
  } catch (error) {
    return { data: null, error };
  }
}

/** The server's confirmation, or null if the answer isn't exactly the documented shape. */
export function confirmedDeletion(data: unknown): Extract<WithdrawalResult, { status: "deleted" }> | null {
  if (!data || typeof data !== "object") return null;
  const d = data as { withdrawn?: unknown; withdrawal_recorded?: unknown; deleted?: unknown };
  if (d.withdrawn !== true || typeof d.withdrawal_recorded !== "boolean" || !d.deleted || typeof d.deleted !== "object") return null;
  const counts = d.deleted as Record<string, unknown>;
  if (!CLOUD_COPY_TABLES.every((t) => Number.isInteger(counts[t]) && (counts[t] as number) >= 0)) return null;
  const deleted = Object.fromEntries(CLOUD_COPY_TABLES.map((t) => [t, counts[t] as number])) as Record<(typeof CLOUD_COPY_TABLES)[number], number>;
  return { status: "deleted", deleted, recorded: d.withdrawal_recorded };
}

/**
 * Withdraws: begin_cloud_withdrawal() FIRST (uploads off, marker set), then `record` (the app's own
 * consent rows, including the withdrawal; it runs whatever step 1 returned, and its failure doesn't stop
 * the deletion, because withdraw_cloud_copies() records the withdrawal itself), then the deletion.
 * The retry ("Delete my cloud copy") calls this without `record`.
 */
export async function withdrawCloudCopy(
  client: WithdrawalClient,
  storage: Storage & { removeItem?(key: string): void },
  record?: () => PromiseLike<{ error: unknown }>,
): Promise<WithdrawalResult & { recordError: unknown }> {
  const off = await call(client, "begin_cloud_withdrawal");
  let recordError: unknown = null;
  if (record) {
    try {
      recordError = (await record()).error ?? null;
    } catch (e) {
      recordError = e;
    }
  }
  const del = await call(client, "withdraw_cloud_copies");
  const confirmed = del.error ? null : confirmedDeletion(del.data);
  if (confirmed) {
    unlinkDevice(storage); // only the sync record; progress stays in this browser
    return { ...confirmed, recordError };
  }
  return { status: off.error ? "not-confirmed" : "uploads-off-not-deleted", recordError };
}

/**
 * The outcome the account page distinguishes (owner review, task 4):
 *  - "completed": the server confirmed the deletion, and the consent history shows the withdrawal;
 *  - "completed-history-not-recorded": deletion confirmed, but the withdrawal isn't in the history;
 *  - "deletion-failed-retry": the deletion wasn't confirmed; the student should try again.
 */
export type WithdrawalOutcome = "completed" | "completed-history-not-recorded" | "deletion-failed-retry";
export function withdrawalOutcome(r: WithdrawalResult): WithdrawalOutcome {
  if (r.status !== "deleted") return "deletion-failed-retry";
  return r.recorded ? "completed" : "completed-history-not-recorded";
}

/** What the account page tells the student. Deletion is claimed only when the server confirmed it. */
export function withdrawalNotice(r: WithdrawalResult): string {
  switch (r.status) {
    case "deleted": {
      const n = CLOUD_COPY_TABLES.reduce((s, t) => s + r.deleted[t], 0);
      const base = `Cloud copies are off, and the copy stored with your account is deleted (${n} ${n === 1 ? "record" : "records"}). Your progress in this browser hasn't changed.`;
      return r.recorded
        ? base
        : `${base} We couldn't add this withdrawal to your consent history, so please contact us. Cloud copies stay off for this account until a new consent is recorded.`;
    }
    case "uploads-off-not-deleted":
      return "Cloud copies are off, so nothing more is uploaded, but we couldn't delete the copy stored with your account yet. Nothing in this browser was changed. Use “Delete my cloud copy” to try again.";
    case "not-confirmed":
      return "We couldn't confirm that cloud copies are off, and we couldn't delete the copy stored with your account. Nothing in this browser was changed. Use “Delete my cloud copy” to try again.";
  }
}

/** Shown when cloud copies can't be turned back on until the student records a fresh cloud-copy consent. */
export const FRESH_CONSENT_NOTICE =
  "Cloud copies stay off because you withdrew your consent. To turn them on again, tick the cloud-copy consent above and save your choices first.";

/** The database refused to turn sync back on because the cloud copy was withdrawn (migration 20261127000000). */
export function isWithdrawnError(error: unknown): boolean {
  const e = error as { code?: unknown; message?: unknown } | null;
  return !!e && e.code === "42501" && typeof e.message === "string" && e.message.startsWith("cloud-copy-withdrawn");
}

/**
 * The "fresh consent required" state for an enable_sync() call, or null when it doesn't apply.
 * `cloudConsent` is the student's latest cloud-copy decision as the page loaded it (false = withdrawn).
 */
export function reactivationNotice(res: { data: unknown; error: unknown }, cloudConsent: boolean | null): string | null {
  if (res.error) return isWithdrawnError(res.error) ? FRESH_CONSENT_NOTICE : null;
  return res.data === "consent-required" && cloudConsent === false ? FRESH_CONSENT_NOTICE : null;
}

/** A consent change refused by the history cap's allowance (SQLSTATE 54000). Owner-approved wording, 2026-11-28. */
export const CONSENT_LIMIT_NOTICE =
  "You've changed your cloud-copy choices many times in the last 24 hours, so we can't record another consent yet. Please try again later. Turning consent off is always recorded.";
export function isConsentLimitError(error: unknown): boolean {
  return !!error && (error as { code?: unknown }).code === "54000";
}
