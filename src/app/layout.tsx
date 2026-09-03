import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.url),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s — ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  openGraph: {
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: siteConfig.brand.url,
    siteName: siteConfig.brand.name,
    locale: siteConfig.brand.locale.replace("-", "_"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
  },
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.brand.name,
  url: siteConfig.brand.url,
  description: siteConfig.brand.description,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.contact.address,
    addressCountry: "AU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.brand.locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
