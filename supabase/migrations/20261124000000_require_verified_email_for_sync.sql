-- ═══════════════════════════════════════════════════════════════════
-- Cloud copies require a verified email address (owner decision K,
-- 2026-11-23: "Unverified accounts must not receive cloud-sync access").
--
-- Owner decisions, 2026-11-23:
--   * unverified accounts are blocked from READING and WRITING cloud-sync
--     records (the six study tables);
--   * export and account deletion stay available to them;
--   * existing Auth accounts are trusted as they stand: email_confirmed_at is
--     taken as Supabase Auth records it. LIMITATION: while "Confirm email"
--     is off, Supabase confirms new users automatically at sign-up, so for
--     those accounts "verified" doesn't prove the address. Production
--     "Confirm email" must be on before this migration is relied on.
--
-- Enforced in the database, whatever the client does:
--   * public.email_verified(): true only when auth.users.email_confirmed_at
--     is set for the caller (auth.uid()). No row, or no caller: false.
--     `authenticated` may call it (it reports only the caller's own status;
--     the read policies below run as that role); `anon` may not.
--   * Reads: the six study tables' SELECT policies now also require it, so
--     an unverified account sees no cloud rows, not even its own.
--   * Writes: sync_allowed() now requires it. Every INSERT and UPDATE policy
--     on the six study tables calls sync_allowed() (there are no DELETE
--     policies), so an unverified account can't upload.
--   * enable_sync() returns 'email-not-verified' (after the deletion check)
--     and doesn't turn sync on.
--   * Unchanged: export_my_data(), request_account_deletion() and
--     purge_user_data() are security definer, so RLS doesn't limit them.
--     An unverified account can still export everything stored about it,
--     and request and complete deletion. profiles and consents keep their
--     ownership-only policies (the account page needs them).
--
-- Both functions keep their existing privileges (CREATE OR REPLACE keeps the
-- ACL). No table, column or row changes. Tested in
-- src/lib/__tests__/db-verified-email.test.ts.
-- Rollback: supabase/rollback/verified_email_down.sql (restores both
-- functions and the original SELECT policies, then drops email_verified()).
-- ═══════════════════════════════════════════════════════════════════

create function public.email_verified() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select u.email_confirmed_at is not null from auth.users u where u.id = auth.uid()), false)
$$;
revoke execute on function public.email_verified() from public, anon;
grant execute on function public.email_verified() to authenticated;

-- Reads of cloud-sync records need a verified address (ownership as before).
do $$
declare t text;
begin
  foreach t in array array['bookmarks', 'checklist_items', 'revision_rounds', 'mistakes', 'goals', 'streaks'] loop
    execute format('drop policy %I on public.%I', t || '_own_select', t);
    execute format('create policy %I on public.%I for select to authenticated using (user_id = (select auth.uid()) and (select public.email_verified()))', t || '_own_select', t);
  end loop;
end $$;

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
