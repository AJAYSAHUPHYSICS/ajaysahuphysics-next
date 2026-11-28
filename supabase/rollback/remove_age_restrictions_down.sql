-- ═══════════════════════════════════════════════════════════════════
-- ROLLBACK for 20261126000000_remove_age_restrictions.sql only.
-- NOT a migration (it lives outside supabase/migrations/). Non-destructive:
-- it changes no table data. It restores, exactly as 20261124000000 left
-- them: sync_allowed(), enable_sync(), atlas_protect_profile() and
-- parental_consent_verified(), and drops the consents_no_parental
-- constraint.
--
-- Run it BEFORE verified_email_down.sql if both are rolled back (that
-- script refuses to run while this migration is still applied).
-- Step 3 of the full rollback procedure (student_accounts_down.sql). It
-- refuses to run while 20261126100000 or 20261127000000 is still applied
-- (newest first): roll those back first.
-- Owner approval only; run in the SQL editor of the intended project after
-- checking its name and ref. Afterwards remove the 20261126000000 row from
-- supabase_migrations.schema_migrations:
--   delete from supabase_migrations.schema_migrations where version = '20261126000000';
-- Tested in src/lib/__tests__/db-no-age-restrictions.test.ts.
-- ═══════════════════════════════════════════════════════════════════
begin;

do $$
begin
  if to_regprocedure('public.withdraw_cloud_copies()') is not null then
    raise exception 'Roll back 20261127000000 first: run supabase/rollback/withdraw_cloud_copies_down.sql, then consent_recorded_at_server_only_down.sql, then this script.';
  end if;
  -- 20261126100000 applied <=> students can't insert consents.recorded_at.
  if to_regclass('public.consents') is not null
     and not has_column_privilege('authenticated', 'public.consents', 'recorded_at', 'INSERT') then
    raise exception 'Roll back 20261126100000 first: run supabase/rollback/consent_recorded_at_server_only_down.sql, then this script.';
  end if;
end $$;

alter table public.consents drop constraint if exists consents_no_parental;

create or replace function public.parental_consent_verified() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select c.granted and c.method = 'parent-verified' from public.consents c
    where c.user_id = auth.uid() and c.kind = 'parental'
      and c.version = (select value from public.app_config where key = 'consent_version')
    order by c.recorded_at desc, c.id desc limit 1), false)
$$;
-- Same privileges as after 20261120000000: no client may call it directly.
revoke execute on function public.parental_consent_verified() from public, anon, authenticated;

create or replace function public.atlas_protect_profile() returns trigger
language plpgsql set search_path = '' as $$
begin
  -- sync_enabled and deletion_requested_at change only inside the
  -- security-definer functions below. Those run as the table owner, so a
  -- write made directly by a client role is the only kind refused here.
  -- (Defence in depth: client roles also lack column privileges on these
  -- columns; see the grants at the end.)
  if current_user in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      new.sync_enabled := false;
      new.deletion_requested_at := null;
    elsif new.sync_enabled is distinct from old.sync_enabled or new.deletion_requested_at is distinct from old.deletion_requested_at then
      raise exception 'sync_enabled and deletion_requested_at can only change through their functions' using errcode = '42501';
    end if;
  end if;
  -- Declaring under-18 always switches cloud copies off until re-enabled under the minor rules.
  if tg_op = 'UPDATE' and new.age_band = 'under-18' and old.age_band is distinct from 'under-18' then
    new.sync_enabled := false;
  end if;
  return new;
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

commit;
