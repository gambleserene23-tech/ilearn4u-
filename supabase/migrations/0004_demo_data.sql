-- =============================================================================
-- ilearn4u — demo data (migration 4 of 4, OPTIONAL)
-- =============================================================================
-- Populates the database with the same fictional schools, businesses/
-- universities, students and one parent that already appear on the website
-- as mock data (src/data/schools.ts, organisations.ts, students.ts). Run this
-- AFTER 0001, 0002 and 0003 if you want the Supabase Table Editor to show
-- something other than empty tables while you build.
--
-- None of these rows have a real login (profile_id is left NULL — see the
-- comment on `students.profile_id` in 0001_schema.sql). That's intentional:
-- these are records a school would have imported, not people who've signed
-- up yet. Real signups get their own profile row and this gets linked later.
--
-- Safe to skip entirely, and safe to delete afterwards — nothing else
-- depends on these specific rows. All names are fictional.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Schools (3)
-- ---------------------------------------------------------------------------
insert into schools (id, name, suburb, contact_email, subscription_status, counsellor_name) values
  ('10000000-0000-0000-0000-000000000001', 'Riverbend State High School', 'Brisbane, QLD', 'counsellor@riverbendshs.qld.edu.au', 'active', 'Ms. Priya Nathan'),
  ('10000000-0000-0000-0000-000000000002', 'Coastal Grammar College', 'Gold Coast, QLD', 'pathways@coastalgrammar.qld.edu.au', 'active', 'Mr. Daniel Ferris'),
  ('10000000-0000-0000-0000-000000000003', 'Hillcrest Community College', 'Toowoomba, QLD', 'careers@hillcrestcc.qld.edu.au', 'trial', 'Mrs. Anh Le');

-- ---------------------------------------------------------------------------
-- Organisations — businesses (6) + universities (2)
-- ---------------------------------------------------------------------------
insert into organisations (id, name, type, industry, description, location, contact_email, total_slots, used_slots) values
  ('20000000-0000-0000-0000-000000000001', 'Northwave Digital', 'business', 'Technology', 'A Brisbane software studio building web and mobile products for local businesses.', 'Brisbane, QLD', 'careers@northwavedigital.com.au', 5, 3),
  ('20000000-0000-0000-0000-000000000002', 'BuildRight Construction Group', 'business', 'Construction', 'A residential and commercial builder operating across South East Queensland.', 'Gold Coast, QLD', 'apprenticeships@buildright.com.au', 4, 4),
  ('20000000-0000-0000-0000-000000000003', 'CarePlus Health Services', 'business', 'Healthcare', 'A community healthcare provider running clinics across Queensland.', 'Brisbane, QLD', 'people@careplushealth.com.au', 3, 1),
  ('20000000-0000-0000-0000-000000000004', 'FerroTech Engineering', 'business', 'Engineering', 'A manufacturing and engineering firm specialising in precision fabrication.', 'Toowoomba, QLD', 'training@ferrotech.com.au', 3, 2),
  ('20000000-0000-0000-0000-000000000005', 'Harbourside Hotel Group', 'business', 'Hospitality', 'A boutique hotel group with properties across Queensland''s coastline.', 'Sunshine Coast, QLD', 'careers@harboursidehotels.com.au', 2, 1),
  ('20000000-0000-0000-0000-000000000006', 'Bright Studio Creative Co.', 'business', 'Creative Industries', 'A design and animation studio working with local and national clients.', 'Brisbane, QLD', 'studio@brightstudio.com.au', 2, 2),
  ('20000000-0000-0000-0000-000000000007', 'Queensland State University', 'university', 'Business', 'A public university offering headstart and pathway programs for senior students.', 'Brisbane, QLD', 'pathways@qsu.edu.au', 6, 3),
  ('20000000-0000-0000-0000-000000000008', 'Coastal University', 'university', 'Healthcare', 'A regional university with strengths in health sciences and allied health.', 'Sunshine Coast, QLD', 'outreach@coastaluni.edu.au', 4, 2);

