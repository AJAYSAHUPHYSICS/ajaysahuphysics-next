// ─────────────────────────────────────────────────────────────────
// Daily Study Plan (pure function, no storage of its own)
//
// Combines seven existing signals — spaced-revision due dates, logged
// mistakes, chapter completion, per-resource checklist state, and
// bookmarks — into a ranked, capped, subject-balanced task list. No
// new counting: every number here comes from an existing helper.
//
// Ranking (Task 5, "adaptive priorities"): each of the 8 fixed
// categories from Task 1 gets a base score reflecting its position in
// that priority order. A small adjustment (always well under the gap
// between two category tiers) then nudges individual chapters up for
// more mistakes/more overdue days, or down for having been recently
// mastered/revised — so the category order from Task 1 always wins
// overall, and the adjustment only reorders within realistic reach of
// a tier.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import type { Bookmark } from "./bookmarks";
import type { Mistake } from "./mistakes";
import { getRevisionDueInfo, bucketForDueInfo } from "./spaced-revision";
import { computeChapterProgress, studyStatus } from "./chapter-progress";
import { getSubject } from "./chapter-subjects";
import { TASK_DURATION_MINUTES, sumEstimatedMinutes } from "./study-time";
import type { StudyTask, StudyTaskCategory } from "./study-plan-types";

export type { StudyTask, StudyTaskCategory } from "./study-plan-types";

const MAX_TASKS = 8;
const SUBJECT_CAP = 2; // Task 4 — no more than 2 of the day's 8 tasks from one subject

const CATEGORY_BASE_SCORE: Record<StudyTaskCategory, number> = {
  "overdue-revision": 800,
  "unresolved-mistakes": 700,
  "weak-chapter": 600,
  "incomplete-pyq": 500,
  "incomplete-dpp": 400,
  "formula-sheet": 300,
  notes: 200,
  bookmark: 100,
};

export type StudyLoad = "light" | "moderate" | "heavy" | "very-heavy";

export type DailyStudyPlan = {
  tasks: StudyTask[];
  totalMinutes: number;
  load: StudyLoad;
};

const LOAD_LABEL: Record<StudyLoad, string> = {
  light: "Light",
  moderate: "Moderate",
  heavy: "Heavy",
  "very-heavy": "Very Heavy",
};

export function studyLoadLabel(load: StudyLoad): string {
  return LOAD_LABEL[load];
}

function loadForMinutes(minutes: number): StudyLoad {
  if (minutes <= 30) return "light";
  if (minutes <= 75) return "moderate";
  if (minutes <= 150) return "heavy";
  return "very-heavy";
}

