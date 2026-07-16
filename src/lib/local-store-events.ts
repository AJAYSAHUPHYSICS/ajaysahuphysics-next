// ─────────────────────────────────────────────────────────────────
// Tiny pub-sub used by every localStorage-backed module in Project
// ATLAS (bookmarks, checklist, revision, study-streak) so that
// useSyncExternalStore-based components re-render immediately after
// a write — without it, a bookmark toggle wouldn't visually update
// until the next full remount, since localStorage has no native
// same-tab change event.
// ─────────────────────────────────────────────────────────────────

export type Listener = () => void;

export function createNotifier() {
  const listeners = new Set<Listener>();
  return {
    subscribe(listener: Listener): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    notify(): void {
      listeners.forEach((l) => l());
    },
  };
}
