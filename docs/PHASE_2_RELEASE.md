# Phase 2 release: student platform

Technical release notes for the Phase 2 student platform. Legal and privacy review material is kept privately. **Cloud sync of study data stays OFF**, in code (`CLOUD_SYNC_ENABLED = false`) and in the database (`app_config` switches `'false'`), until counsel signs off and the owner authorises launch.

## 1. Pull requests and merge order
| Order | PR | Scope |
|---|---|---|
| 1 | #9 | Next.js 16.2.9 → 16.4.6 (clears all Next.js advisories) |
| 2 | #6 | Strict hash-based Content Security Policy on every page; safe JSON-LD; optional CAPTCHA origin; build-time analytics switch (default on) |
| 3 | #8 | Study pages (bookmarks, mistakes, revision, activity); navbar overflow fix; accessibility fixes; E2E and keyboard checks, also in CI |
| 4 | #12 (on #8) | Five-card dashboard overview; secondary cards on the study pages and the new `/dashboard/progress/` |
| 5 | #11 | Chapter pages scrolled sideways on phones; dashboard hydration error; duplicate-question validation |
| 6 | #7 | Accounts (PKCE login, generic errors, optional CAPTCHA, account page, export, deletion); database schema with RLS; sync engine (off); lazy Supabase client |
| 7 | #10 (on #7) | Staging tooling and verification suites; deletion-function key and CORS handling; rollback script; this document |

Each merge into `main` deploys the site. #7 and #10 belong together: #10 holds the deletion-function fixes.

## 2. Architecture
- **Static export.** Next.js `output: "export"` on GitHub Pages; there is no server code in the site.
- **Local-first.** Study progress lives in the browser in 11 `atlas:*` localStorage stores. Their formats are frozen and tested (`student-data-compat.test.ts`).
- **Optional accounts** with Supabase Auth (PKCE email links). The Supabase client (~60 KB gzipped) loads only when needed: a saved session, the login dialog, or the account and auth pages (`src/lib/supabase-loader.ts`).
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

**Security review before staging:** all findings H-1, M-1 to M-3, L-2, L-3, L-5 and L-12 are fixed and covered by tests. M-4 (broad revokes) is safe on a fresh project; **check production's existing `public` objects before applying there.**

## 4. Environment variables (names only; values never committed)
| Where | Variable | Notes |
|---|---|---|
| Site build (public) | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable key only. Production values live in GitHub secrets used by `deploy.yml` |
| Site build (optional) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Enables CAPTCHA and its CSP origin |
| Site build (optional) | `NEXT_PUBLIC_ANALYTICS=off` | Removes GA4 and its CSP origins; default on |
| Local staging tests | `.env.staging.local` (`STAGING_SUPABASE_URL`, `STAGING_CONFIRM_REF`, `STAGING_SUPABASE_PUBLISHABLE_KEY`, `STAGING_SUPABASE_SECRET_KEY`, optional `STAGING_SWEEP_SECRET`, `STAGING_TURNSTILE_TEST_TOKEN`) | Git-ignored; never loaded by Next.js; checked by `npm run staging:check` |
| Local browser checks | `.env.development.local` | Staging URL + publishable key, for `npm run dev` only |
| Edge Function secrets | `ATLAS_DELETION_SWEEP_SECRET`, `ATLAS_ALLOWED_ORIGINS` (staging only) | Set with `supabase secrets set`. The server key comes from Supabase (`SUPABASE_SECRET_KEYS`) |

## 5. Staging
Project `ajaysahuphysics-staging`. Setup and the verification record are in [`supabase/README.md`](../supabase/README.md). Both migrations and the function are applied and deployed there, and verified:
- the catalog check;
- `db advisors`: no errors;
- `npm run test:staging` 23/23;
- `npm run test:staging:browser` 15/15.

## 6. Security controls
- **Content Security Policy** on every page; no `unsafe-inline` or `unsafe-eval` for scripts; verified in a browser with an injection control.
- **RLS, the consent gate and least-privilege grants**, as in section 3.
- **Authentication:**
  - generic error messages (no account enumeration);
  - PKCE; redirect allow-list in code;
  - password policy for new passwords: ≥ 10 characters, ≤ 72 bytes;
  - optional CAPTCHA.
