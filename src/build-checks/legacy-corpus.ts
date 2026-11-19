import { allChapters } from "@/lib/chapters";
import { notesRegistry } from "@/lib/notes";
import { shortNotesRegistry } from "@/lib/notes/short-index";
import { formulaSheetRegistry } from "@/lib/formula-sheet";
import { dppRegistry } from "@/lib/dpp";
import { jeeNotesRegistry } from "@/lib/jee-notes";
import { jeeDppRegistry } from "@/lib/jee-dpp";
import { pyqRegistry } from "@/lib/pyq";
import { chapterContentRegistry } from "@/lib/chapter-content";
import { chapterOverviews } from "@/lib/chapter-overviews";

// ─────────────────────────────────────────────────────────────────
// Legacy learning-content corpus (test and build-check use only)
//
// Every legacy registry that the central publication policy withholds.
// Used by the unit tests (rendered pages) and by the post-build check
// (the whole static export) to prove none of this text reaches students.
// Never import this from application code.
// ─────────────────────────────────────────────────────────────────

export const LEGACY_REGISTRIES = {
  notes: notesRegistry,
  "short-notes": shortNotesRegistry,
  "formula-sheet": formulaSheetRegistry,
  dpp: dppRegistry,
  "jee-notes": jeeNotesRegistry,
  "jee-dpp": jeeDppRegistry,
  pyq: pyqRegistry,
  "chapter-guidance": chapterContentRegistry,
  "chapter-overview": chapterOverviews,
} as const;

const CHAPTER_NAMES = new Set(allChapters.map((c) => c.name));

/** Every prose string (30+ chars, 4+ words, not a chapter name) in the legacy registries, cut to 60 chars. */
export function legacyStrings(): { source: string; text: string }[] {
  const out: { source: string; text: string }[] = [];
  const walk = (source: string, v: unknown) => {
    if (typeof v === "string") {
      // Prose only: identifiers and slugs (no spaces) legitimately appear in URLs.
      if (v.length >= 30 && !CHAPTER_NAMES.has(v) && (v.match(/ /g) ?? []).length >= 3)
        out.push({ source, text: v.slice(0, 60) });
    } else if (Array.isArray(v)) v.forEach((x) => walk(source, x));
    else if (v && typeof v === "object") Object.values(v).forEach((x) => walk(source, x));
  };
  for (const [source, reg] of Object.entries(LEGACY_REGISTRIES)) walk(source, reg);
  return out;
}

/** Every string in the legacy registries, in full (for near-copy checks of new content). */
export function legacyFullStrings(): { source: string; text: string }[] {
  const out: { source: string; text: string }[] = [];
  const walk = (source: string, v: unknown) => {
    if (typeof v === "string") out.push({ source, text: v });
    else if (Array.isArray(v)) v.forEach((x) => walk(source, x));
    else if (v && typeof v === "object") Object.values(v).forEach((x) => walk(source, x));
  };
  for (const [source, reg] of Object.entries(LEGACY_REGISTRIES)) walk(source, reg);
  return out;
}

/** Lower-cased word 8-grams (letters and digits only), for near-copy detection. */
export function wordShingles(text: string, k = 8): Set<string> {
  const w = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(" ").filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + k <= w.length; i++) out.add(w.slice(i, i + k).join(" "));
  return out;
}

/** Text as React and the RSC payload encode it, decoded back to plain characters. */
export function normaliseBuiltText(t: string): string {
  return t
    .replace(/<!-- -->/g, "")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\\u0026/g, "&")
    .replace(/\\"/g, '"');
}

/**
 * Every place a legacy string appears in `text`: each 60-char window that
 * starts at a word boundary is looked up against the first 60 characters of
 * every legacy string of that length.
 */
export function findLegacyText(text: string, strings = legacyStrings()): string[] {
  const KEY = 60;
  const keys = new Map<string, string>();
  for (const l of strings) if (l.text.length >= KEY) keys.set(l.text.slice(0, KEY), `${l.source}: ${l.text}`);
  const t = normaliseBuiltText(text);
  const hits: string[] = [];
  for (let i = 0; i + KEY <= t.length; i++) {
    if (i > 0 && /[\p{L}\p{N}]/u.test(t[i - 1])) continue;
    const hit = keys.get(t.slice(i, i + KEY));
    if (hit) hits.push(hit);
  }
  return hits;
}
