-- ═══════════════════════════════════════════════════════════════════
-- Project Atlas, Phase 2B: student accounts and cloud copies of study data
--
-- STAGING FIRST. Never apply to production without the owner's approval
-- and documented legal sign-off (docs/phase-2/LEGAL_REVIEW_CHECKLIST.md).
--
-- Principles
--   * Local-first: the browser's localStorage stays the source of truth on
--     a device. These tables hold an optional copy for signed-in students.
--   * Every row belongs to one auth user (user_id) and is visible only to
--     that user (RLS). Anonymous visitors can't touch any table.
--   * Writes to study tables are allowed only while the database itself says
--     sync is enabled for that user (consent gate, enforced here, not in the
--     UI). Enabling sync requires current consent records AND the global
--     launch switches, which only the service role can set.
--   * Client-generated IDs are kept, so repeated uploads are idempotent.
--   * Deletions propagate between devices as tombstones (deleted_at).
--   * No behavioural data: activity log, searches, reading progress and
--     recently-viewed lists are never stored here.
-- ═══════════════════════════════════════════════════════════════════

-- ── Launch switches (service role only) ─────────────────────────────
create table public.app_config (
  key text primary key check (key in ('adult_sync_permitted', 'minor_sync_permitted', 'consent_version')),
  value text not null,
  updated_at timestamptz not null default now()
);
insert into public.app_config (key, value) values
  ('adult_sync_permitted', 'false'),   -- flips only after legal sign-off
  ('minor_sync_permitted', 'false'),   -- flips only after a verified parental-consent process exists
  ('consent_version', '2026-11-draft'); -- notice version students must have accepted

-- ── Profiles ─────────────────────────────────────────────────────────
create table public.profiles (
  user_id      uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  display_name text check (display_name is null or length(display_name) between 1 and 60),
  class_level  smallint check (class_level in (11, 12)),
  exam_targets text[] not null default '{}' check (exam_targets <@ array['boards', 'neet', 'jee-main', 'jee-advanced']::text[]),
  -- Self-declared age band. NOT age verification (see legal checklist).
  age_band     text check (age_band in ('under-18', '18-plus')),
  sync_enabled boolean not null default false,  -- set only by enable_sync()/disable_sync()
  deletion_requested_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Consent records (append-only audit trail) ────────────────────────
create table public.consents (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind        text not null check (kind in ('terms', 'privacy', 'cloud-sync', 'parental')),
  version     text not null check (length(version) between 1 and 40),
  granted     boolean not null,
  -- How consent was obtained. 'self' for the student's own choice; parental
  -- consent methods are recorded only by a verified server-side process.
  method      text not null default 'self' check (method in ('self', 'parent-verified')),
  recorded_at timestamptz not null default now()
);
create index consents_user_kind_idx on public.consents (user_id, kind, recorded_at desc);

-- ── Study tables (mirror the local stores) ───────────────────────────
create table public.bookmarks (
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  bookmark_id   text not null check (length(bookmark_id) between 1 and 120),
  cls           text not null check (cls in ('11', '12')),
  slug          text not null check (slug ~ '^[a-z0-9-]{1,80}$'),
  type          text not null check (type in ('chapter', 'notes', 'jee-notes', 'short-notes', 'formula-sheet', 'dpp', 'jee-dpp', 'pyq')),
  chapter_name  text not null check (length(chapter_name) between 1 and 120),
  label         text not null check (length(label) between 1 and 120),
  -- Same-site path only: the second character can't be '/', so a
  -- protocol-relative URL such as '//host' can't be stored.
  path          text not null check (path ~ '^/[a-z0-9-][a-z0-9/-]{0,159}$'),
  bookmarked_at timestamptz not null,
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz,
  primary key (user_id, bookmark_id)
);

create table public.checklist_items (
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  cls        text not null check (cls in ('11', '12')),
  slug       text not null check (slug ~ '^[a-z0-9-]{1,80}$'),
  item       text not null check (item in ('notes', 'formulaSheet', 'dpp', 'pyq')),
  done       boolean not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, cls, slug, item)
);

