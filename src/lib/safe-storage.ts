// ─────────────────────────────────────────────────────────────────
// Safe localStorage reads
//
// localStorage can throw on READ, not only on write: some browsers and
// in-app browsers throw a SecurityError from window.localStorage itself
// or from getItem() when site data is blocked or storage is disabled.
// The stores' snapshot getters run during render (useSyncExternalStore),
// so an unguarded read there crashes the page.
//
// safeGetItem() treats "storage unavailable" exactly like "nothing
// stored" by returning null. Every caller already handles null as the
// empty state, and null matches the initial value of each store's raw
// cache, so snapshot references stay stable (no re-render loop).
//
// Writes need no helper: every existing setItem call is already inside
// a try/catch.
// ─────────────────────────────────────────────────────────────────

/** window.localStorage.getItem(key), or null if storage is unavailable or throws. */
export function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
