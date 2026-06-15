// Self-contained dictionary for the shared endoscopy-ASC footer CTA component.
// Consumed by components/asc-page-cta.tsx. 'en' holds the original English
// verbatim; the other five locales translate each en value. All six locales
// share an identical key set.
//
// Preserve-list tokens ('Aescia', 'ASC') are kept verbatim across every locale.
// The default lead sentence can be overridden at the call site via the `line`
// prop; these values are only the fallback copy.
export const dict: Record<string, Record<string, string>> = {
  en: {
    'asccta.defaultLine': 'See whether Aescia fits your ASC. The design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline.',
    'asccta.designPartner': 'Design-partner program',
    'asccta.contact': 'Contact Aescia',
  },
  fr: {
    'asccta.defaultLine': 'Voyez si Aescia convient à votre ASC. Le pilote de partenaire de conception est gratuit ou sous une remise avec remboursement jusqu\'à ce qu\'Aescia apporte un bénéfice net mesurable par rapport à votre propre base de référence.',
    'asccta.designPartner': 'Programme de partenaires de conception',
    'asccta.contact': 'Contacter Aescia',
  },
  es: {
    'asccta.defaultLine': 'Vea si Aescia se ajusta a su ASC. El piloto de socio de diseño es gratuito o se ofrece con un reembolso garantizado hasta que Aescia entregue un beneficio neto medible frente a su propia línea de base.',
    'asccta.designPartner': 'Programa de socios de diseño',
    'asccta.contact': 'Contactar a Aescia',
  },
  zh: {
    'asccta.defaultLine': '看看 Aescia 是否适合您的 ASC。设计合作伙伴试点免费提供，或采用退款返利模式，直到 Aescia 相对于您自己的基线交付可衡量的净收益为止。',
    'asccta.designPartner': '设计合作伙伴计划',
    'asccta.contact': '联系 Aescia',
  },
  ar: {
    'asccta.defaultLine': 'تحقّق مما إذا كانت Aescia تناسب الـ ASC الخاص بك. يكون البرنامج التجريبي لشريك التصميم مجانيًا أو بموجب حسم قابل للاسترداد إلى أن تحقّق Aescia فائدة صافية قابلة للقياس مقارنةً بخط الأساس الخاص بك.',
    'asccta.designPartner': 'برنامج شريك التصميم',
    'asccta.contact': 'تواصل مع Aescia',
  },
  vi: {
    'asccta.defaultLine': 'Hãy xem liệu Aescia có phù hợp với ASC của bạn hay không. Chương trình thí điểm đối tác thiết kế được cung cấp miễn phí hoặc theo hình thức hoàn tiền cho đến khi Aescia mang lại lợi ích ròng có thể đo lường được so với đường cơ sở của chính bạn.',
    'asccta.designPartner': 'Chương trình đối tác thiết kế',
    'asccta.contact': 'Liên hệ Aescia',
  },
}
