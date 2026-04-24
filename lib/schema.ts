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
  foundingDate: '2024',
  founder: [
    {
      '@type': 'Person',
      name: 'James Kurrle',
      jobTitle: 'Founder and CEO',
      description: 'Critical-care physician with ten years of clinical and hospital leadership experience across Montréal and Sydney.',
    },
    {
      '@type': 'Person',
      name: 'Vasken Dermardiros',
      jobTitle: 'Co-founder and CTO',
      description: 'PhD in machine learning from Concordia University. Owns hosting, AI inference, EMR integration, and the pathway-authoring infrastructure.',
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
    'cardiothoracic surgery recovery',
    'endoscopy preparation',
    'colonoscopy preparation',
    'GLP-1 peri-procedural management',
    'clinical pathway authoring',
    'Software as a Medical Device',
    'TGA Class IIa pathway',
  ],
  sameAs: [
    'https://www.linkedin.com/company/aescia',
    'https://www.crunchbase.com/organization/aescia-health',
    'https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482',
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
    name: 'Royal Prince Alfred Hospital, Cardiothoracic Surgery Department',
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
