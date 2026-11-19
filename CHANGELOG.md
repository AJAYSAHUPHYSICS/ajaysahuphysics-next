# Changelog

All notable changes to AjaySahuPhysics.com are recorded here, grouped by
phase branch. `[Unreleased]` holds work not yet merged to `main`; each
released heading names its pull request and the date it was merged.
Merging to `main` deploys to production.

## [Unreleased]

### Phase 2A completion (`phase-2a-content-foundation`; local commits, not pushed)

No routes, page output, sitemap entries, localStorage keys or data formats changed. Every publication switch is still off.

#### Changed
- **Stricter publication rules for rebuilt chapter packages** (`src/lib/content-v2/chapter-package.ts`):
  - licence evidence must confirm that commercial use is permitted;
  - real http(s) source URLs;
  - every date (approvals, licence evidence, PYQ retrieval and verification, formula-sheet `lastUpdated`) must be a real calendar date in strict `YYYY-MM-DD`; impossible dates such as 2026-02-30 are rejected;
  - approvals need a named reviewer independent of the author. Names are compared after removing trailing annotations such as "(draft)", punctuation, spacing, case and accents, and the site's own names (AjaySahuPhysics, Ajay Sahu Physics, Ajay Sahu) count as one identity. The same rule applies in the question bank (`question-bank.ts`);
  - a reviewed difficulty on questions and examples;
  - diagrams only from safe, root-relative image paths on the site, with unique IDs. External and protocol-relative URLs, schemes, backslashes, whitespace, `.`/`..` segments, percent-encoding, queries and fragments are rejected;
  - no blank learning outcomes, short notes, checklist items, experiment steps, note points, solved-example steps or formula labels;
  - complete PYQ verification and rights records;
  - an AI-assistance declaration on every block;
  - unique part titles.
- `publicationReadiness(pkg)` lists every remaining publication blocker for a draft without changing it.

#### Added
- **Student-data compatibility tests** (`student-data-compat.test.ts`):
  - the exact set of 11 `atlas:*` keys and the module that owns each;
  - content-policy and rebuilt-content code never touches storage;
  - reading progress keeps its stored format;
  - saved mistakes for withheld chapters are returned unchanged.
- **Opt-in private-draft check** (`private-packages.test.ts`, skipped unless `ATLAS_PRIVATE_PACKAGES_DIR` is set):
  - validates draft packages kept outside the repository;
  - refuses an in-repository folder, unknown routes, two packages for one route, and drafts claiming "published";
  - prints publication blockers without draft text.

## Released (merged to `main` and deployed)

### Phase 2A: content withholding (PR #4, merged and deployed 2026-11-19)

All legacy learning resources are withheld pending provenance review, behind one central policy (`src/lib/content-policy/publication.ts`; every switch off). All 202 chapter resource routes still exist and show a rebuilding notice (`noindex`, removed from the sitemap). The 27 legacy notes PDFs were removed from `public/`. Post-build checks (`npm run test:build-output`, run in CI) fail if withheld text, a PDF or draft material reaches the static export. Student progress is preserved: keys and formats are unchanged, and PYQ mistake IDs keep each question's original position. The live site was verified after deployment.

### Phase 1B: quick fixes (`phase-1b-fixes`; PR #3, merged and deployed 2026-11-16)

No URLs, page titles, canonicals, sitemap entries, localStorage keys or data formats changed (verified by `verify-build.mjs` against the unchanged baseline).

#### Added
- **Unit testing** (`f61732c`): Vitest **4.1.12** (exact pin; Vitest 5 needs Node ≥ 22.12, while CI runs Node 20) and an `npm test` script. CI now runs the tests automatically.
- **Chapter social-preview images** (owner-approved; `2310e52`): 30 Open Graph images, `public/og/class-{11|12}/{slug}.png` (1200 × 630 PNG, 47–120 KB each).
  - **Design:** navy grid, gold rule, chapter title in Source Serif 4, and a licensed Wikimedia Commons physics illustration on an ivory card in its original colours.
  - **Sources:** 26 public domain or CC0, 4 CC BY with an on-image credit.
  - **Records:** sources, licences and modifications are in `docs/ASSET_CREDITS.md`.
  - **Supporting files:**
    - `src/lib/social-metadata.ts`: the helper that builds chapter OG/Twitter metadata
    - `assets/og-sources/`: originals, derived copies and `sources.json`
    - `assets/og-fonts/`: OFL fonts with provenance
    - `scripts/fetch-og-fonts.mjs`, `scripts/derive-og-sources.mjs`, `scripts/generate-og-images.mjs`
    - npm scripts `og:fonts` and `og:generate`
    - dev dependency `@resvg/resvg-js` 2.6.2 (exact)
    - `.gitattributes`: turns off line-ending conversion for `assets/og-sources/` and `assets/og-fonts/`, so the files stay byte-identical and their recorded SHA-256 values remain valid on every checkout
