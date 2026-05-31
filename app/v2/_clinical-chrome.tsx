'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

/**
 * Clinical-palette chrome shared by /v2/c1..c6 drafts.
 * Mirrors aescia-clinical.vercel.app aesthetic: cool stone, navy ink,
 * Geist sans throughout, no serif.
 */

export function ClinicalNav() {
  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5 group">
          <span className="text-[22px] leading-none tracking-tight font-semibold" style={{ color: 'var(--c-ink)' }}>
            æscia
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] -translate-y-0.5" style={{ color: 'var(--c-ink-60)' }}>
            Health
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/platform" className="text-[13px] tracking-wide hover:opacity-100 transition-opacity" style={{ color: 'var(--c-ink-70)' }}>
            Platform
          </Link>
          <Link href="/hospitals" className="text-[13px] tracking-wide hover:opacity-100 transition-opacity" style={{ color: 'var(--c-ink-70)' }}>
            Hospitals
          </Link>
          <Link href="/clinics" className="text-[13px] tracking-wide hover:opacity-100 transition-opacity" style={{ color: 'var(--c-ink-70)' }}>
            Clinics
          </Link>
          <Link href="/evidence" className="text-[13px] tracking-wide hover:opacity-100 transition-opacity" style={{ color: 'var(--c-ink-70)' }}>
            Evidence
          </Link>
          <Link href="/contact" className="text-[13px] tracking-wide hover:opacity-100 transition-opacity" style={{ color: 'var(--c-ink-70)' }}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/v2"
            className="hidden lg:inline-flex items-center text-[12px] font-mono uppercase tracking-[0.18em]"
            style={{ color: 'var(--c-ink-60)' }}
          >
            ← All drafts
          </Link>
          <Link
            href="/contact"
            className="text-[13px] font-semibold px-5 py-2.5 transition-opacity hover:opacity-90 min-h-[40px] flex items-center cursor-pointer shadow-sm"
            style={{ background: 'var(--c-brass)', color: 'var(--c-ink)' }}
          >
            Request a briefing
          </Link>
        </div>
      </div>
    </header>
  )
}

export function ClinicalFooter() {
  return (
    <footer className="border-t pt-16 pb-12 px-6 lg:px-10" style={{ borderColor: 'var(--c-border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-baseline gap-1.5 mb-4">
              <span className="text-[20px] leading-none font-semibold" style={{ color: 'var(--c-ink)' }}>
                æscia
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] -translate-y-0.5" style={{ color: 'var(--c-ink-60)' }}>
                Health
              </span>
            </Link>
            <p className="text-[14px] leading-[1.65] max-w-sm" style={{ color: 'var(--c-ink-70)' }}>
              A continuous-care platform for hospitals and specialty clinics.
              Sydney · Montréal.
            </p>
          </div>
          <div className="lg:col-span-3">
            <div className="label-eyebrow mb-4">Product</div>
            <ul className="space-y-2.5 text-[14px]" style={{ color: 'var(--c-ink-70)' }}>
              <li><Link href="/platform" className="hover:opacity-100">Platform</Link></li>
              <li><Link href="/hospitals" className="hover:opacity-100">For Hospitals</Link></li>
              <li><Link href="/clinics" className="hover:opacity-100">For Clinics</Link></li>
              <li><Link href="/evidence" className="hover:opacity-100">Evidence</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <div className="label-eyebrow mb-4">Company</div>
            <ul className="space-y-2.5 text-[14px]" style={{ color: 'var(--c-ink-70)' }}>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/governance">Governance</Link></li>
              <li><a href="mailto:contact@aesciahealth.com">contact@aesciahealth.com</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] font-mono" style={{ borderColor: 'var(--c-border)', color: 'var(--c-ink-40)' }}>
          <span>© 2026 Aescia Pty Ltd · ABN 96 687 840 517</span>
          <span>9550-0708 Québec inc · NEQ 1181312316</span>
        </div>
        <p className="mt-6 text-[11px] leading-[1.6] max-w-3xl" style={{ color: 'var(--c-ink-40)' }}>
          Aescia for Hospitals is an investigational Software as a Medical Device,
          intended Class IIa under TGA Rule 3.4. A regulatory submission is in
          preparation. Aescia for Clinics is a workflow platform and is not a
          medical device.
        </p>
      </div>
    </footer>
  )
}

export function DraftBadge({ variant }: { variant: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 right-6 z-50 backdrop-blur-md px-4 py-2.5 border text-[11px] font-mono tracking-wider uppercase shadow-sm"
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        borderColor: 'var(--c-border-cool)',
        color: 'var(--c-ink-60)',
      }}
    >
      Draft · {variant} ·{' '}
      <Link href="/v2" className="underline hover:no-underline" style={{ color: 'var(--c-ink)' }}>
        all drafts
      </Link>
    </motion.div>
  )
}
