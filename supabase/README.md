# Supabase: student accounts (Phase 2B)

**Staging first. Never apply anything here to production** without the owner's written approval and the legal sign-off tracked privately. The production site keeps working with none of this applied: progress stays in the browser.

## Contents
| Path | What |
|---|---|
| `migrations/20261120000000_student_accounts.sql` | Profiles, append-only consents, study tables (bookmarks, checklist items, revision rounds, mistakes, goals, streaks), deletion requests and a PII-free deletion log. Row Level Security on every table; database-side consent gate; per-student row limits; export and deletion functions. |
| `migrations/20261121000000_service_role_grants.sql` | Least privilege for the server role: SELECT on the Atlas tables, UPDATE of `app_config.value`, INSERT into `consents` (the verified parental-consent process). No table is created. |
| `migrations/20261122000000_account_deletion_gate.sql` | The server-side deletion gate: `app_config` key `account_deletion_enabled`, created `'false'`; `account_deletion_enabled()`, true only for exactly `'true'` (a missing row or any other value is off); `request_account_deletion()` replaced so it refuses with `deletion-disabled` while the gate is off. |
| `migrations/20261122010000_deletion_rate_limit.sql` | Per-user deletion rate limits: the `deletion_rate` table (RLS on, no client access, server role read-only) and `deletion_rate_wait()` (server role only); `request_account_deletion()` replaced again, adding 5 calls per hour after the sign-in and gate checks. |
| `config.toml` | Only the `delete-account` function's `verify_jwt = false` pin. Never run `supabase config push` with it. |
| `rollback/student_accounts_down.sql` | **Destructive** rollback of all four migrations (owner approval only; tested in PGlite). |
| `functions/delete-account/` | Edge Function that deletes a student's account after they request it (service-role key stays in Supabase secrets). `handler.ts` is the tested core. |
| `tests/supabase-auth-shim.sql` | **Test-only** stand-in for Supabase's `auth` schema and roles, so the migration can be tested in PGlite. Never apply it to a real project. |

## Safety switches (all off)
- `app_config.adult_sync_permitted` and `app_config.minor_sync_permitted` stay `'false'` until legal sign-off. Only the service role can change them.
- `app_config.account_deletion_enabled` (the deletion gate) stays `'false'` until the staged verification in `docs/PHASE_2_RELEASE.md` section 9, C.3 and the owner's explicit approval. Only staging's `test:staging:deletion-gate` opens it, on staging only and for that run, and it always closes it again. Opening it never enables sync.
- Students can't change any of these switches. A signed-in student's attempt to update `app_config` is **deliberately denied**: there is no client policy or grant, and `test:staging:release` checks this every run.
- `CLOUD_SYNC_ENABLED` in `src/lib/sync/policy.ts` is `false`, so the site never sends study data.
- Students under 18 can't enable cloud copies without the minors switch **and** a `parental` consent recorded with method `parent-verified`, which only a verified server process can insert.

## Tests (no Docker needed)
`npx vitest run src/lib/__tests__/db-rls.test.ts` applies all four migrations, in order, to an in-process Postgres (PGlite) and runs as `anon`, `authenticated` (with a JWT `sub`) and `service_role`. It checks:
- anonymous visitors get no access;
- students are isolated from each other;
- the consent gate can't be bypassed through direct API calls;
- the under-18 rules hold;
- limits, constraints, export, an idempotent deletion request, and a retry-safe purge.

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

The CLI applies them in filename order. Apply all four together. In production, deploy the gated `delete-account` function (step 5) **before** applying them. Until the tables exist, it refuses every request and changes nothing. **Never apply the first two without the last two:** that would create the account tables without the deletion gate. On staging, all four are applied (history matches local, 2026-11-22). Production: none applied.

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
- `supabase/staging/guard.mjs` refuses the production project, unconfirmed targets, and swapped or foreign keys.
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
  - the sync safeguards with every precondition met (adult with full consent: `sync_allowed()` false and `enable_sync()` "not-available-yet"; under-18 with full consent: "not-available-for-under-18"; uploads refused on all 6 study tables; a student can't set `sync_enabled`);
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
