import React, { useState } from 'react';
import { EcosystemJob, Language, Sector, SECTORS } from '../types';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  PlusCircle, 
  ExternalLink, 
  Sparkles, 
  X, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface JobsBoardModuleProps {
  language: Language;
  jobs: EcosystemJob[];
  onAddJob: (job: EcosystemJob) => void;
}

export const JobsBoardModule: React.FC<JobsBoardModuleProps> = ({
  language,
  jobs,
  onAddJob
}) => {
  const isAr = language === 'ar';
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingJobData, setPendingJobData] = useState<EcosystemJob | null>(null);

  // Form State
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState<Sector>('FinTech');
  const [type, setType] = useState<EcosystemJob['type']>('Full-time');
  const [location, setLocation] = useState('Doha, Qatar');
  const [locationAr, setLocationAr] = useState('الدوحة، قطر');
  const [salaryRange, setSalaryRange] = useState('25,000 – 35,000 QAR / month');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const [isFeaturedOption, setIsFeaturedOption] = useState(false);

  const filteredJobs = jobs.filter(j => {
    const matchesSector = selectedSector === 'All' || j.sector === selectedSector;
    const matchesType = selectedType === 'All' || j.type === selectedType;
    return matchesSector && matchesType;
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: EcosystemJob = {
      id: `job-${Date.now()}`,
      titleEn,
      titleAr: titleAr || titleEn,
      companyName,
      sector,
      type,
      location,
      locationAr,
      salaryRange,
      descriptionEn,
      descriptionAr: descriptionEn,
      applyUrl: applyUrl || 'https://ventures.qa/jobs',
      isFeatured: isFeaturedOption,
      postedDate: new Date().toISOString().split('T')[0]
    };

    if (isFeaturedOption) {
      setPendingJobData(newJob);
      setShowPaymentModal(true);
      setShowPostJobModal(false);
    } else {
      try {
        await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newJob)
        });
      } catch (err) {
        console.error(err);
      }
      onAddJob(newJob);
      setShowPostJobModal(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (pendingJobData) {
      const featuredJob = { ...pendingJobData, isFeatured: true };
      try {
        await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(featuredJob)
        });
      } catch (err) {
        console.error(err);
      }
      onAddJob(featuredJob);
      setPendingJobData(null);
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#8A1538]/10 text-[#8A1538] font-mono">
              {isAr ? 'منصة التوظيف التكنولوجي' : 'TECH & VENTURE TALENT'}
            </span>
            <span className="text-xs text-[#7A6D6D]">
              • {isAr ? 'وظائف الشركات الناشئة والصناديق' : 'Verified Startup & Venture Capital Openings'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'لوحة وظائف منظومة الابتكار' : 'Ecosystem Jobs Board'}
          </h2>
          <p className="text-xs text-[#5A4E4E] max-w-2xl mt-1">
            {isAr
              ? 'فرص عمل حصرية في كبرى الشركات التكنولوجية الناشئة وصناديق الاستثمار الجريء الرائدة في دولة قطر.'
              : 'Direct hiring opportunities in high-growth technology scaleups, venture capital funds, and FinTech platforms in Doha and Lusail.'}
          </p>
        </div>

        <button
          onClick={() => setShowPostJobModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isAr ? 'نشر إعلان وظيفي' : 'Post a Job ($99 Featured)'}</span>
        </button>
      </div>

      {/* Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSector('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSector === 'All'
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'bg-white hover:bg-[#FAF8F5] text-[#5A4E4E] border border-[#E8DFC8]'
            }`}
          >
            {isAr ? 'كافة القطاعات' : 'All Sectors'}
          </button>
          {['FinTech', 'Logistics & Supply Chain', 'HealthTech & Bio', 'Enterprise & SaaS', 'DeepTech & AI'].map(s => (
            <button
              key={s}
              onClick={() => setSelectedSector(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSector === s
                  ? 'bg-[#8A1538] text-white shadow-sm'
                  : 'bg-white hover:bg-[#FAF8F5] text-[#5A4E4E] border border-[#E8DFC8]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {['All', 'Full-time', 'Contract'].map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedType === t
                  ? 'bg-[#1E1919] text-white'
                  : 'text-[#7A6D6D] hover:bg-[#FAF8F5]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Listing */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className={`bg-white rounded-2xl border ${
              job.isFeatured ? 'border-[#C5A059] shadow-md bg-gradient-to-r from-white to-[#FAF8F5]' : 'border-[#E8DFC8]'
            } hover:border-[#8A1538] p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4`}
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-[#8A1538] bg-[#8A1538]/10 px-2.5 py-0.5 rounded-md">
                  {job.companyName}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF8F5] text-[#5A4E4E] border border-[#E8DFC8]">
                  {job.sector}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF8F5] text-[#5A4E4E] border border-[#E8DFC8]">
                  {job.type}
                </span>
                {job.isFeatured && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C5A059] text-[#1E1919] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#1E1919]">
                {isAr ? job.titleAr : job.titleEn}
              </h3>

              <p className="text-xs text-[#5A4E4E] leading-relaxed line-clamp-2">
                {isAr ? job.descriptionAr : job.descriptionEn}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A6D6D] pt-1 font-mono">
                <div className="flex items-center gap-1 text-[#8A1538] font-bold">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{job.salaryRange}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isAr ? job.locationAr : job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{job.postedDate}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 self-end md:self-auto">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>{isAr ? 'التقديم الآن' : 'Apply Directly'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-lg shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#8A1538] text-white p-5 relative shrink-0">
              <button
                onClick={() => setShowPostJobModal(false)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-white/80 hover:text-white bg-black/20"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold">
                {isAr ? 'نشر إعلان وظيفي في المنظومة' : 'Post an Ecosystem Job'}
              </h3>
              <p className="text-xs text-white/80">
                {isAr ? 'الوصول إلى نخبة الكفاءات التكنولوجية ورواد الأعمال' : 'Connect with top software engineers, venture associates, and operators'}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'المسمى الوظيفي (بالإنجليزية) *' : 'Job Title (English) *'}
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Senior Backend Engineer"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                    {isAr ? 'اسم الشركة *' : 'Company Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. SkipCash"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                    {isAr ? 'القطاع *' : 'Sector *'}
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as Sector)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                  >
                    {SECTORS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                    {isAr ? 'نوع العقد *' : 'Employment Type *'}
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as EcosystemJob['type'])}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                    {isAr ? 'الموقع في قطر *' : 'Location *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. West Bay, Doha"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'نطاق الراتب التقديري' : 'Salary Range'}
                </label>
                <input
                  type="text"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  placeholder="e.g. 28,000 – 38,000 QAR / month"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'رابط التقديم أو البريد الإلكتروني *' : 'Application Link or Email *'}
                </label>
                <input
                  type="url"
                  required
                  value={applyUrl}
                  onChange={(e) => setApplyUrl(e.target.value)}
                  placeholder="https://company.qa/careers/job"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'وصف الوظيفة والمتطلبات *' : 'Job Description & Key Responsibilities *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Outline key expectations, tech stack, and benefits..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              {/* Upgrade to Featured */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeaturedOption}
                    onChange={(e) => setIsFeaturedOption(e.target.checked)}
                    className="rounded text-[#8A1538] focus:ring-[#8A1538] w-4 h-4"
                  />
                  <div>
                    <strong className="text-xs font-bold text-[#1E1919] block">
                      {isAr ? 'ترقية لإعلان وظيفي مميز ($99 USD / 360 QAR)' : 'Upgrade to Featured Job ($99 USD)'}
                    </strong>
                    <span className="text-[11px] text-[#7A6D6D] block">
                      {isAr
                        ? 'ظهور مثبت في صدارة القائمة وإبراز في النشرة البريدية الأسبوعية لـ 2400+ مشترك.'
                        : 'Pinned to top of jobs board & highlighted in the weekly newsletter dispatch.'}
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  {isFeaturedOption ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{isAr ? 'متابعة للدفع ($99)' : 'Proceed to Checkout ($99)'}</span>
                    </>
                  ) : (
                    <span>{isAr ? 'نشر الإعلان مجاناً' : 'Publish Free Listing'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal Integration for Featured Job */}
      {showPaymentModal && (
        <PaymentModal
          language={language}
          itemType="job_listing"
          itemTitle={pendingJobData?.titleEn}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
