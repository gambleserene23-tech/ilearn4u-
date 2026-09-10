-- =============================================================================
-- ilearn4u — student verification + school directory (migration 8)
-- =============================================================================
-- 1. Schools need to be publicly listable so the signup form can offer a
--    "which school are you at?" dropdown to a visitor who isn't logged in
--    yet (matches the existing public-read policy organisations already
--    have).
-- 2. New student signups start life as verification_status = 'pending'.
--    Their school (found via handle_new_user() reading meta->>'school_id',
--    updated below) must verify them before they're treated as fully
--    active — see src/app/school/verifications/page.tsx.
-- 3. Schools can update a student's verification_status, but — same
--    pattern as 0006_security_hardening.sql — a trigger stops that
--    permission being used to change anything else about the student.
-- =============================================================================

create policy "schools: public read for signup directory" on schools for select using (true);

alter table students
  add column if not exists verification_status text not null default 'pending'
  check (verification_status in ('pending', 'verified', 'rejected'));

create policy "students: school can verify own students"
  on students for update
  using (is_school_member(school_id))
  with check (is_school_member(school_id));

create or replace function prevent_student_field_changes_by_school()
returns trigger
language plpgsql
as $$
begin
  -- Only applies to the "school verifies student" path — a student
  -- editing their OWN profile (profile_id = auth.uid()) is unrestricted,
  -- and so is any trusted server-side write using the service role key
  -- (auth.uid() is null in that context, e.g. no signed-in browser user).
  if auth.uid() is not null and new.profile_id is not null and auth.uid() <> new.profile_id then
    if new.full_name <> old.full_name
       or new.age <> old.age
       or coalesce(new.location, '') <> coalesce(old.location, '')
       or new.school_id is distinct from old.school_id
       or coalesce(new.education_level,'') <> coalesce(old.education_level,'')
       or coalesce(new.career_goals,'') <> coalesce(old.career_goals,'')
       or new.interests <> old.interests
       or new.skills <> old.skills
       or coalesce(new.preferred_opportunity_type,'') <> coalesce(old.preferred_opportunity_type,'') then
      raise exception 'A school can only change a student''s verification_status, nothing else';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_students_school_update_guard on students;
create trigger trg_students_school_update_guard
  before update on students
  for each row
  execute function prevent_student_field_changes_by_school();

-- ---------------------------------------------------------------------------
-- Update handle_new_user() (from 0007) so a student's chosen school_id
-- (sent at signup as meta->>'school_id', an existing schools.id the
-- signup form's dropdown offers) is actually saved.
-- ---------------------------------------------------------------------------
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta jsonb := new.raw_user_meta_data;
  v_role text := meta->>'role';
  v_full_name text := coalesce(meta->>'full_name', new.email);
  v_school_id uuid;
  v_org_id uuid;
begin
  insert into profiles (id, full_name, email, role)
  values (new.id, v_full_name, new.email, v_role::user_role);

  if v_role = 'student' then
    insert into students (profile_id, full_name, age, location, school_id, verification_status)
    values (
      new.id,
      v_full_name,
      coalesce(nullif(meta->>'age', '')::int, 16),
      meta->>'location',
      nullif(meta->>'school_id', '')::uuid,
      'pending'
    );

  elsif v_role = 'parent' then
    insert into parents (profile_id) values (new.id);

  elsif v_role = 'school' then
    insert into schools (name, suburb, contact_email, counsellor_name, subscription_status)
    values (
      coalesce(nullif(meta->>'school_name', ''), 'Unnamed School'),
      coalesce(meta->>'suburb', ''),
      new.email,
      v_full_name,
      'trial'
    )
    returning id into v_school_id;

    insert into school_members (profile_id, school_id, title)
    values (new.id, v_school_id, 'Counsellor');

  elsif v_role = 'organisation' then
    insert into organisations (name, type, industry, contact_email, total_slots, used_slots)
    values (
      coalesce(nullif(meta->>'organisation_name', ''), 'Unnamed Organisation'),
      coalesce(nullif(meta->>'organisation_type', ''), 'business')::organisation_type,
      coalesce(meta->>'industry', ''),
      new.email,
      0,
      0
    )
    returning id into v_org_id;

    insert into organisation_members (profile_id, organisation_id, title)
    values (new.id, v_org_id, 'Coordinator');
  end if;

  return new;
end;
$$;
