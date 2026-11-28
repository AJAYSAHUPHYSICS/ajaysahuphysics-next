// ─────────────────────────────────────────────────────────────────
// Frame protection for account surfaces (audit F8, interim).
//
// GitHub Pages can't send Content-Security-Policy frame-ancestors or
// X-Frame-Options, and a <meta> CSP ignores frame-ancestors. So another
// site could load our pages in an invisible frame and trick a student into
// clicking a real button (clickjacking). Until the site moves to a host that
// sends those headers, the pages with account actions (sign-in, password
// reset, the account page with export and deletion) refuse to show their
// controls when they aren't the top-level page.
//
// This is a mitigation, not a header: it needs JavaScript, and it protects
// only the components that use it. Read-only pages aren't affected.
// ─────────────────────────────────────────────────────────────────

/** True when this window is shown inside a frame. Fails closed: if the check itself throws, treat it as framed. */
export function isFramed(win: { self: unknown; top: unknown } | undefined = typeof window === "undefined" ? undefined : window): boolean {
  if (!win) return false; // server render: nothing is shown in a frame yet
  try {
    return win.self !== win.top;
  } catch {
    return true;
  }
}

export const FRAMED_NOTICE = "For your security, account actions are only available when this page is opened directly, not inside another site.";
