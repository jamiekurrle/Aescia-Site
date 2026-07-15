import { ImageResponse } from 'next/og'

// 1200x630 (1.91:1) social card for the colonoscopy surveillance calculator,
// referenced by the page's og:image / twitter:image. LinkedIn, X, Slack, and
// iMessage read og:image, so this is the shareable preview. Rendered on demand
// and cached by Vercel. Kept out of /colonoscopy-surveillance/* to avoid the
// [slug] dynamic route.
export const runtime = 'edge'

const GUIDELINES = ['USMSTF', 'ESGE', 'NHMRC', 'ColonCancerCheck', 'ACRCSP', 'BCGuidelines']

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1B2745',
          padding: '68px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 30, letterSpacing: 8, textTransform: 'uppercase', color: '#B89D6A', fontWeight: 700 }}>Aescia</div>
          <div style={{ height: 1, width: 64, background: '#B89D6A', opacity: 0.6 }} />
          <div style={{ fontSize: 21, color: '#AEB7CC', letterSpacing: 3, textTransform: 'uppercase' }}>Free clinician tool</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 64, lineHeight: 1.04, color: '#F4F6FA', fontWeight: 800, letterSpacing: -1.5 }}>
            Colonoscopy Surveillance Interval Calculator
          </div>
          <div style={{ fontSize: 27, color: '#C7CEDE', lineHeight: 1.35, maxWidth: 900 }}>
            The post-polypectomy interval from bowel prep, polyp number, size, and histology — with the guideline rule and source.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {GUIDELINES.map((g) => (
            <div key={g} style={{ display: 'flex', fontSize: 21, color: '#1B2745', background: '#B89D6A', padding: '8px 18px', borderRadius: 999, fontWeight: 600 }}>
              {g}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
