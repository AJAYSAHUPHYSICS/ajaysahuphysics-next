import { describe, expect, it } from "vitest";
import { allChapters } from "@/lib/chapters";
import { getChapterPyq } from "@/lib/pyq";
import { isResourceIndexable, resourceRegistry, RESOURCE_ORDER } from "@/lib/resource-registry";

const pyqChapters = allChapters.filter((c) => getChapterPyq(c.slug));

describe("resource registry: withheld PYQs", () => {
  it("keeps every PYQ route (hasData unchanged)", () => {
    expect(pyqChapters).toHaveLength(30);
    for (const c of pyqChapters) expect(resourceRegistry.pyq.hasData(c.slug)).toBe(true);
  });

  it("marks withheld PYQ pages non-indexable (noindex, out of sitemap)", () => {
    for (const c of pyqChapters) expect(isResourceIndexable(resourceRegistry.pyq, c.slug)).toBe(false);
  });

  it("describes PYQ pages without question counts or source claims", () => {
    for (const c of pyqChapters) {
      const d = resourceRegistry.pyq.describe(c.name, c.slug);
      expect(d).toMatch(/being rebuilt/);
      expect(d).not.toMatch(/\d/);
      expect(d).not.toMatch(/cengage|allen|aiims/i);
    }
  });

  it("removes the Cengage claim from JEE Notes descriptions", () => {
    for (const c of allChapters) expect(resourceRegistry["jee-notes"].describe(c.name, c.slug)).not.toMatch(/cengage/i);
  });

  it("keeps every other resource route too (content withheld since the open-source migration)", () => {
    for (const key of RESOURCE_ORDER.filter((k) => k !== "pyq")) {
      for (const c of allChapters) {
        const def = resourceRegistry[key];
        if (def.hasData(c.slug)) expect(isResourceIndexable(def, c.slug)).toBe(false);
      }
    }
  });
});
