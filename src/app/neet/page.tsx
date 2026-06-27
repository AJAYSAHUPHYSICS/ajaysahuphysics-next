import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import NeetResourceTabs from "@/components/NeetResourceTabs";

export const metadata: Metadata = {
  title: "NEET Physics",
  description:
    "Complete NEET physics preparation — notes, formula sheets, Practice Questions, and PYQs by Ajay Sahu, focused on NEET's exam pattern.",
};

const focusAreas = [
  {
    title: "Conceptual clarity over tricks",
    desc: "NEET physics rewards solid fundamentals. Every topic is taught to be understood, not memorized.",
  },
  {
    title: "Single-correct accuracy",
    desc: "NEET's format punishes careless mistakes. Practice is built to tighten accuracy under time pressure.",
  },
  {
    title: "High-yield chapter focus",
    desc: "Optics, Modern Physics, and Electrodynamics carry outsized weight — these get extra attention.",
  },
];

export default function NeetPage() {
  return (
    <div>
      <PageHero
        eyebrow="NEET Track"
        title="Physics preparation focused entirely on NEET's exam pattern."
        description="NEET physics is often the difference-maker between a good and a great score. Chapter-wise notes, formula sheets, daily practice, and previous year questions, all tuned for NEET."
      >
        <WhatsAppButton message="Hi Ajay Sir, I'm preparing for NEET and want to know more about your classes.">
          Talk to Ajay Sir about NEET prep
        </WhatsAppButton>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-10">
            How NEET prep is approached here
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {focusAreas.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-navy/10 p-6"
              >
                <h3 className="font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-8">
            Resources for NEET
          </h2>
          <NeetResourceTabs />
        </div>
      </section>
    </div>
  );
}