-- ---------------------------------------------------------------------------
-- Students (22) — all at Riverbend unless noted. preferred_opportunity_type
-- values match the ids seeded in 0002_seed_lookups.sql.
-- ---------------------------------------------------------------------------
insert into students (id, full_name, school_id, age, location, education_level, career_goals, interests, skills, preferred_opportunity_type, avatar_color) values
  ('30000000-0000-0000-0000-000000000001', 'Maya Chen', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'I''d like to work in software development or product design.', ARRAY['Technology','Creative Industries'], ARRAY['JavaScript basics','Teamwork','Communication'], 'internship', 'brand-green'),
  ('30000000-0000-0000-0000-000000000002', 'Jordan Ahmadi', '10000000-0000-0000-0000-000000000001', 17, 'Gold Coast, QLD', 'Year 12', 'Interested in a trade — carpentry or construction management.', ARRAY['Construction'], ARRAY['Reliable','Practical problem solving'], 'apprenticeship', 'brand-orange'),
  ('30000000-0000-0000-0000-000000000003', 'Amelia Ferreira', '10000000-0000-0000-0000-000000000001', 16, 'Brisbane, QLD', 'Year 11', 'Hoping to explore healthcare and allied health careers.', ARRAY['Healthcare'], ARRAY['Empathetic','Organised'], 'work-experience', 'brand-tan-dark'),
  ('30000000-0000-0000-0000-000000000004', 'Liam Whitfield', '10000000-0000-0000-0000-000000000003', 18, 'Toowoomba, QLD', 'Year 12', 'Considering mechanical or civil engineering at university.', ARRAY['Engineering'], ARRAY['Maths','CAD basics'], 'headstart', 'brand-green'),
  ('30000000-0000-0000-0000-000000000005', 'Sophie Tran', '10000000-0000-0000-0000-000000000002', 17, 'Sunshine Coast, QLD', 'Year 12', 'Interested in hospitality management and events.', ARRAY['Hospitality'], ARRAY['Customer service','Time management'], 'internship', 'brand-orange'),
  ('30000000-0000-0000-0000-000000000006', 'Noah Petersen', '10000000-0000-0000-0000-000000000001', 16, 'Brisbane, QLD', 'Year 11', 'Wants to explore design and animation as a career.', ARRAY['Creative Industries'], ARRAY['Illustration','Storyboarding'], 'trainship', 'brand-tan-dark'),
  ('30000000-0000-0000-0000-000000000007', 'Ella Morgan', '10000000-0000-0000-0000-000000000001', 16, 'Brisbane, QLD', 'Year 11', 'Explore law, public policy and communications.', ARRAY['Law','Communications'], ARRAY['Writing','Research'], 'headstart', 'brand-green'),
  ('30000000-0000-0000-0000-000000000008', 'Oscar Williams', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'Explore electrical engineering and renewable energy.', ARRAY['Engineering','Energy'], ARRAY['Maths','Problem solving'], 'apprenticeship', 'brand-orange'),
  ('30000000-0000-0000-0000-000000000009', 'Isla Nguyen', '10000000-0000-0000-0000-000000000001', 16, 'Brisbane, QLD', 'Year 11', 'Learn more about medicine and health sciences.', ARRAY['Healthcare','Science'], ARRAY['Biology','Teamwork'], 'work-experience', 'brand-tan-dark'),
  ('30000000-0000-0000-0000-000000000010', 'Henry Taylor', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'Build practical skills in construction and project management.', ARRAY['Construction','Business'], ARRAY['Leadership','Practical skills'], 'trainship', 'brand-green'),
  ('30000000-0000-0000-0000-000000000011', 'Mia Patel', '10000000-0000-0000-0000-000000000001', 15, 'Brisbane, QLD', 'Year 10', 'Explore graphic design, media and digital content.', ARRAY['Creative Industries','Media'], ARRAY['Design','Presentation'], 'internship', 'brand-orange'),
  ('30000000-0000-0000-0000-000000000012', 'William Scott', '10000000-0000-0000-0000-000000000001', 18, 'Brisbane, QLD', 'Year 12', 'Explore accounting, finance and entrepreneurship.', ARRAY['Business','Finance'], ARRAY['Numeracy','Organisation'], 'headstart', 'brand-green'),
  ('30000000-0000-0000-0000-000000000013', 'Chloe Martin', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'Explore environmental science and sustainability.', ARRAY['Environment','Science'], ARRAY['Research','Communication'], 'internship', 'brand-tan-dark'),
  ('30000000-0000-0000-0000-000000000014', 'Jack Wilson', '10000000-0000-0000-0000-000000000001', 16, 'Brisbane, QLD', 'Year 11', 'Explore automotive technology and mechanical trades.', ARRAY['Automotive','Engineering'], ARRAY['Practical problem solving','Reliability'], 'apprenticeship', 'brand-orange'),
  ('30000000-0000-0000-0000-000000000015', 'Ava Brown', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'Explore psychology, youth services and education.', ARRAY['Psychology','Education'], ARRAY['Listening','Empathy'], 'work-experience', 'brand-green'),
  ('30000000-0000-0000-0000-000000000016', 'Leo Anderson', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'Explore software engineering and data analytics.', ARRAY['Technology','Data'], ARRAY['Python basics','Logic'], 'internship', 'brand-orange'),
  ('30000000-0000-0000-0000-000000000017', 'Grace Evans', '10000000-0000-0000-0000-000000000001', 16, 'Brisbane, QLD', 'Year 11', 'Explore tourism, events and hospitality.', ARRAY['Hospitality','Events'], ARRAY['Customer service','Teamwork'], 'trainship', 'brand-tan-dark'),
  ('30000000-0000-0000-0000-000000000018', 'Lucas Thomas', '10000000-0000-0000-0000-000000000001', 18, 'Brisbane, QLD', 'Year 12', 'Explore civil engineering and urban development.', ARRAY['Engineering','Construction'], ARRAY['CAD basics','Maths'], 'headstart', 'brand-green'),
  ('30000000-0000-0000-0000-000000000019', 'Ruby Harris', '10000000-0000-0000-0000-000000000001', 15, 'Brisbane, QLD', 'Year 10', 'Explore veterinary science and animal care.', ARRAY['Animals','Healthcare'], ARRAY['Biology','Care'], 'work-experience', 'brand-orange'),
  ('30000000-0000-0000-0000-000000000020', 'Thomas Lee', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'Explore cyber security and digital systems.', ARRAY['Technology','Cyber Security'], ARRAY['Problem solving','Computing'], 'internship', 'brand-green'),
  ('30000000-0000-0000-0000-000000000021', 'Sienna Clark', '10000000-0000-0000-0000-000000000001', 16, 'Brisbane, QLD', 'Year 11', 'Explore architecture and interior design.', ARRAY['Design','Architecture'], ARRAY['Sketching','Creative thinking'], 'internship', 'brand-tan-dark'),
  ('30000000-0000-0000-0000-000000000022', 'Noah King', '10000000-0000-0000-0000-000000000001', 17, 'Brisbane, QLD', 'Year 12', 'Explore logistics, business operations and supply chains.', ARRAY['Business','Logistics'], ARRAY['Planning','Numeracy'], 'trainship', 'brand-orange');

-- ---------------------------------------------------------------------------
-- Parent (1) — Grace Chen, linked to Maya Chen (the first student above)
-- ---------------------------------------------------------------------------
insert into parents (id) values ('40000000-0000-0000-0000-000000000001');

insert into parent_students (parent_id, student_id) values
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001');
