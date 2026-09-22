export type Language = 'en' | 'ar';

export type EntityType = 'startup' | 'investor' | 'incubator' | 'soe' | 'enterprise';

export const SECTORS = [
  'FinTech',
  'Logistics & Supply Chain',
  'FoodTech',
  'Robotics & AI',
  'HealthTech',
  'BioTech/HealthTech',
  'Active Investors & VCs',
  'Enterprise & Growth',
  'Energy & CleanTech',
  'AgriFood & FoodTech',
  'HealthTech & Bio',
  'Enterprise & SaaS',
  'PropTech & ConTech',
  'DeepTech & AI',
  'SportsTech & Media',
  'Tourism & Hospitality',
  'Industrial & Sovereignty',
  'Other Sectors'
] as const;

export type Sector = (typeof SECTORS)[number];

export type ActiveModule = 
  | 'directory' 
  | 'news' 
  | 'intelligence' 
  | 'deals' 
  | 'marketplace'
  | 'alignment'
  | 'events' 
  | 'jobs' 
  | 'resources';

export type UserRole = 'startup' | 'investor' | 'admin' | 'analyst';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  verified: boolean;
  avatar?: string;
  subscriptionTier?: 'free' | 'pro' | 'institutional';
}

export interface NewsComment {
  id: string;
  authorName: string;
  authorRole: string;
  authorOrg?: string;
  comment: string;
  createdAt: string;
  likes: number;
}

export interface SourceLink {
  name: string;
  url: string;
}

export type NewsCategory = 
  | 'Funding News' 
  | 'Policy & Regulation' 
  | 'Market Trends' 
  | 'Startup Spotlight' 
  | 'Events'
  | 'funding' 
  | 'policy' 
  | 'trends' 
  | 'spotlight' 
  | 'events';

export interface NewsArticle {
  id: string;
  slug: string;
  title?: string;
  titleEn: string;
  titleAr?: string;
  summaryEn: string;
  summaryAr?: string;
  body?: string;
  contentEn?: string;
  contentAr?: string;
  category: NewsCategory;
  source_links?: SourceLink[];
  sourceLinks?: SourceLink[];
  published_date?: string;
  publishedDate: string;
  status?: 'draft' | 'published';
  author_note?: string;
  authorNote?: string;
  readTimeMinutes?: number;
  author?: string;
  sourceCitation?: string;
  sourceUrl?: string;
  isSpotlight?: boolean;
  spotlightCompanyId?: string;
  spotlightStats?: Array<{ label: string; value: string }>;
  relatedEntityIds?: string[];
  comments?: NewsComment[];
  likesCount?: number;
}

export interface EcosystemEvent {
  id: string;
  titleEn: string;
  titleAr: string;
  organizer: string;
  type: 'pitch' | 'conference' | 'meetup' | 'demoday' | 'workshop';
  date: string;
  time: string;
  location: string;
  locationAr: string;
  isVirtual: boolean;
  descriptionEn: string;
  descriptionAr: string;
  registrationUrl: string;
  isFeatured?: boolean;
}

export interface EcosystemJob {
  id: string;
  titleEn: string;
  titleAr: string;
  companyName: string;
  companyLogo?: string;
  sector: Sector;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location: string;
  locationAr: string;
  salaryRange: string;
  descriptionEn: string;
  descriptionAr: string;
  applyUrl: string;
  isFeatured?: boolean;
  postedDate: string;
}

export interface EcosystemResource {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'template' | 'guide' | 'legal' | 'market';
  fileType: 'XLSX' | 'PDF' | 'DOCX';
  fileFormat?: string;
  size: string;
  fileSize?: string;
  descriptionEn: string;
  descriptionAr: string;
  downloadsCount: number;
  sampleContent?: string;
}

export interface SavedSearchAlert {
  id: string;
  userEmail: string;
  sector?: string;
  stage?: string;
  keyword?: string;
  createdAt: string;
}

export interface PaymentOrder {
  id: string;
  orderNumber: string;
  itemType: 'featured_deal' | 'job_listing' | 'qpci_subscription';
  amountUsd: number;
  amountQar: number;
  status: 'completed' | 'pending';
  customerEmail: string;
  description: string;
  createdAt: string;
}

export const STAGES = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B+',
  'Growth',
  'Acquired',
  'Early Stage',
  'Enterprise & Growth',
  'SOE / National Champion',
  'Multi-stage'
] as const;

export type Stage = (typeof STAGES)[number];

export interface FundingRound {
  round: string;
  amountQar: string;
  amountUsd: string;
  date: string;
  leadInvestor: string;
  coInvestors?: string[];
}

export interface KeyPerson {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
}

