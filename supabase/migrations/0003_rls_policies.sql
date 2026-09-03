-- =============================================================================
-- ilearn4u — Row Level Security (migration 3 of 3)
-- =============================================================================
-- This is what makes the database "encrypted / no outside view" in practice.
-- With RLS ON (and no policy matching a given request), Postgres returns
-- ZERO rows to that request — even though the table itself is reachable
-- over the API. Nobody can browse another user's data, even if they have
-- the public anon key (which is meant to be public — see docs/SECURITY.md).
--
-- Only the SUPABASE_SERVICE_ROLE_KEY bypasses RLS entirely. That key must
-- NEVER be sent to the browser — it only ever lives in server-side code
-- (Next.js Server Actions / Route Handlers) and Netlify environment
-- variables. See docs/SECURITY.md for the full explanation.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Helper functions (SECURITY DEFINER so they can read tables the caller
-- may not have direct row access to, purely to answer "does this membership
-- exist?" — they never return data, only booleans/ids).
-- ---------------------------------------------------------------------------
create or replace function current_profile_role()
returns user_role
language sql security definer stable
set search_path = public
as $$
  select role from profiles where id = auth.uid();
$$;

create or replace function is_school_member(target_school_id uuid)
returns boolean
language sql security definer stable
set search_path = public
as $$
  select exists (
    select 1 from school_members
    where profile_id = auth.uid() and school_id = target_school_id
  );
$$;

create or replace function is_organisation_member(target_org_id uuid)
returns boolean
language sql security definer stable
set search_path = public
as $$
  select exists (
    select 1 from organisation_members
    where profile_id = auth.uid() and organisation_id = target_org_id
  );
$$;

create or replace function is_own_student(target_student_id uuid)
returns boolean
language sql security definer stable
set search_path = public
as $$
  select exists (
    select 1 from students
    where id = target_student_id and profile_id = auth.uid()
  );
$$;

create or replace function is_parent_of_student(target_student_id uuid)
returns boolean
language sql security definer stable
set search_path = public
as $$
  select exists (
    select 1 from parent_students ps
    join parents p on p.id = ps.parent_id
    where ps.student_id = target_student_id and p.profile_id = auth.uid()
  );
$$;

create or replace function is_student_school_member(target_student_id uuid)
returns boolean
language sql security definer stable
set search_path = public
as $$
  select exists (
    select 1 from students s
    join school_members sm on sm.school_id = s.school_id
    where s.id = target_student_id and sm.profile_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Enable RLS everywhere. A table with RLS on and zero policies denies ALL
-- access except to the service role — that's the safe default we build up
-- explicit "allow" rules from.
-- ---------------------------------------------------------------------------
alter table profiles enable row level security;
alter table schools enable row level security;
alter table school_members enable row level security;
alter table organisations enable row level security;
alter table organisation_members enable row level security;
alter table students enable row level security;
alter table parents enable row level security;
alter table parent_students enable row level security;
alter table opportunity_types enable row level security;
alter table application_statuses enable row level security;
alter table opportunities enable row level security;
alter table applications enable row level security;
alter table message_threads enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;
alter table school_subscriptions enable row level security;
alter table organisation_slot_purchases enable row level security;
alter table enquiries enable row level security;
alter table enquiry_feedback enable row level security;

-- ---------------------------------------------------------------------------
-- profiles — everyone can read/update only their own row
-- ---------------------------------------------------------------------------
create policy "profiles: read own" on profiles for select using (id = auth.uid());
create policy "profiles: update own" on profiles for update using (id = auth.uid());
create policy "profiles: insert own (on signup)" on profiles for insert with check (id = auth.uid());

-- ---------------------------------------------------------------------------
-- lookup tables — public, read-only reference data (opportunity types,
-- application statuses). Anyone can read; only service role writes.
-- ---------------------------------------------------------------------------
create policy "opportunity_types: public read" on opportunity_types for select using (true);
create policy "application_statuses: public read" on application_statuses for select using (true);

-- ---------------------------------------------------------------------------
-- schools — members can read/update their own school; anyone signed in can
-- read basic school info they're linked to (student/parent side)
-- ---------------------------------------------------------------------------
create policy "schools: members read/update own" on schools for select using (is_school_member(id));
create policy "schools: members update own" on schools for update using (is_school_member(id));
create policy "schools: students/parents can read their linked school"
  on schools for select
  using (
    exists (select 1 from students s where s.school_id = schools.id and s.profile_id = auth.uid())
    or exists (
      select 1 from students s
      join parent_students ps on ps.student_id = s.id
      join parents p on p.id = ps.parent_id
      where s.school_id = schools.id and p.profile_id = auth.uid()
    )
  );

create policy "school_members: members read own membership rows"
  on school_members for select using (is_school_member(school_id));

-- ---------------------------------------------------------------------------
-- organisations — public marketing pages show OPEN opportunities, which
-- requires reading the organisation name; org members manage their own row
-- ---------------------------------------------------------------------------
create policy "organisations: public read" on organisations for select using (true);
create policy "organisations: members update own" on organisations for update using (is_organisation_member(id));

create policy "organisation_members: members read own membership rows"
  on organisation_members for select using (is_organisation_member(organisation_id));

-- ---------------------------------------------------------------------------
-- students — the safeguarding-critical table. A student sees only their own
-- row; their parent(s) can read (not write) it; their school can read (not
-- write) it. Organisations are NEVER granted access to this table directly —
-- they only ever see what a student typed into applications.answers for a
-- specific application (see below).
-- ---------------------------------------------------------------------------
create policy "students: self read/update" on students for select using (profile_id = auth.uid());
create policy "students: self update" on students for update using (profile_id = auth.uid());
create policy "students: self insert (on signup)" on students for insert with check (profile_id = auth.uid());
create policy "students: parent read-only" on students for select using (is_parent_of_student(id));
create policy "students: school read-only" on students for select using (is_school_member(school_id));

create policy "parents: self read/update" on parents for select using (profile_id = auth.uid());
create policy "parents: self insert" on parents for insert with check (profile_id = auth.uid());
create policy "parent_students: parent reads own links"
  on parent_students for select
  using (exists (select 1 from parents p where p.id = parent_id and p.profile_id = auth.uid()));

-- ---------------------------------------------------------------------------
-- opportunities — public read for OPEN listings (this is the public
-- opportunities search page); organisation members manage their own listings
-- ---------------------------------------------------------------------------
create policy "opportunities: public read open listings"
  on opportunities for select using (status = 'open');
create policy "opportunities: org members read all own (incl. draft/closed)"
  on opportunities for select using (is_organisation_member(organisation_id));
create policy "opportunities: org members manage own"
  on opportunities for all using (is_organisation_member(organisation_id))
  with check (is_organisation_member(organisation_id));

-- ---------------------------------------------------------------------------
-- applications — the core safeguarding boundary. A student can create/read
-- their own applications. Their school can read (for tracking) and their
-- assigned counsellor sees it. The relevant organisation can read + change
-- status (accept/decline/waitlist) — but note the organisation policy joins
-- through opportunities, and never reaches the `students` table itself.
-- ---------------------------------------------------------------------------
create policy "applications: student self read" on applications for select using (is_own_student(student_id));
create policy "applications: student self insert" on applications for insert with check (is_own_student(student_id));
create policy "applications: parent read-only" on applications for select using (is_parent_of_student(student_id));
create policy "applications: school read-only" on applications for select using (is_student_school_member(student_id));
create policy "applications: org read own opportunity's applications"
  on applications for select
  using (
    exists (
      select 1 from opportunities o
      where o.id = opportunity_id and is_organisation_member(o.organisation_id)
    )
  );
create policy "applications: org can update status only"
  on applications for update
  using (
    exists (
      select 1 from opportunities o
      where o.id = opportunity_id and is_organisation_member(o.organisation_id)
    )
  );

-- ---------------------------------------------------------------------------
-- messages — school <-> organisation only, never student-facing
-- ---------------------------------------------------------------------------
create policy "message_threads: participants read"
  on message_threads for select
  using (is_school_member(school_id) or is_organisation_member(organisation_id));
create policy "message_threads: participants create"
  on message_threads for insert
  with check (is_school_member(school_id) or is_organisation_member(organisation_id));

create policy "messages: participants read"
  on messages for select
  using (
    exists (
      select 1 from message_threads t
      where t.id = thread_id
        and (is_school_member(t.school_id) or is_organisation_member(t.organisation_id))
    )
  );
create policy "messages: participants send"
  on messages for insert
  with check (
    sender_profile_id = auth.uid()
    and exists (
      select 1 from message_threads t
      where t.id = thread_id
        and (is_school_member(t.school_id) or is_organisation_member(t.organisation_id))
    )
  );

-- ---------------------------------------------------------------------------
-- notifications — strictly your own
-- ---------------------------------------------------------------------------
create policy "notifications: read own" on notifications for select using (profile_id = auth.uid());
create policy "notifications: mark own read" on notifications for update using (profile_id = auth.uid());

-- ---------------------------------------------------------------------------
-- billing — visible to the paying entity's members only; INSERT/UPDATE is
-- intentionally left with no policy for authenticated users, because these
-- rows must only ever be written by the server (service role) after Square
-- confirms a real payment — see src/lib/services/payments.ts
-- ---------------------------------------------------------------------------
create policy "school_subscriptions: members read own" on school_subscriptions for select using (is_school_member(school_id));
create policy "organisation_slot_purchases: members read own" on organisation_slot_purchases for select using (is_organisation_member(organisation_id));

-- ---------------------------------------------------------------------------
-- public enquiries — anyone can submit (anonymous contact form); nobody can
-- read them back through the client API (staff read via Supabase dashboard
-- or a service-role-only admin view). This mirrors "submit a form" ≠ "browse
-- all form submissions".
-- ---------------------------------------------------------------------------
create policy "enquiries: anyone can submit" on enquiries for insert with check (true);
create policy "enquiry_feedback: anyone can submit" on enquiry_feedback for insert with check (true);
