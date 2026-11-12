# Architecture Audit — AjaySahuPhysics.com

| | |
|---|---|
| **Phase** | 0 — Architecture Audit (read-only) |
| **Date** | 2026-11-12 |
| **Commit audited** | `0260f11` (branch `main`, clean working tree) |
| **Scope** | Entire repository, plus a local production build used only to verify output |
| **Application code modified** | None |

Severity scale: **P0** critical · **P1** high · **P2** medium · **P3** low.
Each finding is tagged **[Verified]** (checked by running something or reading the build output) or **[Code review]** (found by reading the source; not yet confirmed at runtime).

---

## 1. Executive summary

AjaySahuPhysics.com is a **fully static Next.js site**. Every page is pre-rendered to HTML at build time and served by GitHub Pages. There is no application server. All student features (dashboard, bookmarks, checklist, revision rounds, streaks, mistake notebook, goals) keep their data in the student's own browser (`localStorage`). Supabase is wired in **for login/signup only**. No database tables are used and no student data is stored on a server.

The codebase is in good health:

- TypeScript and ESLint pass with zero errors.
- The production build passes and generates 218 HTML pages.
- Content and code are cleanly separated.
- Effort has clearly gone into keeping client bundles small and keeping the localStorage data layer consistent.

The main risks fall into four areas:

1. **The product promises sync that doesn't exist.** The login modal says it syncs progress; it doesn't.
2. **There is no backend data model yet.** All future server-side security depends on Row Level Security, which does not exist yet.
3. **Every push to `main` deploys straight to production.** There is no CI quality gate and no approval step.
4. **There are compliance gaps.** Analytics and account signup are aimed at an audience that is largely minors, and the site has no privacy policy or terms.

**No P0 issues were found.** Nothing is broken or exposed today.

---

## 2. System architecture

### 2.1 Stack (verified from `package.json` and the lockfile)

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router, `output: "export"`) | 16.2.9 |
| UI | React / React DOM | 19.2.4 |
| Language | TypeScript (`strict: true`) | ^5 |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` | ^4 |
| Fonts | `@fontsource/source-serif-4`, `@fontsource/source-sans-3` (self-hosted) | 5.2.9 |
| Auth | `@supabase/supabase-js` | ^2.112.4 |
| Analytics | Google Analytics 4 (`G-3R7SSPSTKT`) via `next/script` | — |
| Hosting | GitHub Pages, custom domain `ajaysahuphysics.com` (`public/CNAME`) | — |
| CI/CD | GitHub Actions, `.github/workflows/deploy.yml` | Node 20 |

The dependency list is small: 6 runtime packages. There is no test framework, no state-management library and no maths-rendering library.

### 2.2 Deployment topology

```
 Developer ──push main──▶ GitHub Actions (npm ci → next build → upload ./out)
                                   │  env: NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY (repo secrets)
                                   ▼
                          GitHub Pages (static files, custom domain)
                                   │
 Student browser ◀── HTML/JS/CSS ──┘
     │
     ├──▶ localStorage (all study data, 11 `atlas:*` keys + Supabase session)
     ├──▶ Supabase Auth (email+password signup/login, from the browser)
     ├──▶ Google Analytics 4 (page views + 3 custom events)
     └──▶ wa.me links (WhatsApp lead capture / doubt support)
