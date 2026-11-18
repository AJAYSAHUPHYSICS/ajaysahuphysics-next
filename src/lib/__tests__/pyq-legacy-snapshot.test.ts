import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pyqRegistry } from "@/lib/pyq";

// ─────────────────────────────────────────────────────────────────
// Legacy PYQ snapshot (Phase 2A)
//
// Students' saved PYQ mistakes reference a question by its ORIGINAL
// position in its chapter file (`questionId`). This test freezes those
// positions: chapter, index and SHA-256 hashes of every legacy record
// (no question text is stored). If any legacy record is reordered,
// edited, removed or added, the test fails, before a change could
// silently re-point anyone's saved mistakes.
//
// Regenerate ONLY deliberately, with a reviewed reason:
//   ATLAS_WRITE_PYQ_SNAPSHOT=1 npx vitest run src/lib/__tests__/pyq-legacy-snapshot.test.ts
// ─────────────────────────────────────────────────────────────────

const SNAPSHOT = path.resolve(__dirname, "..", "content-policy", "legacy-pyq-snapshot.json");
const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

type Entry = { chapterSlug: string; index: number; questionSha256: string; recordSha256: string };

function currentEntries(): Entry[] {
  return Object.entries(pyqRegistry).flatMap(([chapterSlug, chapter]) =>
    chapter.questions.map((q, index) => ({
      chapterSlug,
      index,
      questionSha256: sha256(q.question),
      recordSha256: sha256(JSON.stringify(q)),
    }))
  );
}

if (process.env.ATLAS_WRITE_PYQ_SNAPSHOT === "1") {
  writeFileSync(SNAPSHOT, JSON.stringify(currentEntries(), null, 1) + "\n");
}

describe("legacy PYQ snapshot", () => {
  it("exists", () => {
    expect(existsSync(SNAPSHOT)).toBe(true);
  });

  const snapshot: Entry[] = existsSync(SNAPSHOT) ? JSON.parse(readFileSync(SNAPSHOT, "utf8")) : [];

  it("covers all 1,180 legacy records across 30 chapters", () => {
    expect(snapshot).toHaveLength(1180);
    expect(new Set(snapshot.map((e) => e.chapterSlug)).size).toBe(30);
  });

  it("matches the current data exactly: same chapters, positions and content", () => {
    expect(currentEntries()).toEqual(snapshot);
  });

  it("stores hashes only, never question text", () => {
    const raw = readFileSync(SNAPSHOT, "utf8");
    for (const e of snapshot.slice(0, 50)) {
      expect(Object.keys(e).sort()).toEqual(["chapterSlug", "index", "questionSha256", "recordSha256"]);
    }
    const anyQuestion = Object.values(pyqRegistry)[0].questions[0].question;
    expect(raw).not.toContain(anyQuestion);
  });
});
