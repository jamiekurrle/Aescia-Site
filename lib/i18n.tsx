'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Locale = 'en' | 'fr'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Brand
    'brand.name': 'Aescia',

    // Regulatory safe-harbor band (persistent)
    'regband.body': 'Aescia for Hospitals is an investigational Software as a Medical Device. It has not received marketing authorisation in any jurisdiction and is not available for commercial supply. Aescia for Clinics is a workflow platform and is not a medical device.',
    'regband.dismiss': 'Dismiss',

    // Nav
    'nav.platform': 'Platform',
    'nav.hospitals': 'For Hospitals',
    'nav.clinics': 'For Clinics',
    'nav.evidence': 'Evidence',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    'nav.cta': 'Request a briefing',
    'nav.skip': 'Skip to content',
    'nav.primary': 'Primary',
    'nav.menu.open': 'Open menu',
    'nav.menu.close': 'Close menu',
    'nav.menu.expanded': 'Menu open',

    // Hero (home)
    'hero.eyebrow': 'A continuous-care platform',
    'hero.title': 'Between the discharge and the next appointment, someone should be listening.',
    'hero.subtitle': 'A platform for structured patient follow-up and specialty-clinic workflow. Two products on one engine: one for surgical recovery, one for procedural preparation.',
    'hero.cta.primary': 'Explore the platform',
    'hero.cta.secondary': 'Talk to our team',
    'hero.trial.label': 'Active clinical programme',
    'hero.trial.brief': 'SAFE-Discharge, 500 patients',
    'hero.trial.site': 'Royal Prince Alfred Hospital, Sydney',

    // Audience split
    'split.hospital.eyebrow': 'For Hospitals',
    'split.hospital.regtag': 'Medical device, in evaluation',
    'split.hospital.title': 'Post-surgical recovery, observed.',
    'split.hospital.desc': 'A structured follow-up layer for cardiothoracic surgery and other high-acuity discharges. Daily patient check-ins, transparent rule-based prioritisation, one prioritised clinical list for the nursing team.',
    'split.hospital.cta': 'Aescia for Hospitals',
    'split.clinic.eyebrow': 'For Clinics',
    'split.clinic.regtag': 'Not a medical device',
    'split.clinic.title': 'Better prep. Lists that run on time.',
    'split.clinic.desc': 'Pre-procedure pathways for endoscopy and other specialty clinics. SMS-first prep, diabetic, anticoagulant, and GLP-1 overlays, recall management, fewer phone calls to the front desk.',
    'split.clinic.cta': 'Aescia for Clinics',

    // Trust strip (operational, not clinical)
    'trust.item1.value': 'ISO 27001',
    'trust.item1.label': 'aligned SDLC',
    'trust.item2.value': 'IEC 62304',
    'trust.item2.label': 'software lifecycle',
    'trust.item3.value': 'In-region',
    'trust.item3.label': 'data residency',
    'trust.item4.value': 'SSO, SAML, OIDC',
    'trust.item4.label': 'enterprise identity',

    // Platform blurb (home)
    'platform.eyebrow': 'One engine. Two doorways.',
    'platform.title': 'A composable pathway engine, applied twice.',
    'platform.body': 'Every Aescia pathway is a sequence of five step types: Collect a structured signal, Follow a clinician-authored rule, Remind the patient, Educate at the right moment, Export the structured record. We build the engine once and apply it to the two moments where care most often falls apart: the week after discharge, and the week before a scheduled procedure.',
    'platform.pill.collect': 'Collect',
    'platform.pill.follow': 'Follow',
    'platform.pill.remind': 'Remind',
    'platform.pill.educate': 'Educate',
    'platform.pill.export': 'Export',

    // Why Aescia (three pillars)
    'pillars.title': 'Why this, why now.',
    'pillars.transparent.title': 'Transparent by design',
    'pillars.transparent.desc': 'Rule-based prioritisation, authored by clinicians. No opaque models. Every flag is explainable to the nurse it lands with and to the committee that asks.',
    'pillars.clinician.title': 'Clinician-authored',
    'pillars.clinician.desc': 'Pathways are written by practising surgeons, gastroenterologists, and nurses. We do not ship a disease we did not learn from the people who treat it.',
    'pillars.dual.title': 'Two products, one engine',
    'pillars.dual.desc': 'A regulated pathway for surgical recovery and a workflow pathway for procedural clinics share the same authoring layer, the same audit trail, the same team.',

    // Evidence ribbon (home)
    'evidence.eyebrow': 'Where we are today',
    'evidence.title': 'Clinical programme in active enrolment.',
    'evidence.body': 'The SAFE-Discharge trial is a 500-patient, single-centre evaluation of Aescia for post-cardiothoracic-surgery discharge monitoring at the Royal Prince Alfred Hospital cardiothoracic unit in Sydney. Led by Dr Kei Woldendorp, Principal Investigator, with Professor Paul Bannon as senior departmental sponsor. Aescia for Hospitals has an intended Class IIa classification under TGA Rule 3.4; a regulatory application has not yet been lodged. Aescia for Clinics is a workflow tool that does not propose clinical decisions and is not a medical device.',
    'evidence.fact1.value': 'ACTRN12625001425482',
    'evidence.fact1.label': 'Trial registration',
    'evidence.fact2.value': '500',
    'evidence.fact2.label': 'Patients, single centre',
    'evidence.fact3.value': 'Class IIa',
    'evidence.fact3.label': 'Intended classification',
    'evidence.cta': 'Read the evidence page',

    // CTA
    'cta.title': 'Ready to see the platform?',
    'cta.subtitle': 'A thirty-minute call with someone on the clinical team. We show the worklist, the pathway editor, and what the week after surgery or the night before a colonoscopy actually looks like.',
    'cta.button': 'Request a briefing',

    // Footer
    'footer.tagline': 'A continuous-care platform for the weeks that matter.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.platform': 'Platform',
    'footer.hospitals': 'For Hospitals',
    'footer.clinics': 'For Clinics',
    'footer.evidence': 'Evidence',
    'footer.team': 'Team',
    'footer.governance': 'Governance',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.health': 'A continuous-care platform.',
    'footer.disclosure': 'Aescia for Hospitals is an investigational Software as a Medical Device, intended Class IIa under TGA Rule 3.4, application not yet lodged. It is in clinical evaluation through the SAFE-Discharge trial and is not available for commercial supply. Aescia for Clinics is a workflow platform and is not a medical device.',

    // Hospitals page
    'hospitals.eyebrow': 'For Hospitals',
    'hospitals.title': 'The quietest days after surgery carry the loudest risk.',
    'hospitals.subtitle': 'Aescia for Hospitals is a post-surgical recovery monitoring platform, built first for cardiothoracic surgery. Structured daily check-ins, clinician-authored prioritisation, one list for the nursing team. In clinical evaluation through the SAFE-Discharge trial at a major Australian cardiothoracic unit.',
    'hospitals.cta.primary': 'Request a health-system briefing',
    'hospitals.cta.secondary': 'Read the trial summary',
    'hospitals.status.label': 'Status',
    'hospitals.status.title': 'In clinical evaluation through the SAFE-Discharge trial.',
    'hospitals.status.body': 'Aescia for Hospitals has an intended Class IIa classification under TGA Rule 3.4. A regulatory application has not yet been lodged. Engagement today is through evaluation and pilot contracts only. This page does not recruit trial participants.',

    // Leadership
    'hospitals.leadership.eyebrow': 'Clinical leadership',
    'hospitals.leadership.title': 'Authored by the people who will read the worklist.',
    'hospitals.leadership.body': 'The pathway engine for cardiothoracic recovery has been shaped by senior clinicians in active practice. These are the people whose names are on the trial, and whose judgment shapes every rule.',
    'hospitals.leadership.bannon.name': 'Professor Paul Bannon',
    'hospitals.leadership.bannon.title': 'Bosch Chair of Surgery, University of Sydney',
    'hospitals.leadership.bannon.aff': 'Head of Cardiothoracic Surgery, Royal Prince Alfred Hospital and Strathfield Private. Chair, The Baird Institute.',
    'hospitals.leadership.bannon.role': 'Senior departmental sponsor, SAFE-Discharge trial.',
    'hospitals.leadership.woldendorp.name': 'Dr Kei Woldendorp',
    'hospitals.leadership.woldendorp.title': 'BMed MBBS MPhil, Cardiothoracic research',
    'hospitals.leadership.woldendorp.aff': 'The Baird Institute, Royal Prince Alfred Hospital. 25+ peer-reviewed publications in cardiothoracic care.',
    'hospitals.leadership.woldendorp.role': 'Principal Investigator, SAFE-Discharge trial. Clinical Advisor, Aescia for Hospitals.',
    'hospitals.leadership.horrigan.name': 'Associate Professor Mark Horrigan',
    'hospitals.leadership.horrigan.title': 'Cardiology, Austin Health',
    'hospitals.leadership.horrigan.aff': 'Cardiovascular Clinical Lead, Safer Care Victoria. Post-discharge cardiac monitoring research published in Heart.',
    'hospitals.leadership.horrigan.role': 'External clinical reviewer for cardiac pathway design.',

    'hospitals.complications.title': 'What we listen for after cardiothoracic surgery.',
    'hospitals.complications.body': 'Pathways are authored by surgeons and nurses who live in this population. Each signal carries a named rule and a named escalation. The clinician remains the decision-maker.',
    'hospitals.complications.item1.title': 'Sternal wound',
    'hospitals.complications.item1.desc': 'Mandatory baseline and weekly photographic review, prioritised against a structured change-over-time rule set authored with the operating surgeons.',
    'hospitals.complications.item2.title': 'Sternal dehiscence',
    'hospitals.complications.item2.desc': 'Mechanical integrity signals distinct from infection. Cough, instability on movement, click-on-palpation prompts, routed direct to the operating team.',
    'hospitals.complications.item3.title': 'New-onset atrial fibrillation',
    'hospitals.complications.item3.desc': 'Rate, rhythm, and symptom capture windowed against the common post-cardiac-surgery AF timeline. Anticoagulation status and last-dose surfaced on the card.',
    'hospitals.complications.item4.title': 'Heart failure decompensation',
    'hospitals.complications.item4.desc': 'Daily weight, exertional symptom, and orthopnoea tracking against patient-specific thresholds set by the cardiology team.',
    'hospitals.complications.item5.title': 'Pleural and pericardial effusion',
    'hospitals.complications.item5.desc': 'Breathlessness and positional symptom rules that prompt the team to re-image rather than react. Cross-referenced with recent imaging where integrated.',
    'hospitals.complications.item6.title': 'Bleeding',
    'hospitals.complications.item6.desc': 'Anticoagulation-aware signals surfaced to the surgical team before the patient would otherwise call. Routing is to the registrar on take, not a generic inbox.',
    'hospitals.complications.item7.title': 'Stroke and new neurology',
    'hospitals.complications.item7.desc': 'FAST-style self-report prompts, focal symptom flags, and a same-day in-person review pathway. Relevant after valve and aortic work where embolic risk is material.',
    'hospitals.complications.item8.title': 'Infection and systemic deterioration',
    'hospitals.complications.item8.desc': 'Vitals, wound, and constitutional-symptom capture that surfaces to the team using the institution\'s own escalation policy.',

    // Worklist preview
    'hospitals.workflow.title': 'What a nurse sees on Monday morning.',
    'hospitals.workflow.body': 'Not a new portal, not an inbox. A list of named patients, ordered by rule-based urgency, each with the reason they surfaced, the last response, and a one-tap clinician action.',
    'hospitals.workflow.preview.header': 'Discharge cohort · Mon 14 Apr',
    'hospitals.workflow.preview.count': '42 active',
    'hospitals.workflow.preview.note1': 'Illustrative preview',
    'hospitals.workflow.preview.note2': 'Live view is configured to your escalation policy',

    // Wound photo standalone
    'hospitals.wound.eyebrow': 'Sternal wound protocol',
    'hospitals.wound.title': 'Every wound, every week, time-stamped to the patient record.',
    'hospitals.wound.body': 'Mandatory at discharge. Weekly thereafter. The patient is prompted, the image is stored against the patient record with time and device metadata, and the operating surgeon can see their own work at day 7, 14, and 30. The rule set looks for expanding erythema, dehiscence, sinus formation, and discharge change.',
    'hospitals.wound.stat1.value': 'Day 0, 7, 14, 30',
    'hospitals.wound.stat1.label': 'Minimum protocol cadence',
    'hospitals.wound.stat2.value': 'Time-stamped',
    'hospitals.wound.stat2.label': 'Stored against the patient record',
    'hospitals.wound.stat3.value': 'Surgeon review',
    'hospitals.wound.stat3.label': 'The operating team sees their own work',

    // Signal to noise
    'hospitals.noise.eyebrow': 'The cost of a false flag',
    'hospitals.noise.title': 'Fewer alerts. Each one earned.',
    'hospitals.noise.body': 'A post-discharge platform that flags everything is a platform no nurse will read. SAFE-Discharge includes alert burden as a pre-specified secondary outcome: the target is fewer than one nurse-actionable flag per patient per week over the 14-day post-discharge window, with documented review of every higher-urgency signal. We will report the number, whatever it is.',
    'hospitals.noise.target.label': 'Target',
    'hospitals.noise.target.value': '< 1 flag per patient per week',
    'hospitals.noise.endpoint.label': 'Endpoint',
    'hospitals.noise.endpoint.value': 'Pre-specified in SAFE-Discharge',

    // Roster fit
    'hospitals.roster.eyebrow': 'How this fits your roster',
    'hospitals.roster.title': 'Additive to the day, not additive to the headcount.',
    'hospitals.roster.body': 'The worklist is owned by existing nursing roles, not a new role. After-hours routing is agreed with your on-call registrar and hospital switchboard before go-live. When a patient is readmitted or a MET is called, Aescia alerts mute automatically. The NUM sees who owns the list by shift, and can audit every routed alert.',
    'hospitals.roster.item1.title': 'Shift ownership',
    'hospitals.roster.item1.desc': 'Named nursing role per shift, agreed with the NUM. Handover between shifts routes the list as part of the existing verbal handover.',
    'hospitals.roster.item2.title': 'After-hours routing',
    'hospitals.roster.item2.desc': 'Higher-urgency signals route to the on-call surgical registrar after agreed hours. Configured per site, not a vendor default.',
    'hospitals.roster.item3.title': 'Automatic mute',
    'hospitals.roster.item3.desc': 'When a patient is readmitted or a MET is active, Aescia alerts for that patient are suppressed until the team re-enables them.',

    // Trial
    'hospitals.trial.eyebrow': 'Active clinical programme',
    'hospitals.trial.title': 'The SAFE-Discharge trial.',
    'hospitals.trial.body': 'A prospective 500-patient single-centre evaluation of Aescia for cardiothoracic post-discharge monitoring. Registered with the Australian New Zealand Clinical Trials Registry. First participants expected following ethics and governance approval. Interim analysis pre-specified at 50 patients, full analysis at 500.',
    'hospitals.trial.not_recruiting': 'This page does not recruit trial participants. Enrolment is through the Royal Prince Alfred Hospital cardiothoracic unit under ethics approval.',
    'hospitals.trial.id': 'ACTRN12625001425482',
    'hospitals.trial.site': 'Royal Prince Alfred Hospital, Sydney',
    'hospitals.trial.unit': 'Cardiothoracic Surgery Unit',
    'hospitals.trial.cta': 'Request the protocol summary',

    // Procurement path
    'hospitals.path.title': 'How health systems engage with us.',
    'hospitals.path.step1.title': 'Scoped evaluation',
    'hospitals.path.step1.desc': 'Eight to twelve weeks, single service line, research-use framing, no commercial supply. Used to confirm the pathway fits your population and your escalation structure.',
    'hospitals.path.step2.title': 'Supervised pilot',
    'hospitals.path.step2.desc': 'Six months, one to two service lines, agreed success metrics, data-sharing agreement, joint publication option. Followed by a decision to continue.',
    'hospitals.path.step3.title': 'Enterprise deployment',
    'hospitals.path.step3.desc': 'Enterprise deployment is available only in jurisdictions where Aescia for Hospitals has received the applicable regulatory authorisation (ARTG inclusion in Australia, equivalent authorisations elsewhere). Not available for commercial supply prior to that authorisation.',

    // Integration
    'hospitals.integration.title': 'It fits where your team already works.',
    'hospitals.integration.body': 'Single sign-on via SAML or OIDC. Inbound enrolment over HL7 v2 ADT or FHIR R4 Encounter. Optional outbound flowsheet or note write-back. Designed to be an additional signal the nursing team already knows how to route, not a new portal to staff.',

    // Clinics page
    'clinics.eyebrow': 'For Clinics',
    'clinics.title': 'Better prep. Fewer no-shows. Less phone work.',
    'clinics.subtitle': 'Aescia for Clinics is a workflow platform for specialty clinics, with endoscopy as the first home. Text-message-driven pre-procedure pathways. Diabetic, anticoagulant, and GLP-1 overlays. Recall tracking that stops slipping. It does not propose clinical decisions. It is not a medical device.',
    'clinics.cta.primary': 'See a clinic demo',
    'clinics.cta.secondary': 'See pricing posture',
    'clinics.posture.label': 'Posture',
    'clinics.posture.title': 'Not a medical device. Not a decision tool.',
    'clinics.posture.body': 'A workflow and patient-preparation platform. Does not diagnose, does not treat, does not propose clinical decisions.',

    'clinics.features.title': 'Nine things that run the day-to-day.',
    'clinics.features.item1.title': 'Prep pathways that adapt',
    'clinics.features.item1.desc': 'Pick the prep your clinic uses. The pathway adapts to the patient in front of it. Diabetic, IBD, constipation, prior-failed-prep, elderly, all covered without rewriting the page.',
    'clinics.features.item2.title': 'No-show reduction',
    'clinics.features.item2.desc': 'Timed reminders in the patient language, a confirm-and-reschedule path built in, a same-day flag your front desk can actually act on. Waitlist auto-fill on cancellation.',
    'clinics.features.item3.title': 'GLP-1 handling',
    'clinics.features.item3.desc': 'Patient self-reports the medication and the dose. The pathway delivers the clinician-authored instruction that corresponds to the patient\'s report, aligned with the 2024 multi-society guidance and the 2025 international consensus. Decisions remain with the proceduralist.',
    'clinics.features.item4.title': 'Diabetic and anticoagulant overlays',
    'clinics.features.item4.desc': 'SGLT2, metformin, DOAC, and warfarin scenarios delivered as clinician-authored instructions, generated from the patient\'s answers. The clinician signs off the rule set, not the vendor.',
    'clinics.features.item5.title': 'Prep-night photo review',
    'clinics.features.item5.desc': 'The evening before, the patient can send a toilet-bowl photo. The pathway auto-rates it against a clinician-set rubric and either confirms the slot or triggers rescheduling before the patient leaves home.',
    'clinics.features.item6.title': 'Call deflection',
    'clinics.features.item6.desc': 'Two-way SMS answers the top twenty prep questions before they reach the front desk, using templated clinician-authored responses. The clinic sees the exceptions, not every text.',
    'clinics.features.item7.title': 'Surveillance and recall',
    'clinics.features.item7.desc': 'High-risk polyp follow-up and surveillance intervals do not rely on a spreadsheet anyone might miss. Named patients, named dates, named triggers, aligned with USMSTF and NHMRC interval guidance.',
    'clinics.features.item8.title': 'Integration-friendly',
    'clinics.features.item8.desc': 'Works alongside common endoscopy reporting (Provation, EndoWorks, gGastro) and practice-management systems. Adds a signal layer without a second login for your team.',
    'clinics.features.item9.title': 'Single-site friendly',
    'clinics.features.item9.desc': 'Configured by one clinic admin in an afternoon. Flat monthly pricing per specialty. Live in two weeks, not two quarters.',

    'clinics.vocab.title': 'Built for the ambulatory rhythm.',
    'clinics.vocab.body': 'This is not a hospital discharge tool dressed for a clinic. It is a prep and workflow product with its own authored protocols, its own SMS layer, and its own vocabulary: today\'s list, room utilisation, case turnover, prep adequacy, recall compliance.',

    'clinics.regions.title': 'Prep brands by region.',
    'clinics.regions.body': 'The pathway covers regional brand equivalents across the markets we support. Clinicians in each country see the prep names their patients see on the shelf.',
    'clinics.regions.us.label': 'United States',
    'clinics.regions.us.value': 'SuPrep, SuTab, CLENPIQ, GoLytely, NuLYTELY',
    'clinics.regions.ca.label': 'Canada',
    'clinics.regions.ca.value': 'PegLyte, PICO-SALAX, CLENPIQ, Bi-PEG-Lyte',
    'clinics.regions.au.label': 'Australia and New Zealand',
    'clinics.regions.au.value': 'Glycoprep, Picoprep, MoviPrep, Plenvu',
    'clinics.regions.uk.label': 'United Kingdom and EU',
    'clinics.regions.uk.value': 'Plenvu, Moviprep, Citrafleet',

    'clinics.specialties.title': 'Specialties we already support.',
    'clinics.specialties.body': 'Pathway coverage is live for colonoscopy and gastroscopy, with regional bowel-prep variants and specialty overlays. The same engine is extending into physiotherapy post-discharge, aesthetics, and other efficiency-seeking specialties through 2026 and 2027.',

    'clinics.pricing.title': 'Pricing posture.',
    'clinics.pricing.body': 'Flat monthly by specialty at the single-site level, consumption-aligned at scale. Starts below the cost of one missed no-show per week. We publish a posture, not a list: clinics pay for a specialty protocol they can deploy inside two weeks, and scale adds protocols, not friction.',

    // Platform page
    'platformpg.eyebrow': 'Platform',
    'platformpg.title': 'The engine underneath both products.',
    'platformpg.body': 'Aescia is one engine with two doorways. The same composable pathway authoring, the same audit trail, the same patient-facing SMS layer, the same team. The regulated posture of the hospital product lifts the standard of the clinic product, and the workflow velocity of the clinic product keeps the hospital product honest about what a busy team will actually adopt.',
    'platformpg.ls.eyebrow': 'Life sciences adjacency',
    'platformpg.ls.title': 'A pathway engine, extensible to therapy-specific use.',
    'platformpg.ls.body': 'The engine already encodes drug-level rules (GLP-1, SGLT2, DOAC, warfarin). Any clinician-authored pathway extends it. The same primitives (structured collection, authored triage, SMS delivery, audit trail, structured export) are the primitives that underpin modern patient support programs, registries, and real-world evidence collection. We design for this extensibility; we do not name therapies we have not deployed.',

    // Governance page
    'governance.eyebrow': 'Governance',
    'governance.title': 'Honest posture, documented.',
    'governance.body': 'Aescia runs two products with different regulatory postures. The Hospitals product is an investigational medical device with an intended Class IIa classification; a regulatory application has not yet been lodged. The Clinics product is a workflow tool that is not a medical device and is not represented as one. This page states what each is, and what each is not.',

    // Language switcher label
    'lang.switch': 'FR',
    'lang.switch.aria': 'Switch to French',
  },
  fr: {
    'brand.name': 'Aescia',

    'regband.body': 'Aescia pour les hôpitaux est un logiciel dispositif médical en investigation. Il n\'a reçu aucune autorisation de mise sur le marché et n\'est pas disponible pour la fourniture commerciale. Aescia pour les cliniques est une plateforme de flux de travail et n\'est pas un dispositif médical.',
    'regband.dismiss': 'Fermer',

    'nav.platform': 'Plateforme',
    'nav.hospitals': 'Pour les hôpitaux',
    'nav.clinics': 'Pour les cliniques',
    'nav.evidence': 'Preuves',
    'nav.team': 'Équipe',
    'nav.contact': 'Contact',
    'nav.cta': 'Demander un briefing',
    'nav.skip': 'Aller au contenu',
    'nav.primary': 'Principal',
    'nav.menu.open': 'Ouvrir le menu',
    'nav.menu.close': 'Fermer le menu',
    'nav.menu.expanded': 'Menu ouvert',

    'hero.eyebrow': 'Une plateforme de soins continus',
    'hero.title': 'Entre la sortie et le prochain rendez-vous, quelqu\'un devrait écouter.',
    'hero.subtitle': 'Une plateforme pour le suivi structuré des patients et le flux de travail en clinique spécialisée. Deux produits sur un moteur : un pour la récupération chirurgicale, un pour la préparation procédurale.',
    'hero.cta.primary': 'Explorer la plateforme',
    'hero.cta.secondary': 'Contacter notre équipe',
    'hero.trial.label': 'Programme clinique actif',
    'hero.trial.brief': 'SAFE-Discharge, 500 patients',
    'hero.trial.site': 'Royal Prince Alfred Hospital, Sydney',

    'split.hospital.eyebrow': 'Pour les hôpitaux',
    'split.hospital.regtag': 'Dispositif médical, en évaluation',
    'split.hospital.title': 'La récupération post-chirurgicale, observée.',
    'split.hospital.desc': 'Une couche de suivi structuré pour la chirurgie cardiothoracique et les autres sorties à haute acuité. Suivis quotidiens, priorisation par règles transparentes, une seule liste clinique priorisée pour l\'équipe infirmière.',
    'split.hospital.cta': 'Aescia pour les hôpitaux',
    'split.clinic.eyebrow': 'Pour les cliniques',
    'split.clinic.regtag': 'Pas un dispositif médical',
    'split.clinic.title': 'Mieux préparer. Des listes qui tiennent.',
    'split.clinic.desc': 'Parcours pré-procéduraux pour l\'endoscopie et d\'autres cliniques spécialisées. Rappels SMS, superpositions diabète, anticoagulants et GLP-1, gestion des rappels, moins d\'appels au secrétariat.',
    'split.clinic.cta': 'Aescia pour les cliniques',

    'trust.item1.value': 'ISO 27001',
    'trust.item1.label': 'SDLC aligné',
    'trust.item2.value': 'IEC 62304',
    'trust.item2.label': 'Cycle logiciel',
    'trust.item3.value': 'En région',
    'trust.item3.label': 'Résidence des données',
    'trust.item4.value': 'SSO, SAML, OIDC',
    'trust.item4.label': 'Identité entreprise',

    'platform.eyebrow': 'Un moteur. Deux portes.',
    'platform.title': 'Un moteur de parcours composable, appliqué deux fois.',
    'platform.body': 'Chaque parcours Aescia est une séquence de cinq types d\'étapes : Collecter un signal structuré, Suivre une règle rédigée par le clinicien, Rappeler au patient, Éduquer au bon moment, Exporter le dossier structuré. Nous construisons le moteur une fois et l\'appliquons aux deux moments où les soins s\'effritent le plus souvent : la semaine après la sortie, et la semaine avant une procédure programmée.',
    'platform.pill.collect': 'Collecter',
    'platform.pill.follow': 'Suivre',
    'platform.pill.remind': 'Rappeler',
    'platform.pill.educate': 'Éduquer',
    'platform.pill.export': 'Exporter',

    'pillars.title': 'Pourquoi ceci, pourquoi maintenant.',
    'pillars.transparent.title': 'Transparent par conception',
    'pillars.transparent.desc': 'Priorisation par règles, rédigée par des cliniciens. Aucun modèle opaque. Chaque signal est explicable à l\'infirmier qui le reçoit et au comité qui le demande.',
    'pillars.clinician.title': 'Rédigé par des cliniciens',
    'pillars.clinician.desc': 'Les parcours sont écrits par des chirurgiens, gastroentérologues et infirmiers en exercice. Nous ne livrons pas une maladie que nous n\'avons pas apprise auprès de ceux qui la traitent.',
    'pillars.dual.title': 'Deux produits, un moteur',
    'pillars.dual.desc': 'Un parcours régulé pour la récupération chirurgicale et un parcours de flux de travail pour les cliniques procédurales partagent la même couche d\'édition, le même journal d\'audit, la même équipe.',

    'evidence.eyebrow': 'Où nous en sommes',
    'evidence.title': 'Programme clinique en recrutement actif.',
    'evidence.body': 'L\'essai SAFE-Discharge est une évaluation mono-centrique à 500 patients d\'Aescia pour la surveillance post-sortie de chirurgie cardiothoracique au Royal Prince Alfred Hospital à Sydney. Mené par le Dr Kei Woldendorp, investigateur principal, avec le Professeur Paul Bannon comme parrain départemental senior. Aescia pour les hôpitaux a une classification Classe IIa prévue selon la règle TGA 3.4 ; la demande réglementaire n\'a pas encore été déposée. Aescia pour les cliniques est un outil de flux de travail qui ne propose pas de décision clinique et n\'est pas un dispositif médical.',
    'evidence.fact1.value': 'ACTRN12625001425482',
    'evidence.fact1.label': 'Enregistrement',
    'evidence.fact2.value': '500',
    'evidence.fact2.label': 'Patients, mono-centrique',
    'evidence.fact3.value': 'Classe IIa',
    'evidence.fact3.label': 'Classification prévue',
    'evidence.cta': 'Lire la page preuves',

    'cta.title': 'Prêt à voir la plateforme ?',
    'cta.subtitle': 'Un appel de trente minutes avec un membre de l\'équipe clinique. Nous montrons la liste de travail, l\'éditeur de parcours, et ce à quoi ressemble vraiment la semaine après la chirurgie ou la veille d\'une coloscopie.',
    'cta.button': 'Demander un briefing',

    'footer.tagline': 'Une plateforme de soins continus pour les semaines qui comptent.',
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.legal': 'Légal',
    'footer.platform': 'Plateforme',
    'footer.hospitals': 'Pour les hôpitaux',
    'footer.clinics': 'Pour les cliniques',
    'footer.evidence': 'Preuves',
    'footer.team': 'Équipe',
    'footer.governance': 'Gouvernance',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.health': 'Une plateforme de soins continus.',
    'footer.disclosure': 'Aescia pour les hôpitaux est un logiciel dispositif médical en investigation, Classe IIa prévue selon la règle TGA 3.4, demande non encore déposée. Il est en évaluation clinique via l\'essai SAFE-Discharge et n\'est pas disponible pour la fourniture commerciale. Aescia pour les cliniques est une plateforme de flux de travail et n\'est pas un dispositif médical.',

    'hospitals.eyebrow': 'Pour les hôpitaux',
    'hospitals.title': 'Les jours les plus silencieux après la chirurgie portent le risque le plus fort.',
    'hospitals.subtitle': 'Aescia pour les hôpitaux est une plateforme de surveillance post-chirurgicale, conçue d\'abord pour la chirurgie cardiothoracique. Suivis quotidiens structurés, priorisation rédigée par les cliniciens, une seule liste pour l\'équipe infirmière. En évaluation clinique via l\'essai SAFE-Discharge dans un grand service de chirurgie cardiothoracique australien.',
    'hospitals.cta.primary': 'Demander un briefing hospitalier',
    'hospitals.cta.secondary': 'Lire le résumé de l\'essai',
    'hospitals.status.label': 'Statut',
    'hospitals.status.title': 'En évaluation clinique via l\'essai SAFE-Discharge.',
    'hospitals.status.body': 'Aescia pour les hôpitaux a une classification Classe IIa prévue selon la règle TGA 3.4. Une demande réglementaire n\'a pas encore été déposée. L\'engagement se fait aujourd\'hui uniquement par contrats d\'évaluation et pilotes. Cette page ne recrute pas de participants à l\'essai.',

    'hospitals.leadership.eyebrow': 'Direction clinique',
    'hospitals.leadership.title': 'Rédigé par les personnes qui liront la liste de travail.',
    'hospitals.leadership.body': 'Le moteur de parcours pour la récupération cardiothoracique a été façonné par des cliniciens seniors en exercice. Ce sont les personnes dont les noms figurent sur l\'essai et dont le jugement façonne chaque règle.',
    'hospitals.leadership.bannon.name': 'Professeur Paul Bannon',
    'hospitals.leadership.bannon.title': 'Bosch Chair of Surgery, University of Sydney',
    'hospitals.leadership.bannon.aff': 'Chef de Chirurgie Cardiothoracique, Royal Prince Alfred Hospital et Strathfield Private. Président, The Baird Institute.',
    'hospitals.leadership.bannon.role': 'Parrain départemental senior, essai SAFE-Discharge.',
    'hospitals.leadership.woldendorp.name': 'Dr Kei Woldendorp',
    'hospitals.leadership.woldendorp.title': 'BMed MBBS MPhil, Recherche cardiothoracique',
    'hospitals.leadership.woldendorp.aff': 'The Baird Institute, Royal Prince Alfred Hospital. 25+ publications évaluées par les pairs en soins cardiothoraciques.',
    'hospitals.leadership.woldendorp.role': 'Investigateur principal, essai SAFE-Discharge. Conseiller clinique, Aescia pour les hôpitaux.',
    'hospitals.leadership.horrigan.name': 'Professeur associé Mark Horrigan',
    'hospitals.leadership.horrigan.title': 'Cardiologie, Austin Health',
    'hospitals.leadership.horrigan.aff': 'Responsable clinique cardiovasculaire, Safer Care Victoria. Recherche publiée dans Heart en surveillance cardiaque post-sortie.',
    'hospitals.leadership.horrigan.role': 'Relecteur clinique externe pour la conception des parcours cardiaques.',

    'hospitals.complications.title': 'Ce que nous écoutons après la chirurgie cardiothoracique.',
    'hospitals.complications.body': 'Les parcours sont rédigés par des chirurgiens et infirmiers qui vivent avec cette population. Chaque signal porte une règle nommée et une escalade nommée. Le clinicien reste le décideur.',
    'hospitals.complications.item1.title': 'Plaie sternale',
    'hospitals.complications.item1.desc': 'Photo de référence obligatoire et revue hebdomadaire, priorisées contre un ensemble de règles d\'évolution rédigées avec les chirurgiens opérants.',
    'hospitals.complications.item2.title': 'Désunion sternale',
    'hospitals.complications.item2.desc': 'Signaux d\'intégrité mécanique distincts de l\'infection. Toux, instabilité au mouvement, clic à la palpation, routés directement à l\'équipe opérante.',
    'hospitals.complications.item3.title': 'Fibrillation auriculaire de novo',
    'hospitals.complications.item3.desc': 'Fréquence, rythme et capture symptomatique, fenêtrés sur la chronologie post-cardiaque habituelle. Statut d\'anticoagulation et dernière dose visibles sur la carte.',
    'hospitals.complications.item4.title': 'Décompensation cardiaque',
    'hospitals.complications.item4.desc': 'Suivi quotidien du poids, des symptômes d\'effort et de l\'orthopnée contre des seuils propres au patient définis par l\'équipe de cardiologie.',
    'hospitals.complications.item5.title': 'Épanchement pleural et péricardique',
    'hospitals.complications.item5.desc': 'Règles de dyspnée et symptômes positionnels qui incitent l\'équipe à réimager plutôt qu\'à réagir. Recoupées avec l\'imagerie récente quand l\'intégration est en place.',
    'hospitals.complications.item6.title': 'Saignement',
    'hospitals.complications.item6.desc': 'Signaux sensibles à l\'anticoagulation, visibles à l\'équipe chirurgicale avant que le patient n\'appelle. Routage vers le registraire de garde, pas vers une boîte générique.',
    'hospitals.complications.item7.title': 'AVC et nouvelles atteintes neurologiques',
    'hospitals.complications.item7.desc': 'Invites d\'auto-évaluation de type FAST, signaux symptomatiques focaux et voie de revue en personne le jour même. Pertinent après chirurgie valvulaire et aortique.',
    'hospitals.complications.item8.title': 'Infection et dégradation systémique',
    'hospitals.complications.item8.desc': 'Capture de signes vitaux, plaie et symptômes constitutionnels qui remonte à l\'équipe selon la filière d\'escalade propre à l\'institution.',

    'hospitals.workflow.title': 'Ce qu\'un infirmier voit le lundi matin.',
    'hospitals.workflow.body': 'Pas un nouveau portail, pas une boîte de réception. Une liste de patients nommés, ordonnée par urgence selon des règles, chacun avec la raison du signal, la dernière réponse, et une action clinique en un geste.',
    'hospitals.workflow.preview.header': 'Cohorte de sortie · lun 14 avr',
    'hospitals.workflow.preview.count': '42 actifs',
    'hospitals.workflow.preview.note1': 'Aperçu illustratif',
    'hospitals.workflow.preview.note2': 'La vue en production est configurée selon votre politique d\'escalade',

    'hospitals.wound.eyebrow': 'Protocole de plaie sternale',
    'hospitals.wound.title': 'Chaque plaie, chaque semaine, horodatée au dossier patient.',
    'hospitals.wound.body': 'Obligatoire à la sortie. Hebdomadaire ensuite. Le patient est invité, l\'image est enregistrée au dossier patient avec horodatage et métadonnées, et le chirurgien opérant peut voir son propre travail à J7, J14 et J30. L\'ensemble de règles recherche l\'érythème qui s\'étend, la désunion, la formation de sinus et le changement d\'écoulement.',
    'hospitals.wound.stat1.value': 'J0, J7, J14, J30',
    'hospitals.wound.stat1.label': 'Cadence minimale du protocole',
    'hospitals.wound.stat2.value': 'Horodaté',
    'hospitals.wound.stat2.label': 'Stocké au dossier patient',
    'hospitals.wound.stat3.value': 'Revue chirurgien',
    'hospitals.wound.stat3.label': 'L\'équipe opérante voit son propre travail',

    'hospitals.noise.eyebrow': 'Le coût d\'une fausse alerte',
    'hospitals.noise.title': 'Moins d\'alertes. Chacune méritée.',
    'hospitals.noise.body': 'Une plateforme post-sortie qui signale tout est une plateforme qu\'aucun infirmier ne lira. SAFE-Discharge inclut la charge d\'alertes comme critère secondaire pré-spécifié : la cible est moins d\'un signal nurse-actionnable par patient par semaine sur la fenêtre de 14 jours post-sortie, avec revue documentée de chaque signal d\'urgence élevée. Nous rapporterons le chiffre, quel qu\'il soit.',
    'hospitals.noise.target.label': 'Cible',
    'hospitals.noise.target.value': '< 1 signal par patient par semaine',
    'hospitals.noise.endpoint.label': 'Critère',
    'hospitals.noise.endpoint.value': 'Pré-spécifié dans SAFE-Discharge',

    'hospitals.roster.eyebrow': 'Comment cela s\'intègre à votre roster',
    'hospitals.roster.title': 'S\'ajoute à la journée, pas aux effectifs.',
    'hospitals.roster.body': 'La liste de travail appartient aux rôles infirmiers existants, pas à un nouveau rôle. Le routage hors-heures est convenu avec votre registraire de garde et le standard hospitalier avant la mise en service. Quand un patient est réadmis ou qu\'un MET est appelé, les alertes Aescia se coupent automatiquement. Le NUM voit qui possède la liste par service et peut auditer chaque alerte.',
    'hospitals.roster.item1.title': 'Propriété par service',
    'hospitals.roster.item1.desc': 'Rôle infirmier nommé par service, convenu avec le NUM. La transmission entre services route la liste dans le cadre de la transmission verbale existante.',
    'hospitals.roster.item2.title': 'Routage hors-heures',
    'hospitals.roster.item2.desc': 'Les signaux d\'urgence élevée routent vers le registraire chirurgical de garde après les heures convenues. Configuré par site, pas un défaut éditeur.',
    'hospitals.roster.item3.title': 'Coupure automatique',
    'hospitals.roster.item3.desc': 'Quand un patient est réadmis ou qu\'un MET est actif, les alertes Aescia pour ce patient sont suspendues jusqu\'à ce que l\'équipe les réactive.',

    'hospitals.trial.eyebrow': 'Programme clinique actif',
    'hospitals.trial.title': 'L\'essai SAFE-Discharge.',
    'hospitals.trial.body': 'Une évaluation prospective mono-centrique à 500 patients d\'Aescia pour la surveillance post-sortie cardiothoracique. Enregistrée au registre des essais cliniques ANZ. Premiers participants attendus après approbation éthique et gouvernance. Analyse intérimaire pré-spécifiée à 50 patients, analyse complète à 500.',
    'hospitals.trial.not_recruiting': 'Cette page ne recrute pas de participants à l\'essai. L\'inscription se fait via l\'unité de chirurgie cardiothoracique du Royal Prince Alfred Hospital sous approbation éthique.',
    'hospitals.trial.id': 'ACTRN12625001425482',
    'hospitals.trial.site': 'Royal Prince Alfred Hospital, Sydney',
    'hospitals.trial.unit': 'Service de chirurgie cardiothoracique',
    'hospitals.trial.cta': 'Demander le résumé du protocole',

    'hospitals.path.title': 'Comment les systèmes de santé s\'engagent avec nous.',
    'hospitals.path.step1.title': 'Évaluation cadrée',
    'hospitals.path.step1.desc': 'Huit à douze semaines, une ligne de service, cadre usage-recherche, pas de fourniture commerciale. Pour confirmer l\'adéquation du parcours à votre population et votre structure d\'escalade.',
    'hospitals.path.step2.title': 'Pilote supervisé',
    'hospitals.path.step2.desc': 'Six mois, une à deux lignes de service, métriques de succès convenues, accord de partage de données, option de publication conjointe. Suivi d\'une décision de continuer.',
    'hospitals.path.step3.title': 'Déploiement entreprise',
    'hospitals.path.step3.desc': 'Le déploiement entreprise est disponible uniquement dans les juridictions où Aescia pour les hôpitaux a reçu l\'autorisation réglementaire applicable (inscription ARTG en Australie, autorisations équivalentes ailleurs). Indisponible pour la fourniture commerciale avant cette autorisation.',

    'hospitals.integration.title': 'Il s\'insère là où votre équipe travaille déjà.',
    'hospitals.integration.body': 'Authentification unique via SAML ou OIDC. Entrée d\'inscription via HL7 v2 ADT ou FHIR R4 Encounter. Retour optionnel vers la feuille de soins ou une note. Conçu comme un signal supplémentaire que l\'équipe sait déjà router, pas comme un portail à doter.',

    'clinics.eyebrow': 'Pour les cliniques',
    'clinics.title': 'Meilleure préparation. Moins d\'absents. Moins de téléphone.',
    'clinics.subtitle': 'Aescia pour les cliniques est une plateforme de flux de travail pour cliniques spécialisées, l\'endoscopie étant le premier foyer. Parcours pré-procédure par message texte. Superpositions diabète, anticoagulants et GLP-1. Suivi des rappels. Ne propose pas de décision clinique. N\'est pas un dispositif médical.',
    'clinics.cta.primary': 'Voir une démo clinique',
    'clinics.cta.secondary': 'Voir la posture tarifaire',
    'clinics.posture.label': 'Posture',
    'clinics.posture.title': 'Pas un dispositif médical. Pas un outil de décision.',
    'clinics.posture.body': 'Une plateforme de flux de travail et de préparation patient. Ne diagnostique pas, ne traite pas, ne propose pas de décision clinique.',

    'clinics.features.title': 'Neuf choses qui tiennent la semaine.',
    'clinics.features.item1.title': 'Des parcours de préparation qui s\'adaptent',
    'clinics.features.item1.desc': 'Choisissez la préparation utilisée par votre clinique. Le parcours s\'adapte au patient devant vous. Diabète, MII, constipation, échec antérieur, personne âgée, tout est couvert sans réécrire la page.',
    'clinics.features.item2.title': 'Réduction des absences',
    'clinics.features.item2.desc': 'Rappels chronométrés dans la langue du patient, parcours confirmer-et-reprogrammer intégré, un signal jour-même exploitable par votre secrétariat. Remplissage automatique par liste d\'attente à l\'annulation.',
    'clinics.features.item3.title': 'Gestion des GLP-1',
    'clinics.features.item3.desc': 'Le patient déclare le médicament et la dose. Le parcours délivre l\'instruction rédigée par le clinicien qui correspond à la déclaration, alignée avec les recommandations multi-sociétés de 2024 et le consensus international de 2025. Les décisions restent avec le proceduralist.',
    'clinics.features.item4.title': 'Superpositions diabète et anticoagulants',
    'clinics.features.item4.desc': 'Scénarios SGLT2, metformine, AOD et warfarine délivrés comme instructions rédigées par le clinicien, générées depuis les réponses du patient. Le clinicien valide l\'ensemble de règles, pas l\'éditeur.',
    'clinics.features.item5.title': 'Revue photo la veille',
    'clinics.features.item5.desc': 'La veille, le patient peut envoyer une photo de la cuvette. Le parcours la cote automatiquement contre une grille fixée par le clinicien et confirme le créneau ou déclenche la reprogrammation avant que le patient ne quitte la maison.',
    'clinics.features.item6.title': 'Déflexion d\'appels',
    'clinics.features.item6.desc': 'SMS bidirectionnel qui répond aux vingt premières questions de préparation avant qu\'elles n\'atteignent le secrétariat, avec des réponses rédigées par le clinicien. La clinique voit les exceptions, pas chaque texto.',
    'clinics.features.item7.title': 'Surveillance et rappels',
    'clinics.features.item7.desc': 'Les suivis de polypes à haut risque et les intervalles de surveillance ne reposent plus sur une feuille de calcul. Patients nommés, dates nommées, déclencheurs nommés, alignés sur les recommandations USMSTF et NHMRC.',
    'clinics.features.item8.title': 'Facile à intégrer',
    'clinics.features.item8.desc': 'Fonctionne aux côtés des systèmes de rapport d\'endoscopie habituels (Provation, EndoWorks, gGastro) et des systèmes de gestion de cabinet. Ajoute une couche de signal sans second identifiant.',
    'clinics.features.item9.title': 'Adapté au cabinet',
    'clinics.features.item9.desc': 'Configuré par un administrateur clinique en une après-midi. Tarif mensuel forfaitaire par spécialité. En ligne en deux semaines, pas en deux trimestres.',

    'clinics.vocab.title': 'Fait pour le rythme ambulatoire.',
    'clinics.vocab.body': 'Ce n\'est pas un outil de sortie hospitalière habillé pour la clinique. C\'est un produit de préparation et de flux de travail avec ses propres protocoles, sa propre couche SMS, et son propre vocabulaire : liste du jour, utilisation de salle, rotation, qualité de préparation, conformité de rappel.',

    'clinics.regions.title': 'Marques de préparation par région.',
    'clinics.regions.body': 'Le parcours couvre les équivalents régionaux dans les marchés que nous soutenons. Les cliniciens de chaque pays voient les noms que leurs patients voient en pharmacie.',
    'clinics.regions.us.label': 'États-Unis',
    'clinics.regions.us.value': 'SuPrep, SuTab, CLENPIQ, GoLytely, NuLYTELY',
    'clinics.regions.ca.label': 'Canada',
    'clinics.regions.ca.value': 'PegLyte, PICO-SALAX, CLENPIQ, Bi-PEG-Lyte',
    'clinics.regions.au.label': 'Australie et Nouvelle-Zélande',
    'clinics.regions.au.value': 'Glycoprep, Picoprep, MoviPrep, Plenvu',
    'clinics.regions.uk.label': 'Royaume-Uni et UE',
    'clinics.regions.uk.value': 'Plenvu, Moviprep, Citrafleet',

    'clinics.specialties.title': 'Spécialités déjà prises en charge.',
    'clinics.specialties.body': 'La couverture est en ligne pour la coloscopie et la gastroscopie, avec des variantes régionales de préparation et des superpositions de spécialité. Le même moteur s\'étend à la kinésithérapie post-sortie, l\'esthétique, et d\'autres spécialités cherchant de l\'efficience en 2026 et 2027.',

    'clinics.pricing.title': 'Posture tarifaire.',
    'clinics.pricing.body': 'Mensuel forfaitaire par spécialité au niveau cabinet, aligné sur l\'usage à grande échelle. Démarre sous le coût d\'un absent par semaine. Nous publions une posture, pas une liste : les cliniques paient pour un protocole de spécialité déployable en deux semaines, et l\'échelle ajoute des protocoles, pas des frictions.',

    'platformpg.eyebrow': 'Plateforme',
    'platformpg.title': 'Le moteur sous les deux produits.',
    'platformpg.body': 'Aescia est un moteur avec deux portes. La même édition de parcours composable, le même journal d\'audit, la même couche SMS patient, la même équipe. La posture régulée du produit hôpital élève le standard du produit clinique, et la vélocité du produit clinique garde le produit hôpital honnête sur ce qu\'une équipe chargée adoptera vraiment.',
    'platformpg.ls.eyebrow': 'Adjacence sciences de la vie',
    'platformpg.ls.title': 'Un moteur de parcours, extensible à un usage spécifique à la thérapie.',
    'platformpg.ls.body': 'Le moteur encode déjà des règles au niveau médicament (GLP-1, SGLT2, AOD, warfarine). Tout parcours rédigé par le clinicien l\'étend. Les mêmes primitives (collecte structurée, tri rédigé, livraison SMS, journal d\'audit, export structuré) sous-tendent les programmes modernes de soutien patient, les registres et la collecte de données de vie réelle. Nous concevons pour cette extensibilité ; nous ne nommons pas les thérapies que nous n\'avons pas déployées.',

    'governance.eyebrow': 'Gouvernance',
    'governance.title': 'Posture honnête, documentée.',
    'governance.body': 'Aescia exploite deux produits avec des postures réglementaires différentes. Le produit Hôpitaux est un dispositif médical en investigation avec une classification Classe IIa prévue ; la demande réglementaire n\'a pas encore été déposée. Le produit Cliniques est un outil de flux de travail qui n\'est pas un dispositif médical et n\'est pas présenté comme tel. Cette page indique ce qu\'est chacun et ce que chacun n\'est pas.',

    'lang.switch': 'EN',
    'lang.switch.aria': 'Passer en anglais',
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('locale') as Locale | null) : null
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLocaleState(saved)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  const t = (key: string): string => {
    return translations[locale][key] || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
      className="font-mono text-[11px] font-medium tracking-widest uppercase px-2.5 py-2 border border-current/30 opacity-80 hover:opacity-100 transition-opacity min-h-[36px] min-w-[36px]"
      aria-label={t('lang.switch.aria')}
    >
      {t('lang.switch')}
    </button>
  )
}
