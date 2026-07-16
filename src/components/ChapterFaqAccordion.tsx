import type { ChapterFaq } from "@/lib/chapter-content";

/**
 * Renders a list of FAQs as native <details>/<summary> disclosure widgets.
 *
 * Deliberately NOT a "use client" component — <details> is natively
 * keyboard-navigable (Tab between items, Enter/Space to toggle) and
 * natively accessible (browsers expose expanded/collapsed state to
 * screen readers automatically), so no React state or ARIA wiring is
 * needed. This keeps the FAQ section fully server-rendered with zero
 * client-side JavaScript.
 */
export default function ChapterFaqAccordion({ faqs }: { faqs: ChapterFaq[] }) {
  return (
    <div className="divide-y divide-navy/10">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-4 first:pt-0 last:pb-0">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy marker:content-none">
            <span>{faq.question}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-gold-deep transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-slate leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
