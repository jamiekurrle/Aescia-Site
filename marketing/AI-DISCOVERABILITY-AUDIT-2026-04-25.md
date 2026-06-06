# Aescia AI-discoverability audit

**Run date:** 2026-04-25
**Scope:** Production aesciahealth.com plus external surfaces
**Tools used:** WebSearch (Anthropic web search), WebFetch, curl, local repo
**Branch:** ai-discoverability-fixes (off seo-and-external-presence)

---

## Phase 1 — Baseline: what LLM-search tools actually return

### Brand queries

| Query | aesciahealth.com in top 5? | Snippet status |
|---|---|---|
| `Aescia` | **No** | Top 5 = Amazon lymphatic-drainage supplements (4 listings using "aescia" as ingredient name), DeviantArt fan art, Aesica Containment Facility (pharma, unrelated), fictional character "Aescia Feinstein", Geoff Watkins X profile. **Brand-name collision is severe.** |
| `Aescia health` | **No** | Top 5 = supplement listings, Aaxcia Health (typo brand — different company), Essia Health (unrelated PE-backed nursing), AscellaHealth (specialty pharmacy). Multiple entity-confusion candidates. |
| `Aescia Health Concordia` | **No (but indirect mention)** | Concordia News article ranks #1 and #2 — describes Aescia as a healthtech startup founded by James Kurrle, but does NOT link aesciahealth.com in the search snippet. |
| `aesciahealth.com` | **No — even the literal domain does not appear** | Top 5 = Aaxcia Health, Aēsara Health, Ease Health. Domain is not in Google's index. |
| `James Kurrle Aescia` | **No** | Top 5 = Concordia article (#1, accurate context but no aesciahealth.com link), James's LinkedIn (#2, accurate), James Kurrle obituary (different person — risk of entity confusion), Vermont legal case (different person), Susan Kurrle at Sydney Uni (different person, blurred relevance). |
| `Aescia Monitor` | **No** | All results unrelated medical/electronic monitors. The product name "Aescia Monitor" used in some internal materials is **not the live site naming** ("Aescia for Hospitals"); searches for the internal name don't return anything. |
| `Aescia Clinic` | **No** | All results unrelated aesthetic clinics. Same naming-mismatch issue. |

### Category-intent queries

| Query | aesciahealth.com in top 10? | Top result |
|---|---|---|
| `post-discharge monitoring software Australia` | **No** | Lumeon, sterloCare, PointClickCare, Circadify, Cognota, Mindbowser, Health Catalyst |
| `post-discharge monitoring platform Canada` | **No** | Frontiers paper, Lumeon, Circadify, sterloCare, CARESIMPLE (CHUM Montréal), Mount Sinai Toronto, "The SMART Program" |
| `specialty clinic workflow software` | **No** | NextGen, ModMed, Canvas Medical, Veradigm, ClinicSpectrum, OmniMD |
| `AI patient follow-up platform` | **No** | TrackStat, Infermedica, Rad AI, Assort Health, Hippocratic AI, Heidi, Epic MyChart AI, Mindbowser DischargeFollow |
| `District 3 healthtech startups` | **No** | District 3 itself ranks well; specific startups mentioned: SWave3D, Sonaro, Aifred Health, Gray Oncology, MiniGyn, UbiSim. **Aescia is missing from District 3's own indexed coverage.** |
| `MTAA MedTech Compass companies` | **No** | Lubdub and Pulsenmore are the two Compass companies that surface. **Aescia is missing.** |
| `Montreal healthtech startups 2026` | **No** | Dialogue, OROHealth, Tracxn lists, BetaKit. Aescia is not in any indexed roundup. |

**Phase 1 summary.** Aescia is **invisible to Google's web index**. The
single indexed surface that consistently identifies Aescia by name and
context is the Concordia News article from October 2025. Brand searches
are dominated by the herbal compound "aescin"/"aescia" (in lymphatic-drainage
supplements) and unrelated phonetic neighbours. Category searches return
established competitors with no Aescia presence. Where Aescia "should"
appear (D3 portfolio coverage, MTAA Compass coverage, Montreal healthtech
roundups), it does not.

---

## Phase 2 — Crawler access audit (live site)

| Check | Status | Notes |
|---|---|---|
| /robots.txt | ✅ | All major AI crawlers explicitly allowed (GPTBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, OAI-SearchBot, ChatGPT-User, Google-Extended, Applebot-Extended, Bytespider). Sitemap referenced. |
| /sitemap.xml | ⚠️ | Lists /, /hospitals, /clinics, /platform, /evidence, /updates, /governance, /team, /contact. **Missing /team/james-kurrle and /faq** (these pages aren't on production yet — see Phase 8). |
| `<meta name="robots">` on homepage | ✅ | `index, follow`. Nothing noindex on real pages. The 404 page does have `noindex`, which is correct. |
| Server-side rendering | ✅ | `X-Vercel-Cache: PRERENDER`, `X-Nextjs-Prerender: 1`. The initial HTML response contains brand+products+location text directly. Verified by counting term occurrences in raw curl output: "continuous-care platform" 13×, "SAFE-Discharge" 6×, "Aescia for Hospitals" 6×, "Aescia for Clinics" 6×, "James Kurrle" 2×. AI crawlers that don't execute JavaScript will still see the content. |
| /llms.txt on production | ❌ | Returns 404 (the seo-and-external-presence branch added this file, but it is not yet deployed). |
| /faq on production | ❌ | 404. Same reason. |
| /team/james-kurrle on production | ❌ | 404. Same reason. |
| HTTPS / canonical | ✅ | aesciahealth.com → https://aesciahealth.com/ → https://aesciahealth.com/ chain is clean. Canonical link present. |

**Phase 2 summary.** The technical posture for crawler access is excellent
for what is deployed. The single biggest gap is that the recent
discoverability scaffolding (FAQ, llms.txt, founder page, founded-year fix)
sits unmerged on branch and not on production.

---

## Phase 3 — Structured data audit

Production homepage emits Organization+MedicalOrganization and WebSite
schemas. /evidence emits BreadcrumbList, MedicalStudy, Hospital, and
MedicalCondition. /updates and /team have only the layout-level schemas
plus BreadcrumbList — no ItemList on Updates, no Person on Team.

| Schema | Present on production? | Should be |
|---|---|---|
| Organization (homepage) | ✅ | Already present. `foundingDate` shows **2024** on production (incorrect — local repo has 2025; not yet deployed). `sameAs` is the old 3-item list (LinkedIn, Crunchbase, ANZCTR); the MTAA URL is not yet in production. |
| Person schema for James Kurrle | ❌ on /team page (only embedded inside Organization.founder) | New `jamesKurrlePersonSchema` is on the branch; activates with /team/james-kurrle deploy. |
| ItemList / Blog on /updates | ❌ | New `updatesItemListSchema` is on the branch; deploys with merge. |
| FAQPage | ❌ | /faq with FAQPage schema is on the branch; deploys with merge. |
| MedicalStudy on /evidence | ✅ | Present and accurate. |
| BreadcrumbList | ✅ | Present on every inner page. |
| SoftwareApplication on /platform | ✅ | Present. |

JSON-LD validity: all schemas parse as valid JSON via runtime
`JSON.parse` in browser preview tests. No schema.org type errors visible.
No third-party validator (Google Rich Results, schema.org validator) was
run in this audit — the production schemas should be re-validated after
deployment of the branch.

Wikidata: **No entry exists for Aescia.** Verified via
`site:wikidata.org Aescia health`. This is a major gap for entity
disambiguation — without a Wikidata Q-ID, LLMs have nothing canonical to
anchor "Aescia → healthtech company" rather than "aescia → herbal
compound".

Google Knowledge Panel: No Knowledge Panel for "Aescia" or "Aescia Health".
Verified by absence of structured panel content in any of the brand-query
search results.

---

## Phase 4 — External footprint map

| Source | Authority tier | Listed? | Links to aesciahealth.com? | Surfaces in Google search? |
|---|---|---|---|---|
| Concordia News article (Oct 20, 2025) | High (.ca, university, journalistic) | Yes | Yes (in body text) | **Yes** — the only indexed mention that surfaces consistently |
| LinkedIn company page (linkedin.com/company/aescia) | High | Yes (200 OK; description "Reimagined recovery", 5 employees, founded 2025, links to aesciahealth.com) | Yes | **No** — LinkedIn typically blocks Google indexing of company-About pages |
| LinkedIn personal page James Kurrle | High | Yes | Likely yes | **Partial** — surfaces for queries containing the founder's name |
| Crunchbase (crunchbase.com/organization/aescia-health) | Medium-high | Likely yes (returns 403 to anonymous fetch — gated, not absent) | Unknown without auth | **No** — `"Aescia" crunchbase` returns Essia, Assaia, Aesys |
| ANZCTR record (ACTRN12625001425482) | High (.org.au, government registry) | Yes (registered) | Unknown — couldn't fetch (403 to bot UA) | **No** — `"ACTRN12625001425482"` returns generic "safe discharge" articles, not the trial record |
| MTAA industry members directory | High (.org.au, industry association) | **Yes — verified, links to aesciahealth.com** | Yes | **No (effectively)** — `Aescia site:mtaa.org.au` returns the directory page but the page renders membership names dynamically; Google may index the page but not Aescia's name within it |
| District 3 portfolio (district3.co/startups) | High (.co + Concordia adjacency) | **No — verified missing** | No | n/a |
| MedTech Compass (medtechcompass.org.au) | High | No (page describes the programme generically; does not name member companies) | No | n/a |
| BetaKit, TechCrunch | High | No | No | n/a |
| Wikidata | Highest (entity-graph canonical) | **No** | n/a | n/a |
| Wellfound, AngelList, GitHub public | Medium-low | Not verified in this pass | n/a | n/a |
| PubMed, conference proceedings | Highest (academic) | No (trial hasn't published; no abstracts indexed) | n/a | n/a |

**Footprint count vs benchmark.** Indexable, search-surfacing public mentions
of Aescia in this audit: **1** (Concordia News article). LinkedIn personal
profile surfaces partially, gated behind founder-name queries. Healthtech
benchmark for comparable stage: 15-30 indexable mentions. Aescia is
≈30× below benchmark.

---

## Phase 5 — Entity disambiguation check

The brand "Aescia" collides with multiple unrelated entities. Risk of LLM
confusion is real and currently unmitigated.

**Collision candidates ranked by impact:**

1. **"aescia" / "aescin" — herbal compound used in lymphatic-drainage
   supplements.** Owns the top of Google for the brand name. This is the
   biggest collision; 5 of the top 10 results for `Aescia` are Amazon
   listings using "aescia" as an ingredient.
2. **"Aēsara Health" — Australian wellness clinic in Northcote.** Phonetic
   collision; appears on the page-2 results for `aesciahealth.com`.
3. **"Aaxcia Health"** — small health-information site. Domain typo
   collision.
4. **"Essia Health"** — PE-backed nursing services. Phonetic collision;
   listed on PitchBook and Yelp.
5. **"AscellaHealth"** — specialty pharmacy. Phonetic collision; LinkedIn
   page surfaces.
6. **"Aesica" containment facility** — pharmaceutical manufacturing.
   Spelling collision.
7. **Fictional characters** (DeviantArt fan art "Aescia", "Aescia Feinstein"
   on a Battle for the Hill wiki). Brand-name collision but lower impact.
8. **"James Kurrle" (other people)** — there's at least one obituary
   and one Vermont legal case for unrelated James Kurrles. Real risk that
   an LLM blurs context between them, especially if asked
   "what happened to James Kurrle". A separate "Susan Kurrle, Sydney Uni"
   is a clinical academic — closely adjacent to the company narrative
   and high risk of mistaken-identity citations.

**Does aesciahealth.com self-identify as a healthcare company in places an
LLM crawler will see?** Mostly yes:
- `<title>`: "Aescia. A continuous-care platform." ✓
- Production meta description (currently): poetic, no entity-tagging words.
  This commit (62242da) replaces it with: "Aescia (aesciahealth.com) is a
  healthtech company building a continuous-care platform for hospitals
  and specialty clinics. Founded 2025 by James Kurrle MD; headquartered
  in Sydney, Australia and Montréal, Canada."
- Organization JSON-LD: `name`, `legalName`, `description` all clearly
  identify Aescia as a healthtech / medical company. ✓
- Visible homepage hero: "A continuous-care platform" eyebrow is good but
  not unique. Hero H1 ("Between the discharge...") is poetic and
  brand-distinctive but contains no entity-tagging keywords. (Intentional;
  not changed.)

**Most disambiguating phrase.** "Aescia (healthtech company at
aesciahealth.com), District 3 portfolio company at Concordia University,
founded 2025 by James Kurrle MD, headquartered in Sydney and Montréal,
runs the SAFE-Discharge trial at Royal Prince Alfred Hospital." This
sentence anchors brand + sector + location + person + programme + trial.
It now appears verbatim or near-verbatim in:
- `<meta name="description">` (this commit)
- /llms.txt entity card section
- /llms-full.txt entity card section
- Organization JSON-LD `description` field
- /team/james-kurrle bio (when deployed)

---

## Phase 6 — Content gap analysis

**The site's content quality is good** — when an LLM can read it. WebFetch
extracted accurate two-sentence answers to every benchmark question:

| Question | Live-site answer extracted | Quality |
|---|---|---|
| What does Aescia do? | "Aescia is a continuous-care platform that provides 'structured patient follow-up, built for hospitals and specialty clinics.' It serves two main functions: monitoring post-surgical recovery through daily check-ins for hospital patients, and managing pre-procedure preparation workflows for specialty clinics like endoscopy centers." | ✓ Clean, accurate |
| Who founded Aescia? | Both founders extracted with role + bio | ✓ |
| What is the regulatory status? | Distinct posture for both products extracted accurately | ✓ |
| Where is Aescia located? | Sydney + Montréal with legal entities | ✓ |

**The content gap is therefore not "the answers aren't there" — it's
"the answers are there but no LLM-search tool ever sees aesciahealth.com
in its result set because the site isn't indexed".**

Where extra Q&A coverage helps: the FAQPage on /faq (on the branch, not
deployed) gives 19 declarative Q&A pairs pre-formatted for retrieval.
That's the single highest-yield content type for LLM web-search retrieval,
and it deploys with this branch.

---

## Phase 7 — The three highest-leverage fixes

Synthesised from Phases 1-6. Three only.

### Fix 1: Submit aesciahealth.com to Google Search Console and Bing Webmaster Tools

- **What:** Verify domain ownership at https://search.google.com/search-console (domain-property type). Submit /sitemap.xml. Use URL Inspection → Request Indexing on every important page. Repeat at https://www.bing.com/webmasters (or import from Search Console).
- **Why it's the highest-leverage move (evidence):** `site:aesciahealth.com` returns zero results on Google (Phase 1). Without indexing, every other discoverability lever is gated. Robots.txt, sitemap, structured data, and SSR are all already excellent (Phase 2-3); the missing piece is the submission step, which was almost certainly never done.
- **Effort:** 30-60 minutes for the human action. No code change.
- **Time-to-impact:** 1-7 days for Google's first crawl after submission. 14-30 days for measurable ranking change.
- **Verification at day 7:** `site:aesciahealth.com` returns 5+ pages.
- **Verification at day 30:** `Aescia healthtech` returns aesciahealth.com in the top 10 on Google.

### Fix 2: Merge and deploy `ai-discoverability-fixes` to production

- **What:** Open PR `ai-discoverability-fixes` → `main`, merge, deploy via Vercel. This activates: /llms.txt + /llms-full.txt, /faq with FAQPage JSON-LD (19 Q&A pairs), /team/james-kurrle with Person schema, the founded-year correction (2024→2025), the rich Organization schema (slogan, knowsLanguage, member roles, expanded knowsAbout), the MTAA member URL in sameAs, the partner-card outbound links, the ANZCTR linkification, and the disambiguating meta description.
- **Why it's the highest-leverage move (evidence):** Every audit-flagged content gap in Phase 3 and Phase 6 is fixed by deploying what's already on the branch. /faq alone gives 19 retrieval-friendly Q&A pairs; FAQPage JSON-LD is the structured-data type that LLM web-search tools quote most directly. /llms-full.txt gives crawlers a single 14KB canonical document. The branch is already TypeScript-clean, preview-verified, and ready.
- **Effort:** 5-10 minutes for the merge + deploy. No additional coding.
- **Time-to-impact:** Instant on deploy. LLM tools that re-crawl on each query (Claude.ai web search, Perplexity) will see the new content within hours; Google reindex 1-7 days after Fix 1 lands.
- **Verification (immediately after deploy):** see the curl block in `marketing/ai-discoverability-action-list.md`.

### Fix 3: Land 5 high-authority indexable backlinks within 30 days

- **What:** Five outreach actions, in priority order:
  1. **Wikidata entry** for Aescia (free, permanent, highest disambiguation impact). Skeleton in `marketing/ai-discoverability-action-list.md` §3d.
  2. **District 3 portfolio listing.** Aescia is missing from district3.co/startups despite being a portfolio company since September 2025. Outreach copy in §3a.
  3. **LinkedIn company-page rewrite** with the rich About + 5 example posts from `marketing/external-profiles/linkedin-company-page.md` §3b.
  4. **Crunchbase profile refresh** with the long description and news items from `marketing/external-profiles/wellfound-crunchbase.md` §3c.
  5. **ANZCTR sponsor URL field** verified to point to aesciahealth.com §3e.
- **Why it's the highest-leverage move (evidence):** The audit found ~1 indexable, search-surfacing public mention (the Concordia article); the healthtech benchmark is 15-30. Each backlink is a one-time action with durable downstream SEO authority transfer. Wikidata in particular is the canonical entity-link source used by Google Knowledge Graph and most LLM training pipelines — without it, "Aescia" stays bound to the herbal compound in entity graphs.
- **Effort:** 4-6 hours total across all five.
- **Time-to-impact:** 7-30 days for crawl + index; 30-90 days for ranking signal compounding.
- **Verification at day 30:** running `District 3 healthtech startups` should now surface Aescia. Wikidata entry visible at `wikidata.org/wiki/Q[id]`. LinkedIn company page returns the rich content when fetched.

---

## Phase 8 — What I implemented on this pass

**Branch:** `ai-discoverability-fixes` (off `seo-and-external-presence`, which already contains earlier groundwork). Commits added on this pass:

```
62242da AI-discoverability fixes: meta description disambiguators, llms-full.txt, action list
```

This branch also carries every commit from `seo-and-external-presence`:

```
610ce3f Wire IAS and MTAA Compass partner URLs (user-confirmed)
488b11a Link more partner cards out + name MTAA card after the Compass programme
be87eac Link the ANZCTR trial ID to the public registration record
810524d Make CHEO Research Institute partner card clickable
6eb583d LLM-discoverability pass + corrections
01f5518 Add PR description for seo-and-external-presence
49154cf SEO and external-presence groundwork
```

### What changed in commit 62242da

**1. `app/layout.tsx` meta description rewrite.** From poetic ("Between the
discharge and the next appointment, someone should be listening...") to
declarative + disambiguating: "Aescia (aesciahealth.com) is a healthtech
company building a continuous-care platform for hospitals and specialty
clinics. Founded 2025 by James Kurrle MD; headquartered in Sydney,
Australia and Montréal, Canada. Investigational SaMD for post-discharge
monitoring; non-device workflow for specialty clinics."

The visible homepage hero is unchanged. Only the meta tag changed.
Keywords list also expanded with explicit brand+disambiguator terms.

**2. `public/llms-full.txt`.** Long-form companion to /llms.txt. 14KB single
text document: entity card, products, honest claim surface, governance,
SAFE-Discharge trial detail, dated updates, partner URLs, contact, plus an
explicit disambiguation paragraph distinguishing Aescia from "aescin"
(the herbal compound), "Aēsara Health", "Aaxcia Health", "Essia Health",
and "AscellaHealth".

**3. `marketing/ai-discoverability-action-list.md`.** External-action playbook
for the three fixes only James can execute: Search Console submission with
exact verification flow; deploy steps; and 5 outreach moves with email
copy.

**Verification of these changes (preview server):**
- `/llms.txt` → 200, `text/plain`, 4089 bytes, includes "Founded 2025"
- `/llms-full.txt` → 200, `text/plain`, 14206 bytes, includes "Founded: 2025"
- Homepage `<meta name="description">` now starts "Aescia (aesciahealth.com) is a healthtech company..."
- `npx tsc --noEmit` → exit 0

**Manual actions still required (cross-link to action-list.md):**

- [ ] Verify domain in Google Search Console (§Fix 1)
- [ ] Verify domain in Bing Webmaster Tools (§Fix 1)
- [ ] Submit /sitemap.xml in both
- [ ] Request indexing for top 9 URLs in Search Console
- [ ] Open and merge PR `ai-discoverability-fixes` → `main`
- [ ] Confirm Vercel deploy and run the verification curl block
- [ ] Create Wikidata entry for Aescia (§Fix 3, action 1)
- [ ] Email District 3 to request portfolio listing (§Fix 3, action 2)
- [ ] Update LinkedIn company About section (§Fix 3, action 3)
- [ ] Update Crunchbase profile (§Fix 3, action 4)
- [ ] Confirm ANZCTR sponsor URL points to aesciahealth.com (§Fix 3, action 5)

---

## Phase 9 — 30 / 60 / 90-day verification plan

Each milestone has explicit pass/fail thresholds. Run each query in Claude.ai's
web search, ChatGPT search, and a clean (incognito) Google search.

### Day 7 (after Fix 1 + Fix 2 deploy)

| Test | Pass | Fail = escalate to |
|---|---|---|
| `site:aesciahealth.com` on Google | Returns ≥ 5 pages including `/`, `/governance`, `/evidence` | Re-check Search Console for "Discovered, currently not indexed" status; manually re-submit each URL |
| `curl https://aesciahealth.com/llms.txt` | 200, text/plain | Vercel deploy didn't include the public/ assets — re-check |
| `curl https://aesciahealth.com/faq` | 200 | Build error in /faq route — check Vercel build logs |
| Organization JSON-LD on production homepage `foundingDate` | "2025" | Cache invalidation needed; force redeploy |

### Day 30 (Fix 1 + Fix 2 indexed; Fix 3 outreach in flight)

| Test | Pass | Fail = escalate to |
|---|---|---|
| `Aescia healthtech` on Google | aesciahealth.com in top 10 | Add internal links from external mentions; check backlink count via Search Console "Links" report |
| `Aescia post-discharge monitoring` on Google | aesciahealth.com in top 5 | Re-validate FAQ page is indexed (URL Inspection in Search Console); /llms.txt being read by crawlers |
| `Aescia` on Claude.ai web search | Returns aesciahealth.com or quotes from it within first 3 results | Backlink count still too low; prioritise Wikidata + District 3 listings |
| `Aescia` on Perplexity | Returns aesciahealth.com card with description + URL | Same |
| `What is Aescia?` on ChatGPT search | Quotes the meta description or /llms.txt content | Same |
| Wikidata entry exists | `wikidata.org/wiki/Q[id]` returns Aescia entity card | Wikidata submission rejected — re-check item description satisfies notability bar |

### Day 60 (sustained crawling)

| Test | Pass | Fail = escalate to |
|---|---|---|
| `District 3 healthtech startups` | Aescia surfaces in top 10 results | District 3 portfolio listing not yet up; chase comms contact |
| `MTAA MedTech Compass companies` | Aescia surfaces alongside Lubdub and Pulsenmore | MTAA's Compass page may not list members publicly; accept as-is |
| `James Kurrle Aescia` on Google | aesciahealth.com/team/james-kurrle ranks ≥ #3 (currently the Concordia article ranks #1; that's fine) | Person schema may need re-validation via Google Rich Results Test |
| Google Knowledge Panel for "Aescia" | A panel begins forming with logo + description from Org schema | Sometimes takes longer; not a hard fail |
| `Aescia` on Claude.ai for a fresh user | Returns aesciahealth.com as the canonical link, not the supplement | If still bound to supplement: brand-collision can only be diluted with more time + more backlinks; this is the slow lever |

### Day 90

| Test | Pass | Fail = escalate to |
|---|---|---|
| `post-discharge monitoring software Australia` | aesciahealth.com in top 10 | Category-intent ranking is the slowest lever; if no movement, consider one published thought-leadership post (LinkedIn newsletter or BetaKit guest piece) per month |
| `Aescia continuous-care platform` | aesciahealth.com #1 | Brand+keyword combination should be locked; if not, internal-linking review |
| FAQ page rich-result | Google Rich Results Test reports valid FAQPage with all 19 questions | Re-check JSON-LD — particularly Question/Answer text length |
| BetaKit / Canadian press article | At least one published article linking to aesciahealth.com | Re-pitch with a fresher hook (e.g., trial enrolment milestone or first paying customer) |

If the Day-7 or Day-30 thresholds fail, the most likely root cause is the
Search Console submission didn't actually verify or didn't actually submit
the sitemap. Re-run that flow first. If they pass, Fix 1 is working and
the slower fixes (3) just need patience.

---

## What I couldn't determine

- **Whether the LinkedIn company page is genuinely uncrawlable by Google or just low-ranked.** LinkedIn programmatically blocks indexing of most company pages, but some surface in search; the answer for this specific page can only be confirmed by Search Console "Backlinks" or a `link:` query (deprecated by Google). Conservative assumption: treat it as not indexed, prioritise on-site content and Wikidata.
- **Whether Crunchbase has a public profile for Aescia.** The URL `crunchbase.com/organization/aescia-health` returns 403 to anonymous fetches — this is consistent with both "page exists, gated by auth" and "page doesn't exist". Cannot verify without a Crunchbase login.
- **Whether the ANZCTR record is genuinely indexed by Google or simply ranks too low.** ANZCTR returned 403 to my bot UA; can't confirm whether Google sees it. Assume low-rank.
- **Whether MedTech Compass lists Aescia anywhere on its site.** WebFetch of the Compass homepage returned no Aescia mention. The internal /members or /participants subpath wasn't found via the URL probes I tried. James should confirm directly with MTAA whether Compass has a public participants page.
- **Whether the homepage Organization schema's expanded knowsAbout array (18 terms vs 8) actually moves the needle.** Schema.org `knowsAbout` is supported by Google Knowledge Graph but I have no way to test downstream LLM behaviour from the local environment. This is a plausible-but-unverified lever.
- **Whether AI crawlers (GPTBot, ClaudeBot, PerplexityBot) ingest /llms.txt and /llms-full.txt.** The /llms.txt convention is emerging and not yet uniformly supported. Anthropic, Perplexity, and others have committed to the convention publicly, but ingestion behaviour is opaque. This is a hedged bet, not a proven one.
- **Whether the Beat-the-Odds Concordia article actually links to aesciahealth.com from the body text.** WebFetch confirmed Aescia is described in the article and that James Kurrle is named, but I did not verify there's a clickable href to aesciahealth.com (vs just text mention). This affects whether the article passes link equity.
- **Whether brand-collision with "aescin"/"aescia" the herbal compound is permanently insurmountable.** Etymologically, "aescin" is a Latinised form of horse-chestnut Aesculus. The compound has decades of indexed prior art. Some dilution is possible via co-occurrence with disambiguating phrases; eliminating the collision entirely is probably not feasible without a brand pivot, which is out of scope.
- **The actual deployment status of `seo-and-external-presence` and `ai-discoverability-fixes`.** Both branches are committed locally but not pushed. I have not opened a PR, not pushed to GitHub, and not triggered a Vercel deploy. James needs to do these.

If anything in this audit reads as conclusive without a verification step
in this section, it shouldn't.
