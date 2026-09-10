-- =============================================================================
-- ilearn4u — real signup provisioning (migration 7)
-- =============================================================================
-- When someone signs up (supabase.auth.signUp), Supabase creates a row in
-- the built-in auth.users table. This trigger fires right after that and
-- automatically creates the matching ilearn4u rows — a profiles row always,
-- plus a students/parents row, or a brand-new schools/organisations row
-- (with the signer as its first member), depending on which role they
-- signed up as. This replaces the old demo-data seeding for real users.
--
-- The extra fields (school_name, organisation_name, age, etc.) are passed
-- in at signup time via supabase.auth.signUp({ options: { data: {...} } })
-- — see src/app/(site)/signup/page.tsx.
-- =============================================================================

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
    insert into students (profile_id, full_name, age, location)
    values (new.id, v_full_name, coalesce(nullif(meta->>'age', '')::int, 16), meta->>'location');

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function handle_new_user();
