import React, { useState, useEffect } from 'react';
import { NewsArticle, Language, EntityProfile } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Share2, 
  ThumbsUp, 
  ExternalLink, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Bookmark, 
  MessageSquare, 
  Send, 
  FileText, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Tag,
  AlertCircle
} from 'lucide-react';

interface ArticlePageProps {
  article: NewsArticle;
  language: Language;
  directoryEntities: EntityProfile[];
  onBackToNews: () => void;
  onOpenEntityModal: (entity: EntityProfile) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  language,
  directoryEntities,
  onBackToNews,
  onOpenEntityModal
}) => {
  const isAr = language === 'ar';
  const BackArrow = isAr ? ArrowRight : ArrowLeft;
  
  const [likes, setLikes] = useState(article.likesCount || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Comments state
  const [comments, setComments] = useState(article.comments || []);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Synchronize SEO Title & Meta Description
  useEffect(() => {
    const originalTitle = document.title;
    const currentTitle = isAr && article.titleAr ? article.titleAr : (article.title || article.titleEn);
    document.title = `${currentTitle} | Ventures.qa News & Spotlights`;

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDesc = isAr && article.summaryAr ? article.summaryAr : article.summaryEn;
    
    if (metaDesc && newDesc) {
      metaDesc.setAttribute('content', newDesc);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, [article, isAr]);

  const handleLike = async () => {
    if (hasLiked) return;
    setLikes(prev => prev + 1);
    setHasLiked(true);
    try {
      const res = await fetch(`/api/news/${article.id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likesCount);
      }
    } catch {
      // Keep optimistic update
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/news/${article.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: authorName.trim(),
          authorRole: authorRole.trim() || (isAr ? 'متابع للمنظومة' : 'Ecosystem Observer'),
          comment: commentText.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
        setCommentText('');
        setAuthorName('');
        setAuthorRole('');
        setCommentSuccess(true);
        setTimeout(() => setCommentSuccess(false), 3000);
      }
    } catch (e) {
      console.error('Failed to submit comment:', e);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Detect and link related Directory entities
  const relatedEntities = React.useMemo(() => {
    const matched = new Set<EntityProfile>();
    
    // Check explicit relatedEntityIds or spotlightCompanyId
    if (article.relatedEntityIds && Array.isArray(article.relatedEntityIds)) {
      for (const id of article.relatedEntityIds) {
        const ent = directoryEntities.find(e => e.id === id || e.slug === id);
        if (ent) matched.add(ent);
      }
    }
    if (article.spotlightCompanyId) {
      const ent = directoryEntities.find(e => e.id === article.spotlightCompanyId);
      if (ent) matched.add(ent);
    }

    // Auto-detect by entity names mentioned in title or body
    const fullText = `${article.title || article.titleEn} ${article.body || article.contentEn || ''}`;
    for (const ent of directoryEntities) {
      const nameRegex = new RegExp(`\\b${ent.name}\\b`, 'i');
      if (nameRegex.test(fullText)) {
        matched.add(ent);
      }
    }

    return Array.from(matched);
  }, [article, directoryEntities]);

  // Category styling
  const cat = (article.category || '').toLowerCase();
  let categoryColor = 'bg-gray-100 text-gray-800 border-gray-200';
  if (cat.includes('spotlight')) categoryColor = 'bg-[#C5A059]/15 text-[#8A1538] border-[#C5A059]/40';
  else if (cat.includes('fund')) categoryColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  else if (cat.includes('trend') || cat.includes('market')) categoryColor = 'bg-blue-50 text-blue-800 border-blue-200';
  else if (cat.includes('polic') || cat.includes('reg')) categoryColor = 'bg-purple-50 text-purple-800 border-purple-200';
  else if (cat.includes('event')) categoryColor = 'bg-amber-50 text-amber-800 border-amber-200';

  const rawBody = (isAr && article.contentAr ? article.contentAr : (article.body || article.contentEn || ''));
  const sourceLinks = article.source_links || article.sourceLinks || (article.sourceUrl ? [{ name: article.sourceCitation || 'Primary Source', url: article.sourceUrl }] : []);
  const authorNote = article.author_note || article.authorNote;

  // Split markdown body to separate special analysis callout if present
  const renderFormattedBody = (text: string) => {
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map((para, idx) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      // Check if this paragraph is the "Analysis for Qatari Founders / Investors" section
      const isAnalysisHeader = trimmed.toLowerCase().includes('analysis') || 
                               trimmed.toLowerCase().includes('what this means') || 
                               trimmed.includes('ماذا يعني هذا للمؤسسين') ||
                               trimmed.includes('التحليل للمستثمرين');
      
      const isSourcesLine = trimmed.toLowerCase().startsWith('sources:') || 
                            trimmed.toLowerCase().startsWith('source:') ||
                            trimmed.startsWith('المصادر:');

      if (isSourcesLine) {
        // Sourced attribution paragraph
        return (
          <div key={idx} className="my-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-between gap-4 text-xs font-mono text-[#5A4E4E]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8A1538]" />
              <span className="font-bold">{isAr ? 'المصدر الموثق:' : 'Verified Source:'}</span>
              <span>{trimmed.replace(/^sources?:\s*/i, '').replace(/^المصادر?:\s*/i, '')}</span>
            </div>
            {sourceLinks.length > 0 && (
              <a 
                href={sourceLinks[0].url} 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-[#8A1538] hover:underline flex items-center gap-1 font-bold"
              >
                <span>{isAr ? 'عرض المصدر الأصلي' : 'View Source'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        );
      }

      if (isAnalysisHeader || (idx > 0 && trimmed.toLowerCase().startsWith('### analysis') || trimmed.toLowerCase().startsWith('**analysis'))) {
        return (
          <div key={idx} className="my-8 p-6 rounded-2xl bg-gradient-to-br from-[#8A1538]/5 via-[#C5A059]/10 to-[#8A1538]/5 border-2 border-[#C5A059]/40 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#8A1538]" />
              <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-[#8A1538]">
                {isAr ? 'تحليل الأثر: للمؤسسين والمستثمرين في قطر' : 'Ecosystem Impact: What This Means for Qatari Founders & Investors'}
              </h4>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#1E1919] font-medium">
              {trimmed.replace(/^###\s*/, '').replace(/^\*\*Analysis.*?\*\*:\s*/i, '')}
            </p>
          </div>
        );
      }

      // Check header
      if (trimmed.startsWith('###')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-[#1E1919] mt-6 mb-2">
            {trimmed.replace(/^###\s*/, '')}
          </h3>
        );
      }
      if (trimmed.startsWith('##')) {
        return (
          <h2 key={idx} className="text-xl font-black text-[#1E1919] mt-8 mb-3">
            {trimmed.replace(/^##\s*/, '')}
          </h2>
        );
      }

      return (
        <p key={idx} className="text-base leading-relaxed text-[#2D2424] mb-5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8DFC8]">
        <button
          onClick={onBackToNews}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A1538] hover:text-[#6E0D29] transition-colors py-2 px-3 rounded-lg hover:bg-[#8A1538]/5"
        >
          <BackArrow className="w-4 h-4" />
          <span>{isAr ? 'العودة إلى الأخبار والأضواء' : 'Back to News & Spotlights'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#7A6D6D] font-mono">
          <span>Ventures.qa</span>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-[#C5A059]" />
          <span>{article.category}</span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="bg-white rounded-2xl border border-[#E8DFC8] shadow-sm p-6 sm:p-10 mb-10">
        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border font-mono ${categoryColor}`}>
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#FAF8F5] border border-[#E8DFC8] text-[#5A4E4E] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{article.readTimeMinutes || 4} {isAr ? 'دقائق قراءة' : 'min read'}</span>
            </span>
            <span className="text-xs text-[#7A6D6D] font-mono">
              {article.published_date || article.publishedDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                hasLiked 
                  ? 'bg-[#8A1538] text-white border-[#8A1538]' 
                  : 'bg-white hover:bg-[#FAF8F5] text-[#1E1919] border-[#E8DFC8]'
              }`}
              title="Like this analysis"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-[#E8DFC8] bg-white hover:bg-[#FAF8F5] text-[#1E1919] text-xs font-bold transition-all flex items-center gap-1.5"
              title="Share article URL"
            >
              <Share2 className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* Article Headline */}
        <h1 className="text-2xl sm:text-4xl font-black text-[#1E1919] tracking-tight leading-tight mb-4">
          {isAr && article.titleAr ? article.titleAr : (article.title || article.titleEn)}
        </h1>

        {/* Executive Summary Briefing */}
        {(article.summaryEn || article.summaryAr) && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#8A1538] mb-8 text-[#5A4E4E] text-base leading-relaxed font-medium">
            {isAr && article.summaryAr ? article.summaryAr : article.summaryEn}
          </div>
        )}

        {/* Author Byline & Optional Editor Note */}
        <div className="flex items-center justify-between border-y border-[#E8DFC8] py-3.5 mb-8 text-xs text-[#7A6D6D]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#8A1538] text-white flex items-center justify-center font-bold text-xs font-mono">
              V
            </div>
            <div>
              <span className="font-bold text-[#1E1919]">{article.author || 'Ventures.qa Intelligence Desk'}</span>
              <span className="block text-[11px] text-[#7A6D6D]">{isAr ? 'تحليل مستقل لرأس المال الاستثماري' : 'Independent Venture Intelligence'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {isAr ? 'تقرير موثق' : 'Sourced & Verified'}
            </span>
          </div>
        </div>

        {/* Optional Author Note */}
        {authorNote && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">{isAr ? 'ملاحظة المحرر:' : 'Editor\'s Note:'}</span>
              <span>{authorNote}</span>
            </div>
          </div>
        )}

        {/* Main Body Content */}
        <div className="prose prose-stone max-w-none text-[#1E1919]">
          {renderFormattedBody(rawBody)}
        </div>

        {/* Source Links List */}
        {sourceLinks.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#E8DFC8]">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[#7A6D6D] mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>{isAr ? 'روابط ومراجع المصادر المعتمدة' : 'Official Source Links & Citations'}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {sourceLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E8DFC8] bg-[#FAF8F5] hover:bg-[#F2ECE4] text-xs font-medium text-[#8A1538] hover:border-[#8A1538] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{link.name || link.url}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* --- RELATED DIRECTORY ENTITIES (CRITICAL USER REQUIREMENT) --- */}
      {relatedEntities.length > 0 && (
        <section className="mb-10 bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8A1538]/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-[#8A1538]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1E1919]">
                  {isAr ? 'الكيانات المذكورة في الدليل الوطني' : 'Related Entities in Directory'}
                </h3>
                <p className="text-xs text-[#7A6D6D]">
                  {isAr ? 'انقر على أي كيان للاطلاع على سجله التجاري، جولات التمويل، وبيانات الاتصال' : 'Entities mentioned in this reporting with verified directory profiles'}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8DFC8] text-xs font-mono font-bold text-[#8A1538]">
              {relatedEntities.length} {isAr ? 'كيان' : 'Entities'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {relatedEntities.map(entity => (
              <div
                key={entity.id}
                onClick={() => onOpenEntityModal(entity)}
                className="group p-4 rounded-xl border border-[#E8DFC8] hover:border-[#8A1538] bg-[#FAF8F5] hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DFC8] flex items-center justify-center font-bold text-xs text-[#8A1538] font-mono shadow-sm">
                        {entity.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1E1919] group-hover:text-[#8A1538] transition-colors flex items-center gap-1.5">
                          <span>{entity.name}</span>
                          {entity.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </h4>
                        <span className="text-[11px] text-[#7A6D6D]">{entity.sector}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C5A059]/20 text-[#8A1538] border border-[#C5A059]/30">
                      {entity.stage}
                    </span>
                  </div>

                  <p className="text-xs text-[#5A4E4E] line-clamp-2 mb-3">
                    {entity.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E8DFC8]/60 text-xs font-bold text-[#8A1538]">
                  <span>{isAr ? 'عرض الملف الكامل' : 'View Full Profile'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- COMMENTS & PERSPECTIVES DISCUSSION --- */}
      <section className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-[#8A1538]" />
            <h3 className="text-base sm:text-lg font-bold text-[#1E1919]">
              {isAr ? 'مناقشات ورؤى المنظومة' : 'Ecosystem Perspectives & Discussion'}
            </h3>
          </div>
          <span className="text-xs font-mono text-[#7A6D6D]">
            {comments.length} {isAr ? 'مساهمة' : 'Contributions'}
          </span>
        </div>

        {/* Existing Comments */}
        <div className="space-y-4 mb-8">
          {comments.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-dashed border-[#E8DFC8] text-center text-xs text-[#7A6D6D]">
              {isAr 
                ? 'كن أول من يشارك برأيه حول أثر هذا التقرير على السوق القطري.' 
                : 'No comments yet. Be the first founder or investor to contribute a perspective on this report.'}
            </div>
          ) : (
            comments.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#1E1919]">{c.authorName}</span>
                    <span className="text-[11px] text-[#7A6D6D] font-mono">({c.authorRole}{c.authorOrg ? ` · ${c.authorOrg}` : ''})</span>
                  </div>
                  <span className="text-[10px] text-[#7A6D6D] font-mono">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#2D2424] leading-relaxed">
                  {c.comment}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Add Perspective Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3 pt-4 border-t border-[#E8DFC8]">
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[#7A6D6D]">
            {isAr ? 'أضف رؤيتك الاستثمارية أو التشغيلية' : 'Add Ecosystem Perspective'}
          </h4>

          {commentSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
              {isAr ? 'تمت إضافة مشاركتك بنجاح!' : 'Your perspective has been posted successfully!'}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={isAr ? 'الاسم الكامل *' : 'Your Full Name *'}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
            />
            <input
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder={isAr ? 'الصفة / المنظمة (مثال: مستثمر ملاك)' : 'Role / Organization (e.g. Angel Investor)'}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
            />
          </div>

          <textarea
            required
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={isAr ? 'اكتب تحليلك أو تعليقك هنا...' : 'Share your objective insight or perspective on this development...'}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingComment}
              className="px-5 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingComment ? (isAr ? 'جارِ النشر...' : 'Publishing...') : (isAr ? 'إرسال المشاركة' : 'Post Perspective')}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
