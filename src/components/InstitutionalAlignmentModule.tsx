import React, { useState } from 'react';
import { StateOfCapitalReport, Language } from '../types';
import { 
  BarChart3, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  Building2, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Share2,
  Mail,
  Send,
  LineChart,
  Layers
} from 'lucide-react';

interface InstitutionalAlignmentModuleProps {
  report: StateOfCapitalReport;
  language: Language;
  onOpenReportModal: () => void;
}

export const InstitutionalAlignmentModule: React.FC<InstitutionalAlignmentModuleProps> = ({
  report,
  language,
  onOpenReportModal
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Research submission form state
  const [partnerOrg, setPartnerOrg] = useState('');
  const [partnerContact, setPartnerContact] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerType, setPartnerType] = useState('Venture Capital Firm / GP');
  const [partnerMessage, setPartnerMessage] = useState('');
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitted(true);
  };

  const researchPillars = [
    {
      titleEn: '1. Private-Sector Non-Hydrocarbon Expansion',
      titleAr: '١. توسع مساهمة القطاع الخاص غير النفطي',
      descEn: 'Third-party economic analysis of market diversification: tracking how private enterprises and tech scaleups are driving productivity growth across logistics, enterprise software, and consumer commerce.',
      descAr: 'تحليل اقتصادي مستقل لمسار التنويع: رصد مساهمة الشركات الخاصة وشركات التكنولوجيا في نمو الإنتاجية عبر قطاعات الخدمات اللوجستية والبرمجيات والتجارة.',
      kpi: 'Ecosystem Metric: 58% Non-Hydrocarbon Private Contribution'
    },
    {
      titleEn: '2. Venture Capital Velocity & Series A Gap',
      titleAr: '٢. وتيرة رأس المال الجريء وسد فجوة الفئة (أ)',
      descEn: 'Empirical research tracking the transition from seed-stage prototypes to institutional Series A rounds, with family office syndicates increasingly closing lead ticket allocations.',
      descAr: 'دراسة بحثية توثق انتقال الشركات من مرحلة التأسيس إلى الجولات المؤسسية، مع تنامي دور نقابات المكاتب العائلية في قيادة جولات التمويل.',
      kpi: 'Index Tracking: $42.5M Disclosed Q2 Venture Deals'
    },
    {
      titleEn: '3. Capital Market Deepening & Liquidity Pathways',
      titleAr: '٣. تعميق أسواق المال ومسارات السيولة والتخارج',
      descEn: 'Analysis of secondary liquidity mechanisms, regional cross-border M&A transactions, and local exchange readiness for high-growth tech enterprises.',
      descAr: 'تحليل آليات السيولة الثانوية، وصفقات الاندماج والاستحواذ الإقليمية، وجاهزية الشركات الواعدة للإدراج بأسواق المال والبورصات المحلية.',
      kpi: 'Market Benchmark: 3 Scaleups in Pipeline Preparation'
    },
    {
      titleEn: '4. Cross-Border LP Allocations & Regional Syndicates',
      titleAr: '٤. تدفقات رأس المال الدولي والتحالفات الإقليمية',
      descEn: 'Documenting co-investment trends between international institutional investors and regional private asset managers active across Doha and the GCC.',
      descAr: 'توثيق اتجاهات الاستثمار المشترك بين المؤسسات الدولية ومدراء الأصول الخاصة الإقليميين الناشطين في الدوحة ودول مجلس التعاون.',
      kpi: 'Report Metric: 40%+ Cross-Border Co-Investment Ratio'
    }
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#E8DFC8] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8A1538] uppercase tracking-wider mb-1 font-mono">
          <BarChart3 className="w-4 h-4 text-[#C5A059]" />
          <span>{isAr ? 'الوحدة الرابعة: التحليل الاقتصادي وركائز المنظومة' : 'Module 4: Ecosystem Dynamics & Macro Analysis'}</span>
        </div>
        <h2 className="text-3xl font-black text-[#1E1919] tracking-tight">
          {isAr ? 'اتجاهات الاقتصاد الخاص ورأس المال في قطر' : 'Private Capital Dynamics & Macro Trends in Qatar'}
        </h2>
        <p className="text-sm text-[#6B5E5E] max-w-3xl mt-1 leading-relaxed">
          {isAr
            ? 'دراسات وتقارير تحليلية مستقلة تعدها وحدة الأبحاث في Ventures.qa لمتابعة تحولات رأس المال الخاص، ونمو الشركات الناشئة، وتعميق السيولة في السوق القطري وفق أحدث المعايير البحثية المحايدة.'
            : 'Independent macroeconomic commentary and market structural analysis produced by the Ventures.qa Research Unit, documenting private enterprise growth, capital velocity, and exit mechanisms.'}
        </p>
      </div>

      {/* Strategic Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchPillars.map((p, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border-2 border-[#E8DFC8] hover:border-[#8A1538] transition-all shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <h3 className="text-lg font-black text-[#1E1919] tracking-tight">
                {isAr ? p.titleAr : p.titleEn}
              </h3>
              <p className="text-xs text-[#5A4E4E] mt-2 leading-relaxed">
                {isAr ? p.descAr : p.descEn}
              </p>
            </div>
            
            <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#8A1538] flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                {p.kpi}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- QUARTERLY REPORT SPOTLIGHT CARD --- */}
      <div className="bg-gradient-to-br from-[#6E0D29] via-[#8A1538] to-[#4C081A] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059] text-[#1E1919] text-xs font-black font-mono">
              <FileText className="w-3.5 h-3.5" />
              <span>{isAr ? 'الإصدار البحثي الفصلي' : 'INDEPENDENT RESEARCH PUBLICATION'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              {isAr ? report.titleAr : report.titleEn}
            </h3>

            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl">
              {isAr ? report.executiveSummaryAr : report.executiveSummaryEn}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                <span className="text-[10px] text-white/70 block uppercase font-mono">{isAr ? 'التمويل المرصود' : 'Tracked Capital'}</span>
                <strong className="font-mono text-base text-[#C5A059]">$98.4M USD</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                <span className="text-[10px] text-white/70 block uppercase font-mono">{isAr ? 'الصفقات الموثقة' : 'Verified Deals'}</span>
                <strong className="font-mono text-base text-white">{report.activeDealsTracked} {isAr ? 'صفقة' : 'Transactions'}</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-white/70 block uppercase font-mono">{isAr ? 'المعيار المنهجي' : 'Editorial Standard'}</span>
                <strong className="text-xs text-white">Non-affiliated Sourcing</strong>
              </div>
            </div>
          </div>

          {/* Download & Read Action */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <button
              onClick={onOpenReportModal}
              className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#8A1538] font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#C5A059]" />
              <span>{isAr ? 'قراءة وتحميل التقرير كاملاً (PDF)' : 'Read & Download Full Report'}</span>
            </button>
            <p className="text-[11px] text-white/70 text-center">
              {isAr ? 'متاح للصحافة والمحللين والمستثمرين مجاناً' : 'Available free for journalists, analysts, and investors'}
            </p>
          </div>
        </div>
      </div>

      {/* --- RESEARCH CONTRIBUTIONS & DATA SUBMISSION GATEWAY --- */}
      <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#8A1538] uppercase tracking-wider block font-mono">
              {isAr ? 'المساهمة البحثية والإفصاح' : 'Research & Deal Submissions'}
            </span>
            <h3 className="text-2xl font-black text-[#1E1919] tracking-tight">
              {isAr ? 'تقديم بيانات الصفقات وملاحظات المحللين' : 'Contribute Data to the Index'}
            </h3>
            <p className="text-xs text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'ندعو مدراء الصناديق والمكاتب العائلية ومؤسسي الشركات للإفصاح عن جولات التمويل المغلقة أو المساهمة في تقارير المؤشر الفصلي لدعم الشفافية في السوق.'
                : 'We invite fund managers, family office analysts, and startup founders to confidentially disclose closed rounds or contribute empirical insights to the quarterly index.'}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-[#1E1919] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538]" />
                <span>{isAr ? 'توثيق جولات التمويل وفق معايير الإفصاح المالي' : 'Verified venture round indexing'}</span>
              </div>
              <div className="flex items-center gap-2 text-[#1E1919] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538]" />
                <span>{isAr ? 'حماية سرية البيانات غير المعلنة تجارياً' : 'Strict confidentiality on pre-disclosed terms'}</span>
              </div>
              <div className="flex items-center gap-2 text-[#1E1919] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538]" />
                <span>{isAr ? 'إدراج الكيان بالدليل الرسمي للشركات' : 'Complimentary verified directory inclusion'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-xs">
              <strong className="text-[#8A1538] block mb-1">
                {isAr ? 'مكتب الأبحاث والبيانات:' : 'Research & Sourcing Desk:'}
              </strong>
              <p className="text-[#5A4E4E]">Ventures.qa Independent Intelligence Desk, Doha, Qatar</p>
              <p className="text-[#5A4E4E] font-mono mt-1">research@ventures.qa</p>
            </div>
          </div>

          {/* Submission Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8] p-6">
            {partnerSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#1E1919]">
                  {isAr ? 'تم استلام البيانات بنجاح' : 'Submission Received'}
                </h4>
                <p className="text-xs text-[#5A4E4E] max-w-sm mx-auto">
                  {isAr
                    ? `شكراً لمساهمتكم. سيقوم فريق التحليل في Ventures.qa بمراجعة البيانات والتواصل معكم على (${partnerEmail}).`
                    : `Thank you for contributing. Our research team will review the disclosure and contact you at ${partnerEmail}.`}
                </p>
                <button
                  onClick={() => setPartnerSubmitted(false)}
                  className="px-4 py-2 bg-[#8A1538] text-white text-xs font-bold rounded-lg mt-2"
                >
                  {isAr ? 'إرسال بيانات أخرى' : 'Submit Another Disclosure'}
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4 text-xs">
                <h4 className="font-bold text-[#1E1919] text-sm">
                  {isAr ? 'نموذج تقديم إفصاح أو مساهمة بحثية' : 'Submit Research / Deal Disclosure'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B5E5E] font-semibold mb-1">
                      {isAr ? 'اسم المنشأة أو الشركة' : 'Entity / Firm Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerOrg}
                      onChange={(e) => setPartnerOrg(e.target.value)}
                      placeholder="e.g. Snoonu Technologies"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D5C3] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B5E5E] font-semibold mb-1">
                      {isAr ? 'صفة الكيان' : 'Entity Type'}
                    </label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D5C3] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                    >
                      <option value="Venture Capital Firm / GP">Venture Capital Firm / GP</option>
                      <option value="Family Office / Holding">Family Office / Private Holding</option>
                      <option value="Startup / Tech Scaleup">Startup / Tech Scaleup</option>
                      <option value="Angel Syndicate">Angel Syndicate</option>
                      <option value="Academic / Research Institution">Research / Academic Institution</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B5E5E] font-semibold mb-1">
                      {isAr ? 'اسم مسؤول التواصل' : 'Contact Person'}
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerContact}
                      onChange={(e) => setPartnerContact(e.target.value)}
                      placeholder="e.g. Ahmad Al-Kuwari"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D5C3] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B5E5E] font-semibold mb-1">
                      {isAr ? 'البريد الإلكتروني المؤسسي' : 'Corporate Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      placeholder="ahmad@fund.qa"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D5C3] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B5E5E] font-semibold mb-1">
                    {isAr ? 'تفاصيل الجولة الاستثمارية أو المقترح البحثي' : 'Details of Round or Research Proposal'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={partnerMessage}
                    onChange={(e) => setPartnerMessage(e.target.value)}
                    placeholder={
                      isAr
                        ? 'يرجى توضيح حجم الجولة، المستثمرين المشاركين، أو طبيعة الدراسة المقترحة...'
                        : 'Brief details on transaction size, co-investors, valuation disclosure status, or research collaboration...'
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D5C3] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{isAr ? 'إرسال البيانات للمراجعة' : 'Submit for Review'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

    </section>
  );
};
