const SITE_URL = 'https://www.aesciahealth.com'

// Auto-updates on every build. Used to populate `dateModified` in WebPage
// schema and `article:modified_time` Open Graph tag, which AI retrieval tools
// (Claude, Perplexity, Google AI Overviews) use as a content-freshness signal
// when ranking citations.
//
// Resolution order:
//   1. process.env.SITE_LAST_UPDATED (set this in Vercel project env vars to
//      pin a specific date, e.g. for testing or staging parity)
//   2. Today's date in UTC (computed at module-evaluation time, which is
//      build time for Next.js static pages — Vercel runs a fresh build per
//      deploy, so this auto-updates without any manual bump)
const _BUILD_DATE = new Date().toISOString().split('T')[0]
export const SITE_LAST_UPDATED = process.env.SITE_LAST_UPDATED || _BUILD_DATE

// Approximate first-publish date of the marketing site, used as `datePublished`
// on the homepage WebPage schema. Aescia entered the District 3 portfolio in
// September 2025; the public site went live around that period.
export const SITE_FIRST_PUBLISHED = '2025-09-01'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'MedicalOrganization'],
  '@id': `${SITE_URL}#organization`,
  name: 'Aescia Health',
  legalName: 'Aescia Pty Ltd',
  alternateName: ['Aescia', 'Aescia Pty Ltd'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/aescia-logo.png`,
    width: 512,
    height: 512,
  },
  description:
    'A continuous-care platform for structured patient follow-up and specialty-clinic workflow. Aescia for Hospitals is an investigational Software as a Medical Device in clinical evaluation through the SAFE-Discharge trial at Royal Prince Alfred Hospital. Aescia for Clinics is a workflow platform for specialty clinics.',
  email: 'contact@aesciahealth.com',
  foundingDate: '2025',
  slogan: 'A continuous-care platform for the weeks that matter.',
  knowsLanguage: ['en', 'en-AU', 'en-CA', 'fr-CA', 'es-US', 'zh-Hans', 'ar', 'vi'],
  member: [
    {
      '@type': 'OrganizationRole',
      roleName: 'Industry Member',
      memberOf: {
        '@type': 'Organization',
        name: 'Medical Technology Association of Australia',
        url: 'https://www.mtaa.org.au',
      },
    },
    {
      '@type': 'OrganizationRole',
      roleName: 'Portfolio company',
      memberOf: {
        '@type': 'Organization',
        name: 'District 3 Innovation Hub, Concordia University',
        url: 'https://district3.co',
      },
      startDate: '2025-09',
    },
    {
      '@type': 'OrganizationRole',
      roleName: 'Selected programme participant',
      memberOf: {
        '@type': 'Organization',
        name: 'CHEO Research Institute Product-Market-Fit Programme',
        url: 'https://www.cheoresearch.ca',
      },
      startDate: '2026-04',
    },
  ],
  founder: [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/team/james-kurrle#person`,
      name: 'James Kurrle',
      jobTitle: 'Founder and CEO',
      description: 'Critical-care physician and founder of Aescia.',
      url: `${SITE_URL}/team/james-kurrle`,
      sameAs: ['https://www.linkedin.com/in/jameskurrle/'],
    },
    {
      '@type': 'Person',
      name: 'Vasken Dermardiros',
      jobTitle: 'Co-founder and CTO',
      description: 'PhD in machine learning from Concordia University. Owns hosting, AI inference, EMR integration, and the pathway-authoring infrastructure.',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Concordia University',
        url: 'https://www.concordia.ca',
      },
    },
  ],
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'ABN', value: '96 687 840 517' },
    { '@type': 'PropertyValue', propertyID: 'NEQ', value: '1181312316' },
    {
      '@type': 'PropertyValue',
      propertyID: 'NSW Government Supplier ID (buy.nsw)',
      value: '12460268',
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressCountry: 'AU',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  medicalSpecialty: ['Cardiovascular', 'CardiothoracicSurgery', 'Gastroenterologic'],
  knowsAbout: [
    'post-discharge monitoring',
    'continuous care',
    'cardiothoracic surgery recovery',
    'hospital readmissions',
    'specialty clinic workflow',
    'endoscopy preparation',
    'colonoscopy preparation',
    'bowel preparation',
    'GLP-1 peri-procedural management',
    'clinical pathway authoring',
    'patient-reported outcomes',
    'Software as a Medical Device',
    'TGA Class IIa pathway',
    'IEC 62304',
    'ISO 13485',
    'ISO/IEC 27001',
  ],
  sameAs: [
    'https://www.linkedin.com/company/aescia',
    'https://www.crunchbase.com/organization/aescia-health',
    'https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482',
    'https://www.mtaa.org.au/industry-members',
    'https://buy.nsw.gov.au/supplier/profile/12460268',
  ],
  // Authoritative external references for the regulatory and standards posture
  // claimed in `knowsAbout`. Helps LLM citation tools verify the regulatory
  // pathway claims by linking them to first-party government / standards URLs.
  citation: [
    {
      '@type': 'CreativeWork',
      name: 'TGA: Regulating software-based medical devices',
      url: 'https://www.tga.gov.au/products/medical-devices/regulating-medical-devices/regulating-software-medical-devices',
    },
    {
      '@type': 'CreativeWork',
      name: 'TGA: Classification of medical devices',
      url: 'https://www.tga.gov.au/products/medical-devices/manufacture-medical-device/classification-medical-devices',
    },
    {
      '@type': 'CreativeWork',
      name: 'ANZCTR registration: SAFE-Discharge (ACTRN12625001425482)',
      url: 'https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482',
    },
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: 'Aescia',
  description:
    'Aescia: a continuous-care platform. Structured patient follow-up for hospitals. Streamlined workflow for specialty clinics.',
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: ['en-AU', 'en-CA', 'fr-CA'],
}

export const medicalStudySchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalStudy',
  '@id': `${SITE_URL}/evidence#safe-discharge-trial`,
  name: 'SAFE-Discharge: Post-cardiothoracic-surgery discharge monitoring',
  description:
    'A prospective single-centre evaluation of Aescia for post-cardiothoracic-surgery discharge monitoring across the 30-day post-discharge window. A 50-patient interim cohort is pre-specified, followed by a 500-patient main cohort, 550 patients total.',
  // Recruiting since 21 June 2026 (enrolment opened at RPAH).
  status: 'Recruiting',
  studyLocation: {
    '@type': 'Hospital',
    name: 'Royal Prince Alfred Hospital',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressCountry: 'AU',
    },
  },
  sponsor: {
    '@type': 'MedicalOrganization',
    name: 'Sydney Local Health District (SLHD)',
  },
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'ANZCTR', value: 'ACTRN12625001425482' },
    { '@type': 'PropertyValue', propertyID: 'Internal', value: 'AES-SAFE-CTS-001' },
  ],
  studySubject: {
    '@type': 'MedicalCondition',
    name: 'Post-cardiothoracic surgical recovery',
  },
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/platform#software`,
  name: 'Aescia Platform',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  description:
    'A composable pathway engine: Collect, Follow, Remind, Educate, Export. One engine, two products.',
  provider: {
    '@id': `${SITE_URL}#organization`,
  },
}

