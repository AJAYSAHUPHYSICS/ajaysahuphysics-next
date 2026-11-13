# Changelog

All notable changes to AjaySahuPhysics.com are recorded here, grouped by
phase branch. Dates are when the branch was completed, not when it was
merged or deployed. Merging to `main` deploys to production.

## [Unreleased]

### Phase 1A: CI gate (`phase-1a-ci`, 2026-11-13)

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

### Phase 0: Architecture audit (`phase-0-audit`, 2026-11-12)

#### Added
- `ARCHITECTURE_AUDIT.md`, `IMPLEMENTATION_PLAN.md`.
