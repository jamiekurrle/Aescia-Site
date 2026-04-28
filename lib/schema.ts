const SITE_URL = 'https://www.aesciahealth.com'

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
  knowsLanguage: ['en', 'en-AU', 'en-CA', 'fr-CA'],
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
    'HL7 v2 ADT',
    'FHIR R4',
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
  operatingSystem: 'Web, iOS, Android',
  description:
    'A composable pathway engine: Collect, Follow, Remind, Educate, Export. One engine, two products.',
  provider: {
    '@id': `${SITE_URL}#organization`,
  },
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
