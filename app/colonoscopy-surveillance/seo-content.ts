import type { JurId } from './engine'

// Per-guideline reference content rendered as an HTML section beneath the
// calculator: a plain-language interval table, a short intro, and the single
// most useful divergence from the other guidelines. Every table row traces to
// the primary-source derivation the engine is built from. This is the page's
// search and answer-engine surface; the calculator above it stays lean.
export interface GuidelineSeo {
  intro: string
  table: { finding: string; interval: string }[]
  divergence: string
}

export const SEO_CONTENT: Record<JurId, GuidelineSeo> = {
  US: {
    intro:
      'The United States Multi-Society Task Force on Colorectal Cancer (USMSTF) 2020 guideline sets the next colonoscopy interval from what was found and removed at a complete, well-prepared baseline exam. Conventional adenomas are stratified by number, size, and histology, while serrated lesions follow their own separate schedule. Intervals range from 6 months after piecemeal removal of a large polyp out to 10 years after a normal exam or a few small low-risk polyps.',
    table: [
      { finding: 'Normal colonoscopy, no polyps found', interval: 'Colonoscopy in 10 years' },
      { finding: '1 to 2 tubular adenomas under 10 mm', interval: 'Colonoscopy in 7 to 10 years' },
      { finding: '3 to 4 tubular adenomas under 10 mm', interval: 'Colonoscopy in 3 to 5 years' },
      { finding: '5 to 10 tubular adenomas under 10 mm', interval: 'Colonoscopy in 3 years' },
      { finding: 'An adenoma 10 mm or larger', interval: 'Colonoscopy in 3 years' },
      { finding: 'An adenoma with tubulovillous or villous histology', interval: 'Colonoscopy in 3 years' },
      { finding: 'An adenoma with high-grade dysplasia', interval: 'Colonoscopy in 3 years' },
      { finding: 'More than 10 adenomas at one exam', interval: 'Colonoscopy in 1 year' },
      { finding: 'Up to 20 hyperplastic polyps under 10 mm in the rectum or sigmoid colon', interval: 'Colonoscopy in 10 years' },
      { finding: 'Up to 20 hyperplastic polyps under 10 mm proximal to the sigmoid colon', interval: 'Colonoscopy in 10 years' },
      { finding: '1 to 2 sessile serrated polyps under 10 mm', interval: 'Colonoscopy in 5 to 10 years' },
      { finding: '3 to 4 sessile serrated polyps under 10 mm', interval: 'Colonoscopy in 3 to 5 years' },
      { finding: 'A hyperplastic polyp 10 mm or larger', interval: 'Colonoscopy in 3 to 5 years' },
      { finding: '5 to 10 sessile serrated polyps under 10 mm', interval: 'Colonoscopy in 3 years' },
      { finding: 'A sessile serrated polyp 10 mm or larger', interval: 'Colonoscopy in 3 years' },
      { finding: 'A sessile serrated polyp with dysplasia', interval: 'Colonoscopy in 3 years' },
      { finding: 'A traditional serrated adenoma', interval: 'Colonoscopy in 3 years' },
      { finding: 'Piecemeal removal of an adenoma 20 mm or larger', interval: 'Colonoscopy in 6 months' },
      { finding: 'Piecemeal removal of a sessile serrated polyp 20 mm or larger', interval: 'Colonoscopy in 6 months' },
    ],
    divergence:
      'Unlike the European Society of Gastrointestinal Endoscopy (ESGE), which returns patients with 1 to 4 small low-grade adenomas to routine screening, the USMSTF keeps even 1 to 2 small tubular adenomas under colonoscopy surveillance at 7 to 10 years.',
  },
  CA_ON: {
    intro:
      "Cancer Care Ontario's ColonCancerCheck (CCC) recommendations set the surveillance interval from the size and histology of the most advanced lesion found, and assume a high-quality colonoscopy that reached the cecum with adequate bowel preparation. Lower-risk findings return the patient to fecal immunochemical test (FIT) stool screening rather than a repeat colonoscopy: no polyps or rectosigmoid hyperplastic polyps go to FIT in 10 years, and low risk adenomas to FIT in 5 years. Higher-risk adenomas, serrated lesions, and piecemeal resections stay on colonoscopy surveillance, from 3 years down to a 6-month check of the resection site.",
    table: [
      { finding: 'No polyps, or hyperplastic polyps in the rectum or sigmoid', interval: 'FIT in 10 years' },
      { finding: 'Low risk adenomas: 1 to 2 tubular adenomas under 10 mm with no high-grade dysplasia', interval: 'FIT in 5 years' },
      { finding: 'Sessile serrated adenoma under 10 mm without dysplasia', interval: 'Colonoscopy in 5 years' },
      { finding: 'High risk (advanced) adenomas: a tubular adenoma 10 mm or larger, 3 or more adenomas, villous histology, or high-grade dysplasia', interval: 'Colonoscopy in 3 years' },
      { finding: 'Sessile serrated adenoma 10 mm or larger, sessile serrated adenoma with dysplasia, or traditional serrated adenoma', interval: 'Colonoscopy in 3 years' },
      { finding: 'Large sessile polyp removed piecemeal', interval: 'Colonoscopy to check the polypectomy site within 6 months' },
      { finding: 'Serrated polyposis syndrome', interval: 'Colonoscopy in 1 year' },
      { finding: 'More than 10 adenomas', interval: 'Clearing colonoscopy within 1 year' },
    ],
    divergence:
      'Ontario returns lower-risk patients to stool-based FIT screening instead of a surveillance colonoscopy: 1 to 2 small tubular adenomas get a FIT in 5 years, where the US schedules a colonoscopy at 7 to 10 years.',
  },
  CA_AB: {
    intro:
      'The Alberta Colorectal Cancer Screening Program (ACRCSP) sets post-polypectomy intervals from the single most advanced finding at a high-quality baseline colonoscopy, confirmed on final pathology. It is distinctive in routing the lowest-risk findings back to stool-based screening: a normal exam, small hyperplastic polyps, and one to two small adenomas all return to the fecal immunochemical test (FIT) rather than to a scheduled colonoscopy. Colonoscopy surveillance at one, three, or five years is reserved for higher adenoma counts, large or advanced lesions, the serrated categories, and piecemeal removals.',
    table: [
      { finding: 'Normal colonoscopy or no polyps', interval: 'FIT in 10 years' },
      { finding: 'Hyperplastic polyps under 10 mm', interval: 'FIT in 10 years' },
      { finding: '1 to 2 tubular adenomas under 10 mm', interval: 'FIT in 5 years' },
      { finding: '3 to 4 tubular adenomas under 10 mm', interval: 'Colonoscopy in 5 years' },
      { finding: '5 to 10 tubular adenomas under 10 mm, any adenoma 10 mm or larger, or villous/tubulovillous features or high-grade dysplasia', interval: 'Colonoscopy in 3 years' },
      { finding: 'More than 10 tubular adenomas on a single colonoscopy', interval: 'Colonoscopy in 1 year, and consider genetic counselling' },
      { finding: '1 to 2 sessile serrated lesions (SSL) under 10 mm', interval: 'Colonoscopy in 5 years' },
      { finding: '3 to 10 sessile serrated lesions under 10 mm', interval: 'Colonoscopy in 3 years' },
      { finding: 'Sessile serrated lesion over 10 mm, traditional serrated adenoma of any size, or sessile serrated lesion with dysplasia of any size', interval: 'Colonoscopy in 3 years' },
      { finding: 'Hyperplastic polyp 10 mm or larger, proximal to the sigmoid colon', interval: 'Colonoscopy in 3 years' },
      { finding: 'Hyperplastic polyp 10 mm or larger, in the rectosigmoid', interval: 'Colonoscopy in 5 years' },
      { finding: 'Serrated polyposis syndrome', interval: 'Colonoscopy in 1 year' },
      { finding: 'Synchronous sessile serrated lesion and tubular adenoma', interval: 'No recommendation made (insufficient evidence)' },
      { finding: 'Piecemeal removal of a large (10 mm or larger) non-pedunculated polyp', interval: 'First repeat endoscopic assessment in 6 months' },
    ],
    divergence:
      'Alberta returns one to two small tubular adenomas to a fecal immunochemical test (FIT) in five years, where the US schedules a surveillance colonoscopy at seven to ten years for the same finding.',
  },
  CA_BC: {
    intro:
      "British Columbia's BCGuidelines (2022) sets post-polypectomy intervals from a single grid that pools all precancerous lesions, both adenomas and serrated lesions, by risk and by count rather than tracking adenoma subtypes on their own. One to four low-risk lesions return at 10 years, while 5 or more low-risk lesions or any high-risk lesion return at 3 years, and a normal exam or only small hyperplastic polyps goes back to fecal immunochemical test (FIT) screening. High risk here means an advanced adenoma: villous features, high-grade dysplasia, a lesion 10 mm or larger, or one of the higher-risk serrated types.",
    table: [
      { finding: 'No polyps, or only hyperplastic polyps under 10 mm', interval: 'No surveillance; return to FIT screening' },
      { finding: '1 to 4 low-risk precancerous lesions (tubular adenomas under 10 mm with low-grade dysplasia only, or sessile serrated lesions (SSLs) without dysplasia)', interval: 'Colonoscopy in 10 years' },
      { finding: '5 or more low-risk precancerous lesions (tubular adenomas under 10 mm with low-grade dysplasia only, or SSLs without dysplasia)', interval: 'Colonoscopy in 3 years' },
      { finding: '1 or more high-risk lesions (advanced adenoma): villous features, high-grade dysplasia, an adenoma or SSL 10 mm or larger, an SSL with cytologic dysplasia, a traditional serrated adenoma (TSA), or a hyperplastic polyp 10 mm or larger', interval: 'Colonoscopy in 3 years' },
      { finding: 'Large precancerous lesion removed piecemeal', interval: "Repeat colonoscopy at 6 months to check the resection site; later intervals at the endoscopist's discretion" },
      { finding: '10 or more precancerous lesions removed over a lifetime', interval: 'No set colonoscopy interval; referral to the Hereditary Cancer Program' },
    ],
    divergence:
      'BC keeps 1 to 4 low-risk lesions on a 10-year colonoscopy, longer than the US, which surveils 3 to 4 such lesions at 3 to 5 years, and unlike Ontario, which returns 1 to 2 low-risk adenomas to FIT screening in 5 years.',
  },
  AU: {
    intro:
      'The National Health and Medical Research Council (NHMRC) approved Cancer Council Australia guideline sets the first surveillance colonoscopy interval from what was found and completely removed at the index exam. It handles conventional adenomas and clinically significant serrated polyps as separate pathways, then assigns an interval from the number of lesions, their size (a 10 mm cut-off), and whether there is high-grade dysplasia or villous change. Low-risk findings go back to the National Bowel Cancer Screening Program (NBCSP), higher-risk findings are booked at 5, 3, or 1 year, and lesions taken out piecemeal are rechecked at around 6 months.',
    table: [
      { finding: '1 to 2 diminutive (under 6 mm) tubular adenomas, low-risk', interval: 'Return to the National Bowel Cancer Screening Program after 4 years' },
      { finding: '1 to 2 small (under 10 mm) tubular adenomas, no high-grade dysplasia', interval: '10 years, colonoscopy (no sooner than 5 years)' },
      { finding: '1 to 2 adenomas with high-grade dysplasia or villous change, all under 10 mm; or 3 to 4 tubular adenomas without high-grade dysplasia, all under 10 mm', interval: '5 years, colonoscopy' },
      { finding: '1 to 2 adenomas with high-grade dysplasia or villous change where one is 10 mm or larger; or 3 to 4 tubular adenomas where one is 10 mm or larger; or 3 to 4 adenomas with villous change and/or high-grade dysplasia, all under 10 mm', interval: '3 years, colonoscopy' },
      { finding: '5 to 9 adenomas', interval: '3 years if all are tubular, under 10 mm, and without high-grade dysplasia; otherwise 1 year' },
      { finding: '10 or more adenomas (consider referral to a familial cancer clinic)', interval: '1 year, colonoscopy, regardless of size or histology' },
      { finding: '1 to 2 sessile serrated adenomas, all under 10 mm, no dysplasia', interval: '5 years, colonoscopy' },
      { finding: '3 to 4 sessile serrated adenomas under 10 mm without dysplasia; or 1 to 2 sessile serrated adenomas 10 mm or larger or with dysplasia; or a hyperplastic polyp 10 mm or larger; or 1 to 2 traditional serrated adenomas of any size', interval: '3 years, colonoscopy' },
      { finding: '5 or more sessile serrated adenomas under 10 mm without dysplasia; or 3 to 4 sessile serrated adenomas 10 mm or larger or with dysplasia; or 3 to 4 traditional serrated adenomas of any size', interval: '1 year, colonoscopy' },
      { finding: 'Hyperplastic polyps under 10 mm', interval: 'Usual screening (only hyperplastic polyps 10 mm or larger are surveilled)' },
      { finding: 'Large sessile or laterally spreading lesion removed piecemeal', interval: 'About 6 months, colonoscopy' },
      { finding: 'Large sessile or laterally spreading lesion removed en bloc', interval: 'About 12 months, colonoscopy' },
    ],
    divergence:
      'Australia runs conventional adenomas and clinically significant serrated polyps as separate counting pathways, giving serrated lesions their own 5, 3, and 1 year intervals rather than folding them into the adenoma rules.',
  },
  EU: {
    intro:
      'The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline divides patients into two groups after complete removal of one or more polyps at a high-quality colonoscopy: those who return to routine screening and those who need surveillance. Surveillance applies only to larger, more numerous, or dysplastic lesions, and where it applies the baseline interval is 3 years. ESGE abandoned the older high-risk and low-risk labels, and it does not treat villous histology or polyp location as a reason to shorten the interval.',
    table: [
      { finding: '1 to 4 adenomas under 10 mm with low-grade dysplasia (with or without villous features)', interval: 'Usual screening (colonoscopy in 10 years where no organised screening program exists)' },
      { finding: 'Any serrated polyp under 10 mm without dysplasia', interval: 'Usual screening (colonoscopy in 10 years where no organised screening program exists)' },
      { finding: 'At least 1 adenoma 10 mm or larger, or an adenoma with high-grade dysplasia', interval: '3 years, colonoscopy' },
      { finding: '5 or more adenomas', interval: '3 years, colonoscopy' },
      { finding: 'Any serrated polyp 10 mm or larger, or with dysplasia', interval: '3 years, colonoscopy' },
      { finding: '10 or more adenomas', interval: 'No surveillance interval set; referral for genetic counselling' },
      { finding: 'Piecemeal resection of a polyp 20 mm or larger', interval: 'Early repeat colonoscopy at 3 to 6 months, then surveillance colonoscopy 12 months after that' },
    ],
    divergence:
      'ESGE returns 1 to 4 small adenomas with low-grade dysplasia to routine screening, whether or not they are villous, while the United States keeps the same adenomas in colonoscopy surveillance at 7 to 10 years.',
  },
}
