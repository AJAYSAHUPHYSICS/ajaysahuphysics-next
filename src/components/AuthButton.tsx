"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "@/lib/auth/use-session";
import { loadSupabase } from "@/lib/supabase-loader";
import { accountControl } from "@/lib/auth/accounts-ui";

// The dialog (and the Supabase client it imports) loads only when opened,
// so signed-out visitors don't download either on every page.
const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });

/**
 * Navbar account control. Signing out never touches the progress saved on
 * this device (bookmarks, checklist, mistakes, revision, goals, streak).
 */
export default function AuthButton({ className = "" }: { className?: string }) {
  const state = useSession();
  const [modalOpen, setModalOpen] = useState(false);

  // Avoids a flash of "Login" before the session check resolves on mount.
  if (state.status === "loading") return null;

  // H1: while the accounts UI is off, signed-out visitors get no login or
  // sign-up control. A signed-in visitor still gets "Account" and "Log out".
  if (accountControl(state.status === "signed-in") === "none") return null;

  if (state.status === "signed-in") {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <Link
          href="/account"
          title={state.session.user.email ?? undefined}
          className="text-xs font-semibold text-navy/80 hover:text-navy transition-colors px-2.5 py-1.5 rounded-md border border-navy/15 hover:border-gold focus-visible:outline-2 focus-visible:outline-gold"
        >
          Account
        </Link>
        <button
          type="button"
          onClick={() => loadSupabase().then((sb) => sb?.auth.signOut())}
          className="text-xs font-semibold text-navy/70 hover:text-navy transition-colors px-2.5 py-1.5 rounded-md border border-navy/15 hover:border-gold focus-visible:outline-2 focus-visible:outline-gold"
        >
          Log out
        </button>
      </span>
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
