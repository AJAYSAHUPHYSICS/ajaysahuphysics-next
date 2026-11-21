import type { Metadata } from "next";
import ResetClient from "./ResetClient";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your AjaySahuPhysics account.",
  alternates: { canonical: "/auth/reset-password" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ResetPasswordPage() {
  return (
    <main className="bg-ivory min-h-[60vh]">
      <div className="mx-auto max-w-xl px-4 sm:px-6 py-16">
        <ResetClient />
      </div>
    </main>
  );
}
