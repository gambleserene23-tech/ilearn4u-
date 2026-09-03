import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms and conditions governing use of ${siteConfig.brand.name}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: 17 August 2026</p>

      <Alert tone="warning" title="Placeholder legal content" className="mt-6">
        This page is a plain-language starting point for demonstration purposes and is not legal
        advice. Have a qualified lawyer review and finalise these terms before {siteConfig.brand.name}{" "}
        goes live.
      </Alert>

      <div className="mt-8 space-y-8 text-sm leading-7 text-ink-soft">
        <section>
          <h2 className="text-lg font-semibold text-ink">1. Acceptance of terms</h2>
          <p className="mt-2">
            By creating an account or using {siteConfig.brand.name}, you agree to these Terms &amp;
            Conditions and our Privacy Policy. If you are under 18, a parent, guardian or school
            representative should review these terms with you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">2. The role of {siteConfig.brand.name}</h2>
          <p className="mt-2">
            {siteConfig.brand.name} is a platform that connects students with opportunities and
            supports schools, businesses and universities to coordinate applications and
            placements. We do not guarantee that any application will result in an offer, and we
            are not a party to any placement, employment or enrolment arrangement made between a
            student, their school and an organisation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">
            3. Copyright &amp; intellectual property
          </h2>
          <p className="mt-2">
            Unless otherwise indicated, all content on {siteConfig.brand.name} — including text,
            graphics, logos, icons, the {siteConfig.brand.name} name and brand, software and the
            overall look and feel of the platform — is owned by or licensed to{" "}
            {siteConfig.brand.name} and is protected under the{" "}
            <strong>Copyright Act 1968 (Cth)</strong> and other applicable Australian and
            international intellectual property laws.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              You may view, download and print material from {siteConfig.brand.name} for your own
              personal, non-commercial use (for example, a student saving an opportunity listing).
            </li>
            <li>
              You must not reproduce, republish, distribute, modify or create derivative works from
              any part of the platform for commercial purposes without our prior written
              permission.
            </li>
            <li>
              Organisation and school logos, names and opportunity content remain the property of
              the organisation or school that submitted them, and are displayed with their
              permission for the purpose of listing opportunities on the platform.
            </li>
            <li>
              If you believe content on {siteConfig.brand.name} infringes your copyright, contact
              us at <strong>{siteConfig.contact.email}</strong> with details of the material and
              your ownership, and we will investigate and respond in accordance with our takedown
              process.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">4. Accounts &amp; acceptable use</h2>
          <p className="mt-2">
            You are responsible for keeping your account details secure and for the accuracy of
            information you provide. You agree not to misuse the platform, including by
            impersonating another person, attempting to contact students outside the safeguarding
            workflow described in our Safeguarding Policy, or submitting false opportunity or
            application information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">5. Subscriptions &amp; billing</h2>
          <p className="mt-2">
            School subscriptions and organisation opportunity slots are billed as described on our{" "}
            Pricing page, in Australian dollars. Pricing may change with reasonable notice.
            Payment processing will be handled by a third-party payment provider once connected;
            no real payments are processed in this demonstration version of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">6. Limitation of liability</h2>
          <p className="mt-2">
            To the extent permitted by Australian law, {siteConfig.brand.name} is not liable for
            any indirect or consequential loss arising from your use of the platform, including
            decisions made by schools or organisations regarding applications and placements.
            Nothing in these terms excludes rights you may have under the Australian Consumer Law
            that cannot be excluded.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">7. Contact us</h2>
          <p className="mt-2">
            {siteConfig.contact.email} · {siteConfig.contact.phone} · {siteConfig.contact.address}
          </p>
        </section>
      </div>
    </div>
  );
}
