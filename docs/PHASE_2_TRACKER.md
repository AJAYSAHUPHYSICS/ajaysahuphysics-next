# Phase 2 release tracker

The status of every pre-release audit finding (F1 to F13) for the Phase 2 student platform. The release notes, runbook and rollback are in [`PHASE_2_RELEASE.md`](PHASE_2_RELEASE.md); this file tracks what is still open. Last updated 2026-11-22. No legal approval, production verification or production readiness is claimed anywhere in this file.

**Safeguards (2026-11-22):**
- `CLOUD_SYNC_ENABLED = false`.
- On staging, `adult_sync_permitted`, `minor_sync_permitted` and the deletion gate are `'false'`.
  - `minor_sync_permitted` has never been enabled.
  - `adult_sync_permitted` was enabled once on staging, temporarily, by the 2026-11-21 `test:staging` run, and restored.
  - The deletion gate is opened only by `test:staging:deletion-gate`, during its own run.
  - In production, none of these objects exists yet.
- No production Supabase or Auth change.
- The safe staging check is `npm run test:staging:release` (63/63). The check makes one deliberate authenticated student-side UPDATE attempt against `app_config`. The server must deny it. No successful `app_config` modification occurs, and the script's server key never writes to `app_config`. `npm run test:staging` is not used, because it enables sync.

