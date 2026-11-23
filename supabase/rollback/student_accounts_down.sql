-- ═══════════════════════════════════════════════════════════════════
-- ROLLBACK for migrations 20261120000000_student_accounts.sql,
-- 20261121000000_service_role_grants.sql,
-- 20261122000000_account_deletion_gate.sql,
-- 20261122010000_deletion_rate_limit.sql and
-- 20261123000000_deletion_log_sequence_privilege.sql (its revoke goes
-- with the sequence when deletion_log is dropped).
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
-- It touches only objects these migrations created. Supabase's auth
-- schema and users are not modified. Tested in PGlite
-- (src/lib/__tests__/db-rollback.test.ts): after rollback, no Atlas
-- object remains, auth.users is intact, and the migrations re-apply
-- cleanly.
--
-- Afterwards, remove the rows for 20261120000000, 20261121000000,
-- 20261122000000, 20261122010000 and 20261123000000 (whichever are applied)
-- from supabase_migrations.schema_migrations, so the CLI's
-- history matches (the CLI tracks applied migrations there):
--   delete from supabase_migrations.schema_migrations where version in ('20261120000000', '20261121000000', '20261122000000', '20261122010000', '20261123000000');
-- ═══════════════════════════════════════════════════════════════════
begin;

drop table if exists public.bookmarks, public.checklist_items, public.revision_rounds, public.mistakes,
  public.goals, public.streaks, public.consents, public.deletion_requests, public.deletion_log, public.deletion_rate,
  public.profiles, public.app_config cascade;

drop function if exists public.enable_sync(), public.disable_sync(), public.export_my_data(),
  public.request_account_deletion(), public.purge_user_data(uuid), public.sync_allowed(),
  public.account_deletion_enabled(), public.deletion_rate_wait(uuid, text),
  public.latest_consent(text), public.parental_consent_verified(),
  public.atlas_touch(), public.atlas_row_cap(), public.atlas_protect_profile(), public.atlas_consents_append_only();

commit;
