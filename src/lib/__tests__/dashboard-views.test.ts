import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import DashboardClient, { type DashboardView } from "@/components/DashboardClient";

// Owner decision (2026-11-20): the dashboard overview shows five essentials;
// every other card lives on exactly one study page. Rendered on the server
// (empty device), as the static export does.
const headings = (view: DashboardView) =>
  [...renderToString(createElement(DashboardClient, { chapters: [], view })).matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/&#x27;|&apos;/g, "'").trim());

describe("dashboard views", () => {
  it("the overview shows exactly the five approved cards, in order", () => {
    expect(headings("overview")).toEqual(["Continue Studying", "Due for revision", "Today's plan", "Mistakes to retry", "Study streak"]);
  });

  it("every secondary card appears on exactly one study page", () => {
    const views: DashboardView[] = ["progress", "revision", "mistakes", "activity"];
    const all = views.flatMap((v) => headings(v).map((h) => `${v}:${h}`));
    const names = all.map((x) => x.split(":")[1]);
    expect(new Set(names).size).toBe(names.length); // no card on two pages
    expect(headings("progress")).toEqual(expect.arrayContaining(["Exam Readiness", "Productivity Score", "Study Goals", "Today's Targets", "This Week's Targets", "Smart Recommendations", "Recommended Today", "Your progress", "Resource Gaps", "Progress Forecast", "Needs attention", "Strength Analysis", "Recommended for you"]));
    expect(headings("revision")).toEqual(["Revision Health", "Revision Timeline", "Weekly Plan", "Mastered Chapters", "Revision History"]);
    expect(headings("mistakes")).toEqual(["Mistake Notebook", "Chapter Performance", "Concept Analysis", "Practice Again"]);
    expect(headings("activity")).toEqual(["Milestones", "Achievements", "Today's Activity", "Weekly Progress", "Recent activity"]);
    for (const h of headings("overview")) expect(names, h).not.toContain(h);
  });

  it("links to sections on other pages point at those pages, not dead in-page anchors", () => {
    const overview = renderToString(createElement(DashboardClient, { chapters: [], view: "overview" }));
    expect(overview).not.toContain('href="#all-chapters"');
    expect(overview).toContain('href="/dashboard/progress#all-chapters"');
    const activity = renderToString(createElement(DashboardClient, { chapters: [], view: "activity" }));
    expect(activity).not.toContain('href="#continue-studying"');
  });
});
