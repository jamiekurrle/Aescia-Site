import {
  organizationSchema,
  clinicsSoftwareSchema,
  softwareApplicationSchema,
  medicalStudySchema,
  SITE_LAST_UPDATED,
} from '@/lib/schema'

const SITE_URL = 'https://www.aesciahealth.com'

// Canonical machine-readable facts for AI agents and answer engines: a curated,
// flat companion to the schema.org JSON-LD and /llms.txt — the same facts, easy
// to parse without rendering the page. Values are pulled from lib/schema.ts so
// this cannot drift from the structured data emitted on the pages.
export function GET() {
  const facts = {
    name: 'Aescia',
    legalName: 'Aescia Pty Ltd',
    url: SITE_URL,
    description: organizationSchema.description,
    foundingDate: organizationSchema.foundingDate,
    locations: ['Sydney, Australia', 'Montréal, Canada'],
    areaServed: ['Australia', 'Canada', 'United States', 'United Kingdom'],
    identifiers: {
      ABN: '96 687 840 517',
      'NSW Government Supplier ID': '12460268',
    },
    products: [
      {
        name: 'Aescia for Hospitals',
        category: 'investigational Software as a Medical Device',
        regulatory:
          'Intended TGA Class IIa (Rule 3.4). No regulatory application has been lodged.',
        status: 'In clinical evaluation through the SAFE-Discharge trial.',
        firstIndication: 'cardiothoracic surgical recovery',
        url: `${SITE_URL}/hospitals`,
      },
      {
        name: 'Aescia for Clinics',
        category: 'workflow and patient-preparation platform; not a medical device',
        description: clinicsSoftwareSchema.description,
        features: clinicsSoftwareSchema.featureList,
        pricing: clinicsSoftwareSchema.offers.description,
        url: `${SITE_URL}/clinics`,
      },
    ],
    platform: softwareApplicationSchema.description,
    clinicalTrial: {
      name: 'SAFE-Discharge',
      registry: 'ANZCTR',
      id: 'ACTRN12625001425482',
      status: medicalStudySchema.status,
      site: 'Royal Prince Alfred Hospital, Sydney',
      patients: 550,
      url: 'https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482',
    },
    regulatoryStatus:
      'No TGA, FDA, CE/UKCA, MDSAP, or Health Canada applications have been filed for either product. Aescia for Clinics is non-device and does not require device approval.',
    links: {
      hospitals: `${SITE_URL}/hospitals`,
      clinics: `${SITE_URL}/clinics`,
      evidence: `${SITE_URL}/evidence`,
      faq: `${SITE_URL}/faq`,
      updates: `${SITE_URL}/updates`,
      updatesFeed: `${SITE_URL}/feed.json`,
      llms: `${SITE_URL}/llms.txt`,
      llmsFull: `${SITE_URL}/llms-full.txt`,
      sitemap: `${SITE_URL}/sitemap.xml`,
    },
    dateModified: SITE_LAST_UPDATED,
  }

  return new Response(JSON.stringify(facts, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
