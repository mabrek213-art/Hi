import React, { useState } from 'react';
import { Language, RaisingOpportunity } from '../types';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Landmark, 
  Globe2, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Calculator, 
  Briefcase, 
  Scale, 
  HelpCircle,
  ExternalLink,
  Lock,
  Mail,
  PieChart
} from 'lucide-react';

interface InvestQatarHubProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
  onSelectArticleSlug?: (slug: string) => void;
  onRequestIntro?: (targetName: string, targetId: string) => void;
  raisingDeals: RaisingOpportunity[];
}

export const InvestQatarHub: React.FC<InvestQatarHubProps> = ({
  language,
  onNavigateTab,
  onSelectArticleSlug,
  onRequestIntro,
  raisingDeals
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Investment Calculator State
  const [ticketSize, setTicketSize] = useState<number>(250000);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'qfc' | 'qstp' | 'qfza' | 'moci'>('qfc');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Projected return models (3x base, 5x optimistic)
  const baseReturn = ticketSize * Math.pow(1 + 0.22, holdingPeriod);
  const multiple = (baseReturn / ticketSize).toFixed(1);

  const jurisdictions = [
    {
      id: 'qfc' as const,
      nameEn: 'Qatar Financial Centre (QFC)',
      nameAr: 'مركز قطر للمال (QFC)',
      taglineEn: 'English Common Law, 100% Foreign Ownership, Standard SAFEs',
      taglineAr: 'القانون العام الإنجليزي، ملكية أجنبية ١٠٠٪، واتفاقيات SAFE معيارية',
      foreignOwnership: '100%',
      legalSystem: 'English Common Law (Civil & Commercial Court)',
      taxRate: '10% on locally-sourced profits (0% personal, no withholding tax)',
      repatriation: '100% unlimited profit & capital repatriation',
      incorporationTime: '5–10 Business Days',
      bestFor: 'Venture Capital funds, Holding Companies, SaaS, FinTech, and Advisory firms',
      popularEntities: 'Rasmal Ventures, Droobi Health, SkipCash FinTech Holdings'
    },
    {
      id: 'qstp' as const,
      nameEn: 'Qatar Science & Technology Park (QSTP)',
      nameAr: 'واحة قطر للعلوم والتكنولوجيا (QSTP)',
      taglineEn: 'DeepTech Hub, $1M+ R&D Grants, IP Commercialization',
      taglineAr: 'واحة التكنولوجيا المتقدمة، منح بحثية حتى مليون دولار، وحماية الملكية الفكرية',
      foreignOwnership: '100%',
      legalSystem: 'QSTP Free Zone Authority Regulations',
      taxRate: '0% Corporate Tax, 0% Customs on hardware/prototyping machinery',
      repatriation: '100% unlimited capital repatriation',
      incorporationTime: '7–14 Business Days',
      bestFor: 'AI, Clinical HealthTech, Robotics, Biotech, and CleanTech research spinouts',
      popularEntities: 'Avey AI Health, Bonocle, Airlift Systems'
    },
    {
      id: 'qfza' as const,
      nameEn: 'Qatar Free Zones Authority (QFZA)',
      nameAr: 'هيئة المناطق الحرة (QFZA)',
      taglineEn: 'Airport & Port Zones (Ras Bufontas & Um Alhoul), 20-Yr Tax Holiday',
      taglineAr: 'مناطق رأس بوفنطاس وأم الحول، إعفاء ضريبي لمدة ٢٠ عاماً',
      foreignOwnership: '100%',
      legalSystem: 'Free Zones Special Administrative Regime',
      taxRate: '0% Corporate Tax for 20 years, Zero Customs Duties',
      repatriation: '100% capital repatriation with zero currency limits',
      incorporationTime: '10–15 Business Days',
      bestFor: 'Advanced hardware manufacturing, logistics hubs, quick-commerce fulfillment',
      popularEntities: 'Global tech infrastructure providers, regional cold-chain innovators'
    },
    {
      id: 'moci' as const,
      nameEn: 'Ministry of Commerce & Industry (MOCI)',
      nameAr: 'وزارة التجارة والصناعة (MOCI)',
      taglineEn: 'Law No. 1 of 2019 Non-Qatari Capital Investment Framework',
      taglineAr: 'قانون تنظيم استثمار رأس المال غير القطري رقم (١) لسنة ٢٠١٩',
      foreignOwnership: 'Up to 100% in approved sectors (Tech, Education, Consulting)',
      legalSystem: 'State of Qatar Commercial Companies Law (Law No. 11 of 2015)',
      taxRate: '10% on foreign share of corporate net profits',
      repatriation: 'Full repatriation permitted through QCB regulated banks',
      incorporationTime: '3–7 Business Days via Single Window (نافذة واحدة)',
      bestFor: 'Local consumer retail, on-demand transport, hybrid domestic ventures',
      popularEntities: 'Snoonu Logistics LLC, Urban Point Consumer Loyalty'
    }
  ];

  const faqs = [
    {
      qEn: 'Why should international venture capital funds and angels invest in Qatar?',
      qAr: 'لماذا يجب على صناديق الاستثمار الجريء والمستثمرين الملائكيين الاستثمار في قطر؟',
      aEn: 'Qatar offers one of the world’s most liquid, stable, and tax-efficient venture environments: 0% personal income tax, a fixed currency peg (3.64 QAR to 1 USD), sovereign matching programs ($1B QIA Fund of Funds, QDB equity co-investment), 100% foreign equity ownership, and a concentrated domestic market with the world’s highest GDP per capita (~$88,000 USD) serving as an ideal proving ground before scaling into Saudi Arabia and the wider GCC.',
      aAr: 'توفر دولة قطر بيئة استثمارية فائقة الاستقرار والسيولة: صفر ضريبة دخل شخصي، وسعر صرف ثابت ومضمون (٣.٦٤ ريال للدولار)، وبرامج مطابقة سيادية (صندوق الصناديق التابع لجهاز قطر للاستثمار بقيمة مليار دولار، وبرامج بنك قطر للتنمية)، وملكية أجنبية ١٠٠٪، وأعلى دخل فردي عالمياً يتيح اختبار المنتجات قبل التوسع نحو السوق السعودي والخليجي.'
    },
    {
      qEn: 'Can foreign investors own 100% of a company or startup in Qatar?',
      qAr: 'هل يمكن للمستثمر الأجنبي تملك الشركات والمشاريع التقنية بنسبة ١٠٠٪ في قطر؟',
      aEn: 'Yes. Under Qatar Law No. 1 of 2019, foreign investors can own up to 100% equity across most economic sectors including technology, information systems, healthcare, and engineering. Furthermore, the Qatar Financial Centre (QFC), Qatar Science & Technology Park (QSTP), and Qatar Free Zones (QFZA) allow 100% foreign ownership natively with English Common Law corporate governance and standard Delaware/UK style share structures.',
      aAr: 'نعم، بموجب القانون رقم (١) لسنة ٢٠١٩ لتنظيم استثمار رأس المال غير القطري، يحق للمستثمر الأجنبي تملك ما يصل إلى ١٠٠٪ في قطاعات التكنولوجيا والاستشارات والرعاية الصحية. كما يتيح مركز قطر للمال (QFC) وواحة العلوم والتكنولوجيا (QSTP) والمناطق الحرة ملكية أجنبية كاملة تحت مظلة القانون العام الإنجليزي وهياكل الأسهم العالمية.'
    },
    {
      qEn: 'What legal instruments (SAFEs, Convertible Notes) are recognized for investing in Qatar startups?',
      qAr: 'ما هي الأدوات القانونية (مثل اتفاقيات SAFE والسندات القابلة للتحويل) المعترف بها في قطر؟',
      aEn: 'Post-money SAFEs (Simple Agreements for Future Equity) and convertible promissory notes are widely accepted and standardized in Qatar, especially for companies incorporated under the Qatar Financial Centre (QFC). The QFC Civil and Commercial Court enforces English Common Law contracts, ensuring standard valuation caps, discount rates, and liquidation preferences are strictly upheld.',
      aAr: 'تعتبر اتفاقيات SAFE والسندات القابلة للتحويل أدوات قياسية ومعتمدة في قطر، لاسيما للشركات المسجلة في مركز قطر للمال (QFC) حيث تطبق محكمة قطر الدولية المعايير التجارية الإنجليزية لحماية حقوق المستثمرين وتحديد سقف التقييم ونسب التخفيف بدقة.'
    },
    {
      qEn: 'How does sovereign co-investment matching work in Qatar (QIA, QDB, QRDI)?',
      qAr: 'كيف تعمل برامج التمويل السيادي المشترك ومطابقة رؤوس الأموال في قطر؟',
      aEn: 'Qatar operates catalytic co-investment programs designed to de-risk private capital. The Qatar Investment Authority (QIA) deployed a $1 Billion Fund of Funds mandate to invest in international and regional VC managers establishing operations in Doha. Meanwhile, Qatar Development Bank (QDB) offers direct 1:1 equity matching facilities for institutional rounds closed by qualified startups, and QRDI provides up to $1M in non-dilutive research & innovation commercialization grants.',
      aAr: 'توفر قطر برامج تمويل تحفيزية لتقليل مخاطر رأس المال الخاص؛ حيث خصص جهاز قطر للاستثمار (QIA) برنامج "صندوق الصناديق" بقيمة مليار دولار لدعم مديري الصناديق الإقليميين والدوليين. كما يقدم بنك قطر للتنمية (QDB) تمويلاً مطابقاً بنسبة ١:١ للجولات الاستثمارية المغلقة، وتمنح QRDI تمويلات ابتكار غير مخففة للملكية تصل إلى مليون دولار.'
    },
    {
      qEn: 'What is the tax rate on venture investments and capital gains in Qatar?',
      qAr: 'ما هي نسبة الضرائب على الاستثمارات الرأسمالية والأرباح الرأسمالية في قطر؟',
      aEn: 'Qatar has 0% personal income tax and 0% capital gains tax for individual investors. In special economic zones like QSTP and QFZA, corporate tax is 0% (up to 20 years). Under the QFC, corporate tax is a flat 10% on locally sourced commercial profits, with 0% tax on capital gains derived from qualifying shareholdings, no withholding taxes on cross-border dividends, and no currency exchange controls.',
      aAr: 'تتمتع قطر بصفر بالمئة ضريبة على الدخل الشخصي وصفر بالمئة ضريبة أرباح رأسمالية للأفراد. في واحة العلوم (QSTP) والمناطق الحرة تبلغ ضريبة الشركات ٠٪. وفي مركز قطر للمال (QFC) تبلغ ضريبة أرباح الشركات المحلية ١٠٪ فقط، مع إعفاء كامل للأرباح الرأسمالية من حصص الأسهم المؤهلة وعدم وجود ضرائب اقتطاع عند توزيع الأرباح للخارج.'
    },
    {
      qEn: 'How can an overseas angel or institutional fund get direct deal flow in Qatar?',
      qAr: 'كيف يمكن للمستثمر الدولي أو الصندوق الخارجي الوصول إلى صفقات استثمارية مباشرة في قطر؟',
      aEn: 'Ventures.qa maintains Qatar’s most comprehensive verified deal flow marketplace, featuring vetted Seed, Series A, and Growth rounds seeking capital. Accredited investors can request bilateral introductions under mutual NDA directly through the platform or connect with established syndicates like Doha Tech Angels and Rasmal Ventures.',
      aAr: 'توفر منصة Ventures.qa منصة صفقات التمويل المباشرة الأكثر شمولاً في قطر، والتي تتضمن جولات استثمارية تأسيسية ومتقدمة تم تدقيقها. يمكن للمستثمرين المعتمدين طلب ربط استثماري مباشر تحت اتفاقية سرية (NDA) أو التنسيق مع شبكات ملائكية مثل "ملائكة التكنولوجيا بالدوحة" وصندوق "راسمال فنتشرز".'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. HERO SECTION: INVEST IN QATAR */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#4A0A1C] via-[#8A1538] to-[#25030D] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#C5A059]/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059] text-[#1E1919] font-black text-xs font-mono uppercase tracking-wider shadow">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? 'البوابة الرسمية لرأس المال الأجنبي' : 'INSTITUTIONAL & FOREIGN INVESTOR GATEWAY'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-mono border border-white/20">
              {isAr ? 'تحديث استثماري ٢٠٢٦' : '2026 FDI Allocation Framework'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
            {isAr ? (
              <>
                استثمر في قطر: <br />
                <span className="text-[#C5A059]">بوابة رأس المال الجريء والصفقات المباشرة</span>
              </>
            ) : (
              <>
                Invest in Qatar: <br />
                <span className="text-[#C5A059]">The Venture Capital & FDI Intelligence Hub</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium max-w-3xl">
            {isAr
              ? 'دليلك الشامل لضخ الاستثمارات في الشركات التكنولوجية والصناديق الجريئة في دولة قطر: أطر التملك الأجنبي الكامل بنسبة ١٠٠٪، الحوافز الضريبية، برامج التمويل السيادي المشترك، والوصول الفوري للصفقات النشطة.'
              : 'The definitive intelligence gateway for global institutional allocators, venture capitalists, and foreign angel investors deploying capital in Qatar: 100% foreign equity laws, 0% personal tax, sovereign co-investment, and direct pipeline access.'}
          </p>

          {/* Core Macro Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'التملك الأجنبي' : 'Foreign Ownership'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">100%</div>
              <div className="text-[10px] text-white/70">{isAr ? 'في QFC وQSTP والقانون' : 'QFC, QSTP & Law 1/2019'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'ضريبة الدخل الشخصي' : 'Personal Income Tax'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">0%</div>
              <div className="text-[10px] text-white/70">{isAr ? 'وصفر ضريبة أرباح رأسمالية' : '0% Capital Gains for Individuals'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'برنامج صندوق الصناديق' : 'Sovereign FoF Mandate'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">$1.0B USD</div>
              <div className="text-[10px] text-white/70">{isAr ? 'مخصصات جهاز قطر للاستثمار' : 'QIA Catalytic VC Deployment'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
              <div className="text-[11px] font-mono text-[#C5A059] uppercase">{isAr ? 'استقرار سعر الصرف' : 'Currency Stability'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">3.64 QAR</div>
              <div className="text-[10px] text-white/70">{isAr ? 'ربط رسمي دائم بالدولار الأمريكي' : 'Fixed Peg per 1 USD'}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('marketplace')}
              className="px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF67] text-[#1E1919] font-black text-sm shadow-lg transition-all flex items-center gap-2 group"
            >
              <span>{isAr ? 'استعراض الصفقات النشطة ($35M+)' : 'Explore Live Deals ($35M+)'}</span>
              <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

            {onSelectArticleSlug && (
              <button
                onClick={() => onSelectArticleSlug('invest-in-qatar-guide-foreign-investors-vcs-family-offices')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>{isAr ? 'قراءة دليل الاستثمار الأجنبي ٢٠٢٦' : 'Read 2026 FDI Guide'}</span>
              </button>
            )}

            <button
              onClick={() => {
                const el = document.getElementById('jurisdiction-matrix');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-black/20 hover:bg-black/30 text-white/90 font-bold text-sm border border-white/15 transition-all flex items-center gap-2"
            >
              <Scale className="w-4 h-4 text-[#C5A059]" />
              <span>{isAr ? 'مقارنة المناطق الاستثمارية (QFC vs QSTP)' : 'Jurisdiction Comparison'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. JURISDICTION COMPARISON MATRIX (QFC vs QSTP vs QFZA vs MOCI) */}
      <div id="jurisdiction-matrix" className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
            <Scale className="w-4 h-4" />
            {isAr ? 'المقارنة القانونية والهيكلية' : 'LEGAL & CORPORATE STRUCTURING MATRIX'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1919] tracking-tight mt-1">
            {isAr ? 'أين تؤسس وتستثمر في قطر؟ مقارنة المناطق الأربع' : 'Where to Invest & Incorporate: The 4 Key Qatar Jurisdictions'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1 max-w-3xl">
            {isAr
              ? 'اختر الهيكل القانوني الأنسب لاستثمارك، سواء كنت صندوق استثمار جريء، أو مستثمراً ملائكياً أجنبياً، أو شركة تكنولوجية ناشئة.'
              : 'Select the optimal legal vehicle for your investment mandate, whether deploying venture capital, establishing an IP holding company, or setting up tech operations.'}
          </p>
        </div>

        {/* Tab buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 border-b border-[#E8DFC8] pb-4">
          {jurisdictions.map((j) => (
            <button
              key={j.id}
              onClick={() => setSelectedJurisdiction(j.id)}
              className={`p-3 rounded-xl text-left rtl:text-right transition-all border ${
                selectedJurisdiction === j.id
                  ? 'bg-[#8A1538] text-white border-[#8A1538] shadow-md'
                  : 'bg-[#FAF8F5] text-[#3D3233] border-[#E8DFC8] hover:bg-[#F2ECE4]'
              }`}
            >
              <div className="text-xs font-black truncate">{isAr ? j.nameAr : j.nameEn}</div>
              <div className={`text-[10px] mt-0.5 truncate ${selectedJurisdiction === j.id ? 'text-[#C5A059]' : 'text-[#7A6D6D]'}`}>
                {j.foreignOwnership} Foreign Equity
              </div>
            </button>
          ))}
        </div>

        {/* Selected Jurisdiction Detail Card */}
        {(() => {
          const item = jurisdictions.find(j => j.id === selectedJurisdiction)!;
          return (
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#E8DFC8] space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-[#1E1919]">
                    {isAr ? item.nameAr : item.nameEn}
                  </h3>
                  <p className="text-xs text-[#8A1538] font-semibold mt-0.5">
                    {isAr ? item.taglineAr : item.taglineEn}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  {isAr ? 'ملكية أجنبية ١٠٠٪ متاحة' : '100% Foreign Ownership Verified'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8]">
                  <div className="text-[#7A6D6D] font-mono text-[11px] uppercase">{isAr ? 'النظام القضائي' : 'Legal Regime'}</div>
                  <div className="font-bold text-[#1E1919] mt-1">{item.legalSystem}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8]">
                  <div className="text-[#7A6D6D] font-mono text-[11px] uppercase">{isAr ? 'المعدل الضريبي' : 'Corporate Tax'}</div>
                  <div className="font-bold text-[#1E1919] mt-1">{item.taxRate}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8]">
                  <div className="text-[#7A6D6D] font-mono text-[11px] uppercase">{isAr ? 'تحويل الأرباح' : 'Capital Repatriation'}</div>
                  <div className="font-bold text-[#1E1919] mt-1">{item.repatriation}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8]">
                  <div className="text-[#7A6D6D] font-mono text-[11px] uppercase">{isAr ? 'زمن التأسيس' : 'Incorporation Timeline'}</div>
                  <div className="font-bold text-[#1E1919] mt-1">{item.incorporationTime}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8]">
                  <div className="font-bold text-[#8A1538] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>{isAr ? 'الأنسب لـ:' : 'Optimal Use Case:'}</span>
                  </div>
                  <p className="text-[#4A3F3F] mt-1.5 leading-relaxed">{item.bestFor}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8]">
                  <div className="font-bold text-[#8A1538] flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#C5A059]" />
                    <span>{isAr ? 'أمثلة لكيانات قائمة:' : 'Representative Entities:'}</span>
                  </div>
                  <p className="text-[#4A3F3F] mt-1.5 leading-relaxed">{item.popularEntities}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 3. SOVEREIGN & INSTITUTIONAL CO-INVESTMENT IN QATAR */}
      <div className="bg-gradient-to-br from-[#1E1416] via-[#2A1D20] to-[#1E1416] text-white rounded-2xl p-6 sm:p-8 border border-[#403335] shadow-lg space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] uppercase tracking-wider font-mono">
            <Landmark className="w-4 h-4" />
            {isAr ? 'المنظومة السيادية والمطابقة' : 'SOVEREIGN CATALYTIC CAPITAL & CO-INVESTMENT'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">
            {isAr ? 'المطابقة السيادية: كيف تضاعف قطر قيمة استثمارك؟' : 'How Qatar Catalyzes Private Venture Capital'}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-3xl">
            {isAr
              ? 'تعتمد دولة قطر استراتيجية استثمارية شراعية لا تنافس رأس المال الخاص بل تسانده عبر الصناديق السيادية والمطابقة النقدية.'
              : 'Qatar deploys non-crowding catalytic programs designed to co-invest alongside private check-writers and protect downside risk.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#8A1538] flex items-center justify-center font-bold text-[#C5A059]">
              QIA
            </div>
            <h3 className="text-base font-bold text-white">
              {isAr ? 'جهاز قطر للاستثمار (QIA) — مليار دولار' : 'QIA $1B Fund of Funds'}
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              {isAr
                ? 'استثمار سيادي في صناديق رأس المال الجريء العالمية والإقليمية لإنشاء مكاتب محلية في الدوحة وضخ استثمارات مباشرة في شركات المنظومة.'
                : 'Sovereign anchor allocations for premier international & GCC venture fund managers establishing local presence and co-investing in Qatari scaleups.'}
            </p>
            <div className="text-[11px] font-mono text-[#C5A059]">Anchor LP Commitments: $10M–$50M</div>
          </div>

          <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#C5A059] flex items-center justify-center font-bold text-[#1E1919]">
              QDB
            </div>
            <h3 className="text-base font-bold text-white">
              {isAr ? 'بنك قطر للتنمية — برنامج المطابقة' : 'QDB 1:1 Equity Co-Investment'}
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              {isAr
                ? 'مطابقة كل دولار يستثمره المستثمر المعتمد بدولار إضافي من بنك قطر للتنمية في جولات البذرة والجولة (أ)، مما يقلل مخاطر المستثمر الخاص.'
                : 'Matches qualified private institutional & angel checks dollar-for-dollar in early-stage rounds, doubling runway without additional founder dilution.'}
            </p>
            <div className="text-[11px] font-mono text-[#C5A059]">Ticket Matching: Up to $1M USD</div>
          </div>

          <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#8A1538]/60 flex items-center justify-center font-bold text-[#C5A059]">
              QRDI
            </div>
            <h3 className="text-base font-bold text-white">
              {isAr ? 'مجلس قطر للبحوث والتطوير (QRDI)' : 'QRDI Non-Dilutive Grants'}
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              {isAr
                ? 'منح ابتكار وتطوير تقني غير مخففة للملكية تصل إلى مليون دولار لدعم تطوير الملكية الفكرية والتجارب السريرية والاختراعات الصناعية.'
                : 'Non-dilutive commercialization grants up to $1M USD for IP-heavy ventures, AI prototypes, and industrial pilots partnering with Qatari enterprise.'}
            </p>
            <div className="text-[11px] font-mono text-[#C5A059]">Grant Size: $250k – $1.0M USD</div>
          </div>
        </div>
      </div>

      {/* 4. ACTIVE LIVE DEALS PREVIEW ($35M+ PIPELINE) */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
              <TrendingUp className="w-4 h-4" />
              {isAr ? 'فرص استثمارية نشطة' : 'CURATED LIVE DEAL PIPELINE'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E1919] tracking-tight mt-1">
              {isAr ? 'جولات استثمارية جارية مفتوحة للاستثمار الخاص' : 'Active Investment Rounds Seeking Capital'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1">
              {isAr
                ? 'جميع الصفقات مدققة السجل التجاري ومحمية باتفاقيات سرية المعلومات.'
                : 'Verified corporate registries, accredited audit checks, and direct introduction under NDA.'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('marketplace')}
            className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>{isAr ? 'عرض كافة الصفقات النشطة' : 'View Full Deal-Flow Marketplace'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {raisingDeals.slice(0, 3).map((deal) => (
            <div 
              key={deal.id}
              className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E8DFC8] hover:border-[#8A1538] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#8A1538]/10 text-[#8A1538] text-[10px] font-bold font-mono">
                    {deal.roundStage}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono">
                    {deal.targetAmountUsd}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-[#1E1919] group-hover:text-[#8A1538] transition-colors">
                    {isAr && deal.companyNameAr ? deal.companyNameAr : deal.companyName}
                  </h4>
                  <p className="text-[11px] text-[#7A6D6D]">{deal.sector}</p>
                </div>

                <p className="text-xs text-[#5A4E4E] line-clamp-2 leading-relaxed">
                  {isAr 
                    ? `نمو شهري بنسبة ${deal.momGrowthPercent}٪ مع أكثر من ${deal.customerCount} عميل نشط.`
                    : `${deal.customerCount} active users with ${deal.momGrowthPercent}% MoM growth and audited financials.`}
                </p>

                <div className="pt-2 text-[11px] space-y-1 text-[#6B5E5E] border-t border-[#E8DFC8]">
                  <div className="flex justify-between">
                    <span>{isAr ? 'حالة الجولة:' : 'Round Status:'}</span>
                    <span className="font-semibold text-emerald-700 font-mono">{deal.raisedSoFarPercent}% {isAr ? 'مكتتب' : 'Allocated'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isAr ? 'الحد الأدنى للتذكرة:' : 'Minimum Ticket:'}</span>
                    <span className="font-semibold text-[#1E1919] font-mono">{deal.minCheckUsd}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DFC8] mt-4">
                <button
                  onClick={() => onRequestIntro?.(deal.companyName, deal.id)}
                  className="w-full py-2 rounded-lg bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isAr ? 'طلب تعريف بالصفقة (NDA)' : 'Request Deal Intro (NDA)'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. INTERACTIVE INVESTMENT ESTIMATOR */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
            <Calculator className="w-4 h-4" />
            {isAr ? 'حاسبة المحفظة والسيولة' : 'VENTURE ALLOCATION & RETURN ESTIMATOR'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1919] tracking-tight mt-1">
            {isAr ? 'تقدير عوائد الاستثمار في السوق القطري' : 'Venture Capital Ticket Estimator'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1">
            {isAr
              ? 'نموذج محاكاة مبني على متوسطات عوائد الشركات الصاعدة ومؤشر رأس المال الخاص القطري (QPCI).'
              : 'Interactive projection model calibrated against historical QPCI benchmarks and Qatari venture expansion multiples.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8DFC8]">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#1E1919] mb-1.5">
                <span>{isAr ? 'حجم التذكرة الاستثمارية (USD):' : 'Investment Ticket Size (USD):'}</span>
                <span className="font-mono text-[#8A1538] text-sm">${ticketSize.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min={25000}
                max={2000000}
                step={25000}
                value={ticketSize}
                onChange={(e) => setTicketSize(Number(e.target.value))}
                className="w-full accent-[#8A1538] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#7A6D6D] font-mono mt-1">
                <span>$25k (Angel)</span>
                <span>$500k (Syndicate)</span>
                <span>$2.0M (Institutional VC)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#1E1919] mb-1.5">
                <span>{isAr ? 'أفق الاستثمار حتى التخارج:' : 'Holding Horizon (Years to Exit):'}</span>
                <span className="font-mono text-[#8A1538] text-sm">{holdingPeriod} {isAr ? 'سنوات' : 'Years'}</span>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                step={1}
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                className="w-full accent-[#8A1538] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#7A6D6D] font-mono mt-1">
                <span>3 Years</span>
                <span>5 Years (Standard VC)</span>
                <span>8 Years</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#7A6D6D] bg-white p-3 rounded-xl border border-[#E8DFC8]">
              <span className="font-bold text-[#8A1538]">{isAr ? 'ملاحظة ضريبية:' : 'Tax Advantage:'}</span>{' '}
              {isAr
                ? 'لا تخضع هذه العوائد لأي ضريبة دخل شخصي أو ضريبة أرباح رأسمالية بموجب القوانين القطرية للمستثمرين الأفراد.'
                : 'Qualifying individual venture investments in Qatar benefit from 0% personal capital gains tax upon liquidity events.'}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#8A1538] to-[#50081C] text-white rounded-xl p-6 shadow-md space-y-4">
            <div className="text-xs font-mono text-[#C5A059] uppercase tracking-wider">
              {isAr ? 'العائد التقديري المستهدف (22% IRR)' : 'Projected Gross Value (22% IRR)'}
            </div>
            
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              ${Math.round(baseReturn).toLocaleString()}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20 text-xs">
              <div>
                <div className="text-white/70 text-[11px]">{isAr ? 'مضاعف رأس المال' : 'MOIC Multiple'}</div>
                <div className="text-lg font-bold text-[#C5A059] font-mono">{multiple}x</div>
              </div>
              <div>
                <div className="text-white/70 text-[11px]">{isAr ? 'الأرباح التقديرية' : 'Gross Gain'}</div>
                <div className="text-lg font-bold text-white font-mono">
                  +${Math.round(baseReturn - ticketSize).toLocaleString()}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('marketplace')}
              className="w-full py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF67] text-[#1E1919] font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <span>{isAr ? 'مطابقة التذكرة بالصفقات النشطة' : 'Match Ticket with Deals'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. COMPREHENSIVE FAQ FOR "INVEST QATAR" (FEATURED SNIPPET TARGET) */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4" />
            {isAr ? 'الأسئلة الشائعة للمستثمرين الأجانب' : 'INVEST IN QATAR: FREQUENTLY ASKED QUESTIONS'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1919] tracking-tight mt-1">
            {isAr ? 'كل ما يهم المستثمر والمؤسس الأجنبي حول الاستثمار في قطر' : 'Everything Foreign Allocators Need to Know'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1">
            {isAr
              ? 'إجابات موثقة ومحدثة وفق الأنظمة والقوانين التجارية لعام ٢٠٢٦.'
              : 'Direct legal, financial, and regulatory answers updated for 2026 investment mandates.'}
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
