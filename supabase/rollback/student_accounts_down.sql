-- ═══════════════════════════════════════════════════════════════════
-- ROLLBACK for migrations 20261120000000_student_accounts.sql,
-- 20261121000000_service_role_grants.sql,
-- 20261122000000_account_deletion_gate.sql and
-- 20261122010000_deletion_rate_limit.sql.
--
-- NOT a migration: it lives outside supabase/migrations/ so the CLI can
-- never apply it by accident. It is DESTRUCTIVE: it deletes every
-- student-accounts table and the data in it (profiles, consents, study
-- copies, deletion log).
--
-- Only with the owner's explicit approval, and only after an export or
-- backup of anything that must be kept. Run in the Supabase SQL editor of
-- the intended project, after checking the project name and ref.
--
-- GUARD (T-18): if deletion_requests or deletion_log has any row, this
-- script refuses to run, and drops nothing, until
--   1. supabase/rollback/export_before_rollback.sql has been run and its
--      output stored privately, and
--   2. this script is run with its `ack` value as the first line:
--        set atlas.rollback_exported = '<pending>/<logged>';
-- The ack must match the CURRENT counts, so a stale export, or a request
-- arriving after the export, is refused too. Pending requests remain
-- obligations after the rollback: complete each one from the export.
--
-- It touches only objects these migrations created. Supabase's auth
-- schema and users are not modified. Tested in PGlite
-- (src/lib/__tests__/db-rollback.test.ts): after rollback, no Atlas
-- object remains, auth.users is intact, and the migrations re-apply
-- cleanly.
--
-- Afterwards, remove the rows for 20261120000000, 20261121000000,
-- 20261122000000 and 20261122010000 from supabase_migrations.schema_migrations, so the CLI's
-- history matches (the CLI tracks applied migrations there):
--   delete from supabase_migrations.schema_migrations where version in ('20261120000000', '20261121000000', '20261122000000', '20261122010000');
-- ═══════════════════════════════════════════════════════════════════
begin;

-- guard:start (T-18; tested in src/lib/__tests__/db-rollback-guard.test.ts)
do $guard$
declare
  pending bigint := 0;
  logged bigint := 0;
  ack text := coalesce(current_setting('atlas.rollback_exported', true), '');
begin
  if to_regclass('public.deletion_requests') is not null then
    execute 'select count(*) from public.deletion_requests' into pending;
  end if;
  if to_regclass('public.deletion_log') is not null then
    execute 'select count(*) from public.deletion_log' into logged;
  end if;
  if (pending > 0 or logged > 0) and ack <> pending::text || '/' || logged::text then
    raise exception 'Rollback refused: % pending deletion request(s) and % deletion-log row(s) would be lost. Run supabase/rollback/export_before_rollback.sql, store its output privately, then start this script with: set atlas.rollback_exported = ''%/%''; (current ack: "%")',
      pending, logged, pending, logged, ack;
  end if;
end
$guard$;
-- guard:end

drop table if exists public.bookmarks, public.checklist_items, public.revision_rounds, public.mistakes,
  public.goals, public.streaks, public.consents, public.deletion_requests, public.deletion_log, public.deletion_rate,
  public.profiles, public.app_config cascade;

drop function if exists public.enable_sync(), public.disable_sync(), public.export_my_data(),
  public.request_account_deletion(), public.purge_user_data(uuid), public.sync_allowed(),
  public.account_deletion_enabled(), public.deletion_rate_wait(uuid, text),
  public.latest_consent(text), public.parental_consent_verified(),
  public.atlas_touch(), public.atlas_row_cap(), public.atlas_protect_profile(), public.atlas_consents_append_only();

commit;

-- Clear the acknowledgement, so it can never carry over to a later run.
reset atlas.rollback_exported;