```

Important consequences of this topology:

- **There is no server-side code at all.** Middleware, API routes, Server Actions and the image optimiser are unavailable. Every future backend operation must run in the browser through `supabase-js`, so **Supabase RLS is the only access-control layer** for any future data.
- **HTTP response headers can't be configured** (GitHub Pages limitation). That rules out CSP, `X-Frame-Options`, `Referrer-Policy` and similar headers.
- **A push to `main` is a production deployment.** The workflow has no lint, type-check or test step, and the `github-pages` environment has no manual-approval rule. *Operational rule from this point: all work happens on feature branches, and nothing is merged or pushed to `main` without explicit approval.*

### 2.3 Source layout

```
src/
  app/                    App Router routes (all static)
    page.tsx              Home
    about, contact, blog, videos, notes, formula-sheet, dpp, pyq, jee, neet,
    class-11, class-12, dashboard
    class-11|12/[slug]/             Chapter overview (layout + page)
    class-11|12/[slug]/[resource]/  Chapter resource (notes, jee-notes, short-notes,
                                    formula-sheet, dpp, jee-dpp, pyq)
    sitemap.ts, robots.ts, manifest.ts, not-found.tsx, icons
  components/             ~95 components, 43 marked "use client"
    formula-sheet/        Formula sheet display sub-components
  lib/
    chapters.ts           Canonical chapter list (16 × Class 11, 14 × Class 12)
    resource-registry.tsx Single source of truth for resource types → routes, metadata, rendering
    notes/ jee-notes/ dpp/ jee-dpp/ pyq/ formula-sheet/ chapter-content/
                          Content as TypeScript data modules + lightweight `slugs.ts`
                          availability files (with build-time drift guards)
    bookmarks.ts, checklist.ts, revision.ts, mistakes.ts, study-goals.ts,
    study-streak.ts, activity-log.ts, recently-viewed*.ts, recent-searches.ts,
    reading-progress.ts   localStorage-backed stores (see §4)
    *-plan.ts, *-forecast.ts, exam-readiness.ts, ...  Pure analytics/derivation functions
    supabase-client.ts    Nullable Supabase client (anon key only)
    jsonld.tsx, site-config.ts, analytics.ts, search-index.ts
