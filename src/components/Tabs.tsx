"use client";

import { useEffect, useState, type ReactNode } from "react";

export type TabDef = {
  key: string;
  label: string;
  content: ReactNode;
};

export default function Tabs({
  tabs,
  defaultKey,
}: {
  tabs: TabDef[];
  defaultKey?: string;
}) {
  const [active, setActive] = useState(defaultKey ?? tabs[0]?.key);
  // True when the page was opened via a direct link to one specific
  // resource (e.g. "View Practice Questions" from the NEET hub). In that
  // case we show ONLY that content — no tab bar — since the person already
  // chose what they wanted. They can still reveal the full tab bar below.
  const [focused, setFocused] = useState(false);

  // If the page was opened with a hash like #pyq (e.g. from a "View PYQ"
  // link on the NEET/JEE hub pages), jump straight to that tab instead of
  // always landing on the default tab. Hashes can also carry an exam filter
  // after a colon, e.g. #pyq:neet — only the part before the colon is the
  // tab key; PyqDisplay reads the filter part itself.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").split(":")[0];
    if (hash && tabs.some((t) => t.key === hash)) {
      setActive(hash);
      setFocused(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
      {focused ? (
        <button
          type="button"
          onClick={() => setFocused(false)}
          className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors mb-5 inline-flex items-center gap-1"
        >
          View all sections of this chapter
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14m0 0l-5-5m5 5l-5 5" />
          </svg>
        </button>
      ) : (
        <div
          role="tablist"
          aria-label="Chapter resources"
          className="flex gap-1 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={`shrink-0 px-4 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                active === tab.key
                  ? "bg-navy text-white"
                  : "text-navy/70 hover:bg-navy/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div role="tabpanel" className="mt-6">
        {activeTab?.content}
      </div>
    </div>
  );
}
