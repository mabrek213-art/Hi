import React, { useState, useMemo } from 'react';
import { 
  RaisingOpportunity, 
  InvestorDemand, 
  Language, 
  Sector, 
  Stage, 
  SECTORS, 
  STAGES 
} from '../types';
import { 
  Handshake, 
  TrendingUp, 
  Building2, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  PieChart, 
  DollarSign, 
  ArrowRight, 
  ArrowLeft, 
  PlusCircle, 
  Filter, 
  Info,
  ShieldCheck,
  Zap,
  Briefcase
} from 'lucide-react';

interface DealFlowMarketplaceProps {
  raisingOpportunities: RaisingOpportunity[];
  investorDemands: InvestorDemand[];
  language: Language;
  onRequestIntro: (targetName: string, targetId: string) => void;
  onOpenSubmitDealModal: () => void;
}

export const DealFlowMarketplace: React.FC<DealFlowMarketplaceProps> = ({
  raisingOpportunities,
  investorDemands,
  language,
  onRequestIntro,
  onOpenSubmitDealModal
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeSubTab, setActiveSubTab] = useState<'raising' | 'investors' | 'matchmaker'>('raising');
  const [selectedSector, setSelectedSector] = useState<Sector | 'all'>('all');
  const [selectedStage, setSelectedStage] = useState<Stage | 'all'>('all');

  // Matchmaker state: selected investor to match against startups
  const [matchInvestorId, setMatchInvestorId] = useState<string>(investorDemands[0]?.id || '');

  const filteredRaising = useMemo(() => {
    return raisingOpportunities.filter(r => {
      if (selectedSector !== 'all' && r.sector !== selectedSector) return false;
      if (selectedStage !== 'all' && r.roundStage !== selectedStage) return false;
      return true;
    });
  }, [raisingOpportunities, selectedSector, selectedStage]);

  // Selected investor for Matchmaker
  const selectedInvestor = useMemo(() => {
    return investorDemands.find(inv => inv.id === matchInvestorId) || investorDemands[0];
  }, [investorDemands, matchInvestorId]);

  // Compatibility score calculation
  const scoredMatches = useMemo(() => {
    if (!selectedInvestor) return [];
    return raisingOpportunities.map(opp => {
      let score = 50; // base score

      // Sector fit (+30)
      if (selectedInvestor.targetSectors.includes(opp.sector)) {
        score += 30;
      }

      // Stage fit (+20)
      if (selectedInvestor.stagePreference.includes(opp.roundStage)) {
        score += 20;
      }

      return {
        opp,
        score: Math.min(100, score)
      };
    }).sort((a, b) => b.score - a.score);
  }, [raisingOpportunities, selectedInvestor]);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFC8] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A1538] uppercase tracking-wider mb-1">
            <Handshake className="w-4 h-4 text-[#C5A059]" />
            <span>{isAr ? 'الوحدة الثالثة: الصفقات والتوفيق' : 'Module 3: Deal-Flow & Matchmaking Marketplace'}</span>
          </div>
          <h2 className="text-3xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'منصة الصفقات الاستثمارية والتوفيق المباشر' : 'Curated Deal-Flow & Matchmaking'}
          </h2>
          <p className="text-sm text-[#6B5E5E] max-w-2xl mt-1">
            {isAr
              ? 'سوق منظمة لربط جولات التمويل النشطة للشركات القطرية مع سيولة المستثمرين، مع وساطة منضبطة ورسوم نجاح شفافة.'
              : 'Direct capital discovery connecting structured Qatari fundraising mandates with active deploying institutional check-writers.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSubmitDealModal}
            className="px-4 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 border border-[#C5A059]/40"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>{isAr ? 'تسجيل جولة تمويل جديدة' : 'Post Raising Mandate'}</span>
          </button>
        </div>
      </div>

      {/* Transparent Monetization & Moderation Disclosure Banner */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#E8DFC8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8A1538] text-[#C5A059] flex items-center justify-center font-bold flex-shrink-0">
            %
          </div>
          <div>
            <p className="font-bold text-[#1E1919]">
              {isAr ? 'سياسة الوساطة والرسوم الشفافة' : 'Transparent Platform Success Fee & Governance'}
            </p>
            <p className="text-[#6B5E5E]">
              {isAr
                ? 'إدراج الفرص مجاني. تطبق رسوم نجاح معلنة (١٫٥٪ - ٢٪) فقط على الصفقات التي يتم تأكيد إتمامها عبر التعارف من المنصة.'
                : 'Free basic listing. A transparent 1.5% success fee applies only on closed rounds facilitated through verified platform introductions.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C9B8] text-[#8A1538] font-bold font-mono">
            1.5% Success Fee
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C9B8] text-emerald-800 font-bold">
            {isAr ? 'وساطة موثقة' : 'Moderated Intros'}
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E8DFC8] pb-4">
        {[
          { id: 'raising', labelEn: 'Startups Raising Capital', labelAr: 'شركات تطرح جولات تمويل', count: raisingOpportunities.length },
          { id: 'investors', labelEn: 'Active Investor Mandates', labelAr: 'صناديق ومستثمرون جاهزون للضخ', count: investorDemands.length },
          { id: 'matchmaker', labelEn: 'Deal Matchmaker Engine', labelAr: 'محرك المطابقة التلقائي', badge: 'Smart' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === tab.id
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'bg-white hover:bg-[#F2ECE4] text-[#4A3F3F] border border-[#E8DFC8]'
            }`}
          >
            <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            {tab.count !== undefined ? (
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                activeSubTab === tab.id ? 'bg-[#6E0D29] text-[#C5A059]' : 'bg-[#FAF8F5] text-[#8A1538]'
              }`}>
                {tab.count}
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#C5A059] text-[#1E1919] font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* --- SUB-TAB 1: STARTUPS RAISING CAPITAL --- */}
      {activeSubTab === 'raising' && (
        <div className="space-y-6">
          
          {/* Sector & Stage Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as any)}
              className="px-3 py-1.5 bg-white border border-[#E0D5C3] rounded-lg text-xs font-semibold text-[#1E1919]"
            >
              <option value="all">{isAr ? 'كافة القطاعات' : 'All Sectors'}</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value as any)}
              className="px-3 py-1.5 bg-white border border-[#E0D5C3] rounded-lg text-xs font-semibold text-[#1E1919]"
            >
              <option value="all">{isAr ? 'كافة المراحل' : 'All Stages'}</option>
              {STAGES.map(st => <option key={st} value={st}>{st}</option>)}
            </select>

            <span className="text-xs text-[#7A6D6D]">
              {filteredRaising.length} {isAr ? 'جولة تمويل نشطة' : 'Active Mandates'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRaising.map(opportunity => (
              <div
                key={opportunity.id}
                className="bg-white rounded-2xl border-2 border-[#E8DFC8] hover:border-[#8A1538] p-6 shadow-sm flex flex-col justify-between transition-all space-y-4 relative overflow-hidden"
              >
                {opportunity.isFeatured && (
                  <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 bg-[#C5A059] text-[#1E1919] text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg rtl:rounded-bl-none rtl:rounded-br-lg shadow-sm">
                    {isAr ? 'جولة مميزة' : 'FEATURED ROUND'}
                  </div>
                )}

                <div>
                  {/* Top Info */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-bold text-[#8A1538] uppercase tracking-wider block">
                        {opportunity.sector}
                      </span>
                      <h3 className="text-xl font-black text-[#1E1919] tracking-tight">
                        {isAr ? opportunity.companyNameAr : opportunity.companyName}
                      </h3>
                      <p className="text-xs text-[#7A6D6D]">
                        {isAr ? opportunity.locationAr : opportunity.location}
                      </p>
                    </div>

                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#FAF8F5] text-[#1E1919] border border-[#E8DFC8] font-mono">
                      {opportunity.roundStage}
                    </span>
                  </div>

                  {/* Target Amount Highlight */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] my-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#6B5E5E]">{isAr ? 'الهدف التمويلي للشركة:' : 'Funding Target:'}</span>
                      <span className="font-mono font-bold text-base text-[#8A1538]">
                        {opportunity.targetAmountUsd}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#7A6D6D]">
                      <span>{isAr ? 'المعادل بالريال:' : 'In QAR:'} {opportunity.targetAmountQar}</span>
                      <span>{isAr ? 'الحد الأدنى للشيك:' : 'Min Ticket:'} {opportunity.minCheckUsd}</span>
                    </div>

                    {/* Progress Bar of round commitment */}
                    <div className="mt-2.5">
                      <div className="flex justify-between text-[10px] font-bold text-[#6B5E5E] mb-1">
                        <span>{isAr ? 'الالتزامات المحجوزة:' : 'Committed:'} {opportunity.raisedSoFarPercent}%</span>
                        <span>{opportunity.status.toUpperCase()}</span>
                      </div>
                      <div className="w-full h-2 bg-[#E8DFC8] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#8A1538] rounded-full transition-all"
                          style={{ width: `${opportunity.raisedSoFarPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Operating Traction Grid */}
                  <div className="grid grid-cols-3 gap-2 my-3 text-center">
                    <div className="p-2 rounded-lg bg-white border border-[#E8DFC8]">
                      <span className="text-[10px] text-[#7A6D6D] uppercase block">ARR</span>
                      <strong className="text-xs font-mono text-[#1E1919]">{opportunity.tractionARRUsd}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-[#E8DFC8]">
                      <span className="text-[10px] text-[#7A6D6D] uppercase block">{isAr ? 'نمو شهري' : 'MoM Growth'}</span>
                      <strong className="text-xs font-mono text-emerald-700">+{opportunity.momGrowthPercent}%</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-[#E8DFC8]">
                      <span className="text-[10px] text-[#7A6D6D] uppercase block">{isAr ? 'العملاء' : 'Scale'}</span>
                      <strong className="text-xs font-mono text-[#1E1919]">{opportunity.customerCount}</strong>
                    </div>
                  </div>

                  {/* Use of Funds Breakdown */}
                  <div className="my-3">
                    <span className="text-[11px] font-bold text-[#7A6D6D] block mb-1">
                      {isAr ? 'توزيع استخدام رأس المال:' : 'Use of Proceeds:'}
                    </span>
                    <div className="space-y-1">
                      {opportunity.useOfFunds.map((u, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="text-[#5A4E4E] truncate max-w-[200px]">
                            {isAr ? u.categoryAr : u.category}
                          </span>
                          <span className="font-mono font-bold text-[#8A1538]">{u.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#7A6D6D] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#C5A059]" />
                    <span>{isAr ? 'عرض العرض التقديمي متاح للمستثمرين' : 'Pitch Deck NDA Protected'}</span>
                  </span>

                  <button
                    onClick={() => onRequestIntro(opportunity.companyName, opportunity.id)}
                    className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>{isAr ? 'طلب وساطة وتواصل' : 'Request Intro'}</span>
                    <Arrow className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* --- SUB-TAB 2: INVESTORS LOOKING TO DEPLOY --- */}
      {activeSubTab === 'investors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investorDemands.map(demand => (
            <div
              key={demand.id}
              className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-[#8A1538]/10 text-[#8A1538]">
                      {demand.type}
                    </span>
                    <h3 className="text-xl font-black text-[#1E1919] mt-1 tracking-tight">
                      {isAr ? demand.investorNameAr : demand.investorName}
                    </h3>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-600" />
                    <span>{isAr ? 'تفويض نشط' : 'Actively Deploying'}</span>
                  </span>
                </div>

                {/* Dry powder and ticket */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] my-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#7A6D6D] block">{isAr ? 'حجم الشيك الاستثماري:' : 'Check Size:'}</span>
                    <strong className="font-mono text-[#8A1538] text-sm">{demand.typicalCheckSize}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A6D6D] block">{isAr ? 'رأس المال المخصص المتاح:' : 'Allocated Dry Powder:'}</span>
                    <strong className="font-mono text-[#1E1919] text-sm">{demand.allocatedDryPowderUsd}</strong>
                  </div>
                </div>

                {/* Target Sectors */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-[#7A6D6D] block mb-1">
                    {isAr ? 'القطاعات المستهدفة بالاستثمار:' : 'Target Investment Sectors:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {demand.targetSectors.map((sec, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#E8DFC8] text-[#1E1919] font-medium">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Thesis Summary */}
                <div className="text-xs text-[#5A4E4E] leading-relaxed">
                  <strong className="text-[#1E1919]">{isAr ? 'الأطروحة:' : 'Thesis:'}</strong>{' '}
                  {isAr ? demand.thesisSummaryAr : demand.thesisSummaryEn}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                <span className="text-[11px] text-[#7A6D6D]">
                  {isAr ? 'تفضيل المراحل:' : 'Preferred Stages:'} {demand.stagePreference.join(', ')}
                </span>
                <button
                  onClick={() => onRequestIntro(demand.investorName, demand.id)}
                  className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{isAr ? 'طلب تقديم صفقة' : 'Pitch Deal'}</span>
                  <Arrow className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* --- SUB-TAB 3: SMART MATCHMAKER ENGINE --- */}
      {activeSubTab === 'matchmaker' && (
        <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-6 lg:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0EBE1]">
            <div>
              <h3 className="text-xl font-black text-[#1E1919]">
                {isAr ? 'محرك التوفيق والمطابقة الاستثمارية' : 'Algorithmic Capital-to-Opportunity Matchmaker'}
              </h3>
              <p className="text-xs text-[#6B5E5E]">
                {isAr
                  ? 'اختر الصندوق أو المستثمر لمشاهدة نسب التوافق مع الشركات القطرية الجاهزة للتمويل بناءً على القطاع ومرحلة النمو وحجم التذكرة.'
                  : 'Select an investor mandate to calculate real-time compatibility scores with active raising startups.'}
              </p>
            </div>

            {/* Investor Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6B5E5E]">{isAr ? 'المستثمر:' : 'Investor:'}</span>
              <select
                value={matchInvestorId}
                onChange={(e) => setMatchInvestorId(e.target.value)}
                className="px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-xs font-bold text-[#1E1919]"
              >
                {investorDemands.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {isAr ? inv.investorNameAr : inv.investorName} ({inv.typicalCheckSize})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Investor Mandate Summary */}
          {selectedInvestor && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#8A1538] text-sm block">
                  {isAr ? selectedInvestor.investorNameAr : selectedInvestor.investorName}
                </span>
                <p className="text-[#5A4E4E] mt-0.5">
                  {isAr ? selectedInvestor.thesisSummaryAr : selectedInvestor.thesisSummaryEn}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 font-mono">
                <span className="px-2.5 py-1 bg-white rounded border text-[#8A1538] font-bold">
                  {selectedInvestor.typicalCheckSize}
                </span>
              </div>
            </div>
          )}

          {/* Matched Opportunities List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D]">
              {isAr ? 'ترتيب الفرص حسب أعلى توافق استثماري' : 'Ranked Startup Compatibility Pipeline'}
            </h4>

            {scoredMatches.map(({ opp, score }) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl bg-white border border-[#E8DFC8] hover:border-[#8A1538] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Score badge */}
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-black text-sm flex-shrink-0 border ${
                    score >= 80 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    <span>{score}%</span>
                    <span className="text-[8px] font-sans font-semibold uppercase">{isAr ? 'توافق' : 'FIT'}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-[#1E1919] text-base">
                        {isAr ? opp.companyNameAr : opp.companyName}
                      </h5>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] border text-[#7A6D6D] font-mono">
                        {opp.roundStage}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A4E4E]">
                      {opp.sector} • {isAr ? 'الهدف:' : 'Target:'} <strong className="text-[#8A1538] font-mono">{opp.targetAmountUsd}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right rtl:text-left text-xs hidden md:block">
                    <span className="text-[#7A6D6D] block text-[11px]">{isAr ? 'الإيرادات السنوية:' : 'Traction ARR:'}</span>
                    <strong className="font-mono text-[#1E1919]">{opp.tractionARRUsd}</strong>
                  </div>

                  <button
                    onClick={() => onRequestIntro(opp.companyName, opp.id)}
                    className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>{isAr ? 'تنسيق اجتماع' : 'Request Match'}</span>
                    <Arrow className="w-3 h-3 text-[#C5A059]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </section>
  );
};
