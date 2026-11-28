# Supabase: student accounts (Phase 2B)

**Staging first. Never apply anything here to production** without the owner's explicit approval of that exact step. Formal legal review comes after launch (owner decision I), so no legal approval is claimed. The production site keeps working with none of this applied: progress stays in the browser.

## Contents
| Path | What |
|---|---|
| `migrations/20261120000000_student_accounts.sql` | Profiles, append-only consents, study tables (bookmarks, checklist items, revision rounds, mistakes, goals, streaks), deletion requests and a PII-free deletion log. Row Level Security on every table; database-side consent gate; per-student row limits; export and deletion functions. |
| `migrations/20261121000000_service_role_grants.sql` | Least privilege for the server role: SELECT on the Atlas tables, UPDATE of `app_config.value`, INSERT into `consents` (the verified parental-consent process). No table is created. |
| `migrations/20261122000000_account_deletion_gate.sql` | The server-side deletion gate: `app_config` key `account_deletion_enabled`, created `'false'`; `account_deletion_enabled()`, true only for exactly `'true'` (a missing row or any other value is off); `request_account_deletion()` replaced so it refuses with `deletion-disabled` while the gate is off. |
| `migrations/20261122010000_deletion_rate_limit.sql` | Per-user deletion rate limits: the `deletion_rate` table (RLS on, no client access, server role read-only) and `deletion_rate_wait()` (server role only); `request_account_deletion()` replaced again, adding 5 calls per hour after the sign-in and gate checks. |
| `migrations/20261123000000_deletion_log_sequence_privilege.sql` | Least privilege (T-14): removes every client privilege on `deletion_log_id_seq`. The blanket sequence grant in the first migration had given `authenticated` `USAGE` on it. **Applied to staging on 2026-11-23** (owner decision F); not applied in production |
| `config.toml` | Only the `delete-account` function's `verify_jwt = false` pin. Never run `supabase config push` with it. |
| `migrations/20261124000000_require_verified_email_for_sync.sql` | Cloud copies need a verified email address (owner decisions, 2026-11-23). An unverified account can neither **read** nor **write** its cloud-sync rows: the six study tables' SELECT policies require `email_verified()`, and their INSERT and UPDATE policies call `sync_allowed()`, which requires it. `enable_sync()` returns `email-not-verified`. Export and account deletion stay available. **Limitation:** existing Auth accounts are trusted as Supabase records them, and while "Confirm email" is off Supabase confirms new users automatically. So production "Confirm email" must be on before this is relied on. **Applied to staging on 2026-11-27**; not applied in production |
| `migrations/20261126000000_remove_age_restrictions.sql` | **No age limit** (owner decision, 2026-11-26). `sync_allowed()` and `enable_sync()` lose every age rule: a profile, no pending deletion, a verified email, the current `privacy` and `cloud-sync` consents and the launch switch are all a student needs, at any age. The `terms` consent is no longer required (no Terms of Use document exists yet). `atlas_protect_profile()` no longer switches sync off for an age band; `parental_consent_verified()` is dropped; constraint `consents_no_parental` refuses any new `parental` consent or `parent-verified` method, from any role. `age_band` and `minor_sync_permitted` stay but nothing reads them. A product decision, not a statement of legal compliance. **Applied to staging on 2026-11-27**; not applied in production |
| `migrations/20261126100000_consent_recorded_at_server_only.sql` | Students can no longer set `consents.recorded_at` (or `id`): they insert only `user_id, kind, version, granted, method`, the server role's columns. A narrowing only; existing rows are untouched. **Not applied anywhere** |
| `migrations/20261127000000_withdraw_cloud_copies.sql` | Decision J: withdrawing cloud-copy consent deletes the six cloud tables' rows. The fail-closed withdrawal marker; the upload guard (profile row locked FOR SHARE); the consent cap (a current-version first refusal and a genuine withdrawal are always recorded; repeats are skipped; past 200 rows, fresh grants are limited to 20 genuine changes per rolling 24 hours); profile-first lock order for account deletion; `profiles.cloud_generation`. **Not applied anywhere** |
| `rollback/withdraw_cloud_copies_down.sql` | Rollback of `20261127000000` only (step 1 of the full procedure): restores the flat 200-row cap and the earlier `purge_user_data()` and `request_account_deletion()`; changes no consent row; doesn't touch `20261126100000` |
| `rollback/consent_recorded_at_server_only_down.sql` | Rollback of `20261126100000` only (step 2): gives students back INSERT on every consents column. Refuses while `20261127000000` is applied |
| `rollback/verified_email_down.sql` | Non-destructive rollback of `20261124000000` only (restores both functions, drops `email_verified()`; tested in PGlite). Refuses to run while `20261126000000` is applied |
| `rollback/remove_age_restrictions_down.sql` | Non-destructive rollback of `20261126000000` only: restores the four functions exactly as `20261124000000` left them and drops `consents_no_parental` (tested in PGlite). Run it **before** `verified_email_down.sql` |
| `rollback/student_accounts_down.sql` | **Destructive** rollback of all nine migrations (owner approval only; tested in PGlite). Its header gives the full procedure, newest first: steps 1–4 are the four individual rollbacks above (each refuses while a newer migration is applied), step 5 is this file. It is also safe on its own, and its history cleanup covers all nine. `db-rollback.test.ts` checks that every migration file is covered and runs both paths. |
| `functions/delete-account/` | Edge Function that deletes a student's account after they request it (service-role key stays in Supabase secrets). `handler.ts` is the tested core. |
| `tests/supabase-auth-shim.sql` | **Test-only** stand-in for Supabase's `auth` schema and roles, so the migration can be tested in PGlite. Never apply it to a real project. |
| `rollback/export_before_rollback.sql` | **Read-only** export of pending deletion requests and the deletion log, to run **before** any rollback (T-18). The rollback refuses to run while either table has rows unless it starts with the export's `ack` (`set atlas.rollback_exported = '<ack>';`). The ack is `v2:<pending>/<logged>:<sha256>`, a hash of every field of every exported row, so it must match the current **content**, not just the counts. The rollback locks both tables and recomputes it before any drop (`db-rollback-guard.test.ts`). The output holds user ids: store it privately and encrypted. |

