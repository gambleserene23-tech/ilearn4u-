/**
 * OPPORTUNITY TYPES
 * =============================================================================
 * The full list of opportunity categories used across search filters, opportunity
 * cards, the create-opportunity form, and dashboards.
 *
 * To add a new type later (e.g. "Mentorship", "Scholarship"), add a new entry
 * to this array with a unique `id` — every part of the app that lists
 * opportunity types reads from here, so nothing else needs to change.
 * =============================================================================
 */

export type OpportunityTypeId =
  | "internship"
  | "apprenticeship"
  | "trainship"
  | "headstart"
  | "work-experience"
  | "university-program";

export interface OpportunityType {
  id: OpportunityTypeId;
  label: string;
  shortDescription: string;
  icon: string; // simple emoji/unicode glyph used as a lightweight icon
}

export const opportunityTypes: OpportunityType[] = [
  {
    id: "internship",
    label: "Internships",
    shortDescription: "Gain real-world experience and explore potential careers.",
    icon: "💼",
  },
  {
    id: "apprenticeship",
    label: "Apprenticeships",
    shortDescription: "Develop practical skills while working toward a career.",
    icon: "🛠️",
  },
  {
    id: "trainship",
    label: "Trainships",
    shortDescription: "Explore structured training opportunities and industry pathways.",
    icon: "🧭",
  },
  {
    id: "headstart",
    label: "Headstart Programs",
    shortDescription: "Get an early start through programs offered by businesses and universities.",
    icon: "🚀",
  },
  {
    id: "work-experience",
    label: "Work Experience",
    shortDescription: "Short placements to try out a workplace and industry.",
    icon: "🧰",
  },
  {
    id: "university-program",
    label: "University Programs",
    shortDescription: "Taster days, headstart units and pathway programs run by universities.",
    icon: "🎓",
  },
];

export function getOpportunityType(id: string): OpportunityType | undefined {
  return opportunityTypes.find((t) => t.id === id);
}
