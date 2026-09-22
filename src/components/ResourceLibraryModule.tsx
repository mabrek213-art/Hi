import React, { useState } from 'react';
import { EcosystemResource, Language } from '../types';
import { 
  FileDown, 
  BookOpen, 
  FileSpreadsheet, 
  FileText, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  X,
  Lock
} from 'lucide-react';

interface ResourceLibraryModuleProps {
  language: Language;
  resources: EcosystemResource[];
}

export const ResourceLibraryModule: React.FC<ResourceLibraryModuleProps> = ({
  language,
  resources
}) => {
  const isAr = language === 'ar';
  const [selectedResource, setSelectedResource] = useState<EcosystemResource | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (res: EcosystemResource) => {
    // Trigger download
    const blob = new Blob([
      `VENTURES.QA OPEN ECOSYSTEM TEMPLATE\n` +
      `Title: ${res.titleEn}\n` +
      `Category: ${res.category}\n` +
      `Legal Disclaimer: Provided as open educational resources for Qatar's private startup and venture community. Consult qualified legal counsel for binding transactions.\n\n` +
      `--- SUMMARY ---\n${res.descriptionEn}\n\n` +
      (res.sampleContent || 'Document template content.')
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const format = (res.fileFormat || res.fileType || 'pdf').toLowerCase();
    a.download = `${res.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(res.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#8A1538]/10 text-[#8A1538] font-mono">
              {isAr ? 'مكتبة الموارد والنماذج المفتوحة' : 'OPEN RESOURCE LIBRARY'}
            </span>
            <span className="text-xs text-[#7A6D6D]">
              • {isAr ? 'نماذج قانونية وقوالب استثمار مجانية' : 'Free Legal SAFE Notes, Cap Tables & Term Sheets'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'الموارد والنماذج الاستثمارية' : 'Legal & Venture Capital Templates'}
          </h2>
          <p className="text-xs text-[#5A4E4E] max-w-2xl mt-1">
            {isAr
              ? 'مكتبة شاملة ومجانية لنماذج الاستثمار الجريء المكيفة للوائح القطرية، بما في ذلك اتفاقيات SAFE وقوالب جدول الحصص وجداول الشروط.'
              : 'Open-access venture legal templates, term sheet frameworks, and corporate registration playbooks adapted specifically for Qatari private-sector entrepreneurs and angel investors.'}
          </p>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map(res => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-[#E8DFC8] hover:border-[#8A1538] hover:shadow-lg transition-all p-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FAF8F5] text-[#8A1538] border border-[#E8DFC8] font-mono">
                  {res.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C5A059]/15 text-[#8A1538] font-mono">
                  {res.fileFormat || res.fileType} • {res.fileSize || res.size}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#1E1919] leading-snug">
                {isAr ? res.titleAr : res.titleEn}
              </h3>

              <p className="text-xs text-[#5A4E4E] leading-relaxed">
                {isAr ? res.descriptionAr : res.descriptionEn}
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[#FAF8F5] flex items-center justify-between">
              <button
                onClick={() => setSelectedResource(res)}
                className="text-xs text-[#5A4E4E] hover:text-[#8A1538] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{isAr ? 'معاينة النموذج' : 'Preview Document'}</span>
              </button>

              <button
                onClick={() => handleDownload(res)}
                className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {downloadSuccess === res.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{isAr ? 'تم التحميل!' : 'Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تحميل مجاناً' : 'Download Template'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-2xl shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#8A1538] text-white p-5 relative shrink-0">
              <button
                onClick={() => setSelectedResource(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-white/80 hover:text-white bg-black/20"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] font-mono block mb-1">
                DOCUMENT PREVIEW
              </span>
              <h3 className="text-lg font-bold">
                {isAr ? selectedResource.titleAr : selectedResource.titleEn}
              </h3>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-xs text-[#5A4E4E]">
                <strong>{isAr ? 'تنويه قانوني مهني: ' : 'Legal Notice: '}</strong>
                {isAr
                  ? 'هذه النماذج مصممة لأغراض إرشادية وتعليمية لمساعدة رواد الأعمال والمستثمرين في السوق القطري، ولا تغني عن الاستشارة القانونية المتخصصة.'
                  : 'These standardized templates are provided as informational resources for the Qatari venture community. Always consult qualified legal advisors before executing binding commitments.'}
              </div>

              {selectedResource.sampleContent && (
                <div className="p-4 rounded-xl bg-[#1E1919] text-[#E8DFC8] font-mono text-xs overflow-x-auto whitespace-pre-line leading-relaxed">
                  {selectedResource.sampleContent}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedResource(null)}
                  className="px-4 py-2 rounded-xl border border-[#E8DFC8] text-xs font-semibold text-[#5A4E4E] hover:bg-[#FAF8F5]"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    handleDownload(selectedResource);
                    setSelectedResource(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تحميل الملف كاملاً' : 'Download Full File'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
