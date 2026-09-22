import fs from 'fs';
import path from 'path';
import {
  EntityProfile,
  NewsArticle,
  CapitalIndexQuarter,
  RaisingOpportunity,
  InvestorDemand,
  EcosystemEvent,
  EcosystemJob,
  EcosystemResource,
  StateOfCapitalReport,
  PlatformAnalytics,
  User,
  PaymentOrder,
  SavedSearchAlert
} from '../src/types';

import {
  SEED_ENTITIES,
  SEED_NEWS_ARTICLES,
  SEED_CAPITAL_INDEX,
  SEED_RAISING_OPPORTUNITIES,
  SEED_INVESTOR_DEMANDS,
  SEED_ECOSYSTEM_EVENTS,
  SEED_ECOSYSTEM_JOBS,
  SEED_ECOSYSTEM_RESOURCES,
  SEED_STATE_OF_CAPITAL_REPORT,
  SEED_ANALYTICS
} from '../src/data/seedData';

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  type: 'verification' | 'alert' | 'newsletter' | 'deal_intro' | 'report_download';
  content: string;
  sentAt: string;
}

interface DealIntroRequest {
  id: string;
  dealId: string;
  companyName: string;
  investorName: string;
  investorEmail: string;
  investorFirm: string;
  checkSizeUsd: string;
  accreditedConfirmed: boolean;
  successFeeAgreed: boolean;
  notes?: string;
  status: 'pending' | 'approved' | 'connected';
  createdAt: string;
}

export interface AcquisitionInquiry {
  id: string;
  name: string;
  organization: string;
  email: string;
  inquiryType: string;
  estimatedBudget?: string;
  message?: string;
  createdAt: string;
}

