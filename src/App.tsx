import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DirectoryModule } from './components/DirectoryModule';
import { NewsModule } from './components/NewsModule';
import { MarketIntelligenceModule } from './components/MarketIntelligenceModule';
import { DealFlowMarketplace } from './components/DealFlowMarketplace';
import { InstitutionalAlignmentModule } from './components/InstitutionalAlignmentModule';
import { EventsModule } from './components/EventsModule';
import { JobsBoardModule } from './components/JobsBoardModule';
import { ResourceLibraryModule } from './components/ResourceLibraryModule';
import { EntityDetailModal } from './components/EntityDetailModal';
import { ClaimProfileModal } from './components/ClaimProfileModal';
import { IntroRequestModal } from './components/IntroRequestModal';
import { PostDealModal } from './components/PostDealModal';
import { ReportModal } from './components/ReportModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { PublicApiModal } from './components/PublicApiModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ArticlePage } from './components/ArticlePage';
import { AcquisitionProspectusModal } from './components/AcquisitionProspectusModal';
import { ContactAndSaleModule } from './components/ContactAndSaleModule';
import { MethodologyPage } from './components/MethodologyPage';
import { InvestQatarHub } from './components/InvestQatarHub';
import { StartupsQatarHub } from './components/StartupsQatarHub';
import { RealEstateModule } from './components/RealEstateModule';
import { QatarVentureCapitalHub } from './components/QatarVentureCapitalHub';

import { 
  SEED_ENTITIES, 
  SEED_MARKET_INTELLIGENCE, 
  SEED_CAPITAL_INDEX, 
  SEED_RAISING_OPPORTUNITIES, 
  SEED_INVESTOR_DEMANDS, 
  SEED_STATE_OF_CAPITAL_REPORT, 
  SEED_ANALYTICS,
  SEED_NEWS_ARTICLES,
  SEED_ECOSYSTEM_EVENTS,
  SEED_ECOSYSTEM_JOBS,
  SEED_ECOSYSTEM_RESOURCES
} from './data/seedData';
import { 
  Language, 
  ActiveModule, 
  EntityProfile, 
  RaisingOpportunity, 
  InvestorDemand,
  PlatformAnalytics,
  NewsArticle,
  EcosystemEvent,
  EcosystemJob
} from './types';

const STORAGE_KEY_ENTITIES = 'ventures_qa_entities_v1';
const STORAGE_KEY_RAISING = 'ventures_qa_raising_v1';
const STORAGE_KEY_ANALYTICS = 'ventures_qa_analytics_v1';
const STORAGE_KEY_LANG = 'ventures_qa_preferred_lang';