docs/FORMULA_SHEET_AUTHORING_GUIDE.md
```

### 2.4 Architectural strengths (keep these)

- **Resource registry pattern.** [`resource-registry.tsx`](src/lib/resource-registry.tsx) drives routes, sub-nav, `generateStaticParams`, metadata and the sitemap from one place. Only (chapter, resource) pairs that actually have content get built.
- **Bundle discipline.** Client components import small `slugs.ts` availability files instead of the heavy content registries. Build-time drift guards in each `index.ts` fail the build if a `slugs.ts` file and its registry disagree.
- **Consistent store pattern.** Every localStorage store follows the same steps: SSR guard, parse validation, a snapshot cache compared by reference (so `useSyncExternalStore` doesn't re-render in a loop), and a pub-sub notifier for same-tab updates.
- **Analytics separated from data.** All derived metrics (readiness, forecasts, plans) are pure functions over the store snapshots. That makes them easy to unit-test and easy to keep when the storage backend changes.

---

## 3. Routes and pages (verified via `next build`)

| Route group | Count | Notes |
|---|---|---|
| Static top-level pages | 13 | `/`, about, contact, blog, videos, notes, formula-sheet, dpp, pyq, jee, neet, class-11, class-12 |
| `/dashboard` | 1 | `noindex, follow`; client-populated |
| `/class-11/[slug]` | 16 | Chapter overviews |
| `/class-11/[slug]/[resource]` | 103 | Only resources that exist |
| `/class-12/[slug]` | 14 | Chapter overviews |
| `/class-12/[slug]/[resource]` | 71 | Only resources that exist |
| **Total HTML pages** | **218** (+ `404.html`) | The brief estimated ~224 |
| Sitemap URLs | 215 | Everything except dashboard and 404, as intended |

URL conventions to **preserve exactly**: lowercase hyphenated slugs, `trailingSlash: true` (every URL ends in `/`), resource keys `notes | jee-notes | short-notes | formula-sheet | dpp | jee-dpp | pyq`, and PDFs at `/notes-pdf/class-{11|12}/{slug}.pdf`.

**Content coverage gaps (by design, not bugs):** JEE Notes and JEE DPP exist for 11 Class 11 chapters only. The Videos tab is disabled on every chapter. The Blog shows 3 "coming soon" cards. The Videos page is a placeholder. The newsletter is behind `NEWSLETTER_READY = false`.

---

## 4. Data inventory — client-side storage (verified from source)

These are all the persistent client-side data stores in the application. There is no use of `sessionStorage`, IndexedDB or cookies by application code.

| # | Key | Shape (as stored) | Cap / retention | Written by | Sync value |
|---|---|---|---|---|---|
| 1 | `atlas:bookmarks` | `Bookmark[]` `{id:"cls:slug:type", cls, slug, type, chapterName, label, path, bookmarkedAt(ms)}` | 300 | BookmarkButton | **High** |
| 2 | `atlas:checklist` | `Record<"cls:slug", {notes?, formulaSheet?, dpp?, pyq?: boolean}>`, **no timestamps** | none | ChapterChecklist | **High** |
| 3 | `atlas:revision` | `Record<"cls:slug", {round:1\|2\|3, completedAt(ms)}[]>`; legacy shape `number[]` is migrated on read with `completedAt: 0` = unknown | none | RevisionTracker | **High** |
| 4 | `atlas:mistakes` | `Mistake[]` `{id(uuid), cls, slug, chapterName, resourceType:"dpp"\|"pyq", questionId?, conceptTag, difficulty:"easy"\|"medium"\|"hard", note, createdAt, resolvedAt\|null}` | 500 | AddMistakeButton, MistakeNotebookCard | **High** (user-authored text) |
| 5 | `atlas:goals` | `Partial<Record<GoalType, activatedAt(ms)>>` (8 fixed goal types) | — | GoalsCard | **High** |
| 6 | `atlas:study-streak` | `{current, longest, lastActiveDate:"YYYY-MM-DD" local}`, **derived state** | — | `recordActivity()` from many stores | **High**, but needs a redesign (see §6.4) |
| 7 | `atlas:activity-log` | `ActivityEvent[]` `{type, cls, slug, label, at(ms)}` (6 event types) | 400 entries / 30 days | Most stores via `logActivity()` | Medium |
| 8 | `atlas:recently-viewed` | `RecentChapter[]` `{slug, cls, name, visitedAt}` | 5 | RecordChapterVisit | Low (device-local is fine) |
| 9 | `atlas:recently-viewed-resources` | `RecentResource[]` `{cls, slug, resourceKey, chapterName, resourceLabel, path, visitedAt}` | 8 | RecordResourceVisit | Low |
| 10 | `atlas:recent-searches` | `string[]` | 10 | GlobalSearch | **Should not sync** (privacy; low value) |
| 11 | `atlas:reading-progress` | `Record<pathname, {pct, updatedAt}>` | 40 | ReadingProgressBar | Low |
| — | `sb-<project-ref>-auth-token` | Supabase session (managed by `supabase-js`) | — | supabase-js | n/a, never touch |

Observations relevant to the migration:

- **No schema version marker** exists in any key. Migration code will have to detect each shape by inspecting it, as `revision.ts` already does for its legacy format.
- **Display data is denormalised into stored records** (`chapterName`, `label`, `path`). On the server these should be derived from `chapters.ts` and the resource registry, not stored.
- **Checklist items have no timestamps,** so a last-write-wins merge has nothing to compare for existing data. Import has to treat them as "completed at an unknown time".
- **Deletions leave no trace.** Unbookmarking or untoggling a checklist item just removes it. A naive union-merge sync would therefore **bring deleted items back**. The server model needs soft-delete markers (tombstones).
- **No cross-tab sync.** Nothing listens for the `storage` event, so a second open tab shows stale data until it re-renders. This is minor today and matters more once sync exists.
- **The streak is stored as derived state.** `current` and `longest` can't be merged across two devices. The server should store *study days* and compute the streak from them.

---

## 5. Data flows

1. **Content → page.** TypeScript content modules are evaluated at build time, so pages contain fully rendered HTML. Client components receive content as serialised props.
2. **Study interaction → store.** For example, BookmarkButton → `toggleBookmark()` → `localStorage.setItem` → `notify()` → components subscribed via `useSyncExternalStore` re-render. Side effects: `recordActivity()` (streak) and `logActivity()` (activity log).
3. **Dashboard.** `DashboardClient` reads all the stores and runs about 25 pure derivation functions over them, using a chapter summary (`ChapterMeta[]`) that was computed at build time.
4. **Auth.** `AuthButton` (mounted in the Navbar on every page) → `supabase.auth.getSession()` plus `onAuthStateChange`. `AuthModal` calls `signInWithPassword` or `signUp`. The session is stored in localStorage by supabase-js. **No other code reads the session.**
5. **Analytics.** The GA4 config sends a page view on first load. `PageViewTracker` sends `page_view` on each client-side navigation. Custom events: `search` (`search_term` = **raw text the student typed**), `select_content`, `whatsapp_click`.
6. **Leads.** `LeadCaptureForm` and `WhatsAppButton` build a `wa.me` link containing the student's name, class and exam. Nothing is stored by the site.

---

## 6. Authentication and Supabase

### 6.1 Current state [Verified — code]
- [`src/lib/supabase-client.ts`](src/lib/supabase-client.ts) creates the client only when both `NEXT_PUBLIC_` variables are present; otherwise it is `null` and every consumer checks for that. **Only the anon key is referenced.** No service-role key appears anywhere in the repository or the workflow.
- Email + password only. No OAuth, no magic link, no password reset, no account page, no profile.
- `.env*` is gitignored. There is no local `.env` file, so the keys exist only as GitHub Actions secrets.

### 6.2 Database [Not inspectable from this environment]
The repository has **no `supabase/` directory, no migrations, no SQL and no generated types**, and the Supabase CLI is not installed. **I couldn't inspect the live database.** The code never calls `.from(...)`, `.rpc(...)` or storage, so the application doesn't use any tables. The live project may still contain tables someone created by hand in the dashboard. **This must be checked before Phase 4** (see the [Implementation Plan](IMPLEMENTATION_PLAN.md), Phase 4 prerequisites).

### 6.3 Auth findings

| ID | Sev | Finding | Evidence |
|---|---|---|---|
| A-1 | **P1** | The login modal promises "Sync your progress, bookmarks, and practice history" and "access it on any device". No sync exists. The dashboard says the opposite ("saved on this device, no account needed"). | [AuthModal.tsx:82-84](src/components/AuthModal.tsx#L82-L84), [dashboard/page.tsx:52](src/app/dashboard/page.tsx#L52) |
| A-2 | **P1** | No password reset or recovery flow. Users who forget their password are locked out. | Code review |
| A-3 | **P1** | `signUp` has no `emailRedirectTo`, so confirmation links depend entirely on the dashboard "Site URL". The redirect allowlist, email-confirmation setting, rate limits and CAPTCHA are **dashboard settings I can't see** and must be checked. | [AuthModal.tsx:27](src/components/AuthModal.tsx#L27) |
| A-4 | P2 | Minimum password length is 6 (client-side `minLength`; the real minimum is enforced by Supabase). Recommend 8+ and turning on leaked-password protection. | AuthModal |
| A-5 | P2 | No CAPTCHA on signup, so bulk bot signups are possible (email-sending costs, junk users). Supabase Auth natively supports hCaptcha and Cloudflare Turnstile, so no server is needed. | Code review |
| A-6 | P2 | `supabase-js` (part of a shared chunk of ~72 KB gzipped) loads on **every page** because `AuthButton` is in the Navbar, even for visitors who never log in. | [Verified — build] the chunk is referenced from `/` and `/about/` |
| A-7 | P2 | Modal accessibility: focus doesn't move into the dialog on open, so Escape does nothing until something inside is focused. No focus trap, focus isn't returned on close, and the page behind keeps scrolling. | Code review |
| A-8 | P3 | `AuthButton` is mounted twice on mobile (one copy hidden with `sm:inline-flex`), giving two `getSession` calls and two auth listeners. | [Navbar.tsx](src/components/Navbar.tsx) |
| A-9 | P3 | Signed-in state shows only "Log out". No account indicator, and no feedback after signing out. | Code review |

---

## 7. Security review (summary — full write-up later in `SECURITY_REVIEW.md`)

| ID | Sev | Finding |
|---|---|---|
| S-1 | **P1** | **Future data security rests entirely on RLS.** With no server, any table without RLS (or with a permissive policy) is readable and writable by anyone holding the public anon key, and every visitor's browser has it. Every table must have RLS enabled and owner-scoped policies, tested across accounts, **before** any client code writes to it. |
| S-2 | **P1** | `npm audit --omit=dev`: 6 advisories (1 critical, 4 high, 1 moderate). The critical one is in `next@16.2.9`; the fix is `next@16.4.6` (minor release). **Real exposure is low**: the advisories target middleware, Server Actions and image optimisation, none of which run in a static export. The others (postcss, sharp, source-map-js, nanoid, baseline-browser-mapping) only run at build time. Upgrade anyway, in Phase 1. [Verified] |
| S-3 | **P1** | **Production deploy has no gate.** A push to `main` builds and publishes with no lint, type-check, tests or human approval. A bad merge goes live immediately. |
| S-4 | P2 | **No security headers** (GitHub Pages can't set them). There's no CSP, no clickjacking protection for the login form (`frame-ancestors` can't be set via `<meta>`), no `Referrer-Policy` and no `Permissions-Policy`. HSTS is not under your control. |
| S-5 | P2 | GA4 receives **raw search text** (`search_term`). Students may type names or phone numbers into search. This must be disclosed or minimised (send a result count or matched chapter slug instead of free text). |
| S-6 | P3 | JSON-LD is injected with `JSON.stringify` inside `<script>` without escaping `<`. Safe today because all content is written by the site owner. Escape it before any user-supplied text could reach structured data. [jsonld.tsx:113](src/lib/jsonld.tsx#L113) |
| S-7 | OK | No secrets in the repo or git-tracked files. Only the anon key appears in client code (by design). No user input reaches `dangerouslySetInnerHTML`, `eval` or `innerHTML`. External links use `noopener,noreferrer`. |

---

## 8. SEO (verified against the build output)

| ID | Sev | Finding | Evidence |
|---|---|---|---|
| SEO-1 | **P1** | **PYQ pages ship no questions in their HTML.** `PyqDisplay` calls `useSearchParams()` inside `<Suspense>`, so the static HTML contains only "Loading questions…". The questions appear only after JavaScript runs. This affects 30 high-intent pages. | `out/class-11/kinematics/pyq/index.html` contains "Loading questions" |
| SEO-2 | P2 | **No `og:image` on chapter and resource pages** (about 204 of 218 pages). These pages set their own `openGraph` without `images`, and Next.js replaces the parent's `openGraph` instead of merging it, so `og:image`, `og:site_name` and `og:locale` are lost. WhatsApp and social link previews show no image. The `twitter:card` is `summary_large_image` with no image. | Build output: `og:image` is present on `/`, absent on `/class-11/kinematics/pyq/` |
| SEO-3 | P2 | `/blog` and `/videos` are placeholder pages but are indexable and listed in the sitemap (thin content). | sitemap.ts |
| SEO-4 | P3 | JSON-LD breadcrumb `item` URLs have no trailing slash, so they point at redirects instead of the canonical URLs. | jsonld.tsx |
| SEO-5 | P3 | The sitemap's `lastModified` is the build time for every URL. Google learns to ignore it. | sitemap.ts |
| OK | — | Canonical URLs correctly include the trailing slash (`https://ajaysahuphysics.com/class-11/kinematics/pyq/`). Per-page titles and descriptions are unique and derived from content. BreadcrumbList, LearningResource and FAQPage JSON-LD are present. robots allows all and references the sitemap. The dashboard is `noindex`. Only real resource pages are built. | [Verified — build] |

