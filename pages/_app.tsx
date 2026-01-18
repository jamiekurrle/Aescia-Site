import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>

        {/* Primary metadata */}
        <meta name="application-name" content="Aescia" />
        <meta name="author" content="Aescia" />
        <meta name="publisher" content="Aescia" />
        <meta name="robots" content="index, follow" />

        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aescia",
              "url": "https://aesciahealth.com",
              "description":
                "Aescia is a digital health platform focused on post-discharge monitoring and escalation workflows in public hospital settings.",
              "industry": "Digital Health",
              "foundingLocation": "Australia",
              "sameAs": [
                "https://www.linkedin.com/company/aescia-health"
              ]
            }),
          }}
        />

        {/* JSON-LD: MedicalEntity (non-claiming, conservative) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalEntity",
              "name": "Aescia",
              "description":
                "Aescia is undergoing early clinical evaluation and is not a routine clinical deployment.",
              "medicalSpecialty": "Cardiothoracic Surgery",
              "status": "Clinical evaluation"
            }),
          }}
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
