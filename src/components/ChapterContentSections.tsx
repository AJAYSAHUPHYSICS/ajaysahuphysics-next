import type { ChapterContent } from "@/lib/chapter-content";
import RelatedChaptersList from "./RelatedChaptersList";
import ChapterFaqAccordion from "./ChapterFaqAccordion";

/**
 * Renders the four M7 chapter-enrichment sections — Introduction, Study
 * Strategy, Related Chapters, FAQs — for a chapter overview page.
 *
 * A plain Server Component: no "use client", no hooks, nothing but JSX
 * derived from the typed content object passed in. Both
 * RelatedChaptersList and ChapterFaqAccordion (native <details>) are
 * server-only too, so this entire subtree renders with zero client JS,
 * matching the architecture already established in M8.
 *
 * Extracted from src/app/class-11/[slug]/page.tsx and
 * src/app/class-12/[slug]/page.tsx, which were previously byte-identical
 * in this section — this is now the single source of that markup.
 */
export default function ChapterContentSections({
  content,
  chapterName,
}: {
  content: ChapterContent;
  chapterName: string;
}) {
  return (
    <>
      <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-3">
          Introduction to {chapterName}
        </h3>
        <p className="text-slate leading-relaxed">{content.introduction}</p>
        <p className="mt-3 text-slate leading-relaxed">{content.whyItMatters}</p>
      </div>

      <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-4">
          How to Study {chapterName}
        </h3>

        {content.prerequisites.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-navy mb-1">Prerequisites</h4>
            <p className="text-sm text-slate leading-relaxed">
              {content.prerequisites.join(" · ")}
            </p>
          </div>
        )}

        <div className="mb-4">
          <h4 className="font-semibold text-navy mb-1">Recommended approach</h4>
          <p className="text-sm text-slate leading-relaxed">{content.studyStrategy}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-navy mb-1">Common mistakes</h4>
          <ul className="list-disc pl-5 space-y-1">
            {content.commonMistakes.map((mistake) => (
              <li key={mistake} className="text-sm text-slate leading-relaxed">
                {mistake}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-navy mb-1">Revision strategy</h4>
          <p className="text-sm text-slate leading-relaxed">{content.revisionStrategy}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-navy mb-1">PYQ strategy</h4>
          <p className="text-sm text-slate leading-relaxed">{content.pyqStrategy}</p>
        </div>

        <div className={content.examWeightageNotes || content.importantTips ? "mb-4" : ""}>
          <h4 className="font-semibold text-navy mb-1">DPP strategy</h4>
          <p className="text-sm text-slate leading-relaxed">{content.dppStrategy}</p>
        </div>

        {content.examWeightageNotes && (
          <div className={content.importantTips ? "mb-4" : ""}>
            <h4 className="font-semibold text-navy mb-1">Exam weightage</h4>
            <p className="text-sm text-slate leading-relaxed">
              {content.examWeightageNotes}
            </p>
          </div>
        )}

        {content.importantTips && (
          <div>
            <h4 className="font-semibold text-navy mb-1">Important tips</h4>
            <ul className="list-disc pl-5 space-y-1">
              {content.importantTips.map((tip) => (
                <li key={tip} className="text-sm text-slate leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-4">Related Chapters</h3>
        <RelatedChaptersList relatedChapters={content.relatedChapters} />
      </div>

      {content.faqs.length > 0 && (
        <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
          <h3 className="font-display text-xl text-navy mb-2">
            Frequently Asked Questions
          </h3>
          <ChapterFaqAccordion faqs={content.faqs} />
        </div>
      )}
    </>
  );
}