---

## 9. Bugs and incomplete features

| ID | Sev | Finding | Evidence |
|---|---|---|---|
| B-1 | **P1** | The "Download PDF" link is shown on every Notes page, but PDFs are **missing** for `class-12/electromagnetic-induction`, `class-12/wave-optics` and `class-12/semiconductor-electronics`, so those links 404. | Build output: `/class-12/wave-optics/notes/` links to `notes-pdf/class-12/wave-optics.pdf`, which doesn't exist |
| B-2 | P2 | `localStorage.getItem` is called **outside** the `try` block in `activity-log`, `revision`, `checklist`, `study-streak`, `recently-viewed`, `recently-viewed-resources`, `recent-searches`, and the `bookmarks:80` / `mistakes:83` read paths. In browsers where storage access throws (some in-app browsers, blocked site data), these run during render through `useSyncExternalStore` and will crash the dashboard and chapter pages. | Code review |
| B-3 | P3 | `next.config.ts` still describes a "PREVIEW PHASE" and says to "add a public/CNAME"; the CNAME exists and the site is live. README lists the wrong fonts (Playfair/Inter instead of Source Serif 4/Source Sans 3). | Code review |
| B-4 | P3 | GA4 may count page views twice if "Enhanced measurement → page changes based on browser history events" is on in the GA4 property **and** `PageViewTracker` also fires. Check this in GA4 settings. | Code review |
| B-5 | P3 | Local Node is v26; CI uses Node 20. `package.json` has no `engines` field. | Environment |

