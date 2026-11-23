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
-- `ack` binds the export to the exact records it contains:
--   v2:<pending count>/<log count>:<sha256>
-- The SHA-256 covers every field of every row of both tables, in a fixed
-- order. Timestamps are written as epoch seconds, so the hash doesn't depend
-- on the session's time zone. The rollback script recomputes it, and refuses
-- unless it matches. So an export is valid only until any of those records
-- changes: a request replaced by another, an attempt count, a log row.
-- Changing it needs a matching change to the guard in
-- student_accounts_down.sql. db-rollback-guard.test.ts checks that the two
-- agree.
--
-- Run it with the owner's approval, in the SQL editor of the right project,
-- after checking its name and ref. Then start the rollback script with
--   set atlas.rollback_exported = '<ack>';
--
-- src/lib/__tests__/db-rollback-guard.test.ts keeps this file read-only.
-- ═══════════════════════════════════════════════════════════════════
with
req as (
  select coalesce(jsonb_agg(jsonb_build_object('user_id', r.user_id, 'requested_at', r.requested_at, 'attempts', r.attempts) order by r.user_id), '[]') as rows,
         count(*) as n,
         coalesce(string_agg(r.user_id::text || '|' || extract(epoch from r.requested_at)::text || '|' || r.attempts::text, E'\n' order by r.user_id), '') as canon
  from public.deletion_requests r
),
log as (
  select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'user_hash', l.user_hash, 'requested_at', l.requested_at, 'completed_at', l.completed_at, 'rows_deleted', l.rows_deleted) order by l.id), '[]') as rows,
         count(*) as n,
         coalesce(string_agg(l.id::text || '|' || l.user_hash || '|' || coalesce(extract(epoch from l.requested_at)::text, '') || '|' || extract(epoch from l.completed_at)::text || '|' || l.rows_deleted::text, E'\n' order by l.id), '') as canon
  from public.deletion_log l
)
select jsonb_build_object(
  'exported_at', now(),
  'database', current_database(),
  'pending_deletion_requests', req.rows,
  'deletion_log', log.rows,
  'ack', 'v2:' || req.n::text || '/' || log.n::text || ':' || encode(sha256(convert_to(req.canon || E'\n--\n' || log.canon, 'UTF8')), 'hex')
) as export
from req, log;
