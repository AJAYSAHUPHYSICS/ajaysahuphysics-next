#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────
// fetch-og-fonts.mjs: one-off, re-runnable download of the brand fonts
// used ONLY by scripts/generate-og-images.mjs (never shipped to students).
//
// Source: Adobe's official repositories (SIL Open Font License 1.1):
//   https://github.com/adobe-fonts/source-serif   (Source Serif 4)
//   https://github.com/adobe-fonts/source-sans    (Source Sans 3)
// Each file is fetched from a pinned commit of the `release` branch and
// verified against the git blob SHA-1 that GitHub reports for that path.
// Writes assets/og-fonts/ plus provenance.json.
// ─────────────────────────────────────────────────────────────────
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets", "og-fonts");
const UA = "ajaysahuphysics-og-fonts/1.0";
const FILES = [
  { repo: "source-serif", path: "TTF/SourceSerif4-Bold.ttf" },
  { repo: "source-serif", path: "TTF/SourceSerif4-Semibold.ttf" },
  { repo: "source-sans", path: "TTF/SourceSans3-Regular.ttf" },
  { repo: "source-sans", path: "TTF/SourceSans3-Semibold.ttf" },
  { repo: "source-serif", path: "LICENSE.md", saveAs: "OFL-SourceSerif4.md" },
  { repo: "source-sans", path: "LICENSE.md", saveAs: "OFL-SourceSans3.md" },
];

const gh = async (url) => {
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/vnd.github+json" } });
  if (!r.ok) throw new Error(`GitHub API ${r.status} for ${url}`);
  return r.json();
};
const gitBlobSha1 = (buf) => createHash("sha1").update(Buffer.concat([Buffer.from(`blob ${buf.length}\0`), buf])).digest("hex");

mkdirSync(OUT, { recursive: true });
const commits = {};
for (const repo of new Set(FILES.map((f) => f.repo))) {
  commits[repo] = (await gh(`https://api.github.com/repos/adobe-fonts/${repo}/commits/release`)).sha;
}
const provenance = { fetchedAt: new Date().toISOString(), license: "SIL Open Font License 1.1 (OFL-1.1)", files: [] };
for (const f of FILES) {
  const commit = commits[f.repo];
  const meta = await gh(`https://api.github.com/repos/adobe-fonts/${f.repo}/contents/${f.path}?ref=${commit}`);
  const url = `https://raw.githubusercontent.com/adobe-fonts/${f.repo}/${commit}/${f.path}`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`download ${r.status} for ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const blob = gitBlobSha1(buf);
  if (blob !== meta.sha || buf.length !== meta.size) throw new Error(`verification failed for ${f.path}: blob ${blob} vs ${meta.sha}`);
  const name = f.saveAs ?? path.basename(f.path);
  writeFileSync(path.join(OUT, name), buf);
  provenance.files.push({ file: name, repo: `adobe-fonts/${f.repo}`, path: f.path, commit, url, bytes: buf.length, gitBlobSha1: blob, sha256: createHash("sha256").update(buf).digest("hex") });
  console.log(`verified ${name} (${buf.length} B, blob ${blob.slice(0, 10)}…, commit ${commit.slice(0, 10)}…)`);
}
writeFileSync(path.join(OUT, "provenance.json"), JSON.stringify(provenance, null, 2) + "\n");
console.log("fonts written to assets/og-fonts/");
