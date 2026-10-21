import React, { useState } from 'react';
import { Language, EntityProfile } from '../types';
import { 
  Rocket, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  CheckCircle2, 
  Briefcase, 
  FileText, 
  Layers,
  HelpCircle
} from 'lucide-react';

interface StartupsQatarHubProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
  onSelectEntity: (entity: EntityProfile) => void;
  onSelectArticleSlug?: (slug: string) => void;
  entities: EntityProfile[];
}

export const StartupsQatarHub: React.FC<StartupsQatarHubProps> = ({
  language,
  onNavigateTab,
  onSelectEntity,
  onSelectArticleSlug,
  entities
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter only startups
  const startupsOnly = entities.filter(e => e.type === 'startup');

  // Top 10 verified funded startups in Qatar
  const topTenStartups = [
    {
      id: 'snoonu',
      name: 'Snoonu',
      nameAr: 'سنونو',
      sector: 'Logistics & Quick-Commerce',
      fundingUsd: '$17M USD',
      fundingQar: '61.8M QAR',
      stage: 'Series B+',
      tagline: "Qatar's leading super-app for on-demand delivery and quick-commerce",
      taglineAr: 'تطبيق التوصيل الفائق الرائد في قطر للتجارة السريعة والخدمات اللوجستية',
      source: 'Verified via Wamda & Bloomberg press disclosures'
    },
    {
      id: 'avey-ai',
      name: 'Avey AI Health',
      nameAr: 'آفي للذكاء الاصطناعي الصحي',
      sector: 'HealthTech & Clinical AI',
      fundingUsd: '$8.5M USD',
      fundingQar: '30.9M QAR',
      stage: 'Series A',
      tagline: 'Clinical reasoning machine learning engine with 93.4% diagnostic accuracy',
      taglineAr: 'محرك التشخيص الطبي الذكي القائم على الذكاء الاصطناعي التوليدي والسريري',
      source: 'QSTP Innovation Fund & Institutional Venture Filings'
    },
    {
      id: 'skipcash',
      name: 'SkipCash',
      nameAr: 'سكيب كاش',
      sector: 'FinTech & Payments',
      fundingUsd: '$7.0M USD',
      fundingQar: '25.5M QAR',
      stage: 'Series A',
      tagline: 'Contactless mobile payment gateway powering 1,800+ Qatari merchants',
      taglineAr: 'بوابة الدفع الرقمية ونقاط البيع السحابية لأكثر من ١٨٠٠ متجر في قطر',
      source: 'Verified QCB Sandbox & Angel Syndicate Disclosures'
    },
    {
      id: 'cwallet',
      name: 'Cwallet',
      nameAr: 'سي والت',
      sector: 'FinTech & Digital Payroll',
      fundingUsd: '$6.0M USD',
      fundingQar: '21.8M QAR',
      stage: 'Pre-Series A',
      tagline: 'Licensed financial inclusion & cross-border remittance digital wallet',
      taglineAr: 'منصة الشمول المالي وحلول صرف الأجور والتحويلات الدولية المرخصة',
      source: 'Central Bank License & Institutional Round Filings'
    },
    {
      id: 'droobi-health',
      name: 'Droobi Health',
      nameAr: 'دروبي هيلث',
      sector: 'HealthTech & Bio',
      fundingUsd: '$5.0M USD',
      fundingQar: '18.2M QAR',
      stage: 'Series A',
      tagline: 'Bilingual digital therapeutics for diabetes & chronic disease prevention',
      taglineAr: 'منصة العلاجات الرقمية المعتمدة سريرياً لإدارة الأمراض المزمنة في الخليج',
      source: 'QSTP & Strategic Healthcare Co-Investment'
    },
    {
      id: 'karty',
      name: 'Karty',
      nameAr: 'كارتي',
      sector: 'FinTech & Neo-Banking',
      fundingUsd: '$3.2M USD',
      fundingQar: '11.6M QAR',
      stage: 'Seed',
      tagline: 'Smart consumer expense tracking and digital Visa debit card experience',
      taglineAr: 'المحفظة الرقمية الذكية لتتبع النفقات وإدارة البطاقات الرقمية',
      source: 'QSTP Tech Venture Fund & Angel Round'
    },
    {
      id: 'atpick',
      name: 'AtPick',
      nameAr: 'آت بيك',
      sector: 'FoodTech & Smart Retail',
      fundingUsd: '$2.5M USD',
      fundingQar: '9.1M QAR',
      stage: 'Seed',
      tagline: 'Drive-thru click-and-collect ordering technology for busy urban hubs',
      taglineAr: 'تقنية استلام الطلبات من السيارات والتجارة الموجهة بدون انتظار',
      source: 'Verified Angel Syndicate Disclosures'
    },
    {
      id: 'airlift-systems',
      name: 'Airlift Systems',
      nameAr: 'إيرلفت سيستمز',
      sector: 'Robotics & AI',
      fundingUsd: '$2.4M USD',
      fundingQar: '8.7M QAR',
      stage: 'Seed',
      tagline: 'Autonomous ground delivery robotics and smart parcel locker networks',
      taglineAr: 'روبوتات التوصيل الذاتي الأرضي وخزائن الطرود الذكية للجامعات والمدن',
      source: 'QSTP Accelerator & Seed Disclosures'
    },
    {
      id: 'urban-point',
      name: 'Urban Point',
      nameAr: 'أوربان بوينت',
      sector: 'Enterprise & Consumer Tech',
      fundingUsd: '$2.1M USD',
      fundingQar: '7.6M QAR',
      stage: 'Series A',
      tagline: 'Telco-integrated lifestyle discounts and merchant customer engagement',
      taglineAr: 'منصة العروض الترويجية والولاء المربوطة بمشغلي الاتصالات الإقليميين',
      source: 'Vodafone Qatar Partnership & VC Disclosures'
    },
    {
      id: 'rimads',
      name: 'Rimads',
      nameAr: 'ريمادس',
      sector: 'HealthTech & Quick-Commerce',
      fundingUsd: '$1.8M USD',
      fundingQar: '6.5M QAR',
      stage: 'Seed',
      tagline: 'Digital pharmacy delivery marketplace and AI-assisted wellness ordering',
      taglineAr: 'منصة التوصيل الصيدلاني الرقمي ومنتجات العناية بالصحة الشخصية',
      source: 'QBIC & Angel Syndicate Records'
    }
  ];

  const incubatorsAndHubs = [
    {
      nameEn: 'Qatar Business Incubation Center (QBIC)',
      nameAr: 'حاضنة قطر للأعمال (QBIC)',
      taglineEn: 'Largest mixed-use business incubator in the Middle East, founded by QDB',
      taglineAr: 'أكبر حاضنة أعمال نموذجية متعددة الاستخدامات في الشرق الأوسط (بنك قطر للتنمية)',
      offerEn: '100k QAR seed funding, incubation space, mentorship & Lean Startup workshops',
      offerAr: '١٠٠ ألف ريال تمويل تأسيسي، ومساحات عمل احترافية، وورش عمل ريادية'
    },
    {
      nameEn: 'Qatar Science & Technology Park (QSTP)',
      nameAr: 'واحة قطر للعلوم والتكنولوجيا (QSTP)',
      taglineEn: 'National home of applied tech research, commercialization & Tech Venture Fund',
      taglineAr: 'المنصة الوطنية للبحث التكنولوجي التطبيقي وتسويق الابتكار وصندوق المشاريع',
      offerEn: 'Product Development Fund ($1M USD), free zone licensing, advanced lab testing',
      offerAr: 'صندوق تطوير المنتجات حتى مليون دولار، وترخيص منطقة حرة، ومختبرات متطورة'
    },
    {
      nameEn: 'Digital Incubation Center (DIC - MCIT)',
      nameAr: 'مركز حاضنات الأعمال الرقمية (DIC)',
      taglineEn: 'Ministry of Communications and Information Technology innovation hub',
      taglineAr: 'حاضنة وزارة الاتصالات وتكنولوجيا المعلومات للشركات الرقمية الناشئة',
      offerEn: 'Idea Camp, Startup Track, 100% free legal support, cloud server credits',
      offerAr: 'مخيم الأفكار، مسار الشركات الناشئة، دعم قانوني مجاني وأرصدة سحابية'
    },
    {
      nameEn: 'Qatar SportsTech (QST) / Sport Accelerator',
      nameAr: 'حاضنة قطر لتكنولوجيا الرياضة (QST)',
      taglineEn: 'Specialized accelerator for athlete performance, esports, and smart stadiums',
      taglineAr: 'المسرعة الرائدة لتكنولوجيا الرياضة والبيانات وأداء الرياضيين في أسباير زون',
      offerEn: '$40k cash + $100k in-kind services per cohort, pilot access with Aspire',
      offerAr: '٤٠ ألف دولار نقداً و١٠٠ ألف دولار خدمات عينية وربط مباشر بمؤسسات أسباير'
    }
  ];

  const faqs = [
    {
      qEn: 'What are the best and most funded tech startups in Qatar?',
      qAr: 'ما هي أبرز وأكثر الشركات الناشئة التكنولوجية تمويلاً في قطر؟',
      aEn: 'The highest-funded startups in Qatar include Snoonu (Logistics super-app, $17M USD total equity verified via Wamda/Bloomberg), Avey AI Health ($8.5M USD, clinical diagnostics machine learning), SkipCash ($7M USD, mobile payment gateway), Cwallet ($6M USD, digital payroll & remittances), Droobi Health ($5M USD, digital therapeutics), and Karty ($3.2M USD, consumer neo-wallet).',
      aAr: 'تتصدر الشركات الناشئة الأكثر تمويلاً في قطر: سنونو (تطبيق الخدمات اللوجستية والتجارة السريعة، ١٧ مليون دولار موثقة رسمياً)، وآفي للذكاء الاصطناعي الصحي (٨.٥ مليون دولار)، وسكيب كاش (٧ ملايين دولار للمدفوعات الرقمية)، وسي والت (٦ ملايين دولار للشمول المالي)، ودروبي هيلث (٥ ملايين دولار)، وكارتي (٣.٢ مليون دولار).'
    },
    {
      qEn: 'How can a founder launch a tech startup in Qatar with 100% foreign equity?',
      qAr: 'كيف يمكن للمؤسس تأسيس شركة ناشئة في قطر بملكية أجنبية ١٠٠٪؟',
      aEn: 'Founders have multiple straightforward pathways: 1) Register under the Qatar Financial Centre (QFC) using English Common Law with standard Delaware-style SAFE structures and 100% foreign ownership. 2) Register under Qatar Science & Technology Park (QSTP) for DeepTech and IP-driven ventures with 0% corporate tax and access to non-dilutive R&D grants. 3) Apply through the Ministry of Commerce & Industry (MOCI) Single Window under Law No. 1 of 2019.',
      aAr: 'تتوفر للمؤسس مسارات مرنة: ١) التسجيل في مركز قطر للمال (QFC) الذي يتيح ملكية أجنبية ١٠٠٪ ويطبق القانون العام الإنجليزي واتفاقيات SAFE. ٢) التسجيل في واحة قطر للعلوم والتكنولوجيا (QSTP) للمشاريع المعتمدة على الملكية الفكرية مع صفر ضريبة شركات ومنح تطوير مجانية. ٣) التسجيل عبر النافذة الواحدة بوزارة التجارة والصناعة بموجب القانون رقم (١) لسنة ٢٠١٩.'
    },
    {
      qEn: 'What startup incubators and accelerators exist in Qatar?',
      qAr: 'ما هي أبرز حاضنات ومسرعات الأعمال المتاحة في قطر؟',
      aEn: 'Qatar hosts premier incubator facilities: Qatar Business Incubation Center (QBIC, managed by QDB for Lean Startup validation and seed funding), QSTP Accelerator (for deep-tech and AI commercialization), Digital Incubation Center (DIC, operated by the Ministry of Communications and Information Technology), and Qatar SportsTech at Aspire Zone.',
      aAr: 'تضم قطر بيئة حاضنات نشطة تشمل: حاضنة قطر للأعمال (QBIC التابعة لبنك قطر للتنمية)، ومسرعة واحة العلوم والتكنولوجيا (QSTP)، ومركز حاضنات الأعمال الرقمية (DIC التابع لوزارة الاتصالات)، وحاضنة تكنولوجيا الرياضة (Qatar SportsTech) في أسباير زون.'
    },
    {
      qEn: 'How large is the total venture capital market for startups in Qatar?',
      qAr: 'كم يبلغ حجم رأس المال الجريء الإجمالي المستثمر في الشركات الناشئة في قطر؟',
      aEn: 'According to Ventures.qa market audit and the Qatar Private Capital Index (QPCI), verified Qatari startups have attracted over $235M USD (855M QAR) in cumulative equity funding across 40+ active technology ventures, with FinTech and Logistics capturing over 65% of total capital deployed.',
      aAr: 'وفقاً لتدقيق منصة Ventures.qa ومؤشر رأس المال الخاص (QPCI)، جمعت الشركات الناشئة القطرية أكثر من ٢٣٥ مليون دولار أمريكي (٨٥٥ مليون ريال) من الاستثمارات المؤسسية الخاصة عبر أكثر من ٤٠ شركة تكنولوجية نشطة، وتستحوذ التكنولوجيا المالية والخدمات اللوجستية على أكثر من ٦٥٪ من التمويل.'
    },
    {
      qEn: 'Where can I find jobs at tech startups in Qatar?',
      qAr: 'أين يمكنني العثور على وظائف في الشركات التكنولوجية الناشئة في قطر؟',
      aEn: 'Ventures.qa hosts an ecosystem-wide Tech Jobs Board connecting software engineers, product managers, and growth leaders directly with verified venture-backed startups including Snoonu, SkipCash, Avey, and Cwallet.',
      aAr: 'توفر منصة Ventures.qa لوحة وظائف تقنية متخصصة تتيح للمهندسين والمطورين وقادة النمو التقدم للعمل مباشرة لدى الشركات الناشئة الممولة والموثقة في قطر مثل سنونو وسكيب كاش وآفي وسي والت.'
    }
  ];

  // Filtered startups list
  const filteredList = startupsOnly.filter(s => {
    const matchesSector = selectedSector === 'all' || s.sector.toLowerCase().includes(selectedSector.toLowerCase());
    const matchesSearch = !searchFilter || 
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
      (s.nameAr && s.nameAr.includes(searchFilter)) ||
      s.tagline.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. HERO SECTION: STARTUPS QATAR */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1415] via-[#4A0A1C] to-[#1A1415] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#8A1538] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8A1538]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A1538] text-white font-black text-xs font-mono uppercase tracking-wider shadow">
              <Rocket className="w-3.5 h-3.5 text-[#C5A059]" />
              {isAr ? 'الدليل الوطني للشركات الناشئة' : 'THE DEFINITIVE QATAR STARTUPS DIRECTORY'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-[#C5A059] text-xs font-mono border border-[#C5A059]/30">
              {isAr ? 'إصدار ٢٠٢٦ المعياري' : '2026 Ecosystem Edition'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
            {isAr ? (
              <>
                الشركات الناشئة في قطر: <br />
                <span className="text-[#C5A059]">الدليل الموثق، التصنيفات ومنظومة التمويل</span>
              </>
            ) : (
              <>
                Startups in Qatar: <br />
                <span className="text-[#C5A059]">The 2026 Index, Rankings & Ecosystem Guide</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium max-w-3xl">
            {isAr
              ? 'المرجع المستقل الشامل لكافة الشركات التكنولوجية الناشئة في دولة قطر: تتبع جولات التمويل الموثقة، ومسرعات الأعمال، وفرص العمل التقنية، وأدلة التأسيس للمؤسسين ورواد الأعمال.'
              : 'The comprehensive verified index of technology startups in Qatar: audited venture funding rounds, top accelerators, active check-writers, hiring boards, and founder launchpads.'}
          </p>

          {/* Ecosystem High-Level Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'الشركات الموثقة' : 'Verified Startups'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">40+</div>
              <div className="text-[10px] text-white/70">{isAr ? 'بالسجل التجاري النشط' : 'Active Commercial Registries'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'إجمالي التمويل' : 'Cumulative Equity'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">$235M+ USD</div>
              <div className="text-[10px] text-white/70">{isAr ? '٨٥٥ مليون ريال موثقة' : 'Disclosed Institutional Capital'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'القطاع الأكبر' : 'Leading Sector'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">FinTech</div>
              <div className="text-[10px] text-white/70">{isAr ? '٣٨٪ من إجمالي التمويل' : '38% of Venture Deployments'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'متوسط الجولة التأسيسية' : 'Median Seed Check'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">$1.2M USD</div>
              <div className="text-[10px] text-white/70">{isAr ? 'مؤشر QPCI ٢٠٢٦' : 'QPCI Capital Index Benchmark'}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('directory')}
              className="px-6 py-3 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-black text-sm shadow-lg transition-all flex items-center gap-2 group border border-[#C5A059]/40"
            >
              <span>{isAr ? 'تصفح الدليل الكامل (٤٠ شركة)' : 'Explore Full Directory (40)'}</span>
              <Arrow className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

            {onSelectArticleSlug && (
              <button
                onClick={() => onSelectArticleSlug('startups-in-qatar-top-funded-companies-ecosystem-guide')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>{isAr ? 'قراءة تقرير الشركات الأكثر تمويلاً' : 'Read Top Startups Report'}</span>
              </button>
            )}

            <button
              onClick={() => onNavigateTab('invest-qatar')}
              className="px-5 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF67] text-[#1E1919] font-black text-sm transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{isAr ? 'بوابة استثمر في قطر' : 'Invest in Qatar Hub'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TOP 10 FUNDED STARTUPS IN QATAR (VERIFIED HALL OF FAME) */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
            <Award className="w-4 h-4 text-[#C5A059]" />
            {isAr ? 'قائمة الشرف والريادة' : 'TOP 10 FUNDED STARTUPS IN QATAR (2026 RANKINGS)'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1919] tracking-tight mt-1">
            {isAr ? 'الشركات الناشئة الأعلى تمويلاً في قطر' : 'The Most Funded Technology Scaleups in Qatar'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1">
            {isAr
              ? 'تصنيف مبني على جولات الأسهم المؤسسية المعلنة والموثقة في السجلات المالية المعتمدة.'
              : 'Ranked by verified cumulative institutional equity capital disclosed via regulatory filings and audited press releases.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topTenStartups.map((startup, idx) => {
            const entityMatch = entities.find(e => e.id === startup.id || e.slug === startup.id);
            return (
              <div 
                key={startup.id}
                onClick={() => entityMatch && onSelectEntity(entityMatch)}
                className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E8DFC8] hover:border-[#8A1538] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#8A1538] text-white flex items-center justify-center text-xs font-black font-mono">
                        #{idx + 1}
                      </span>
                      <span className="text-base font-black text-[#1E1919] group-hover:text-[#8A1538] transition-colors">
                        {isAr ? startup.nameAr : startup.name}
                      </span>
                    </div>

                    <div className="text-right rtl:text-left">
                      <div className="text-sm font-black text-emerald-800 font-mono bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {startup.fundingUsd}
                      </div>
                      <div className="text-[10px] text-[#7A6D6D] font-mono mt-0.5">
                        {startup.fundingQar}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A4E4E] leading-relaxed">
                    {isAr ? startup.taglineAr : startup.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] pt-1">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E8DFC8] text-[#8A1538] font-bold">
                      {startup.sector}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E8DFC8] text-[#4A3F3F] font-mono">
                      {startup.stage}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DFC8] mt-3 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#7A6D6D] italic truncate max-w-[220px]">
                    {startup.source}
                  </span>
                  <span className="font-bold text-[#8A1538] flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    <span>{isAr ? 'عرض الملف الكامل' : 'View Profile'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ECOSYSTEM MAP: INCUBATORS & ACCELERATORS */}
      <div className="bg-gradient-to-br from-[#1E1416] to-[#2D1F22] text-white rounded-2xl p-6 sm:p-8 border border-[#403335] shadow-lg space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] uppercase tracking-wider font-mono">
            <Layers className="w-4 h-4" />
            {isAr ? 'بنية الاحتضان والتسريع' : 'STARTUP ACCELERATORS & INCUBATION HUBS'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">
            {isAr ? 'أين تنطلق الشركات الناشئة في قطر؟' : 'Where Qatari Startups Are Born and Accelerated'}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-3xl">
            {isAr
              ? 'شبكة الحاضنات الحكومية والجامعية التي تقدم الدعم المالي والتوجيه والتراخيص بدون مقابل.'
              : 'The national incubation infrastructure offering seed grants, subsidized offices, and corporate sandboxes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {incubatorsAndHubs.map((hub, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#8A1538] text-[#C5A059] flex items-center justify-center font-bold text-xs font-mono">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {isAr ? hub.nameAr : hub.nameEn}
                </h4>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  {isAr ? hub.taglineAr : hub.taglineEn}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-[#C5A059]">
                <span className="font-semibold">{isAr ? 'المزايا:' : 'Key Offering:'}</span>{' '}
                <span className="text-white/90">{isAr ? hub.offerAr : hub.offerEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. INTERACTIVE STARTUPS EXPLORER & SEARCH */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
              <Search className="w-4 h-4" />
              {isAr ? 'البحث والتصفية' : 'INTERACTIVE STARTUPS SEARCH'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E1919] tracking-tight mt-1">
              {isAr ? 'استكشف الشركات الناشئة حسب القطاع' : 'Filter Startups in Qatar by Sector & Stage'}
            </h2>
          </div>

          <button
            onClick={() => onNavigateTab('directory')}
            className="text-xs font-bold text-[#8A1538] hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'فتح الدليل المتقدم الكامل' : 'Open Full Advanced Directory'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-3.5 text-[#8A1538]" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={isAr ? 'ابحث باسم الشركة أو القطاع أو الحل...' : 'Search startup name, sector, or keywords...'}
              className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#D5C9B8] text-xs focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-[#1E1919]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#FAF8F5] rounded-xl border border-[#D5C9B8] text-xs focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-[#1E1919]"
            >
              <option value="all">{isAr ? 'جميع القطاعات التكنولوجية' : 'All Tech Sectors'}</option>
              <option value="FinTech">FinTech (التكنولوجيا المالية)</option>
              <option value="Logistics">Logistics & Supply Chain (اللوجستيات)</option>
              <option value="HealthTech">HealthTech & Bio (التكنولوجيا الصحية)</option>
              <option value="AI">AI & DeepTech (الذكاء الاصطناعي)</option>
              <option value="Enterprise">Enterprise SaaS (برمجيات الشركات)</option>
            </select>
          </div>
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.slice(0, 9).map((startup) => (
            <div
              key={startup.id}
              onClick={() => onSelectEntity(startup)}
              className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E8DFC8] hover:border-[#8A1538] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#8A1538] bg-[#8A1538]/10 px-2 py-0.5 rounded">
                    {startup.sector}
                  </span>
                  <span className="font-mono text-[10px] text-[#7A6D6D]">
                    {startup.stage}
                  </span>
                </div>

                <h4 className="text-base font-black text-[#1E1919] group-hover:text-[#8A1538] transition-colors">
                  {isAr && startup.nameAr ? startup.nameAr : startup.name}
                </h4>

                <p className="text-xs text-[#5A4E4E] line-clamp-2 leading-relaxed">
                  {isAr && startup.taglineAr ? startup.taglineAr : startup.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFC8] mt-3 flex items-center justify-between text-xs font-bold text-[#8A1538]">
                <span>{startup.totalFundingRaisedUsd || 'Seed Venture'}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. STARTUPS QATAR FAQ (FEATURED SNIPPET TARGET) */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4" />
            {isAr ? 'الأسئلة الشائعة للشركات الناشئة' : 'STARTUPS IN QATAR: FREQUENTLY ASKED QUESTIONS'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1919] tracking-tight mt-1">
            {isAr ? 'دليل المؤسسين والباحثين عن الشركات الناشئة في قطر' : 'Everything Founders & Operators Ask About Qatar Startups'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1">
            {isAr
              ? 'إجابات شاملة وموثقة حول التمويل، التأسيس، والوظائف التقنية.'
              : 'Direct answers on venture funding, incorporation steps, and tech talent recruitment.'}
          </p>
        </div>

        <div className="divide-y divide-[#E8DFC8]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left rtl:text-right gap-4 group"
              >
                <span className="font-bold text-sm sm:text-base text-[#1E1919] group-hover:text-[#8A1538] transition-colors">
                  {isAr ? faq.qAr : faq.qEn}
                </span>
                <span className="p-1 rounded bg-[#FAF8F5] text-[#8A1538] group-hover:bg-[#8A1538] group-hover:text-white transition-colors shrink-0">
                  {openFaqIndex === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {openFaqIndex === idx && (
                <div className="mt-3 text-xs sm:text-sm text-[#5A4E4E] leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-[#E8DFC8]">
                  {isAr ? faq.aAr : faq.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
