"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getBookmarks, subscribeToBookmarks, type Bookmark } from "@/lib/bookmarks";

const EMPTY: Bookmark[] = [];
const getServerSnapshot = () => EMPTY;

/** Renders nothing for visitors with no bookmarks yet — zero visual
 * change to the homepage in that case, same convention as
 * ContinueLearning.tsx. */
export default function BookmarkedResources() {
  const bookmarks = useSyncExternalStore(subscribeToBookmarks, getBookmarks, getServerSnapshot);

  if (bookmarks.length === 0) return null;

  const shown = bookmarks.slice(0, 6);

  return (
    <section className="bg-ivory border-b border-navy/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl text-navy">Bookmarked Resources</h2>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {shown.map((b) => (
            <Link
              key={b.id}
              href={b.path}
              className="group flex flex-col rounded-lg border border-navy/10 bg-white p-4 hover:border-gold hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate/50">
                {b.type === "chapter" ? "Chapter" : b.chapterName}
              </span>
              <span className="mt-1 font-semibold text-navy group-hover:text-gold-deep transition-colors">
                {b.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
