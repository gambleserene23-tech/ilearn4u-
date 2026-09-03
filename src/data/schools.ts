import type { School } from "./types";

/**
 * DEMO DATA — fictional schools. Replace with real records once a database
 * is connected (see src/lib/services/schools.ts).
 */
export const schools: School[] = [
  {
    id: "sch_riverbend",
    name: "Riverbend State High School",
    suburb: "Brisbane, QLD",
    contactEmail: "counsellor@riverbendshs.qld.edu.au",
    subscriptionStatus: "active",
    counsellorName: "Ms. Priya Nathan",
  },
  {
    id: "sch_coastal",
    name: "Coastal Grammar College",
    suburb: "Gold Coast, QLD",
    contactEmail: "pathways@coastalgrammar.qld.edu.au",
    subscriptionStatus: "active",
    counsellorName: "Mr. Daniel Ferris",
  },
  {
    id: "sch_hillcrest",
    name: "Hillcrest Community College",
    suburb: "Toowoomba, QLD",
    contactEmail: "careers@hillcrestcc.qld.edu.au",
    subscriptionStatus: "trial",
    counsellorName: "Mrs. Anh Le",
  },
];
