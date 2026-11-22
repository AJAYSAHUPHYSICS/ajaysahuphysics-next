# Phase 2 release: student platform

Technical release notes for the Phase 2 student platform. Legal and privacy review material is kept privately. **Cloud sync of study data stays OFF**, in code (`CLOUD_SYNC_ENABLED = false`) and in the database (`app_config` switches `'false'`), until counsel signs off and the owner authorises launch.

**Release status (pre-release audit, 2026-11-21):** the code is complete and verified on staging, but the release is **not ready to merge as-is**. The merge order is right, but merging has prerequisites (section 1), some items block #7 and the production database (section 12), and legal sign-off gates every database and sync step. Each finding, F1 to F13, is tracked with its status in [`PHASE_2_TRACKER.md`](PHASE_2_TRACKER.md).

## 1. Pull requests and merge order
**Status (2026-11-21, after the merges):** #9, #11, #6, #8 and #13 (a rebased #12) are squash-merged and deployed at `2734e98`. Still open: #7, then #10. #10 must be rebased onto `main` after #7 merges, because squash merges are in use. F9 has passed on staging. See the tracker's "Post-deploy verification" and "Merge readiness" sections. The table below is the original plan.

| Order | PR | Scope | Before merging |
|---|---|---|---|
| 1 | #9 | Next.js 16.2.9 → 16.4.6 (clears all Next.js advisories) | Update branch, green CI (F2) |
| 2 | #6 | Strict hash-based Content Security Policy on every page; safe JSON-LD; optional CAPTCHA origin; build-time analytics switch (default on) | Update branch, green CI; production-configured build test (F9); check live login straight after deploy |
| 3 | #8 | Study pages (bookmarks, mistakes, revision, activity); navbar overflow fix; accessibility fixes; E2E and keyboard checks, also in CI | Update branch, green CI. **Merge commit only** (F1) |
| 4 | #12 (on #8) | Five-card dashboard overview; secondary cards on the study pages and the new `/dashboard/progress/` | **Retarget to `main` first** (F1), then green CI |
| 5 | #11 | Chapter pages scrolled sideways on phones; dashboard hydration error; duplicate-question validation | Update branch, green CI |
| 6 | #7 | Accounts (PKCE login, generic errors, optional CAPTCHA, account page, export, deletion); database schema with RLS; sync engine (off); lazy Supabase client | Production Auth redirect URLs and password length set (F3); production-configured build test (F9); decision on publishing the draft privacy notice (F13). **Merge commit only** (F1) |
| 7 | #10 (on #7) | Staging tooling and verification suites; deletion-function key and CORS handling; rollback script; this document and the tracker | **Retarget to `main` first** (F1), then green CI |

Each merge into `main` deploys the site. #7 and #10 belong together: #10 holds the deletion-function fixes.

**Merge mechanics (F1, F2):**
- **Stacked PRs don't follow their base automatically.** #12 targets `phase-2b-study-tools` and #10 targets `phase-2b-accounts-platform`. The repository doesn't delete branches on merge, so neither PR is retargeted when its base merges. Merged as-is, each lands in its feature branch: nothing deploys and nothing warns. After #8 merges, run `gh pr edit 12 --base main`; after #7 merges, run `gh pr edit 10 --base main`. Then wait for CI on the retargeted PR.
- **Use a merge commit, not squash or rebase, for #8 and #7.** #12 and #10 contain their base PR's original commits, so squashing the base would leave them with conflicts or duplicated history. The `main` ruleset allows all three methods, so this is a manual rule.
- **Update each branch before merging.** The required `ci` check doesn't require branches to be up to date, and every PR's CI ran against the old `main` (`9c0d09e`). The full combined release was tested only locally, so no intermediate `main` state has been built in CI. Click "Update branch" and wait for green CI on the updated head before every merge.

## 2. Architecture
- **Static export.** Next.js `output: "export"` on GitHub Pages; there is no server code in the site.
- **Local-first.** Study progress lives in the browser in 11 `atlas:*` localStorage stores. Their formats are frozen and tested (`student-data-compat.test.ts`).
- **Optional accounts** with Supabase Auth (PKCE email links). The Supabase client (~60 KB gzipped) loads only when needed: a saved session, the login dialog, or the account and auth pages (`src/lib/supabase-loader.ts`).
- **Accounts are already live in production.** `main` ships a "Login / Sign Up" button with the implicit flow and no redirect URL, and production builds have Supabase configured through repository secrets. So #7 **changes a live auth flow**: it switches to PKCE and sends email links to `/auth/callback/` and `/auth/reset-password/` (F3).
- **Cloud copies (off)** use a three-way-merge sync engine (`src/lib/sync/`):
  - only 6 stores are syncable;
  - the activity log, searches, reading position and recently viewed pages never leave the device.
