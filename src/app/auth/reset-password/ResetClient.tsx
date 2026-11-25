"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { exchangeCodeFromUrl, type ExchangeResult } from "@/lib/auth/exchange-code";
import { MESSAGES, passwordProblems } from "@/lib/auth/auth-policy";
import FrameGuard from "@/components/FrameGuard";

type Stage = "checking" | "ready" | "done" | "blocked";

export default function ResetClient() {
  const [stage, setStage] = useState<Stage>("checking");
  const [why, setWhy] = useState<ExchangeResult | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const r = await exchangeCodeFromUrl().catch(() => "link-invalid" as const);
      if (r === "signed-in") return setStage("ready");
      // A recovery session may already exist (e.g. the page was refreshed).
      const { data } = (await supabase?.auth.getSession()) ?? { data: { session: null } };
      if (data.session) return setStage("ready");
      setWhy(r);
      setStage("blocked");
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { data } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
    const problems = passwordProblems(password, data.user?.email ?? "");
    if (password !== confirm) problems.push("The two passwords don't match.");
    if (problems.length) return setError(problems.join(" "));
    if (!supabase) return setError(MESSAGES.unavailable);
    setSaving(true);
    const { error: e2 } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (e2) return setError(/same|different from the old/i.test(e2.message) ? "Choose a password you haven't used for this account." : MESSAGES.generic);
    setStage("done");
  }

  const field = "w-full text-sm rounded-md border border-navy/15 px-3 py-2.5 text-navy focus-visible:outline-2 focus-visible:outline-gold";
  return (
    <FrameGuard>
    <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9" aria-live="polite">
      {stage === "checking" ? <p className="text-slate">Checking your reset link…</p> : null}
      {stage === "blocked" ? (
        <>
          <h1 className="font-display text-2xl text-navy">This reset link can&apos;t be used</h1>
          <p className="mt-3 text-slate leading-relaxed">
            {why === "other-browser" ? "Open the link in the same browser where you asked for it, or request a new link." : "It may have expired or already been used. Request a new link from “Forgot your password?” when you log in."}
          </p>
          <Link href="/" className="mt-6 inline-flex rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-gold">
            Back to home
          </Link>
        </>
      ) : null}
      {stage === "ready" ? (
        <form onSubmit={save} className="space-y-3">
          <h1 className="font-display text-2xl text-navy">Choose a new password</h1>
          <p className="text-sm text-slate">At least 10 characters. A short phrase is easier to remember.</p>
          <label htmlFor="new-password" className="block text-sm font-semibold text-navy">New password</label>
          <input id="new-password" type="password" autoComplete="new-password" required minLength={10} maxLength={72} value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
          <label htmlFor="confirm-password" className="block text-sm font-semibold text-navy">Repeat the new password</label>
          <input id="confirm-password" type="password" autoComplete="new-password" required minLength={10} maxLength={72} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={field} />
          {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
          <button type="submit" disabled={saving} className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60">
            {saving ? "Saving…" : "Save new password"}
          </button>
        </form>
      ) : null}
      {stage === "done" ? (
        <>
          <h1 className="font-display text-2xl text-navy">Password updated</h1>
          <p className="mt-3 text-slate">You&apos;re signed in with your new password.</p>
          <Link href="/account" className="mt-6 inline-flex rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-gold">
            Go to your account
          </Link>
        </>
      ) : null}
    </div>
    </FrameGuard>
  );
}
