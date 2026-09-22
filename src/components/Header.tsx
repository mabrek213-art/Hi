import React, { useState } from 'react';
import { Language, User } from '../types';
import { 
  Building2, 
  Newspaper, 
  TrendingUp, 
  Handshake, 
  Calendar, 
  Briefcase, 
  FileDown, 
  Code2, 
  ShieldCheck, 
  BarChart3, 
  Globe2, 
  PlusCircle, 
  Menu, 
  X,
  FileText,
  User as UserIcon,
  Sparkles,
  Lock
} from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSubmitModal: () => void;
  onOpenApiExplorer: () => void;
  onOpenAdminModal: () => void;
  onOpenAnalyticsModal: () => void;
  onOpenReportModal: () => void;
  onOpenAuthModal: () => void;
  onOpenProspectus?: () => void;
  user?: User | null;
  entityCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenSubmitModal,
  onOpenApiExplorer,
  onOpenAdminModal,
  onOpenAnalyticsModal,
  onOpenReportModal,
  onOpenAuthModal,
  onOpenProspectus,
  user,
  entityCount = 14
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  const navItems = [
    {
      id: 'directory',
      labelEn: 'Directory',
      labelAr: 'الدليل الوطني',
      icon: Building2,
      badgeEn: `${entityCount} Entities`,
      badgeAr: `${entityCount} جهة`
    },
    {
      id: 'news',
      labelEn: 'News & Spotlights',
      labelAr: 'الأخبار والأضواء',
      icon: Newspaper,
      badgeEn: 'Weekly',
      badgeAr: 'أسبوعي'
    },
    {
      id: 'intelligence',
      labelEn: 'Capital Index (QPCI)',
      labelAr: 'مؤشر رأس المال',
      icon: TrendingUp,
      badgeEn: 'Q2 Live',
      badgeAr: 'نشط Q2'
    },
    {
      id: 'marketplace',
      labelEn: 'Deal-Flow',
      labelAr: 'منصة الصفقات',
      icon: Handshake,
      badgeEn: 'Active Deals',
      badgeAr: 'صفقات جارية'
    },
    {
      id: 'events',
      labelEn: 'Events',
      labelAr: 'الفعاليات',
      icon: Calendar,
      badgeEn: 'Calendar',
      badgeAr: 'الروزنامة'
    },
    {
      id: 'jobs',
      labelEn: 'Jobs',
      labelAr: 'الوظائف',
      icon: Briefcase,
      badgeEn: 'Hiring',
      badgeAr: 'توظيف'
    },
    {
      id: 'resources',
      labelEn: 'Templates',
      labelAr: 'النماذج المفتوحة',
      icon: FileDown,
      badgeEn: 'Legal',
      badgeAr: 'قانوني'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8]">
      {/* Top Independent Market Dispatch Bar */}
      <div className="bg-[#8A1538] text-[#FAF8F5] px-4 py-1.5 text-xs font-medium border-b border-[#6E0D29]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#6E0D29] text-[#C5A059] border border-[#C5A059]/40 uppercase tracking-wider font-mono">
              {isAr ? 'منصة مستقلة' : 'INDEPENDENT INTELLIGENCE'}
            </span>
            <p className="text-white/90 text-xs">
              {isAr
                ? 'استخبارات رأس المال الخاص والشركات الناشئة في دولة قطر — بيانات محايدة وموثقة دون أي تبعية أو رعاية.'
                : "Qatar's independent private-sector capital and startup intelligence platform — neutral, sourced reporting."}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {onOpenProspectus && (
              <button
                onClick={onOpenProspectus}
                className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5 text-[#C5A059] font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'نشرة الاستحواذ (M&A)' : 'Asset Prospectus'}</span>
              </button>
            )}
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              onClick={onOpenReportModal}
              className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5 underline underline-offset-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isAr ? 'تقرير رأس المال الخاص (Q2)' : 'State of Capital Report (Q2)'}</span>
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-all font-semibold text-[#FAF8F5]"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isAr ? 'English' : 'العربية (RTL)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onTabChange('directory')}>
            <div className="w-11 h-11 rounded-xl bg-[#8A1538] flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-[#C5A059] relative overflow-hidden group">
              <span className="relative z-10 font-mono tracking-tighter">V.qa</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6E0D29] to-[#8A1538] opacity-90 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-[#1E1919] font-serif">
                  Ventures<span className="text-[#8A1538]">.qa</span>
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#8A1538]/10 text-[#8A1538] font-bold border border-[#8A1538]/20">
                  {isAr ? 'قطر' : 'Qatar'}
                </span>
              </div>
              <p className="text-[11px] text-[#7A6D6D] font-medium tracking-wide">
                {isAr ? 'استخبارات رأس المال الخاص والشركات الناشئة' : "Private Capital & Startup Intelligence"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-[#8A1538] text-white shadow-sm'
                      : 'text-[#4A3F3F] hover:text-[#8A1538] hover:bg-[#F2ECE4]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#8A1538]'}`} />
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onOpenApiExplorer}
              title={isAr ? 'واجهة المطورين البرمجية' : 'Public REST API'}
              className="p-2 text-[#7A6D6D] hover:text-[#8A1538] hover:bg-[#F2ECE4] rounded-lg transition-colors"
            >
              <Code2 className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAnalyticsModal}
              title={isAr ? 'لوحة تحليلات المنظومة' : 'Ecosystem Analytics'}
              className="p-2 text-[#7A6D6D] hover:text-[#8A1538] hover:bg-[#F2ECE4] rounded-lg transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAdminModal}
              title={isAr ? 'لوحة المشرف والتحقق' : 'Admin & Verification'}
              className="p-2 text-[#7A6D6D] hover:text-[#8A1538] hover:bg-[#F2ECE4] rounded-lg transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Auth / Profile Trigger */}
            <button
              onClick={onOpenAuthModal}
              className={`px-3 py-1.5 rounded-xl border border-[#E8DFC8] text-xs font-bold transition-all flex items-center gap-1.5 ${
                user ? 'bg-[#FAF8F5] text-[#8A1538]' : 'bg-white text-[#1E1919] hover:bg-[#FAF8F5]'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>
                {user ? user.name.split(' ')[0] : (isAr ? 'دخول / حساب' : 'Sign In')}
              </span>
            </button>

            {/* Claim / Submit Entity Button */}
            <button
              onClick={onOpenSubmitModal}
              className="px-3.5 py-1.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 border border-[#C5A059]/40"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isAr ? 'إدراج جهة' : 'Submit Entity'}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-[#F2ECE4] text-[#8A1538] font-bold"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A3F3F] hover:text-[#8A1538] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E8DFC8] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  isActive ? 'bg-[#8A1538] text-white' : 'text-[#4A3F3F] hover:bg-[#F2ECE4]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#8A1538]'}`} />
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                </div>
                <span className="text-[10px] opacity-80 font-mono">
                  {isAr ? item.badgeAr : item.badgeEn}
                </span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-[#E8DFC8] grid grid-cols-4 gap-2">
            <button
              onClick={() => { onOpenApiExplorer(); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-[#F2ECE4] text-[11px] font-semibold text-[#4A3F3F] flex flex-col items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>API</span>
            </button>
            <button
              onClick={() => { onOpenAnalyticsModal(); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-[#F2ECE4] text-[11px] font-semibold text-[#4A3F3F] flex flex-col items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>{isAr ? 'تحليلات' : 'Metrics'}</span>
            </button>
            <button
              onClick={() => { onOpenAdminModal(); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-[#F2ECE4] text-[11px] font-semibold text-[#4A3F3F] flex flex-col items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>{isAr ? 'إشراف' : 'Admin'}</span>
            </button>
            <button
              onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-[#F2ECE4] text-[11px] font-semibold text-[#4A3F3F] flex flex-col items-center gap-1"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#8A1538]" />
              <span>{user ? user.name.split(' ')[0] : (isAr ? 'حسابي' : 'Account')}</span>
            </button>
          </div>

          <button
            onClick={() => { onOpenSubmitModal(); setMobileMenuOpen(false); }}
            className="w-full mt-3 py-2.5 rounded-xl bg-[#8A1538] text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>{isAr ? 'إدراج أو توثيق جهة' : 'Submit or Claim Entity'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
