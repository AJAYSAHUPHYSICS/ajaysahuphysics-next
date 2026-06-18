# Ajay Sahu Physics — Website

Next.js (App Router) rebuild of [ajaysahuphysics.com](https://ajaysahuphysics.com), built as a static export and deployed to GitHub Pages via GitHub Actions.

## Pages

Home, About, Contact, Blog, Notes, Formula Sheet, DPP, PYQ, Video Lectures, Class 11, Class 12, JEE, NEET.

## Stack

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Self-hosted fonts via `@fontsource` (Playfair Display, Inter)

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

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys `/out` to GitHub Pages automatically. No manual build step needed.

## Brand

- Navy `#0b1f45`, Gold `#c9a84c`, White
- Display font: Playfair Display. Body font: Inter.
- Tagline: "Physics that makes you score"
