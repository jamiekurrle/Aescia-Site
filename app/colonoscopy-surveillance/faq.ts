// Q&A used both as a visible on-page FAQ and as FAQPage JSON-LD. These are the
// high-intent queries clinicians and patients ask search engines and AI
// assistants; the answers carry the actual guideline intervals so answer
// engines (Google AI Overviews, Perplexity, ChatGPT, Claude) can cite them.
// Every interval here matches the calculator's verified logic.

import type { JurId } from './engine'

export type FaqItem = { q: string; a: string }

// Single source of truth for the last clinical review date. Rendered visibly on
// the page and emitted as the WebApplication schema's dateReviewed, so the two
// never drift. Bump ONLY when a real review against the published guidelines
// happens — a site deploy is not a clinical review.
export const LAST_CLINICAL_REVIEW = '2026-07-14'
export const LAST_CLINICAL_REVIEW_DISPLAY = '14 July 2026'

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How soon should you repeat a colonoscopy after polyp removal?',
    a: 'It depends on the number, size, and histology of the polyps removed and the guideline you follow. A normal colonoscopy is usually repeated in 10 years; 1–2 small tubular adenomas in 7–10 years under the US (USMSTF 2020) guideline; and advanced findings — an adenoma 10 mm or larger, villous histology, or high-grade dysplasia — in 3 years. This calculator gives the guideline-based interval, or discretionary guidance where a guideline defers to the endoscopist, for the US, Canadian (Ontario, Alberta, and BC), Australian, and European guidelines.',
  },
  {
    q: 'What is the surveillance interval for 1–2 small (<10 mm) tubular adenomas?',
    a: 'US (USMSTF 2020): 7–10 years. Australia (NHMRC / Cancer Council): 10 years. Canada–Ontario (ColonCancerCheck): FIT in 5 years. Canada–Alberta (ACRCSP): FIT in 5 years. Canada–British Columbia: 10-year colonoscopy. Europe (ESGE 2020): 10 years, the usual screening interval, because ESGE treats low-risk adenomas as a return to screening rather than a surveillance trigger.',
  },
  {
    q: 'When should a colonoscopy be repeated after 3–4 adenomas?',
    a: 'This is where the guidelines diverge most. US: 3–5 years. Canada–Ontario: 3 years. Canada–Alberta: 5 years. Canada–British Columbia: 10 years. Australia: 5 years. Europe (ESGE): 10 years, the usual screening interval, because 3–4 small adenomas are deliberately not a surveillance trigger in the European guideline.',
  },
  {
    q: 'What is the follow-up interval for an adenoma with high-grade dysplasia?',
    a: '3 years in the US, Canadian, and European guidelines. High-grade dysplasia is an advanced (high-risk) feature that triggers 3-year surveillance regardless of polyp size or number. In Australia it moves the lesion into the high-risk category (5 years for 1–2 small lesions with high-grade dysplasia).',
  },
  {
    q: 'What is the surveillance interval for a 10 mm (1 cm) adenoma?',
    a: 'Three years across the US, Canadian, Australian, and European guidelines. An adenoma 10 mm or larger is an advanced adenoma, and the standard recommendation is a 3-year surveillance colonoscopy.',
  },
  {
    q: 'How often should sessile serrated lesions be surveilled?',
    a: 'For 1–2 small (<10 mm) sessile serrated lesions without dysplasia: 5–10 years in the US, and 5 years in Australia and Canada (Ontario and Alberta); Europe returns them to usual (10-year) screening. A sessile serrated lesion 10 mm or larger, or with dysplasia, and any traditional serrated adenoma, is surveilled at 3 years.',
  },
  {
    q: 'What is the follow-up after piecemeal removal of a large polyp?',
    a: 'An early repeat colonoscopy to check the resection site, because piecemeal resection carries a risk of residual tissue. The size threshold differs. The US (USMSTF 2020) sets 6 months for a piecemeal-resected adenoma or sessile serrated lesion 20 mm or larger, and Europe (ESGE 2020) sets 3 to 6 months at the same 20 mm threshold. Alberta sets 6 months from 10 mm. Ontario, British Columbia, and Australia call for an early site check after piecemeal removal of a large lesion without publishing a millimetre cut-off, so what counts as large is a clinical judgement.',
  },
  {
    q: 'What should happen if the bowel preparation was inadequate?',
    a: 'Every one of these guidelines states that its intervals assume an adequate examination, so an inadequate preparation puts the exam outside the published rules rather than into a different rule. Most of them publish no repeat interval at all. Cancer Council Australia is the exception, offering a practice point that where the preparation is inadequate, repeat colonoscopy should normally be offered within 12 months. Otherwise the timing of the repeat is a clinical decision.',
  },
  {
    q: 'Do colonoscopy surveillance guidelines differ between countries?',
    a: 'Yes, substantially. The US (USMSTF 2020) uses graded intervals. Europe (ESGE 2020) is binary — either 3-year surveillance or return to screening — and does not treat villous histology or 3–4 adenomas as triggers. Canada has no maintained national guideline: Ontario (ColonCancerCheck), Alberta (ACRCSP), and British Columbia each publish their own, and BC follows the European model. Australia uses discrete 10/5/3/1-year intervals. This calculator shows each guideline side by side.',
  },
  {
    q: 'Is this colonoscopy surveillance calculator free?',
    a: 'Yes. It is a free educational reference for health professionals that reproduces published post-polypectomy surveillance guidelines and shows the guideline rule and source behind every interval or discretionary result. It is not medical advice and not a medical device, and it stores no patient information.',
  },
  {
    q: 'How current is this calculator, and how do I report an error?',
    a: 'The Aescia clinical team reviews the rules periodically against the published guidelines and updates the tool when they change. Every result shows the rule it applied and links the source guideline, so you can check it directly. Guidelines are revised without notice, so verify against the current version before acting. If you notice an error, email contact@aesciahealth.com.',
  },
]

