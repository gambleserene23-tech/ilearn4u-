import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";
import { FAQSection } from "@/components/domain/FAQSection";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about ${siteConfig.brand.name} for students, parents, schools, businesses and universities.`,
};

export default function FaqPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <FAQSection heading="Frequently asked questions" />
    </div>
  );
}