---

## 10. Performance

- Fully static HTML with self-hosted fonts and no runtime data fetching, so the baseline is strong.
- Total JS chunks are 1.3 MB uncompressed across all routes. The largest shared chunk (~272 KB raw / ~72 KB gzipped) contains `supabase-js` and loads on every page (A-6).
- 7 font weight files are imported globally (Serif 500/600/700, Sans 400/500/600/700). Check usage; removing 2–3 saves bytes on first load.
- The Navbar scroll listener isn't `passive` (minor).
- The build output is 63 MB in total, mostly content HTML plus 3.3 MB of PDFs. That's fine for GitHub Pages (1 GB site limit).

## 11. Mobile responsiveness [Code review — no device testing yet]

- Good: 16 px gutters, horizontally scrollable resource tabs and formula tables (`min-w-[420px]` inside `overflow-x-auto`), a mobile menu with internal scrolling, and a skip link.
- **P2:** the desktop nav turns on at `lg` (1024 px) with 10 text links, 4 pill links, Login and Search in one row. That's very likely to crowd or wrap at 1024–1280 px. Needs a visual check at those widths in Phase 1/2.
- Device testing (360 px, 390 px, 768 px, 1024 px, 1280 px) is part of the Phase 2 test plan.

## 12. Compliance and legal

