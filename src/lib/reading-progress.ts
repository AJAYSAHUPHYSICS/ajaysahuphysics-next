// ─────────────────────────────────────────────────────────────────
// Reading Progress (client-side only, localStorage)
//
// Tracks how far down a content page a visitor has scrolled, keyed by
// pathname, so they can pick up where they left off after a refresh
// or a later visit — no backend, no auth. Same guarded-localStorage
// pattern as recently-viewed.ts: every function checks `typeof window`
// so it's always safe to import, including during SSG.
// ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "atlas:reading-progress";
const MAX_ENTRIES = 40;

type ProgressEntry = { pct: number; updatedAt: number };
type ProgressMap = Record<string, ProgressEntry>;

function readAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as ProgressMap) : {};
  } catch {
    return {};
  }
}

/** Furthest scroll percentage (0-100) previously recorded for this path, or 0. */
export function getReadingProgress(path: string): number {
  return readAll()[path]?.pct ?? 0;
}

/** Records the furthest scroll percentage (0-100) reached on this path. */
export function setReadingProgress(path: string, pct: number): void {
  if (typeof window === "undefined") return;
  try {
    const all = readAll();
    // Only ever move forward — a reader jumping back up to re-read a
    // section shouldn't erase how far they'd actually gotten.
    const existing = all[path]?.pct ?? 0;
    if (pct <= existing) return;

    all[path] = { pct, updatedAt: Date.now() };

    const trimmed = Object.entries(all)
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(trimmed)));
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded edge cases —
    // reading progress is a nice-to-have, never worth breaking the page for.
  }
}

/** Clears the saved progress for a path — used once a reader dismisses/resumes. */
export function clearReadingProgress(path: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = readAll();
    delete all[path];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Same as above — never worth breaking the page for.
  }
}
