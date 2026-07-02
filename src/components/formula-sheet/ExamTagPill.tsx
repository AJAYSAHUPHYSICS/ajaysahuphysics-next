import type { ExamTag } from "@/lib/formula-sheet";

const LABELS: Record<ExamTag, string> = {
  "jee-main": "JEE Main",
  "jee-advanced": "JEE Adv",
  neet: "NEET",
  "mht-cet": "MHT-CET",
  boards: "Boards",
};

export default function ExamTagPill({ tag }: { tag: ExamTag }) {
  return (
    <span className="inline-flex items-center rounded-full border border-navy/15 bg-navy/5 px-2 py-0.5 text-[11px] font-semibold text-navy/80 whitespace-nowrap">
      {LABELS[tag]}
    </span>
  );
}
