# AI-discoverability action list

Companion to the audit summary. Three highest-leverage moves, ordered by what
unblocks the others. Each one has the exact URL, the exact copy to use, and a
verification step. Most of these are not code changes — they are external
account actions only James can do.

The fundamental problem that came out of the audit: aesciahealth.com is
**not currently indexed by Google** (`site:aesciahealth.com` returns zero
results). Until that changes, every LLM web-search tool that uses Google or
Bing as a fallback corpus is blind to the site, regardless of how good the
on-page content and structured data are.

---

## Fix 1 — Get the site indexed by Google and Bing (DO THIS FIRST)

**Why it's the highest leverage:** Without indexing, all the work below this
fix is invisible. Indexing is fast (1-7 days for first crawl) and free.
Without it, every other discoverability lever is gated.

**Steps for Google:**

1. Go to https://search.google.com/search-console.
2. Sign in with the Google account that should own the property. Use a
   long-lived account, not a personal one — the company should retain access
   if James's account changes.
3. Add a property. Pick **Domain** property type (covers `aesciahealth.com`,
   `www.aesciahealth.com`, all subdomains, http and https). This is more
   robust than the URL-prefix variant.
4. Verify ownership by adding the TXT record Google gives you to the
   `aesciahealth.com` DNS at the domain registrar (Vercel manages DNS for
   most Aescia setups; if so, add the record under Vercel → Domains →
   aesciahealth.com → DNS).
5. Once verified, go to **Sitemaps** in the left rail and submit:
   `https://www.aesciahealth.com/sitemap.xml`.
6. Then **URL Inspection** → paste the homepage URL → click **Request
   Indexing**. Repeat for: `/governance`, `/evidence`, `/team`,
   `/team/james-kurrle` (after deploy), `/platform`, `/hospitals`,
   `/clinics`, `/updates`, `/faq` (after deploy).
7. Wait. Google typically crawls within 24-72h.

**Steps for Bing (which powers ChatGPT search and Microsoft Copilot):**

1. Go to https://www.bing.com/webmasters.
2. Add the site. **Import from Google Search Console** is the fastest path —
   one click and Bing pulls your verified properties and sitemaps.
3. If GSC import isn't available, repeat the manual flow: add the site,
   verify via TXT record, submit sitemap.

**Verification after 7 days:** run `site:aesciahealth.com` on Google. Should
return 5+ pages. If still zero, check Search Console → Pages for crawl
errors, robots-blocked URLs, or "Discovered but not indexed" status.

**Verification after 30 days:** run "Aescia healthtech" on Google. Aescia
should appear in the top 10 results.

---

## Fix 2 — Deploy the work that's already in this repo

**Why it's the highest leverage:** A large discoverability scaffolding (FAQ
page with FAQPage JSON-LD, /llms.txt, /llms-full.txt, /team/james-kurrle
with Person schema, founded-year correction, Updates ItemList schema, MTAA
member status, partner backlinks) is sitting on the `seo-and-external-presence`
and `ai-discoverability-fixes` branches. Production is still serving the old
content. Until merge + deploy, none of this work is doing any work.

**Steps:**

1. Open a pull request from `ai-discoverability-fixes` → `main`. Use the
   PR description in `marketing/PR-DESCRIPTION.md` (and append the
   ai-discoverability section to it).
2. Confirm Vercel preview deployment renders correctly (preview URL on the
   PR).
3. Merge to main. Vercel auto-deploys to www.aesciahealth.com.
4. After deploy, run the verification curls below.

**Verification commands (run after deploy):**

```bash
curl -sk -o /dev/null -w "%{http_code}\n" https://www.aesciahealth.com/llms.txt
curl -sk -o /dev/null -w "%{http_code}\n" https://www.aesciahealth.com/llms-full.txt
curl -sk -o /dev/null -w "%{http_code}\n" https://www.aesciahealth.com/faq
curl -sk -o /dev/null -w "%{http_code}\n" https://www.aesciahealth.com/team/james-kurrle
curl -sk https://www.aesciahealth.com/ | grep -o '"foundingDate":"[^"]*"'
curl -sk https://www.aesciahealth.com/ | grep -o '"sameAs":\[[^]]*\]'
```

Expect: 200, 200, 200, 200, `"foundingDate":"2025"`, sameAs array including
`https://www.mtaa.org.au/industry-members`.

---

## Fix 3 — Generate 5+ high-authority indexable backlinks within 30 days

**Why it's the highest leverage:** The audit showed exactly one indexed
public mention of Aescia (the Concordia News article). For comparison, a
typical fundable healthtech startup has 15-30. Without inbound links from
authoritative domains, Google has no signal that aesciahealth.com is a real
entity worth ranking. Each backlink below is a one-time outreach with a
durable downstream effect on AI tool ranking.

### 3a. District 3 portfolio listing (single highest-priority backlink)

**Status:** Aescia is a District 3 portfolio company since September 2025
but is NOT listed at https://www.district3.co/startups. Verified via
WebFetch on 2026-04-25.

**Action:** Email District 3's communications/portfolio contact. Ask to be
added to the public startup directory.

**Outreach copy:**

```
Subject: Portfolio listing request — Aescia (District 3 since Sept 2025)

Hi [name],

I'm James Kurrle, founder of Aescia, a District 3 portfolio company since
September 2025. I notice we're not yet listed at district3.co/startups —
could we be added?

Aescia is a healthtech company building a continuous-care platform with two
products: an investigational software-as-a-medical-device for post-discharge
monitoring (in clinical evaluation through the SAFE-Discharge trial at the
Royal Prince Alfred Hospital cardiothoracic unit, ACTRN12625001425482), and
a non-device workflow platform for specialty clinics. We operate from Sydney
and Montréal.

Site: https://www.aesciahealth.com
Sector tag: bio / health
Logo and short description in the attachment, drawn from
marketing/external-profiles/wellfound-crunchbase.md.

Please let me know if you need anything else from our end.

Thanks,
James
```

