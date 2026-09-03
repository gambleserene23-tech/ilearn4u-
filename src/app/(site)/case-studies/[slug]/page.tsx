import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, caseStudies } from "@/data/case-studies";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyDetailPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Case Studies", href: "/case-studies" }, { label: study.title }]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{study.audience}</Badge>
          <span className="text-sm text-ink-soft">{study.pathway}</span>
          <span className="text-sm text-ink-soft">· {study.location}</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-brand-green sm:text-4xl">{study.title}</h1>

        <blockquote className="mt-8 rounded-lg border-l-4 border-brand-orange bg-brand-tan/30 p-5 text-lg italic text-ink">
          &ldquo;{study.quote}&rdquo;
          <footer className="mt-2 text-sm not-italic font-medium text-ink-soft">
            — {study.quoteAttribution}
          </footer>
        </blockquote>

        <section className="mt-8 rounded-lg border border-black/5 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Outcome
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-soft">
            {study.outcome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-8 space-y-4 leading-7 text-ink-soft">
          {study.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/opportunities" size="lg">
            Explore opportunities
          </LinkButton>
          <LinkButton href="/case-studies" variant="outline" size="lg">
            More case studies
          </LinkButton>
        </div>
      </article>
    </div>
  );
}