create table public.revision_rounds (
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  cls          text not null check (cls in ('11', '12')),
  slug         text not null check (slug ~ '^[a-z0-9-]{1,80}$'),
  round        smallint not null check (round between 1 and 3),
  completed_at timestamptz not null,
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz,
  primary key (user_id, cls, slug, round)
);

create table public.mistakes (
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id            uuid not null,  -- the existing local mistake id
  cls           text not null check (cls in ('11', '12')),
  slug          text not null check (slug ~ '^[a-z0-9-]{1,80}$'),
  chapter_name  text not null check (length(chapter_name) between 1 and 120),
  resource_type text not null check (resource_type in ('dpp', 'pyq')),
  -- Namespaced question reference: 'legacy:<dpp|pyq>:<cls>/<slug>#<position>' for
  -- records made against the withheld legacy content, or a rebuilt question
  -- id ('q-…', 'pyq-<exam>-<year>-…'). The namespaces never collide, so an old
  -- mistake can't silently attach to a rebuilt question.
  question_ref  text check (question_ref is null or question_ref ~ '^(legacy:(dpp|pyq):(11|12)/[a-z0-9-]{1,80}#[0-9]{1,5}|q-[a-z0-9-]{1,100}|pyq-[a-z0-9-]{1,100})$'),
  category      text check (category is null or category in ('conceptual', 'calculation', 'formula', 'reading', 'silly')),
  concept_tag   text not null check (length(concept_tag) <= 120),
  difficulty    text not null check (difficulty in ('easy', 'medium', 'hard')),
  note          text not null default '' check (length(note) <= 2000),
  created_at    timestamptz not null,
  resolved_at   timestamptz,
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz,
  primary key (user_id, id)
);
create index mistakes_user_question_idx on public.mistakes (user_id, question_ref) where question_ref is not null;

create table public.goals (
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  goal_type    text not null check (goal_type ~ '^[a-z0-9-]{1,60}$'),
  activated_at timestamptz not null,
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz,
  primary key (user_id, goal_type)
);

create table public.streaks (
  user_id          uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  current_days     integer not null check (current_days between 0 and 100000),
  longest_days     integer not null check (longest_days between 0 and 100000),
  last_active_date date,  -- the student's local calendar day
  updated_at       timestamptz not null default now(),
  check (longest_days >= current_days)
);

-- ── Account deletion requests (retry-safe) and a PII-free audit log ──
create table public.deletion_requests (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  requested_at timestamptz not null default now(),
  attempts     integer not null default 0
);
create table public.deletion_log (
  id           bigint generated always as identity primary key,
  user_hash    text not null,          -- sha256 of the user id: proves completion without keeping the id
  requested_at timestamptz,
  completed_at timestamptz not null default now(),
  rows_deleted integer not null
);

-- Per-user recent-activity index for sync pulls.
create index bookmarks_user_updated_idx on public.bookmarks (user_id, updated_at);
create index checklist_user_updated_idx on public.checklist_items (user_id, updated_at);
create index revision_user_updated_idx on public.revision_rounds (user_id, updated_at);
create index mistakes_user_updated_idx on public.mistakes (user_id, updated_at);
create index goals_user_updated_idx on public.goals (user_id, updated_at);

-- ═══ Triggers ═══════════════════════════════════════════════════════
create function public.atlas_touch() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  if tg_op = 'UPDATE' and new.user_id is distinct from old.user_id then
    raise exception 'user_id cannot change' using errcode = '42501';
  end if;
  return new;
end $$;

-- Per-student row limit. Arguments: the limit, then the table's key columns
-- besides user_id. An INSERT whose key already exists is the conflict path
-- of an upsert (the sync engine uploads with INSERT … ON CONFLICT DO
-- UPDATE, and PostgreSQL fires BEFORE INSERT triggers for those rows too),
-- so it is an update of an existing row and never counts against the limit.
create function public.atlas_row_cap() returns trigger
language plpgsql set search_path = '' as $$
declare
  cap integer := tg_argv[0]::integer;
  n integer;
  cond text := '';
  already boolean;
