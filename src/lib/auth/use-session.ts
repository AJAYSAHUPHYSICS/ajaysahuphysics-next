"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase-client";

export type SessionState = { status: "loading" } | { status: "unavailable" } | { status: "signed-out" } | { status: "signed-in"; session: Session };

/** Current auth session, kept up to date. "unavailable" when auth isn't configured in this build. */
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>(() => (supabase ? { status: "loading" } : { status: "unavailable" }));
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setState(data.session ? { status: "signed-in", session: data.session } : { status: "signed-out" });
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(session ? { status: "signed-in", session } : { status: "signed-out" });
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);
  return state;
}
