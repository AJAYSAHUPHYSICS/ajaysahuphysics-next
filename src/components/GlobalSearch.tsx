"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { searchIndex, type SearchEntry } from "@/lib/search-index";
import { getRecentlyViewed, type RecentChapter } from "@/lib/recently-viewed";
import { trackEvent } from "@/lib/analytics";
import { matchQuery } from "@/lib/fuzzy-match";

/** Renders `text` with `ranges` ([start, end) into `text`) wrapped in
 * <mark> for search-match highlighting. Ranges must be pre-merged and
 * sorted (matchQuery already guarantees this). */
function highlightRanges(text: string, ranges: [number, number][]) {
  if (ranges.length === 0) return text;
  const parts: ReactNode[] = [];
  let last = 0;
  ranges.forEach(([start, end], i) => {
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <mark key={i} className="bg-gold/30 text-navy rounded-sm">
        {text.slice(start, end)}
      </mark>
    );
    last = end;
  });
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Unifies the two mutually-exclusive lists the dialog can show (recent
 * chapters when the query is empty, search results once typing starts)
 * into one shape so arrow-key navigation, Home/End, Enter, and hover
 * work identically against whichever list is currently visible. */
type NavItem =
  | { type: "recent"; key: string; chapter: RecentChapter }
  | {
      type: "result";
      key: string;
      entry: SearchEntry;
      nameRanges: [number, number][];
    };

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
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<RecentChapter[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setQuery("");
    setRecent(getRecentlyViewed());
    setIsOpen(true);
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
    const scored: { entry: SearchEntry; score: number; nameRanges: [number, number][] }[] = [];
    for (const entry of searchIndex) {
      const name = entry.name.toLowerCase();
      const nameMatch = matchQuery(name, q);

      // Matches on slug/subject/class/resource labels still surface the
      // chapter (e.g. searching "dpp"), just ranked below any name match —
      // same behavior as before, now typo-tolerant on each field too.
      const otherFields = [
        entry.slug,
        entry.subject.toLowerCase(),
        `class ${entry.cls}`,
        entry.cls,
        ...entry.resources.map((r) => r.label.toLowerCase()),
      ];
      const otherMatch = otherFields.some((f) => matchQuery(f, q).matched);

      if (nameMatch.matched || otherMatch) {
        const score = nameMatch.matched ? nameMatch.score : 0;
        scored.push({
          entry,
          score,
          nameRanges: nameMatch.matched ? nameMatch.ranges : [],
        });
      }
    }
    return scored
      .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name))
      .slice(0, 20);
  }, [query]);

  // Whichever list is actually on screen right now — recent chapters
  // (empty query) or search results (typing) — unified so keyboard nav
  // doesn't need to know which one it's driving.
  const navItems: NavItem[] = useMemo(() => {
    if (query.trim() === "") {
      return recent.map((c) => ({ type: "recent" as const, key: c.slug, chapter: c }));
    }
    return results.map(({ entry, nameRanges }) => ({
      type: "result" as const,
      key: entry.slug,
      entry,
      nameRanges,
    }));
  }, [query, recent, results]);

  // Selection always snaps to the first item (or none) whenever the
  // visible list changes — covers "dialog just opened", "typed a new
  // character", and "recent list loaded" in one place, since all three
  // produce a new navItems array. Adjusted directly during render
  // (React's documented pattern for this) rather than in a useEffect,
  // which would cause an extra visible render pass.
  const [prevNavItems, setPrevNavItems] = useState(navItems);
  if (prevNavItems !== navItems) {
    setPrevNavItems(navItems);
    setActiveIndex(navItems.length > 0 ? 0 : -1);
  }

  // Keep the active item scrolled into view as selection moves via
  // keyboard, so results below the fold are reachable without a mouse.
  useEffect(() => {
    if (activeIndex < 0) return;
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function onInputKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (navItems.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % navItems.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + navItems.length) % navItems.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(navItems.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          // Click the item's own <Link>, so navigation and the existing
          // onClick={close} behavior both fire exactly as they do on a
          // real mouse click — no separate navigation path to maintain.
          itemRefs.current[activeIndex]
            ?.querySelector<HTMLAnchorElement>("a")
            ?.click();
        }
        break;
      // Esc is intentionally not handled here — the native <dialog>
      // already closes on Escape (fires cancel -> close), which the
      // existing onClose handler below already resets query for.
    }
  }

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
        onClose={() => {
          setQuery("");
          setIsOpen(false);
        }}
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
            onKeyDown={onInputKeyDown}
            placeholder="Search chapters, notes, DPP, PYQ…"
            aria-label="Search query"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="global-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `global-search-option-${activeIndex}` : undefined
            }
            autoComplete="off"
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

        <div
          id="global-search-listbox"
          role="listbox"
          aria-label="Search results"
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {query.trim() === "" && recent.length > 0 && (
            <div className="px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate/50 mb-2">
                Recently viewed
              </p>
              <ul className="flex flex-col gap-1">
                {recent.map((c, i) => (
                  <li
                    key={c.slug}
                    id={`global-search-option-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                      return () => {
                        itemRefs.current[i] = null;
                      };
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`rounded-md border-l-4 transition-colors ${
                      i === activeIndex
                        ? "bg-ivory border-gold"
                        : "border-transparent"
                    }`}
                  >
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
            {results.map(({ entry, nameRanges }, i) => (
              <li
                key={entry.slug}
                id={`global-search-option-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                ref={(el) => {
                  itemRefs.current[i] = el;
                  return () => {
                    itemRefs.current[i] = null;
                  };
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`rounded-md p-3 border-l-4 transition-colors ${
                  i === activeIndex
                    ? "bg-ivory border-gold"
                    : "border-transparent hover:bg-ivory"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <Link
                    href={`/class-${entry.cls}/${entry.slug}`}
                    onClick={close}
                    className="font-semibold text-navy hover:text-gold-deep transition-colors"
                  >
                    {highlightRanges(entry.name, nameRanges)}
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
