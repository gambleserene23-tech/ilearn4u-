# ilearn4u — Entity Relationship Diagram

Rendered from `supabase/migrations/0001_schema.sql`. Paste this file into any
Mermaid-compatible viewer (GitHub renders it natively) to see it visually.

```mermaid
erDiagram
    PROFILES ||--o| STUDENTS : "is a"
    PROFILES ||--o| PARENTS : "is a"
    PROFILES ||--o{ SCHOOL_MEMBERS : "works for"
    PROFILES ||--o{ ORGANISATION_MEMBERS : "works for"

    SCHOOLS ||--o{ SCHOOL_MEMBERS : has
    SCHOOLS ||--o{ STUDENTS : enrolls
    SCHOOLS ||--o{ MESSAGE_THREADS : participates
    SCHOOLS ||--o| SCHOOL_SUBSCRIPTIONS : pays

    ORGANISATIONS ||--o{ ORGANISATION_MEMBERS : has
    ORGANISATIONS ||--o{ OPPORTUNITIES : lists
    ORGANISATIONS ||--o{ MESSAGE_THREADS : participates
    ORGANISATIONS ||--o{ ORGANISATION_SLOT_PURCHASES : pays

    PARENTS ||--o{ PARENT_STUDENTS : links
    STUDENTS ||--o{ PARENT_STUDENTS : "linked by"

    STUDENTS ||--o{ APPLICATIONS : submits
    OPPORTUNITIES ||--o{ APPLICATIONS : receives
    OPPORTUNITY_TYPES ||--o{ OPPORTUNITIES : categorises
    OPPORTUNITY_TYPES ||--o{ STUDENTS : "preferred by"
    APPLICATION_STATUSES ||--o{ APPLICATIONS : categorises

    MESSAGE_THREADS ||--o{ MESSAGES : contains
    APPLICATIONS ||--o| MESSAGE_THREADS : "may relate to"

    PROFILES ||--o{ NOTIFICATIONS : receives
    APPLICATIONS ||--o{ NOTIFICATIONS : triggers

    ENQUIRIES ||--o{ ENQUIRY_FEEDBACK : "may receive"
```

## Reading the safeguarding boundary off this diagram

Notice there is **no direct line between STUDENTS and ORGANISATIONS, and no
direct line between STUDENTS and MESSAGE_THREADS.** The only path from a
student to an organisation is:

```
STUDENTS → APPLICATIONS → OPPORTUNITIES → ORGANISATIONS
```

An organisation can only ever see what a student put in a specific
`applications.answers` for that organisation's own opportunity — never the
student's full profile, and never a free-form message. That's enforced twice:
once by the schema shape itself (there's no column for it), and again by the
RLS policies in `0003_rls_policies.sql`.

## Full table list

`profiles` · `schools` · `school_members` · `organisations` ·
`organisation_members` · `students` · `parents` · `parent_students` ·
`opportunity_types` · `application_statuses` · `opportunities` ·
`applications` · `message_threads` · `messages` · `notifications` ·
`school_subscriptions` · `organisation_slot_purchases` · `enquiries` ·
`enquiry_feedback`

See [DATA_DICTIONARY.md](./DATA_DICTIONARY.md) for every column.
