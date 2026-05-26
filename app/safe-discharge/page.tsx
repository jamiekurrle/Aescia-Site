import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { PartnerLogos } from '@/components/partner-logos'

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

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Will Aescia diagnose me or change my care?',
    a: 'No. Aescia does not diagnose conditions or make decisions about your treatment. All medical decisions stay with your treating clinical team.',
  },
  {
    q: 'What if I miss a day?',
    a: 'Try to answer when you can. Missing a day will not remove you from the study, and your usual care continues either way.',
  },
  {
    q: 'Can I stop?',
    a: 'Yes, at any time. Please tell a member of the research team before you withdraw so they can check there are no clinical issues to address. Withdrawing will not affect your treatment, your relationship with your team, or your relationship with the hospital.',
  },
  {
    q: 'Are my responses monitored 24 hours a day?',
    a: (
      <>
        No. Monitoring is during business hours, Monday to Friday, 8am to 5pm.
        Outside those times, your responses are recorded but may not be
        reviewed until the next business day.{' '}
        <strong>Aescia is not for emergencies.</strong>
      </>
    ),
  },
  {
    q: 'Will it cost me anything?',
    a: 'No. Access to Aescia is free, and there are no study-related fees. Your usual care (GP visits, specialist appointments, prescriptions) may still have its usual out-of-pocket costs whether or not you take part.',
  },
  {
    q: 'Where does my information go?',
    a: 'Your information is stored on secure servers in Australia. Only authorised members of the Royal Prince Alfred Hospital cardiothoracic clinical and research team can see information that identifies you. Aescia Pty Ltd, the company that builds the platform, only ever receives de-identified information, under a formal data sharing agreement.',
  },
  {
    q: 'Could the study cause me harm?',
    a: 'The study has been reviewed and approved by the Sydney Local Health District Human Research Ethics Committee and is running under the TGA Clinical Trials Notification scheme. It is considered low risk. The most common thing to be aware of is that you may notice small changes in how you feel more than usual, which can occasionally cause mild anxiety. If that happens, please contact the team.',
  },
  {
    q: 'What happens at the end of 30 days?',
    a: 'The check-ins stop automatically and your account closes at the end of the 30 days. We will contact you for a short survey about your experience.',
  },
  {
    q: 'What if I have a question or concern that is not on this page?',
    a: 'Use the contacts at the bottom of this page. The team is happy to help.',
  },
]

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
        {/* Hero */}
        <section className="pt-10 pb-12 lg:pt-14 lg:pb-16 px-6 lg:px-10 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
                SAFE-Discharge trial
              </span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-[-0.03em] mb-6"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Welcome to the RPAH SAFE-Discharge trial.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/85 max-w-2xl">
              You have been invited to take part in a 30-day study running
              through the cardiothoracic surgery unit at the Royal Prince
              Alfred Hospital. This page covers what to expect, what we ask of
              you, and how to reach the team.
            </p>
            <p className="mt-4 text-[14px] leading-[1.7] text-foreground/65 max-w-2xl">
              You should also have received the formal Participant Information
              Sheet and Consent Form. The formal document remains
              authoritative; this page is a plain-language summary.
            </p>
          </div>
        </section>

        {/* Safety callout — must be first thing they read */}
        <section className="py-12 lg:py-14 px-6 lg:px-10 bg-secondary border-b border-border">
          <div className="max-w-3xl mx-auto">
            <div className="border-l-4 border-foreground pl-6 lg:pl-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground mb-3 block">
                Important
              </span>
              <h2
                className="font-display font-bold text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] mb-6"
                style={{ fontVariationSettings: "'opsz' 96, 'wght' 700" }}
              >
                Aescia is not for emergencies.
              </h2>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-foreground/85">
                <li>
                  Your responses are monitored Monday to Friday, 8am to 5pm.
                  They are not monitored continuously overnight or on weekends.
                </li>
                <li>
                  If you are worried about your health at any time, call your
                  GP, your specialist, or present to the Emergency Department.
                  In a life-threatening emergency, call 000.
                </li>
                <li>
                  Continue your usual discharge instructions and follow-up
                  appointments. Aescia does not replace your usual care.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What happens */}
        <section className="py-16 lg:py-20 px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              What happens
            </span>
            <h2
              className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              The 30 days after you are discharged.
            </h2>
            <ol className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 list-none">
              <li className="grid grid-cols-[36px_1fr] gap-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">01</span>
                <p>You will receive a link to the Aescia website by email and SMS. The same link is also on the sheet given to you at discharge. Open the link and log in using the unique token on your sheet.</p>
              </li>
              <li className="grid grid-cols-[36px_1fr] gap-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">02</span>
                <p>Each day, Aescia will send you a short set of questions about your recovery, medicines, and follow-up appointments. Most people find it takes only a few minutes.</p>
              </li>
              <li className="grid grid-cols-[36px_1fr] gap-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">03</span>
                <p>If your answers suggest a possible problem, a clinician or specialist nurse from the cardiothoracic team may contact you. This might be a quick phone check-in, a recommendation to see your GP, or a recommendation to come back to the hospital.</p>
              </li>
              <li className="grid grid-cols-[36px_1fr] gap-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">04</span>
                <p>After 30 days, the daily check-ins stop automatically and your account closes. You will be invited to complete a short survey about your experience.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* What you do */}
        <section className="py-16 lg:py-20 px-6 lg:px-10 bg-secondary">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
              What we ask of you
            </span>
            <h2
              className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Three things.
            </h2>
            <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85">
              <li className="pl-5 relative">
                <span className="absolute left-0 top-3 w-2 h-px bg-brass" aria-hidden="true" />
                Answer the daily questions to the best of your ability. Honest answers, even when nothing has changed, help us look after you.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-3 w-2 h-px bg-brass" aria-hidden="true" />
                Continue your routine discharge instructions and follow-up appointments as discussed by your treating team.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-3 w-2 h-px bg-brass" aria-hidden="true" />
                Reach out if anything is unclear or concerning. The fastest way is to send a message inside the Aescia app — open the app and tap the <strong>Messages</strong> icon in the navigation to write to the cardiothoracic team. Messages are reviewed during business hours (Monday to Friday, 8am to 5pm). The phone and email contacts at the bottom of this page also work, especially if you cannot reach the team through the app.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Common questions
            </span>
            <h2
              className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Things people often ask.
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {faqs.map((it) => (
                <div key={it.q} className="py-6 lg:py-7 grid lg:grid-cols-[260px_1fr] gap-3 lg:gap-10">
                  <dt
                    className="font-display text-[18px] lg:text-[20px] leading-[1.3] tracking-[-0.015em] text-foreground"
                    style={{ fontVariationSettings: "'opsz' 72" }}
                  >
                    {it.q}
                  </dt>
                  <dd className="text-[14.5px] lg:text-[15.5px] leading-[1.7] text-foreground/85">
                    {it.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Contacts */}
        <section className="py-16 lg:py-20 px-6 lg:px-10 bg-secondary border-t border-border">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
              Who to contact
            </span>
            <h2
              className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              The right person depends on the question.
            </h2>

            <div className="space-y-10">
              <div className="border-t-4 border-foreground pt-5 bg-background/40 -mx-4 px-4 lg:-mx-6 lg:px-6 py-4 rounded-sm">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
                    Step 1
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">
                    Always try this team first
                  </span>
                </div>
                <p className="font-display text-[20px] lg:text-[24px] leading-[1.25] tracking-[-0.015em] text-foreground mb-2"
                   style={{ fontVariationSettings: "'opsz' 96" }}>
                  Cardiothoracic Surgery Clinical Nurse Consultants
                  <span className="text-foreground/65"> (CTS CNCs)</span>
                </p>
                <p className="text-[14.5px] leading-[1.7] text-foreground/85">
                  The CTS CNCs are the right first call for almost every question — clinical concerns, recovery, follow-up appointments, study logistics. They will escalate to Dr Woldendorp on your behalf if needed.
                </p>
                <p className="text-[14px] leading-[1.7] text-foreground/80 mt-2">
                  Contact details are on the discharge sheet you were given. If you cannot find the sheet, call the RPAH switchboard on{' '}
                  <a href="tel:+61295156111" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">
                    02 9515 6111
                  </a>
                  {' '}and ask to be put through to the cardiothoracic CNC on call.
                </p>
              </div>

              <div className="border-t border-border pt-5 opacity-90">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    Step 2
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/65">
                    Backup, only if the CNCs are unreachable
                  </span>
                </div>
                <p className="text-[15px] leading-[1.65] text-foreground">
                  <strong>Dr Kei Woldendorp</strong>, Cardiothoracic Registrar and Principal Study Investigator
                </p>
                <p className="text-[13.5px] leading-[1.7] text-foreground/70 mt-1 italic">
                  Please try the CTS CNCs first — they cover the clinical work day-to-day. Dr Woldendorp is the right contact for trial-specific questions the CNCs cannot answer, or in the rare case the CNC team is unreachable.
                </p>
                <p className="text-[14px] leading-[1.7] text-foreground/80 mt-2">
                  Call the RPAH switchboard on{' '}
                  <a href="tel:+61295156111" className="underline decoration-accent/40 underline-offset-4 hover:decoration-foreground transition-colors">
                    02 9515 6111
                  </a>
                  {' '}and ask to be put through.
                </p>
                <p className="text-[14px] leading-[1.7] text-foreground/80 mt-1">
                  Email:{' '}
                  <a href="mailto:kei.woldendorp@health.nsw.gov.au" className="underline decoration-accent/40 underline-offset-4 hover:decoration-foreground transition-colors break-all">
                    kei.woldendorp@health.nsw.gov.au
                  </a>
                </p>
              </div>

              <div className="border-t-2 border-brass/60 pt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 mb-2 block">
                  Independent ethics oversight
                </span>
                <p className="text-[15px] leading-[1.65] text-foreground">
                  <strong>Sydney Local Health District (RPAH Zone) Human Research Ethics Committee</strong>
                </p>
                <p className="text-[14px] leading-[1.7] text-foreground/80 mt-1">
                  Call{' '}
                  <a href="tel:+61295156766" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">
                    02 9515 6766
                  </a>
                </p>
                <p className="text-[14px] leading-[1.7] text-foreground/80 mt-1">
                  Email:{' '}
                  <a href="mailto:slhd-rpaethics@health.nsw.gov.au" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors break-all">
                    slhd-rpaethics@health.nsw.gov.au
                  </a>
                </p>
                <p className="text-[12.5px] leading-[1.6] text-foreground/65 mt-2 italic">
                  Protocol number: X26-0019
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <section className="py-12 lg:py-16 px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <p className="text-[13px] lg:text-[14px] leading-[1.7] text-foreground/65 italic font-display border-l-2 border-brass/40 pl-5">
              The formal Participant Information Sheet and Consent Form remains the authoritative document for this study. If anything on this page differs from the documents you signed, the signed documents apply. The study is sponsored by Sydney Local Health District and conducted under the TGA Clinical Trials Notification scheme; ethics approval is held by the Sydney Local Health District (RPAH Zone) Human Research Ethics Committee.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60 hover:text-foreground transition-colors"
              >
                ← Aescia home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
