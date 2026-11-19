// ─────────────────────────────────────────────────────────────────
// Authentication policy helpers (pure; unit-tested).
//
// Messages never reveal whether an email address has an account: every
// sign-in failure gives the same text, and sign-up and password-reset
// requests always report success in the same words.
// ─────────────────────────────────────────────────────────────────

export const SITE_ORIGIN = "https://ajaysahuphysics.com";

/** Where Supabase sends students back after email links (must be on the project's redirect allow-list). */
export function authRedirect(path: "/auth/callback/" | "/auth/reset-password/", origin?: string): string {
  const base = origin && /^https?:\/\/(localhost(:\d+)?|ajaysahuphysics\.com)$/.test(origin) ? origin : SITE_ORIGIN;
  return `${base}${path}`;
}

export const MESSAGES = {
  signInFailed: "We couldn't sign you in with those details. Check your email and password, or reset your password.",
  signUpSent: "If this email can be used for a new account, we've sent a confirmation link to it. Open the link, then log in.",
  resetSent: "If an account uses this email, we've sent a password-reset link to it.",
  rateLimited: "Too many attempts. Please wait a few minutes and try again.",
  network: "We couldn't reach the sign-in service. Check your connection and try again.",
  unavailable: "Sign-in isn't available right now. Please try again later.",
  generic: "Something went wrong. Please try again.",
  captcha: "The security check didn't go through. Please complete it again and retry.",
} as const;

/**
 * Maps any auth error to a message that can't be used to probe which
 * emails are registered (e.g. "Invalid login credentials", "Email not
 * confirmed" and "User not found" all become the same text).
 */
type AuthErrorLike = { status?: number; message?: string; name?: string; code?: string } | null | undefined;

/** A rejected CAPTCHA token. Same answer for every email, so it reveals nothing about accounts. */
const isCaptchaError = (error: AuthErrorLike) => !!error && (error.code === "captcha_failed" || /captcha/i.test(error.message ?? ""));

export function signInErrorMessage(error: AuthErrorLike): string {
  if (!error) return MESSAGES.signInFailed;
  if (isCaptchaError(error)) return MESSAGES.captcha;
  if (error.status === 429 || /rate limit|too many/i.test(error.message ?? "")) return MESSAGES.rateLimited;
  if (error.name === "AuthRetryableFetchError" || /fetch|network/i.test(error.message ?? "")) return MESSAGES.network;
  return MESSAGES.signInFailed;
}

/** For sign-up and reset requests: only rate limits, network errors and CAPTCHA rejections are shown; everything else reads as success. */
export function requestOutcome(kind: "signup" | "reset", error: AuthErrorLike): { ok: boolean; message: string } {
  if (isCaptchaError(error)) return { ok: false, message: MESSAGES.captcha };
  if (error && (error.status === 429 || /rate limit|too many/i.test(error.message ?? ""))) return { ok: false, message: MESSAGES.rateLimited };
  if (error && (error.name === "AuthRetryableFetchError" || /fetch|network/i.test(error.message ?? ""))) return { ok: false, message: MESSAGES.network };
  return { ok: true, message: kind === "signup" ? MESSAGES.signUpSent : MESSAGES.resetSent };
}

const COMMON = new Set([
  "password", "password1", "password123", "12345678", "123456789", "1234567890", "qwerty123", "qwertyuiop", "11111111",
  "iloveyou", "abc12345", "admin123", "letmein1", "welcome1", "physics123", "neet2026", "jee2026", "ajaysahuphysics",
]);

/**
 * Password rules (current NIST SP 800-63B guidance): at least 10 characters,
 * at most 72 (the bcrypt limit Supabase uses), not a common or
 * site-specific password, not the email address. No arbitrary composition
 * rules. Returns the problems (empty = acceptable).
 */
export function passwordProblems(password: string, email = ""): string[] {
  const problems: string[] = [];
  if (password.length < 10) problems.push("Use at least 10 characters.");
  if (new TextEncoder().encode(password).length > 72) problems.push("That password is too long. Use a shorter one (the limit is 72 bytes, so fewer characters in non-English scripts).");
  const lower = password.toLowerCase();
  if (COMMON.has(lower) || /^(.)\1+$/.test(password) || /^(0123456789|1234567890|abcdefghij)/.test(lower)) problems.push("Choose a less common password.");
  const local = email.split("@")[0]?.toLowerCase() ?? "";
  if (local.length >= 4 && lower.includes(local)) problems.push("Don't use your email address in your password.");
  return problems;
}
