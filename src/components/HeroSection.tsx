import React from 'react';
import { Language } from '../types';
import { 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Lock, 
  Newspaper,
  Compass,
  Briefcase,
  Rocket,
  Users,
  Scale,
  DollarSign,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onExploreDirectory: () => void;
  onViewMarketplace: () => void;
  onOpenReport: () => void;
  onViewNews?: () => void;
  onSelectArticleSlug?: (slug: string) => void;
  onOpenProspectus?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalEntitiesCount: number;
  totalDealsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreDirectory,
  onViewMarketplace,
  onOpenReport,
  onViewNews,
  onSelectArticleSlug,
  onOpenProspectus,
  searchQuery,
  onSearchChange,
  totalEntitiesCount,
  totalDealsCount
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const seoGuides = [
    {
      slug: 'qatar-tech-founder-incorporation-playbook-2026',
      badgeEn: 'Founders Playbook',
      badgeAr: 'دليل المؤسسين',
      titleEn: 'Tech Founder’s Incorporation Playbook (2026): MOCI vs QSTP vs QFC vs Free Zones',
      titleAr: 'دليل مؤسس الشركات للتأسيس في قطر: مقارنة شاملة بين وزارة التجارة والواحة ومركز المال والمناطق الحرة',
      readTime: '7 min read',
      tag: 'Incorporation & 100% Ownership'
    },
    {
      slug: 'fundraising-guide-qatar-angels-safes-venture-capital',
      badgeEn: 'Capital Raising',
      badgeAr: 'جمع التمويل',
      titleEn: 'Fundraising in Qatar: Guide to Angels, SAFEs, and Venture Capital (2026)',
      titleAr: 'دليل جمع التمويل في قطر: خارطة طريق المؤسسين للمستثمرين الملائكيين واتفاقيات SAFE',
      readTime: '6 min read',
      tag: 'Angels & VC Syndicates'
    },
    {
      slug: 'institutional-investors-guide-qatar-tech-family-offices-vc',
      badgeEn: 'Institutional Allocators',
      badgeAr: 'المستثمر المؤسسي',
      titleEn: 'The Institutional Investor’s Guide: How Family Offices & VCs Deploy in Qatar Tech',
      titleAr: 'دليل المستثمر المؤسسي للتكنولوجيا في قطر: استراتيجيات المكاتب العائلية وصناديق الاستثمار',
      readTime: '6 min read',
      tag: 'Family Office Deployments'
    },
    {
      slug: 'qatar-startup-valuation-deal-terms-benchmarks-2026',
      badgeEn: 'QPCI Market Data',
      badgeAr: 'بيانات المؤشر QPCI',
      titleEn: 'Qatar Startup Valuation & Deal Term Benchmarks (2026): Empirical QPCI Data',
      titleAr: 'معايير تقييم الشركات الناشئة وشروط الصفقات في قطر (٢٠٢٦): متوسطات التقييم وجولات التمويل',
      readTime: '7 min read',
      tag: 'Valuations & Multiples'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] border-b border-[#E8DFC8]">
      {/* Subtle Regional Geometric Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#8A1538 1.5px, transparent 1.5px), radial-gradient(#C5A059 1.5px, #FAF8F5 1.5px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px'
        }}
      />

      {/* West Bay Skyline Silhouette */}
      <div className="absolute bottom-0 inset-x-0 h-24 opacity-10 pointer-events-none flex items-end justify-center overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-[#8A1538] fill-current">
          <path d="M0,120 L0,90 L40,90 L40,55 L70,55 L70,90 L110,90 L110,40 L130,20 L150,40 L150,90 L210,90 L210,70 L240,70 L240,90 L290,90 L290,15 L320,5 L350,15 L350,90 L400,90 L400,50 L430,30 L460,50 L460,90 L520,90 L520,25 L550,10 L580,25 L580,90 L640,90 L640,60 L680,60 L680,90 L730,90 L730,10 L760,0 L790,10 L790,90 L850,90 L850,45 L890,45 L890,90 L950,90 L950,30 L980,15 L1010,30 L1010,90 L1070,90 L1070,65 L1100,65 L1100,90 L1200,90 L1200,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 relative z-10 space-y-10">
        
        {/* Top Header Row with Brand & Prospectus Trigger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold border border-[#8A1538]/20">
                <span className="w-2 h-2 rounded-full bg-[#8A1538] animate-pulse" />
                <span className="font-mono uppercase tracking-wider text-[11px]">
                  {isAr ? 'المنصة المرجعية الموحدة لدولة قطر' : 'THE UNIFIED QATAR VENTURE RESOURCE'}
                </span>
              </div>

              {onOpenProspectus && (
                <button
                  onClick={onOpenProspectus}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C5A059]/15 hover:bg-[#C5A059]/25 text-[#9E7A32] text-xs font-bold border border-[#C5A059]/40 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isAr ? 'نشرة الاستحواذ والأصول (M&A)' : 'Asset Prospectus & Acquisition'}</span>
                </button>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1E1919] tracking-tight leading-[1.12]">
              {isAr ? (
                <>
                  المرجع المتكامل <br className="hidden sm:inline" />
                  <span className="text-[#8A1538]">للمشاريع والمؤسسين والمستثمرين</span>
                </>
              ) : (
                <>
                  The Resource for <br className="hidden sm:inline" />
                  <span className="text-[#8A1538]">Ventures, Founders & Investors</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#5A4E4E] max-w-2xl leading-relaxed font-medium">
              {isAr
                ? 'المنصة الوطنية المستقلة لدولة قطر: أدلة تأسيس الشركات الناشئة، وتوثيق صفقات رأس المال الجريء، ومؤشر السوق الخاص (QPCI)، والربط الاستثماري المباشر بين المكاتب العائلية ورواد الأعمال.'
                : 'Qatar’s definitive independent resource: startup incorporation playbooks, verified venture directories, the Qatar Private Capital Index (QPCI), and direct deal matchmaking between family offices and innovative founders.'}
            </p>

            {/* Live Search Bar */}
            <div className="pt-2 max-w-xl">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 absolute left-4 rtl:left-auto rtl:right-4 text-[#8A1538]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={
                    isAr
                      ? 'ابحث بالاسم، القطاع (تكنولوجيا مالية، صحية...)، أو مرحلة التمويل...'
                      : 'Search companies, sectors, or stages (e.g. Snoonu, FinTech, Series A)...'
                  }
                  className="w-full pl-12 pr-28 rtl:pl-28 rtl:pr-12 py-3.5 bg-white rounded-xl border border-[#D5C9B8] focus:outline-none focus:ring-2 focus:ring-[#8A1538] focus:border-transparent text-xs sm:text-sm shadow-sm text-[#1E1919]"
                />
                <button
                  onClick={onExploreDirectory}
                  className="absolute right-2 rtl:right-auto rtl:left-2 px-4 py-2 bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold rounded-lg transition-all"
                >
                  {isAr ? 'بحث' : 'Search'}
                </button>
              </div>

              {/* Trending Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs text-[#7A6D6D]">
                <span className="font-semibold text-[#8A1538]">{isAr ? 'الأكثر بحثاً:' : 'Trending:'}</span>
                {['Snoonu', 'FinTech', 'Rasmal Ventures', 'Avey AI', 'Series A', 'HealthTech', 'SAFE Notes'].map((term) => (
                  <button
                    key={term}
                    onClick={() => { onSearchChange(term); onExploreDirectory(); }}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#E8DFC8] hover:border-[#8A1538] text-[#4A3F3F] text-[11px] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreDirectory}
                className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 border border-[#C5A059]/40 group"
              >
                <span>{isAr ? `تصفح الدليل (${totalEntitiesCount} جهة)` : `Explore Directory (${totalEntitiesCount})`}</span>
                <Arrow className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
              
              {onViewNews && (
                <button
                  onClick={onViewNews}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F2ECE4] text-[#1E1919] font-bold text-xs border border-[#D5C9B8] shadow-sm transition-all flex items-center gap-2"
                >
                  <Newspaper className="w-4 h-4 text-[#C5A059]" />
                  <span>{isAr ? 'الأخبار وأدلة التأسيس' : 'News & Founder Guides'}</span>
                </button>
              )}

              <button
                onClick={onViewMarketplace}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F2ECE4] text-[#1E1919] font-bold text-xs border border-[#D5C9B8] shadow-sm transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-[#8A1538]" />
                <span>{isAr ? 'منصة الصفقات' : 'Deal-Flow Marketplace'}</span>
              </button>

              <button
                onClick={onOpenReport}
                className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EDE6DC] text-[#8A1538] font-bold text-xs border border-[#8A1538]/30 transition-all flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>{isAr ? 'تقرير رأس المال (PDF)' : 'State of Capital (PDF)'}</span>
              </button>
            </div>
          </div>

          {/* Metric Highlights Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#8A1538] via-[#C5A059] to-[#8A1538]" />
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
                <div>
                  <h3 className="text-sm font-black text-[#1E1919] tracking-tight">
                    {isAr ? 'مؤشرات رأس المال الخاص' : 'Qatar Venture Indicators'}
                  </h3>
                  <p className="text-[11px] text-[#8A1538] font-semibold font-mono">
                    {isAr ? 'محدث للربع الثاني ٢٠٢٦' : 'Q2 2026 Live Metrics'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center font-black text-xs font-mono">
                  QPCI
                </div>
              </div>

              <div className="divide-y divide-[#F0EBE1] text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'التمويل المعلن (الربع الثاني)' : 'Disclosed Tech Funding (Q2)'}
                  </span>
                  <span className="font-bold text-[#1E1919] text-sm font-mono">
                    $42.5M <span className="text-[#8A1538] font-normal text-[10px]">(154.7M QAR)</span>
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'الكيانات الموثقة بالدليل' : 'Verified Entities Listed'}
                  </span>
                  <span className="font-bold text-[#1E1919] text-sm font-mono">
                    {totalEntitiesCount}+ {isAr ? 'كياناً' : 'Entities'}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'طلبات رأس المال النشطة' : 'Active Raising Mandates'}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-bold text-[#8A1538] text-sm">$35M+</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded font-semibold">
                      {totalDealsCount} {isAr ? 'صفقات' : 'Deals'}
                    </span>
                  </div>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'بودرة المستثمرين الجافة' : 'Dry Powder Tracked'}
                  </span>
                  <span className="font-bold text-[#1E1919] text-sm font-mono">
                    $45M+ USD
                  </span>
                </div>
              </div>

              {/* Neutral Sourced Badge */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#8A1538] text-[#C5A059] flex items-center justify-center shrink-0 font-bold text-[10px] font-mono">
                  VQ
                </div>
                <div className="text-[11px] leading-tight">
                  <p className="font-bold text-[#1E1919]">
                    {isAr ? 'بيانات صحفية مستقلة' : 'Independent Third-Party Intelligence'}
                  </p>
                  <p className="text-[#6B5E5E] mt-0.5 text-[10px]">
                    {isAr ? 'توثيق محايد لصفقات وبيانات السوق الخاص' : 'Zero institutional affiliation • Objective sourcing'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- THREE CORE AUDIENCE PORTALS --- */}
        <div className="pt-4 border-t border-[#E8DFC8]">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-base sm:text-lg font-black text-[#1E1919] tracking-tight">
              {isAr ? 'البوابات المخصصة: اختر مسارك في المنظومة' : 'Direct Portals for Ventures, Founders & Investment Companies'}
            </h2>
            <p className="text-xs text-[#6B5E5E] mt-1">
              {isAr ? 'وصول مباشر للأدلة والنماذج وفرص التمويل بحسب دورك' : 'Tailored toolkits, market data, and capital matching for each ecosystem participant'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. For Founders */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFC8] hover:border-[#8A1538] transition-all shadow-sm group relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center font-bold">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8A1538] uppercase tracking-wider font-mono">
                    {isAr ? 'لرواد الأعمال والمؤسسين' : 'FOR TECH FOUNDERS'}
                  </span>
                  <h3 className="text-base font-black text-[#1E1919] mt-0.5">
                    {isAr ? 'من التأسيس إلى جولة التمويل' : 'Incorporate, SAFE Notes & Raise'}
                  </h3>
                </div>
                <p className="text-xs text-[#5A4E4E] leading-relaxed">
                  {isAr
                    ? 'دليل شامل لاختيار بيئة التسجيل (MOCI أو QSTP أو QFC)، نماذج اتفاقيات SAFE المفتوحة، ومتوسطات التقييم المعيارية في قطر.'
                    : 'The complete toolkit for structuring your venture: compare licensing jurisdictions, download open legal SAFE templates, and benchmark Seed valuations.'}
                </p>
                
                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">100% Foreign Ownership</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">Open SAFE Notes</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">Angel Syndicates</span>
                </div>
              </div>

              <div className="pt-5 border-t border-[#F0EBE1] mt-4">
                <button
                  onClick={() => onSelectArticleSlug?.('qatar-tech-founder-incorporation-playbook-2026')}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#8A1538] hover:text-white text-[#8A1538] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{isAr ? 'قراءة دليل المؤسس ٢٠٢٦' : 'Open Founder Playbook'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. For Ventures (Startups & Scaleups) */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFC8] hover:border-[#8A1538] transition-all shadow-sm group relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 text-[#8B6E30] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B6E30] uppercase tracking-wider font-mono">
                    {isAr ? 'للشركات الناشئة والصاعدة' : 'FOR VENTURES & SCALEUPS'}
                  </span>
                  <h3 className="text-base font-black text-[#1E1919] mt-0.5">
                    {isAr ? 'توثيق الشركة، التوظيف والتوسع' : 'Verify Profile, Hire & Expand'}
                  </h3>
                </div>
                <p className="text-xs text-[#5A4E4E] leading-relaxed">
                  {isAr
                    ? 'احصل على شارة التوثيق الوطنية بالسجل التجاري، انشر الوظائف التقنية للمواهب، واطلع على استراتيجيات التوسع الإقليمي كسنونو وسكيب كاش.'
                    : 'Claim your verified company dossier with CR accreditation, publish roles on the tech talent board, and access GCC cross-border expansion playbooks.'}
                </p>

                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">Verified CR Claim</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">Tech Jobs Board</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">GCC Case Studies</span>
                </div>
              </div>

              <div className="pt-5 border-t border-[#F0EBE1] mt-4">
                <button
                  onClick={onExploreDirectory}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#8A1538] hover:text-white text-[#8A1538] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{isAr ? 'عرض وتوثيق الشركات الناشئة' : 'Explore Scaleup Directory'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. For Investment Companies */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFC8] hover:border-[#8A1538] transition-all shadow-sm group relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    {isAr ? 'للمستثمرين والمكاتب العائلية' : 'FOR INVESTMENT COMPANIES & VCS'}
                  </span>
                  <h3 className="text-base font-black text-[#1E1919] mt-0.5">
                    {isAr ? 'صفقات السوق الخاص ومؤشر QPCI' : 'Deal-Flow & Institutional Intelligence'}
                  </h3>
                </div>
                <p className="text-xs text-[#5A4E4E] leading-relaxed">
                  {isAr
                    ? 'منصة صفقات التمويل الجارية، بيانات مؤشر رأس المال الخاص (QPCI)، تحليلات توزيع أصول المكاتب العائلية، وطلبات التعارف المباشرة.'
                    : 'Access active fundraising mandates, empirical QPCI valuation indices, family office private-market surveys, and direct co-investment introductions.'}
                </p>

                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">$35M+ Active Deals</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">QPCI Capital Index</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#4A3F3F]">Family Office Allocations</span>
                </div>
              </div>

              <div className="pt-5 border-t border-[#F0EBE1] mt-4">
                <button
                  onClick={onViewMarketplace}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#8A1538] hover:text-white text-[#8A1538] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{isAr ? 'استعراض الصفقات النشطة' : 'View Deal-Flow Marketplace'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* --- FOUR CORE SEO PILLAR ARTICLES SHOWCASE --- */}
        <div className="pt-6 border-t border-[#E8DFC8]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8A1538] uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                {isAr ? 'الأدلة المرجعية الشاملة' : 'ESSENTIAL SEO GUIDES & PLAYBOOKS'}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight mt-0.5">
                {isAr ? 'أدلة تأسيس وتمويل واستثمار التكنولوجيا في قطر' : 'The 4 Definitive Pillar Guides for Qatar Venture Capital'}
              </h2>
            </div>

            {onViewNews && (
              <button
                onClick={onViewNews}
                className="text-xs font-bold text-[#8A1538] hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض جميع المقالات والأخبار' : 'View All Dispatches'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {seoGuides.map((guide, idx) => (
              <div 
                key={guide.slug}
                onClick={() => onSelectArticleSlug?.(guide.slug)}
                className="bg-white rounded-xl p-5 border border-[#E8DFC8] hover:border-[#8A1538] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#8A1538] bg-[#8A1538]/10 px-2 py-0.5 rounded font-mono">
                      {isAr ? guide.badgeAr : guide.badgeEn}
                    </span>
                    <span className="text-[#7A6D6D]">{guide.readTime}</span>
                  </div>

                  <h3 className="text-sm font-black text-[#1E1919] group-hover:text-[#8A1538] transition-colors leading-snug">
                    {isAr ? guide.titleAr : guide.titleEn}
                  </h3>

                  <p className="text-[11px] text-[#6B5E5E]">
                    {guide.tag}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] mt-3 flex items-center justify-between text-xs font-bold text-[#8A1538]">
                  <span>{isAr ? 'قراءة الدليل' : 'Read Guide'}</span>
                  <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
