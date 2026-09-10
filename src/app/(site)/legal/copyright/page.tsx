import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "Copyright",
  description: `Copyright ownership and permitted use of content on ${siteConfig.brand.name}.`,
};

export default function CopyrightPage() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Copyright</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>

      <Alert tone="warning" title="Placeholder legal content" className="mt-6">
        This page is a plain-language starting point for demonstration purposes and is not legal
        advice. Have a qualified lawyer review and finalise this notice before {siteConfig.brand.name}{" "}
        goes live.
      </Alert>

      <div className="mt-8 space-y-8 text-sm leading-7 text-ink-soft">
        <section>
          <p>
            © {year} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p className="mt-2">
            Unless otherwise stated, all content on this website — including text, graphics,
            layouts, logos, icons, images, software and the overall look and feel of the platform
            — is owned by or licensed to {siteConfig.brand.name} and protected under the{" "}
            <strong>Copyright Act 1968 (Cth)</strong> and other applicable Australian and
            international copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What you can do</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>View, download and print pages from this site for your own personal, non-commercial use — for example, saving an opportunity listing to refer back to.</li>
            <li>Share a link to a public page (like an opportunity or case study) with others.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What you can&apos;t do without permission</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Reproduce, republish, distribute, or create derivative works from this site&apos;s content for commercial purposes.</li>
            <li>Use the {siteConfig.brand.name} name, logo or brand assets to imply endorsement or affiliation.</li>
            <li>Copy or scrape opportunity listings, school or organisation data in bulk.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Content submitted by schools and organisations</h2>
          <p className="mt-2">
            Opportunity listings, logos, and descriptions submitted by schools, businesses and
            universities remain the property of the organisation that submitted them. They are
            displayed on {siteConfig.brand.name} with that organisation&apos;s permission, for the
            purpose of listing opportunities to students.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Reporting a copyright concern</h2>
          <p className="mt-2">
            If you believe content on {siteConfig.brand.name} infringes your copyright, contact us
            at <strong>{siteConfig.contact.email}</strong> with a description of the material and
            evidence of your ownership. We&apos;ll investigate and respond promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
