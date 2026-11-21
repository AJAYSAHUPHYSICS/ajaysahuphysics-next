"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AUTH_CONFIGURED, SUPABASE_READY_EVENT, hasStoredSession, isClientLoaded, loadSupabase, sessionStorageKey } from "@/lib/supabase-loader";

export type SessionState = { status: "loading" } | { status: "unavailable" } | { status: "signed-out" } | { status: "signed-in"; session: Session };

/**
 * Current auth session, kept up to date. "unavailable" when auth isn't
 * configured in this build.
 *
 * Performance: the Supabase client (~60 KB gzipped) is loaded only when this
 * device has a saved session to restore, or once something else loads it
 * (the login dialog, the account page, another tab signing in). A signed-out
 * visitor never downloads it just to see the navbar.
 */
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>(() => (AUTH_CONFIGURED ? { status: "loading" } : { status: "unavailable" }));
  useEffect(() => {
    if (!AUTH_CONFIGURED) return;
    let active = true;
    let unsubscribe: (() => void) | null = null;

    const attach = () => {
      if (unsubscribe) return;
      unsubscribe = () => undefined; // claim it, so concurrent triggers attach once
      loadSupabase().then(
        (sb) => {
          if (!active || !sb) return;
          sb.auth.getSession().then(({ data }) => {
            if (active) setState(data.session ? { status: "signed-in", session: data.session } : { status: "signed-out" });
          });
          const { data: listener } = sb.auth.onAuthStateChange((_event, session) => {
            if (active) setState(session ? { status: "signed-in", session } : { status: "signed-out" });
          });
          unsubscribe = () => listener.subscription.unsubscribe();
        },
        () => {
          unsubscribe = null;
          if (active) setState({ status: "signed-out" });
        },
      );
    };

    if (isClientLoaded() || hasStoredSession(typeof window !== "undefined" ? window.localStorage : null)) attach();
    // No saved session: signed out, without loading the client (async, so no render cascade).
    else Promise.resolve().then(() => active && setState((s) => (s.status === "loading" ? { status: "signed-out" } : s)));

    const onReady = () => attach();
    const key = sessionStorageKey();
    const onStorage = (e: StorageEvent) => {
      if (key && e.key === key) attach();
    };
    window.addEventListener(SUPABASE_READY_EVENT, onReady);
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      unsubscribe?.();
      window.removeEventListener(SUPABASE_READY_EVENT, onReady);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return state;
}
