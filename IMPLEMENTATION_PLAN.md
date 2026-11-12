# Implementation Plan — AjaySahuPhysics.com

| | |
|---|---|
| **Status** | Draft for owner approval (end of Phase 0) |
| **Date** | 2026-11-12 |
| **Based on** | [ARCHITECTURE_AUDIT.md](ARCHITECTURE_AUDIT.md) (finding IDs below refer to it) |

## 0. Working agreement

1. **One phase at a time.** Each phase starts with a proposal (changes, files, risks, dependencies) and ends with a report (changed files, check results, open issues). The next phase starts only after approval.
2. **Branch-based work.** A push to `main` deploys to production, so every phase is done on a branch named `phase-N-<name>`. Nothing is merged or pushed to `main` without explicit approval. That merge *is* the deployment.
3. **Gate for every phase:** `tsc --noEmit` ✅, `eslint .` ✅, `next build` ✅, page count still 218 (or a documented change), all existing URLs still present in `out/`, plus that phase's own tests.
4. **URL preservation check:** before and after each phase, compare the list of built `index.html` paths and the `sitemap.xml` URLs. Any URL that disappears blocks the merge.
5. **Rollback for any phase:** revert the merge commit on `main`. That redeploys the previous static build. Phases 1–3 and 5 change no stored data. Phase 4 has its own data rollback procedure (§4.7).
6. **Secrets:** only the Supabase anon key is ever used in client code or CI build steps. The service-role key is never committed, never placed in a workflow that runs `npm run build`, and never pasted into chat.

---

## Phase 1 — Quick fixes

| Item | Change | Files |
|---|---|---|
| P1-1 / A-1 | Reword the modal so it promises nothing that doesn't exist yet ("Create an account. Progress sync is coming soon; your progress is saved on this device"). | `src/components/AuthModal.tsx` |
| P1-4 / B-1 | Add a `notes-pdf/slugs.ts` availability list with a build-time check against `public/notes-pdf/`. Show "Download PDF" only when the file exists. The 3 missing PDFs can be added later; the link then appears automatically. | `src/lib/notes-pdf/slugs.ts` (new), `src/app/class-11/[slug]/[resource]/page.tsx`, `src/app/class-12/[slug]/[resource]/page.tsx` |
| P1-7 / S-2 | **Assessment first**: read the 16.2.9 → 16.4.6 release notes, then upgrade `next` and `eslint-config-next` together on the branch, and diff the build output (page list, HTML of sample pages). Rerun `npm audit`. *Requires approval to install packages.* | `package.json`, `package-lock.json` |
| P2-1 / SEO-2 | Add `images` and `siteName`/`locale` to the `openGraph` and `twitter` metadata in the 4 chapter route files, using a shared helper so it can't drift. | 4 route files, `src/lib/site-config.ts` or new `src/lib/metadata.ts` |
| P2-4 / B-2 | Move every `localStorage.getItem` inside `try`, and add a shared `safeGetItem` / `safeSetItem` helper. Behaviour is unchanged when storage works. | ~9 files in `src/lib/` |
| P3-1 / B-3 | Fix the `next.config.ts` comment and README fonts. Add an `engines` field (Node ≥ 20.9). | `next.config.ts`, `README.md`, `package.json` |

**Risks:** the Next upgrade could change build output or metadata. That's why it's diffed separately and can be split into its own PR. The storage helper touches every store, so it must keep reference-stable snapshots (covered by tests in Phase 5; checked manually in Phase 1).
**Dependencies:** none. **Verification:** gate, plus a check of the built HTML for `og:image` on 3 sample pages, PDF links present/absent as expected, and the dashboard loading with storage blocked (simulated in browser devtools).

## Phase 2 — SEO

| Item | Change | Files |
|---|---|---|
| P1-5 / SEO-1 | Split `PyqDisplay` so the full question list renders in the static HTML, and move the `?exam=` filter into a small client child that only hides and shows questions. Remove the `<Suspense>` placeholder from the registry. The URL and the `?exam=` deep links keep working. | `src/components/PyqDisplay.tsx` (+ new child), `src/lib/resource-registry.tsx` |
| P2-7 / SEO-3 | `/blog` and `/videos`: `robots: noindex, follow`, and remove them from `sitemap.ts` until real content exists. **The URLs stay live**, so no links break. | `src/app/blog/page.tsx`, `src/app/videos/page.tsx`, `src/app/sitemap.ts` |
| SEO-4/5 | Add a trailing slash to JSON-LD URLs. Change the sitemap `lastModified` to drop the field or use a real content date. | `src/lib/jsonld.tsx`, `src/app/sitemap.ts` |
| Nav | Fix desktop-nav crowding at 1024–1280 px. *Proposal to be shown before any change, since it affects layout.* | `src/components/Navbar.tsx`, `src/lib/site-config.ts` |

