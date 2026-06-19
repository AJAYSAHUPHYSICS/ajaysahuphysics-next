import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Video Lectures",
  description:
    "Video lectures and concept walkthroughs for JEE and NEET physics by Ajay Sahu, coming soon on a dedicated YouTube channel.",
};

const formats = [
  {
    title: "Concept lectures",
    desc: "Full-length classes covering one chapter at a time, from first principles to exam-level application.",
  },
  {
    title: "Problem-solving sessions",
    desc: "Live walkthroughs of tricky numericals — the kind that show up in JEE Advanced and NEET's harder sections.",
  },
  {
    title: "Quick-revision shorts",
    desc: "Under 10-minute videos for revising a single formula, derivation, or trick before an exam.",
  },
];

export default function VideosPage() {
  return (
    <div>
      <PageHero
        eyebrow="Video Lectures"
        title="Video lectures are on the way."
        description="Ajay Sir is building out a structured video library to go alongside the notes, DPPs, and PYQs. Here's what's planned."
      >
        <WhatsAppButton message="Hi Ajay Sir, please notify me when video lectures are available.">
          Notify me when videos launch
        </WhatsAppButton>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-10">
            What to expect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {formats.map((f) => (
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

          <div className="mt-12 rounded-lg bg-navy text-white p-8 sm:p-10 physics-grid text-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
              </svg>
            </span>
            <h3 className="font-display text-2xl">
              The Ajay Sahu Physics YouTube channel is coming soon
            </h3>
            <p className="mt-2 text-white/70 max-w-md mx-auto">
              Concept lectures, problem-solving sessions, and quick-revision
              shorts will all live on a dedicated YouTube channel. Message
              Ajay Sir on WhatsApp to be notified the moment it goes live.
            </p>
            <div className="mt-6 flex justify-center">
              <WhatsAppButton message="Hi Ajay Sir, please notify me when the YouTube channel launches.">
                Notify me when it launches
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
