// Self-contained dictionary for the AscEntityBlock component (the "at a glance"
// fact table rendered at the foot of every endoscopy-ASC landing page).
// Consumed by components/asc-entity-block.tsx. 'en' holds the original English
// verbatim; the other five locales translate each en value. All six locales
// share an identical key set.
//
// Preserve-list tokens (brand and product names — Aescia, Aescia for Clinics,
// Aescia for Hospitals; ASC/ASCs; regulators and classes — TGA, Class IIa;
// trial/registration IDs — SAFE-Discharge, ACTRN12625001425482; institution and
// place names — Royal Prince Alfred Hospital, Sydney, Montréal; integration
// systems — Provation, EndoWorks, gGastro; numbers/currency — 50,000, 2025,
// 30-day) are kept verbatim across every locale.
//
// Regulatory phrasing — "is not a medical device", "investigational software as
// a medical device", "intended for Class IIa classification", "No device
// application has been lodged", "pre-first-customer", "No integration is live
// yet" — is translated conservatively without softening, strengthening,
// omitting, or inventing any claim. The clinicsSoftwareSchema JSON-LD emitted by
// the component stays English; only the visible table is localised here.
export const dict: Record<string, Record<string, string>> = {
  en: {
    'ascblock.heading': 'Aescia for Clinics — at a glance',

    'ascblock.product.k': 'Product',
    'ascblock.product.v': 'Aescia for Clinics',

    'ascblock.category.k': 'Category',
    'ascblock.category.v': 'Pre-procedure patient-pathway software for endoscopy ambulatory surgery centers (ASCs).',

    'ascblock.founded.k': 'Founded',
    'ascblock.founded.v': '2025.',

    'ascblock.headquarters.k': 'Headquarters',
    'ascblock.headquarters.v': 'Sydney, Australia and Montréal, Canada.',

    'ascblock.regulatory.k': 'Regulatory status',
    'ascblock.regulatory.v': 'Aescia for Clinics is not a medical device. Its sibling product, Aescia for Hospitals, is an investigational software as a medical device, intended for Class IIa classification under the Australian TGA. No device application has been lodged for either product.',

    'ascblock.clinical.k': 'Clinical evidence',
    'ascblock.clinical.v': 'SAFE-Discharge trial (ACTRN12625001425482) at Royal Prince Alfred Hospital, Sydney, evaluating the Hospitals product across the 30-day post-discharge window.',

    'ascblock.integration.k': 'Integration targets',
    'ascblock.integration.v': 'Designed to work alongside common endoscopy systems including Provation, EndoWorks, and gGastro. No integration is live yet; Aescia is pre-first-customer, and any data exchange is scoped per customer.',

    'ascblock.pricing.k': 'Pricing',
    'ascblock.pricing.v': 'Aescia is built to save the clinic more than it costs and leave the clinic better off than without Aescia. Design partners start free until the platform proves that on the clinic\'s own data.',

    'ascblock.deployment.k': 'Deployment stage',
    'ascblock.deployment.v': 'Pre-first-customer. Clinics customers engage through the design-partner program, which runs free or under a money-back rebate until Aescia delivers measurable net benefit against the ASC’s own baseline.',
  },
  fr: {
    'ascblock.heading': 'Aescia for Clinics — en un coup d\'œil',

    'ascblock.product.k': 'Produit',
    'ascblock.product.v': 'Aescia for Clinics',

    'ascblock.category.k': 'Catégorie',
    'ascblock.category.v': 'Logiciel de parcours patient pré-procédural pour les centres de chirurgie ambulatoire (ASC) d\'endoscopie.',

    'ascblock.founded.k': 'Fondée',
    'ascblock.founded.v': '2025.',

    'ascblock.headquarters.k': 'Siège',
    'ascblock.headquarters.v': 'Sydney, Australie et Montréal, Canada.',

    'ascblock.regulatory.k': 'Statut réglementaire',
    'ascblock.regulatory.v': 'Aescia for Clinics n\'est pas un dispositif médical. Son produit frère, Aescia for Hospitals, est un logiciel dispositif médical en investigation, destiné à la classification Class IIa selon la TGA australienne. Aucune demande de dispositif n\'a été déposée pour l\'un ou l\'autre produit.',

    'ascblock.clinical.k': 'Preuves cliniques',
    'ascblock.clinical.v': 'Essai SAFE-Discharge (ACTRN12625001425482) au Royal Prince Alfred Hospital, Sydney, évaluant le produit Hospitals sur la fenêtre de 30-day après la sortie.',

    'ascblock.integration.k': 'Cibles d\'intégration',
    'ascblock.integration.v': 'Conçu pour fonctionner aux côtés des systèmes d\'endoscopie courants, notamment Provation, EndoWorks et gGastro. Aucune intégration n\'est encore active ; Aescia est en phase pré-premier-client, et tout échange de données est défini par client.',

    'ascblock.pricing.k': 'Tarification',
    'ascblock.pricing.v': 'Le tarif est négocié par clinique, non publié. Les partenaires de conception commencent gratuitement jusqu\'à ce que la plateforme fasse ses preuves sur vos propres données, et le prix convenu est maintenu en dessous de votre retour modélisé.',

    'ascblock.deployment.k': 'Stade de déploiement',
    'ascblock.deployment.v': 'Pré-premier-client. Les clients de Clinics s\'engagent via le programme de partenaires de conception, qui est gratuit ou sous une remise avec remboursement jusqu\'à ce qu\'Aescia apporte un bénéfice net mesurable par rapport à la base de référence propre de l\'ASC.',
  },
  es: {
    'ascblock.heading': 'Aescia for Clinics — de un vistazo',

    'ascblock.product.k': 'Producto',
    'ascblock.product.v': 'Aescia for Clinics',

    'ascblock.category.k': 'Categoría',
    'ascblock.category.v': 'Software de vía del paciente pre-procedimiento para centros de cirugía ambulatoria (ASC) de endoscopia.',

    'ascblock.founded.k': 'Fundada',
    'ascblock.founded.v': '2025.',

    'ascblock.headquarters.k': 'Sede',
    'ascblock.headquarters.v': 'Sydney, Australia y Montréal, Canadá.',

    'ascblock.regulatory.k': 'Estado regulatorio',
    'ascblock.regulatory.v': 'Aescia for Clinics no es un dispositivo médico. Su producto hermano, Aescia for Hospitals, es un software como dispositivo médico en investigación, destinado a la clasificación Class IIa según la TGA australiana. No se ha presentado ninguna solicitud de dispositivo para ninguno de los dos productos.',

    'ascblock.clinical.k': 'Evidencia clínica',
    'ascblock.clinical.v': 'Ensayo SAFE-Discharge (ACTRN12625001425482) en el Royal Prince Alfred Hospital, Sydney, que evalúa el producto Hospitals a lo largo de la ventana de 30-day posalta.',

    'ascblock.integration.k': 'Objetivos de integración',
    'ascblock.integration.v': 'Diseñado para funcionar junto a los sistemas de endoscopia comunes, incluidos Provation, EndoWorks y gGastro. Aún no hay ninguna integración activa; Aescia está en fase previa al primer cliente, y cualquier intercambio de datos se define por cliente.',

    'ascblock.pricing.k': 'Precios',
    'ascblock.pricing.v': 'El precio se negocia por clínica, no se publica. Los socios de diseño empiezan gratis hasta que la plataforma demuestre su valor con tus propios datos, y el precio acordado se mantiene por debajo de tu retorno modelado.',

    'ascblock.deployment.k': 'Etapa de implementación',
    'ascblock.deployment.v': 'Previa al primer cliente. Los clientes de Clinics participan a través del programa de socios de diseño, que se ejecuta de forma gratuita o bajo un reembolso con devolución de dinero hasta que Aescia ofrece un beneficio neto medible frente a la base de referencia propia del ASC.',
  },
  zh: {
    'ascblock.heading': 'Aescia for Clinics — 一览',

    'ascblock.product.k': '产品',
    'ascblock.product.v': 'Aescia for Clinics',

    'ascblock.category.k': '类别',
    'ascblock.category.v': '面向内镜门诊手术中心（ASC）的术前患者路径软件。',

    'ascblock.founded.k': '创立',
    'ascblock.founded.v': '2025 年。',

    'ascblock.headquarters.k': '总部',
    'ascblock.headquarters.v': '澳大利亚 Sydney 和加拿大 Montréal。',

    'ascblock.regulatory.k': '监管状态',
    'ascblock.regulatory.v': 'Aescia for Clinics 不是医疗器械。其姊妹产品 Aescia for Hospitals 是一款处于研究阶段的医疗器械软件，拟根据澳大利亚 TGA 归类为 Class IIa。两款产品均未提交任何器械申报。',

    'ascblock.clinical.k': '临床证据',
    'ascblock.clinical.v': '在 Sydney 的 Royal Prince Alfred Hospital 进行的 SAFE-Discharge 试验（ACTRN12625001425482），在出院后 30-day 窗口期内评估 Hospitals 产品。',

    'ascblock.integration.k': '集成目标',
    'ascblock.integration.v': '设计用于与常见内镜系统协同工作，包括 Provation、EndoWorks 和 gGastro。目前尚无任何集成处于实时运行状态；Aescia 处于首个客户之前阶段，任何数据交换都按客户逐一界定。',

    'ascblock.pricing.k': '定价',
    'ascblock.pricing.v': '价格按诊所逐一协商，不对外公布。设计合作伙伴可免费开始，直到平台用您自己的数据证明其价值为止，且商定的价格会保持在您的模型化回报之下。',

    'ascblock.deployment.k': '部署阶段',
    'ascblock.deployment.v': '首个客户之前。Clinics 客户通过设计合作伙伴计划进行对接，该计划免费进行，或在退款返还机制下进行，直至 Aescia 相对于 ASC 自身的基线交付可衡量的净收益。',
  },
  ar: {
    'ascblock.heading': 'Aescia for Clinics — لمحة سريعة',

    'ascblock.product.k': 'المنتج',
    'ascblock.product.v': 'Aescia for Clinics',

    'ascblock.category.k': 'الفئة',
    'ascblock.category.v': 'برمجية مسار المريض السابق للإجراء لمراكز الجراحة المتنقّلة (ASC) للتنظير.',

    'ascblock.founded.k': 'التأسيس',
    'ascblock.founded.v': '2025.',

    'ascblock.headquarters.k': 'المقر',
    'ascblock.headquarters.v': 'Sydney بأستراليا وMontréal بكندا.',

    'ascblock.regulatory.k': 'الوضع التنظيمي',
    'ascblock.regulatory.v': 'Aescia for Clinics ليست جهازًا طبيًا. ومنتجها الشقيق، Aescia for Hospitals، هو برمجية كجهاز طبي قيد البحث، مزمَع تصنيفها ضمن Class IIa بموجب TGA الأسترالية. ولم يُقدَّم أي طلب جهاز لأيٍّ من المنتجَين.',

    'ascblock.clinical.k': 'الأدلة السريرية',
    'ascblock.clinical.v': 'تجربة SAFE-Discharge (ACTRN12625001425482) في Royal Prince Alfred Hospital بـ Sydney، التي تُقيّم منتج Hospitals على امتداد نافذة الـ 30-day بعد الخروج.',

    'ascblock.integration.k': 'أهداف التكامل',
    'ascblock.integration.v': 'مصمَّم للعمل جنبًا إلى جنب مع أنظمة التنظير الشائعة بما في ذلك Provation وEndoWorks وgGastro. ولا يوجد بعد أي تكامل نشط؛ وAescia في مرحلة ما قبل العميل الأول، وأي تبادل للبيانات يُحدَّد نطاقه لكل عميل.',

    'ascblock.pricing.k': 'التسعير',
    'ascblock.pricing.v': 'يُتفاوَض على السعر لكل عيادة، ولا يُنشَر. يبدأ شركاء التصميم مجانًا حتى تثبت المنصّة جدواها على بياناتك الخاصة، ويبقى السعر المتفَّق عليه دون عائدك المنمذَج.',

    'ascblock.deployment.k': 'مرحلة النشر',
    'ascblock.deployment.v': 'ما قبل العميل الأول. يتعامل عملاء Clinics من خلال برنامج شركاء التصميم، الذي يعمل مجانًا أو بموجب استرداد للأموال إلى أن تُقدّم Aescia فائدة صافية قابلة للقياس مقابل خط الأساس الخاص بـ ASC.',
  },
  vi: {
    'ascblock.heading': 'Aescia for Clinics — nhìn nhanh',

    'ascblock.product.k': 'Sản phẩm',
    'ascblock.product.v': 'Aescia for Clinics',

    'ascblock.category.k': 'Danh mục',
    'ascblock.category.v': 'Phần mềm lộ trình bệnh nhân trước thủ thuật cho các trung tâm phẫu thuật ngoại trú (ASC) nội soi.',

    'ascblock.founded.k': 'Thành lập',
    'ascblock.founded.v': '2025.',

    'ascblock.headquarters.k': 'Trụ sở',
    'ascblock.headquarters.v': 'Sydney, Australia và Montréal, Canada.',

    'ascblock.regulatory.k': 'Tình trạng pháp quy',
    'ascblock.regulatory.v': 'Aescia for Clinics không phải là thiết bị y tế. Sản phẩm anh em của nó, Aescia for Hospitals, là một phần mềm như một thiết bị y tế đang trong giai đoạn nghiên cứu, dự kiến được phân loại Class IIa theo TGA của Australia. Chưa có hồ sơ thiết bị nào được nộp cho cả hai sản phẩm.',

    'ascblock.clinical.k': 'Bằng chứng lâm sàng',
    'ascblock.clinical.v': 'Thử nghiệm SAFE-Discharge (ACTRN12625001425482) tại Royal Prince Alfred Hospital, Sydney, đánh giá sản phẩm Hospitals trong suốt cửa sổ 30-day sau xuất viện.',

    'ascblock.integration.k': 'Mục tiêu tích hợp',
    'ascblock.integration.v': 'Được thiết kế để hoạt động cùng các hệ thống nội soi phổ biến bao gồm Provation, EndoWorks và gGastro. Chưa có tích hợp nào đang hoạt động; Aescia đang ở giai đoạn trước khách hàng đầu tiên, và mọi trao đổi dữ liệu được xác định phạm vi theo từng khách hàng.',

    'ascblock.pricing.k': 'Giá',
    'ascblock.pricing.v': 'Giá được thương lượng theo từng phòng khám, không công bố. Các đối tác thiết kế bắt đầu miễn phí cho đến khi nền tảng chứng minh được giá trị trên chính dữ liệu của bạn, và mức giá đã thỏa thuận được giữ dưới mức lợi tức được mô hình hóa của bạn.',

    'ascblock.deployment.k': 'Giai đoạn triển khai',
    'ascblock.deployment.v': 'Trước khách hàng đầu tiên. Khách hàng Clinics tham gia thông qua chương trình đối tác thiết kế, vốn chạy miễn phí hoặc theo cơ chế hoàn tiền cho đến khi Aescia mang lại lợi ích ròng có thể đo lường được so với mức nền của chính ASC.',
  },
}
