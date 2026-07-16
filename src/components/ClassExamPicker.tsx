"use client";

import { useState } from "react";
import NeetResourceTabs from "./NeetResourceTabs";
import JeeMainAdvancedPicker from "./JeeMainAdvancedPicker";

type ExamChoice = "neet" | "jee" | null;

export default function ClassExamPicker({ cls }: { cls: "11" | "12" }) {
  const [choice, setChoice] = useState<ExamChoice>(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <button
          type="button"
          onClick={() => setChoice("neet")}
          className={`text-left rounded-lg border p-7 transition-all focus-visible:outline-2 focus-visible:outline-gold ${
            choice === "neet"
              ? "border-navy bg-navy text-white shadow-lg"
              : "border-navy/10 bg-white hover:border-gold hover:shadow-lg"
          }`}
        >
          <h3
            className={`font-display text-2xl ${
              choice === "neet" ? "text-white" : "text-navy"
            }`}
          >
            NEET
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              choice === "neet" ? "text-white/80" : "text-slate"
            }`}
          >
            Notes, practice questions, and PYQs for Class {cls}, tuned to
            NEET&apos;s exam pattern.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setChoice("jee")}
          className={`text-left rounded-lg border p-7 transition-all focus-visible:outline-2 focus-visible:outline-gold ${
            choice === "jee"
              ? "border-navy bg-navy text-white shadow-lg"
              : "border-navy/10 bg-white hover:border-gold hover:shadow-lg"
          }`}
        >
          <h3
            className={`font-display text-2xl ${
              choice === "jee" ? "text-white" : "text-navy"
            }`}
          >
            JEE
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              choice === "jee" ? "text-white/80" : "text-slate"
            }`}
          >
            Notes, practice questions, and PYQs for Class {cls}, split across
            JEE Main and JEE Advanced.
          </p>
        </button>
      </div>

      {choice === "neet" && (
        <div>
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl text-navy mb-8">
            NEET Resources — Class {cls}
          </h2>
          <NeetResourceTabs lockedClass={cls} />
        </div>
      )}

      {choice === "jee" && (
        <div>
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl text-navy mb-8">
            JEE Resources — Class {cls}
          </h2>
          <JeeMainAdvancedPicker lockedClass={cls} />
        </div>
      )}
    </div>
  );
}
