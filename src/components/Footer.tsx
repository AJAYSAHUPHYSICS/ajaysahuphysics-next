import Link from "next/link";
import {
  siteConfig,
  footerResourceLinks,
  footerExamLinks,
  footerSiteLinks,
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
            <div className="mt-5 flex items-center gap-4 text-sm">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
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
