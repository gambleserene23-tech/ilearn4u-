import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { ContactForm } from "@/components/domain/ContactForm";
import { ResponseTimePromise } from "@/components/domain/ResponseTimePromise";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.brand.name} team — questions from students, parents, schools, businesses and universities are all welcome.`,
};

export default function ContactPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Contact us</h1>
        <p className="mt-2 text-ink-soft">
          Questions about {siteConfig.brand.name}? We&apos;d love to hear from you.
        </p>
        <ResponseTimePromise className="mt-4" />

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="space-y-4 rounded-lg border border-black/5 bg-brand-tan/30 p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Email</p>
              <p className="text-sm font-semibold text-ink">{siteConfig.contact.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Phone</p>
              <p className="text-sm font-semibold text-ink">{siteConfig.contact.phone}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Address</p>
              <p className="text-sm font-semibold text-ink">{siteConfig.contact.address}</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
