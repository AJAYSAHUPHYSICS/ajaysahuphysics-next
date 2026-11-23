-- ═══════════════════════════════════════════════════════════════════
-- READ-ONLY export before a database rollback (tracker T-18, audit F11).
--
-- student_accounts_down.sql drops deletion_requests and deletion_log. Those
-- hold obligations and evidence that must survive a rollback:
--   pending_deletion_requests  accounts whose deletion was promised and
--                              isn't finished. After a rollback each one
--                              must still be completed: delete that login
--                              user (the rollback leaves auth.users intact)
--                              and record the completion.
--   deletion_log               the record of completed deletions (a SHA-256
--                              of the user id, never the id itself).
--
-- It returns ONE row of JSON and changes nothing. It contains user ids, which
-- are personal data: store the output privately and encrypted, never in the
-- repository, and delete it once every pending request is completed and the
-- log is archived as the owner decides.
--
-- Run it with the owner's approval, in the SQL editor of the right project,
-- after checking its name and ref. Then copy `ack` from the output: the
-- rollback script refuses to run unless it starts with
--   set atlas.rollback_exported = '<ack>';
-- and <ack> still matches the current counts.
--
-- src/lib/__tests__/db-rollback-guard.test.ts keeps this file read-only.
-- ═══════════════════════════════════════════════════════════════════
select jsonb_build_object(
  'exported_at', now(),
  'database', current_database(),
  'pending_deletion_requests', (select coalesce(jsonb_agg(jsonb_build_object('user_id', r.user_id, 'requested_at', r.requested_at, 'attempts', r.attempts) order by r.requested_at, r.user_id), '[]')
                                from public.deletion_requests r),
  'deletion_log', (select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'user_hash', l.user_hash, 'requested_at', l.requested_at, 'completed_at', l.completed_at, 'rows_deleted', l.rows_deleted) order by l.id), '[]')
                   from public.deletion_log l),
  'ack', (select count(*) from public.deletion_requests)::text || '/' || (select count(*) from public.deletion_log)::text
) as export;
