-- =============================================================================
-- ilearn4u — demo opportunities (migration 5, OPTIONAL)
-- =============================================================================
-- Mirrors src/data/opportunities.ts exactly, using the same organisation
-- UUIDs seeded in 0004_demo_data.sql. Run this AFTER 0004 so the
-- organisation_id foreign keys resolve. Safe to skip or delete later.
-- =============================================================================

insert into opportunities (
  id, organisation_id, title, type_id, description, what_youll_learn, requirements,
  location, age_min, age_max, industry, career_pathway, available_places,
  start_date, end_date, closing_date, commitment, status
) values
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Junior Web Development Internship', 'internship',
   'Work alongside our product team to build real features for client websites, learning modern web development practices along the way.',
   ARRAY['HTML, CSS and JavaScript fundamentals in a real product team','How a software studio plans and ships client work','Version control and collaborative workflows'],
   ARRAY['Interest in coding or web design','Year 11 or 12 student'],
   'Brisbane, QLD', 16, 18, 'Technology', 'Software Development', 3, '2026-10-05', '2026-12-04', '2026-09-12', '1 day per week, school term', 'open'),

  ('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'Carpentry Apprenticeship Pathway', 'apprenticeship',
   'Start your trade career with hands-on training alongside licensed carpenters on residential building sites.',
   ARRAY['Practical carpentry and site safety skills','How to read basic building plans','What a Certificate III apprenticeship involves'],
   ARRAY['Physically able to work on site','Reliable and punctual'],
   'Gold Coast, QLD', 16, 19, 'Construction', 'Trades & Construction', 2, '2026-11-02', '2028-11-02', '2026-09-30', 'Full-time, ongoing', 'open'),

  ('50000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 'Healthcare Work Experience Week', 'work-experience',
   'Spend a week shadowing nurses and allied health staff across our community clinics to explore a career in healthcare.',
   ARRAY['A day-in-the-life view of clinical and allied health roles','Patient care basics and workplace professionalism','What further study pathways look like in healthcare'],
   ARRAY['Year 10, 11 or 12 student','Working with Children Check (school-arranged)'],
   'Brisbane, QLD', 15, 18, 'Healthcare', 'Healthcare & Allied Health', 4, '2026-09-28', '2026-10-02', '2026-09-05', '1 week, school holidays', 'open'),

  ('50000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 'Mechanical Engineering Trainship', 'trainship',
   'A structured training program introducing students to mechanical design, fabrication and quality control processes.',
   ARRAY['Basics of CAD and mechanical drawing','Workshop safety and precision fabrication','How engineering teams manage quality control'],
   ARRAY['Interest in engineering or design technology','Year 11 or 12 student'],
   'Toowoomba, QLD', 16, 18, 'Engineering', 'Engineering & Manufacturing', 3, '2026-10-12', '2027-02-12', '2026-09-20', '1 day per week, school term', 'open'),

  ('50000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000007', 'Business & Commerce Headstart Program', 'headstart',
   'Get a head start on university study with a taster unit in business fundamentals, plus mentoring from current students.',
   ARRAY['Core business and commerce concepts','University study skills and expectations','What it''s like to study on campus'],
   ARRAY['Year 12 student','Interest in business, commerce or economics'],
   'Brisbane, QLD', 16, 18, 'Business', 'Business & Commerce', 25, '2026-11-16', '2026-11-20', '2026-10-24', '1 week, school holidays', 'open'),

  ('50000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000005', 'Hospitality & Events Internship', 'internship',
   'Support our front-of-house and events team, learning how a busy hotel plans and runs guest experiences.',
   ARRAY['Front-of-house guest service skills','How hotel events are planned and delivered','Teamwork in a fast-paced hospitality environment'],
   ARRAY['Friendly, reliable and well-presented','Year 11 or 12 student'],
   'Sunshine Coast, QLD', 16, 18, 'Hospitality', 'Hospitality & Tourism', 2, '2026-10-19', '2026-12-14', '2026-09-26', 'Weekends, school term', 'open'),

  ('50000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000006', 'Creative Design Trainship', 'trainship',
   'Learn the fundamentals of graphic design and animation while contributing to real studio briefs under mentor guidance.',
   ARRAY['Graphic design fundamentals and industry software','Basics of 2D animation and motion design','How a creative studio works with real clients'],
   ARRAY['Portfolio or examples of creative work (school projects welcome)'],
   'Brisbane, QLD', 16, 18, 'Creative Industries', 'Design & Creative Media', 2, '2026-10-26', '2026-12-18', '2026-10-03', '1 day per week, school term', 'open'),

  ('50000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000008', 'Allied Health University Program', 'university-program',
   'A two-day campus program exploring physiotherapy, occupational therapy and speech pathology study pathways.',
   ARRAY['What allied health degrees involve day-to-day','Hands-on activities in university clinical labs','How to plan a pathway into allied health study'],
   ARRAY['Year 11 or 12 student','Interest in health sciences'],
   'Sunshine Coast, QLD', 16, 18, 'Healthcare', 'Healthcare & Allied Health', 30, '2026-12-01', '2026-12-02', '2026-11-07', '2 days, school holidays', 'open'),

  ('50000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000001', 'Data & Analytics Work Experience', 'work-experience',
   'A short placement exploring how data teams turn raw numbers into decisions for real client projects.',
   ARRAY['Basics of spreadsheets, dashboards and reporting','How data informs business decisions','Working alongside a small product team'],
   ARRAY['Comfort with maths or spreadsheets','Year 10, 11 or 12 student'],
   'Remote / Online', 15, 18, 'Technology', 'Data & Analytics', 4, '2026-09-21', '2026-09-25', '2026-09-01', '1 week, school holidays', 'open'),

  ('50000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000002', 'Site Administration Headstart', 'headstart',
   'An early-start program for students interested in the business side of construction — scheduling, contracts and site coordination.',
   ARRAY['How construction projects are scheduled and coordinated','Basics of contracts and compliance on site','Career pathways into construction management'],
   ARRAY['Organised and detail-oriented','Year 11 or 12 student'],
   'Gold Coast, QLD', 16, 18, 'Construction', 'Construction Management', 6, '2026-11-09', '2026-11-13', '2026-10-17', '1 week, school holidays', 'open'),

  ('50000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000007', 'Engineering Headstart Program', 'headstart',
   'Explore civil, mechanical and software engineering through hands-on workshops with current engineering students.',
   ARRAY['Introductory engineering design challenges','What an engineering degree involves','How to choose an engineering specialisation'],
   ARRAY['Year 11 or 12 student','Interest in maths, science or design'],
   'Brisbane, QLD', 16, 18, 'Engineering', 'Engineering & Manufacturing', 20, '2026-12-07', '2026-12-11', '2026-11-14', '1 week, school holidays', 'open'),

  ('50000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000003', 'Community Health Apprenticeship (Cert III)', 'apprenticeship',
   'Begin a Certificate III in Health Services Assistance while working part-time across our community clinics.',
   ARRAY['Foundational patient support and care skills','Workplace health and safety in a clinical setting','How to balance study with paid work'],
   ARRAY['Year 12 graduate or post-school','Working with Children Check'],
   'Brisbane, QLD', 17, 19, 'Healthcare', 'Healthcare & Allied Health', 2, '2027-01-26', '2028-01-26', '2026-12-01', 'Part-time, ongoing', 'open');
