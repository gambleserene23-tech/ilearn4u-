/**
 * ============================================================================
 * SITE CONFIGURATION — single source of truth for editable site content
 * ============================================================================
 * Edit values in this file to update brand name, pricing, navigation, contact
 * details and homepage copy everywhere they appear across the site.
 *
 * Colours live in `src/app/globals.css` (`@theme` block) — see also
 * `src/config/theme.config.ts` for a documented reference of the same values.
 * Opportunity types: `src/config/opportunity-types.ts`
 * User roles: `src/config/roles.ts`
 * Application statuses: `src/config/application-statuses.ts`
 * Application/intake questions: `src/config/application-questions.ts`
 * ============================================================================
 */

export const siteConfig = {
  brand: {
    name: "ilearn4u",
    shortName: "ilearn4u",
    fullMeaning: "Industry and Development Learning for You",
    tagline: "Find Your Pathway. Build Your Future.",
    description:
      "Discover internships, apprenticeships, trainships, headstart programs and university opportunities matched to your interests, goals and location.",
    logoInitial: "i4u",
    // Canonical production URL — used by sitemap.ts, robots.ts, JSON-LD and
    // Open Graph tags. Override with NEXT_PUBLIC_APP_URL in production.
    url: process.env.NEXT_PUBLIC_APP_URL || "https://ilearn4u.com.au",
    locale: "en-AU",
  },

  contact: {
    email: "hello@ilearn4u.com.au",
    phone: "1300 000 000",
    address: "Brisbane, Queensland, Australia",
    // Shown on the contact page and as a trust signal near enquiry CTAs.
    responseTimePromise: "We reply to every enquiry within 1 business day.",
  },

  // Pricing is controlled from here — every page that shows a price reads
  // from this object, so changing a number here updates the whole site.
  pricing: {
    currency: "AUD",
    currencySymbol: "$",
    student: { label: "Student", price: 0, unit: "Free", billing: "Always free" },
    parent: { label: "Parent", price: 0, unit: "Free", billing: "Always free" },
    school: {
      label: "School",
      price: 49.99,
      unit: "/ month",
      billing: "Billed monthly, per school",
    },
    organisation: {
      label: "Business / University",
      price: 5.99,
      unit: "per opportunity slot",
      billing: "One active listing = one slot",
    },
  },

  // Public navigation shown to signed-out visitors.
  publicNav: [
    { label: "Home", href: "/" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
  ],

  // Navigation shown once a user is signed in, keyed by role.
  portalNav: {
    student: [
      { label: "Dashboard", href: "/student" },
      { label: "Opportunities", href: "/student/opportunities" },
      { label: "My Applications", href: "/student/applications" },
      { label: "Profile", href: "/student/profile" },
      { label: "Pathway Quiz", href: "/student/quiz" },
      { label: "Messages", href: "/student/messages" },
    ],
    parent: [
      { label: "Dashboard", href: "/parent" },
      { label: "Students", href: "/parent/students" },
      { label: "Applications", href: "/parent/applications" },
      { label: "Updates", href: "/parent/updates" },
    ],
    school: [
      { label: "Dashboard", href: "/school" },
      { label: "Students", href: "/school/students" },
      { label: "Verifications", href: "/school/verifications" },
      { label: "Applications", href: "/school/applications" },
      { label: "Opportunities", href: "/school/opportunities" },
      { label: "Messages", href: "/school/messages" },
      { label: "Settings", href: "/school/settings" },
    ],
    organisation: [
      { label: "Dashboard", href: "/organisation" },
      { label: "Opportunities", href: "/organisation/opportunities" },
      { label: "Applications", href: "/organisation/applications" },
      { label: "Messages", href: "/organisation/messages" },
      { label: "Billing", href: "/organisation/billing" },
      { label: "Settings", href: "/organisation/settings" },
    ],
  },

  footer: {
    blurb:
      "Helping students discover opportunities and build pathways into their future careers.",
    columns: [
      {
        title: "Site",
        links: [
          { label: "Home", href: "/" },
          { label: "Opportunities", href: "/opportunities" },
          { label: "How It Works", href: "/how-it-works" },
          { label: "Case Studies", href: "/case-studies" },
          { label: "FAQ", href: "/faq" },
          { label: "About", href: "/about" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Portal",
        links: [
          { label: "Student Portal", href: "/login?portal=student" },
          { label: "Parent Portal", href: "/login?portal=parent" },
          { label: "School Portal", href: "/login?portal=school" },
          { label: "Business / University Portal", href: "/login?portal=organisation" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/legal/privacy" },
          { label: "Terms & Conditions", href: "/legal/terms" },
          { label: "Safeguarding", href: "/legal/safeguarding" },
          { label: "Accessibility", href: "/legal/accessibility" },
        ],
      },
    ],
  },

  // Homepage copy blocks — edit freely, layout order is fixed in page.tsx
  homepage: {
    hero: {
      eyebrow: "For students, schools, businesses & universities",
      heading: "Find Your Pathway. Build Your Future.",
      body:
        "Discover internships, apprenticeships, trainships, headstart programs and university opportunities matched to your interests, goals and location.",
      primaryCta: { label: "Explore Opportunities", href: "/opportunities" },
      secondaryCta: { label: "Get Started", href: "/signup" },
    },
    whyUs: {
      heading: "Why ilearn4u",
      body: "A simple, guided way for young people to find real opportunities — with their school there to help every step of the way.",
      points: [
        {
          title: "Matched to you",
          body: "Opportunities filtered by age, location, goals and interests — not a generic job board.",
        },
        {
          title: "School-supported",
          body: "Your school counsellor coordinates the details, so you're never navigating this alone.",
        },
        {
          title: "Built for young people",
          body: "Clear, simple screens designed for students — not corporate recruiters.",
        },
      ],
    },
    forStudents: {
      heading: "For Students",
      body: "Build a profile once, get matched to opportunities that fit, and apply in a few clicks. Your school looks after the next steps.",
      cta: { label: "Explore Opportunities", href: "/opportunities" },
    },
    forSchools: {
      heading: "For Schools",
      body: "Track every student application in one place, and manage all communication with businesses and universities from a single inbox.",
      cta: { label: "See School Portal", href: "/login?portal=school" },
    },
    forOrganisations: {
      heading: "For Businesses & Universities",
      body: "List opportunities, review applications, and coordinate placements directly with school counsellors — safely and simply.",
      cta: { label: "See Business Portal", href: "/login?portal=organisation" },
    },
    finalCta: {
      heading: "Ready to find your pathway?",
      body: "Join students already discovering opportunities that fit their future.",
      cta: { label: "Explore Opportunities", href: "/opportunities" },
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
