import type { NextConfig } from "next";

// Security headers applied to every response. See docs/SECURITY.md.
const securityHeaders = [
  // Prevents the site from being embedded in an <iframe> on another
  // domain (clickjacking protection).
  { key: "X-Frame-Options", value: "DENY" },
  // Stops browsers from trying to guess ("sniff") a file's content type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limits how much of our URL is leaked to other sites via the Referer header.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disables browser features we don't use, so an XSS bug can't abuse them.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  // Forces HTTPS for a year, including subdomains, once a browser has seen it once.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Content Security Policy — only allow scripts/styles/connections we
  // actually use. Update this list if you add a new external script,
  // font, or API host.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://sandbox.web.squarecdn.com https://web.squarecdn.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://connect.squareupsandbox.com https://connect.squareup.com https://www.google-analytics.com",
      "frame-src 'self' https://sandbox.web.squarecdn.com https://web.squarecdn.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Stops the "X-Powered-By: Next.js" header from advertising our stack.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
