// ─────────────────────────────────────────────────────────────────
// Cloud sync policy (Phase 2B)
//
// CLOUD_SYNC_ENABLED is the code-side launch switch. It stays false until
// the owner authorises launch after legal review
// (docs/phase-2/LEGAL_REVIEW_CHECKLIST.md). While it's false:
//   - the sync engine refuses to run, so no network request carries study
//     data and the sync-meta key is never written;
//   - the account page explains that cloud copies aren't available yet.
// Even when true, the database decides per student (enable_sync(),
// consent records, the owner launch switch; no age rule). The browser
// can't bypass that.
// ─────────────────────────────────────────────────────────────────

export const CLOUD_SYNC_ENABLED = false as const;

/** Local stores that are copied to the cloud when sync is enabled. */
export const SYNCED_KEYS = [
  "atlas:bookmarks",
  "atlas:checklist",
  "atlas:revision",
  "atlas:mistakes",
  "atlas:goals",
  "atlas:study-streak",
] as const;

/**
 * Never leave the device (data minimisation; behavioural data about
 * possibly under-18 students). Tested: no sync code reads these keys.
 */
export const LOCAL_ONLY_KEYS = [
  "atlas:activity-log",
  "atlas:recent-searches",
  "atlas:reading-progress",
  "atlas:recently-viewed",
  "atlas:recently-viewed-resources",
] as const;

/** The one key the sync engine adds, written only when a sync actually runs. */
export const SYNC_META_KEY = "atlas:sync-meta";
