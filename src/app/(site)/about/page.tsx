import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us",
  description: `Why ${siteConfig.brand.name} exists and how it keeps schools at the centre of every student placement.`,
};

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "About" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">
        About {siteConfig.brand.name}
      </h1>
      <p className="mt-2 text-sm font-medium text-brand-orange-dark">
        {siteConfig.brand.fullMeaning}
      </p>

      <div className="mt-8 space-y-5 text-ink-soft leading-7">
        <p>
          {siteConfig.brand.name} connects students with internships, apprenticeships,
          trainships, headstart programs, university opportunities, business opportunities and
          work experience — matched to their age, location, career goals, interests and
          education level.
        </p>
        <p>
          We built {siteConfig.brand.name} because finding a real opportunity as a young person
          shouldn&apos;t feel like navigating a corporate job board. It should feel simple,
          supportive and easy to understand — for students, parents, school counsellors,
          businesses and universities alike.
        </p>
        <p>
          Schools stay at the centre of every placement. Rather than students messaging
          organisations directly, school counsellors coordinate communication and next steps —
          keeping the experience safe, guided and age-appropriate.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { title: "Opportunity", body: "Real pathways into real careers, matched to you." },
          { title: "Connection", body: "Students, schools, businesses and universities, working together." },
          { title: "Confidence", body: "A guided process that supports young people at every step." },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-black/5 bg-brand-tan/30 p-5">
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft">{item.body}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
