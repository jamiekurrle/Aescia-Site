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
    'brand.tagline': 'Between the discharge and the next appointment, someone should be listening.',

    // Nav
    'nav.platform': 'Platform',
    'nav.hospitals': 'For Hospitals',
    'nav.clinics': 'For Clinics',
    'nav.evidence': 'Evidence',
    'nav.contact': 'Contact',
    'nav.cta': 'Request a demo',

    // Hero (home, unifier)
    'hero.eyebrow': 'A continuous-care platform',
    'hero.title': 'Between the discharge and the next appointment, someone should be listening.',
    'hero.subtitle': 'Aescia is a platform for structured patient follow-up and specialty-clinic workflow. Two products on one engine: one for surgical recovery, one for procedural preparation.',
    'hero.cta.primary': 'Explore the platform',
    'hero.cta.secondary': 'Talk to our team',

    // Audience split strip (under hero)
    'split.hospital.eyebrow': 'For hospitals',
    'split.hospital.title': 'Post-surgical recovery, observed.',
    'split.hospital.desc': 'A structured follow-up layer for cardiothoracic surgery and other high-acuity discharges. Daily patient check-ins, transparent rule-based triage, one prioritised clinical list.',
    'split.hospital.cta': 'Aescia for Hospitals',
    'split.clinic.eyebrow': 'For clinics',
    'split.clinic.title': 'Better prep. Lists that run on time.',
    'split.clinic.desc': 'Pre-procedure pathways for endoscopy and other specialty clinics. SMS-first prep, diabetic and GLP-1 overlays, recall management, fewer phone calls to the front desk.',
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

    // Platform section
    'platform.eyebrow': 'One engine. Two doorways.',
    'platform.title': 'A composable pathway engine, applied twice.',
    'platform.body': 'Every Aescia pathway is a sequence of four step types: Collect a structured signal, Follow a clinician-authored rule, Remind the patient, Educate at the right moment. We build the engine once and apply it to the two moments where care most often falls apart: the week after discharge, and the week before a scheduled procedure.',
    'platform.pill.collect': 'Collect',
    'platform.pill.follow': 'Follow',
    'platform.pill.remind': 'Remind',
    'platform.pill.educate': 'Educate',

    // Why Aescia (three pillars)
    'pillars.title': 'Why this, why now.',
    'pillars.transparent.title': 'Transparent by design',
    'pillars.transparent.desc': 'Rule-based triage, authored by clinicians. No opaque models. Every flag is explainable to the nurse it lands with and to the committee that asks.',
    'pillars.clinician.title': 'Clinician-authored',
    'pillars.clinician.desc': 'Pathways are written by practicing surgeons, gastroenterologists, and nurses. We do not ship a disease we did not learn from the people who treat it.',
    'pillars.dual.title': 'Two products, one engine',
    'pillars.dual.desc': 'A regulated pathway for surgical recovery and a workflow pathway for procedural clinics share the same authoring layer, the same audit trail, the same team.',

    // Evidence ribbon (honest)
    'evidence.eyebrow': 'Where we are today',
    'evidence.title': 'Clinical programme in active enrolment.',
    'evidence.body': 'The SAFE-Discharge trial is a 500-patient, single-centre evaluation of Aescia for post-cardiothoracic-surgery discharge monitoring at the Royal Prince Alfred Hospital cardiothoracic unit in Sydney. Led by a senior cardiothoracic surgeon chair and a research clinician principal investigator. Aescia for Hospitals is on a Class IIa medical-device pathway and is not yet listed for commercial use. Aescia for Clinics is a workflow tool that does not propose clinical decisions and is not a medical device.',
    'evidence.fact1.value': 'ACTRN12625001425482',
    'evidence.fact1.label': 'Trial registration',
    'evidence.fact2.value': '500',
    'evidence.fact2.label': 'Patients, single centre',
    'evidence.fact3.value': 'Class IIa',
    'evidence.fact3.label': 'Pathway, pre-listing',
    'evidence.cta': 'Read the evidence page',

    // CTA
    'cta.title': 'Ready to see the platform?',
    'cta.subtitle': 'A thirty-minute call with someone on the clinical team. We show the worklist, the pathway editor, and what the week after surgery or the night before a colonoscopy actually looks like.',
    'cta.button': 'Request a demo',

    // Footer
    'footer.tagline': 'A continuous-care platform for the weeks that matter.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.platform': 'Platform',
    'footer.hospitals': 'For Hospitals',
    'footer.clinics': 'For Clinics',
    'footer.evidence': 'Evidence',
    'footer.governance': 'Governance',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.health': 'A continuous-care platform.',
    'footer.disclosure': 'Aescia for Hospitals is on a Class IIa medical-device pathway and is in clinical evaluation. Aescia for Clinics is a workflow tool and is not a medical device.',

    // Hospitals page
    'hospitals.eyebrow': 'For Hospitals',
    'hospitals.title': 'The quietest days after surgery carry the loudest risk.',
    'hospitals.subtitle': 'Aescia for Hospitals is a post-surgical recovery monitoring platform, built first for cardiothoracic surgery. Structured daily check-ins, clinician-authored triage, one prioritised list for the nursing team. In clinical evaluation through the SAFE-Discharge trial at a major Australian cardiothoracic unit.',
    'hospitals.cta.primary': 'Request a surgical evaluation',
    'hospitals.cta.secondary': 'Read the trial brief',

    'hospitals.complications.title': 'What we listen for after cardiothoracic surgery.',
    'hospitals.complications.body': 'Pathways are authored by surgeons and nurses who live in this population. Each signal carries a named rule and a named escalation.',
    'hospitals.complications.item1.title': 'Sternal and thoracic wound',
    'hospitals.complications.item1.desc': 'Mandatory baseline and weekly photographic review, flagged against a structured change-over-time rule set.',
    'hospitals.complications.item2.title': 'New-onset atrial fibrillation',
    'hospitals.complications.item2.desc': 'Rate, rhythm, and symptom-capture windowed against the common post-cardiac-surgery AF timeline.',
    'hospitals.complications.item3.title': 'Heart failure decompensation',
    'hospitals.complications.item3.desc': 'Daily weight, exertional symptom, and orthopnoea tracking against patient-specific thresholds.',
    'hospitals.complications.item4.title': 'Pleural and pericardial effusion',
    'hospitals.complications.item4.desc': 'Breathlessness and positional symptom rules, cross-referenced with recent imaging where available.',
    'hospitals.complications.item5.title': 'Bleeding and wound dehiscence',
    'hospitals.complications.item5.desc': 'Anticoagulation-aware signals, visible to the surgical team before they would otherwise call.',
    'hospitals.complications.item6.title': 'Infection and systemic deterioration',
    'hospitals.complications.item6.desc': 'Vitals, wound, and constitutional-symptom rules aligned with the local sepsis pathway.',

    'hospitals.workflow.title': 'What a nurse sees on Monday morning.',
    'hospitals.workflow.body': 'Not a new portal, not an inbox. A list of named patients, ordered by rule-based urgency, each with the reason they surfaced, the last response, and a one-tap clinician action.',

    'hospitals.trial.eyebrow': 'Active clinical programme',
    'hospitals.trial.title': 'The SAFE-Discharge trial.',
    'hospitals.trial.body': 'A prospective 500-patient evaluation of Aescia for cardiothoracic post-discharge monitoring. Registered in the Australian New Zealand Clinical Trials Registry. First enrolment through 2026. Interim readout planned at 50 patients, full readout follows the final enrolment.',
    'hospitals.trial.id': 'ACTRN12625001425482',
    'hospitals.trial.site': 'Royal Prince Alfred Hospital, Sydney',
    'hospitals.trial.unit': 'Cardiothoracic Surgery Unit',
    'hospitals.trial.cta': 'Request the protocol summary',

    'hospitals.path.title': 'How health systems engage with us.',
    'hospitals.path.step1.title': 'Scoped evaluation',
    'hospitals.path.step1.desc': 'Eight to twelve weeks, single service line, research-use framing, no commercial deployment. Used to confirm the pathway fits your population and your escalation structure.',
    'hospitals.path.step2.title': 'Supervised pilot',
    'hospitals.path.step2.desc': 'Six months, one to two service lines, agreed success metrics, data-sharing agreement, joint publication option. Followed by a decision to continue.',
    'hospitals.path.step3.title': 'Enterprise deployment',
    'hospitals.path.step3.desc': 'Available following local regulatory listing of Aescia for Hospitals. Integration with identity, EMR, and escalation systems. Support, SLA, and audit provisions agreed with procurement.',

    'hospitals.integration.title': 'It fits where your team already works.',
    'hospitals.integration.body': 'Single sign-on via SAML or OIDC. Inbound enrolment over HL7 v2 ADT or FHIR R4 Encounter. Optional outbound flowsheet or note write-back. Designed to be an additional signal the nursing team already knows how to route, not a new portal to staff.',

    // Clinics page
    'clinics.eyebrow': 'For Clinics',
    'clinics.title': 'Better prep. Fewer no-shows. Less phone work.',
    'clinics.subtitle': 'Aescia for Clinics is a workflow platform for specialty clinics, starting with endoscopy. SMS-first pre-procedure pathways. Diabetic, anticoagulant, and GLP-1 overlays. Recall tracking that stops slipping. It does not propose clinical decisions. It is not a medical device.',
    'clinics.cta.primary': 'See a clinic demo',
    'clinics.cta.secondary': 'Download the prep one-pager',

    'clinics.features.title': 'Eight things that run the day-to-day.',
    'clinics.features.item1.title': 'Prep pathways that adapt',
    'clinics.features.item1.desc': 'Pick the prep your clinic uses. The pathway adapts to the patient in front of it. Diabetic, IBD, constipation, post-failed-prep, elderly, all covered without rewriting the page.',
    'clinics.features.item2.title': 'No-show reduction',
    'clinics.features.item2.desc': 'Timed reminders in the patient language, a confirm and reschedule path built in, a same-day flag your front desk can actually act on.',
    'clinics.features.item3.title': 'GLP-1 handling',
    'clinics.features.item3.desc': 'Patient self-reports the medication and the dose. The pathway applies the current consensus hold window and produces the right instruction, not a phone call.',
    'clinics.features.item4.title': 'Diabetic and anticoagulant overlays',
    'clinics.features.item4.desc': 'SGLT2 hold windows, metformin rules, DOAC and warfarin guidance composable onto any prep, generated from the patient answers.',
    'clinics.features.item5.title': 'Call deflection',
    'clinics.features.item5.desc': 'Two-way SMS answers the top twenty prep questions before they reach the front desk. The clinic sees the exceptions, not every text.',
    'clinics.features.item6.title': 'Surveillance and recall',
    'clinics.features.item6.desc': 'High-risk polyp follow-up and surveillance intervals do not rely on a spreadsheet anyone might miss. Named patients, named dates, named triggers.',
    'clinics.features.item7.title': 'Integration-friendly',
    'clinics.features.item7.desc': 'Works alongside common practice-management and endoscopy-reporting systems. Designed to add a signal layer without a second login for your team.',
    'clinics.features.item8.title': 'Single-site friendly',
    'clinics.features.item8.desc': 'Configured by one clinic admin in an afternoon. Flat monthly pricing per specialty. Live in two weeks, not two quarters.',

    'clinics.vocab.title': 'Built for the ambulatory rhythm.',
    'clinics.vocab.body': 'This is not a hospital discharge tool dressed for a clinic. It is a prep and workflow product with its own authored pathways, its own SMS layer, and its own vocabulary: today\'s list, room utilisation, case turnover, prep adequacy, recall compliance.',

    'clinics.specialties.title': 'Specialties we already support.',
    'clinics.specialties.body': 'Pathway coverage is live for colonoscopy and gastroscopy, with bowel-prep variants (Glycoprep, Picoprep, MoviPrep, Plenvu) and specialty overlays. The same engine is extending into physiotherapy post-discharge, aesthetics, and other efficiency-seeking specialties through 2026 and 2027.',

    'clinics.pricing.title': 'Pricing posture.',
    'clinics.pricing.body': 'Flat monthly by specialty at the single-site level, or consumption-aligned at scale. We publish a posture, not a list: clinics pay for a specialty pathway they can deploy inside two weeks, and scale adds pathways, not friction.',

    // Platform page
    'platformpg.eyebrow': 'Platform',
    'platformpg.title': 'The engine underneath both products.',
    'platformpg.body': 'Aescia is one engine with two doorways. The same composable pathway authoring, the same audit trail, the same patient-facing SMS layer, the same team. The regulated posture of the hospital product lifts the standard of the clinic product, and the workflow velocity of the clinic product keeps the hospital product honest about what a busy team will actually adopt.',

    // Governance page eyebrow
    'governance.eyebrow': 'Governance',
    'governance.title': 'Honest posture, documented.',
    'governance.body': 'Aescia for Hospitals is on a Class IIa medical-device pathway. It is in clinical evaluation through the SAFE-Discharge trial and is not yet listed for commercial deployment. Aescia for Clinics is a workflow platform. It does not propose clinical decisions, does not diagnose, does not treat. It is not a medical device and is not represented as one. Both products share an ISO 27001-aligned software lifecycle, IEC 62304 practice, named data residency by deployment region, and a documented security posture available to prospective customers under mutual NDA.',

    // Language switcher label
    'lang.switch': 'FR',
  },
  fr: {
    'brand.name': 'Aescia',
    'brand.tagline': 'Entre la sortie et le prochain rendez-vous, quelqu\'un devrait écouter.',

    'nav.platform': 'Plateforme',
    'nav.hospitals': 'Pour les hôpitaux',
    'nav.clinics': 'Pour les cliniques',
    'nav.evidence': 'Preuves',
    'nav.contact': 'Contact',
    'nav.cta': 'Demander une démo',

    'hero.eyebrow': 'Une plateforme de soins continus',
    'hero.title': 'Entre la sortie et le prochain rendez-vous, quelqu\'un devrait écouter.',
    'hero.subtitle': 'Aescia est une plateforme pour le suivi structuré des patients et le flux de travail en clinique spécialisée. Deux produits sur un seul moteur : un pour la récupération chirurgicale, un pour la préparation procédurale.',
    'hero.cta.primary': 'Explorer la plateforme',
    'hero.cta.secondary': 'Contacter notre équipe',

    'split.hospital.eyebrow': 'Pour les hôpitaux',
    'split.hospital.title': 'La récupération post-chirurgicale, observée.',
    'split.hospital.desc': 'Une couche de suivi structuré pour la chirurgie cardiothoracique et les autres sorties à haute acuité. Des suivis quotidiens, une classification basée sur des règles transparentes, une seule liste clinique prioritaire.',
    'split.hospital.cta': 'Aescia pour les hôpitaux',
    'split.clinic.eyebrow': 'Pour les cliniques',
    'split.clinic.title': 'Mieux préparer. Des listes qui tiennent.',
    'split.clinic.desc': 'Des parcours pré-procéduraux pour l\'endoscopie et d\'autres cliniques spécialisées. Rappels SMS, superpositions diabète et GLP-1, gestion des suivis, moins d\'appels au secrétariat.',
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
    'platform.body': 'Chaque parcours Aescia est une séquence de quatre types d\'étapes : Collecter un signal structuré, Suivre une règle rédigée par le clinicien, Rappeler au patient, Éduquer au bon moment. Nous construisons le moteur une fois et l\'appliquons aux deux moments où les soins s\'effritent le plus souvent : la semaine après la sortie, et la semaine avant une procédure programmée.',
    'platform.pill.collect': 'Collecter',
    'platform.pill.follow': 'Suivre',
    'platform.pill.remind': 'Rappeler',
    'platform.pill.educate': 'Éduquer',

    'pillars.title': 'Pourquoi ceci, pourquoi maintenant.',
    'pillars.transparent.title': 'Transparent par conception',
    'pillars.transparent.desc': 'Classification par règles, rédigée par des cliniciens. Aucun modèle opaque. Chaque signal est explicable à l\'infirmier qui le reçoit et au comité qui le demande.',
    'pillars.clinician.title': 'Rédigé par des cliniciens',
    'pillars.clinician.desc': 'Les parcours sont écrits par des chirurgiens, gastroentérologues et infirmiers en exercice. Nous ne livrons pas une maladie que nous n\'avons pas apprise auprès de ceux qui la traitent.',
    'pillars.dual.title': 'Deux produits, un moteur',
    'pillars.dual.desc': 'Un parcours régulé pour la récupération chirurgicale et un parcours de flux de travail pour les cliniques procédurales partagent la même couche d\'édition, le même journal d\'audit, la même équipe.',

    'evidence.eyebrow': 'Où nous en sommes',
    'evidence.title': 'Programme clinique en recrutement actif.',
    'evidence.body': 'L\'essai SAFE-Discharge est une évaluation mono-centrique à 500 patients d\'Aescia pour la surveillance post-sortie de chirurgie cardiothoracique, au Royal Prince Alfred Hospital à Sydney. Dirigé par un chef de service de chirurgie cardiothoracique et un investigateur principal clinicien-chercheur. Aescia pour les hôpitaux suit une voie de dispositif médical de Classe IIa et n\'est pas encore homologué pour un usage commercial. Aescia pour les cliniques est un outil de flux de travail qui ne propose pas de décision clinique et n\'est pas un dispositif médical.',
    'evidence.fact1.value': 'ACTRN12625001425482',
    'evidence.fact1.label': 'Enregistrement',
    'evidence.fact2.value': '500',
    'evidence.fact2.label': 'Patients, mono-centrique',
    'evidence.fact3.value': 'Classe IIa',
    'evidence.fact3.label': 'Voie, pré-homologation',
    'evidence.cta': 'Lire la page preuves',

    'cta.title': 'Prêt à voir la plateforme ?',
    'cta.subtitle': 'Un appel de trente minutes avec un membre de l\'équipe clinique. Nous montrons la liste de travail, l\'éditeur de parcours, et ce à quoi ressemble vraiment la semaine après la chirurgie ou la veille d\'une coloscopie.',
    'cta.button': 'Demander une démo',

    'footer.tagline': 'Une plateforme de soins continus pour les semaines qui comptent.',
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.legal': 'Légal',
    'footer.platform': 'Plateforme',
    'footer.hospitals': 'Pour les hôpitaux',
    'footer.clinics': 'Pour les cliniques',
    'footer.evidence': 'Preuves',
    'footer.governance': 'Gouvernance',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.health': 'Une plateforme de soins continus.',
    'footer.disclosure': 'Aescia pour les hôpitaux suit une voie de dispositif médical de Classe IIa et est en évaluation clinique. Aescia pour les cliniques est un outil de flux de travail et n\'est pas un dispositif médical.',

    'hospitals.eyebrow': 'Pour les hôpitaux',
    'hospitals.title': 'Les jours les plus silencieux après la chirurgie portent le risque le plus fort.',
    'hospitals.subtitle': 'Aescia pour les hôpitaux est une plateforme de surveillance post-chirurgicale, conçue d\'abord pour la chirurgie cardiothoracique. Suivis quotidiens structurés, tri par règles rédigées par les cliniciens, une seule liste priorisée pour l\'équipe infirmière. En évaluation clinique via l\'essai SAFE-Discharge dans un grand service de chirurgie cardiothoracique australien.',
    'hospitals.cta.primary': 'Demander une évaluation chirurgicale',
    'hospitals.cta.secondary': 'Lire le résumé de l\'essai',

    'hospitals.complications.title': 'Ce que nous écoutons après la chirurgie cardiothoracique.',
    'hospitals.complications.body': 'Les parcours sont rédigés par des chirurgiens et infirmiers qui vivent avec cette population. Chaque signal porte une règle nommée et une escalade nommée.',
    'hospitals.complications.item1.title': 'Plaie sternale et thoracique',
    'hospitals.complications.item1.desc': 'Photo de référence obligatoire et revue hebdomadaire, signalée contre un ensemble structuré de règles d\'évolution.',
    'hospitals.complications.item2.title': 'Fibrillation auriculaire de novo',
    'hospitals.complications.item2.desc': 'Fréquence, rythme et capture symptomatique, fenêtrés sur la chronologie post-cardiaque habituelle.',
    'hospitals.complications.item3.title': 'Décompensation cardiaque',
    'hospitals.complications.item3.desc': 'Suivi quotidien du poids, des symptômes d\'effort et de l\'orthopnée contre des seuils propres au patient.',
    'hospitals.complications.item4.title': 'Épanchement pleural et péricardique',
    'hospitals.complications.item4.desc': 'Règles de dyspnée et de symptômes positionnels, recoupées avec l\'imagerie récente si disponible.',
    'hospitals.complications.item5.title': 'Saignement et désunion de plaie',
    'hospitals.complications.item5.desc': 'Signaux sensibles à l\'anticoagulation, visibles à l\'équipe chirurgicale avant qu\'elle n\'appelle.',
    'hospitals.complications.item6.title': 'Infection et dégradation systémique',
    'hospitals.complications.item6.desc': 'Règles de signes vitaux, de plaie et de symptômes constitutionnels, alignées sur la filière sepsis locale.',

    'hospitals.workflow.title': 'Ce qu\'un infirmier voit le lundi matin.',
    'hospitals.workflow.body': 'Pas un nouveau portail, pas une boîte de réception. Une liste de patients nommés, ordonnée par urgence selon des règles, chacun avec la raison du signal, la dernière réponse, et une action clinique en un geste.',

    'hospitals.trial.eyebrow': 'Programme clinique actif',
    'hospitals.trial.title': 'L\'essai SAFE-Discharge.',
    'hospitals.trial.body': 'Une évaluation prospective à 500 patients d\'Aescia pour la surveillance post-sortie cardiothoracique. Enregistrée au registre des essais cliniques ANZ. Premiers inclus en 2026. Lecture intérimaire prévue à 50 patients, lecture complète après la fin du recrutement.',
    'hospitals.trial.id': 'ACTRN12625001425482',
    'hospitals.trial.site': 'Royal Prince Alfred Hospital, Sydney',
    'hospitals.trial.unit': 'Service de chirurgie cardiothoracique',
    'hospitals.trial.cta': 'Demander le résumé du protocole',

    'hospitals.path.title': 'Comment les systèmes de santé nous engagent.',
    'hospitals.path.step1.title': 'Évaluation cadrée',
    'hospitals.path.step1.desc': 'Huit à douze semaines, une ligne de service, cadre usage-recherche, pas de déploiement commercial. Pour confirmer l\'adéquation du parcours à votre population et votre structure d\'escalade.',
    'hospitals.path.step2.title': 'Pilote supervisé',
    'hospitals.path.step2.desc': 'Six mois, une à deux lignes de service, métriques de succès convenues, accord de partage de données, option de publication conjointe. Suivi d\'une décision de continuer.',
    'hospitals.path.step3.title': 'Déploiement entreprise',
    'hospitals.path.step3.desc': 'Disponible après homologation locale d\'Aescia pour les hôpitaux. Intégration identité, DME, escalade. Support, SLA et clauses d\'audit convenus avec les achats.',

    'hospitals.integration.title': 'Il s\'insère là où votre équipe travaille déjà.',
    'hospitals.integration.body': 'Authentification unique via SAML ou OIDC. Entrée d\'inscription via HL7 v2 ADT ou FHIR R4 Encounter. Retour optionnel vers la feuille de soins ou une note. Conçu comme un signal supplémentaire que l\'équipe sait déjà router, pas comme un portail à doter.',

    'clinics.eyebrow': 'Pour les cliniques',
    'clinics.title': 'Meilleure préparation. Moins d\'absents. Moins de téléphone.',
    'clinics.subtitle': 'Aescia pour les cliniques est une plateforme de flux de travail pour cliniques spécialisées, à commencer par l\'endoscopie. Parcours pré-procédure SMS. Superpositions diabète, anticoagulant et GLP-1. Suivi des rappels. Ne propose pas de décision clinique. N\'est pas un dispositif médical.',
    'clinics.cta.primary': 'Voir une démo clinique',
    'clinics.cta.secondary': 'Télécharger la fiche préparation',

    'clinics.features.title': 'Huit choses qui tiennent la semaine.',
    'clinics.features.item1.title': 'Des parcours de préparation qui s\'adaptent',
    'clinics.features.item1.desc': 'Choisissez la préparation utilisée par votre clinique. Le parcours s\'adapte au patient devant vous. Diabète, MII, constipation, échec antérieur, personne âgée, tout est couvert sans réécrire la page.',
    'clinics.features.item2.title': 'Réduction des absences',
    'clinics.features.item2.desc': 'Rappels chronométrés dans la langue du patient, parcours confirmer et reprogrammer intégré, un signal jour-même exploitable par votre secrétariat.',
    'clinics.features.item3.title': 'Gestion des GLP-1',
    'clinics.features.item3.desc': 'Le patient déclare le médicament et la dose. Le parcours applique la fenêtre de suspension consensuelle et produit la bonne instruction, pas un appel.',
    'clinics.features.item4.title': 'Superpositions diabète et anticoagulant',
    'clinics.features.item4.desc': 'Fenêtres SGLT2, règles metformine, consignes AOD et warfarine composables sur toute préparation, générées depuis les réponses du patient.',
    'clinics.features.item5.title': 'Déflexion d\'appels',
    'clinics.features.item5.desc': 'SMS bidirectionnel qui répond aux vingt premières questions de préparation avant qu\'elles n\'atteignent le secrétariat. La clinique voit les exceptions, pas chaque texto.',
    'clinics.features.item6.title': 'Surveillance et rappels',
    'clinics.features.item6.desc': 'Les suivis de polypes à haut risque et les intervalles de surveillance ne reposent plus sur une feuille de calcul. Patients nommés, dates nommées, déclencheurs nommés.',
    'clinics.features.item7.title': 'Facile à intégrer',
    'clinics.features.item7.desc': 'Fonctionne aux côtés des systèmes de gestion et de rapport d\'endoscopie habituels. Ajoute une couche de signal sans second identifiant.',
    'clinics.features.item8.title': 'Adapté au cabinet',
    'clinics.features.item8.desc': 'Configuré par un administrateur clinique en une après-midi. Tarif mensuel forfaitaire par spécialité. En ligne en deux semaines, pas en deux trimestres.',

    'clinics.vocab.title': 'Fait pour le rythme ambulatoire.',
    'clinics.vocab.body': 'Ce n\'est pas un outil de sortie hospitalière habillé pour la clinique. C\'est un produit de préparation et de flux de travail avec ses propres parcours, sa propre couche SMS, et son propre vocabulaire : liste du jour, utilisation de salle, rotation, qualité de préparation, conformité de rappel.',

    'clinics.specialties.title': 'Spécialités déjà prises en charge.',
    'clinics.specialties.body': 'La couverture est en ligne pour la coloscopie et la gastroscopie, avec les variantes de préparation (Glycoprep, Picoprep, MoviPrep, Plenvu) et superpositions de spécialité. Le même moteur s\'étend à la kinésithérapie post-sortie, l\'esthétique, et d\'autres spécialités cherchant de l\'efficience en 2026 et 2027.',

    'clinics.pricing.title': 'Posture tarifaire.',
    'clinics.pricing.body': 'Mensuel forfaitaire par spécialité au niveau cabinet, ou aligné sur l\'usage à grande échelle. Nous publions une posture, pas une liste : les cliniques paient pour un parcours de spécialité déployable en deux semaines, et l\'échelle ajoute des parcours, pas des frictions.',

    'platformpg.eyebrow': 'Plateforme',
    'platformpg.title': 'Le moteur sous les deux produits.',
    'platformpg.body': 'Aescia est un moteur avec deux portes. La même édition de parcours composable, le même journal d\'audit, la même couche SMS patient, la même équipe. La posture régulée du produit hôpital élève le standard du produit clinique, et la vélocité du produit clinique garde le produit hôpital honnête sur ce qu\'une équipe chargée adoptera vraiment.',

    'governance.eyebrow': 'Gouvernance',
    'governance.title': 'Posture honnête, documentée.',
    'governance.body': 'Aescia pour les hôpitaux suit une voie de dispositif médical de Classe IIa. Il est en évaluation clinique via l\'essai SAFE-Discharge et n\'est pas encore homologué pour un déploiement commercial. Aescia pour les cliniques est une plateforme de flux de travail. Il ne propose pas de décisions cliniques, ne diagnostique pas, ne traite pas. Il n\'est pas un dispositif médical et n\'est pas présenté comme tel. Les deux produits partagent un cycle logiciel aligné ISO 27001, une pratique IEC 62304, une résidence des données nommée par région, et une posture de sécurité documentée disponible sous NDA mutuel.',

    'lang.switch': 'EN',
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
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
      className="font-mono text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 border border-current/30 opacity-70 hover:opacity-100 transition-opacity"
      aria-label={locale === 'en' ? 'Switch to French' : 'Passer en anglais'}
    >
      {t('lang.switch')}
    </button>
  )
}
