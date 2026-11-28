-- ═══════════════════════════════════════════════════════════════════
-- Rollback of 20261126100000_consent_recorded_at_server_only.sql ONLY.
--
-- NOT a migration: it lives outside supabase/migrations/ so the CLI never
-- applies it by accident. Owner approval only.
--
-- READ FIRST: this gives students back INSERT on every consents column,
-- including recorded_at, so they could again date their own consent
-- decisions (a future-dated grant outranks every later withdrawal). It is
-- independent of 20261127000000: rolling back that migration does NOT need
-- this file, and should not be paired with it.
--
-- Step 2 of the full rollback procedure (student_accounts_down.sql). It
-- refuses to run while 20261127000000 is applied (newest first): roll that
-- back first with withdraw_cloud_copies_down.sql.
--
-- Afterwards, remove the migration's row from the CLI history:
--   delete from supabase_migrations.schema_migrations where version = '20261126100000';
-- Tested in src/lib/__tests__/db-consent-recorded-at.test.ts.
-- ═══════════════════════════════════════════════════════════════════
begin;
do $$
begin
  if to_regprocedure('public.withdraw_cloud_copies()') is not null then
    raise exception 'Roll back 20261127000000 first: run supabase/rollback/withdraw_cloud_copies_down.sql, then this script.';
  end if;
end $$;
revoke insert (user_id, kind, version, granted, method) on public.consents from authenticated;
grant insert on public.consents to authenticated;
commit;
