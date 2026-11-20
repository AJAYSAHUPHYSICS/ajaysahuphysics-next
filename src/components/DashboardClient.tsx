"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import {
  getBookmarks,
  subscribeToBookmarks,
  type Bookmark,
} from "@/lib/bookmarks";
import {
  getAllChecklists,
  countCompleted,
  subscribeToChecklist,
  RESOURCE_KEY_TO_CHECKLIST_ITEM,
} from "@/lib/checklist";
import { getAllRevisionEntries, subscribeToRevision, type RevisionEntry } from "@/lib/revision";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import { getRecentlyViewedResources, type RecentResource } from "@/lib/recently-viewed-resources";
import { getActivityLog, filterToday, filterLastDays, type ActivityEvent } from "@/lib/activity-log";
import { getStreak, subscribeToStreak, type StreakState } from "@/lib/study-streak";
import { computeChapterProgress } from "@/lib/chapter-progress";
import { getWeakChapters } from "@/lib/weak-chapters";
import { buildRevisionPlan } from "@/lib/revision-planner";
import { getResourceCompletionBreakdown } from "@/lib/resource-stats";
import { computeRevisionHealth } from "@/lib/revision-health";
import { computeExamReadiness } from "@/lib/exam-readiness";
import { getStrengthAnalysis } from "@/lib/chapter-strength";
import { getResourceGaps } from "@/lib/resource-gaps";
import { buildTodaysPriorities } from "@/lib/todays-priorities";
import { getMilestones } from "@/lib/milestones";
import { buildStudyInsights } from "@/lib/study-insights";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { getMistakes, subscribeToMistakes, type Mistake } from "@/lib/mistakes";
import { computeChapterAccuracy } from "@/lib/chapter-accuracy";
import { getTopConcepts } from "@/lib/concept-analysis";
import { getReattemptList } from "@/lib/reattempt-list";
import { isAvailableStudyPath } from "@/lib/content-policy/resource-links";
import { buildMistakeInsights } from "@/lib/mistake-insights";
import { buildDailyStudyPlan } from "@/lib/study-plan";
import { buildWeeklyPlan } from "@/lib/weekly-plan";
import { getStreakBonus } from "@/lib/streak-bonus";
import { getActiveGoals, subscribeToGoals, toggleGoal, type ActiveGoal } from "@/lib/study-goals";
import { GOAL_TYPES, type GoalType } from "@/lib/goal-types";
import { computeAllGoalProgress, type GoalProgress } from "@/lib/goal-progress";
import { computeGoalForecast, type GoalForecast } from "@/lib/goal-forecast";
import { buildDailyTargets } from "@/lib/daily-targets";
import { buildWeeklyTargets } from "@/lib/weekly-targets";
import { computeProgressForecast } from "@/lib/progress-forecast";
import { getAchievements } from "@/lib/achievements";
import { computeProductivityScore } from "@/lib/productivity-score";
import { buildGoalRecommendations } from "@/lib/goal-recommendations";
import type { ChapterMeta } from "@/lib/chapter-meta";
import StudyStreakBadge from "./StudyStreakBadge";
import ProgressBar from "./ProgressBar";
import ChapterList from "./ChapterList";
import EmptyState from "./EmptyState";
import RevisionTimeline from "./RevisionTimeline";
import MasteredLibrary from "./MasteredLibrary";
import RevisionHistory from "./RevisionHistory";
import RevisionHealthCard from "./RevisionHealthCard";
import ExamReadinessCard from "./ExamReadinessCard";
import StrengthAnalysis from "./StrengthAnalysis";
import ResourceGapsCard from "./ResourceGapsCard";
import WeeklyProgress from "./WeeklyProgress";
import RecommendedToday from "./RecommendedToday";
import MilestonesCard from "./MilestonesCard";
import MistakeNotebookCard from "./MistakeNotebookCard";
import ChapterAccuracyList from "./ChapterAccuracyList";
import ConceptAnalysisCard from "./ConceptAnalysisCard";
import ReattemptListCard from "./ReattemptListCard";
import DailyStudyPlanCard from "./DailyStudyPlanCard";
import WeeklyPlanCard from "./WeeklyPlanCard";
import StreakBonusCard from "./StreakBonusCard";
import GoalsCard, { type GoalRow } from "./GoalsCard";
import DailyTargetsCard from "./DailyTargetsCard";
import WeeklyTargetsCard from "./WeeklyTargetsCard";
import ProgressForecastCard from "./ProgressForecastCard";
import AchievementsCard from "./AchievementsCard";
import ProductivityScoreCard from "./ProductivityScoreCard";
import SmartRecommendationsCard from "./SmartRecommendationsCard";

