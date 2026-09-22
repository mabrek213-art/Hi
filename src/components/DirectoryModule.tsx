import React, { useState, useMemo } from 'react';
import { 
  EntityProfile, 
  EntityType, 
  Sector, 
  Stage, 
  Language, 
  SECTORS, 
  STAGES 
} from '../types';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Building2, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  Shield, 
  Sparkles, 
  X,
  FileCode,
  Bell,
  Check,
  Compass
} from 'lucide-react';

interface DirectoryModuleProps {
  entities: EntityProfile[];
  language: Language;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectEntity: (entity: EntityProfile) => void;
  onClaimProfile: (entity: EntityProfile) => void;
}

export const DirectoryModule: React.FC<DirectoryModuleProps> = ({
  entities,
  language,
  searchQuery,
  onSearchChange,
  onSelectEntity,
  onClaimProfile
}) => {
  const isAr = language === 'ar';

  // Filters
  const [selectedType, setSelectedType] = useState<EntityType | 'all'>('all');
  const [selectedSector, setSelectedSector] = useState<Sector | 'all'>('all');
  const [selectedStage, setSelectedStage] = useState<Stage | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Search Alert Modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSaved, setAlertSaved] = useState(false);

  const locations = useMemo(() => {
    const set = new Set<string>();
    entities.forEach(e => {
      const loc = e.headquarters.split(',')[0].trim();
      set.add(loc);
    });
    return Array.from(set);
  }, [entities]);

  const filteredEntities = useMemo(() => {
    return entities.filter(e => {
      if (selectedType !== 'all' && e.type !== selectedType) return false;
      if (selectedSector !== 'all' && e.sector !== selectedSector) return false;
      if (selectedStage !== 'all' && e.stage !== selectedStage) return false;
      if (selectedLocation !== 'all' && !e.headquarters.includes(selectedLocation)) return false;
      if (verifiedOnly && !e.verified) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = e.name.toLowerCase().includes(q) || e.nameAr.includes(q);
        const matchTagline = e.tagline.toLowerCase().includes(q) || e.taglineAr.includes(q);
        const matchDesc = e.description.toLowerCase().includes(q) || e.descriptionAr.includes(q);
        const matchSector = e.sector.toLowerCase().includes(q);
        const matchHq = e.headquarters.toLowerCase().includes(q) || e.headquartersAr.includes(q);
        const matchPeople = e.keyPeople.some(p => p.name.toLowerCase().includes(q) || p.nameAr.includes(q));
        if (!matchName && !matchTagline && !matchDesc && !matchSector && !matchHq && !matchPeople) {
          return false;
        }
      }
      return true;
    });
  }, [entities, selectedType, selectedSector, selectedStage, selectedLocation, verifiedOnly, searchQuery]);

  const typeCounts = useMemo(() => {
    return {
      all: entities.length,
      startup: entities.filter(e => e.type === 'startup').length,
      investor: entities.filter(e => e.type === 'investor').length,
      incubator: entities.filter(e => e.type === 'incubator').length,
      soe: entities.filter(e => e.type === 'soe').length,
    };
  }, [entities]);

  const resetFilters = () => {
    setSelectedType('all');
    setSelectedSector('all');
    setSelectedStage('all');
    setSelectedLocation('all');
    setVerifiedOnly(false);
    onSearchChange('');
  };

  const handleSaveAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;

    try {
      await fetch('/api/alerts/save-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: alertEmail,
          sector: selectedSector !== 'all' ? selectedSector : undefined,
          stage: selectedStage !== 'all' ? selectedStage : undefined,
          keyword: searchQuery || undefined
        })
      });
      setAlertSaved(true);
      setTimeout(() => {
        setAlertSaved(false);
        setShowAlertModal(false);
      }, 2500);
    } catch {
      setAlertSaved(true);
      setTimeout(() => {
        setAlertSaved(false);
        setShowAlertModal(false);
      }, 2500);
    }
  };

  const hasActiveFilters = selectedType !== 'all' || selectedSector !== 'all' || selectedStage !== 'all' || selectedLocation !== 'all' || verifiedOnly || searchQuery !== '';

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A1538] uppercase tracking-wider mb-1 font-mono">
            <Building2 className="w-4 h-4 text-[#C5A059]" />
            <span>{isAr ? 'الوحدة الأولى: الدليل المستقل' : 'Module 1: Verified Directory'}</span>
          </div>
          <h2 className="text-3xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'دليل الشركات والكيانات الاستثمارية في قطر' : 'Qatar Venture & Startup Directory'}
          </h2>
          <p className="text-sm text-[#6B5E5E] max-w-2xl mt-1">
            {isAr
              ? 'سجل مستقل ومحايد يضم الشركات الناشئة الموثقة، وصناديق رأس المال الجريء، والمكاتب العائلية، وحاضنات الابتكار في السوق القطري.'
              : 'The comprehensive, independent index of verified startups, active venture funds, angel syndicates, and private innovation hubs in Qatar.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAlertModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8DFC8] text-[#8A1538] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAr ? 'حفظ تنبيه البحث' : 'Save Search Alert'}</span>
          </button>

          <span className="text-xs px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] font-mono text-[#1E1919] font-bold">
            {filteredEntities.length} / {entities.length} {isAr ? 'كيان' : 'Entities'}
          </span>
        </div>
      </div>

      {/* Primary Category Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E8DFC8] pb-4">
        {[
          { id: 'all', labelEn: 'All Ecosystem Entities', labelAr: 'كافة الكيانات', count: typeCounts.all },
          { id: 'startup', labelEn: 'Startups & Scaleups', labelAr: 'الشركات الناشئة والواعدة', count: typeCounts.startup },
          { id: 'investor', labelEn: 'Active Investors & VCs', labelAr: 'المستثمرون وصناديق رأس المال', count: typeCounts.investor },
          { id: 'incubator', labelEn: 'Incubators & Tech Hubs', labelAr: 'الحاضنات ومراكز الابتكار', count: typeCounts.incubator },
          { id: 'soe', labelEn: 'Enterprise & Growth', labelAr: 'الشركات الكبرى والمؤسسية', count: typeCounts.soe }
        ].map((tab) => {
          const isActive = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#8A1538] text-white shadow-sm border border-[#6E0D29]'
                  : 'bg-white hover:bg-[#F2ECE4] text-[#4A3F3F] border border-[#E8DFC8]'
              }`}
            >
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                isActive ? 'bg-[#6E0D29] text-[#C5A059]' : 'bg-[#FAF8F5] text-[#8A1538]'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] p-4 mb-8 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Sector Select */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B5E5E] uppercase mb-1">
              {isAr ? 'القطاع الاقتصادي' : 'Economic Sector'}
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-xs font-semibold text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
            >
              <option value="all">{isAr ? 'كافة القطاعات' : 'All Sectors'}</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Stage Select */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B5E5E] uppercase mb-1">
              {isAr ? 'مرحلة التمويل' : 'Investment Stage'}
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-xs font-semibold text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
            >
              <option value="all">{isAr ? 'كافة المراحل' : 'All Stages'}</option>
              {STAGES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Location Select */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B5E5E] uppercase mb-1">
              {isAr ? 'الموقع في قطر' : 'Location in Qatar'}
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-xs font-semibold text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
            >
              <option value="all">{isAr ? 'كافة المناطق' : 'All Qatar Locations'}</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Search Filter input */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B5E5E] uppercase mb-1">
              {isAr ? 'بحث سريع' : 'Keyword Search'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={isAr ? 'اسم، مؤسس، تخصص...' : 'Name, founder, keyword...'}
                className="w-full pl-8 pr-3 rtl:pl-3 rtl:pr-8 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-xs font-semibold text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 rtl:left-auto rtl:right-2.5 top-2.5 text-[#8A1538]" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 rtl:right-auto rtl:left-2 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE1] text-xs">
            <span className="text-[#6B5E5E]">
              {isAr ? 'الفلاتر نشطة حالياً' : 'Filters currently active'}
            </span>
            <button
              onClick={resetFilters}
              className="text-[#8A1538] hover:underline font-bold"
            >
              {isAr ? 'إعادة ضبط كافة الفلاتر' : 'Reset All Filters'}
            </button>
          </div>
        )}
      </div>

      {/* Directory Grid */}
      {filteredEntities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-12 text-center">
          <Compass className="w-12 h-12 text-[#8A1538] mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-[#1E1919]">
            {isAr ? 'لم يتم العثور على نتائج مطابقة' : 'No entities match your filters'}
          </h3>
          <p className="text-sm text-[#6B5E5E] mt-1 max-w-md mx-auto">
            {isAr
              ? 'جرّب تغيير معايير البحث أو تصفح كافة الكيانات المسجلة في المنظومة.'
              : 'Try broadening your search query or reset filters to see all verified Qatari entities.'}
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-[#8A1538] text-white text-xs font-bold rounded-lg"
          >
            {isAr ? 'إظهار كافة الكيانات' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntities.map((entity) => {
            const isInvestor = entity.type === 'investor';
            const isIncubator = entity.type === 'incubator';

            return (
              <div
                key={entity.id}
                className="bg-white rounded-2xl border border-[#E8DFC8] hover:border-[#8A1538] hover:shadow-md transition-all p-5 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Header Card */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Logo Avatar */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: entity.logoBg || '#8A1538' }}
                      >
                        {entity.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 
                            onClick={() => onSelectEntity(entity)}
                            className="font-bold text-[#1E1919] text-base group-hover:text-[#8A1538] transition-colors cursor-pointer"
                          >
                            {isAr ? entity.nameAr : entity.name}
                          </h3>
                          {entity.verified && (
                            <span title="Verified Entity">
                              <CheckCircle2 className="w-4 h-4 text-[#8A1538] flex-shrink-0" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#7A6D6D]">
                          {isAr ? entity.name : entity.nameAr}
                        </p>
                      </div>
                    </div>

                    {/* Stage or Type Badge */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isInvestor
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : isIncubator
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}>
                      {entity.stage}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-[#4A3F3F] line-clamp-2 mb-3 leading-relaxed">
                    {isAr ? entity.taglineAr : entity.tagline}
                  </p>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#5A4E4E] font-medium">
                      {entity.sector}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8DFC8] text-[#5A4E4E] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8A1538]" />
                      <span className="truncate max-w-[140px]">
                        {isAr ? entity.headquartersAr : entity.headquarters}
                      </span>
                    </span>
                  </div>

                  {/* Financial Metrics Highlight */}
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DC] mb-3 text-xs flex items-center justify-between">
                    <span className="text-[#6B5E5E]">
                      {isInvestor ? (isAr ? 'الأصول / حجم الصندوق:' : 'Fund Size / Dry Powder:') : (isAr ? 'التمويل المحقق:' : 'Capital Raised:')}
                    </span>
                    <span className="font-mono font-bold text-[#8A1538]">
                      {isInvestor 
                        ? (entity.aumUsd || entity.checkSizeRange || 'Institutional Pool')
                        : (entity.totalFundingRaisedUsd || 'Private Equity')}
                    </span>
                  </div>

                  {/* Institutional Backing / Partner Syndicate */}
                  {entity.institutionalBacking && entity.institutionalBacking.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] text-[#7A6D6D] uppercase font-bold block mb-1">
                        {isAr ? 'المستثمرون والشركاء:' : 'Syndicate & Co-Investors:'}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {entity.institutionalBacking.slice(0, 2).map((back, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#8A1538]/5 text-[#8A1538] border border-[#8A1538]/15 font-medium">
                            {back}
                          </span>
                        ))}
                        {entity.institutionalBacking.length > 2 && (
                          <span className="text-[10px] px-1 py-0.5 text-[#7A6D6D]">
                            +{entity.institutionalBacking.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => onSelectEntity(entity)}
                    className="font-bold text-[#8A1538] hover:text-[#6E0D29] hover:underline flex items-center gap-1"
                  >
                    <span>{isAr ? 'عرض الملف والبيانات' : 'View Profile'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {!entity.claimed ? (
                    <button
                      onClick={() => onClaimProfile(entity)}
                      className="px-2.5 py-1 rounded bg-[#FAF8F5] hover:bg-[#8A1538] hover:text-white text-[#8A1538] border border-[#8A1538]/30 text-[11px] font-bold transition-all"
                    >
                      {isAr ? 'توثيق الحساب' : 'Claim Profile'}
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                      {isAr ? 'موثق' : 'Verified Claim'}
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* SEO & Structured Data Explainer Footnote */}
      <div className="mt-12 p-6 rounded-2xl bg-white border border-[#E8DFC8] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center flex-shrink-0">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1E1919]">
              {isAr ? 'محسّن لمحركات البحث (SEO & JSON-LD Structured Data)' : 'SEO & Structured Data Architecture'}
            </h4>
            <p className="text-xs text-[#6B5E5E]">
              {isAr
                ? 'كل ملف تعريفي مزود ببيانات Schema.org (Organization / FinancialService) باللغتين ليحتل المرتبة الأولى في بحث جوجل.'
                : 'Every profile embeds dual-language Schema.org JSON-LD to rank prominently for Qatari tech scaleups and venture funds.'}
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-[#8A1538] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E8DFC8]">
          schema.org/Organization & FinancialService
        </div>
      </div>

      {/* Save Search Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-md shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAlertModal(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-[#7A6D6D] hover:text-[#1E1919]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-[#8A1538]" />
              <h3 className="text-base font-bold text-[#1E1919]">
                {isAr ? 'حفظ تنبيه البحث الآلي' : 'Save Search Alert'}
              </h3>
            </div>

            <p className="text-xs text-[#5A4E4E] leading-relaxed mb-4">
              {isAr
                ? 'احصل على إشعار بريدي فوري بمجرد إدراج أي شركة ناشئة أو صفقة تطابق معايير هذا البحث.'
                : 'Get notified by email whenever a new startup or investment opportunity matches this sector or filter criteria.'}
            </p>

            <form onSubmit={handleSaveAlert} className="space-y-3">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-xs font-mono space-y-1">
                <div><strong>Sector:</strong> {selectedSector}</div>
                <div><strong>Stage:</strong> {selectedStage}</div>
                {searchQuery && <div><strong>Query:</strong> "{searchQuery}"</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'البريد الإلكتروني للإشعارات' : 'Your Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  placeholder="investor@fund.qa"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  {alertSaved ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>{isAr ? 'تم الحفظ بنجاح!' : 'Alert Activated!'}</span>
                    </>
                  ) : (
                    <span>{isAr ? 'تفعيل التنبيه' : 'Save Alert'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
