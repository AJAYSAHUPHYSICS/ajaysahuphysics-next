// ─────────────────────────────────────────────────────────────────
// Whether the account page may offer account deletion (audits F4, F5).
//
// Two server answers decide it, and both must be a confirmed `true`:
//   cloudReady       the accounts database answered (sync_allowed RPC);
//   deletionEnabled  the server-side deletion gate is open
//                    (account_deletion_enabled RPC).
// `null` means the check hasn't finished. It is a disabled state, like
// `false`: the delete control is never usable before the environment is
// confirmed ready (F4). The real enforcement is on the server
// (request_account_deletion() and the delete-account function); this only
// keeps the page honest.
// ─────────────────────────────────────────────────────────────────

export type DeletionAvailability = "checking" | "available" | "not-set-up" | "not-available-yet";

export function deletionAvailability(cloudReady: boolean | null, deletionEnabled: boolean | null): DeletionAvailability {
  if (cloudReady === false) return "not-set-up";
  if (cloudReady !== true) return "checking";
  if (deletionEnabled === true) return "available";
  if (deletionEnabled === false) return "not-available-yet";
  return "checking";
}

/** The delete button is enabled only when deletion is available, DELETE is typed, and nothing is in progress. */
export function canSubmitDeletion(availability: DeletionAvailability, confirmText: string, busy: boolean): boolean {
  return availability === "available" && confirmText === "DELETE" && !busy;
}

export const DELETION_NOTE: Record<Exclude<DeletionAvailability, "available">, string> = {
  checking: "Checking whether account deletion is available…",
  "not-set-up": "Account deletion isn't set up on this site yet. To delete your account now, contact us from the Contact page.",
  "not-available-yet": "Account deletion from this page isn't available yet. To delete your account now, contact us from the Contact page.",
};

export const RATE_LIMITED_NOTE = "Too many attempts in a short time. Please wait a few minutes and try again, or contact us from the Contact page.";

/** True when the server's rate limit refused the call: the request RPC's error, or the function's HTTP 429. */
export function isRateLimitedError(error: { message?: string; context?: { status?: number } } | null | undefined): boolean {
  return !!error && (/rate-limited/.test(error.message ?? "") || error.context?.status === 429);
}

/** True when request_account_deletion() was refused because the gate is off. */
export function isDeletionDisabledError(error: { message?: string } | null | undefined): boolean {
  return !!error && /deletion-disabled/.test(error.message ?? "");
}