- **The deletion function** is deployed with `--no-verify-jwt`, and authorises every request itself: the user's token is checked with the Auth server, and the sweep secret is compared in constant time.
- **Secrets:** none in the repository, its history or the build output. The service key never reaches browser code; `staging:check` refuses any secret in an env file Next.js loads.

## 7. Account export and deletion
- **Device export:** "Download this device's data" on `/account/` (all `atlas:*` stores).
- **Account export:** `export_my_data()` returns only the caller's rows, as documented JSON. It works with sync off.
- **Deletion:**
  1. `request_account_deletion()` records the request and stops uploads at once.
  2. The `delete-account` function runs `purge_user_data()` (all rows, plus a log entry holding only the hash) and deletes the login user.
  3. It's retry-safe; a scheduled sweep (`?sweep=1` with the sweep secret) completes pending requests.
- **Device progress** stays in the browser unless the student removes it.

## 8. Quality gates
| Gate | Command | In CI |
|---|---|---|
| TypeScript, ESLint | `npx tsc --noEmit`, `npm run lint` | Yes |
| Unit, integration, database and RLS tests (PGlite) | `npm test` | Yes |
| Static build plus CSP injection | `npm run build` | Yes |
| URLs, sitemap, canonicals, internal links | `node scripts/verify-build.mjs` | Yes |
| Post-build checks (legacy content, CSP) | `npm run test:build-output` | Yes |
| Browser E2E, accessibility audit, phone overflow, keyboard | `npm run test:e2e` | Yes (since #8) |
| Staging journey and browser journey | `npm run test:staging`, `npm run test:staging:browser` | No: manual, staging only |
| Migration dry run | `npx supabase@2.122.1 db push --linked --dry-run` | No: manual |

## 9. Production release runbook (each step needs the owner's explicit approval)
1. Merge the PRs in the order of section 1, one at a time. After each deploy, check the live site (routes, console, a phone).
2. **Before any production database change:**
   - legal sign-off for what will be stored;
   - an inventory of production's `public` schema (M-4);
   - a backup.
3. **Production Supabase**, after verifying the project ref:
   - `db push --dry-run`, then `db push --linked`;
   - deploy `delete-account` with `--no-verify-jwt --use-api`;
   - set `ATLAS_DELETION_SWEEP_SECRET` (no `ATLAS_ALLOWED_ORIGINS`);
   - schedule the sweep.
4. **Auth settings:**
   - redirect URLs for `/auth/callback/` and `/auth/reset-password/`;
   - minimum password length 10;
   - email confirmation;
   - CAPTCHA, if used: site key in the build **first**, then Supabase bot protection.
5. **Cloud sync** stays off until counsel approves. Enabling it means three steps: set the `app_config` switches, set `CLOUD_SYNC_ENABLED = true` in a reviewed PR, and deploy.

## 10. Rollback
- **Site:** revert the merge commit on `main` with a PR, which redeploys the previous build. Student progress is in browsers and is unaffected.
- **Database:** both migrations are additive. [`supabase/rollback/student_accounts_down.sql`](../supabase/rollback/student_accounts_down.sql) removes exactly what they created, leaving the `auth` schema untouched (tested in `db-rollback.test.ts`). **It is destructive:** use it only with the owner's approval, after an export.
- **Function:** `supabase functions delete delete-account`, or redeploy the previous version.

## 11. Known limitations and open items
- **Legal review (DPDP)**, required before any cloud storage of study data, especially for students under 18. Also pending:
  - a verified parental-consent process;
  - a decision on GA4 for under-18 visitors.
- **Not built yet:**
  - the retention clean-up job (tombstones count toward row limits until then);
  - an incident runbook.
- **Hosting:** GitHub Pages can't send security headers such as `frame-ancestors` or `nosniff`. Cloudflare Pages is the preferred candidate; the migration isn't authorised.
- **Manual staging checks still needed:** confirmation and reset emails need a real inbox (checklist in `supabase/README.md`).
- **Age band:** self-declared, and changeable.
