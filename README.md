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
npm test                         # unit tests (Vitest)
npm run build                    # then:
node scripts/verify-build.mjs    # URLs, sitemap, robots, titles, canonicals, links, OG images
```

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request and on pushes to any branch except `main`: type-check, lint, unit tests, production build, and `scripts/verify-build.mjs`. It has read-only permissions, uses no secrets and never deploys. The job is named `ci`, and `main` requires it to pass before merging.

## Deployment

Pushing to `main` (in practice, merging a pull request) triggers `.github/workflows/deploy.yml`, which builds the site and deploys `/out` to GitHub Pages. Its jobs run only on `main`, so a feature branch can never be published by mistake.

## Brand

- Navy `#0b1f45`, Gold `#c9a84c`, White
- Display font: Source Serif 4. Body font: Source Sans 3.
- Tagline: "Physics that makes you score"
