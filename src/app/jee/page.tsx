import type { Metadata } from "next";
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
  },
  {
    title: "JEE Advanced",
    desc: "Sharpen multi-concept problem solving for the trickier, higher-weightage Advanced topics.",
  },
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
              <div
                key={p.title}
                className="rounded-lg border border-navy/10 p-7"
              >
                <h3 className="font-display text-2xl text-navy">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