// Read-once on mount, same rationale as ContinueLearning.tsx: these
// don't change while the dashboard itself is open (a student can't be
// visiting a chapter and viewing the dashboard at the same time).
const noopSubscribe = () => () => {};

const EMPTY_CHECKLISTS: ReturnType<typeof getAllChecklists> = {};
const EMPTY_REVISION_ENTRIES: Record<string, RevisionEntry[]> = {};
const EMPTY_BOOKMARKS: Bookmark[] = [];
const EMPTY_STREAK: StreakState = { current: 0, longest: 0, lastActiveDate: null };
const EMPTY_RECENT_CHAPTERS: ReturnType<typeof getRecentlyViewed> = [];
const EMPTY_RECENT_RESOURCES: RecentResource[] = [];
const EMPTY_ACTIVITY_LOG: ActivityEvent[] = [];
const EMPTY_MISTAKES: Mistake[] = [];
const EMPTY_ACTIVE_GOALS: ActiveGoal[] = [];

export type DashboardView = "overview" | "progress" | "revision" | "mistakes" | "activity";

/**
 * The dashboard's study data, rendered per page:
 *   overview  – the five essentials (owner decision, 2026-11-20): continue
 *               studying, due for revision, today's plan, mistakes to
 *               retry, study streak;
 *   progress  – readiness, goals, targets, recommendations, forecasts and
 *               the full chapter list (/dashboard/progress/);
 *   revision / mistakes / activity – the analysis cards for that study page.
 * Every calculation is unchanged; only where each card appears changed.
 */
