# PR description — `seo-and-external-presence`

Branch: `seo-and-external-presence` → base: `main`. Not pushed. One commit:
`49154cf — SEO and external-presence groundwork`.

## Summary

Adds three dated Updates entries (District 3 Sept 2025, Concordia Beat-the-Odds
Oct 2025, MTAA MedTech Compass Apr 2026), creates a dedicated /team/james-kurrle
founder bio page with full structured data, extends JSON-LD with a Person schema
for the founder and an ItemList schema for /updates, and produces drop-in copy
for LinkedIn / Wellfound / Crunchbase plus an MTAA announcement and a backlink
tracker under /marketing. No new claims added beyond what aesciahealth.com
already states.

## Phase 1 — Audit (no code change)

Findings recorded in chat and in the consistency table at the bottom of
`marketing/external-profiles/wellfound-crunchbase.md`. Summary:
- Site is on Next.js with i18n (en-AU, en-CA, fr-CA). Most copy lives in `lib/i18n.tsx`.
- `/governance`, `/evidence`, `/updates`, `/team`, `/contact`, `/platform`, `/hospitals`, `/clinics` all exist.
- `/about` does not exist.
- `/team/james-kurrle` did not exist before this PR.
- Existing JSON-LD: Organization+MedicalOrganization, WebSite, MedicalStudy, SoftwareApplication, BreadcrumbList. No standalone Person, no ItemList on /updates.
- `robots.ts` and root metadata `index: true, follow: true`. Nothing was set to noindex.
- Outbound HTTP links visible to users: zero before this PR. Only mailto and JSON-LD `sameAs` URLs.

## Phase 2 — Updates page

`lib/i18n.tsx`, `app/updates/updates-content.tsx`, `app/updates/page.tsx`.

- Renumbered entries 1-7 to 3-9 to preserve "entry# = chronological index" convention.
- Added entry 1 — `September 2025` — `Aescia joins District 3 at Concordia University`.
- Added entry 2 — `20 October 2025` — `Concordia News features Aescia in Beat the Odds program`.
- Added entry 10 — `24 April 2026` — `Aescia enrols in MTAA MedTech Compass`.
- French translations updated in lockstep.
- `entryNumbers` display tuple now `[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]`.
- New optional `entryLinks` map renders an outbound "Read more" CTA on entries 1, 2, 10 (District 3 → district3.co; Concordia → Concordia article URL; MTAA → mtaa.org.au/medtech-compass).
- Updates link is in the primary nav on every page (it already was — `components/site-nav.tsx` desktop + mobile blocks). Confirmed.

## Phase 3 — Founder bio page

New `app/team/james-kurrle/page.tsx`.

- 217-word bio (target was 200; well within tolerance), opening "James Kurrle is the founder of Aescia." for name+brand co-occurrence ranking.
- One outbound link to https://www.linkedin.com/in/jameskurrle/ in a natural sentence inside the bio.
- `<link rel="me" href="https://www.linkedin.com/in/jameskurrle/">` injected in the page body (Next.js app-router pattern).
- Press section at the bottom with the Concordia Beat-the-Odds article (Oct 2025).
- Breadcrumb schema and Person schema both injected via `<script type="application/ld+json">`.
- Sitemap entry added in `app/sitemap.ts`.
- Footer Company column links to `/team/james-kurrle` ("James Kurrle, founder").
- `/team` page now shows a "Read full bio" CTA on James's founder card. (Did not edit Vasken's card.)
- No `/about` page exists, so footer is the only entry point added beyond `/team`.

## Phase 4 — Schema and structured data

`lib/schema.ts`, `app/updates/page.tsx`, `app/team/james-kurrle/page.tsx`.

- New `jamesKurrlePersonSchema` — `Person` with sameAs `[linkedin.com/in/jameskurrle]`, worksFor pointing to the existing `#organization` ID.
- New `updatesItemListSchema(entries)` helper — emits `ItemList` of `NewsArticle` items. /updates page now serializes a 10-item English-locale snapshot of entries with ISO dates, headlines, bodies, and external URLs where applicable.
- Organization `sameAs` left canonical (LinkedIn company, Crunchbase, ANZCTR). I briefly added `district3.co` then reverted — sameAs is for entity profile URLs, and the District 3 home page is not a profile of Aescia.
- Validated all schemas via runtime `JSON.parse` in browser preview:
  - `/team/james-kurrle`: 4/4 valid (Organization, WebSite, BreadcrumbList, Person).
  - `/updates`: 4/4 valid (Organization, WebSite, BreadcrumbList[2], ItemList[10]).
