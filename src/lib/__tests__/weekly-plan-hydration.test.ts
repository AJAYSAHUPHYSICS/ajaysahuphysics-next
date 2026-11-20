import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WeeklyPlanCard, { dayHeading } from "@/components/WeeklyPlanCard";
import { buildWeeklyPlan } from "@/lib/weekly-plan";

// Regression test for React hydration error #418 on /dashboard/ (seen on the
// live site, 2026-11-20). The page is prerendered on the build day and hydrated
// on another, so the prerendered HTML must not contain date-dependent text.
const WEEKDAYS = /Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/;

describe("weekly plan headings are hydration-safe", () => {
  it("the server render contains no weekday names, whatever the build day", () => {
    for (let d = 0; d < 7; d++) {
      const buildDay = Date.UTC(2026, 10, 16 + d, 6);
      const html = renderToString(createElement(WeeklyPlanCard, { days: buildWeeklyPlan([], {}, {}, buildDay) }));
      expect(html).not.toMatch(WEEKDAYS);
      expect(html).toContain("Today");
      expect(html).toContain("Tomorrow");
      expect(html).toContain("In 6 days");
    }
  });

  it("two different build days produce identical HTML", () => {
    const a = renderToString(createElement(WeeklyPlanCard, { days: buildWeeklyPlan([], {}, {}, Date.UTC(2026, 10, 19, 6)) }));
    const b = renderToString(createElement(WeeklyPlanCard, { days: buildWeeklyPlan([], {}, {}, Date.UTC(2026, 10, 22, 6)) }));
    expect(a).toBe(b);
  });

  it("in the browser the weekday name is shown again", () => {
    expect(dayHeading(0, "Today", true)).toBe("Today");
    expect(dayHeading(1, "Tomorrow", true)).toBe("Tomorrow");
    expect(dayHeading(3, "Saturday", true)).toBe("Saturday");
    expect(dayHeading(3, "Saturday", false)).toBe("In 3 days");
  });
});
