// Homepage instrument panel: three problem-size numbers from the cited
// literature plus one proof number (the trial). Values live in the component
// (they animate); labels and source lines live here. English-only for now;
// the component falls back to en for other locales, matching the
// exploded-engine dictionary pattern.
export const dict: Record<string, Record<string, string>> = {
  en: {
    'ip.eyebrow': 'The numbers',
    'ip.s1.label': 'of surveillance patients never return on time',
    'ip.s1.src': 'Cooper 2013, n=12,771',
    'ip.s2.label': 'of real-world colonoscopies arrive with inadequate prep',
    'ip.s2.src': 'US midpoint; USMSTF benchmark is 90% adequate',
    'ip.s3.label': 'combined no-shows and late cancellations',
    'ip.s3.src': 'ASGE benchmark, 5.6–8.45%',
    'ip.s4.label': 'patients in the registered SAFE-Discharge trial',
    'ip.s4.src': 'Royal Prince Alfred Hospital, Sydney',
  },
}