export function buildDailyStudyPlan(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>,
  mistakes: Mistake[],
  bookmarks: Bookmark[],
  now: number = Date.now()
): DailyStudyPlan {
  const chapterMap = new Map(chapters.map((c) => [`${c.cls}:${c.slug}`, c]));
  const mistakesByChapter = new Map<string, Mistake[]>();
  for (const m of mistakes) {
    const key = `${m.cls}:${m.slug}`;
    const list = mistakesByChapter.get(key) ?? [];
    list.push(m);
    mistakesByChapter.set(key, list);
  }

  type Candidate = StudyTask & { score: number };
  const candidates: Candidate[] = [];
  const seenTaskKeys = new Set<string>();

  // Task 5 — adaptive adjustment, shared across every category.
  const adaptiveAdjustment = (ch: ChapterMeta, key: string): number => {
    let adj = 0;

    const chapterMistakes = mistakesByChapter.get(key) ?? [];
    const unresolvedMistakes = chapterMistakes.filter((m) => m.resolvedAt === null).length;
    adj += Math.min(unresolvedMistakes * 10, 40); // more mistakes -> higher priority

    const entries = revisionEntries[key] ?? [];
    const dueInfo = getRevisionDueInfo(entries, now);
    if (dueInfo.daysUntilDue !== null && dueInfo.daysUntilDue < 0) {
      adj += Math.min(Math.abs(dueInfo.daysUntilDue) * 5, 40); // more overdue -> higher priority
    }

    const state = checklists[key] ?? {};
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (studyStatus(progress) === "mastered") adj -= 30; // recently mastered -> lower priority
    if (dueInfo.lastRevisedAt !== null && now - dueInfo.lastRevisedAt < 2 * 24 * 60 * 60 * 1000) {
      adj -= 20; // recently revised -> lower priority
    }

    return adj;
  };

  const push = (ch: ChapterMeta, category: StudyTaskCategory, reason: string, path: string) => {
    const taskKey = `${ch.cls}:${ch.slug}:${category}`;
    if (seenTaskKeys.has(taskKey)) return;
    seenTaskKeys.add(taskKey);
    const key = `${ch.cls}:${ch.slug}`;
    candidates.push({
      cls: ch.cls,
      slug: ch.slug,
      chapterName: ch.name,
      category,
      reason,
      path,
      estimatedMinutes: TASK_DURATION_MINUTES[category],
      score: CATEGORY_BASE_SCORE[category] + adaptiveAdjustment(ch, key),
    });
  };

  // 1. Overdue revision.
  for (const ch of chapters) {
    const key = `${ch.cls}:${ch.slug}`;
    const entries = revisionEntries[key] ?? [];
    if (entries.length === 0) continue;
    const info = getRevisionDueInfo(entries, now);
    if (bucketForDueInfo(info) === "overdue" && info.daysUntilDue !== null) {
      const days = Math.abs(info.daysUntilDue);
      push(
        ch,
        "overdue-revision",
        `Revision overdue by ${days} day${days === 1 ? "" : "s"}.`,
        `/class-${ch.cls}/${ch.slug}#revision-rounds`
      );
    }
  }

  // 2. Unresolved mistakes.
  for (const ch of chapters) {
    const key = `${ch.cls}:${ch.slug}`;
    const unresolved = (mistakesByChapter.get(key) ?? []).filter((m) => m.resolvedAt === null);
    if (unresolved.length === 0) continue;
    push(
      ch,
      "unresolved-mistakes",
      `${unresolved.length} unresolved mistake${unresolved.length === 1 ? "" : "s"}.`,
      `/class-${ch.cls}/${ch.slug}/${unresolved[0].resourceType}`
    );
  }

  // 3. Weak chapters — started but not finished.
  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (progress.completedResources > 0 && progress.percent < 100) {
      push(
        ch,
        "weak-chapter",
        `${progress.completedResources}/${progress.totalResources} resources completed.`,
        `/class-${ch.cls}/${ch.slug}`
      );
    }
  }

  // 4. Incomplete PYQ.
  for (const ch of chapters) {
    if (!ch.availableChecklist.includes("pyq")) continue;
    const key = `${ch.cls}:${ch.slug}`;
    if (!checklists[key]?.pyq) {
      push(ch, "incomplete-pyq", "PYQ not completed.", `/class-${ch.cls}/${ch.slug}/pyq`);
    }
  }

  // 5. Incomplete DPP.
  for (const ch of chapters) {
    if (!ch.availableChecklist.includes("dpp")) continue;
    const key = `${ch.cls}:${ch.slug}`;
    if (!checklists[key]?.dpp) {
      push(ch, "incomplete-dpp", "DPP not completed.", `/class-${ch.cls}/${ch.slug}/dpp`);
    }
  }

  // 6. Formula Sheet.
  for (const ch of chapters) {
    if (!ch.availableChecklist.includes("formulaSheet")) continue;
    const key = `${ch.cls}:${ch.slug}`;
    if (!checklists[key]?.formulaSheet) {
      push(ch, "formula-sheet", "Formula Sheet not completed.", `/class-${ch.cls}/${ch.slug}/formula-sheet`);
    }
  }

  // 7. Notes.
  for (const ch of chapters) {
    if (!ch.availableChecklist.includes("notes")) continue;
    const key = `${ch.cls}:${ch.slug}`;
    if (!checklists[key]?.notes) {
      push(ch, "notes", "Notes not completed.", `/class-${ch.cls}/${ch.slug}/notes`);
    }
  }

  // 8. Bookmarks.
  for (const b of bookmarks) {
    const ch = chapterMap.get(`${b.cls}:${b.slug}`);
    if (!ch) continue;
    push(ch, "bookmark", "Bookmarked for later.", b.path);
  }

  const sorted = [...candidates].sort((a, b) => b.score - a.score);

  // Task 4 — subject balance: fill greedily while capping per-subject
  // count, then a second relaxed pass (no cap) fills any leftover
  // slots so the plan still reaches 8 tasks when variety runs out.
  // Also caps at one task per chapter, so 8 slots means 8 different
  // chapters, not one chapter's mistakes/PYQ/DPP all at once.
  const selected: StudyTask[] = [];
  const subjectCounts = new Map<string, number>();
  const usedChapters = new Set<string>();

  for (const c of sorted) {
    if (selected.length >= MAX_TASKS) break;
    const chapterKey = `${c.cls}:${c.slug}`;
    if (usedChapters.has(chapterKey)) continue;
    const subject = getSubject(c.slug) ?? "Mechanics";
    if ((subjectCounts.get(subject) ?? 0) >= SUBJECT_CAP) continue;
    selected.push(c);
    usedChapters.add(chapterKey);
    subjectCounts.set(subject, (subjectCounts.get(subject) ?? 0) + 1);
  }

  if (selected.length < MAX_TASKS) {
    for (const c of sorted) {
      if (selected.length >= MAX_TASKS) break;
      const chapterKey = `${c.cls}:${c.slug}`;
      if (usedChapters.has(chapterKey)) continue;
      selected.push(c);
      usedChapters.add(chapterKey);
    }
  }

  const totalMinutes = sumEstimatedMinutes(selected);
  return { tasks: selected, totalMinutes, load: loadForMinutes(totalMinutes) };
}