// Granular SoftwareApplication entity for Aescia for Clinics. The site-wide
// softwareApplicationSchema (above) describes the generic platform; this one
// gives AI retrieval tools (Claude, Perplexity, Google AI Overviews) a
// feature-level, ASC-specific entity that matches buyer queries like
// "GLP-1 endoscopy prep software" or "prep-aware backfill for colonoscopy".
// Emitted on the endoscopy-ASC landing pages via <AscEntityBlock />.
export const clinicsSoftwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/clinics#software`,
  name: 'Aescia for Clinics',
  applicationCategory: 'HealthApplication',
  applicationSubCategory:
    'Pre-procedure patient-pathway software for endoscopy ambulatory surgery centers',
  operatingSystem: 'Web',
  description:
    'A clinician-authored pre-procedure patient-pathway platform for endoscopy ambulatory surgery centers (ASCs). Delivers structured bowel-prep instructions, GLP-1 / anticoagulant / diabetic peri-procedural overlays, timed multichannel reminders, prep-night photo confirmation, surveillance recall, and a prep-aware waitlist-backfill signal. Not a medical device.',
  featureList: [
    'Structured colonoscopy and endoscopy bowel-prep pathways',
    'GLP-1 peri-procedural cessation overlay (2024 multi-society guidance)',
    'Anticoagulant and antiplatelet hold / bridge overlay (per clinic protocol)',
    'Diabetic and insulin peri-procedural adjustment overlay',
    'Prep-night photo confirmation gate',
    'Prep-aware waitlist-backfill routing signal',
    'Multichannel patient reminders with consent capture (TCPA-aware for US SMS)',
    'Surveillance and recall tracking',
    'Clinician-authored explainable rules (no black-box AI)',
  ],
  url: `${SITE_URL}/clinics`,
  provider: { '@id': `${SITE_URL}#organization` },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    description:
      'Priced per scope in the US at the single-site level; no per-seat pricing. Design partners start free and pay nothing until the platform proves itself on the customer\'s own data. The rate is set per engagement against scope volume and held below the customer\'s modelled annual return. Contact Aescia for a site-specific rate.',
  },
}

