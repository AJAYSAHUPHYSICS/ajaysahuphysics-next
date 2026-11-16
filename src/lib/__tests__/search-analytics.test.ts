import { describe, expect, it } from "vitest";
import { searchEventParams } from "@/lib/search-analytics";

describe("searchEventParams", () => {
  it("reports the top result's chapter slug as search_term", () => {
    expect(searchEventParams("kinemat", "kinematics", 3)).toEqual({
      search_term: "kinematics",
      result_count: 3,
      query_length_bucket: "4-10",
    });
  });

  it("reports no_results when nothing matched", () => {
    expect(searchEventParams("xyz", undefined, 0)).toEqual({
      search_term: "no_results",
      result_count: 0,
      query_length_bucket: "1-3",
    });
  });

  it("keeps result_count unchanged", () => {
    expect(searchEventParams("optics", "ray-optics-and-optical-instruments", 2).result_count).toBe(2);
  });

  it.each([
    ["a", "1-3"],
    ["abc", "1-3"],
    ["abcd", "4-10"],
    ["abcdefghij", "4-10"],
    ["abcdefghijk", "11+"],
    ["   abc   ", "1-3"], // measured on the trimmed query
  ])("buckets %j as %s", (query, bucket) => {
    expect(searchEventParams(query, undefined, 0).query_length_bucket).toBe(bucket);
  });

  // The privacy guarantee: nothing the student typed is ever sent.
  it.each([
    "Riya Sharma",
    "9876543210",
    "riya.sharma@example.com",
    "my teacher said electric field",
    "  something personal  ",
  ])("never includes the typed query %j", (query) => {
    for (const top of [undefined, "electric-charges-and-fields"]) {
      const params = searchEventParams(query, top, top ? 1 : 0);
      expect(Object.keys(params).sort()).toEqual(["query_length_bucket", "result_count", "search_term"]);
      expect(params.search_term).toBe(top ?? "no_results");
      const sent = JSON.stringify(params).toLowerCase();
      expect(sent).not.toContain(query.trim().toLowerCase());
      for (const word of query.trim().toLowerCase().split(/\s+/)) {
        if (word.length >= 4 && !(top ?? "").includes(word)) expect(sent).not.toContain(word);
      }
    }
  });
});
