"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase-client";
import AuthModal from "./AuthModal";

export default function AuthButton({ className = "" }: { className?: string }) {
  const [session, setSession] = useState<Session | null>(null);
  // If there's no client at all, there's nothing to check — start already
  // "checked" rather than setting state synchronously inside an effect.
  const [checked, setChecked] = useState(() => !supabase);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Avoids a flash of "Login" before the session check resolves on mount.
  if (!checked) return null;

  if (session) {
    return (
      <button
        type="button"
        onClick={() => supabase?.auth.signOut()}
        title={session.user.email ?? undefined}
        className={`text-xs font-semibold text-navy/70 hover:text-navy transition-colors px-2.5 py-1.5 rounded-md border border-navy/15 hover:border-gold ${className}`}
      >
        Log out
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`text-xs font-semibold text-white bg-navy hover:bg-navy-light transition-colors px-3 py-1.5 rounded-md focus-visible:outline-2 focus-visible:outline-gold ${className}`}
      >
        Login / Sign Up
      </button>
      {modalOpen ? <AuthModal onClose={() => setModalOpen(false)} /> : null}
    </>
  );
}
