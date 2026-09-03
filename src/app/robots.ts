import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Portal areas require login and carry no public SEO value —
        // keep crawlers out of them.
        disallow: ["/student", "/parent", "/school", "/organisation", "/api/"],
      },
    ],
    sitemap: `${siteConfig.brand.url}/sitemap.xml`,
  };
}
