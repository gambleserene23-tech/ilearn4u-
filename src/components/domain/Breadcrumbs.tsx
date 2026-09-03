import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export interface Crumb {
  label: string;
  href?: string; // omit on the final/current item
}

/**
 * Renders a breadcrumb trail and its matching BreadcrumbList JSON-LD, so both
 * users and search engines get the page hierarchy. Always start the `items`
 * array with "Home" omitted — it's added automatically.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.brand.url}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
        {trail.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-green hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
