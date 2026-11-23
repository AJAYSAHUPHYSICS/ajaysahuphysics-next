// ─────────────────────────────────────────────────────────────────
// Lazy access to the Supabase client.
//
// The client (supabase-js: auth, realtime, storage, functions) is ~60 KB
// gzipped. Accounts are optional and most visitors are signed out, so
// site-wide components (the navbar's AuthButton) must NOT import it
// statically. They use this module instead:
//   - AUTH_CONFIGURED: whether this build has Supabase settings at all;
//   - hasStoredSession(): is there a saved session on this device? (the
//     key supabase-js itself uses: sb-<project ref>-auth-token);
//   - loadSupabase(): imports the client on demand (one shared instance).
// Pages that always need the client (account, auth callback, reset) may
// import "@/lib/supabase-client" directly.
// ─────────────────────────────────────────────────────────────────
import type { SupabaseClient } from "@supabase/supabase-js";

/** Fired on window once the client module has been evaluated (e.g. when the login dialog opens). */
export const SUPABASE_READY_EVENT = "atlas-supabase-ready"; // an event name, not a storage key

export const AUTH_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/** The localStorage key supabase-js uses for the session ("sb-<first label of the project host>-auth-token"). */
export function sessionStorageKey(url: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL): string | null {
  try {
    return url ? `sb-${new URL(url).hostname.split(".")[0]}-auth-token` : null;
  } catch {
    return null;
  }
}

/** True when this device has a saved session to restore. Never throws (storage can be blocked). */
export function hasStoredSession(storage: Pick<Storage, "getItem"> | null | undefined, url?: string): boolean {
  const key = sessionStorageKey(url);
  if (!key || !storage) return false;
  try {
    return storage.getItem(key) !== null;
  } catch {
    return false;
  }
}

// The client module imports this module first, so this listener is always
// registered before the client announces itself.
let clientLoaded = false;
if (typeof window !== "undefined") window.addEventListener(SUPABASE_READY_EVENT, () => (clientLoaded = true), { once: true });

/** True once the client module has been evaluated on this page (e.g. the account page imports it directly). */
export const isClientLoaded = () => clientLoaded;

let loading: Promise<SupabaseClient | null> | null = null;

/** The shared client, imported on first use. Resolves to null when auth isn't configured in this build. */
export function loadSupabase(): Promise<SupabaseClient | null> {
  if (!AUTH_CONFIGURED) return Promise.resolve(null);
  loading ??= import("./supabase-client").then((m) => m.supabase);
  return loading;
}
