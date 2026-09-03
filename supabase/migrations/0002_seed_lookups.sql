-- =============================================================================
-- ilearn4u — lookup data (migration 2 of 3)
-- =============================================================================
-- Mirrors src/config/opportunity-types.ts and src/config/application-statuses.ts
-- exactly. If you edit those config files (e.g. add a "Mentorship" opportunity
-- type), add the matching row here too with the same `id` — see
-- docs/SUPABASE_SETUP.md → "Keeping config files and lookup tables in sync".
-- =============================================================================

insert into opportunity_types (id, label, short_description, icon, sort_order) values
  ('internship', 'Internships', 'Gain real-world experience and explore potential careers.', '💼', 1),
  ('apprenticeship', 'Apprenticeships', 'Develop practical skills while working toward a career.', '🛠️', 2),
  ('trainship', 'Trainships', 'Explore structured training opportunities and industry pathways.', '🧭', 3),
  ('headstart', 'Headstart Programs', 'Get an early start through programs offered by businesses and universities.', '🚀', 4),
  ('work-experience', 'Work Experience', 'Short placements to try out a workplace and industry.', '🧰', 5),
  ('university-program', 'University Programs', 'Taster days, headstart units and pathway programs run by universities.', '🎓', 6);

insert into application_statuses (id, label, color, sort_order) values
  ('submitted', 'Applied', 'neutral', 1),
  ('under_review', 'Under Review', 'info', 2),
  ('waitlisted', 'Waitlisted', 'warning', 3),
  ('accepted', 'Accepted', 'success', 4),
  ('declined', 'Declined', 'danger', 5);
