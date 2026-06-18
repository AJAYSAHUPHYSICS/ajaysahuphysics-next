import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Ajay Sahu — physics faculty for JEE and NEET with experience at Physics Wallah, Aakash Institute, and Narayana Institute.",
};

const journey = [
  {
    place: "Aakash Institute, Delhi",
    role: "Physics Faculty",
    note: "Started teaching JEE and NEET aspirants, building a foundation in exam-focused pedagogy.",
  },
  {
    place: "Narayana Institute, Mumbai",
    role: "Physics Faculty",
    note: "Refined a structured, numerical-heavy teaching style suited to competitive exam patterns.",
  },
  {
    place: "Physics Wallah, Kalyan",
    role: "Physics Faculty (Current)",
    note: "Currently teaching at scale, while building an independent coaching brand on the side.",
  },
];

const principles = [
  {
    title: "Concepts before shortcuts",
    desc: "Tricks fail under exam pressure. A clear concept never does. Every class builds understanding first, speed second.",
  },
  {
    title: "Practice that mirrors the exam",
    desc: "DPPs and PYQs are chosen to match how JEE and NEET actually test a topic, not just to fill a worksheet.",
  },
  {
    title: "Notes you can revise from",
    desc: "Typed, chapter-wise notes mean no scrambling to read handwriting two days before an exam.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Ajay Sir"
        title="Physics taught by someone who has stood in front of thousands of JEE and NEET aspirants."
        description="Ajay Sahu is a physics educator with experience across three of India's well-known coaching ecosystems, now building an independent platform focused entirely on the student's score."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="gold-rule mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl text-navy">
                The teaching journey
              </h2>
              <div className="mt-8 space-y-8">
                {journey.map((j, i) => (
                  <div key={j.place} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold shrink-0" />
                      {i < journey.length - 1 && (
                        <div className="w-px flex-1 bg-navy/15 mt-2" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3 className="font-semibold text-navy">{j.place}</h3>
                      <p className="text-sm text-gold-deep font-medium">
                        {j.role}
                      </p>
                      <p className="mt-2 text-sm text-slate leading-relaxed max-w-lg">
                        {j.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="bg-ivory rounded-lg p-7 border border-navy/10 h-fit">
              <h3 className="font-display text-xl text-navy">
                Why an independent platform?
              </h3>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                Coaching institutes optimize for batches. Ajay Sahu Physics
                is built to optimize for the individual student — the
                notes, the practice sets, and the doubt-solving are all
                designed around what one student needs to improve, not what
                fits a 200-seat classroom.
              </p>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                The long-term goal is a full independent coaching institute,
                built from the ground up around this approach.
              </p>
              <div className="mt-6">
                <WhatsAppButton message="Hi Ajay Sir, I'd like to know more about your classes.">
                  Talk to Ajay Sir
                </WhatsAppButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-10">
            Teaching principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="bg-white rounded-lg border border-navy/10 p-6"
              >
                <span className="font-display text-3xl text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-semibold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
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
