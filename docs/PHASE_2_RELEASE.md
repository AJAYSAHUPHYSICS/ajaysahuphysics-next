# Phase 2 release: student platform

Technical release notes for the Phase 2 student platform. Legal and privacy review material is kept privately. **Cloud sync of study data stays OFF**, in code (`CLOUD_SYNC_ENABLED = false`) and in the database (`app_config` switches `'false'`), until its release gates pass (tracker T-23) and the owner's launch conditions are met (decision L). **Formal legal review is scheduled after launch** (owner decision I, 2026-11-23): an accepted legal and privacy risk. The privacy notice stays labelled "Draft notice, pending legal review", and no legal approval or compliance is claimed.

**Release status (2026-11-25; age policy updated 2026-11-26):**
- **Deployed** (verified 2026-11-25 09:12 UTC): `main` = production = `b9527e2`.
  - That's #29, the tracker correction, merged 2026-11-25 09:04 UTC. Deploy run `45581909462`: success, with both its `build` and `deploy` jobs.
  - Before it: `b3f7168` (#26, the documentation reconciliation; run `45570635616`); `b18b62e` (#27, the staging guard allow-list; run `45378204301`).
  - The Phase 2 PRs through #27, plus #26 and #29, are merged and deployed; #25 isn't. The account code is live but **dormant**:
  - login is hidden (H1);
  - account deletion shows as not set up, with the Contact-page fallback;
  - cloud sync is off;
  - `/privacy` is a labelled draft.
- **Supabase projects** (details in [`PHASE_2_TRACKER.md`](PHASE_2_TRACKER.md), Live status):
  - **the Phase 2 database goes to a new production project,** `fuznyurpfqgjricivopd`, as a fresh start (owner decision, 2026-11-24): no old Auth account or data is copied;
  - **the current project,** `dykhwagloqxawgfkmjmc` (the one the live site's build uses), has a legacy schema with no application rows, and existing Auth accounts. It's only read until its approved retirement;
  - **both owner-run read-only inventories were done on 2026-11-24.** Neither project has any of the Phase 2 migrations (seven since 2026-11-26);
  - **staging** has the first five.
- **Open as of 2026-11-25 09:12 UTC:**
  - #25: cloud sync needs a verified email (the sixth migration), plus the M1 sync fix;
  - #28: the master audit, which also carries this status update.
- **Open as of 2026-11-26:** #25 at `7847cda` (now also migration 7: no age rules, decision P), #30 at `fe2a2d8` (the profile and consent forms, with no age question and no terms consent) and #28. CI is green on #25 and #30.

  **Merged on 2026-11-25:**
  - #26 reconciled the tracker, this document and `README.md` (`b3f7168`);
  - #29 corrected their status lines (`b9527e2`).
- **Blocked or awaiting the owner,** in procedure order:
  - the staging rehearsal of migrations 6 and 7 (ownership check, then the approved apply);
  - the new project's Auth settings with "Confirm email" on (before #25 merges);
  - merging #25;
  - the `delete-account` function and its secret;
  - each of the seven migrations, approved separately;
  - the cutover of the site to the new project;
  - the deletion sweep;
  - the 7 email checks;
  - activation.

  **No age limit (owner decision P, 2026-11-26):** there's no separate under-18 block. Migration 7 (#25, open) removes the age rules and the parental-consent requirement from the database (it deletes no consent records; new parental consents are refused), and #30 (open) removes the age question. *Superseded:* until then, under-18 sync was blocked separately until a verified parental-consent process existed (decision O).
- **Decided:** F13. `/privacy` is published as a labelled draft, `noindex`, outside the sitemap.
- **Not done yet:** the production stages of the deletion verification. **No production verification, production readiness or legal approval is claimed here.**

**Safeguard status (2026-11-22):**
- `CLOUD_SYNC_ENABLED` is `false` in code.
- On staging, `adult_sync_permitted`, `minor_sync_permitted` and the deletion gate `account_deletion_enabled` are all `'false'` (checked at the start and end of every staging run).
  - `minor_sync_permitted` has never been enabled.
  - `adult_sync_permitted` was set to `'true'` on staging only once: temporarily, during the 2026-11-21 `npm run test:staging` run, which restored it. That suite is no longer used.
  - The deletion gate is opened on staging only by `test:staging:deletion-gate`, for its own run, and it always closes it again.
- Neither production project has any of the seven migrations applied, and no production Supabase or Auth setting has been changed. Staging has the first five; the sixth and seventh (#25) aren't applied anywhere.

Each finding is tracked in [`PHASE_2_TRACKER.md`](PHASE_2_TRACKER.md).

## 1. Pull requests and merge order
**Status (2026-11-23):**
- **Merged (squash) and deployed** at `2734e98`: #9, #11, #6, #8 and #13. **#12 is closed**, superseded by #13.
- **Merged (squash) and deployed since, each after fresh CI on an up-to-date head:**

  | PR | Scope | Squash commit | Live check |
  |---|---|---|---|
  | #16 | H1: hide login and sign-up | `357b061` | No login control on desktop or the mobile menu; Log out works with a simulated session |
  | #14 | JEE picker accessibility | `21d0d11` | `/jee/` passes the accessibility audit |
  | #17 | M1: hydration-safe dates | `5bc0cd8` | No React #418 with the clock moved +1 and +3 days |
  | #18 | No duplicate chapter-visit entries; E2E for checklists, streaks and goals | `367d430` | All seven tools exercised on the live site, 14/14 |
- **The release stack, collapsed:**
  - #15 was squash-merged into #10's branch (`c76349d`), then #10 into #7's branch (`fd71d32`);
  - `main` was then merged into #7's branch (`9c1b51f`). The only conflict was `AuthButton.tsx`, kept as the stack's version, which carries the H1 switch;
  - CI passes on `9c1b51f`, and #7 is 0 commits behind `main`;
  - **#7 was squash-merged as `9019a1c` on 2026-11-23**, after the owner's F13 decision, at the approved head `dc6e1f1`, and deployed (deployment `7988286758`).

The table below is the original plan, kept for the record. **Its "Before merging" column is historical.** #7 merged with login hidden (H1), so its F3 prerequisite now applies to turning the accounts UI on instead.

| Order | PR | Scope | Before merging |
|---|---|---|---|
| 1 | #9 | Next.js 16.2.9 → 16.4.6 (clears all Next.js advisories) | Update branch, green CI (F2) |
| 2 | #6 | Strict hash-based Content Security Policy on every page; safe JSON-LD; optional CAPTCHA origin; build-time analytics switch (default on) | Update branch, green CI; production-configured build test (F9); check live login straight after deploy |
| 3 | #8 | Study pages (bookmarks, mistakes, revision, activity); navbar overflow fix; accessibility fixes; E2E and keyboard checks, also in CI | Update branch, green CI. **Merge commit only** (F1) |
| 4 | #12 (on #8) | Five-card dashboard overview; secondary cards on the study pages and the new `/dashboard/progress/` | **Retarget to `main` first** (F1), then green CI |
| 5 | #11 | Chapter pages scrolled sideways on phones; dashboard hydration error; duplicate-question validation | Update branch, green CI |
| 6 | #7 | Accounts (PKCE login, generic errors, optional CAPTCHA, account page, export, deletion); database schema with RLS; sync engine (off); lazy Supabase client | Production Auth redirect URLs and password length set (F3); production-configured build test (F9); decision on publishing the draft privacy notice (F13). **Merge commit only** (F1) |
| 7 | #10 (on #7) | Staging tooling and verification suites; deletion-function key and CORS handling; rollback script; this document and the tracker | **Retarget to `main` first** (F1), then green CI |

Each merge into `main` deploys the site. #7, #10 and #15 belong together: #10 holds the deletion-function fixes, and #15 holds the deletion gate and the login safeguard.

**Current merge mechanics (2026-11-22):** squash merges are in use, which replaces the original "merge commit only" rule below. The integration plan:
1. **#14, #16 and #17** each merge onto `main` on their own: update the branch, wait for green CI, then merge. **#16 must be on `main` before the release stack is merged.** Its keyboard check expects no login control; `main`'s current check expects one, and would fail against the stack's hidden login.
2. **The release stack, recommended: collapse it.** Merge #15 into `phase-2b-staging-verification`, then #10 into `phase-2b-accounts-platform`. Neither merge deploys anything. Then update #7 with `main`, wait for green CI, and squash-merge #7 **once**: one production deploy, and no rebasing.
   - **Expected conflict:** only `src/components/AuthButton.tsx`, because #16 and the stack both change it. Keep the **stack's** version: it has #7's session handling **and** the H1 switch. The H1 guard test fails if any opener of the login dialog bypasses the switch.
   - **Simulated locally on 2026-11-22:** `main` + #14 + #16 + #17 (squashed) + the stack. Only that conflict arose. Results: lint and `tsc` clean; unit 617 passed, 1 skipped; build-output 11 passed, 2 skipped; E2E 74/74; keyboard 22/22.
3. **Alternative:** squash #7, then replay only #10's own commits (`git rebase --onto <new main> origin/phase-2b-accounts-platform`) and push it with a force push (it's a feature branch, so this needs the owner's approval), wait for CI, merge; then do the same for #15 onto #10. That means three deploys, and in between, #7's version of the account page is live without #15's safeguards. That's harmless only while production has no account tables.
   - **Don't use GitHub's "Update branch" on #10 or #15** after #7 is squashed: it brings #7's original commits back. A local simulation of this path gave the same final content as the collapsed path.

**Original merge mechanics (F1, F2), kept for the record:**
- **Stacked PRs don't follow their base automatically.** #12 targets `phase-2b-study-tools` and #10 targets `phase-2b-accounts-platform`. The repository doesn't delete branches on merge, so neither PR is retargeted when its base merges. Merged as-is, each lands in its feature branch: nothing deploys and nothing warns. After #8 merges, run `gh pr edit 12 --base main`; after #7 merges, run `gh pr edit 10 --base main`. Then wait for CI on the retargeted PR.
- **Use a merge commit, not squash or rebase, for #8 and #7.** #12 and #10 contain their base PR's original commits, so squashing the base would leave them with conflicts or duplicated history. The `main` ruleset allows all three methods, so this is a manual rule.
- **Update each branch before merging.** The required `ci` check doesn't require branches to be up to date, and every PR's CI ran against the old `main` (`9c0d09e`). The full combined release was tested only locally, so no intermediate `main` state has been built in CI. Click "Update branch" and wait for green CI on the updated head before every merge.

## 2. Architecture
- **Static export.** Next.js `output: "export"` on GitHub Pages; there is no server code in the site.
- **Local-first.** Study progress lives in the browser in 11 `atlas:*` localStorage stores. Their formats are frozen and tested (`student-data-compat.test.ts`).
- **Optional accounts** with Supabase Auth (PKCE email links). The Supabase client (~60 KB gzipped) loads only when needed: a saved session, the login dialog, or the account and auth pages (`src/lib/supabase-loader.ts`).
- **Accounts in production.** Before #7, `main` shipped a live "Login / Sign Up" button with the implicit flow. Production builds have Supabase configured through repository secrets, so accounts were created in the current production project's Auth (the owner's read-only inventory of 2026-11-24 recorded them; no user data was read). Under the fresh start they aren't migrated to the new project. Since `9019a1c`, production runs #7's PKCE flow, with email links to `/auth/callback/` and `/auth/reset-password/`, and the UI is hidden (H1). Those redirect URLs must be on production's allow-list before the UI is turned on (F3).
- **Login hidden until the release (H1, owner decision 2026-11-22).** `ACCOUNTS_UI_ENABLED = false` (`src/lib/auth/accounts-ui.ts`, added in #16, kept by #7).
  - Signed-out visitors see no login or sign-up control, on desktop or mobile.
  - A signed-in visitor keeps "Log out" (and "Account" in the stack).
  - **Limitation:** this hides the UI only. Supabase Auth still accepts sign-ups through its API with the public key. Turning that off ("Allow new users to sign up" in the Supabase dashboard) is an owner decision and hasn't been made.
  - Turning the switch on is a release step that needs the owner's approval.
- **Cloud copies (off)** use a three-way-merge sync engine (`src/lib/sync/`):
  - only 6 stores are syncable;
  - the activity log, searches, reading position and recently viewed pages never leave the device.
- **Server-side work** runs in one Supabase Edge Function, `delete-account`.

## 3. Database (`supabase/migrations/`)
| Migration | Contents |
|---|---|
| `20261120000000_student_accounts.sql` | See below |
| `20261121000000_service_role_grants.sql` | Least privilege for the server role: SELECT on Atlas tables, UPDATE of the `app_config` value, INSERT into `consents` |
| `20261122000000_account_deletion_gate.sql` (#15) | The deletion gate: `app_config` `account_deletion_enabled`, created `'false'`; `account_deletion_enabled()` is true only for exactly `'true'` (a missing row or any other value is off); `request_account_deletion()` refuses with `deletion-disabled` while it's off |
| `20261122010000_deletion_rate_limit.sql` (#15) | Per-user rate limits: `deletion_rate` table (RLS on, no client access) and `deletion_rate_wait()` (server role only); `request_account_deletion()` allows 5 calls per hour |

**Deployment order:** seven migrations, in filename order:
- the four above;
- then `20261123000000_deletion_log_sequence_privilege.sql` (T-14);
- then `20261124000000_require_verified_email_for_sync.sql` (verified email, arriving with #25);
- then `20261126000000_remove_age_restrictions.sql` (no age rules, decision P, also arriving with #25).

They run **after the `delete-account` function is deployed**, with **each one approved separately** and applied consecutively in one maintenance window (section 9, C.2). **Never leave the first two applied without the next two.** That would create the account tables without the deletion gate, while public sign-ups are on (decision B).

`20261120000000_student_accounts.sql` creates:
- **Tables:**
  - `app_config` (launch switches);
  - `profiles` (an optional self-declared age band; no longer asked for or used since decision P, 2026-11-26);
  - `consents` (append-only);
  - `bookmarks`, `checklist_items`, `revision_rounds`, `mistakes`, `goals`, `streaks`;
  - `deletion_requests`, `deletion_log` (SHA-256 of the user id, no other personal data).
- **RLS on every table:** students read and write only their own rows. Logged-out visitors get no access.
- **Consent gate:** `sync_allowed()` is re-checked on every write, so the launch switches, consent withdrawal, a new notice version and a pending deletion all take effect immediately.
- **Under-18s** also needed the minors switch and server-verified parental consent. **Migration 7 removes this** (decision P): no age rule remains, and new parental consents are refused from every role.
- **Column-level grants on `profiles`.**
- **Row limits** that allow upserts of existing rows.
- **Export and two-step deletion functions.**

**Security review before staging:** all findings H-1, M-1 to M-3, L-2, L-3, L-5 and L-12 are fixed and covered by tests. M-4 (broad revokes) is safe on a fresh project, but **check production's existing `public` objects before applying there.** The migration revokes privileges across the whole `public` schema (`supabase/migrations/20261120000000_student_accounts.sql:400-402`), and production's contents are unknown (F10).

## 4. Environment variables (names only; values never committed)
| Where | Variable | Notes |
|---|---|---|
| Site build (public) | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable key only. Production values live in GitHub secrets used by `deploy.yml` (both are set, so production builds have auth on) |
| Site build (optional) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Enables CAPTCHA and its CSP origin. **Not passed by `deploy.yml` yet** (F7) |
| Site build (optional) | `NEXT_PUBLIC_ANALYTICS=off` | Removes GA4 and its CSP origins; default on. **Not passed by `deploy.yml` yet**, so production analytics is always on (F7) |
| Local staging tests | `.env.staging.local` (`STAGING_SUPABASE_URL`, `STAGING_CONFIRM_REF`, `STAGING_SUPABASE_PUBLISHABLE_KEY`, `STAGING_SUPABASE_SECRET_KEY`, optional `STAGING_SWEEP_SECRET`, `STAGING_TURNSTILE_TEST_TOKEN`) | Git-ignored; never loaded by Next.js; checked by `npm run staging:check` |
| Local browser checks | `.env.development.local` | Staging URL + publishable key, for `npm run dev` only |
| Edge Function secrets | `ATLAS_DELETION_SWEEP_SECRET`, `ATLAS_ALLOWED_ORIGINS` (staging only) | Set with `supabase secrets set`. The server key comes from Supabase (`SUPABASE_SECRET_KEYS`) |

## 5. Staging
Project `ajaysahuphysics-staging`. Setup and the verification record are in [`supabase/README.md`](../supabase/README.md). The first five migrations (T-14 applied on 2026-11-23) and the function (version 3, `verify_jwt` off from `config.toml`) are applied and deployed there. The sixth, `20261124000000`, isn't applied. Evidence:
| Date | Check | Result |
|---|---|---|
| 2026-11-21 | Catalog check; `db advisors` | No errors |
| 2026-11-21 | `npm run test:staging` (before the gate existed) | 23/23 |
| 2026-11-21 | F9: production-configured static build under CSP, browser journey | 15/15, 0 CSP violations |
| 2026-11-21 | RLS probe | 25/25 |
| 2026-11-22 | `npm run test:staging:deletion-gate` (opens only the deletion gate, for the run) | 38/38 |
| 2026-11-22 | Account page, production-configured build | 8/8 with the gate off; 15/15 with it open |
| 2026-11-22 | `db advisors --type security` | 0 errors |
| 2026-11-22 | **`npm run test:staging:release`**, the safe replacement (below) | **63/63** |

**`npm run test:staging` is no longer used for the release** (owner decision, 2026-11-22). It switches staging's `adult_sync_permitted` on for its run, and cloud sync must never be enabled. Its deletion section also predates the gate.

**Its replacement, `npm run test:staging:release`** (`scripts/staging/release-check.staging.mjs`):
- **How it stays safe:**
  - The check makes one deliberate authenticated student-side UPDATE attempt against `app_config`. The server must deny it. No successful `app_config` modification occurs, and the script's server key never writes to `app_config`.
  - it stops unless both sync switches and the deletion gate are `'false'`;
  - it stores no study data;
  - it uses synthetic accounts, all removed.
- **What it verifies:**
  - anonymous denial (12 tables, 5 functions);
  - sign-in, generic errors, session refresh, and sign-out revoking the refresh token;
  - profile and consent rules;
  - the sync safeguards with every precondition met (adult with full consent: `sync_allowed()` false and `enable_sync()` "not-available-yet"; under-18: "not-available-for-under-18" (that's the check as run on migrations 1–5; #25's version expects migration 7, and the same "not-available-yet" for every student); uploads refused on all 6 study tables; a student can't set `sync_enabled`);
  - the denied student-side UPDATE attempt against `app_config` (above): a signed-in student tries to set `adult_sync_permitted` to `'true'`. The check passes only if the server denies it and the value stays `'false'`. A unit test (`staging-release-check.test.ts`) enforces on the script's source that this is the only `app_config` UPDATE, and that the server key makes none;
  - A-versus-B isolation;
  - export;
  - deletion refusal with the gate off.
- **Not verified, on purpose** (needs sync on, an inbox, or the gate open):
  - two-device sync, merging, tombstones, interrupted uploads, account switching and large syncs;
  - confirmation and reset emails;
  - CAPTCHA;
  - deletion end to end (that's `test:staging:deletion-gate`);
  - browser login (the F9 evidence).

## 6. Security controls
- **Verified email for cloud sync** (migration `20261124000000`, #25; owner decisions, 2026-11-23):
  - an unverified account can neither read nor write cloud-sync records (the six study tables), enforced by RLS whatever the client does;
  - export and account deletion remain available to it;
  - profiles and consents keep ownership-only policies.
  - **Accepted limitation:** existing Supabase Auth accounts are trusted as they stand (decision M). While "Confirm email" is off, Supabase marks new users confirmed at sign-up without checking the address. So **production "Confirm email" must be on before #25 is merged and before the production migrations** (section 9, A).
  - **No age rule** (migration 7, #25; owner decision P, 2026-11-26): under-18 students have the same cloud-copy eligibility as everyone, and parental consent is neither required nor recorded. *Superseded:* under-18 cloud sync was separately blocked (decision O).
- **Content Security Policy** on every page; no `unsafe-inline` or `unsafe-eval` for scripts; verified in a browser with an injection control.
- **RLS, the consent gate and least-privilege grants**, as in section 3.
- **Authentication:**
  - generic error messages (no account enumeration);
  - PKCE; redirect allow-list in code;
  - password policy for new passwords: ≥ 10 characters, ≤ 72 bytes. This is enforced in the browser only, until Supabase's own minimum is set (F3);
  - optional CAPTCHA.
- **The deletion function** runs with `verify_jwt` off, pinned in `supabase/config.toml` (#15; never run `supabase config push`). It authorises every request itself:
  - the user's token is checked with the Auth server;
  - **the deletion gate** comes next: off is 403, unreadable is 503 (#15);
  - **the rate limit:** 6 calls per 10 minutes per verified user, then 429 with `Retry-After`; a limiter error is 503 (#15);
  - a deletion request must already be recorded;
  - database errors are reported (500 or 503), never read as "nothing to do" (#15);
  - the sweep secret is compared in constant time, and the sweep is refused when the secret is unset. The sweep isn't rate limited.
  - CORS allows `https://ajaysahuphysics.com`, which is the canonical host (`www` redirects to it), plus validated staging origins. Reviewed in F6.
- **Secrets:** none in the repository, its history or the build output. The service key never reaches browser code; `staging:check` refuses any secret in an env file Next.js loads.
- **Hosting gaps (F8):** the live site sends only `Strict-Transport-Security`. There is no `frame-ancestors` or `X-Frame-Options`, so pages can be framed (clickjacking), and no `X-Content-Type-Options`. A meta-tag CSP can't supply these. Interim mitigations are listed in F8.

## 7. Account export and deletion
- **Device export:** "Download this device's data" on `/account/` (all `atlas:*` stores).
- **Account export:** `export_my_data()` returns only the caller's rows, as documented JSON. It works with sync off.
- **Deletion:**
  1. `request_account_deletion()` records the request and stops uploads at once.
  2. The `delete-account` function runs `purge_user_data()` (all rows, plus a log entry holding only the hash) and deletes the login user.
  3. It's retry-safe; a scheduled sweep (`?sweep=1` with the sweep secret) completes pending requests.
     - **Scheduler (#15):** `.github/workflows/deletion-sweep.yml` runs hourly. It is **inert** until the repository variable `ATLAS_DELETION_SWEEP_ENABLED` is `'true'`, and it also needs `vars.ATLAS_SWEEP_URL` and `secrets.ATLAS_DELETION_SWEEP_SECRET`, none of which is set yet.
     - **The alert is a failed run** (GitHub emails the owner). A run fails on:
       - pending requests, or stale ones (older than 72 hours);
       - requests outstanding while the gate is off;
       - any error.

       Each message says what to do next and is added to the job summary.
- **Rate limits (#15):** per verified user, `request_account_deletion()` allows 5 calls per hour and the function 6 calls per 10 minutes. A per-user lock makes them exact under parallel calls (verified on staging). The sweep and the operator procedure (`purge_user_data()` plus deleting the auth user) are never limited, so support-assisted deletion always works.
- **Deletion gate (F5): implemented in #15, server-side.** Migration `20261122000000` creates it off. `request_account_deletion()`, the function's user path and the sweep all refuse while it's off, and nothing is recorded. Verified by PGlite tests and on staging (38/38). Account deletion **must stay disabled in production (gate off)** until the staged verification in section 9, C.3 is complete and the owner explicitly approves opening the gate. The rules it meets:
  - **Enforced server-side.** Disabling the button isn't enough. While the gate is off, `request_account_deletion()` and the `delete-account` function must both reject requests, so a direct call that bypasses the page is refused.
  - **No exemptions.** The gate applies to every account and every deletion-related request: starting a deletion, the function's user path, and the scheduled sweep. There is no test-account exemption and no bypass.
  - **Off by default, failing closed.** If its configuration is missing or can't be read, both treat the gate as off and reject the request.
  - **Proven by tests.** They show that direct requests are rejected while the gate is off, both to `request_account_deletion()` and to the function.
- **Device progress** stays in the browser unless the student removes it.
- **Without the production database objects** (verified in code, F4): the account page calls `sync_allowed()` and treats any error as "not set up". Account export is then hidden, deletion is disabled with a pointer to the Contact page, and cloud copies show as not available. Device export and removal still work.
- **Before that check finishes (F4, fixed in #15):** the delete button and the request need `cloudReady === true` **and** the gate open (`src/lib/account/deletion-availability.ts`). A value that isn't known yet (`null`) counts as disabled. Tested; on staging the button stayed disabled with DELETE typed while the gate was off.

## 8. Quality gates
| Gate | Command | In CI |
|---|---|---|
| TypeScript, ESLint | `npx tsc --noEmit`, `npm run lint` | Yes |
| Unit, integration, database and RLS tests (PGlite) | `npm test` | Yes |
| Static build plus CSP injection | `npm run build` | Yes, with Supabase **not** configured (F9) |
| URLs, sitemap, canonicals, internal links | `node scripts/verify-build.mjs` | Yes |
| Post-build checks (legacy content, CSP) | `npm run test:build-output` | Yes |
| Browser E2E, accessibility audit, phone overflow, keyboard | `npm run test:e2e` | Yes (since #8), with auth off. With #16 it checks that no login control is visible or reachable; with #17, hydration with the clock 3 days past the build |
| Safe staging release check (never enables sync) | `npm run test:staging:release` | No: manual, staging only. 63/63 on 2026-11-22 |
| Deletion gate and rate limits on staging (opens only the deletion gate) | `npm run test:staging:deletion-gate` | No: manual, staging only. 38/38 on 2026-11-22 |
| Staging browser journey | `npm run test:staging:browser` | No: manual. It logs in through the login button, so with H1 it needs a build with `ACCOUNTS_UI_ENABLED = true` (release candidate only) |
| Old staging suite | `npm run test:staging` | **Not used for the release:** it enables sync (owner decision 2026-11-22) |
| Production-configured build in a browser (auth on, CSP with the exact Supabase origin) | Build with staging settings, serve `out/`, run the login and account journey | No: manual. **Done on staging** (F9), 15/15 on 2026-11-21 and 2026-11-22 |
| Migration dry run | `npx supabase@2.122.1 db push --linked --dry-run` | No: manual |

The required `ci` check doesn't require branches to be up to date with `main` (F2), so update each branch before merging.

## 9. Production release runbook (each step needs the owner's explicit approval)
**Authoritative order** (the same as the tracker's "Current release procedure", 2026-11-25). Each production step has its own approval; approving one never approves the next. A, C and D below give the details.

**The target is the new production project `fuznyurpfqgjricivopd`** (fresh start, owner decision 2026-11-24). Wherever the details below say "the production project", read the new project, and confirm its ref in the dashboard address bar before every step. The current project `dykhwagloqxawgfkmjmc` is only read until its approved retirement.
1. **Staging rehearsal of migration 6:**
   - the read-only ownership check (tracker T-28);
   - staging "Confirm email" read back;
   - the approved staging apply, with a `test:staging:verified-email` check that never enables sync (T-29).
2. **A:** the new project's Auth settings with **"Confirm email" on**, read back afterwards. This comes **before merging #25** and before any migration.
3. **Merge #25,** so the sixth migration and the M1 sync fix are on `main`.
4. **C.1a:** re-run the new project's read-only inventory and preflight just before the first migration. Expect an empty project apart from the platform function `rls_auto_enable()`, and an empty migration history.
5. **C.2.1:** deploy the `delete-account` function and set its secret, **before the migrations**.
6. **C.2.4:** the **seven migrations, each separately approved**, applied consecutively in one window, then the post-migration verification.
7. **Cutover:**
   - record the two GitHub secrets' current values privately;
   - point `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` at the new project;
   - redeploy and check the live site.

   Rollback is restoring the two values and redeploying.
8. **C.2.5 and C.3:** the sweep scheduler, then the staged deletion verification.
9. **The privacy notice and consent screens,** then the 7 email checks.
10. **D:** activation. The accounts UI, then cloud sync for every student (no age limit, decision P). *Superseded 2026-11-26:* under-18 sync was to stay independently blocked until a verified parental-consent process existed.
11. **Retirement** of the current project, only with its own approval after an observation period. The C.1b backup becomes an optional safeguard at that point.

**Not gates:**
- **Legal sign-off:** formal review is after launch (decision I), and the notice stays a labelled draft.
- **The restore rehearsal (C.1c):** after launch (decision E), under its own approval.

**A. Production Auth settings (F3)**
1. In production Supabase Auth (settings only, no data access):
   - add `https://ajaysahuphysics.com/auth/callback/` and `https://ajaysahuphysics.com/auth/reset-password/` to the redirect URLs;
   - check the Site URL;
   - set the minimum password length to 10;
   - note whether email confirmation is on.

   *(Historical: this was planned for before #7.)* Without the redirect URLs, Supabase falls back to the Site URL. Email-link codes then land on a page that doesn't complete sign-in, and password reset can't be finished at all (F3).

   **Status (2026-11-23):** #7 is merged with login hidden (H1), so no email flow can start from the site. The settings above are **still required**, and **"Confirm email" must be on before #25 is merged and before any production migration**. While it's off, Supabase confirms new users automatically, so "verified" wouldn't prove the address. None of the settings has been read or changed.

   **F3 readiness checklist** (Supabase dashboard of the production project, settings only; each change needs the owner's approval):

   | Setting | Recommended | Why |
   |---|---|---|
   | Redirect URLs | `https://ajaysahuphysics.com/auth/callback/` and `https://ajaysahuphysics.com/auth/reset-password/` only (plus nothing for localhost in production) | PKCE email links must land on these pages (#7) |
   | Site URL | `https://ajaysahuphysics.com` | The fallback for any link without an allowed redirect |
   | Minimum password length | 10 (matches `auth-policy.ts`) | Today only the browser enforces 10 |
   | Email confirmation ("Confirm email") | **On, before #25 merges** | Proves the address before an account is usable. #25's cloud-sync check relies on it |
   | "Allow new users to sign up" | **On** (owner decision B, 2026-11-23) | See the exposure below |
   | Rate limits (Auth → Rate limits) | Keep the defaults or lower them for sign-up and password reset | Abuse of the email endpoints |
   | CAPTCHA | Optional: Turnstile, with the site key in the build **first** (F7) | Bot sign-ups. The other order blocks every login |
   | Email sender | A custom SMTP sender on the site's domain before launch | Supabase's default sender is for testing and is heavily rate limited |
   | Sessions | Keep refresh-token rotation and reuse detection on (defaults) | Stolen refresh tokens stop working |

   **The API sign-up exposure (H1 limitation):** hiding the website's controls doesn't disable sign-up. Every page ships the public Supabase URL and key, as it must for login, so anyone can call `POST /auth/v1/signup` directly and create a production account, outside the site's notice and consent flow. The mitigation options, for the owner:
   **Owner decision B (2026-11-23): keep public sign-ups enabled.** Option 1 below wasn't taken; "Confirm email" and CAPTCHA (option 2) are the mitigations.
   1. **Turn off "Allow new users to sign up"** until the accounts UI is approved. This closes the API path completely. Existing accounts can still sign in through the API, but the site offers no login while H1 is in force. Turn it back on in the same release that turns the accounts UI on. *(Recommended.)*
   2. Keep sign-ups on, but require email confirmation and CAPTCHA. That reduces abuse, but doesn't stop deliberate sign-ups.
   3. Accept the risk and record it with counsel (legal checklist L-17).
2. Optional, in a reviewed PR: pass `NEXT_PUBLIC_ANALYTICS` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the build step in `deploy.yml`, from repository variables (F7).
3. Run the production-configured build test from section 8 against staging (F9). **Done on staging**, 15/15.

**B. Site merges** *(historical: done 2026-11-23)*, one at a time, in the order of section 1's current merge mechanics: #14, #16 and #17 first, then the release stack. After each deploy, check the live site: routes, console errors and a phone.
- **While H1 is in force** (the release stack is merged, but `ACCOUNTS_UI_ENABLED` is still `false`), check that no login or sign-up control appears, and that a signed-in session can still log out.
- **Turning the accounts UI on** is a separate, owner-approved release PR. After it deploys, test login, sign-up and password reset with a test inbox, and record the 7 manual email checks (`supabase/README.md`), which are **NOT VERIFIED**.

**C. Production database.** Legal sign-off isn't a prerequisite: owner decision I (2026-11-23) moved formal legal review to after launch. That's an accepted risk, and the notice stays a labelled draft.
1. **Before any production database change:**
   - the four production-database approvals below. **Each is separate: approving one never approves the next.**

   **Status (2026-11-25):**
   - **C.1a:** done for both projects on 2026-11-24 by the owner, in each dashboard's SQL editor, read-only, with private inventory scripts. The comparison found 0 blockers and 0 conflicts for a fresh start. Re-run it on the new project just before the first migration.
   - **C.1b:** not needed for the migration, because nothing is copied. A backup of the current project is an optional safeguard before its retirement.
   - **C.1c:** after launch (decision E).
   - **C.1d:** needs each migration's own approval.

   The text below is the 2026-11-23 procedure, kept for its details.

   **C.1a. Approval 1: the read-only inventory (F10).** It reads system catalogs and two counts. It reads no table rows, emails or other personal data, and it changes nothing.
   1. In the Supabase dashboard, open the **production** project. Check its name and the project ref in Project Settings → General against the production site's Supabase URL. Don't continue if it's the staging project.
   2. Open SQL Editor → New query. Paste `set transaction read only;` as the **first line**, then the whole of `supabase/inventory/schema_inventory.sql`, then run it.
      - The editor shows only the last statement's result, so don't wrap the query in `begin … rollback`: the `rollback` would hide the output.
      - **Checked on staging on 2026-11-23** through the same SQL API: with that first line, `transaction_read_only` is `on`, a write is refused (`25006: cannot execute CREATE TABLE in a read-only transaction`), and the inventory still returns in full.
   3. Expect one row, `inventory`. Copy the JSON and store it privately. It names objects but contains no data.
   4. Hand it to engineering for the go / no-go below. Nothing else happens under this approval.

   **Go / no-go:**
     - `atlas_conflicts` must be empty (tables, functions **and** the 8 index names): the migrations use `CREATE`, not `CREATE IF NOT EXISTS`, so any listed object would make them fail. An index name collides with a relation of any kind in `public`;
     - review every object in `other_public`. These are selected by kind, never by name, so an object called `…_seq` or `…_pkey` is still listed. The first migration removes client privileges from the whole `public` schema (M-4), so any app relying on those objects would break;
     - review `sequences` and the `kind: "S"` rows of `client_grants`: the first migration's `grant usage on all sequences … to authenticated` also gives `authenticated` usage on **every** existing sequence, including unrelated ones;
     - review `default_acls`: default privileges decide what future objects in `public` grant to clients;
     - record `migration_history` and `auth_user_count` (a number only).

     Validated on staging on 2026-11-23 (read-only; `client_grants` now read from `pg_class.relacl`):
     - 12 of 12 tables, 14 of 14 functions and 8 of 8 index names reported, as expected there;
     - `other_public` is empty; RLS is on for every public table; 23 policies;
     - 35 client grants: 33 on tables, plus `authenticated:USAGE` on the 2 identity sequences.

     **Finding (low):** `authenticated` has `USAGE` on `deletion_log_id_seq`, although `deletion_log` is service-only. It exposes no data, because there is no table privilege, but it isn't least-privilege. It comes from the blanket sequence grant. The fix is #22 (migration `20261123000000`): merged as `561cb22` and applied to staging on 2026-11-23 (decision F). In production it goes in with the other five (T-13).
   **C.1b. Approval 2: the backup.** Unlike the inventory, a backup **reads every row, including personal data** (emails and sign-in records in `auth.users`), and produces sensitive files.
   1. Take a logical dump from a **separate, clean checkout**. Never link the main checkout to production: a later `db push` there would reach production. Use `npx supabase@2.122.1 db dump --db-url "<production connection string>" -f schema.sql` (schema only, the default), then the same command with `--data-only -f data.sql`. Both must include the `auth` schema's users.
      - The connection string contains the database password. The owner supplies it at run time. It's never written to a file in the repository or pasted into a shared channel.
   2. Store both files privately and **encrypted**. Record their size and SHA-256 privately.
   3. Daily dashboard backups exist only on paid plans, and a plan's own backup isn't a tested restore either.

   **C.1c. Approval 3: the restore rehearsal. After launch** (owner decision E, under its own approval). Until then, the backup is integrity-checked without a restore (C.1b). A backup counts **as proven** only once a restore has succeeded.
   1. Create a new, isolated, throwaway project. **Never restore into staging or production.**
      - Supabase's Free plan allows two active free projects, and production and staging use both. The rehearsal needs a paid plan or a temporarily paused project: an owner decision.
   2. Restore `schema.sql`, then `data.sql`.
   3. Run the C.1a inventory on the restored copy and compare it with production's:
      - the same tables, functions, policies and grants;
      - the same `auth_user_count`;
      - row estimates within normal drift.
   4. Record privately the date, who ran it, the method, the file hashes and the comparison.
   5. Delete the throwaway project, and the local decrypted copies.

   **C.1d. Approval 4: the production migrations.** These are C.2 below, **each migration under its own approval**. Prerequisites:
   - a C.1a go;
   - a verified C.1b backup;
   - "Confirm email" on (A);
   - #25 merged;
   - the function deployed (C.2.1).
2. **Production Supabase**, after verifying the project ref:
   1. Deploy `delete-account` with `--use-api` (`verify_jwt` off comes from `supabase/config.toml`; `--no-verify-jwt` is harmless to add) and set `ATLAS_DELETION_SWEEP_SECRET` (no `ATLAS_ALLOWED_ORIGINS`) **before** the migrations. Without the tables, the function can't read the gate, so it refuses requests (503) and changes nothing.
   2. Confirm the production server key (new or legacy) is available to the function.
   3. **Check that the release stack (#7, #10, #15) is merged and deployed**, so the site has the F4 fix and follows the gate. The gate itself is part of the migrations.
   4. **The seven migrations, each separately approved, one at a time:**
      - `20261120000000`, `20261121000000`, `20261122000000`, `20261122010000`, `20261123000000` (T-14), `20261124000000` (verified email), `20261126000000` (no age rules, decision P).
      - **Why one at a time needs care:** `db push` applies every pending migration at once. So for approval *k*, run from an isolated directory linked to the verified production ref whose `supabase/migrations/` holds **only migrations 1 to *k***, byte-identical to `main`.
      - `db push --dry-run` must list **exactly migration *k***. Then `db push --linked`, and verify before the next approval.
      - Run all seven in one maintenance window. Never leave the first two applied without the next two.
   5. Configure the sweep scheduler: set `vars.ATLAS_SWEEP_URL`, `secrets.ATLAS_DELETION_SWEEP_SECRET` (the same value as the function's), then `vars.ATLAS_DELETION_SWEEP_ENABLED = 'true'`. With the gate off and no requests, runs pass quietly. Check that the failure email reaches the owner by running it once with a deliberately wrong secret, which must fail.
   6. Verify, leaving the switches `'false'` and the deletion gate off.
   7. **Follow C.3 to verify deletion and, only with the owner's approval, open the gate.**
3. **Deletion verification and opening the gate (F5).** The **production** gate stays off throughout stages 1 to 3; only the staging gate is opened, in stage 1. No account is exempt at any stage.
   1. **Staging, gate open: full end-to-end deletion test.** Use synthetic accounts only. Test the complete workflow:
      - request initiation, both from the account page and by direct call;
      - function execution: rows purged, a `deletion_log` entry written, the login user deleted;
      - the scheduled sweep, run by the real scheduler, completing pending requests;
      - failure handling: a failed function call leaves the request pending and the sweep completes it; a purge or auth-user failure is retried;
      - alerting: an old pending request raises the alert.

      Also confirm that all of these are rejected again once the staging gate is closed. Record the evidence.

      **Status:** done on staging on 2026-11-22: `npm run test:staging:deletion-gate` 38/38, and the account page 8/8 and 15/15 (`supabase/README.md`). The sweep was run by the real script by hand, not yet by the scheduled workflow, which isn't configured.
   2. **Production, gate off: infrastructure and configuration checks only.** These are non-destructive: no deletion runs and no student data is read. Check that:
      - the migration history matches and the deletion objects exist (read-only catalog check), including the gate setting, which must be off;
      - the function is deployed, at the expected version, with `verify_jwt` off;
      - the required secrets are present (names only, never values), and the function starts with a server key: an unauthenticated request gets 401;
      - the scheduler job is configured (schedule, target and secret reference), and its runs are rejected while the gate is off;
      - the permissions (grants) match the migrations;
      - the alert rule exists, and its notification channel delivers a test message.

      Then verify that deletion requests are rejected while the gate is off. Use the dedicated disposable account from stage 4, which is subject to the same gate:
      - a direct `request_account_deletion()` call is rejected and records nothing;
      - a direct function call with a valid user token is rejected;
      - a sweep request with the sweep secret is rejected.

      **These checks show that production is deployed and configured correctly. They do not show that production deletion works end to end.** Until stage 4 succeeds, nobody may claim that production deletion has been tested.
   3. **Evidence and approval.** Record the stage 1 and stage 2 evidence: date, who ran each check, commands and results, with no secrets or personal data. Then obtain the owner's **explicit approval** to open the gate. Without that approval, the gate stays off.
   4. **After approval: open the gate and run a controlled production test.**
      - Use a dedicated disposable account, created only for this test. It is not a student account, and it is subject to the same gate as every other account.
      - Run the full workflow: request from the account page, the function's result, the user and rows gone, a `deletion_log` entry written, and the next scheduled sweep running without errors.
      - Watch the function logs and the alerts throughout.
      - Only when this test succeeds is production deletion end-to-end tested. Record the result.
   5. **If the production test fails:**
      - close the gate immediately;
      - confirm that requests are rejected again;
      - investigate and record what happened.

      Any deletion request accepted while the gate was open remains an obligation. An authorized operator must complete it using a documented, auditable procedure, verify that the account and associated data are deleted, and confirm the deletion log. Record the outcome without exposing secrets or personal data.

      Re-run the relevant checks above before asking for approval again.
4. **Auth settings:** done in A, before #25 and the migrations:
   - redirect URLs, password length and "Confirm email", as in A.1;
   - CAPTCHA, if used: site key in the build **first** (which requires F7), then Supabase bot protection. The other way round, every login and sign-up fails.

**D. Activation.**
- **Cloud sync** (every student, decision P) stays off until its gates pass:
  - "Confirm email" on;
  - all seven migrations applied and verified;
  - the accounts UI live;
  - the release checks.

  Activation then follows decision L.
- *Superseded 2026-11-26 (decision P):* under-18 cloud sync was blocked independently until a verified parental-consent process existed. There's no separate under-18 activation now.
- Formal legal review is after launch (decision I).

 Opening the deletion gate doesn't enable cloud sync. Enabling sync means three steps: set the `app_config` switches, set `CLOUD_SYNC_ENABLED = true` in a reviewed PR, and deploy.

## 10. Rollback
- **Site:** revert the merge commit on `main` with a PR, which redeploys the previous build. Student progress is in browsers and is unaffected.
  - **Revert in reverse merge order.** With the recommended collapsed merge, the stack is one squash commit, so revert that. Otherwise, revert #15, then #10, then #7.
  - **Don't revert #16 on its own** while the accounts UI must stay hidden. That brings back `main`'s login button.
  - **Re-merging after a revert needs a revert of the revert.** Git treats the reverted commits as already merged, so merging the same branch again brings nothing back.
- **Database:** all seven migrations are additive. [`supabase/rollback/student_accounts_down.sql`](../supabase/rollback/student_accounts_down.sql) removes exactly what they created, leaving the `auth` schema untouched (tested in `db-rollback.test.ts`). **It is destructive:** use it only with the owner's approval, after an export. For a partly completed release (F11):
  - **Pending deletions and the deletion record:** the script drops `deletion_requests` (obligations) and `deletion_log` (evidence). It **refuses to run while either has rows**, unless it starts with the ack from `supabase/rollback/export_before_rollback.sql` that matches the current records (T-18). Store that export privately, and complete every pending request from it afterwards.
  - **The sixth migration alone:** its own non-destructive rollback script, which arrives with #25 (`verified_email_down.sql`, in the rollback folder), undoes only `20261124000000`.
  - **The seventh migration alone:** `remove_age_restrictions_down.sql` (arriving with #25) restores the migration-6 functions and privileges exactly and drops `consents_no_parental`. **Run it before `verified_email_down.sql`**, which refuses to run while migration 7 is applied. Neither touches data.
  - **Partly applied migrations:** the script uses `IF EXISTS` throughout, so it works however far they got. Whether the CLI wraps each migration file in its own transaction has not been verified.
  - It also drops `deletion_rate`, `account_deletion_enabled()` and `deletion_rate_wait()` (tested).
  - Afterwards, remove the **seven** migration rows (whichever are applied) from `supabase_migrations.schema_migrations`, as described in the script.
- **Function:** `supabase functions delete delete-account`, or redeploy the previous version. If it's left deployed after a database rollback, it refuses requests or reports them pending, and changes nothing.

## 11. Known limitations and open items
- **Formal legal review (DPDP)** is scheduled **after launch** (owner decision I, 2026-11-23). That's an accepted legal and privacy risk: no legal approval or compliance is claimed, and the notice stays a labelled draft. Also pending:
  - the legal position of decision P (no age limit, 2026-11-26): whether processing under-18 students' data without verified parental consent is lawful under the DPDP Act 2023 is a question for counsel. *Superseded:* "a verified parental-consent process: under-18 sync is blocked until it exists";
  - a decision on GA4 for under-18 visitors;
  - the final privacy notice. Its draft still mentions parental consent for under-18s, which conflicts with decision P; a proposal is in [`PRIVACY_NOTICE_AGE_PROPOSAL.md`](PRIVACY_NOTICE_AGE_PROPOSAL.md), not applied. The owner decided F13 on 2026-11-23: `/privacy` is live as a labelled draft, not indexed; the final wording needs counsel.
- **Built in #15 and deployed with #7 (`9019a1c`), inactive in production** (no account database):
  - the sweep scheduler (inert until configured);
  - the server-side deletion gate;
  - the rate limits;
  - the F4 fix.
- **Not built yet:**
  - the retention clean-up job (tombstones count toward row limits until then);
  - an incident runbook.
- **H1 limitation:** hiding the login UI doesn't disable Supabase Auth sign-ups through the API (owner decision on the dashboard setting).
- **M1 (resolved):** `/dashboard/activity/` threw React hydration error #418 on every day after a deploy, because the build day's dates were in the prerendered HTML. Fixed in #17 (`5bc0cd8`) and live-verified at +1 and +3 days. `/dashboard/revision/` had the same pattern.
- **Hosting:** GitHub Pages can't send security headers such as `frame-ancestors` or `nosniff` (F8). Cloudflare Pages is the preferred candidate; the migration isn't authorised.
- **Build switches:** the analytics and CAPTCHA switches aren't wired into `deploy.yml` (F7).
- **Manual staging checks, NOT VERIFIED:** the 7 inbox checks (confirmation and reset emails, link reuse, another browser, repeat sign-up, logout, account page) need a real inbox (checklist in `supabase/README.md`). No result has been recorded.
- **Not tested, on purpose:** cloud sync with sync on (two devices, merging, tombstones, large syncs). The old `npm run test:staging` covered it by enabling sync in staging, and it is no longer run.
- **Age band:** no longer asked for (#30) or used (#25, migration 7). The column stays, unused; existing values aren't deleted.
- **Dependencies:** 1 moderate `npm audit` advisory, in a build-time tool (F13).

## 12. Pre-release audit (2026-11-21)
The audit was read-only: no merges, deploys, Supabase changes or production data access. Its evidence (file and line references, commands) and the status of each item are in [`PHASE_2_TRACKER.md`](PHASE_2_TRACKER.md).

| ID | Severity | Finding | Blocks |
|---|---|---|---|
| F1 | High | #12 and #10 target feature branches, and branches aren't deleted on merge. Merged as-is, they never reach `main` | Merging #12 and #10 |
| F2 | Medium | The required check doesn't require up-to-date branches. No intermediate `main` state has been built in CI | Every merge (update branch first) |
| F3 | High | #7 switches the live auth flow to PKCE with new redirect paths. Production redirect URLs and password length must be set first | Merging #7 |
| F4 | Medium | Without the production database, account features fail safely (verified). Defect: while `cloudReady` is `null`, the delete button is enabled. It must be treated as disabled; needs a code fix and a test | Enabling account deletion |
| F5 | High | No sweep scheduler exists, and no server-side gate keeps deletion off. The gate must default to off, fail closed, have no exemptions, and be enforced by `request_account_deletion()` and the function. It opens only after the staged verification (section 9, C.3) and the owner's approval | Production database migrations and enabling account deletion |
| F6 | Low | Deletion function: authentication and CORS are correct. The sweep hides query errors, no `config.toml` pins `verify_jwt`, and there's no rate limit. **All three are fixed in #15** | Nothing (hardening) |
| F7 | Medium | `NEXT_PUBLIC_ANALYTICS` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` work in code, but `deploy.yml` passes neither | Switching analytics off; CAPTCHA |
| F8 | Medium | GitHub Pages sends only HSTS. No frame protection (clickjacking on `/account`) and no `nosniff` | Nothing; hardening and the hosting decision |
| F9 | Medium | CI builds with auth off. A production-configured build under CSP has not been browser-tested | Merging #6 and #7 (manual test) |
| F10 | High | The migration's schema-wide revokes could break unknown objects in production's `public` schema | Production database |
| F11 | Medium | Rollback gaps for partial releases: revert order, re-merging, and losing pending deletions and the deletion record | Any rollback (now documented in section 10) |
| F12 | Critical | Legal (DPDP) sign-off is missing | Production database and cloud sync |
| F13 | Low | A draft privacy notice goes public with #7 (owner decision checklist in the tracker); 1 moderate build-time dependency advisory | Owner decision on publishing |

**Since the audit (2026-11-22):**
- **Fixed in #15, merged with #7 (`9019a1c`) on 2026-11-23:** F4, F5 (the gate and the scheduler; the production stages are still open) and F6 (all three gaps).
- **F9:** done on staging. A live login hasn't been checked, because login is hidden.
- **F1:** resolved; #12 is closed.
- **New:** H1 (production sign-up was open; the UI is hidden by #16, deployed) and M1 (the hydration defect; fixed by #17, deployed).
- **F13:** decided (labelled draft).
- **Still open (2026-11-23):** F3 (now gating the accounts UI and #25), F7, F8 and F10. F11's pending-deletion step is done (T-18, #24). F12 is post-launch (owner decision I) and no longer gates production steps. The current status is in the tracker.

The audit's own conclusion follows, for the record. **It is superseded:** every PR it names is merged or closed.

**Safe to merge** (each still needs the owner's approval, an updated branch and green CI): #9, #6 (after the F9 test), #8, #12 (after retargeting), #11. **Must wait:** #7 (for F3, F9 and the F13 decision); #10 (after #7, retargeted); all production database, function and sync work (for F12, F10, F5 and F4). Account deletion stays disabled until the staged verification in section 9, C.3 is complete and the owner approves opening the gate (F5). Cloud sync stays disabled pending its own separate approval (F12).
