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
-- editor of the right project, after checking its name and ref. Run it
-- inside a read-only transaction:
--   begin transaction read only;  <this file>  ;  rollback;
-- Save the JSON output privately. It names objects; it contains no data.
--
-- What it answers before the four Phase 2B migrations are applied:
--   atlas_conflicts  objects the migrations would create that already
--                    exist (the migrations would fail: they use CREATE,
--                    not CREATE IF NOT EXISTS)
--   other_public     everything else in `public`, which migration
--                    20261120000000 would lose client privileges on (its
--                    schema-wide REVOKEs, audit M-4)
--   rls, policies, functions, triggers, grants, extensions, migration
--   history, and auth user and table row counts (numbers only)
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
pub_rel as (
  select c.relname as name, c.relkind as kind, pg_get_userbyid(c.relowner) as owner,
         c.relrowsecurity as rls, c.relforcerowsecurity as force_rls, c.reltuples::bigint as row_estimate
  from pg_class c
  where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p', 'v', 'm', 'f', 'S')
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
    'functions', (select coalesce(jsonb_agg(f.name order by f.name), '[]') from atlas_functions f where exists (select 1 from pub_fn p where p.name = f.name))
  ),
  'other_public', jsonb_build_object(
    'relations', (select coalesce(jsonb_agg(jsonb_build_object('name', r.name, 'kind', r.kind, 'owner', r.owner, 'rls', r.rls, 'row_estimate', r.row_estimate) order by r.name), '[]')
                  from pub_rel r where r.name not in (select name from atlas_tables) and r.name not like '%\_seq' escape '\' and r.name not like '%\_pkey' escape '\'),
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
  'client_grants', (select coalesce(jsonb_agg(jsonb_build_object('table', g.table_name, 'grantee', g.grantee, 'privilege', g.privilege_type) order by g.table_name, g.grantee, g.privilege_type), '[]')
                    from information_schema.role_table_grants g
                    where g.table_schema = 'public' and g.grantee in ('anon', 'authenticated', 'service_role')),
  -- These tables may not exist. query_to_xml parses its query only when
  -- called, so the CASE guards really do skip a missing table.
  'migration_history', (case when to_regclass('supabase_migrations.schema_migrations') is null then null
                        else (xpath('/row/v/text()', query_to_xml('select string_agg(version, '','' order by version) as v from supabase_migrations.schema_migrations', false, true, '')))[1]::text end),
  'auth_user_count', (case when to_regclass('auth.users') is null then null
                      else (xpath('/row/n/text()', query_to_xml('select count(*) as n from auth.users', false, true, '')))[1]::text::bigint end),
  'storage_bucket_count', (case when to_regclass('storage.buckets') is null then null
                           else (xpath('/row/n/text()', query_to_xml('select count(*) as n from storage.buckets', false, true, '')))[1]::text::bigint end)
) as inventory;
