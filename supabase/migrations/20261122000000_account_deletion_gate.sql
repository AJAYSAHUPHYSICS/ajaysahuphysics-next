-- ═══════════════════════════════════════════════════════════════════
-- Project Atlas, Phase 2B: server-side account deletion gate (audit F5).
--
-- Account deletion stays OFF until the owner deliberately opens it, after
-- the staged verification in docs/PHASE_2_RELEASE.md section 9, C.3.
--
--   * One switch: app_config 'account_deletion_enabled', created 'false'.
--   * public.account_deletion_enabled() is the single rule. It is true only
--     when the value is exactly 'true'. A missing row, NULL or any other
--     value means off; an unreadable app_config raises an error, and the
--     callers treat an error as off (fail closed).
--   * request_account_deletion() checks the gate after the sign-in check,
--     so a direct API call can't start a deletion while the gate is off.
--     No deletion request is recorded and the profile isn't changed.
--   * The delete-account Edge Function checks the same function on its
--     user path and on the scheduled sweep (handler.ts).
--   * No exemptions: the gate doesn't look at who is asking. Test accounts
--     are treated like every other account, in staging and in production.
--   * purge_user_data() is deliberately NOT gated. It is callable only by
--     the server role, and it is what an authorised operator uses to
--     complete a request that was accepted while the gate was open (the
--     documented procedure, runbook section 9, C.3 step 5).
--
-- Opening the gate (owner only, after approval; SQL editor of the right
-- project, after checking its name and ref):
--   update public.app_config set value = 'true', updated_at = now() where key = 'account_deletion_enabled';
-- Closing it: the same with 'false'.
--
-- This doesn't touch the sync switches. Opening the deletion gate never
-- enables cloud sync.
-- ═══════════════════════════════════════════════════════════════════

alter table public.app_config drop constraint app_config_key_check;
alter table public.app_config add constraint app_config_key_check
  check (key in ('adult_sync_permitted', 'minor_sync_permitted', 'consent_version', 'account_deletion_enabled'));

insert into public.app_config (key, value) values ('account_deletion_enabled', 'false')
  on conflict (key) do nothing;

create function public.account_deletion_enabled() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select a.value = 'true' from public.app_config a where a.key = 'account_deletion_enabled'), false)
$$;

-- Same body as in 20261120000000, plus the gate check. CREATE OR REPLACE
-- keeps the existing privileges (execute for authenticated only).
create or replace function public.request_account_deletion() returns timestamptz
language plpgsql security definer set search_path = '' as $$
declare at timestamptz;
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if not coalesce(public.account_deletion_enabled(), false) then
    raise exception 'deletion-disabled' using errcode = 'P0001', hint = 'Account deletion is not available yet.';
  end if;
  insert into public.deletion_requests (user_id) values (auth.uid())
    on conflict (user_id) do nothing;
  select requested_at into at from public.deletion_requests where user_id = auth.uid();
  update public.profiles set deletion_requested_at = at, sync_enabled = false where user_id = auth.uid();
  return at;
end $$;

revoke execute on function public.account_deletion_enabled() from public, anon;
grant execute on function public.account_deletion_enabled() to authenticated, service_role;
