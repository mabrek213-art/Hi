import React, { useState, useMemo } from 'react';
import { Language, EntityProfile } from '../types';
import { 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  Coins, 
  Handshake, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  Award, 
  FileText, 
  Scale, 
  Layers, 
  Sparkles, 
  HelpCircle,
  Briefcase,
  DollarSign,
  PieChart,
  Users,
  Landmark,
  Rocket
} from 'lucide-react';

interface QatarVentureCapitalHubProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
  onSelectEntity: (entity: EntityProfile) => void;
  onRequestIntro?: (targetName: string, targetId: string) => void;
  onOpenPostDeal?: () => void;
  onOpenReportModal?: () => void;
  entities: EntityProfile[];
}

export const QatarVentureCapitalHub: React.FC<QatarVentureCapitalHubProps> = ({
  language,
  onNavigateTab,
  onSelectEntity,
  onRequestIntro,
  onOpenPostDeal,
  onOpenReportModal,
  entities
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'vc' | 'angel' | 'family' | 'sovereign'>('all');
  const [activeStageFilter, setActiveStageFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter investor entities from all entities
  const investorEntities = useMemo(() => {
    return entities.filter(e => e.type === 'investor' || e.sector === 'Active Investors & VCs');
  }, [entities]);

  // Filtered list based on user selections
  const filteredInvestors = useMemo(() => {
    return investorEntities.filter(inv => {
      // Search filter
      const matchesSearch = 
        !searchQuery ||
        inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.nameAr && inv.nameAr.includes(searchQuery)) ||
        inv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.keyPeople && inv.keyPeople.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())));

      // Category filter
      let matchesCategory = true;
      if (activeCategoryFilter === 'vc') {
        matchesCategory = inv.id.includes('venture') || inv.tagline.toLowerCase().includes('venture capital') || inv.description.toLowerCase().includes('venture capital');
      } else if (activeCategoryFilter === 'angel') {
        matchesCategory = inv.id.includes('angel') || inv.tagline.toLowerCase().includes('angel') || inv.description.toLowerCase().includes('angel');
      } else if (activeCategoryFilter === 'family') {
        matchesCategory = inv.id.includes('mana') || inv.id.includes('jaidah') || inv.id.includes('mannai') || inv.tagline.toLowerCase().includes('family office');
      } else if (activeCategoryFilter === 'sovereign') {
        matchesCategory = inv.id.includes('qia') || inv.id.includes('qstp') || inv.tagline.toLowerCase().includes('sovereign');
      }

      // Stage filter
      let matchesStage = true;
      if (activeStageFilter !== 'all') {
        matchesStage = inv.stage === activeStageFilter;
      }

      return matchesSearch && matchesCategory && matchesStage;
    });
  }, [investorEntities, searchQuery, activeCategoryFilter, activeStageFilter]);

  // Benchmark stats
  const totalDisclosedFundSizeUsd = '$380M+ USD';
  const availableDryPowderUsd = '$65M+ USD';
  const sovereignMatchingPoolUsd = '$1.0B USD';

  // Structured FAQs for SEO & schema.org/FAQPage
  const faqs = [
    {
      qEn: 'How to raise Venture Capital in Qatar?',
      qAr: 'كيف يمكن جمع رأس المال الجريء في قطر؟',
      aEn: 'Raising venture capital in Qatar follows a four-step framework: 1) Legal Structuring: Incorporate your holding company or operating entity under the Qatar Financial Centre (QFC) to utilize English Common Law and standard post-money SAFEs. 2) Secure a Lead Investor: Pitch active Doha-based check-writers such as Rasmal Ventures, Doha Tech Angels (DTA), or single-family office venture arms (e.g. Al-Mana, Jaidah). 3) Leverage Sovereign Matching: Once you secure a verified lead check, apply for 1:1 equity co-investment matching via Qatar Development Bank (QDB) or innovation grants up to $1M USD through QRDI and QSTP. 4) Banking & Escrow: Open a corporate account with a QCB-regulated commercial bank with 0% capital gains tax and 100% foreign equity ownership.',
      aAr: 'تتطلب عملية جمع رأس المال الجريء في قطر ٤ خطوات أساسية: ١) التأسيس القانوني: تسجيل الشركة في مركز قطر للمال (QFC) للاستفادة من القانون العام الإنجليزي واتفاقيات SAFE المعيارية. ٢) تأمين المستثمر الرئيسي: استقطاب مستثمر محلي رئيسي مثل راسمال فنتشرز أو ملائكة التكنولوجيا بالدوحة أو المكاتب العائلية. ٣) مطابقة التمويل الحكومي: التقدم لبرنامج الاستثمار المشترك بنسبة ١:١ من بنك قطر للتنمية أو منح تطوير المنتجات من واحة قطر للعلوم (QSTP) حتى مليون دولار. ٤) الإيداع المصرفي: فتح حساب شركة معتمد بدون ضرائب على الأرباح الرأسمالية وملكية أجنبية ١٠٠٪.'
    },
    {
      qEn: 'What are the top active VC funds in Qatar?',
      qAr: 'ما هي أبرز صناديق رأس المال الجريء النشطة في قطر؟',
      aEn: 'The primary institutional venture check-writers in Qatar include: 1) Rasmal Ventures: Independent QFC-regulated venture fund manager deploying a $100M fund in Series Seed to Series A tech leaders (typical check size $500K–$3M USD). 2) Doha Tech Angels (DTA): Premier private angel investor syndicate with $25M+ in syndicated deployments for Pre-Seed and Seed startups ($100K–$500K USD). 3) QSTP Tech Venture Fund: Strategic $50M seed and venture pool backing DeepTech, AI, and healthcare IP ventures ($250K–$1.5M USD). 4) Family Office Venture Divisions: Multi-million dollar direct investment arms including Al-Mana Private Capital ($220M AUM), Jaidah Investment Group ($150M AUM), and Mannai Tech Ventures ($80M AUM). 5) Sovereign Fund of Funds: QIA’s $1B USD allocation anchoring venture funds with offices in Doha.',
      aAr: 'تشمل الجهات الاستثمارية الأكثر نشاطاً في كتابة الشيكات التمويلية في قطر: ١) راسمال فنتشرز (Rasmal Ventures): صندوق استثمار جريء مستقل ومرخص في مركز قطر للمال بحجم ١٠٠ مليون دولار يستثمر من ٥٠٠ ألف إلى ٣ ملايين دولار. ٢) ملائكة التكنولوجيا بالدوحة (DTA): شبكة المستثمرين الملائكيين الرائدة بشيكات من ١٠٠ إلى ٥٠٠ ألف دولار. ٣) صندوق واحة قطر للمشاريع التكنولوجية (QSTP Fund): صندوق بقيمة ٥٠ مليون دولار يركز على الذكاء الاصطناعي والتكنولوجيا الحيوية. ٤) المكاتب العائلية الكبرى: أذرع استثمارية نشطة تشمل المانع للاستثمار الخاص (٢٢٠ مليون دولار)، ومجموعة الجيدة (١٥٠ مليون دولار)، ومناعي للمشاريع التكنولوجية (٨٠ مليون دولار). ٥) صندوق الصناديق التابع لجهاز قطر للاستثمار (QIA) بقيمة مليار دولار.'
    },
    {
      qEn: 'How does the Qatar Financial Centre (QFC) license VC firms?',
      qAr: 'كيف يمنح مركز قطر للمال (QFC) تراخيص صناديق وشركات الاستثمار الجريء؟',
      aEn: 'The Qatar Financial Centre Regulatory Authority (QFCRA) licenses fund managers and venture capital vehicles under Category 3C (Asset Management) and Exempt Fund regimes. Key legal characteristics include: 1) English Common Law Jurisdiction: Operating under its own independent civil and commercial court (QICDRC), recognizing Delaware-style share classes, liquidation preferences, and drag-along rights. 2) 100% Foreign Ownership: Zero requirement for a local nominee shareholder. 3) Tax Advantages: 10% corporate tax rate on local sourced profits, 0% personal income tax for partners, 0% capital gains tax, and 0% withholding tax on outbound profit repatriation. 4) SPV & Holding Company Fast-Track: Special Purpose Vehicles (SPVs) for syndicating startup rounds can be established within 5–7 business days.',
      aAr: 'ترخص هيئة تنظيم مركز قطر للمال (QFCRA) مديري الصناديق ومركبات رأس المال الجريء تحت الفئة 3C ونظام الصناديق المعفاة: ١) القانون العام الإنجليزي: نظام قضائي مستقل تابع لمحكمة قطر الدولية (QICDRC) يتيح تطبيق اتفاقيات SAFEs وحصص الأسهم الممتازة. ٢) الملكية الأجنبية ١٠٠٪: دون اشتراط شريك محلي قطري. ٣) المزايا الضريبية: صفر بالمائة ضريبة دخل شخصي، وصفر ضريبة أرباح رأسمالية، وإعفاء كامل من ضرائب الاستقطاع عند تحويل الأرباح للخارج. ٤) تأسيس شركات الأغراض الخاصة (SPV): ترخيص وتأسيس شركات قابضة للاستثمار في جولات التمويل خلال ٥ إلى ٧ أيام عمل.'
    },
    {
      qEn: 'What are the typical check sizes and valuations for Qatar startups?',
      qAr: 'ما هي متوسطات مبالغ التمويل والتقييمات للشركات الناشئة في قطر؟',
      aEn: 'Based on QPCI market intelligence: Pre-Seed rounds typically raise $100K to $350K USD at $1.5M to $3M USD pre-money valuations (10–15% dilution). Seed rounds raise $500K to $1.5M USD at $4M to $7M USD valuations (15–20% dilution). Series A rounds raise $2.5M to $6M USD at $14M to $25M USD valuations (15–22% dilution). Due to Qatar’s high GDP per capita and currency peg (3.64 QAR = 1 USD), post-money valuations are resilient against emerging market FX depreciations.',
      aAr: 'وفقاً لبيانات مؤشر QPCI: مرحلة ما قبل البذرة تجمع من ١٠٠ إلى ٣٥٠ ألف دولار بتقييمات بين ١.٥ و٣ ملايين دولار (تخفيف ١٠-١٥٪). المرحلة التأسيسية (Seed) تجمع ٥٠٠ ألف إلى ١.٥ مليون دولار بتقييمات بين ٤ و٧ ملايين دولار. الجولة (أ) تجمع ٢.٥ إلى ٦ ملايين دولار بتقييمات بين ١٤ و٢٥ مليون دولار، مع ميزة ثبات سعر صرف الريال القطري مقابل الدولار.'
    },
    {
      qEn: 'Are foreign VC funds eligible for the QIA $1B Fund of Funds and QDB matching?',
      qAr: 'هل يحق لصناديق رأس المال الجريء الأجنبية الاستفادة من صندوق الصناديق وبرامج المطابقة؟',
      aEn: 'Yes. The Qatar Investment Authority (QIA) specifically designed its $1 Billion USD Fund of Funds to attract international and regional VC fund managers. In exchange for anchor LP commitments ($10M–$50M USD), managers must establish a presence in Doha, allocate capital into Qatari-headquartered or operating startups, and transfer venture knowledge. Similarly, Qatar Development Bank (QDB) matches foreign lead investors dollar-for-dollar when leading equity rounds in qualified Qatari startups.',
      aAr: 'نعم. صُمم برنامج صندوق الصناديق التابع لجهاز قطر للاستثمار (QIA) بقيمة مليار دولار خصيصاً لاستقطاب مديري الصناديق الإقليميين والدوليين؛ حيث يقدم مخصصات استثمارية (١٠ إلى ٥٠ مليون دولار) مقابل فتح مكتب في الدوحة واستثمار حصة في الشركات القطرية. كما يطابق بنك قطر للتنمية استثمارات المستثمر الأجنبي الرئيسي دولاراً بدولار في الشركات المؤهلة.'
    }
  ];

  // Generate Schema.org/FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': isAr ? faq.qAr : faq.qEn,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': isAr ? faq.aAr : faq.aEn
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Dynamic SEO FAQ Schema Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Banner Breadcrumbs */}
      <div className="bg-[#1E1919] text-[#E0D8D0] border-b border-[#382F2D] py-3 px-4 sm:px-6 lg:px-8 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-[#D4AF37] font-semibold">Ventures.qa</span>
            <span className="text-stone-600">/</span>
            <span className="text-white font-medium">qatar-venture-capital</span>
            <span className="bg-[#8A1538] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ml-2 rtl:mr-2">
              {isAr ? 'دليل رأس المال الجريء ٢٠٢٦' : 'Q2 2026 VC Census'}
            </span>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse text-stone-400">
            <span>{isAr ? 'ثبات الصرف: ٣.٦٤ ر.ق = ١ دولار' : 'Currency Peg: 3.64 QAR = 1 USD'}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{isAr ? 'القانون العام: QFC & QICDRC' : 'Legal Parity: QFC Common Law'}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#1E1919] via-[#2A2222] to-[#1E1919] text-white py-16 sm:py-20 border-b border-[#382F2D] overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-[#8A1538]/30 border border-[#8A1538] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider mb-5">
              <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? 'منظومة رأس المال الجريء والمستثمرين' : 'Venture Capital & Private Capital Hub'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              {isAr ? (
                <>رأس المال الجريء في قطر: <span className="text-[#D4AF37]">دليل الصناديق والصفقات</span> (٢٠٢٦)</>
              ) : (
                <>Qatar Venture Capital: <span className="text-[#D4AF37]">Active VC Funds, Angels & Family Offices</span></>
              )}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans mb-8">
              {isAr ? (
                'المنصة الوطنية الموثقة لرصد صناديق رأس المال الجريء المرخصة في مركز قطر للمال (QFC)، وشبكات المستثمرين الملائكيين، ومطابقة التمويل السيادي بقيمة مليار دولار، والصفقات الجارية.'
              ) : (
                'The authoritative institutional intelligence hub tracking licensed venture fund managers, private angel syndicates, sovereign co-matching pools, and English Common Law investment structures in Doha.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('vc-directory-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-lg bg-[#8A1538] hover:bg-[#A31D44] text-white font-semibold text-sm transition-all shadow-lg shadow-[#8A1538]/20 flex items-center space-x-2 rtl:space-x-reverse"
              >
                <span>{isAr ? 'استعراض الصناديق والمستثمرين' : 'Explore Active VC Directory'}</span>
                <Arrow className="w-4 h-4" />
              </button>

              {onOpenPostDeal && (
                <button
                  onClick={onOpenPostDeal}
                  className="px-5 py-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 font-semibold text-sm transition-all flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Rocket className="w-4 h-4 text-[#D4AF37]" />
                  <span>{isAr ? 'قدّم جولة تمويلية (Deal Flow)' : 'Submit a Deal to Investors'}</span>
                </button>
              )}

              {onOpenReportModal && (
                <button
                  onClick={onOpenReportModal}
                  className="px-5 py-3 rounded-lg bg-transparent hover:bg-white/5 text-stone-300 border border-stone-700 font-medium text-sm transition-all flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <FileText className="w-4 h-4 text-stone-400" />
                  <span>{isAr ? 'تقرير مؤشر رأس المال QPCI' : 'Download QPCI VC Report'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real-time VC Metrics Display Bar */}
      <section className="bg-white border-b border-stone-200 shadow-sm py-8 -mt-2 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1: Total Disclosed VC Fund Size */}
            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  {isAr ? 'إجمالي حجم صناديق VC' : 'Total Disclosed VC Fund Size'}
                </span>
                <Coins className="w-4 h-4 text-[#8A1538]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#1E1919]">
                {totalDisclosedFundSizeUsd}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {isAr ? '١.٣٨ مليار ريال قطري موثقة' : 'Equivalent to 1.38B QAR in dedicated pools'}
              </div>
            </div>

            {/* Metric 2: Available Dry Powder */}
            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  {isAr ? 'السيولة الجاهزة (Dry Powder)' : 'Active Available Dry Powder'}
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-700">
                {availableDryPowderUsd}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {isAr ? 'مخصصة لجولات التأسيس وSeries A لعام ٢٠٢٦' : 'Available for Seed & Series A rounds in 2026'}
              </div>
            </div>

            {/* Metric 3: Sovereign Matching Guarantee */}
            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  {isAr ? 'صندوق الصناديق السيادي' : 'Sovereign VC Allocation'}
                </span>
                <Landmark className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#1E1919]">
                {sovereignMatchingPoolUsd}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {isAr ? 'برنامج جهاز قطر للاستثمار (QIA Fund of Funds)' : 'QIA anchor LP commitments + QDB 1:1 match'}
              </div>
            </div>

            {/* Metric 4: Investment Stages Tracked */}
            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  {isAr ? 'مراحل الاستثمار النشطة' : 'Deployment Stage Focus'}
                </span>
                <PieChart className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#1E1919]">
                Pre-Seed → Series A
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {isAr ? 'متوسط الشيك: ٥٠٠ ألف إلى ٣ ملايين دولار' : 'Median checks: $500K – $3M USD'}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Filtered VC Hub Section */}
      <section id="vc-directory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#8A1538] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'الدليل الحصري والمصنف' : 'Verified Capital Directory'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1919]">
              {isAr ? 'صناديق رأس المال الجريء وشبكات المستثمرين في قطر' : 'Venture Capital Firms, Angel Networks & Family Offices'}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {isAr ? (
                'تصفية حصرية لجهات الاستثمار الجريء النشطة في قطر مع بيانات الحجم، ومتوسط الشيك، والقيادات التنفيذية.'
              ) : (
                'Pre-filtered directory exclusively displaying active venture funds, angel consortiums, and family investment offices.'
              )}
            </p>
          </div>

          <div className="text-xs text-stone-500 bg-white border border-stone-200 px-3 py-2 rounded-lg shadow-sm">
            <span className="font-semibold text-stone-800">{filteredInvestors.length}</span> {isAr ? 'جهة استثمارية نشطة' : 'Active Allocators Displayed'}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-3 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث باسم الصندوق، الشريك الإداري، أو القطاع...' : 'Search by fund name, partner, or investment sector...'}
                className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A1538] focus:border-transparent bg-stone-50"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', labelEn: 'All Investors', labelAr: 'كافة المستثمرين' },
                { id: 'vc', labelEn: 'Venture Capital', labelAr: 'صناديق VC' },
                { id: 'angel', labelEn: 'Angel Networks', labelAr: 'شبكات ملائكية' },
                { id: 'family', labelEn: 'Family Offices', labelAr: 'مكاتب عائلية' },
                { id: 'sovereign', labelEn: 'Sovereign Programs', labelAr: 'برامج سيادية' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategoryFilter === tab.id
                      ? 'bg-[#8A1538] text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {isAr ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Stage Filter Bar */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-stone-500 pt-2 border-t border-stone-100 overflow-x-auto pb-1">
            <span className="font-semibold text-stone-700 whitespace-nowrap">{isAr ? 'المرحلة المستهدفة:' : 'Stage Target:'}</span>
            {['all', 'Pre-Seed', 'Seed', 'Series A', 'Growth'].map(stage => (
              <button
                key={stage}
                onClick={() => setActiveStageFilter(stage)}
                className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap ${
                  activeStageFilter === stage
                    ? 'bg-stone-800 text-white font-medium'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {stage === 'all' ? (isAr ? 'الكل' : 'All Stages') : stage}
              </button>
            ))}
          </div>
        </div>

        {/* Investor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredInvestors.map(investor => {
            const hasCheckSize = !!investor.checkSizeRange;
            const hasAum = !!investor.aumUsd;

            return (
              <div 
                key={investor.id}
                className="bg-white rounded-xl border border-stone-200 hover:border-[#8A1538]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  {/* Card Header with Logo & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-sm text-sm"
                        style={{ backgroundColor: investor.logoBg || '#8A1538' }}
                      >
                        {investor.logo || investor.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[#1E1919] leading-snug">
                          {isAr && investor.nameAr ? investor.nameAr : investor.name}
                        </h3>
                        <span className="text-xs font-mono text-stone-500">
                          {investor.headquarters}
                        </span>
                      </div>
                    </div>

                    {investor.verified && (
                      <span className="inline-flex items-center space-x-1 rtl:space-x-reverse px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isAr ? 'موثق' : 'Verified'}</span>
                      </span>
                    )}
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-stone-600 mb-4 line-clamp-2 leading-relaxed font-sans">
                    {isAr && investor.taglineAr ? investor.taglineAr : investor.tagline}
                  </p>

                  {/* Financial & Ticket Size Badge Highlights */}
                  <div className="grid grid-cols-2 gap-2 mb-4 bg-[#FAF8F5] p-3 rounded-lg border border-stone-100 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 font-mono uppercase block">
                        {isAr ? 'حجم الصندوق / الأصول' : 'Fund Size / AUM'}
                      </span>
                      <span className="font-bold text-stone-800 font-serif">
                        {investor.aumUsd || (isAr ? 'مخصصات مباشرة' : 'Direct Allocation')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 font-mono uppercase block">
                        {isAr ? 'متوسط حجم الشيك' : 'Typical Check Size'}
                      </span>
                      <span className="font-bold text-emerald-700 font-serif">
                        {investor.checkSizeRange || (isAr ? 'مرن' : 'Discretionary')}
                      </span>
                    </div>
                  </div>

                  {/* Stage & Sector Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#8A1538]/10 text-[#8A1538]">
                      {investor.stage}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-700">
                      {investor.sector}
                    </span>
                    {investor.headquarters.toLowerCase().includes('qfc') && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        QFC Regulated
                      </span>
                    )}
                  </div>

                  {/* Key People / General Partners */}
                  {investor.keyPeople && investor.keyPeople.length > 0 && (
                    <div className="pt-3 border-t border-stone-100 text-xs text-stone-600">
                      <span className="text-stone-400 text-[10px] font-mono block mb-1">
                        {isAr ? 'القيادة والشركاء:' : 'Partners & Key Leadership:'}
                      </span>
                      <div className="space-y-0.5">
                        {investor.keyPeople.slice(0, 2).map((person, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[11px]">
                            <span className="font-medium text-stone-800">
                              {isAr && person.nameAr ? person.nameAr : person.name}
                            </span>
                            <span className="text-stone-400 text-[10px]">
                              {isAr && person.roleAr ? person.roleAr : person.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onSelectEntity(investor)}
                    className="text-stone-700 hover:text-[#8A1538] font-semibold transition-colors flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    <span>{isAr ? 'عرض الملف' : 'View Dossier'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </button>

                  {onRequestIntro ? (
                    <button
                      onClick={() => onRequestIntro(investor.name, investor.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#8A1538] hover:bg-[#A31D44] text-white font-semibold transition-all shadow-sm flex items-center space-x-1 rtl:space-x-reverse"
                    >
                      <Handshake className="w-3.5 h-3.5" />
                      <span>{isAr ? 'طلب تواصل' : 'Request Intro'}</span>
                    </button>
                  ) : (
                    <a
                      href={investor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8A1538] font-medium flex items-center space-x-1 rtl:space-x-reverse hover:underline"
                    >
                      <span>{isAr ? 'الموقع الرسمي' : 'Official Portal'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* VC Ecosystem Playbook: How Raising Works in Doha */}
      <section className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#8A1538] block mb-2">
              {isAr ? 'آلية التمويل والتأسيس' : 'The Doha Venture Architecture'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1919]">
              {isAr ? 'كيف يعمل جمع رأس المال الجريء في قطر؟' : 'How Venture Capital & Co-Investment Works in Qatar'}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {isAr ? (
                'تجمع منظومة قطر بين سيولة المستثمرين الملائكيين وصناديق الاستثمار الجريء، ومطابقة التمويل السيادي الإلزامي.'
              ) : (
                'A transparent look at the catalyst mechanisms: private lead check-writing paired with dollar-for-dollar sovereign co-matching.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-[#8A1538] text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-[#1E1919] mb-2">
                {isAr ? 'التأسيس عبر مركز قطر للمال' : 'QFC Common Law Incorporation'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isAr ? (
                  'تأسيس الشركة أو الشركة القابضة تحت القانون العام الإنجليزي (QFC) لتمكين اتفاقيات SAFE وفئات الأسهم الممتازة وحماية حقوق المستثمر.'
                ) : (
                  'Founders incorporate under QFC to access English Common Law, standard Delaware/BVCA share classes, and post-money SAFE note structures.'
                )}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-[#8A1538] text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-serif font-bold text-base text-[#1E1919] mb-2">
                {isAr ? 'تأمين المستثمر الرئيسي' : 'Secure Private Lead Check'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isAr ? (
                  'إغلاق التزام مبدئي من صندوق استثمار جريء معتمد (مثل راسمال فنتشرز) أو شبكة ملائكية (DTA) أو مكتب عائلي لكتابة أول شيك نقدي.'
                ) : (
                  'Pitch active Doha lead check-writers (Rasmal Ventures, DTA syndicates, or family offices) to validate your terms and issue the lead commitment.'
                )}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-[#8A1538] text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="font-serif font-bold text-base text-[#1E1919] mb-2">
                {isAr ? 'مطابقة التمويل السيادي (1:1)' : 'Trigger Sovereign Matching'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isAr ? (
                  'تفعيل برنامج التمويل المشترك من بنك قطر للتنمية (QDB) لمطابقة شيك المستثمر الخاص دولاراً بدولار، مضاعفاً مدرج الشركة دون تخفيف إضافي.'
                ) : (
                  'Apply for QDB 1:1 equity co-investment or QSTP non-dilutive grants, matching qualified private tickets up to $1M USD to double runway.'
                )}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-[#8A1538] text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="font-serif font-bold text-base text-[#1E1919] mb-2">
                {isAr ? 'الإيداع والتوسع الإقليمي' : 'Deploy & Scale to the GCC'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isAr ? (
                  'إيداع رأس المال في الحسابات المصرفية المعتمدة بربط ثابت بالدولار (٣.٦٤)، مع توظيف الكفاءات والتوسع نحو السوق السعودي والخليجي.'
                ) : (
                  'Funds wired via commercial banking with zero repatriation friction and 0% capital gains, expanding your operations into Saudi Arabia and GCC.'
                )}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Licensing & Regulatory Guide Section: QFC Authority */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#1E1919] to-[#342628] text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-[#483335]">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              {isAr ? 'الإطار التنظيمي والقانوني' : 'Regulatory & Fund Structuring Framework'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold mb-4">
              {isAr ? (
                'ترخيص وتأسيس صناديق رأس المال الجريء في مركز قطر للمال (QFC)'
              ) : (
                'How the Qatar Financial Centre (QFC) Licenses Venture Capital Firms'
              )}
            </h2>
            <p className="text-sm sm:text-base text-stone-300 mb-8 leading-relaxed">
              {isAr ? (
                'يُعد مركز قطر للمال الوجهة الأولى لمديري صناديق الاستثمار الجريء والشركات التكنولوجية في الخليج بفضل تطبيقه القانون العام الإنجليزي ومحكمته التجارية المستقلة (QICDRC) وإعفائه الكامل من الضرائب الشخصية والرأسمالية.'
              ) : (
                'The Qatar Financial Centre Regulatory Authority (QFCRA) operates under an English Common Law statutory framework, making it the preferred onshore jurisdiction for international fund managers, syndicates, and venture SPVs in the Middle East.'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans mb-8">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <span className="font-bold text-[#D4AF37] block mb-1">
                  {isAr ? 'القانون العام الإنجليزي' : 'English Common Law Jurisdiction'}
                </span>
                <p className="text-stone-300">
                  {isAr ? 'محكمة مدنية وتجارية مستقلة بقيادة قضاة بريطانيين ودوليين تنفذ أحكام الشركاء وصناديق الاستثمار.' : 'Governed by the QICDRC court with British and international commercial judges enforcing standard venture contracts.'}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <span className="font-bold text-[#D4AF37] block mb-1">
                  {isAr ? 'الملكية الأجنبية بنسبة ١٠٠٪' : '100% Foreign Equity Ownership'}
                </span>
                <p className="text-stone-300">
                  {isAr ? 'ملكية أجنبية كاملة لمديري الصناديق والمؤسسين دون اشتراط كفيل أو شريك محلي.' : 'Total foreign equity freedom without local ownership mandates, nominee restrictions, or currency limits.'}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <span className="font-bold text-[#D4AF37] block mb-1">
                  {isAr ? 'صفر ضريبة دخل شخصي ورأسمالي' : '0% Personal & Capital Gains Tax'}
                </span>
                <p className="text-stone-300">
                  {isAr ? 'لا توجد ضرائب على الدخل الشخصي أو الأرباح الرأسمالية للمستثمرين والشركاء العموميين (GPs).' : 'Zero personal income tax, zero capital gains tax, and zero withholding tax on outbound dividend distribution.'}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <span className="font-bold text-[#D4AF37] block mb-1">
                  {isAr ? 'مركبات SPV السريعة' : 'Fast-Track Venture SPVs'}
                </span>
                <p className="text-stone-300">
                  {isAr ? 'إصدار تراخيص شركات الأغراض الخاصة لجولات الاستثمار المحددة في غضون ٥ إلى ٧ أيام عمل.' : 'Special Purpose Vehicles for deal syndication can be licensed within 5 to 7 business days with streamlined filings.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.qfc.qa"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#c59e2b] text-[#1E1919] font-bold text-xs transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
              >
                <span>{isAr ? 'زيارة بوابة مركز قطر للمال' : 'Visit QFC Licensing Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => onNavigateTab('methodology')}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all"
              >
                {isAr ? 'منهجية تدقيق البيانات (Methodology)' : 'View Compliance Methodology'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Structured FAQ Section (schema.org/FAQPage) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs font-bold uppercase tracking-wider text-[#8A1538] mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>{isAr ? 'الأسئلة الشائعة ومحركات البحث' : 'Knowledge Base & Structured FAQ'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1919]">
            {isAr ? 'الأسئلة الشائعة حول رأس المال الجريء في قطر' : 'Frequently Asked Questions on Qatar Venture Capital'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            {isAr ? (
              'إجابات شاملة معتمدة على الأطر التنظيمية الرسمية وبيانات مؤشر السوق الخاص.'
            ) : (
              'Authoritative answers addressing key institutional queries, codified for rich search snippet indexing.'
            )}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left rtl:text-right px-6 py-4 flex items-center justify-between text-[#1E1919] hover:bg-stone-50 transition-colors"
                >
                  <span className="font-serif font-bold text-base sm:text-lg pr-4 rtl:pr-0 rtl:pl-4">
                    {isAr ? faq.qAr : faq.qEn}
                  </span>
                  <div className="p-1 rounded-full bg-stone-100 text-stone-600 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-100 bg-[#FAF8F5]/50">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Cross-Hub Navigation Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-base text-[#1E1919]">
              {isAr ? 'استكشف بوابات الاستثمار الوطنية الأخرى' : 'Explore Related Investment Portals on Ventures.qa'}
            </h4>
            <p className="text-xs text-stone-500">
              {isAr ? 'بيانات شاملة وموثقة لبيئة الأعمال القطرية' : 'Comprehensive verified directories for founders and institutional allocators'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigateTab('invest-qatar')}
              className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-[#8A1538] hover:text-white text-stone-700 text-xs font-semibold transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>{isAr ? 'استثمر في قطر' : 'Invest Qatar Hub'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('startups-qatar')}
              className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-[#8A1538] hover:text-white text-stone-700 text-xs font-semibold transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>{isAr ? 'الشركات الناشئة' : 'Startups Qatar (Top 40)'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('real-estate')}
              className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-[#8A1538] hover:text-white text-stone-700 text-xs font-semibold transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'عقارات قطر' : 'Qatar Real Estate'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('deals')}
              className="px-3.5 py-2 rounded-lg bg-[#8A1538] text-white hover:bg-[#A31D44] text-xs font-semibold transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Coins className="w-3.5 h-3.5" />
              <span>{isAr ? 'سوق الصفقات' : 'Deal-Flow Marketplace'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
