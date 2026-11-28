-- ═══════════════════════════════════════════════════════════════════
-- Withdrawing cloud-copy consent deletes the cloud copy (owner decision J,
-- option B, 2026-11-27), fail-closed and safe against in-flight uploads.
--
-- 1. public.withdraw_cloud_copies(), called by the signed-in student, does all
--    of this in ONE transaction:
--      a. locks the student's profile row and turns cloud copies off
--         (sync_enabled = false), and sets the durable withdrawal marker
--         profiles.cloud_copy_withdrawn_at = now();
--      b. records the withdrawal: if the latest 'cloud-sync' decision for the
--         current notice version is a grant, it appends a 'cloud-sync' row with
--         granted = false (method 'self'). The consent cap (section 4) never
--         refuses that row. If the insert still fails for any other reason,
--         the call goes ahead and reports "withdrawal_recorded": false; the
--         marker keeps sync blocked;
--      c. deletes every row the student owns in the six cloud-copy tables:
--         bookmarks, checklist_items, revision_rounds, mistakes, goals, streaks.
--    It returns {"withdrawn": true, "withdrawal_recorded": <bool>,
--    "deleted": {<table>: <rows>, ...}}, where withdrawal_recorded is true when
--    the consent history now shows no current cloud-copy grant (whether the
--    app recorded the withdrawal just before, or this call appended it).
--    The app calls public.begin_cloud_withdrawal() FIRST, as its own
--    transaction: it turns sync off and sets the marker, so even if this call
--    then fails, an old grant can't turn sync back on.
--
-- 2. Fail-closed withdrawal state (owner review, issue A). While
--    cloud_copy_withdrawn_at is set, NOTHING can turn sync_enabled on again
--    (trigger profiles_withdrawal_guard, for every role, including the
--    security-definer enable_sync()) unless the student's LATEST 'cloud-sync'
--    decision for the current notice version is a grant recorded AFTER the
--    withdrawal. An older grant is never enough, even if the withdrawal row
--    itself couldn't be recorded. Re-enabling with a fresh grant clears the
--    marker. Students can't write the column (no column privilege).
--
-- 3. In-flight uploads (owner review, issue B). Every INSERT or UPDATE a
--    signed-in student makes on the six tables first runs a statement-level
--    BEFORE trigger (<table>_upload_guard). It locks the student's profile row
--    FOR SHARE, which waits for any withdrawal (or disable_sync()) holding that
--    row, and then re-reads sync_enabled from the latest committed version,
--    while holding the lock until the upload commits. So:
--      - withdrawal first: the waiting upload sees sync_enabled = false and is
--        refused, even though its own snapshot predates the withdrawal;
--      - upload first: the withdrawal waits for the upload to commit, and its
--        DELETE statements (each with a fresh snapshot) remove the new rows.
--    No upload can commit after a successful withdrawal. Lock order is the same
--    on both paths (profile row first, then study rows): a statement-level
--    trigger runs before the statement locks any study row, including the
--    UPDATE half of an upsert. The refusal is reported exactly like Row Level
--    Security's own (SQLSTATE 42501, "new row violates row-level security
--    policy for table ..."). RLS and every existing policy are unchanged.
--
-- 4. Consent history cap (owner review, task 2): a withdrawal is always
--    recorded, a fresh consent can always be recorded, and history is never
--    deleted or rewritten. Past 200 rows, fresh consents are limited to 20
--    genuine changes per rolling 24 hours (owner decision 2026-11-28, Option A).
--    A first refusal for the current notice version is always recorded;
--    repeated refusals and withdrawals are skipped, never stored twice.
--    Students can't choose recorded_at since 20261126100000, a separate
--    migration.
--
-- 5. Lock order (owner review, task 3): account deletion (purge_user_data,
--    request_account_deletion) now also locks the profile row first, like
--    uploads and withdrawals, so none of them can deadlock with another.
--
-- 6. Cloud generation (owner review B1): profiles.cloud_generation, a random
--    id replaced whenever the database deletes the cloud copy outright, so a
--    device with an older merge base never reads the deletion as "deleted
--    everywhere" and removes its own progress (lib/sync/engine.ts).
--    Release order: apply this migration before any app version that
--    enables cloud sync. The sync engine reads this column; without it every
--    sync stops with an error (safely: nothing is written anywhere).
--
-- Ownership: the student is auth.uid(). No function takes a user id, so a
-- client can't name another student. No caller: 'not signed in' (42501).
--
-- NOT touched by a withdrawal: the account (auth.users), the profile row (only
-- sync_enabled, the marker and the generation change), consent history (append-only), deletion_requests,
-- deletion_log, deletion_rate, app_config, anything on the device.
--
-- Safe to retry: a second call deletes nothing, appends no second withdrawal,
-- refreshes the marker and again reports withdrawal_recorded = true.
--
-- Privileges: the functions that read or change other rows are security
-- definer with search_path pinned to '' and every object schema-qualified.
-- EXECUTE: withdraw_cloud_copies(), begin_cloud_withdrawal() and
-- atlas_upload_lock() for authenticated only (the upload guard runs as the
-- uploading student and calls the lock);
-- revoked from PUBLIC and anon. Trigger functions: revoked from PUBLIC, anon
-- and authenticated (triggers don't need EXECUTE). purge_user_data and
-- request_account_deletion keep their existing EXECUTE grants. Nothing is
-- granted to students beyond EXECUTE on the three functions above; they can't
-- write either new profiles column (no column privilege).
--
-- Independent of 20261124000000, 20261126000000 and 20261126100000 (uses only
-- objects from the first five migrations). Rollback: supabase/rollback/withdraw_cloud_copies_down.sql
-- (this is the newest migration, so that file is step 1 of the full rollback
-- procedure in supabase/rollback/student_accounts_down.sql).
-- Tested in src/lib/__tests__/db-withdraw-cloud-copies.test.ts (and, against a
-- real PostgreSQL with two sessions, db-withdraw-concurrency.test.ts).
-- ═══════════════════════════════════════════════════════════════════

-- ── 2. Durable withdrawal marker and its guard ─────────────────────
alter table public.profiles add column cloud_copy_withdrawn_at timestamptz;

-- ── 6. Cloud generation (owner review B1) ───────────────────────────
-- A random id for "this cloud copy". Replaced whenever the database deletes
-- the copy outright: by both withdrawal steps below; and account deletion
-- deletes the profile row, so a re-created profile starts with a new one.
-- Devices keep it with their merge base and discard a base from another
-- generation instead of reading the missing rows as deletions. Students can
-- read it (table SELECT), not write it (no column privilege).
alter table public.profiles add column cloud_generation uuid not null default gen_random_uuid();

create function public.atlas_withdrawal_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  latest record;
begin
  if new.sync_enabled and not coalesce(old.sync_enabled, false) and new.cloud_copy_withdrawn_at is not null then
    select c.granted, c.recorded_at into latest
      from public.consents c
     where c.user_id = new.user_id and c.kind = 'cloud-sync'
       and c.version = (select a.value from public.app_config a where a.key = 'consent_version')
     order by c.recorded_at desc, c.id desc
     limit 1;
    if latest.granted is true and latest.recorded_at > new.cloud_copy_withdrawn_at then
      new.cloud_copy_withdrawn_at := null; -- a fresh grant after the withdrawal: allowed, marker cleared
    else
      -- The app shows "a fresh consent is needed" for this message (cloud-withdrawal.ts).
      raise exception 'cloud-copy-withdrawn' using errcode = '42501', hint = 'A new cloud-copy consent is needed first.';
    end if;
  end if;
  return new;
end $$;
create trigger profiles_withdrawal_guard before update on public.profiles
  for each row execute function public.atlas_withdrawal_guard();

-- ── 3. Uploads coordinate with withdrawals on the profile row ───────
-- Locks the caller's profile row FOR SHARE and returns sync_enabled as of the
-- latest committed version (a locking read waits for, then follows, any
-- concurrent update). Volatile: it must take a fresh snapshot.
create function public.atlas_upload_lock() returns boolean
language plpgsql volatile security definer set search_path = '' as $$
declare
  ok boolean;
begin
  select p.sync_enabled into ok from public.profiles p where p.user_id = auth.uid() for share;
  return coalesce(ok, false);
end $$;

-- Statement-level guard. Runs as the caller, so it can tell a student's upload
-- (current_user = authenticated) from the server roles; only uploads are checked.
create function public.atlas_upload_guard() returns trigger
language plpgsql set search_path = '' as $$
begin
  if current_user = 'authenticated' and not public.atlas_upload_lock() then
    raise exception 'new row violates row-level security policy for table "%"', tg_table_name using errcode = '42501';
  end if;
  return null;
end $$;

do $$
declare t text;
begin
  foreach t in array array['bookmarks', 'checklist_items', 'revision_rounds', 'mistakes', 'goals', 'streaks'] loop
    execute format('create trigger %I before insert or update on public.%I for each statement execute function public.atlas_upload_guard()', t || '_upload_guard', t);
  end loop;
end $$;

-- ── 1. The withdrawal ───────────────────────────────────────────────
-- Step one, its own transaction: sync off and the marker set BEFORE any deletion is attempted (and before
-- the app records the withdrawal), so a later failure (of the consent insert, the deletion or the network)
-- can't leave an old grant usable. It also replaces the cloud generation.
-- Returns whether the student has a profile row to mark.
create function public.begin_cloud_withdrawal() returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  update public.profiles set sync_enabled = false, cloud_copy_withdrawn_at = now(), cloud_generation = gen_random_uuid() where user_id = auth.uid();
  return found;
end $$;

create function public.withdraw_cloud_copies() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  me uuid := auth.uid();
  recorded boolean := false;
  c integer;
  deleted jsonb := '{}'::jsonb;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;

  -- a. First statement: lock the profile row (waits for in-flight uploads), turn sync off, set the marker,
  --    and replace the cloud generation (the deletion below leaves no tombstones).
  update public.profiles set sync_enabled = false, cloud_copy_withdrawn_at = now(), cloud_generation = gen_random_uuid() where user_id = me;

  -- b. Record the withdrawal (no second row if the latest decision already is one, e.g. the app
  --    recorded it just before this call). The cap never refuses it (section 4); any other failure
  --    is caught, and the marker above still blocks sync.
  if public.latest_consent('cloud-sync') then
    begin
      insert into public.consents (user_id, kind, version, granted)
        values (me, 'cloud-sync', (select a.value from public.app_config a where a.key = 'consent_version'), false);
    exception when others then
      null;
    end;
  end if;
  -- "withdrawal_recorded": the consent history now shows no current cloud-copy grant.
  recorded := not public.latest_consent('cloud-sync');

  -- c. Delete the cloud copy: only this student's rows, only the six tables. Each statement sees uploads
  --    that committed while (a) waited.
  delete from public.bookmarks       where user_id = me; get diagnostics c = row_count; deleted := deleted || jsonb_build_object('bookmarks', c);
  delete from public.checklist_items where user_id = me; get diagnostics c = row_count; deleted := deleted || jsonb_build_object('checklist_items', c);
  delete from public.revision_rounds where user_id = me; get diagnostics c = row_count; deleted := deleted || jsonb_build_object('revision_rounds', c);
  delete from public.mistakes        where user_id = me; get diagnostics c = row_count; deleted := deleted || jsonb_build_object('mistakes', c);
  delete from public.goals           where user_id = me; get diagnostics c = row_count; deleted := deleted || jsonb_build_object('goals', c);
  delete from public.streaks         where user_id = me; get diagnostics c = row_count; deleted := deleted || jsonb_build_object('streaks', c);

  return jsonb_build_object('withdrawn', true, 'withdrawal_recorded', recorded, 'deleted', deleted);
end $$;

-- ── 4. Consent history cap ──────────────────────────────────────────
-- Replaces the flat 200-row cap (atlas_row_cap('200')), which could refuse a
-- withdrawal and then, forever, a fresh consent. Owner decisions 2026-11-28:
-- Option A, an allowance of 20 genuine consent changes per rolling 24 hours,
-- applied only once the 200-row history threshold is reached; and a
-- student's first refusal is always recorded.
--
-- The trigger only ever accepts, skips or refuses the row being INSERTED.
-- It never deletes, updates or rewrites an existing row (consents stay
-- append-only; students still can't update or delete them, see
-- atlas_consents_append_only), and it never changes recorded_at
-- (20261126100000: students can't set it either).
--
-- Terms, for the row being inserted (kind K, notice version V, granted G):
--   latest  = the student's latest decision for K and V, ordered like
--             public.latest_consent (recorded_at desc, id desc); null = none;
--   current = the notice version in app_config ('consent_version'), the only
--             version the app records;
--   genuine change = a decision that differs from the one before it for the
--             same K and V. A first decision counts only if it is a grant
--             (a first "no" changes nothing).
-- Rules, in this order:
--   a. a repeated refusal or withdrawal (G = false, latest = false) is skipped
--      silently: the INSERT succeeds and adds no row. Retries can never pile
--      up duplicates, at any history size;
--   b. a genuine withdrawal (G = false, latest = true) is ALWAYS recorded;
--   c. a first refusal for the CURRENT version (G = false, latest = null,
--      V = current) is ALWAYS recorded. A first refusal for any other version
--      falls through to d–f: a student can type any version text, so always
--      recording those would let them grow the history without limit;
--   d. below the threshold (fewer than 200 rows for this student, all kinds,
--      versions and ages counted): recorded, as before;
--   e. at or above the threshold, a genuine grant (G = true, latest is not
--      true: first grant for V, or a fresh consent after a withdrawal or a
--      refusal) is recorded while the student's genuine changes recorded in
--      the rolling window (recorded_at between now() - 24 hours and now(),
--      where now() is the inserting transaction's start time) number fewer
--      than daily_allowance. Withdrawals in the window count as changes too;
--   f. anything else at or above the threshold (a repeated grant, a first
--      refusal for a non-current version, or a fresh grant beyond the
--      allowance) is refused with the old error (54000, "row limit 200
--      reached for consents").
-- Once a student reaches 200 rows they stay at or above it (rows are never
-- removed), so from then on every genuine grant is subject to the allowance.
-- Growth past 200 is bounded: at most daily_allowance grants a day, each
-- genuine withdrawal needs a grant before it, and at most one first refusal
-- per kind for the current version.
-- Concurrency: every insert first takes a per-student transaction advisory
-- lock and holds it until commit, and every count below is a fresh read
-- taken after the lock (this function is volatile), so a concurrent insert
-- for the same student waits and then sees the committed row: two inserts
-- can't both use the last allowance, or both record a "first" refusal. It is
-- the last lock taken on any path, so it can't join a deadlock cycle.
create function public.atlas_consent_cap() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  threshold constant integer := 200;
  -- Owner decision 2026-11-28 (Option A, approved): 20 genuine changes per rolling 24 hours.
  daily_allowance constant integer := 20;
  latest boolean;
  total integer;
  recent integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('atlas-consents:' || new.user_id::text, 0));
  select c.granted into latest from public.consents c
   where c.user_id = new.user_id and c.kind = new.kind and c.version = new.version
   order by c.recorded_at desc, c.id desc
   limit 1;
  if not new.granted then
    if latest is false then return null; end if;                                  -- a
    if latest is true then return new; end if;                                    -- b
    if new.version = (select a.value from public.app_config a where a.key = 'consent_version') then
      return new;                                                                 -- c
    end if;
  end if;
  select count(*) into total from public.consents c where c.user_id = new.user_id;
  if total < threshold then return new; end if;                                   -- d
  if new.granted and latest is not true then                                      -- e
    select count(*) into recent
      from (select c.granted, c.recorded_at,
                   lag(c.granted) over (partition by c.kind, c.version order by c.recorded_at, c.id) as prev
              from public.consents c
             where c.user_id = new.user_id) h
     where h.recorded_at between now() - interval '24 hours' and now()
       and h.granted is distinct from coalesce(h.prev, false);
    if recent < daily_allowance then return new; end if;
  end if;
  raise exception 'row limit % reached for consents', threshold using errcode = '54000'; -- f
end $$;
drop trigger consents_cap on public.consents;
create trigger consents_cap before insert on public.consents
  for each row execute function public.atlas_consent_cap();

-- (Students can't choose consents.recorded_at: 20261126100000, a separate
-- migration, so a rollback of this one can't reopen it.)

-- ── 5. One lock order: the profile row first ────────────────────────
-- Every path that writes a student's study data or consents takes that
-- student's profile row before anything else: uploads (FOR SHARE, the guard
-- above), begin_cloud_withdrawal(), withdraw_cloud_copies(), enable_sync(),
-- disable_sync() (their first or only row lock is the profile UPDATE), and now
-- account deletion. Before this, purge_user_data() locked the deletion
-- request and the study rows first and the profile last, so an upload holding
-- the profile lock while writing a row the purge had already locked could
-- deadlock with it; request_account_deletion() locked the deletion request
-- before the profile, and so could deadlock with a purge. Both are redefined
-- below with ONE change each: the profile row is locked first. Everything else
-- is exactly as before (same checks, gate, rate limit, deletions and log).
-- From 20261120000000; still service role only (EXECUTE is kept by create or replace).
create or replace function public.purge_user_data(target uuid) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  n integer := 0;
  c integer;
  req timestamptz;
begin
  -- Profile first (waits for in-flight uploads and withdrawals; later uploads find no profile and are refused).
  perform 1 from public.profiles where user_id = target for update;
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

-- From 20261122010000 (gate, then rate limit); only the profile lock is new.
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
  perform 1 from public.profiles where user_id = auth.uid() for no key update; -- profile first
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

-- ── Privileges ──────────────────────────────────────────────────────
revoke execute on function public.withdraw_cloud_copies() from public, anon;
grant execute on function public.withdraw_cloud_copies() to authenticated;
revoke execute on function public.begin_cloud_withdrawal() from public, anon;
grant execute on function public.begin_cloud_withdrawal() to authenticated;
revoke execute on function public.atlas_upload_lock() from public, anon;
grant execute on function public.atlas_upload_lock() to authenticated;
revoke execute on function public.atlas_upload_guard() from public, anon, authenticated;
revoke execute on function public.atlas_withdrawal_guard() from public, anon, authenticated;
revoke execute on function public.atlas_consent_cap() from public, anon, authenticated;