## Safety switches (all off)
- `app_config.adult_sync_permitted` is **the cloud-sync launch switch for every student** (its name is historical; there is no age limit since `20261126000000`). It stays `'false'` until the owner authorises activation (decision L), as its own production step. `app_config.minor_sync_permitted` is inert (nothing reads it) and stays `'false'`. Only the service role can change them.
- `app_config.account_deletion_enabled` (the deletion gate) stays `'false'` until the staged verification in `docs/PHASE_2_RELEASE.md` section 9, C.3 and the owner's explicit approval. Only staging's `test:staging:deletion-gate` opens it, on staging only and for that run, and it always closes it again. Opening it never enables sync.
- Students can't change any of these switches. A signed-in student's attempt to update `app_config` is **deliberately denied**: there is no client policy or grant, and `test:staging:release` checks this every run.
- `CLOUD_SYNC_ENABLED` in `src/lib/sync/policy.ts` is `false`, so the site never sends study data.
- There is no age-based rule and no parental-consent requirement (since `20261126000000`). No role can record a `parental` consent or use the `parent-verified` method.

## Tests (no Docker needed)
`npx vitest run src/lib/__tests__/db-rls.test.ts` applies all nine migrations, in order, to an in-process Postgres (PGlite) and runs as `anon`, `authenticated` (with a JWT `sub`) and `service_role`. It checks:
- anonymous visitors get no access;
- students are isolated from each other;
- the consent gate can't be bypassed through direct API calls;
- no age rule applies, and no parental consent can be recorded (also `db-no-age-restrictions.test.ts`);
- limits, constraints, export, an idempotent deletion request, and a retry-safe purge;
- withdrawal, the consent cap, lock order and the cloud generation (`db-withdraw-cloud-copies.test.ts`, `db-consent-recorded-at.test.ts`); real two-session races (`db-withdraw-concurrency.test.ts`, against a disposable local PostgreSQL only, and in the `db-concurrency` CI job).

## Staging setup (owner actions, in order)
The staging project is **`ajaysahuphysics-staging`** (Tokyo, `ap-northeast-1`, Free plan).
- **Synthetic data only.** Tokyo is fine for staging. The **production** region is a legal question (L-11).
- **Free-plan projects pause after a period of inactivity.** Restore the project from the dashboard if the suite can't connect.

All CLI commands use the pinned CLI `npx supabase@2.122.1` (2.x line; the deploy flags below are verified against it). **Never run any of them against the production project.**

### 1. Local secrets file (no network)
1. Copy `supabase/staging/staging.env.example` to **`.env.staging.local`** in the repository root.
   - It is git-ignored (`.env*`), and Next.js never loads it.
