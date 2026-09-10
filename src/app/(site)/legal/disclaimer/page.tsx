import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Important information about the limits of what ${siteConfig.brand.name} guarantees.`,
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Disclaimer</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>

      <Alert tone="warning" title="Placeholder legal content" className="mt-6">
        This page is a plain-language starting point for demonstration purposes and is not legal
        advice. Have a qualified lawyer review and finalise this notice before {siteConfig.brand.name}{" "}
        goes live.
      </Alert>

      <div className="mt-8 space-y-8 text-sm leading-7 text-ink-soft">
        <section>
          <h2 className="text-lg font-semibold text-ink">No guarantee of outcomes</h2>
          <p className="mt-2">
            {siteConfig.brand.name} helps match students with internships, apprenticeships,
            trainships, headstart programs, work experience and university opportunities listed by
            businesses, universities and other organisations. We do not guarantee that any
            application will be successful, that a listed opportunity will remain available, or
            that a placement will proceed as described.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Not a party to placements</h2>
          <p className="mt-2">
            {siteConfig.brand.name} is a platform that facilitates introductions and coordination
            between students, schools and organisations. We are not an employer, education
            provider, or party to any placement, work experience, apprenticeship or enrolment
            arrangement. Responsibility for the conduct, safety, and terms of a placement sits with
            the school and organisation coordinating it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Accuracy of listed information</h2>
          <p className="mt-2">
            Opportunity details, eligibility criteria, dates and organisation information are
            submitted directly by schools, businesses and universities. While we ask organisations
            to keep listings accurate and current, {siteConfig.brand.name} does not independently
            verify every detail and is not responsible for out-of-date or inaccurate listings.
            Always confirm details directly through the coordination process described in our{" "}
            Safeguarding page before relying on them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Not professional advice</h2>
          <p className="mt-2">
            Nothing on {siteConfig.brand.name} — including recommended opportunities, quiz
            suggestions, or general content — constitutes career, education, legal or financial
            advice. Students and families should use their own judgement, and consult a school
            counsellor or qualified adviser for guidance specific to their circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">External links</h2>
          <p className="mt-2">
            Where {siteConfig.brand.name} links to third-party websites (for example, an
            organisation&apos;s own site), we do not control and are not responsible for the
            content, accuracy, or availability of those external sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Contact us</h2>
          <p className="mt-2">
            Questions about this disclaimer? Contact <strong>{siteConfig.contact.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
