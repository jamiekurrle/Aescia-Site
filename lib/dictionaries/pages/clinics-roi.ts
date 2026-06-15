// Self-contained dictionary for the /clinics ROI calculator.
// Consumed by components/clinics-roi.tsx. 'en' holds the original English
// verbatim; the other five locales translate each en value. All six locales
// share an identical key set.
//
// Placeholder TOKENS are kept verbatim across every locale (translators place
// them in natural word order, never translate them):
//   {value}  a USD figure computed in the component (e.g. "$42K")
//   {c} {e} {p}  conservative / expected / potential percentages
//   {pct}  automatable share of nurse time, as a number (e.g. "60")
//   {rate}  loaded nurse rate in USD/hr, as a number (e.g. "45")
//   {price}  Aescia per-scope price in USD, as a number (e.g. "8")
// The dynamic numbers themselves are NOT translated; only the surrounding words.
//
// Preserve-list tokens (brand, product names, acronyms/standards, citation
// names, codes, numbers/percentages/currency) are kept verbatim across every
// locale: Aescia, ASC, GI, ROI, USD, GLP-1, CMS, CPT, Allen 2023, Beran 2024,
// Mehta 2021, Lebwohl 2011, Am J Gastroenterol, MedPAC/CBO, Medicare, LPN/RN.
// Regulatory/sourcing phrasing is translated conservatively without softening,
// strengthening, omitting, or inventing any claim.
export const dict: Record<string, Record<string, string>> = {
  en: {
    'roi.inputs.heading': 'Your numbers',
    'roi.inputs.intro': 'Set the inputs to your own ASC. Defaults are an average US GI ASC and the US literature midpoints, sourced below. Every figure to the right rescales in real time.',

    'roi.field.scopes.label': 'Annual colonoscopy volume (scopes per year)',
    'roi.field.lateCancel.label': 'Late cancellation rate (about 24h notice)',
    'roi.field.lateCancel.hint': 'Cancellations that arrive late enough the slot would sit empty, but with about a day\'s notice, which is enough to backfill. Typical 3–8%. Same-day prep failures are not counted here because they cannot be refilled in time.',
    'roi.field.noShow.label': 'No-show rate (patient does not arrive)',
    'roi.field.noShow.hint': 'Common range: 5–15%. Separate from the late cancellation above, and not backfillable (no notice). Edit to your actual rate.',
    'roi.field.facilityFee.label': 'Recovered revenue per slot (USD)',
    'roi.field.facilityFee.hint': 'What a recovered slot bills, not margin. Allen 2023 ASC range $989–$1,034; default $1,011. Set yours; Medicare-heavy panels collect less.',
    'roi.field.endoscopistFee.label': 'Endoscopist professional fee per scope (USD)',
    'roi.field.endoscopistFee.hint': 'The proceduralist\'s professional fee per scope, separate from the facility fee above. Default $400 is a typical commercial colonoscopy professional fee (Medicare runs ~$220–300; commercial ~$300–500), about a 2.5:1 facility-to-professional ratio. Edit to your own rates. Drives the endoscopist loss line only, not the ROI multiple.',
    'roi.field.backfill.label': 'Late cancellations you refill today',
    'roi.field.backfill.hint': 'Share of late cancellations your team refills now. Default 25%: short-notice slots are hard to fill without a prep-ready pool. Aescia credits only the lift above this.',
    'roi.field.nurseMinutes.label': 'Nurse time per patient on prep calls',
    'roi.field.nurseMinutes.hint': 'Minutes per patient your team spends on prep reminders and confirmations. Drives the staff-time line below; ~60% is automatable.',

    'roi.outcomes.heading': 'Range of outcomes',
    'roi.outcomes.intro': 'Three bands tied to effect sizes from the literature. Aescia commits to no point estimate. Pilots are scoped to confirm where on the range your site lands.',

    'roi.band.conservative': 'Conservative',
    'roi.band.expected': 'Expected',
    'roi.band.potential': 'Potential',

    'roi.perYear': '/yr',
    'roi.roiLabel': 'ROI',

    'roi.loss.heading': 'Every month without Aescia',
    'roi.loss.facility': 'you are losing about {value}',
    'roi.loss.endoscopist': 'and your endoscopists are losing about {value} in professional fees',
    'roi.loss.caveat': 'Conservative band, contingent on a pilot validating the effect at your site. Assumptions and sources are below.',

    'roi.assumptions.heading': 'Assumptions, made visible',
    'roi.assumptions.cancelReduction': 'Late cancellation reduction: {c} / {e} / {p} (conservative / expected / potential).',
    'roi.assumptions.noShowReduction': 'No-show reduction: {c} / {e} / {p}.',
    'roi.assumptions.backfillRate': 'Prep-aware backfill rate on late cancellations: {c} / {e} / {p}, against a current rate you set (default 25%). The model credits only the lift over your current rate, on late cancellations only. Pilot-to-prove against your own baseline.',
    'roi.assumptions.netting': 'Prevention is netted by your current backfill: a late cancellation you would have refilled anyway is not counted as a recovered slot, so prevention and backfill do not double-count.',
    'roi.assumptions.facilityValue': 'A recovered slot is valued at the recovered revenue (gross facility fee) you set, not contribution margin. The endoscopist professional-fee loss is shown as a separate line and is not included in the facility figure or the ROI multiple; pathology and other downstream revenue are not counted.',
    'roi.assumptions.endoscopistFee': 'Endoscopist professional fee: the per-scope figure you set drives the separate endoscopist loss line, on the same recoverable slots. Default $400 is a reasonable commercial professional fee for a colonoscopy — Medicare pays ~$220–300 (CPT 45378/45385 at the 2026 conversion factor) and commercial ~$300–500. Against the commercial facility fee that is about a 2.5:1 facility-to-professional split, the normal commercial range. Set both to your own rates.',
    'roi.assumptions.staffTime': 'Staff time is included in the figures above: {pct}% of your nurse prep-call minutes (default 20 min/patient) at ${rate}/hr loaded. Treat it as the soft part of the range: it is real cash only if you redeploy the freed hours into more cases or a deferred hire.',
    'roi.assumptions.price': 'Aescia price: ${price}/scope, US institutional rate, which is the spend the ROI multiple is measured against. Volume tiers and design-partner discounts not reflected here.',
    'roi.assumptions.commitment': 'Aescia commits to the conservative band in writing during design-partner pilots; the backfill lift is confirmed against your own baseline in the pilot.',
    'roi.assumptions.backfillScope': 'Backfill applies to late cancellations only (about a day\'s notice). Same-day prep failures and no-shows are not backfillable, so they count toward prevention, never backfill. No-show default 8% (typical 5–15%).',
    'roi.assumptions.beran': 'Beran 2024 (Am J Gastroenterol, n=358,257, 154 studies) anchors that inadequate prep is a common, upstream problem with addressable risk factors. Cancellation/no-show effect sizes are from the prep-coaching and SMS-reminder literature.',
    'roi.assumptions.facilityFee': 'Facility fee: Allen 2023, CMS ASC CPT 45378–45385 (USD $989–$1,034).',
  },
  fr: {
    'roi.inputs.heading': 'Vos chiffres',
    'roi.inputs.intro': 'Réglez les entrées selon votre propre ASC. Les valeurs par défaut correspondent à un ASC GI américain moyen et aux médianes de la littérature américaine, sourcées ci-dessous. Chaque chiffre à droite se recalcule en temps réel.',

    'roi.field.scopes.label': 'Volume annuel de coloscopies (scopes par an)',
    'roi.field.lateCancel.label': 'Taux d\'annulation tardive (préavis d\'environ 24 h)',
    'roi.field.lateCancel.hint': 'Annulations qui arrivent assez tard pour que le créneau reste vide, mais avec environ un jour de préavis, ce qui suffit pour le remplir. Habituellement 3–8%. Les échecs de préparation le jour même ne sont pas comptés ici car ils ne peuvent pas être comblés à temps.',
    'roi.field.noShow.label': 'Taux d\'absence (le patient ne se présente pas)',
    'roi.field.noShow.hint': 'Plage courante : 5–15%. Distinct de l\'annulation tardive ci-dessus, et non remplissable (aucun préavis). Modifiez selon votre taux réel.',
    'roi.field.facilityFee.label': 'Revenu récupéré par créneau (USD)',
    'roi.field.facilityFee.hint': 'Ce qu\'un créneau récupéré facture, pas la marge. Plage ASC d\'Allen 2023 $989–$1,034 ; valeur par défaut $1,011. Réglez la vôtre ; les panels à forte composante Medicare encaissent moins.',
    'roi.field.endoscopistFee.label': 'Honoraires professionnels de l\'endoscopiste par scope (USD)',
    'roi.field.endoscopistFee.hint': 'Les honoraires professionnels de l\'opérateur par scope, distincts des frais d\'établissement ci-dessus. La valeur par défaut $400 est un honoraire professionnel commercial typique pour une coloscopie (Medicare ~$220–300 ; commercial ~$300–500), soit un rapport établissement/honoraires d\'environ 2,5:1. Modifiez selon vos propres tarifs. Détermine seulement la ligne de perte de l\'endoscopiste, pas le multiple ROI.',
    'roi.field.backfill.label': 'Annulations tardives que vous remplissez aujourd\'hui',
    'roi.field.backfill.hint': 'Part des annulations tardives que votre équipe remplit actuellement. Valeur par défaut 25% : les créneaux à court préavis sont difficiles à combler sans un bassin de patients prêts pour la préparation. Aescia ne crédite que le gain au-dessus de ce niveau.',
    'roi.field.nurseMinutes.label': 'Temps infirmier par patient sur les appels de préparation',
    'roi.field.nurseMinutes.hint': 'Minutes par patient que votre équipe consacre aux rappels et confirmations de préparation. Détermine la ligne de temps du personnel ci-dessous ; environ 60% est automatisable.',

    'roi.outcomes.heading': 'Éventail des résultats',
    'roi.outcomes.intro': 'Trois bandes liées à des tailles d\'effet issues de la littérature. Aescia ne s\'engage sur aucune estimation ponctuelle. Les pilotes sont cadrés pour confirmer où votre site se situe sur l\'éventail.',

    'roi.band.conservative': 'Conservateur',
    'roi.band.expected': 'Attendu',
    'roi.band.potential': 'Potentiel',

    'roi.perYear': '/an',
    'roi.roiLabel': 'ROI',

    'roi.loss.heading': 'Chaque mois sans Aescia',
    'roi.loss.facility': 'vous perdez environ {value}',
    'roi.loss.endoscopist': 'et vos endoscopistes perdent environ {value} en honoraires professionnels',
    'roi.loss.caveat': 'Bande conservatrice, sous réserve qu\'un pilote valide l\'effet sur votre site. Les hypothèses et les sources sont ci-dessous.',

    'roi.assumptions.heading': 'Hypothèses, rendues visibles',
    'roi.assumptions.cancelReduction': 'Réduction des annulations tardives : {c} / {e} / {p} (conservateur / attendu / potentiel).',
    'roi.assumptions.noShowReduction': 'Réduction des absences : {c} / {e} / {p}.',
    'roi.assumptions.backfillRate': 'Taux de remplissage tenant compte de la préparation sur les annulations tardives : {c} / {e} / {p}, par rapport à un taux actuel que vous fixez (par défaut 25%). Le modèle ne crédite que le gain au-dessus de votre taux actuel, et uniquement sur les annulations tardives. À prouver en pilote contre votre propre référence.',
    'roi.assumptions.netting': 'La prévention est nettée par votre remplissage actuel : une annulation tardive que vous auriez de toute façon comblée n\'est pas comptée comme un créneau récupéré, de sorte que prévention et remplissage ne se comptent pas en double.',
    'roi.assumptions.facilityValue': 'Un créneau récupéré est valorisé au revenu récupéré (frais bruts d\'établissement) que vous fixez, et non à la marge sur coûts variables. La perte d\'honoraires professionnels de l\'endoscopiste est présentée sur une ligne distincte et n\'est pas incluse dans le chiffre de l\'établissement ni dans le multiple ROI ; l\'anatomopathologie et les autres revenus en aval ne sont pas comptés.',
    'roi.assumptions.endoscopistFee': 'Honoraires professionnels de l\'endoscopiste : le chiffre par scope que vous fixez détermine la ligne de perte distincte de l\'endoscopiste, sur les mêmes créneaux récupérables. La valeur par défaut $400 est un honoraire professionnel commercial raisonnable pour une coloscopie — Medicare paie ~$220–300 (CPT 45378/45385 au facteur de conversion 2026) et le commercial ~$300–500. Par rapport aux frais d\'établissement commerciaux, cela représente un rapport établissement/honoraires d\'environ 2,5:1, la plage commerciale normale. Réglez les deux selon vos propres tarifs.',
    'roi.assumptions.staffTime': 'Le temps du personnel est inclus dans les chiffres ci-dessus : {pct}% des minutes d\'appels de préparation de vos infirmiers (par défaut 20 min/patient) à ${rate}/h chargé. Traitez-le comme la partie souple de l\'éventail : c\'est de l\'argent réel seulement si vous redéployez les heures libérées vers plus de cas ou une embauche différée.',
    'roi.assumptions.price': 'Prix Aescia : ${price}/scope, tarif institutionnel américain, qui est la dépense par rapport à laquelle le multiple ROI est mesuré. Les paliers de volume et les remises de partenaires de conception ne sont pas reflétés ici.',
    'roi.assumptions.commitment': 'Aescia s\'engage sur la bande conservatrice par écrit pendant les pilotes de partenaires de conception ; le gain de remplissage est confirmé contre votre propre référence dans le pilote.',
    'roi.assumptions.backfillScope': 'Le remplissage s\'applique aux annulations tardives uniquement (environ un jour de préavis). Les échecs de préparation le jour même et les absences ne sont pas remplissables, ils comptent donc dans la prévention, jamais dans le remplissage. Absence par défaut 8% (habituellement 5–15%).',
    'roi.assumptions.beran': 'Beran 2024 (Am J Gastroenterol, n=358,257, 154 études) établit qu\'une préparation inadéquate est un problème courant et en amont, avec des facteurs de risque adressables. Les tailles d\'effet sur les annulations/absences proviennent de la littérature sur l\'accompagnement de la préparation et les rappels par SMS.',
    'roi.assumptions.facilityFee': 'Frais d\'établissement : Allen 2023, CMS ASC CPT 45378–45385 (USD $989–$1,034).',
  },
  es: {
    'roi.inputs.heading': 'Sus cifras',
    'roi.inputs.intro': 'Ajuste los datos a su propio ASC. Los valores predeterminados corresponden a un ASC de GI estadounidense promedio y a las medianas de la literatura estadounidense, con fuentes abajo. Cada cifra a la derecha se reescala en tiempo real.',

    'roi.field.scopes.label': 'Volumen anual de colonoscopias (scopes por año)',
    'roi.field.lateCancel.label': 'Tasa de cancelación tardía (aviso de unas 24 h)',
    'roi.field.lateCancel.hint': 'Cancelaciones que llegan lo bastante tarde como para que el espacio quede vacío, pero con cerca de un día de aviso, suficiente para rellenarlo. Habitualmente 3–8%. Los fallos de preparación el mismo día no se cuentan aquí porque no se pueden cubrir a tiempo.',
    'roi.field.noShow.label': 'Tasa de inasistencia (el paciente no llega)',
    'roi.field.noShow.hint': 'Rango común: 5–15%. Distinto de la cancelación tardía anterior, y no rellenable (sin aviso). Edite según su tasa real.',
    'roi.field.facilityFee.label': 'Ingreso recuperado por espacio (USD)',
    'roi.field.facilityFee.hint': 'Lo que factura un espacio recuperado, no el margen. Rango ASC de Allen 2023 $989–$1,034; predeterminado $1,011. Ajuste el suyo; los paneles con alta proporción de Medicare cobran menos.',
    'roi.field.endoscopistFee.label': 'Honorarios profesionales del endoscopista por scope (USD)',
    'roi.field.endoscopistFee.hint': 'Los honorarios profesionales del operador por scope, distintos de la tarifa de instalación anterior. El valor predeterminado $400 es un honorario profesional comercial típico para una colonoscopia (Medicare ~$220–300; comercial ~$300–500), cerca de una proporción instalación/honorarios de 2,5:1. Edite según sus propias tarifas. Determina solo la línea de pérdida del endoscopista, no el múltiplo de ROI.',
    'roi.field.backfill.label': 'Cancelaciones tardías que rellena hoy',
    'roi.field.backfill.hint': 'Proporción de cancelaciones tardías que su equipo rellena actualmente. Predeterminado 25%: los espacios con poco aviso son difíciles de cubrir sin un grupo de pacientes listos para la preparación. Aescia acredita solo el incremento por encima de este nivel.',
    'roi.field.nurseMinutes.label': 'Tiempo de enfermería por paciente en llamadas de preparación',
    'roi.field.nurseMinutes.hint': 'Minutos por paciente que su equipo dedica a recordatorios y confirmaciones de preparación. Determina la línea de tiempo del personal abajo; cerca del 60% es automatizable.',

    'roi.outcomes.heading': 'Rango de resultados',
    'roi.outcomes.intro': 'Tres bandas vinculadas a tamaños de efecto de la literatura. Aescia no se compromete con ninguna estimación puntual. Los pilotos se delimitan para confirmar en qué punto del rango se ubica su sitio.',

    'roi.band.conservative': 'Conservador',
    'roi.band.expected': 'Esperado',
    'roi.band.potential': 'Potencial',

    'roi.perYear': '/año',
    'roi.roiLabel': 'ROI',

    'roi.loss.heading': 'Cada mes sin Aescia',
    'roi.loss.facility': 'usted pierde alrededor de {value}',
    'roi.loss.endoscopist': 'y sus endoscopistas pierden alrededor de {value} en honorarios profesionales',
    'roi.loss.caveat': 'Banda conservadora, supeditada a que un piloto valide el efecto en su sitio. Los supuestos y las fuentes están abajo.',

    'roi.assumptions.heading': 'Supuestos, hechos visibles',
    'roi.assumptions.cancelReduction': 'Reducción de cancelaciones tardías: {c} / {e} / {p} (conservador / esperado / potencial).',
    'roi.assumptions.noShowReduction': 'Reducción de inasistencias: {c} / {e} / {p}.',
    'roi.assumptions.backfillRate': 'Tasa de relleno consciente de la preparación en cancelaciones tardías: {c} / {e} / {p}, frente a una tasa actual que usted fija (predeterminado 25%). El modelo acredita solo el incremento por encima de su tasa actual, únicamente en cancelaciones tardías. A demostrar en piloto frente a su propia línea base.',
    'roi.assumptions.netting': 'La prevención se neta con su relleno actual: una cancelación tardía que de todos modos habría cubierto no se cuenta como espacio recuperado, de modo que prevención y relleno no se cuentan dos veces.',
    'roi.assumptions.facilityValue': 'Un espacio recuperado se valora al ingreso recuperado (tarifa bruta de instalación) que usted fija, no al margen de contribución. La pérdida de honorarios profesionales del endoscopista se muestra en una línea aparte y no se incluye en la cifra de la instalación ni en el múltiplo de ROI; la anatomía patológica y otros ingresos posteriores no se cuentan.',
    'roi.assumptions.endoscopistFee': 'Honorarios profesionales del endoscopista: la cifra por scope que usted fija determina la línea de pérdida aparte del endoscopista, sobre los mismos espacios recuperables. El valor predeterminado $400 es un honorario profesional comercial razonable para una colonoscopia: Medicare paga ~$220–300 (CPT 45378/45385 al factor de conversión de 2026) y el comercial ~$300–500. Frente a la tarifa de instalación comercial, eso representa una proporción instalación/honorarios de unos 2,5:1, el rango comercial normal. Ajuste ambos a sus propias tarifas.',
    'roi.assumptions.staffTime': 'El tiempo del personal está incluido en las cifras de arriba: {pct}% de los minutos de llamadas de preparación de su enfermería (predeterminado 20 min/paciente) a ${rate}/h cargado. Trátelo como la parte blanda del rango: es dinero real solo si redistribuye las horas liberadas hacia más casos o una contratación diferida.',
    'roi.assumptions.price': 'Precio de Aescia: ${price}/scope, tarifa institucional estadounidense, que es el gasto contra el que se mide el múltiplo de ROI. Los tramos por volumen y los descuentos de socios de diseño no se reflejan aquí.',
    'roi.assumptions.commitment': 'Aescia se compromete con la banda conservadora por escrito durante los pilotos de socios de diseño; el incremento de relleno se confirma frente a su propia línea base en el piloto.',
    'roi.assumptions.backfillScope': 'El relleno se aplica solo a cancelaciones tardías (cerca de un día de aviso). Los fallos de preparación el mismo día y las inasistencias no son rellenables, por lo que cuentan para la prevención, nunca para el relleno. Inasistencia predeterminada 8% (habitualmente 5–15%).',
    'roi.assumptions.beran': 'Beran 2024 (Am J Gastroenterol, n=358,257, 154 estudios) establece que la preparación inadecuada es un problema común y de raíz, con factores de riesgo abordables. Los tamaños de efecto sobre cancelaciones/inasistencias provienen de la literatura sobre acompañamiento de la preparación y recordatorios por SMS.',
    'roi.assumptions.facilityFee': 'Tarifa de instalación: Allen 2023, CMS ASC CPT 45378–45385 (USD $989–$1,034).',
  },
  zh: {
    'roi.inputs.heading': '您的数据',
    'roi.inputs.intro': '将输入设置为您自己的 ASC。默认值取自一家美国 GI ASC 的平均水平和美国文献的中位数，来源见下文。右侧的每个数字都会实时重新计算。',

    'roi.field.scopes.label': '年度结肠镜检查量（每年 scopes 数）',
    'roi.field.lateCancel.label': '迟到取消率（约提前 24 小时通知）',
    'roi.field.lateCancel.hint': '取消时间已晚到足以让该时段空置，但仍有约一天的通知，足以回填。通常为 3–8%。当日的肠道准备失败不计入此处，因为它们无法及时补填。',
    'roi.field.noShow.label': '爽约率（患者未到）',
    'roi.field.noShow.hint': '常见范围：5–15%。与上面的迟到取消不同，且无法回填（没有通知）。请根据您的实际比率修改。',
    'roi.field.facilityFee.label': '每个时段的回收收入（USD）',
    'roi.field.facilityFee.hint': '一个回收时段所开出的账单，而非利润。Allen 2023 的 ASC 区间为 $989–$1,034；默认值 $1,011。请设置您自己的数值；Medicare 占比高的患者群收取较少。',
    'roi.field.endoscopistFee.label': '每个 scope 的内镜医师专业费（USD）',
    'roi.field.endoscopistFee.hint': '操作医师每个 scope 的专业费，与上面的设施费不同。默认值 $400 是结肠镜检查的典型商业专业费（Medicare 约 $220–300；商业约 $300–500），设施费与专业费之比约为 2.5:1。请按您自己的费率修改。仅影响内镜医师损失行，不影响 ROI 倍数。',
    'roi.field.backfill.label': '您目前回填的迟到取消',
    'roi.field.backfill.hint': '您的团队目前回填的迟到取消所占比例。默认值 25%：在没有一批已准备就绪患者的情况下，短通知时段很难填补。Aescia 仅计入高于此比例的增量。',
    'roi.field.nurseMinutes.label': '每位患者在准备来电上的护士时间',
    'roi.field.nurseMinutes.hint': '您的团队为每位患者在准备提醒和确认上所花的分钟数。影响下方的人员时间行；约 60% 可自动化。',

    'roi.outcomes.heading': '结果区间',
    'roi.outcomes.intro': '三个区间与文献中的效应量相对应。Aescia 不承诺任何点估计。试点的范围旨在确认您的站点落在区间的何处。',

    'roi.band.conservative': '保守',
    'roi.band.expected': '预期',
    'roi.band.potential': '潜在',

    'roi.perYear': '/年',
    'roi.roiLabel': 'ROI',

    'roi.loss.heading': '没有 Aescia 的每个月',
    'roi.loss.facility': '您大约损失 {value}',
    'roi.loss.endoscopist': '而您的内镜医师在专业费方面大约损失 {value}',
    'roi.loss.caveat': '保守区间，取决于试点在您站点验证该效应。假设和来源见下文。',

    'roi.assumptions.heading': '已公开的假设',
    'roi.assumptions.cancelReduction': '迟到取消的减少：{c} / {e} / {p}（保守 / 预期 / 潜在）。',
    'roi.assumptions.noShowReduction': '爽约的减少：{c} / {e} / {p}。',
    'roi.assumptions.backfillRate': '迟到取消上考虑准备状态的回填率：{c} / {e} / {p}，相对于您设置的当前比率（默认 25%）。该模型仅计入高于您当前比率的增量，且仅针对迟到取消。需在试点中针对您自己的基线加以证明。',
    'roi.assumptions.netting': '预防按您当前的回填进行净算：您本来也会回填的迟到取消不计为回收时段，因此预防与回填不会重复计算。',
    'roi.assumptions.facilityValue': '一个回收时段按您设置的回收收入（设施费总额）计价，而非贡献利润。内镜医师专业费损失另列一行，不包含在设施数字或 ROI 倍数中；病理及其他下游收入不计入。',
    'roi.assumptions.endoscopistFee': '内镜医师专业费：您设置的每个 scope 数字决定单独的内镜医师损失行，针对同样的可回收时段。默认值 $400 是一次结肠镜检查合理的商业专业费——Medicare 支付约 $220–300（CPT 45378/45385，按 2026 年转换系数），商业约 $300–500。相对于商业设施费，这约为 2.5:1 的设施对专业费之比，属于正常的商业区间。请将两者都设置为您自己的费率。',
    'roi.assumptions.staffTime': '人员时间已包含在上面的数字中：您护士准备来电分钟数的 {pct}%（默认每位患者 20 分钟），按加载后 ${rate}/小时计。请将其视为区间中较软的部分：只有当您把腾出的时间重新投入到更多病例或推迟招聘时，它才是真正的现金。',
    'roi.assumptions.price': 'Aescia 价格：${price}/scope，美国机构费率，即衡量 ROI 倍数所对照的支出。此处未反映量级分层和设计合作伙伴折扣。',
    'roi.assumptions.commitment': 'Aescia 在设计合作伙伴试点期间以书面形式承诺保守区间；回填增量在试点中针对您自己的基线加以确认。',
    'roi.assumptions.backfillScope': '回填仅适用于迟到取消（约一天的通知）。当日的准备失败和爽约无法回填，因此它们计入预防，绝不计入回填。爽约默认 8%（通常 5–15%）。',
    'roi.assumptions.beran': 'Beran 2024（Am J Gastroenterol，n=358,257，154 项研究）确立了准备不足是一个常见的上游问题，具有可干预的风险因素。取消/爽约的效应量来自准备指导和 SMS 提醒文献。',
    'roi.assumptions.facilityFee': '设施费：Allen 2023，CMS ASC CPT 45378–45385（USD $989–$1,034）。',
  },
  ar: {
    'roi.inputs.heading': 'أرقامك',
    'roi.inputs.intro': 'اضبط المدخلات على ASC الخاص بك. القيم الافتراضية هي لمركز ASC أمريكي متوسط في GI ووسطاء القيم في الأدبيات الأمريكية، والمصادر مذكورة أدناه. ويُعاد حساب كل رقم على اليمين في الوقت الفعلي.',

    'roi.field.scopes.label': 'حجم تنظير القولون السنوي (عدد scopes في السنة)',
    'roi.field.lateCancel.label': 'معدّل الإلغاء المتأخّر (إشعار بنحو 24 ساعة)',
    'roi.field.lateCancel.hint': 'الإلغاءات التي تصل متأخرة بما يكفي ليبقى الموعد فارغًا، لكن بإشعار يبلغ نحو يوم، وهو كافٍ لإعادة الملء. عادةً 3–8%. ولا تُحتسَب هنا إخفاقات التحضير في اليوم نفسه لأنها لا يمكن إعادة ملئها في الوقت المناسب.',
    'roi.field.noShow.label': 'معدّل التخلّف عن الموعد (المريض لا يحضر)',
    'roi.field.noShow.hint': 'النطاق الشائع: 5–15%. وهو منفصل عن الإلغاء المتأخّر أعلاه، وغير قابل لإعادة الملء (لا إشعار). عدّله بحسب معدّلك الفعلي.',
    'roi.field.facilityFee.label': 'الإيراد المُستردّ لكل موعد (USD)',
    'roi.field.facilityFee.hint': 'ما يفوتره الموعد المُستردّ، لا الهامش. نطاق ASC في Allen 2023 هو $989–$1,034؛ والقيمة الافتراضية $1,011. اضبط قيمتك؛ والمجموعات ذات النسبة العالية من Medicare تحصّل أقل.',
    'roi.field.endoscopistFee.label': 'الأجر المهني لطبيب التنظير لكل scope (USD)',
    'roi.field.endoscopistFee.hint': 'الأجر المهني للطبيب المُجري لكل scope، منفصل عن رسوم المنشأة أعلاه. القيمة الافتراضية $400 هي أجر مهني تجاري نموذجي لتنظير القولون (Medicare نحو $220–300؛ تجاري نحو $300–500)، أي نسبة منشأة إلى أجر مهني تبلغ نحو 2.5:1. عدّله بحسب أسعارك. ويؤثّر فقط في سطر خسارة طبيب التنظير، لا في مضاعِف ROI.',
    'roi.field.backfill.label': 'الإلغاءات المتأخّرة التي تُعيد ملأها اليوم',
    'roi.field.backfill.hint': 'حصة الإلغاءات المتأخّرة التي يعيد فريقك ملأها حاليًا. القيمة الافتراضية 25%: المواعيد ذات الإشعار القصير يصعب ملؤها دون مجموعة مرضى جاهزين للتحضير. ولا تحتسب Aescia سوى الزيادة فوق هذا المستوى.',
    'roi.field.nurseMinutes.label': 'وقت الممرّضة لكل مريض في مكالمات التحضير',
    'roi.field.nurseMinutes.hint': 'عدد الدقائق لكل مريض التي يقضيها فريقك في تذكيرات وتأكيدات التحضير. ويؤثّر في سطر وقت الموظفين أدناه؛ ونحو 60% منها قابل للأتمتة.',

    'roi.outcomes.heading': 'نطاق النتائج',
    'roi.outcomes.intro': 'ثلاث نطاقات مرتبطة بأحجام الأثر من الأدبيات. ولا تلتزم Aescia بأي تقدير نقطي. والبرامج التجريبية محدَّدة النطاق لتأكيد موضع موقعك على النطاق.',

    'roi.band.conservative': 'متحفّظ',
    'roi.band.expected': 'متوقَّع',
    'roi.band.potential': 'محتمَل',

    'roi.perYear': '/سنة',
    'roi.roiLabel': 'ROI',

    'roi.loss.heading': 'كل شهر بدون Aescia',
    'roi.loss.facility': 'تخسر نحو {value}',
    'roi.loss.endoscopist': 'ويخسر أطباء التنظير لديك نحو {value} في الأجور المهنية',
    'roi.loss.caveat': 'النطاق المتحفّظ، مشروط بأن يؤكّد برنامج تجريبي الأثر في موقعك. الافتراضات والمصادر أدناه.',

    'roi.assumptions.heading': 'الافتراضات، مُظهَرة للعيان',
    'roi.assumptions.cancelReduction': 'خفض الإلغاء المتأخّر: {c} / {e} / {p} (متحفّظ / متوقَّع / محتمَل).',
    'roi.assumptions.noShowReduction': 'خفض التخلّف عن الموعد: {c} / {e} / {p}.',
    'roi.assumptions.backfillRate': 'معدّل إعادة الملء المراعي للتحضير على الإلغاءات المتأخّرة: {c} / {e} / {p}، مقابل معدّل حالي تحدّده أنت (الافتراضي 25%). ولا يحتسب النموذج سوى الزيادة فوق معدّلك الحالي، وعلى الإلغاءات المتأخّرة فقط. يُثبَت في البرنامج التجريبي مقابل خط الأساس الخاص بك.',
    'roi.assumptions.netting': 'تُصافى الوقاية بإعادة الملء الحالية لديك: فالإلغاء المتأخّر الذي كنت ستعيد ملأه على أي حال لا يُحتسَب موعدًا مُستردًّا، بحيث لا تُحتسَب الوقاية وإعادة الملء مرتين.',
    'roi.assumptions.facilityValue': 'يُقيَّم الموعد المُستردّ بالإيراد المُستردّ (إجمالي رسوم المنشأة) الذي تحدّده، لا بهامش المساهمة. وتُعرَض خسارة الأجر المهني لطبيب التنظير في سطر منفصل ولا تُدرَج في رقم المنشأة ولا في مضاعِف ROI؛ ولا تُحتسَب أمراض الأنسجة وغيرها من الإيرادات اللاحقة.',
    'roi.assumptions.endoscopistFee': 'الأجر المهني لطبيب التنظير: الرقم لكل scope الذي تحدّده يقود سطر خسارة طبيب التنظير المنفصل، على المواعيد القابلة للاسترداد نفسها. القيمة الافتراضية $400 هي أجر مهني تجاري معقول لتنظير القولون — يدفع Medicare نحو $220–300 (CPT 45378/45385 وفق معامل التحويل لعام 2026) والتجاري نحو $300–500. ومقابل رسوم المنشأة التجارية يكون ذلك نسبة منشأة إلى أجر مهني تبلغ نحو 2.5:1، وهو النطاق التجاري الطبيعي. اضبط كليهما بحسب أسعارك.',
    'roi.assumptions.staffTime': 'وقت الموظفين مُدرَج في الأرقام أعلاه: {pct}% من دقائق مكالمات التحضير لممرّضتك (الافتراضي 20 دقيقة/مريض) بسعر ${rate}/ساعة محمّل. عامِله بوصفه الجزء المرن من النطاق: فهو نقد حقيقي فقط إذا أعدت توظيف الساعات المُحرَّرة في مزيد من الحالات أو في تأجيل توظيف.',
    'roi.assumptions.price': 'سعر Aescia: ${price}/scope، السعر المؤسسي الأمريكي، وهو الإنفاق الذي يُقاس مقابله مضاعِف ROI. ولا تنعكس هنا شرائح الحجم وخصومات شركاء التصميم.',
    'roi.assumptions.commitment': 'تلتزم Aescia بالنطاق المتحفّظ كتابةً خلال برامج شركاء التصميم التجريبية؛ وتُؤكَّد زيادة إعادة الملء مقابل خط الأساس الخاص بك في البرنامج التجريبي.',
    'roi.assumptions.backfillScope': 'تنطبق إعادة الملء على الإلغاءات المتأخّرة فقط (إشعار بنحو يوم). وإخفاقات التحضير في اليوم نفسه وحالات التخلّف عن الموعد غير قابلة لإعادة الملء، لذا تُحتسَب ضمن الوقاية، لا ضمن إعادة الملء أبدًا. التخلّف عن الموعد افتراضيًا 8% (عادةً 5–15%).',
    'roi.assumptions.beran': 'يرسّخ Beran 2024 (Am J Gastroenterol، n=358,257، 154 دراسة) أن التحضير غير الكافي مشكلة شائعة وفي المنبع، ذات عوامل خطر قابلة للمعالجة. وأحجام الأثر على الإلغاء/التخلّف عن الموعد مستمدّة من أدبيات توجيه التحضير وتذكيرات SMS.',
    'roi.assumptions.facilityFee': 'رسوم المنشأة: Allen 2023، CMS ASC CPT 45378–45385 (USD $989–$1,034).',
  },
  vi: {
    'roi.inputs.heading': 'Các con số của bạn',
    'roi.inputs.intro': 'Đặt các giá trị đầu vào theo chính ASC của bạn. Giá trị mặc định là một ASC GI trung bình của Hoa Kỳ và các giá trị trung vị từ tài liệu Hoa Kỳ, có nguồn bên dưới. Mọi con số ở bên phải được tính lại theo thời gian thực.',

    'roi.field.scopes.label': 'Khối lượng nội soi đại tràng hằng năm (số scopes mỗi năm)',
    'roi.field.lateCancel.label': 'Tỷ lệ hủy muộn (báo trước khoảng 24 giờ)',
    'roi.field.lateCancel.hint': 'Các trường hợp hủy đến đủ muộn để suất bị bỏ trống, nhưng với khoảng một ngày báo trước, đủ để lấp suất. Thông thường 3–8%. Các thất bại chuẩn bị trong ngày không được tính ở đây vì không thể lấp lại kịp thời.',
    'roi.field.noShow.label': 'Tỷ lệ vắng mặt (bệnh nhân không đến)',
    'roi.field.noShow.hint': 'Khoảng phổ biến: 5–15%. Tách biệt với trường hợp hủy muộn ở trên, và không thể lấp suất (không báo trước). Hãy chỉnh theo tỷ lệ thực tế của bạn.',
    'roi.field.facilityFee.label': 'Doanh thu phục hồi cho mỗi suất (USD)',
    'roi.field.facilityFee.hint': 'Số tiền một suất được phục hồi xuất hóa đơn, không phải biên lợi nhuận. Khoảng ASC của Allen 2023 là $989–$1,034; mặc định $1,011. Đặt giá trị của bạn; các nhóm bệnh nhân nặng Medicare thu được ít hơn.',
    'roi.field.endoscopistFee.label': 'Phí chuyên môn của bác sĩ nội soi cho mỗi scope (USD)',
    'roi.field.endoscopistFee.hint': 'Phí chuyên môn của bác sĩ thực hiện cho mỗi scope, tách biệt với phí cơ sở ở trên. Mặc định $400 là phí chuyên môn thương mại điển hình cho một ca nội soi đại tràng (Medicare khoảng $220–300; thương mại khoảng $300–500), tức tỷ lệ cơ sở trên chuyên môn khoảng 2,5:1. Hãy chỉnh theo mức phí của bạn. Chỉ tác động đến dòng tổn thất của bác sĩ nội soi, không tác động đến bội số ROI.',
    'roi.field.backfill.label': 'Số trường hợp hủy muộn bạn lấp suất hôm nay',
    'roi.field.backfill.hint': 'Tỷ lệ các trường hợp hủy muộn mà nhóm của bạn hiện đang lấp suất. Mặc định 25%: các suất báo trước ngắn khó lấp nếu không có một nhóm bệnh nhân đã sẵn sàng chuẩn bị. Aescia chỉ ghi nhận phần tăng thêm vượt mức này.',
    'roi.field.nurseMinutes.label': 'Thời gian điều dưỡng cho mỗi bệnh nhân trong các cuộc gọi chuẩn bị',
    'roi.field.nurseMinutes.hint': 'Số phút cho mỗi bệnh nhân mà nhóm của bạn dành cho việc nhắc nhở và xác nhận chuẩn bị. Tác động đến dòng thời gian nhân sự bên dưới; khoảng 60% có thể tự động hóa.',

    'roi.outcomes.heading': 'Khoảng kết quả',
    'roi.outcomes.intro': 'Ba dải gắn với các cỡ hiệu ứng từ tài liệu. Aescia không cam kết một ước lượng điểm nào. Các giai đoạn thí điểm được khoanh phạm vi để xác nhận cơ sở của bạn nằm ở đâu trên khoảng này.',

    'roi.band.conservative': 'Thận trọng',
    'roi.band.expected': 'Kỳ vọng',
    'roi.band.potential': 'Tiềm năng',

    'roi.perYear': '/năm',
    'roi.roiLabel': 'ROI',

    'roi.loss.heading': 'Mỗi tháng không có Aescia',
    'roi.loss.facility': 'bạn đang mất khoảng {value}',
    'roi.loss.endoscopist': 'và các bác sĩ nội soi của bạn đang mất khoảng {value} tiền phí chuyên môn',
    'roi.loss.caveat': 'Dải thận trọng, tùy thuộc vào một giai đoạn thí điểm xác nhận hiệu ứng tại cơ sở của bạn. Các giả định và nguồn ở bên dưới.',

    'roi.assumptions.heading': 'Các giả định, được công khai',
    'roi.assumptions.cancelReduction': 'Giảm hủy muộn: {c} / {e} / {p} (thận trọng / kỳ vọng / tiềm năng).',
    'roi.assumptions.noShowReduction': 'Giảm vắng mặt: {c} / {e} / {p}.',
    'roi.assumptions.backfillRate': 'Tỷ lệ lấp suất có lưu ý đến việc chuẩn bị trên các trường hợp hủy muộn: {c} / {e} / {p}, so với một tỷ lệ hiện tại do bạn đặt (mặc định 25%). Mô hình chỉ ghi nhận phần tăng thêm vượt tỷ lệ hiện tại của bạn, và chỉ trên các trường hợp hủy muộn. Cần chứng minh trong giai đoạn thí điểm so với mức nền của chính bạn.',
    'roi.assumptions.netting': 'Phòng ngừa được bù trừ theo mức lấp suất hiện tại của bạn: một trường hợp hủy muộn mà dù sao bạn cũng đã lấp suất thì không được tính là một suất phục hồi, nên phòng ngừa và lấp suất không tính trùng hai lần.',
    'roi.assumptions.facilityValue': 'Một suất phục hồi được định giá theo doanh thu phục hồi (phí cơ sở gộp) bạn đặt, không phải biên lợi nhuận đóng góp. Tổn thất phí chuyên môn của bác sĩ nội soi được hiển thị thành một dòng riêng và không được tính vào con số cơ sở hay bội số ROI; bệnh học và các nguồn thu hạ nguồn khác không được tính.',
    'roi.assumptions.endoscopistFee': 'Phí chuyên môn của bác sĩ nội soi: con số cho mỗi scope mà bạn đặt sẽ điều khiển dòng tổn thất riêng của bác sĩ nội soi, trên cùng những suất có thể phục hồi. Mặc định $400 là phí chuyên môn thương mại hợp lý cho một ca nội soi đại tràng — Medicare trả khoảng $220–300 (CPT 45378/45385 theo hệ số quy đổi 2026) và thương mại khoảng $300–500. So với phí cơ sở thương mại, đó là tỷ lệ cơ sở trên chuyên môn khoảng 2,5:1, mức bình thường của khu vực thương mại. Hãy đặt cả hai theo mức phí của riêng bạn.',
    'roi.assumptions.staffTime': 'Thời gian nhân sự được tính vào các con số ở trên: {pct}% số phút gọi chuẩn bị của điều dưỡng của bạn (mặc định 20 phút/bệnh nhân) với ${rate}/giờ đã gộp chi phí. Hãy xem đó là phần mềm của khoảng: nó chỉ là tiền thực nếu bạn tái triển khai số giờ được giải phóng vào thêm ca hoặc một lần tuyển dụng được hoãn lại.',
    'roi.assumptions.price': 'Giá Aescia: ${price}/scope, mức giá thể chế Hoa Kỳ, là khoản chi mà bội số ROI được đo so với nó. Các bậc theo khối lượng và chiết khấu đối tác thiết kế không được phản ánh ở đây.',
    'roi.assumptions.commitment': 'Aescia cam kết dải thận trọng bằng văn bản trong các giai đoạn thí điểm đối tác thiết kế; phần tăng thêm của việc lấp suất được xác nhận so với mức nền của chính bạn trong giai đoạn thí điểm.',
    'roi.assumptions.backfillScope': 'Lấp suất chỉ áp dụng cho các trường hợp hủy muộn (báo trước khoảng một ngày). Các thất bại chuẩn bị trong ngày và các trường hợp vắng mặt không thể lấp suất, nên chúng được tính vào phòng ngừa, không bao giờ vào lấp suất. Vắng mặt mặc định 8% (thông thường 5–15%).',
    'roi.assumptions.beran': 'Beran 2024 (Am J Gastroenterol, n=358,257, 154 nghiên cứu) khẳng định rằng chuẩn bị không đầy đủ là một vấn đề thường gặp, ở thượng nguồn, với các yếu tố nguy cơ có thể can thiệp. Các cỡ hiệu ứng về hủy/vắng mặt lấy từ tài liệu về hướng dẫn chuẩn bị và nhắc nhở qua SMS.',
    'roi.assumptions.facilityFee': 'Phí cơ sở: Allen 2023, CMS ASC CPT 45378–45385 (USD $989–$1,034).',
  },
}
