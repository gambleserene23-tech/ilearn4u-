import type { MessageThread } from "./types";

/**
 * DEMO DATA — message threads. By design, threads only exist between
 * School <-> Organisation. Students and businesses never message directly —
 * see the safeguarding workflow described in the README.
 */
export const messageThreads: MessageThread[] = [
  {
    id: "thr_001",
    schoolId: "sch_riverbend",
    organisationId: "org_northwave",
    subject: "Maya Chen — Web Development Internship",
    relatedApplicationId: "app_001",
    messages: [
      {
        id: "msg_001",
        sender: "school",
        senderName: "Ms. Priya Nathan",
        body: "Hi Northwave team, just checking in on Maya's application — happy to answer any questions.",
        sentAt: "2026-08-06T09:15:00",
      },
      {
        id: "msg_002",
        sender: "organisation",
        senderName: "Northwave Digital",
        body: "Thanks Priya, we're reviewing this week and will confirm interview times shortly.",
        sentAt: "2026-08-06T14:30:00",
      },
    ],
  },
  {
    id: "thr_002",
    schoolId: "sch_riverbend",
    organisationId: "org_northwave",
    subject: "Maya Chen — Data & Analytics Placement Details",
    relatedApplicationId: "app_002",
    messages: [
      {
        id: "msg_003",
        sender: "organisation",
        senderName: "Northwave Digital",
        body: "Great news — Maya has a place. Could you confirm her availability for the induction morning?",
        sentAt: "2026-08-01T10:00:00",
      },
      {
        id: "msg_004",
        sender: "school",
        senderName: "Ms. Priya Nathan",
        body: "Confirmed, Maya is free that morning. I'll send through her emergency contact details separately.",
        sentAt: "2026-08-01T13:45:00",
      },
    ],
  },
  {
    id: "thr_003",
    schoolId: "sch_riverbend",
    organisationId: "org_buildright",
    subject: "Jordan Ahmadi — Carpentry Apprenticeship Start Date",
    relatedApplicationId: "app_005",
    messages: [
      {
        id: "msg_005",
        sender: "school",
        senderName: "Ms. Priya Nathan",
        body: "Congratulations to the team on offering Jordan a place. What documentation do you need from us before the start date?",
        sentAt: "2026-07-26T08:20:00",
      },
      {
        id: "msg_006",
        sender: "organisation",
        senderName: "BuildRight Construction Group",
        body: "Just a signed work placement agreement and White Card confirmation — happy to send the forms over today.",
        sentAt: "2026-07-26T11:05:00",
      },
    ],
  },
  { id:"thr_004", schoolId:"sch_riverbend", organisationId:"org_careplus", subject:"Ella Morgan — Health Experience", relatedApplicationId:"app_010", messages:[{id:"msg_008",sender:"school",senderName:"Ms. Priya Nathan",body:"Hi team, I am following up on the student application and can coordinate the next school-approved step.",sentAt:"2026-08-05T09:15:00"},{id:"msg_009",sender:"organisation",senderName:"Pathways Team",body:"Thanks Priya. We can confirm availability and send the placement requirements through this thread.",sentAt:"2026-08-05T13:30:00"}] },  { id:"thr_005", schoolId:"sch_riverbend", organisationId:"org_ferrotech", subject:"Oscar Williams — Engineering Pathway", relatedApplicationId:"app_011", messages:[{id:"msg_010",sender:"school",senderName:"Ms. Priya Nathan",body:"Hi team, I am following up on the student application and can coordinate the next school-approved step.",sentAt:"2026-08-06T09:15:00"},{id:"msg_011",sender:"organisation",senderName:"Pathways Team",body:"Thanks Priya. We can confirm availability and send the placement requirements through this thread.",sentAt:"2026-08-06T13:30:00"}] },  { id:"thr_006", schoolId:"sch_riverbend", organisationId:"org_stateuni", subject:"William Scott — Headstart Program", relatedApplicationId:"app_012", messages:[{id:"msg_012",sender:"school",senderName:"Ms. Priya Nathan",body:"Hi team, I am following up on the student application and can coordinate the next school-approved step.",sentAt:"2026-08-07T09:15:00"},{id:"msg_013",sender:"organisation",senderName:"Pathways Team",body:"Thanks Priya. We can confirm availability and send the placement requirements through this thread.",sentAt:"2026-08-07T13:30:00"}] },  { id:"thr_007", schoolId:"sch_riverbend", organisationId:"org_brightstudio", subject:"Mia Patel — Creative Internship", relatedApplicationId:"app_013", messages:[{id:"msg_014",sender:"school",senderName:"Ms. Priya Nathan",body:"Hi team, I am following up on the student application and can coordinate the next school-approved step.",sentAt:"2026-08-08T09:15:00"},{id:"msg_015",sender:"organisation",senderName:"Pathways Team",body:"Thanks Priya. We can confirm availability and send the placement requirements through this thread.",sentAt:"2026-08-08T13:30:00"}] },  { id:"thr_008", schoolId:"sch_riverbend", organisationId:"org_coastaluni", subject:"Isla Nguyen — Allied Health Placement", relatedApplicationId:"app_014", messages:[{id:"msg_016",sender:"school",senderName:"Ms. Priya Nathan",body:"Hi team, I am following up on the student application and can coordinate the next school-approved step.",sentAt:"2026-08-09T09:15:00"},{id:"msg_017",sender:"organisation",senderName:"Pathways Team",body:"Thanks Priya. We can confirm availability and send the placement requirements through this thread.",sentAt:"2026-08-09T13:30:00"}] },
];