export interface EntityProfile {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  oneLineDescription?: string;
  oneLineDescriptionAr?: string;
  description: string;
  descriptionAr: string;
  type: EntityType;
  sector: Sector;
  stage: Stage;
  foundedYear: number;
  teamSize: string;
  headquarters: string;
  headquartersAr: string;
  website: string;
  logo: string;
  logoBg?: string;
  verified: boolean;
  claimed: boolean;
  claimedByEmail?: string;
  crNumber?: string;
  verificationStatus?: string;
  sourcingNote?: string;
  isEnterprise?: boolean;
  totalFundingRaisedQar?: string;
  totalFundingRaisedUsd?: string;
  aumUsd?: string;
  checkSizeRange?: string;
  fundingRounds?: FundingRound[];
  soeAffiliation?: string;
  soeAffiliationAr?: string;
  institutionalBacking: string[];
  keyPeople: KeyPerson[];
  metrics: { [key: string]: string };
  isFeatured?: boolean;
  contactEmail?: string;
  pitchDeckRequested?: boolean;
}

export interface MarketIntelligenceItem {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
  summaryAr: string;
  category: 'funding' | 'ma' | 'soe_consolidation' | 'policy' | 'index_update';
  date: string;
  entityId?: string;
  dealSizeQar?: string;
  dealSizeUsd?: string;
  participants: string[];
  isPremium: boolean;
  fullDossier?: {
    thesis: string;
    thesisAr: string;
    regulatoryImpact: string;
    regulatoryImpactAr: string;
    valuationEstimate?: string;
    keySignificance: string;
    keySignificanceAr: string;
  };
}

export interface SectorBreakdownItem {
  sector: Sector;
  percentage: number;
  volumeUsdM: number;
}

export interface CapitalIndexQuarter {
  quarter: string; // e.g. "Q3 2026"
  totalDisclosedFundingUsdMillions: number;
  totalDisclosedFundingQarMillions: number;
  dealCount: number;
  avgDealSizeUsdMillions: number;
  sovereignCoInvestmentRatio: number; // percentage e.g. 68%
  topSector: Sector;
  growthYoY: number; // percentage
  sectorBreakdown: SectorBreakdownItem[];
  commentaryEn: string;
  commentaryAr: string;
}

export interface RaisingOpportunity {
  id: string;
  companyId: string;
  companyName: string;
  companyNameAr: string;
  sector: Sector;
  roundStage: Stage;
  targetAmountQar: string;
  targetAmountUsd: string;
  raisedSoFarPercent: number;
  minCheckUsd: string;
  useOfFunds: Array<{ category: string; categoryAr: string; percentage: number }>;
  tractionARRUsd: string;
  momGrowthPercent: number;
  customerCount: string;
  pitchDeckAvailable: boolean;
  dataRoomProtected?: boolean;
  isFeatured: boolean;
  status: 'active' | 'evaluating' | 'closing';
  location: string;
  locationAr: string;
}

export interface InvestorDemand {
  id: string;
  investorId: string;
  investorName: string;
  investorNameAr: string;
  type: 'VC Fund' | 'Sovereign / Semi-Gov' | 'Family Office' | 'Corporate Venture' | 'Angel Syndicate';
  targetSectors: Sector[];
  stagePreference: Stage[];
  typicalCheckSize: string;
  minCheckUsd: number;
  maxCheckUsd: number;
  activeDeployingMandate: boolean;
  allocatedDryPowderUsd: string;
  thesisSummaryEn: string;
  thesisSummaryAr: string;
}

export interface IntroRequest {
  id: string;
  senderType: 'startup' | 'investor';
  senderName: string;
  senderEmail: string;
  senderOrg: string;
  targetEntityId: string;
  targetEntityName: string;
  purpose: string;
  status: 'pending_moderation' | 'approved' | 'rejected' | 'connected';
  submittedAt: string;
  dealSizeEstimate?: string;
  successFeeAcknowledged: boolean;
}

export interface StateOfCapitalReport {
  id: string;
  titleEn: string;
  titleAr: string;
  edition: string;
  publicationDate: string;
  quarterLabel: string;
  executiveSummaryEn: string;
  executiveSummaryAr: string;
  methodology?: string;
  methodologyAr?: string;
  totalAumTrackedUsd: string;
  activeDealsTracked: number;
  keyPillars: Array<{
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    metric: string;
  }>;
  keyFindingsEn?: string[];
  keyFindingsAr?: string[];
}

export interface PlatformAnalytics {
  totalVisitors30d: number;
  uniqueInstitutions: number;
  activeMandatesQarM: number;
  dealIntroductionsCount: number;
  geoBreakdown: Array<{ country: string; flag: string; percentage: number }>;
  moduleViews: Array<{ module: string; moduleAr: string; views: number }>;
  totalEntitiesListed?: number;
  verifiedClaimPercentage?: number;
  activeDealFlowMandates?: number;
  facilitatedIntroductions?: number;
  monthlyApiQueries?: number;
  closedDealsThroughPlatform?: number;
  totalCapitalDeployedUsd?: string;
  platformFeeRevenueUsd?: string;
}
