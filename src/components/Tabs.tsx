"use client";

import { useState, type ReactNode } from "react";

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
  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
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

      <div role="tabpanel" className="mt-6">
        {activeTab?.content}
      </div>
    </div>
  );
}
