-- ═══════════════════════════════════════════════════════════════════
-- ROLLBACK for 20261124000000_require_verified_email_for_sync.sql only.
-- NOT a migration (it lives outside supabase/migrations/). Non-destructive:
-- it changes no table or row. It restores sync_allowed() and enable_sync()
-- exactly as 20261120000000 created them, then drops email_verified().
-- Owner approval only; run in the SQL editor of the intended project after
-- checking its name and ref. Afterwards remove the 20261124000000 row from
-- supabase_migrations.schema_migrations. Tested in db-verified-email.test.ts.
-- ═══════════════════════════════════════════════════════════════════
begin;

create or replace function public.sync_allowed() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select p.sync_enabled
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

drop function if exists public.email_verified();

commit;