| ID | Sev | Finding |
|---|---|---|
| L-1 | **P1** | No privacy policy or terms page. GA4 tracking runs with no notice, and signup now collects email addresses. |
| L-2 | **P1** | A large share of the audience is under 18. India's **DPDP Act 2023** requires verifiable parental consent before processing children's personal data and restricts tracking and behavioural monitoring of children. That bears directly on account creation, server-side study analytics and GA4. **This is a legal decision for the owner, not an engineering one.** Phase 3 should get legal review, and Phase 4 (server-side storage of student data) should not launch publicly until it's settled. |

---

## 13. Quality baseline (verified 2026-11-12)

| Check | Result |
|---|---|
| `tsc --noEmit` | ✅ pass, 0 errors |
| `eslint .` | ✅ pass, 0 problems |
| `next build` (static export) | ✅ pass, 218 HTML pages + 404 |
| Automated tests | ❌ none exist |
| `npm audit --omit=dev` | ⚠️ 6 advisories (see S-2) |

---

## 14. Consolidated priority list

| Priority | IDs |
|---|---|
| **P0** | none |
| **P1** | A-1, A-2, A-3, S-1, S-2, S-3, SEO-1, B-1, L-1, L-2, and the missing data model (no schema, no sync) |
| **P2** | A-4, A-5, A-6, A-7, S-4, S-5, SEO-2, SEO-3, B-2, navbar crowding, no CI/tests |
| **P3** | A-8, A-9, S-6, SEO-4, SEO-5, B-3, B-4, B-5, fonts, passive listener |

The phased plan for fixing these is in [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md).
