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

  // Active Main Navigation Module
  const [activeModule, setActiveModule] = useState<ActiveModule>('directory');

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

  // Slug / Article routing
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string | null>(() => {
    try {
      const match = window.location.pathname.match(/^\/news\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  });
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
        const match = window.location.pathname.match(/^\/news\/([a-zA-Z0-9_-]+)/);
        if (match) {
          setCurrentArticleSlug(match[1]);
        } else {
          setCurrentArticleSlug(null);
        }
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
    try {
      window.history.pushState({}, '', '/');
    } catch {}
    setActiveModule('news');
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
        onTabChange={(tab: any) => setActiveModule(tab)}
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
            onExploreDirectory={() => setActiveModule('directory')}
            onViewMarketplace={() => setActiveModule('deals')}
            onOpenReport={() => setIsReportModalOpen(true)}
            onViewNews={() => setActiveModule('news')}
            onSelectArticleSlug={(slug) => navigateToArticle(slug)}
            onOpenProspectus={() => setIsProspectusModalOpen(true)}
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
            </>
          )}
        </div>

      </main>

      {/* Footer with Independent Links */}
      <Footer
        language={language}
        onNavigate={(mod: any) => setActiveModule(mod)}
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
