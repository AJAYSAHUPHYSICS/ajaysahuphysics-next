"use client";

import { useEffect } from "react";
import { recordChapterVisit } from "@/lib/recently-viewed";

/**
 * Renders nothing — just records this chapter as visited, in
 * localStorage, on mount. Kept as its own tiny component (rather than
 * inlined into the page) so the chapter overview `page.tsx` files stay
 * server components; this is the only client boundary this feature needs.
 */
export default function RecordChapterVisit({
  slug,
  cls,
  name,
}: {
  slug: string;
  cls: "11" | "12";
  name: string;
}) {
  useEffect(() => {
    recordChapterVisit({ slug, cls, name });
  }, [slug, cls, name]);

  return null;
}
