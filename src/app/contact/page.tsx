import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ajay Sahu Physics over WhatsApp, email, or social media for demo classes and doubt support.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "WhatsApp",
    value: siteConfig.phone,
    note: "Fastest way to reach Ajay Sir — for demo classes, fees, and doubts.",
    href: null,
  },
  {
    label: "Email",
    value: siteConfig.email,
    note: "For detailed queries or anything that needs a written reply.",
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    note: "Daily physics tips, reels, and updates on new notes.",
    href: siteConfig.instagram,
  },
  {
    label: "LinkedIn",
    value: "Ajay Sahu",
    note: "Professional updates and teaching journey.",
    href: siteConfig.linkedin,
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Have a question? Message Ajay Sir directly."
        description="No call centers, no forms that go nowhere. Every message reaches Ajay Sir personally."
      >
        <WhatsAppButton message="Hi Ajay Sir, I have a question.">
          Message on WhatsApp
        </WhatsAppButton>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {channels.map((c) => (
              <div
                key={c.label}
                className="rounded-lg border border-navy/10 p-7 hover:border-gold hover:shadow-lg transition-all"
              >
                <h3 className="font-display text-xl text-navy">{c.label}</h3>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-2 inline-block text-gold-deep font-semibold hover:underline break-all"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-2 text-gold-deep font-semibold">
                    {c.value}
                  </p>
                )}
                <p className="mt-3 text-sm text-slate leading-relaxed">
                  {c.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-navy rounded-lg p-8 sm:p-10 text-white physics-grid">
            <h3 className="font-display text-2xl">
              Looking for a demo class?
            </h3>
            <p className="mt-2 text-white/70 max-w-xl">
              Send a message on WhatsApp with your class (11 or 12) and exam
              target (JEE or NEET), and Ajay Sir will get back to you with
              the next steps.
            </p>
            <div className="mt-6">
              <WhatsAppButton message="Hi Ajay Sir, I'd like to book a demo class. My class: __, target exam: __.">
                Book a demo class
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
