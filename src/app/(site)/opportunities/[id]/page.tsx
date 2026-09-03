import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOpportunityById, getOrganisationName, getOpportunities } from "@/lib/services/opportunities";
import { getOpportunityType } from "@/config/opportunity-types";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site.config";

export async function generateStaticParams() {
  const opportunities = await getOpportunities();
  return opportunities.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/opportunities/[id]">): Promise<Metadata> {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);
  if (!opportunity) return {};
  const organisationName = getOrganisationName(opportunity.organisationId);
  return {
    title: `${opportunity.title} — ${organisationName}`,
    description: opportunity.description,
  };
}

export default async function OpportunityDetailPage({
  params,
}: PageProps<"/opportunities/[id]">) {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  const type = getOpportunityType(opportunity.type);
  const organisationName = getOrganisationName(opportunity.organisationId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: opportunity.title,
    description: opportunity.description,
    provider: { "@type": "Organization", name: organisationName },
    occupationalCategory: opportunity.industry,
    programType: type?.label,
    timeToComplete: opportunity.commitment,
    inLanguage: siteConfig.brand.locale,
  };

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Opportunities", href: "/opportunities" }, { label: opportunity.title }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{type?.label}</Badge>
        <span className="text-sm text-ink-soft">{opportunity.industry}</span>
      </div>
      <h1 className="mt-3 text-3xl font-semibold text-brand-green">{opportunity.title}</h1>
      <p className="mt-1 text-lg text-ink-soft">{organisationName}</p>
      <p className="mt-1 text-sm text-ink-soft">{opportunity.location}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 rounded-lg border border-black/5 bg-brand-tan/30 p-5 sm:grid-cols-4">
        <Fact label="Ages" value={`${opportunity.ageMin}–${opportunity.ageMax}`} />
        <Fact label="Places" value={String(opportunity.availablePlaces)} />
        <Fact label="Commitment" value={opportunity.commitment} />
        <Fact label="Closes" value={formatDate(opportunity.closingDate)} />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-ink">About this opportunity</h2>
        <p className="mt-2 leading-7 text-ink-soft">{opportunity.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-ink">What you&apos;ll learn</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
          {opportunity.whatYoullLearn.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-ink">Requirements &amp; eligibility</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
          {opportunity.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Fact label="Start date" value={formatDate(opportunity.startDate)} />
        <Fact label="End date" value={formatDate(opportunity.endDate)} />
        <Fact label="Career pathway" value={opportunity.careerPathway} />
      </section>

      <Alert tone="info" title="How applications work" className="mt-10">
        Applications are reviewed by the organisation. Your school counsellor will receive
        application updates and coordinate the next steps.
      </Alert>

      <div className="mt-8">
        <LinkButton href={`/student/applications/${opportunity.id}/apply`} size="lg">
          Apply for this opportunity
        </LinkButton>
      </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
