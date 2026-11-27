-- ═══════════════════════════════════════════════════════════════════
-- ROLLBACK for migrations 20261120000000_student_accounts.sql,
-- 20261121000000_service_role_grants.sql,
-- 20261122000000_account_deletion_gate.sql,
-- 20261122010000_deletion_rate_limit.sql,
-- 20261123000000_deletion_log_sequence_privilege.sql (its revoke goes
-- with the sequence when deletion_log is dropped),
-- 20261124000000_require_verified_email_for_sync.sql (email_verified() is
-- dropped below; to undo only that migration, use verified_email_down.sql) and
-- 20261126000000_remove_age_restrictions.sql (its consents_no_parental
-- constraint goes with the consents table, and the functions it replaced or
-- dropped are dropped below with `if exists`; to undo only that migration,
-- use remove_age_restrictions_down.sql, BEFORE verified_email_down.sql).
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
--   2. this script is run with that export's `ack` as the first line:
--        set atlas.rollback_exported = 'v2:<pending>/<logged>:<sha256>';
-- The guard locks both tables against writes (until this transaction
-- ends, after the drops), recomputes the SHA-256 of every field of every
-- row, and refuses unless it matches. So an export is valid only for the
-- exact records it holds: a request replaced by another, a changed attempt
-- count or log row, or a request arriving after the export, is refused,
-- even with the counts unchanged. The refusal never prints a valid ack:
-- the only way to get one is to run the export. (This guards against
-- mistakes, not against a database owner deliberately forging the value.)
-- Pending requests remain obligations after the rollback: complete each
-- one from the export.
--
-- It touches only objects these migrations created. Supabase's auth
-- schema and users are not modified. Tested in PGlite
-- (src/lib/__tests__/db-rollback.test.ts): after rollback, no Atlas
-- object remains, auth.users is intact, and the migrations re-apply
-- cleanly.
--
-- Afterwards, remove the rows for 20261120000000, 20261121000000,
-- 20261122000000, 20261122010000, 20261123000000, 20261124000000 and
-- 20261126000000 (whichever are applied) from
-- supabase_migrations.schema_migrations, so the CLI's history matches (the
-- CLI tracks applied migrations there):
--   delete from supabase_migrations.schema_migrations where version in ('20261120000000', '20261121000000', '20261122000000', '20261122010000', '20261123000000', '20261124000000', '20261126000000');
-- ═══════════════════════════════════════════════════════════════════
begin;

-- guard:start (T-18; tested in src/lib/__tests__/db-rollback-guard.test.ts)
do $guard$
declare
  pending bigint := 0;
  logged bigint := 0;
  req_canon text := '';
  log_canon text := '';
  expected text;
  given text := coalesce(current_setting('atlas.rollback_exported', true), '');
begin
  -- EXCLUSIVE blocks inserts, updates and deletes (but not reads) until this
  -- transaction ends, after the drops, so the records can't change between
  -- this check and the drops.
  if to_regclass('public.deletion_requests') is not null then
    execute 'lock table public.deletion_requests in exclusive mode';
    execute $q$select count(*), coalesce(string_agg(r.user_id::text || '|' || extract(epoch from r.requested_at)::text || '|' || r.attempts::text, E'\n' order by r.user_id), '')
              from public.deletion_requests r$q$ into pending, req_canon;
  end if;
  if to_regclass('public.deletion_log') is not null then
    execute 'lock table public.deletion_log in exclusive mode';
    execute $q$select count(*), coalesce(string_agg(l.id::text || '|' || l.user_hash || '|' || coalesce(extract(epoch from l.requested_at)::text, '') || '|' || extract(epoch from l.completed_at)::text || '|' || l.rows_deleted::text, E'\n' order by l.id), '')
              from public.deletion_log l$q$ into logged, log_canon;
  end if;
  -- The same serialisation and hash as export_before_rollback.sql.
  expected := 'v2:' || pending::text || '/' || logged::text || ':' || encode(sha256(convert_to(req_canon || E'\n--\n' || log_canon, 'UTF8')), 'hex');
  if (pending > 0 or logged > 0) and given <> expected then
    raise exception 'Rollback refused: % pending deletion request(s) and % deletion-log row(s) would be lost, and atlas.rollback_exported does not match them (it is missing, from an older export, or from before a change). Run supabase/rollback/export_before_rollback.sql now, store its output privately, then start this script with: set atlas.rollback_exported = ''<ack from that export>'';',
      pending, logged;
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
  public.atlas_touch(), public.atlas_row_cap(), public.atlas_protect_profile(), public.atlas_consents_append_only(),
  public.email_verified();

commit;

-- Clear the acknowledgement, so it can never carry over to a later run.
reset atlas.rollback_exported;
