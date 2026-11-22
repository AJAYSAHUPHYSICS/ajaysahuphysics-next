import { allChapters } from "@/lib/chapters";
import { resourceRegistry } from "@/lib/resource-registry";
import { getChapterContent } from "@/lib/chapter-content";
import type { ChecklistItemKey } from "@/lib/checklist";
import type { ChapterMeta } from "@/lib/chapter-meta";
import { isLegacyContentPublic } from "@/lib/content-policy/publication";

/**
 * The small, serialisable per-chapter summary the dashboard views need.
 * Call it from SERVER components only, so the heavy content registries
 * (resourceRegistry, chapter-content) never ship to the browser.
 * (Moved unchanged from src/app/dashboard/page.tsx so the study pages that
 * now show dashboard cards can reuse it.)
 */
export function dashboardChapterMeta(): ChapterMeta[] {
  return allChapters.map((ch) => {
    const availableChecklist: ChecklistItemKey[] = [
      resourceRegistry.notes.hasData(ch.slug) ? ("notes" as const) : null,
      resourceRegistry["formula-sheet"].hasData(ch.slug) ? ("formulaSheet" as const) : null,
      resourceRegistry.dpp.hasData(ch.slug) ? ("dpp" as const) : null,
      resourceRegistry.pyq.hasData(ch.slug) ? ("pyq" as const) : null,
    ].filter((item): item is ChecklistItemKey => item !== null);

    const content = getChapterContent(ch.slug);

    return {
      cls: ch.cls,
      slug: ch.slug,
      name: ch.name,
      number: ch.number,
      availableChecklist,
      // The related-chapter links stay; their explanations are legacy
      // chapter guidance, withheld by the central publication policy.
      relatedChapters:
        content?.relatedChapters.map((r) => ({
          slug: r.slug,
          reason: isLegacyContentPublic("chapter-guidance") ? r.reason : "",
        })) ?? [],
    };
  });
}
