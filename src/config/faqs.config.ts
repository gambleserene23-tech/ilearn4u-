/**
 * FREQUENTLY ASKED QUESTIONS
 * =============================================================================
 * Shown on the homepage and the dedicated /faq page, and used to generate
 * FAQPage structured data (JSON-LD) for search engines. Add/remove/reorder
 * entries freely — every place FAQs appear reads from this one array.
 * =============================================================================
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export const faqs: FaqEntry[] = [
  {
    question: "Is ilearn4u free for students and parents?",
    answer:
      "Yes — the Student Portal and Parent Portal are completely free, always. Schools pay a monthly subscription, and businesses/universities pay per opportunity listing, so students never see a cost to use the platform.",
  },
  {
    question: "Can students message businesses or universities directly?",
    answer:
      "No, by design. All coordination about a placement goes through the student's school counsellor — students apply through ilearn4u, and once an organisation responds, the school counsellor handles the next steps and any direct communication with the organisation.",
  },
  {
    question: "How does ilearn4u match students to opportunities?",
    answer:
      "A student's profile — age, location, career goals, interests, education level and preferred opportunity type — is matched against open listings from businesses, universities and training providers, so students see relevant internships, apprenticeships, trainships, headstart programs and work experience rather than a generic job board.",
  },
  {
    question: "What can a school do with the School Portal?",
    answer:
      "Schools track every student's applications in one dashboard, see status updates the moment an organisation responds, and manage all school-to-organisation communication about placements, interviews, start dates and documentation from a single inbox.",
  },
  {
    question: "How much does it cost businesses and universities to list an opportunity?",
    answer:
      "$5.99 AUD per active opportunity slot — for example, 5 simultaneous active listings costs $29.95 AUD. There's no separate setup fee; you only pay for the listings you currently have live.",
  },
  {
    question: "Is student data kept private and secure?",
    answer:
      "Yes. Student profile data is only ever visible to the student themselves, their linked parent, and their own school. Businesses and universities only ever see what a student submits in a specific application to their own opportunity — never a full student profile — and every database table is protected by Row Level Security. See our Privacy Policy and Safeguarding page for details.",
  },
];
