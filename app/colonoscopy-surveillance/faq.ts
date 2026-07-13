// Q&A used both as a visible on-page FAQ and as FAQPage JSON-LD. These are the
// high-intent queries clinicians and patients ask search engines and AI
// assistants; the answers carry the actual guideline intervals so answer
// engines (Google AI Overviews, Perplexity, ChatGPT, Claude) can cite them.
// Every interval here matches the calculator's verified logic.

export type FaqItem = { q: string; a: string }

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How soon should you repeat a colonoscopy after polyp removal?',
    a: 'It depends on the number, size, and histology of the polyps removed and the guideline you follow. A normal colonoscopy is usually repeated in 10 years; 1–2 small tubular adenomas in 7–10 years under the US (USMSTF 2020) guideline; and advanced findings — an adenoma 10 mm or larger, villous histology, or high-grade dysplasia — in 3 years. This calculator computes the exact interval for the US, Canadian (Ontario, Alberta, and BC), Australian, and European guidelines.',
  },
  {
    q: 'What is the surveillance interval for 1–2 small (<10 mm) tubular adenomas?',
    a: 'US (USMSTF 2020): 7–10 years. Australia (NHMRC / Cancer Council): 10 years, or return to iFOBT screening after 4 years. Canada–Ontario (ColonCancerCheck): FIT in 5 years. Canada–Alberta (ACRCSP 2023): FIT in 5 years. Canada–British Columbia: 10-year colonoscopy. Europe (ESGE 2020): return to routine organised screening (programme-dependent, typically 2-yearly FIT).',
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
    q: 'What is the follow-up after piecemeal removal of a large (≥20 mm) polyp?',
    a: 'An early repeat colonoscopy to check the resection site — at 6 months in the US, Australian, and Canadian guidelines, and 3–6 months in Europe — because piecemeal resection carries a risk of residual tissue. Standard surveillance intervals resume once the site is confirmed clear.',
  },
  {
    q: 'What should happen if the bowel preparation was inadequate?',
    a: 'The colonoscopy should be repeated, usually within 1 year, because an inadequate preparation may have missed lesions and the surveillance-interval rules all assume an adequate examination that cleared the colon.',
  },
  {
    q: 'Do colonoscopy surveillance guidelines differ between countries?',
    a: 'Yes, substantially. The US (USMSTF 2020) uses graded intervals. Europe (ESGE 2020) is binary — either 3-year surveillance or return to screening — and does not treat villous histology or 3–4 adenomas as triggers. Canada has no maintained national guideline: Ontario (ColonCancerCheck), Alberta (ACRCSP 2023), and British Columbia each publish their own, and BC follows the European model. Australia uses discrete 10/5/3/1-year intervals. This calculator shows each guideline side by side.',
  },
  {
    q: 'Is this colonoscopy surveillance calculator free?',
    a: 'Yes. It is a free educational reference for health professionals that reproduces published post-polypectomy surveillance guidelines and shows the exact rule and source behind every interval. It is not medical advice and not a medical device, and it stores no patient information.',
  },
]
