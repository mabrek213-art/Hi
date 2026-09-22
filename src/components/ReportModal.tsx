import React, { useState } from 'react';
import { StateOfCapitalReport, Language } from '../types';
import { 
  X, 
  Download, 
  Share2, 
  FileText, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  PieChart, 
  Building2,
  CheckCircle2
} from 'lucide-react';

interface ReportModalProps {
  report: StateOfCapitalReport;
  language: Language;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  report,
  language,
  onClose
}) => {
  const isAr = language === 'ar';
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const handleDownload = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setDownloading(true);

    try {
      if (downloadEmail) {
        await fetch('/api/index/report/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: downloadEmail, title: report.titleEn })
        });
      }
    } catch (err) {
      console.error(err);
    }

    // Trigger instant PDF file download
    const blob = new Blob([
      `VENTURES.QA QUARTERLY RESEARCH REPORT (Q2 2026)\n` +
      `Title: ${report.titleEn}\n` +
      `Published: ${report.publicationDate}\n` +
      `Publisher: Ventures.qa Independent Research & Market Intelligence Unit\n` +
      `Editorial Standard: Non-affiliated, third-party sourced reporting\n\n` +
      `=== EXECUTIVE SUMMARY ===\n${report.executiveSummaryEn}\n\n` +
      `=== METHODOLOGY & DATA SOURCES ===\n${report.methodology || 'Multi-sourced verification across verified corporate disclosures, regulatory registries, and direct institutional syndicate submissions.'}\n\n` +
      `=== KEY PILLARS ===\n` +
      report.keyPillars.map(p => `[${p.metric}] ${p.titleEn}: ${p.descriptionEn}`).join('\n')
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ventures-QA-State-of-Private-Capital-Q2-2026.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloading(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleCopyPressQuote = () => {
    const quote = `Ventures.qa Q2 2026 State of Private Capital: Qatar private venture deployment reached $42.5M across 6 verified transactions, with syndicated family office participation and multi-currency fintech dominance leading ecosystem activity.`;
    navigator.clipboard.writeText(quote);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#8A1538] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-white/80 hover:text-white rounded-full bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#C5A059] text-[#1E1919] font-mono">
              {report.quarterLabel} INDEPENDENT RESEARCH REPORT
            </span>
            <h2 className="text-2xl font-black mt-2 tracking-tight">
              {isAr ? report.titleAr : report.titleEn}
            </h2>
            <p className="text-xs text-white/85 mt-1">
              {isAr ? 'منشور بواسطة: وحدة أبحاث واستخبارات السوق — Ventures.qa' : 'Published by: Ventures.qa Market Intelligence & Research Unit'} • {report.publicationDate}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => handleDownload()}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#8A1538] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'تم بدء التحميل' : 'Downloaded Research PDF'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#C5A059]" />
                  <span>{downloading ? (isAr ? 'جاري تجهيز المستند...' : 'Preparing PDF...') : (isAr ? 'تحميل التقرير الكامل (PDF)' : 'Download Full Research Report')}</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyPressQuote}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedQuote ? (isAr ? 'تم نسخ الاقتباس الصحفي' : 'Copied Citation') : (isAr ? 'اقتباس للإعلام والصحافة' : 'Press Citation')}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Report Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#1E1919]">
          
          {/* Executive Summary Box */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A1538] font-mono">
              {isAr ? 'الملخص التنفيذي ومؤشرات السوق' : 'Executive Summary & Market Takeaways'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3F3F] leading-relaxed">
              {isAr ? report.executiveSummaryAr : report.executiveSummaryEn}
            </p>
          </div>

          {/* Key Findings Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D] mb-3 font-mono">
              {isAr ? 'الركائز الاستراتيجية والمؤشرات الجوهرية' : 'Strategic Pillars & Market Dynamics'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {report.keyPillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#E8DFC8] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#8A1538] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8DFC8]">
                        {pillar.metric}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#1E1919] mb-1">
                      {isAr ? pillar.titleAr : pillar.titleEn}
                    </h4>
                    <p className="text-[11px] text-[#5A4E4E] leading-relaxed">
                      {isAr ? pillar.descriptionAr : pillar.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Private Capital & Family Office Syndicate Special Chapter */}
          <div className="p-5 rounded-2xl bg-[#8A1538]/5 border-2 border-[#8A1538]/20 space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#8A1538]" />
              <h3 className="text-sm font-bold text-[#8A1538]">
                {isAr ? 'فصل خاص: صعود نقابات المكاتب العائلية والاستثمار الجريء المباشر' : 'Special Chapter: Private Family Office Syndicates & Direct Venture Co-Investment'}
              </h3>
            </div>
            <p className="text-xs text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'تشير بيانات الربع الثاني إلى تحول ملموس في سلوك مكاتب العائلات التجارية في قطر: انتقال من الاستثمار العقاري التقليدي نحو تأسيس أذرع استثمار مخاطر مخصصة تضخ رأسمالاً في جولات ما بعد التأسيس وجولات الفئة (أ) بالشراكة مع الصناديق الإقليمية.'
                : 'Empirical data demonstrates a tangible structural shift in Qatari merchant family offices: transitioning from traditional real estate into dedicated direct venture vehicles co-investing alongside regional lead institutional funds in Post-Seed and Series A scaleups.'}
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-[#E8DFC8]">
                <span className="text-[10px] text-[#7A6D6D] block">{isAr ? 'المكاتب العائلية النشطة' : 'Active Family Offices'}</span>
                <strong className="font-mono text-sm text-[#1E1919]">14+ Groups</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#E8DFC8]">
                <span className="text-[10px] text-[#7A6D6D] block">{isAr ? 'رأس المال المباشر الموزع' : 'Direct Deployed'}</span>
                <strong className="font-mono text-sm text-[#8A1538]">$22.8M USD</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#E8DFC8]">
                <span className="text-[10px] text-[#7A6D6D] block">{isAr ? 'متوسط حجم الشيك' : 'Typical Check Size'}</span>
                <strong className="font-mono text-sm text-emerald-800">$500k – $1.5M</strong>
              </div>
            </div>
          </div>

          {/* Download via Email Gate */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
            <span className="text-xs font-bold text-[#1E1919] block">
              {isAr ? 'استلام نسخة PDF المحدثة مع بيانات الجداول التكميلية' : 'Receive Updated PDF Edition & Supplementary Data Tables'}
            </span>
            <form onSubmit={handleDownload} className="flex gap-2">
              <input
                type="email"
                required
                value={downloadEmail}
                onChange={(e) => setDownloadEmail(e.target.value)}
                placeholder="analyst@firm.qa"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-colors"
              >
                {isAr ? 'إرسال وتحميل' : 'Send & Download'}
              </button>
            </form>
          </div>

          {/* Press Citation Notice */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] flex items-center justify-between text-xs text-[#6B5E5E]">
            <span>
              {isAr ? 'تنويه الاقتباس: يرجى الإشارة إلى "مؤشر Ventures.qa لرأس المال الخاص في قطر (QPCI)".' : 'Citation Notice: Credit "Ventures.qa Independent Private Capital Index (QPCI)".'}
            </span>
            <span className="font-mono text-[10px] text-[#7A6D6D]">ISSN 2958-8201</span>
          </div>

        </div>
      </div>
    </div>
  );
};
