# ilearn4u — Data Dictionary

This is the field-by-field reference for the database defined in
`supabase/migrations/`. Every table here mirrors a TypeScript interface in
[`src/data/types.ts`](../src/data/types.ts), so the frontend and database stay
in sync. See [ERD.md](./ERD.md) for how the tables relate to each other, and
[SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for how to run these migrations.

---

## profiles

One row per logged-in user (1:1 with Supabase's built-in `auth.users`).

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | Same id as `auth.users.id` |
| `full_name` | text | |
| `email` | text | Kept in sync with `auth.users.email` |
| `role` | enum: `student`, `parent`, `school`, `organisation`, `admin` | Drives which portal the user lands in |
| `created_at` / `updated_at` | timestamptz | |

## schools

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `name` | text | |
| `suburb` | text | |
| `contact_email` | text | |
| `subscription_status` | enum: `trial`, `active`, `past_due`, `cancelled` | Drives School Portal access; set by `school_subscriptions` webhook, not editable by the school itself |
| `counsellor_name` | text | Display name shown to students/parents |

## school_members

Links a `profiles` row (role = `school`) to the school(s) they work for — a
school can have more than one counsellor account.

| Column | Type | Notes |
|---|---|---|
| `profile_id` | uuid, FK → profiles | |
| `school_id` | uuid, FK → schools | |
| `title` | text | e.g. "Careers Counsellor" |

## organisations

Businesses and universities share this table; `type` tells them apart.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `name` | text | |
| `type` | enum: `business`, `university` | |
| `industry` | text | |
| `description` | text | |
| `location` | text | |
| `contact_email` | text | |
| `total_slots` | int | Purchased opportunity slots |
| `used_slots` | int | Currently-open opportunities; `used_slots <= total_slots` is enforced by a check constraint |

## organisation_members

Same pattern as `school_members`, for organisation staff accounts.

## students

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `profile_id` | uuid, FK → profiles, unique, **nullable** | 1:1 with a login — but a student row can exist before the student has signed up (e.g. demo/seed data, or a school pre-registering a student). `NULL` means "no login linked yet." |
| `full_name` | text | Kept here (not only on `profiles`) so a student is readable/searchable even with no login yet. Keep in sync with `profiles.full_name` once `profile_id` is set. |
| `school_id` | uuid, FK → schools, nullable | |
| `age` | int | Constrained 10–25 |
| `location` | text | One of `locationOptions()` in `application-questions.ts` |
| `education_level` | text | e.g. "Year 12" |
| `career_goals` | text | Free text |
| `interests` | text[] | From `careerCategoryOptions()` |
| `skills` | text[] | Free text list |
| `preferred_opportunity_type` | text, FK → opportunity_types | Nullable ("no preference") |
| `avatar_color` | text | Hex, cosmetic only |

**Access:** a student reads/writes only their own row. Parents and the
student's school can read it. **Organisations never get direct access to
this table** — see `applications.answers` below and
[SECURITY.md](./SECURITY.md).

## parents / parent_students

| Table | Purpose |
|---|---|
| `parents` | 1:1 with a `profiles` row (role = `parent`) |
| `parent_students` | Many-to-many join — a parent can be linked to more than one student (e.g. siblings) |

## opportunity_types (lookup)

Mirrors [`src/config/opportunity-types.ts`](../src/config/opportunity-types.ts)
exactly, row for row. `id` is a slug (`internship`, `apprenticeship`, …), not
a generated UUID, so it can be used directly as a foreign key and stays
human-readable in the database.

## application_statuses (lookup)

Mirrors [`src/config/application-statuses.ts`](../src/config/application-statuses.ts).
Workflow order: `submitted → under_review → (accepted | declined | waitlisted)`.

## opportunities

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `organisation_id` | uuid, FK → organisations | |
| `title` | text | |
| `type_id` | text, FK → opportunity_types | |
| `description`, `commitment`, `additional_requirements` | text | |
| `what_youll_learn`, `requirements` | text[] | Bullet lists shown on the opportunity detail page |
| `location`, `industry`, `career_pathway` | text | |
| `age_min`, `age_max` | int | `age_min <= age_max` enforced |
| `available_places` | int | |
| `start_date`, `end_date`, `closing_date` | date | |
| `status` | enum: `draft`, `open`, `closed` | Only `open` listings appear on the public `/opportunities` page |

## applications

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `student_id` | uuid, FK → students | |
| `opportunity_id` | uuid, FK → opportunities | |
| `status_id` | text, FK → application_statuses | |
| `answers` | jsonb | Keyed by the field `id`s in `applicationFormFields` (`application-questions.ts`) — e.g. `{"whyInterested": "...", "availability": "..."}` |
| `submitted_at` / `updated_at` | timestamptz | |

One student can apply to a given opportunity only once (`unique(student_id, opportunity_id)`).

**This is the only place an organisation ever sees student-provided
information** — and only for applications made *to that organisation's own
opportunities*, and only the `answers` the student chose to submit. This is
the database-level implementation of the safeguarding workflow described in
`/legal/safeguarding`.

## message_threads / messages

School ↔ organisation conversations only. `sender_type` is always `school` or
`organisation` — there is no student or parent sender type, by design, so a
student-to-business message is structurally impossible, not just hidden by
the UI.

## notifications

Generic per-user notification feed (`type` is a free-text event name like
`application_accepted`, `new_message`). A student is notified on status
changes; a school is notified when an organisation responds; an organisation
is notified on new applications/messages.

## school_subscriptions / organisation_slot_purchases

Billing history. **Written only by server code** (a Square webhook handler
using the service-role key) after Square confirms a real payment — never by
the client, and never optimistically before confirmation. See
[SQUARE_SETUP.md](./SQUARE_SETUP.md).

## enquiries / enquiry_feedback

The public "Contact us" form and the thank-you-page feedback prompt. Anyone
can insert; nobody can read them back through the public API (staff view them
in the Supabase dashboard, or you can add an admin-only route later using the
service role key).

---

## Why some things are "write via server only"

Rows that represent money (`school_subscriptions`,
`organisation_slot_purchases`) or an organisation's official decision
(`applications.status_id` moving to `accepted`/`declined`) should never be
something a browser can just POST directly with an optimistic value. The
pattern used throughout this schema is:

1. The browser calls a Next.js Server Action / Route Handler.
2. That server code verifies the request (auth session, Square webhook
   signature, etc).
3. Only then does it write, using the Supabase **service role key**, which
   bypasses RLS entirely and is never exposed to the browser.

This keeps "can this user see the row" (RLS) and "is this write legitimate"
(server-side verification) as two separate, both-required checks.
