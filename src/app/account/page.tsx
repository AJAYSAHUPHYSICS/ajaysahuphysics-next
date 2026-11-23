import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "Your account",
  description: "Manage your AjaySahuPhysics account, your saved progress and your data.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <main className="bg-ivory">
      <PageHero eyebrow="Account" title="Your account and data" description="Your progress is saved in this browser. Download it, remove it, or manage your account here." />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <AccountClient />
      </div>
    </main>
  );
}
