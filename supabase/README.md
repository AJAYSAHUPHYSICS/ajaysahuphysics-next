# Supabase: student accounts (Phase 2B)

**Staging first. Never apply anything here to production** without the owner's written approval and the legal sign-off tracked privately. The production site keeps working with none of this applied: progress stays in the browser.

## Contents
| Path | What |
|---|---|
| `migrations/20261120000000_student_accounts.sql` | Profiles, append-only consents, study tables (bookmarks, checklist items, revision rounds, mistakes, goals, streaks), deletion requests and a PII-free deletion log. Row Level Security on every table; database-side consent gate; per-student row limits; export and deletion functions. |
| `functions/delete-account/` | Edge Function that deletes a student's account after they request it (service-role key stays in Supabase secrets). `handler.ts` is the tested core. |
| `tests/supabase-auth-shim.sql` | **Test-only** stand-in for Supabase's `auth` schema and roles, so the migration can be tested in PGlite. Never apply it to a real project. |

## Safety switches (all off)
- `app_config.adult_sync_permitted` and `app_config.minor_sync_permitted` stay `'false'` until legal sign-off. Only the service role can change them.
- `CLOUD_SYNC_ENABLED` in `src/lib/sync/policy.ts` is `false`, so the site never sends study data.
- Students under 18 can't enable cloud copies without the minors switch **and** a `parental` consent recorded with method `parent-verified`, which only a verified server process can insert.

## Tests (no Docker needed)
`npx vitest run src/lib/__tests__/db-rls.test.ts` applies the migration to an in-process Postgres (PGlite) and runs as `anon`, `authenticated` (with a JWT `sub`) and `service_role`. It checks:
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
npx supabase@2.122.1 db push --dry-run                      # lists the migration it WOULD apply; applies nothing
```
If the CLI asks for a `config.toml`, run `npx supabase@2.122.1 init` once and choose **no** to the IDE prompts. Review the generated `supabase/config.toml` before committing it.

### 4. Apply the migration (needs the owner's go-ahead)
```
npx supabase@2.122.1 db push                                # applies supabase/migrations/ to the LINKED STAGING project
```

### 5. Deploy the deletion function (staging)
```
npx supabase@2.122.1 functions deploy delete-account --project-ref <staging-ref> --no-verify-jwt --use-api
npx supabase@2.122.1 secrets set --project-ref <staging-ref> ATLAS_DELETION_SWEEP_SECRET=<random 32+ characters>
npx supabase@2.122.1 secrets set --project-ref <staging-ref> ATLAS_ALLOWED_ORIGINS=http://localhost:3000
```
- **`--no-verify-jwt`:** the platform's gateway check only understands legacy JWT keys, and it would block the sweep. The function verifies every user request itself with the Auth server, and checks the sweep secret in constant time.
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
- **Scheduled sweep (optional for staging):** a daily `POST /functions/v1/delete-account?sweep=1` with the `x-atlas-sweep-secret` header.
- **CAPTCHA (optional):** enable Turnstile with Cloudflare's **test** secret `1x0000000000000000000000000000000AA`, and set `STAGING_TURNSTILE_TEST_TOKEN=XXXX.DUMMY.TOKEN.XXXX` in `.env.staging.local`.
  - For production the order matters: put the site key in the build first, then turn on bot protection in Supabase, otherwise every sign-in is blocked.

### 7. Run the staging suite
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

### Manual staging checks (needs a real inbox)
Use a test inbox you control, on `npm run dev` with the staging values in `.env.development.local` (step 6). Do these with that inbox:
1. Sign up: the confirmation email arrives; its link opens `/auth/callback/`, signs you in, and the code disappears from the address bar.
2. Open the same link again: you see the "link can't be used" message, not an error page.
3. Open the link in another browser: you see the "open it in the browser where you signed up" message.
4. Forgot password: the reset email arrives; `/auth/reset-password/` sets a new password; the old password no longer works.
5. Signing up again with the same email shows the same "check your email" text as a new email.
6. Log out: progress on the device is still there.
7. Account page: export downloads JSON; deletion asks you to type DELETE, then you can no longer sign in.
