"use client";

import type { ChapterFormulaSheet, Formula } from "@/lib/formula-sheet";

function keyFormulas(sheet: ChapterFormulaSheet): Formula[] {
  const all = new Map<string, Formula>();
  for (const g of sheet.topicGroups) {
    for (const f of g.formulas) all.set(f.id, f);
  }
  // Respect the curated order in quickRevisionIds; fall back to isKeyFormula.
  const picked = sheet.quickRevisionIds
    .map((id) => all.get(id))
    .filter((f): f is Formula => !!f);
  if (picked.length > 0) return picked;
  return [...all.values()].filter((f) => f.isKeyFormula);
}

export default function FormulaQuickStrip({
  sheet,
}: {
  sheet: ChapterFormulaSheet;
}) {
  const formulas = keyFormulas(sheet);
  if (formulas.length === 0) return null;

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Key formulas quick revision"
      className="sm:sticky sm:top-16 z-10 -mx-4 px-4 sm:mx-0 sm:px-0 print:hidden"
    >
      <div className="rounded-lg bg-navy text-white px-4 py-3 shadow-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold mb-2">
          Key formulas — tap to jump
        </p>
        <ul className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
          {formulas.map((f) => (
            <li key={f.id} className="shrink-0">
              <button
                type="button"
                onClick={() => jump(f.id)}
                title={f.label}
                className="rounded-md border border-white/15 bg-white/5 hover:bg-white/10 hover:border-gold/60 transition-colors px-3 py-1.5 font-mono text-sm whitespace-nowrap"
              >
                {f.expression}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
