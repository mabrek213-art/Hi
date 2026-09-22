import React, { useState, useEffect } from 'react';
import { Language, PlatformAnalytics, NewsArticle, EntityProfile } from '../types';
import { 
  X, 
  ShieldCheck, 
  Users, 
  Handshake, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BarChart2, 
  Building2, 
  TrendingUp,
  FileCheck,
  Zap,
  Sparkles,
  Newspaper
} from 'lucide-react';
import { AdminDraftsSection } from './AdminDraftsSection';

interface AdminDashboardModalProps {
  analytics: PlatformAnalytics;
  language: Language;
  onClose: () => void;
  onApproveClaim?: (id: string) => void;
  onApproveIntro?: (id: string) => void;
  onArticlePublished?: (article: NewsArticle) => void;
  directoryEntities?: EntityProfile[];
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  analytics,
  language,
  onClose,
  onArticlePublished,
  directoryEntities = []
}) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'overview' | 'drafts' | 'new_draft' | 'claims' | 'intros' | 'fees'>('drafts');

  // Drafts Count for sub-navigation badge
  const [draftsCount, setDraftsCount] = useState<number>(0);

  // Action status toasts for non-draft actions (claims/intros)
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Simulated live moderation queue
  const [claimRequests, setClaimRequests] = useState([
    { id: 'clm-1', entity: 'Snoonu', email: 'hamad@snoonu.com', cr: 'CR-104928/QA', status: 'verified', date: 'Today, 10:14 AM' },
    { id: 'clm-2', entity: 'SkipCash', email: 'mohammed@skipcash.app', cr: 'CR-139021/QA', status: 'pending', date: 'Yesterday' },
    { id: 'clm-3', entity: 'Avey AI Health', email: 'm.hammad@avey.ai', cr: 'QSTP-LLC-204', status: 'pending', date: '2 days ago' }
  ]);

  const [dealIntros, setDealIntros] = useState([
    { id: 'int-1', target: 'UrbanPoint Growth', requester: 'Rasameel Investment Fund', check: '$1M - $2M', status: 'moderated_approved', date: 'Today' },
    { id: 'int-2', target: 'Droobi Health', requester: 'Qatar Angels Syndicate', check: '$500K', status: 'pending_review', date: 'Today' },
    { id: 'int-3', target: 'Cwallet FinTech', requester: 'Al Rayyan Family Office', check: '$1.5M', status: 'in_negotiation', date: '3 days ago' }
  ]);

  // Fetch pending drafts count for header badge
  const fetchDraftsCount = async () => {
    try {
      const res = await fetch('/api/admin/news/drafts');
      if (res.ok) {
        const data = await res.json();
        setDraftsCount((data.drafts || []).length);
      }
    } catch (e) {
      console.error('Error fetching drafts count:', e);
    }
  };

  useEffect(() => {
    fetchDraftsCount();
  }, []);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-5xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Maroon Admin Banner */}
        <div className="bg-[#8A1538] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-white/80 hover:text-white rounded-full bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-7 h-7 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">
                  {isAr ? 'إدارة المنظومة وخط إنتاج الأخبار' : 'Ventures.qa Admin & Content Pipeline'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#C5A059] text-[#1E1919] font-bold">
                  EDITORIAL CONTROL
                </span>
              </div>
              <p className="text-xs text-white/80">
                {isAr ? 'إدارة مسودات الأخبار، توليد المحتوى بالذكاء الاصطناعي، توثيق الكيانات' : 'News drafts queue, Gemini AI ingestion, profile verification, and newsletter dispatch'}
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5 border-t border-white/20 pt-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: 'drafts', labelEn: 'Article Ingestion & Drafts', labelAr: 'المسودات وتوليد الذكاء الاصطناعي', badge: draftsCount },
                { id: 'overview', labelEn: 'Ecosystem Analytics', labelAr: 'مؤشرات المنظومة' },
                { id: 'claims', labelEn: 'Profile Claims Queue', labelAr: 'طلبات توثيق الكيانات' },
                { id: 'intros', labelEn: 'Deal Introductions', labelAr: 'وساطة الصفقات والتعارف' },
                { id: 'fees', labelEn: 'Success Fee Ledger', labelAr: 'سجل رسوم النجاح' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id === 'drafts') fetchDraftsCount();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-white text-[#8A1538]'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      activeTab === tab.id ? 'bg-[#8A1538] text-white' : 'bg-[#C5A059] text-[#1E1919] font-bold'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Action Button to Trigger AI Draft Flow */}
            <button
              onClick={() => setActiveTab('new_draft')}
              className="px-3.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#d8b56e] text-[#1E1919] text-xs font-bold transition-all shadow flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>{isAr ? 'توليد مسودة بالذكاء الاصطناعي (Gemini)' : 'Generate AI Draft from URL'}</span>
            </button>
          </div>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div className={`px-6 py-2.5 text-xs font-semibold flex items-center justify-between border-b ${
            statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}>
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="opacity-70 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm bg-[#FAF8F5]/30">
          
          {/* TAB: ARTICLE INGESTION & DRAFTS (ADMIN DRAFTS SECTION) */}
          {(activeTab === 'drafts' || activeTab === 'new_draft') && (
            <AdminDraftsSection
              language={language}
              directoryEntities={directoryEntities as any}
              onArticlePublished={(article) => {
                fetchDraftsCount();
                if (onArticlePublished) onArticlePublished(article);
              }}
              onDraftGenerated={() => {
                fetchDraftsCount();
              }}
            />
          )}

          {/* TAB 1: ECOSYSTEM ANALYTICS OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                  <span className="text-xs text-[#7A6D6D] block">{isAr ? 'إجمالي الكيانات الموثقة' : 'Verified Entities'}</span>
                  <p className="text-2xl font-black font-mono text-[#8A1538] mt-1">{directoryEntities.length || analytics.totalEntitiesListed}</p>
                  <span className="text-[11px] text-emerald-700 font-semibold">{analytics.verifiedClaimPercentage}% Claimed</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                  <span className="text-xs text-[#7A6D6D] block">{isAr ? 'الصفقات قيد التوفيق' : 'Active Deal Mandates'}</span>
                  <p className="text-2xl font-black font-mono text-[#1E1919] mt-1">{analytics.activeDealFlowMandates}</p>
                  <span className="text-[11px] text-[#7A6D6D]">QAR 420M+ Pipeline</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                  <span className="text-xs text-[#7A6D6D] block">{isAr ? 'طلبات التعارف الميسرة' : 'Moderated Intros'}</span>
                  <p className="text-2xl font-black font-mono text-[#1E1919] mt-1">{analytics.facilitatedIntroductions}</p>
                  <span className="text-[11px] text-emerald-700 font-semibold">100% Non-Spam SLA</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                  <span className="text-xs text-[#7A6D6D] block">{isAr ? 'المسودات قيد المراجعة' : 'Pending Drafts'}</span>
                  <p className="text-2xl font-black font-mono text-amber-700 mt-1">{draftsCount}</p>
                  <span className="text-[11px] text-[#7A6D6D]">AI Content Pipeline</span>
                </div>

              </div>

              {/* Operational Audit Log */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A1538]">
                  {isAr ? 'سجل العمليات والتدقيق الحديث' : 'Operational Activity Stream'}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE1]">
                    <span className="text-[#1E1919]">AI Draft generated from Snoonu corporate announcement</span>
                    <span className="font-mono text-[#7A6D6D]">Auto-saved to Drafts</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE1]">
                    <span className="text-[#1E1919]">SkipCash Pre-Series A intro request forwarded to Rasameel</span>
                    <span className="font-mono text-[#7A6D6D]">Approved</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1E1919]">Avey AI Health CR Certificate verified against MoCI Registry</span>
                    <span className="font-mono text-emerald-700 font-bold">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE CLAIMS QUEUE */}
          {activeTab === 'claims' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A1538] mb-1">
                  {isAr ? 'قائمة توثيق ملكية الكيانات (CR Verification)' : 'Commercial Registration Verification Queue'}
                </h4>
                <p className="text-xs text-[#5A4E4E]">
                  {isAr 
                    ? 'يتم التحقق من رقم السجل التجاري (CR) وعنوان البريد الإلكتروني للمؤسس قبل منح شارة التوثيق الذهبية.' 
                    : 'Founders must submit valid MoCI Commercial Registration numbers to claim and administer profiles.'}
                </p>
              </div>

              <div className="space-y-3">
                {claimRequests.map(claim => (
                  <div key={claim.id} className="p-4 rounded-xl bg-white border border-[#E8DFC8] flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1E1919]">{claim.entity}</span>
                        <span className="font-mono text-xs text-[#7A6D6D]">({claim.cr})</span>
                      </div>
                      <span className="text-xs text-[#5A4E4E] block">Claimant: {claim.email}</span>
                      <span className="text-[11px] text-[#7A6D6D] font-mono">{claim.date}</span>
                    </div>

                    <div>
                      {claim.status === 'verified' ? (
                        <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => setClaimRequests(prev => prev.map(c => c.id === claim.id ? { ...c, status: 'verified' } : c))}
                          className="px-3 py-1.5 rounded-lg bg-[#8A1538] text-white text-xs font-bold hover:bg-[#6E0D29] transition-all"
                        >
                          Approve Claim
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DEAL INTRODUCTIONS */}
          {activeTab === 'intros' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A1538] mb-1">
                  {isAr ? 'وساطة الصفقات وتسهيل التعارف' : 'Bespoke Deal Introduction Queue'}
                </h4>
                <p className="text-xs text-[#5A4E4E]">
                  {isAr 
                    ? 'فحص خلفيات المستثمرين المتقدمين لطلب التعارف مع الشركات الناشئة لضمان الجدية ومنع الرسائل غير المرغوبة.' 
                    : 'Institutional investor accreditation check before dispatching warm introductions.'}
                </p>
              </div>

              <div className="space-y-3">
                {dealIntros.map(intro => (
                  <div key={intro.id} className="p-4 rounded-xl bg-white border border-[#E8DFC8] flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="font-bold text-[#1E1919]">{intro.target}</span>
                      <span className="text-xs text-[#5A4E4E] block">Requester: {intro.requester}</span>
                      <span className="text-xs text-[#7A6D6D] font-mono">Indicative Ticket: {intro.check}</span>
                    </div>

                    <div>
                      {intro.status === 'moderated_approved' ? (
                        <span className="text-xs text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg font-bold">
                          In Term Sheet Phase
                        </span>
                      ) : (
                        <button
                          onClick={() => setDealIntros(prev => prev.map(d => d.id === intro.id ? { ...d, status: 'moderated_approved' } : d))}
                          className="px-3 py-1.5 rounded-lg bg-[#8A1538] text-white text-xs font-bold hover:bg-[#6E0D29] transition-all"
                        >
                          Approve Introduction
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SUCCESS FEE LEDGER */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A1538] mb-1">
                  {isAr ? 'سياسة تحصيل رسوم النجاح المعتمدة (١٫٥٪)' : '1.5% Closed Transaction Fee Reconciliation'}
                </h4>
                <p className="text-xs text-[#5A4E4E]">
                  {isAr
                    ? 'يتم إصدار الفواتير الرسمية للصناديق والشركات عقب إغلاق الجولات التمويلية والتوقيع على اتفاقيات المساهمين التوثيقية.'
                    : 'Success fees are settled post-closing upon shareholder agreement execution and registered in the national intelligence index.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0EBE1]">
                  <span className="font-semibold text-[#1E1919]">Transaction: Snoonu Series B Extension</span>
                  <span className="font-mono text-emerald-700 font-bold">$180,000 Fee Settled</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0EBE1]">
                  <span className="font-semibold text-[#1E1919]">Transaction: SkipCash Pre-Series A</span>
                  <span className="font-mono text-emerald-700 font-bold">$75,000 Fee Settled</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E1919]">Transaction: Avey AI Health Seed</span>
                  <span className="font-mono text-emerald-700 font-bold">$45,000 Fee Settled</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFC8] flex items-center justify-between">
          <span className="text-xs text-[#7A6D6D]">
            Ventures.qa Admin Access • Read/Write Role
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#8A1538] text-white text-xs font-bold rounded-xl"
          >
            {isAr ? 'إغلاق' : 'Close Dashboard'}
          </button>
        </div>

      </div>
    </div>
  );
};
