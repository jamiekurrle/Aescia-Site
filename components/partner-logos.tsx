import Image from 'next/image'

// Partner / affiliation strip rendered at the top of pages tied to a specific
// hospital programme (e.g. /safe-discharge for the RPAH SAFE-Discharge trial).
// Order: RPAH royal crest tight against the NSW Health / Sydney Local Health
// District banner (same parent org), then The Baird Institute, then the RPA
// Institute of Academic Surgery mark. The IAS does not publish a dedicated
// logo asset, so the file in /public/partners/ias.jpg is their X/Twitter
// profile mark; swap in a higher-quality version when IAS provides one.

export function PartnerLogos() {
  return (
    <section
      aria-label="Trial partner institutions"
      className="bg-secondary border-b border-border"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-24 lg:pt-28 pb-6 lg:pb-8">
        <div className="flex flex-wrap items-center justify-center gap-y-5 gap-x-6 lg:gap-x-10">
          <div className="flex items-center gap-3 lg:gap-4">
            <Image
              src="/partners/rpah-crest.png"
              alt="Royal Prince Alfred Hospital"
              width={120}
              height={68}
              priority
              className="h-12 lg:h-16 w-auto object-contain"
            />
            <Image
              src="/partners/slhd-banner.png"
              alt="NSW Health Sydney Local Health District"
              width={160}
              height={46}
              priority
              className="h-9 lg:h-12 w-auto object-contain"
            />
          </div>

          <div
            className="hidden lg:block w-px h-12 bg-border"
            aria-hidden="true"
          />

          <Image
            src="/partners/baird-institute.png"
            alt="The Baird Institute"
            width={180}
            height={48}
            priority
            className="h-9 lg:h-12 w-auto object-contain"
          />

          <Image
            src="/partners/ias.jpg"
            alt="RPA Institute of Academic Surgery"
            width={56}
            height={56}
            priority
            className="h-12 lg:h-14 w-auto object-contain rounded"
          />
        </div>
      </div>
    </section>
  )
}
