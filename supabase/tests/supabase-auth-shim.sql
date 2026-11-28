-- TEST-ONLY shim of the parts of Supabase the migrations rely on, so they can
-- be tested in an in-process Postgres (PGlite) without Docker. On a real
-- Supabase project these objects already exist; never apply this file there.
create role anon nologin noinherit;
create role authenticated nologin noinherit;
create role service_role nologin noinherit bypassrls;

create schema auth;
-- email_confirmed_at is set by Supabase Auth when the address is verified.
-- Real Supabase leaves it null until then; the shim defaults it to now() so
-- test users are verified unless a test inserts null explicitly
-- (db-verified-email.test.ts does).
create table auth.users (id uuid primary key, email text, email_confirmed_at timestamptz default now());

-- Same contract as Supabase's auth.uid(): the "sub" claim of the request JWT.
create function auth.uid() returns uuid language sql stable as $$
  select nullif(coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'
  ), '')::uuid
$$;

grant usage on schema public, auth to anon, authenticated, service_role;
grant execute on function auth.uid() to anon, authenticated, service_role;
-- Default privileges as OBSERVED on a current Supabase project (staging,
-- 2026-11-21, pg_default_acl for role postgres in schema public): new tables
-- give anon, authenticated and service_role only TRUNCATE, REFERENCES and
-- TRIGGER (plus MAINTAIN), with no SELECT/INSERT/UPDATE/DELETE. An earlier
-- version of this shim granted service_role everything, which hid a
-- missing-grant defect that only real Supabase revealed.
alter default privileges in schema public grant truncate, references, trigger on tables to anon, authenticated, service_role;
