import type { ChapterFormulaSheet } from "@/lib/formula-sheet";
import { estimateReadingMinutes } from "@/lib/reading-time";
import ReadingTimeBadge from "../ReadingTimeBadge";
import TableOfContents from "../TableOfContents";
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

  const minutes = estimateReadingMinutes(
    sheet.topicGroups.map((g) => g.intro ?? ""),
    sheet.topicGroups.flatMap((g) => g.importantObservations ?? []),
    sheet.topicGroups.map((g) => g.examNotes ?? ""),
    sheet.topicGroups.flatMap((g) => g.formulas.map((f) => f.label))
  );
  const tocItems = sheet.topicGroups.map((g) => ({
    id: `${g.id}-heading`,
    label: g.title,
  }));

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
        <p className="text-sm text-slate">
          {formulaCount} formulas across {sheet.topicGroups.length} topics in{" "}
          {sheet.chapterName}.
        </p>
        <div className="flex items-center gap-3">
          <ReadingTimeBadge minutes={minutes} />
          <p className="text-xs text-slate/60">
            Updated {sheet.lastUpdated} · v{sheet.version}
          </p>
        </div>
      </div>

      <FormulaQuickStrip sheet={sheet} />

      <TableOfContents items={tocItems} />

      <div className="mt-8 space-y-10">
        {sheet.topicGroups.map((g) => (
          <FormulaTopicGroupBlock key={g.id} group={g} />
        ))}
      </div>
    </div>
  );
}
