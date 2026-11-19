// ─────────────────────────────────────────────────────────────────
// Three-way merge for synced study records (pure, deterministic).
//
// For every record key we know three versions:
//   base   – what this device and the cloud last agreed on (a fingerprint
//            kept in sync-meta; absent before the first sync);
//   local  – what this device has now (absent = deleted or never existed);
//   remote – what the cloud has now (absent, or a tombstone = deleted).
//
// Rules (never silently lose useful data):
//   changed only locally          → push local
//   changed only remotely         → take remote
//   unchanged on both             → nothing
//   changed on both, same value   → nothing
//   changed on both, different    → store-specific combine()
//   deleted on one side, edited on the other → keep the edited version
//   first sync (no base)          → combine(local, remote) when both exist
// ─────────────────────────────────────────────────────────────────

/** Order-independent, stable JSON (keys sorted) used for fingerprints and equality. */
export function stableStringify(v: unknown): string {
  if (v === null || typeof v !== "object") return JSON.stringify(v) ?? "null";
  if (Array.isArray(v)) return `[${v.map(stableStringify).join(",")}]`;
  const o = v as Record<string, unknown>;
  return `{${Object.keys(o)
    .filter((k) => o[k] !== undefined)
    .sort()
    .map((k) => `${JSON.stringify(k)}:${stableStringify(o[k])}`)
    .join(",")}}`;
}

/** 53-bit FNV-1a style fingerprint (not security-sensitive; only change detection). */
export function fingerprint(v: unknown): string {
  const s = stableStringify(v);
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ c, 0x5bd1e995) >>> 0;
  }
  return `${h1.toString(36)}.${h2.toString(36)}.${s.length.toString(36)}`;
}

export type MergeOutcome<T> = {
  /** The merged value per key (absent = deleted). Write this to the device. */
  merged: Map<string, T>;
  /** Records to upsert to the cloud. */
  push: Map<string, T>;
  /** Keys to tombstone in the cloud. */
  deleteRemote: Set<string>;
  /** Keys whose local value changed (so the device copy must be rewritten). */
  changedLocal: Set<string>;
  /** Fingerprints to store as the new base after a successful push. */
  nextBase: Map<string, string>;
  /** Keys resolved by combine() because both sides changed. */
  conflicts: string[];
};

export function threeWayMerge<T>(opts: {
  base: Map<string, string>;
  local: Map<string, T>;
  remote: Map<string, T>;
  remoteDeleted: Set<string>;
  combine: (local: T, remote: T) => T;
}): MergeOutcome<T> {
  const { base, local, remote, remoteDeleted, combine } = opts;
  const out: MergeOutcome<T> = { merged: new Map(), push: new Map(), deleteRemote: new Set(), changedLocal: new Set(), nextBase: new Map(), conflicts: [] };
  const keys = new Set([...base.keys(), ...local.keys(), ...remote.keys(), ...remoteDeleted]);
  for (const k of [...keys].sort()) {
    const b = base.get(k);
    const l = local.get(k);
    const r = remoteDeleted.has(k) ? undefined : remote.get(k);
    const lf = l === undefined ? undefined : fingerprint(l);
    const rf = r === undefined ? undefined : fingerprint(r);
    const localChanged = b === undefined ? l !== undefined : lf !== b;
    const remoteChanged = b === undefined ? r !== undefined : rf !== b;

    let result: T | undefined;
    if (!localChanged && !remoteChanged) result = l;
    else if (localChanged && !remoteChanged) result = l;
    else if (!localChanged && remoteChanged) result = r;
    else if (lf === rf) result = l;
    else if (l !== undefined && r !== undefined) {
      result = combine(l, r);
      out.conflicts.push(k);
    } else result = l ?? r; // deleted on one side, edited on the other: keep the edit

    const resF = result === undefined ? undefined : fingerprint(result);
    if (result !== undefined) out.merged.set(k, result);
    if (resF !== lf) out.changedLocal.add(k);
    if (result === undefined) {
      if (r !== undefined) out.deleteRemote.add(k);
    } else {
      if (resF !== rf) out.push.set(k, result);
      out.nextBase.set(k, resF!);
    }
  }
  return out;
}
