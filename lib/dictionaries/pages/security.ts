// Page dictionary for the /security route. Keys are namespaced 'security.*'.
// All six locales carry an identical key set. 'en' is the verbatim source copy;
// the other five are translations. Brand names, product names, trial/application
// IDs, drug/prep brands, acronyms/standards, and proper nouns are kept verbatim.
export const dict: Record<string, Record<string, string>> = {
  en: {
    'security.hero.title': 'Security.',
    'security.body.p1': 'Trial data is stored in Australia (Amazon Web Services Sydney region, through Supabase). Our hosting providers hold International Organization for Standardization (ISO) 27001 information security certification and System and Organization Controls (SOC) 2 Type 2 reports, and encrypt data at rest and in transit; Aescia itself is not yet certified.',
    'security.body.p2': 'In hospital deployments, Aescia identifies patients by a hospital-issued study code. Aescia holds liability and cyber insurance with Chubb, bound in June 2026.',
    'security.body.p3': 'An independent penetration test, a privacy impact assessment and ISO 27001 certification are planned. Security is led by Dr Vasken Dermardiros, Chief Technology Officer.',
    'security.cta.button': 'Contact Aescia',
  },
  fr: {
    'security.hero.title': 'Sécurité.',
    'security.body.p1': 'Les données de l\'essai sont stockées en Australie (région Sydney d\'Amazon Web Services, via Supabase). Nos hébergeurs détiennent la certification de sécurité de l\'information ISO 27001 de l\'Organisation internationale de normalisation (ISO) et des rapports System and Organization Controls (SOC) 2 Type 2, et chiffrent les données au repos et en transit ; Aescia elle-même n\'est pas encore certifiée.',
    'security.body.p2': 'Dans les déploiements hospitaliers, Aescia identifie les patients par un code d\'étude attribué par l\'hôpital. Aescia détient une assurance responsabilité civile et une assurance cyber auprès de Chubb, souscrites en juin 2026.',
    'security.body.p3': 'Un test d\'intrusion indépendant, une évaluation des facteurs relatifs à la vie privée et la certification ISO 27001 sont prévus. La sécurité est dirigée par le Dr Vasken Dermardiros, directeur de la technologie (Chief Technology Officer).',
    'security.cta.button': 'Contacter Aescia',
  },
  es: {
    'security.hero.title': 'Seguridad.',
    'security.body.p1': 'Los datos del ensayo se almacenan en Australia (región de Sídney de Amazon Web Services, a través de Supabase). Nuestros proveedores de alojamiento cuentan con la certificación de seguridad de la información ISO 27001 de la Organización Internacional de Normalización (ISO) y con informes System and Organization Controls (SOC) 2 Tipo 2, y cifran los datos en reposo y en tránsito; Aescia aún no está certificada.',
    'security.body.p2': 'En los despliegues hospitalarios, Aescia identifica a los pacientes mediante un código de estudio asignado por el hospital. Aescia tiene un seguro de responsabilidad civil y un ciberseguro con Chubb, contratados en junio de 2026.',
    'security.body.p3': 'Están previstas una prueba de penetración independiente, una evaluación de impacto sobre la privacidad y la certificación ISO 27001. La seguridad está a cargo del Dr. Vasken Dermardiros, director de tecnología (Chief Technology Officer).',
    'security.cta.button': 'Contactar a Aescia',
  },
  zh: {
    'security.hero.title': '安全。',
    'security.body.p1': '试验数据存储在澳大利亚（Amazon Web Services Sydney 区域，通过 Supabase）。我们的托管服务提供商持有国际标准化组织（ISO）27001 信息安全认证以及 System and Organization Controls（SOC）2 Type 2 报告，并对静态数据和传输中的数据进行加密；Aescia 本身尚未获得认证。',
    'security.body.p2': '在医院部署中，Aescia 通过医院发放的研究编号识别患者。Aescia 已向 Chubb 投保责任险和网络安全险，于 2026 年 6 月生效。',
    'security.body.p3': '独立渗透测试、隐私影响评估和 ISO 27001 认证均已列入计划。安全工作由首席技术官（Chief Technology Officer）Vasken Dermardiros 博士负责。',
    'security.cta.button': '联系 Aescia',
  },
  ar: {
    'security.hero.title': 'الأمن.',
    'security.body.p1': 'تُخزَّن بيانات التجربة في أستراليا (منطقة Sydney لدى Amazon Web Services، عبر Supabase). يحمل مزوّدو الاستضافة لدينا شهادة ISO 27001 لأمن المعلومات من المنظمة الدولية للتوحيد القياسي (ISO) وتقارير System and Organization Controls (SOC) 2 من النوع 2، ويشفّرون البيانات أثناء التخزين وأثناء النقل؛ أما Aescia نفسها فلم تحصل على شهادة بعد.',
    'security.body.p2': 'في عمليات النشر في المستشفيات، تُعرِّف Aescia المرضى برمز دراسة يصدره المستشفى. تحمل Aescia تأمين المسؤولية والتأمين السيبراني لدى Chubb، وقد أُبرم في يونيو 2026.',
    'security.body.p3': 'من المخطط إجراء اختبار اختراق مستقل وتقييم لأثر الخصوصية والحصول على شهادة ISO 27001. يقود الأمن الدكتور Vasken Dermardiros، كبير مسؤولي التكنولوجيا (Chief Technology Officer).',
    'security.cta.button': 'تواصل مع Aescia',
  },
  vi: {
    'security.hero.title': 'Bảo mật.',
    'security.body.p1': 'Dữ liệu thử nghiệm được lưu trữ tại Úc (khu vực Sydney của Amazon Web Services, thông qua Supabase). Các nhà cung cấp dịch vụ lưu trữ của chúng tôi có chứng nhận bảo mật thông tin ISO 27001 của Tổ chức Tiêu chuẩn hóa Quốc tế (ISO) và báo cáo System and Organization Controls (SOC) 2 Type 2, đồng thời mã hóa dữ liệu khi lưu trữ và khi truyền; bản thân Aescia chưa được chứng nhận.',
    'security.body.p2': 'Trong các triển khai tại bệnh viện, Aescia nhận diện bệnh nhân bằng mã nghiên cứu do bệnh viện cấp. Aescia có bảo hiểm trách nhiệm và bảo hiểm an ninh mạng với Chubb, giao kết vào tháng 6 năm 2026.',
    'security.body.p3': 'Một đợt kiểm thử xâm nhập độc lập, một đánh giá tác động quyền riêng tư và chứng nhận ISO 27001 đã được lên kế hoạch. Công tác bảo mật do TS. Vasken Dermardiros, Giám đốc Công nghệ (Chief Technology Officer), phụ trách.',
    'security.cta.button': 'Liên hệ Aescia',
  },
}
