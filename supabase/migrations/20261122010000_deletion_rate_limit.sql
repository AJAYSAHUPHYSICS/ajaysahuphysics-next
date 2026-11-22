-- ═══════════════════════════════════════════════════════════════════
-- Project Atlas, Phase 2B: rate limits for account deletion (audit F6,
-- gap 3).
--
-- Per authenticated user and per action, in a sliding window:
--   'request'   request_account_deletion()           5 calls per hour
--   'function'  delete-account function, user path  6 calls per 10 minutes
-- Both actions are idempotent, so these limits only stop hammering. A
-- student retrying a pending deletion a few times is never blocked.
--
--   * Keyed on the verified identity: auth.uid() in the database, and the
--     user id the Auth server returned in the function. It is never keyed
--     on anything the caller can choose. Calls with no valid token are
--     refused before the limiter, by Supabase Auth, which has its own
--     limits.
--   * Concurrency: a per-user, per-action transaction advisory lock
--     serialises count-then-insert, so parallel calls can't exceed the limit.
--   * Not limited: the scheduled sweep (sweep secret), and the documented
--     operator procedure (purge_user_data + deleting the auth user with
--     the server key). Support-assisted deletion always works.
--   * Rows are pruned on every check, and cascade away with the auth user.
--     The table stores only a user id, an action and a timestamp.
--   * Errors fail closed: the callers treat any limiter error as "refuse".
-- ═══════════════════════════════════════════════════════════════════

create table public.deletion_rate (
  user_id uuid not null references auth.users (id) on delete cascade,
  action  text not null check (action in ('request', 'function')),
  at      timestamptz not null default now()
);
create index deletion_rate_lookup on public.deletion_rate (user_id, action, at);
alter table public.deletion_rate enable row level security;
-- No policies: no client access. The server role may read it for support,
-- like every other Atlas table (20261121000000); only the limiter writes.
revoke all on public.deletion_rate from anon, authenticated, service_role;
grant select on public.deletion_rate to service_role;

-- Returns 0 and records the call when it is allowed. Otherwise it returns
-- the seconds until the next call is allowed, and records nothing.
create function public.deletion_rate_wait(target uuid, act text) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  max_calls integer;
  win interval;
  n integer;
  oldest timestamptz;
begin
  if target is null then raise exception 'target required' using errcode = '22004'; end if;
  case act
    when 'request' then max_calls := 5; win := interval '1 hour';
    when 'function' then max_calls := 6; win := interval '10 minutes';
    else raise exception 'unknown action' using errcode = '22023';
  end case;
  perform pg_advisory_xact_lock(hashtextextended('atlas-deletion-rate:' || act || ':' || target::text, 0));
  delete from public.deletion_rate where user_id = target and action = act and at <= clock_timestamp() - win;
  select count(*), min(at) into n, oldest from public.deletion_rate where user_id = target and action = act;
  if n >= max_calls then
    return greatest(1, ceil(extract(epoch from (oldest + win - clock_timestamp())))::integer);
  end if;
  insert into public.deletion_rate (user_id, action, at) values (target, act, clock_timestamp());
  return 0;
end $$;

-- Same as 20261122000000, plus the limit after the sign-in and gate checks.
-- While the gate is off, nothing is counted or recorded.
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

revoke execute on function public.deletion_rate_wait(uuid, text) from public, anon, authenticated;
grant execute on function public.deletion_rate_wait(uuid, text) to service_role;
