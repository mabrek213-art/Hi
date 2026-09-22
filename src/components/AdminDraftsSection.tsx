import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Trash2, 
  Edit3, 
  Check, 
  Newspaper, 
  EyeOff, 
  Zap,
  Globe,
  FileText,
  Clock,
  Send
} from 'lucide-react';
import { NewsArticle, NewsCategory, EntityProfile } from '../types';

export interface AdminDraftsSectionProps {
  language: 'en' | 'ar';
  directoryEntities?: EntityProfile[];
  onArticlePublished?: (article: NewsArticle) => void;
  onDraftGenerated?: (draft: NewsArticle) => void;
}

const CATEGORIES: NewsCategory[] = [
  'Funding News',
  'Policy & Regulation',
  'Market Trends',
  'Startup Spotlight',
  'Events'
];

export const AdminDraftsSection: React.FC<AdminDraftsSectionProps> = ({
  language,
  directoryEntities = [],
  onArticlePublished,
  onDraftGenerated
}) => {
  const isAr = language === 'ar';

  // Form State
  const [sourceUrl, setSourceUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('Funding News');
  const [authorNote, setAuthorNote] = useState('');

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState<NewsArticle | null>(null);

  // Drafts Queue State
  const [drafts, setDrafts] = useState<NewsArticle[]>([]);
  const [loadingDrafts, setLoadingDrafts] = useState(false);
  const [editingDraft, setEditingDraft] = useState<NewsArticle | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSendingDigest, setIsSendingDigest] = useState(false);

  // Fetch pending drafts
  const fetchDrafts = async () => {
    setLoadingDrafts(true);
    try {
      const res = await fetch('/api/admin/news/drafts');
      if (res.ok) {
        const data = await res.json();
        setDrafts(data.drafts || []);
      }
    } catch (e) {
      console.error('Error fetching drafts:', e);
    } finally {
      setLoadingDrafts(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  // Trigger server-side Gemini API call to ingest article content and save as draft
  const handleGenerateDraft = async (e?: React.FormEvent, overrideUrl?: string, overrideNote?: string) => {
    if (e) e.preventDefault();
    const targetUrl = overrideUrl || sourceUrl;
    const targetNote = overrideNote !== undefined ? overrideNote : notes;

    if (!targetUrl.trim()) {
      setGenerationError(isAr ? 'يرجى إدخال رابط المصدر' : 'Please provide a valid source URL.');
      return;
    }

    setIsGenerating(true);
    setGenerationError('');
    setGeneratedDraft(null);

    try {
      const res = await fetch('/api/admin/news/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceUrl: targetUrl.trim(),
          note: targetNote.trim() || undefined,
          category: selectedCategory,
          authorNote: authorNote.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate draft with Gemini API');
      }

      setGeneratedDraft(data.draft);
      if (onDraftGenerated) {
        onDraftGenerated(data.draft);
      }
      fetchDrafts();
      showStatus(
        isAr 
          ? 'تم توليد مسودة المقال بنجاح عبر Gemini وحفظها في قاعدة البيانات بحالة "مسودة" (مخفية عن الجمهور).' 
          : 'Draft generated with Gemini API and saved with status "draft" to database (hidden from public until published).'
      );
    } catch (err: any) {
      setGenerationError(err.message || 'Error communicating with Gemini AI service');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save manual edits to draft
  const handleSaveEditDraft = async () => {
    if (!editingDraft) return;
    try {
      const res = await fetch(`/api/admin/news/drafts/${editingDraft.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDraft)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update draft');

      showStatus(isAr ? 'تم حفظ تعديلات المسودة بنجاح' : 'Draft changes saved successfully');
      setEditingDraft(null);
      fetchDrafts();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  // Approve & Publish Draft to live site
  const handleApprovePublish = async (draftId: string) => {
    try {
      const res = await fetch(`/api/admin/news/drafts/${draftId}/publish`, {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish draft');

      showStatus(
        isAr 
          ? 'تم نشر المقال رسمياً على المنصة، وتحديث موجز RSS، وإرسال النشرة الإخبارية.' 
          : 'Article officially approved and published! Now live on site and dispatched to subscribers.'
      );
      
      if (onArticlePublished && data.article) {
        onArticlePublished(data.article);
      }

      fetchDrafts();
      if (editingDraft?.id === draftId) {
        setEditingDraft(null);
      }
      if (generatedDraft?.id === draftId) {
        setGeneratedDraft(null);
      }
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  // Delete Draft
  const handleDeleteDraft = async (draftId: string) => {
    if (!window.confirm(isAr ? 'هل أنت متأكد من رغبتك في حذف هذه المسودة؟' : 'Are you sure you want to permanently delete this draft?')) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/news/drafts/${draftId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete draft');
      showStatus(isAr ? 'تم حذف المسودة' : 'Draft deleted');
      fetchDrafts();
      if (editingDraft?.id === draftId) setEditingDraft(null);
      if (generatedDraft?.id === draftId) setGeneratedDraft(null);
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  // Send Digest
  const handleSendDigest = async () => {
    setIsSendingDigest(true);
    try {
      const res = await fetch('/api/admin/news/send-digest', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send digest');
      showStatus(
        isAr 
          ? `تم إرسال النشرة الأسبوعية بنجاح إلى ${data.subscriberCount || 0} مشترك.` 
          : `Weekly intelligence digest dispatched to ${data.subscriberCount || 0} subscribers.`
      );
    } catch (err: any) {
      showStatus(err.message, 'error');
    } finally {
      setIsSendingDigest(false);
    }
  };

  return (
    <div className="space-y-8" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Toast Alert */}
      {statusMessage && (
        <div className={`p-4 rounded-xl flex items-center gap-2.5 text-xs font-bold border transition-all ${
          statusMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
            : 'bg-rose-50 text-rose-900 border-rose-200'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* SECTION 1: INGESTION & GENERATION FORM CARD */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8] shadow-sm space-y-6">
        {/* Header with Badges */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#F0EBE1] pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8A1538] to-[#6E0D29] text-white flex items-center justify-center shadow-sm shrink-0">
              <Sparkles className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#1E1919]">
                  {isAr ? 'توليد مسودة مقال بالذكاء الاصطناعي (Gemini Ingestion)' : 'AI Article Ingestion & Draft Generator'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-900 font-bold border border-amber-300 flex items-center gap-1">
                  <EyeOff className="w-3 h-3" />
                  <span>SAVES AS DRAFT</span>
                </span>
              </div>
              <p className="text-xs text-[#7A6D6D] mt-0.5">
                {isAr 
                  ? 'أدخل رابط المصدر لتشغيل Gemini API لتوليد مسودة تحليلية متكاملة غير منسوخة، تحفظ كمسودة ومخفية عن الجمهور حتى الاعتماد.' 
                  : 'Enter a source URL to trigger server-side Gemini API article ingestion. Drafts save with "draft" status and remain hidden from public view until published.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#7A6D6D] font-mono bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E8DFC8]">
              Engine: models/gemini-3.8-flash
            </span>
          </div>
        </div>

        {/* Editorial Standards Notice */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-xs text-[#5A4E4E] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#8A1538] uppercase tracking-wider font-mono text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>{isAr ? 'المعايير التحريرية المطبقة آلياً:' : 'Platform Editorial Standards Enforced:'}</span>
            </span>
            <span className="text-[10px] text-emerald-800 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified Pipeline
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#1E1919]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span><strong>Original Journalism:</strong> 100% original synthesis, zero verbatim copied phrases</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#1E1919]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span><strong>Analytical Implications:</strong> Dedicated section assessing impact for Qatari founders & VCs</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#1E1919]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span><strong>Factual Integrity:</strong> Strictly reports verified numbers; explicitly notes undisclosed terms</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#1E1919]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span><strong>Quarantine Safeguard:</strong> Automatically saved with status "draft" — invisible to public</span>
            </div>
          </div>
        </div>

        {/* Quick Sample Source URLs */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5]/70 border border-dashed border-[#E8DFC8]">
          <span className="text-[11px] font-bold text-[#1E1919] block mb-2">
            {isAr ? 'روابط مصادر مقترحة للاختبار السريع (بنقرة واحدة):' : 'One-Click Sample Source URLs for Rapid Testing:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: 'QDB AI Scaleup Venture Initiative',
                url: 'https://thepeninsulaqatar.com/article/21/09/2026/qdb-unveils-scaleup-venture-fund',
                category: 'Funding News' as NewsCategory,
                note: 'Qatar Development Bank announces a new venture capital matching facility and AI scaleup accelerator program for high-growth tech enterprises.'
              },
              {
                label: 'Snoonu Lusail Logistics Hub',
                url: 'https://gulf-times.com/article/689012/qatar/snoonu-launches-lusail-logistics-center',
                category: 'Startup Spotlight' as NewsCategory,
                note: 'Snoonu launches its state-of-the-art micro-fulfillment hub in Lusail City with 200 electric delivery vehicles and automated sorting systems.'
              },
              {
                label: 'SkipCash GCC Cross-Border Payments',
                url: 'https://thepeninsulaqatar.com/article/skipcash-expands-gcc-payments',
                category: 'Market Trends' as NewsCategory,
                note: 'SkipCash secures regional cross-border merchant processing clearances to enable unified digital checkout across Qatar, Saudi Arabia, and UAE.'
              }
            ].map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSourceUrl(sample.url);
                  setNotes(sample.note);
                  setSelectedCategory(sample.category);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8DFC8] hover:border-[#8A1538] text-[11px] text-[#1E1919] hover:text-[#8A1538] font-medium transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Zap className="w-3 h-3 text-[#C5A059]" />
                <span>{sample.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {generationError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{generationError}</span>
          </div>
        )}

        {/* The Ingestion Form */}
        <form onSubmit={(e) => handleGenerateDraft(e)} className="space-y-4">
          {/* Source URL Field with direct button */}
          <div>
            <label className="block text-xs font-bold text-[#1E1919] mb-1.5 flex items-center justify-between">
              <span>{isAr ? 'رابط المصدر الإخباري (Source URL) *' : 'Source URL *'}</span>
              <span className="text-[11px] text-[#7A6D6D] font-normal">
                {isAr ? 'رابط الإعلان أو المقال الإخباري الأصلي' : 'URL to press release, local news article, or announcement'}
              </span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-gray-400 absolute top-3 left-3 pointer-events-none" />
                <input
                  type="url"
                  required
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://thepeninsulaqatar.com/article/... or https://gulf-times.com/..."
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || !sourceUrl.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-40 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>{isGenerating ? (isAr ? 'جارِ التوليد...' : 'Generating...') : (isAr ? 'توليد المسودة بالذكاء الاصطناعي' : 'Generate Draft with AI')}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#7A6D6D] mt-1">
              {isAr 
                ? 'يقوم الخادم بقراءة محتوى الرابط وتمريره إلى Gemini API لصياغة مقال تحليلي أصلي.' 
                : 'Triggers a server-side Gemini API call to ingest URL contents, synthesize analytical prose, and save as a draft.'}
            </p>
          </div>

          {/* Optional Context Notes */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#1E1919]">
                {isAr ? 'ملاحظات أو سياق إضافي للحدث (اختياري)' : 'Additional Context or Notes (Optional)'}
              </label>
              <span className="text-[10px] text-[#7A6D6D] font-mono">Optional</span>
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isAr ? 'أدخل أي أرقام أو تفاصيل إضافية غير مذكورة في الرابط (مثل أسماء المستثمرين أو تاريخ الإطلاق)...' : 'Add any additional background, round mechanics, key stakeholder names, or specific angles you want the analysis to highlight...'}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
            />
          </div>

          {/* Category and Author Note Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1E1919] mb-1">
                {isAr ? 'التصنيف الافتراضي' : 'Target Category'}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as NewsCategory)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E1919] mb-1">
                {isAr ? 'ملاحظة الكاتب / المحرر (اختياري)' : 'Author / Editor Note (Optional)'}
              </label>
              <input
                type="text"
                value={authorNote}
                onChange={(e) => setAuthorNote(e.target.value)}
                placeholder="e.g. Analysis by Ventures.qa Intelligence Desk"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
              />
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EBE1]">
            <div className="flex items-center gap-2 text-[11px] text-[#7A6D6D]">
              <EyeOff className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {isAr 
                  ? 'يتم حفظ المسودة في قاعدة البيانات بحالة "draft" وتظل مخفية عن الموقع العام حتى يتم اعتمادها.' 
                  : 'Saves directly with status "draft" in the database; completely hidden from public news feeds until approved.'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !sourceUrl.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8A1538] to-[#6E0D29] hover:from-[#A31942] hover:to-[#8A1538] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>
                {isGenerating 
                  ? (isAr ? 'جارِ تشغيل Gemini API وتوليد المسودة...' : 'Calling Gemini API & Generating Draft...') 
                  : (isAr ? 'توليد المسودة بالذكاء الاصطناعي (Generate Draft with AI)' : 'Generate Draft with AI')}
              </span>
            </button>
          </div>
        </form>

        {/* Progress Alert when calling Gemini API */}
        {isGenerating && (
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2 animate-pulse">
            <div className="flex items-center gap-2 font-bold">
              <RefreshCw className="w-4 h-4 text-[#8A1538] animate-spin" />
              <span>Calling Server-Side Gemini API (models/gemini-3.8-flash)...</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Fetching content from source URL, ensuring 100% original synthesis, generating strategic founder & investor analysis section, formulating bilingual titles, and saving as quarantined draft...
            </p>
          </div>
        )}
      </div>

      {/* SECTION 2: NEWLY GENERATED DRAFT IMMEDIATE PREVIEW CARD */}
      {generatedDraft && (
        <div className="p-6 rounded-2xl bg-emerald-50/50 border-2 border-emerald-400 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-[#1E1919] flex items-center gap-2">
                  <span>{isAr ? 'تم توليد المسودة وحفظها بنجاح' : 'Draft Successfully Generated & Saved to Database'}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-900 font-bold border border-amber-300">
                    STATUS: DRAFT (HIDDEN FROM PUBLIC)
                  </span>
                </h4>
                <p className="text-[11px] text-[#7A6D6D]">
                  {isAr 
                    ? 'هذا المقال غير معروض للجمهور. يمكنك مراجعته الآن أو اعتماده ونشره فوراً.' 
                    : 'This article is hidden from the public feed. You can review/edit it below or approve and publish it immediately.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingDraft(generatedDraft)}
                className="px-3.5 py-1.5 rounded-xl border border-[#D5C9B8] hover:border-[#8A1538] bg-white text-xs font-bold text-[#1E1919] transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#8A1538]" />
                <span>{isAr ? 'مراجعة وتعديل' : 'Review & Edit'}</span>
              </button>

              <button
                onClick={() => handleApprovePublish(generatedDraft.id)}
                className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? 'اعتماد ونشر للجمهور' : 'Approve & Publish Live'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#8A1538]/10 text-[#8A1538]">
                {generatedDraft.category}
              </span>
              <span className="text-[11px] font-mono text-[#7A6D6D]">
                Slug: /news/{generatedDraft.slug}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#1E1919]">
                {generatedDraft.title || generatedDraft.titleEn}
              </h3>
              {generatedDraft.titleAr && (
                <p className="text-sm font-semibold text-[#8A1538] mt-0.5" dir="rtl">
                  {generatedDraft.titleAr}
                </p>
              )}
            </div>

            <p className="text-xs text-[#5A4E4E] leading-relaxed">
              {generatedDraft.summaryEn}
            </p>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] text-xs text-[#1E1919] max-h-44 overflow-y-auto font-sans leading-relaxed whitespace-pre-line">
              {generatedDraft.body}
            </div>

            {generatedDraft.source_links && generatedDraft.source_links.length > 0 && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#7A6D6D] font-mono">
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Source: {generatedDraft.source_links[0].url}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: EDITING DRAFT SUB-FORM */}
      {editingDraft && (
        <div className="p-5 rounded-2xl bg-white border-2 border-[#8A1538] shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#8A1538]" />
              <h4 className="font-bold text-sm text-[#1E1919]">
                {isAr ? 'مراجعة وتعديل المسودة قبل النشر' : 'Review & Edit Article Draft'}
              </h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-900 font-bold">
                STATUS: DRAFT
              </span>
            </div>
            <button 
              onClick={() => setEditingDraft(null)}
              className="text-xs text-[#7A6D6D] hover:text-[#1E1919] px-2.5 py-1 rounded hover:bg-gray-100"
            >
              {isAr ? 'إلغاء' : 'Close Editor'}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#1E1919] mb-1">
                {isAr ? 'العنوان الرئيسي (إنجليزي) *' : 'Article Title (English) *'}
              </label>
              <input
                type="text"
                value={editingDraft.title || editingDraft.titleEn}
                onChange={(e) => setEditingDraft({ ...editingDraft, title: e.target.value, titleEn: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1E1919] mb-1">
                  {isAr ? 'العنوان الرئيسي (عربي)' : 'Article Title (Arabic)'}
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={editingDraft.titleAr || ''}
                  onChange={(e) => setEditingDraft({ ...editingDraft, titleAr: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1919] mb-1">
                  {isAr ? 'الرابط المخصص (Slug)' : 'URL Slug'}
                </label>
                <input
                  type="text"
                  value={editingDraft.slug}
                  onChange={(e) => setEditingDraft({ ...editingDraft, slug: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E1919] mb-1">
                {isAr ? 'الملخص التنفيذي (إنجليزي)' : 'Executive Summary (English)'}
              </label>
              <textarea
                rows={2}
                value={editingDraft.summaryEn || ''}
                onChange={(e) => setEditingDraft({ ...editingDraft, summaryEn: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E1919] mb-1">
                {isAr ? 'نص المقال الكامل (Markdown) *' : 'Full Article Body (Markdown) *'}
              </label>
              <textarea
                rows={8}
                value={editingDraft.body || editingDraft.contentEn || ''}
                onChange={(e) => setEditingDraft({ ...editingDraft, body: e.target.value, contentEn: e.target.value })}
                className="w-full text-xs font-mono p-3 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538] leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1E1919] mb-1">
                  {isAr ? 'التصنيف' : 'Category'}
                </label>
                <select
                  value={editingDraft.category}
                  onChange={(e) => setEditingDraft({ ...editingDraft, category: e.target.value as NewsCategory })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1919] mb-1">
                  {isAr ? 'ملاحظة الكاتب / المحرر' : 'Author / Editor Note'}
                </label>
                <input
                  type="text"
                  value={editingDraft.author_note || editingDraft.authorNote || ''}
                  onChange={(e) => setEditingDraft({ ...editingDraft, author_note: e.target.value, authorNote: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E8DFC8]">
              <button
                type="button"
                onClick={() => handleDeleteDraft(editingDraft.id)}
                className="px-3 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'حذف المسودة' : 'Delete Draft'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveEditDraft}
                  className="px-4 py-2 rounded-xl bg-white border border-[#D5C9B8] hover:border-[#8A1538] text-xs font-bold text-[#1E1919] transition-all"
                >
                  {isAr ? 'حفظ التعديلات' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => handleApprovePublish(editingDraft.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'اعتماد ونشر المقال للجمهور' : 'Approve & Publish Live'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PENDING DRAFTS QUEUE LIST */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#E8DFC8]">
          <div>
            <h4 className="font-bold text-sm text-[#1E1919] flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-[#8A1538]" />
              <span>{isAr ? 'قائمة المسودات قيد الانتظار والمراجعة' : 'Pending Article Drafts Queue'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#8A1538] text-white font-bold">
                {drafts.length}
              </span>
            </h4>
            <p className="text-xs text-[#7A6D6D]">
              {isAr 
                ? 'المسودات في هذه القائمة مخفية تماماً عن الجمهور حتى يتم اعتمادها ونشرها رسمياً.' 
                : 'All drafts below are saved with status "draft" and completely quarantined from public view.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendDigest}
              disabled={isSendingDigest}
              className="px-3.5 py-1.5 rounded-lg border border-[#D5C9B8] hover:border-[#8A1538] bg-white text-xs font-bold text-[#1E1919] transition-all flex items-center gap-1.5"
              title="Send weekly digest email to all subscribers"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isSendingDigest ? (isAr ? 'جارِ الإرسال...' : 'Sending...') : (isAr ? 'إرسال ملخص النشرة' : 'Send Weekly Digest')}</span>
            </button>

            <button
              onClick={fetchDrafts}
              disabled={loadingDrafts}
              className="px-3 py-1.5 rounded-lg border border-[#D5C9B8] hover:border-[#8A1538] bg-white text-xs font-bold text-[#1E1919] transition-all flex items-center gap-1.5"
              title="Refresh drafts queue"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#8A1538] ${loadingDrafts ? 'animate-spin' : ''}`} />
              <span>{isAr ? 'تحديث القائمة' : 'Refresh Queue'}</span>
            </button>
          </div>
        </div>

        {/* Drafts List */}
        {loadingDrafts ? (
          <div className="py-12 text-center text-xs text-[#7A6D6D]">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#8A1538]" />
            <span>{isAr ? 'جارِ تحميل المسودات...' : 'Loading drafts queue...'}</span>
          </div>
        ) : drafts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-[#E8DFC8] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#8A1538] flex items-center justify-center mx-auto border border-[#E8DFC8]">
              <Newspaper className="w-6 h-6" />
            </div>
            <h5 className="font-bold text-sm text-[#1E1919]">
              {isAr ? 'لا توجد مسودات قيد المراجعة حالياً' : 'No Pending Drafts in Queue'}
            </h5>
            <p className="text-xs text-[#7A6D6D] max-w-md mx-auto leading-relaxed">
              {isAr 
                ? 'استخدم النموذج أعلاه لإدخال رابط مصدر وتوليد مسودة مقال بالذكاء الاصطناعي عبر Gemini API.' 
                : 'Use the form above with a source URL to generate and ingest an original analytical news draft with Gemini.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {drafts.map(draft => (
              <div
                key={draft.id}
                className="p-4 rounded-xl bg-white border border-[#E8DFC8] hover:border-[#8A1538] transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8A1538]/10 text-[#8A1538]">
                      {draft.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      <span>DRAFT (HIDDEN)</span>
                    </span>
                    <span className="text-[11px] text-[#7A6D6D] font-mono">
                      /news/{draft.slug}
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-[#1E1919] truncate">
                    {draft.title || draft.titleEn}
                  </h5>

                  {draft.titleAr && (
                    <p className="text-xs font-medium text-[#8A1538] truncate" dir="rtl">
                      {draft.titleAr}
                    </p>
                  )}

                  <p className="text-xs text-[#5A4E4E] line-clamp-1">
                    {draft.summaryEn}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#7A6D6D] pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {draft.published_date || draft.publishedDate}
                    </span>
                    {draft.source_links && draft.source_links.length > 0 && (
                      <a
                        href={draft.source_links[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8A1538] hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Source Link</span>
                      </a>
                    )}
                    {draft.author_note && (
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        Note: {draft.author_note}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0">
                  <button
                    onClick={() => handleDeleteDraft(draft.id)}
                    className="p-2 text-rose-700 hover:bg-rose-50 rounded-lg text-xs transition-colors"
                    title="Delete draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setEditingDraft(draft)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#D5C9B8] hover:border-[#8A1538] text-xs font-bold text-[#1E1919] bg-white transition-all flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#8A1538]" />
                    <span>{isAr ? 'مراجعة وتعديل' : 'Review & Edit'}</span>
                  </button>

                  <button
                    onClick={() => handleApprovePublish(draft.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'اعتماد ونشر' : 'Approve & Publish'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
