import Script from "next/script";

/**
 * Loads Google Analytics 4 only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set —
 * so local development and any deploy without a configured GA property never
 * sends tracking data. Set the env var in Netlify (or .env.local) to enable.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
