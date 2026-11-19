import type { Metadata } from "next";
import CallbackClient from "./CallbackClient";

export const metadata: Metadata = {
  title: "Signing in",
  description: "Completes sign-in from an email link.",
  alternates: { canonical: "/auth/callback" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function AuthCallbackPage() {
  return (
    <main className="bg-ivory min-h-[60vh]">
      <div className="mx-auto max-w-xl px-4 sm:px-6 py-16">
        <CallbackClient />
      </div>
    </main>
  );
}
