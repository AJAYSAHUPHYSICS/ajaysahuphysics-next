-- ═══════════════════════════════════════════════════════════════════
-- Project Atlas, Phase 2B: least-privilege grants for the server role.
--
-- Found during the staging verification (2026-11-21): on current Supabase
-- projects, tables created by `postgres` get only TRUNCATE / REFERENCES /
-- TRIGGER / MAINTAIN for anon, authenticated and service_role by default.
-- service_role bypasses RLS, but without table privileges it couldn't read
-- deletion_requests, which the delete-account Edge Function needs.
--
-- This migration gives service_role exactly what server-side code uses,
-- and nothing more. Every student-data deletion goes through
-- purge_user_data(); the server key can't UPDATE, DELETE or TRUNCATE
-- student rows directly.
--   * SELECT on every Atlas table: the deletion function and the sweep
--     (deletion_requests); staging verification and support reads.
--   * UPDATE (value, updated_at) on app_config: the launch switches. The
--     owner may also change them in the SQL editor.
--   * INSERT into consents: the verified parental-consent process
--     (method 'parent-verified'), which students can't use.
-- Tables are named explicitly, so no other object in `public` is touched.
-- ═══════════════════════════════════════════════════════════════════

revoke all on public.app_config, public.profiles, public.consents, public.bookmarks, public.checklist_items,
  public.revision_rounds, public.mistakes, public.goals, public.streaks, public.deletion_requests, public.deletion_log
  from service_role;

grant select on public.app_config, public.profiles, public.consents, public.bookmarks, public.checklist_items,
  public.revision_rounds, public.mistakes, public.goals, public.streaks, public.deletion_requests, public.deletion_log
  to service_role;

grant update (value, updated_at) on public.app_config to service_role;
grant insert (user_id, kind, version, granted, method) on public.consents to service_role;