- `npx tsc --noEmit` passes (exit 0).

## Phase 5 — External profile copy

New `marketing/external-profiles/`:
- `linkedin-company-page.md` — tagline, 1,495-char About, 20 specialty tags, 5 example posts (~200 words each).
- `linkedin-founder-about.md` — 1,632-char About for James's personal LinkedIn.
- `wellfound-crunchbase.md` — Wellfound (tagline, short, long, 10 culture bullets) + Crunchbase (short, long, 10 industry tags, news-items-to-add table). Includes a website-vs-profile-text consistency table.

## Phase 6 — MTAA Compass announcement

New `marketing/announcements/mtaa-compass-announcement.md`. Two versions (~110 word LinkedIn post, ~270 word LinkedIn article). Long version references the September 2025 District 3 join as company-trajectory context. Distribution checklist and per-claim QA table at bottom.

## Phase 7 — Backlink tracker

New `marketing/backlink-tracker.md` with the 8 prepopulated rows (District 3 portfolio listing, Concordia founder spotlight, ClinicalTrials.gov / ANZCTR, MTAA member directory, BetaKit founder story, healthtech podcast guest spot, conference poster deadline, LinkedIn founder newsletter). Plus reusable outreach copy templates and conventions.

## Manual actions still required

You will need to do the following — they are outside what can be done from the repo:

- [ ] **Verify the MTAA MedTech Compass exact URL.** Used `https://www.mtaa.org.au/medtech-compass` as the public landing page based on MTAA's site convention. If the deeplink is different, update the URL in three places: `app/updates/updates-content.tsx` (entryLinks[10]), `app/updates/page.tsx` (entry n=10 url field), and `marketing/external-profiles/wellfound-crunchbase.md` (news items table).
- [ ] **Update the LinkedIn company page** with the tagline, About, and specialties from `marketing/external-profiles/linkedin-company-page.md`.
- [ ] **Update James Kurrle's LinkedIn personal About** from `marketing/external-profiles/linkedin-founder-about.md`.
- [ ] **Update Wellfound and Crunchbase** with the copy in `marketing/external-profiles/wellfound-crunchbase.md`. Set Crunchbase "Founded On" to 2024 (matches `lib/schema.ts` organizationSchema.foundingDate).
- [ ] **Add the three new news items to Crunchbase** (table in the same file).
- [ ] **Submit `/sitemap.xml` to Google Search Console** and re-submit any updated URLs (`/updates`, `/team/james-kurrle`).
- [ ] **Submit `/sitemap.xml` to Bing Webmaster Tools** for symmetry.
- [ ] **Request directory listings** for District 3 portfolio companies page and the MTAA member directory (rows 1 and 4 of the backlink tracker).
- [ ] **Schedule the MTAA Compass announcement post** using `marketing/announcements/mtaa-compass-announcement.md`.
- [ ] **Set up the LinkedIn founder newsletter** and ship issue 1 (row 8 of the backlink tracker).
- [ ] **Decide on dual-registration of SAFE-Discharge on ClinicalTrials.gov** (row 3 of the tracker).
- [ ] **Cross-check the founder bio claims** that mention District 3 portfolio status and MTAA Compass enrolment — both lines correspond to /updates entries 1 and 10. If you would prefer those lines removed from the public bio until the MTAA enrolment is confirmed externally, flag and I'll edit.

## Test plan

- [x] `npx tsc --noEmit` passes (exit 0).
- [x] /updates renders 10 entries newest-first (verified via preview snapshot).
- [x] /team/james-kurrle returns 200 and renders bio + Press section + LinkedIn anchor + rel=me (verified via preview eval).
- [x] All JSON-LD blocks parse on /updates and /team/james-kurrle (verified via preview eval).
- [ ] Manual: open https://search.google.com/test/rich-results and validate /updates and /team/james-kurrle once deployed to staging.
- [ ] Manual: confirm en-CA / fr-CA Updates render correctly on the deployed build (changes were made in both locales).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
