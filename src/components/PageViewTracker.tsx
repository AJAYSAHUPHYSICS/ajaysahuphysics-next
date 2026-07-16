"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Fixes a real gap: GA4's base `gtag('config', ...)` call (see
 * Analytics.tsx) only fires a page_view on the very first script load.
 * Next.js App Router navigates client-side via <Link> for most of this
 * site's browsing (chapter → resource → related chapter, etc.), so
 * without this, the large majority of actual page views were never
 * being recorded at all.
 *
 * Renders nothing — just watches the pathname and fires a page_view
 * event on every change after the initial load (GA4's own config call
 * already covers that first one, so this skips it to avoid a duplicate).
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackEvent("page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}
