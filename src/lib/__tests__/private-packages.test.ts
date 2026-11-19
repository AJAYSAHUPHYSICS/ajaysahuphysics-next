import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publicationReadiness, validateChapterPackage, type ChapterPackage } from "@/lib/content-v2/chapter-package";
import { REBUILT_PACKAGES } from "@/lib/content-v2/rebuilt-packages";
import { allChapters } from "@/lib/chapters";

// ─────────────────────────────────────────────────────────────────
// Private draft workflow: validate real drafts WITHOUT them entering the
// repository. Opt-in and local only (skipped in CI and in a normal run):
//
//   ATLAS_PRIVATE_PACKAGES_DIR="<private folder with *.ts packages>" \
//     npx vitest run src/lib/__tests__/private-packages.test.ts
//
// For every exported ChapterPackage in that folder it checks:
//   - the folder is OUTSIDE this repository (drafts never live here);
//   - the package passes every rule for its current status (author,
//     provenance, structure, IDs, formula references, no PYQ labels…);
//   - it targets an existing chapter route (same class and slug: no new routes);
//   - it does NOT claim "published" (publication only happens through a
//     reviewed repository change plus the switch) and is not registered;
// and prints its publication-readiness blockers (what review still needs
// to settle), grouped, without changing the package.
// No draft text is printed: only IDs and rule messages.
// ─────────────────────────────────────────────────────────────────

const DIR = process.env.ATLAS_PRIVATE_PACKAGES_DIR;
const REPO = path.resolve(__dirname, "..", "..", "..");

function packageFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) return f === "node_modules" ? [] : packageFiles(p);
    return /\.ts$/.test(f) && !/\.(test|d)\.ts$/.test(f) ? [p] : [];
  });
}

const isPackage = (v: unknown): v is ChapterPackage =>
  !!v && typeof v === "object" && (v as ChapterPackage).schemaVersion === 1 && typeof (v as ChapterPackage).id === "string" && Array.isArray((v as ChapterPackage).notes);

/** Groups rule messages by their wording (IDs removed) so the report stays short. */
function summarise(blockers: string[]): string[] {
  const counts = new Map<string, number>();
  for (const b of blockers) {
    const rule = b.replace(/^[^:]*:\s*/, "").replace(/"[^"]*"/g, '"…"');
    counts.set(rule, (counts.get(rule) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([rule, n]) => `${String(n).padStart(4)} × ${rule}`);
}

describe.skipIf(!DIR)("private draft packages (local only)", () => {
  it("validates every private package and reports its publication blockers", async () => {
    const dir = path.resolve(DIR!);
    const rel = path.relative(REPO, dir);
    expect(rel.startsWith("..") || path.isAbsolute(rel), `private drafts must live outside the repository (got ${dir})`).toBe(true);

    const found: { file: string; name: string; pkg: ChapterPackage }[] = [];
    for (const file of packageFiles(dir)) {
      const mod: Record<string, unknown> = await import(/* @vite-ignore */ file);
      for (const [name, v] of Object.entries(mod)) if (isPackage(v)) found.push({ file, name, pkg: v });
    }
    expect(found.length, `no ChapterPackage exports found in ${dir}`).toBeGreaterThan(0);

    const ids = new Set<string>();
    for (const { file, name, pkg } of found) {
      const where = `${path.basename(file)} › ${name} (${pkg.id})`;
      expect(ids.has(pkg.id), `${where}: duplicate package id`).toBe(false);
      ids.add(pkg.id);
      expect(validateChapterPackage(pkg), `${where}: rule violations at status "${pkg.status}"`).toEqual([]);
      expect(allChapters.some((c) => c.cls === pkg.cls && c.slug === pkg.slug), `${where}: no existing route for class ${pkg.cls} / ${pkg.slug}`).toBe(true);
      expect(pkg.status, `${where}: a private draft must not claim "published"`).not.toBe("published");
      expect(REBUILT_PACKAGES[pkg.slug], `${where}: a private draft is registered in the public registry`).toBeUndefined();

      const blockers = publicationReadiness(pkg);
      console.log(
        [
          `\n${where}`,
          `  status: ${pkg.status} | parts: ${pkg.parts?.length ?? 0} | notes: ${pkg.notes.length} | short notes: ${pkg.shortNotes.length} | formulas: ${pkg.formulaSheet.length} | examples: ${pkg.solvedExamples.length} | DPP: ${pkg.dpp.length} | practice: ${pkg.examPractice.length} | experiments: ${pkg.experiments.length} | checklist: ${pkg.revisionChecklist.length}`,
          `  publication blockers: ${blockers.length}${blockers.length ? "" : " (all publication rules met; still needs the reviewed registry change and switch)"}`,
          ...summarise(blockers).map((s) => `  ${s}`),
        ].join("\n"),
      );
    }
  });
});
