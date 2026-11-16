import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slugify";

// Smoke test for the test setup itself: proves Vitest runs, TypeScript
// is transformed, and the "@/" path alias resolves like it does in Next.js.
describe("test setup", () => {
  it("resolves the @/ alias and runs TypeScript", () => {
    expect(slugify("Work, Energy & Power")).toBe("work-energy-power");
  });
});
