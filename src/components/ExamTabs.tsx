"use client";

import { useMemo, useState } from "react";
import ChapterGrid from "./ChapterGrid";
import { allChapters, type Chapter } from "@/lib/chapters";
import { notesRegistry } from "@/lib/notes";
import { dppRegistry } from "@/lib/dpp";
import { pyqRegistry } from "@/lib/pyq";

type TabKey = "jee-main" | "jee-advanced" | "neet";
type ClassFilter = "all" | "11" | "12";
type ResourceType = "notes" | "dpp" | "pyq";

const tabs: { key: TabKey; label: string }[] = [
  { key: "jee-main", label: "JEE Main" },
  { key: "jee-advanced", label: "JEE Advanced" },
  { key: "neet", label: "NEET" },
];

const classFilters: { key: ClassFilter; label: string }[] = [
  { key: "all", label: "All Classes" },
  { key: "11", label: "Class 11" },
  { key: "12", label: "Class 12" },
];

function isAvailableFor(
  resourceType: ResourceType,
  activeTab: TabKey,
  chapter: Chapter
): boolean {
  const slug = chapter.slug;
  if (resourceType === "notes") return !!notesRegistry[slug];
  if (resourceType === "dpp") return !!dppRegistry[slug];

  // resourceType === "pyq" — availability depends on which exam tab is active,
  // since PYQ is the one resource genuinely split by exam type.
  const pyq = pyqRegistry[slug];
  if (!pyq) return false;
  if (activeTab === "jee-main") {
    return pyq.questions.some((q) => q.examType === "jee-main");
  }
  if (activeTab === "jee-advanced") {
    return pyq.questions.some((q) => q.examType === "jee-advanced");
  }
  // NEET tab: available if there's at least one legacy (untagged) question —
  // every existing NEET/AIPMT/AIIMS question predates the examType field.
  return pyq.questions.some((q) => !q.examType);
}

export default function ExamTabs({
  resourceLabel,
  resourceType = "notes",
}: {
  resourceLabel: string;
  resourceType?: ResourceType;
}) {
  const [active, setActive] = useState<TabKey>("jee-main");
  const [classFilter, setClassFilter] = useState<ClassFilter>("all");
  const [query, setQuery] = useState("");

  // JEE Main, JEE Advanced, and NEET all draw from the same NCERT Class 11 + 12
  // physics syllabus — JEE Advanced has no separate chapter list, only harder
  // questions on the same chapters. So all three tabs show allChapters; only
  // which chapters are AVAILABLE (linkable) for the selected resource differs.
  const visibleChapters = useMemo(() => {
    return allChapters
      .filter((ch) => classFilter === "all" || ch.cls === classFilter)
      .filter((ch) =>
        query.trim() === ""
          ? true
          : ch.name.toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [classFilter, query]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
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

      {active === "jee-advanced" && (
        <p className="text-sm text-slate/70 mb-5 max-w-xl">
          JEE Advanced draws from the same Class 11 &amp; 12 syllabus as JEE
          Main — it tests these chapters with harder, multi-concept
          questions rather than a separate topic list.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters..."
            aria-label="Search chapters"
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-navy/15 text-sm text-navy placeholder:text-navy/40 focus:outline-2 focus:outline-gold bg-white"
          />
        </div>

        <div className="flex gap-2">
          {classFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setClassFilter(f.key)}
              className={`px-3.5 py-2 rounded-md text-sm font-semibold border transition-colors ${
                classFilter === f.key
                  ? "bg-navy/5 border-navy text-navy"
                  : "border-navy/15 text-navy/60 hover:border-gold hover:text-gold-deep"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visibleChapters.length > 0 ? (
        <ChapterGrid
          chapters={visibleChapters}
          resourceLabel={resourceLabel}
          isAvailable={(ch) => isAvailableFor(resourceType, active, ch)}
        />
      ) : (
        <div className="rounded-lg border border-dashed border-navy/15 bg-white p-10 text-center">
          <p className="text-slate">
            No chapters match &ldquo;{query}&rdquo;. Try a different search
            term or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
}
