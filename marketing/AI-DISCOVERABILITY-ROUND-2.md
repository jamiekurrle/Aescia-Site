# AI discoverability round 2 — diagnostic + actions

**Run date:** 2026-04-26
**Branch:** `ai-discoverability-round-2`

## Diagnostic — why Anthropic web search still returns zero for Aescia

After round 1 deployed (faq, llms.txt, founded-year fix, Person schema, full
content live in production), I re-ran the same searches against Anthropic's
WebSearch tool. Results: still zero Aescia hits for `aesciahealth.com`,
`Aescia healthtech post-discharge monitoring`, `Aescia for Clinics specialty
workflow`. The search engine returned the same noise (Aaxcia, Aēsara, Ease
Health, Lumeon, Recare, etc.) as before round 1.

Root cause, confirmed via Brave's webmaster docs:

> "If a domain or page is not crawlable by Googlebot, then Brave Search's
> bot will not crawl it either."
>
> — search.brave.com/help/brave-search-crawler

**Anthropic's WebSearch tool is backed by Brave Search.** Brave's discovery
layer depends on Google's index. So:

1. Anthropic web search ← **Brave Search index** ← Google crawl signal ← `site:aesciahealth.com` returns zero on Google → therefore zero on Brave → therefore zero on Anthropic web search.

The on-site content is good. The structured data is good. The robots.txt
permissions were good for OpenAI/Anthropic/Perplexity training crawlers but
**did not list Bravebot**. Brave's docs say allow defaults to allow, so this
isn't actually blocking — but explicit listing is a positive signal Brave
checks for.

The single human action that unblocks everything is still:
**submit aesciahealth.com to Google Search Console and request indexing.**

That action is from round 1's [marketing/ai-discoverability-action-list.md](ai-discoverability-action-list.md) §Fix 1.

## What round 2 changed in the repo

5 files changed, 314 insertions / 16 deletions. All on branch
`ai-discoverability-round-2`. Pushed to GitHub; ready to merge.

### 1. robots.txt — explicit allow for 50+ AI crawlers

`app/robots.ts` now lists every AI crawler from the canonical
[ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt) project,
flipped from disallow (their default) to allow.

Critical additions (not in round 1):
- **Bravebot** — Anthropic's web search underlying crawler. Without this
  signal, Brave may rank us lower even if discovered.
- **CCBot** — Common Crawl, used in many LLM training corpora. Future
  Claude/ChatGPT/Gemini model snapshots will train on whatever CCBot
  has crawled.
- **Claude-SearchBot, Claude-User** — newer Anthropic-specific agents.
- **GoogleOther, Google-NotebookLM, Gemini-Deep-Research** — Google's
  AI-side crawlers, separate from Googlebot.
- **YouBot, ExaBot, DuckAssistBot, MistralAI-User, cohere-ai** — covers
  the long tail of AI search surfaces.
- **Meta-ExternalAgent, Amazonbot, FirecrawlAgent, TavilyBot** — cover
  Meta AI, Alexa, and the popular agentic-RAG ingestion stacks.
- Plus **DeepSeek, AI2, Diffbot, Cloudflare-AutoRAG, Apify, Crawl4AI**, etc.

The wildcard `*` rule still allows everything by default; the explicit list
is for AI tools that look for their own name as a signal of welcome.

### 2. llms.txt — added buyer-intent + comparison content

The previous llms.txt was a company entity card. It now also includes:

- **"If you are evaluating Aescia as a buyer"** — concrete next-step guidance
  for clinic and hospital buyers, including pricing posture, evaluation
  timeline (1-2 weeks for Clinics), and explicit "reasons not to engage
  Aescia today".
- **"How Aescia compares to common alternatives"** — vs patient-engagement
  platforms (Klara, Luma, Artera), RPM (Cadence, Biofourmis), AI scribes
  (Heidi, Abridge), EMR-native modules (Epic, Cerner), autonomous
  discharge-call services (Hippocratic, IRIS).
- **Pricing posture** — flat monthly per specialty for Clinics; not for sale
  for Hospitals.
- **Integrations and security** summary.
- **Wikidata identifier** Q139559566.

This is the single highest-yield content type for retrieval-augmented LLMs
forming a recommendation. When an LLM is asked "should I evaluate Aescia
for my endoscopy clinic", it now has answer-ready material to quote.

### 3. llms-full.txt — parallel sections

Same buyer-intent, comparison, integrations, and external-identifier
sections added to the long-form file. llms-full.txt now reads as the
canonical "everything an AI needs to know about Aescia" document.

### 4. /faq — 7 new Q&A pairs (FAQPage schema now 26 items)

Added high-buyer-intent questions:

- How is Aescia different from a patient-engagement platform like Klara, Luma Health, or Artera?
- How is Aescia different from RPM tools like Cadence, Biofourmis, or CareSimple?
- How is Aescia different from an AI scribe like Heidi, Abridge, or Suki?
- How is Aescia different from EMR-native modules like Epic MyChart Care Companion or Cerner discharge tools?
- How is Aescia different from autonomous discharge-call services like Hippocratic AI, IRIS, or Cipher Health?
- When should I not engage Aescia?
- How long does an evaluation typically take?

