"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import {
  getBookmarks,
  subscribeToBookmarks,
  toggleBookmark,
  type Bookmark,
} from "@/lib/bookmarks";
import {
  getAllChecklists,
  countCompleted,
  subscribeToChecklist,
  type ChecklistItemKey,
} from "@/lib/checklist";
import { getAllRevision, totalRevisionRounds, subscribeToRevision } from "@/lib/revision";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import { getRecentlyViewedResources } from "@/lib/recently-viewed-resources";
import StudyStreakBadge from "./StudyStreakBadge";

export type DashboardChapter = {
  cls: "11" | "12";
  slug: string;
  name: string;
  number: number;
  availableChecklist: ChecklistItemKey[];
  relatedChapters: { slug: string; reason: string }[];
};

// Read-once on mount, same rationale as ContinueLearning.tsx: these
// don't change while the dashboard itself is open (a student can't be
// visiting a chapter and viewing the dashboard at the same time).
const noopSubscribe = () => () => {};

const EMPTY_CHECKLISTS: ReturnType<typeof getAllChecklists> = {};
const EMPTY_REVISION: ReturnType<typeof getAllRevision> = {};
const EMPTY_BOOKMARKS: Bookmark[] = [];
const EMPTY_RECENT_CHAPTERS: ReturnType<typeof getRecentlyViewed> = [];
const EMPTY_RECENT_RESOURCES: ReturnType<typeof getRecentlyViewedResources> = [];

export default function DashboardClient({ chapters }: { chapters: DashboardChapter[] }) {
  const checklists = useSyncExternalStore(
    subscribeToChecklist,
    getAllChecklists,
    () => EMPTY_CHECKLISTS
  );
  const revisionMap = useSyncExternalStore(
    subscribeToRevision,
    getAllRevision,
    () => EMPTY_REVISION
  );
  const bookmarks = useSyncExternalStore(subscribeToBookmarks, getBookmarks, () => EMPTY_BOOKMARKS);
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

  const chapterMap = new Map(chapters.map((c) => [c.slug, c]));

  const chaptersWithProgress = chapters.map((ch) => {
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const done = countCompleted(state);
    const total = ch.availableChecklist.length;
    return { ...ch, done, total, state };
  });

  const chaptersCompleted = chaptersWithProgress.filter(
    (c) => c.total > 0 && c.done === c.total
  ).length;
  const resourcesCompleted = chaptersWithProgress.reduce((sum, c) => sum + c.done, 0);
  const revisionCount = totalRevisionRounds(revisionMap);

  // Recommendation 1: chapters started but not finished.
  const inProgress = chaptersWithProgress
    .filter((c) => c.total > 0 && c.done > 0 && c.done < c.total)
    .slice(0, 4);
  const notStarted = chaptersWithProgress
    .filter((c) => c.total > 0 && c.done === 0)
    .slice(0, 4);
  const incompleteChapters = inProgress.length > 0 ? inProgress : notStarted;

  // Recommendation 2: bookmarks (most recent first, already sorted).
  const recommendedBookmarks = bookmarks.slice(0, 4);

  // Recommendation 3: recently viewed resources.
  const recommendedRecent = recentResources.slice(0, 4);

  // Recommendation 4: related chapters, drawn from chapters the student
  // has actually engaged with (checklist or revision progress), excluding
  // chapters already fully complete.
  const engagedSlugs = new Set([
    ...chaptersWithProgress.filter((c) => c.done > 0).map((c) => c.slug),
    ...Object.entries(revisionMap)
      .filter(([, rounds]) => rounds.length > 0)
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
    bookmarks.length > 0 ||
    resourcesCompleted > 0 ||
    revisionCount > 0 ||
    recentChapters.length > 0;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-5">Your progress</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <Stat value={chaptersCompleted} label="Chapters completed" />
          <Stat value={resourcesCompleted} label="Resources completed" />
          <Stat value={bookmarks.length} label="Bookmarks" />
          <Stat value={revisionCount} label="Revision rounds" />
        </div>
        <div className="pt-6 border-t border-navy/10">
          <StudyStreakBadge />
        </div>
      </div>

      {!hasAnyActivity && (
        <div className="rounded-lg border border-dashed border-navy/15 bg-ivory p-7 sm:p-9 text-center">
          <p className="text-slate">
            Nothing tracked yet. Open a chapter and check off Notes, Formula Sheet, DPP, or
            PYQ as you complete them — your progress, streak, and recommendations will show
            up here.
          </p>
        </div>
      )}

      {/* Bookmarked Resources */}
      {bookmarks.length > 0 && (
        <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
          <h3 className="font-display text-xl text-navy mb-4">Bookmarked Resources</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarks.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 rounded-md border border-navy/10 px-4 py-3">
                <Link
                  href={b.path}
                  className="min-w-0 text-sm font-semibold text-navy hover:text-gold-deep transition-colors truncate"
                >
                  {b.label}
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark({
                      cls: b.cls,
                      slug: b.slug,
                      type: b.type,
                      chapterName: b.chapterName,
                      label: b.label,
                      path: b.path,
                    })
                  }
                  aria-label={`Remove ${b.label} bookmark`}
                  className="shrink-0 text-xs font-semibold text-slate/50 hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded px-1.5 py-1"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Activity */}
      {(recentChapters.length > 0 || recentResources.length > 0) && (
        <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
          <h3 className="font-display text-xl text-navy mb-4">Recent activity</h3>
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
                  <span className="text-xs text-slate/50 shrink-0">Class {r.cls}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Smart Recommendations */}
      <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-5">Recommended for you</h3>

        {incompleteChapters.length === 0 &&
        recommendedBookmarks.length === 0 &&
        recommendedRecent.length === 0 &&
        relatedRecommendations.length === 0 ? (
          <p className="text-sm text-slate">
            Start checking off chapters and we&apos;ll recommend what to study next.
          </p>
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

function RecommendationGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="font-semibold text-navy text-sm mb-2.5">{title}</h4>
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
