#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────
// generate-og-images.mjs: builds the 30 chapter Open Graph images
// (public/og/class-{11|12}/{slug}.png, 1200 × 630 PNG, < 300 KB).
//
// Run manually (`npm run og:generate`) when a chapter image changes; the
// PNGs are committed, so neither CI nor `next build` needs this toolchain.
//
// Inputs (all in the repo):
//   assets/og-sources/sources.json   the 30 verified illustrations + credits
//   assets/og-sources/originals/     unmodified Wikimedia Commons SVGs
//   assets/og-sources/derived/       edited copies (see derive-og-sources.mjs)
//   assets/og-fonts/                 Source Serif 4 / Source Sans 3 (OFL-1.1)
//
// Design: navy background with a faint grid, gold eyebrow and rule, chapter
// title in Source Serif 4, supporting text in Source Sans 3, and the
// illustration on an ivory card with its ORIGINAL colours. CC BY images
// carry their credit line under the card.
// ─────────────────────────────────────────────────────────────────
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets", "og-sources");
const FONT_DIR = path.join(ROOT, "assets", "og-fonts");
const sources = JSON.parse(readFileSync(path.join(SRC, "sources.json"), "utf8"));
const ONLY = process.argv[2]; // optional: a single slug

const W = 1200, H = 630, MAX_BYTES = 300 * 1024;
const NAVY = "#0b1f45", GOLD = "#c9a84c", IVORY = "#fbf8f0", WHITE = "#ffffff";
const LEFT = 72, TEXT_MAX_W = 520;
const CARD = { x: 640, y: 64, w: 488, h: 470, pad: 26 };

