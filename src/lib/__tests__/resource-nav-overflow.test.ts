import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Regression test for horizontal page scrolling on phones (found 2026-11-20 on
// every live chapter and resource page: +530 to +620 px at 320–412 px wide).
// The resource bar is a horizontal scroll container. Its "coming soon" items
// carry an sr-only label (position: absolute). If the nav is not itself
// positioned, those labels use an ancestor outside the scroll container as
// their containing block, escape its clipping and widen the whole page.
// Verified in headless Chrome: with `relative`, page overflow is 0 and the
// bar still scrolls to its last item.
const src = readFileSync(path.resolve(__dirname, "..", "..", "components", "ResourceNav.tsx"), "utf8");

describe("chapter resource bar never widens the page", () => {
  it("the scroll container is the containing block of its absolutely positioned labels", () => {
    const navClass = /<nav[\s\S]*?className="([^"]*)"/.exec(src)?.[1] ?? "";
    expect(navClass.split(/\s+/)).toContain("overflow-x-auto");
    expect(navClass.split(/\s+/)).toContain("relative");
  });

  it("still announces unavailable resources to screen readers", () => {
    expect(src).toContain('<span className="sr-only"> (coming soon)</span>');
  });
});
