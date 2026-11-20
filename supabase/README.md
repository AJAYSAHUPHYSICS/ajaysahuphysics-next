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

## Applying to staging (owner action, with the Supabase CLI)
```
supabase link --project-ref <STAGING_REF>
supabase db push                 # applies migrations/ to STAGING
supabase functions deploy delete-account
supabase secrets set ATLAS_DELETION_SWEEP_SECRET=<random 32+ chars>
```

Then, in the staging dashboard:
- **Auth → URL configuration:** add `https://<staging site>/auth/callback/` and `/auth/reset-password/` to the redirect allow-list.
- **Email confirmations:** on.
- **Minimum password length:** 10.
- **Scheduled sweep:** schedule `POST /functions/v1/delete-account?sweep=1` with the `x-atlas-sweep-secret` header, daily.
- **CAPTCHA (optional, Cloudflare Turnstile):** do these **in this order**, because turning on bot protection before the site sends tokens blocks every sign-in:
  1. Create a Turnstile widget for the site's domain (Cloudflare dashboard) to get a public site key and a secret.
  2. Build the site with `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site key>`. The modal then shows the check, and the CSP step allows `https://challenges.cloudflare.com` (script and frame).
  3. **Auth → Bot and abuse protection:** enable CAPTCHA, choose Turnstile, paste the **secret** (it lives only in Supabase, never in this repo).
  Without a site key the build is unchanged: no widget, no third-party script.

## Creating the staging project (owner, once)
1. In the Supabase dashboard, create a **new** project named `ajaysahuphysics-staging`.
   - **Region:** South Asia (Mumbai), if your plan offers it. The production region choice is a legal question (L-11).
   - Use a new database password, kept in your password manager.
   - **Never** reuse or copy the production project.
2. **Project Settings → API:** note the project URL (`https://<staging-ref>.supabase.co`), the **anon/publishable** key and the **service-role/secret** key.
   - Keep the service-role key only in your local shell or a password manager: never in a file in this repo, a PR, a chat or CI.
3. Apply the migration and deploy the function with the commands under "Applying to staging" above.
4. **Auth → URL configuration (staging):**
   - site URL `http://localhost:3000`;
   - redirect URLs `http://localhost:3000/auth/callback/` and `http://localhost:3000/auth/reset-password/`;
   - minimum password length 10, and email confirmations on.
5. **Optional, staging CAPTCHA:** enable Turnstile with Cloudflare's **test** secret `1x0000000000000000000000000000000AA` (always passes), then set `STAGING_TURNSTILE_TEST_TOKEN=XXXX.DUMMY.TOKEN.XXXX` for the suite.

## Staging verification suite (`npm run test:staging`)
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

```
# in a local shell only (values never committed or pasted anywhere)
export STAGING_SUPABASE_URL=https://<staging-ref>.supabase.co
export STAGING_CONFIRM_REF=<staging-ref>          # repeat the ref to confirm the target
export STAGING_SUPABASE_ANON_KEY=<staging anon key>
export STAGING_SUPABASE_SERVICE_ROLE_KEY=<staging service-role key>
export STAGING_SWEEP_SECRET=<staging sweep secret>          # optional
export STAGING_TURNSTILE_TEST_TOKEN=XXXX.DUMMY.TOKEN.XXXX   # only if staging CAPTCHA uses the test secret
npm run test:staging
```

**Safety:**
- `supabase/staging/guard.ts` refuses the production project and any target that isn't explicitly confirmed.
- For the run, the suite sets `adult_sync_permitted='true'` **in staging only**, and restores the previous value at the end.
- It deletes every account it creates.
- Evidence goes to `staging-evidence/<run>.json` (git-ignored), with keys and tokens redacted.

### Manual staging checks (needs a real inbox)
Use a test inbox you control, on `npm run dev`, with `.env.local` holding **staging** values only. Do these with that inbox:
1. Sign up: the confirmation email arrives; its link opens `/auth/callback/`, signs you in, and the code disappears from the address bar.
2. Open the same link again: you see the "link can't be used" message, not an error page.
3. Open the link in another browser: you see the "open it in the browser where you signed up" message.
4. Forgot password: the reset email arrives; `/auth/reset-password/` sets a new password; the old password no longer works.
5. Signing up again with the same email shows the same "check your email" text as a new email.
6. Log out: progress on the device is still there.
7. Account page: export downloads JSON; deletion asks you to type DELETE, then you can no longer sign in.
