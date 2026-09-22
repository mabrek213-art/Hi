import React, { useState } from 'react';
import { EntityProfile, Language } from '../types';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Building2, 
  FileText, 
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ClaimProfileModalProps {
  entity: EntityProfile | null;
  language: Language;
  onClose: () => void;
  onConfirmClaim: (entityId: string, email: string, crNumber: string) => void;
}

export const ClaimProfileModal: React.FC<ClaimProfileModalProps> = ({
  entity,
  language,
  onClose,
  onConfirmClaim
}) => {
  if (!entity) return null;
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'domain' | 'cr'>('domain');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const expectedDomain = entity.website ? new URL(entity.website).hostname.replace('www.', '') : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail || !fullName || !jobTitle) {
      setError(isAr ? 'يرجى إدخال كافة البيانات المطلوبة.' : 'Please fill all required fields.');
      return;
    }

    if (verificationMethod === 'domain' && expectedDomain) {
      if (!workEmail.toLowerCase().includes(expectedDomain.toLowerCase())) {
        setError(
          isAr
            ? `البريد الإلكتروني لا يتطابق مع نطاق الشركة الرسمي (${expectedDomain}). يمكنك اختيار التحقق عبر السجل التجاري.`
            : `Email domain does not match ${expectedDomain}. You can switch to CR Document Verification below.`
        );
        return;
      }
    }

    onConfirmClaim(entity.id, workEmail, crNumber);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-lg shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Maroon Header */}
        <div className="bg-[#8A1538] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 text-white/80 hover:text-white rounded-full bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
              <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                {isAr ? 'توثيق وإدارة الملف الرسمي' : 'Claim Official Profile'}
              </h3>
              <p className="text-xs text-white/80">
                {isAr ? entity.nameAr : entity.name} • {entity.sector}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#1E1919]">
                {isAr ? 'تم استلام طلب التوثيق بنجاح' : 'Verification Request Received!'}
              </h4>
              <p className="text-xs text-[#5A4E4E] max-w-sm mx-auto leading-relaxed">
                {isAr
                  ? `تم توثيق الملف للممثل المعتمد (${workEmail}). يمكنك الآن تحديث بيانات الجولات الاستثمارية والمؤشرات المالية.`
                  : `Profile claimed for ${workEmail}. Our ecosystem compliance desk has verified your association.`}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 rounded-xl bg-[#8A1538] text-white font-bold text-xs shadow-md"
              >
                {isAr ? 'العودة للدليل' : 'Return to Directory'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-between">
                <div>
                  <span className="text-[#7A6D6D] block">{isAr ? 'الكيان المطلوب توثيقه:' : 'Target Entity:'}</span>
                  <strong className="text-sm text-[#1E1919] font-bold">{entity.name} ({entity.nameAr})</strong>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  {isAr ? 'مجاني للمؤسسين' : 'Free Claim'}
                </span>
              </div>

              {/* Verification Method Toggle */}
              <div>
                <label className="block text-[11px] font-bold text-[#6B5E5E] uppercase mb-1.5">
                  {isAr ? 'طريقة التحقق المعتمدة' : 'Verification Route'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setVerificationMethod('domain'); setError(''); }}
                    className={`p-2.5 rounded-lg border text-left rtl:text-right font-semibold transition-all ${
                      verificationMethod === 'domain'
                        ? 'border-[#8A1538] bg-[#8A1538]/5 text-[#8A1538]'
                        : 'border-[#E8DFC8] bg-white text-[#5A4E4E]'
                    }`}
                  >
                    <Mail className="w-4 h-4 mb-1 text-[#8A1538]" />
                    <span className="block text-xs">{isAr ? 'تطابق نطاق البريد الرسمي' : 'Official Domain Match'}</span>
                    <span className="text-[10px] text-[#7A6D6D]">@{expectedDomain || 'company.qa'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setVerificationMethod('cr'); setError(''); }}
                    className={`p-2.5 rounded-lg border text-left rtl:text-right font-semibold transition-all ${
                      verificationMethod === 'cr'
                        ? 'border-[#8A1538] bg-[#8A1538]/5 text-[#8A1538]'
                        : 'border-[#E8DFC8] bg-white text-[#5A4E4E]'
                    }`}
                  >
                    <FileText className="w-4 h-4 mb-1 text-[#8A1538]" />
                    <span className="block text-xs">{isAr ? 'رقم السجل التجاري (CR)' : 'Qatar CR Number'}</span>
                    <span className="text-[10px] text-[#7A6D6D]">{isAr ? 'سجل تجاري معتمد' : 'Commercial Registry Record'}</span>
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <div>
                <label className="block font-bold text-[#6B5E5E] mb-1">
                  {isAr ? 'الاسم الكامل لممثل الكيان *' : 'Full Name of Representative *'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? 'مثل: حمد المري' : 'e.g. Nasser Al-Kuwari'}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'البريد الإلكتروني للعمل *' : 'Work Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder={expectedDomain ? `name@${expectedDomain}` : 'rep@company.qa'}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'المسمى الوظيفي *' : 'Job Title / Role *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder={isAr ? 'مؤسس / رئيس تنفيذي' : 'Founder / CEO / CFO'}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>
              </div>

              {verificationMethod === 'cr' && (
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'رقم السجل التجاري القطري (CR) *' : 'Qatar Commercial Registration (CR) *'}
                  </label>
                  <input
                    type="text"
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                    placeholder="e.g. CR-149822/QA"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>
              )}

              {error && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-800 border border-red-200 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isAr ? 'إرسال طلب التوثيق الفوري' : 'Submit Verification Claim'}</span>
                  <Arrow className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
