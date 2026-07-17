"use client";

import { useId, useState } from "react";
import { addMistake, type MistakeResourceType } from "@/lib/mistakes";
import type { Difficulty } from "@/lib/formula-sheet";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const DIFFICULTY_LABEL: Record<Difficulty, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };

export default function AddMistakeButton({
  cls,
  slug,
  chapterName,
  resourceType,
  questionId,
}: {
  cls: "11" | "12";
  slug: string;
  chapterName: string;
  resourceType: MistakeResourceType;
  questionId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [concept, setConcept] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [note, setNote] = useState("");
  const conceptId = useId();
  const noteId = useId();

  if (saved) {
    return (
      <p className="text-xs font-semibold text-green-700 mt-2.5" role="status">
        Added to Mistake Notebook &check;
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded mt-2.5"
      >
        + Add to Mistake Notebook
      </button>
    );
  }

  return (
    <div className="mt-2.5 rounded-md border border-navy/10 bg-ivory p-3 space-y-2.5">
      <div>
        <label htmlFor={conceptId} className="sr-only">
          Concept
        </label>
        <input
          id={conceptId}
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Concept (e.g. Projectile motion)"
          className="w-full text-sm rounded-md border border-navy/15 px-2.5 py-1.5 focus-visible:outline-2 focus-visible:outline-gold"
        />
      </div>

      <div className="flex gap-1.5" role="group" aria-label="Difficulty">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={difficulty === d}
            onClick={() => setDifficulty(d)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
              difficulty === d ? "border-gold bg-gold/10 text-gold-deep" : "border-navy/15 text-navy/60"
            }`}
          >
            {DIFFICULTY_LABEL[d]}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor={noteId} className="sr-only">
          Note
        </label>
        <textarea
          id={noteId}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Short note (optional)"
          rows={2}
          className="w-full text-sm rounded-md border border-navy/15 px-2.5 py-1.5 focus-visible:outline-2 focus-visible:outline-gold"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!concept.trim()}
          onClick={() => {
            addMistake({
              cls,
              slug,
              chapterName,
              resourceType,
              questionId,
              conceptTag: concept.trim(),
              difficulty,
              note: note.trim(),
            });
            setSaved(true);
          }}
          className="text-xs font-semibold text-white bg-navy hover:bg-navy-light disabled:opacity-40 disabled:cursor-not-allowed rounded-md px-3 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-gold"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs font-semibold text-slate/60 hover:text-navy transition-colors px-3 py-1.5 focus-visible:outline-2 focus-visible:outline-gold rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
