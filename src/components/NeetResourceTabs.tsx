"use client";

import { useMemo, useState } from "react";
import ChapterGrid from "./ChapterGrid";
import { allChapters, type Chapter } from "@/lib/chapters";
import { notesRegistry } from "@/lib/notes";
import { dppRegistry } from "@/lib/dpp";
import { pyqRegistry } from "@/lib/pyq";

type ResourceKey = "notes" | "formula-sheet" | "dpp" | "pyq";
type ClassFilter = "all" | "11" | "12";

const resourceTabs: { key: ResourceKey; label: string }[] = [
  { key: "notes", label: "Notes" },
  { key: "formula-sheet", label: "Formula Sheet" },
  { key: "dpp", label: "DPP" },
  { key: "pyq", label: "PYQ" },
];

const classFilters: { key: ClassFilter; label: string }[] = [
  { key: "all", label: "All Classes" },
  { key: "11", label: "Class 11" },
  { key: "12", label: "Class 12" },
];

function isAvailable(resource: ResourceKey, chapter: Chapter): boolean {
  const slug = chapter.slug;
  if (resource === "notes") return !!notesRegistry[slug];
  if (resource === "dpp") return !!dppRegistry[slug];
  if (resource === "formula-sheet") return false; // not built yet for any chapter on the site

  // PYQ on the NEET page specifically means: does this chapter have at least
  // one NEET/AIPMT/AIIMS-style (untagged) question? JEE-only chapters with
  // exclusively jee-main/jee-advanced tagged questions correctly stay unavailable here.
  const pyq = pyqRegistry[slug];
  if (!pyq) return false;
  return pyq.questions.some((q) => !q.examType);
}

export default function NeetResourceTabs() {
  const [active, setActive] = useState<ResourceKey>("notes");
  const [classFilter, setClassFilter] = useState<ClassFilter>("all");
  const [query, setQuery] = useState("");

  const visibleChapters = useMemo(() => {
    return allChapters
      .filter((ch) => classFilter === "all" || ch.cls === classFilter)
      .filter((ch) =>
        query.trim() === ""
          ? true
          : ch.name.toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [classFilter, query]);

  const activeLabel = resourceTabs.find((t) => t.key === active)?.label ?? "Resources";

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {resourceTabs.map((tab) => (
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

      {active === "formula-sheet" && (
        <p className="text-sm text-slate/70 mb-5 max-w-xl">
          Formula sheets are being prepared chapter by chapter — message Ajay
          Sir on WhatsApp from any chapter card below to get notified.
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
          resourceLabel={activeLabel}
          isAvailable={(ch) => isAvailable(active, ch)}
          tabKey={active}
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
