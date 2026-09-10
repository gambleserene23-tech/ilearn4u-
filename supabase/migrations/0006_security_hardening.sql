-- =============================================================================
-- ilearn4u — security hardening (migration 6)
-- =============================================================================
-- Closes a real gap found during a security review: the RLS policy
-- "applications: org can update status only" (0003_rls_policies.sql) only
-- controls which ROWS an organisation can update — Postgres RLS has no
-- built-in way to restrict which COLUMNS an UPDATE touches. Without this
-- trigger, an organisation member could technically send an UPDATE that
-- rewrites a student's submitted answers, or even reassigns the
-- application to a different student/opportunity, not just its status.
--
-- This trigger makes student_id, opportunity_id, answers and submitted_at
-- immutable after insert for EVERYONE (not just organisations) — nothing
-- in the app currently needs to edit a submitted application's core
-- content, only its status. Run this after 0001-0003.
-- =============================================================================

create or replace function prevent_application_core_field_changes()
returns trigger
language plpgsql
as $$
begin
  if new.student_id <> old.student_id
     or new.opportunity_id <> old.opportunity_id
     or new.answers <> old.answers
     or new.submitted_at <> old.submitted_at then
    raise exception
      'student_id, opportunity_id, answers and submitted_at cannot be changed after an application is submitted (only status_id may be updated)';
  end if;
  return new;
end;
$$;

create trigger trg_applications_protect_core_fields
  before update on applications
  for each row
  execute function prevent_application_core_field_changes();