// Guideline-specific FAQ, one set per page. Each answer states only that
// guideline's intervals and is verified against the same finding-to-interval
// table rendered below the calculator, so no page broadcasts a number the
// calculator would not give. The cross-guideline comparison lives in FAQ_ITEMS
// above (rendered on the /guide hub only).
export const FAQ_BY_JUR: Record<JurId, FaqItem[]> = {
  US: [
    {
      q: "How soon should a colonoscopy be repeated after polypectomy under United States (USMSTF 2020)?",
      a: "The US Multi-Society Task Force (USMSTF) 2020 guideline sets the next interval from what was removed at a complete exam. Intervals range from 10 years for low-risk findings to 3 years for advanced adenomas, 1 year for more than 10 adenomas, and 6 months after piecemeal removal of a lesion 20 mm or larger.",
    },
    {
      q: "What is the surveillance interval after removing 1 to 2 small tubular adenomas under USMSTF 2020?",
      a: "For 1 to 2 tubular adenomas smaller than 10 mm, the US Multi-Society Task Force (USMSTF) recommends colonoscopy in 7 to 10 years. Unlike the European Society of Gastrointestinal Endoscopy (ESGE) guideline, which returns these patients to routine screening, the USMSTF keeps even 1 to 2 small tubular adenomas under colonoscopy surveillance.",
    },
    {
      q: "What interval applies to an advanced adenoma that is 10 mm or larger or has villous histology or high-grade dysplasia?",
      a: "The US Multi-Society Task Force (USMSTF) sets colonoscopy in 3 years for an advanced adenoma, meaning one 10 mm or larger, one with tubulovillous or villous histology, or one with high-grade dysplasia. The same 3 year interval applies to a traditional serrated adenoma.",
    },
    {
      q: "How does the number of adenomas removed change the USMSTF 2020 surveillance interval?",
      a: "Under the US Multi-Society Task Force (USMSTF), 3 to 4 tubular adenomas smaller than 10 mm set colonoscopy in 3 to 5 years, and 5 to 10 such adenomas set colonoscopy in 3 years. More than 10 adenomas at one exam shorten the interval to colonoscopy in 1 year.",
    },
    {
      q: "What is the surveillance schedule for sessile serrated lesions under USMSTF 2020?",
      a: "Sessile serrated lesions follow their own schedule. The US Multi-Society Task Force (USMSTF) sets colonoscopy in 5 to 10 years for 1 to 2 sessile serrated polyps smaller than 10 mm, 3 to 5 years for 3 to 4, and 3 years for 5 to 10 or for any 10 mm or larger or with dysplasia.",
    },
    {
      q: "What follow-up does USMSTF 2020 recommend after piecemeal removal of a large polyp?",
      a: "After piecemeal removal of an adenoma or sessile serrated polyp 20 mm or larger, the US Multi-Society Task Force (USMSTF) recommends colonoscopy in 6 months. This short interval reflects the need to confirm complete resection of the lesion at the previous site.",
    },
    {
      q: "Do patients with low-risk polyps return to stool-based screening under USMSTF 2020?",
      a: "No. The US Multi-Society Task Force (USMSTF) keeps low-risk polyps under colonoscopy surveillance rather than a stool test. A normal colonoscopy with no polyps returns in 10 years, and 1 to 2 small tubular adenomas return in 7 to 10 years, both by colonoscopy.",
    },
  ],
  CA_ON: [
    {
      q: "How soon should a colonoscopy be repeated after polypectomy under Ontario (ColonCancerCheck)?",
      a: "It depends on the most advanced lesion. Cancer Care Ontario's ColonCancerCheck (CCC) recommendations set a colonoscopy at 3 years for high-risk adenomas, 5 years for a small sessile serrated lesion, or 6 months after piecemeal removal of a large sessile polyp. Lower-risk findings return to fecal immunochemical test (FIT) screening instead.",
    },
    {
      q: "What is the surveillance interval for 1 to 2 small tubular adenomas in Ontario?",
      a: "For 1 to 2 tubular adenomas under 10 mm with no high-grade dysplasia, ColonCancerCheck (CCC) does not schedule a surveillance colonoscopy. The patient returns to stool-based screening with a fecal immunochemical test (FIT) in 5 years, rather than the colonoscopy at 7 to 10 years used by the US guidance.",
    },
    {
      q: "When should a repeat colonoscopy be done for advanced adenomas under ColonCancerCheck?",
      a: "For high-risk (advanced) adenomas, ColonCancerCheck (CCC) recommends a repeat colonoscopy in 3 years. This category covers a tubular adenoma 10 mm or larger, 3 or more adenomas, villous histology, or high-grade dysplasia. Any single one of these features places the finding in the 3-year interval.",
    },
    {
      q: "What is the follow-up interval for sessile serrated lesions in Ontario?",
      a: "It depends on size and histology. A sessile serrated adenoma under 10 mm without dysplasia is followed by colonoscopy in 5 years. A sessile serrated adenoma 10 mm or larger, one with dysplasia, or a traditional serrated adenoma moves to colonoscopy in 3 years under ColonCancerCheck (CCC).",
    },
    {
      q: "When should the site be rechecked after piecemeal removal of a large sessile polyp?",
      a: "When a large sessile polyp is removed piecemeal, ColonCancerCheck (CCC) recommends a colonoscopy to check the removal site within 6 months. This early look is separate from the interval set by the lesion's histology and confirms the site is clear of residual tissue before returning to a routine surveillance schedule.",
    },
    {
      q: "When does a patient return to FIT screening instead of surveillance colonoscopy in Ontario?",
      a: "Lower-risk findings return to fecal immunochemical test (FIT) screening rather than a repeat colonoscopy. A normal exam, or hyperplastic polyps in the rectum or sigmoid, goes to FIT in 10 years. One to two small tubular adenomas without high-grade dysplasia go to FIT in 5 years under ColonCancerCheck (CCC).",
    },
    {
      q: "What is the interval for serrated polyposis syndrome or more than 10 adenomas in Ontario?",
      a: "Both carry a 1-year interval. ColonCancerCheck (CCC) recommends a colonoscopy in 1 year for serrated polyposis syndrome. When more than 10 adenomas are found, it recommends a clearing colonoscopy within 1 year to ensure all lesions are removed before setting the next surveillance interval.",
    },
  ],
  CA_AB: [
    {
      q: "How soon should a colonoscopy be repeated after polypectomy under Alberta (ACRCSP)?",
      a: "The Alberta Colorectal Cancer Screening Program (ACRCSP) sets the interval from the single most advanced finding at a high-quality baseline exam. Higher-risk findings return for colonoscopy at 1, 3, or 5 years. The lowest-risk findings instead route back to a fecal immunochemical test (FIT) at 5 or 10 years.",
    },
    {
      q: "What surveillance interval applies to 1 to 2 small tubular adenomas under Alberta (ACRCSP)?",
      a: "One to two tubular adenomas under 10 mm return to a fecal immunochemical test (FIT) in 5 years rather than a surveillance colonoscopy. For the same finding, the US Multi-Society Task Force (USMSTF) instead schedules a colonoscopy at 7 to 10 years.",
    },
    {
      q: "What is the colonoscopy interval for an adenoma 10 mm or larger or with villous or high-grade dysplasia under Alberta (ACRCSP)?",
      a: "The Alberta program recommends a surveillance colonoscopy in 3 years for any adenoma 10 mm or larger, for villous features, or for high-grade dysplasia. The same 3-year interval covers 5 to 10 tubular adenomas under 10 mm found at one high-quality baseline colonoscopy.",
    },
    {
      q: "What surveillance interval applies to sessile serrated lesions under Alberta (ACRCSP)?",
      a: "One to two sessile serrated lesions (SSL) under 10 mm set a colonoscopy in 5 years. Three to 10 lesions under 10 mm shorten that to 3 years. An SSL over 10 mm, an SSL with dysplasia, or a traditional serrated adenoma of any size also sets 3 years.",
    },
    {
      q: "When is the first follow-up after piecemeal removal of a large polyp under Alberta (ACRCSP)?",
      a: "After piecemeal removal of a large, 10 mm or larger, non-pedunculated polyp, the Alberta program sets a first repeat endoscopic assessment in 6 months to confirm complete resection of the site. This short interval reflects the residual-tissue risk that piecemeal removal carries rather than the finding's histology alone.",
    },
    {
      q: "Which findings return to stool-based screening instead of colonoscopy under Alberta (ACRCSP)?",
      a: "A normal colonoscopy and hyperplastic polyps under 10 mm return to a fecal immunochemical test (FIT) in 10 years. One to two tubular adenomas under 10 mm return to FIT in 5 years. The Alberta program runs FIT annually for ages 50 to 74 between those points.",
    },
    {
      q: "What interval applies to more than 10 adenomas or serrated polyposis syndrome under Alberta (ACRCSP)?",
      a: "More than 10 tubular adenomas at one colonoscopy sets a repeat colonoscopy in 1 year, with genetic counselling to consider. Serrated polyposis syndrome also sets a colonoscopy in 1 year. Both are short intervals the Alberta program assigns for a heavy polyp burden rather than a single lesion.",
    },
  ],
  CA_BC: [
    {
      q: "How soon should a colonoscopy be repeated after polypectomy under British Columbia (BCGuidelines 2022)?",
      a: "British Columbia's BCGuidelines (2022) sets the interval from one grid pooling adenomas and serrated lesions by risk and count. One to four low-risk precancerous lesions return to colonoscopy in 10 years. Five or more low-risk lesions, or any high-risk lesion, move to colonoscopy in 3 years.",
    },
    {
      q: "What is the surveillance interval after removing one or two small tubular adenomas in British Columbia?",
      a: "For one to four low-risk precancerous lesions, meaning tubular adenomas under 10 mm with low-grade dysplasia (LGD) only, or sessile serrated lesions (SSLs) without dysplasia, BCGuidelines (2022) sets colonoscopy in 10 years. That is longer than the United States, which surveils three to four such lesions at 3 to 5 years.",
    },
    {
      q: "Does the number of low-risk polyps change the colonoscopy surveillance interval in British Columbia?",
      a: "Yes. BCGuidelines (2022) keeps one to four low-risk precancerous lesions on a 10-year colonoscopy, but five or more low-risk lesions shorten the interval to colonoscopy in 3 years. Count alone raises the risk tier here, even without any advanced or high-risk feature.",
    },
    {
      q: "What surveillance interval applies to an advanced adenoma with villous histology or high-grade dysplasia in British Columbia?",
      a: "BCGuidelines (2022) treats a high-risk lesion, an advanced adenoma with villous features, high-grade dysplasia (HGD), or a lesion 10 mm or larger, as warranting colonoscopy in 3 years. The same 3-year interval applies whether one or several high-risk lesions are found.",
    },
    {
      q: "How does BCGuidelines (2022) handle surveillance for sessile serrated lesions after polypectomy?",
      a: "BCGuidelines (2022) pools sessile serrated lesions (SSLs) with adenomas in one grid. One to four SSLs without dysplasia count as low-risk and return to colonoscopy in 10 years. An SSL 10 mm or larger, or with cytologic dysplasia, is high-risk and moves to colonoscopy in 3 years.",
    },
    {
      q: "What follow-up does British Columbia recommend after piecemeal removal of a large polyp?",
      a: "BCGuidelines (2022) recommends a repeat colonoscopy at 6 months after a large precancerous lesion is removed piecemeal, to check the resection site for residual tissue. Later surveillance intervals are left to the endoscopist's discretion rather than fixed by the risk-and-count grid that governs other polyp findings.",
    },
    {
      q: "When does a patient return to stool-based (FIT) screening instead of colonoscopy in British Columbia?",
      a: "A normal colonoscopy, or one finding only hyperplastic polyps under 10 mm, needs no surveillance and returns to fecal immunochemical test (FIT) screening. A cleared colonoscopy returns to FIT in 10 years, then FIT every 2 years for ages 50 to 74.",
    },
  ],
  AU: [
    {
      q: "How soon should a colonoscopy be repeated after polypectomy under Australia (NHMRC / Cancer Council)?",
      a: "The National Health and Medical Research Council (NHMRC) approved Cancer Council Australia guideline sets the first interval from what was removed at the index colonoscopy. Intervals range from return to screening or 10 years for low-risk findings, through 5, 3, or 1 year, to about 6 months after piecemeal resection of a large lesion.",
    },
    {
      q: "What is the surveillance interval for 1 to 2 small tubular adenomas under 10 mm with no high-grade dysplasia?",
      a: "For 1 to 2 small tubular adenomas under 10 mm with no high-grade dysplasia, the guideline recommends colonoscopy in 10 years, and no sooner than 5 years. For 1 to 2 diminutive adenomas under 6 mm, it instead returns the patient to the National Bowel Cancer Screening Program after 4 years.",
    },
    {
      q: "What is the surveillance interval after removing an adenoma with high-grade dysplasia or villous histology?",
      a: "For 1 to 2 adenomas with high-grade dysplasia (HGD) or villous change, all under 10 mm, the guideline recommends colonoscopy in 5 years. If one of those adenomas is 10 mm or larger, the interval shortens to colonoscopy in 3 years. Size, dysplasia grade, and villous change each move the interval.",
    },
    {
      q: "How does the number of adenomas change the surveillance interval in this guideline?",
      a: "Counts drive the interval. The guideline sets colonoscopy in 5 years for 3 to 4 tubular adenomas under 10 mm without high-grade dysplasia, colonoscopy in 3 years for 5 to 9 such adenomas, and colonoscopy in 1 year for 10 or more, regardless of size or histology, with familial cancer clinic referral considered.",
    },
    {
      q: "What is the surveillance interval for sessile serrated lesions in Australia?",
      a: "The guideline counts clinically significant serrated polyps on their own pathway. For 1 to 2 sessile serrated adenomas (SSAs) under 10 mm without dysplasia, it recommends colonoscopy in 5 years. Three to four such lesions, or an SSA 10 mm or larger or with dysplasia, moves to 3 years; 5 or more moves to 1 year.",
    },
    {
      q: "When should surveillance colonoscopy occur after piecemeal removal of a large sessile or laterally spreading lesion?",
      a: "After a large sessile or laterally spreading lesion is removed piecemeal, the guideline recommends colonoscopy at about 6 months to confirm complete clearance. When the same lesion is removed en bloc, it recommends colonoscopy at about 12 months. The endoscopic resection method, not just histology, sets this interval.",
    },
    {
      q: "Which findings return the patient to stool-test screening rather than surveillance colonoscopy?",
      a: "Small hyperplastic polyps under 10 mm return the patient to usual screening; only hyperplastic polyps 10 mm or larger are surveilled. One to two diminutive adenomas under 6 mm return to the National Bowel Cancer Screening Program after 4 years, resuming the immunochemical faecal occult blood test (iFOBT) every 2 years for ages 45 to 74.",
    },
  ],
  EU: [
    {
      q: "How soon should a colonoscopy be repeated after polypectomy under Europe (ESGE 2020)?",
      a: "The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline sets a baseline surveillance interval of 3 years for larger, more numerous, or dysplastic lesions. Patients whose polyps do not meet a surveillance trigger return to routine screening rather than a shorter colonoscopy interval.",
    },
    {
      q: "What surveillance interval does ESGE 2020 recommend for 1 to 2 small tubular adenomas with low-grade dysplasia?",
      a: "The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline returns patients with 1 to 4 adenomas under 10 mm and low-grade dysplasia to usual screening, meaning colonoscopy in 10 years where no organised programme exists. Villous features do not change this. The United States keeps the same adenomas in surveillance at 7 to 10 years.",
    },
    {
      q: "Does ESGE 2020 shorten the interval for a 12 mm adenoma or high-grade dysplasia?",
      a: "The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline recommends colonoscopy in 3 years when at least one adenoma is 10 mm or larger, when an adenoma shows high-grade dysplasia, or when 5 or more adenomas are found. Villous histology alone does not trigger a shorter interval.",
    },
    {
      q: "What is the ESGE 2020 surveillance interval for a sessile serrated lesion?",
      a: "The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline recommends colonoscopy in 3 years for any serrated polyp that is 10 mm or larger or that contains dysplasia. A serrated polyp under 10 mm without dysplasia, including a sessile serrated lesion (SSL), returns to usual screening at colonoscopy in 10 years where no organised programme exists.",
    },
    {
      q: "How does ESGE 2020 handle surveillance after piecemeal resection of a large polyp?",
      a: "The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline recommends an early repeat colonoscopy at 3 to 6 months after piecemeal resection of a polyp 20 mm or larger, to check for residual tissue. A surveillance colonoscopy then follows 12 months after that repeat examination.",
    },
    {
      q: "When does ESGE 2020 send a patient back to FIT screening instead of colonoscopy surveillance?",
      a: "The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline returns patients without a surveillance trigger to routine screening rather than colonoscopy surveillance. In an organised programme, that means a fecal immunochemical test (FIT) every 2 years for ages 50 to 74. Where no programme exists, it means colonoscopy in 10 years.",
    },
    {
      q: "What does ESGE 2020 advise when 10 or more adenomas are found?",
      a: "The European Society of Gastrointestinal Endoscopy (ESGE) 2020 guideline sets no routine surveillance interval when 10 or more adenomas are found. Instead it recommends referral for genetic counselling, since that burden raises the possibility of a hereditary polyposis syndrome rather than ordinary post-polypectomy surveillance.",
    },
  ],
}
