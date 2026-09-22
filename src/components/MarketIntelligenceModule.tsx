import React, { useState } from 'react';
import { 
  MarketIntelligenceItem, 
  CapitalIndexQuarter, 
  Language, 
  Sector 
} from '../types';
import { 
  TrendingUp, 
  Lock, 
  Unlock, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  DollarSign, 
  PieChart, 
  BarChart2, 
  Sparkles, 
  Download, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Layers,
  Building2
} from 'lucide-react';

interface MarketIntelligenceModuleProps {
  intelligenceItems: MarketIntelligenceItem[];
  capitalIndex: CapitalIndexQuarter[];
  language: Language;
  onOpenReportModal: () => void;
}

export const MarketIntelligenceModule: React.FC<MarketIntelligenceModuleProps> = ({
  intelligenceItems,
  capitalIndex,
  language,
  onOpenReportModal
}) => {
  const isAr = language === 'ar';
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  // Selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Pro Tier toggle simulation
  const [isProUnlocked, setIsProUnlocked] = useState(false);

  // Selected quarter for index detail
  const [selectedQuarterIndex, setSelectedQuarterIndex] = useState(0);
  const activeQuarter = capitalIndex[selectedQuarterIndex] || capitalIndex[0];

  const filteredItems = intelligenceItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFC8] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A1538] uppercase tracking-wider mb-1 font-mono">
            <TrendingUp className="w-4 h-4 text-[#C5A059]" />
            <span>{isAr ? 'الوحدة الثانية: ذكاء السوق ومؤشر (QPCI)' : 'Module 2: Market Intelligence & QPCI'}</span>
          </div>
          <h2 className="text-3xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'ذكاء السوق ومؤشر رأس المال الخاص في قطر' : 'Market Intelligence & Qatar Private Capital Index'}
          </h2>
          <p className="text-sm text-[#6B5E5E] max-w-2xl mt-1">
            {isAr
              ? 'البيانات التحليلية المستقلة لصفقات الاستثمار الجريء، ومؤشر (QPCI) الخاص لقياس تدفقات رؤوس الأموال وحجم السيولة في السوق المحلي.'
              : 'Independent third-party analytics tracking verified venture transactions, valuation multiples, and the proprietary Qatar Private Capital Index (QPCI).'}
          </p>
        </div>

        {/* Pro Tier Simulator Toggle */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-[#E8DFC8] shadow-sm">
          <div className="text-right rtl:text-left text-xs">
            <p className="font-bold text-[#1E1919]">
              {isProUnlocked ? (isAr ? 'حساب المستثمرين (برو)' : 'Intelligence Pro Tier') : (isAr ? 'النسخة العامة المجانية' : 'Public Free Tier')}
            </p>
            <p className="text-[11px] text-[#7A6D6D]">
              {isProUnlocked ? (isAr ? 'كامل بنود الصفقات مفتوحة' : 'Full Deal Dossiers Unlocked') : (isAr ? 'الملخصات والعناوين فقط' : 'Headlines & Summaries')}
            </p>
          </div>
          <button
            onClick={() => setIsProUnlocked(!isProUnlocked)}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isProUnlocked
                ? 'bg-emerald-700 text-white'
                : 'bg-[#8A1538] text-white hover:bg-[#6E0D29]'
            }`}
          >
            {isProUnlocked ? <Unlock className="w-3.5 h-3.5 text-[#C5A059]" /> : <Lock className="w-3.5 h-3.5 text-[#C5A059]" />}
            <span>{isProUnlocked ? (isAr ? 'نشط (برو)' : 'Pro Active') : (isAr ? 'تجربة حساب Pro' : 'Toggle Pro View')}</span>
          </button>
        </div>
      </div>

      {/* --- SUB-SECTION 1: QATAR PRIVATE CAPITAL INDEX (QPCI) --- */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 lg:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#8A1538] via-[#C5A059] to-[#8A1538]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F0EBE1]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#8A1538] text-white font-mono">
                QPCI Index
              </span>
              <span className="text-xs text-[#7A6D6D]">
                {isAr ? 'المعيار المرجعي المستقل لرأس المال الخاص' : 'Independent Venture Capital Benchmark'}
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#1E1919] tracking-tight">
              {isAr ? 'مؤشر رأس المال الخاص في قطر' : 'Qatar Private Capital Index'} ({activeQuarter.quarter})
            </h3>
            <p className="text-xs text-[#6B5E5E] mt-1 max-w-xl">
              {isAr
                ? 'مؤشر تحليلي فصلي يقيس وتيرة الصفقات المعلنة، ومشاركة المكاتب العائلية، وتوزيع التمويل حسب القطاعات التكنولوجية وفق منهجية بحثية مستقلة.'
                : 'A transparent quarterly benchmark measuring venture capital velocity, syndicate participation, and sector deployment in Qatar without institutional bias.'}
            </p>
          </div>

          {/* Quarter Switcher */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-xl border border-[#E8DFC8]">
            {capitalIndex.map((q, idx) => (
              <button
                key={q.quarter}
                onClick={() => setSelectedQuarterIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-mono ${
                  selectedQuarterIndex === idx
                    ? 'bg-[#8A1538] text-white shadow-sm'
                    : 'text-[#5A4E4E] hover:bg-white'
                }`}
              >
                {q.quarter}
              </button>
            ))}
          </div>
        </div>

        {/* Core Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
            <span className="text-xs text-[#7A6D6D] block mb-1">
              {isAr ? 'إجمالي التمويل الموزع' : 'Disclosed Deployment'}
            </span>
            <p className="text-2xl font-black font-mono text-[#8A1538]">
              ${activeQuarter.totalDisclosedFundingUsdMillions}M
            </p>
            <span className="text-xs text-[#1E1919] font-mono">
              ({activeQuarter.totalDisclosedFundingQarMillions}M QAR)
            </span>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold block mt-1 w-fit">
              +{activeQuarter.growthYoY}% YoY
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
            <span className="text-xs text-[#7A6D6D] block mb-1">
              {isAr ? 'عدد الصفقات الموثقة' : 'Verified Deals'}
            </span>
            <p className="text-2xl font-black font-mono text-[#1E1919]">
              {activeQuarter.dealCount}
            </p>
            <span className="text-xs text-[#7A6D6D]">
              {isAr ? 'متوسط قيمة الجولة:' : 'Avg Ticket:'} ${activeQuarter.avgDealSizeUsdMillions}M
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
            <span className="text-xs text-[#7A6D6D] block mb-1">
              {isAr ? 'مشاركة التحالفات الخاصة' : 'Syndicate Participation'}
            </span>
            <p className="text-2xl font-black font-mono text-[#1E1919]">
              {activeQuarter.sovereignCoInvestmentRatio}%
            </p>
            <span className="text-xs text-[#7A6D6D]">
              {isAr ? 'جولات التمويل المشترك' : 'Co-invested Rounds'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
            <span className="text-xs text-[#7A6D6D] block mb-1">
              {isAr ? 'القطاع الأكثر جذباً' : 'Top Funded Sector'}
            </span>
            <p className="text-base font-black text-[#8A1538] truncate">
              {activeQuarter.topSector}
            </p>
            <span className="text-xs text-[#7A6D6D]">
              {activeQuarter.sectorBreakdown[0]?.percentage}% {isAr ? 'من إجمالي رأس المال' : 'of quarterly capital'}
            </span>
          </div>

        </div>

        {/* Sector Allocation Breakdown Bar */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1919] flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-[#8A1538]" />
              <span>{isAr ? 'توزيع التمويل حسب القطاعات الاقتصادية' : 'Capital Allocation by Sector'}</span>
            </h4>
            <span className="text-xs font-mono text-[#7A6D6D]">
              {activeQuarter.quarter} Distribution
            </span>
          </div>

          {/* Visual distribution stacked progress bar */}
          <div className="h-4 w-full rounded-full bg-[#E8DFC8] overflow-hidden flex">
            {activeQuarter.sectorBreakdown.map((item, idx) => {
              const colors = ['#8A1538', '#C5A059', '#0D9488', '#2563EB', '#475569'];
              return (
                <div
                  key={idx}
                  style={{ width: `${item.percentage}%`, backgroundColor: colors[idx % colors.length] }}
                  className="h-full relative group transition-all hover:opacity-90"
                  title={`${item.sector}: ${item.percentage}% ($${item.volumeUsdM}M)`}
                />
              );
            })}
          </div>

          {/* Sector Breakdown Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs pt-1">
            {activeQuarter.sectorBreakdown.map((item, idx) => {
              const colors = ['bg-[#8A1538]', 'bg-[#C5A059]', 'bg-[#0D9488]', 'bg-[#2563EB]', 'bg-[#475569]'];
              return (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${colors[idx % colors.length]} flex-shrink-0`} />
                  <div className="truncate">
                    <span className="font-semibold text-[#1E1919] block truncate">{item.sector}</span>
                    <span className="text-[11px] text-[#7A6D6D] font-mono">{item.percentage}% (${item.volumeUsdM}M)</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Executive Commentary */}
          <div className="pt-3 border-t border-[#E8DFC8] text-xs text-[#5A4E4E] leading-relaxed">
            <strong className="text-[#8A1538] font-bold">
              {isAr ? 'التحليل الاقتصادي الفصلي:' : 'Quarterly Economic Commentary:'}
            </strong>{' '}
            {isAr ? activeQuarter.commentaryAr : activeQuarter.commentaryEn}
          </div>
        </div>

      </div>

      {/* --- SUB-SECTION 2: RUNNING INTELLIGENCE FEED --- */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-black text-[#1E1919]">
              {isAr ? 'سجل الصفقات والتحركات الاستثمارية' : 'Running Venture Activity Feed'}
            </h3>
            <p className="text-xs text-[#6B5E5E]">
              {isAr ? 'تغطية موثقة ومؤرخة لكافة الجولات الاستثمارية والتحولات الاقتصادية في قطر' : 'Curated, dated transactions, growth rounds, and venture trends in Qatar'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', labelEn: 'All Updates', labelAr: 'كافة التحديثات' },
              { id: 'funding', labelEn: 'Funding Rounds', labelAr: 'جولات تمويل' },
              { id: 'policy', labelEn: 'Venture Trends', labelAr: 'اتجاهات السوق' },
              { id: 'soe_consolidation', labelEn: 'M&A / Growth', labelAr: 'الاندماج والتوسع' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#8A1538] text-white'
                    : 'bg-white hover:bg-[#F2ECE4] text-[#4A3F3F] border border-[#E8DFC8]'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Intelligence Feed Cards */}
        <div className="space-y-4">
          {filteredItems.map(item => {
            const isGated = item.isPremium && !isProUnlocked;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E8DFC8] hover:border-[#8A1538] p-5 transition-all shadow-sm space-y-3"
              >
                {/* Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      item.category === 'policy'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : item.category === 'funding'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#7A6D6D] flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#8A1538]" />
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.dealSizeUsd && (
                      <span className="font-mono font-bold text-xs text-[#8A1538] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#E8DFC8]">
                        {item.dealSizeUsd} {item.dealSizeQar && `(${item.dealSizeQar})`}
                      </span>
                    )}
                    {item.isPremium && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        isProUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isProUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        <span>{isProUnlocked ? 'PRO UNLOCKED' : 'PRO TIER'}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-[#1E1919] leading-snug">
                  {isAr ? item.titleAr : item.title}
                </h4>

                {/* Summary */}
                <p className="text-xs text-[#5A4E4E] leading-relaxed">
                  {isAr ? item.summaryAr : item.summary}
                </p>

                {/* Participants */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7A6D6D]">
                  <span className="font-semibold">{isAr ? 'الأطراف المشاركة:' : 'Key Participants:'}</span>
                  {item.participants.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#1E1919] font-medium text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Pro Tier Deep Dossier */}
                {item.fullDossier && (
                  <div className="mt-3 pt-3 border-t border-[#F0EBE1]">
                    {isGated ? (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-[#F4EFEA] border border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-xs text-[#5A4E4E]">
                          <div className="w-8 h-8 rounded-lg bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center flex-shrink-0">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-[#1E1919]">
                              {isAr ? 'التقرير التحليلي المعمق وشروط الصفقة مغلقة' : 'Deep Deal Dossier & Terms Gated'}
                            </p>
                            <p className="text-[11px] text-[#7A6D6D]">
                              {isAr ? 'متاح للمشتركين الباحثين في تحليلات رأس المال والتقييمات.' : 'Available for institutional subscribers researching Qatar capital markets.'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsProUnlocked(true)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm whitespace-nowrap"
                        >
                          {isAr ? 'فتح المحتوى (عرض تجريبي)' : 'Unlock with Pro Access'}
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-[#8A1538]/5 border border-[#8A1538]/20 space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 text-[#8A1538] font-bold text-xs uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>{isAr ? 'ملف التحليل الاستثماري الكامل (برو)' : 'Investment Deal Dossier (Pro Level)'}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                          <div>
                            <strong className="text-[#1E1919] block mb-0.5">{isAr ? 'الأطروحة الاستثمارية:' : 'Investment Thesis:'}</strong>
                            <p className="text-[#5A4E4E]">{isAr ? item.fullDossier.thesisAr : item.fullDossier.thesis}</p>
                          </div>
                          <div>
                            <strong className="text-[#1E1919] block mb-0.5">{isAr ? 'أثر السوق ونمو القطاع:' : 'Market Dynamics & Impact:'}</strong>
                            <p className="text-[#5A4E4E]">{isAr ? item.fullDossier.regulatoryImpactAr : item.fullDossier.regulatoryImpact}</p>
                          </div>
                        </div>
                        {item.fullDossier.valuationEstimate && (
                          <div className="pt-2 border-t border-[#8A1538]/15 flex items-center justify-between text-[11px]">
                            <span className="text-[#6B5E5E">{isAr ? 'تقديرات التقييم والمضاعف:' : 'Estimated Valuation Range:'}</span>
                            <span className="font-mono font-bold text-[#8A1538]">{item.fullDossier.valuationEstimate}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Research Report Download Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#6E0D29] via-[#8A1538] to-[#4C081A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center md:text-left rtl:md:text-right">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#C5A059] text-[#1E1919] font-mono">
            {isAr ? 'إصدار الربع الثاني ٢٠٢٦' : 'Q2 2026 RESEARCH BRIEF'}
          </span>
          <h3 className="text-xl font-black">
            {isAr ? 'تقرير حالة رأس المال الخاص في قطر' : 'State of Qatari Private Capital Report'}
          </h3>
          <p className="text-xs text-white/80 max-w-xl">
            {isAr
              ? 'دراسة شاملة مستقلة وموثقة حول ديناميكيات رأس المال الاستثماري في قطر.'
              : 'Download the comprehensive research briefing on venture deployment and private market dynamics.'}
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-6 py-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#8A1538] font-bold text-xs shadow-md transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Download className="w-4 h-4 text-[#C5A059]" />
          <span>{isAr ? 'تحميل التقرير الكامل (PDF)' : 'Download Research Report (PDF)'}</span>
        </button>
      </div>

    </section>
  );
};
