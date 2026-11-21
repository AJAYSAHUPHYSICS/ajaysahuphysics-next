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