// Robust client-side route parser for deep-linking, refresh, and popstate
function parseRoute(pathname: string): { module: ActiveModule; canonicalPath: string; articleSlug: string | null } {
  try {
    // Check for news article slug first: /news/:slug
    const newsMatch = pathname.match(/^\/news\/([a-zA-Z0-9_-]+)/);
    if (newsMatch && newsMatch[1] && newsMatch[1] !== 'all') {
      return { module: 'news', canonicalPath: `/news/${newsMatch[1]}`, articleSlug: newsMatch[1] };
    }

    // Clean pathname: trim leading and trailing slashes, strip query/hash, lowercase
    const clean = pathname.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '').toLowerCase();

    // Match Real Estate (handles /real-estate, /real-estate/, and address bar typos like /real-estat, /realestate)
    if (
      clean === 'real-estate' || 
      clean === 'real-estat' || 
      clean === 'realestate' || 
      clean === 'real_estate' || 
      clean === 'property' || 
      clean === 'aqarat'
    ) {
      return { module: 'real-estate', canonicalPath: '/real-estate', articleSlug: null };
    }

    // Match Invest Qatar
    if (
      clean === 'invest-qatar' || 
      clean === 'invest' || 
      clean === 'investqatar' || 
      clean === 'invest_qatar' || 
      clean === 'fdi'
    ) {
      return { module: 'invest-qatar', canonicalPath: '/invest-qatar', articleSlug: null };
    }

    // Match Startups Qatar
    if (
      clean === 'startups-qatar' || 
      clean === 'startups' || 
      clean === 'startup' || 
      clean === 'startupsqatar' || 
      clean === 'startups_qatar'
    ) {
      return { module: 'startups-qatar', canonicalPath: '/startups-qatar', articleSlug: null };
    }

    // Match Qatar Venture Capital (handles /qatar-venture-capital, /qatar-vc, /venture-capital, /vc)
    if (
      clean === 'qatar-venture-capital' ||
      clean === 'venture-capital' ||
      clean === 'qatar-vc' ||
      clean === 'vc' ||
      clean === 'qatarventurecapital' ||
      clean === 'venture' ||
      clean === 'vcs' ||
      clean === 'qatar-venture'
    ) {
      return { module: 'qatar-venture-capital', canonicalPath: '/qatar-venture-capital', articleSlug: null };
    }

    // Match Methodology
    if (clean === 'methodology' || clean === 'qpci-methodology') {
      return { module: 'methodology', canonicalPath: '/methodology', articleSlug: null };
    }

    // Match For Sale / Acquisition Prospectus
    if (clean === 'for-sale' || clean === 'sale' || clean === 'prospectus' || clean === 'acquisition') {
      return { module: 'for-sale', canonicalPath: '/for-sale', articleSlug: null };
    }

    // Match News / Editorial
    if (clean === 'news' || clean.startsWith('news/')) {
      return { module: 'news', canonicalPath: '/news', articleSlug: null };
    }

    // Match Capital Index / Market Intelligence
    if (clean === 'intelligence' || clean === 'qpci' || clean === 'index' || clean === 'capital-index') {
      return { module: 'intelligence', canonicalPath: '/intelligence', articleSlug: null };
    }

    // Match Deal-Flow / Marketplace
    if (clean === 'deals' || clean === 'marketplace' || clean === 'deal-flow') {
      return { module: 'deals', canonicalPath: '/deals', articleSlug: null };
    }

    // Match Events
    if (clean === 'events') {
      return { module: 'events', canonicalPath: '/events', articleSlug: null };
    }

    // Match Jobs
    if (clean === 'jobs' || clean === 'careers') {
      return { module: 'jobs', canonicalPath: '/jobs', articleSlug: null };
    }

    // Match Resources
    if (clean === 'resources' || clean === 'guides') {
      return { module: 'resources', canonicalPath: '/resources', articleSlug: null };
    }

    // Default: Directory
    return { module: 'directory', canonicalPath: '/', articleSlug: null };
  } catch {
    return { module: 'directory', canonicalPath: '/', articleSlug: null };
  }
}

