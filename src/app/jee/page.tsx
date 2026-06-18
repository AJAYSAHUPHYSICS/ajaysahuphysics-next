import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "JEE Physics",
  description:
    "Complete JEE Main and JEE Advanced physics preparation — notes, formula sheets, DPPs, and PYQs by Ajay Sahu.",
};

const pillars = [
  {
    title: "JEE Main",
    desc: "Build speed and accuracy across all 27 chapters with focused practice and previous year patterns.",
    href: "/pyq",
    cta: "View JEE Main PYQs",
  },
  {
    title: "JEE Advanced",
    desc: "Sharpen multi-concept problem solving for the trickier, higher-weightage Advanced topics.",
    href: "/pyq",
    cta: "View JEE Advanced PYQs",
  },
];

const resources = [
  { label: "Notes", href: "/notes" },
  { label: "Formula Sheet", href: "/formula-sheet" },
  { label: "DPP", href: "/dpp" },
  { label: "PYQ", href: "/pyq" },
];

export default function JeePage() {
  return (
    <div>
      <PageHero
        eyebrow="JEE Track"
        title="Physics preparation built for both JEE Main and JEE Advanced."
        description="From Class 11 mechanics to Class 12 modern physics, every chapter is covered with notes, formula sheets, daily practice, and previous year questions tuned to JEE's exam pattern."
      >
        <WhatsAppButton message="Hi Ajay Sir, I'm preparing for JEE and want to know more about your classes.">
          Talk to Ajay Sir about JEE prep
        </WhatsAppButton>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group rounded-lg border border-navy/10 p-7 hover:border-gold hover:shadow-lg transition-all"
              >
                <h3 className="font-display text-2xl text-navy group-hover:text-gold-deep transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">
                  {p.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep">
                  {p.cta} <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-8">
            Resources for JEE
          </h2>
          <div className="flex flex-wrap gap-3">
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="px-5 py-2.5 rounded-md bg-white border border-navy/10 text-navy text-sm font-semibold hover:border-gold hover:text-gold-deep transition-colors"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
