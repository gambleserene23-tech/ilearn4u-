import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.brand.name} collects, uses and protects personal information, in line with the Australian Privacy Principles.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: 17 August 2026</p>

      <Alert tone="warning" title="Placeholder legal content" className="mt-6">
        This page is a plain-language starting point for demonstration purposes and is not legal
        advice. Have a qualified lawyer review and finalise this policy before {siteConfig.brand.name}{" "}
        goes live with real user data.
      </Alert>

      <div className="mt-8 space-y-8 text-sm leading-7 text-ink-soft">
        <section>
          <h2 className="text-lg font-semibold text-ink">1. Our commitment to your privacy</h2>
          <p className="mt-2">
            {siteConfig.brand.name} ({siteConfig.brand.fullMeaning}) is committed to protecting the
            privacy of students, parents, schools, businesses and universities who use the
            platform. We handle personal information in accordance with the{" "}
            <strong>Privacy Act 1988 (Cth)</strong> and the thirteen Australian Privacy Principles
            (APPs) it sets out, including any applicable amendments such as the Privacy and Other
            Legislation Amendment Act 2024. Because many of our users are minors, we apply
            additional care when collecting, using and disclosing information about students.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">2. What we collect</h2>
          <p className="mt-2">Depending on your role, we may collect:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Contact details — name, email address and phone number</li>
            <li>
              Student profile information — age, location, school, education level, career goals,
              interests, skills and preferred opportunity types
            </li>
            <li>Application information submitted when applying for an opportunity</li>
            <li>School and organisation details, including subscription and billing status</li>
            <li>Messages exchanged between schools and organisations through the platform</li>
            <li>Technical information such as browser type and general usage data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">3. How we use your information</h2>
          <p className="mt-2">We use personal information to:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Match students with relevant opportunities</li>
            <li>Allow schools to manage student applications and support placements</li>
            <li>Allow businesses and universities to review and respond to applications</li>
            <li>Facilitate communication between schools and organisations</li>
            <li>Process school subscription and organisation slot billing</li>
            <li>Improve the safety, reliability and usability of the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">4. Students &amp; the safeguarding model</h2>
          <p className="mt-2">
            To protect younger users, students do not communicate directly with businesses or
            universities on {siteConfig.brand.name}. All coordination about placements is
            channelled through the student&apos;s school counsellor. A student&apos;s personal
            information is only shared with an organisation to the extent needed to process an
            application the student has chosen to submit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">5. Disclosure of information</h2>
          <p className="mt-2">
            We disclose personal information only to the parties involved in a student&apos;s
            application (the student&apos;s school and the relevant organisation), to service
            providers who help us run the platform (such as hosting and payment providers, under
            confidentiality obligations), or where required or authorised by Australian law. We do
            not sell personal information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">6. Data security &amp; retention</h2>
          <p className="mt-2">
            We take reasonable technical and organisational steps to protect personal information
            from misuse, interference, loss, and unauthorised access, modification or disclosure,
            consistent with APP 11. We retain information only for as long as necessary to provide
            the platform or as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">7. Access, correction &amp; complaints</h2>
          <p className="mt-2">
            You may request access to, or correction of, the personal information we hold about
            you, in line with APPs 12 and 13. If you have a privacy concern or complaint, contact
            us at <strong>{siteConfig.contact.email}</strong>. If you are not satisfied with our
            response, you may contact the{" "}
            <strong>Office of the Australian Information Commissioner (OAIC)</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">8. Contact us</h2>
          <p className="mt-2">
            {siteConfig.contact.email} · {siteConfig.contact.phone} · {siteConfig.contact.address}
          </p>
        </section>
      </div>
    </div>
  );
}