- `SECURITY_REVIEW.md` and `docs/ASSET_CREDITS.md`.

#### Changed
- **Chapter pages now have a share image** (`2310e52`): all 30 chapter overview pages and 172 chapter resource pages emit `og:image`/`twitter:image` (their chapter's image, 1200 × 630), plus `og:site_name` and `og:locale`. Before, Next.js's replace-not-merge behaviour dropped these. Titles, descriptions and canonicals are unchanged. **The homepage and all other pages are unchanged** (root layout untouched; homepage social tags locked in `scripts/baseline/home-social.txt`).
- **`scripts/verify-build.mjs`** (`2310e52`) now also checks Open Graph images:
  - all 30 exist as valid 1200 × 630 PNGs under 300 KB;
  - every indexable page has og:image and twitter:image on the production domain, pointing to an existing file;
  - every chapter page uses its own chapter's image;
  - the homepage social tags are unchanged.
- **Login modal wording (P1-1)** (`60cc8c0`): it no longer promises cross-device sync that doesn't exist. Both the sign-up and login views now read: "Your progress is saved on this device; syncing across devices is coming soon." Headings, layout, styling, forms and auth logic are unchanged.
- **Docs and config (P3-1)** (`541d7a8`; the `engines` field shipped in `2310e52`):
  - the stale "PREVIEW PHASE" comment in `next.config.ts` is replaced by an accurate note; config logic unchanged;
  - README fonts corrected (Source Serif 4 / Source Sans 3), plus new tests and CI sections;
  - `package.json` gains `"engines": { "node": ">=20.9" }`.
- **Search analytics privacy** (`f2a465f`): the GA4 `search` event no longer sends the student's typed query. `search_term` is now the top result's chapter slug (or `no_results`), plus `result_count` and `query_length_bucket`. Recent searches stay on the device.

#### Fixed
- **Blocked-storage crash** (`0ec9b60`): the 10 localStorage reads that run during render now go through `safeGetItem()`, so pages show empty states instead of crashing when a browser blocks site data. The revision tracker's "mark round complete" no longer throws either. No keys or formats changed.
- **Broken PDF links** (`c028683`): "Download PDF" appears only when the file exists, using a build-time check (`src/lib/notes-pdf.ts`). It's hidden on Class 12 Electromagnetic Induction, Wave Optics and Semiconductor Electronics, whose PDFs are missing (recorded in `docs/MISSING_ASSETS.md`). Restoring one only needs the file to be added.

### Phase 1A: CI gate (`phase-1a-ci`; PR #2, merged and deployed 2026-11-13)

**No application code, content, URLs or student data changed. The live site's build output is identical.**

#### Added
- `.github/workflows/ci.yml`: a quality gate on every pull request and on pushes to any branch except `main`. It runs type-check, lint, unit tests (skipped until a `test` script exists), the production build and build-output verification. Permissions are read-only and it has no access to secrets. It never deploys. The job is named **`ci`**; that's the status check to require on `main`.
- `scripts/verify-build.mjs`: regression checks on the static export (Node built-ins only, no new dependencies):
  - every baseline page is still built (URL preservation)
  - sitemap integrity: no baseline URL dropped, every listed URL resolves to a page, no `noindex` page is listed, every indexable page is listed
  - `robots.txt` unchanged
  - `<title>` and canonical URL of every page unchanged; every canonical is self-referencing and ends in `/`
  - every internal link resolves to a built file, apart from recorded known issues
- `scripts/baseline/`: the accepted state of the build (219 HTML files, 215 sitemap URLs, the robots rules, plus the title and canonical of 216 pages). Changing it requires `--update-baseline`, which leaves a reviewable diff.
- `scripts/baseline/known-issues.json`: open issues that are reported but don't fail CI. Currently the 3 missing Class 12 notes PDFs (P1-4), which `phase-1b-fixes` resolves. A fixed issue that is still listed fails CI, so the record stays accurate.

#### Changed
- `.github/workflows/deploy.yml`: the `build` and `deploy` jobs now run only when the ref is `main`. Before this change, the manual "Run workflow" button could publish any branch to production. Pushes to `main` deploy exactly as before.

### Phase 0: Architecture audit (`phase-0-audit`, completed 2026-11-12; PR #1, merged and deployed 2026-11-13)

#### Added
- `ARCHITECTURE_AUDIT.md`, `IMPLEMENTATION_PLAN.md`.
