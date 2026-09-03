import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { caseStudies } from "@/data/case-studies";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    `Real examples of how students, schools and organisations use ${siteConfig.brand.name} — from a student's first internship to a school tracking 20+ applications.`,
};

export default function CaseStudiesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Case Studies" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Case studies</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          A closer look at how students, schools and organisations actually use {siteConfig.brand.name}.
          All examples are fictional demo scenarios illustrating the platform in action.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="flex flex-col rounded-lg border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Badge>{study.audience}</Badge>
              <h2 className="mt-3 text-lg font-semibold text-ink">{study.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{study.summary}</p>
              <span className="mt-4 text-sm font-semibold text-brand-orange">Read case study →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
