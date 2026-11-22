import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import ActivityClient from "@/app/dashboard/activity/ActivityClient";
import RevisionClient from "@/app/dashboard/revision/RevisionClient";

// Regression test for React hydration error #418 on /dashboard/activity/
// (seen on the live site, 2026-11-22, the day after the build). These pages
// are prerendered on the build day and hydrated on another, so the
// prerendered HTML must not depend on the current date. The browser's own
// time is used only after hydration (src/lib/use-client-now.ts).
const render = (component: () => unknown, at: number) => {
  vi.setSystemTime(at);
  return renderToString(createElement(component as never));
};
const BUILD_DAYS = [Date.UTC(2026, 10, 21, 4), Date.UTC(2026, 10, 22, 4), Date.UTC(2026, 11, 31, 23, 30), Date.UTC(2027, 1, 28, 12)];

afterEach(() => vi.useRealTimers());

describe("study pages are hydration-safe across a date change", () => {
  it("/dashboard/activity/: the same HTML whatever the build day", () => {
    vi.useFakeTimers();
    const html = BUILD_DAYS.map((d) => render(ActivityClient, d));
    for (const h of html.slice(1)) expect(h).toBe(html[0]);
  });

  it("/dashboard/activity/: the prerendered calendar keeps its 28 cells (no layout shift) and holds no dates", () => {
    vi.useFakeTimers();
    const html = render(ActivityClient, BUILD_DAYS[0]);
    expect(html.match(/<li /g)?.length).toBe(28);
    expect(html).not.toMatch(/20\d\d-\d\d-\d\d/);
  });

  it("/dashboard/revision/: the same HTML whatever the build day", () => {
    vi.useFakeTimers();
    const html = BUILD_DAYS.map((d) => render(RevisionClient, d));
    for (const h of html.slice(1)) expect(h).toBe(html[0]);
  });
});
