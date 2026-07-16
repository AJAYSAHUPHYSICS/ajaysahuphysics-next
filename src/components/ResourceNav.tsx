"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export type ResourceNavItem = {
  key: string;
  label: string;
  /** Real URL for this resource, or null if it doesn't exist yet
   * (rendered as a disabled "coming soon" pill instead of a link). */
  href: string | null;
};

function normalize(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export default function ResourceNav({ items }: { items: ResourceNavItem[] }) {
  const pathname = usePathname();
  const current = normalize(pathname ?? "");

  return (
    <div
      role="tablist"
      aria-label="Chapter resources"
      className="flex gap-1 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none"
    >
      {items.map((item) => {
        if (!item.href) {
          return (
            <span
              key={item.key}
              aria-disabled="true"
              title="Coming soon"
              className="shrink-0 px-4 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap text-navy/30 cursor-not-allowed"
            >
              {item.label}
            </span>
          );
        }

        const isActive = normalize(item.href) === current;

        return (
          <Link
            key={item.key}
            href={item.href}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              if (!isActive) {
                trackEvent("select_content", {
                  content_type: item.key,
                  item_id: current,
                });
              }
            }}
            className={`shrink-0 px-4 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
              isActive ? "bg-navy text-white" : "text-navy/70 hover:bg-navy/5"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
