import React, { useState, useEffect } from 'react';
import { NewsArticle, Language, NewsComment } from '../types';
import { 
  Newspaper, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  FileText, 
  Calendar, 
  Clock, 
  ExternalLink, 
  MessageSquare, 
  Heart, 
  Share2, 
  Rss, 
  Mail, 
  Search, 
  Check, 
  CheckCircle2, 
  X,
  AlertCircle
} from 'lucide-react';

interface NewsModuleProps {
  language: Language;
  articles: NewsArticle[];
  onSelectEntity?: (entityId: string) => void;
  onRefreshNews?: () => void;
  onArticleSelect?: (article: NewsArticle) => void;
}

export const NewsModule: React.FC<NewsModuleProps> = ({
  language,
  articles: initialArticles,
  onSelectEntity,
  onArticleSelect
}) => {
  const isAr = language === 'ar';

  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const handleArticleClick = (art: NewsArticle) => {
    if (onArticleSelect) {
      onArticleSelect(art);
    } else {
      setActiveArticle(art);
    }
  };
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // Comment state for modal
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentOrg, setCommentOrg] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // RSS Modal state
  const [showRssModal, setShowRssModal] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);

  // Share state
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  const categories = [
    { id: 'all', labelEn: 'All Dispatches', labelAr: 'كافة الأخبار والتقارير' },
    { id: 'spotlight', labelEn: 'Startup Spotlights', labelAr: 'أضواء على الشركات' },
    { id: 'funding', labelEn: 'Funding & Deals', labelAr: 'جولات التمويل والصفقات' },
    { id: 'trends', labelEn: 'Market Trends & Index', labelAr: 'اتجاهات السوق والمؤشر' },
    { id: 'policy', labelEn: 'Policy & Regulation', labelAr: 'السياسات والتنظيمات' },
    { id: 'events', labelEn: 'Events & Summits', labelAr: 'الفعاليات والمؤتمرات' }
  ];

  const filteredArticles = articles.filter(art => {
    const cat = (art.category || '').toLowerCase();
    const sel = selectedCategory.toLowerCase();
    const matchesCategory = sel === 'all' || 
      cat === sel ||
      (sel === 'funding' && cat.includes('fund')) ||
      (sel === 'policy' && (cat.includes('polic') || cat.includes('reg'))) ||
      (sel === 'trends' && (cat.includes('trend') || cat.includes('market'))) ||
      (sel === 'spotlight' && cat.includes('spotlight')) ||
      (sel === 'events' && cat.includes('event'));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      art.titleEn.toLowerCase().includes(q) ||
      art.titleAr?.toLowerCase().includes(q) ||
      (art.title && art.title.toLowerCase().includes(q)) ||
      art.summaryEn.toLowerCase().includes(q) ||
      art.summaryAr?.toLowerCase().includes(q) ||
      (art.author ? art.author.toLowerCase().includes(q) : false)
    );
    return matchesCategory && matchesSearch;
  });

  // Spotlight of the week is the first spotlight article
  const spotlightArticle = articles.find(a => a.isSpotlight);

  const handleLike = async (artId: string) => {
    try {
      const res = await fetch(`/api/news/${artId}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setArticles(prev => prev.map(a => a.id === artId ? { ...a, likesCount: data.likesCount } : a));
        if (activeArticle && activeArticle.id === artId) {
          setActiveArticle(prev => prev ? { ...prev, likesCount: data.likesCount } : null);
        }
      }
    } catch {
      // Fallback local update
      setArticles(prev => prev.map(a => a.id === artId ? { ...a, likesCount: (a.likesCount || 0) + 1 } : a));
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, language })
      });
      if (res.ok) {
        setNewsletterSuccess(true);
        setNewsletterEmail('');
        setTimeout(() => setNewsletterSuccess(false), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle || !commentName || !commentText) return;
    setSubmittingComment(true);

    try {
      const res = await fetch(`/api/news/${activeArticle.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: commentName,
          authorRole: commentRole || 'Market Observer',
          authorOrg: commentOrg,
          comment: commentText
        })
      });

      if (res.ok) {
        const data = await res.json();
        const updatedArticle = { ...activeArticle, comments: data.comments };
        setActiveArticle(updatedArticle);
        setArticles(prev => prev.map(a => a.id === activeArticle.id ? updatedArticle : a));
        setCommentText('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingComment(false);
    }
  };

  const copyArticleLink = (slug: string) => {
    navigator.clipboard.writeText(`https://ventures.qa/news/${slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Module Title & RSS/Newsletter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#8A1538]/10 text-[#8A1538] font-mono">
              {isAr ? 'تغطية إعلامية مستقلة' : 'INDEPENDENT INTELLIGENCE DISPATCH'}
            </span>
            <span className="text-xs text-[#7A6D6D]">
              • {isAr ? 'تحديثات وتحليلات دورية موثقة' : 'Sourced Market Reporting & Spotlights'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'أخبار واستخبارات السوق' : 'News & Startup Spotlights'}
          </h2>
          <p className="text-xs text-[#5A4E4E] max-w-2xl mt-1">
            {isAr
              ? 'تغطية إخبارية مستقلة ومحايدة لصفقات التمويل، وتحديثات اللوائح التنظيمية، وأضواء أسبوعية معمقة على الشركات الصاعدة في دولة قطر.'
              : 'Objective third-party journalism covering private venture deals, regulatory sandbox updates, and weekly editorial spotlights on Qatar scaleups.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRssModal(true)}
            className="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8DFC8] text-[#1E1919] text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Rss className="w-4 h-4 text-[#F59E0B]" />
            <span>{isAr ? 'تغذية RSS 2.0' : 'RSS Feed'}</span>
          </button>
        </div>
      </div>

      {/* Featured Weekly Startup Spotlight Hero */}
      {spotlightArticle && selectedCategory === 'all' && !searchQuery && (
        <div className="relative rounded-2xl bg-gradient-to-br from-[#251D1E] to-[#1E1919] text-white p-6 md:p-8 border border-[#403335] shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8A1538]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#C5A059] text-[#1E1919] flex items-center gap-1.5 shadow-sm font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isAr ? 'أضواء الأسبوع على شركة ناشئة' : 'STARTUP SPOTLIGHT OF THE WEEK'}
                </span>
                <span className="text-xs text-[#E8DFC8]/70 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {spotlightArticle.publishedDate}
                </span>
                <span className="text-xs text-[#E8DFC8]/70 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {spotlightArticle.readTimeMinutes} {isAr ? 'دقائق قراءة' : 'min read'}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                {isAr ? spotlightArticle.titleAr : spotlightArticle.titleEn}
              </h3>

              <p className="text-xs md:text-sm text-[#E8DFC8]/90 leading-relaxed max-w-2xl">
                {isAr ? spotlightArticle.summaryAr : spotlightArticle.summaryEn}
              </p>

              {/* Spotlight Stats Strip */}
              {spotlightArticle.spotlightStats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {spotlightArticle.spotlightStats.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] text-[#C5A059] block font-medium">{st.label}</span>
                      <strong className="text-base font-black text-white font-mono mt-0.5 block">{st.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleArticleClick(spotlightArticle)}
                  className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#A31942] text-white text-xs font-bold transition-colors shadow-md flex items-center gap-2"
                >
                  <span>{isAr ? 'قراءة التحقيق الصحفي الكامل' : 'Read Full Editorial Spotlight'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {spotlightArticle.spotlightCompanyId && onSelectEntity && (
                  <button
                    onClick={() => onSelectEntity(spotlightArticle.spotlightCompanyId!)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/15 flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{isAr ? 'عرض الملف التعريفي للشركة' : 'View Company Profile in Directory'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Sourced Badge Box */}
            <div className="p-5 rounded-2xl bg-[#2D2425] border border-[#403335] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'معايير النشر المستقلة' : 'SOURCED REPORTING STANDARD'}</span>
              </div>
              <p className="text-xs text-[#A69999] leading-relaxed">
                {isAr
                  ? 'هذا التقرير الصحفي تم إعداده استناداً لإفصاحات الشركة للصحافة ومؤشرات المعاملات العامة دون أي رعاية مدفوعة.'
                  : 'This editorial spotlight is prepared independently based on verified merchant disclosures, public filings, and founder interviews. Zero paid placement.'}
              </p>
              <div className="pt-2 border-t border-[#403335] flex items-center justify-between text-[11px] text-[#A69999]">
                <span>{spotlightArticle.author}</span>
                <span className="font-mono">{spotlightArticle.likesCount} {isAr ? 'إعجاب' : 'likes'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#8A1538] text-white shadow-sm'
                  : 'bg-white hover:bg-[#FAF8F5] text-[#5A4E4E] border border-[#E8DFC8]'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-[#7A6D6D] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث في الأخبار والمقالات...' : 'Search dispatches, founders, trends...'}
            className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => {
          const cat = (article.category || '').toLowerCase();
          let categoryBadgeColor = 'bg-gray-100 text-gray-800 border-gray-200';
          if (cat.includes('spotlight')) categoryBadgeColor = 'bg-[#C5A059]/15 text-[#8A1538] border-[#C5A059]/40';
          else if (cat.includes('fund')) categoryBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
          else if (cat.includes('trend') || cat.includes('market')) categoryBadgeColor = 'bg-blue-50 text-blue-800 border-blue-200';
          else if (cat.includes('polic') || cat.includes('reg')) categoryBadgeColor = 'bg-purple-50 text-purple-800 border-purple-200';
          else if (cat.includes('event')) categoryBadgeColor = 'bg-amber-50 text-amber-800 border-amber-200';

          return (
            <article
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className="group bg-white rounded-2xl border border-[#E8DFC8] hover:border-[#8A1538] hover:shadow-lg transition-all p-5 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryBadgeColor} font-mono`}>
                    {article.category}
                  </span>
                  <span className="text-[11px] text-[#7A6D6D] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {article.readTimeMinutes} min
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1E1919] group-hover:text-[#8A1538] transition-colors leading-snug line-clamp-2">
                  {isAr && article.titleAr ? article.titleAr : (article.title || article.titleEn)}
                </h3>

                <p className="text-xs text-[#5A4E4E] leading-relaxed line-clamp-3">
                  {isAr ? article.summaryAr : article.summaryEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#FAF8F5] space-y-3">
                {/* Source Citation Snippet */}
                <div className="flex items-center gap-1.5 text-[10px] text-[#7A6D6D] bg-[#FAF8F5] p-2 rounded-lg border border-[#E8DFC8]/60">
                  <FileText className="w-3 h-3 text-[#8A1538] shrink-0" />
                  <span className="truncate">
                    {isAr ? 'المصدر: ' : 'Source: '}{article.sourceCitation}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#7A6D6D]">
                  <span className="text-[11px] font-medium">{article.publishedDate}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] hover:text-[#8A1538]">
                      <Heart className="w-3.5 h-3.5" />
                      {article.likesCount}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {article.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 p-8 rounded-2xl bg-white border border-[#E8DFC8]">
          <AlertCircle className="w-10 h-10 text-[#7A6D6D] mx-auto mb-2" />
          <h4 className="text-sm font-bold text-[#1E1919]">
            {isAr ? 'لم يتم العثور على مقالات مطابقة' : 'No articles matching your criteria'}
          </h4>
          <p className="text-xs text-[#7A6D6D] mt-1">
            {isAr ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة.' : 'Try adjusting your search terms or select another category.'}
          </p>
        </div>
      )}

      {/* Weekly Intelligence Newsletter Subscription Banner */}
      <div className="rounded-2xl bg-[#8A1538] text-white p-6 md:p-8 relative overflow-hidden shadow-lg">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#C5A059]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] font-mono">
              VENTURES.QA WEEKLY DISPATCH
            </span>
          </div>
          <h3 className="text-2xl font-black">
            {isAr ? 'اشترك في النشرة الاستخباراتية الأسبوعية' : 'The Independent Qatar Venture Capital Brief'}
          </h3>
          <p className="text-xs text-white/90 leading-relaxed">
            {isAr
              ? 'احصل على ملخص تحليلي أسبوعي يضم صفقات التمويل الجديدة، وأضواء على الشركات الصاعدة، ورؤى مؤشر رأس المال الخاص (QPCI) مباشرة في بريدك.'
              : 'Every Monday morning: verified Qatari funding rounds, regulatory changes, startup spotlights, and QPCI index metrics delivered directly to 2,400+ investors and founders.'}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="name@firm.qa"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white text-[#1E1919] text-xs placeholder:text-[#7A6D6D] focus:outline-none"
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#1E1919] text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
            >
              {newsletterLoading
                ? (isAr ? 'جاري الاشتراك...' : 'Subscribing...')
                : (isAr ? 'اشتراك مجاني' : 'Subscribe Free')}
            </button>
          </form>

          {newsletterSuccess && (
            <div className="flex items-center gap-2 text-xs text-emerald-200 font-semibold pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>
                {isAr ? 'تم تأكيد اشتراكك بنجاح! ستصلك النشرة القادمة يوم الاثنين.' : 'Subscription confirmed! The next edition will arrive Monday morning.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-3xl shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#8A1538] text-white p-6 relative shrink-0">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-white/80 hover:text-white bg-black/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pr-8 rtl:pr-0 rtl:pl-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C5A059] text-[#1E1919] font-mono">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-white/80">{activeArticle.publishedDate}</span>
                  <span className="text-xs text-white/80">• {activeArticle.readTimeMinutes} min read</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black leading-tight">
                  {isAr ? activeArticle.titleAr : activeArticle.titleEn}
                </h2>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span>{isAr ? 'بقلم: ' : 'By '}{activeArticle.author}</span>
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Sourced Disclaimer Notice */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-between text-xs text-[#5A4E4E]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8A1538] shrink-0" />
                  <span>
                    <strong>{isAr ? 'التحقق والمصدر: ' : 'Reporting Source: '}</strong>
                    {activeArticle.sourceCitation}
                  </span>
                </div>
                {activeArticle.sourceUrl && (
                  <a
                    href={activeArticle.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8A1538] font-bold hover:underline shrink-0 flex items-center gap-1"
                  >
                    <span>{isAr ? 'البيان الرسمي' : 'Public Notice'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Spotlight Stats (if applicable) */}
              {activeArticle.spotlightStats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#251D1E] text-white">
                  {activeArticle.spotlightStats.map((st, i) => (
                    <div key={i} className="text-center">
                      <span className="text-[10px] text-[#C5A059] block">{st.label}</span>
                      <strong className="text-sm font-black font-mono block mt-0.5">{st.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              {/* Full Article Content */}
              <div className="prose prose-sm max-w-none text-[#1E1919] leading-relaxed space-y-4 text-xs md:text-sm whitespace-pre-line">
                {isAr ? activeArticle.contentAr : activeArticle.contentEn}
              </div>

              {/* Article Actions Bar */}
              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(activeArticle.id)}
                    className="px-3.5 py-1.5 rounded-xl border border-[#E8DFC8] hover:bg-[#FAF8F5] text-xs font-bold text-[#8A1538] flex items-center gap-1.5 transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{activeArticle.likesCount} {isAr ? 'إعجاب' : 'Likes'}</span>
                  </button>

                  <button
                    onClick={() => copyArticleLink(activeArticle.slug)}
                    className="px-3 py-1.5 rounded-xl border border-[#E8DFC8] hover:bg-[#FAF8F5] text-xs font-semibold text-[#5A4E4E] flex items-center gap-1.5 transition-colors"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? (isAr ? 'تم نسخ الرابط' : 'Link Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
                  </button>
                </div>

                {activeArticle.spotlightCompanyId && onSelectEntity && (
                  <button
                    onClick={() => {
                      const cid = activeArticle.spotlightCompanyId!;
                      setActiveArticle(null);
                      onSelectEntity(cid);
                    }}
                    className="text-xs text-[#8A1538] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{isAr ? 'عرض بيانات الشركة' : 'View in Directory'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Comments & Discussion Section */}
              <div className="pt-6 border-t border-[#E8DFC8] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1E1919] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#8A1538]" />
                    <span>
                      {isAr ? 'النقاش والآراء المهنية' : 'Professional Community Discussion'} ({activeArticle.comments?.length || 0})
                    </span>
                  </h4>
                </div>

                {/* Comment List */}
                <div className="space-y-3">
                  {activeArticle.comments && activeArticle.comments.length > 0 ? (
                    activeArticle.comments.map(c => (
                      <div key={c.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <strong className="font-bold text-[#1E1919]">{c.authorName}</strong>
                            <span className="text-[11px] text-[#7A6D6D]">
                              • {c.authorRole}{c.authorOrg ? ` at ${c.authorOrg}` : ''}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#7A6D6D] font-mono">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[#5A4E4E] leading-relaxed">{c.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#7A6D6D] italic">
                      {isAr ? 'لا توجد تعليقات حتى الآن. كن أول من يشارك برأيه المهني.' : 'No comments yet. Share your market perspective below.'}
                    </p>
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="pt-3 border-t border-[#FAF8F5] space-y-3">
                  <span className="text-xs font-bold text-[#1E1919] block">
                    {isAr ? 'إضافة تعليق مهني' : 'Add Your Market Perspective'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder={isAr ? 'الاسم الكامل *' : 'Your Name *'}
                      className="px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                    <input
                      type="text"
                      value={commentRole}
                      onChange={(e) => setCommentRole(e.target.value)}
                      placeholder={isAr ? 'المسمى الوظيفي' : 'Role (e.g. Partner, Founder)'}
                      className="px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                    <input
                      type="text"
                      value={commentOrg}
                      onChange={(e) => setCommentOrg(e.target.value)}
                      placeholder={isAr ? 'المؤسسة' : 'Organization'}
                      className="px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={isAr ? 'اكتب رأيك أو تحليلك هنا...' : 'Write your perspective or question...'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submittingComment}
                      className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      {submittingComment
                        ? (isAr ? 'جاري النشر...' : 'Posting...')
                        : (isAr ? 'نشر التعليق' : 'Post Comment')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RSS 2.0 Feed Modal */}
      {showRssModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-md shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRssModal(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-[#7A6D6D] hover:text-[#1E1919]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center">
                <Rss className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#1E1919]">
                {isAr ? 'تغذية RSS 2.0 المباشرة' : 'Ventures.qa RSS 2.0 Feed'}
              </h3>
            </div>

            <p className="text-xs text-[#5A4E4E] leading-relaxed mb-4">
              {isAr
                ? 'استخدم رابط التغذية القياسي هذا للاشتراك عبر قارئ الأخبار المفضل لديك أو أتمتة دمج الأخبار في منصتك.'
                : 'Subscribe to our machine-readable RSS 2.0 XML endpoint in Feedly, NetNewsWire, or your automated Slack / email integrations.'}
            </p>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-between gap-2 font-mono text-xs text-[#1E1919] mb-4">
              <span className="truncate">https://ventures.qa/rss.xml</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://ventures.qa/rss.xml');
                  setCopiedRss(true);
                  setTimeout(() => setCopiedRss(false), 2000);
                }}
                className="px-2.5 py-1 rounded bg-[#8A1538] text-white font-sans text-xs font-bold shrink-0"
              >
                {copiedRss ? (isAr ? 'تم النسخ' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}
              </button>
            </div>

            <div className="flex justify-end">
              <a
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8A1538] font-bold hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'فتح ملف XML مباشرة' : 'Open XML in New Tab'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
