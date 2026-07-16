"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getRecentlyViewed, type RecentChapter } from "@/lib/recently-viewed";

const EMPTY: RecentChapter[] = [];
// localStorage doesn't fire same-tab change events we need to react to here —
// this component only needs the value once, on mount, so subscribe is a no-op.
const subscribe = () => () => {};
const getServerSnapshot = () => EMPTY;

/**
 * Renders nothing for first-time visitors (no localStorage data yet) —
 * zero visual change to the homepage in that case. For returning
 * visitors, shows a compact "continue where you left off" strip.
 *
 * Uses useSyncExternalStore (React's built-in hook for reading external,
 * mutable sources like localStorage) rather than useEffect+setState, so
 * the server snapshot (empty) and client snapshot are both handled
 * correctly with no hydration mismatch.
 */
export default function ContinueLearning() {
  const recent = useSyncExternalStore(subscribe, getRecentlyViewed, getServerSnapshot);

  if (recent.length === 0) return null;

  const [latest, ...rest] = recent;

  return (
    <section className="bg-white border-b border-navy/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate/50">
              Continue learning
            </span>
            <Link
              href={`/class-${latest.cls}/${latest.slug}`}
              className="font-semibold text-navy hover:text-gold-deep transition-colors"
            >
              {latest.name}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          {rest.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {rest.map((c) => (
                <Link
                  key={c.slug}
                  href={`/class-${c.cls}/${c.slug}`}
                  className="text-xs font-medium px-2.5 py-1 rounded-full border border-navy/15 text-navy/70 hover:border-gold hover:text-gold-deep transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
