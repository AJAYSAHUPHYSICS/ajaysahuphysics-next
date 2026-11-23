-- ═══════════════════════════════════════════════════════════════════
-- READ-ONLY schema inventory (audit F10). Runbook section 9, C.1.
--
-- It returns ONE row: a JSON summary of the database's structure. It reads
-- only system catalogs and aggregate counts: no table contents, no user
-- data, no emails. It changes nothing. src/lib/__tests__/schema-inventory
-- .test.ts fails if this file gains any write, DDL, privilege or session
-- statement.
--
-- PRODUCTION: run only with the owner's explicit approval, in the SQL
-- editor of the right project, after checking its name and ref, with
-- this as the FIRST line of the same run (runbook section 9, C.1a):
--   set transaction read only;
-- Save the JSON output privately. It names objects; it contains no data.
--
-- What it answers before the four Phase 2B migrations are applied:
--   atlas_conflicts  tables, functions and index names the migrations
--                    would create that already exist in `public` (the
--                    migrations would fail: they use CREATE, not CREATE IF
--                    NOT EXISTS). Index names share one namespace with
--                    every relation in the schema, so a relation of any
--                    kind with that name is a collision.
--   other_public     every other non-index relation and function in
--                    `public`, selected by kind, never by name. Migration
--                    20261120000000's schema-wide REVOKEs would remove
--                    client privileges on all of them, and its
--                    `grant usage on all sequences` would ADD usage for
--                    `authenticated` on every sequence (audit M-4)
--   sequences        every sequence, the column that owns it, and its
--                    client grants
--   client_grants    grants to PUBLIC, anon, authenticated and
--                    service_role on every table, view and sequence, read
--                    from pg_class.relacl so the caller's own role
--                    memberships cannot hide any
--   default_acls     default privileges for future objects in `public`
--   rls, policies, functions, triggers, extensions, migration history,
--   and auth user and storage bucket counts (numbers only)
-- ═══════════════════════════════════════════════════════════════════
with
atlas_tables(name) as (
  values ('app_config'), ('profiles'), ('consents'), ('bookmarks'), ('checklist_items'), ('revision_rounds'),
         ('mistakes'), ('goals'), ('streaks'), ('deletion_requests'), ('deletion_log'), ('deletion_rate')
),
atlas_functions(name) as (
  values ('atlas_touch'), ('atlas_row_cap'), ('atlas_protect_profile'), ('atlas_consents_append_only'),
         ('latest_consent'), ('parental_consent_verified'), ('sync_allowed'), ('enable_sync'), ('disable_sync'),
         ('export_my_data'), ('request_account_deletion'), ('purge_user_data'), ('account_deletion_enabled'),
         ('deletion_rate_wait')
),
atlas_indexes(name) as (
  values ('consents_user_kind_idx'), ('mistakes_user_question_idx'), ('bookmarks_user_updated_idx'),
         ('checklist_user_updated_idx'), ('revision_user_updated_idx'), ('mistakes_user_updated_idx'),
         ('goals_user_updated_idx'), ('deletion_rate_lookup')
),
pub_rel as (
  select c.oid, c.relname as name, c.relkind as kind, pg_get_userbyid(c.relowner) as owner,
         c.relrowsecurity as rls, c.relforcerowsecurity as force_rls, c.reltuples::bigint as row_estimate, c.relacl
  from pg_class c
  where c.relnamespace = 'public'::regnamespace
),
-- Sequences that belong to an Atlas table's column (serial / identity).
atlas_owned_seq as (
  select d.objid as oid
  from pg_depend d join pg_class t on t.oid = d.refobjid
  where d.classid = 'pg_class'::regclass and d.refclassid = 'pg_class'::regclass and d.deptype in ('a', 'i')
    and t.relnamespace = 'public'::regnamespace and t.relname in (select name from atlas_tables)
),
rel_grants as (
  select r.name, r.kind, case when a.grantee = 0 then 'PUBLIC' else pg_get_userbyid(a.grantee) end as grantee,
         a.privilege_type as privilege
  from pub_rel r cross join lateral aclexplode(r.relacl) a
  where r.kind in ('r', 'p', 'v', 'm', 'f', 'S')
),
pub_fn as (
  select p.proname as name, pg_get_function_identity_arguments(p.oid) as args, p.prosecdef as security_definer,
         coalesce(array_to_string(p.proconfig, ','), '') as config, pg_get_userbyid(p.proowner) as owner
  from pg_proc p
  where p.pronamespace = 'public'::regnamespace
)
select jsonb_build_object(
  'generated_at', now(),
  'database', current_database(),
  'server_version', current_setting('server_version'),
  'schemas', (select coalesce(jsonb_agg(n.nspname order by n.nspname), '[]') from pg_namespace n
              where n.nspname not like 'pg\_%' and n.nspname <> 'information_schema'),
  'extensions', (select coalesce(jsonb_agg(jsonb_build_object('name', e.extname, 'version', e.extversion, 'schema', e.extnamespace::regnamespace::text) order by e.extname), '[]') from pg_extension e),
  'atlas_conflicts', jsonb_build_object(
    'tables', (select coalesce(jsonb_agg(t.name order by t.name), '[]') from atlas_tables t where exists (select 1 from pub_rel r where r.name = t.name)),
    'functions', (select coalesce(jsonb_agg(f.name order by f.name), '[]') from atlas_functions f where exists (select 1 from pub_fn p where p.name = f.name)),
    'indexes', (select coalesce(jsonb_agg(i.name order by i.name), '[]') from atlas_indexes i where exists (select 1 from pub_rel r where r.name = i.name))
  ),
  'other_public', jsonb_build_object(
    'relations', (select coalesce(jsonb_agg(jsonb_build_object('name', r.name, 'kind', r.kind, 'owner', r.owner, 'rls', r.rls, 'row_estimate', r.row_estimate) order by r.name), '[]')
                  -- Selected by kind, never by name: indexes are untouched by
                  -- the revokes; an Atlas name is excluded only as a table.
                  from pub_rel r
                  where r.kind in ('r', 'p', 'v', 'm', 'f', 'S')
                    and not (r.kind in ('r', 'p') and r.name in (select name from atlas_tables))
                    and r.oid not in (select oid from atlas_owned_seq)),
    'functions', (select coalesce(jsonb_agg(jsonb_build_object('name', p.name, 'args', p.args, 'security_definer', p.security_definer, 'owner', p.owner) order by p.name), '[]')
                  from pub_fn p where p.name not in (select name from atlas_functions))
  ),
  'public_tables', (select coalesce(jsonb_agg(jsonb_build_object('name', r.name, 'rls', r.rls, 'force_rls', r.force_rls, 'owner', r.owner, 'row_estimate', r.row_estimate) order by r.name), '[]')
                    from pub_rel r where r.kind in ('r', 'p')),
  'policies', (select coalesce(jsonb_agg(jsonb_build_object('table', pol.tablename, 'name', pol.policyname, 'cmd', pol.cmd, 'roles', pol.roles) order by pol.tablename, pol.policyname), '[]')
               from pg_policies pol where pol.schemaname = 'public'),
  'public_functions', (select coalesce(jsonb_agg(jsonb_build_object('name', p.name, 'args', p.args, 'security_definer', p.security_definer, 'config', p.config) order by p.name, p.args), '[]') from pub_fn p),
  'triggers', (select coalesce(jsonb_agg(jsonb_build_object('table', c.relname, 'name', t.tgname, 'enabled', t.tgenabled) order by c.relname, t.tgname), '[]')
               from pg_trigger t join pg_class c on c.oid = t.tgrelid
               where c.relnamespace = 'public'::regnamespace and not t.tgisinternal),
  'sequences', (select coalesce(jsonb_agg(jsonb_build_object(
                  'name', r.name, 'owner', r.owner,
                  'owned_by', (select t.relname || '.' || a.attname from pg_depend d
                               join pg_class t on t.oid = d.refobjid
                               join pg_attribute a on a.attrelid = t.oid and a.attnum = d.refobjsubid
                               where d.objid = r.oid and d.classid = 'pg_class'::regclass and d.deptype in ('a', 'i') limit 1),
                  'client_grants', (select coalesce(jsonb_agg(g.grantee || ':' || g.privilege order by g.grantee, g.privilege), '[]')
                                    from rel_grants g where g.name = r.name and g.kind = 'S'
                                      and g.grantee in ('PUBLIC', 'anon', 'authenticated', 'service_role')))
                order by r.name), '[]') from pub_rel r where r.kind = 'S'),
  'client_grants', (select coalesce(jsonb_agg(jsonb_build_object('relation', g.name, 'kind', g.kind, 'grantee', g.grantee, 'privilege', g.privilege) order by g.name, g.grantee, g.privilege), '[]')
                    from rel_grants g where g.grantee in ('PUBLIC', 'anon', 'authenticated', 'service_role')),
  'default_acls', (select coalesce(jsonb_agg(jsonb_build_object('role', pg_get_userbyid(da.defaclrole), 'object_type', da.defaclobjtype, 'acl', da.defaclacl::text)
                                   order by pg_get_userbyid(da.defaclrole), da.defaclobjtype), '[]')
                   from pg_default_acl da where da.defaclnamespace = 'public'::regnamespace),
  -- These tables may not exist. query_to_xml parses its query only when
  -- called, so the CASE guards really do skip a missing table.
  'migration_history', (case when to_regclass('supabase_migrations.schema_migrations') is null then null
                        else (xpath('/row/v/text()', query_to_xml('select string_agg(version, '','' order by version) as v from supabase_migrations.schema_migrations', false, true, '')))[1]::text end),
  'auth_user_count', (case when to_regclass('auth.users') is null then null
                      else (xpath('/row/n/text()', query_to_xml('select count(*) as n from auth.users', false, true, '')))[1]::text::bigint end),
  'storage_bucket_count', (case when to_regclass('storage.buckets') is null then null
                           else (xpath('/row/n/text()', query_to_xml('select count(*) as n from storage.buckets', false, true, '')))[1]::text::bigint end)
) as inventory;
