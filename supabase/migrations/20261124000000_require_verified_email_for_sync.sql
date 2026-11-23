-- ═══════════════════════════════════════════════════════════════════
-- Cloud copies require a verified email address (owner decision K,
-- 2026-11-23: "Unverified accounts must not receive cloud-sync access").
--
-- Enforced in the database, independently of the Auth "Confirm email"
-- setting, so it also covers accounts created before that setting was on
-- and accounts created through the API:
--   * public.email_verified(): true only when auth.users.email_confirmed_at
--     is set for the caller (auth.uid()). No row, or no caller: false.
--   * sync_allowed() now also requires it. Every RLS write policy on the six
--     study tables calls sync_allowed(), so an unverified account can't
--     upload, whatever the client does.
--   * enable_sync() returns 'email-not-verified' before any other sync
--     condition is checked, after the deletion check, and doesn't turn sync on.
-- Reading, exporting and deleting your own data never needed sync, and are
-- unchanged.
--
-- Both functions keep their existing privileges: CREATE OR REPLACE keeps the
-- ACL. email_verified() is callable only through them (no client grant).
-- Additive: no table, column or row changes. Tested in
-- src/lib/__tests__/db-verified-email.test.ts.
-- Rollback: re-create both functions from 20261120000000 and drop
-- email_verified() (see supabase/rollback/verified_email_down.sql).
-- ═══════════════════════════════════════════════════════════════════

create function public.email_verified() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select u.email_confirmed_at is not null from auth.users u where u.id = auth.uid()), false)
$$;
revoke execute on function public.email_verified() from public, anon, authenticated;

create or replace function public.sync_allowed() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select p.sync_enabled
       and public.email_verified()
       and p.deletion_requested_at is null
       and not exists (select 1 from public.deletion_requests d where d.user_id = p.user_id)
       and public.latest_consent('terms')
       and public.latest_consent('privacy')
       and public.latest_consent('cloud-sync')
       and case p.age_band
             when '18-plus' then coalesce((select a.value = 'true' from public.app_config a where a.key = 'adult_sync_permitted'), false)
             when 'under-18' then coalesce((select a.value = 'true' from public.app_config a where a.key = 'minor_sync_permitted'), false)
                                  and public.parental_consent_verified()
             else false
           end
    from public.profiles p where p.user_id = auth.uid()), false)
$$;

create or replace function public.enable_sync() returns text
language plpgsql security definer set search_path = '' as $$
declare
  p public.profiles;
  minor_ok boolean := (select value = 'true' from public.app_config where key = 'minor_sync_permitted');
  adult_ok boolean := (select value = 'true' from public.app_config where key = 'adult_sync_permitted');
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select * into p from public.profiles where user_id = auth.uid();
  if not found then return 'no-profile'; end if;
  -- A deletion request blocks sync even if the profile was re-created after a purge.
  if p.deletion_requested_at is not null or exists (select 1 from public.deletion_requests d where d.user_id = auth.uid()) then
    return 'deletion-pending';
  end if;
  if not public.email_verified() then return 'email-not-verified'; end if;
  if p.age_band is null then return 'age-band-required'; end if;
  if not (public.latest_consent('terms') and public.latest_consent('privacy') and public.latest_consent('cloud-sync')) then return 'consent-required'; end if;
  if p.age_band = 'under-18' then
    if not coalesce(minor_ok, false) then return 'not-available-for-under-18'; end if;
    if not public.parental_consent_verified() then return 'parental-consent-required'; end if;
  elsif not coalesce(adult_ok, false) then
    return 'not-available-yet';
  end if;
  -- Runs as the table owner, so atlas_protect_profile allows this change.
  update public.profiles set sync_enabled = true where user_id = auth.uid();
  return 'enabled';
end $$;
