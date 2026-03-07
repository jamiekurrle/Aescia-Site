'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="py-16 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/ae-mark.png" alt="Aescia" width={24} height={24} className="invert" />
              <span className="font-semibold">Aescia</span>
            </Link>
            <p className="text-sm text-primary-foreground/60">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-primary-foreground/40">{t('footer.product')}</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/problem" className="text-primary-foreground/70 hover:text-primary-foreground">
                  {t('footer.problem')}
                </Link>
              </li>
              <li>
                <Link href="/solution" className="text-primary-foreground/70 hover:text-primary-foreground">
                  {t('footer.solution')}
                </Link>
              </li>
              <li>
                <Link href="/evidence" className="text-primary-foreground/70 hover:text-primary-foreground">
                  {t('footer.evidence')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-primary-foreground/40">{t('footer.company')}</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/governance" className="text-primary-foreground/70 hover:text-primary-foreground">
                  {t('footer.governance')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/70 hover:text-primary-foreground">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <a href="mailto:contact@aesciahealth.com" className="text-primary-foreground/70 hover:text-primary-foreground">
                  contact@aesciahealth.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-primary-foreground/40">{t('footer.legal')}</p>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>Aescia Pty Ltd</li>
              <li>ABN 96 687 840 517</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Aescia Pty Ltd. {t('footer.rights')}</p>
          <p>{t('footer.health')}</p>
        </div>
      </div>
    </footer>
  )
}
