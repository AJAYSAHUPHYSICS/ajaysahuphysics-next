"use client";

import { useSyncExternalStore } from "react";
import {
  isBookmarked,
  makeBookmarkId,
  subscribeToBookmarks,
  toggleBookmark,
  type BookmarkType,
} from "@/lib/bookmarks";

const getServerSnapshot = () => false;

export default function BookmarkButton({
  cls,
  slug,
  type,
  chapterName,
  label,
  path,
  size = "md",
}: {
  cls: "11" | "12";
  slug: string;
  type: BookmarkType;
  chapterName: string;
  label: string;
  path: string;
  size?: "sm" | "md";
}) {
  const id = makeBookmarkId(cls, slug, type);
  const bookmarked = useSyncExternalStore(
    subscribeToBookmarks,
    () => isBookmarked(id),
    getServerSnapshot
  );

  const dims = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <button
      type="button"
      aria-pressed={bookmarked}
      aria-label={bookmarked ? `Remove ${label} bookmark` : `Bookmark ${label}`}
      onClick={() => toggleBookmark({ cls, slug, type, chapterName, label, path })}
      className={`inline-flex items-center justify-center ${dims} rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
        bookmarked
          ? "border-gold bg-gold/10 text-gold-deep"
          : "border-navy/15 text-navy/50 hover:border-gold hover:text-gold-deep"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
      </svg>
    </button>
  );
}
