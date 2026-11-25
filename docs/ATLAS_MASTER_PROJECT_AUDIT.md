# PROJECT ATLAS: Master Project Audit

| | |
|---|---|
| **Audit date** | 2026-11-25 |
| **Repository** | `AJAYSAHUPHYSICS/ajaysahuphysics-next` (public) |
| **`main` at audit time** | `b18b62e811fe0144c849cef94b9a6784bedb7454` (#27), verified against GitHub on 2026-11-25 |
| **Method** | Read-only. GitHub was read through `gh` and `git fetch`; files were read at `origin/main` and at the open PR heads. No Supabase connection, SQL, test run against staging or production, merge, push or deployment |
| **Companion** | The owner also keeps a management dashboard outside GitHub (owner decision, 2026-11-25). **This file is the GitHub master audit.** Where the two disagree, re-check the evidence cited here |
| **Private material** | Some evidence lives in git-excluded working notes (`docs/phase-2/`, never committed). It is cited by file name only. Nothing private is copied here |

> **No secrets, keys, passwords, tokens or personal data appear in this file.** Supabase project refs appear because they are already public in `supabase/staging/guard.mjs`. Environment variables are named, never valued.

---

## Status legend (used everywhere below)
| Status | Meaning |
|---|---|
| **VERIFIED** | Checked directly against code, GitHub or the live site, on the date shown |
| **CODE COMPLETE** | Implemented and covered by local tests (Vitest, PGlite, E2E). Not yet run against a real Supabase project |
| **STAGING VERIFIED** | Run against the staging project `wtuifivaxnhdnfwjsayk` with synthetic data. **This never proves production readiness** |
| **PRODUCTION VERIFIED** | Checked against the live site or a production project |
| **PENDING** | Not done yet; no blocker beyond the owner's approval or engineering time |
| **BLOCKED** | Can't start until a named dependency clears |
| **NOT VERIFIED** | Claimed somewhere, or plausible, but no evidence was found |

"Last verified" dates are the dates the cited evidence was produced. Dates on 2026-11-25 were re-checked during this audit.

---

## 1. Executive summary and vision
**Vision.** Project ATLAS rebuilds **ajaysahuphysics.com** into a physics learning platform for Class 11–12, JEE and NEET students:
- an original, reviewed academic library;
- local-first study tools;
- optional student accounts with cloud copies of progress, privacy-safe by default;
- later, an AI tutor (ATLAS TUTOR) that answers only from published, reviewed content.

**Where it stands (2026-11-25):**
- **The public site is live and verified** (PRODUCTION VERIFIED for the public site and the local tools). It's a Next.js 16 static export on GitHub Pages, deployed from `main` `b18b62e`.
- **The seven study tools are live, local-first and tested** on four browser engines.
- **All legacy learning content is withheld.** Each resource page shows a "being rebuilt" notice; no rebuilt chapter is published yet.
- **The account platform is deployed but dormant:** login is hidden (`ACCOUNTS_UI_ENABLED = false`), cloud sync is off (`CLOUD_SYNC_ENABLED = false`), and no Phase 2 database schema exists in any production project.
- **The Phase 2 database is STAGING VERIFIED only.** Migrations 1–5 are applied on staging; migration 6 (verified email) is in open PR #25.
- **The production plan changed on 2026-11-24.** The Phase 2 schema will be created fresh in a **new** production project (`fuznyurpfqgjricivopd`); old Auth accounts won't be migrated. That plan is recorded only in private notes so far (section 6).

**Phase 2 overall: RELEASE-INCOMPLETE. 2 of 14 completion criteria are met** (section 14). The owner has confirmed that Phase 2 covers the **complete** scope: student accounts, verified email, account management, cloud sync, security, privacy and deletion (owner decision, 2026-11-25).

---

## 2. Goals and success criteria
| Goal | Success looks like | Status (2026-11-25) |
|---|---|---|
| A trustworthy public site | Every page valid, fast and accessible; no unreviewed content shown | PRODUCTION VERIFIED for the shell and the withholding; the rebuilt library hasn't started publishing |
| Local-first study tools | Seven tools work offline-first, with stable data formats, on all major engines | PRODUCTION VERIFIED (Chromium, live); engine-level E2E VERIFIED on Firefox and WebKit; real Safari devices NOT VERIFIED |
| Optional accounts | Verified-email accounts; generic errors; PKCE; password minimum 10 | CODE COMPLETE; UI hidden; production Auth settings NOT VERIFIED |
| Safe cloud copies | The database decides; never syncs unverified or under-18 accounts without the required consent; never loses device data | CODE COMPLETE on `main` without the M1 fix; the M1 fix and verified email are in PR #25; STAGING VERIFIED for migrations 1–5 only |
| Data rights | Export and deletion always available, gated and verified | CODE COMPLETE; deletion STAGING VERIFIED (38/38); production BLOCKED |
| Least privilege and RLS | No `anon` access; per-student isolation; no client write to switches | STAGING VERIFIED and PGlite VERIFIED; production not started |
| Honest documentation | One tracker that matches reality | NOT MET (section 16, discrepancies) |

The formal measure is the 14 Phase 2 completion criteria (section 14).

---

## 3. All ATLAS subprojects
| Subproject | What it is | Status | Evidence |
|---|---|---|---|
| Phase 0: architecture audit | Baseline audit and plan | VERIFIED (merged) | #1; `ARCHITECTURE_AUDIT.md`, `IMPLEMENTATION_PLAN.md` |
| Phase 1a: CI and deploy guard | PR quality gate; main-only deploy | VERIFIED (merged) | #2; `.github/workflows/ci.yml`, `deploy.yml` |
| Phase 1b/1c: reliability, SEO, OG, Next.js 16.4.6 | Fixes; advisories cleared | VERIFIED (merged) | #3, #9 |
| Phase 2A: content foundation | Legacy withheld; content schema, validator, renderer and publication controls | VERIFIED (merged) | #4, #5; `src/lib/content-policy/publication.ts`, `src/lib/content-v2/` |
| Phase 2B-1: security baseline | Strict CSP, safe JSON-LD | VERIFIED (merged) | #6; `scripts/inject-csp.mjs`, `security-baseline.test.ts` |
| Phase 2B: study tools | Seven local-first tools; dashboard | PRODUCTION VERIFIED | #8, #13, #17, #18; `study-tools.test.ts`, `scripts/e2e/study-tools.mjs` |
| Phase 2B: accounts platform | Auth, RLS schema, sync engine, export, deletion (dormant) | CODE COMPLETE; STAGING VERIFIED (migrations 1–5) | #7 (`9019a1c`, includes #10 and #15), #22, #24, #21 |
| Phase 2.5: platform hardening | Phone overflow, hydration, a11y, hidden login | PRODUCTION VERIFIED | #11, #14, #16, #17 |
| Verified-email sync (decision K) | Migration 6 plus the M1 sync fix | CODE COMPLETE, **OPEN PR #25** | PR #25, head `178bac8` |
| Staging guard allow-list | Only staging can be targeted by the staging scripts | VERIFIED (merged and deployed) | #27 (`b18b62e`); `staging-guard.test.ts` |
| Supabase project migration | Old production → new production, fresh start | PENDING (plan only; nothing executed) | Private notes `docs/phase-2/migration/` (v2, 2026-11-24) |
| Academic content rebuild | Original, reviewed chapters | PENDING (one chapter in private review) | Section 19 |
| ATLAS TUTOR | AI tutor over published content | NOT STARTED (blueprint only) | Section 20 |

---

## 4. Current technical architecture
**Stack** (`package.json` on `main`):
- Next.js `16.4.6` (App Router, `output: "export"`), React `19.2.4`, TypeScript, Tailwind CSS v4, self-hosted fonts (`@fontsource`);
- `@supabase/supabase-js` `^2.112.4`;
- Node `>=20.9`; CI uses Node 20;
- dev tools: Vitest `4.1.12`, PGlite `0.5.15` (in-process Postgres for database tests), Playwright `1.64.1`, ESLint 9.

**There is no server code in the site.** All server-side work runs in one Supabase Edge Function, `delete-account`.

| Area | Location | Notes |
|---|---|---|
| Routes | `src/app/` | Home, about, contact, blog, notes, formula sheet, DPP, PYQ, videos, class-11/12 with `[slug]/[resource]`, JEE, NEET, privacy, dashboard (5 sub-pages), account, `auth/callback`, `auth/reset-password` |
| Components | `src/components/` | About 70; the study tools, dashboard cards, `AuthModal.tsx`, `AuthButton.tsx`, `CaptchaWidget.tsx` |
| Study logic | `src/lib/*.ts` | Bookmarks, checklist, revision, mistakes, goals, streak, activity log, planners, insights |
| Storage safety | `src/lib/safe-storage.ts`, `src/lib/local-store-events.ts` | Never throws when storage is unavailable |
| Auth | `src/lib/auth/` | `accounts-ui.ts` (the UI switch), `auth-policy.ts` (password and messages), `captcha.ts`, `exchange-code.ts` (PKCE), `use-session.ts` |
| Supabase loading | `src/lib/supabase-loader.ts`, `supabase-client.ts` | The client loads only when needed (`supabase-lazy.test.ts`) |
| Sync | `src/lib/sync/` | `policy.ts`, `engine.ts`, `merge.ts`, `adapters.ts`, `supabase-remote.ts` |
| Account | `src/app/account/`, `src/lib/account/` | Device export and removal; account export; gated deletion |
| Content policy | `src/lib/content-policy/`, `src/lib/content-v2/` | What may be published |
| Build checks | `src/build-checks/`, `scripts/verify-build.mjs`, `scripts/inject-csp.mjs` | CSP, legacy-content leaks, URLs, sitemap |
| Database | `supabase/` | Migrations, rollback, inventory, the Edge Function, staging tooling, test shim |

**Local-first data:**
- **11 `atlas:*` localStorage stores.** Their formats are frozen (`student-data-compat.test.ts`).
- **Syncable (6),** `SYNCED_KEYS` in `src/lib/sync/policy.ts`: `atlas:bookmarks`, `atlas:checklist`, `atlas:revision`, `atlas:mistakes`, `atlas:goals`, `atlas:study-streak`.
- **Never leave the device (5),** `LOCAL_ONLY_KEYS`: `atlas:activity-log`, `atlas:recent-searches`, `atlas:reading-progress`, `atlas:recently-viewed`, `atlas:recently-viewed-resources`.
- **The sync engine's own key,** `atlas:sync-meta`, is written only when a sync runs.

---

## 5. GitHub workflow and deployment architecture
| Workflow | Trigger | What it does | Status |
|---|---|---|---|
| `.github/workflows/ci.yml` (job `ci`, **required**) | Every PR; pushes to non-`main` branches | `npm ci`, `tsc --noEmit`, lint, `npm test`, build, `verify-build.mjs`, `test:build-output`, `test:e2e` (headless Chrome). Read-only permissions, no secrets | VERIFIED (green on #25, #26 and #27 heads, 2026-11-25) |
| `.github/workflows/e2e-browsers.yml` (`e2e-firefox`, `e2e-webkit`) | Every PR | Builds, then runs E2E and keyboard checks in Firefox and WebKit. **Not required** | VERIFIED (green on #25, #26 and #27) |
| `.github/workflows/deploy.yml` | Push to `main` | Builds with secrets `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then deploys `out/` to GitHub Pages. Jobs run only on `refs/heads/main` | VERIFIED: run `45378204301` (2026-11-24) deployed `b18b62e` |
| `.github/workflows/deletion-sweep.yml` | Hourly (`17 * * * *`) and manual | Runs `scripts/deletion-sweep.mjs` only if the repository variable `ATLAS_DELETION_SWEEP_ENABLED == 'true'` | Inert: every scheduled run is `skipped` (latest `45537151036`, 2026-11-25) |

**Rules that always apply:**
- **Merging to `main` deploys the live site.** Every merge needs the owner's explicit approval and green `ci` on an up-to-date head.
- **Branch first.** Work happens on feature branches, never directly on `main`.
- **Squash-merge, pinned with `--match-head-commit`.** Check the deploy and the live site after each merge.
- **No force-push, no history rewrite.**
- **The required `ci` check doesn't require branches to be up to date with `main`** (finding F2). Update each branch before merging.

**The site:** `https://ajaysahuphysics.com/` returned HTTP 200 on 2026-11-25. That checks reachability only; it isn't a functional check.

---

## 6. Supabase architecture and the three environments
| Environment | Ref | Role | Phase 2 schema | Status |
|---|---|---|---|---|
| **Staging** | `wtuifivaxnhdnfwjsayk` ("ajaysahuphysics-staging", Free plan) | Rehearsal with synthetic data only | Migrations 1–5 applied; migration 6 not applied (its dry run on 2026-11-24 listed only migration 6) | STAGING VERIFIED for migrations 1–5 and `delete-account` v3 |
| **Current production** | `dykhwagloqxawgfkmjmc` | The project the live site's build points at | **None.** A read-only inventory (owner-run, 2026-11-24) found an older legacy schema not in git, with no rows | VERIFIED read-only (private inventory); **must never be deleted** without explicit retirement approval |
| **New production** | `fuznyurpfqgjricivopd` | Planned destination for Phase 2 | **None.** The inventory (2026-11-24) found only the platform function `public.rls_auto_enable()` | VERIFIED read-only (private inventory); nothing applied |

**Owner decisions (2026-11-24, recorded in the private migration plan v2, not yet in a committed tracker):**
- **Fresh start:** no old Auth account (users, identities, password hashes, sessions, tokens, MFA) is migrated.
- **Nothing to copy:** the old project has no application rows and no Storage objects.
- **The new project is built from the repository migrations,** then the site is switched over by changing the two GitHub secrets (a "cutover").

**Protections:**
- **`supabase/staging/guard.mjs`** (#27) is an allow-list: only `wtuifivaxnhdnfwjsayk` is accepted, and both production refs are refused by name, even when "confirmed".
- **The CLI path is outside the guard.** `supabase db push --linked` uses `supabase/.temp/project-ref`, so check the linked ref by hand before any CLI step.
- **Pinned CLI:** `npx supabase@2.122.1`.
- **Never run `supabase config push`.** `supabase/config.toml` holds only the `delete-account` function's `verify_jwt = false` pin.
- **Staging only:** `.env.staging.local` holds the staging keys; it's git-ignored, and `npm run staging:check` validates it offline without printing values.

**Staging state:**
- **Switches:** `adult_sync_permitted`, `minor_sync_permitted` and `account_deletion_enabled` are all `'false'`. Last recorded 2026-11-23, with 0 users (PR #26's tracker, T-14). **NOT VERIFIED since.**
- **"Confirm email" on staging:** the setup instructions say on (`supabase/README.md` §6), but it hasn't been read back. **NOT VERIFIED.**
- **Who owns the database functions on staging: NOT VERIFIED.**
  - The one query attempt (2026-11-24) returned no usable result.
  - A read-only check query (revision 4) is prepared but **not run**; running it needs the owner.

---

## 7. Student data lifecycle
1. **On the device (default, live).** The tools write to the `atlas:*` stores. Nothing leaves the browser.
2. **Device export and removal (live)** on `/account/`: "Download this device's data" covers every `atlas:*` store.
3. **Account (dormant).** An optional Supabase Auth account. `profiles` and `consents` are created on demand; consents are append-only (`atlas_consents_append_only` trigger).
4. **Cloud copies (off).** Only the 6 syncable stores. Each upload is checked by RLS: `user_id = auth.uid()` and `sync_allowed()`. Row caps apply (`atlas_row_cap`). Deletions travel as **tombstones** (`deleted_at`), never hard deletes.
5. **Account export (dormant):** `export_my_data()` returns only the caller's rows.
6. **Account deletion (dormant, gated):** section 11.
7. **Retention:** the `deletion_log` keeps only a SHA-256 hash of the user id plus counts. It has no foreign key, so the record outlives the account.

Under-18 students keep their device progress, export and deletion, but get **no cloud copies** until a verified parental-consent process exists (decision O, T-23b).

---

## 8. Authentication and account lifecycle
| Element | Implementation | Status |
|---|---|---|
| Sign-up and sign-in | `AuthModal.tsx`, PKCE email links to `/auth/callback/` and `/auth/reset-password/` | CODE COMPLETE; UI hidden |
| UI switch | `ACCOUNTS_UI_ENABLED = false` (`src/lib/auth/accounts-ui.ts`, #16). Signed-out visitors see no login; signed-in visitors keep "Log out" | PRODUCTION VERIFIED (hidden login 15/15, 2026-11-23) |
| Errors | Generic (no account enumeration), `auth-policy.ts` `MESSAGES` | CODE COMPLETE (`auth-and-account.test.ts`) |
| Password policy | ≥ 10 characters, ≤ 72 bytes; **browser-only** until Supabase's minimum is set (F3) | CODE COMPLETE; server setting NOT VERIFIED |
| CAPTCHA | Optional Turnstile (`captcha.ts`, `CaptchaWidget.tsx`). The build switch isn't wired into `deploy.yml` (F7) | CODE COMPLETE; not enabled |
| Email verification | Required for cloud copies (decision K): migration 6 in PR #25 | CODE COMPLETE in an open PR; not on `main` |
| Production Auth settings | Redirect URLs, Site URL, "Confirm email" on, minimum 10, rate limits (F3 checklist, `PHASE_2_RELEASE.md` §9 A.1) | **NOT VERIFIED** in either production project |
| API sign-ups | Hiding the UI doesn't disable sign-up through the API. Decision B kept public sign-ups enabled on the current production project | Owner-accepted (B). New project's setting NOT VERIFIED |
| Existing accounts | Decision M: existing Auth accounts are trusted as they stand. Decision 2026-11-24: old accounts won't be migrated, so those people register again | Owner decisions |
| The 7 email checks (E1) | Manual inbox checks | NOT VERIFIED (BLOCKED on Auth settings) |

---

## 9. Cloud sync architecture and safety rules
**Engine** (`src/lib/sync/engine.ts`):
- **A three-way merge** between the device, the cloud and the last agreed base.
- **Result values:** `disabled`, `needs-link-confirmation`, `linked-to-another-account`, `error`, `ok`.
- **Account link:** a device is linked to one `accountId`. A different signed-in account is refused (`linked-to-another-account`), and the first sync asks for link confirmation.

**Safety rules (all mandatory):**
1. **Code switch off.** `CLOUD_SYNC_ENABLED = false` in `src/lib/sync/policy.ts`. While it's false, the engine refuses to run and no study data is sent. VERIFIED on `main`.
2. **Database switches off.** `app_config.adult_sync_permitted` and `minor_sync_permitted` are `'false'`, and only the service role can change them. A student's attempt to update `app_config` is denied; `test:staging:release` checks this every run. STAGING VERIFIED (63/63, 2026-11-22).
3. **The database decides.** `enable_sync()` and `sync_allowed()` check consent (terms, privacy, cloud-sync), the switches, pending deletion, the under-18 rules, and (with PR #25) a verified email.
4. **Under-18s** also need `parental_consent_verified()`. Only a verified server process can satisfy it, and **none exists** (T-23b).
5. **Data minimisation.** The 5 local-only stores are never read by sync code (`sync-engine.test.ts`).
6. **Tombstones are the only deletion mechanism.** The only server-side hard delete is the account-deletion purge.
7. **Device data is never lost to a hidden or incomplete cloud (M1).**
   - The engine proceeds only when `sync_allowed()` returns exactly `true` (result `not-allowed` otherwise).
   - A previously agreed record missing from the cloud stops the sync with `cloud-incomplete` before any change.
   - **This fix is only in PR #25 (`2f2a9d9`).** It isn't on `main`. Sync is off, so there's no live exposure, but **sync must not be enabled from `main` as it stands.**

**Don't enable** cloud sync, `adult_sync_permitted`, `minor_sync_permitted` or `account_deletion_enabled` without explicit owner authorisation. **Don't run** `npm run test:staging`: it switches `adult_sync_permitted` on for its run (owner decision, 2026-11-22).

---

## 10. Database migrations and rollback strategy
| # | Migration | Purpose | On `main` | Staging | New production | Current production |
|---|---|---|---|---|---|---|
| 1 | `20261120000000_student_accounts.sql` | 11 tables (12 with migration 4's `deletion_rate`), RLS, consent gate, export, two-step deletion, triggers; revokes all client privileges on schema `public` | Yes | Applied | Not applied | Not applied |
| 2 | `20261121000000_service_role_grants.sql` | Least privilege for the server role | Yes | Applied | Not applied | Not applied |
| 3 | `20261122000000_account_deletion_gate.sql` | Deletion gate, off, fails closed | Yes | Applied | Not applied | Not applied |
| 4 | `20261122010000_deletion_rate_limit.sql` | `deletion_rate` table, `deletion_rate_wait()` | Yes | Applied | Not applied | Not applied |
| 5 | `20261123000000_deletion_log_sequence_privilege.sql` | T-14: revokes client privileges on `deletion_log_id_seq` | Yes | Applied 2026-11-23 | Not applied | Not applied |
| 6 | `20261124000000_require_verified_email_for_sync.sql` | Decision K: `email_verified()`; SELECT policies; `sync_allowed()` and `enable_sync()` | **No (PR #25)** | Not applied (dry run lists only it, 2026-11-24) | Not applied | Not applied |

**Rules:**
- **Each production migration needs its own approval** (decision G).
- **Run them consecutively in one maintenance window.** Migration 1 alone would leave `request_account_deletion()` ungated until migration 3.
- **Deploy `delete-account` (gate off) before the migrations.** Until the tables exist, it refuses every request and changes nothing.
- **A migration applies atomically.** The CLI sends each migration file as one implicit transaction (verified from the CLI source at `v2.122.1`). A failure rolls back the whole file.

**Rollback scripts (`supabase/rollback/`):**
- **`student_accounts_down.sql`** is a **destructive** rollback of the schema. It's tested in PGlite (`db-rollback.test.ts`).
  - It refuses unless the read-only `export_before_rollback.sql` was run first and its content-integrity acknowledgement still matches (T-18, `db-rollback-guard.test.ts`).
  - **Discrepancy:** `supabase/README.md` on `main` still describes the acknowledgement as counts only.
- **`verified_email_down.sql`** (PR #25) is a non-destructive rollback of migration 6. Its header says to run it in the SQL Editor, which is expected to run as `postgres` (NOT VERIFIED on staging).
  - It needs `postgres` to have the function and table owners' privileges, `USAGE` on schema `auth`, and permission to delete the migration's history row.
  - These are **NOT VERIFIED on staging**; revision 4 of the read-only check covers them.

**Tests (PGlite, no Docker):**
- `db-rls.test.ts`, `db-rls-hardening.test.ts`, `db-deletion-gate.test.ts`, `db-deletion-rate-limit.test.ts`, `db-sequence-privileges.test.ts`, `db-rollback.test.ts`, `db-rollback-guard.test.ts`, `schema-inventory.test.ts`;
- on PR #25 also `db-verified-email.test.ts` (15 tests).

---

## 11. Account deletion and scheduled deletion sweep
1. **`request_account_deletion()`** checks sign-in, then the gate, then a rate limit of 5 per hour. It records the request and stops uploads.
2. **The `delete-account` Edge Function** (`supabase/functions/delete-account/handler.ts`):
   - verifies the user's token with the Auth server;
   - checks the gate (off returns 403; unreadable returns 503);
   - applies a rate limit of 6 calls per 10 minutes (429 with `retryAfterSeconds`; a limiter error is 503);
   - requires a recorded request;
   - runs `purge_user_data()`, then deletes the Auth user.
   - Database errors are always reported, never treated as "nothing to do".
3. **The sweep** (`?sweep=1`, constant-time secret check) completes requests older than a 24-hour grace period and reports stale ones (older than 72 hours).
   - **Scheduler:** `.github/workflows/deletion-sweep.yml` runs `scripts/deletion-sweep.mjs`. A failed run is the alert.
   - **It needs** `vars.ATLAS_DELETION_SWEEP_ENABLED`, `vars.ATLAS_SWEEP_URL` and `secrets.ATLAS_DELETION_SWEEP_SECRET`.
   - **The repository has no workflow variables set** (last recorded 2026-11-23 in PR #26's tracker), consistent with every scheduled run being skipped (2026-11-25).
4. **Account-page gate (F4):** the delete button needs `cloudReady === true` **and** the gate open (`src/lib/account/deletion-availability.ts`). Without the database objects, deletion shows as "not set up", with the Contact-page fallback.

| Check | Status | Last verified |
|---|---|---|
| Gate, rate limits and function on staging (stage 1) | STAGING VERIFIED: `test:staging:deletion-gate` 38/38 | 2026-11-22 |
| Account page on staging (gate off and on) | STAGING VERIFIED: 8/8 off, 15/15 on | 2026-11-22 |
| The scheduler itself | NOT VERIFIED (never run against any project) | — |
| Production stages 2–5 (runbook §9, C.3) | BLOCKED | — |
| Unit tests | VERIFIED in CI: `delete-account.test.ts`, `delete-account-config.test.ts`, `deletion-sweep.test.ts`, `deletion-availability.test.ts` | 2026-11-24 (#27 CI) |

**Account deletion must stay disabled in production (gate off)** until the staged verification and the owner's explicit approval.

---

## 12. Security, privacy and parental-consent controls
| Control | Status | Evidence |
|---|---|---|
| Strict CSP (no `unsafe-inline` or `unsafe-eval` for scripts) on every page | PRODUCTION VERIFIED (0 violations after #7) | #6; `scripts/inject-csp.mjs`; `csp.check.ts`; F9 |
| Production-configured login under CSP | STAGING VERIFIED (15/15); a live login NOT VERIFIED (login hidden) | F9, 2026-11-21 and 2026-11-22 |
| RLS on every table; `anon` has no access; students isolated | STAGING VERIFIED (RLS probe 25/25); PGlite VERIFIED | `db-rls.test.ts`, `db-rls-hardening.test.ts` |
| Security-definer functions with `search_path = ''` | CODE COMPLETE; staging owners NOT VERIFIED | Migrations 1–6 |
| No client write to `app_config` | STAGING VERIFIED (63/63) | `release-check.staging.mjs` |
| Secrets: none in the repository or build output; service key never in browser code | VERIFIED (build checks); `staging:check` refuses secret keys in env files Next.js loads | `staging-env.test.ts` |
| Staging guard allow-list | VERIFIED (merged, deployed) | #27, `staging-guard.test.ts` |
| Frame protection and headers (F8) | **OPEN:** GitHub Pages sends only HSTS (no `frame-ancestors`, `X-Frame-Options` or `X-Content-Type-Options`) | Hosting decision |
| Analytics and CAPTCHA build switches (F7) | OPEN: work in code, not wired into `deploy.yml` | Workflow PR needed |
| Privacy notice `/privacy` | PRODUCTION VERIFIED as an accurate **labelled draft**, `noindex`, outside the sitemap (#20) | `privacy-notice-accuracy.test.ts` |
| Notice and consent screens for live accounts and sync (T-24) | PENDING (decision J: before launch) | — |
| Legal review (F12) | POST-LAUNCH (decision I). **No legal approval is claimed** | — |
| Parental consent for under-18 sync | BLOCKED: no verified process exists (T-23b, decision O) | `parental_consent_verified()` in migration 1 |

---

## 13. Completed milestones with evidence
| Date (merged) | PR | Squash commit | Milestone | Verification |
|---|---|---|---|---|
| 2026-11-13 | #1, #2 | — | Phase 0 audit; CI and deploy guard | Merged |
| 2026-11-16 | #3 | — | Phase 1b reliability, SEO, OG | Merged |
| 2026-11-19 | #4, #5 | — | Legacy content withheld; content foundation | Merged |
| 2026-11-21 | #6, #8, #9, #11, #13 | `de050c4`, `eed9592`, `2734e98` | CSP; study tools; Next.js 16.4.6; hardening; dashboard | Merged |
| 2026-11-22 | #14, #16, #17, #18 | `21d0d11`, `357b061`, `5bc0cd8`, `367d430` | JEE picker a11y; hidden login (H1); hydration fix (M1); E2E for checklists, streaks and goals | PRODUCTION VERIFIED (live checks recorded in the tracker) |
| 2026-11-22 | #10, #15 (stacked) | — | Staging suite; deletion gate, rate limits, sweep | STAGING VERIFIED |
| 2026-11-23 | #7 | `9019a1c` | Accounts platform (dormant) | Deployment `7988286758` |
| 2026-11-23 | #20, #22, #24, #21, #23, #19 | `b238489`, `561cb22`, `bc9a960`, `6d39449`, `86e3d59`, `0244587` | Notice accuracy; T-14; T-18; F10 inventory; Firefox and WebKit E2E; docs | Combined tree: unit 659 passed, 1 skipped; E2E 90/90 on four engines. Deployment `7995693613` |
| 2026-11-23 | — | — | T-14 applied to staging (decision F) | STAGING VERIFIED (`test:staging:release` 63/63) |
| 2026-11-24 | #27 | `b18b62e` | Staging guard allow-list | CI green on head `7a47353` (identical tree to `b18b62e`); deploy run `45378204301` succeeded |
| 2026-11-24 | — | — | Read-only inventories of both production projects (owner-run, dashboard) | VERIFIED read-only; private notes |
| 2026-11-24 | — | — | Migration 6 staging dry run (from a detached worktree at `2f2a9d9`) | Listed only migration 6; applied nothing |

---

## 14. All 14 Phase 2 completion criteria
**Why the two numbers differ:**
- **`main`'s tracker says "Met: 4 of 14" (2, 3, 13, 14).** It was written 2026-11-23, before the six merges and the later decisions.
- **PR #26's tracker (unmerged) says "Met: 3 of 14" (2, 3, 4).** It no longer counts 13 and 14 and adds 4, on public-site scope.
- *(Superseded by the correction below.)* **"6 of 14" was searched for and not found** anywhere in the repository, any branch or the private notes, so it's **NOT VERIFIED.** If it comes from the external dashboard, it probably counts the staging-only results for criteria 8 and 9 as met. **Staging results don't prove production readiness, so this audit doesn't count them.**
- **Correction (2026-11-25, after this audit): "6 of 14" does have a source.** PR #26's first commit `8deef97` (2026-11-23) said "Met: 6 of 14 (criteria 2, 3, 4, 12, 13 and 14)", and #26's PR description repeated it. The owner's review corrections (`df57534`) replaced it with 3 of 14, but the PR description wasn't updated. The search above covered branch heads, not their history or PR descriptions, and so missed it. The guess about criteria 8 and 9 is withdrawn. Criteria 12, 13 and 14 aren't met (rows below), so 6 of 14 isn't supported by the evidence.
- **Update (2026-11-25, after this audit):** PR #26 was revised (`48e942c`, `3e0c93b`) to match this table: 2 of 14 met, criterion 4 partial. The "PR #26 (11-23)" column below shows its earlier version.

| # | Criterion | `main` tracker (11-23) | PR #26 (11-23) | **This audit (11-25)** | Evidence |
|---|---|---|---|---|---|
| 1 | All agreed functionality implemented | Code complete | IN PROGRESS | **PENDING.** Migration 6 and the M1 fix are in open #25; under-18 parental verification isn't built | PR #25; T-23b |
| 2 | Seven tools verified | Met | Met | **VERIFIED** (engine level). Real Safari devices NOT VERIFIED | #23 (`86e3d59`): E2E 90/90 on Chrome, Edge, Firefox and WebKit |
| 3 | Tests pass on the release SHA | Met (`9019a1c`) | Met (`0244587`) | **VERIFIED for `b18b62e`**: `ci`, `e2e-firefox` and `e2e-webkit` green on `7a47353`, whose tree is identical to `b18b62e` | `gh pr view 27`; tree `527b8c2` |
| 4 | Production deployment verified | Partial | Met (public site) | **PARTIAL.** PRODUCTION VERIFIED for the public site and local tools only. Accounts and sync (in scope) aren't active | Run `45378204301`; live checks 2026-11-23 |
| 5 | Legal approval | Waiting | POST-LAUNCH | **NOT MET** (post-launch by decision I; not a launch gate) | Decision I |
| 6 | Production schema and backup verified | Waiting | BLOCKED | **NOT MET.** Read-only inventories done (2026-11-24); no schema applied; under the fresh-start plan a backup is only an optional retirement safeguard | Private migration plan v2 |
| 7 | Auth configuration verified | Waiting | Awaiting approval | **NOT MET.** No production Auth setting read back. Staging "Confirm email" NOT VERIFIED | T-10 |
| 8 | Deletion safely tested | Partial | Partial | **NOT MET.** STAGING VERIFIED (38/38); production BLOCKED | T-16, T-17 |
| 9 | Security and RLS verified | Partial | Partial | **NOT MET.** STAGING VERIFIED and PGlite VERIFIED; production not started | T-13 |
| 10 | Accounts UI live and verified | BLOCKED | BLOCKED | **BLOCKED** | `ACCOUNTS_UI_ENABLED = false` |
| 11 | Cloud sync live and verified | BLOCKED | BLOCKED | **BLOCKED** | `CLOUD_SYNC_ENABLED = false` |
| 12 | Documentation matches the release | In progress | In progress | **NOT MET.** 12 discrepancies (section 16) | This audit |
| 13 | Tracker reflects the actual state | Met | In progress | **NOT MET.** `main`'s tracker says `main` = `9019a1c`; #26 predates #27 and the 2026-11-24 decisions | Section 16 |
| 14 | No critical or high unresolved security issue | Met | NOT MET for activation | **NOT MET for activation.** Holds only while dormant. Open: #25 unmerged; production RLS unverified; F8 headers | #25, F8 |

**Result: 2 of 14 met (criteria 2 and 3).** Criterion 4 is partial (3 of 14 on PR #26's public-site counting). No percentage beyond this is claimed.

---

## 15. Open PRs and review status (verified 2026-11-25)
| PR | Title | Head | Base | CI | Mergeable | Reviews | Notes |
|---|---|---|---|---|---|---|---|
| #25 | feat(db): cloud copies require a verified email address (decision K) | `178bac8` (6 commits; includes the merge of `main` `b18b62e`) | `main` | `ci` ×2, `e2e-firefox`, `e2e-webkit`: success | MERGEABLE, CLEAN | 0 | Migration 6, `verified_email_down.sql`, M1 sync fix (`2f2a9d9`). Local at `2f2a9d9`: unit 683 passed, 1 skipped; build 233 pages. **Don't merge without explicit approval.** Before merging: "Confirm email" on in the target project (T-10) |
| #26 | docs(tracker): record the six merges, T-14 on staging, six-migration plan and blockers | `baff61d` | `main` (1 commit behind: lacks #27) | success | MERGEABLE, CLEAN | 0 | **Don't merge without explicit approval.** Its content is now partly stale (section 16) |

**Update (later on 2026-11-25, after this audit):**
- **#25:** head `74e3ca0` (adds the `supabase/README.md` fixes). Local checks on its tree: `tsc`, lint, unit 692 passed and 1 skipped, build, `verify-build`, build-output 11 passed and 2 skipped, Chrome E2E and keyboard (exit 0).
- **#26:** retitled "docs: reconcile the tracker, release doc and README with the current evidence". Merged with `main` (`8549da9`), then reconciled (`48e942c`, `3e0c93b`).
- **#28:** this audit, opened on 2026-11-25.
- **All three** are open and unmerged; see each PR for its current CI.

Closed without merging: #12, which a rebased PR #13 replaced.

**Local worktrees** (this machine only, not GitHub state): many branch worktrees exist beside the main checkout. The main checkout is on `phase-2b-staging-verification` at `3f1029b`, with the owner's uncommitted `package.json`, `package-lock.json` and untracked `docs/content/`. **Don't clean or overwrite any of them.**

---

## 16. Blockers and owner decisions
### Blockers
| ID | Blocker | Blocks | Clears when |
|---|---|---|---|
| B-1 | PR #25 unmerged | Migration 6 in production; criterion 1; safe sync | Owner approves the merge, after T-10 |
| B-2 | Production Auth settings ("Confirm email" on, redirect URLs, Site URL, minimum 10) not set or read back in the new project | B-1, migrations, accounts UI | Owner authorises and applies the F3 checklist; read back |
| B-3 | Staging function ownership and rollback prerequisites NOT VERIFIED | Applying migration 6 to staging with confidence | Owner runs the read-only revision 4 check in the staging SQL Editor and shares the result |
| B-4 | No production schema in the new project | Criteria 6–9 | Per-migration approvals (section 17) |
| B-5 | `delete-account` function and its secret not deployed to the new project | Migrations (must come first) | Separate approvals |
| B-6 | Deletion sweep not configured | Criterion 8 in production | Repository variables and secret, after migrations |
| B-7 | No verified parental-consent process | Under-18 sync (not adult sync) | Owner decision on a proposal |
| B-8 | Tracker and docs out of date | Criteria 12 and 13 | A documentation PR, approved and merged |

### Owner decisions on record
| ID | Decision | Date | Where recorded |
|---|---|---|---|
| — | `npm run test:staging` not used (it enables sync) | 2026-11-22 | `PHASE_2_RELEASE.md` §5 (`main`) |
| — | Hide login until the release (H1) | 2026-11-22 | `main` tracker |
| F13 | `/privacy` as a labelled draft, `noindex` | 2026-11-23 | `main` tracker |
| A | The six PR merges | 2026-11-23 | PR #26 tracker |
| B | Keep public sign-ups enabled (current production project) | 2026-11-23 | PR #26 tracker |
| C, D, E | Read-only inventory; secured backup without restore; restore rehearsal after launch | 2026-11-23 | PR #26 tracker. C and D are largely superseded by the 2026-11-24 fresh start |
| F | T-14 on staging | 2026-11-23 | PR #26 tracker (done) |
| G | Prepare migrations; **each needs its own approval** | 2026-11-23 | PR #26 tracker |
| H | Keep accounts and cloud sync in Phase 2 | 2026-11-23 | PR #26 tracker; **reaffirmed 2026-11-25: complete scope** |
| I | Formal legal review after launch; the notice isn't to be described as approved | 2026-11-23 | PR #26 tracker |
| J | Notice, consent, export and deletion screens before launch | 2026-11-23 | PR #26 tracker |
| K | Mandatory email verification; no sync for unverified accounts | 2026-11-23 | PR #26 tracker; PR #25 |
| L | Launch once the technical gates pass; individual migration approvals still required | 2026-11-23 | PR #26 tracker |
| M | Existing Auth accounts trusted as they stand | 2026-11-23 | PR #26 tracker |
| N | Unverified accounts blocked from reading and writing cloud rows; export and deletion kept | 2026-11-23 | PR #26 tracker; PR #25 |
| O | Under-18 sync separately blocked; doesn't block adult sync | 2026-11-23 | PR #26 tracker |
| — | Fresh start in `fuznyurpfqgjricivopd`; no old Auth migration | 2026-11-24 | Private migration plan v2 only |
| — | Staging guard allow-list (#27) merged | 2026-11-24 | GitHub |
| — | Phase 2 is complete scope; keep a GitHub master audit and a management dashboard; this task authorises no merge, deployment or Supabase change | 2026-11-25 | This audit |

### Documentation discrepancies found
| # | Where | What it says | What's true (evidence) |
|---|---|---|---|
| D-1 | `docs/PHASE_2_TRACKER.md` (`main`) | `main` = production = `9019a1c`; six PRs open; "Met: 4 of 14" | `main` is `b18b62e`; all six merged 2026-11-23; 2 of 14 met (section 14) |
| D-2 | `docs/PHASE_2_TRACKER.md` (PR #26) | `main` = `0244587`; #25 head `f2cf667`; production = "the project the live site uses" | `main` `b18b62e`; #25 head `178bac8`; the destination is now `fuznyurpfqgjricivopd` (2026-11-24) |
| D-3 | PR #26 | Says nothing of #27 or the new production project | #27 merged 2026-11-24; PR #26 is 1 commit behind `main` |
| D-4 | PR #26's description, and its first commit `8deef97` | "6 of 14 criteria met" | Withdrawn by the owner's corrections (`df57534`: 3 of 14); 2 of 14 on current evidence. *(This row first said no source existed; corrected 2026-11-25.)* |
| D-5 | `README.md` (`main`), CI section | CI runs "type-check, lint, unit tests, production build, and `verify-build.mjs`" | `ci.yml` also runs `test:build-output` and `test:e2e`; `e2e-browsers.yml` adds Firefox and WebKit |
| D-6 | `README.md` (`main`) | Lists `npm run test:staging` with no warning; sync off "until legal sign-off" | The owner prohibited `test:staging` (2026-11-22); decision I moved legal review after launch (only in unmerged #26) |
| D-7 | `supabase/README.md` (`main`) | Migration 5 "not applied anywhere yet"; "apply all five together" | Applied to staging 2026-11-23; six migrations, each approved separately (fixed in PR #25) |
| D-8 | `supabase/README.md` (`main`) | The rollback acknowledgement matches "the current counts" | T-18 (#24) made it a content-integrity hash (`v2:<pending>/<logged>:<sha256>`) |
| D-9 | `docs/PHASE_2_RELEASE.md` (`main`) | #19–#21 open; four migrations; legal sign-off gates sync | All merged; six migrations; decision I (reconciled only in unmerged #26) |
| D-10 | `src/lib/sync/policy.ts` comment | Launch "after legal review" | Decision I (a code comment; not changed by this audit) |
| D-11 | Private migration notes §15.6 | The staging-guard PR is still blocking | Merged as #27 on 2026-11-24 |
| D-12 | PR #26 tracker T-08 and T-09 | Inventory and backup of the current production project are the next steps | Inventories done 2026-11-24; under the fresh start a backup is optional, for retirement only |

Not a discrepancy: `docs/PHASE_2_COMPLETION_AUDIT.md` is a dated snapshot (2026-11-23) and is correctly labelled as historical.

**Where each discrepancy is fixed** (updated 2026-11-25, after this audit; **every fix is unmerged** until the owner approves):

| # | Fixed in | How |
|---|---|---|
| D-1, D-2, D-3, D-12 | #26 (`48e942c`) | The tracker's live status, T-rows, criteria (2 of 14) and approval register now match the evidence; it's up to date with `main` |
| D-4 | #26 | The tracker explains the withdrawn 6 of 14; #26's PR description is updated to 2 of 14 |
| D-5, D-6 | #26 | `README.md`: the full CI steps, the safe staging checks, a warning not to run `test:staging`, decision I |
| D-7, D-8 | #25 | `supabase/README.md`: migration 5 applied to staging; six migrations, each approved separately; the content-integrity ack |
| D-9 | #26 | `PHASE_2_RELEASE.md`: status, the new project, the staging rehearsal and the cutover |
| D-10 | Not changed | A code comment in `src/lib/sync/policy.ts`; harmless, left for a code PR |
| D-11 | Not changed | Private, git-excluded notes; outside the repository |

---

## 17. Production migration runbook (summary; each step needs its own explicit approval)
The detailed procedure lives in `docs/PHASE_2_RELEASE.md` §9. PR #26 has the reconciled version, but it isn't merged and predates the new-project plan. The new-project plan is in the private notes.

**This summary orders the steps; it authorises none of them.**
1. **Clear the repository gates:** the owner approves and merges PR #25 (after step 3 is ready), so `main` carries all six migrations and the M1 sync fix.
2. **Confirm the target.** Check `fuznyurpfqgjricivopd` in the dashboard address bar. **Never infer a project's identity from its Postgres version.** Re-run the read-only destination inventory and compare (expect 0 blockers, 0 conflicts).
3. **Configure the new project's Auth** (F3 checklist): Site URL, redirect URLs, **"Confirm email" on**, minimum password length 10, rate limits, CAPTCHA order, SMTP and templates. Read them back.
4. **Run the read-only preflight** (expect go: no users, no `public` relations, only `rls_auto_enable`, empty migration history).
5. **Deploy `delete-account`** with its secret, gate off.
6. **Apply migrations 1–6,** each approved separately, consecutively, in one window. Stop at the first error; each file is atomic.
7. **Verify:**
   - the inventory again;
   - `supabase/inventory/schema_inventory.sql`;
   - the `app_config` seed rows;
   - all tables with RLS, and no `anon` or PUBLIC grants;
   - function ownership (the revision 4 query, adapted to the target).
8. **Run the synthetic journeys** in the new project (sign-up, confirmation email, verified-email and under-18 gates, export, deletion), each approved.
9. **Cut over:**
   - privately record the current values of the two GitHub secrets for rollback;
   - change `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`;
   - redeploy (a merge or manual dispatch, approved);
   - run the live checks.
10. **Configure the deletion sweep** (T-15), then the production deletion stages 2–5 (T-17), each approved.
11. **Notice and consent screens** (T-24), then the 7 email checks (E1).
12. **Activate** (decision L): the accounts UI, then adult sync. Each is a code change plus a production switch, each approved. Under-18 sync stays off (T-23b).
13. **Observe, then retire the old project** only with explicit authorisation. Never delete `dykhwagloqxawgfkmjmc` otherwise. Decide on a backup or erasure of its existing accounts.

**Rollback:**
- **Before the cutover:** the site is unchanged. Use `verified_email_down.sql` for migration 6 alone, or the guarded `student_accounts_down.sql` after `export_before_rollback.sql`.
- **After the cutover:** restore the two GitHub secrets and redeploy.

---

## 18. Phase 2 completion roadmap
| Order | Work | Criteria it moves | Needs |
|---|---|---|---|
| 1 | Documentation PR: reconcile the tracker, README, `supabase/README.md` and `PHASE_2_RELEASE.md` with this audit (supersede or rebase #26) | 12, 13 | Engineering; owner merge |
| 2 | Run the read-only staging ownership check (revision 4) | — (de-risks 9) | Owner runs it |
| 3 | Verify staging "Confirm email"; apply migration 6 to staging; add the `test:staging:verified-email` check (it doesn't exist yet) | 1, 9 (staging) | Separate approvals |
| 4 | Merge #25 | 1, 14 | Owner approval, after T-10 |
| 5 | New-project Auth, function, migrations, verification (section 17) | 6, 7, 9 | Approvals per step |
| 6 | Deletion sweep and production stages | 8 | Approvals per stage |
| 7 | Notice and consent screens; E1 | 12, 10 | Engineering; owner |
| 8 | Cutover; activate the accounts UI and adult sync | 4, 10, 11 | Owner decisions |
| 9 | Under-18: a verified parental-consent proposal | 11 (under-18 part) | Owner decision |
| 10 | F7 and F8 hardening | 14 | Workflow PR; hosting decision |

---

## 19. Academic content roadmap
- **Current state (VERIFIED on `main`):** all legacy learning content is withheld from student-facing output. The rule lives in code, `src/lib/content-policy/publication.ts`.
  - Withheld: notes, short notes, formula sheets, DPP, JEE notes and DPP, PYQs, PDFs, guidance.
  - Every route still works, showing a "being rebuilt" notice, `noindex` and out of the sitemap.
  - Guard tests: `content-publication.test.ts`, `jee-publication.test.ts`, `pyq-publication.test.ts`, and `legacy-content-leaks.check.ts` (build).
- **Scope:** 30 chapter routes (16 for Class 11, 14 for Class 12, `src/lib/chapters.ts`). Rebuilt content uses the v2 package format (`src/lib/content-v2/`; `chapter-package.test.ts`, `question-bank.test.ts`).
- **Rebuild progress:**
  - **No rebuilt chapter is published.**
  - One chapter (Units and Measurements, route `physical-world-and-measurement`) is in private academic review outside the repository. Per `docs/content/CHAPTER_CONTENT_STATUS.md`, which is untracked and dated 2026-11-19, so NOT VERIFIED as current.
  - Drafts stay private until independent academic review and a separately approved publication step.
- **Policies** (untracked drafts in `docs/content/`, the owner's uncommitted work): chapter template, open-source content registry and licence policy, PYQ rights and source policy. **All prose is to be original.** PYQ republication depends on rights being settled.
- **Next:** finish the review of the first chapter, publish it through a reviewed PR that updates the publication policy, then continue chapter by chapter in the priority order from the private 30-chapter assessment.

---

## 20. ATLAS TUTOR future roadmap
**Status: NOT STARTED, blueprint only** (private, `docs/phase-2/ATLAS_TUTOR_TECHNICAL_BLUEPRINT.md` and `ATLAS_TUTOR_DEPENDENCY_MAP.md`). No AI calls, keys or paid services are in the repository.

**Preconditions:**
1. **Published, reviewed content:** the tutor answers only from published packages, never from withheld legacy content.
2. **Privacy and legal for minors:** verifiable parental consent under India's DPDP Act 2023, to be confirmed with counsel.
3. **A server component:** a static site can't hold an API key. A planned Edge Function or worker would verify the JWT, consent and quotas.
4. **An evaluation set** of real doubts with checked answers, so models are chosen by measurement.

**Phases** (blueprint §8; each has a gate):

| Phase | Scope | Gate |
|---|---|---|
| T0 | Foundation: published chapters, privacy and legal (DPDP, consent), eval set, server endpoint design review | Legal and privacy sign-off; at least 3 published chapters |
| T1 | Text doubts for signed-in students, chapter-aware, published chapters only, with quotas | Eval accuracy target met; cost per doubt within budget |
| T2 | Image doubts with a retention policy | Privacy review of images |
| T3 | Practice with reviewed original questions; hints; rule-based personalised revision | Question bank reviewed |
| T4 | Opt-in cloud progress sync and analytics | New storage design approved; consent flow live |
| T5 | Subscriptions and payments | Legal, tax and payments review |

Costs in the blueprint are estimates, not quotes. The tutor's T0 gate requires legal sign-off **before** the tutor, even though decision I moved Phase 2's legal review after launch.

---

## 21. Risk register
| ID | Risk | Likelihood | Impact | Mitigation | Status |
|---|---|---|---|---|---|
| R-1 | Sync enabled from `main` before the M1 fix lands; hidden cloud rows delete device progress | Low (sync off) | High | Merge #25 before any activation; `CLOUD_SYNC_ENABLED` stays false | OPEN |
| R-2 | "Confirm email" off in the target project, so "verified" doesn't prove the address | Medium | High | T-10 before #25 and migrations; read back | OPEN |
| R-3 | A staging script or CLI step aimed at a production project | Low | Critical | #27 allow-list; check the linked ref by hand for CLI steps | MITIGATED (scripts); CLI manual |
| R-4 | Migration 1 applied without 3 and 4 (ungated deletion) | Low | High | One window, consecutive; function first | DOCUMENTED |
| R-5 | Wrong function owner on staging or production; `email_verified()` can't read `auth.users`, or the rollback can't run | Unknown | Medium | Revision 4 read-only check; atomic migration apply | OPEN (NOT VERIFIED) |
| R-6 | API sign-ups while the UI is hidden | Medium | Medium | Decision B accepted on the current project; set deliberately in the new project | ACCEPTED (B) |
| R-7 | No frame protection or headers (clickjacking) | Medium | Medium | F8 hosting decision or interim guard | OPEN |
| R-8 | Under-18 data processed without verifiable parental consent | Low (blocked in the database) | Critical | `parental_consent_verified()`; T-23b | MITIGATED (blocked) |
| R-9 | Documentation drift misleads approvals | High | Medium | This audit; documentation PR | OPEN |
| R-10 | Old production project deleted or changed by mistake | Low | High | Never delete without retirement approval; read-only only | DOCUMENTED |
| R-11 | Free-plan staging pauses, or rehearsal capacity is limited | Medium | Low | Restore from the dashboard; OD-7 | OPEN |
| R-12 | Legal approval after launch (decision I) | Certain | Medium | Labelled draft notice; counsel package ready | ACCEPTED (I) |
| R-13 | Real Safari behaviour differs from WebKit E2E | Low | Low | Manual device check before activation | OPEN |
| R-14 | Deletion sweep never exercised as scheduled | Medium | Medium | Staged production verification (T-17) | OPEN |

---

## 22. Owner action register
| # | Action | Type | Authorises | Prerequisite |
|---|---|---|---|---|
| OA-1 | Review this audit; decide whether a documentation PR should supersede #26 | Review | Engineering drafts a PR | — |
| OA-2 | Run the read-only revision 4 ownership check in the **staging** SQL Editor; share the result | Read-only, staging | Nothing else | Confirm `wtuifivaxnhdnfwjsayk` in the address bar |
| OA-3 | Read back staging "Confirm email" | Read-only, staging | — | — |
| OA-4 | Approve applying migration 6 to staging | Staging change | That one apply | OA-2, OA-3 |
| OA-5 | Approve a PR adding `test:staging:verified-email` | Repository | That PR | — |
| OA-6 | Authorise the new project's Auth settings (F3), then read back | Production setting | Those settings | — |
| OA-7 | Approve merging #25 | Merge (deploys) | That merge | OA-6 |
| OA-8 | Approve deploying `delete-account` and its secret to the new project | Production | That deployment | OA-7 |
| OA-9 | Approve each of migrations 1–6 in the new project | Production | One migration each | OA-8 |
| OA-10 | Approve the cutover (two GitHub secrets, redeploy) | Production | Cutover | OA-9 and verification |
| OA-11 | Configure the deletion sweep (variables, secret) | Repository settings | Sweep | OA-9 |
| OA-12 | Decide F7 (analytics and CAPTCHA switches) and F8 (hosting and headers) | Decisions | Follow-up PRs | — |
| OA-13 | Decide on a parental-consent process (T-23b) | Decision | Design work | — |
| OA-14 | Later: retire the old production project (backup or erasure) | Production | Retirement | Observation period |

---

## 23. Audit history
| Date | Audit | Where | Notes |
|---|---|---|---|
| 2026-11-13 | Phase 0 architecture audit | `ARCHITECTURE_AUDIT.md`, `IMPLEMENTATION_PLAN.md` (#1) | Baseline |
| 2026-11-21 | Phase 2 pre-release audit (F1–F13) | `docs/PHASE_2_RELEASE.md` §12; `docs/PHASE_2_TRACKER.md` | Findings tracked by ID |
| 2026-11-22 | Live audit after deploys (M1 found) | `docs/PHASE_2_TRACKER.md` | 14/14 journeys |
| 2026-11-23 | Phase 2 completion audit (dated snapshot) | `docs/PHASE_2_COMPLETION_AUDIT.md` | Historical |
| 2026-11-23 | Tracker correction | PR #26 (open) | 3 of 14 |
| 2026-11-24 | Source and destination inventory comparison; fresh-start plan | Private migration notes | Nothing executed |
| 2026-11-24 | PR #25 security review; M1 found and fixed | PR #25; private review notes | `2f2a9d9` |
| 2026-11-24 to 25 | Staging function-ownership investigation; read-only query revisions 1–4 | This session; not run | B-3 |
| **2026-11-25** | **This master audit** | `docs/ATLAS_MASTER_PROJECT_AUDIT.md` (#28) | Read-only; GitHub state re-verified |
| 2026-11-25 | Reconciliation | #25 (`74e3ca0`), #26 (`3e0c93b`), #28 | The discrepancies in section 16 are fixed in the PRs shown there (unmerged). The "6 of 14" finding was corrected: its source is #26's first commit |

---

## Appendix: project safety rules (preserved)
1. **Deploys:** merging to `main` deploys the live site. Every merge needs the owner's explicit approval and green CI on an up-to-date head. Never merge PR #25 or #26 without explicit approval.
2. **Git:** no force-push, no history rewrite. Branch first. Commit or push only when asked.
3. **Supabase targets:**
   - **Staging** (`wtuifivaxnhdnfwjsayk`): synthetic data only; changes only with explicit authorisation.
   - **Production projects** (`dykhwagloqxawgfkmjmc`, `fuznyurpfqgjricivopd`): nothing without explicit, per-step approval. **Never delete `dykhwagloqxawgfkmjmc`.**
4. **Switches:**
   - Don't enable cloud sync, `adult_sync_permitted`, `minor_sync_permitted` or `account_deletion_enabled` without explicit authorisation.
   - Don't change Supabase authentication or production settings without explicit authorisation.
5. **Tests:** don't run `npm run test:staging` (it enables sync). `test:staging:verified-email` doesn't exist yet.
6. **Secrets:** never expose credentials, keys, passwords or tokens; never ask for them in chat; never commit env files.
7. **Private material:** `docs/phase-2/`, `staging-evidence/` and `supabase/.temp/` are git-excluded and must never be committed.
8. **Working copies:** don't clean or overwrite worktrees. Preserve the main checkout's uncommitted `package.json`, `package-lock.json` and `docs/content/`.
9. **Honesty:** don't claim a check passed without evidence. Staging results never prove production readiness.
