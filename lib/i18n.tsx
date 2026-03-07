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
    // Nav
    'nav.problem': 'Problem',
    'nav.solution': 'Solution',
    'nav.evidence': 'Evidence',
    'nav.governance': 'Governance',
    'nav.contact': 'Get in touch',
    
    // Hero
    'hero.title': 'Post-discharge monitoring that prevents readmissions',
    'hero.subtitle': 'Daily patient check-ins. Automatic risk classification. Prioritized clinical worklists.',
    'hero.cta.primary': 'See how it works',
    'hero.cta.secondary': 'Request a demo',
    
    // Workflow
    'workflow.title': 'How Aescia works',
    'workflow.subtitle': 'A simple, scalable layer between discharged patients and clinical teams.',
    'workflow.patient.title': 'Patient at Home',
    'workflow.patient.desc': 'Recently discharged, in the high-risk recovery period',
    'workflow.checkin': 'Daily Check-in',
    'workflow.checkin.desc': 'Brief symptom questionnaire tailored to procedure and risk factors',
    'workflow.platform.title': 'Aescia Platform',
    'workflow.platform.desc': 'Automatic risk classification using transparent, rule-based logic',
    'workflow.alerts': 'Prioritized Alerts',
    'workflow.alerts.desc': 'Clinically relevant signals surfaced by urgency',
    'workflow.clinical.title': 'Clinical Team',
    'workflow.clinical.desc': 'Single prioritized worklist, ordered by urgency',
    'workflow.benefit.worklist': 'One worklist for the entire discharge cohort',
    'workflow.link': 'Learn more about the clinical workflow',
    
    // Value Props
    'value.title': 'Built for healthcare',
    'value.exec.title': 'Hospital Executives',
    'value.exec.desc': 'Reduce preventable readmissions, free bed capacity, and demonstrate value-based care outcomes.',
    'value.clinical.title': 'Clinical Teams',
    'value.clinical.desc': 'See all discharged patients in one prioritized view. Intervene early, before emergency presentation.',
    'value.patient.title': 'Patients',
    'value.patient.desc': 'Brief daily check-ins provide peace of mind and a direct line to your care team if something changes.',
    
    // CTA
    'cta.title': 'Ready to learn more?',
    'cta.subtitle': 'Schedule a demonstration or request clinical documentation.',
    'cta.button': 'Contact us',
    
    // Footer
    'footer.tagline': 'Post-discharge monitoring that prevents readmissions.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.problem': 'The Problem',
    'footer.solution': 'How It Works',
    'footer.evidence': 'Evidence',
    'footer.governance': 'Governance',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.health': 'Digital Health Company',
  },
  fr: {
    // Nav
    'nav.problem': 'Problème',
    'nav.solution': 'Solution',
    'nav.evidence': 'Preuves',
    'nav.governance': 'Gouvernance',
    'nav.contact': 'Contactez-nous',
    
    // Hero
    'hero.title': 'Surveillance post-hospitalisation qui prévient les réadmissions',
    'hero.subtitle': 'Suivis quotidiens des patients. Classification automatique des risques. Listes de travail cliniques prioritaires.',
    'hero.cta.primary': 'Voir comment ça fonctionne',
    'hero.cta.secondary': 'Demander une démo',
    
    // Workflow
    'workflow.title': 'Comment fonctionne Aescia',
    'workflow.subtitle': 'Une couche simple et évolutive entre les patients sortis et les équipes cliniques.',
    'workflow.patient.title': 'Patient à domicile',
    'workflow.patient.desc': 'Récemment sorti, dans la période de récupération à haut risque',
    'workflow.checkin': 'Suivi quotidien',
    'workflow.checkin.desc': 'Questionnaire de symptômes adapté à la procédure et aux facteurs de risque',
    'workflow.platform.title': 'Plateforme Aescia',
    'workflow.platform.desc': 'Classification automatique des risques utilisant une logique transparente basée sur des règles',
    'workflow.alerts': 'Alertes prioritaires',
    'workflow.alerts.desc': 'Signaux cliniquement pertinents affichés par urgence',
    'workflow.clinical.title': 'Équipe clinique',
    'workflow.clinical.desc': 'Liste de travail unique prioritaire, ordonnée par urgence',
    'workflow.benefit.worklist': 'Une seule liste de travail pour toute la cohorte de sorties',
    'workflow.link': 'En savoir plus sur le flux de travail clinique',
    
    // Value Props
    'value.title': 'Conçu pour les soins de santé',
    'value.exec.title': 'Dirigeants hospitaliers',
    'value.exec.desc': 'Réduisez les réadmissions évitables, libérez des lits et démontrez des résultats de soins basés sur la valeur.',
    'value.clinical.title': 'Équipes cliniques',
    'value.clinical.desc': 'Voir tous les patients sortis dans une seule vue prioritaire. Intervenir tôt, avant la présentation aux urgences.',
    'value.patient.title': 'Patients',
    'value.patient.desc': 'De brefs suivis quotidiens apportent tranquillité d\'esprit et une ligne directe vers votre équipe de soins.',
    
    // CTA
    'cta.title': 'Prêt à en savoir plus?',
    'cta.subtitle': 'Planifiez une démonstration ou demandez la documentation clinique.',
    'cta.button': 'Contactez-nous',
    
    // Footer
    'footer.tagline': 'Surveillance post-hospitalisation qui prévient les réadmissions.',
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.legal': 'Légal',
    'footer.problem': 'Le problème',
    'footer.solution': 'Comment ça fonctionne',
    'footer.evidence': 'Preuves',
    'footer.governance': 'Gouvernance',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.health': 'Entreprise de santé numérique',
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
  const { locale, setLocale } = useI18n()

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
      className="text-sm font-medium px-3 py-1 rounded border border-current opacity-70 hover:opacity-100 transition-opacity"
      aria-label={locale === 'en' ? 'Switch to French' : 'Passer en anglais'}
    >
      {locale === 'en' ? 'FR' : 'EN'}
    </button>
  )
}
