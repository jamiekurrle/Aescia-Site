import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500'],
  display: 'swap',
})

const SITE_URL = 'https://www.aesciahealth.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aescia. A continuous-care platform.',
    template: '%s | Aescia',
  },
  description:
    'Aescia (aesciahealth.com) is a healthtech company building a continuous-care platform for hospitals and specialty clinics. Founded 2025 by James Kurrle MD; headquartered in Sydney, Australia and Montréal, Canada. Investigational SaMD for post-discharge monitoring; non-device workflow for specialty clinics.',
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F4EE' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1F2A' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
