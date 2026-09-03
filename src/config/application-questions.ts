/**
 * APPLICATION & INTAKE QUESTIONS
 * =============================================================================
 * These arrays drive the Student Profile form (`/student/profile`) and the
 * opportunity Application form (`/student/applications/[id]/apply`).
 *
 * To add, remove or change a question, edit the relevant array below — the
 * forms render from this configuration rather than hard-coded inputs.
 *
 * `source: "profile"` fields are pre-filled automatically from the student's
 * saved profile on the application form, so students don't retype them.
 * =============================================================================
 */

export type FieldType = "text" | "number" | "textarea" | "select" | "date";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  source?: "profile"; // pre-fill from the student profile when present
  helpText?: string;
}

// Fields collected when a student builds/edits their profile.
export const studentProfileFields: FormField[] = [
  { id: "fullName", label: "Full name", type: "text", required: true },
  { id: "age", label: "Age", type: "number", required: true },
  {
    id: "location",
    label: "Location",
    type: "select",
    options: locationOptions(),
    required: true,
  },
  { id: "school", label: "School", type: "text", required: true },
  {
    id: "educationLevel",
    label: "Education level",
    type: "select",
    options: ["Year 10", "Year 11", "Year 12", "Post-school / Gap year"],
    required: true,
  },
  {
    id: "careerGoals",
    label: "Career goals",
    type: "textarea",
    placeholder: "What kind of career are you hoping to build?",
  },
  {
    id: "interests",
    label: "Interests",
    type: "select",
    options: careerCategoryOptions(),
  },
  {
    id: "skills",
    label: "Skills",
    type: "textarea",
    placeholder: "e.g. teamwork, communication, coding basics",
  },
  {
    id: "preferredType",
    label: "Preferred opportunity type",
    type: "select",
    options: ["No preference"],
  },
];

// Extra questions asked on top of the pre-filled profile when applying.
export const applicationFormFields: FormField[] = [
  { id: "fullName", label: "Full name", type: "text", source: "profile", required: true },
  { id: "age", label: "Age", type: "number", source: "profile", required: true },
  { id: "school", label: "School", type: "text", source: "profile", required: true },
  { id: "location", label: "Location", type: "text", source: "profile", required: true },
  {
    id: "careerInterests",
    label: "Career interests",
    type: "textarea",
    source: "profile",
    required: true,
  },
  {
    id: "relevantSkills",
    label: "Relevant skills",
    type: "textarea",
    source: "profile",
  },
  {
    id: "previousExperience",
    label: "Previous experience",
    type: "textarea",
    placeholder: "Any relevant part-time work, volunteering, or projects (optional)",
  },
  {
    id: "whyInterested",
    label: "Why are you interested in this opportunity?",
    type: "textarea",
    required: true,
    helpText: "A few sentences is enough.",
  },
  {
    id: "availability",
    label: "Availability",
    type: "text",
    placeholder: "e.g. After school, weekends, school holidays",
    required: true,
  },
];

// Location options used by search filters and profile/application forms.
export function locationOptions(): string[] {
  return [
    "Brisbane, QLD",
    "Gold Coast, QLD",
    "Sunshine Coast, QLD",
    "Toowoomba, QLD",
    "Cairns, QLD",
    "Townsville, QLD",
    "Remote / Online",
  ];
}

// Broad career/interest categories used across profile, filters and opportunities.
export function careerCategoryOptions(): string[] {
  return [
    "Technology",
    "Construction",
    "Healthcare",
    "Engineering",
    "Business",
    "Hospitality",
    "Creative Industries",
  ];
}
