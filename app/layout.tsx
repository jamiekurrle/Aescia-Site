import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n'
import { organizationSchema, websiteSchema, jamesKurrlePersonSchema, SITE_LAST_UPDATED } from '@/lib/schema'
import './globals.css'

// Single typeface programme (Geist) — matches aescia-clinical.vercel.app.
// Display, sans, and mono all map to Geist via CSS variables in globals.css.

const SITE_URL = 'https://www.aesciahealth.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aescia. A continuous-care platform.',
    template: '%s | Aescia',
  },
  description:
    'Aescia: a continuous-care platform. Structured patient follow-up for hospitals (investigational SaMD, intended TGA Class IIa) and specialty-clinic workflow.',
  keywords:
    'Aescia, Aescia Health, healthtech, post-discharge monitoring, cardiothoracic discharge, endoscopy preparation, colonoscopy preparation, GLP-1 peri-procedural, clinical follow-up, specialty clinic workflow, Software as a Medical Device, SaMD, James Kurrle, District 3 Concordia, MTAA MedTech Compass',
  alternates: {
    canonical: '/',
    languages: {
      'en-AU': '/',
      'en-CA': '/',
      'fr-CA': '/',
    },
  },
  openGraph: {
    title: 'Aescia. A continuous-care platform.',
    description:
      'Structured patient follow-up for hospitals. Streamlined workflow for specialty clinics. One platform.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Aescia',
    locale: 'en_AU',
    images: [
      {
        url: `${SITE_URL}/aescia-logo.png`,
        width: 512,
        height: 512,
        alt: 'Aescia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aescia. A continuous-care platform.',
    description:
      'Structured patient follow-up for hospitals. Streamlined workflow for specialty clinics. One platform.',
    images: [`${SITE_URL}/aescia-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Content-freshness signals for AI retrieval tools (Claude, Perplexity,
  // Google AI Overviews). Update SITE_LAST_UPDATED in lib/schema.ts when
  // making substantive content changes; the date appears here automatically.
  other: {
    'article:published_time': '2025-09-01T00:00:00+10:00',
    'article:modified_time': `${SITE_LAST_UPDATED}T00:00:00+10:00`,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6FA' },
    { media: '(prefers-color-scheme: dark)', color: '#1B2745' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Founder Person schema embedded site-wide so AI tools landing on any
            page (not just /team/james-kurrle) get author / authority signals
            for content attributed to Aescia. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jamesKurrlePersonSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:tracking-wide"
        >
          Skip to content
        </a>
        <I18nProvider>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
