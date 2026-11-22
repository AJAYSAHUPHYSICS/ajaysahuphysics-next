import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Activity log duplicates (Phase 2 tools audit): reloading or quickly
// returning to the same chapter must not add a new "Opened chapter" entry each
// time. Real actions (completions, revisions, bookmarks, mistakes) are always
// recorded. The stored format (atlas:activity-log) is unchanged.
function memoryStorage() {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) };
}
const T0 = Date.parse("2026-11-22T10:00:00Z");
const kinematics = { type: "chapter-visited", cls: "11", slug: "kinematics", label: "Kinematics" } as const;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(T0);
  vi.stubGlobal("window", { localStorage: memoryStorage(), dispatchEvent: () => true });
  vi.resetModules();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("activity log: no duplicate chapter visits", () => {
  it("a reload of the same chapter within 30 minutes is one visit", async () => {
    const { logActivity, getActivityLog } = await import("@/lib/activity-log");
    logActivity(kinematics);
    vi.setSystemTime(T0 + 5 * 60_000);
    logActivity(kinematics);
    vi.setSystemTime(T0 + 29 * 60_000);
    logActivity(kinematics);
    expect(getActivityLog().filter((e) => e.type === "chapter-visited")).toHaveLength(1);
  });

  it("a return after 30 minutes is a new visit", async () => {
    const { logActivity, getActivityLog, VISIT_DEDUPE_MS } = await import("@/lib/activity-log");
    logActivity(kinematics);
    vi.setSystemTime(T0 + VISIT_DEDUPE_MS);
    logActivity(kinematics);
    expect(getActivityLog().filter((e) => e.type === "chapter-visited")).toHaveLength(2);
  });

  it("visits to different chapters are each recorded", async () => {
    const { logActivity, getActivityLog } = await import("@/lib/activity-log");
    logActivity(kinematics);
    logActivity({ type: "chapter-visited", cls: "12", slug: "atoms", label: "Atoms" });
    logActivity({ type: "chapter-visited", cls: "12", slug: "kinematics", label: "Kinematics" });
    expect(getActivityLog()).toHaveLength(3);
  });

  it("real actions are never deduplicated, even when repeated straight away", async () => {
    const { logActivity, getActivityLog } = await import("@/lib/activity-log");
    for (let i = 0; i < 3; i++) logActivity({ type: "resource-completed", cls: "11", slug: "kinematics", label: "Notes" });
    logActivity({ type: "bookmark-added", cls: "11", slug: "kinematics", label: "Kinematics" });
    expect(getActivityLog()).toHaveLength(4);
  });

  it("the stored format is unchanged: newest first, each entry { type, cls, slug, label, at }", async () => {
    const { logActivity } = await import("@/lib/activity-log");
    logActivity(kinematics);
    vi.setSystemTime(T0 + 1000);
    logActivity({ type: "resource-completed", cls: "11", slug: "kinematics", label: "Notes" });
    const stored = JSON.parse((window as unknown as { localStorage: Storage }).localStorage.getItem("atlas:activity-log")!);
    expect(stored.map((e: { type: string }) => e.type)).toEqual(["resource-completed", "chapter-visited"]);
    expect(Object.keys(stored[0]).sort()).toEqual(["at", "cls", "label", "slug", "type"]);
  });
});
