// ─────────────────────────────────────────────────────────────────
// Sync engine: one sync pass between this device and the student's cloud copy.
//
// Order (crash-safe):
//   1. refuse unless sync is enabled in code;
//   2. refuse if this device is linked to a different account;
//   3. refuse unless the database explicitly answers `true` to "may this
//      student sync?" (remote.syncAllowed()). An error, false or any other
//      value means no: nothing is read or written;
//   4. refuse if this device has progress and hasn't been linked yet (asks
//      the student first);
//   5. pull every synced table. If a record this device and the cloud last
//      agreed on is MISSING from the pull (neither a row nor a tombstone),
//      the cloud copy is unreadable or incomplete (for example, Row Level
//      Security now hides it, or a response was truncated), not deleted:
//      stop, and change nothing. Only a tombstone can delete local data;
//   6. compute every merge in memory;
//   7. push upserts and tombstones;
//   8. only then write each changed local store, skipping a store the
//      student changed during the sync (it's merged next time), and save
//      the new base fingerprints.
// A failure or refusal at 3–7 leaves the device untouched; the next run converges
// because uploads are idempotent (same keys, same values).
//
// Cloud generation (owner review B1): the database deletes a cloud copy
// outright (no tombstones) when the student withdraws cloud-copy consent, and
// when an account is purged. A device whose merge base predates that would
// read every missing record as "deleted in the cloud" and delete its own
// copy. So the base is tied to profiles.cloud_generation, a random id the
// database replaces on every such deletion. If it differs from the one the
// base was saved with, the base is discarded and the pass is a first sync:
// it asks before linking again, then combines and never deletes local data.
// The generation is read again after the pull; if it changed meanwhile the
// pass stops and writes nothing.
// ─────────────────────────────────────────────────────────────────
import { ADAPTERS, type Adapter, type Row, type Storage } from "./adapters";
import { threeWayMerge } from "./merge";
import { CLOUD_SYNC_ENABLED, SYNC_META_KEY } from "./policy";

export interface RemoteStore {
  /**
   * Whether the database allows this student to sync now (public.sync_allowed()).
   * Must resolve to exactly `true` to proceed; anything else, or a rejection, refuses the sync.
   */
  syncAllowed(): Promise<boolean>;
  /** profiles.cloud_generation for the signed-in student; null when there is no profile. */
  cloudGeneration(): Promise<string | null>;
  /** All rows the signed-in student owns in a table (RLS-limited), tombstones included. */
  pull(table: string): Promise<Row[]>;
  /** Idempotent upsert of the student's rows (including tombstones). */
  push(table: string, rows: Row[]): Promise<void>;
}

export type SyncMeta = {
  version: 1;
  /** Account this device's progress is linked to. */
  accountId: string;
  lastSyncedAt: number | null;
  /** The cloud generation the base below belongs to (absent in metas written before it existed: treated as different). */
  cloudGeneration?: string;
  /** Per store: record key → fingerprint both sides agreed on. */
  base: Record<string, Record<string, string>>;
};

export type SyncResult =
  | { status: "disabled" }
  /** reason "cloud-copy-replaced": the cloud copy was deleted since this device last synced (e.g. consent withdrawn). */
  | { status: "needs-link-confirmation"; localRecords: number; reason: "first-sync" | "cloud-copy-replaced" }
  | { status: "linked-to-another-account" }
  /** The database didn't explicitly allow sync (e.g. an unverified email address). Nothing read or written. */
  | { status: "not-allowed" }
  /** Records previously synced are missing from the cloud's answer: unreadable or incomplete, never treated as deletions. Nothing written. */
  | { status: "cloud-incomplete"; table: string; missing: number }
  | { status: "error"; stage: "pull" | "push"; message: string }
  | { status: "ok"; pushed: number; deletedRemote: number; changedLocal: number; conflicts: number; skippedStores: string[] };

export function readMeta(storage: Storage): SyncMeta | null {
  try {
    const v = JSON.parse(storage.getItem(SYNC_META_KEY) ?? "null");
    return v && v.version === 1 && typeof v.accountId === "string" ? (v as SyncMeta) : null;
  } catch {
    return null;
  }
}

function countLocal(storage: Storage): number {
  return ADAPTERS.reduce((n, a) => n + (a as Adapter<unknown>).read(storage.getItem(a.key)).size, 0);
}

