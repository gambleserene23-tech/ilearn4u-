import type { Metadata } from "next";
import { StepItem } from "@/components/domain/StepItem";
import { LinkButton } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "How It Works",
  description: `The four-step ${siteConfig.brand.name} journey: build a profile, discover matched opportunities, apply, and let your school counsellor support the next step.`,
};

const steps = [
  {
    title: "1. Create Your Profile",
    description:
      "Students provide information about their age, location, career goals, interests, education and preferred opportunity types.",
  },
  {
    title: "2. Discover Opportunities",
    description: "The platform shows opportunities that are relevant to the student's profile.",
  },
  {
    title: "3. Apply Through ilearn4u",
    description: "Students submit applications through the platform.",
  },
  {
    title: "4. Your School Supports the Next Step",
    description:
      "The student's allocated school counsellor receives application updates and works directly with the business or university to arrange the opportunity.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "How It Works" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">How It Works</h1>
      <p className="mt-3 text-ink-soft">
        A simple, four-step journey from profile to placement — with your school supporting every
        step along the way.
      </p>

      <div className="mt-10 space-y-8">
        {steps.map((step) => (
          <StepItem
            key={step.title}
            number={Number(step.title[0])}
            title={step.title.replace(/^\d+\.\s*/, "")}
            description={step.description}
          />
        ))}
      </div>

      <Alert tone="info" title="Safeguarding first" className="mt-10">
        Students never message businesses or universities directly. Communication about
        placement arrangements always goes through the student&apos;s school counsellor.
      </Alert>

      <div className="mt-8">
        <LinkButton href="/opportunities" size="lg">
          Explore Opportunities
        </LinkButton>
      </div>
      </div>
    </div>
  );
}