The audit was **read-only**: no merges, deploys, Supabase changes or production data access. File references are on this branch (`phase-2b-staging-verification`, PR #10) unless marked `(#6)`, `(#8)` or `(main)`, which means that PR's branch or `main`. The audit evidence for F4, F5, F6 and F11 describes the code **before** the deletion-gate fix (#15), so its references are at commit `3f1029b`; the progress notes under each finding describe the fix.

## How to read this
| Priority | Meaning |
|---|---|
| P0 | Blocks a merge or a production step until it's done |
| P1 | Do before the step it depends on |
| P2 | Hardening; doesn't block the release |

| Status | Meaning |
|---|---|
| OPEN | Action not started |
| VERIFIED | Checked against the code or a live setting; no action needed beyond what's listed |
| DOCUMENTED | The safeguard is written into `PHASE_2_RELEASE.md`; nothing else to build |
| NOT VERIFIED | Couldn't be checked (no access, or not tested) |
| OWNER DECISION | Needs the owner's choice or approval |
| BLOCKED | Waiting on someone outside engineering (counsel) |

## Summary
| ID | Severity | Priority | Status | Blocks | Owner |
|---|---|---|---|---|---|
| F1 | High | P0 | #12 CLOSED (superseded by #13) · stack #7 → #10 → #15 OPEN (plan: collapse, then one squash) | Merging the stack | Owner (at merge time) |
| F2 | Medium | P0 | VERIFIED for `main` at `2734e98` · the integrated release simulated locally (all gates pass) · OPEN for each actual merge | Merging the stack | Owner (at merge time) |
| F3 | High | P0 | OPEN · NOT VERIFIED | Merging #7 | Owner (production Auth settings) |
| F4 | Medium | P1 | FIXED in #15 (not merged) · tests pass · staging VERIFIED | Enabling account deletion | Owner (merge) |
| F5 | High | P0 | Gate, rate limits and scheduler BUILT in #15 (not merged) · staging stage 1 VERIFIED (38/38) · scheduler NOT CONFIGURED · production stages OPEN | Production database migrations and enabling account deletion | Owner (merge, scheduler settings, staged production steps) |
| F6 | Low | P2 | Gaps 1, 2 and 3 FIXED in #15 (not merged) · staging VERIFIED | Nothing | Owner (merge) |
| F7 | Medium | P1 | OPEN · OWNER DECISION | Switching analytics off; CAPTCHA | Engineering (PR), owner (approval) |
| F8 | Medium | P2 | OPEN · OWNER DECISION (hosting) | Nothing | Engineering (interim), owner (hosting) |
| F9 | Medium | P0 | VERIFIED on staging (production-configured build of `main` + #10) · live login check after #7 OPEN | Nothing before merging #7 | Engineering |
| F10 | High | P0 | OPEN · OWNER DECISION | Production database | Owner (approve the read-only inventory) |
| F11 | Medium | P1 | DOCUMENTED · pending-deletion step OPEN | Any rollback | Owner |
| F12 | Critical | P0 | BLOCKED | Production database and cloud sync | Counsel, then owner |
| F13 | Low | P2 | OWNER DECISION (checklist below) | Publishing the draft privacy notice | Owner |
| H1 | High | P0 | Owner decided (2026-11-22): hide login · UI gate in #16 (`main`) and #15 (stack), not merged · Auth API sign-ups still possible (dashboard setting, OPEN) | Nothing; the live site has open sign-up until #16 deploys | Owner (merge; dashboard setting) |
| M1 | Medium | P1 | Live defect · FIXED in #17 (not merged) · regression tests pass | Nothing | Owner (merge) |
| E1 | Medium | P1 | 7 manual inbox checks NOT VERIFIED | Turning the accounts UI on | Owner (needs an inbox) |

### H1 · Production sign-up was open before legal sign-off
- **Evidence:**
  - `main`'s `AuthModal.tsx` calls `signUp`, and production builds include the Supabase keys, so the live navbar offered "Login / Sign Up" and created accounts before F12 and F13.
  - Owner decision on 2026-11-22: hide login and sign-up until the release.
- **Done:**
  - #16 (`phase-2-5-hide-login`, onto `main`) and #15 (the stack) add `ACCOUNTS_UI_ENABLED = false` (`src/lib/auth/accounts-ui.ts`).
  - Signed-out visitors see no login or sign-up control (desktop, mobile menu, account page); signed-in visitors keep "Log out".
  - Guards:
    - `accounts-ui.test.ts`: every opener of the login dialog goes through the switch, and only `AuthModal` calls `signUp`;
    - the keyboard E2E: no login control is visible or reachable.

    Both fail on the previous code.
- **Limitation:** Supabase Auth still accepts sign-ups through its API. Disabling that is a dashboard setting, and an owner decision.
- **Done when:** #16 is deployed (and the stack keeps the switch), and the owner has decided on the dashboard setting.

### M1 · Hydration error on /dashboard/activity/
- **Evidence:** the live site on 2026-11-22 (the build was 2026-11-21): React error #418, six times. `ActivityClient` read `Date.now()` at prerender time, so the build day's dates were in the HTML. `RevisionClient` had the same pattern, without a visible error.
- **Done:** #17 (`phase-2-5-activity-hydration`, onto `main`): `useClientNow()` is `null` until hydration ends; same-size placeholders.
- **Tests:**
  - the server HTML is identical across build days;
  - E2E with the browser clock 3 days past the build.

  The previous code fails both, with #418.
- **Done when:** #17 is deployed and the live page shows no #418.

## Findings

### F1 · Stacked PRs don't reach `main` on their own
- **Severity:** High. **Priority:** P0. **Status:** OPEN.
- **Evidence:**
  - From the GitHub API: #12 is `phase-2b-dashboard-focus → phase-2b-study-tools`, and #10 is `phase-2b-staging-verification → phase-2b-accounts-platform`.
  - The repository has `delete_branch_on_merge: false`, so GitHub doesn't retarget either PR when its base merges.
  - The `main` ruleset allows merge, squash and rebase merges.
- **Risk:** merged as-is, #12 and #10 land in their feature branches. Nothing deploys and nothing warns. Squashing #8 or #7 would also leave #12 or #10 with conflicts or duplicated history.
- **Action:**
  - Merge #8 and #7 with a merge commit.
  - Then run `gh pr edit 12 --base main` and `gh pr edit 10 --base main`, and wait for green CI on each before merging.
- **Depends on:** #8 merged (for #12); #7 merged (for #10).
- **Done when:** both PRs show base `main` with green CI before they are merged.
- **Update (2026-11-21, after the merges):** #9, #11, #6, #8 and #13 were **squash-merged**, not merged with merge commits. #12's change was rebased onto `main` as #13 and is deployed; #12 is superseded and can be closed (owner's call). #10 is still stacked on #7's branch. Because squash is the method in use, the safe path is: squash-merge #7, then rebase #10 onto `main` (as was done for #12 → #13), wait for green CI, then merge.

### F2 · No intermediate `main` state has been built in CI
- **Severity:** Medium. **Priority:** P0. **Status:** OPEN.
- **Evidence:**
  - The `main` ruleset's required check is `ci` with `strict_required_status_checks_policy: false`.
  - All seven PRs' CI ran against `main` at `9c0d09e`. The full combined release was tested only locally, on an unpushed detached HEAD.
- **Risk:** each merge deploys a combination CI has never built.
- **Action:** before every merge, click "Update branch" and wait for green CI on the updated head. Optionally, turn on "require branches to be up to date" in the ruleset (an owner setting).
- **Depends on:** nothing.
- **Done when:** each merged PR's last CI run was on a head that included the then-current `main`.
- **Update (2026-11-21):** `main` at `2734e98` (after #9, #11, #6, #8, #13): all five deploy runs succeeded; locally, lint and `tsc` clean, unit 461 passed and 1 skipped, build-output 11 passed and 2 skipped, E2E 69/69, keyboard 17/17 (5 skipped). `main` + #10 (which contains #7), merged locally without conflicts: lint and `tsc` clean, unit 550 passed and 1 skipped, build-output 11 passed and 2 skipped, E2E 69/69, keyboard 24/24. #7 and #10 are 5 commits behind `main`, so their CI hasn't run on that combination: update both branches before merging.

### F3 · #7 changes the live auth flow; production redirect URLs come first
- **Severity:** High. **Priority:** P0. **Status:** OPEN · NOT VERIFIED (no access to production Auth settings).
- **Evidence:**
  - Today's live flow uses the implicit default and sends no redirect URL: `src/components/AuthModal.tsx:27-28` (main), `src/lib/supabase-client.ts:14-15` (main).
  - Production builds have auth on: both Supabase repository secrets are set, and `.github/workflows/deploy.yml:37-41` passes them to the build.
  - #7 switches to PKCE with `detectSessionInUrl: false`: `src/lib/supabase-client.ts:20-25`.
  - Sign-up sends its link to `/auth/callback/` (`src/components/AuthModal.tsx:89`). Password reset sends its link to `/auth/reset-password/` (`src/components/AuthModal.tsx:94`). Both paths come from `authRedirect` in `src/lib/auth/auth-policy.ts:9-15`.
- **Risk:**
  - If those URLs aren't on production's redirect allow-list, Supabase sends the student to the Site URL, where nothing completes sign-in.
  - Confirmation still succeeds on Supabase's side, but **password reset can't be finished**.
  - The 10-character minimum is enforced only in the browser until Supabase's own setting matches.
  - Confirmation emails sent before the merge use `#access_token` links, which the new client no longer reads. The email is still confirmed.
- **Action:**
  - Before merging #7, add `https://ajaysahuphysics.com/auth/callback/` and `https://ajaysahuphysics.com/auth/reset-password/` to production's redirect URLs.
  - Check the Site URL, and set the minimum password length to 10.
  - After the deploy, test sign-up, login and reset with a test account.
- **Depends on:** owner access to the production Auth settings.
- **Done when:** the settings are confirmed and the live checks pass.

### F4 · Account features without the production database; delete button enabled before the check finishes
- **Severity:** Medium. **Priority:** P1. **Status:** OPEN (code fix and test required). The handling of a missing database is VERIFIED.
- **Evidence:**
  - The account page calls the `sync_allowed` RPC (`src/app/account/AccountClient.tsx:54-63`) and treats any error as "not set up". After that, account export is hidden (`src/app/account/AccountClient.tsx:175`).
  - Deletion is disabled with a pointer to the Contact page (`src/app/account/AccountClient.tsx:198-200`), and cloud copies show as not available (`src/app/account/AccountClient.tsx:153`).
  - The sync engine returns `disabled` (`src/lib/sync/engine.ts:68-69`) while `CLOUD_SYNC_ENABLED = false` (`src/lib/sync/policy.ts:15`).
- **Defect:**
  - The delete button is disabled only for `cloudReady === false` (`src/app/account/AccountClient.tsx:198`). While the check is still running (`cloudReady === null`), the button is **enabled**.
  - `cloudReady === null` means "not yet known" and must be recorded and handled as a **disabled** state. A deletion control must never be usable before the environment has been confirmed ready.
  - Also, each visit logs a 404 for the RPC in the console (cosmetic).
- **Action:**
  - Code fix (a separate change, not part of this documentation update): enable the button only when `cloudReady === true`, so `null` and `false` both mean disabled.
  - Add a test that the button is disabled while the check is in flight, and when it fails.
- **Depends on:** nothing. It is required before account deletion is enabled (F5).
- **Done when:** the fix and its test are merged, and the test passes in CI.

### F5 · No sweep scheduler and no deletion gate; deletions can be left unfinished
- **Severity:** High. **Priority:** P0 for the production database. **Status:** OPEN (deletion gate and scheduler not started).
- **Requirement:** account deletion **must remain disabled (gate off) in production** until all of the following are true:
  - the staged verification in `PHASE_2_RELEASE.md` section 9, C.3 is complete;
  - its evidence is recorded;
  - the owner has explicitly approved opening the gate.

  The staged verification covers three parts: the migrations, the `delete-account` function with its secrets, and the scheduled sweep. Until the gate opens, students are pointed to the Contact page for deletion.
- **Gate requirements:**
  - **Enforced server-side.** Disabling the button in the page isn't enough. While the gate is off, the server-side function that starts a deletion (`request_account_deletion()`) and the `delete-account` function must both reject requests, including direct calls that bypass the page.
  - **No exemptions.** The gate applies to every account and every deletion-related request: starting a deletion, the function's user path, and the scheduled sweep. There is no test-account exemption and no bypass, in staging or in production.
  - **Off by default.** The gate starts off, and only a deliberate owner-approved change opens it.
  - **Fails closed.** If the gate's configuration is missing, unreadable or unavailable, both `request_account_deletion()` and the function treat it as off and reject the request.
- **Evidence:**
  - If `request_account_deletion` succeeds (`src/app/account/AccountClient.tsx:107`) but the function call fails, the student is told "We'll finish deleting your account" (`src/app/account/AccountClient.tsx:118`).
  - Only the sweep can then finish it. The sweep is "optional for staging" (`supabase/README.md:87`), and the repository has no scheduler: no `pg_cron` migration, no workflow and no `supabase/config.toml`.
  - Nothing in code enforces the requirement. The account page enables deletion as soon as the `sync_allowed` RPC answers (`src/app/account/AccountClient.tsx:54-63`; `src/app/account/AccountClient.tsx:198`), that is, as soon as the migrations are applied, whether or not the function and the sweep work.
- **Risk:** in production, a deletion the student was promised never completes. This is a privacy and legal exposure.
- **Action:**
  - Add an explicit server-side deletion gate that meets the gate requirements above, for example an `app_config` switch defaulting to off, checked by both `request_account_deletion()` and the function. A build flag or a UI-only check doesn't qualify. This is a separate change, with tests. It must be deployed **before** the production migrations are applied.
  - Deploy the function with its secrets **before** applying the migrations (runbook section 9, C.2).
  - Build the scheduler: `pg_cron` + `pg_net` with the secret kept in Vault, or a scheduled GitHub Actions job using a repository secret. Test it on staging.
  - Add an alert for `deletion_requests` rows older than a threshold.
  - Follow the staged verification in `PHASE_2_RELEASE.md` section 9, C.3:
    1. **Staging, gate open:** full end-to-end deletion test covering request initiation, function execution, the scheduled sweep, failure handling and alerting.
    2. **Production, gate off:** non-destructive infrastructure and configuration checks covering migrations, function deployment, secrets, scheduler configuration, permissions and alerting. Then confirm that deletion requests are rejected while the gate is off.
    3. **Evidence and approval:** record the evidence and obtain the owner's explicit approval.
    4. **After approval:** open the gate, then run a controlled end-to-end production test with a dedicated disposable account that is subject to the same gate. Monitor the workflow and the alerts.
    5. **If it fails:** close the gate immediately and investigate. Every deletion request accepted while the gate was open remains an obligation. An authorized operator completes it through a documented, auditable procedure, verifies the account and its data are gone, confirms the deletion log, and records the outcome with no secrets or personal data.
- **Depends on:** F4 fix; owner choice of scheduler; staging test; F12 (legal) and F10 (inventory) before the production migrations.
- **Done when:**
  - the server-side gate is merged, with tests proving that while it is off:
    - a direct call to `request_account_deletion()` by a signed-in student is rejected, and no deletion request is recorded;
    - a direct request to the `delete-account` function with a valid user token is rejected, and nothing is purged or deleted;
    - a sweep request with a valid sweep secret is rejected, and nothing is purged or deleted;
    - with the gate's configuration missing or unreadable, both paths reject the request (fail closed);
    - the gate's default, as created by the migrations, is off;
  - and that, once the gate is open, the same requests succeed;
  - with no exemption for any account, including test accounts;
  - **staging (gate open):** the complete deletion workflow has passed, with evidence recorded:
    - request initiation;
    - function execution;
    - a scheduled sweep completing a planted pending request;
    - failure handling;
    - the alert firing on an old row;
  - **production (gate off), infrastructure and configuration only:** the non-destructive checks have passed and are recorded. They cover migrations, function deployment, secrets, scheduler configuration, permissions and alerting, and they confirm that deletion requests are rejected while the gate is off. **This is not evidence that production deletion works end to end**;
  - the owner's explicit approval to open the gate is recorded;
  - **production (gate open), end to end:** the controlled test with the dedicated disposable account has passed while the workflow and alerts were monitored, and the result is recorded. Only from this point may production deletion be described as tested end to end. If the test fails, the gate is closed immediately and the investigation is recorded. Every request accepted while the gate was open is then completed by an authorized operator through a documented, auditable procedure, with deletion of the account and its data verified, the deletion log confirmed, and the outcome recorded without secrets or personal data.

  **Progress (2026-11-22), in PR #15 (`phase-2b-deletion-gate`, stacked on #10; not merged):**
  - **Built:** migration `20261122000000` (gate, created `'false'`, fails closed); gated `request_account_deletion()`; function user path and sweep gated (403 off, 503 unreadable); the hourly `deletion-sweep.yml` workflow, inert until `vars.ATLAS_DELETION_SWEEP_ENABLED` is `'true'`, with the alert as its exit code.
  - **Tests:** PGlite gate tests, 10 (all fail without the migration); handler tests, 13 (9 fail with the old handler); availability and sweep tests. On `main` + the branch: unit 583 passed and 1 skipped, E2E 69/69, keyboard 24/24.
  - **Staging, gate open (stage 1):** `npm run test:staging:deletion-gate` 30/30, covering rejection while off, deletion with a log row, a planted request swept by the real script, the alert firing with the gate closed while a request is outstanding, and the operator procedure. Account page: 8/8 with the gate off, browser journey 15/15 with it open. Staging was left with the gate off, sync off, and 0 users.
  - **Rate limits (F6 gap 3), added 2026-11-22:** migration `20261122010000`; per verified user, 5 requests per hour and 6 function calls per 10 minutes; the sweep and the operator procedure are not limited. Staging 38/38, with exact limits under parallel calls.
  - **Still open:**
    - the owner's PR review and merge;
    - the scheduler variables and secret;
    - running the sweep from the scheduled workflow itself (on staging it was run by hand);
    - production stages 2 to 5.

    Production deletion has **not** been tested.

### F6 · Deletion function: correct authentication, three small gaps
- **Severity:** Low. **Priority:** P2. **Status:** VERIFIED (authentication and CORS) · 3 fixes OPEN.
- **Evidence (correct):**
  - The user token is checked with the Auth server (`supabase/functions/delete-account/index.ts:35-38`).
  - A recorded deletion request is required first (`supabase/functions/delete-account/handler.ts:44`).
  - The sweep secret is compared in constant time (`supabase/functions/delete-account/index.ts:27-32`), and the sweep is refused when the secret is unset (`supabase/functions/delete-account/handler.ts:49`).
  - The new secret key is preferred, with the legacy key as fallback (`supabase/functions/delete-account/runtime-config.ts:22-35`).
  - CORS allows the production origin plus validated extra origins (`supabase/functions/delete-account/runtime-config.ts:38-53`). The production origin is the canonical host: `www` returns a 301 to `https://ajaysahuphysics.com/`, and that is the Pages custom domain.
- **Gaps:**
  1. The sweep hides database errors: `pendingBefore` returns an empty list when the query fails (`supabase/functions/delete-account/index.ts:43-46`), so a broken sweep reports "processed: 0".
  2. No `supabase/config.toml` pins `verify_jwt = false`. A deploy that forgets the flag can block the sweep. It fails closed, but the sweep stops working.
  3. The public endpoint has no rate limiting.
- **Action:** return 500 when a query fails; add `[functions.delete-account] verify_jwt = false`; watch invocation counts after launch.
- **Depends on:** nothing.
- **Done when:** gaps 1 and 2 are fixed, with tests.

### F7 · The analytics and CAPTCHA switches aren't wired into the deploy
- **Severity:** Medium. **Priority:** P1. **Status:** OPEN · OWNER DECISION (workflow change).
- **Evidence:**
  - The switch works in code:
    - `src/lib/analytics-config.ts:15-19` (#6) and `src/components/Analytics.tsx:11` (#6) remove GA;
    - `scripts/inject-csp.mjs:43` (#6) and `scripts/inject-csp.mjs:53-56` (#6) remove the Google origins from the CSP.
  - The deploy build passes only the two Supabase variables (`.github/workflows/deploy.yml:37-41`), and the repository has no Actions variables.
- **Risk:**
  - Production analytics is always on, and switching it off (for example, on counsel's advice about under-18 visitors) needs a workflow PR and a deploy.
  - CAPTCHA can't be turned on. Enabling Supabase bot protection without the site key would make every login and sign-up fail.
- **Action:** in a reviewed PR, add `NEXT_PUBLIC_ANALYTICS: ${{ vars.NEXT_PUBLIC_ANALYTICS }}` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY: ${{ vars.NEXT_PUBLIC_TURNSTILE_SITE_KEY }}` to the build step of `.github/workflows/deploy.yml`.
- **Depends on:** #6 merged (it adds the switch); owner approval of the workflow change.
- **Done when:** setting the repository variable to `off` produces a deploy with no GA and no Google origins in the CSP.

### F8 · GitHub Pages sends no security headers beyond HSTS
- **Severity:** Medium. **Priority:** P2. **Status:** OPEN · OWNER DECISION (hosting).
- **Evidence:**
  - `curl -I https://ajaysahuphysics.com/` returns only `Strict-Transport-Security`: no CSP header, `X-Frame-Options`, `X-Content-Type-Options` or `Referrer-Policy`.
  - A meta-tag CSP ignores `frame-ancestors` (`scripts/inject-csp.mjs:13-15` (#6); `SECURITY_REVIEW.md:98` (#6); `SECURITY_REVIEW.md:109` (#6)).
  - The source has no frame-busting code and no referrer meta tag.
- **Risk:**
  - **Clickjacking:** after #7, `/account` can be framed. "Remove this device's progress" takes two clicks, so a hidden frame could wipe a student's local progress. Account deletion needs DELETE typed in, which mitigates it.
  - **`nosniff`:** missing, but low risk: the site serves only its own static files.
  - **Referrer:** browser defaults (`strict-origin-when-cross-origin`) are acceptable.
  - **Low, not verified:** GA might record the one-time `?code=` on `/auth/callback/` before it is removed from the address bar (`src/lib/auth/exchange-code.ts:18-22`). The code is useless without the browser's verifier.
- **Action:**
  - Interim: on `/account`, hide or disable the actions when `window.top !== window.self`; skip GA on `/auth/*`.
  - Long term: a host that sends headers. Cloudflare Pages is assessed but not authorised.
- **Depends on:** the owner's hosting decision (long term).
- **Done when:** the interim guards ship with tests, or the site moves to a host that sends `frame-ancestors` and `nosniff`.

### F9 · No browser test of a production-configured build
- **Severity:** Medium. **Priority:** P0 for #6 and #7. **Status:** VERIFIED on staging (see Result) · live login check after #7 OPEN.
- **Evidence:**
  - CI builds with auth off on purpose (`.github/workflows/ci.yml:52-56`), so its E2E run (`.github/workflows/ci.yml:73-79` (#8)) never sees accounts switched on, and its CSP falls back to `*.supabase.co`.
  - Staging browser journeys ran on `npm run dev`, which doesn't inject the CSP.
  - No record was found of a static build with Supabase configured and the exact-origin CSP being tested in a browser. That combination is what #6 deploys for today's live login, and what #7 deploys.
- **Action:**
  - Build locally with the **staging** URL and publishable key, serve `out/`, and run the login and account journey under the CSP, checking for console errors.
  - Do this on #6 and again on #7. After each deploy, test login live.
- **Depends on:** the staging project (available).
- **Done when:** both runs pass with 0 CSP violations, and the result is recorded here.
- **Result (2026-11-21):**
  - #6 was merged before a separate #6 run. Instead, the live site at `2734e98` was audited read-only: 23 pages, with the CSP meta tag on every page, 0 CSP violations and 0 console errors, and the login dialog opens. The live CSP's `connect-src` names the production Supabase origin. No live sign-in was attempted.
  - `main` + #10 (contains #7) was built with `next build` and the **staging** URL and publishable key. The CSP was injected on 228 pages with `connect-src` set to the staging origin, and no production ref appears in the output. The build was served locally like GitHub Pages and never deployed.
  - The staging browser journey ran against that build with CSP reporting added: **15/15 passed**, 0 CSP violations, CSP meta on every navigation, 0 console errors, 0 failed requests. It covers a wrong password, login, session restore, the account page, export, sync shown unavailable, logout keeping device progress, deletion from the UI with the server user gone, and phone width.
  - Remaining: a live login check straight after #7 deploys.

### F10 · Schema-wide revokes against an unknown production schema
- **Severity:** High. **Priority:** P0 for the production database. **Status:** OPEN · OWNER DECISION.
- **Evidence:** `supabase/migrations/20261120000000_student_accounts.sql:400-402` revokes all table, sequence and function privileges across the whole `public` schema. It was safe on an empty staging project; production's `public` schema has not been inventoried.
- **Risk:** any existing production table, view or function in `public`, for example one created in the dashboard, loses its access.
- **Action:** with the owner's approval, run a read-only inventory of production's `public` schema (object names, owners, grants, no row data). If anything is there, scope the revokes to the Atlas objects.
- **Depends on:** owner approval; legal sign-off (F12) before any change.
- **Done when:** the inventory is recorded and the migration is confirmed safe for it.

### F11 · Rollback for partly completed releases
- **Severity:** Medium. **Priority:** P1. **Status:** DOCUMENTED (`PHASE_2_RELEASE.md` section 10) · pending-deletion step OPEN.
- **Evidence:**
  - #10 contains #7's commits, so the two can't be reverted independently.
  - `supabase/rollback/student_accounts_down.sql:27-29` drops `deletion_requests` and `deletion_log` with the other tables.
  - The script uses `IF EXISTS` throughout.
  - Whether the CLI wraps each migration file in its own transaction has not been verified.
- **Risk:**
  - Reverting #7 alone breaks #10's code.
  - Re-merging after a revert brings nothing back without a revert of the revert.
  - A database rollback loses pending deletion requests and the record of completed deletions.
- **Action:**
  - Revert in reverse order.
  - Before any database rollback, finish or export pending deletions and export `deletion_log`.
  - Optionally, add an export step to the rollback script itself.
- **Depends on:** nothing.
- **Done when:** the pending-deletion export is scripted or added to the rollback steps and checked on staging.

### F12 · Legal sign-off
- **Severity:** Critical (production database and sync). **Priority:** P0. **Status:** BLOCKED (counsel).
- **Evidence:**
  - Counsel hasn't reviewed DPDP compliance, verified parental consent for under-18s, the retention period, or GA4 for under-18 visitors.
  - Cloud sync is off in code (`src/lib/sync/policy.ts:15`) and in the database switches.
- **Action:** counsel review. No production database change, sweep or sync launch happens before sign-off. The retention job, the parental-consent process and the incident runbook depend on counsel's answers.
- **Depends on:** counsel.
- **Done when:** written sign-off exists and the owner authorises each production step.

### F13 · Draft privacy notice and a dependency advisory
- **Severity:** Low. **Priority:** P2. **Status:** OWNER DECISION (checklist below).
- **Evidence:**
  - #7 publishes `/privacy`, marked as a draft and not indexed (`src/app/privacy/page.tsx:5-10`; `src/app/privacy/page.tsx:26`).
  - Its statement that searches aren't sent to GA holds: no search terms are put in page URLs.
  - `npm audit --omit=dev` reports 1 moderate advisory, in a build-time tool.
- **Action:** the owner works through the decision checklist below before #7 merges. Recheck the advisory at each dependency update.
- **Depends on:** owner and counsel.
- **Done when:** the checklist is completed and the decision is recorded here.

#### Owner decision checklist: privacy notice
Choose **one** option:
- [ ] **Option A: publish as the final notice.** Requires every item in "Before publishing" below.
- [ ] **Option B: keep it as a draft and not indexed** (as #7 currently ships it). Requires every item in "Before keeping it as a draft" below.
- [ ] **Option C: hold the page back.** Remove `/privacy` from #7, or don't merge #7, until counsel approves the wording.

Before publishing (Option A):
- [ ] Counsel has reviewed and approved the wording in writing (F12).
- [ ] Every statement matches the site's behaviour on the day it ships:
  - progress is kept in the browser only;
  - accounts hold an email address, a hashed password and sign-in records;
  - no cloud copies of study data;
  - GA4 is in use.
- [ ] The GA4 statement matches the decision on analytics for under-18 visitors (F7, F12).
- [ ] The account-deletion statement matches what is live. While deletion is gated off (F5), the notice must point to the Contact page rather than a self-service button.
- [ ] The Contact route for data requests works, and someone is assigned to answer it.
- [ ] The "Draft notice, pending legal review" banner is removed, an effective date and version are added, and indexing is switched on (`robots: { index: true }`). These are code changes, in a reviewed PR.
- [ ] The page is linked from the site footer, and the version is recorded for consent records.

Before keeping it as a draft (Option B):
- [ ] The owner accepts that the draft notice stays **publicly accessible** at `/privacy` without counsel review, although it is marked as a draft and excluded from search-engine indexing.
- [ ] `robots: { index: false }` stays in place, and the page isn't listed in the sitemap.
- [ ] No consent is collected against the draft. Cloud sync stays off (`CLOUD_SYNC_ENABLED = false`).
- [ ] The deletion and contact statements are accurate for what is live (see F5).
- [ ] A review date is set for replacing the draft with a reviewed notice.

Record:
- [ ] Decision (A, B or C): ______
- [ ] Decided by: ______. Date: ______.
- [ ] Counsel review reference, if any: ______.

## Release dependencies
1. **Done:** #9, #11, #6, #8 and #13 are merged and deployed (squash). #12 is closed, superseded by #13.
2. **Independent PRs onto `main`**, each after an updated branch and green CI: #14 (accessibility), #16 (H1) and #17 (M1). **#16 must be merged before the release stack** (its keyboard check expects no login control).
3. **The release stack, #7 → #10 → #15:**
   - **Before merging:** the production Auth redirect URLs, the Site URL check and the password length (F3); the F13 decision; F7 is optional.
   - **Recommended:** merge #15 into #10's branch and #10 into #7's branch (no deploys), update #7 with `main` (keep the stack's `AuthButton.tsx`), wait for green CI, then squash-merge #7 once.
   - **The alternative** (squash #7, then `rebase --onto` #10 and #15) is in `PHASE_2_RELEASE.md` section 1. Don't use GitHub's "Update branch" on #10 or #15.
   - F9 has passed on staging.
4. **Production database:** in this order:
   1. F12 (legal), then F10 (inventory) and a backup;
   2. the release stack merged and deployed (it has the F4 fix and follows the gate);
   3. the function deployed before the migrations;
   4. **all four** migrations together, in this order:
      1. `20261120000000_student_accounts.sql`: tables and functions;
      2. `20261121000000_service_role_grants.sql`: grants on those tables;
      3. `20261122000000_account_deletion_gate.sql`: the gate, which replaces `request_account_deletion()`;
      4. `20261122010000_deletion_rate_limit.sql`: rate limits, which replace it again.

      Never apply the first two without the last two;
   5. the scheduler configured (`vars.ATLAS_SWEEP_URL`, `secrets.ATLAS_DELETION_SWEEP_SECRET`, `vars.ATLAS_DELETION_SWEEP_ENABLED`).
5. **Opening the deletion gate:** only after the staged verification in `PHASE_2_RELEASE.md` section 9, C.3:
   1. a full staging test with the gate open;
   2. non-destructive production checks with the gate off, including rejection of deletion requests;
   3. recorded evidence;
   4. the owner's explicit approval.

   The controlled production end-to-end test follows, and the gate is closed immediately if it fails (F5).
6. **Cloud sync:** after F12 and the owner's separate authorisation (`PHASE_2_RELEASE.md` section 9, D). Opening the deletion gate doesn't enable cloud sync.
7. **Turning the accounts UI on (ending H1):** a separate, owner-approved PR, after F3, F12 and F13. Then the live login, sign-up and reset checks, and the 7 manual inbox checks (E1).

## Merge readiness
| PR | Ready? | Waiting on |
|---|---|---|
| #9 | Merged (squash), deployed | — |
| #11 | Merged (squash), deployed | — |
| #6 | Merged (squash), deployed | — |
| #8 | Merged (squash), deployed | — |
| #13 (replaces #12) | Merged (squash), deployed `2734e98` | — |
| #12 | Closed, superseded by #13 | — |
| #14 | Yes, with approval (independent) | F2 (update branch, green CI) |
| #16 | Yes, with approval (independent); before the stack | F2 |
| #17 | Yes, with approval (independent) | F2 |
| #7 | No | F3, the F13 decision, #16 on `main`; merge as part of the collapsed stack (with #10 and #15) |
| #10 | No | Collapse into #7's branch (or `rebase --onto` after #7 is squashed) |
| #15 | No | Collapse into #10's branch (or `rebase --onto` after #10) |

## Post-deploy verification (2026-11-21)
Read-only checks of the live site after #13 deployed, plus local gates and a staging run. No production database access; staging used synthetic accounts only.

| Check | Result |
|---|---|
| Deploy | "Deploy to GitHub Pages" succeeded for `2734e98`; the live site serves that build |
| Live crawl | 49 pages and 36 external links; 0 broken internal links. One Instagram link couldn't be checked from the audit machine (its TLS chain is intercepted locally), so it is unverified, not broken |
| Live browser | 23 pages: 0 console errors, 0 CSP violations, no horizontal overflow at 360, 390, 768 or 1280 px |
| Live journeys | 14/14: the mobile menu opens and closes with Escape and navigates; the dashboard and its 5 cards render with empty and seeded synthetic storage; all 6 dashboard routes; a chapter bookmark; the login dialog opens (not submitted) |
| Accessibility | 1 defect: on `/jee/`, the JEE Main / JEE Advanced picker had headings inside buttons and skipped from h1 to h3. Fixed in PR #14 (`phase-2-5-jee-picker-a11y`, not merged); the audit now covers `/jee/` and `/neet/`, and fails without the fix |
| Staging RLS probe | 25/25: anonymous reads denied on all 11 tables; A versus B read, update, insert-as and delete blocked; students can't switch sync on, upload study data or change `app_config`. The sync switches were `'false'` before, during and after; staging ended with 0 users and 0 rows |
| Not run | `npm run test:staging` (23 checks) switches `adult_sync_permitted` on in staging for its run, so it was not run, to keep sync off throughout. Its last result is 23/23 (`supabase/README.md`). **Replaced on 2026-11-22** by `npm run test:staging:release` (never enables sync): 63/63 |
| Live audit, 2026-11-22 | The same checks again: 14/14 journeys, 0 broken links, 0 overflow. **New defect M1:** React error #418 (×6) on `/dashboard/activity/` the day after the build; fix in #17. `/jee/` still pending #14 |
| Manual inbox checks | **NOT VERIFIED.** The 7 inbox checks in `supabase/README.md` (confirmation, reset, link reuse) have no recorded result (E1) |
| Dependencies | `npm audit`: 14 advisories (5 high, 9 moderate), all in build or dev tooling; production tree: 1 moderate (`baseline-browser-mapping`, build time only). No upgrades made |

Every merge deploys and needs the owner's explicit approval.
