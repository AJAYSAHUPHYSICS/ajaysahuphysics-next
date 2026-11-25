# Ajay Sahu Physics — Website

Next.js (App Router) rebuild of [ajaysahuphysics.com](https://ajaysahuphysics.com), built as a static export and deployed to GitHub Pages via GitHub Actions.

## Pages

Home, About, Contact, Blog, Notes, Formula Sheet, DPP, PYQ, Video Lectures, Class 11, Class 12, JEE, NEET.

## Stack

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Self-hosted fonts via `@fontsource` (Source Serif 4, Source Sans 3)

## Local development

```bash
npm install
npm run dev
```

## Production build (static export)

```bash
npm run build
```

Outputs static HTML/CSS/JS to `/out`, ready for any static host.

## Tests and checks

```bash
npm test                         # unit, integration and database/RLS tests (Vitest; PGlite for Postgres)
npm run build                    # static export + CSP injection, then:
node scripts/verify-build.mjs    # URLs, sitemap, robots, titles, canonicals, links, OG images
npm run test:build-output        # post-build checks (withheld content, CSP)
npm run test:e2e                 # headless-Chrome E2E, accessibility audit, phone overflow, keyboard
```

Staging only (never production; see `supabase/README.md`). `supabase/staging/guard.mjs` refuses every project except staging:

```bash
npm run staging:check                # validates .env.staging.local offline (no values printed)
npm run test:staging:release         # the safe release check; never enables sync
npm run test:staging:deletion-gate   # deletion gate and rate limits; opens only the deletion gate, for its run
npm run test:staging:browser         # real UI journey against staging (needs `npm run dev`)
```

**Don't run `npm run test:staging`** (owner decision, 2026-11-22). It switches staging's `adult_sync_permitted` on for its run, and cloud sync must never be enabled. It's kept for reference only.

## Student accounts (Phase 2)

Accounts are optional and study progress stays in the browser. Cloud copies of study data are built but switched **off** (`CLOUD_SYNC_ENABLED = false`) until their release gates pass and the owner authorises activation. Formal legal review is scheduled after launch (owner decision I); no legal approval is claimed. Live status: [`docs/PHASE_2_TRACKER.md`](docs/PHASE_2_TRACKER.md). Architecture, database, environment variables, security, export and deletion, the production runbook and rollback are in [`docs/PHASE_2_RELEASE.md`](docs/PHASE_2_RELEASE.md). Database and staging setup: [`supabase/README.md`](supabase/README.md).

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request and on pushes to any branch except `main`: type-check, lint, unit tests, production build, `scripts/verify-build.mjs`, the build-output checks (`test:build-output`) and the headless-Chrome E2E and keyboard checks (`test:e2e`). It has read-only permissions, uses no secrets and never deploys. The job is named `ci`, and `main` requires it to pass before merging. It doesn't require the branch to be up to date with `main`, so update a branch before merging it.

`.github/workflows/e2e-browsers.yml` runs the same E2E and keyboard checks in Firefox and WebKit on every pull request (`e2e-firefox`, `e2e-webkit`; not required).

`.github/workflows/deletion-sweep.yml` is the hourly account-deletion sweep. It's inert until the repository variable `ATLAS_DELETION_SWEEP_ENABLED` is `true` (not set).

## Deployment

Pushing to `main` (in practice, merging a pull request) triggers `.github/workflows/deploy.yml`, which builds the site and deploys `/out` to GitHub Pages. Its jobs run only on `main`, so a feature branch can never be published by mistake.

## Brand

- Navy `#0b1f45`, Gold `#c9a84c`, White
- Display font: Source Serif 4. Body font: Source Sans 3.
- Tagline: "Physics that makes you score"
