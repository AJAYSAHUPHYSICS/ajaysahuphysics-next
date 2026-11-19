"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { MESSAGES, authRedirect, passwordProblems, requestOutcome, signInErrorMessage } from "@/lib/auth/auth-policy";

type Mode = "login" | "signup" | "forgot";

const inputClass = "w-full text-sm rounded-md border border-navy/15 px-3 py-2.5 text-navy focus-visible:outline-2 focus-visible:outline-gold";
const primaryButton = "w-full text-sm font-semibold text-white bg-navy hover:bg-navy-light transition-colors rounded-md px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60";
const linkButton = "font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management: move focus into the dialog, keep Tab inside it, and
  // return focus to whatever opened it when it closes.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const focusables = () => [...(dialogRef.current?.querySelectorAll<HTMLElement>("input, button, a[href]") ?? [])].filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setSentMessage(null);
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError(MESSAGES.unavailable);
      return;
    }
    setError(null);
    if (mode === "signup") {
      const problems = passwordProblems(password, email);
      if (problems.length) {
        setError(problems.join(" "));
        return;
      }
    }
    setLoading(true);
    const origin = typeof window !== "undefined" ? window.location.origin : undefined;
    try {
      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) setError(signInErrorMessage(authError));
        else onClose();
      } else if (mode === "signup") {
        const { error: authError } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: authRedirect("/auth/callback/", origin) } });
        const outcome = requestOutcome("signup", authError);
        if (outcome.ok) setSentMessage(outcome.message);
        else setError(outcome.message);
      } else {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: authRedirect("/auth/reset-password/", origin) });
        const outcome = requestOutcome("reset", authError);
        if (outcome.ok) setSentMessage(outcome.message);
        else setError(outcome.message);
      }
    } catch {
      setError(MESSAGES.network);
    } finally {
      setLoading(false);
    }
  }

  const title = mode === "login" ? "Log in" : mode === "signup" ? "Create your account" : "Reset your password";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/60 px-4" onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" className="bg-white rounded-lg max-w-sm w-full p-7" onClick={(e) => e.stopPropagation()}>
        {sentMessage ? (
          <div className="text-center">
            <span aria-hidden="true" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold-deep font-display text-xl mb-4">
              ✓
            </span>
            <h3 id="auth-modal-title" className="font-display text-xl text-navy">
              Check your email
            </h3>
            <p className="mt-2 text-sm text-slate leading-relaxed" role="status">
              {sentMessage}
            </p>
            <button type="button" onClick={onClose} className={`mt-5 ${primaryButton}`}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 id="auth-modal-title" className="font-display text-xl text-navy text-center">
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-slate text-center">
              {mode === "forgot" ? "Enter your email and we'll send you a reset link." : "Your progress is saved on this device; syncing across devices is coming soon."}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate={false}>
              <div>
                <label htmlFor="auth-email" className="sr-only">
                  Email
                </label>
                <input id="auth-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputClass} />
              </div>
              {mode !== "forgot" ? (
                <div>
                  <label htmlFor="auth-password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    required
                    minLength={mode === "signup" ? 10 : undefined}
                    maxLength={72}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-describedby={mode === "signup" ? "auth-password-help" : undefined}
                    className={inputClass}
                  />
                  {mode === "signup" ? (
                    <p id="auth-password-help" className="mt-1 text-xs text-slate">
                      At least 10 characters. A short phrase is easier to remember.
                    </p>
                  ) : null}
                </div>
              ) : null}

              {error ? (
                <p role="alert" className="text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button type="submit" disabled={loading} className={primaryButton}>
                {loading ? "Please wait…" : mode === "login" ? "Log in" : mode === "signup" ? "Sign up" : "Send reset link"}
              </button>
            </form>

            {mode === "login" ? (
              <p className="mt-3 text-sm text-center">
                <button type="button" onClick={() => switchMode("forgot")} className={linkButton}>
                  Forgot your password?
                </button>
              </p>
            ) : null}

            <p className="mt-3 text-sm text-slate text-center">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchMode("login")} className={linkButton}>
                    Log in
                  </button>
                </>
              ) : mode === "login" ? (
                <>
                  New here?{" "}
                  <button type="button" onClick={() => switchMode("signup")} className={linkButton}>
                    Create an account
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => switchMode("login")} className={linkButton}>
                  Back to log in
                </button>
              )}
            </p>

            {mode === "signup" ? (
              <p className="mt-3 text-xs text-slate text-center">
                By signing up you agree to how we handle your data:{" "}
                <Link href="/privacy" className="underline hover:text-navy">
                  privacy notice
                </Link>
                .
              </p>
            ) : null}

            <button type="button" onClick={onClose} className="mt-3 w-full text-xs font-semibold text-slate hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
