// /clinics KPI cards: the four levers with their cited effect sizes. Every
// figure traces to the same audited source set the ROI calculator documents
// in components/clinics-roi.tsx. English-only; component falls back to en.
export const dict: Record<string, Record<string, string>> = {
  en: {
    'kpi.title': 'What the levers are worth in the literature.',
    'kpi.note': 'Ranges from randomised trials and benchmark datasets, not promises. Run your own numbers in the calculator below.',
    'kpi.c1.eyebrow': 'Prep adequacy',
    'kpi.c1.label': 'inadequate-prep cancellations with reminders, 8.0% to 4.8%',
    'kpi.c1.src': 'Deng 2014, randomised, n=1,786',
    'kpi.c2.eyebrow': 'Attendance',
    'kpi.c2.label': 'non-attendance with pre-procedure engagement. US pilot-to-prove: both US trials were null.',
    'kpi.c2.src': 'Meta-analysis, 4 randomised trials, RR 0.74',
    'kpi.c3.eyebrow': 'Backfill',
    'kpi.c3.label': 'midpoint facility fee at stake per unfilled colonoscopy slot',
    'kpi.c3.src': 'Wang 2023, n=17,052 ASC fees',
    'kpi.c4.eyebrow': 'Recall',
    'kpi.c4.label': 'of surveillance patients never return on time',
    'kpi.c4.src': 'Cooper 2013, n=12,771',
  },
}