begin
  if tg_nargs > 1 then
    for i in 1 .. tg_nargs - 1 loop
      cond := cond || format(' and %I = ($2).%I', tg_argv[i], tg_argv[i]);
    end loop;
    execute format('select exists (select 1 from %I.%I where user_id = $1%s)', tg_table_schema, tg_table_name, cond) into already using new.user_id, new;
    if already then
      return new;
    end if;
  end if;
  execute format('select count(*) from %I.%I where user_id = $1', tg_table_schema, tg_table_name) into n using new.user_id;
  if n >= cap then
    raise exception 'row limit % reached for %', cap, tg_table_name using errcode = '54000';
  end if;
  return new;
end $$;

create function public.atlas_protect_profile() returns trigger
language plpgsql set search_path = '' as $$
begin
  -- sync_enabled and deletion_requested_at change only inside the
  -- security-definer functions below. Those run as the table owner, so a
  -- write made directly by a client role is the only kind refused here.
  -- (Defence in depth: client roles also lack column privileges on these
  -- columns; see the grants at the end.)
  if current_user in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      new.sync_enabled := false;
      new.deletion_requested_at := null;
    elsif new.sync_enabled is distinct from old.sync_enabled or new.deletion_requested_at is distinct from old.deletion_requested_at then
      raise exception 'sync_enabled and deletion_requested_at can only change through their functions' using errcode = '42501';
    end if;
  end if;
  -- Declaring under-18 always switches cloud copies off until re-enabled under the minor rules.
  if tg_op = 'UPDATE' and new.age_band = 'under-18' and old.age_band is distinct from 'under-18' then
    new.sync_enabled := false;
  end if;
  return new;
end $$;

create function public.atlas_consents_append_only() returns trigger
language plpgsql set search_path = '' as $$
begin
  -- Students (client roles) can never rewrite or remove consent history.
  -- Owner-level operations (account purge, auth-user cascade) may delete.
  if current_user in ('authenticated', 'anon') then
    raise exception 'consent records are append-only' using errcode = '42501';
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
do $$
declare t text;
begin
  foreach t in array array['profiles', 'bookmarks', 'checklist_items', 'revision_rounds', 'mistakes', 'goals', 'streaks'] loop
    execute format('create trigger %I before insert or update on public.%I for each row execute function public.atlas_touch()', t || '_touch', t);
  end loop;
end $$;

create trigger bookmarks_cap before insert on public.bookmarks for each row execute function public.atlas_row_cap('1000', 'bookmark_id');
create trigger mistakes_cap before insert on public.mistakes for each row execute function public.atlas_row_cap('1000', 'id');
create trigger revision_cap before insert on public.revision_rounds for each row execute function public.atlas_row_cap('300', 'cls', 'slug', 'round');
create trigger checklist_cap before insert on public.checklist_items for each row execute function public.atlas_row_cap('400', 'cls', 'slug', 'item');
create trigger goals_cap before insert on public.goals for each row execute function public.atlas_row_cap('50', 'goal_type');
-- Consent history is append-only, so bound it per student (always a new row: no key arguments).
create trigger consents_cap before insert on public.consents for each row execute function public.atlas_row_cap('200');
create trigger profiles_protect before insert or update on public.profiles for each row execute function public.atlas_protect_profile();
create trigger consents_no_update before update or delete on public.consents for each row execute function public.atlas_consents_append_only();

-- ═══ Consent gate ═══════════════════════════════════════════════════
-- The caller's latest decision for one consent kind, for the CURRENT notice
-- version (a new version needs a new decision). Service role only.
create function public.latest_consent(k text) returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select c.granted from public.consents c
    where c.user_id = auth.uid() and c.kind = k
      and c.version = (select value from public.app_config where key = 'consent_version')
    order by c.recorded_at desc, c.id desc limit 1), false)
$$;

-- True when the caller's latest parental consent for the current version is
-- granted AND was recorded by the verified server process. Students can't
-- insert 'parental' rows at all (see the consents policy).
create function public.parental_consent_verified() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select c.granted and c.method = 'parent-verified' from public.consents c
    where c.user_id = auth.uid() and c.kind = 'parental'
      and c.version = (select value from public.app_config where key = 'consent_version')
    order by c.recorded_at desc, c.id desc limit 1), false)
