// ─────────────────────────────────────────────────────────────────
// Sync engine: one sync pass between this device and the student's cloud copy.
//
// Order (crash-safe):
//   1. refuse unless sync is enabled in code AND (checked by the caller via
//      the database) for this student;
//   2. refuse if this device is linked to a different account, or has
//      progress and hasn't been linked yet (asks the student first);
//   3. pull every synced table; compute every merge in memory;
//   4. push upserts and tombstones;
//   5. only then write each changed local store, skipping a store the
//      student changed during the sync (it's merged next time), and save
//      the new base fingerprints.
// A failure at 3–4 leaves the device untouched; the next run converges
// because uploads are idempotent (same keys, same values).
// ─────────────────────────────────────────────────────────────────
import { ADAPTERS, type Adapter, type Row, type Storage } from "./adapters";
import { threeWayMerge } from "./merge";
import { CLOUD_SYNC_ENABLED, SYNC_META_KEY } from "./policy";

export interface RemoteStore {
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
  /** Per store: record key → fingerprint both sides agreed on. */
  base: Record<string, Record<string, string>>;
};

export type SyncResult =
  | { status: "disabled" }
  | { status: "needs-link-confirmation"; localRecords: number }
  | { status: "linked-to-another-account" }
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
  if (!meta && !opts.confirmLink) {
    const n = countLocal(storage);
    if (n > 0) return { status: "needs-link-confirmation", localRecords: n };
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
    const rawBefore = storage.getItem(a.key);
    const outcome = threeWayMerge({
      base: new Map(Object.entries(meta?.base?.[a.key] ?? {})),
      local: a.read(rawBefore),
      remote: remoteMap,
      remoteDeleted,
      combine: a.combine,
    });
    plans.push({ adapter: a, rawBefore, outcome, remoteRows });
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
  const base: SyncMeta["base"] = { ...(meta?.base ?? {}) };
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

  const nextMeta: SyncMeta = { version: 1, accountId: userId, lastSyncedAt: (opts.now ?? Date.now)(), base };
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