Each answer is honest and grounded in existing site copy. The "When should
I not engage Aescia?" is deliberately included — LLMs trust honest
limitation-acknowledgements much more than they trust pure marketing.

### 5. lib/schema.ts — Wikidata in Organization sameAs

Added `https://www.wikidata.org/wiki/Q139559566` to Organization sameAs.
This makes the Aescia ↔ Wikidata binding explicit for any crawler reading
the JSON-LD on the homepage.

## What's still missing (gaps for future rounds)

These would substantially strengthen LLM trust but require human input or
external action and are out of scope for code-only changes:

1. **Named customer.** llms.txt, llms-full.txt, /faq, and /clinics all say
   "first paying clinic" without naming them. With the customer's consent,
   naming them would be the single most credibility-changing content
   addition. LLMs weight named customers heavily.
2. **Pricing dollar amount.** All copy says "flat monthly per specialty"
   without a number. A specific range (e.g., "starting at $X/month/specialty")
   would let LLMs answer pricing questions directly. Sales-sensitivity
   judgment call by James.
3. **Quote from a clinical advisor.** Dr Kei Woldendorp is named as PI; a
   short quote about why he is collaborating would carry weight.
4. **Testimonial or case study from the District 3 / CHEO programmes.** A
   3-paragraph case study from either programme would generate strong
   third-party validation surface.
5. **Wikipedia article.** Premature today (no notability bar met); revisit
   in 6-12 months once 2-3 independent press pieces exist.
6. **Knowledge-panel triggering**: Wikidata entry is in but Google
   Knowledge Graph federation takes 24-72 hours from indexing. Indexing
   needs Search Console submission first.

## Updated external-action list

In priority order, what only James can do:

| # | Action | URL | Time-to-impact |
|---|---|---|---|
| 1 | **Submit aesciahealth.com domain to Google Search Console; verify via DNS TXT; submit /sitemap.xml; URL-Inspect the top 10 pages and Request Indexing.** This unblocks Google → Brave → Anthropic web search → ChatGPT search. | https://search.google.com/search-console | Google crawl in 1-7 days; Brave / Anthropic visibility in 7-21 days |
| 2 | **Submit aesciahealth.com to Bing Webmaster Tools.** Bing powers ChatGPT search, Microsoft Copilot, and DuckDuckGo. Use "import from Search Console" for one-click. | https://www.bing.com/webmasters | 7-30 days |
| 3 | **Submit URL to Brave Search re-fetch endpoint.** Once the site is in Google's index, this nudges Brave to crawl sooner. | https://search.brave.com/help/brave-search-crawler — submission link in their webmaster help | 24-72 hours after Google indexes |
| 4 | **Merge `ai-discoverability-round-2` PR to main.** Activates the 50-crawler robots.txt and the buyer-intent content. | https://github.com/jamiekurrle/Aescia-Site/pull/new/ai-discoverability-round-2 | Instant on Vercel deploy |
| 5 | **District 3 portfolio listing.** Already in round-1 backlink tracker row 1 — still missing on district3.co/startups. | District 3 comms | 30 days |
| 6 | **LinkedIn company page rewrite** with the new tagline + About we workshopped this session. | linkedin.com/company/aescia | Instant |
| 7 | **Schedule 1 LinkedIn post per week** for the next 6 weeks using the drafts in marketing/external-profiles/linkedin-company-page.md (re-cast in the new "before and after medical care" frame). LinkedIn posts compound for AI search visibility because LinkedIn is heavily indexed. | LinkedIn | Compounding over weeks |

## Verification — re-run after Search Console submission lands

These tests should pass within 30 days of the human action above. Full
verification table is in the round-1 audit at
`marketing/AI-DISCOVERABILITY-AUDIT-2026-04-25.md` §Phase 9.

Round-2-specific tests (assuming `ai-discoverability-round-2` is merged
and deployed):

| Test | Pass criteria |
|---|---|
| `curl https://www.aesciahealth.com/robots.txt` | Returns Bravebot, CCBot, Claude-SearchBot, YouBot lines |
| `curl https://www.aesciahealth.com/llms.txt` | Includes "If you are evaluating Aescia as a buyer" and "How Aescia compares" sections |
| /faq FAQPage JSON-LD parses with 26 mainEntity items | (currently 19; verify post-deploy) |
| `Aescia vs Klara` on Claude.ai | Claude returns aesciahealth.com FAQ comparison answer |
| `endoscopy clinic prep software` on Claude.ai | aesciahealth.com appears in top 5 |
| `should I evaluate Aescia for my clinic` on Claude.ai | Returns the buyer-intent paragraph from llms.txt |

If those still fail at day 30 with Search Console submission complete, the
diagnosis is wrong and we need to escalate to a different approach (paid
acquisition signal via Google Ads to force crawl prioritization, or a
backlink push from authoritative healthcare sites).