interface StoredDatabase {
  users: User[];
  entities: EntityProfile[];
  news: NewsArticle[];
  indexQuarters: CapitalIndexQuarter[];
  report: StateOfCapitalReport;
  deals: RaisingOpportunity[];
  investorDemands: InvestorDemand[];
  events: EcosystemEvent[];
  jobs: EcosystemJob[];
  resources: EcosystemResource[];
  alerts: SavedSearchAlert[];
  newsletterSubscribers: Array<{ email: string; language: string; subscribedAt: string }>;
  emailLogs: EmailLog[];
  dealIntros: DealIntroRequest[];
  paymentOrders: PaymentOrder[];
  uploadedFiles: Array<{ id: string; originalName: string; mimeType: string; size: number; url: string; uploadedAt: string; isPrivate: boolean }>;
  moderationQueue: Array<{ id: string; type: 'entity' | 'job' | 'event' | 'deal'; title: string; submittedBy: string; status: 'pending' | 'approved' | 'rejected'; submittedAt: string }>;
  analytics: PlatformAnalytics;
  acquisitionInquiries?: AcquisitionInquiry[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'ventures_database.json');

export function normalizeNewsArticle(raw: any): NewsArticle {
  const title = raw.title || raw.titleEn || 'Untitled Dispatch';
  const body = raw.body || raw.contentEn || raw.summaryEn || '';
  const slug = raw.slug || (title.toLowerCase().replace(/[^a-z0-9-]+/g, '-'));
  const source_links = raw.source_links || raw.sourceLinks || (raw.sourceUrl ? [{ name: raw.sourceCitation || 'Primary Source', url: raw.sourceUrl }] : []);
  const published_date = raw.published_date || raw.publishedDate || new Date().toISOString().split('T')[0];
  const status: 'draft' | 'published' = raw.status === 'draft' ? 'draft' : 'published';
  const author_note = raw.author_note || raw.authorNote || '';

  // category normalization
  let category = raw.category || 'Funding News';
  if (category === 'funding') category = 'Funding News';
  else if (category === 'policy') category = 'Policy & Regulation';
  else if (category === 'trends') category = 'Market Trends';
  else if (category === 'spotlight') category = 'Startup Spotlight';
  else if (category === 'events') category = 'Events';

  return {
    ...raw,
    id: raw.id || `news-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title,
    titleEn: raw.titleEn || title,
    titleAr: raw.titleAr || title,
    slug,
    body,
    contentEn: raw.contentEn || body,
    contentAr: raw.contentAr || body,
    summaryEn: raw.summaryEn || (body.slice(0, 160) + '...'),
    summaryAr: raw.summaryAr || raw.summaryEn || (body.slice(0, 160) + '...'),
    category,
    source_links,
    sourceLinks: source_links,
    published_date,
    publishedDate: published_date,
    status,
    author_note,
    authorNote: author_note,
    readTimeMinutes: raw.readTimeMinutes || 4,
    author: raw.author || 'Ventures.qa Editorial Desk',
    sourceCitation: raw.sourceCitation || (source_links[0]?.name ?? 'Independent Reporting'),
    sourceUrl: raw.sourceUrl || (source_links[0]?.url ?? undefined),
    isSpotlight: !!raw.isSpotlight,
    spotlightCompanyId: raw.spotlightCompanyId,
    spotlightStats: raw.spotlightStats,
    relatedEntityIds: raw.relatedEntityIds || (raw.spotlightCompanyId ? [raw.spotlightCompanyId] : []),
    comments: raw.comments || [],
    likesCount: raw.likesCount || 0
  };
}

class DatabaseStore {
  private data: StoredDatabase;

  constructor() {
    this.data = this.initializeDatabase();
  }

  private initializeDatabase(): StoredDatabase {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.entities && parsed.news && parsed.deals) {
          // Normalize news articles in parsed database
          parsed.news = parsed.news.map(normalizeNewsArticle);
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read existing database file, seeding fresh copy:', err);
    }

    // Default Seed State
    const defaultData: StoredDatabase = {
      users: [
        {
          id: 'user-admin',
          name: 'Ventures.qa Admin',
          email: 'admin@ventures.qa',
          role: 'admin',
          organization: 'Ventures.qa Editorial & Intelligence',
          verified: true,
          subscriptionTier: 'institutional'
        },
        {
          id: 'user-investor-demo',
          name: 'Alexander Wiedmer',
          email: 'investor@rasmalventures.com',
          role: 'investor',
          organization: 'Rasmal Ventures',
          verified: true,
          subscriptionTier: 'pro'
        },
        {
          id: 'user-startup-demo',
          name: 'Hamad Al-Hajri',
          email: 'founder@snoonu.com',
          role: 'startup',
          organization: 'Snoonu',
          verified: true,
          subscriptionTier: 'pro'
        }
      ],
      entities: SEED_ENTITIES,
      news: SEED_NEWS_ARTICLES,
      indexQuarters: SEED_CAPITAL_INDEX,
      report: SEED_STATE_OF_CAPITAL_REPORT,
      deals: SEED_RAISING_OPPORTUNITIES,
      investorDemands: SEED_INVESTOR_DEMANDS,
      events: SEED_ECOSYSTEM_EVENTS,
      jobs: SEED_ECOSYSTEM_JOBS,
      resources: SEED_ECOSYSTEM_RESOURCES,
      alerts: [
        {
          id: 'alert-1',
          userEmail: 'investor@rasmalventures.com',
          sector: 'FinTech',
          stage: 'Series A',
          createdAt: new Date().toISOString()
        }
      ],
      newsletterSubscribers: [
        { email: 'intel@dohacapital.qa', language: 'en', subscribedAt: '2026-09-01T10:00:00Z' },
        { email: 'syndicate@angels.qa', language: 'ar', subscribedAt: '2026-09-10T12:00:00Z' }
      ],
      emailLogs: [],
      dealIntros: [
        {
          id: 'intro-demo-1',
          dealId: 'deal-1',
          companyName: 'SkipCash',
          investorName: 'Alexander Wiedmer',
          investorEmail: 'partners@rasmalventures.com',
          investorFirm: 'Rasmal Ventures',
          checkSizeUsd: '$1,000,000 USD',
          accreditedConfirmed: true,
          successFeeAgreed: true,
          notes: 'Interested in leading Series A expansion into Saudi Arabia.',
          status: 'connected',
          createdAt: '2026-09-15T14:20:00Z'
        }
      ],
      paymentOrders: [],
      uploadedFiles: [],
      moderationQueue: [],
      analytics: SEED_ANALYTICS
    };

    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error persisting initial DB file:', e);
    }

    return defaultData;
  }

  private save() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  // --- USERS & AUTH ---
  getUsers(): User[] {
    return this.data.users;
  }

  findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData: Partial<User> & { email: string; name: string; role: User['role'] }): User {
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'startup',
      organization: userData.organization || '',
      verified: false,
      subscriptionTier: userData.role === 'admin' ? 'institutional' : 'free',
      avatar: userData.avatar
    };
    this.data.users.push(newUser);
    this.save();

    // Trigger verification email
    this.logEmail(
      newUser.email,
      'Welcome to Ventures.qa — Verify your ecosystem account',
      'verification',
      `Hello ${newUser.name},\n\nThank you for creating an account on Ventures.qa. Click the link to verify your identity and access deal matchmaking and analytics.\n\nYour account role: ${newUser.role}`
    );

    return newUser;
  }

  verifyUser(userId: string): User | undefined {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      user.verified = true;
      this.save();
    }
    return user;
  }

  // --- ENTITIES ---
  getEntities(filter?: { sector?: string; stage?: string; type?: string; verifiedOnly?: boolean; search?: string }): EntityProfile[] {
    let list = [...this.data.entities];

    if (filter) {
      if (filter.sector && filter.sector !== 'All') {
        list = list.filter(e => e.sector.toLowerCase() === filter.sector?.toLowerCase());
      }
      if (filter.stage && filter.stage !== 'All') {
        list = list.filter(e => e.stage.toLowerCase() === filter.stage?.toLowerCase());
      }
      if (filter.type && filter.type !== 'All') {
        list = list.filter(e => e.type.toLowerCase() === filter.type?.toLowerCase());
      }
      if (filter.verifiedOnly) {
        list = list.filter(e => e.verified);
      }
      if (filter.search && filter.search.trim() !== '') {
        const q = filter.search.toLowerCase().trim();
        list = list.filter(e => 
          e.name.toLowerCase().includes(q) ||
          e.nameAr?.toLowerCase().includes(q) ||
          e.tagline.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.sector.toLowerCase().includes(q) ||
          e.keyPeople?.some(p => p.name.toLowerCase().includes(q) || p.nameAr?.toLowerCase().includes(q))
        );
      }
    }

    return list;
  }

  getEntityById(id: string): EntityProfile | undefined {
    return this.data.entities.find(e => e.id === id || e.slug === id);
  }

  addEntity(entity: EntityProfile): EntityProfile {
    this.data.entities.unshift(entity);
    this.save();
    return entity;
  }

  claimEntity(id: string, claimData: { email: string; crNumber: string; documentUrl?: string; claimantName: string }): { success: boolean; message: string } {
    const entity = this.data.entities.find(e => e.id === id);
    if (!entity) return { success: false, message: 'Entity not found' };

    entity.claimed = true;
    entity.claimedByEmail = claimData.email;
    entity.crNumber = claimData.crNumber;
    entity.verified = true;
    this.save();

    this.data.moderationQueue.push({
      id: `mod-claim-${Date.now()}`,
      type: 'entity',
      title: `Claim profile: ${entity.name} by ${claimData.claimantName} (${claimData.email})`,
      submittedBy: claimData.email,
      status: 'approved',
      submittedAt: new Date().toISOString()
    });
    this.save();

    this.logEmail(
      claimData.email,
      `Ventures.qa Verification: Profile Claim for ${entity.name}`,
      'verification',
      `Your verification claim for ${entity.name} (CR: ${claimData.crNumber}) has been registered and verified on Ventures.qa.`
    );

    return { success: true, message: 'Profile claimed and verified successfully.' };
  }

  // --- NEWS ---
  getNews(filter?: { category?: string; search?: string; limit?: number; includeDrafts?: boolean }): NewsArticle[] {
    let list = this.data.news.map(normalizeNewsArticle);

    // Filter by published status unless explicitly requested
    if (!filter?.includeDrafts) {
      list = list.filter(n => n.status === 'published');
    }

    // Sort newest first by published_date descending
    list.sort((a, b) => {
      const dateA = new Date(a.published_date || a.publishedDate || 0).getTime();
      const dateB = new Date(b.published_date || b.publishedDate || 0).getTime();
      return dateB - dateA;
    });

    if (filter) {
      if (filter.category && filter.category !== 'all') {
        const cat = filter.category.toLowerCase();
        list = list.filter(n => {
          const articleCat = (n.category || '').toLowerCase();
          if (cat === 'funding' || cat === 'funding news') {
            return articleCat.includes('fund');
          }
          if (cat === 'policy' || cat === 'policy & regulation') {
            return articleCat.includes('polic') || articleCat.includes('reg');
          }
          if (cat === 'trends' || cat === 'market trends') {
            return articleCat.includes('trend') || articleCat.includes('market');
          }
          if (cat === 'spotlight' || cat === 'startup spotlight') {
            return articleCat.includes('spotlight');
          }
          if (cat === 'events') {
            return articleCat.includes('event');
          }
          return articleCat === cat;
        });
      }

      if (filter.search && filter.search.trim() !== '') {
        const q = filter.search.toLowerCase().trim();
        list = list.filter(n =>
          (n.title && n.title.toLowerCase().includes(q)) ||
          (n.titleEn && n.titleEn.toLowerCase().includes(q)) ||
          (n.titleAr && n.titleAr.toLowerCase().includes(q)) ||
          (n.summaryEn && n.summaryEn.toLowerCase().includes(q)) ||
          (n.body && n.body.toLowerCase().includes(q)) ||
          (n.author && n.author.toLowerCase().includes(q))
        );
      }

      if (filter.limit && filter.limit > 0) {
        list = list.slice(0, filter.limit);
      }
    }

    return list;
  }

  getNewsDrafts(): NewsArticle[] {
    return this.data.news
      .filter(n => n.status === 'draft')
      .map(normalizeNewsArticle)
      .sort((a, b) => {
        const dateA = new Date(a.published_date || a.publishedDate || 0).getTime();
        const dateB = new Date(b.published_date || b.publishedDate || 0).getTime();
        return dateB - dateA;
      });
  }

  getNewsByIdOrSlug(idOrSlug: string, allowDraft: boolean = false): NewsArticle | undefined {
    const found = this.data.news.find(n => n.id === idOrSlug || n.slug === idOrSlug);
    if (!found) return undefined;
    const normalized = normalizeNewsArticle(found);
    if (!allowDraft && normalized.status === 'draft') {
      return undefined;
    }
    return normalized;
  }

  addNewsDraft(draftData: Partial<NewsArticle> & { title: string; slug: string; body: string }): NewsArticle {
    const rawArticle: any = {
      id: `art-draft-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: draftData.title,
      titleEn: draftData.titleEn || draftData.title,
      titleAr: draftData.titleAr || draftData.title,
      slug: draftData.slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
      body: draftData.body,
      contentEn: draftData.body,
      summaryEn: draftData.summaryEn || (draftData.body.slice(0, 160) + '...'),
      summaryAr: draftData.summaryAr || (draftData.body.slice(0, 160) + '...'),
      category: draftData.category || 'Funding News',
      source_links: draftData.source_links || draftData.sourceLinks || [],
      sourceLinks: draftData.source_links || draftData.sourceLinks || [],
      published_date: draftData.published_date || draftData.publishedDate || new Date().toISOString().split('T')[0],
      publishedDate: draftData.published_date || draftData.publishedDate || new Date().toISOString().split('T')[0],
      status: 'draft',
      author_note: draftData.author_note || draftData.authorNote || '',
      authorNote: draftData.author_note || draftData.authorNote || '',
      readTimeMinutes: draftData.readTimeMinutes || 3,
      author: draftData.author || 'Ventures.qa Intelligence Desk',
      sourceCitation: draftData.source_links?.[0]?.name || draftData.sourceCitation || 'Sourced Reporting',
      sourceUrl: draftData.source_links?.[0]?.url || draftData.sourceUrl,
      relatedEntityIds: draftData.relatedEntityIds || [],
      comments: [],
      likesCount: 0
    };

    const normalized = normalizeNewsArticle(rawArticle);
    this.data.news.unshift(normalized);
    this.save();
    return normalized;
  }

