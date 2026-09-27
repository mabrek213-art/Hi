import React from 'react';
import { Language } from '../types';
import { 
  Scale, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Lock, 
  Search, 
  Compass, 
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  Percent,
  Layers,
  Calendar
} from 'lucide-react';

interface MethodologyPageProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
  onOpenProspectus?: () => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({
  language,
  onNavigateTab,
  onOpenProspectus
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Top Banner & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFC8] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold font-mono uppercase mb-2">
            <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAr ? 'حوكمة البيانات والمعايير التحليلية' : 'DATA GOVERNANCE & AUDIT STANDARDS'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'منهجية مؤشر QPCI وتوثيق الكيانات' : 'QPCI Index & Directory Methodology'}
          </h1>
          <p className="text-sm text-[#5A4E4E] mt-2 max-w-2xl leading-relaxed font-medium">
            {isAr
              ? 'دليل إرشادي شفاف يشرح بدقة كيفية احتساب مؤشر رأس المال الخاص (QPCI)، ومعايير التحقق من شركات الدليل، والفصل المنهجي بين الشركات الناشئة وشركات النمو الكبرى.'
              : 'The transparent due diligence standard: how the Qatar Private Capital Index (QPCI) is computed, how directory entries are audited, and how institutional data integrity is maintained.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E8DFC8] text-[#1E1919] font-mono text-[11px] shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#8A1538]" />
            <span>{isAr ? 'آخر مراجعة: ٢٧ سبتمبر ٢٠٢٦' : 'Revision: September 27, 2026'}</span>
          </div>
        </div>
      </div>

      {/* Core Principle Callout */}
      <div className="p-6 rounded-2xl bg-[#8A1538]/5 border-2 border-[#8A1538]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8A1538] font-bold text-sm font-mono uppercase">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>{isAr ? 'مبدأ البيانات الموضوعية والمستقلة' : 'Objective Third-Party Sourcing'}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4A3F3F] leading-relaxed max-w-3xl">
            {isAr
              ? 'لا تعتمد Ventures.qa على بيانات تقديرية غير مدعومة أو ادعاءات ترويجية غير موثقة. يتم تأكيد كافة جولات التمويل، والتقييمات، وبيانات أصول الكيانات عبر إفصاحات رسمية أو مصادر صحفية موثوقة (مثل Wamda وBloomberg ومصادر الشركات المباشرة).'
              : 'Ventures.qa relies exclusively on verified public transactions, corporate filings, regulatory disclosures, and verified founder submissions. No speculative estimates or unverified PR hype are permitted in our benchmark datasets.'}
          </p>
        </div>
        <div className="shrink-0 flex gap-2">
          <button
            onClick={() => onNavigateTab('intelligence')}
            className="px-4 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm transition-all"
          >
            {isAr ? 'عرض مؤشر QPCI' : 'View QPCI Index'}
          </button>
        </div>
      </div>

      {/* --- SECTION 1: HOW THE QPCI INDEX IS CALCULATED --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8A1538] text-[#C5A059] flex items-center justify-center font-bold text-sm font-mono">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight">
              {isAr ? 'كيف يتم احتساب مؤشر رأس المال الخاص (QPCI)؟' : 'How the Qatar Private Capital Index (QPCI) is Calculated'}
            </h2>
            <p className="text-xs text-[#6B5E5E]">
              {isAr ? 'النموذج الرباعي الرياضي لقياس زخم السيولة واستثمار التكنولوجيا في دولة قطر' : 'The 4-pillar quantitative framework tracking private tech liquidity and ecosystem velocity'}
            </p>
          </div>
        </div>

        {/* 4 Pillars Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFC8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8A1538] font-mono uppercase">Pillar 1 • 40% Weight</span>
              <span className="text-xs font-black text-[#1E1919] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8DFC8] font-mono">0.40</span>
            </div>
            <h3 className="text-base font-bold text-[#1E1919]">
              {isAr ? 'حجم الصفقات المعلنة (Disclosed Deal Volume)' : 'Disclosed Capital Volume'}
            </h3>
            <p className="text-xs text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'إجمالي المبالغ الدولارية والقطرية المستثمرة فعلياً في جولات حقوق الملكية التأسيسية والصاعدة (Seed, Series A, Series B) خلال الربع المالي. تُستثنى المنح والجوائز غير الاستثمارية.'
                : 'Aggregates real equity capital closed and wired into Qatari tech enterprises within the fiscal quarter. Non-dilutive grants, competitions, and unexercised warrants are strictly isolated.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFC8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8A1538] font-mono uppercase">Pillar 2 • 25% Weight</span>
              <span className="text-xs font-black text-[#1E1919] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8DFC8] font-mono">0.25</span>
            </div>
            <h3 className="text-base font-bold text-[#1E1919]">
              {isAr ? 'سرعة إغلاق الصفقات (Deal Velocity & Stage Count)' : 'Stage-Weighted Deal Velocity'}
            </h3>
            <p className="text-xs text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'عدد المعاملات المبرمة خلال الربع، مع إعطاء وزن نسبي متوازن بين الجولات المبكرة (Pre-Seed/Seed) والجولات المتقدمة لمنع انحياز المؤشر إلى جولة كبرى منفردة.'
                : 'Tracks total closed transaction count weighted across development stages (Pre-Seed, Seed, Series A, Series B) to ensure a single outlier round cannot distort ecosystem health.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFC8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8A1538] font-mono uppercase">Pillar 3 • 20% Weight</span>
              <span className="text-xs font-black text-[#1E1919] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8DFC8] font-mono">0.20</span>
            </div>
            <h3 className="text-base font-bold text-[#1E1919]">
              {isAr ? 'تخصيص السيولة المؤسسية (Institutional Dry Powder)' : 'Institutional Allocation & Mandates'}
            </h3>
            <p className="text-xs text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'رأس المال الجريء النشط الملتزم به من قبل المكاتب العائلية في الدوحة، ومديري الصناديق المرخصين (مثل Rasmal Ventures)، والمستثمرين الملائكيين الجاهز للنشر خلال الأشهر الستة القادمة.'
                : 'Tracks verified unallocated private venture capital commitments from Doha single/multi-family offices, licensed fund managers, and syndicates with active deployment mandates.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFC8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8A1538] font-mono uppercase">Pillar 4 • 15% Weight</span>
              <span className="text-xs font-black text-[#1E1919] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8DFC8] font-mono">0.15</span>
            </div>
            <h3 className="text-base font-bold text-[#1E1919]">
              {isAr ? 'زخم التوسع الإقليمي (Regional Scaleup Traction)' : 'Cross-Border Expansion Velocity'}
            </h3>
            <p className="text-xs text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'مؤشر نمو الإيرادات المتأتية من أسواق الخليج المجاورة (السعودية، الإمارات، عُمان) من قبل الشركات القطرية الرائدة مثل سنونو وسكيب كاش ودروبي.'
                : 'Measures multi-market revenue diversification of Qatari tech champions scaling into Saudi Arabia, the UAE, Oman, and the wider GCC region.'}
            </p>
          </div>
        </div>

        {/* Index Mathematical Formula Box */}
        <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E1919] uppercase font-mono">
            <Percent className="w-3.5 h-3.5 text-[#8A1538]" />
            <span>Mathematical Formula & Normalization Baseline</span>
          </div>
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8DFC8] font-mono text-xs text-[#1E1919] overflow-x-auto">
            <code>
              QPCI_Quarter = 100 * [ (0.40 * NormVolume) + (0.25 * NormVelocity) + (0.20 * NormDryPowder) + (0.15 * NormExpansion) ]
            </code>
          </div>
          <p className="text-[11px] text-[#6B5E5E]">
            {isAr
              ? 'تم تحديد خط الأساس (100.0) في الربع الأول من عام ٢٠٢٤. تُراجع البيانات فصلياً من قبل مكتب الرقابة التحليلية في Ventures.qa.'
              : 'Normalized baseline (100.0) was established in Q1 2024. Quarterly calculations are certified at each quarter close.'}
          </p>
        </div>
      </div>

      {/* --- SECTION 2: HOW DIRECTORY ENTRIES ARE VERIFIED --- */}
      <div className="space-y-6 pt-6 border-t border-[#E8DFC8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8A1538] text-[#C5A059] flex items-center justify-center font-bold text-sm font-mono">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight">
              {isAr ? 'كيف يتم توثيق وإدراج الكيانات في الدليل؟' : 'How Directory Entries are Sourced & Verified'}
            </h2>
            <p className="text-xs text-[#6B5E5E]">
              {isAr ? 'إطار العمل الخماسي للتدقيق والتحقق من صحة البيانات' : 'The 5-tier audit protocol separating real corporate engagement from public scraping'}
            </p>
          </div>
        </div>

        {/* 5-Step Process */}
        <div className="space-y-4">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center font-bold text-xs text-[#8A1538] font-mono shrink-0">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1E1919]">
                {isAr ? 'التدقيق القانوني والسجل التجاري (Commercial Registration Audit)' : 'Jurisdiction & Commercial Registration Verification'}
              </h4>
              <p className="text-xs text-[#5A4E4E] leading-relaxed">
                {isAr
                  ? 'يتم التحقق من وجود الكيان القانوني في إحدى الولايات القضائية الرسمية في دولة قطر: وزارة التجارة والصناعة (MOCI)، أو مركز قطر للمال (QFC)، أو واحة قطر للعلوم والتكنولوجيا (QSTP)، أو المناطق الحرة (QFZ).'
                  : 'Every listed venture must possess verified registration under a recognized Qatari legal authority: Ministry of Commerce & Industry (MOCI), Qatar Financial Centre (QFC), Qatar Science & Technology Park (QSTP), or Qatar Free Zones (QFZ).'}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center font-bold text-xs text-[#8A1538] font-mono shrink-0">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1E1919]">
                {isAr ? 'المطابقة مع المصادر الصحفية والإفصاحات الرسمية' : 'Tier-1 Disclosures & Media Cross-Referencing'}
              </h4>
              <p className="text-xs text-[#5A4E4E] leading-relaxed">
                {isAr
                  ? 'يتم مطابقة أرقام التمويل وتواريخ الجولات الاستثمارية عبر مصادر مستقلة متعددة (مثل Wamda وBloomberg وTechCrunch ومواقع الشركات الرسمية) لمنع التضارب.'
                  : 'All stated financing amounts and dates are cross-referenced across verified press releases, tier-1 financial publications (Wamda, Bloomberg, MENAbytes), and official investor statements.'}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center font-bold text-xs text-[#8A1538] font-mono shrink-0">
              3
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1E1919]">
                {isAr ? 'تمييز حالة التوثيق: "موثق من قبل [الشركة]" مقابل "غير موثق — مستخرج من بيانات عامة"' : 'Explicit Status Distinction: Claimed vs. Unverified'}
              </h4>
              <p className="text-xs text-[#5A4E4E] leading-relaxed">
                {isAr
                  ? 'نعرض بشكل واضح لكل زائر الفرق بين الملفات التي أكدها ممثلو الشركة رسمياً والملفات المجمعة من البيانات العامة لضمان المصداقية الكاملة.'
                  : 'We make real ecosystem participation visually obvious by displaying distinct status badges across all directory profiles:'}
              </p>

              {/* Status Visual Badges Example */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'موثق من قبل سنونو (Claimed by Company)' : 'Claimed by Snoonu'}</span>
                </div>
                <span className="text-xs text-[#6B5E5E]">{isAr ? 'تم التحقق من البريد الرسمي والسجل التجاري' : 'Official representative verified via corporate email'}</span>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{isAr ? 'غير موثق — مستخرج من بيانات عامة' : 'Unverified — sourced from public data'}</span>
                </div>
                <span className="text-xs text-[#6B5E5E]">{isAr ? 'بيانات عامة بانتظار توثيق المؤسس' : 'Public records awaiting founder direct accreditation'}</span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center font-bold text-xs text-[#8A1538] font-mono shrink-0">
              4
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1E1919]">
                {isAr ? 'فئة "الشركات الكبرى والنمو" (Enterprise & Growth)' : 'Separation of Enterprise & Growth Giants'}
              </h4>
              <p className="text-xs text-[#5A4E4E] leading-relaxed">
                {isAr
                  ? 'لمنع تضليل المستثمرين أو خلط الشركات التكنولوجية الناشئة مع الشركات الوطنية العملاقة، تم إنشاء فئة "Enterprise & Growth" مستقلة تضم المؤسسات القائمة مثل أريدُ (Ooredoo) ومجموعة بنك قطر الوطني (QNB).'
                  : 'To prevent distortion of early-stage metrics, established public-sector and enterprise giants such as Ooredoo and QNB are classified separately under the dedicated "Enterprise & Growth" category, distinct from venture-backed startups.'}
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center font-bold text-xs text-[#8A1538] font-mono shrink-0">
              5
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1E1919]">
                {isAr ? 'التحديث الدوري ومؤشر التاريخ (Last Updated Timestamp)' : 'Active Maintenance & Sourcing Timestamps'}
              </h4>
              <p className="text-xs text-[#5A4E4E] leading-relaxed">
                {isAr
                  ? 'يعرض دليل المنظومة وصفحة المؤشر طابعاً زمنياً واضحاً لآخر تحديث، مما يضمن للمستثمرين وأي مشترٍ مستقبلي للمنصة أن البيانات تخضع لمراجعة مستمرة ونشطة.'
                  : 'A visible "Last updated" timestamp is prominently rendered across directory and index pages, assuring users and prospective buyers during due diligence that data maintenance is continuously active.'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* --- SECTION 3: SNOONU FUNDING VERIFICATION CITATION --- */}
      <div className="p-6 rounded-2xl bg-white border-2 border-[#E8DFC8] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8A1538] font-mono uppercase">
          <BadgeCheck className="w-4 h-4 text-[#C5A059]" />
          <span>Case Study in Sourcing Integrity: Snoonu Capital Disclosures</span>
        </div>
        <h3 className="text-lg font-black text-[#1E1919]">
          {isAr ? 'توثيق أرقام تمويل سنونو: ١٧ مليون دولار' : 'Verification of Snoonu Funding Metrics: $17,000,000 USD'}
        </h3>
        <p className="text-xs text-[#5A4E4E] leading-relaxed">
          {isAr
            ? 'تلافياً للتضارب بين بعض التقارير الصحفية التي أوردت ٢٠ مليون دولار، اعتمدت Ventures.qa الرقم الموثق لجولات حقوق الملكية المؤسسية المعلنة:'
            : 'To resolve conflicting public media claims ($17M vs. $20M), Ventures.qa verifies the exact institutional venture equity rounds closed by Lusail-based Snoonu:'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
            <span className="text-[10px] font-bold text-[#8A1538] font-mono block">Series A (April 2021)</span>
            <span className="font-bold text-[#1E1919] text-sm font-mono">$5,000,000 USD</span>
            <p className="text-[11px] text-[#6B5E5E] mt-0.5">Source: Official company release & Qatari Angel Syndicate disclosure.</p>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
            <span className="text-[10px] font-bold text-[#8A1538] font-mono block">Series B (April 2022)</span>
            <span className="font-bold text-[#1E1919] text-sm font-mono">$12,000,000 USD</span>
            <p className="text-[11px] text-[#6B5E5E] mt-0.5">Source: Verified transaction coverage via Wamda and Bloomberg.</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
          <span>{isAr ? 'إجمالي التمويل المؤسسي الموثق: ١٧ مليون دولار أمريكي (٦١.٩ مليون ريال قطري)' : 'Verified Total Institutional Equity: $17,000,000 USD (61,880,000 QAR)'}</span>
          <span className="font-mono text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">Verified Citation</span>
        </div>
      </div>

      {/* Editorial Neutrality Disclosure */}
      <div className="p-6 rounded-2xl bg-[#251D1E] text-white border border-[#403335] space-y-3">
        <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs font-mono uppercase">
          <Lock className="w-4 h-4" />
          <span>{isAr ? 'إفصاح الاستقلالية والحياد التام' : 'Editorial Independence & Non-Sovereign Governance'}</span>
        </div>
        <p className="text-xs text-[#C2B5B5] leading-relaxed">
          {isAr
            ? 'Ventures.qa منصة إعلامية واستخباراتية رقمية مستقلة مملوكة للقطاع الخاص. لا تمثل المنصة أي جهة حكومية أو صندوق سيادي أو هيئة عامة، ولا ترتبط بأي شراكة رسمية مع أي منها. يتم إعداد كافة بيانات المؤشرات وتحليلات الصفقات استناداً إلى مصادر صحفية موثقة وإفصاحات الشركات المباشرة وفق أعلى المعايير المهنية.'
            : 'Ventures.qa is an independent private-sector intelligence publication and matchmaking platform. Ventures.qa is not affiliated with, endorsed by, nor operated in partnership with any government body, sovereign wealth fund, or public agency. All market analysis, company spotlights, and venture index figures are published strictly under objective third-party sourced editorial methodology.'}
        </p>
      </div>

      {/* Action Navigation Footer */}
      <div className="pt-6 border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('directory')}
            className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
          >
            <span>{isAr ? 'استعراض الدليل الموثق' : 'Explore Verified Directory'}</span>
            <Arrow className="w-4 h-4 text-[#C5A059]" />
          </button>
          
          <button
            onClick={() => onNavigateTab('intelligence')}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8DFC8] text-[#1E1919] font-bold text-xs shadow-sm transition-all flex items-center gap-2"
          >
            <span>{isAr ? 'عرض مؤشر QPCI' : 'Open QPCI Index'}</span>
            <Arrow className="w-4 h-4 text-[#8A1538]" />
          </button>
        </div>

        {onOpenProspectus && (
          <button
            onClick={onOpenProspectus}
            className="text-xs font-bold text-[#8A1538] hover:underline flex items-center gap-1.5"
          >
            <span>{isAr ? 'الاطلاع على نشرة الاستحواذ والفحص النافي للجهالة' : 'Review Buyer Due Diligence Prospectus'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};
