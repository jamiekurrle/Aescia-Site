import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../styles/globals.css";

const SITE_URL = "https://aesciahealth.com";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Normalize the path for the homepage and avoid double slashes
  const path = router.asPath?.split("#")[0]?.split("?")[0] ?? "/";
  const pageUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${pageUrl}#webpage`;

  const isHome = path === "/";

  return (
    <div
      className={inter.className}
      data-route={path}
      data-home={isHome ? "true" : "false"}
    >
      <Head>
        {/* Primary metadata */}
        <meta name="application-name" content="Aescia Health" />
        <meta name="author" content="Aescia Health" />
        <meta name="publisher" content="Aescia Health" />
        <meta name="robots" content="index, follow" />

        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": orgId,
              name: "Aescia Health",
              url: SITE_URL,
              description:
                "Aescia is a digital health platform focused on post-discharge monitoring and escalation workflows across hospitals and clinics.",
              foundingLocation: "Australia",
              sameAs: ["https://www.linkedin.com/company/aescia-health"],
            }),
          }}
        />

        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": websiteId,
              url: SITE_URL,
              name: "Aescia Health",
              publisher: { "@id": orgId },
            }),
          }}
        />

        {/* JSON-LD: WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": webpageId,
              url: pageUrl,
              name: "Aescia Health",
              isPartOf: { "@id": websiteId },
              about: { "@id": orgId },
            }),
          }}
        />
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
