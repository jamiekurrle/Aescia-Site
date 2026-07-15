// Q&A used both as a visible on-page FAQ and as FAQPage JSON-LD. These are the
// high-intent queries clinicians and patients ask search engines and AI
// assistants; the answers carry the actual guideline intervals so answer
// engines (Google AI Overviews, Perplexity, ChatGPT, Claude) can cite them.
// Every interval here matches the calculator's verified logic.

export type FaqItem = { q: string; a: string }

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How soon should you repeat a colonoscopy after polyp removal?',
    a: 'It depends on the number, size, and histology of the polyps removed and the guideline you follow. A normal colonoscopy is usually repeated in 10 years; 1–2 small tubular adenomas in 7–10 years under the US (USMSTF 2020) guideline; and advanced findings — an adenoma 10 mm or larger, villous histology, or high-grade dysplasia — in 3 years. This calculator gives the guideline-based interval, or discretionary guidance where a guideline defers to the endoscopist, for the US, Canadian (Ontario, Alberta, and BC), Australian, and European guidelines.',
  },
  {
    q: 'What is the surveillance interval for 1–2 small (<10 mm) tubular adenomas?',
    a: 'US (USMSTF 2020): 7–10 years. Australia (NHMRC / Cancer Council): 10 years, or return to iFOBT screening after 4 years. Canada–Ontario (ColonCancerCheck): FIT in 5 years. Canada–Alberta (ACRCSP): FIT in 5 years. Canada–British Columbia: 10-year colonoscopy. Europe (ESGE 2020): return to screening. ESGE returns these patients to the screening programme without naming an interval or a test, so the cadence is whatever the local programme runs.',
  },
  {
    q: 'When should a colonoscopy be repeated after 3–4 adenomas?',
    a: 'This is where the guidelines diverge most. US: 3–5 years. Canada–Ontario: 3 years. Canada–Alberta: 5 years. Canada–British Columbia: 10 years. Australia: 5 years. Europe (ESGE): return to screening — 3–4 small adenomas are deliberately not a surveillance trigger in the European guideline.',
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
    a: 'For 1–2 small (<10 mm) sessile serrated lesions without dysplasia: 5–10 years in the US, and 5 years in Australia and Canada (Ontario and Alberta); Europe returns them to screening. A sessile serrated lesion 10 mm or larger, or with dysplasia, and any traditional serrated adenoma, is surveilled at 3 years.',
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
