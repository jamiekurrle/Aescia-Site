import type { Metadata } from 'next'
import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n'
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
  axes: ['opsz', 'SOFT'],
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aescia. Between the discharge and the next appointment.',
  description:
    'A platform for structured follow-up and efficient clinic workflow. Aescia for Hospitals supports post-surgical recovery monitoring. Aescia for Clinics streamlines patient preparation and adherence.',
  keywords:
    'post-surgical monitoring, clinical follow-up, digital health platform, endoscopy workflow, colonoscopy prep, cardiothoracic recovery, specialty clinic software',
  openGraph: {
    title: 'Aescia. Between the discharge and the next appointment.',
    description:
      'Structured patient follow-up for hospitals. Streamlined workflow for specialty clinics. One platform.',
    type: 'website',
    url: 'https://www.aesciahealth.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <I18nProvider>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}