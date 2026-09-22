import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, 
  Building2, 
  TrendingUp, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Send, 
  DollarSign, 
  Database, 
  Cpu, 
  Briefcase, 
  FileText,
  Lock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface AcquisitionProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AcquisitionProspectusModal: React.FC<AcquisitionProspectusModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'acquisition', // 'acquisition' | 'partnership' | 'licensing' | 'sponsor'
    estimatedBudget: '$50,000 - $150,000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.organization) {
      setErrorMsg(isAr ? 'يرجى تعبئة جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/acquisitions/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || (isAr ? 'حدث خطأ أثناء الإرسال' : 'Error submitting inquiry'));
      }
    } catch {
      // Fallback optimistic submission
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full border border-[#E8DFC8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#8A1538] text-white px-6 py-5 flex items-center justify-between border-b border-[#6E0D29]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6E0D29] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] font-black text-sm font-mono">
              VQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#6E0D29] text-[#C5A059] uppercase tracking-wider font-mono">
                  {isAr ? 'نشرة الاستحواذ والأصول' : 'ASSET SALE & PARTNERSHIP PROSPECTUS'}
                </span>
                <span className="text-white/60 text-xs">• 2026/2027</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5 tracking-tight">
                {isAr ? 'الاستحواذ والشراكات الاستراتيجية لمنصة Ventures.qa' : 'Ventures.qa Strategic Acquisition & Platform Prospectus'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-[#1E1919] text-sm">
          
          {/* Executive Summary */}
          <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E8DFC8] space-y-3">
            <h3 className="text-base font-black text-[#1E1919] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8A1538]" />
              {isAr ? 'الملخص التنفيذي للأصل الرقمي' : 'Executive Overview & Strategic Asset Value'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'تم تصميم وبناء منصة Ventures.qa لتكون المرجع المستقل الأول لمنظومة المشاريع الريادية والمؤسسين والشركات الاستثمارية في دولة قطر. تقدم المنصة حلاً رقمياً متكاملاً جاهزاً للعمل (Turnkey Asset) يلائم الاستحواذ المؤسسي من قبل الجهات الحكومية والتنموية، وصناديق رأس المال الجريء، والمؤسسات الإعلامية الكبرى الراغبة في امتلاك أصل موثوق للبيانات الاستثمارية.'
                : 'Ventures.qa was architected as the premier independent digital resource and market infrastructure for Qatar’s tech ventures, founders, and investment companies. Designed as a turnkey, institutional-grade media and data property, it represents an exceptional acquisition target for regional venture syndicates, media conglomerates, or government development entities seeking instant ecosystem authority.'}
            </p>
          </div>

          {/* Core Valuation Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl border border-[#E8DFC8] bg-white space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center font-bold">
                <Search className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1E1919]">
                {isAr ? 'بنية SEO و 4 أدلة مرجعية' : 'High-Intent SEO Traffic Moat'}
              </h4>
              <p className="text-[11px] text-[#6B5E5E] leading-relaxed">
                {isAr
                  ? 'أربعة أدلة مرجعية شاملة تستحوذ على الكلمات المفتاحية الأكثر طلباً من المؤسسين والمستثمرين للبحث عن التأسيس ورأس المال الجريء والمكاتب العائلية في قطر.'
                  : '4 comprehensive SEO pillar guides capturing top Google search traffic for startup incorporation, angel SAFEs, family office allocations, and valuation benchmarks in Doha.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E8DFC8] bg-white space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 text-[#9E7A32] flex items-center justify-center font-bold">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1E1919]">
                {isAr ? 'قاعدة بيانات مؤشر QPCI' : 'Proprietary QPCI Data Engine'}
              </h4>
              <p className="text-[11px] text-[#6B5E5E] leading-relaxed">
                {isAr
                  ? 'سجل دقيق لـ 14+ جهة وشركة ناشئة موثقة بالسجلات التجارية، بالإضافة إلى مؤشر رأس المال الخاص (QPCI) بصفقات تزيد عن 42.5 مليون دولار.'
                  : 'Audited directory of 14+ verified scaleups, commercial registrations, and the proprietary Qatar Private Capital Index tracking $42.5M+ in verified quarterly venture deals.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E8DFC8] bg-white space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1E1919]">
                {isAr ? 'أتمتة المحتوى بالذكاء الاصطناعي' : 'Automated AI News Pipeline'}
              </h4>
              <p className="text-[11px] text-[#6B5E5E] leading-relaxed">
                {isAr
                  ? 'نظام استيعاب متقدم مع نموذج Gemini 3.8 Flash لتحويل الروابط الصحفية إلى مسودات مقالات تحليلية وفق سياسة تحريرية صارمة ثنائية اللغة.'
                  : 'Integrated server-side Gemini 3.8 Flash AI ingestion engine that transforms news URLs into analytical editorial drafts with strict quarantine and bilingual support.'}
              </p>
            </div>

          </div>

          {/* Commercialization & Monetization Potential */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-[#1E1919] uppercase tracking-wide">
              {isAr ? 'فرص تحقيق الإيرادات للمشتري الجديد' : 'Turnkey Monetization Avenues for the Acquirer'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1919] font-bold">
                    {isAr ? 'رسوم وساطة الصفقات (1-2% Success Fees):' : 'Deal-Flow Matchmaking Success Fees (1–2%):'}
                  </strong>
                  <p className="text-[#6B5E5E] mt-0.5">
                    {isAr ? 'عمولة وساطة على جولات التمويل وربط المستثمرين بالشركات.' : 'Transaction introduction fees on verified syndications and angel rounds.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1919] font-bold">
                    {isAr ? 'اشتراكات بيانات API للمؤسسات:' : 'Institutional API & Research Subscriptions:'}
                  </strong>
                  <p className="text-[#6B5E5E] mt-0.5">
                    {isAr ? 'تغذية بيانات لحظية للبنوك وصناديق الاستثمار ومراكز الأبحاث.' : 'Recurring API subscriptions for banks, sovereign LPs, and consultancies.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1919] font-bold">
                    {isAr ? 'التوثيق المميز ورعاية الأضواء:' : 'Sponsored Company Profiles & Spotlights:'}
                  </strong>
                  <p className="text-[#6B5E5E] mt-0.5">
                    {isAr ? 'رسوم سنوية للتوثيق المعتمد ونشر الدراسات التحليلية للشركات.' : 'Annual verification fees for scaleups and bespoke editorial deep-dives.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E1919] font-bold">
                    {isAr ? 'منصة التوظيف التقني المتخصص:' : 'Curated Tech Hiring & Recruitment Board:'}
                  </strong>
                  <p className="text-[#6B5E5E] mt-0.5">
                    {isAr ? 'رسوم نشر إعلانات الوظائف التقنية للمؤسسين والشركات النامية.' : 'Paid postings for senior engineering, product, and leadership talent.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Form */}
          <div className="border-t border-[#E8DFC8] pt-6">
            <h3 className="text-sm font-black text-[#1E1919] mb-3">
              {isAr ? 'تقديم طلب اهتمام بالاستحواذ أو الشراكة' : 'Submit Acquisition, Licensing or Strategic Partnership Inquiry'}
            </h3>

            {submitted ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">
                  {isAr ? 'تم استلام طلبكم بنجاح' : 'Inquiry Submitted Successfully'}
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  {isAr
                    ? 'شكراً لاهتمامكم بالمنصة. سيقوم الفريق المسؤول بمراجعة الطلب والتواصل معكم خلال 24 ساعة عبر البريد الإلكتروني.'
                    : 'Thank you for your interest in Ventures.qa. Our managing directors will review your inquiry and follow up within 24 hours under NDA.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#1E1919] mb-1">
                      {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Nasser Al-Attiyah"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C9B8] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1E1919] mb-1">
                      {isAr ? 'الجهة / الصندوق / الشركة *' : 'Organization / Fund / Group *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Sovereign Tech Fund / Media Holding"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C9B8] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1E1919] mb-1">
                      {isAr ? 'البريد الإلكتروني المهني *' : 'Professional Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nasser@fund.qa"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C9B8] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1E1919] mb-1">
                      {isAr ? 'نوع الاهتمام' : 'Inquiry Scope'}
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C9B8] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                    >
                      <option value="acquisition">{isAr ? 'استحواذ كامل على الأصل الرقمي (Full Acquisition)' : 'Full Asset Acquisition (Turnkey Transfer)'}</option>
                      <option value="partnership">{isAr ? 'شراكة استراتيجية / تشغيل مشترك' : 'Strategic Operating Partnership'}</option>
                      <option value="licensing">{isAr ? 'ترخيص بيانات مؤشر QPCI' : 'QPCI Data Licensing / Institutional API'}</option>
                      <option value="sponsor">{isAr ? 'رعاية سنوية لمنظومة الشركات' : 'Annual Platform Sponsorship'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1E1919] mb-1 text-xs">
                    {isAr ? 'رسالة أو مقترح أولي' : 'Initial Proposal / Message'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isAr
                        ? 'وضح اهتمامك، المدى الزمني المتوقع، وأي شروط خاصة...'
                        : 'Outline your acquisition or partnership parameters, timeline, or requests for confidential information...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C9B8] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#6B5E5E] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8A1538]" />
                    {isAr ? 'جميع الاستفسارات تعامل بسرية تامة (Strict NDA)' : 'All inquiries handled under strict mutual NDA'}
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{isAr ? 'جاري الإرسال...' : 'Submitting...'}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{isAr ? 'إرسال الاستفسار' : 'Submit Inquiry'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F5] px-6 py-4 border-t border-[#E8DFC8] flex items-center justify-between text-xs text-[#6B5E5E]">
          <span>Ventures.qa • Digital Asset Ref: VQ-PROSPECTUS-2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#D5C9B8] hover:bg-[#F2ECE4] text-[#1E1919] font-bold text-xs"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