**Verification:** every PYQ question text is present in the built `index.html` for 3 sample chapters; titles, descriptions, canonicals and JSON-LD checked on 6 representative pages (home, hub, chapter overview, notes, formula sheet, PYQ); sitemap = 213 URLs; robots unchanged; page list unchanged.

## Phase 3 — Legal

- New static pages `/privacy/` and `/terms/`, linked from the footer and the signup modal.
- Content written to **match actual data practices exactly** (audit §4–§5): what lives in localStorage, what Supabase stores (email, hashed password, auth metadata), what GA4 receives (page views and events, including search terms unless S-5 is fixed first), WhatsApp hand-off, data retention, contact for deletion requests.
- Fix S-5 (stop sending raw search text to GA4) before or alongside this, so the policy can say less is collected.
- **Owner decisions needed:** legal entity/name and contact address for the policy, and the **DPDP minors approach (L-2)**: an age gate, parental-consent wording, and whether GA4 runs for under-18s. *I'll draft the text, but it should be reviewed by a lawyer; I can't provide legal sign-off.*

## Phase 4 — Core architecture (accounts, database, sync)

### 4.1 Prerequisites (blocking)
1. **Inspect the live Supabase project.** Either the owner runs a read-only SQL inventory I provide (tables, RLS status, policies, triggers, auth settings), or the owner installs the Supabase CLI and links it locally. Any existing manually created tables must be accounted for before the schema is designed.
2. **A separate staging Supabase project** for development and RLS testing. Never test against production.
3. L-2 decision from Phase 3.
4. Dashboard settings: Site URL, redirect allowlist (`https://ajaysahuphysics.com/**` and the local dev origin), email confirmation, SMTP sender, rate limits.

### 4.2 Draft schema direction (finalised in `DATABASE_SCHEMA.md`)
All tables live in `public`, have RLS **enabled and forced**, and every row has `user_id uuid not null references auth.users(id) on delete cascade`, `created_at` and `updated_at timestamptz`, and soft-delete `deleted_at` where users can undo an action.

| Table | Natural key (unique) | From localStorage |
|---|---|---|
| `profiles` | `id = auth.uid()` (row created by trigger) | — |
| `bookmarks` | `(user_id, cls, chapter_slug, resource_type)` | `atlas:bookmarks` |
| `checklist_items` | `(user_id, cls, chapter_slug, item)` | `atlas:checklist` |
| `revision_rounds` | `(user_id, cls, chapter_slug, round)` | `atlas:revision` (`completedAt: 0` → `null` = unknown) |
| `mistakes` | `id uuid` (client-generated, so imports are idempotent) | `atlas:mistakes` |
| `study_goals` | `(user_id, goal_type)` | `atlas:goals` |
| `study_days` | `(user_id, day date)` | derived from the activity log, plus the imported legacy streak |
| `activity_events` | `(user_id, client_event_id)` | `atlas:activity-log` (keeps the 30-day retention policy) |
| `sync_imports` | `(user_id, device_id, schema_version)` | Import ledger for audit and idempotency |

- **Normalised:** display fields (`chapterName`, `label`, `path`) are *not* stored; they're derived from `chapters.ts` and the resource registry. Allowed values (`cls`, `resource_type`, `item`, `round`, `goal_type`, `difficulty`) are enforced with CHECK constraints. Slugs are checked for format in SQL and validated against `chapters.ts` on import.
- **Streak:** `current` and `longest` are computed from `study_days`. The pre-account `longest` value is kept once in `profiles.legacy_longest_streak`, so nobody loses a record they already earned.
- **Device-only by design:** recently-viewed, recent searches and reading progress. *Owner can override.*
- **RLS policy template:** `select/insert/update/delete using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))`. No anonymous access to any table. Indexes on `user_id` plus each natural key.

