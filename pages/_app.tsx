import type { AppProps } from 'next/app'
import Head from 'next/head'

const SITE_URL = 'https://aesciahealth.com'

export default function App({ Component, pageProps }: AppProps) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aescia Health",
    "legalName": "Aescia Pty Ltd",
    "url": SITE_URL,
    "sameAs": [
      "https://www.linkedin.com/company/aescia",
      "https://abr.business.gov.au/ABN/View?id=96687840517"
    ],
    "identifier": [
      {
        "@type": "PropertyValue",
        "propertyID": "ABN",
        "value": "96 687 840 517"
      }
    ],
    "areaServed": "AU",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": `${SITE_URL}/contact`
      }
    ]
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
