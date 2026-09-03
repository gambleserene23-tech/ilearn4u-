/**
 * CASE STUDIES
 * =============================================================================
 * Fictional example outcomes used on the public /case-studies pages to show
 * how each portal is used in practice. All names and organisations are
 * fictional demo data — see README → "Demo data" note.
 *
 * Add a new case study by adding an entry here; the list page and detail
 * page (src/app/(site)/case-studies/) render straight from this array.
 * =============================================================================
 */

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  audience: "Student" | "School" | "Business" | "University";
  pathway: string;
  location: string;
  quote: string;
  quoteAttribution: string;
  outcome: string[];
  body: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "maya-riverbend-technology-internship",
    title: "From Year 12 elective to a Technology internship",
    summary:
      "How a Riverbend State High School student turned an interest in coding into a structured internship at a Brisbane technology company.",
    audience: "Student",
    pathway: "Internship · Technology",
    location: "Brisbane, QLD",
    quote:
      "I didn't know where to start looking for something like this. My profile matched me straight away, and my counsellor handled all the back-and-forth with the company.",
    quoteAttribution: "Maya, Year 12 student",
    outcome: [
      "Matched to a relevant internship within her first week on the platform",
      "Applied using her saved student profile — no repeated data entry",
      "School counsellor coordinated interview scheduling and a start date",
    ],
    body: [
      "Maya listed \"Technology\" as a career interest and \"Internship\" as her preferred opportunity type when she set up her ilearn4u profile. The platform surfaced a 6-week Technology Internship listed by a Brisbane-based software company on the Recommended Opportunities page.",
      "She applied directly through ilearn4u — the application form pre-filled her name, age, school and career interests from her profile, so she only had to answer the opportunity-specific questions about availability and why she was interested.",
      "Once the organisation reviewed and accepted her application, her school counsellor at Riverbend State High School received the update immediately and coordinated the placement details directly with the company, including the start date and required documentation — Maya never had to contact the business herself.",
    ],
  },
  {
    slug: "riverbend-school-application-tracking",
    title: "Tracking 20+ student applications from one dashboard",
    summary:
      "How Riverbend State High School's careers counsellor replaced a spreadsheet with the ilearn4u School Portal.",
    audience: "School",
    pathway: "School coordination",
    location: "Riverbend, QLD",
    quote:
      "Before ilearn4u I was chasing emails and spreadsheets. Now I see every student's status in one screen and message the organisation straight from the application.",
    quoteAttribution: "Ms. Priya Nathan, Careers Counsellor",
    outcome: [
      "Full visibility of every allocated student's applications in one dashboard",
      "Status counts (accepted / waitlisted / declined) update automatically",
      "One inbox for every organisation conversation, linked to the relevant application",
    ],
    body: [
      "Riverbend State High School manages over 20 students across internships, apprenticeships, trainships and headstart programs each term. Before ilearn4u, tracking who had applied where — and what stage each application was at — meant cross-referencing emails against a shared spreadsheet.",
      "The School Portal now shows every student, their applications, and current status in one searchable, filterable view, with summary counts (Total Students, Active Applications, Accepted, Waitlisted, Declined) at a glance.",
      "When an organisation accepts or waitlists a student, the counsellor is notified immediately and can open a message thread with that organisation directly from the application record to arrange next steps — without students being copied into the conversation.",
    ],
  },
  {
    slug: "northwave-digital-opportunity-slots",
    title: "Filling 5 work experience places without a recruitment drive",
    summary:
      "How Northwave Digital used opportunity slots to list structured work experience placements and manage applications without a dedicated recruiter.",
    audience: "Business",
    pathway: "Work Experience · Technology",
    location: "Brisbane, QLD",
    quote:
      "We purchased 5 slots, listed our placements, and had qualified, genuinely interested applicants within days — reviewed and managed from one dashboard.",
    quoteAttribution: "Organisation Coordinator, Northwave Digital",
    outcome: [
      "5 active opportunity slots purchased and filled within one intake period",
      "Applications reviewed and decided (Accept / Decline / Waitlist) from one screen",
      "All placement coordination handled through school counsellors, not directly with students",
    ],
    body: [
      "Northwave Digital wanted to offer structured work experience placements to local students but didn't have capacity for a full recruitment process. They purchased 5 opportunity slots on ilearn4u and listed their placements with clear eligibility, location and commitment details.",
      "Applications came in already matched to interested, eligible students. The Organisation Portal let the team review each application and choose Accept, Decline or Waitlist with one click — every decision was automatically sent to the student's school counsellor.",
      "Because all coordination about placement details, start dates and required documentation goes through the school, Northwave Digital never needed to set up direct messaging with students — the counsellor handled it end-to-end.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
