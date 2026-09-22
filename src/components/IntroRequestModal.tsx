import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, 
  Handshake, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Send, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

interface IntroRequestModalProps {
  targetName: string;
  targetId: string;
  language: Language;
  onClose: () => void;
  onSubmitSuccess: (data: any) => void;
}

export const IntroRequestModal: React.FC<IntroRequestModalProps> = ({
  targetName,
  targetId,
  language,
  onClose,
  onSubmitSuccess
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [requesterName, setRequesterName] = useState('');
  const [requesterOrg, setRequesterOrg] = useState('');
  const [requesterEmail, setRequesterEmail] = useState('');
  const [requesterType, setRequesterType] = useState('Institutional Investor (VC / PE)');
  const [ticketSize, setTicketSize] = useState('$500K - $1M (QAR 1.8M - 3.6M)');
  const [message, setMessage] = useState('');
  const [agreedToModeration, setAgreedToModeration] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess({
      id: 'req-' + Date.now(),
      targetName,
      targetId,
      requesterName,
      requesterOrg,
      requesterEmail,
      requesterType,
      ticketSize,
      message,
      status: 'pending_moderation',
      timestamp: new Date().toISOString()
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-lg shadow-2xl relative overflow-hidden"
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
              <Handshake className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                {isAr ? 'طلب وساطة وتواصل استثماري' : 'Request Moderated Introduction'}
              </h3>
              <p className="text-xs text-white/80">
                {isAr ? 'تنسيق تواصل مع:' : 'Direct Capital Intro to:'} <strong className="text-[#C5A059]">{targetName}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#1E1919]">
                {isAr ? 'تم إرسال طلب التواصل بنجاح' : 'Introduction Request Logged!'}
              </h4>
              <p className="text-xs text-[#5A4E4E] max-w-sm mx-auto leading-relaxed">
                {isAr
                  ? `يقوم مكتب الوساطة في Ventures.qa بمراجعة أهليّة الطلب لضمان سرية الطرفين وجودة التواصل، وسنوافيكم بالرد خلال ٢٤ ساعة على (${requesterEmail}).`
                  : `Our Deal Desk is reviewing institutional alignment to protect both parties. We will facilitate direct NDA exchange and executive introduction within 24 hours.`}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 rounded-xl bg-[#8A1538] text-white font-bold text-xs shadow-md"
              >
                {isAr ? 'إغلاق' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Institutional Moderation Disclaimer */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-start gap-2 text-[11px] text-[#5A4E4E]">
                <ShieldCheck className="w-4 h-4 text-[#8A1538] flex-shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'تمر كافة طلبات التعارف عبر مكتب الوساطة بالمنصة لحماية خصوصية الأطراف وتوثيق مسار تدفق رؤوس الأموال.'
                    : 'To protect executive time and track national capital velocity, all introductions are verified and moderated by the Ventures.qa Deal Desk.'}
                </span>
              </div>

              <div>
                <label className="block font-bold text-[#6B5E5E] mb-1">
                  {isAr ? 'اسمك الكريم *' : 'Your Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder="e.g. Khalid Al-Thani"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'الجهة أو الصندوق *' : 'Your Organization *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={requesterOrg}
                    onChange={(e) => setRequesterOrg(e.target.value)}
                    placeholder="e.g. Al Rayyan Capital"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'البريد الرسمي *' : 'Institutional Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={requesterEmail}
                    onChange={(e) => setRequesterEmail(e.target.value)}
                    placeholder="khalid@fund.qa"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'تصنيف الكيان *' : 'Entity Role *'}
                  </label>
                  <select
                    value={requesterType}
                    onChange={(e) => setRequesterType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  >
                    <option value="Institutional Investor (VC / PE)">Institutional VC / PE</option>
                    <option value="Family Office / Angel">Family Office / Angel</option>
                    <option value="Sovereign / Semi-Gov">Sovereign / Semi-Gov</option>
                    <option value="Corporate M&A / Champion">Corporate M&A / Champion</option>
                    <option value="Startup Founder">Startup Founder</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#6B5E5E] mb-1">
                    {isAr ? 'حجم التذكرة المتوقعة *' : 'Intended Ticket Size *'}
                  </label>
                  <select
                    value={ticketSize}
                    onChange={(e) => setTicketSize(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                  >
                    <option value="$100K - $500K (QAR 365K - 1.8M)">$100K - $500K (QAR 365K - 1.8M)</option>
                    <option value="$500K - $1M (QAR 1.8M - 3.6M)">$500K - $1M (QAR 1.8M - 3.6M)</option>
                    <option value="$1M - $5M (QAR 3.6M - 18M)">$1M - $5M (QAR 3.6M - 18M)</option>
                    <option value="$5M+ (QAR 18M+)">$5M+ (QAR 18M+ Lead)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6B5E5E] mb-1">
                  {isAr ? 'سياق التواصل وموجز الأطروحة الاستثمارية *' : 'Context & Strategic Rationale *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isAr
                      ? 'موجز عن صندوقكم أو شركتكم، واهتمامكم بالجولة أو الصفقة...'
                      : 'State your fund’s interest, syndicate co-investment appetite, or synergy...'
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg text-[#1E1919] focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agree-moderation"
                  checked={agreedToModeration}
                  onChange={(e) => setAgreedToModeration(e.target.checked)}
                  className="rounded text-[#8A1538] focus:ring-[#8A1538]"
                />
                <label htmlFor="agree-moderation" className="text-[11px] text-[#5A4E4E]">
                  {isAr
                    ? 'أوافق على سياسة الوساطة المنظمة وشروط سرية البيانات (NDA).'
                    : 'I agree to platform terms, NDA protocols, and transparent 1.5% deal tracking.'}
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreedToModeration}
                className="w-full py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{isAr ? 'إرسال طلب التعارف لمكتب الصفقات' : 'Submit Introduction Request'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
