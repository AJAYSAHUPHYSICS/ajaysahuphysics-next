"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  clearReadingProgress,
  getReadingProgress,
  setReadingProgress,
} from "@/lib/reading-progress";

/** Only chapter and resource pages have enough content for a reading
 * progress bar to be meaningful — homepage, contact, etc. are skipped. */
function isContentPage(pathname: string): boolean {
  return /^\/class-(11|12)\/[^/]+/.test(pathname);
}

/**
 * Thin progress bar rendered at the bottom edge of the sticky navbar,
 * showing how far down the current page the reader has scrolled. Also
 * offers a one-tap "resume" affordance if a saved position exists for
 * this exact page from a previous visit.
 *
 * No auto-scrolling on load — jumping the page on mount is disorienting
 * and fights the browser's own scroll restoration, so resuming is
 * always an explicit, reader-initiated action.
 */
export default function ReadingProgressBar() {
  const pathname = usePathname() ?? "";
  const active = isContentPage(pathname);

  const [pct, setPct] = useState(0);
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticking = useRef(false);

  // Reset per-page state during render on navigation, rather than in an
  // effect — the same pattern Navbar.tsx uses to close its mobile menu
  // on route change, avoiding a cascading setState-in-effect render.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setPct(0);
    setResumeAt(null);
  }

  useEffect(() => {
    if (!active) return;

    const computePct = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const current = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      return Math.min(100, Math.max(0, Math.round(current)));
    };

    const apply = (next: number, isInitial: boolean) => {
      setPct(next);

      if (isInitial) {
        const saved = getReadingProgress(pathname);
        setResumeAt(saved > 5 && saved < 92 && saved > next + 3 ? saved : null);
      } else {
        // Once the reader has scrolled meaningfully under their own
        // steam, the "resume" affordance no longer applies.
        setResumeAt((prev) => (prev != null && Math.abs(next - prev) > 3 ? null : prev));
      }

      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        setReadingProgress(pathname, next);
      }, 600);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        apply(computePct(), false);
        ticking.current = false;
      });
    };

    const initialRaf = requestAnimationFrame(() => apply(computePct(), true));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initialRaf);
      window.removeEventListener("scroll", onScroll);
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [active, pathname]);

  if (!active) return null;

  const handleResume = () => {
    if (resumeAt == null) return;
    const doc = document.documentElement;
    const target = ((doc.scrollHeight - doc.clientHeight) * resumeAt) / 100;
    window.scrollTo({ top: target, behavior: "smooth" });
    setResumeAt(null);
    clearReadingProgress(pathname);
  };

  return (
    <>
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-[3px] w-full bg-transparent"
      >
        <div
          className="h-full bg-gold transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {resumeAt != null && (
        <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
          <button
            type="button"
            onClick={handleResume}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-navy text-white text-sm font-semibold pl-4 pr-3 py-2.5 shadow-lg hover:bg-navy-light transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            Resume where you left off
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold"
            >
              &darr;
            </span>
          </button>
        </div>
      )}
    </>
  );
}