### 4.3 Sync design (detailed in `MIGRATION_PLAN.md`)
- **The local-first stores stay the read path.** UI code and the ~25 derivation functions don't change. A new sync layer subscribes to the existing notifiers and pushes changes up, and pulls on login or tab focus.
- **First-login import:** read all 6 high-value keys → validate each record (unknown slug, bad enum, bad timestamp → skipped and counted) → upsert by natural key (idempotent; safe to re-run) → read back and verify counts → only then mark local data `atlas:sync-meta = {version, userId, importedAt}`. **Local keys are never deleted by the migration.**
- **Conflicts:** sets (bookmarks, checklist, revisions, goals) merge per row by `updated_at` (last write wins), with `deleted_at` tombstones so a deletion on one device isn't undone by another. Mistakes merge by `id`. Earlier completion timestamps are kept for revision rounds.
- **Logout:** stop syncing and leave the local data in place (owner decision: optionally clear it on shared devices).

### 4.4 Auth work
Password reset (new `/reset-password/` static page that handles `PASSWORD_RECOVERY`), `emailRedirectTo` on signup, PKCE flow, CAPTCHA (Turnstile or hCaptcha via Supabase's built-in support; *a vendor account is needed*), an account indicator, and the A-7 accessibility fixes (native `<dialog>`).

### 4.5 Lazy loading (A-6)
`AuthButton` renders without importing supabase-js, reading a "session probably exists" hint from localStorage. The client is loaded with `import()` only when the modal opens or a session is present. Target: the shared chunk no longer contains supabase-js for logged-out visitors (checked in the build output).

### 4.6 Testing
- **SQL tests (pgTAP via `supabase test db`, or a scripted equivalent against staging):** for each table, user A can CRUD their own rows; user A **can't** read, update or delete user B's rows; inserting a row with `user_id = B` as A is rejected; the anonymous role sees zero rows.
- **Sync tests (Vitest):** import idempotency (run twice → same rows), malformed records skipped, legacy revision shape, tombstone handling, conflict resolution.
- **Manual flows:** signup → confirm → login → import → second device → edit on both → logout; password reset; CAPTCHA.

### 4.7 Rollback
Every migration ships with a matching `down` migration. The client sync can be turned off with a single build-time flag (`NEXT_PUBLIC_SYNC_ENABLED`), and local data is never deleted, so turning sync off returns students to today's behaviour with nothing lost. Dropping tables needs separate explicit approval.

**Owner approvals needed in Phase 4:** applying migrations to production, the dashboard auth settings, and the CAPTCHA vendor.

## Phase 5 — Hardening

- **CI:** add a `pull_request` workflow (lint, type-check, build, Vitest, URL-preservation diff). Put a **required-reviewer rule** on the `github-pages` environment so deploys need a click-to-approve.
- **Unit tests** for the pure `src/lib/*` derivation functions (streak math, revision planner, exam readiness, forecasts) and the stores' snapshot stability.
- **Headers/hosting assessment:** compare (a) Cloudflare proxy in front of GitHub Pages with header rules, against (b) moving to Cloudflare Pages, Netlify or Vercel with a `_headers` file. Criteria: CSP/HSTS/frame-ancestors support, preview deploys, cost, DNS migration risk, rollback. **A DNS or hosting change needs owner approval and a maintenance window.**
- A **CSP** is first deployed in report-only mode (GA4, Supabase, fonts are self-hosted), then enforced.

---

## Open decisions for the owner

| # | Decision | Needed by |
|---|---|---|
| D-1 | Approve installing `next@16.4.6` (Phase 1) | Phase 1 |
| D-2 | Provide or approve the 3 missing PDFs (EMI, Wave Optics, Semiconductors), or ship with the link hidden | Phase 1 |
| D-3 | Legal entity/contact details for the policies; lawyer review | Phase 3 |
| D-4 | DPDP minors approach (age gate / parental consent / analytics for minors) | Phase 3, blocks the Phase 4 launch |
| D-5 | Live Supabase inspection method (I give you SQL to run, or you link the CLI) plus a staging project | Phase 4 |
| D-6 | Which stores sync (proposed: 6 high-value; device-only: recently viewed, searches, reading progress) | Phase 4 |
| D-7 | CAPTCHA vendor (Turnstile recommended: free, privacy-friendly) | Phase 4 |
| D-8 | Hosting: Cloudflare in front of GitHub Pages vs a move | Phase 5 |

## Documentation roadmap

| Document | Created in |
|---|---|
| `ARCHITECTURE_AUDIT.md` | Phase 0 ✅ |
| `IMPLEMENTATION_PLAN.md` | Phase 0 ✅ (updated per phase) |
| `CHANGELOG.md`, `TEST_REPORT.md` | Phase 1, then updated each phase |
| `SECURITY_REVIEW.md` | Phase 1 (dependency assessment), completed in Phases 4–5 |
| `DATABASE_SCHEMA.md`, `MIGRATION_PLAN.md` | Phase 4 (before any SQL is written) |
