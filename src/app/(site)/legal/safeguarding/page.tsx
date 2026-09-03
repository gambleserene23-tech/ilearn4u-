import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: `How ${siteConfig.brand.name} keeps students safe by routing all business/university communication through school counsellors.`,
};

export default function SafeguardingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Safeguarding</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: 17 August 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-7 text-ink-soft">
        <section>
          <h2 className="text-lg font-semibold text-ink">Our safeguarding principle</h2>
          <p className="mt-2">
            {siteConfig.brand.name} is built around schools supporting students. Businesses and
            universities do not have unrestricted direct access to students. All communication
            about placement arrangements is coordinated through the student&apos;s school
            counsellor.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How it works</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5">
            <li>An organisation receives an application submitted by a student.</li>
            <li>The organisation reviews the application.</li>
            <li>The organisation chooses to accept, decline or waitlist the application.</li>
            <li>The student&apos;s school counsellor receives a notification of the outcome.</li>
            <li>The student sees their updated application status in their portal.</li>
            <li>The school counsellor coordinates next steps, such as interviews or start dates.</li>
            <li>The school communicates directly with the organisation to arrange details.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">No direct messaging</h2>
          <p className="mt-2">
            Students cannot message businesses or universities directly through{" "}
            {siteConfig.brand.name}, and organisations cannot message students directly. Messaging
            exists only between schools and organisations, so a trusted adult is always part of
            any placement conversation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Reporting a concern</h2>
          <p className="mt-2">
            If you have a safeguarding concern about a student, school, business or university
            using {siteConfig.brand.name}, contact us immediately at{" "}
            <strong>{siteConfig.contact.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