2. In your editor, fill it from the **staging** dashboard (Project Settings → API Keys).
   - The **publishable** key (`sb_publishable_…`) goes in `STAGING_SUPABASE_PUBLISHABLE_KEY`; the **secret** key (`sb_secret_…`) goes in `STAGING_SUPABASE_SECRET_KEY`.
   - Legacy `anon` / `service_role` keys are also accepted, but Supabase is deprecating them by the end of 2026.
3. Never paste keys into a chat, an issue, a PR, a commit or a GitHub secret.

### 2. Check the setup (no network)
```
npm run staging:check
```
It prints the target ref and the key **kinds**, never the values. It refuses when any of these is wrong:
- the file isn't ignored, or it is tracked;
- the target is production or unconfirmed;
- the keys are swapped or of the wrong kind;
- a legacy key belongs to another project;
- any env file Next.js loads (`.env`, `.env.local`, `.env.development*`, `.env.production*`) contains a secret key.

### 3. Link the CLI to staging (read-only so far)
```
npx supabase@2.122.1 login                                  # browser sign-in; the token stays in your user profile, not the repo
npx supabase@2.122.1 link --project-ref <staging-ref>       # asks for the STAGING database password; writes supabase/.temp/ (git-ignored)
npx supabase@2.122.1 db push --dry-run                      # lists the migrations it WOULD apply; applies nothing
```
`supabase/config.toml` is committed and holds only the function's `verify_jwt = false` pin (audit F6). Don't regenerate it with `supabase init`, and **never run `supabase config push`**: the file holds no Auth or API settings on purpose, so a push could reset the remote project's settings to CLI defaults.

### 4. Apply the migrations (needs the owner's go-ahead)
```
npx supabase@2.122.1 db push --linked                       # applies supabase/migrations/ to the LINKED STAGING project
```
**Order and dependencies:**
1. **`20261120000000`** creates the tables and functions.
2. **`20261121000000`** depends on those tables (grants).
3. **`20261122000000`** depends on `app_config` and replaces `request_account_deletion()`.
4. **`20261122010000`** depends on the gate function and replaces `request_account_deletion()` again.
5. **`20261123000000`** depends on `deletion_log` (from the first) and revokes client privileges on its sequence (T-14).
6. **`20261124000000`** replaces `sync_allowed()` and `enable_sync()` (from the first) to require a verified email address.
7. **`20261126000000`** depends on the sixth (`email_verified()`) and replaces `sync_allowed()`, `enable_sync()` and `atlas_protect_profile()` again, without any age rule; it drops `parental_consent_verified()`.
8. **`20261126100000`** depends on `consents` (from the first).
9. **`20261127000000`** depends on the first five; it replaces `purge_user_data()` and `request_account_deletion()` (from the fourth) and the `consents_cap` trigger. **Apply it before any app version that enables cloud sync:** the sync engine reads `profiles.cloud_generation`.

The CLI applies them in filename order. In production, apply them **one at a time, each separately approved**, consecutively in one maintenance window (`docs/PHASE_2_RELEASE.md` section 9, C.2.4), after deploying the gated `delete-account` function (step 5). Until the tables exist, it refuses every request and changes nothing. **Never apply the first two without the third and fourth:** that would create the account tables without the deletion gate and its rate limits. On staging, all seven are applied: the first five by 2026-11-23 (`20261123000000` after a fresh dry run), then `20261124000000` and `20261126000000` on 2026-11-27 after a dry run listing exactly those two; history matches local. Production: none applied. The eighth and ninth (`20261126100000`, `20261127000000`) aren't applied anywhere.

### 5. Deploy the deletion function (staging)
```
npx supabase@2.122.1 functions deploy delete-account --project-ref <staging-ref> --no-verify-jwt --use-api
npx supabase@2.122.1 secrets set --project-ref <staging-ref> ATLAS_DELETION_SWEEP_SECRET=<random 32+ characters>
npx supabase@2.122.1 secrets set --project-ref <staging-ref> ATLAS_ALLOWED_ORIGINS=http://localhost:3000
```
- **`--no-verify-jwt`:** also pinned in `supabase/config.toml`, so a deploy without the flag is still correct (verified on staging 2026-11-22: `verify_jwt: false` with the flag omitted). The platform's gateway check only understands legacy JWT keys, and it would block the sweep. The function verifies every user request itself with the Auth server, and checks the sweep secret in constant time.
- **`--use-api`:** builds the function on Supabase's side, so no Docker is needed.
- **Server key:** the function uses the project's secret key (`SUPABASE_SECRET_KEYS`), with the legacy service-role key as a fallback. Both are injected by Supabase; no key is set by hand.
- **`ATLAS_ALLOWED_ORIGINS`:** staging only, so the account page on `npm run dev` can call the function. Production allows only `https://ajaysahuphysics.com`.

