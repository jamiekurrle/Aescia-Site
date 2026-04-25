# Backlink tracker

Living log of the inbound-link work for aesciahealth.com. Each row is one outreach
target. Status moves from `not started` → `requested` → `live`. When a link goes
live, fill `date live` and paste the live URL into the notes column.

| # | Source | Target / contact URL | Status | Date requested | Date live | Notes |
|---|---|---|---|---|---|---|
| 1 | District 3 portfolio companies page | https://district3.co (find portfolio listing) | not started | — | — | Request listing as a District 3 member company. Joined September 2025 (see /updates#e1). Ask for inclusion on the public portfolio page; ask whether they want a custom blurb or will use the Wellfound short description. Send: site URL, logo (public/aescia-logo.png), 1-line and short description from `wellfound-crunchbase.md`. |
| 2 | Concordia founder spotlight | https://www.concordia.ca/news (pitch via District 3 comms) | not started | — | — | Pitch a follow-up feature on James Kurrle as a District 3 founder. Hook: bilateral Sydney-Montréal medtech, critical-care physician founder, Concordia anchor through 9550-0708 Québec inc. Existing public reference: Beat the Odds article, Oct 20 2025. |
| 3 | ANZCTR (SAFE-Discharge) | https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482 | live | — | (registered prior to this tracker) | SAFE-Discharge is registered on ANZCTR. Decision: ANZCTR-only for now; no ClinicalTrials.gov dual-registration planned. ANZCTR record linked via Organization sameAs in lib/schema.ts. |
| 4 | MTAA industry members directory | https://www.mtaa.org.au/industry-members | live | — | 2026-04-25 | Aescia is listed on MTAA's industry-members directory and the page links to aesciahealth.com. URL added to Organization sameAs in lib/schema.ts and to entry 10 of /updates. |
| 5 | BetaKit founder story | https://betakit.com (pitch via tips@betakit.com or LinkedIn) | not started | — | — | Pitch a BetaKit founder story on the Sydney-Montréal bilateral medtech structure and the post-discharge / specialty-clinic two-product setup. Lead with the Concordia + District 3 anchor. BetaKit has covered Concordia/District 3 companies before and is a useful tier-1 Canadian healthtech outlet. |
| 6 | Canadian or Australian healthtech podcast guest spot | (target one of: The Health Tech Podcast AU; Talking HealthTech AU; Hello Healthcare CA; LongTalks CA — pick one) | not started | — | — | Pitch one guest spot for James Kurrle. 30 min on the post-discharge gap, the regulatory contrast between the two Aescia products, and the SAFE-Discharge trial design. Backlink target: show notes link to aesciahealth.com and /team/james-kurrle. |
| 7 | Conference poster — submission deadline | (identify next deadline among: ACG, AGA, ASGE, DDW, GESA, CAG) | not started | — | — | Identify the next applicable submission deadline from these GI / endoscopy societies and target one for an Aescia for Clinics workflow / GLP-1 peri-procedural poster. ACG annual scientific meeting deadline is typically May–June for the October meeting; DDW deadline typically December for the May meeting; GESA Australian Gastroenterology Week typically May for September meeting; CAG Canadian Digestive Diseases Week deadline typically late autumn for spring meeting. Confirm exact 2026 dates and pick one. |
| 8 | LinkedIn founder newsletter — issue 1 | https://www.linkedin.com/in/jameskurrle/ | not started | — | — | Set up LinkedIn newsletter on James Kurrle's personal account. Issue 1 topic: "What we are careful not to claim" — adapted from the /evidence page. Cadence: monthly. Backlink target: every issue links to /updates and /team/james-kurrle. |

## Conventions

- **Status terms.** Only one of: `not started`, `requested`, `live`. Anything in between (waiting, ghosted) belongs in notes.
- **Dates.** ISO format `YYYY-MM-DD` once filled.
- **Notes.** Keep them factual and short. Long context belongs in a per-target document, not the tracker.
- **New rows.** Append to the end. Do not renumber existing rows when you add a new one — link integrity matters more than tidiness.
- **Removing rows.** Don't. If a target is dead, change status to `not started` and write `dead: <reason>` in notes.

## Outreach copy templates

Short reusable templates for the most common asks, kept inline so the tracker
is self-contained.

### Template A — portfolio / directory listing request

> Subject: Listing request — Aescia ([programme] member)
>
> Hi [name],
>
> Aescia is a [member|portfolio company] of [programme] (joined [month year]). We're a healthtech startup operating in Sydney and Montréal — investigational software-as-a-medical-device for post-discharge monitoring (in clinical evaluation through the SAFE-Discharge trial at Royal Prince Alfred Hospital), and a workflow product for specialty clinics.
>
> Could we be added to your public member directory / portfolio companies page? Site: https://www.aesciahealth.com. Logo and short description attached.
>
> Thanks,
> [name]

### Template B — podcast / press guest pitch

> Subject: Pitch — Sydney-Montréal medtech founder (post-discharge monitoring)
>
> Hi [name],
>
> I'm [name], reaching out for James Kurrle, a critical-care physician and the founder of Aescia. Aescia is a continuous-care platform with two products: an investigational software-as-a-medical-device for structured post-discharge monitoring (in clinical evaluation through the SAFE-Discharge trial at Royal Prince Alfred Hospital, ACTRN12625001425482), and a non-device workflow platform for specialty clinics.
>
> James would be a strong guest on the post-discharge gap, the regulatory contrast between the two products, and the bilateral Sydney-Montréal company structure. Aescia is a District 3 portfolio company at Concordia University and is enrolled in MTAA MedTech Compass.
>
> Background and links: https://www.aesciahealth.com/team/james-kurrle. Happy to share specific topic angles if useful.
>
> [name]
