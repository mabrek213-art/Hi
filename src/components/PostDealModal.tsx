import React, { useState } from 'react';
import { Language, Sector, Stage, SECTORS, STAGES, RaisingOpportunity } from '../types';
import { 
  X, 
  PlusCircle, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

interface PostDealModalProps {
  language: Language;
  onClose: () => void;
  onSubmitDeal: (deal: RaisingOpportunity) => void;
}

export const PostDealModal: React.FC<PostDealModalProps> = ({
  language,
  onClose,
  onSubmitDeal
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [companyName, setCompanyName] = useState('');
  const [companyNameAr, setCompanyNameAr] = useState('');
  const [sector, setSector] = useState<Sector>('FinTech');
  const [stage, setStage] = useState<Stage>('Series A');
  const [location, setLocation] = useState('Doha, West Bay');
  const [locationAr, setLocationAr] = useState('الدوحة، الخليج الغربي');
  const [targetUsd, setTargetUsd] = useState('$3,000,000');
  const [targetQar, setTargetQar] = useState('10,950,000 QAR');
  const [minCheck, setMinCheck] = useState('$250,000');
  const [tractionArr, setTractionArr] = useState('$1,200,000');
  const [growthPercent, setGrowthPercent] = useState(18);
  const [customerCount, setCustomerCount] = useState('14,000 active users');
  const [isFeatured, setIsFeatured] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDeal: RaisingOpportunity = {
      id: 'deal-' + Date.now(),
      companyId: 'entity-' + Date.now(),
      companyName,
      companyNameAr: companyNameAr || companyName,
      sector,
      roundStage: stage,
      targetAmountUsd: targetUsd,
      targetAmountQar: targetQar,
      minCheckUsd: minCheck,
      raisedSoFarPercent: 15,
      tractionARRUsd: tractionArr,
      momGrowthPercent: Number(growthPercent),
      customerCount,
      pitchDeckAvailable: true,
      dataRoomProtected: true,
      useOfFunds: [
        { category: 'R&D and Engineering Expansion', categoryAr: 'البحث والتطوير وتوسيع الفريق التقني', percentage: 45 },
        { category: 'GCC Regional Export (Saudi/UAE)', categoryAr: 'التوسع الإقليمي بالخليج (السعودية والإمارات)', percentage: 35 },
        { category: 'Working Capital & Marketing', categoryAr: 'رأس المال العامل والتسويق', percentage: 20 }
      ],
      location,
      locationAr,
      isFeatured,
      status: 'active'
    };

    onSubmitDeal(newDeal);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#8A1538] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 text-white/80 hover:text-white rounded-full bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
              <PlusCircle className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                {isAr ? 'تسجيل جولة تمويل استثمارية جديدة' : 'List Active Fundraising Round'}
              </h3>
              <p className="text-xs text-white/80">
                {isAr ? 'سوق رأس المال المباشر للشركات القطرية' : 'Curated Deal-Flow Marketplace for Qatari Scaleups'}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#1E1919]">
                {isAr ? 'تم إدراج الجولة التمويلية بنجاح' : 'Fundraising Mandate Listed!'}
              </h4>
              <p className="text-xs text-[#5A4E4E] max-w-sm mx-auto leading-relaxed">
                {isAr
                  ? `أصبحت جولة شركة (${companyName}) متاحة الآن لكافة الصناديق والمستثمرين النشطين بالمنصة. سيتم إشعاركم بأي طلبات تعارف واردة.`
                  : `Your mandate for ${companyName} is now active in the deal-flow marketplace and algorithmic matchmaker.`}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 rounded-xl bg-[#8A1538] text-white font-bold text-xs shadow-md"
              >
                {isAr ? 'عرض المنصة' : 'View Marketplace'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'اسم الشركة (English) *' : 'Company Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Lusail Tech"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'اسم الشركة (بالعربية)' : 'Company Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={companyNameAr}
                    onChange={(e) => setCompanyNameAr(e.target.value)}
                    placeholder="مثل: لوسيل للتقنية"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'القطاع الاقتصادي *' : 'Economic Sector *'}
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  >
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'مرحلة الجولة *' : 'Round Stage *'}
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  >
                    {STAGES.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'المبلغ المستهدف (USD) *' : 'Target Amount (USD) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={targetUsd}
                    onChange={(e) => setTargetUsd(e.target.value)}
                    placeholder="$2,500,000"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'المبلغ المعادل (QAR)' : 'Target Amount (QAR)'}
                  </label>
                  <input
                    type="text"
                    value={targetQar}
                    onChange={(e) => setTargetQar(e.target.value)}
                    placeholder="9,125,000 QAR"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'أدنى شيك *' : 'Min Ticket *'}
                  </label>
                  <input
                    type="text"
                    value={minCheck}
                    onChange={(e) => setMinCheck(e.target.value)}
                    placeholder="$100,000"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'الإيرادات ARR *' : 'Traction ARR *'}
                  </label>
                  <input
                    type="text"
                    value={tractionArr}
                    onChange={(e) => setTractionArr(e.target.value)}
                    placeholder="$800,000"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'النمو الشهري %' : 'MoM Growth %'}
                  </label>
                  <input
                    type="number"
                    value={growthPercent}
                    onChange={(e) => setGrowthPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>
              </div>

              {/* Paid Featured Placement Option */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-[#F4EFEA] border-2 border-[#C5A059]/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <strong className="text-xs text-[#1E1919]">
                      {isAr ? 'ترقية الجولة إلى "جولة مميزة" (Featured)' : 'Featured Round Placement'}
                    </strong>
                  </div>
                  <p className="text-[11px] text-[#5A4E4E] mt-0.5">
                    {isAr ? 'ظهور في أعلى محرك المطابقة وإشعار مباشر للصناديق الشريكة.' : 'Priority ranking in matchmaking engine & direct syndicate alert.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#8A1538] rounded focus:ring-[#8A1538]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isAr ? 'نشر الجولة في منصة الصفقات' : 'Publish Deal to Marketplace'}</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