- **Server-side work** runs in one Supabase Edge Function, `delete-account`.

## 3. Database (`supabase/migrations/`)
| Migration | Contents |
|---|---|
| `20261120000000_student_accounts.sql` | See below |
| `20261121000000_service_role_grants.sql` | Least privilege for the server role: SELECT on Atlas tables, UPDATE of the `app_config` value, INSERT into `consents` |

`20261120000000_student_accounts.sql` creates:
- **Tables:**
  - `app_config` (launch switches);
  - `profiles` (self-declared age band);
  - `consents` (append-only);
  - `bookmarks`, `checklist_items`, `revision_rounds`, `mistakes`, `goals`, `streaks`;
  - `deletion_requests`, `deletion_log` (SHA-256 of the user id, no other personal data).
- **RLS on every table:** students read and write only their own rows. Logged-out visitors get no access.
- **Consent gate:** `sync_allowed()` is re-checked on every write, so the launch switches, consent withdrawal, a new notice version and a pending deletion all take effect immediately.
- **Under-18s** also need the minors switch and server-verified parental consent.
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
Project `ajaysahuphysics-staging`. Setup and the verification record are in [`supabase/README.md`](../supabase/README.md). Both migrations and the function are applied and deployed there, and verified:
- the catalog check;
- `db advisors`: no errors;
- `npm run test:staging` 23/23;
- `npm run test:staging:browser` 15/15.

Staging browser journeys ran on `npm run dev`, which doesn't inject the CSP. A static production build with Supabase configured has not yet been tested in a browser (F9).

## 6. Security controls
- **Content Security Policy** on every page; no `unsafe-inline` or `unsafe-eval` for scripts; verified in a browser with an injection control.
- **RLS, the consent gate and least-privilege grants**, as in section 3.
- **Authentication:**
  - generic error messages (no account enumeration);
  - PKCE; redirect allow-list in code;
  - password policy for new passwords: ≥ 10 characters, ≤ 72 bytes. This is enforced in the browser only, until Supabase's own minimum is set (F3);
  - optional CAPTCHA.
- **The deletion function** is deployed with `--no-verify-jwt`, and authorises every request itself:
  - the user's token is checked with the Auth server;
  - a deletion request must already be recorded;
  - the sweep secret is compared in constant time, and the sweep is refused when the secret is unset.
  - CORS allows `https://ajaysahuphysics.com`, which is the canonical host (`www` redirects to it), plus validated staging origins. Reviewed in F6.
- **Secrets:** none in the repository, its history or the build output. The service key never reaches browser code; `staging:check` refuses any secret in an env file Next.js loads.
- **Hosting gaps (F8):** the live site sends only `Strict-Transport-Security`. There is no `frame-ancestors` or `X-Frame-Options`, so pages can be framed (clickjacking), and no `X-Content-Type-Options`. A meta-tag CSP can't supply these. Interim mitigations are listed in F8.

## 7. Account export and deletion
- **Device export:** "Download this device's data" on `/account/` (all `atlas:*` stores).
- **Account export:** `export_my_data()` returns only the caller's rows, as documented JSON. It works with sync off.
- **Deletion:**
  1. `request_account_deletion()` records the request and stops uploads at once.
  2. The `delete-account` function runs `purge_user_data()` (all rows, plus a log entry holding only the hash) and deletes the login user.
  3. It's retry-safe; a scheduled sweep (`?sweep=1` with the sweep secret) completes pending requests. **There is no scheduler for the sweep yet** (F5). Until one exists, a request whose function call failed stays pending, even though the student is told it will be finished.
- **Deletion gate (F5):** account deletion **must stay disabled in production (gate off)** until the staged verification in section 9, C.3 is complete and the owner explicitly approves opening the gate. Today's code doesn't enforce this. The button becomes available as soon as `sync_allowed()` exists, which is to say as soon as the migrations are applied. An explicit gate is needed, and it is a separate change. It must meet these rules:
  - **Enforced server-side.** Disabling the button isn't enough. While the gate is off, `request_account_deletion()` and the `delete-account` function must both reject requests, so a direct call that bypasses the page is refused.
  - **No exemptions.** The gate applies to every account and every deletion-related request: starting a deletion, the function's user path, and the scheduled sweep. There is no test-account exemption and no bypass.
  - **Off by default, failing closed.** If its configuration is missing or can't be read, both treat the gate as off and reject the request.
  - **Proven by tests.** They show that direct requests are rejected while the gate is off, both to `request_account_deletion()` and to the function.
