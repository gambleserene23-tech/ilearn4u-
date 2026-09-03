import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getOpportunities } from "@/lib/services/opportunities";
import { caseStudies } from "@/data/case-studies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.brand.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/opportunities`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/how-it-works`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/case-studies`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/pricing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/login`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/signup`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/legal/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/safeguarding`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/accessibility`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const opportunities = await getOpportunities();
  const opportunityRoutes: MetadataRoute.Sitemap = opportunities.map((o) => ({
    url: `${base}/opportunities/${o.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...opportunityRoutes, ...caseStudyRoutes];
}