### 3b. LinkedIn company page rewrite

**Status:** linkedin.com/company/aescia exists but the public copy is generic
("Reimagined recovery", "tackle some of the toughest challenges in
healthcare"). Replace with the rich content already drafted.

**Action:** Sign in to LinkedIn as a company-page admin. Edit the About
section. Use the full 1,495-char About text from
`marketing/external-profiles/linkedin-company-page.md`. Add the 20
specialty tags. Schedule the 5 example posts (one per week) for compounding
indexed-mention surface area.

### 3c. Crunchbase profile refresh

**Status:** Profile exists at crunchbase.com/organization/aescia-health
(verified by 403 Forbidden on direct fetch — implies account-gated, not
absent). Doesn't surface in `"Aescia" crunchbase` search.

**Action:** Sign in. Set Founded On = 2025. Replace short and long
descriptions with the copy in
`marketing/external-profiles/wellfound-crunchbase.md`. Add the 10 industry
tags. Add the news items from the table in that file (Concordia article,
District 3 Sept 2025, MTAA Compass).

### 3d. Wikidata entry creation

**Status:** No Wikidata entry exists. Verified via
`site:wikidata.org Aescia health` returning unrelated results.

**Why it matters:** Wikidata is the canonical entity-linking source for
Wikipedia, Google Knowledge Graph, and most LLM training datasets. A
Wikidata Q-ID disambiguates Aescia from "aescin" (the herbal compound) and
"Aēsara Health" forever, and it's a free piece of permanent SEO authority.

**Action:** Go to https://www.wikidata.org/wiki/Special:NewItem.
Sign in (create an account if needed). Use the field skeleton below.
Submit. Item gets a Q-ID immediately.

```
Label (English): Aescia
Description (English): Australian-Canadian healthtech company building a continuous-care platform for post-discharge monitoring and specialty-clinic workflow

Statements:
- instance of (P31): business (Q4830453) and digital health company (Q124468480)
- country (P17): Australia (Q408), Canada (Q16)
- headquarters location (P159): Sydney (Q3130), Montréal (Q340)
- inception (P571): 2025
- official website (P856): https://www.aesciahealth.com
- founded by (P112): James Kurrle (no Q-ID yet — leave as label)
- industry (P452): health technology (Q23735008)
- LinkedIn ID (P4264): aescia
- Crunchbase organization ID (P2087): aescia-health

Sitelinks: en: (no Wikipedia page yet — leave blank)
```

Wikidata typically gets crawled and federated within 24-72 hours.

### 3e. ANZCTR — confirm sponsor field links to aesciahealth.com

**Status:** SAFE-Discharge is registered (ACTRN12625001425482). The trial
record is on a high-authority .org.au domain. Verify that the public
record's "Sponsor" or "Trial website" field references aesciahealth.com.

**Action:** Sign in to the ANZCTR sponsor account. Open the trial record.
Confirm the "URL" or "Trial website" field is filled with
https://www.aesciahealth.com (or https://www.aesciahealth.com/evidence). If
not, edit and re-submit.

### 3f. MTAA member directory listing — already live (verify only)

**Status:** Confirmed listed at https://www.mtaa.org.au/industry-members
with a link to aesciahealth.com (verified via WebFetch 2026-04-25). No
action needed beyond keeping the listing current.

### 3g. One BetaKit pitch (lower priority, longer time-to-impact)

**Status:** Zero coverage on BetaKit despite being a Concordia-anchored
Montréal healthtech with a multi-jurisdiction structure. This is a
publishable story.

**Action:** Email tips@betakit.com with the founder-story pitch from
`marketing/backlink-tracker.md` (row 5, Template B).

### 3h. ClinicalTrials.gov — explicit non-action

**Decision (per James, 2026-04-25):** ANZCTR-only for now; no
ClinicalTrials.gov dual-registration. Leave this as-is.

---

## What this fix list does NOT do

- It doesn't address the **brand-name collision** with the herbal compound
  "aescin" / "aescia". That problem is structural (the supplement-ingredient
  use of the term predates the company by decades) and can only be partially
  mitigated by accumulating co-occurrence with disambiguating phrases ("Aescia
  Health", "Aescia healthtech", "Aescia at District 3"). The on-page meta
  description, /llms.txt and /llms-full.txt all carry an explicit
  disambiguation note. The Wikidata entry will help further.
- It doesn't replace the need for **published clinical results**. The
  highest-authority backlink Aescia will ever earn is a published manuscript
  from the SAFE-Discharge trial. That's the long arc.
- It doesn't change the homepage hero copy. The poetic "Between the
  discharge and the next appointment, someone should be listening." line
  is brand-distinctive and intentionally stays.

---

## Verification queries — re-run on day 30

Run these in Claude.ai's web search, ChatGPT search, and Google.

1. `site:aesciahealth.com` — should return 5+ pages on Google.
2. `Aescia healthtech` — Aescia should appear top-10.
3. `Aescia post-discharge monitoring` — Aescia should appear top-5.
4. `James Kurrle Aescia` — `aesciahealth.com` should be a top-3 result on Google (currently the Concordia article ranks #1, but aesciahealth.com itself is missing).
5. `"District 3" healthtech startups` — Aescia should be visible if the District 3 listing landed.
6. `MTAA MedTech Compass companies` — Aescia should be visible alongside the Lubdub and Pulsenmore mentions currently surfacing.

If 1-3 still fail at day 30, the Search Console submission did not work and
needs re-investigation. If 4-6 still fail at day 60, the backlink generation
is not landing and outreach needs to be re-prioritised.
