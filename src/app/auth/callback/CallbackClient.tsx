"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exchangeCodeFromUrl, type ExchangeResult } from "@/lib/auth/exchange-code";

const COPY: Record<ExchangeResult | "working", { title: string; body: string }> = {
  working: { title: "Signing you in…", body: "Please wait a moment." },
  "signed-in": { title: "You're signed in", body: "Your email is confirmed. Your progress stays saved on this device." },
  "no-code": { title: "Nothing to confirm", body: "This page completes sign-in from an email link. Log in from the menu instead." },
  "other-browser": { title: "Email confirmed: please log in", body: "For your security, the link signs you in only in the browser where you started. Your email is confirmed, so log in from the menu." },
  "link-invalid": { title: "This link can't be used", body: "It may have expired or already been used. Log in from the menu, or request a new link." },
  unavailable: { title: "Sign-in isn't available", body: "Please try again later." },
};

export default function CallbackClient() {
  const [result, setResult] = useState<ExchangeResult | "working">("working");
  useEffect(() => {
    exchangeCodeFromUrl().then(setResult, () => setResult("link-invalid"));
  }, []);
  const copy = COPY[result];
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9" aria-live="polite">
      <h2 className="font-display text-2xl text-navy">{copy.title}</h2>
      <p className="mt-3 text-slate leading-relaxed">{copy.body}</p>
      {result !== "working" ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={result === "signed-in" ? "/account" : "/"} className="inline-flex items-center rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-gold">
            {result === "signed-in" ? "Go to your account" : "Back to home"}
          </Link>
          <Link href="/dashboard" className="inline-flex items-center rounded-md border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy hover:border-gold focus-visible:outline-2 focus-visible:outline-gold">
            My progress
          </Link>
        </div>
      ) : null}
    </div>
  );
}
