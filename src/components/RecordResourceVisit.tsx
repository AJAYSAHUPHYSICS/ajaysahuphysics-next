"use client";

import { useEffect } from "react";
import { recordResourceVisit } from "@/lib/recently-viewed-resources";

/** Renders nothing — records this resource as visited (for Smart
 * Recommendations) and counts it as study-streak activity. Kept as
 * its own tiny client component so the resource `page.tsx` files stay
 * server components, same rationale as RecordChapterVisit.tsx. */
export default function RecordResourceVisit({
  cls,
  slug,
  resourceKey,
  chapterName,
  resourceLabel,
  path,
}: {
  cls: "11" | "12";
  slug: string;
  resourceKey: string;
  chapterName: string;
  resourceLabel: string;
  path: string;
}) {
  useEffect(() => {
    recordResourceVisit({ cls, slug, resourceKey, chapterName, resourceLabel, path });
  }, [cls, slug, resourceKey, chapterName, resourceLabel, path]);

  return null;
}