### 6. Staging Auth settings (dashboard)
- **Auth → URL configuration:**
  - site URL `http://localhost:3000`;
  - redirect URLs `http://localhost:3000/auth/callback/` and `http://localhost:3000/auth/reset-password/`.
- **Email confirmations:** on.
- **Minimum password length:** 10.
- **For browser checks:** create `.env.development.local` (git-ignored; loaded by `npm run dev` only, never by `npm run build`) with:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://<staging-ref>.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_…            # the PUBLISHABLE key; never the secret key
  ```
  Then run `npm run staging:check`; it refuses if a secret key ever lands in such a file.
- **Scheduled sweep:** `.github/workflows/deletion-sweep.yml` (hourly) runs `scripts/deletion-sweep.mjs`. It is inert until the repository variable `ATLAS_DELETION_SWEEP_ENABLED` is `true`, and it needs `vars.ATLAS_SWEEP_URL` (the function URL) and `secrets.ATLAS_DELETION_SWEEP_SECRET`. A failed run is the alert: pending or stale requests, requests outstanding while the gate is off, or any error. Against staging, run the script by hand with those two values in the environment.
- **CAPTCHA (optional):** enable Turnstile with Cloudflare's **test** secret `1x0000000000000000000000000000000AA`, and set `STAGING_TURNSTILE_TEST_TOKEN=XXXX.DUMMY.TOKEN.XXXX` in `.env.staging.local`.
  - For production the order matters: put the site key in the build first, then turn on bot protection in Supabase, otherwise every sign-in is blocked.

### 7. The old staging suite (not used for the release)
> **Don't run this for the release** (owner decision, 2026-11-22). It switches staging's `adult_sync_permitted` on for its run, and cloud sync must never be enabled. Its deletion section also predates the deletion gate. Use `npm run test:staging:release` (step 10) instead. It is kept for reference only.
```
npm run test:staging
```
`supabase/staging/journey.staging.ts` runs the student journey against the **staging** project with two **synthetic** accounts. It is never part of `npm test` or CI.

**What it covers:**
- anonymous denial;
- generic sign-in errors, optional CAPTCHA rejection, session refresh;
- the consent gate and the under-18 protections;
- server-side validation and row limits;
- real two-device sync: existing local formats unchanged, local-only stores never uploaded, idempotent repeats, conflict merging, tombstones, an interrupted upload, account switching, 600 + 300 records;
- A-versus-B isolation (read, update, insert-as, delete);
- export;
- deletion (request, function, every row and the auth user gone, PII-free log, retry, no-auth refusal);
- the sweep secret;
- the other account staying unaffected.

**Safety:**
- `supabase/staging/guard.mjs` accepts **only** the staging project (an allow-list since #27). It refuses both production projects, any unknown project, unconfirmed targets, and swapped or foreign keys.
- For the run, the suite sets `adult_sync_permitted='true'` **in staging only**, and restores the previous value at the end.
- It deletes every account it creates.
- Evidence goes to `staging-evidence/<run>.json` (git-ignored), with keys and tokens redacted.

### 8. Browser journey against staging
With `npm run dev` running (staging values in `.env.development.local`, step 6):
```
npm run test:staging:browser
```
It creates one synthetic account (admin API, no email) and drives the real UI in headless Chrome:
- the wrong-password message, login, and the session restored on reload;
- the account page, account export, and sync shown as unavailable;
- logout keeping device progress;
- deleting the account from the UI: the server user is gone and device progress is kept;
- the account page at phone width.

The account is removed at the end, even after a failure.

### 9. Deletion gate (audit F5)
Account deletion is gated server-side by `app_config` `account_deletion_enabled` (migration `20261122000000`, created `'false'`). While it is off, `request_account_deletion()`, the function's user path and the sweep all refuse; a missing or unreadable gate counts as off. There are no exemptions, including for test accounts. Open or close it in the SQL editor of the intended project only, with the owner's approval:
```
update public.app_config set value = 'true', updated_at = now() where key = 'account_deletion_enabled';   -- 'false' to close
```
Staging check (staging linked, gate `'false'` at the start):
```
npm run test:staging:deletion-gate
```
**Rate limits** (migration `20261122010000`): per verified user, `request_account_deletion()` allows 5 calls per hour and the function's user path 6 per 10 minutes (429 with `Retry-After`). The sweep and the operator procedure (`purge_user_data` plus deleting the auth user) are never limited.

The check opens the staging gate for the run and always closes it again. It removes every synthetic account, and never writes the sync switches. Note: the deletion section of `npm run test:staging` needs the gate open, and that suite hasn't been run against the gated schema.

### 10. Safe release check (replaces `npm run test:staging`)
```
npm run test:staging:release
```
`scripts/staging/release-check.staging.mjs` is the release verification that **never enables cloud sync**.
- **Its rules,** enforced on its source by `staging-release-check.test.ts`:
  - The check makes one deliberate authenticated student-side UPDATE attempt against `app_config`. The server must deny it. No successful `app_config` modification occurs, and the script's server key never writes to `app_config`.
  - it stops before doing anything unless `adult_sync_permitted`, `minor_sync_permitted` and `account_deletion_enabled` are all `'false'`, and checks them again at the end;
  - it stores no study data: its only study-table writes are single synthetic rows the server must refuse, with 0 rows stored;
  - it uses synthetic accounts (admin API, no email), all removed.
- **What it verifies:**
  - anonymous denial (12 tables, 5 functions);
  - sign-in with generic errors, session refresh, and sign-out revoking the refresh token;
  - own-profile and append-only consent rules;
  - the sync safeguards with every precondition met (a student with full consent: `sync_allowed()` false and `enable_sync()` "not-available-yet"; a student who declares under-18 gets the same answer, with `20261126000000` applied; uploads refused on all 6 study tables; a student can't set `sync_enabled`);
  - the denied student-side UPDATE attempt against `app_config` (above): a signed-in student tries to set `adult_sync_permitted` to `'true'`. The check passes only if the server denies it and the value stays `'false'`. No successful `app_config` modification occurs, so neither sync permission nor the deletion gate changes;
  - A-versus-B isolation;
  - export (own data only, documented shape);
  - deletion refusal with the gate off (request, function and sweep; nothing recorded).
- **Not verified, on purpose:**
  - cloud sync itself (two devices, merging, tombstones, interrupted uploads, account switching, large syncs), because it needs sync on;
  - the inbox checks below;
  - CAPTCHA;
  - deletion end to end (step 9);
  - browser login (F9, step 8). The browser journey logs in through the login button, which is hidden while `ACCOUNTS_UI_ENABLED` is `false` (H1), so it runs only against a release-candidate build with the switch on.

### 11. Verified-email check (decision K)
```
npm run test:staging:verified-email
```
`scripts/staging/verified-email.staging.mjs` needs `20261124000000` and `20261126000000` applied. It has the same rules as step 10 (enforced on its source by `staging-verified-email-check.test.ts`): it never writes `app_config`, stops unless all three switches are `'false'`, stores no study data, and uses synthetic accounts only.
- **What it verifies:** an unconfirmed account can't sign in, so it never gets a session; a confirmed account is trusted as Supabase records it (`email_verified()` true) and still gets "not-available-yet" while the switch is off; that account can't set `sync_enabled`, upload to the six study tables, change a launch switch or record a parental consent; `anon` can't call `email_verified()`.
- **Clean-up:** `purge_user_data` and `deleteUser` are attempted and checked separately for each account; removal must be confirmed (not found), and a list of Auth users must show no account from the run. That list only detects; it never deletes. Each purge adds one PII-free row to `deletion_log` (2 per run).
- **Not verified here:** an authenticated **unverified** account's reads of the study tables. No unverified session exists while "Confirm email" is on, and planting rows would break the no-study-data rule. That read policy is covered by `db-verified-email.test.ts`.

### Staging verification record
| Date | Item | Result |
|---|---|---|
| 2026-11-21 | Migrations `20261120000000`, `20261121000000` applied to `wtuifivaxnhdnfwjsayk` (after dry runs) | Applied; history matches local |
| 2026-11-21 | Catalog check (read-only `db query`) | 11 tables with RLS, owned by `postgres`; 11 functions with `search_path=""`; grants as designed (students: 5 functions; profiles 4 columns; service_role read-only plus app_config value and consents insert) |
| 2026-11-21 | `db advisors` | No errors. 5 WARN `authenticated_security_definer_function_executable` (intentional entry points, each scoped to `auth.uid()`); INFO only otherwise |
| 2026-11-21 | `npm run test:staging` | 23/23 passed |
| 2026-11-21 | `npm run test:staging:browser` | 15/15 passed; 0 console errors; 0 failed requests |
| 2026-11-21 | End state | 0 users and 0 student rows; switches `false` |
| 2026-11-22 | Migration `20261122000000` applied (after a dry run listing only it) | Applied; history matches local |
| 2026-11-22 | Gated `delete-account` deployed without `--no-verify-jwt` | `verify_jwt: false` from `config.toml` |
| 2026-11-22 | `npm run test:staging:deletion-gate` | 30/30: gate off (request, function and sweep rejected; nothing recorded), gate open (API deletion with a deletion-log row; planted request swept), gate closed again (alert fires; operator procedure completes the outstanding request) |
| 2026-11-22 | Account page, production-configured build | Gate off: button disabled with DELETE typed, note shown, 8/8. Gate open for the run: browser journey 15/15, 0 CSP violations |
| 2026-11-22 | End state | 0 users and 0 rows; deletion gate and sync switches `'false'` |
| 2026-11-22 | Migration `20261122010000` (rate limits) applied after a dry run; function redeployed (v3, `verify_jwt: false`) | History matches local |
| 2026-11-22 | `npm run test:staging:deletion-gate` with stage R | 38/38. 10 parallel requests: exactly 5 accepted. 10 parallel function calls: exactly 6 through and 4 x 429 with `Retry-After`. Support-assisted deletion of a rate-limited student works; 5 parallel deletions of one account give no 5xx |
| 2026-11-22 | Account page (production-configured build) | Gate off 8/8; journey 15/15 with the gate open; 0 CSP violations |
| 2026-11-22 | `db advisors --type security` | 0 errors. 6 WARN security-definer entry points (the 5 existing plus `account_deletion_enabled`, intended); 4 INFO RLS with no policy (tables with no client access, intended) |
| 2026-11-22 | End state | 0 users; 0 rows in student tables, `deletion_requests` and `deletion_rate`; gate and sync switches `'false'`. `deletion_log` keeps its PII-free hash rows from the synthetic deletions (by design) |
| 2026-11-22 | `npm run test:staging:release` (safe release check) | 63/63. Started and ended with both sync switches and the deletion gate `'false'`; 3 synthetic accounts removed; 0 rows in all student tables, `deletion_requests` and `deletion_rate` |
| 2026-11-26 | `db push --dry-run` from #25 (`7847cda`), CLI 2.122.1 | Would push exactly `20261124000000` and `20261126000000`; nothing applied |
| 2026-11-27 | Migrations `20261124000000` and `20261126000000` applied (`db push --linked`, exit 0) | History read back: all seven applied. `email_verified()` exists (`anon` can't run it); `parental_consent_verified()` dropped; `consents_no_parental` present. Switches `'false'` before and after |
| 2026-11-27 | `npm run test:staging:release` on `7847cda` | 63/63, with migration 7 (a student who declares under-18 gets "not-available-yet" like everyone). Switches `'false'` at start and end; 3 synthetic accounts removed (0 Auth users after); 0 rows in the 10 application tables; 3 `deletion_log` rows (`rows_deleted` 4, 3, 0) |
| 2026-11-27 | `npm run test:staging:verified-email` (step 11; run on `7847cda` with this script, before it was committed) | 38/38. Unconfirmed account refused at sign-in (no session); confirmed account `email_verified()` true, "not-available-yet", every bypass refused. Clean-up: purge and delete OK for both accounts, removal confirmed, no account from the run left. Read back independently: 0 Auth users, 0 rows in the 10 application tables, switches `'false'`, 2 `deletion_log` rows (`rows_deleted` 0 and 3). Not verified: an unverified session's study-table reads (no such session exists; PGlite covers the policy) |

### Manual staging checks (needs a real inbox)
**Status: NOT VERIFIED.** No result has been recorded for any of the 7 checks below. They are required before the accounts UI is turned on (tracker E1).
Use a test inbox you control, on `npm run dev` with the staging values in `.env.development.local` (step 6). Do these with that inbox:
1. Sign up: the confirmation email arrives; its link opens `/auth/callback/`, signs you in, and the code disappears from the address bar.
2. Open the same link again: you see the "link can't be used" message, not an error page.
3. Open the link in another browser: you see the "open it in the browser where you signed up" message.
4. Forgot password: the reset email arrives; `/auth/reset-password/` sets a new password; the old password no longer works.
5. Signing up again with the same email shows the same "check your email" text as a new email.
6. Log out: progress on the device is still there.
7. Account page: export downloads JSON; deletion asks you to type DELETE, then you can no longer sign in.