  updateNewsDraft(id: string, updates: Partial<NewsArticle>): NewsArticle | undefined {
    const index = this.data.news.findIndex(n => n.id === id || n.slug === id);
    if (index === -1) return undefined;

    const current = this.data.news[index];
    const updated = normalizeNewsArticle({
      ...current,
      ...updates,
      id: current.id,
      slug: updates.slug ? updates.slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-') : current.slug,
      source_links: updates.source_links || updates.sourceLinks || current.source_links,
      sourceLinks: updates.source_links || updates.sourceLinks || current.source_links
    });

    this.data.news[index] = updated;
    this.save();
    return updated;
  }

  deleteNewsDraft(id: string): boolean {
    const initialLen = this.data.news.length;
    this.data.news = this.data.news.filter(n => n.id !== id && n.slug !== id);
    if (this.data.news.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  approveAndPublishDraft(id: string): NewsArticle | undefined {
    const index = this.data.news.findIndex(n => n.id === id || n.slug === id);
    if (index === -1) return undefined;

    const article = this.data.news[index];
    article.status = 'published';
    const today = new Date().toISOString().split('T')[0];
    article.published_date = today;
    article.publishedDate = today;

    const normalized = normalizeNewsArticle(article);
    this.data.news[index] = normalized;
    this.save();

    // Trigger newsletter weekly digest distribution hook for subscriber list
    this.sendWeeklyDigest();

    return normalized;
  }

  sendWeeklyDigest(): { success: boolean; subscribersCount: number; message: string } {
    const publishedArticles = this.getNews({ limit: 4 });
    const count = this.data.newsletterSubscribers.length;
    if (publishedArticles.length === 0 || count === 0) {
      return { success: true, subscribersCount: count, message: 'No published articles or subscribers found.' };
    }

    const leadArticle = publishedArticles[0];
    const subject = `Ventures.qa Weekly Digest: ${leadArticle.title}`;
    
    const digestList = publishedArticles.map((art, idx) => 
      `${idx + 1}. ${art.title || art.titleEn} [${art.category}]\n   URL: https://ventures.qa/news/${art.slug}\n   Summary: ${art.summaryEn || (art.body ? art.body.slice(0, 140) : '')}...`
    ).join('\n\n');

    for (const sub of this.data.newsletterSubscribers) {
      this.logEmail(
        sub.email,
        subject,
        'newsletter',
        `Dear Ventures.qa Subscriber,\n\nHere is your verified weekly briefing on Qatar's venture capital deals, regulatory shifts, and startup spotlights:\n\n${digestList}\n\nExplore directory entity profiles and deal terms at https://ventures.qa\n\nIndependent Third-Party Intelligence | Ventures.qa`
      );
    }

    return {
      success: true,
      subscribersCount: count,
      message: `Weekly digest containing ${publishedArticles.length} published dispatches sent to ${count} active subscribers.`
    };
  }

  getNewsletterSubscribers() {
    return this.data.newsletterSubscribers;
  }

  addNewsComment(newsId: string, comment: { authorName: string; authorRole: string; authorOrg?: string; comment: string }): NewsArticle | undefined {
    const article = this.data.news.find(n => n.id === newsId || n.slug === newsId);
    if (!article) return undefined;

    const newComment = {
      id: `comm-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      authorName: comment.authorName,
      authorRole: comment.authorRole,
      authorOrg: comment.authorOrg,
      comment: comment.comment,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    article.comments = article.comments || [];
    article.comments.push(newComment);
    this.save();
    return normalizeNewsArticle(article);
  }

  likeNewsArticle(newsId: string): number {
    const article = this.data.news.find(n => n.id === newsId || n.slug === newsId);
    if (!article) return 0;
    article.likesCount = (article.likesCount || 0) + 1;
    this.save();
    return article.likesCount;
  }

  // --- CAPITAL INDEX & REPORT ---
  getIndexQuarters(): CapitalIndexQuarter[] {
    return this.data.indexQuarters;
  }

  getStateOfCapitalReport(): StateOfCapitalReport {
    return this.data.report;
  }

  // --- DEALS & MARKETPLACE ---
  getDeals(sector?: string): RaisingOpportunity[] {
    let list = [...this.data.deals];
    if (sector && sector !== 'All') {
      list = list.filter(d => d.sector.toLowerCase() === sector.toLowerCase());
    }
    return list;
  }

  addDeal(deal: RaisingOpportunity): RaisingOpportunity {
    this.data.deals.unshift(deal);
    this.save();
    return deal;
  }

  requestDealIntro(request: Omit<DealIntroRequest, 'id' | 'createdAt' | 'status'>): DealIntroRequest {
    const newRequest: DealIntroRequest = {
      id: `intro-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...request,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    this.data.dealIntros.unshift(newRequest);
    this.data.analytics.facilitatedIntroductions = (this.data.analytics.facilitatedIntroductions || 0) + 1;
    this.save();

    // Log email to investor
    this.logEmail(
      newRequest.investorEmail,
      `Ventures.qa: Introduction Request Submitted for ${newRequest.companyName}`,
      'deal_intro',
      `Dear ${newRequest.investorName},\n\nWe have received your direct capital introduction request for ${newRequest.companyName} (${newRequest.checkSizeUsd}).\nOur compliance team is verifying credentials under our standard 1.5% success fee mandate.`
    );

    return newRequest;
  }

  getInvestorDemands(): InvestorDemand[] {
    return this.data.investorDemands;
  }

  addInvestorDemand(demand: InvestorDemand): InvestorDemand {
    this.data.investorDemands.unshift(demand);
    this.save();
    return demand;
  }

  // --- EVENTS ---
  getEvents(type?: string): EcosystemEvent[] {
    let list = [...this.data.events];
    if (type && type !== 'all') {
      list = list.filter(e => e.type === type);
    }
    return list;
  }

  addEvent(event: EcosystemEvent): EcosystemEvent {
    this.data.events.unshift(event);
    this.save();
    return event;
  }

  // --- JOBS ---
  getJobs(sector?: string, type?: string): EcosystemJob[] {
    let list = [...this.data.jobs];
    if (sector && sector !== 'All') {
      list = list.filter(j => j.sector.toLowerCase() === sector.toLowerCase());
    }
    if (type && type !== 'All') {
      list = list.filter(j => j.type.toLowerCase() === type.toLowerCase());
    }
    return list;
  }

  addJob(job: EcosystemJob): EcosystemJob {
    this.data.jobs.unshift(job);
    this.save();
    return job;
  }

  // --- RESOURCES ---
  getResources(): EcosystemResource[] {
    return this.data.resources;
  }

  // --- SAVED SEARCH ALERTS ---
  saveSearchAlert(alert: { userEmail: string; sector?: string; stage?: string; keyword?: string }): SavedSearchAlert {
    const newAlert: SavedSearchAlert = {
      id: `alert-${Date.now()}`,
      userEmail: alert.userEmail,
      sector: alert.sector,
      stage: alert.stage,
      keyword: alert.keyword,
      createdAt: new Date().toISOString()
    };
    this.data.alerts.push(newAlert);
    this.save();

    this.logEmail(
      alert.userEmail,
      'Ventures.qa Saved Search Alert Activated',
      'alert',
      `Your search criteria (Sector: ${alert.sector || 'Any'}, Stage: ${alert.stage || 'Any'}, Keyword: ${alert.keyword || 'None'}) has been registered. You will receive an instant email digest whenever a matching startup, deal, or research note is published.`
    );

    return newAlert;
  }

  // --- NEWSLETTER ---
  subscribeNewsletter(email: string, language: string = 'en'): { success: boolean; message: string } {
    const existing = this.data.newsletterSubscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: true, message: 'You are already subscribed to the Ventures.qa Intelligence Brief.' };
    }

    this.data.newsletterSubscribers.push({
      email,
      language,
      subscribedAt: new Date().toISOString()
    });
    this.save();

    this.logEmail(
      email,
      'Welcome to the Ventures.qa Weekly Capital Dispatch',
      'newsletter',
      'Thank you for subscribing to the independent Qatar venture capital intelligence newsletter. You will receive our weekly startup spotlights, funding updates, and quarterly index analyses directly in your inbox.'
    );

    return { success: true, message: 'Successfully subscribed to the weekly dispatch.' };
  }

  // --- PAYMENTS & STRIPE SIMULATION ---
  createPaymentOrder(order: { itemType: PaymentOrder['itemType']; customerEmail: string; description: string }): PaymentOrder {
    let amountUsd = 99;
    if (order.itemType === 'featured_deal') amountUsd = 299;
    if (order.itemType === 'qpci_subscription') amountUsd = 149;

    const newOrder: PaymentOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      orderNumber: `VQA-${Math.floor(100000 + Math.random() * 900000)}`,
      itemType: order.itemType,
      amountUsd,
      amountQar: Math.round(amountUsd * 3.64),
      status: 'completed',
      customerEmail: order.customerEmail,
      description: order.description,
      createdAt: new Date().toISOString()
    };

    this.data.paymentOrders.unshift(newOrder);

    // If QPCI pro subscription, upgrade user if registered
    if (order.itemType === 'qpci_subscription') {
      const user = this.data.users.find(u => u.email.toLowerCase() === order.customerEmail.toLowerCase());
      if (user) {
        user.subscriptionTier = 'pro';
      }
    }

    this.save();

    this.logEmail(
      order.customerEmail,
      `Receipt: Ventures.qa Order #${newOrder.orderNumber} Completed`,
      'newsletter',
      `Thank you for your payment of $${newOrder.amountUsd} USD (${newOrder.amountQar} QAR) for ${newOrder.description}.\nReceipt ID: ${newOrder.orderNumber}`
    );

    return newOrder;
  }

