// ─────────────────────────────────────────────────────────────────
// Accounts UI switch (owner decision H1, 2026-11-22).
//
// ACCOUNTS_UI_ENABLED is the code-side switch for every public way to log
// in or create an account. It stays false until the Phase 2B release is
// approved (legal sign-off F12, privacy notice F13, production Auth
// settings F3). While it is false:
//   * signed-out visitors see no "Login / Sign Up" control anywhere: not
//     in the navbar (desktop or mobile menu), and not on any page;
//   * a visitor who is already signed in keeps a "Log out" control, so an
//     existing session can always be ended;
//   * the authentication code itself is kept, unchanged and tested.
//
// LIMITATION: this hides the UI only. It does NOT disable sign-ups in
// Supabase Auth. Anyone can still call the Auth API directly with the
// public (publishable) key that every page ships. Stopping that needs a
// project setting in the Supabase dashboard (Authentication → "Allow new
// users to sign up"), which is an owner decision and is not changed here.
//
// Changing this to true is a release step that needs the owner's approval.
// ─────────────────────────────────────────────────────────────────

export const ACCOUNTS_UI_ENABLED = false as const;

export type AccountControl = "signed-in" | "login" | "none";

/** What the navbar's account control shows: a signed-in control always; the login entry point only when the accounts UI is on. */
export function accountControl(signedIn: boolean, uiEnabled: boolean = ACCOUNTS_UI_ENABLED): AccountControl {
  if (signedIn) return "signed-in";
  return uiEnabled ? "login" : "none";
}
