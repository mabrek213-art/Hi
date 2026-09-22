import React, { useState } from 'react';
import { EntityProfile, Language } from '../types';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Calendar, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Code, 
  Share2, 
  Check, 
  Mail, 
  Landmark,
  ArrowRight,
  ArrowLeft,
  FileCheck
} from 'lucide-react';

interface EntityDetailModalProps {
  entity: EntityProfile | null;
  language: Language;
  onClose: () => void;
  onRequestIntro: (entity: EntityProfile) => void;
  onClaimProfile: (entity: EntityProfile) => void;
}

export const EntityDetailModal: React.FC<EntityDetailModalProps> = ({
  entity,
  language,
  onClose,
  onRequestIntro,
  onClaimProfile
}) => {
  if (!entity) return null;
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<'overview' | 'funding' | 'team' | 'seo'>('overview');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Generate dynamic Schema.org JSON-LD
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": entity.type === 'investor' ? "InvestmentFund" : "Organization",
    "name": entity.name,
    "alternateName": entity.nameAr,
    "url": entity.website,
    "description": entity.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": entity.headquarters,
      "addressCountry": "QA"
    },
    "foundingDate": entity.foundedYear.toString(),
    "knowsAbout": [entity.sector, "Qatar Innovation", "Doha Private Capital"],
    "memberOf": entity.institutionalBacking.map(b => ({
      "@type": "ProgramMembership",
      "programName": b
    }))
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(schemaJson, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://ventures.qa/entity/${entity.slug}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Qatari Maroon Accent */}
        <div className="bg-gradient-to-r from-[#6E0D29] via-[#8A1538] to-[#6E0D29] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-white/80 hover:text-white rounded-full bg-black/20 hover:bg-black/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-white/20 flex-shrink-0"
                style={{ backgroundColor: entity.logoBg || '#8A1538' }}
              >
                {entity.logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black tracking-tight text-white">
                    {isAr ? entity.nameAr : entity.name}
                  </h2>
                  {entity.verified && (
                    <span className="p-1 rounded-full bg-[#C5A059] text-[#6E0D29]" title="Verified by Ventures.qa">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-white/80 text-sm">
                  {isAr ? entity.name : entity.nameAr} • <span className="text-[#C5A059] font-medium">{entity.sector}</span>
                </p>
                <div className="flex items-center gap-3 text-xs text-white/70 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    {isAr ? entity.headquartersAr : entity.headquarters}
                  </span>
                  <span>•</span>
                  <span>Est. {entity.foundedYear}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyUrl}
                className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#C5A059]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
              </button>
              <a
                href={entity.website}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#b08e4a] text-[#1E1919] text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isAr ? 'الموقع الرسمي' : 'Official Web'}</span>
              </a>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-6 border-t border-white/20 pt-3">
            {[
              { id: 'overview', labelEn: 'Overview & Metrics', labelAr: 'نظرة عامة ومؤشرات' },
              { id: 'funding', labelEn: 'Capital & Deals', labelAr: 'التمويل وجولات الاستثمار' },
              { id: 'team', labelEn: 'Leadership', labelAr: 'القيادة التنفيذية' },
              { id: 'seo', labelEn: 'SEO & Schema.org', labelAr: 'بيانات محركات البحث SEO' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#8A1538]'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Executive Tagline & Statement */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <p className="text-base font-semibold text-[#1E1919] mb-2 leading-relaxed">
                  {isAr ? entity.taglineAr : entity.tagline}
                </p>
                <p className="text-xs text-[#5A4E4E] leading-relaxed">
                  {isAr ? entity.descriptionAr : entity.description}
                </p>
              </div>

              {/* Key Indicators Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D] mb-3">
                  {isAr ? 'المؤشرات التشغيلية والبيانات المعتمدة' : 'Verified Ecosystem Metrics'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-[#E8DFC8]">
                    <span className="text-[11px] text-[#7A6D6D] block">{isAr ? 'فئة الكيان' : 'Entity Class'}</span>
                    <span className="font-bold text-[#1E1919] uppercase text-xs">{entity.type}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E8DFC8]">
                    <span className="text-[11px] text-[#7A6D6D] block">{isAr ? 'المرحلة الحالية' : 'Stage'}</span>
                    <span className="font-bold text-[#8A1538] text-xs">{entity.stage}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E8DFC8]">
                    <span className="text-[11px] text-[#7A6D6D] block">{isAr ? 'حجم الفريق' : 'Team Size'}</span>
                    <span className="font-bold text-[#1E1919] text-xs">{entity.teamSize}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E8DFC8]">
                    <span className="text-[11px] text-[#7A6D6D] block">{isAr ? 'حالة التوثيق' : 'Claim Verification'}</span>
                    <span className="font-bold text-emerald-700 text-xs">
                      {entity.claimed ? (isAr ? 'موثق رسمياً' : 'Verified Claim') : (isAr ? 'غير موثق' : 'Unclaimed')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom Operating Metrics */}
              {entity.metrics && Object.keys(entity.metrics).length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D] mb-3">
                    {isAr ? 'مؤشرات الأداء السوقية' : 'Operating Performance Metrics'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(entity.metrics).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                        <span className="text-[10px] text-[#7A6D6D] uppercase block truncate">{key}</span>
                        <span className="font-mono font-bold text-sm text-[#1E1919]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Institutional Backing / Sovereign Alignment */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D] mb-3">
                  {isAr ? 'الارتباط المؤسسي وبرامج الدعم الوطنية' : 'Institutional Backing & Alignment'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {entity.institutionalBacking.map((inst, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[#8A1538]/10 text-[#8A1538] font-bold text-xs border border-[#8A1538]/20 flex items-center gap-1.5"
                    >
                      <Landmark className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{inst}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* SOE Mandate if applicable */}
              {entity.soeAffiliation && (
                <div className="p-4 rounded-xl bg-[#8A1538]/5 border-2 border-[#8A1538]/30 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#8A1538] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#8A1538] text-xs">
                      {isAr ? 'حوكمة وتطوير الشركات المؤسسية' : 'Enterprise Growth & Corporate Governance'}
                    </h5>
                    <p className="text-xs text-[#5A4E4E] mt-1">
                      {isAr ? entity.soeAffiliationAr : entity.soeAffiliation}
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: FUNDING & DEALS */}
          {activeTab === 'funding' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A6D6D] uppercase font-bold">
                    {entity.type === 'investor' || entity.type === 'soe' 
                      ? (isAr ? 'الأصول المدارة أو القيمة الاستثمارية' : 'Tracked AUM / Market Cap')
                      : (isAr ? 'إجمالي التمويل المكتمل' : 'Total Capital Raised')}
                  </span>
                  <p className="text-2xl font-black font-mono text-[#8A1538] mt-0.5">
                    {entity.totalFundingRaisedUsd || entity.aumUsd || entity.checkSizeRange || 'Confidential'}
                  </p>
                </div>
                {entity.totalFundingRaisedQar && (
                  <div className="text-right rtl:text-left">
                    <span className="text-xs text-[#7A6D6D] font-bold">{isAr ? 'المعادل بالريال القطري' : 'In Qatari Riyals'}</span>
                    <p className="text-lg font-bold font-mono text-[#1E1919]">{entity.totalFundingRaisedQar}</p>
                  </div>
                )}
              </div>

              {/* Funding Rounds Timeline */}
              {entity.fundingRounds && entity.fundingRounds.length > 0 ? (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D] mb-4">
                    {isAr ? 'سجل الجولات التمويلية الموثقة' : 'Verified Funding Round History'}
                  </h4>
                  <div className="space-y-3">
                    {entity.fundingRounds.map((round, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-[#E8DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded bg-[#8A1538] text-white text-xs font-bold font-mono">
                            {round.round}
                          </span>
                          <div>
                            <p className="font-bold text-[#1E1919] text-sm">
                              {round.amountUsd} <span className="text-xs text-[#7A6D6D] font-normal">({round.amountQar})</span>
                            </p>
                            <p className="text-xs text-[#5A4E4E]">
                              {isAr ? 'المستثمر الرئيسي:' : 'Lead Investor:'} <strong className="text-[#8A1538]">{round.leadInvestor}</strong>
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-[#7A6D6D] font-mono">
                          {round.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-xl border border-dashed border-[#D5C9B8]">
                  <TrendingUp className="w-8 h-8 text-[#8A1538] mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-[#5A4E4E]">
                    {isAr
                      ? 'التمويل يتم عبر الأطر الاستثمارية الخاصة أو التمويل الذاتي المؤسسي.'
                      : 'Funding is structured under private institutional or corporate investment frameworks.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TEAM & LEADERSHIP */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D] mb-2">
                {isAr ? 'فريق الإدارة التنفيذية ومجلس الإدارة' : 'Executive Leadership & Governance'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {entity.keyPeople.map((person, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#E8DFC8] flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#D5C9B8] flex items-center justify-center font-bold text-[#8A1538] text-lg">
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-[#1E1919]">
                        {isAr ? person.nameAr : person.name}
                      </h5>
                      <p className="text-xs text-[#8A1538] font-semibold">
                        {isAr ? person.roleAr : person.role}
                      </p>
                      <p className="text-[11px] text-[#7A6D6D]">
                        {isAr ? person.name : person.nameAr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SEO & SCHEMA.ORG */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6D6D]">
                    {isAr ? 'البيانات المنظمة لتهيئة محركات البحث (JSON-LD)' : 'Embedded Schema.org Structured Data'}
                  </h4>
                  <p className="text-xs text-[#5A4E4E] mt-0.5">
                    {isAr
                      ? 'يتم حقن هذه البيانات لضمان تصدر الكيان في نتائج بحث جوجل للشركات القطرية.'
                      : 'Structured data powering rich snippets and top ranking for "[Company] Qatar".'}
                  </p>
                </div>
                <button
                  onClick={handleCopySchema}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#8A1538] hover:text-white border border-[#E8DFC8] text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? (isAr ? 'تم النسخ' : 'Copied JSON-LD') : (isAr ? 'نسخ الكود' : 'Copy Schema')}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#1E1919] text-[#E2E8F0] font-mono text-xs overflow-x-auto border border-[#332B2B]">
                {JSON.stringify(schemaJson, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!entity.claimed && (
              <button
                onClick={() => { onClose(); onClaimProfile(entity); }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F2ECE4] border border-[#D5C9B8] text-xs font-bold text-[#8A1538] transition-all flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4 text-[#8A1538]" />
                <span>{isAr ? 'توثيق وإدارة هذا الملف' : 'Claim & Manage This Profile'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { onClose(); onRequestIntro(entity); }}
              className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 border border-[#C5A059]/40"
            >
              <span>{isAr ? 'طلب اجتماع أو تعارف استثماري' : 'Request Introduction / Deal Intro'}</span>
              <Arrow className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
