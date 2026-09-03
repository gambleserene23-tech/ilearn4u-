-- =============================================================================
-- ilearn4u — core schema (migration 1 of 3)
-- =============================================================================
-- Run these three migration files IN ORDER in the Supabase SQL Editor
-- (or via `supabase db push` if you use the Supabase CLI):
--   0001_schema.sql           table definitions + relationships
--   0002_seed_lookups.sql     opportunity types / application statuses lookup data
--   0003_rls_policies.sql     Row Level Security — who can read/write what
--
-- See docs/DATA_DICTIONARY.md for a field-by-field description of every
-- column, and docs/ERD.md for a diagram of how these tables relate.
-- =============================================================================

create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type user_role as enum ('student', 'parent', 'school', 'organisation', 'admin');
create type organisation_type as enum ('business', 'university');
create type opportunity_status as enum ('draft', 'open', 'closed');
create type subscription_status as enum ('trial', 'active', 'past_due', 'cancelled');
create type message_sender_type as enum ('school', 'organisation');

-- ---------------------------------------------------------------------------
-- profiles — one row per authenticated user, 1:1 with auth.users
-- ---------------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  role user_role not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- schools
-- ---------------------------------------------------------------------------
create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  suburb text not null,
  contact_email text not null,
  subscription_status subscription_status not null default 'trial',
  counsellor_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- links a profile (role = 'school') to the school(s) they act on behalf of.
-- a school can have more than one counsellor logged in.
create table school_members (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  school_id uuid not null references schools (id) on delete cascade,
  title text default 'Counsellor',
  created_at timestamptz not null default now(),
  unique (profile_id, school_id)
);

-- ---------------------------------------------------------------------------
-- organisations (businesses + universities share this table)
-- ---------------------------------------------------------------------------
create table organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type organisation_type not null,
  industry text,
  description text,
  location text,
  contact_email text not null,
  total_slots int not null default 0,
  used_slots int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint used_slots_within_total check (used_slots <= total_slots)
);

create table organisation_members (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  organisation_id uuid not null references organisations (id) on delete cascade,
  title text default 'Coordinator',
  created_at timestamptz not null default now(),
  unique (profile_id, organisation_id)
);

-- ---------------------------------------------------------------------------
-- students + parents
-- ---------------------------------------------------------------------------
create table students (
  id uuid primary key default gen_random_uuid(),
  -- Nullable on purpose: a student row can exist (imported by a school, or
  -- demo/seed data) before the student has created a login. Once they sign
  -- up, set this to their new auth profile id. See 0004_demo_data.sql.
  profile_id uuid unique references profiles (id) on delete cascade,
  -- Kept on students (not just profiles) because a student row can exist
  -- with no linked profile yet — see the comment above. Once profile_id is
  -- set, keep this in sync with profiles.full_name for that user.
  full_name text not null,
  school_id uuid references schools (id) on delete set null,
  age int not null check (age between 10 and 25),
  location text,
  education_level text,
  career_goals text,
  interests text[] not null default '{}',
  skills text[] not null default '{}',
  preferred_opportunity_type text references opportunity_types (id), -- fk added after lookup table exists, see 0002
  avatar_color text default '#0F3D2E',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table parents (
  id uuid primary key default gen_random_uuid(),
  -- Nullable for the same reason as students.profile_id above.
  profile_id uuid unique references profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table parent_students (
  parent_id uuid not null references parents (id) on delete cascade,
  student_id uuid not null references students (id) on delete cascade,
  primary key (parent_id, student_id)
);

-- ---------------------------------------------------------------------------
-- lookup tables — editable without a code deploy (mirrors src/config/*.ts)
-- ---------------------------------------------------------------------------
create table opportunity_types (
  id text primary key,               -- e.g. 'internship'
  label text not null,
  short_description text,
  icon text,
  sort_order int not null default 0,
  active boolean not null default true
);

create table application_statuses (
  id text primary key,               -- e.g. 'submitted'
  label text not null,
  color text,
  sort_order int not null default 0
);

-- now that opportunity_types exists, attach the deferred FK from students
alter table students
  add constraint students_preferred_type_fkey
  foreign key (preferred_opportunity_type) references opportunity_types (id);

-- ---------------------------------------------------------------------------
-- opportunities
-- ---------------------------------------------------------------------------
create table opportunities (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations (id) on delete cascade,
  title text not null,
  type_id text not null references opportunity_types (id),
  description text,
  what_youll_learn text[] not null default '{}',
  requirements text[] not null default '{}',
  location text,
  age_min int not null default 14,
  age_max int not null default 18,
  industry text,
  career_pathway text,
  available_places int not null default 1,
  start_date date,
  end_date date,
  closing_date date,
  commitment text,
  additional_requirements text,
  status opportunity_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint age_range_valid check (age_min <= age_max)
);

-- ---------------------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------------------
create table applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students (id) on delete cascade,
  opportunity_id uuid not null references opportunities (id) on delete cascade,
  status_id text not null references application_statuses (id) default 'submitted',
  answers jsonb not null default '{}'::jsonb, -- structured answers, keyed by application-questions.ts field id
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, opportunity_id)
);

-- ---------------------------------------------------------------------------
-- school <-> organisation messaging (never student <-> organisation — see
-- docs/DATA_DICTIONARY.md and /legal/safeguarding for why)
-- ---------------------------------------------------------------------------
create table message_threads (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools (id) on delete cascade,
  organisation_id uuid not null references organisations (id) on delete cascade,
  subject text not null,
  related_application_id uuid references applications (id) on delete set null,
  created_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references message_threads (id) on delete cascade,
  sender_type message_sender_type not null,
  sender_profile_id uuid not null references profiles (id),
  body text not null,
  sent_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------
create table notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  type text not null, -- e.g. 'application_accepted', 'new_message', 'application_submitted'
  title text not null,
  body text,
  related_application_id uuid references applications (id) on delete set null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- billing — school subscriptions ($49.99/mo) + organisation slot purchases
-- ($5.99/slot). Written server-side only, from Square webhook handlers —
-- see src/lib/services/payments.ts. Never trust a client-supplied "paid" flag.
-- ---------------------------------------------------------------------------
create table school_subscriptions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools (id) on delete cascade,
  status subscription_status not null default 'trial',
  price_aud numeric(10, 2) not null default 49.99,
  current_period_start date,
  current_period_end date,
  square_subscription_id text,
  created_at timestamptz not null default now()
);

create table organisation_slot_purchases (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations (id) on delete cascade,
  slots_purchased int not null check (slots_purchased > 0),
  price_aud numeric(10, 2) not null default 5.99,
  square_order_id text,
  purchased_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- public enquiries (marketing "Contact us" form) + post-enquiry feedback
-- ---------------------------------------------------------------------------
create table enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  submitted_at timestamptz not null default now(),
  responded_at timestamptz
);

create table enquiry_feedback (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references enquiries (id) on delete cascade,
  rating int check (rating between 1 and 5),
  comment text,
  submitted_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at auto-touch trigger (applied to the tables that carry the column)
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated before update on profiles for each row execute function set_updated_at();
create trigger trg_schools_updated before update on schools for each row execute function set_updated_at();
create trigger trg_organisations_updated before update on organisations for each row execute function set_updated_at();
create trigger trg_students_updated before update on students for each row execute function set_updated_at();
create trigger trg_opportunities_updated before update on opportunities for each row execute function set_updated_at();
create trigger trg_applications_updated before update on applications for each row execute function set_updated_at();