- **Device progress** stays in the browser unless the student removes it.
- **Without the production database objects** (verified in code, F4): the account page calls `sync_allowed()` and treats any error as "not set up". Account export is then hidden, deletion is disabled with a pointer to the Contact page, and cloud copies show as not available. Device export and removal still work.
- **Before that check finishes (F4, defect):** while `cloudReady` is still `null`, the delete button is **enabled**, because it is disabled only for `cloudReady === false`. The `null` state must be treated as disabled. This needs a code fix and a test, which are separate changes.

## 8. Quality gates
| Gate | Command | In CI |
|---|---|---|
| TypeScript, ESLint | `npx tsc --noEmit`, `npm run lint` | Yes |
| Unit, integration, database and RLS tests (PGlite) | `npm test` | Yes |
| Static build plus CSP injection | `npm run build` | Yes, with Supabase **not** configured (F9) |
| URLs, sitemap, canonicals, internal links | `node scripts/verify-build.mjs` | Yes |
| Post-build checks (legacy content, CSP) | `npm run test:build-output` | Yes |
| Browser E2E, accessibility audit, phone overflow, keyboard | `npm run test:e2e` | Yes (since #8), with auth off |
| Staging journey and browser journey | `npm run test:staging`, `npm run test:staging:browser` | No: manual, staging only |
| Production-configured build in a browser (auth on, CSP with the exact Supabase origin) | Build with staging settings, serve `out/`, run the login and account journey | No: manual, **not yet done** (F9) |
| Migration dry run | `npx supabase@2.122.1 db push --linked --dry-run` | No: manual |

The required `ci` check doesn't require branches to be up to date with `main` (F2), so update each branch before merging.

## 9. Production release runbook (each step needs the owner's explicit approval)
**A. Before the first merge**
1. In production Supabase Auth (settings only, no data access):
   - add `https://ajaysahuphysics.com/auth/callback/` and `https://ajaysahuphysics.com/auth/reset-password/` to the redirect URLs;
   - check the Site URL;
   - set the minimum password length to 10;
   - note whether email confirmation is on.

   This **must be done before #7**. Without the redirect URLs, Supabase falls back to the Site URL. Email-link codes then land on a page that doesn't complete sign-in, and password reset can't be finished at all (F3).
2. Optional, in a reviewed PR: pass `NEXT_PUBLIC_ANALYTICS` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the build step in `deploy.yml`, from repository variables (F7).
3. Run the production-configured build test from section 8 against staging (F9).

**B. Site merges**, one at a time, in the order of section 1, following its "Before merging" column. After each deploy, check the live site: routes, console errors and a phone. After #6 and after #7, also test login, sign-up and password reset with a test account.

**C. Production database. Only after legal sign-off (F12).**
1. **Before any production database change:**
   - legal sign-off for what will be stored;
   - a read-only inventory of production's `public` schema (M-4, F10), with the owner's approval;
   - a backup.
2. **Production Supabase**, after verifying the project ref:
   1. Deploy `delete-account` with `--no-verify-jwt --use-api` and set `ATLAS_DELETION_SWEEP_SECRET` (no `ATLAS_ALLOWED_ORIGINS`) **before** the migrations. Without the tables, the function refuses requests and changes nothing.
   2. Confirm the production server key (new or legacy) is available to the function.
   3. **Make sure account deletion is gated off first (F5).** Today the account page enables deletion as soon as `sync_allowed()` exists, so applying the migrations alone would switch it on. Don't apply the migrations until both of these are merged and deployed:
      - the server-side deletion gate (F5): off by default, failing closed, and enforced by `request_account_deletion()` and the `delete-account` function;
      - the `cloudReady === null` fix (F4).
   4. `db push --dry-run`, then `db push --linked`.
   5. Configure the sweep scheduler and the alert for old `deletion_requests` rows (F5). The scheduler doesn't exist yet. While the gate is off, scheduled sweep runs are rejected; that is expected.
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
4. **Auth settings:**
   - redirect URLs, password length and email confirmation, as in A.1;
   - CAPTCHA, if used: site key in the build **first** (which requires F7), then Supabase bot protection. The other way round, every login and sign-up fails.

**D. Cloud sync** stays off until counsel approves, under its own separate approval. Opening the deletion gate doesn't enable cloud sync. Enabling sync means three steps: set the `app_config` switches, set `CLOUD_SYNC_ENABLED = true` in a reviewed PR, and deploy.

## 10. Rollback
- **Site:** revert the merge commit on `main` with a PR, which redeploys the previous build. Student progress is in browsers and is unaffected.
  - **Revert in reverse merge order.** #10 contains #7's commits, so reverting only #7 while #10 is live leaves code that depends on it. Revert #10 first, then #7.
  - **Re-merging after a revert needs a revert of the revert.** Git treats the reverted commits as already merged, so merging the same branch again brings nothing back.
- **Database:** both migrations are additive. [`supabase/rollback/student_accounts_down.sql`](../supabase/rollback/student_accounts_down.sql) removes exactly what they created, leaving the `auth` schema untouched (tested in `db-rollback.test.ts`). **It is destructive:** use it only with the owner's approval, after an export. For a partly completed release (F11):
  - **Pending deletions:** the script drops `deletion_requests`, which loses requests that must still be honoured. Finish them (or export them and finish by hand) first.
  - **Deletion record:** it also drops `deletion_log`, the record of completed deletions. Export it first.
  - **Partly applied migrations:** the script uses `IF EXISTS` throughout, so it works however far they got. Whether the CLI wraps each migration file in its own transaction has not been verified.
  - Afterwards, remove the two migration rows from `supabase_migrations.schema_migrations`, as described in the script.
- **Function:** `supabase functions delete delete-account`, or redeploy the previous version. If it's left deployed after a database rollback, it refuses requests or reports them pending, and changes nothing.

## 11. Known limitations and open items
- **Legal review (DPDP)** is required before any cloud storage of study data, especially for students under 18 (F12). Also pending:
  - a verified parental-consent process;
  - a decision on GA4 for under-18 visitors;
  - a decision on publishing the draft privacy notice, which #7 adds at `/privacy` (marked as a draft and not indexed). The owner decision checklist is in the tracker under F13.
- **Not built yet:**
  - the deletion sweep scheduler (F5);
  - the server-side gate that keeps account deletion disabled until it is fully operational (F5), and the fix that treats `cloudReady === null` as disabled (F4);
  - the retention clean-up job (tombstones count toward row limits until then);
  - an incident runbook.
- **Hosting:** GitHub Pages can't send security headers such as `frame-ancestors` or `nosniff` (F8). Cloudflare Pages is the preferred candidate; the migration isn't authorised.
- **Build switches:** the analytics and CAPTCHA switches aren't wired into `deploy.yml` (F7).
- **Manual staging checks still needed:** confirmation and reset emails need a real inbox (checklist in `supabase/README.md`).
- **Age band:** self-declared, and changeable.
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
| F6 | Low | Deletion function: authentication and CORS are correct. The sweep hides query errors, no `config.toml` pins `verify_jwt`, and there's no rate limit | Nothing (hardening) |
| F7 | Medium | `NEXT_PUBLIC_ANALYTICS` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` work in code, but `deploy.yml` passes neither | Switching analytics off; CAPTCHA |
| F8 | Medium | GitHub Pages sends only HSTS. No frame protection (clickjacking on `/account`) and no `nosniff` | Nothing; hardening and the hosting decision |
| F9 | Medium | CI builds with auth off. A production-configured build under CSP has not been browser-tested | Merging #6 and #7 (manual test) |
| F10 | High | The migration's schema-wide revokes could break unknown objects in production's `public` schema | Production database |
| F11 | Medium | Rollback gaps for partial releases: revert order, re-merging, and losing pending deletions and the deletion record | Any rollback (now documented in section 10) |
| F12 | Critical | Legal (DPDP) sign-off is missing | Production database and cloud sync |
| F13 | Low | A draft privacy notice goes public with #7 (owner decision checklist in the tracker); 1 moderate build-time dependency advisory | Owner decision on publishing |

**Safe to merge** (each still needs the owner's approval, an updated branch and green CI): #9, #6 (after the F9 test), #8, #12 (after retargeting), #11. **Must wait:** #7 (for F3, F9 and the F13 decision); #10 (after #7, retargeted); all production database, function and sync work (for F12, F10, F5 and F4). Account deletion stays disabled until the staged verification in section 9, C.3 is complete and the owner approves opening the gate (F5). Cloud sync stays disabled pending its own separate approval (F12).