export async function syncOnce(opts: {
  remote: RemoteStore;
  userId: string;
  storage: Storage;
  /** The student explicitly agreed to link this device's progress to this account. */
  confirmLink?: boolean;
  /** Test hook; production uses the policy constant. */
  enabled?: boolean;
  now?: () => number;
}): Promise<SyncResult> {
  const { remote, userId, storage } = opts;
  const enabled = opts.enabled ?? CLOUD_SYNC_ENABLED;
  if (!enabled) return { status: "disabled" };

  const meta = readMeta(storage);
  if (meta && meta.accountId !== userId) return { status: "linked-to-another-account" };
  // Only an explicit `true` from the database lets the sync proceed: a successful call is not enough.
  let allowed: unknown = false;
  try {
    allowed = await remote.syncAllowed();
  } catch {
    allowed = false;
  }
  if (allowed !== true) return { status: "not-allowed" };
  const readGeneration = async () => {
    const g = await remote.cloudGeneration();
    if (typeof g !== "string" || g.length === 0) throw new Error("no cloud generation (no profile)");
    return g;
  };
  let generation: string;
  try {
    generation = await readGeneration();
  } catch (e) {
    return { status: "error", stage: "pull", message: (e as Error).message };
  }
  // The base counts only for the generation it was saved with; otherwise this is a first sync.
  const replaced = meta !== null && meta.cloudGeneration !== generation;
  const agreedBase: SyncMeta["base"] = replaced ? {} : (meta?.base ?? {});
  if ((!meta || replaced) && !opts.confirmLink) {
    const n = countLocal(storage);
    if (n > 0) return { status: "needs-link-confirmation", localRecords: n, reason: replaced ? "cloud-copy-replaced" : "first-sync" };
  }

  type Plan = { adapter: Adapter<unknown>; rawBefore: string | null; outcome: ReturnType<typeof threeWayMerge<unknown>>; remoteRows: Map<string, Row> };
  const plans: Plan[] = [];
  for (const a of ADAPTERS as readonly Adapter<unknown>[]) {
    let rows: Row[];
    try {
      rows = await remote.pull(a.table);
    } catch (e) {
      return { status: "error", stage: "pull", message: (e as Error).message };
    }
    const remoteMap = new Map<string, unknown>();
    const remoteDeleted = new Set<string>();
    const remoteRows = new Map<string, Row>();
    for (const r of rows) {
      const k = a.rowKey(r);
      remoteRows.set(k, r);
      const rec = a.fromRow(r);
      if (rec === null) remoteDeleted.add(k);
      else remoteMap.set(k, rec);
    }
    // A record both sides last agreed on always comes back, live or as a tombstone (the only server-side hard
    // delete is the account-deletion purge). If it's absent, the cloud copy is hidden or incomplete: stop before
    // the merge could read the absence as a deletion, and before anything is written anywhere.
    const agreed = Object.keys(agreedBase[a.key] ?? {}); // the generation-checked base (B1)
    const missing = agreed.filter((k) => !remoteRows.has(k)).length;
    if (missing > 0) return { status: "cloud-incomplete", table: a.table, missing };
    const rawBefore = storage.getItem(a.key);
    const outcome = threeWayMerge({
      base: new Map(Object.entries(agreedBase[a.key] ?? {})),
      local: a.read(rawBefore),
      remote: remoteMap,
      remoteDeleted,
      combine: a.combine,
    });
    plans.push({ adapter: a, rawBefore, outcome, remoteRows });
  }

  // The cloud copy must still be the one the merges were computed against.
  try {
    if ((await readGeneration()) !== generation) return { status: "error", stage: "pull", message: "the cloud copy changed during this sync" };
  } catch (e) {
    return { status: "error", stage: "pull", message: (e as Error).message };
  }

  let pushed = 0;
  let deletedRemote = 0;
  for (const p of plans) {
    const rows = [...p.outcome.push.values()].map((r) => p.adapter.toRow(r));
    const local = p.adapter.read(p.rawBefore);
    const tombstones = [...p.outcome.deleteRemote].map((k) => {
      const known = local.get(k) ?? p.adapter.fromRow({ ...p.remoteRows.get(k), deleted_at: null });
      return known ? p.adapter.tombstone(known) : null;
    }).filter((r): r is Row => r !== null);
    const all = [...rows, ...tombstones];
    if (all.length === 0) continue;
    try {
      await remote.push(p.adapter.table, all);
    } catch (e) {
      return { status: "error", stage: "push", message: (e as Error).message };
    }
    pushed += rows.length;
    deletedRemote += tombstones.length;
  }

  const skippedStores: string[] = [];
  const base: SyncMeta["base"] = { ...agreedBase };
  let changedLocal = 0;
  for (const p of plans) {
    const current = storage.getItem(p.adapter.key);
    if (current !== p.rawBefore) {
      // The student changed this store while we were syncing: don't overwrite;
      // keep the old base so the next pass merges their change properly.
      skippedStores.push(p.adapter.key);
      continue;
    }
    if (p.outcome.changedLocal.size > 0) {
      storage.setItem(p.adapter.key, p.adapter.write(p.outcome.merged, p.rawBefore));
      changedLocal += p.outcome.changedLocal.size;
    }
    base[p.adapter.key] = Object.fromEntries(p.outcome.nextBase);
  }

  const nextMeta: SyncMeta = { version: 1, accountId: userId, lastSyncedAt: (opts.now ?? Date.now)(), cloudGeneration: generation, base };
  storage.setItem(SYNC_META_KEY, JSON.stringify(nextMeta));
  return { status: "ok", pushed, deletedRemote, changedLocal, conflicts: plans.reduce((n, p) => n + p.outcome.conflicts.length, 0), skippedStores };
}

/**
 * Unlinks this device from its account (e.g. "use this device with another
 * account"). Progress stays on the device; only the link and merge base go.
 */
export function unlinkDevice(storage: Storage & { removeItem?(key: string): void }): void {
  if (storage.removeItem) storage.removeItem(SYNC_META_KEY);
  else storage.setItem(SYNC_META_KEY, "null");
}