$$;

-- True only when the database itself allows the current user to store study
-- data RIGHT NOW. Evaluated on every write (insert and update policies), so
-- each of these takes effect immediately, even for a student who already
-- enabled sync:
--   * the owner switching a launch switch off (kill switch);
--   * the student withdrawing terms, privacy or cloud-sync consent, or a
--     new notice version they haven't accepted;
--   * a pending account deletion (the profile flag OR a deletion request,
--     so a profile re-created during a pending deletion can't upload);
--   * for under-18s: the minors switch AND verified parental consent.
create function public.sync_allowed() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select p.sync_enabled
       and p.deletion_requested_at is null
       and not exists (select 1 from public.deletion_requests d where d.user_id = p.user_id)
       and public.latest_consent('terms')
       and public.latest_consent('privacy')
       and public.latest_consent('cloud-sync')
       and case p.age_band
             when '18-plus' then coalesce((select a.value = 'true' from public.app_config a where a.key = 'adult_sync_permitted'), false)
             when 'under-18' then coalesce((select a.value = 'true' from public.app_config a where a.key = 'minor_sync_permitted'), false)
                                  and public.parental_consent_verified()
             else false
           end
    from public.profiles p where p.user_id = auth.uid()), false)
$$;

-- Switches cloud copies on for the caller, or explains why it can't.
create function public.enable_sync() returns text
language plpgsql security definer set search_path = '' as $$
declare
  p public.profiles;
  minor_ok boolean := (select value = 'true' from public.app_config where key = 'minor_sync_permitted');
  adult_ok boolean := (select value = 'true' from public.app_config where key = 'adult_sync_permitted');
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select * into p from public.profiles where user_id = auth.uid();
  if not found then return 'no-profile'; end if;
  -- A deletion request blocks sync even if the profile was re-created after a purge.
  if p.deletion_requested_at is not null or exists (select 1 from public.deletion_requests d where d.user_id = auth.uid()) then
    return 'deletion-pending';
  end if;
  if p.age_band is null then return 'age-band-required'; end if;
  if not (public.latest_consent('terms') and public.latest_consent('privacy') and public.latest_consent('cloud-sync')) then return 'consent-required'; end if;
  if p.age_band = 'under-18' then
    if not coalesce(minor_ok, false) then return 'not-available-for-under-18'; end if;
    if not public.parental_consent_verified() then return 'parental-consent-required'; end if;
  elsif not coalesce(adult_ok, false) then
    return 'not-available-yet';
  end if;
  -- Runs as the table owner, so atlas_protect_profile allows this change.
  update public.profiles set sync_enabled = true where user_id = auth.uid();
  return 'enabled';
end $$;

create function public.disable_sync() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  update public.profiles set sync_enabled = false where user_id = auth.uid();
end $$;

-- ═══ Data rights ════════════════════════════════════════════════════
-- Everything stored about the caller, as JSON (works even after sync is switched off).
create function public.export_my_data() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'exportedAt', now(),
    'profile', (select to_jsonb(p) from public.profiles p where p.user_id = auth.uid()),
    'consents', coalesce((select jsonb_agg(to_jsonb(c) order by c.id) from public.consents c where c.user_id = auth.uid()), '[]'::jsonb),
    'bookmarks', coalesce((select jsonb_agg(to_jsonb(b)) from public.bookmarks b where b.user_id = auth.uid()), '[]'::jsonb),
    'checklistItems', coalesce((select jsonb_agg(to_jsonb(x)) from public.checklist_items x where x.user_id = auth.uid()), '[]'::jsonb),
    'revisionRounds', coalesce((select jsonb_agg(to_jsonb(r)) from public.revision_rounds r where r.user_id = auth.uid()), '[]'::jsonb),
    'mistakes', coalesce((select jsonb_agg(to_jsonb(m)) from public.mistakes m where m.user_id = auth.uid()), '[]'::jsonb),
    'goals', coalesce((select jsonb_agg(to_jsonb(g)) from public.goals g where g.user_id = auth.uid()), '[]'::jsonb),
    'streak', (select to_jsonb(s) from public.streaks s where s.user_id = auth.uid()),
    'deletionRequest', (select to_jsonb(d) from public.deletion_requests d where d.user_id = auth.uid())
  ) where auth.uid() is not null
