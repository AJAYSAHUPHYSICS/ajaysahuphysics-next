import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy notice (draft)",
  description: "How AjaySahuPhysics handles your data. Draft pending legal review.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const section = "mt-10";
const h2 = "font-display text-2xl text-navy";
const p = "mt-3 text-slate leading-relaxed";

// IMPORTANT: this text describes the site's actual data flows, but it is a
// DRAFT. It must be reviewed and approved by qualified counsel (DPDP Act
// 2023 and Rules) before it is relied on, and before any cloud storage of
// study progress is switched on. See docs/phase-2/LEGAL_REVIEW_CHECKLIST.md.
export default function PrivacyPage() {
  return (
    <main className="bg-ivory">
      <PageHero eyebrow="Privacy" title="How we handle your data" description="A plain-language description of what AjaySahuPhysics stores, where, and why." />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <p role="note" className="rounded-md border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-navy">
          <strong>Draft notice, pending legal review.</strong> This page describes how the site works today. Its wording is being reviewed before it is finalised.
        </p>

        <section className={section}>
          <h2 className={h2}>Progress saved in your browser</h2>
          <p className={p}>
            Bookmarks, your chapter checklist, mistakes you record, revision rounds, goals, your study streak, a 30-day activity history, reading position, recent searches and recently viewed pages are saved <strong>only in your browser</strong> (local storage). We can&apos;t see them. You can download or remove them at any time from <Link href="/account" className="underline hover:text-navy">your account page</Link>, which works without signing in.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>If you create an account</h2>
          <p className={p}>
            Accounts are provided by Supabase, our authentication provider. It stores your email address, a securely hashed password and sign-in records so you can log in. Creating an account doesn&apos;t copy your study progress anywhere: it stays in your browser.
          </p>
          <p className={p}>
            A cloud copy of study progress isn&apos;t available yet. If it is offered in future, it will be off until you turn it on, and it will need a verified email address and your consent, which you can withdraw at any time. These would never be copied: activity history, searches, reading position and recently viewed pages.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Analytics</h2>
          <p className={p}>
            We use Google Analytics 4 to understand how the site is used so we can improve it. It receives the pages you visit, which chapter a search led to and how many results it found (never the words you typed), clicks on resource links, and clicks on the WhatsApp button. We don&apos;t send it your saved progress or your email address.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Your choices</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-slate">
            <li>Download everything this browser stores for us, or remove it, from your account page.</li>
            <li>To delete your account, ask us through the <Link href="/contact" className="underline hover:text-navy">contact page</Link>. Deleting it yourself from the account page isn&apos;t available yet; the account page will say so until it is.</li>
            <li>Signing out never deletes the progress saved in your browser.</li>
          </ul>
        </section>

        <section className={section}>
          <h2 className={h2}>Contact</h2>
          <p className={p}>
            Questions about your data: use the <Link href="/contact" className="underline hover:text-navy">contact page</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
