"use client";

import { useState } from "react";
import ChapterGrid from "./ChapterGrid";
import {
  allChapters,
  jeeAdvancedTopics,
} from "@/lib/chapters";

type TabKey = "jee-main" | "jee-advanced" | "neet";

const tabs: { key: TabKey; label: string }[] = [
  { key: "jee-main", label: "JEE Main" },
  { key: "jee-advanced", label: "JEE Advanced" },
  { key: "neet", label: "NEET" },
];

export default function ExamTabs({ resourceLabel }: { resourceLabel: string }) {
  const [active, setActive] = useState<TabKey>("jee-main");

  const chaptersForTab =
    active === "jee-advanced" ? jeeAdvancedTopics : allChapters;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              active === tab.key
                ? "bg-navy text-white border-navy"
                : "border-navy/15 text-navy/70 hover:border-gold hover:text-gold-deep"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ChapterGrid chapters={chaptersForTab} resourceLabel={resourceLabel} />
    </div>
  );
}
