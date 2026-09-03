# ilearn4u

**ilearn4u** ("Industry Learning and Development for You") connects students with internships,
apprenticeships, trainships, headstart programs, university opportunities, business
opportunities and work experience — matched to their age, location, career goals, interests and
education level. Schools manage student applications and coordinate directly with businesses and
universities on students' behalf.

This is a **working frontend prototype** built with realistic mock data. It's structured so a
developer (you) can connect a real database, authentication, payments and messaging without
redesigning the UI. See [Future Backend Connection](#future-backend-connection) below.

---

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

## Documentation

Beyond this README, see the [`docs/`](docs/) folder for deep dives:

| Doc | What it covers |
|---|---|
| [`docs/DATA_DICTIONARY.md`](docs/DATA_DICTIONARY.md) | Every database table and column, field by field |
| [`docs/ERD.md`](docs/ERD.md) | How the tables relate (entity relationship diagram) |
| [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md) | Step-by-step: create the Supabase project, run migrations, get API keys |
| [`docs/SECURITY.md`](docs/SECURITY.md) | What "encrypted / no outside view" actually means here, and a launch checklist |
| [`docs/SQUARE_SETUP.md`](docs/SQUARE_SETUP.md) | Step-by-step: connect Square for school subscriptions + organisation slot payments |
| [`docs/GITHUB_SETUP.md`](docs/GITHUB_SETUP.md) | Getting this project onto GitHub for the first time (GUI or command line) |
| [`docs/NETLIFY_DOMAIN_SETUP.md`](docs/NETLIFY_DOMAIN_SETUP.md) | Deploying to Netlify and connecting your ilearn4u domain |

## Demo accounts

There's no real login yet — every portal shows a fixed demo identity so you can explore each
role immediately:

| Portal | URL | Demo identity |
|---|---|---|
| Student | `/student` | Maya Chen, Year 12, Riverbend State High School |
| Parent | `/parent` | Grace Chen (Maya's parent) |
| School | `/school` | Riverbend State High School, Ms. Priya Nathan |
| Business/University | `/organisation` | Northwave Digital |

Visit `/login` to see the portal-selection screen a real login flow would use.

## Demo journeys to try

- **Student:** `/login` → Student Portal → Profile → Recommended Opportunities → open an
  opportunity → Apply → Review → Submit → My Applications
- **School:** `/login` → School Portal → Students → a student → Applications → Application
  Details → Messages
- **Organisation:** `/login` → Business/University Portal → Opportunities → an opportunity →
  Applications → Review → Accept/Decline/Waitlist

---

## Where to change things

Everything editable lives in `src/config/` — one file per concern, each with comments explaining
what it controls:

| What you want to change | File |
|---|---|
| Site name, tagline, homepage copy, nav links, footer, contact details | `src/config/site.config.ts` |
| **Pricing** — school subscription, organisation slot price | `src/config/site.config.ts` (`pricing` object) |
| Brand colours (dark green / white / tan / orange) | `src/app/globals.css` (`:root` CSS variables) — documented in `src/config/theme.config.ts` |
| Opportunity types (Internship, Apprenticeship, etc.) | `src/config/opportunity-types.ts` |
| User roles & permissions | `src/config/roles.ts` |
| Application status labels/colours | `src/config/application-statuses.ts` |
| Student profile questions & application form questions | `src/config/application-questions.ts` |
| FAQs (homepage + `/faq`) | `src/config/faqs.config.ts` |
| Case studies (`/case-studies`) | `src/data/case-studies.ts` |
| Response time promise wording | `src/config/site.config.ts` (`contact.responseTimePromise`) |

Because pages read from these files instead of hard-coding values, changing (for example) the
school subscription price in `site.config.ts` updates the homepage, `/pricing`, and the School
Settings page all at once.

## Adding a new opportunity type

Add an entry to the array in `src/config/opportunity-types.ts` — every filter, badge, card and
the create-opportunity form reads from this list automatically. No other file needs to change.

## Adding a new page

1. Create a folder + `page.tsx` under `src/app/` following the existing route structure (public
   marketing pages live under the `(site)` route group; portal pages live under `student/`,
   `parent/`, `school/`, `organisation/`).
2. Add a link to it in `src/config/site.config.ts` (`publicNav`, `portalNav`, or `footer`) if it
   should appear in navigation.

## Adding a new component

- Generic, reusable UI primitives (buttons, inputs, cards, badges) go in `src/components/ui/`.
- Layout scaffolding (header, footer, portal sidebar) goes in `src/components/layout/`.
- Anything specific to opportunities/applications/students goes in `src/components/domain/`.

If you change a component in `src/components/ui/`, every page using it updates automatically —
for example, editing `Button.tsx`'s `primary` variant changes every primary button site-wide.

## Modifying navigation

Public navigation, portal navigation (per role), and the footer are all arrays in
`src/config/site.config.ts` — add, remove or reorder entries there.

---

## Project structure

```
src/
  app/                    Routes (Next.js App Router — one folder per URL segment)
    (site)/               Public marketing pages (home, opportunities, pricing, legal, etc.)
    student/              Student portal
    parent/                Parent portal
    school/                School portal
    organisation/          Business/University portal
  components/
    ui/                   Reusable primitives: Button, Card, Input, Badge, Alert, StatusBadge
    layout/               PublicHeader, PublicFooter, PortalShell (sidebar nav for portals)
    domain/                OpportunityCard, ApplicationCard, ApplicationForm, StepItem, etc.
  config/                 Central, editable configuration (see table above)
  data/                   Mock demo data + TypeScript types mirroring the future DB schema
  lib/
    services/             Data-access functions pages call (see "Future Backend Connection")
    utils.ts              Small shared helpers (date/currency formatting, classnames)
```

## Where things are handled

- **Authentication** — not yet implemented. Each portal layout (e.g.
  `src/app/student/layout.tsx`) currently calls `getCurrentStudent()` etc. from
  `src/lib/services/` to fetch a fixed demo user. Swap these for real session lookups when you
  add auth (NextAuth/Auth.js, Clerk, or your own).
- **Database** — schema is fully designed and ready to run (`supabase/migrations/`), but the
  service layer (`src/lib/services/`) still reads mock data — see
  [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md) to connect it for real.
- **Payments (Square)** — pricing UI exists (School Settings, Organisation Billing, `/pricing`)
  and `src/lib/services/payments.ts` has the isolated Square service layer stubbed out, but no
  real charge is made yet — see [`docs/SQUARE_SETUP.md`](docs/SQUARE_SETUP.md), and never mark a
  payment as succeeded until a real Square webhook confirms it.
- **Messaging** — School ↔ Organisation threads only (by design — see Safeguarding below). Mock
  data lives in `src/data/messages.ts`, read through `src/lib/services/messages.ts`.

## How the four user roles work

Defined in `src/config/roles.ts`: **Student**, **Parent**, **School**, **Business/University**
(businesses and universities share one "organisation" role/portal, distinguished by an
`organisationType` field). An **Admin** role is stubbed in the same file, ready for an admin
portal later. Permissions are a plain object (`permissions` in `roles.ts`) separate from the UI,
so you can change what a role can do without touching page components.

## Safeguarding: why there's no student ↔ business messaging

By design, students never message businesses or universities directly, and organisations never
message students directly. All coordination goes through the student's school counsellor:

```
Student submits application
  → Organisation reviews & decides (Accept / Decline / Waitlist)
    → School counsellor is notified
      → Student sees the updated status
        → School counsellor coordinates placement details with the organisation
```

This is reflected in the UI (see `/legal/safeguarding`) and in the data model — the
`MessageThread` type in `src/data/types.ts` only supports `school ↔ organisation` threads.

## Future backend connection

Pages never import mock data directly — they call functions in `src/lib/services/` (e.g.
`getOpportunities()`, `getApplicationsBySchool()`). Each function currently reads from the arrays
in `src/data/`; when you have a real database, replace the function **bodies** with real
queries/API calls and keep the same function signatures. No page component needs to change.

```
Frontend            Data/service layer                Future backend
StudentDashboard  →  getStudentApplications()  →  Database / API
```

The TypeScript interfaces in `src/data/types.ts` (`Student`, `Organisation`, `Opportunity`,
`Application`, `MessageThread`, etc.) mirror the suggested database schema, so they can double as
your ORM model shapes.

## No unnecessary lock-in

External services (auth, payments, email, file storage, database) are meant to be isolated
behind the `src/lib/services/` layer described above, so any one of them can be replaced later
without reworking the frontend. Environment-specific secrets belong in `.env.local` — see
`.env.example` for the full list with comments.

## SEO & marketing features

- Unique `<title>`/meta description on every public page (`export const metadata` per page —
  edit directly in each `page.tsx`, or the shared bits in `src/config/site.config.ts`)
- `robots.txt` (`src/app/robots.ts`) and `sitemap.xml` (`src/app/sitemap.ts`) — both generated
  automatically from live opportunity/case-study data, no manual upkeep
- Dynamic Open Graph share image (`src/app/opengraph-image.tsx`) generated from brand config —
  no static image file to keep in sync
- `Organization`/`EducationalOrganization` JSON-LD on every page (`src/app/layout.tsx`),
  `BreadcrumbList` JSON-LD on every page with breadcrumbs, `FAQPage` JSON-LD on the FAQ section,
  and `EducationalOccupationalProgram` JSON-LD on each opportunity page
- Breadcrumbs (`src/components/domain/Breadcrumbs.tsx`) on opportunities, case studies, FAQ and contact
- Custom 404 page (`src/app/not-found.tsx`)
- 5 FAQs with expand/collapse (`src/config/faqs.config.ts`, shown on the homepage and `/faq`)
- Case studies (`src/data/case-studies.ts`, `/case-studies`)
- Sticky mobile "Explore Opportunities" CTA (`src/components/layout/StickyMobileCTA.tsx`)
- Response-time promise banner (`src/components/domain/ResponseTimePromise.tsx`)
- Contact → thank-you page with a post-enquiry feedback prompt (`/contact/thank-you`)
- Google Analytics 4, loaded only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
  (`src/components/analytics/GoogleAnalytics.tsx`)

## Tech stack

Next.js (App Router) + React + TypeScript + Tailwind CSS v4. No external UI kit — the design
system in `src/components/ui/` is custom and intentionally small.


## Presentation build + continuous development

This version is deliberately structured as a developer-owned product rather than a one-off mockup. Brand copy, pricing, navigation, opportunity types, roles, statuses and intake questions live in `src/config/`. Reusable UI lives in `src/components/`. Data access lives behind `src/lib/services/`, so the mock data can be replaced with Supabase without redesigning the pages.

### Supabase + Netlify

Set these in **Netlify → Project configuration → Environment variables** (do not hard-code them):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose it to client code)

The browser and server Supabase client helpers are in `src/lib/supabase/`. The `.env.example` file documents the expected variables. For local work, copy it to `.env.local`.

### Production note

The `123 / 123` credentials are intentionally a **presentation-only demo flow**. Before launch, replace the demo login with Supabase Auth, enforce role-based access with Row Level Security, and keep student/parent/school/organisation permissions on the server.

### 20-student school demonstration

The School Portal now contains a realistic 20-student Riverbend demonstration dataset with searchable/filterable application tracking, status counts, pathway details and a full school↔organisation message centre. All names are fictional.
