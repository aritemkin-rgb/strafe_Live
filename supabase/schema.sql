-- STRAFE.LIVE Supabase schema
-- Run in Supabase SQL editor before enabling production storage.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  callsign text,
  marketing_consent boolean not null default false,
  source text,
  selected_theater text,
  selected_side text,
  created_at timestamptz not null default now()
);

-- Safe upgrades for existing projects
alter table public.waitlist_signups add column if not exists name text;
alter table public.waitlist_signups add column if not exists selected_theater text;
alter table public.waitlist_signups add column if not exists selected_side text;

create unique index if not exists waitlist_signups_email_idx
  on public.waitlist_signups (lower(email));

create table if not exists public.side_selection_events (
  id uuid primary key default gen_random_uuid(),
  anonymous_session_id text not null,
  selected_theater text,
  selected_side text not null,
  event_type text not null check (event_type in ('select', 'signup_complete')),
  created_at timestamptz not null default now()
);

create index if not exists side_selection_events_side_idx
  on public.side_selection_events (selected_side);

create index if not exists side_selection_events_theater_idx
  on public.side_selection_events (selected_theater);

create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  role text not null,
  note text,
  linkedin_url text,
  created_at timestamptz not null default now()
);

alter table public.career_applications add column if not exists linkedin_url text;

create index if not exists career_applications_role_idx
  on public.career_applications (role);

-- Keep service role on the server only. Do not expose service role to the browser.
alter table public.waitlist_signups enable row level security;
alter table public.side_selection_events enable row level security;
alter table public.career_applications enable row level security;
