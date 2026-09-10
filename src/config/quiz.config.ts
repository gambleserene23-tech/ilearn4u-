/**
 * PATHWAY MATCHING QUIZ
 * =============================================================================
 * A short quiz shown to students after signup to help suggest their
 * interests and preferred opportunity type, so their profile — and
 * therefore their recommended opportunities — has a useful starting point
 * instead of being blank. Answers only ever *suggest* values; the student
 * can still edit everything on their Profile page afterwards.
 *
 * Add/remove/reorder questions freely — each option's `interest` must be
 * one of careerCategoryOptions() (src/config/application-questions.ts) and
 * `type` must be one of opportunity-types.ts's ids, so scoring stays valid.
 * =============================================================================
 */
import type { OpportunityTypeId } from "./opportunity-types";

export interface QuizOption {
  label: string;
  interest: string;
  type: OpportunityTypeId;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1_activity",
    question: "Which of these sounds most like a good day for you?",
    options: [
      { label: "Building or fixing something with your hands", interest: "Construction", type: "apprenticeship" },
      { label: "Solving a tricky problem on a computer", interest: "Technology", type: "internship" },
      { label: "Helping someone who isn't feeling well", interest: "Healthcare", type: "work-experience" },
      { label: "Designing or creating something new", interest: "Creative Industries", type: "trainship" },
    ],
  },
  {
    id: "q2_subject",
    question: "Which school subject do you enjoy most (or wish you had)?",
    options: [
      { label: "Maths or Physics", interest: "Engineering", type: "headstart" },
      { label: "Business or Economics", interest: "Business", type: "headstart" },
      { label: "Hospitality or Food Tech", interest: "Hospitality", type: "internship" },
      { label: "Art, Design or Media", interest: "Creative Industries", type: "trainship" },
    ],
  },
  {
    id: "q3_style",
    question: "How do you like to learn something new?",
    options: [
      { label: "Hands-on, straight away, learning as I go", interest: "Construction", type: "apprenticeship" },
      { label: "A short taster so I can see if I like it", interest: "Business", type: "work-experience" },
      { label: "A structured program with mentors guiding me", interest: "Engineering", type: "trainship" },
      { label: "A university-style class or workshop", interest: "Business", type: "university-program" },
    ],
  },
  {
    id: "q4_goal",
    question: "What matters most to you in a future career?",
    options: [
      { label: "Working with people and making a difference", interest: "Healthcare", type: "work-experience" },
      { label: "Building real, practical skills for a trade", interest: "Construction", type: "apprenticeship" },
      { label: "Being creative and expressing ideas", interest: "Creative Industries", type: "internship" },
      { label: "Understanding how technology and systems work", interest: "Technology", type: "internship" },
    ],
  },
  {
    id: "q5_time",
    question: "How much time can you commit right now?",
    options: [
      { label: "A one-off week during school holidays", interest: "Hospitality", type: "work-experience" },
      { label: "A regular day or afternoon each week", interest: "Technology", type: "internship" },
      { label: "I'm ready for something full-time or ongoing", interest: "Construction", type: "apprenticeship" },
      { label: "A short program or headstart unit", interest: "Business", type: "headstart" },
    ],
  },
];

export interface QuizResult {
  interests: string[];
  preferredType: OpportunityTypeId;
}

/** Tally quiz answers into a small set of suggested interests + one preferred type. */
export function scoreQuiz(answers: Record<string, QuizOption>): QuizResult {
  const interestCounts: Record<string, number> = {};
  const typeCounts: Record<string, number> = {};

  for (const option of Object.values(answers)) {
    interestCounts[option.interest] = (interestCounts[option.interest] ?? 0) + 1;
    typeCounts[option.type] = (typeCounts[option.type] ?? 0) + 1;
  }

  const topInterests = Object.entries(interestCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([interest]) => interest);

  const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as
    | OpportunityTypeId
    | undefined;

  return { interests: topInterests, preferredType: topType ?? "internship" };
}
