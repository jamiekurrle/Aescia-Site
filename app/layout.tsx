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
    default: 'Aescia — HIPAA-ready endoscopy prep, GLP-1 handling, and no-show reduction for US ASCs',
    template: '%s | Aescia',
  },
  description:
    'Aescia for Clinics: a workflow platform for US ambulatory surgery centres and specialty clinics. HIPAA-aligned with BAA on request, US-region hosting on Google Cloud, HL7 v2 ADT and FHIR R4 integration ready, design-partner program with free-until-proof pilots and 3-year price-lock. Aescia for Hospitals is investigational software-as-a-medical-device under TGA Class IIa.',
  keywords:
    'Aescia, Aescia Health, HIPAA endoscopy software, US ASC endoscopy workflow, colonoscopy prep platform, GLP-1 peri-procedural management, no-show reduction GI ASC, ModMed gGastro integration, Provation integration, EndoWorks integration, BAA, US ambulatory surgery centre software, post-discharge monitoring, cardiothoracic discharge, MIPS quality reporting GI, Software as a Medical Device, SaMD, James Kurrle, District 3 Concordia',
  alternates: {
    canonical: '/',
    languages: {
      'en-AU': '/',
      'en-CA': '/',
      'en-US': '/',
      'fr-CA': '/',
    },
  },
  openGraph: {
    title: 'Aescia — HIPAA-ready endoscopy prep, GLP-1 handling, and no-show reduction for US ASCs',
    description:
      'Workflow platform for US ambulatory surgery centres: HIPAA-aligned, BAA on request, US-region hosting, named integrations, free-until-proof design-partner pilots.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Aescia',
    locale: 'en_US',
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
    title: 'Aescia — HIPAA-ready endoscopy prep, GLP-1 handling, and no-show reduction for US ASCs',
    description:
      'Workflow platform for US ambulatory surgery centres: HIPAA-aligned, BAA on request, US-region hosting, named integrations, free-until-proof design-partner pilots.',
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
