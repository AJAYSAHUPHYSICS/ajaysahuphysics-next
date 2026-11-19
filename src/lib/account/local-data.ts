// Everything AjaySahuPhysics keeps in this browser, for "Download this
// device's data" and "Remove this device's progress". Reads and removes only
// the site's own keys; never touches other sites' or Supabase's session keys.
import { LOCAL_ONLY_KEYS, SYNCED_KEYS, SYNC_META_KEY } from "@/lib/sync/policy";

export const DEVICE_KEYS = [...SYNCED_KEYS, ...LOCAL_ONLY_KEYS, SYNC_META_KEY] as const;

type ReadStorage = { getItem(key: string): string | null };
type WriteStorage = ReadStorage & { removeItem(key: string): void };

export function exportDeviceData(storage: ReadStorage, now = new Date()): { exportedAt: string; site: string; data: Record<string, unknown> } {
  const data: Record<string, unknown> = {};
  for (const k of DEVICE_KEYS) {
    const raw = storage.getItem(k);
    if (raw === null) continue;
    try {
      data[k] = JSON.parse(raw);
    } catch {
      data[k] = raw; // exported as stored, even if malformed
    }
  }
  return { exportedAt: now.toISOString(), site: "ajaysahuphysics.com", data };
}

/** Student-initiated only (after confirmation). Returns the keys removed. */
export function removeDeviceData(storage: WriteStorage): string[] {
  const removed: string[] = [];
  for (const k of DEVICE_KEYS) {
    if (storage.getItem(k) !== null) {
      storage.removeItem(k);
      removed.push(k);
    }
  }
  return removed;
}

export function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
