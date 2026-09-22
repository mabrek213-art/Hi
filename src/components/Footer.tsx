import React, { useState } from 'react';
import { Language } from '../types';
import { 
  Building2, 
  Newspaper, 
  TrendingUp, 
  Handshake, 
  Calendar, 
  Briefcase, 
  FileDown, 
  ShieldCheck, 
  Code, 
  FileText, 
  Mail, 
  Rss, 
  Lock, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenApi: () => void;
  onOpenAdmin: () => void;
  onOpenReport: () => void;
  onOpenProspectus?: () => void;
  entityCount?: number;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenApi,
  onOpenAdmin,
  onOpenReport,
  onOpenProspectus,
  entityCount = 14
}) => {
  const isAr = language === 'ar';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, language })
      });
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1A1415] text-[#C2B5B5] border-t-2 border-[#8A1538]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Platform Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8A1538] flex items-center justify-center text-white font-bold text-lg border border-[#C5A059] shadow-sm font-mono">
                VQ
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Ventures<span className="text-[#8A1538]">.qa</span>
                </span>
                <span className="text-[11px] block text-[#A69999] font-medium">
                  {isAr ? 'منصة استخبارات رأس المال الخاص والشركات الناشئة' : 'Independent Private Capital & Startup Intelligence'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A69999] leading-relaxed max-w-sm">
              {isAr
                ? 'منصة مستقلة ومحايدة متخصصة في استخبارات السوق الخاص، وتوثيق صفقات رأس المال الجريء، ومؤشر رأس المال الخاص (QPCI) في دولة قطر.'
                : 'The independent private-sector intelligence platform providing transparent market indexing, verified scaleup directories, venture deal matchmaking, and research reports in Qatar.'}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={onOpenApi}
                className="px-3 py-1.5 rounded-lg bg-[#2D2425] hover:bg-[#3D3233] text-white border border-[#403335] flex items-center gap-1.5 transition-colors font-mono text-[11px]"
              >
                <Code className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>REST API</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-lg bg-[#2D2425] hover:bg-[#3D3233] text-white border border-[#403335] flex items-center gap-1.5 transition-colors text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8A1538]" />
                <span>{isAr ? 'بوابة التحقق' : 'Admin & Verification'}</span>
              </button>

              <a
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#2D2425] hover:bg-[#3D3233] text-white border border-[#403335] flex items-center gap-1.5 transition-colors text-[11px]"
              >
                <Rss className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>RSS 2.0</span>
              </a>
            </div>
          </div>

          {/* Module Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {isAr ? 'وحدات المنصة' : 'Platform Modules'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#8A1538]" />
                  <span>{isAr ? `دليل المنظومة (${entityCount} جهة)` : `Directory (${entityCount} Entities)`}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Newspaper className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isAr ? 'الأخبار وأضواء الشركات' : 'News & Spotlights'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intelligence')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-[#8A1538]" />
                  <span>{isAr ? 'مؤشر رأس المال (QPCI)' : 'Capital Index (QPCI)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Handshake className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isAr ? 'منصة الصفقات' : 'Deal-Flow Marketplace'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Tools */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {isAr ? 'خدمات المنظومة' : 'Ecosystem Tools'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#8A1538]" />
                  <span>{isAr ? 'روزنامة الفعاليات' : 'Events & Summits'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isAr ? 'لوحة الوظائف' : 'Tech Jobs Board'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#8A1538]" />
                  <span>{isAr ? 'النماذج القانونية المفتوحة' : 'Open Legal Templates'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReport}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isAr ? 'تقرير Q2 لرأس المال' : 'Q2 State of Capital Report'}</span>
                </button>
              </li>
              {onOpenProspectus && (
                <li>
                  <button
                    onClick={onOpenProspectus}
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5 text-[#C5A059] font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    <span>{isAr ? 'نشرة الاستحواذ على المنصة (M&A)' : 'Asset Prospectus & Acquisition'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Weekly Brief Signup */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {isAr ? 'النشرة الأسبوعية' : 'Weekly Intelligence'}
            </h4>
            <p className="text-[11px] text-[#A69999] leading-relaxed">
              {isAr
                ? 'ملخص صفقات التمويل والمؤشرات التحليلية صباح كل اثنين.'
                : 'Direct to 2,400+ investors and founders every Monday morning.'}
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="name@firm.qa"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#251D1E] border border-[#3D3233] text-white placeholder:text-[#7A6D6D] focus:outline-none focus:border-[#8A1538]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#8A1538] hover:bg-[#A31942] text-white text-xs font-bold transition-colors shadow-sm"
              >
                {isAr ? 'اشتراك مجاني' : 'Subscribe Free'}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-emerald-400 font-semibold block">
                {isAr ? 'تم تأكيد اشتراكك!' : 'Subscribed successfully!'}
              </span>
            )}
          </div>

        </div>

        {/* Editorial Standards & Neutrality Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#2D2425] space-y-4">
          <div className="p-4 rounded-xl bg-[#251D1E] border border-[#3D3233] text-[11px] text-[#A69999] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isAr ? 'سياسة النشر والاستقلالية المهنية' : 'EDITORIAL INDEPENDENCE & NEUTRALITY DISCLOSURE'}</span>
            </div>
            <p className="leading-relaxed">
              {isAr
                ? 'Ventures.qa منصة إعلامية واستخباراتية رقمية مستقلة مملوكة للقطاع الخاص. لا تمثل المنصة أي جهة حكومية أو صندوق سيادي أو هيئة عامة، ولا ترتبط بأي شراكة رسمية مع أي منها. يتم إعداد كافة التقارير الإخبارية وبيانات المؤشرات وتحليلات الصفقات استناداً إلى مصادر صحفية موثقة وإفصاحات الشركات المباشرة وفق أعلى المعايير المهنية.'
                : 'Ventures.qa is an independent private-sector intelligence publication and matchmaking platform. Ventures.qa is not affiliated with, endorsed by, nor operated in partnership with any government body, sovereign wealth fund, or public agency. All market analysis, news reports, company spotlights, and venture index figures are published strictly under third-party sourced editorial methodology.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6D6D] gap-2">
            <p>© {new Date().getFullYear()} Ventures.qa. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white">
                Sitemap
              </a>
              <a href="/rss.xml" target="_blank" rel="noreferrer" className="hover:text-white">
                RSS 2.0 Feed
              </a>
              <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-white">
                Robots.txt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
