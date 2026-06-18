"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { primaryNav, examNav, classNav, siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="bg-navy text-white text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-white/70">
              JEE Main &middot; JEE Advanced &middot; NEET
            </span>
            <span className="sm:hidden text-white/70">JEE &middot; NEET Physics</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-white/80 hover:text-gold transition-colors"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white border-b border-navy/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="font-display text-xl sm:text-2xl text-navy tracking-tight">
                Ajay Sahu
              </span>
              <span className="font-display text-xl sm:text-2xl text-gold-deep tracking-tight">
                Physics
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-navy"
                      : "text-slate hover:text-navy"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-gold" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2 pl-2">
              {[...examNav, ...classNav].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full border border-navy/15 text-navy/70 hover:border-gold hover:text-gold-deep transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-navy hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-gold"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M3 7h18M3 12h18M3 17h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-navy/10 bg-white max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="px-4 sm:px-6 py-3 flex flex-col gap-1">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive(link.href)
                      ? "bg-navy/5 text-navy"
                      : "text-slate hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-navy/10 flex flex-wrap gap-2">
                {[...examNav, ...classNav].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold px-3 py-1.5 rounded-full border border-navy/15 text-navy/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
