"use client";

import { useState } from "react";
import SingleExamResourceTabs from "./SingleExamResourceTabs";

type Choice = "jee-main" | "jee-advanced" | null;

export default function JeeMainAdvancedPicker({
  lockedClass,
}: {
  lockedClass?: "11" | "12";
}) {
  const [choice, setChoice] = useState<Choice>(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <button
          type="button"
          onClick={() => setChoice("jee-main")}
          aria-pressed={choice === "jee-main"}
          className={`text-left rounded-lg border p-7 transition-all focus-visible:outline-2 focus-visible:outline-gold ${
            choice === "jee-main"
              ? "border-navy bg-navy text-white shadow-lg"
              : "border-navy/10 bg-white hover:border-gold hover:shadow-lg"
          }`}
        >
          <span
            className={`block font-display text-2xl ${
              choice === "jee-main" ? "text-white" : "text-navy"
            }`}
          >
            JEE Main
          </span>
          <span
            className={`block mt-3 text-sm leading-relaxed ${
              choice === "jee-main" ? "text-white/80" : "text-slate"
            }`}
          >
            Speed and accuracy across the full Class 11 and 12 syllabus.
            Resources are being rebuilt and appear as they&apos;re reviewed.
          </span>
        </button>

        <button
          type="button"
          onClick={() => setChoice("jee-advanced")}
          aria-pressed={choice === "jee-advanced"}
          className={`text-left rounded-lg border p-7 transition-all focus-visible:outline-2 focus-visible:outline-gold ${
            choice === "jee-advanced"
              ? "border-navy bg-navy text-white shadow-lg"
              : "border-navy/10 bg-white hover:border-gold hover:shadow-lg"
          }`}
        >
          <span
            className={`block font-display text-2xl ${
              choice === "jee-advanced" ? "text-white" : "text-navy"
            }`}
          >
            JEE Advanced
          </span>
          <span
            className={`block mt-3 text-sm leading-relaxed ${
              choice === "jee-advanced" ? "text-white/80" : "text-slate"
            }`}
          >
            Multi-concept problem solving for the trickier, higher-weightage
            Advanced topics. Resources are being rebuilt.
          </span>
        </button>
      </div>

      {choice === "jee-main" && (
        <div>
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl text-navy mb-8">
            JEE Main Resources{lockedClass ? ` — Class ${lockedClass}` : ""}
          </h2>
          <SingleExamResourceTabs
            examFilter="jee-main"
            pyqLabel="JEE Main PYQ"
            lockedClass={lockedClass}
          />
        </div>
      )}

      {choice === "jee-advanced" && (
        <div>
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl text-navy mb-8">
            JEE Advanced Resources{lockedClass ? ` — Class ${lockedClass}` : ""}
          </h2>
          <SingleExamResourceTabs
            examFilter="jee-advanced"
            pyqLabel="JEE Advanced PYQ"
            lockedClass={lockedClass}
          />
        </div>
      )}
    </div>
  );
}
