'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-3">
            <Link href="/" className="inline-flex items-baseline gap-1.5 mb-5">
              <span
                className="font-display text-[26px] leading-none tracking-tight text-foreground"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                Aescia
              </span>
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/60 -translate-y-0.5">Health</span>
            </Link>
            <p className="text-[14px] leading-relaxed text-foreground/75 max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          <nav aria-label="Product" className="md:col-span-2">
            <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-5">{t('footer.product')}</p>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/platform" className="text-foreground/80 hover:text-foreground">{t('footer.platform')}</Link></li>
              <li><Link href="/hospitals" className="text-foreground/80 hover:text-foreground">{t('footer.hospitals')}</Link></li>
              <li><Link href="/clinics" className="text-foreground/80 hover:text-foreground">{t('footer.clinics')}</Link></li>
              <li><Link href="/integrations" className="text-foreground/80 hover:text-foreground">Integrations</Link></li>
              <li><Link href="/evidence" className="text-foreground/80 hover:text-foreground">{t('footer.evidence')}</Link></li>
            </ul>
          </nav>

          <nav aria-label="Buy" className="md:col-span-2">
            <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-5">Buy</p>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/design-partner" className="text-foreground/80 hover:text-foreground">Design-partner program</Link></li>
              <li><Link href="/clinics#roi" className="text-foreground/80 hover:text-foreground">ROI calculator</Link></li>
              <li><Link href="/security" className="text-foreground/80 hover:text-foreground">Security and HIPAA</Link></li>
              <li><Link href="/governance" className="text-foreground/80 hover:text-foreground">{t('footer.governance')}</Link></li>
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-5">{t('footer.company')}</p>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/team" className="text-foreground/80 hover:text-foreground">{t('footer.team')}</Link></li>
              <li><Link href="/updates" className="text-foreground/80 hover:text-foreground">{t('nav.updates')}</Link></li>
              <li><Link href="/careers" className="text-foreground/80 hover:text-foreground">{t('nav.careers')}</Link></li>
              <li><Link href="/faq" className="text-foreground/80 hover:text-foreground">FAQ</Link></li>
              <li><Link href="/contact" className="text-foreground/80 hover:text-foreground">{t('footer.contact')}</Link></li>
              <li><a href="mailto:contact@aesciahealth.com" className="text-foreground/80 hover:text-foreground">contact@aesciahealth.com</a></li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-5">{t('footer.legal')}</p>
            <ul className="space-y-2 text-[13px] text-foreground/75">
              <li>Aescia Pty Ltd (AU)</li>
              <li className="font-mono text-[12px]">ABN 96 687 840 517</li>
              <li className="pt-1">
                <a
                  href="https://buy.nsw.gov.au/supplier/profile/12460268"
                  target="_blank"
                  rel="noopener"
                  className="text-foreground/75 hover:text-foreground underline decoration-foreground/25 underline-offset-2 transition-colors"
                  aria-label="Aescia's registered supplier profile on the NSW Government buy.nsw marketplace (opens in a new window)"
                >
                  NSW Government registered supplier
                </a>
              </li>
              <li className="pt-2">9550-0708 Québec inc (CA)</li>
              <li className="font-mono text-[12px]">NEQ 1181312316</li>
              <li className="pt-2">Sydney, Australia</li>
              <li>Montréal, Canada</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-[12.5px] leading-relaxed text-foreground/70 max-w-3xl mb-6 italic font-display">
            {t('footer.disclosure')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-foreground/60 font-mono tracking-wide">
            <p>© {new Date().getFullYear()} Aescia Pty Ltd. {t('footer.rights')}</p>
            <p>{t('footer.health')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
