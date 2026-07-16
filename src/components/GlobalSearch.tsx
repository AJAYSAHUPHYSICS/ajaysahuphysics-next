"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { searchIndex, type SearchEntry } from "@/lib/search-index";
import { getRecentlyViewed, type RecentChapter } from "@/lib/recently-viewed";
import { trackEvent } from "@/lib/analytics";

/**
 * Site-wide search, reachable from the Navbar on every page.
 *
 * Uses the native <dialog> element rather than a hand-rolled modal:
 * it provides focus trapping, Escape-to-close, and backdrop semantics
 * for free, with no extra JS or ARIA wiring needed — the same
 * "smallest clean implementation" approach used for the FAQ accordion
 * (see ChapterFaqAccordion.tsx).
 *
 * The only client-side data is `searchIndex` — a small, fixed array of
 * 30 chapters with slugs/names/hrefs, never note/DPP/PYQ content — so
 * this component's bundle impact is minimal regardless of chapter count.
 */
export default function GlobalSearch() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<RecentChapter[]>([]);

  const open = () => {
    setQuery("");
    setRecent(getRecentlyViewed());
    dialogRef.current?.showModal();
    // Autofocus after the dialog paints, so it works reliably across browsers.
    requestAnimationFrame(() => inputRef.current?.focus());
  };
  const close = () => dialogRef.current?.close();

  // Global keyboard shortcut: "/" or Cmd/Ctrl+K opens search from anywhere,
  // matching the pattern most students will already expect.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping)) {
        e.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored: { entry: SearchEntry; score: number }[] = [];
    for (const entry of searchIndex) {
      const name = entry.name.toLowerCase();
      const haystack = [
        name,
        entry.slug,
        entry.subject.toLowerCase(),
        `class ${entry.cls}`,
        entry.cls,
        ...entry.resources.map((r) => r.label.toLowerCase()),
      ];
      const matches = haystack.some((h) => h.includes(q));
      if (matches) {
        // Rank exact-start-of-name matches above partial/resource-type matches.
        const score = name.startsWith(q) ? 2 : name.includes(q) ? 1 : 0;
        scored.push({ entry, score });
      }
    }
    return scored
      .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name))
      .slice(0, 20)
      .map((s) => s.entry);
  }, [query]);

  // Debounced: fires once ~500ms after the student stops typing, not on
  // every keystroke, and only for genuine (non-empty) queries. Uses GA4's
  // reserved "search" event name + search_term param so it's picked up by
  // GA4's built-in Site Search reports automatically.
  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const timer = setTimeout(() => {
      trackEvent("search", { search_term: q, result_count: results.length });
    }, 500);
    return () => clearTimeout(timer);
  }, [query, results.length]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Search chapters and resources"
        className="inline-flex items-center gap-2 rounded-md border border-navy/15 px-3 py-2 text-sm text-slate hover:border-gold hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <span className="hidden sm:inline text-xs text-slate/50 border border-navy/15 rounded px-1.5 py-0.5">
          /
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setQuery("")}
        onClick={(e) => {
          // Click on the backdrop (the <dialog> element itself, outside its
          // content box) closes it — native <dialog> has no built-in
          // backdrop-click-to-close, this is the standard minimal pattern.
          if (e.target === dialogRef.current) close();
        }}
        aria-label="Search chapters and resources"
        className="m-0 mt-16 sm:mt-24 w-[calc(100%-2rem)] sm:w-full max-w-xl rounded-lg border border-navy/10 bg-white p-0 shadow-2xl backdrop:bg-navy/40"
      >
        <div className="flex items-center gap-2 border-b border-navy/10 px-4 py-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="shrink-0 text-slate/50"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, notes, DPP, PYQ…"
            aria-label="Search query"
            className="flex-1 border-0 outline-none text-navy placeholder:text-slate/40 py-1"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="shrink-0 rounded-md p-1 text-slate/50 hover:text-navy focus-visible:outline-2 focus-visible:outline-gold"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === "" && recent.length > 0 && (
            <div className="px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate/50 mb-2">
                Recently viewed
              </p>
              <ul className="flex flex-col gap-1">
                {recent.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/class-${c.cls}/${c.slug}`}
                      onClick={close}
                      className="block rounded-md px-2 py-1.5 text-sm font-medium text-navy hover:bg-ivory transition-colors"
                    >
                      {c.name}
                      <span className="ml-1.5 text-xs text-slate/50">
                        Class {c.cls}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {query.trim() === "" && recent.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate/60">
              Start typing a chapter name, class, or resource type — like
              &ldquo;kinematics&rdquo;, &ldquo;class 12&rdquo;, or &ldquo;formula
              sheet&rdquo;.
            </p>
          )}
          {query.trim() !== "" && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate/60">
              No chapters match &ldquo;{query}&rdquo;. Try a different search.
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {results.map((entry) => (
              <li key={entry.slug} className="rounded-md p-3 hover:bg-ivory">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <Link
                    href={`/class-${entry.cls}/${entry.slug}`}
                    onClick={close}
                    className="font-semibold text-navy hover:text-gold-deep transition-colors"
                  >
                    {entry.name}
                  </Link>
                  <span className="text-xs text-slate/60">
                    Class {entry.cls} &middot; {entry.subject}
                  </span>
                </div>
                {entry.resources.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {entry.resources.map((r) => (
                      <Link
                        key={r.key}
                        href={r.href}
                        onClick={close}
                        className="text-xs font-medium px-2 py-0.5 rounded-full border border-navy/15 text-navy/70 hover:border-gold hover:text-gold-deep transition-colors"
                      >
                        {r.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
