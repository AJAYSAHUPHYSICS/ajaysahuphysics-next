"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { searchIndex, type SearchEntry } from "@/lib/search-index";
import { trackEvent } from "@/lib/analytics";
import { matchQuery } from "@/lib/fuzzy-match";
import {
  getRecentSearches,
  subscribeToRecentSearches,
  recordRecentSearch,
} from "@/lib/recent-searches";
import { getPopularResources, type PopularItem } from "@/lib/popular-resources";

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

/** Small stroke icons for result-card hierarchy — same visual language
 * (currentColor, 2px stroke) as the search/close icons already in this
 * file. Chosen per resource-type key; falls back to a generic document
 * icon for any type not explicitly listed. */
function ResourceTypeIcon({ resourceKey, className }: { resourceKey: string; className?: string }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (resourceKey) {
    case "dpp":
      return (
        <svg {...common}>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case "pyq":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "formula-sheet":
      return (
        <svg {...common}>
          <path d="M18 4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10" />
          <path d="M8 4c-2 3-2 13 0 16" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M14 3v5h5" />
          <path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        </svg>
      );
  }
}

function ChapterIcon({ className }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

/** Resource-type filter options. Deliberately limited to the four types
 * requested — Short Notes / JEE Notes / JEE DPP also exist in the index
 * but weren't asked for; add them here if that scope changes. Every key
 * below is a real `resources[].key` value already produced by
 * search-index.ts, so this never invents data the index doesn't have. */
const RESOURCE_TYPE_OPTIONS: { key: string; label: string }[] = [
  { key: "notes", label: "Notes" },
  { key: "formula-sheet", label: "Formula Sheet" },
  { key: "dpp", label: "DPP" },
  { key: "pyq", label: "PYQ" },
];

/** Chapter filter options — derived once from the existing searchIndex
 * (not recomputed per render, and the index itself isn't rebuilt). No
 * "topic" field exists anywhere in SearchEntry, so a Topic filter isn't
 * implemented — adding one would mean inventing data that doesn't exist. */
const CHAPTER_OPTIONS = searchIndex
  .map((e) => ({ optionKey: `${e.cls}:${e.slug}`, cls: e.cls, name: e.name }))
  .sort((a, b) => (a.cls === b.cls ? a.name.localeCompare(b.name) : a.cls.localeCompare(b.cls)));

const EMPTY_RECENT_SEARCHES: string[] = [];

/** Unifies every list the dialog can show — recent searches and popular
 * resources on the empty state, search results once typing/filtering
 * starts — into one shape so arrow-key navigation, Home/End, Enter, and
 * hover work identically no matter which list is currently visible. */
type NavItem =
  | { type: "recent-search"; key: string; queryText: string }
  | { type: "popular"; key: string; item: PopularItem }
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
  const [popular, setPopular] = useState<{ items: PopularItem[]; source: "history" | "derived" }>(
    { items: [], source: "derived" }
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<Set<"11" | "12">>(new Set());
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<Set<string>>(new Set());
  const [selectedChapters, setSelectedChapters] = useState<Set<string>>(new Set());

  // Reactive (not read-once-on-open like `popular` below) so a search
  // executed just now shows up immediately if the student clears the
  // query and looks at the empty state again in the same session.
  // getRecentSearches is stable-cached, so this is safe against the
  // useSyncExternalStore infinite-render issue every other ATLAS
  // snapshot function in this codebase already guards against.
  const recentSearches = useSyncExternalStore(
    subscribeToRecentSearches,
    getRecentSearches,
    () => EMPTY_RECENT_SEARCHES
  );

  function toggleClass(cls: "11" | "12") {
    setSelectedClasses((prev) => {
      const next = new Set(prev);
      if (next.has(cls)) next.delete(cls);
      else next.add(cls);
      return next;
    });
  }
  function toggleResourceType(key: string) {
    setSelectedResourceTypes((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }
  function toggleChapter(optionKey: string) {
    setSelectedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(optionKey)) next.delete(optionKey);
      else next.add(optionKey);
      return next;
    });
  }
  function clearAllFilters() {
    setSelectedClasses(new Set());
    setSelectedResourceTypes(new Set());
    setSelectedChapters(new Set());
  }
  const filtersActive =
    selectedClasses.size > 0 || selectedResourceTypes.size > 0 || selectedChapters.size > 0;

  const open = () => {
    setQuery("");
    setPopular(getPopularResources(6));
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

  // Facet filtering runs independently of the query, memoized on the
  // filter selections only — this is the "narrow without a query" path.
  // Never touches/rebuilds searchIndex itself, just filters the existing
  // array reference.
  const filteredByFacets = useMemo(() => {
    if (!filtersActive) return searchIndex;
    return searchIndex.filter((entry) => {
      if (selectedClasses.size > 0 && !selectedClasses.has(entry.cls)) return false;
      if (selectedChapters.size > 0 && !selectedChapters.has(`${entry.cls}:${entry.slug}`))
        return false;
      if (selectedResourceTypes.size > 0) {
        const entryResourceKeys = new Set(entry.resources.map((r) => r.key));
        const matchesAny = [...selectedResourceTypes].some((rt) => entryResourceKeys.has(rt));
        if (!matchesAny) return false;
      }
      return true;
    });
  }, [selectedClasses, selectedResourceTypes, selectedChapters, filtersActive]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !filtersActive) return [];

    const scored: { entry: SearchEntry; score: number; nameRanges: [number, number][] }[] = [];
    for (const entry of filteredByFacets) {
      if (!q) {
        // Pure filter-browse: no query to score against, just list what
        // matches the filters (alphabetical, via the sort's tiebreak below).
        scored.push({ entry, score: 0, nameRanges: [] });
        continue;
      }

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
    return scored.sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name));
  }, [query, filteredByFacets, filtersActive]);

  // True whenever the dialog should be in "results" mode (search results
  // or a filtered browse list) rather than the default recent/placeholder
  // state — the query alone no longer decides this once filters exist.
  const showResultsMode = query.trim() !== "" || filtersActive;

  // Whichever list is actually on screen right now — recent chapters
  // (empty query) or search results (typing) — unified so keyboard nav
  // doesn't need to know which one it's driving.
  const navItems: NavItem[] = useMemo(() => {
    if (!showResultsMode) {
      return [
        ...recentSearches.map((q) => ({
          type: "recent-search" as const,
          key: `rs-${q}`,
          queryText: q,
        })),
        ...popular.items.map((p) => ({ type: "popular" as const, key: p.key, item: p })),
      ];
    }
    return results.map(({ entry, nameRanges }) => ({
      type: "result" as const,
      key: entry.slug,
      entry,
      nameRanges,
    }));
  }, [showResultsMode, recentSearches, popular, results]);

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
        if (activeIndex < 0) break;
        {
          const active = navItems[activeIndex];
          if (active.type === "recent-search") {
            // Reruns the search — populate the query, stay in the dialog,
            // matching what clicking the same item does with the mouse.
            setQuery(active.queryText);
          } else {
            // Click the item's own <Link>, so navigation and the existing
            // onClick={close} behavior both fire exactly as they do on a
            // real mouse click — no separate navigation path to maintain.
            itemRefs.current[activeIndex]
              ?.querySelector<HTMLAnchorElement>("a")
              ?.click();
          }
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
      recordRecentSearch(q);
    }, 500);
    return () => clearTimeout(timer);
  }, [query, results.length]);

  // Active filter chips, built fresh each render from current selections —
  // cheap (at most ~3 small Sets) and keeps chip labels in sync with the
  // same option constants the dropdowns use, with no separate source of truth.
  const filterChips: { key: string; label: string; onRemove: () => void }[] = [
    ...[...selectedClasses].map((c) => ({
      key: `cls-${c}`,
      label: `Class ${c}`,
      onRemove: () => toggleClass(c),
    })),
    ...[...selectedResourceTypes].map((rt) => ({
      key: `rt-${rt}`,
      label: RESOURCE_TYPE_OPTIONS.find((o) => o.key === rt)?.label ?? rt,
      onRemove: () => toggleResourceType(rt),
    })),
    ...[...selectedChapters].map((ck) => ({
      key: `ch-${ck}`,
      label: CHAPTER_OPTIONS.find((o) => o.optionKey === ck)?.name ?? ck,
      onRemove: () => toggleChapter(ck),
    })),
  ];

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
          role="group"
          aria-label="Search filters"
          className="flex flex-wrap items-center gap-1.5 border-b border-navy/10 px-3 py-2"
        >
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-md border border-navy/15 px-2.5 py-1 text-xs font-medium text-slate hover:border-gold hover:text-gold-deep">
              Class
            </summary>
            <div
              role="group"
              aria-label="Filter by class"
              className="absolute z-10 mt-1 w-32 rounded-md border border-navy/10 bg-white p-1.5 shadow-lg"
            >
              {(["11", "12"] as const).map((c) => (
                <label
                  key={c}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm text-navy hover:bg-ivory"
                >
                  <input
                    type="checkbox"
                    checked={selectedClasses.has(c)}
                    onChange={() => toggleClass(c)}
                  />
                  Class {c}
                </label>
              ))}
            </div>
          </details>

          <details className="relative">
            <summary className="cursor-pointer list-none rounded-md border border-navy/15 px-2.5 py-1 text-xs font-medium text-slate hover:border-gold hover:text-gold-deep">
              Resource Type
            </summary>
            <div
              role="group"
              aria-label="Filter by resource type"
              className="absolute z-10 mt-1 w-44 rounded-md border border-navy/10 bg-white p-1.5 shadow-lg"
            >
              {RESOURCE_TYPE_OPTIONS.map((r) => (
                <label
                  key={r.key}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm text-navy hover:bg-ivory"
                >
                  <input
                    type="checkbox"
                    checked={selectedResourceTypes.has(r.key)}
                    onChange={() => toggleResourceType(r.key)}
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </details>

          <details className="relative">
            <summary className="cursor-pointer list-none rounded-md border border-navy/15 px-2.5 py-1 text-xs font-medium text-slate hover:border-gold hover:text-gold-deep">
              Chapter
            </summary>
            <div
              role="group"
              aria-label="Filter by chapter"
              className="absolute z-10 mt-1 max-h-72 w-64 overflow-y-auto rounded-md border border-navy/10 bg-white p-1.5 shadow-lg"
            >
              {(["11", "12"] as const).map((cls) => (
                <div key={cls}>
                  <p className="px-2 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate/50">
                    Class {cls}
                  </p>
                  {CHAPTER_OPTIONS.filter((c) => c.cls === cls).map((c) => (
                    <label
                      key={c.optionKey}
                      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm text-navy hover:bg-ivory"
                    >
                      <input
                        type="checkbox"
                        checked={selectedChapters.has(c.optionKey)}
                        onChange={() => toggleChapter(c.optionKey)}
                      />
                      {c.name}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </details>

          {filterChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.onRemove}
              aria-label={`Remove ${chip.label} filter`}
              className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold-deep hover:bg-gold/20"
            >
              {chip.label}
              <span aria-hidden="true">&times;</span>
            </button>
          ))}

          {filterChips.length > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              aria-label="Clear all filters"
              className="text-xs font-semibold text-slate/60 underline-offset-2 hover:text-navy hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div
          id="global-search-listbox"
          role="listbox"
          aria-label="Search results"
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {!showResultsMode && recentSearches.length > 0 && (
            <div className="px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate/50 mb-2">
                Recent Searches
              </p>
              <ul className="flex flex-col gap-1">
                {recentSearches.map((q, i) => (
                  <li
                    key={`rs-${q}`}
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
                      i === activeIndex ? "bg-ivory border-gold" : "border-transparent"
                    }`}
                  >
                    {/* Reruns the search — stays open, unlike result/popular
                        links which navigate and close. */}
                    <button
                      type="button"
                      onClick={() => setQuery(q)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-navy hover:bg-ivory transition-colors"
                    >
                      <ClockIcon className="shrink-0 text-slate/40" />
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!showResultsMode && popular.items.length > 0 && (
            <div className="px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate/50 mb-2">
                {popular.source === "history" ? "Frequently Visited" : "Popular Resources"}
              </p>
              <ul className="flex flex-col gap-1">
                {popular.items.map((p, localI) => {
                  const i = recentSearches.length + localI;
                  return (
                    <li
                      key={p.key}
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
                        i === activeIndex ? "bg-ivory border-gold" : "border-transparent"
                      }`}
                    >
                      <Link
                        href={p.path}
                        onClick={close}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-ivory transition-colors"
                      >
                        <ChapterIcon className="shrink-0 text-slate/40" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-navy">
                            {p.title}
                          </span>
                          <span className="block truncate text-xs text-slate/50">
                            {p.subtitle}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {!showResultsMode && recentSearches.length === 0 && popular.items.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate/60">
              Start typing a chapter name, class, or resource type — like
              &ldquo;kinematics&rdquo;, &ldquo;class 12&rdquo;, or &ldquo;formula
              sheet&rdquo;.
            </p>
          )}
          {showResultsMode && (
            <p className="px-3 pt-1 pb-2 text-xs font-medium text-slate/50" aria-live="polite">
              {results.length === 0
                ? "No results"
                : `${results.length} ${results.length === 1 ? "result" : "results"}`}
            </p>
          )}
          {showResultsMode && results.length === 0 && (
            <p className="px-3 pb-6 text-center text-sm text-slate/60">
              {query.trim() !== ""
                ? <>No chapters match &ldquo;{query}&rdquo;. Try a different search.</>
                : "No chapters match the selected filters."}
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
                <div className="flex items-start gap-2">
                  <ChapterIcon className="mt-0.5 shrink-0 text-slate/40" />
                  <div className="min-w-0 flex-1">
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
                            className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border border-navy/15 text-navy/70 hover:border-gold hover:text-gold-deep transition-colors"
                          >
                            <ResourceTypeIcon resourceKey={r.key} />
                            {r.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
