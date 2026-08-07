// /clinics KPI cards: the four levers with their cited effect sizes. Every
// figure traces to the same audited source set the ROI calculator documents
// in components/clinics-roi.tsx. English-only; component falls back to en.
export const dict: Record<string, Record<string, string>> = {
  en: {
    'kpi.title': 'What the levers are worth in the literature.',
    'kpi.note': 'Ranges from randomised trials and benchmark datasets, not promises. Run your own numbers in the calculator below.',
    'kpi.c1.eyebrow': 'Prep adequacy',
    'kpi.c1.label': 'adequate prep for screening and surveillance colonoscopy with text-message navigation, up from 88%',
    'kpi.c1.src': 'Solonowicz 2022, randomised, n=1,625, US academic endoscopy unit',
    'kpi.c2.eyebrow': 'Attendance',
    'kpi.c2.label': 'non-attendance with text-message reminders before colonoscopy. US results are mixed, so we treat US transfer as pilot-to-prove.',
    'kpi.c2.src': 'Meta-analysis of 4 randomised trials, RR 0.74 (95% CI 0.56–0.99). Li 2022',
    'kpi.c3.eyebrow': 'Backfill',
    'kpi.c3.label': 'midpoint commercial facility fee per colonoscopy at a US surgery center. Billed, not margin.',
    'kpi.c3.src': 'Wang 2023, JAMA Health Forum, 17,052 ASC fee observations',
    'kpi.c4.eyebrow': 'Recall',
    'kpi.c4.label': 'of Medicare patients aged 70 and over had a repeat colonoscopy within five years of polypectomy',
    'kpi.c4.src': 'Cooper 2013, Cancer, n=12,771',
  },
}
