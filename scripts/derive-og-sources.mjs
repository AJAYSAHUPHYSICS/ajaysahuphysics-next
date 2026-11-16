#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────
// derive-og-sources.mjs: builds the edited ("derived") copies of the
// few Open Graph illustrations that need targeted changes.
//
//   assets/og-sources/originals/  unmodified Wikimedia Commons files (never edited)
//   assets/og-sources/derived/    the edited copies written by this script
//
// Every edit is deliberately narrow and self-checking: the source file's
// SHA-256 must match the verified record, and every element being changed
// must be found EXACTLY once, otherwise the script stops with an error.
// All modifications are also listed in docs/ASSET_CREDITS.md.
// ─────────────────────────────────────────────────────────────────
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets", "og-sources");
const sources = JSON.parse(readFileSync(path.join(SRC, "sources.json"), "utf8"));

function replaceOnce(svg, find, replacement, what) {
  const count = svg.split(find).length - 1;
  if (count !== 1) throw new Error(`${what}: expected exactly 1 match, found ${count}`);
  return svg.replace(find, replacement);
}

/** Removes the element (path, or g with all children) whose id is `id`; must exist exactly once. */
function removeElementById(svg, id, what) {
  const re = new RegExp(`<(g|path)\\b[^>]*\\bid="${id.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")}"`, "g");
  const hits = [...svg.matchAll(re)];
  if (hits.length !== 1) throw new Error(`${what}: element #${id} found ${hits.length} times`);
  const start = hits[0].index;
  let end;
  if (hits[0][1] === "path") end = svg.indexOf("/>", start) + 2;
  else {
    const tag = /<\/?g\b[^>]*>/g;
    tag.lastIndex = start;
    let depth = 0, m;
    while ((m = tag.exec(svg))) {
      if (m[0].startsWith("</")) depth--;
      else if (!m[0].endsWith("/>")) depth++;
      if (depth === 0) { end = m.index + m[0].length; break; }
    }
  }
  return svg.slice(0, start) + svg.slice(end);
}

const LABEL_STYLE = 'font-family="Source Sans 3" font-weight="600"';

const EDITS = {
  // Class 11 · Physical World & Measurement: crop to the jaws and scales, remove
  // the numbered callouts ①–⑧ (they point to a legend that is not part of the image).
  "physical-world-and-measurement": (svg) => {
    svg = removeElementById(svg, "labels", "Vernier callouts group");
    svg = replaceOnce(svg, 'width="3040"', 'width="1240"', "Vernier width");
    svg = replaceOnce(svg, 'height="1080"', 'height="980" viewBox="60 20 1240 980"', "Vernier height/viewBox");
    return svg;
  },

  // Class 11 · Laws of Motion: replace the German-convention force labels
  // (F_G weight, F_H "Hangabtriebskraft", F_N normal component) with English
  // component labels. All arrows, angle marks and construction lines are unchanged;
  // the neutral symbols m, h, l and α are kept.
  "laws-of-motion": (svg) => {
    const groups = [
      // label, subscript, overbar arrow
      ["text839-5", "text839-5-1", "path1816"], // F_N on the incline
      ["text839-5-0", "text839-5-1-4", "path1816-2"], // F_G on the incline (red)
      ["text839-5-6", "text839-5-1-8", "path1816-7"], // F_H on the incline
      ["text839-5-8", "text839-5-1-6", "path1816-0"], // F_N in the vector triangle
      ["text839-5-0-0", "text839-5-1-4-6", "path1816-2-6"], // F_G in the vector triangle (red)
      ["text839-5-6-7", "text839-5-1-8-6", "path1816-7-8"], // F_H in the vector triangle
    ];
    for (const ids of groups) for (const id of ids) svg = removeElementById(svg, id, "Incline force label");
    // New labels, in root user units (positions taken from the removed labels' bounding boxes).
    const labels = `
  <g id="atlas-english-labels" ${LABEL_STYLE} font-size="12">
    <text x="82" y="106" text-anchor="end">mg cos α</text>
    <text x="126" y="152" fill="#ff0000">mg</text>
    <text x="150" y="60">mg sin α</text>
    <text x="264" y="34" text-anchor="end">mg cos α</text>
    <text x="293" y="50" fill="#ff0000">mg</text>
    <text x="252" y="110">mg sin α</text>
  </g>
</svg>`;
    return replaceOnce(svg, "</svg>", labels, "Incline closing tag");
  },

  // Class 11 · Oscillations: replace the German word "Zeit" (four single-letter text
  // elements) with the English "time"; the time arrow next to it is kept.
  oscillations: (svg) => {
    return replaceOnce(
      svg,
      '<text x="1250" y="18576">Z</text>\n    <text x="2025" y="18576">e</text>\n    <text x="2732" y="18576">i</text>\n    <text x="3015" y="18576">t</text>',
      '<text x="1100" y="18576" font-family="Source Sans 3" font-weight="400">time</text>',
      'Oscillations "Zeit"'
    );
  },
};

mkdirSync(path.join(SRC, "derived"), { recursive: true });
for (const [slug, edit] of Object.entries(EDITS)) {
  const entry = sources.find((s) => s.slug === slug);
  if (!entry) throw new Error(`no sources.json entry for ${slug}`);
  const buf = readFileSync(path.join(SRC, "originals", entry.original));
  const sha256 = createHash("sha256").update(buf).digest("hex");
  if (sha256 !== entry.sha256) throw new Error(`${entry.original}: SHA-256 does not match the verified record`);
  const out = edit(buf.toString("utf8").replace(/\r\n/g, "\n"));
  writeFileSync(path.join(SRC, "derived", entry.derived), out);
  console.log(`derived ${entry.derived}`);
}
