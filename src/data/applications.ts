import type { Application } from "./types";

/**
 * DEMO DATA — applications linking students to opportunities, covering
 * every status in the workflow so all dashboards have something to show.
 */
export const applications: Application[] = [
  {
    id: "app_001",
    studentId: "stu_001",
    opportunityId: "50000000-0000-0000-0000-000000000001",
    status: "under_review",
    submittedAt: "2026-08-02",
    updatedAt: "2026-08-05",
    answers: {
      whyInterested:
        "I love building small websites for fun and want to see how a real studio works.",
      availability: "After school, Tuesdays and Thursdays",
    },
  },
  {
    id: "app_002",
    studentId: "stu_001",
    opportunityId: "50000000-0000-0000-0000-000000000009",
    status: "accepted",
    submittedAt: "2026-07-20",
    updatedAt: "2026-08-01",
    answers: {
      whyInterested: "I want to see how data is used in real business decisions.",
      availability: "School holidays, any day",
    },
  },
  {
    id: "app_003",
    studentId: "stu_001",
    opportunityId: "50000000-0000-0000-0000-000000000007",
    status: "waitlisted",
    submittedAt: "2026-07-28",
    updatedAt: "2026-08-04",
    answers: {
      whyInterested: "I enjoy digital art and want to learn animation basics.",
      availability: "Fridays after school",
    },
  },
  {
    id: "app_004",
    studentId: "stu_001",
    opportunityId: "50000000-0000-0000-0000-000000000005",
    status: "declined",
    submittedAt: "2026-07-10",
    updatedAt: "2026-07-18",
    answers: {
      whyInterested: "Curious about business as a possible double-major option.",
      availability: "School holidays",
    },
  },
  {
    id: "app_005",
    studentId: "stu_002",
    opportunityId: "50000000-0000-0000-0000-000000000002",
    status: "accepted",
    submittedAt: "2026-07-15",
    updatedAt: "2026-07-25",
    answers: {
      whyInterested: "I want to start a carpentry apprenticeship straight after school.",
      availability: "Full-time",
    },
  },
  {
    id: "app_006",
    studentId: "stu_002",
    opportunityId: "50000000-0000-0000-0000-000000000010",
    status: "submitted",
    submittedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    answers: {
      whyInterested: "Interested in the business side of construction as a backup pathway.",
      availability: "School holidays",
    },
  },
  {
    id: "app_007",
    studentId: "stu_003",
    opportunityId: "50000000-0000-0000-0000-000000000003",
    status: "under_review",
    submittedAt: "2026-08-06",
    updatedAt: "2026-08-06",
    answers: {
      whyInterested: "I'd love to see what nursing and allied health look like day-to-day.",
      availability: "School holidays",
    },
  },
  {
    id: "app_008",
    studentId: "stu_004",
    opportunityId: "50000000-0000-0000-0000-000000000011",
    status: "accepted",
    submittedAt: "2026-08-01",
    updatedAt: "2026-08-09",
    answers: {
      whyInterested: "Deciding between mechanical and civil engineering — this should help.",
      availability: "School holidays",
    },
  },
  {
    id: "app_009",
    studentId: "stu_006",
    opportunityId: "50000000-0000-0000-0000-000000000007",
    status: "submitted",
    submittedAt: "2026-08-11",
    updatedAt: "2026-08-11",
    answers: {
      whyInterested: "I want to learn animation fundamentals from working designers.",
      availability: "Fridays after school",
    },
  },
  { id:"app_010", studentId:"stu_007", opportunityId:"50000000-0000-0000-0000-000000000003", status:"submitted", submittedAt:"2026-08-11", updatedAt:"2026-08-13", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_011", studentId:"stu_008", opportunityId:"50000000-0000-0000-0000-000000000005", status:"under_review", submittedAt:"2026-08-12", updatedAt:"2026-08-14", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_012", studentId:"stu_009", opportunityId:"50000000-0000-0000-0000-000000000007", status:"accepted", submittedAt:"2026-08-01", updatedAt:"2026-08-03", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_013", studentId:"stu_010", opportunityId:"50000000-0000-0000-0000-000000000009", status:"waitlisted", submittedAt:"2026-08-02", updatedAt:"2026-08-04", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_014", studentId:"stu_011", opportunityId:"50000000-0000-0000-0000-000000000010", status:"declined", submittedAt:"2026-08-03", updatedAt:"2026-08-05", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_015", studentId:"stu_012", opportunityId:"50000000-0000-0000-0000-000000000011", status:"submitted", submittedAt:"2026-08-04", updatedAt:"2026-08-06", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_016", studentId:"stu_013", opportunityId:"50000000-0000-0000-0000-000000000001", status:"under_review", submittedAt:"2026-08-05", updatedAt:"2026-08-07", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_017", studentId:"stu_014", opportunityId:"50000000-0000-0000-0000-000000000002", status:"accepted", submittedAt:"2026-08-06", updatedAt:"2026-08-08", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_018", studentId:"stu_015", opportunityId:"50000000-0000-0000-0000-000000000003", status:"waitlisted", submittedAt:"2026-08-07", updatedAt:"2026-08-09", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_019", studentId:"stu_016", opportunityId:"50000000-0000-0000-0000-000000000005", status:"declined", submittedAt:"2026-08-08", updatedAt:"2026-08-10", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_020", studentId:"stu_017", opportunityId:"50000000-0000-0000-0000-000000000007", status:"submitted", submittedAt:"2026-08-09", updatedAt:"2026-08-11", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_021", studentId:"stu_018", opportunityId:"50000000-0000-0000-0000-000000000009", status:"under_review", submittedAt:"2026-08-10", updatedAt:"2026-08-12", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_022", studentId:"stu_019", opportunityId:"50000000-0000-0000-0000-000000000010", status:"accepted", submittedAt:"2026-08-11", updatedAt:"2026-08-13", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_023", studentId:"stu_020", opportunityId:"50000000-0000-0000-0000-000000000011", status:"waitlisted", submittedAt:"2026-08-12", updatedAt:"2026-08-14", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_024", studentId:"stu_021", opportunityId:"50000000-0000-0000-0000-000000000001", status:"declined", submittedAt:"2026-08-01", updatedAt:"2026-08-03", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_025", studentId:"stu_022", opportunityId:"50000000-0000-0000-0000-000000000002", status:"submitted", submittedAt:"2026-08-02", updatedAt:"2026-08-04", answers:{whyInterested:"Exploring a pathway that connects to my career goals.",availability:"School holidays and selected afternoons"} },
  { id:"app_026", studentId:"stu_006", opportunityId:"50000000-0000-0000-0000-000000000007", status:"submitted", submittedAt:"2026-08-12", updatedAt:"2026-08-12", answers:{whyInterested:"I want practical experience in digital creative work.",availability:"Fridays after school"} },
];
