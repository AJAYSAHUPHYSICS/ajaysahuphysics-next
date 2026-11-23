// ─────────────────────────────────────────────────────────────────
// CAPTCHA for sign-up, log-in and password-reset requests
// (Cloudflare Turnstile, which Supabase Auth supports natively).
//
// OFF unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set at build time. With
// no key, no script is loaded, no widget is shown and the auth calls
// are unchanged. Turning it on needs three things, all by the owner:
//   1. a Turnstile site key + secret (Cloudflare dashboard);
//   2. Supabase → Authentication → Bot protection: Turnstile + secret;
//   3. NEXT_PUBLIC_TURNSTILE_SITE_KEY in the build (the CSP step then
//      allows https://challenges.cloudflare.com; scripts/inject-csp.mjs).
// Enabling 2 without 3 blocks every sign-in, so do 3 first.
// The site key is public by design; the secret never enters this repo.
// ─────────────────────────────────────────────────────────────────

export const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";
export const TURNSTILE_SCRIPT_URL = `${TURNSTILE_ORIGIN}/turnstile/v0/api.js?render=explicit`;

/** Site keys are short public identifiers; anything else is treated as "not configured". */
export function captchaSiteKey(raw: string | undefined): string | null {
  const key = (raw ?? "").trim();
  return /^[0-9A-Za-z_-]{10,100}$/.test(key) ? key : null;
}

export const CAPTCHA_SITE_KEY = captchaSiteKey(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

/** Extra auth options: a token only when CAPTCHA is on and one was obtained. */
export const captchaOptions = (token: string | null): { captchaToken?: string } => (token ? { captchaToken: token } : {});

export const CAPTCHA_MESSAGE = "Please complete the quick check above, then try again.";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loading: Promise<Turnstile> | null = null;

/** Loads the Turnstile script once (from a fixed URL allowed by the CSP). */
export function loadTurnstile(): Promise<Turnstile> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loading) {
    loading = new Promise<Turnstile>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = TURNSTILE_SCRIPT_URL;
      s.async = true;
      s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile missing")));
      s.onerror = () => {
        loading = null; // allow a retry on the next open
        reject(new Error("turnstile failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return loading;
}
