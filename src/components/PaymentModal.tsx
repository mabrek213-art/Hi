import React, { useState } from 'react';
import { Language, PaymentOrder } from '../types';
import { useAuth } from '../context/AuthContext';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Download, Sparkles } from 'lucide-react';

interface PaymentModalProps {
  language: Language;
  onClose: () => void;
  itemType: 'featured_deal' | 'job_listing' | 'qpci_subscription';
  itemTitle?: string;
  onPaymentSuccess?: (order: PaymentOrder) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  language,
  onClose,
  itemType,
  itemTitle,
  onPaymentSuccess
}) => {
  const { user, updateSubscription } = useAuth();
  const isAr = language === 'ar';

  const [email, setEmail] = useState(user?.email || '');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState(user?.name || 'Venture Partner');
  const [processing, setProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PaymentOrder | null>(null);

  const pricing = {
    featured_deal: { usd: 299, qar: 1088, name: isAr ? 'ترقية صفقة استثمارية مميزة (30 يوماً)' : 'Featured Deal Placement (30 Days)' },
    job_listing: { usd: 99, qar: 360, name: isAr ? 'إعلان وظيفة تكنولوجية موثوق (30 يوماً)' : 'Verified Ecosystem Job Posting (30 Days)' },
    qpci_subscription: { usd: 149, qar: 542, name: isAr ? 'اشتراك مؤشر QPCI الاحترافي (شهرياً)' : 'QPCI Pro Intelligence Membership (Monthly)' }
  }[itemType];

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType,
          customerEmail: email,
          description: `${pricing.name}${itemTitle ? ` - ${itemTitle}` : ''}`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCompletedOrder(data.order);
        if (itemType === 'qpci_subscription') {
          updateSubscription('pro');
        }
        if (onPaymentSuccess) {
          onPaymentSuccess(data.order);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-lg shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#8A1538] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-white/80 hover:text-white bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-5 h-5 text-[#C5A059]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] font-mono">
              SECURE STRIPE CHECKOUT
            </span>
          </div>
          <h2 className="text-xl font-bold">
            {completedOrder 
              ? (isAr ? 'تمت عملية الدفع بنجاح' : 'Payment Confirmed')
              : (isAr ? 'إتمام الدفع الآمن' : 'Complete Your Order')}
          </h2>
        </div>

        <div className="p-6">
          {completedOrder ? (
            /* Success Receipt */
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1E1919]">
                  {isAr ? 'شكراً لك، تم تفعيل الخدمة فوراً!' : 'Thank you! Service Activated'}
                </h3>
                <p className="text-xs text-[#7A6D6D] mt-1">
                  {isAr ? 'تم إرسال إشعار الدفع والفاتورة الضريبية إلى بريدك الإلكتروني.' : 'A formal invoice receipt has been dispatched to your email.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-left rtl:text-right text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#7A6D6D]">{isAr ? 'رقم الإيصال:' : 'Receipt Number:'}</span>
                  <strong className="text-[#1E1919]">{completedOrder.orderNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6D6D]">{isAr ? 'الخدمة:' : 'Item:'}</span>
                  <span className="text-[#1E1919]">{pricing.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6D6D]">{isAr ? 'المبلغ المدفوع:' : 'Amount Paid:'}</span>
                  <strong className="text-[#8A1538]">${completedOrder.amountUsd} USD ({completedOrder.amountQar} QAR)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6D6D]">{isAr ? 'البريد:' : 'Billed To:'}</span>
                  <span className="text-[#1E1919]">{completedOrder.customerEmail}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-colors"
              >
                {isAr ? 'العودة للمنصة' : 'Done & Continue'}
              </button>
            </div>
          ) : (
            /* Payment Input Form */
            <form onSubmit={handlePay} className="space-y-4">
              {/* Order Summary Card */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1E1919]">{pricing.name}</h4>
                  {itemTitle && <p className="text-[11px] text-[#7A6D6D]">{itemTitle}</p>}
                </div>
                <div className="text-right rtl:text-left">
                  <div className="text-base font-black text-[#8A1538] font-mono">${pricing.usd} USD</div>
                  <div className="text-[10px] text-[#7A6D6D] font-mono">{pricing.qar} QAR</div>
                </div>
              </div>

              {/* Billing Email */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'البريد الإلكتروني لاستلام الفاتورة' : 'Billing Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="finance@company.qa"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              {/* Card Inputs */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'معلومات البطاقة الائتمانية' : 'Credit / Debit Card'}
                </label>
                <div className="rounded-xl border border-[#E8DFC8] overflow-hidden focus-within:border-[#8A1538]">
                  <div className="px-3 py-2 border-b border-[#E8DFC8] flex items-center justify-between">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full text-xs font-mono focus:outline-none"
                    />
                    <div className="flex gap-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#8A1538] border border-[#E8DFC8]">VISA</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#C5A059] border border-[#E8DFC8]">MC</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="px-3 py-2 text-xs font-mono border-r border-[#E8DFC8] focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="px-3 py-2 text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                  {isAr ? 'اسم حامل البطاقة' : 'Cardholder Name'}
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#7A6D6D]">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {isAr
                    ? 'دفع مشفر بمعايير الأمان المصرفية 256-bit SSL وشهادة PCI-DSS Level 1.'
                    : 'Encrypted with 256-bit SSL and PCI-DSS Level 1 compliance.'}
                </span>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {processing ? (
                  <span>{isAr ? 'جاري الاتصال ببوابة الدفع...' : 'Processing Transaction...'}</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isAr ? `دفع $${pricing.usd} USD الآن` : `Pay $${pricing.usd} USD Now`}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