const font = {
  fontFiles: ["SourceSerif4-Bold.ttf", "SourceSerif4-Semibold.ttf", "SourceSans3-Regular.ttf", "SourceSans3-Semibold.ttf"].map((f) => path.join(FONT_DIR, f)),
  // System fonts stay available for symbols inside third-party diagrams (e.g. ℰ, Ω).
  loadSystemFonts: true,
  defaultFontFamily: "Source Sans 3",
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Width in px of a single line of text, measured by resvg itself. */
function measure(text, family, weight, size, letterSpacing = 0) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="400"><text x="0" y="200" font-family="${family}" font-weight="${weight}" font-size="${size}" letter-spacing="${letterSpacing}">${esc(text)}</text></svg>`;
  const b = new Resvg(svg, { font }).getBBox();
  return b ? b.width : 0;
}

/** Greedy word wrap into at most maxLines lines; returns null if it does not fit. */
function wrap(text, family, weight, size, maxW, maxLines) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (measure(next, family, weight, size) <= maxW) line = next;
    else {
      if (!line) return null;
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines.length <= maxLines && lines.every((l) => measure(l, family, weight, size) <= maxW) ? lines : null;
}

function fitTitle(title) {
  for (const size of [60, 56, 52, 48, 44, 40]) {
    const lines = wrap(title, "Source Serif 4", 700, size, TEXT_MAX_W, 3);
    if (lines) return { size, lines };
  }
  throw new Error(`title does not fit: ${title}`);
}

/** Renders the illustration to a PNG exactly filling the card's inner box (aspect preserved). */
function renderIllustration(svgText) {
  const box = { w: CARD.w - 2 * CARD.pad, h: CARD.h - 2 * CARD.pad };
  const probe = new Resvg(svgText, { font });
  const ratio = probe.width / probe.height;
  const fit = ratio > box.w / box.h ? { mode: "width", value: box.w } : { mode: "height", value: box.h };
  const img = new Resvg(svgText, { font, fitTo: fit }).render();
  return { png: img.asPng(), width: img.width, height: img.height };
}

function credit(entry) {
  if (!entry.imageCredit) return { svg: "", lines: [] };
  const size = 14;
  // One line if it fits; otherwise break at the natural seam so the licence
  // name is never split: "Illustration: <author>" / "Wikimedia Commons · CC BY x · adapted".
  const [who, rest] = entry.imageCredit.split(" / ");
  const lines = measure(entry.imageCredit, "Source Sans 3", 400, size) <= CARD.w ? [entry.imageCredit] : [who, rest];
  if (lines.some((l) => measure(l, "Source Sans 3", 400, size) > CARD.w)) throw new Error(`credit does not fit: ${entry.slug}`);
  const svg = lines
    .map((l, i) => `<text x="${CARD.x + CARD.w}" y="${CARD.y + CARD.h + 24 + i * 18}" text-anchor="end" font-family="Source Sans 3" font-weight="400" font-size="${size}" fill="${WHITE}" fill-opacity="0.72">${esc(l)}</text>`)
    .join("");
  return { svg, lines };
}

function frame(entry, art) {
  const { size, lines } = fitTitle(entry.chapter);
  const lineH = Math.round(size * 1.12);
  const eyebrowY = 146;
  const titleTop = eyebrowY + 30 + size;
  const titleSvg = lines.map((l, i) => `<tspan x="${LEFT}" y="${titleTop + i * lineH}">${esc(l)}</tspan>`).join("");
  const afterTitle = titleTop + (lines.length - 1) * lineH;
  const subY = afterTitle + 52;
  const ruleY = subY + 34;

  let grid = "";
  for (let x = 40; x < W; x += 40) grid += `M${x} 0V${H}`;
  for (let y = 40; y < H; y += 40) grid += `M0 ${y}H${W}`;

  const ax = CARD.x + Math.round((CARD.w - art.width) / 2);
  const ay = CARD.y + Math.round((CARD.h - art.height) / 2);
  const cr = credit(entry);

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <path d="${grid}" stroke="${WHITE}" stroke-opacity="0.045" stroke-width="1" fill="none"/>
  <text x="${LEFT}" y="${eyebrowY}" font-family="Source Sans 3" font-weight="600" font-size="20" letter-spacing="3.2" fill="${GOLD}">CLASS ${entry.class} · CHAPTER ${entry.number}</text>
  <text font-family="Source Serif 4" font-weight="700" font-size="${size}" fill="${WHITE}">${titleSvg}</text>
  <text x="${LEFT}" y="${subY}" font-family="Source Sans 3" font-weight="400" font-size="23" fill="${WHITE}" fill-opacity="0.74">Notes, formulas, DPPs &amp; PYQs for JEE and NEET</text>
  <rect x="${LEFT}" y="${ruleY}" width="72" height="5" rx="1" fill="${GOLD}"/>
  <text x="${LEFT}" y="574" font-family="Source Serif 4" font-weight="700" font-size="30"><tspan fill="${WHITE}">Ajay Sahu </tspan><tspan fill="${GOLD}">Physics</tspan></text>
  <text x="${LEFT}" y="602" font-family="Source Sans 3" font-weight="400" font-size="18" fill="${WHITE}" fill-opacity="0.6">ajaysahuphysics.com</text>
  <rect x="${CARD.x}" y="${CARD.y}" width="${CARD.w}" height="${CARD.h}" rx="14" fill="${IVORY}" stroke="${GOLD}" stroke-opacity="0.45" stroke-width="1.5"/>
  <image x="${ax}" y="${ay}" width="${art.width}" height="${art.height}" xlink:href="data:image/png;base64,${art.png.toString("base64")}"/>
  ${cr.svg}
</svg>`;
}

const results = [];
for (const entry of sources.filter((s) => !ONLY || s.slug === ONLY)) {
  const originalPath = path.join(SRC, "originals", entry.original);
  const sha256 = createHash("sha256").update(readFileSync(originalPath)).digest("hex");
  if (sha256 !== entry.sha256) throw new Error(`${entry.original}: SHA-256 does not match sources.json`);
  const inputPath = entry.derived ? path.join(SRC, "derived", entry.derived) : originalPath;
  if (!existsSync(inputPath)) throw new Error(`missing input ${inputPath} (run derive-og-sources.mjs)`);

  const art = renderIllustration(readFileSync(inputPath, "utf8"));
  const png = new Resvg(frame(entry, art), { font, fitTo: { mode: "width", value: W } }).render().asPng();
  if (png.length > MAX_BYTES) throw new Error(`${entry.slug}: ${png.length} B exceeds 300 KB`);
  const out = path.join(ROOT, entry.output);
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, png);
  results.push({ slug: entry.slug, bytes: png.length });
  console.log(`${entry.output}  ${(png.length / 1024).toFixed(1)} KB${entry.derived ? "  (derived)" : ""}${entry.imageCredit ? "  (credit)" : ""}`);
}
console.log(`generated ${results.length} image(s); largest ${(Math.max(...results.map((r) => r.bytes)) / 1024).toFixed(1)} KB`);
