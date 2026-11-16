import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hasNotesPdf, notesPdfHref } from "@/lib/notes-pdf";

// Uses a temporary public/ directory so these tests never depend on
// which real PDFs happen to exist (restoring a missing PDF must not
// require a test change).
let publicDir: string;

beforeAll(() => {
  publicDir = mkdtempSync(path.join(tmpdir(), "notes-pdf-test-"));
  mkdirSync(path.join(publicDir, "notes-pdf", "class-11"), { recursive: true });
  mkdirSync(path.join(publicDir, "notes-pdf", "class-12"), { recursive: true });
  writeFileSync(path.join(publicDir, "notes-pdf", "class-11", "kinematics.pdf"), "%PDF-test");
  writeFileSync(path.join(publicDir, "notes-pdf", "class-12", "atoms.pdf"), "%PDF-test");
  writeFileSync(path.join(publicDir, "secret.pdf"), "%PDF-test");
});

afterAll(() => {
  rmSync(publicDir, { recursive: true, force: true });
});

describe("hasNotesPdf", () => {
  it("is true when the PDF exists", () => {
    expect(hasNotesPdf("11", "kinematics", publicDir)).toBe(true);
    expect(hasNotesPdf("12", "atoms", publicDir)).toBe(true);
  });

  it("is false when the PDF is missing", () => {
    expect(hasNotesPdf("12", "wave-optics", publicDir)).toBe(false);
  });

  it("looks only in the chapter's own class folder", () => {
    expect(hasNotesPdf("12", "kinematics", publicDir)).toBe(false);
    expect(hasNotesPdf("11", "atoms", publicDir)).toBe(false);
  });

  it("rejects slugs that could escape the notes-pdf folder", () => {
    expect(hasNotesPdf("12", "../../secret", publicDir)).toBe(false);
    expect(hasNotesPdf("12", "../secret", publicDir)).toBe(false);
    expect(hasNotesPdf("12", "", publicDir)).toBe(false);
    expect(hasNotesPdf("12", "Atoms", publicDir)).toBe(false);
  });

  it("rejects an unknown class", () => {
    expect(hasNotesPdf("13" as "12", "atoms", publicDir)).toBe(false);
  });
});

describe("notesPdfHref", () => {
  it("keeps the existing public URL format", () => {
    expect(notesPdfHref("12", "wave-optics")).toBe("/notes-pdf/class-12/wave-optics.pdf");
    expect(notesPdfHref("11", "kinematics")).toBe("/notes-pdf/class-11/kinematics.pdf");
  });
});
