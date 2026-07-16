"use client";

import { useSyncExternalStore } from "react";
import {
  CHECKLIST_ITEMS,
  getChapterChecklist,
  setChecklistItem,
  subscribeToChecklist,
  type ChecklistItemKey,
  type ChapterChecklistState,
} from "@/lib/checklist";

const EMPTY: ChapterChecklistState = {};
const getServerSnapshot = () => EMPTY;

export default function ChapterChecklist({
  cls,
  slug,
  available,
}: {
  cls: "11" | "12";
  slug: string;
  /** Only show checklist items for resources this chapter actually has. */
  available: ChecklistItemKey[];
}) {
  const state = useSyncExternalStore(
    subscribeToChecklist,
    () => getChapterChecklist(cls, slug),
    getServerSnapshot
  );

  const items = CHECKLIST_ITEMS.filter((item) => available.includes(item.key));
  if (items.length === 0) return null;

  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const checked = !!state[item.key];
        const inputId = `checklist-${cls}-${slug}-${item.key}`;
        return (
          <li key={item.key}>
            <label
              htmlFor={inputId}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <input
                id={inputId}
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecklistItem(cls, slug, item.key, e.target.checked)}
                className="w-5 h-5 shrink-0 rounded border-navy/30 text-gold-deep focus-visible:outline-2 focus-visible:outline-gold accent-gold-deep"
              />
              <span
                className={`text-sm transition-colors ${
                  checked ? "text-slate/50 line-through" : "text-navy group-hover:text-gold-deep"
                }`}
              >
                {item.label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
