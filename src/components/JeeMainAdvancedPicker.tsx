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
          className={`text-left rounded-lg border p-7 transition-all ${
            choice === "jee-main"
              ? "border-navy bg-navy text-white shadow-lg"
              : "border-navy/10 bg-white hover:border-gold hover:shadow-lg"
          }`}
        >
          <h3
            className={`font-display text-2xl ${
              choice === "jee-main" ? "text-white" : "text-navy"
            }`}
          >
            JEE Main
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              choice === "jee-main" ? "text-white/80" : "text-slate"
            }`}
          >
            Build speed and accuracy with focused practice and previous year
            patterns.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setChoice("jee-advanced")}
          className={`text-left rounded-lg border p-7 transition-all ${
            choice === "jee-advanced"
              ? "border-navy bg-navy text-white shadow-lg"
              : "border-navy/10 bg-white hover:border-gold hover:shadow-lg"
          }`}
        >
          <h3
            className={`font-display text-2xl ${
              choice === "jee-advanced" ? "text-white" : "text-navy"
            }`}
          >
            JEE Advanced
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              choice === "jee-advanced" ? "text-white/80" : "text-slate"
            }`}
          >
            Sharpen multi-concept problem solving for the trickier,
            higher-weightage Advanced topics.
          </p>
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
