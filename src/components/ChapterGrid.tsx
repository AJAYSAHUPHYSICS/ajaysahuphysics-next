"use client";

import { useState } from "react";
import Link from "next/link";
import type { Chapter } from "@/lib/chapters";
import WhatsAppButton from "./WhatsAppButton";

type Props = {
  chapters: Chapter[];
  resourceLabel: string;
  linkToChapterPage?: boolean;
  isAvailable?: (chapter: Chapter) => boolean;
};

export default function ChapterGrid({
  chapters,
  resourceLabel,
  linkToChapterPage = false,
  isAvailable,
}: Props) {
  const [selected, setSelected] = useState<Chapter | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((ch) => {
          const available = isAvailable ? isAvailable(ch) : linkToChapterPage;
          const cardInner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-2xl text-gold/70 group-hover:text-gold transition-colors">
                  {String(ch.number).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/40 border border-navy/15 rounded-full px-2 py-0.5 shrink-0">
                  Class {ch.cls}
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-navy leading-snug group-hover:text-gold-deep transition-colors">
                {ch.name}
              </h3>
              {available ? (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gold-deep">
                  View {resourceLabel}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14m0 0l-5-5m5 5l-5 5" />
                  </svg>
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-navy/40">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                  </svg>
                  Coming soon
                </div>
              )}
            </>
          );

          const cardClass =
            "group text-left rounded-lg border border-navy/10 bg-white p-5 hover:border-gold hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-gold block";

          return available ? (
            <Link
              key={`${ch.cls}-${ch.slug}`}
              href={`/class-${ch.cls}/${ch.slug}`}
              className={cardClass}
            >
              {cardInner}
            </Link>
          ) : (
            <button
              key={`${ch.cls}-${ch.slug}`}
              type="button"
              onClick={() => setSelected(ch)}
              className={cardClass}
            >
              {cardInner}
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/60 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg max-w-sm w-full p-7 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold-deep font-display text-xl mb-4">
              !
            </span>
            <h3 className="font-display text-xl text-navy">Coming soon</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              {resourceLabel} for <strong>{selected.name}</strong> is being
              prepared. Message Ajay Sir on WhatsApp to get notified the
              moment it&apos;s ready.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <WhatsAppButton
                message={`Hi Ajay Sir, please notify me when ${resourceLabel} for "${selected.name}" is ready.`}
                className="w-full"
              >
                Notify me on WhatsApp
              </WhatsAppButton>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-sm text-slate hover:text-navy py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
