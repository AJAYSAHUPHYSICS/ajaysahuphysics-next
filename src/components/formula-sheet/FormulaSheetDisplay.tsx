import type { ChapterFormulaSheet } from "@/lib/formula-sheet";
import FormulaQuickStrip from "./FormulaQuickStrip";
import FormulaTopicGroupBlock from "./FormulaTopicGroupBlock";

export default function FormulaSheetDisplay({
  sheet,
}: {
  sheet: ChapterFormulaSheet;
}) {
  const formulaCount = sheet.topicGroups.reduce(
    (n, g) => n + g.formulas.length,
    0
  );

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
        <p className="text-sm text-slate">
          {formulaCount} formulas across {sheet.topicGroups.length} topics in{" "}
          {sheet.chapterName}.
        </p>
        <p className="text-xs text-slate/60">
          Updated {sheet.lastUpdated} · v{sheet.version}
        </p>
      </div>

      <FormulaQuickStrip sheet={sheet} />

      <div className="mt-8 space-y-10">
        {sheet.topicGroups.map((g) => (
          <FormulaTopicGroupBlock key={g.id} group={g} />
        ))}
      </div>
    </div>
  );
}