// Per-page WebPage schema with publish/modified dates. AI retrieval tools use
// `datePublished` and `dateModified` as content-freshness signals when ranking
// citations. Pass page-specific values; defaults are the site-level constants.
export function webPageSchema(opts: {
  url: string
  name: string
  description: string
  datePublished?: string
  dateModified?: string
  primaryImage?: string
  breadcrumb?: ReturnType<typeof breadcrumbSchema>
  // Health-software topics get richer citation treatment from AI retrieval
  // tools when typed as MedicalWebPage. Set true on the endoscopy-ASC
  // landing pages (prep, GLP-1, bowel prep, no-shows, backfill).
  isMedicalPage?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.isMedicalPage ? ['WebPage', 'MedicalWebPage'] : 'WebPage',
    '@id': `${SITE_URL}${opts.url}#webpage`,
    url: `${SITE_URL}${opts.url}`,
    name: opts.name,
    description: opts.description,
    datePublished: opts.datePublished ?? SITE_FIRST_PUBLISHED,
    dateModified: opts.dateModified ?? SITE_LAST_UPDATED,
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}#website` },
    about: { '@id': `${SITE_URL}#organization` },
    publisher: { '@id': `${SITE_URL}#organization` },
    primaryImageOfPage: opts.primaryImage
      ? { '@type': 'ImageObject', url: opts.primaryImage }
      : undefined,
    breadcrumb: opts.breadcrumb,
  }
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.url}`,
    })),
  }
}

// Updates page: ItemList of dated company updates. The chronological index
// (entry1 oldest, entryN newest) is preserved here in display order
// (newest first) by reversing position assignment.
export type UpdatesEntry = {
  n: number
  date: string
  title: string
  body: string
  url?: string
}

export function updatesItemListSchema(entries: UpdatesEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/updates#list`,
    name: 'Aescia updates',
    description:
      'A dated log of what Aescia has shipped, what trials and programmes have opened, and what is coming next.',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'NewsArticle',
        '@id': `${SITE_URL}/updates#e${e.n}`,
        headline: e.title,
        datePublished: e.date,
        articleBody: e.body,
        url: e.url ?? `${SITE_URL}/updates#e${e.n}`,
        publisher: { '@id': `${SITE_URL}#organization` },
        author: { '@id': `${SITE_URL}#organization` },
      },
    })),
  }
}

// Standalone Person schema for the founder bio page. Mirrors the Person
// embedded inside organizationSchema.founder, with a sameAs array so search
// engines and LLM crawlers can resolve James Kurrle ↔ Aescia.
export const jamesKurrlePersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/team/james-kurrle#person`,
  name: 'James Kurrle',
  givenName: 'James',
  familyName: 'Kurrle',
  jobTitle: 'Founder and CEO',
  description:
    'Critical-care physician and founder of Aescia, a continuous-care platform for structured patient follow-up and specialty-clinic workflow.',
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Critical-care physician',
    occupationalCategory: 'Medical Doctor',
  },
  worksFor: { '@id': `${SITE_URL}#organization` },
  url: `${SITE_URL}/team/james-kurrle`,
  knowsAbout: [
    'critical care medicine',
    'post-discharge monitoring',
    'clinical pathway authoring',
    'Software as a Medical Device',
    'specialty clinic workflow',
  ],
  sameAs: [
    'https://www.linkedin.com/in/jameskurrle/',
  ],
}

// FAQPage schema for /faq. The same Q&A content renders visibly on the page;
// emitting it as JSON-LD lets retrieval-augmented LLMs (Claude, Perplexity,
// Google AI Overviews) extract individual question/answer pairs cleanly.
export type FAQItem = { q: string; a: string }

export function faqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faq`,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  }
}

// JobPosting schema for /careers/[slug]. Lets Google for Jobs and LLM crawlers
// extract the role cleanly. `description` should be a complete HTML string
// (built from the role data in lib/careers.ts).
export function jobPostingSchema(opts: {
  slug: string
  title: string
  description: string
  datePosted: string
  employmentType: string[]
  remote: boolean
  applicantCountries?: string[]
  validThrough?: string
  baseSalary?: { currency: string; min: number; max: number; unit: 'HOUR' | 'DAY' | 'MONTH' | 'YEAR' }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${SITE_URL}/careers/${opts.slug}#jobposting`,
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted,
    ...(opts.validThrough ? { validThrough: opts.validThrough } : {}),
    employmentType: opts.employmentType,
    industry: 'Medical technology',
    url: `${SITE_URL}/careers/${opts.slug}`,
    directApply: false,
    hiringOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'Aescia Health',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/aescia-logo.png`,
    },
    ...(opts.remote
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: (opts.applicantCountries ?? ['Canada']).map((name) => ({
            '@type': 'Country',
            name,
          })),
        }
      : {}),
    ...(opts.baseSalary
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: opts.baseSalary.currency,
            value: {
              '@type': 'QuantitativeValue',
              minValue: opts.baseSalary.min,
              maxValue: opts.baseSalary.max,
              unitText: opts.baseSalary.unit,
            },
          },
        }
      : {}),
  }
}