$$;

-- Records a deletion request (idempotent), stops further uploads immediately.
create function public.request_account_deletion() returns timestamptz
language plpgsql security definer set search_path = '' as $$
declare at timestamptz;
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  insert into public.deletion_requests (user_id) values (auth.uid())
    on conflict (user_id) do nothing;
  select requested_at into at from public.deletion_requests where user_id = auth.uid();
  update public.profiles set deletion_requested_at = at, sync_enabled = false where user_id = auth.uid();
  return at;
end $$;

-- Deletes every row the user owns (service role only; called by the
-- delete-account Edge Function before it removes the auth user, which
-- also cascades). Safe to retry: a second call deletes nothing and logs 0.
create function public.purge_user_data(target uuid) returns integer
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


-- ═══ Privileges and Row Level Security ══════════════════════════════
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke execute on all functions in schema public from public, anon, authenticated;

grant execute on function public.enable_sync(), public.disable_sync(), public.export_my_data(),
  public.request_account_deletion(), public.sync_allowed() to authenticated;
-- purge_user_data, latest_consent, parental_consent_verified and the trigger
-- functions stay service-role only.
grant execute on function public.purge_user_data(uuid) to service_role;

-- Profiles: column-level privileges. Students may set only these four
-- columns; user_id (default auth.uid()), sync_enabled, deletion_requested_at
-- and the timestamps are written by defaults, triggers and functions only.
grant select on public.profiles to authenticated;
grant insert (display_name, class_level, exam_targets, age_band) on public.profiles to authenticated;
grant update (display_name, class_level, exam_targets, age_band) on public.profiles to authenticated;
grant select, insert on public.consents to authenticated;
grant select, insert, update on public.bookmarks, public.checklist_items, public.revision_rounds,
  public.mistakes, public.goals, public.streaks to authenticated;
grant usage on all sequences in schema public to authenticated;

alter table public.app_config enable row level security;
alter table public.profiles enable row level security;
alter table public.consents enable row level security;
alter table public.bookmarks enable row level security;
alter table public.checklist_items enable row level security;
alter table public.revision_rounds enable row level security;
alter table public.mistakes enable row level security;
alter table public.goals enable row level security;
alter table public.streaks enable row level security;
alter table public.deletion_requests enable row level security;
alter table public.deletion_log enable row level security;
-- app_config, deletion_requests and deletion_log: no policies = no client access at all.

-- (select …) wrappers make PostgreSQL evaluate auth.uid() and sync_allowed()
-- once per statement instead of once per row (same result, faster).
create policy profiles_own_select on public.profiles for select to authenticated using (user_id = (select auth.uid()));
create policy profiles_own_insert on public.profiles for insert to authenticated with check (user_id = (select auth.uid()));
create policy profiles_own_update on public.profiles for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy consents_own_select on public.consents for select to authenticated using (user_id = (select auth.uid()));
-- Students record their own choices; 'parental' with 'parent-verified' only comes from the verified server process.
create policy consents_own_insert on public.consents for insert to authenticated
  with check (user_id = (select auth.uid()) and method = 'self' and kind <> 'parental');

do $$
declare t text;
begin
  foreach t in array array['bookmarks', 'checklist_items', 'revision_rounds', 'mistakes', 'goals', 'streaks'] loop
    execute format('create policy %I on public.%I for select to authenticated using (user_id = (select auth.uid()))', t || '_own_select', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (user_id = (select auth.uid()) and (select public.sync_allowed()))', t || '_own_insert', t);
    execute format('create policy %I on public.%I for update to authenticated using (user_id = (select auth.uid()) and (select public.sync_allowed())) with check (user_id = (select auth.uid()) and (select public.sync_allowed()))', t || '_own_update', t);
  end loop;
end $$;
-- No DELETE policies: students delete by tombstone (deleted_at); rows are
-- removed only by purge_user_data (account deletion) or retention purges.
