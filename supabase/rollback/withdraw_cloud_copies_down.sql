-- ═══════════════════════════════════════════════════════════════════
-- Rollback of 20261127000000_withdraw_cloud_copies.sql ONLY.
--
-- NOT a migration: it lives outside supabase/migrations/ so the CLI never
-- applies it by accident. Owner approval only.
--
-- It removes exactly what that migration added, and restores what it changed:
--   * the six statement-level triggers <table>_upload_guard and the functions
--     atlas_upload_guard() and atlas_upload_lock();
--   * the trigger profiles_withdrawal_guard and atlas_withdrawal_guard();
--   * withdraw_cloud_copies() and begin_cloud_withdrawal();
--   * the columns profiles.cloud_copy_withdrawn_at and profiles.cloud_generation;
--   * the consent cap: consents_cap goes back to the flat atlas_row_cap('200')
--     and atlas_consent_cap() is dropped;
--   * purge_user_data() and request_account_deletion() go back to their
--     previous definitions (20261120000000 and 20261122010000), which lock the
--     profile row last.
-- It does NOT touch 20261126100000 (students still can't choose a consent's
-- recorded_at). No other table, row, policy or function changes. Consent rows recorded
-- meanwhile (including any above 200) stay. It CANNOT restore cloud copies
-- that were already deleted (by design, they're gone).
--
-- READ FIRST, it weakens five safeguards:
--   * Dropping cloud_copy_withdrawn_at removes the fail-closed withdrawal
--     state. A student whose withdrawal row couldn't be recorded would again
--     pass the consent checks with an OLD grant. Before running this, check:
--       select user_id from public.profiles where cloud_copy_withdrawn_at is not null;
--     and make sure each one's latest 'cloud-sync' decision is a withdrawal.
--   * Without the upload guard, an upload already in flight during a
--     withdrawal could commit after the cloud copy was deleted.
--   * With the flat cap back, a student at 200 consent rows can neither
--     record a withdrawal nor a fresh consent.
--   * Without cloud_generation, devices can't tell that a cloud copy was
--     deleted outright. Deploy an app version without the generation check
--     first (its sync would fail to read the column).
--   * Account deletion can again deadlock with an in-flight upload (PostgreSQL
--     detects it and aborts one; a retry succeeds).
--
-- Deploy an app version without the withdrawal flow first, or together with it.
-- Step 1 of the full rollback procedure (student_accounts_down.sql): this is
-- the newest migration, so roll it back FIRST. The older rollbacks
-- (consent_recorded_at_server_only_down.sql, remove_age_restrictions_down.sql,
-- verified_email_down.sql) refuse to run while it is still applied.
--
-- Afterwards, remove the migration's row from the CLI history:
--   delete from supabase_migrations.schema_migrations where version = '20261127000000';
-- Tested in src/lib/__tests__/db-withdraw-cloud-copies.test.ts.
-- ═══════════════════════════════════════════════════════════════════
begin;

do $$
declare t text;
begin
  foreach t in array array['bookmarks', 'checklist_items', 'revision_rounds', 'mistakes', 'goals', 'streaks'] loop
    execute format('drop trigger if exists %I on public.%I', t || '_upload_guard', t);
  end loop;
end $$;
drop function if exists public.atlas_upload_guard();
drop function if exists public.atlas_upload_lock();

drop trigger if exists profiles_withdrawal_guard on public.profiles;
drop function if exists public.atlas_withdrawal_guard();

drop function if exists public.withdraw_cloud_copies();
drop function if exists public.begin_cloud_withdrawal();

alter table public.profiles drop column if exists cloud_copy_withdrawn_at;
alter table public.profiles drop column if exists cloud_generation;

-- The flat consent cap, as in 20261120000000.
drop trigger if exists consents_cap on public.consents;
create trigger consents_cap before insert on public.consents for each row execute function public.atlas_row_cap('200');
drop function if exists public.atlas_consent_cap();

-- purge_user_data(), exactly as in 20261120000000.
create or replace function public.purge_user_data(target uuid) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  n integer := 0;
  c integer;
  req timestamptz;
begin
  select requested_at into req from public.deletion_requests where user_id = target;
  update public.deletion_requests set attempts = attempts + 1 where user_id = target;
  delete from public.bookmarks where user_id = target;       get diagnostics c = row_count; n := n + c;
  delete from public.checklist_items where user_id = target; get diagnostics c = row_count; n := n + c;
  delete from public.revision_rounds where user_id = target; get diagnostics c = row_count; n := n + c;
  delete from public.mistakes where user_id = target;        get diagnostics c = row_count; n := n + c;
  delete from public.goals where user_id = target;           get diagnostics c = row_count; n := n + c;
  delete from public.streaks where user_id = target;         get diagnostics c = row_count; n := n + c;
  delete from public.consents where user_id = target;        get diagnostics c = row_count; n := n + c;
  delete from public.profiles where user_id = target;        get diagnostics c = row_count; n := n + c;
  insert into public.deletion_log (user_hash, requested_at, rows_deleted)
    values (encode(sha256(convert_to(target::text, 'UTF8')), 'hex'), req, n);
  return n;
end $$;

-- request_account_deletion(), exactly as in 20261122010000.
create or replace function public.request_account_deletion() returns timestamptz
language plpgsql security definer set search_path = '' as $$
declare
  at timestamptz;
  wait integer;
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if not coalesce(public.account_deletion_enabled(), false) then
    raise exception 'deletion-disabled' using errcode = 'P0001', hint = 'Account deletion is not available yet.';
  end if;
  wait := public.deletion_rate_wait(auth.uid(), 'request');
  if wait > 0 then
    raise exception 'rate-limited' using errcode = 'P0001', hint = 'Try again in ' || wait || ' seconds.';
  end if;
  insert into public.deletion_requests (user_id) values (auth.uid())
    on conflict (user_id) do nothing;
  select requested_at into at from public.deletion_requests where user_id = auth.uid();
  update public.profiles set deletion_requested_at = at, sync_enabled = false where user_id = auth.uid();
  return at;
end $$;

commit;
