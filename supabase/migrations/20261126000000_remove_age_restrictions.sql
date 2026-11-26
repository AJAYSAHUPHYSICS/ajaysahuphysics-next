-- ═══════════════════════════════════════════════════════════════════
-- No age-based restrictions (owner decision, 2026-11-26: "There will be NO
-- AGE LIMIT on this website").
--
-- Students of any age may register, use their account, save their profile,
-- record their own consent, and become eligible for cloud copies when every
-- non-age requirement is met. There is no under-18 block and no
-- parental-consent requirement.
--
-- This is a product decision, not a statement of legal compliance. It does
-- NOT weaken any other control: verified email, consent, the owner's launch
-- switch, the deletion checks, RLS and the column privileges are unchanged.
--
-- What changes (forward only; migrations 1-6 are not edited):
--   * sync_allowed() and enable_sync(): no age rule. Every student needs
--     the same things: a profile, no pending deletion, a verified email,
--     the current 'privacy' and 'cloud-sync' consents, and the launch
--     switch app_config.adult_sync_permitted = 'true'. Despite its
--     historical name, that switch now applies to EVERY student; it is
--     created 'false' and only the service role can change it.
--     The 'terms' consent is no longer required (owner decision,
--     2026-11-26): no Terms of Use document exists yet.
--   * atlas_protect_profile(): declaring an age band no longer switches
--     cloud copies off. Students still can't set sync_enabled or
--     deletion_requested_at themselves.
--   * public.parental_consent_verified() is dropped: nothing uses it.
--   * consents: no new 'parental' consent and no 'parent-verified' method,
--     from anyone (constraint consents_no_parental, NOT VALID: existing rows
--     are kept as history). Students were already refused by RLS.
--
-- Left in place, unused, so nothing applied elsewhere breaks: the
-- profiles.age_band column and its column privileges (no function reads
-- it), and the app_config key minor_sync_permitted (stays 'false', read by
-- nothing).
--
-- Depends on 20261124000000 (email_verified()). Rollback:
-- supabase/rollback/remove_age_restrictions_down.sql, BEFORE any rollback of
-- 20261124000000. Tested in src/lib/__tests__/db-no-age-restrictions.test.ts.
-- ═══════════════════════════════════════════════════════════════════

create or replace function public.sync_allowed() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select p.sync_enabled
       and public.email_verified()
       and p.deletion_requested_at is null
       and not exists (select 1 from public.deletion_requests d where d.user_id = p.user_id)
       and public.latest_consent('privacy')
       and public.latest_consent('cloud-sync')
       and coalesce((select a.value = 'true' from public.app_config a where a.key = 'adult_sync_permitted'), false)
    from public.profiles p where p.user_id = auth.uid()), false)
$$;

create or replace function public.enable_sync() returns text
language plpgsql security definer set search_path = '' as $$
declare
  p public.profiles;
  launch_ok boolean := (select value = 'true' from public.app_config where key = 'adult_sync_permitted');
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select * into p from public.profiles where user_id = auth.uid();
  if not found then return 'no-profile'; end if;
  -- A deletion request blocks sync even if the profile was re-created after a purge.
  if p.deletion_requested_at is not null or exists (select 1 from public.deletion_requests d where d.user_id = auth.uid()) then
    return 'deletion-pending';
  end if;
  if not public.email_verified() then return 'email-not-verified'; end if;
  if not (public.latest_consent('privacy') and public.latest_consent('cloud-sync')) then return 'consent-required'; end if;
  if not coalesce(launch_ok, false) then return 'not-available-yet'; end if;
  -- Runs as the table owner, so atlas_protect_profile allows this change.
  update public.profiles set sync_enabled = true where user_id = auth.uid();
  return 'enabled';
end $$;

create or replace function public.atlas_protect_profile() returns trigger
language plpgsql set search_path = '' as $$
begin
  -- sync_enabled and deletion_requested_at change only inside the
  -- security-definer functions. Those run as the table owner, so a write
  -- made directly by a client role is the only kind refused here.
  -- (Defence in depth: client roles also lack column privileges on these
  -- columns.) No age rule: an age band, if one is stored, changes nothing.
  if current_user in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      new.sync_enabled := false;
      new.deletion_requested_at := null;
    elsif new.sync_enabled is distinct from old.sync_enabled or new.deletion_requested_at is distinct from old.deletion_requested_at then
      raise exception 'sync_enabled and deletion_requested_at can only change through their functions' using errcode = '42501';
    end if;
  end if;
  return new;
end $$;

-- Replaced above, so nothing references it any more.
drop function public.parental_consent_verified();

-- No parental consent workflow: refuse new 'parental' rows and the
-- 'parent-verified' method from every role. NOT VALID keeps any existing
-- rows as history (consents are append-only).
alter table public.consents
  add constraint consents_no_parental check (kind <> 'parental' and method = 'self') not valid;
