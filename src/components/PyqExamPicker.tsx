"use client";

import { useMemo, useState } from "react";
import ChapterGrid from "./ChapterGrid";
import { allChapters, type Chapter } from "@/lib/chapters";
import { hasPyqFor } from "@/lib/pyq/availability";

type ExamChoice = "neet" | "jee-main" | "jee-advanced" | null;
type ClassFilter = "all" | "11" | "12";

const exams: { key: Exclude<ExamChoice, null>; label: string; desc: string }[] = [
  {
    key: "neet",
    label: "NEET",
    desc: "Real questions previously asked in NEET/AIPMT exams, chapter by chapter.",
  },
  {
    key: "jee-main",
    label: "JEE Main",
    desc: "Previous year JEE Main questions, organized chapter by chapter.",
  },
  {
    key: "jee-advanced",
    label: "JEE Advanced",
    desc: "Previous year JEE Advanced questions — harder, multi-concept problems.",
  },
];

const classFilters: { key: ClassFilter; label: string }[] = [
  { key: "all", label: "All Classes" },
  { key: "11", label: "Class 11" },
  { key: "12", label: "Class 12" },
];

function isAvailable(exam: Exclude<ExamChoice, null>, chapter: Chapter): boolean {
  return hasPyqFor(chapter.slug, exam);
}

export default function PyqExamPicker() {
  const [choice, setChoice] = useState<ExamChoice>(null);
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

  const activeExam = exams.find((e) => e.key === choice);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {exams.map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => setChoice(e.key)}
            className={`text-left rounded-lg border p-7 transition-all ${
              choice === e.key
                ? "border-navy bg-navy text-white shadow-lg"
                : "border-navy/10 bg-white hover:border-gold hover:shadow-lg"
            }`}
          >
            <h3
              className={`font-display text-2xl ${
                choice === e.key ? "text-white" : "text-navy"
              }`}
            >
              {e.label}
            </h3>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                choice === e.key ? "text-white/80" : "text-slate"
              }`}
            >
              {e.desc}
            </p>
          </button>
        ))}
      </div>

      {activeExam && (
        <div>
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl text-navy mb-8">
            {activeExam.label} PYQs
          </h2>

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
              resourceLabel={`${activeExam.label} PYQs`}
              isAvailable={(ch) => isAvailable(activeExam.key, ch)}
              tabKey={`pyq:${activeExam.key}`}
            />
          ) : (
            <div className="rounded-lg border border-dashed border-navy/15 bg-white p-10 text-center">
              <p className="text-slate">
                No chapters match &ldquo;{query}&rdquo;. Try a different
                search term or clear the filters.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
