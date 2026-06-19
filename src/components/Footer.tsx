import Link from "next/link";
import {
  siteConfig,
  footerResourceLinks,
  footerExamLinks,
  footerSiteLinks,
  whatsappLink,
} from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl">
              Ajay Sahu <span className="text-gold">Physics</span>
            </div>
            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-sm">
              Physics that makes you score. Chapter-wise notes, formula
              sheets, daily practice problems, and previous year questions
              for JEE Main, JEE Advanced, and NEET aspirants.
            </p>
            <div className="mt-5 gold-rule" />
            <a
              href={whatsappLink(
                "Hi Ajay Sir, I'd like to know more about your classes."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4C7.5 4 3.78 7.7 3.78 12.25c0 1.5.4 2.9 1.1 4.12L4 20l3.73-.98a8.8 8.8 0 0 0 4.32 1.1h.01c4.55 0 8.27-3.7 8.27-8.25 0-2.2-.86-4.27-2.43-5.85l-.3.3z" />
              </svg>
              Message on WhatsApp
            </a>
            <div className="mt-5 flex items-center gap-4 text-sm">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/70 hover:text-gold transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerResourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light">
              Exams &amp; Classes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerExamLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerSiteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/70 hover:text-white transition-colors break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {year} Ajay Sahu Physics. All rights reserved.</p>
          <p>Built for students who want physics that makes them score.</p>
        </div>
      </div>
    </footer>
  );
}
