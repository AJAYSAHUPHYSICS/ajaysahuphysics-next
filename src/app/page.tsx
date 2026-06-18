import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

const resourceCards = [
  {
    title: "Notes",
    href: "/notes",
    desc: "Chapter-wise typed notes for Class 11 and Class 12, built around what actually shows up in exams.",
  },
  {
    title: "Formula Sheet",
    href: "/formula-sheet",
    desc: "Every derived result in one place, organized by chapter, for fast revision before tests.",
  },
  {
    title: "DPP",
    href: "/dpp",
    desc: "Daily Practice Problems to keep your problem-solving sharp, one chapter at a time.",
  },
  {
    title: "PYQ",
    href: "/pyq",
    desc: "Previous Year Questions from JEE Main, JEE Advanced, and NEET, sorted by chapter.",
  },
];

const stats = [
  { value: "3", label: "Institutes taught at" },
  { value: "1000+", label: "Students mentored" },
  { value: "2", label: "Exams covered: JEE & NEET" },
];

const testimonials = [
  {
    name: "Mayank",
    context: "Aakash Institute",
    quote:
      "Ajay Sir breaks down even the toughest mechanics problems into steps that actually make sense. My approach to numericals changed completely.",
  },
  {
    name: "Riddhima",
    context: "Aakash Institute",
    quote:
      "What I liked most is that he never rushes a concept. Every class felt like it was building toward the next one, not just covering a topic.",
  },
  {
    name: "Riddhi",
    context: "Narayana Institute",
    quote:
      "His notes alone got me through revision for both boards and JEE. Clear, to the point, and exactly what's needed for exams.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="physics-grid bg-navy text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              JEE Main &middot; JEE Advanced &middot; NEET
            </p>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
              Physics that makes
              <br />
              <span className="text-gold">you score.</span>
            </h1>
            <p className="mt-6 text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
              Taught by Ajay Sahu — physics faculty with experience across
              Physics Wallah, Aakash, and Narayana — built around one idea:
              concepts that stick, and practice that mirrors the real exam.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <WhatsAppButton message="Hi Ajay Sir, I'd like to book a demo class.">
                Book a demo class
              </WhatsAppButton>
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors"
              >
                Browse free notes
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-gold pl-5">
                <div className="font-display text-3xl sm:text-4xl text-navy">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="gold-rule mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl text-navy">
                Everything you need to prepare
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resourceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white rounded-lg border border-navy/10 p-6 hover:border-gold hover:shadow-lg transition-all"
              >
                <h3 className="font-display text-xl text-navy group-hover:text-gold-deep transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {card.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep">
                  Explore <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="gold-rule mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl text-navy">
                Pick your track
              </h2>
              <p className="mt-4 text-slate leading-relaxed">
                Whether you&apos;re preparing for engineering entrance or
                medical entrance, the physics fundamentals are the same — the
                application is not. Notes, DPPs, and PYQs are organized
                separately for each exam and class.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/jee"
                  className="px-5 py-2.5 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors"
                >
                  JEE Track
                </Link>
                <Link
                  href="/neet"
                  className="px-5 py-2.5 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
                >
                  NEET Track
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/class-11"
                className="bg-navy text-white rounded-lg p-6 flex flex-col justify-between min-h-[140px] hover:bg-navy-light transition-colors"
              >
                <span className="font-display text-2xl">Class 11</span>
                <span className="text-sm text-white/60 mt-2">
                  Foundation chapters &rarr;
                </span>
              </Link>
              <Link
                href="/class-12"
                className="bg-navy-deep text-white rounded-lg p-6 flex flex-col justify-between min-h-[140px] hover:bg-navy-light transition-colors"
              >
                <span className="font-display text-2xl">Class 12</span>
                <span className="text-sm text-white/60 mt-2">
                  Advanced chapters &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-10">
            What students say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-lg border border-navy/10 p-6 hover:shadow-lg hover:border-gold transition-all"
              >
                <p className="text-slate text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-navy/10">
                  <div className="font-semibold text-navy text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate">{t.context}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-display text-2xl sm:text-3xl">
            Ready to start scoring better in physics?
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Message Ajay Sir directly on WhatsApp for a free demo class.
          </p>
          <div className="mt-8">
            <WhatsAppButton message="Hi Ajay Sir, I'd like to book a demo class.">
              Book a demo class
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
}
