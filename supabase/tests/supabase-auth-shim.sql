-- TEST-ONLY shim of the parts of Supabase the migrations rely on, so they can
-- be tested in an in-process Postgres (PGlite) without Docker. On a real
-- Supabase project these objects already exist; never apply this file there.
create role anon nologin noinherit;
create role authenticated nologin noinherit;
create role service_role nologin noinherit bypassrls;

create schema auth;
create table auth.users (id uuid primary key, email text);

-- Same contract as Supabase's auth.uid(): the "sub" claim of the request JWT.
create function auth.uid() returns uuid language sql stable as $$
  select nullif(coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'
  ), '')::uuid
$$;

grant usage on schema public, auth to anon, authenticated, service_role;
grant execute on function auth.uid() to anon, authenticated, service_role;
-- The service role can do everything (as on Supabase).
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
