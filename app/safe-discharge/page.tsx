import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { PartnerLogos } from '@/components/partner-logos'
import { PageContent } from './content'

// This page is for trial participants who have been emailed the link as part
// of their onboarding to the SAFE-Discharge study at Royal Prince Alfred
// Hospital. It is intentionally not linked from the public site nav, not
// listed in the sitemap, and carries `noindex, nofollow` so that it does not
// appear in public search results. The URL stays stable so it can be embedded
// in onboarding emails and printed handouts.
//
// Content is summarised from the HREC-approved Participant Information Sheet
// and Consent Form (Master v1.4, ETH00107, Protocol X26-0019). The formal
// PICS remains authoritative; this page is a plain-language companion only.

export const metadata: Metadata = {
  title: 'Welcome — SAFE-Discharge participants',
  description:
    'Information for participants in the SAFE-Discharge study at Royal Prince Alfred Hospital cardiothoracic surgery. What to expect, what to do, and who to contact.',
  alternates: { canonical: '/safe-discharge' },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function SafeDischargeWelcomePage() {
  return (
    <>
      {/* The regulatory band classifies the SaMD audience (hospitals vs.
          clinics) for general public visitors. Trial participants reaching
          this page already know the context, and the band visually competes
          with the partner-institution strip below — hide it here. */}
      <SiteNav showRegulatoryBand={false} showTextSize />
      {/* PartnerLogos sits OUTSIDE main so the text-size zoom does not
          scale partner branding — the logos should stay a fixed size
          regardless of the participant's chosen text scale. */}
      <PartnerLogos />
      <main
        id="main"
        data-page="safe-discharge"
        className="bg-background min-h-screen"
      >
        <PageContent />
      </main>
      <Footer />
    </>
  )
}