export function App() {
  const { user } = useAuth();

  // Language & Direction Management
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (e) {
      // fallback
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch (e) {}

    // Update document dir and lang attributes
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  // Route Initialization
  const initialRoute = parseRoute(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [activeModule, setActiveModule] = useState<ActiveModule>(initialRoute.module);
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string | null>(initialRoute.articleSlug);

  // Silently normalize URL if arrived with typos, trailing slashes, or legacy aliases
  useEffect(() => {
    try {
      const current = window.location.pathname;
      const resolved = parseRoute(current);
      if (resolved.canonicalPath !== current && resolved.canonicalPath !== '/' && !current.startsWith('/news/')) {
        window.history.replaceState({}, '', resolved.canonicalPath);
      }
    } catch {}
  }, []);

  // Dynamic Document Title based on activeModule for SEO ranking
  useEffect(() => {
    const isAr = language === 'ar';
    if (activeModule === 'real-estate') {
      document.title = isAr 
        ? 'عقارات قطر: دليل التملك الحر للأجانب وشروط الإقامة والعوائد (٢٠٢٦) | Ventures.qa'
        : 'Invest in Qatar Real Estate: Freehold Zones, Residency & Yields (Q2 2026) | Ventures.qa';
    } else if (activeModule === 'invest-qatar') {
      document.title = isAr
        ? 'استثمر في قطر: بوابة الاستثمار الأجنبي وتأسيس الشركات بنسبة ١٠٠٪ | Ventures.qa'
        : 'Invest Qatar: Foreign Investment & 100% Ownership Portal | Ventures.qa';
    } else if (activeModule === 'startups-qatar') {
      document.title = isAr
        ? 'الشركات الناشئة في قطر: مؤشر أفضل ٤٠ شركة تكنولوجية | Ventures.qa'
        : 'Startups in Qatar: Top 40 Ecosystem Index & Rankings | Ventures.qa';
    } else if (activeModule === 'qatar-venture-capital') {
      document.title = isAr
        ? 'رأس المال الجريء في قطر: دليل الصناديق والمستثمرين الملائكيين (٢٠٢٦) | Ventures.qa'
        : 'Qatar Venture Capital: Active VC Funds, Angel Networks & Family Offices (2026) | Ventures.qa';
    } else {
      document.title = isAr
        ? 'Ventures.qa — منصة استثمر في قطر، دليل الشركات الناشئة ورأس المال الخاص'
        : 'Ventures.qa — Invest in Qatar: Startups, Venture Capital & Private Market Directory';
    }
  }, [activeModule, language]);

  const handleTabChange = (tab: ActiveModule | string) => {
    const mod = tab as ActiveModule;
    setActiveModule(mod);
    setCurrentArticleSlug(null);
    try {
      const newPath = mod === 'directory' ? '/' : `/${mod}`;
      window.history.pushState({}, '', newPath);
    } catch {}
  };

  // Search state across Hero and Directory
  const [searchQuery, setSearchQuery] = useState('');

  // Entities State with persistence
  const [entities, setEntities] = useState<EntityProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENTITIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return SEED_ENTITIES;
  });

  // Raising Deals with persistence
  const [raisingDeals, setRaisingDeals] = useState<RaisingOpportunity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RAISING);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return SEED_RAISING_OPPORTUNITIES;
  });

  // News, Events, Jobs state
  const [articles, setArticles] = useState<NewsArticle[]>(SEED_NEWS_ARTICLES);
  const [events, setEvents] = useState<EcosystemEvent[]>(SEED_ECOSYSTEM_EVENTS);
  const [jobs, setJobs] = useState<EcosystemJob[]>(SEED_ECOSYSTEM_JOBS);

  const [activeFullArticle, setActiveFullArticle] = useState<NewsArticle | null>(null);

  // Fetch live published articles from backend
  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles);
        }
      })
      .catch(err => console.error('Failed to load live articles:', err));
  }, []);

  // Listen to browser popstate (back/forward)
  useEffect(() => {
    const handlePop = () => {
      try {
        const resolved = parseRoute(window.location.pathname);
        setActiveModule(resolved.module);
        setCurrentArticleSlug(resolved.articleSlug);
      } catch {}
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Sync activeFullArticle when slug or articles change
  useEffect(() => {
    if (!currentArticleSlug) {
      setActiveFullArticle(null);
      return;
    }
    const found = articles.find(a => a.slug === currentArticleSlug || a.id === currentArticleSlug);
    if (found) {
      setActiveFullArticle(found);
    } else {
      fetch(`/api/news/${currentArticleSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.article) {
            setActiveFullArticle(data.article);
            setArticles(prev => {
              if (prev.some(a => a.id === data.article.id)) return prev;
              return [data.article, ...prev];
            });
          }
        })
        .catch(err => console.error('Error fetching article:', err));
    }
  }, [currentArticleSlug, articles]);

  const navigateToArticle = (slug: string) => {
    setCurrentArticleSlug(slug);
    try {
      window.history.pushState({}, '', `/news/${slug}`);
    } catch {}
  };

  const backFromArticle = () => {
    setCurrentArticleSlug(null);
    setActiveModule('news');
    try {
      window.history.pushState({}, '', '/news');
    } catch {}
  };

  // Analytics
  const [analytics, setAnalytics] = useState<PlatformAnalytics>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANALYTICS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      }
    } catch (e) {}
    return SEED_ANALYTICS;
  });

  // Modals state
  const [selectedEntityForModal, setSelectedEntityForModal] = useState<EntityProfile | null>(null);
  const [claimingEntity, setClaimingEntity] = useState<EntityProfile | null>(null);
  const [introTarget, setIntroTarget] = useState<{ name: string; id: string } | null>(null);
  const [isPostDealOpen, setIsPostDealOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProspectusModalOpen, setIsProspectusModalOpen] = useState(false);

  // Claim Profile Handler
  const handleConfirmClaim = (entityId: string, email: string, crNumber: string) => {
    const updated = entities.map(e => {
      if (e.id === entityId) {
        return {
          ...e,
          claimed: true,
          claimedByEmail: email,
          crNumber: crNumber,
          verified: true
        };
      }
      return e;
    });
    setEntities(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ENTITIES, JSON.stringify(updated));
    } catch (e) {}

    setAnalytics(prev => ({
      ...prev,
      verifiedClaimPercentage: Math.min(100, (prev.verifiedClaimPercentage ?? 82) + 2)
    }));
  };

  // Submit New Deal Handler
  const handleCreateDeal = (newDeal: RaisingOpportunity) => {
    const updated = [newDeal, ...raisingDeals];
    setRaisingDeals(updated);
    try {
      localStorage.setItem(STORAGE_KEY_RAISING, JSON.stringify(updated));
    } catch (e) {}

    setAnalytics(prev => ({
      ...prev,
      activeDealFlowMandates: (prev.activeDealFlowMandates ?? 24) + 1
    }));
  };

  // Handle Intro Request Submission
  const handleIntroRequestSubmit = (data: any) => {
    setAnalytics(prev => ({
      ...prev,
      facilitatedIntroductions: (prev.facilitatedIntroductions ?? 86) + 1
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1919] flex flex-col font-sans selection:bg-[#8A1538] selection:text-white">
      
      {/* Header with National Announcement & Module Switcher */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeModule}
        onTabChange={handleTabChange}
        onOpenSubmitModal={() => setIsPostDealOpen(true)}
        onOpenApiExplorer={() => setIsApiModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAnalyticsModal={() => setIsAdminModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProspectus={() => setIsProspectusModalOpen(true)}
        user={user}
        entityCount={entities.length}
      />

      {/* Main Content View Container */}
      <main className="flex-1">
        
        {/* Top Hero Section (always visible on directory or top entry) */}
        {!currentArticleSlug && activeModule === 'directory' && (
          <HeroSection
            language={language}
            onExploreDirectory={() => handleTabChange('directory')}
            onViewMarketplace={() => handleTabChange('deals')}
            onOpenReport={() => setIsReportModalOpen(true)}
            onViewNews={() => handleTabChange('news')}
            onSelectArticleSlug={(slug) => navigateToArticle(slug)}
            onOpenProspectus={() => setIsProspectusModalOpen(true)}
            onNavigateMethodology={() => handleTabChange('methodology')}
            onNavigateInvestQatar={() => handleTabChange('invest-qatar')}
            onNavigateStartupsQatar={() => handleTabChange('startups-qatar')}
            onNavigateVentureCapital={() => handleTabChange('qatar-venture-capital')}
            onNavigateRealEstate={() => handleTabChange('real-estate')}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalEntitiesCount={entities.length}
            totalDealsCount={raisingDeals.length}
          />
        )}

        {/* Dynamic Main Module View or Dedicated Article View */}
        <div className={!currentArticleSlug && activeModule === 'directory' ? '' : 'pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'}>
          {currentArticleSlug ? (
            activeFullArticle ? (
              <ArticlePage
                article={activeFullArticle}
                language={language}
                directoryEntities={entities}
                onBackToNews={backFromArticle}
                onOpenEntityModal={(entity) => setSelectedEntityForModal(entity)}
              />
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-10 h-10 border-4 border-[#8A1538] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold text-[#1E1919]">Loading Intelligence Dispatch...</p>
                <button
                  onClick={backFromArticle}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E8DFC8] text-xs font-bold text-[#8A1538]"
                >
                  Return to News & Spotlights
                </button>
              </div>
            )
          ) : (
            <>
              {activeModule === 'invest-qatar' && (
                <InvestQatarHub
                  language={language}
                  onNavigateTab={handleTabChange}
                  onSelectArticleSlug={(slug) => navigateToArticle(slug)}
                  onRequestIntro={(targetName, targetId) => setIntroTarget({ name: targetName, id: targetId })}
                  raisingDeals={raisingDeals}
                />
              )}

              {activeModule === 'startups-qatar' && (
                <StartupsQatarHub
                  language={language}
                  onNavigateTab={handleTabChange}
                  onSelectEntity={(entity) => setSelectedEntityForModal(entity)}
                  onSelectArticleSlug={(slug) => navigateToArticle(slug)}
                  entities={entities}
                />
              )}

              {activeModule === 'real-estate' && (
                <RealEstateModule
                  language={language}
                  onNavigateTab={handleTabChange}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                />
              )}

              {activeModule === 'qatar-venture-capital' && (
                <QatarVentureCapitalHub
                  language={language}
                  onNavigateTab={handleTabChange}
                  onSelectEntity={(entity) => setSelectedEntityForModal(entity)}
                  onRequestIntro={(targetName, targetId) => setIntroTarget({ name: targetName, id: targetId })}
                  onOpenPostDeal={() => setIsPostDealOpen(true)}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                  entities={entities}
                />
              )}

              {activeModule === 'directory' && (
                <DirectoryModule
                  entities={entities}
                  language={language}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSelectEntity={(entity) => setSelectedEntityForModal(entity)}
                  onClaimProfile={(entity) => setClaimingEntity(entity)}
                />
              )}

              {activeModule === 'news' && (
                <NewsModule
                  language={language}
                  articles={articles}
                  onArticleSelect={(article) => navigateToArticle(article.slug)}
                  onSelectEntity={(entityId) => {
                    const entity = entities.find(e => e.id === entityId);
                    if (entity) setSelectedEntityForModal(entity);
                  }}
                />
              )}

          {activeModule === 'intelligence' && (
            <MarketIntelligenceModule
              intelligenceItems={SEED_MARKET_INTELLIGENCE}
              capitalIndex={SEED_CAPITAL_INDEX}
              language={language}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {(activeModule === 'deals' || activeModule === 'marketplace') && (
            <DealFlowMarketplace
              raisingOpportunities={raisingDeals}
              investorDemands={SEED_INVESTOR_DEMANDS}
              language={language}
              onRequestIntro={(targetName, targetId) => setIntroTarget({ name: targetName, id: targetId })}
              onOpenSubmitDealModal={() => setIsPostDealOpen(false)}
            />
          )}

          {activeModule === 'events' && (
            <EventsModule
              language={language}
              events={events}
              onAddEvent={(newEvent) => setEvents(prev => [newEvent, ...prev])}
            />
          )}

          {activeModule === 'jobs' && (
            <JobsBoardModule
              language={language}
              jobs={jobs}
              onAddJob={(newJob) => setJobs(prev => [newJob, ...prev])}
            />
          )}

          {activeModule === 'resources' && (
            <ResourceLibraryModule
              language={language}
              resources={SEED_ECOSYSTEM_RESOURCES}
            />
          )}

          {activeModule === 'alignment' && (
            <InstitutionalAlignmentModule
              report={SEED_STATE_OF_CAPITAL_REPORT}
              language={language}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {activeModule === 'methodology' && (
            <MethodologyPage
              language={language}
              onNavigateTab={(tab) => setActiveModule(tab as any)}
              onOpenProspectus={() => setIsProspectusModalOpen(true)}
            />
          )}

          {activeModule === 'for-sale' && (
            <ContactAndSaleModule
              language={language}
              onOpenProspectusModal={() => setIsProspectusModalOpen(true)}
              onNavigateTab={(tab) => setActiveModule(tab as any)}
            />
          )}
            </>
          )}
        </div>

      </main>

      {/* Footer with Independent Links */}
      <Footer
        language={language}
        onNavigate={handleTabChange}
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenApi={() => setIsApiModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenProspectus={() => setIsProspectusModalOpen(true)}
        entityCount={entities.length}
      />

      {/* --- INTERACTIVE MODALS --- */}

      {/* 1. Entity Detail Modal (Full Profile, Metrics, JSON-LD) */}
      <EntityDetailModal
        entity={selectedEntityForModal}
        language={language}
        onClose={() => setSelectedEntityForModal(null)}
        onRequestIntro={(entity) => {
          setSelectedEntityForModal(null);
          setIntroTarget({ name: entity.name, id: entity.id });
        }}
        onClaimProfile={(entity) => {
          setSelectedEntityForModal(null);
          setClaimingEntity(entity);
        }}
      />

      {/* 2. Claim Profile Modal (Verification via Domain or CR) */}
      <ClaimProfileModal
        entity={claimingEntity}
        language={language}
        onClose={() => setClaimingEntity(null)}
        onConfirmClaim={handleConfirmClaim}
      />

      {/* 3. Moderated Introduction / Deal Contact Request Modal */}
      {introTarget && (
        <IntroRequestModal
          targetName={introTarget.name}
          targetId={introTarget.id}
          language={language}
          onClose={() => setIntroTarget(null)}
          onSubmitSuccess={handleIntroRequestSubmit}
        />
      )}

      {/* 4. Post Deal / Fundraising Mandate Modal */}
      {isPostDealOpen && (
        <PostDealModal
          language={language}
          onClose={() => setIsPostDealOpen(false)}
          onSubmitDeal={handleCreateDeal}
        />
      )}

      {/* 5. Quarterly Report Official Document Modal */}
      {isReportModalOpen && (
        <ReportModal
          report={SEED_STATE_OF_CAPITAL_REPORT}
          language={language}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}

      {/* 6. Admin & Ecosystem Governance Dashboard Modal */}
      {isAdminModalOpen && (
        <AdminDashboardModal
          analytics={analytics}
          language={language}
          onClose={() => setIsAdminModalOpen(false)}
          directoryEntities={entities}
          onArticlePublished={(newArticle) => {
            setArticles(prev => [newArticle, ...prev.filter(a => a.id !== newArticle.id)]);
            navigateToArticle(newArticle.slug);
            setIsAdminModalOpen(false);
          }}
        />
      )}

      {/* 7. Public REST API Console & Documentation Modal */}
      {isApiModalOpen && (
        <PublicApiModal
          entities={entities}
          capitalIndex={SEED_CAPITAL_INDEX}
          raisingDeals={raisingDeals}
          language={language}
          onClose={() => setIsApiModalOpen(false)}
        />
      )}

      {/* 8. Authentication & User Profile Modal */}
      {isAuthModalOpen && (
        <AuthModal
          language={language}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {/* 9. Platform Asset Prospectus & Acquisition Inquiry Modal */}
      <AcquisitionProspectusModal
        isOpen={isProspectusModalOpen}
        onClose={() => setIsProspectusModalOpen(false)}
        language={language}
      />

    </div>
  );
}

export default App;
