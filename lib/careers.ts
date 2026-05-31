// ---------------------------------------------------------------------------
// Careers data. One entry per open role. The careers index (/careers) and the
// role detail page (/careers/[slug]) both read from ROLES, and the JobPosting
// JSON-LD is generated from the same data — so editing a role here updates the
// page copy, the listing card, and the structured data together.
//
// To publish a new role: add an object to ROLES.
// To close one: set `open: false` (keeps the URL alive) or remove it.
//
// EDIT BEFORE PUBLISHING — these fields encode hiring decisions, not facts the
// site already knows. Defaults below are best-grounded guesses, not commitments:
//   • engagement      — contract vs permanent (shown on the page)
//   • employmentType   — drives Google for Jobs structured data
//   • location / remote — where the person can sit
//   • compensation     — optional; shown on the page only when set
// ---------------------------------------------------------------------------

export const APPLY_EMAIL = 'contact@aesciahealth.com'

export type RoleResponsibility = { title: string; body: string }

export type Role = {
  slug: string
  open: boolean
  title: string
  /** One line for the index card and the meta description. */
  summary: string
  /** "At a glance" facts shown on the detail page. */
  team: string
  engagement: string
  location: string
  locationNote: string
  reportsTo: string
  /** Optional. Rendered on the page only when set. */
  compensation?: string
  stack: string[]
  /** Google for Jobs structured-data fields. */
  datePosted: string // ISO yyyy-mm-dd
  employmentType: string[] // FULL_TIME | PART_TIME | CONTRACTOR ...
  remote: boolean
  applicantCountries: string[] // ISO country names, used for remote roles
  /** Page body. */
  mission: string[]
  responsibilities: RoleResponsibility[]
  requirements: string[]
  bonus: string[]
  howWeWork: string[]
  applyIntro: string
  applyChecklist: string[]
}

const seniorFrontendEngineer: Role = {
  slug: 'senior-frontend-engineer',
  open: true,
  title: 'Senior Frontend / Full-Stack Engineer',
  summary:
    'Own the front end of a medical platform: the patient and clinician apps, plus a research dashboard. Vue 3 first, with React for analytics. Remote, working closely with our CTO.',
  team: 'Engineering',
  engagement: 'Senior, contract or permanent',
  location: 'Remote, Québec preferred',
  locationNote:
    'Québec preferred, then elsewhere in Canada. We will consider strong candidates anywhere, as long as there is enough timezone overlap to work closely with the CTO.',
  reportsTo: 'CTO',
  // compensation left unset on purpose. Add a band here to display it.
  stack: [
    'Vue 3',
    'TypeScript',
    'React',
    'Tailwind CSS',
    'TanStack Query',
    'Pinia',
    'FastAPI',
    'Google Cloud',
    'Terraform',
  ],
  datePosted: '2026-05-30',
  employmentType: ['CONTRACTOR', 'FULL_TIME'],
  remote: true,
  applicantCountries: ['Canada'],
  mission: [
    'We are hiring a senior frontend / full-stack engineer who can work remotely and largely independently, in close partnership with our CTO. You will build the next versions of our patient-facing and clinician-facing apps. A native phone app is on the roadmap, but it is down the road, not the first job.',
    'Aescia builds continuous-care software for the period between hospital discharge and the next appointment, the stretch where patients deteriorate and no one is watching. Two products run on one platform: a regulated post-discharge monitoring system for hospitals, and pre-admission patient engagement for specialty clinics.',
  ],
  responsibilities: [
    {
      title: 'Build the patient and clinician apps',
      body: 'The next versions of both, in Vue 3 with the Composition API. Clean, readable, maintainable code a future teammate can pick up without a guided tour.',
    },
    {
      title: 'Build the analytics and research dashboard',
      body: 'In React, for its data-visualization ecosystem (Recharts, Nivo, Visx). Charts and analytics tools for research staff.',
    },
    {
      title: 'Handle real-time medical alerts',
      body: 'Time-sensitive clinical notifications over WebSockets, with heartbeat and reconnection logic robust enough for hospital networks.',
    },
    {
      title: 'Build the multi-tenant white-label system',
      body: 'Deep per-tenant theming (logos, colours, themes) loaded at runtime from configuration, using CSS custom properties. One bundle serves every tenant.',
    },
    {
      title: 'Handle patient data securely',
      body: 'Encrypted local caching of patient questionnaires with IndexedDB (Dexie.js), and secure file uploads through pre-signed URLs.',
    },
    {
      title: 'Own a shared, typed foundation',
      body: 'A shared component library (Tailwind design system and tokens) across the apps, consuming a typed API client generated from the backend OpenAPI contract, never hand-written, so a backend change surfaces as a compile error.',
    },
  ],
  requirements: [
    'Expert-level TypeScript and modern JavaScript.',
    'Strong proficiency in Vue 3, and comfortable in React.',
    'Professional experience with TanStack Query (Vue Query or React Query) and Pinia.',
    'Expert Tailwind CSS, and runtime theming with CSS custom properties.',
    'Comfortable with Google Cloud Platform and Terraform-managed infrastructure.',
    'Experience running WebSockets in high-availability settings.',
    'A working understanding of browser security models, Content Security Policy (CSP), and the handling of personally identifiable information (PII) in a medical context.',
  ],
  bonus: [
    'You can package the patient app for the App Store and Play Store with Capacitor, or ship it as an installable progressive web app (PWA).',
    'You have used Nx or Turborepo to manage a monorepo.',
    'You can read and extend a Python and FastAPI codebase.',
    'You have built white-label software-as-a-service before.',
    'You understand HIPAA or similar medical-data compliance.',
  ],
  howWeWork: [
    'You own the front-end architecture and work largely independently, in close partnership with the CTO. We do not ship spaghetti. We value clean, scannable code.',
    'We are a small, clinician-led team. The clinical pathways are written by practising clinicians, and the people who build the product talk to the people who use it.',
    'The product is real and in clinical evaluation today, not a roadmap. You can read the platform and the evidence behind it on this site before you ever talk to us.',
  ],
  applyIntro:
    'Send a short note about what you have built, with anything that shows your work. No cover letter needed.',
  applyChecklist: [
    'A résumé or LinkedIn profile.',
    'A GitHub profile, portfolio, or a couple of links to things you have shipped.',
    'One or two lines on a front-end architecture decision you made, and why.',
  ],
}

export const ROLES: Role[] = [seniorFrontendEngineer]

export const OPEN_ROLES = ROLES.filter((r) => r.open)

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug)
}

/**
 * Builds the HTML description string for JobPosting JSON-LD. Google for Jobs
 * expects a complete, self-contained description in HTML, so we assemble it
 * from the same structured data the page renders.
 */
export function roleDescriptionHtml(role: Role): string {
  const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`
  const respUl = (items: RoleResponsibility[]) =>
    `<ul>${items.map((i) => `<li><strong>${i.title}.</strong> ${i.body}</li>`).join('')}</ul>`
  return [
    role.mission.map((p) => `<p>${p}</p>`).join(''),
    '<h3>What you will build</h3>',
    respUl(role.responsibilities),
    '<h3>What we are looking for</h3>',
    ul(role.requirements),
    '<h3>Bonus points</h3>',
    ul(role.bonus),
  ].join('')
}