export default function DashboardClient({ chapters, view = "overview" }: { chapters: ChapterMeta[]; view?: DashboardView }) {
  const checklists = useSyncExternalStore(
    subscribeToChecklist,
    getAllChecklists,
    () => EMPTY_CHECKLISTS
  );
  const revisionEntries = useSyncExternalStore(
    subscribeToRevision,
    getAllRevisionEntries,
    () => EMPTY_REVISION_ENTRIES
  );
  const bookmarks = useSyncExternalStore(subscribeToBookmarks, getBookmarks, () => EMPTY_BOOKMARKS);
  const streak = useSyncExternalStore(subscribeToStreak, getStreak, () => EMPTY_STREAK);
  const recentChapters = useSyncExternalStore(
    noopSubscribe,
    getRecentlyViewed,
    () => EMPTY_RECENT_CHAPTERS
  );
  const recentResources = useSyncExternalStore(
    noopSubscribe,
    getRecentlyViewedResources,
    () => EMPTY_RECENT_RESOURCES
  );
  const activityLog = useSyncExternalStore(
    noopSubscribe,
    getActivityLog,
    () => EMPTY_ACTIVITY_LOG
  );
  const todayActivity = filterToday(activityLog);
  const mistakes = useSyncExternalStore(subscribeToMistakes, getMistakes, () => EMPTY_MISTAKES);
  const activeGoalsList = useSyncExternalStore(subscribeToGoals, getActiveGoals, () => EMPTY_ACTIVE_GOALS);

  const chapterMap = new Map(chapters.map((c) => [c.slug, c]));
  const bookmarkedIds = new Set(bookmarks.map((b) => b.id));

  // Task 1 — per-chapter completion score (Notes + Formula Sheet + DPP + PYQ + revision rounds).
  const chaptersWithProgress = chapters.map((ch) => {
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const rounds = revisionEntries[key]?.length ?? 0;
    const progress = computeChapterProgress(ch.availableChecklist, state, rounds);
    return { ...ch, state, done: progress.completedResources, total: progress.totalResources, progress };
  });

  const chaptersCompleted = chaptersWithProgress.filter((c) => c.progress.percent >= 100).length;
  const resourcesCompleted = chaptersWithProgress.reduce((sum, c) => sum + countCompleted(c.state), 0);
  const revisionCount = Object.values(revisionEntries).reduce((sum, list) => sum + list.length, 0);

  // Task 2 — Today's Activity, from the activity log (no re-derivation of "done").
  const resourcesCompletedToday = todayActivity.filter((e) => e.type === "resource-completed").length;
  const chaptersVisitedToday = new Set(
    todayActivity.filter((e) => e.type === "chapter-visited").map((e) => `${e.cls}:${e.slug}`)
  ).size;
  const revisionRoundsToday = todayActivity.filter((e) => e.type === "revision-completed").length;
  const bookmarksAddedToday = todayActivity.filter((e) => e.type === "bookmark-added").length;
  const hasTodayActivity =
    resourcesCompletedToday > 0 || chaptersVisitedToday > 0 || revisionRoundsToday > 0 || bookmarksAddedToday > 0;

  // Task 1 — Continue Studying: recently viewed resources not yet checked off.
  const continueStudying = recentResources
    .map((r) => {
      const checklistKey = RESOURCE_KEY_TO_CHECKLIST_ITEM[r.resourceKey];
      if (!checklistKey) return null;
      const state = checklists[`${r.cls}:${r.slug}`] ?? {};
      if (state[checklistKey]) return null; // already finished
      return r;
    })
    .filter((r): r is RecentResource => r !== null)
    .slice(0, 3);

  // Task 2 — weak chapters.
  const weak = getWeakChapters(
    chapters,
    checklists,
    Object.fromEntries(Object.entries(revisionEntries).map(([k, v]) => [k, v.length]))
  );
  const hasWeakChapters = weak.incomplete.length > 0 || weak.neverRevised.length > 0 || weak.pyqNotSolved.length > 0;

  // M12 Task 3 — revision health score, and Task 7 — deterministic insights built from it.
  const health = computeRevisionHealth(chapters, checklists, revisionEntries);
  const insights = buildStudyInsights(health);

  // M13 Task 1/4 — exam readiness score + breakdown, reusing resource-stats and revision-health.
  const readiness = computeExamReadiness(chapters, checklists, revisionEntries);

  // M13 Task 2 — strength analysis, reusing computeChapterProgress.
  const strength = getStrengthAnalysis(chapters, checklists, revisionEntries);

  // M13 Task 3 — resource gaps, reusing resource-stats breakdown.
  const resourceGaps = getResourceGaps(chapters, checklists, revisionEntries);

  // M13 Task 5 — last 7 days, reusing the already-read activity log (no second read).
  const weeklyEvents = filterLastDays(activityLog, 7);

  // M13 Task 6 — today's priorities, reusing spaced-revision + weak-chapters.
  const todaysPriorities = buildTodaysPriorities(chapters, checklists, revisionEntries, bookmarks);

  // M13 Task 7 — milestones, reusing counts already computed above and health.masteredCount.
  const milestones = getMilestones({
    chaptersCompleted,
    masteredCount: health.masteredCount,
    resourcesCompleted,
    revisionCount,
  });

  // M14 — Mistake Notebook: accuracy, concepts, reattempt list, insights,
  // all reusing the single `mistakes` read above (no duplicate storage reads).
  const chapterAccuracies = computeChapterAccuracy(chapters, checklists, mistakes);
  const topConcepts = getTopConcepts(mistakes);
  const reattemptList = getReattemptList(mistakes);
  const mistakeInsights = buildMistakeInsights(mistakes, chapterAccuracies);
  const allInsights = [...insights, ...mistakeInsights];

  // M15 Task 1/2/3/5/8 — daily study plan, reusing spaced-revision, mistakes,
  // chapter-progress, checklist, and bookmarks already read above.
  const dailyPlan = buildDailyStudyPlan(chapters, checklists, revisionEntries, mistakes, bookmarks);

  // M15 Task 6 — weekly plan, pure computation, nothing persisted.
  const weeklyPlan = buildWeeklyPlan(chapters, checklists, revisionEntries);

  // M15 Task 7 — streak bonus, reusing the same `streak` state as StudyStreakBadge.
  const streakBonus = getStreakBonus(streak, chapters, checklists, revisionEntries);

  // Task 4 — resource completion breakdown (Notes / Formula Sheet / DPP / PYQ, tracked separately).
  const resourceBreakdown = getResourceCompletionBreakdown(chapters, checklists);

  // M16 — Study Goals: which of the 8 fixed goal types are active, and
  // each one's progress/forecast. No new completion logic — goal-progress.ts
  // reuses resource-stats + chapter-progress + revision exactly as read above.
  const activeGoalTypes = activeGoalsList.map((g) => g.type);
  const activatedAtByType = new Map(activeGoalsList.map((g) => [g.type, g.activatedAt]));
  const goalProgressList = computeAllGoalProgress(GOAL_TYPES, chapters, checklists, revisionEntries);
  const progressByType = new Map<GoalType, GoalProgress>(goalProgressList.map((p) => [p.type, p]));
  const goalRemaining: Partial<Record<GoalType, number>> = Object.fromEntries(
    goalProgressList.map((p) => [p.type, p.total - p.completed])
  );

  // M16 Task 2 — target date forecast, only for goals actually being tracked.
  const forecastByType = new Map<GoalType, GoalForecast>();
  for (const type of activeGoalTypes) {
    const progress = progressByType.get(type);
    const activatedAt = activatedAtByType.get(type);
    if (!progress || activatedAt === undefined) continue;
    forecastByType.set(type, computeGoalForecast(progress, activatedAt, activityLog));
  }

  const goalRows: GoalRow[] = GOAL_TYPES.map((type) => ({
    type,
    active: activeGoalTypes.includes(type),
    progress: progressByType.get(type) ?? { type, completed: 0, total: 0, percent: 0 },
    forecast: forecastByType.get(type) ?? null,
  }));

  // M16 Task 3/4 — daily target reuses the M15 daily plan's own task
  // selection (no second chapter-priority system); weekly target scales
  // the same study-pace.ts rate goal-forecast.ts already computed from.
  const dailyTargets = buildDailyTargets(activeGoalTypes, dailyPlan, revisionEntries, goalRemaining);
  const weeklyTargets = buildWeeklyTargets(activeGoalTypes, activityLog, goalRemaining);

  // M16 Task 5 — progress forecast, reusing resource-gaps.ts's counts as-is.
  const progressForecastData = computeProgressForecast(chapters, checklists, revisionEntries, activityLog);

  // M16 Task 6 — achievements, reusing counts already computed above (chaptersCompleted,
  // revisionCount, health.masteredCount, resourceBreakdown, streak).
  const achievementsList = getAchievements({
    chaptersCompleted,
    revisionCount,
    masteredCount: health.masteredCount,
    resourceBreakdown,
    streak,
  });

  // M16 Task 7 — productivity score, reusing exam-readiness + chapter-accuracy + streak.
  const productivityScoreData = computeProductivityScore(readiness, chapterAccuracies, streak);

  // M16 Task 8 — smart recommendations, reusing goal forecasts + revision health.
  const goalRecommendations = buildGoalRecommendations(
    activeGoalTypes,
    Object.fromEntries(progressByType),
    Object.fromEntries(forecastByType),
    health
  );

  // Task 3 — today's revision plan.
  const revisionPlan = buildRevisionPlan(chapters, checklists, revisionEntries, bookmarks, recentResources);

  // M9 recommendation 1: chapters started but not finished.
  const inProgress = chaptersWithProgress
    .filter((c) => c.total > 0 && c.done > 0 && c.done < c.total)
    .slice(0, 4);
  const notStarted = chaptersWithProgress
    .filter((c) => c.total > 0 && c.done === 0)
    .slice(0, 4);
  const incompleteChapters = inProgress.length > 0 ? inProgress : notStarted;

  // Recommendations skip withheld resources; the Bookmarks and Recent
  // activity sections still list everything the student saved or viewed.
  const recommendedBookmarks = bookmarks.filter((b) => isAvailableStudyPath(b.path)).slice(0, 4);
  const recommendedRecent = recentResources.filter((r) => isAvailableStudyPath(r.path)).slice(0, 4);

  const engagedSlugs = new Set([
    ...chaptersWithProgress.filter((c) => c.done > 0).map((c) => c.slug),
    ...Object.entries(revisionEntries)
      .filter(([, entries]) => entries.length > 0)
      .map(([key]) => key.split(":")[1]),
  ]);
  const relatedCandidates = new Map<string, { slug: string; reason: string }>();
  for (const slug of engagedSlugs) {
    const ch = chapterMap.get(slug);
    if (!ch) continue;
    for (const rel of ch.relatedChapters) {
      const relChapter = chapterMap.get(rel.slug);
      const relProgress = chaptersWithProgress.find((c) => c.slug === rel.slug);
      const alreadyDone = relProgress && relProgress.total > 0 && relProgress.done === relProgress.total;
      if (relChapter && !alreadyDone && !relatedCandidates.has(rel.slug)) {
        relatedCandidates.set(rel.slug, rel);
      }
    }
  }
  const relatedRecommendations = Array.from(relatedCandidates.values()).slice(0, 4);

  const hasAnyActivity =
    bookmarks.length > 0 || resourcesCompleted > 0 || revisionCount > 0 || recentChapters.length > 0;

  // Task 7 — deterministic daily motivation message, no randomness.
  const uniqueWeakSlugs = new Set([
    ...weak.incomplete.map((e) => `${e.cls}:${e.slug}`),
    ...weak.neverRevised.map((e) => `${e.cls}:${e.slug}`),
    ...weak.pyqNotSolved.map((e) => `${e.cls}:${e.slug}`),
  ]).size;

  const classAverage = (cls: "11" | "12") => {
    const inClass = chaptersWithProgress.filter((c) => c.cls === cls && c.total > 0);
    if (inClass.length === 0) return 0;
    return Math.round(inClass.reduce((sum, c) => sum + c.progress.percent, 0) / inClass.length);
  };
  const avg11 = classAverage("11");
  const avg12 = classAverage("12");
  const leadingClass = avg12 >= avg11 ? "12" : "11";
  const leadingAvg = avg12 >= avg11 ? avg12 : avg11;

  let motivation: string;
  if (streak.current >= 3) {
    motivation = `Keep your ${streak.current}-day streak alive.`;
  } else if (uniqueWeakSlugs > 0 && uniqueWeakSlugs <= 5) {
    motivation = `Only ${uniqueWeakSlugs} weak chapter${uniqueWeakSlugs === 1 ? "" : "s"} remain.`;
  } else if (leadingAvg > 0) {
    motivation = `You're ${leadingAvg}% through Class ${leadingClass}.`;
  } else {
    motivation = "Let's start your first chapter today.";
  }

  // The chapter list is on the Progress page; Continue Studying is on the overview.
  const allChaptersHref = view === "progress" ? "#all-chapters" : "/dashboard/progress#all-chapters";
  const continueHref = view === "overview" ? "#continue-studying" : "/dashboard#continue-studying";

  return (
    <div className="space-y-8">
      {view === "overview" ? (
        <>
          {/* Task 7 — Daily motivation */}
          <div className="rounded-lg bg-navy text-white p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-lg sm:text-xl">{motivation}</p>
            {!hasAnyActivity && (
              <Link
                href={allChaptersHref}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-navy bg-gold hover:bg-gold-deep hover:text-white rounded-md px-4 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                Browse chapters &rarr;
              </Link>
            )}
          </div>

          {/* Task 1 — Continue Studying */}
          <div id="continue-studying" className="scroll-mt-24 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-4">Continue Studying</h2>
            {continueStudying.length > 0 ? (
              <ul className="space-y-2">
                {continueStudying.map((r) => (
                  <li key={`${r.cls}-${r.slug}-${r.resourceKey}`}>
                    <Link
                      href={r.path}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-navy/10 px-4 py-3.5 hover:border-gold hover:bg-ivory transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-navy">{r.chapterName}</span>
                        <span className="block text-xs text-slate/60 mt-0.5">
                          {r.resourceLabel} &middot; opened {formatRelativeTime(r.visitedAt)}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-gold-deep">Continue &rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon="clock"
                title="Nothing left unfinished"
                description="Resources you open but haven't checked off will show up here so you can pick up right where you left off."
                actionLabel="Browse chapters"
                actionHref={allChaptersHref}
              />
            )}
          </div>

          {/* Task 3 — Today's revision plan */}
          <div id="todays-revision" className="scroll-mt-24 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Due for revision</h2>
            <p className="text-sm text-slate mb-5">
              A short list worth revising today, based on due revisions, bookmarks, recent
              activity, and unfinished chapters.
            </p>
            {revisionPlan.length > 0 ? (
              <ul className="space-y-2">
                {revisionPlan.map((item) => (
                  <li key={`${item.cls}-${item.slug}`}>
                    <Link
                      href={item.path}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-navy/10 px-4 py-3 hover:border-gold hover:bg-ivory transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      <span className="text-sm font-semibold text-navy">{item.name}</span>
                      <span className="flex flex-wrap gap-1.5">
                        {item.reasons.map((reason) => (
                          <span
                            key={reason}
                            className="text-xs font-medium text-gold-deep bg-gold/10 border border-gold/30 rounded-full px-2 py-0.5"
                          >
                            {reason}
                          </span>
                        ))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon="revision"
                title="No revision due"
                description="Nothing is overdue for revision right now. Complete a chapter's resources or mark a revision round to build your plan."
                actionLabel="Browse chapters"
                actionHref={allChaptersHref}
              />
            )}
          </div>

          {/* M15 Task 1/2/3/5/8 — Daily Study Plan */}
          <div id="study-plan" className="scroll-mt-24 rounded-lg border border-gold/40 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Today&apos;s plan</h2>
            <p className="text-sm text-slate mb-5">
              Up to 8 tasks, ranked by urgency and mixed across subjects, each linking straight
              to what you need to do.
            </p>
            <DailyStudyPlanCard plan={dailyPlan} />
          </div>

          {/* Overview — Mistakes to retry (same list as the Mistakes page's "Practice Again") */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h2 className="font-display text-xl text-navy">Mistakes to retry</h2>
              <Link href="/dashboard/mistakes" className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors">
                Mistake notebook &rarr;
              </Link>
            </div>
            <p className="text-sm text-slate mb-5">Unresolved mistakes, oldest and hardest first.</p>
            <ReattemptListCard items={reattemptList} />
          </div>

          {/* Overview — Study streak */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h2 className="font-display text-xl text-navy">Study streak</h2>
              <Link href="/dashboard/activity" className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors">
                Activity &rarr;
              </Link>
            </div>
            <StudyStreakBadge />
            <div className="mt-3">
              <StreakBonusCard bonus={streakBonus} />
            </div>
          </div>
        </>
      ) : null}

      {view === "progress" ? (
        <>
          {/* M13 Task 1/4 — Exam Readiness Score */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Exam Readiness</h2>
            <ExamReadinessCard readiness={readiness} />
          </div>

          {/* M16 Task 7 — Productivity Score */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Productivity Score</h2>
            <p className="text-sm text-slate mb-5">
              One score combining completion, revision, accuracy, and consistency.
            </p>
            <ProductivityScoreCard score={productivityScoreData} />
          </div>

          {/* M16 Task 1 — Study Goals */}
          <div id="study-goals" className="scroll-mt-24 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Study Goals</h2>
            <p className="text-sm text-slate mb-5">
              Track any of these and get a target date, daily/weekly targets, and coaching below.
            </p>
            <GoalsCard rows={goalRows} onToggle={toggleGoal} />
          </div>

          {/* M16 Task 3/4 — Daily & Weekly Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
              <h2 className="font-display text-xl text-navy mb-1">Today&apos;s Targets</h2>
              <p className="text-sm text-slate mb-5">Based on your tracked goals and today&apos;s study plan.</p>
              <DailyTargetsCard targets={dailyTargets} />
            </div>
            <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
              <h2 className="font-display text-xl text-navy mb-1">This Week&apos;s Targets</h2>
              <p className="text-sm text-slate mb-5">A rolling 7-day target based on your recent pace.</p>
              <WeeklyTargetsCard targets={weeklyTargets} />
            </div>
          </div>

          {/* M16 Task 8 — Smart Recommendations */}
          <div className="rounded-lg border border-gold/40 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Smart Recommendations</h2>
            <p className="text-sm text-slate mb-5">Coaching based on your goal pace and revision schedule.</p>
            <SmartRecommendationsCard recommendations={goalRecommendations} />
          </div>

          {/* M13 Task 6 — Recommended Today */}
          <div id="recommended-today" className="scroll-mt-24 rounded-lg border border-gold/40 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Recommended Today</h2>
            <p className="text-sm text-slate mb-5">
              Up to 5 chapters worth your time today, in priority order: overdue revisions first,
              then weak chapters, unfinished practice, and bookmarks.
            </p>
            <RecommendedToday items={todaysPriorities} />
          </div>

          {/* M12 Task 7 / M14 Task 8 — Study Insights */}
          {allInsights.length > 0 && (
            <div className="rounded-lg border border-navy/10 bg-white p-6 sm:p-7">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {allInsights.map((insight) => (
                  <li key={insight} className="text-sm text-navy flex items-center gap-2">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stats */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Your progress</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              <Stat value={chaptersCompleted} label="Chapters completed" />
              <Stat value={resourcesCompleted} label="Resources completed" />
              <Stat value={bookmarks.length} label="Bookmarks" />
              <Stat value={revisionCount} label="Revision rounds" />
            </div>
            <div className="pt-6 border-t border-navy/10">
              <StudyStreakBadge />
              <div className="mt-3">
                <StreakBonusCard bonus={streakBonus} />
              </div>
            </div>
          </div>

          {/* Task 4/6 — Resource completion chart */}
          {resourceBreakdown.some((r) => r.total > 0) && (
            <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
              <h2 className="font-display text-xl text-navy mb-5">Resource completion</h2>
              <div className="space-y-4">
                {resourceBreakdown
                  .filter((r) => r.total > 0)
                  .map((r) => {
                    const pct = Math.round((r.completed / r.total) * 100);
                    return (
                      <div key={r.key}>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span className="text-sm font-semibold text-navy">{r.label}</span>
                          <span className="text-xs text-slate/60">
                            {r.completed}/{r.total} chapters ({pct}%)
                          </span>
                        </div>
                        <ProgressBar percent={pct} size="sm" label={`${r.label} completion across all chapters`} />
                      </div>
                    );
                  })}
              </div>
              <div className="mt-6 pt-5 border-t border-navy/10">
                <Link href={allChaptersHref} className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors">
                  Browse chapters &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* M13 Task 3 — Resource Gaps */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Resource Gaps</h2>
            <p className="text-sm text-slate mb-5">Work remaining across every resource type and revision.</p>
            <ResourceGapsCard gaps={resourceGaps} />
          </div>

          {/* M16 Task 5 — Progress Forecast */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Progress Forecast</h2>
            <p className="text-sm text-slate mb-5">
              Estimated days remaining at your current pace, for chapters and each resource type.
            </p>
            <ProgressForecastCard forecast={progressForecastData} />
          </div>

          {/* Task 2 (M10) — Weak chapters */}
          <div id="weak-chapters" className="scroll-mt-24 rounded-lg border border-gold/40 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Needs attention</h2>
            <p className="text-sm text-slate mb-5">
              Chapters that are incomplete, haven&apos;t been revised, or still have unsolved PYQs.
            </p>
            {hasWeakChapters ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <WeakGroup title="Incomplete" entries={weak.incomplete} />
                <WeakGroup title="Never revised" entries={weak.neverRevised} />
                <WeakGroup title="PYQs not solved" entries={weak.pyqNotSolved} />
              </div>
            ) : (
              <EmptyState
                icon="check"
                title="No weak chapters"
                description="Every chapter you've started is complete, revised, and has its PYQs solved. Great work."
                actionLabel="Browse chapters"
                actionHref={allChaptersHref}
              />
            )}
          </div>

          {/* M13 Task 2 — Strength Analysis */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Strength Analysis</h2>
            <StrengthAnalysis analysis={strength} />
          </div>

          {/* Smart Recommendations */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Recommended for you</h2>
    
            {incompleteChapters.length === 0 &&
            recommendedBookmarks.length === 0 &&
            recommendedRecent.length === 0 &&
            relatedRecommendations.length === 0 ? (
              <EmptyState
                icon="chapters"
                title="No recommendations yet"
                description="Start checking off chapters and we'll recommend what to study next, based on your progress and bookmarks."
                actionLabel="Browse chapters"
                actionHref={allChaptersHref}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {incompleteChapters.length > 0 && (
                  <RecommendationGroup title={inProgress.length > 0 ? "Pick up where you left off" : "Start a chapter"}>
                    {incompleteChapters.map((c) => (
                      <RecommendationLink
                        key={c.slug}
                        href={`/class-${c.cls}/${c.slug}`}
                        primary={c.name}
                        secondary={c.total > 0 ? `${c.done}/${c.total} resources done` : undefined}
                      />
                    ))}
                  </RecommendationGroup>
                )}
    
                {relatedRecommendations.length > 0 && (
                  <RecommendationGroup title="Related chapters">
                    {relatedRecommendations.map((rel) => {
                      const relChapter = chapterMap.get(rel.slug);
                      if (!relChapter) return null;
                      return (
                        <RecommendationLink
                          key={rel.slug}
                          href={`/class-${relChapter.cls}/${relChapter.slug}`}
                          primary={relChapter.name}
                          secondary={rel.reason}
                        />
                      );
                    })}
                  </RecommendationGroup>
                )}
    
                {recommendedBookmarks.length > 0 && (
                  <RecommendationGroup title="From your bookmarks">
                    {recommendedBookmarks.map((b) => (
                      <RecommendationLink key={b.id} href={b.path} primary={b.label} />
                    ))}
                  </RecommendationGroup>
                )}
    
                {recommendedRecent.length > 0 && (
                  <RecommendationGroup title="Pick up a recent resource">
                    {recommendedRecent.map((r) => (
                      <RecommendationLink
                        key={`${r.cls}-${r.slug}-${r.resourceKey}`}
                        href={r.path}
                        primary={`${r.chapterName} — ${r.resourceLabel}`}
                      />
                    ))}
                  </RecommendationGroup>
                )}
              </div>
            )}
          </div>

          {/* Task 1/5/6 (M10) — full chapter list with progress bars, filters, sorting */}
          <ChapterList
            chapters={chapters}
            checklists={checklists}
            revisionEntries={revisionEntries}
            bookmarkedIds={bookmarkedIds}
          />
        </>
      ) : null}

      {view === "revision" ? (
        <>
          {/* M12 Task 3 — Revision Health */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Revision Health</h2>
            <RevisionHealthCard health={health} />
          </div>

          {/* M12 Task 1 — Revision Timeline */}
          <div id="revision-timeline" className="scroll-mt-24 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Revision Timeline</h2>
            <p className="text-sm text-slate mb-5">
              Chapters grouped by when they&apos;re next due, based on a 1 / 7 / 30-day revision
              schedule after each round.
            </p>
            <RevisionTimeline chapters={chapters} checklists={checklists} revisionEntries={revisionEntries} />
          </div>

          {/* M15 Task 6 — Weekly Plan */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Weekly Plan</h2>
            <p className="text-sm text-slate mb-5">
              A 7-day look ahead — computed fresh each time, nothing saved.
            </p>
            <WeeklyPlanCard days={weeklyPlan} />
          </div>

          {/* M12 Task 4 — Mastered Library */}
          <div id="mastered-chapters" className="scroll-mt-24 rounded-lg border border-green-200 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Mastered Chapters</h2>
            <p className="text-sm text-slate mb-5">
              Every resource completed, all 3 revision rounds done.
            </p>
            <MasteredLibrary chapters={chapters} checklists={checklists} revisionEntries={revisionEntries} />
          </div>

          {/* M12 Task 5 — Revision History */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Revision History</h2>
            <RevisionHistory log={activityLog} />
          </div>
        </>
      ) : null}

      {view === "mistakes" ? (
        <>
          {/* M14 Task 3 — Mistake Notebook */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Mistake Notebook</h2>
            <MistakeNotebookCard mistakes={mistakes} />
          </div>

          {/* M14 Task 4 — Chapter Performance */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-1">Chapter Performance</h2>
            <p className="text-sm text-slate mb-5">
              Accuracy per chapter, based on practice done and mistakes logged.
            </p>
            <ChapterAccuracyList accuracies={chapterAccuracies} />
          </div>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* M14 Task 5 — Concept Analysis */}
            <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
              <h2 className="font-display text-xl text-navy mb-1">Concept Analysis</h2>
              <p className="text-sm text-slate mb-5">Concepts needing the most revision.</p>
              <ConceptAnalysisCard concepts={topConcepts} />
            </div>
    
            {/* M14 Task 6/7 — Practice Again */}
            <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
              <h2 className="font-display text-xl text-navy mb-1">Practice Again</h2>
              <p className="text-sm text-slate mb-5">Unresolved mistakes, oldest and hardest first.</p>
              <ReattemptListCard items={reattemptList} />
            </div>
          </div>
        </>
      ) : null}

      {view === "activity" ? (
        <>
          {/* M13 Task 7 — Milestones */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Milestones</h2>
            <MilestonesCard milestones={milestones} />
          </div>

          {/* M16 Task 6 — Achievements */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Achievements</h2>
            <AchievementsCard achievements={achievementsList} />
          </div>

          {/* Task 2 — Today's Activity */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Today&apos;s Activity</h2>
            {hasTodayActivity ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <Stat value={resourcesCompletedToday} label="Resources completed" />
                  <Stat value={chaptersVisitedToday} label="Chapters visited" />
                  <Stat value={revisionRoundsToday} label="Revision rounds" />
                  <Stat value={bookmarksAddedToday} label="Bookmarks added" />
                </div>
                <div className="mt-6 pt-5 border-t border-navy/10">
                  <Link
                    href={continueHref}
                    className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors"
                  >
                    Continue studying &rarr;
                  </Link>
                </div>
              </>
            ) : (
              <EmptyState
                icon="clock"
                title="No study activity yet today"
                description="Open a chapter and check off a resource or revision round — today's activity will show up here."
                actionLabel="Browse chapters"
                actionHref={allChaptersHref}
              />
            )}
          </div>

          {/* M13 Task 5 — Weekly Progress (last 7 days) */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-5">Weekly Progress</h2>
            <WeeklyProgress events={weeklyEvents} />
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h2 className="font-display text-xl text-navy mb-4">Recent activity</h2>
            {recentResources.length > 0 ? (
              <ul className="space-y-2">
                {recentResources.slice(0, 5).map((r) => (
                  <li key={`${r.cls}-${r.slug}-${r.resourceKey}`}>
                    <Link
                      href={r.path}
                      className="flex items-center justify-between gap-3 text-sm text-navy hover:text-gold-deep transition-colors"
                    >
                      <span>
                        {r.chapterName} — {r.resourceLabel}
                      </span>
                      <span className="text-xs text-slate/50 shrink-0">{formatRelativeTime(r.visitedAt)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon="clock"
                title="No recent study"
                description="Open any Notes, Formula Sheet, DPP, or PYQ page and it'll appear here — and on Continue Studying if left unfinished."
                actionLabel="Browse chapters"
                actionHref={allChaptersHref}
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-3xl font-display text-navy">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mt-1">{label}</p>
    </div>
  );
}


function WeakGroup({
  title,
  entries,
}: {
  title: string;
  entries: { cls: "11" | "12"; slug: string; name: string; detail: string }[];
}) {
  if (entries.length === 0) {
    return (
      <div>
        <h3 className="font-semibold text-navy text-sm mb-2.5">{title}</h3>
        <p className="text-xs text-slate/50">None — nice work.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-navy text-sm mb-2.5">
        {title} <span className="text-slate/50 font-normal">({entries.length})</span>
      </h3>
      <ul className="space-y-2">
        {entries.slice(0, 5).map((e) => (
          <li key={`${e.cls}-${e.slug}`}>
            <Link
              href={`/class-${e.cls}/${e.slug}`}
              className="block text-sm text-navy hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
            >
              {e.name}
              <span className="block text-xs text-slate/50">{e.detail}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendationGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-navy text-sm mb-2.5">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function RecommendationLink({
  href,
  primary,
  secondary,
}: {
  href: string;
  primary: string;
  secondary?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-md border border-navy/10 px-3.5 py-2.5 hover:border-gold hover:bg-ivory transition-colors focus-visible:outline-2 focus-visible:outline-gold"
      >
        <span className="block text-sm font-semibold text-navy">{primary}</span>
        {secondary && <span className="block text-xs text-slate/60 mt-0.5">{secondary}</span>}
      </Link>
    </li>
  );
}