  // --- FILE UPLOADS ---
  registerUploadedFile(file: { originalName: string; mimeType: string; size: number; base64OrDataUrl: string; isPrivate?: boolean }) {
    const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const url = `/api/files/${fileId}`;

    const record = {
      id: fileId,
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      url,
      uploadedAt: new Date().toISOString(),
      isPrivate: !!file.isPrivate
    };

    this.data.uploadedFiles.push(record);
    this.save();

    return record;
  }

  // --- EMAIL DISPATCH SIMULATOR & AUDIT ---
  logEmail(to: string, subject: string, type: EmailLog['type'], content: string) {
    const log: EmailLog = {
      id: `email-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      to,
      subject,
      type,
      content,
      sentAt: new Date().toISOString()
    };
    this.data.emailLogs.unshift(log);
    // Keep max 200 logs
    if (this.data.emailLogs.length > 200) {
      this.data.emailLogs = this.data.emailLogs.slice(0, 200);
    }
    this.save();
    console.log(`[Email Dispatched] To: ${to} | Subject: "${subject}"`);
  }

  getEmailLogs(): EmailLog[] {
    return this.data.emailLogs;
  }

  // --- ACQUISITION & PARTNERSHIP PROSPECTUS ---
  recordAcquisitionInquiry(params: Omit<AcquisitionInquiry, 'id' | 'createdAt'>): AcquisitionInquiry {
    if (!this.data.acquisitionInquiries) {
      this.data.acquisitionInquiries = [];
    }
    const inquiry: AcquisitionInquiry = {
      id: `acq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...params,
      createdAt: new Date().toISOString()
    };
    this.data.acquisitionInquiries.unshift(inquiry);
    this.save();

    // Log notification email simulation
    this.logEmail(
      'acquisitions@ventures.qa',
      `[Prospectus Alert] New ${inquiry.inquiryType.toUpperCase()} Inquiry from ${inquiry.organization}`,
      'alert',
      `New Acquisition Inquiry:\nName: ${inquiry.name}\nOrganization: ${inquiry.organization}\nEmail: ${inquiry.email}\nScope: ${inquiry.inquiryType}\nBudget/Valuation Range: ${inquiry.estimatedBudget || 'Not specified'}\nMessage: ${inquiry.message || 'None'}`
    );

    return inquiry;
  }

  getAcquisitionInquiries(): AcquisitionInquiry[] {
    return this.data.acquisitionInquiries || [];
  }

  // --- ADMIN METRICS & MODERATION ---
  getAdminStats() {
    return {
      totalUsers: this.data.users.length,
      totalEntities: this.data.entities.length,
      claimedEntities: this.data.entities.filter(e => e.claimed).length,
      activeDeals: this.data.deals.length,
      pendingIntros: this.data.dealIntros.filter(i => i.status === 'pending').length,
      pendingDrafts: this.data.news.filter(n => n.status === 'draft').length,
      publishedArticles: this.data.news.filter(n => n.status === 'published').length,
      totalIntros: this.data.dealIntros.length,
      newsletterSubscribers: this.data.newsletterSubscribers.length,
      savedAlerts: this.data.alerts.length,
      totalOrders: this.data.paymentOrders.length,
      totalRevenueUsd: this.data.paymentOrders.reduce((sum, o) => sum + o.amountUsd, 0) + 276000,
      moderationQueue: this.data.moderationQueue,
      emailLogsRecent: this.data.emailLogs.slice(0, 10),
      recentOrders: this.data.paymentOrders.slice(0, 5)
    };
  }
}

export const db = new DatabaseStore();
