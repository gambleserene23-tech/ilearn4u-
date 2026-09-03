-- =============================================================================
-- ilearn4u — RESET (optional — only run this if 0001 gave you an
-- "already exists" error, meaning an earlier attempt partly succeeded)
-- =============================================================================
-- Safe to run any time before you have real user data: it only removes the
-- objects the ilearn4u migrations create, nothing else in your project.
-- Every DROP uses IF EXISTS, so it won't error even if some of these were
-- never created. After running this, start again from 0001_schema.sql.
-- =============================================================================

drop table if exists enquiry_feedback cascade;
drop table if exists enquiries cascade;
drop table if exists organisation_slot_purchases cascade;
drop table if exists school_subscriptions cascade;
drop table if exists notifications cascade;
drop table if exists messages cascade;
drop table if exists message_threads cascade;
drop table if exists applications cascade;
drop table if exists opportunities cascade;
drop table if exists application_statuses cascade;
drop table if exists opportunity_types cascade;
drop table if exists parent_students cascade;
drop table if exists parents cascade;
drop table if exists students cascade;
drop table if exists organisation_members cascade;
drop table if exists organisations cascade;
drop table if exists school_members cascade;
drop table if exists schools cascade;
drop table if exists profiles cascade;

drop function if exists set_updated_at() cascade;
drop function if exists current_profile_role() cascade;
drop function if exists is_school_member(uuid) cascade;
drop function if exists is_organisation_member(uuid) cascade;
drop function if exists is_own_student(uuid) cascade;
drop function if exists is_parent_of_student(uuid) cascade;
drop function if exists is_student_school_member(uuid) cascade;

drop type if exists opportunity_status cascade;
drop type if exists subscription_status cascade;
drop type if exists message_sender_type cascade;
drop type if exists organisation_type cascade;
drop type if exists user_role cascade;
