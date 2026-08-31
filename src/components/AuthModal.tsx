"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Mode = "login" | "signup";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Sign-in isn't available right now. Please try again later.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error: authError } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (mode === "signup") {
      setSignupSuccess(true);
    } else {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="bg-white rounded-lg max-w-sm w-full p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {signupSuccess ? (
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold-deep font-display text-xl mb-4">
              ✓
            </span>
            <h3 id="auth-modal-title" className="font-display text-xl text-navy">
              Check your email
            </h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              We&apos;ve sent a confirmation link to <strong>{email}</strong>.
              Confirm your email, then log in.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full text-sm font-semibold text-white bg-navy hover:bg-navy-light transition-colors rounded-md px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-gold"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 id="auth-modal-title" className="font-display text-xl text-navy text-center">
              {mode === "login" ? "Log in" : "Create your account"}
            </h3>
            <p className="mt-1.5 text-sm text-slate text-center">
              {mode === "login"
                ? "Sync your progress, bookmarks, and practice history."
                : "Save your progress and access it on any device."}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div>
                <label htmlFor="auth-email" className="sr-only">
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full text-sm rounded-md border border-navy/15 px-3 py-2.5 text-navy focus-visible:outline-2 focus-visible:outline-gold"
                />
              </div>
              <div>
                <label htmlFor="auth-password" className="sr-only">
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full text-sm rounded-md border border-navy/15 px-3 py-2.5 text-navy focus-visible:outline-2 focus-visible:outline-gold"
                />
              </div>

              {error ? (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-sm font-semibold text-white bg-navy hover:bg-navy-light transition-colors rounded-md px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60"
              >
                {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
              </button>
            </form>

            <p className="mt-4 text-sm text-slate text-center">
              {mode === "login" ? (
                <>
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                    }}
                    className="font-semibold text-gold-deep hover:text-navy transition-colors"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                    }}
                    className="font-semibold text-gold-deep hover:text-navy transition-colors"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full text-xs font-semibold text-slate hover:text-navy transition-colors"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
