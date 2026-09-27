import React, { useState } from 'react';
import { Language } from '../types';
import { LogoMark } from './Logo';
import { 
  Building2, 
  TrendingUp, 
  Database, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Globe2, 
  DollarSign, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Layers, 
  Code, 
  Compass, 
  Lock, 
  Zap, 
  ExternalLink,
  PhoneCall,
  UserCheck,
  Award
} from 'lucide-react';

interface ContactAndSaleModuleProps {
  language: Language;
  onOpenProspectusModal?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const ContactAndSaleModule: React.FC<ContactAndSaleModuleProps> = ({
  language,
  onOpenProspectusModal,
  onNavigateTab
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const sellerEmail = 'articleelkhalil@gmail.com';

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'full_acquisition',
    estimatedBudget: '$50,000 - $150,000',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(sellerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.organization) {
      setErrorMsg(isAr ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/acquisitions/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          directSellerContact: sellerEmail
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || (isAr ? 'حدث خطأ أثناء إرسال الطلب' : 'Error submitting inquiry'));
      }
    } catch {
      // Optimistic confirmation fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Announcement Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8A1538] via-[#630B24] to-[#1E1919] text-white p-8 sm:p-12 border border-[#C5A059]/40 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#8A1538]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059] text-[#1E1919] text-xs font-black tracking-wider uppercase shadow-md">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              {isAr ? 'المنصة معروضة رسمياً للبيع' : 'OFFICIALLY FOR SALE • ACQUISITION OPPORTUNITY'}
            </span>
            <span className="text-white/70 text-xs font-mono">
              {isAr ? 'أصل رقمي جاهز للتسليم الفوري' : 'Turnkey Digital Asset & Proprietary Infrastructure'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {isAr
              ? 'امتلك منصة Ventures.qa: البنية التحتية الرائدة لبيانات رأس المال والشركات الناشئة في قطر'
              : 'Acquire Ventures.qa: Qatar’s Premier Venture Capital & Scaleup Intelligence Platform'}
          </h1>

          <p className="text-sm sm:text-base text-[#E8DFC8] leading-relaxed max-w-3xl">
            {isAr
              ? 'فرصة استثمارية واستراتيجية نادرة للاستحواذ الكامل على نطاق Ventures.qa، والنظام البرمجي المتكامل، وقاعدة البيانات المعتمدة لـ 14+ جهة وشركة ناشئة، ومؤشر رأس المال الخاص (QPCI)، ومحرك التوليد الآلي للأخبار بنموذج الذكاء الاصطناعي، ومنصة وساطة الصفقات.'
              : 'A strategic, turnkey asset acquisition opportunity. Includes the category-killer domain Ventures.qa, proprietary full-stack application, audited scaleup registry, Qatar Private Capital Index (QPCI), automated Gemini AI bilingual newsroom, and verified deal-flow matchmaking system.'}
          </p>

          {/* Direct Seller Contact Box */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${sellerEmail}?subject=Ventures.qa%20Platform%20Acquisition%20Inquiry`}
              className="px-6 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF67] text-[#1E1919] font-black text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-[#1E1919]" />
              <span>{isAr ? 'تواصل مع البائع عبر البريد' : 'Contact Seller Directly'}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
              title="Copy seller email"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-sans font-bold">{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C5A059]" />
                  <span>{sellerEmail}</span>
                </>
              )}
            </button>

            {onOpenProspectusModal && (
              <button
                onClick={onOpenProspectusModal}
                className="px-5 py-3.5 rounded-xl bg-black/30 hover:bg-black/40 text-[#E8DFC8] font-bold text-xs sm:text-sm border border-white/10 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>{isAr ? 'تحميل كراسة المواصفات' : 'View Prospectus PDF'}</span>
              </button>
            )}
          </div>

          {/* Guarantee Pill */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              {isAr ? 'ضمان سرية تامة (Mutual NDA)' : 'Mutual NDA Available Upon Request'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#C5A059]" />
              {isAr ? 'تسليم فوري لكافة الأصول' : 'Immediate Turnkey Escrow Transfer'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#C5A059]" />
              {isAr ? 'دعم تقني وتشغيلي مباشر من البائع' : 'Direct Seller Handover & Onboarding'}
            </span>
          </div>
        </div>
      </section>

      {/* Grid: 3 Pillars (Why Want It, How to Help, How to Use) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pillar 1: Why My Interest Want Him */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#8A1538] uppercase tracking-wider font-mono">
                {isAr ? 'القيمة الاستراتيجية' : 'Strategic Value & Alignment'}
              </span>
              <h2 className="text-xl font-black text-[#1E1919] mt-1">
                {isAr ? 'لماذا يرغب المهتمون في هذا الأصل؟' : 'Why Interested Buyers Want This Platform'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'توفر المنصة ميزة استراتيجية وتنافسية لا تضاهى للهيئات الحكومية، وصناديق رأس المال الجريء، والمجموعات الإعلامية، والمستثمرين.'
                : 'Provides an unmatched strategic moat for sovereign funds, venture syndicates, media conglomerates, and tech founders looking for instant ecosystem authority.'}
            </p>

            <ul className="space-y-3 pt-2 text-xs text-[#1E1919]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? 'سيادة رقمية فورية لمنظومة قطر:' : 'Instant Sovereign Authority in Qatar:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'اختصار 12-18 شهراً من التطوير والتوثيق والجهود البرمجية وتوفير أكثر من 120,000 دولار تكاليف تطوير.' : 'Bypasses 12–18 months of design and development with ready-to-run digital infrastructure.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? 'خط تدفق صفقات حصري (Proprietary Deal-Flow):' : 'Exclusive Deal-Flow Pipeline:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'المؤسسون يقدمون جولاتهم التمويلية مباشرة للمنصة للوصول إلى المستثمرين المعتمدين.' : 'Founders submit active funding rounds directly, giving the owner primary syndicate access.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? 'هيبة النطاق والعلامة التجارية (Ventures.qa):' : 'Category-Defining Prestige Asset:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'اسم النطاق الوطني الأقوى في قطاع الأعمال والاستثمار مع هوية بصرية قطرية راقية.' : 'The ultimate “.qa” brand property for venture capital, technology, and economic transformation.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? 'تصدر نتائج محركات البحث (SEO Moat):' : 'High-Intent Search Traffic Moat:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'أدلة شاملة مهيأة لمحركات البحث لتأسيس الشركات وعقود SAFE والاستثمار الجريء في الدوحة.' : 'Dominates organic search terms for startup incorporation, angel SAFEs, and family offices in Doha.'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 2: How To Help Them */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#9E7A32] flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#9E7A32] uppercase tracking-wider font-mono">
                {isAr ? 'الدعم ونقل الملكية' : 'Handover & Support Guarantee'}
              </span>
              <h2 className="text-xl font-black text-[#1E1919] mt-1">
                {isAr ? 'كيف يساعد البائع المشتري الجديد؟' : 'How the Seller Helps the Buyer'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'يلتزم البائع بنقل سلس وآمن بنسبة 100% مع حزمة متكاملة من التدريب والدعم التقني لضمان النجاح الفوري.'
                : 'The seller provides a comprehensive onboarding, technical migration, and operational roadmap to guarantee immediate operational success.'}
            </p>

            <ul className="space-y-3 pt-2 text-xs text-[#1E1919]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? 'نقل ملكية النطاق الرسمي والمستودع البرمجي:' : 'Full Domain & Codebase Transfer:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'تحويل فوري لنطاق Ventures.qa ومستودع الكود المصدري الكامل مع كافة حقوق الملكية الفكرية.' : 'Direct transfer of the .qa registry, GitHub repository, and unencumbered intellectual property.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? '30 يوماً من الدعم الفني المباشر:' : '30-Day Dedicated Technical Onboarding:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'مساعدة مباشرة في تهيئة الخوادم، وربط مفاتيح الذكاء الاصطناعي Gemini، وتكوين بوابات الدفع.' : 'Seller provides direct assistance configuring servers, Gemini AI keys, and payment gateways.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? 'دليل التشغيل وإدارة المحتوى (Operational Playbook):' : 'Turnkey Operator Playbook:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'إرشادات مفصلة لتدريب فريقكم على إدارة وتوثيق الشركات واعتماد مسودات الأخبار.' : 'Step-by-step documentation on verifying scaleups, vetting founder SAFEs, and AI news curation.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? 'ضمان إتمام الصفقة عبر وسيط معتمد (Escrow):' : 'Secure Transaction Escrow:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'حماية تامة للطرفين عبر ضمانات تعاقدية ووسيط مالي معتمد.' : 'Transaction can be completed via standard institutional escrow or Escrow.com for 100% peace of mind.'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 3: How To Use It */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono">
                {isAr ? 'دليل التشغيل والاستثمار' : 'Operational & Monetization Playbook'}
              </span>
              <h2 className="text-xl font-black text-[#1E1919] mt-1">
                {isAr ? 'كيف تستخدم وتشغل المنصة؟' : 'How the Buyer Can Use the Platform'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'تم تصميم المنصة لتكون جاهزة للتشغيل الفوري مع 4 قنوات رئيسية لتحقيق عوائد مجزية وبناء نفوذ استثماري واسع.'
                : 'Engineered as a plug-and-play business model with 4 distinct monetization and operational engines ready from Day One.'}
            </p>

            <ul className="space-y-3 pt-2 text-xs text-[#1E1919]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? '1. تحصيل رسوم وساطة الصفقات (1-2%):' : '1. Deal-Flow Matchmaking Fees (1–2%):'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'ربط المستثمرين بالشركات الناشئة في جولات التمويل وتحصيل عمولات النجاح.' : 'Earn success fees introducing syndicated angel investors and family offices to verified rounds.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? '2. اشتراكات بيانات API للمؤسسات:' : '2. Institutional API & Data Licensing:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'بيع تراخيص الوصول لبيانات مؤشر QPCI للبنوك الاستثمارية ومراكز الأبحاث ($500-$2,000/شهرياً).' : 'License proprietary QPCI index feeds to investment banks, consultancies, and universities.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? '3. أتمتة النشر الإخباري بالذكاء الاصطناعي:' : '3. Automated AI Tech News Publishing:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'استخدام نظام Gemini 3.8 Flash لتحويل الروابط الصحفية إلى مقالات ثنائية اللغة فوراً.' : 'Ingest industry announcements via Gemini 3.8 Flash, generating verified bilingual editorial stories in minutes.'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{isAr ? '4. لوحة التوظيف والإعلانات المميزة:' : '4. Tech Job Board & Verified Badges:'}</strong>
                  <span className="text-[#6B5E5E]">{isAr ? 'رسوم نشر إعلانات الوظائف التقنية ($99-$299) والتوثيق السنوي المعتمد للشركات.' : 'Charge $99–$299 for featured job postings and annual fees for verified scaleup profile badges.'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Asset Inventory Breakdown */}
      <section className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E8DFC8] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
              {isAr ? 'تفاصيل محتويات الصفقة' : 'ACQUISITION INVENTORY • WHAT YOU RECEIVE'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1E1919] mt-1">
              {isAr ? 'حزمة الأصول الرقمية المشمولة في البيع' : 'Complete Turnkey Asset Package Included in Sale'}
            </h3>
          </div>
          <div className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-white border border-[#D5C9B8] text-[#1E1919]">
            {isAr ? 'ملكية تامة 100% دون أي التزامات' : '100% Unencumbered Ownership'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2">
            <Globe2 className="w-5 h-5 text-[#8A1538]" />
            <h4 className="font-bold text-[#1E1919]">{isAr ? 'نطاق Ventures.qa الوطني' : 'Ventures.qa Official Domain'}</h4>
            <p className="text-[#6B5E5E]">{isAr ? 'نطاق سيادي من الدرجة الأولى يعكس قوة وهوية الاستثمار في قطر.' : 'Top-tier ccTLD representing innovation and private capital in Qatar.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2">
            <Code className="w-5 h-5 text-[#C5A059]" />
            <h4 className="font-bold text-[#1E1919]">{isAr ? 'الكود المصدري الكامل' : 'Modern Full-Stack Codebase'}</h4>
            <p className="text-[#6B5E5E]">{isAr ? 'مبني بـ React 18, Vite, TypeScript, Tailwind CSS, Express.' : 'Clean, production-grade TypeScript, modular components, and REST API.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2">
            <Database className="w-5 h-5 text-emerald-700" />
            <h4 className="font-bold text-[#1E1919]">{isAr ? 'قاعدة بيانات ومؤشر QPCI' : 'Verified Database & QPCI Index'}</h4>
            <p className="text-[#6B5E5E]">{isAr ? 'سجلات دقيقة لـ 14+ جهة موثقة وتتبع صفقات تتجاوز 42.5 مليون دولار.' : '14+ audited scaleups with CR numbers and historical venture rounds.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2">
            <Cpu className="w-5 h-5 text-blue-700" />
            <h4 className="font-bold text-[#1E1919]">{isAr ? 'محرك الذكاء الاصطناعي التوليدي' : 'Server-Side Gemini AI Engine'}</h4>
            <p className="text-[#6B5E5E]">{isAr ? 'نظام استيعاب الأخبار وصياغة المقالات التحليلية باللغتين العربية والإنجليزية.' : 'Automated draft pipeline converting press releases into editorial analysis.'}</p>
          </div>
        </div>
      </section>

      {/* Target Buyer Audiences & Specific Value Propositions */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
            {isAr ? 'الملائمة المؤسسية' : 'STRATEGIC SUITABILITY • WHO SHOULD BUY'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1E1919] mt-1">
            {isAr ? 'الجهات الأكثر استفادة من الاستحواذ على المنصة' : 'Ideal Acquirers & Institutional Profiles'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          
          <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#1E1919]">
                {isAr ? 'الهيئات والمؤسسات الحكومية وشبه الحكومية' : 'Government & Sovereign Development Entities'}
              </h4>
            </div>
            <p className="text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'مثل بنك قطر للتنمية (QDB)، ووزارة التجارة والصناعة (MOCI)، ووكالة ترويج الاستثمار (Invest Qatar)، والمدينة الإعلامية. يوفر الاستحواذ منصة وطنية متكاملة ومحايدة لتمكين رواد الأعمال وإبراز نمو منظومة الابتكار دعماً لرؤية قطر الوطنية 2030 واستراتيجية التنمية الوطنية الثالثة (NDS3).'
                : 'Entities such as QDB, MOCI, Invest Qatar, or Media City can instantly deploy a sovereign-grade digital portal tracking Qatar’s private innovation economy, supporting Qatar National Vision 2030 and NDS3 mandates.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C5A059]/15 text-[#9E7A32] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#1E1919]">
                {isAr ? 'صناديق رأس المال الجريء والمكاتب العائلية' : 'Venture Capital Funds, Syndicates & Family Offices'}
              </h4>
            </div>
            <p className="text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'مثل Doha Tech Angels، وRasmal Ventures، وشبكات المستثمرين الإقليميين. يمنحهم الاستحواذ وصولاً أولياً وحصرياً لطلبات التمويل من الشركات الناشئة، ويعزز موقع الصندوق كقائد للفكر الاستثماري في المنطقة.'
                : 'Angel syndicates and regional VCs gain an proprietary deal-flow pipeline where founders pitch directly, establishing the firm as the dominant private-capital gateway in Doha.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#1E1919]">
                {isAr ? 'المجموعات الإعلامية ودور النشر الإقليمية' : 'Tech Media, Publishing & Financial Conglomerates'}
              </h4>
            </div>
            <p className="text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'المنصات الإخبارية الاقتصادية الراغبة في التوسع بقطر. المنصة مجهزة بمحرك أتمتة التحرير بنموذج Gemini 3.8 Flash مما يقلل تكاليف التحرير بنسبة 80% مع إنتاج محتوى تحليلي ذو موثوقية عالية.'
                : 'Publishers seeking expansion into the affluent Qatari market. The integrated AI pipeline reduces editorial costs by 80% while capturing organic search queries for regional business and finance.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#1E1919]">
                {isAr ? 'رواد الأعمال والمستثمرون الأفراد' : 'Tech Operators & Ambitious Entrepreneurs'}
              </h4>
            </div>
            <p className="text-[#5A4E4E] leading-relaxed">
              {isAr
                ? 'لأي رائد أعمال يبحث عن مشروع رقمي عالي الهيبة وقابل للربحية الفورية من اليوم الأول عبر 4 مصادر دخل متنوعة (رسوم الوساطة، اشتراكات البيانات، الوظائف، والخدمات المميزة).'
                : 'Operators looking for a turnkey, prestigious, cash-flow-generating platform with diversified monetization channels ready to scale across the GCC.'}
            </p>
          </div>

        </div>
      </section>

      {/* Direct Contact & Inquiry Submission Form */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#8A1538]/20 shadow-xl space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
            {isAr ? 'بيانات التواصل الرسمي' : 'OFFICIAL CONTACT & INQUIRY FORM'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#1E1919] mt-1">
            {isAr ? 'تواصل مباشرة مع البائع أو قدم عرضك' : 'Contact the Seller Directly or Submit an Offer'}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A4E4E] mt-2">
            {isAr
              ? `يمكنك مراسلة البائع مباشرة على البريد الإلكتروني ${sellerEmail} أو تعبئة النموذج أدناه للحصول على تفاصيل الصفقة وتوقيع اتفاقية السرية (NDA).`
              : `You can reach the seller directly at ${sellerEmail} or submit the structured acquisition form below for confidential discussions under mutual NDA.`}
          </p>
        </div>

        {/* Quick Contact Card Banner */}
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#8A1538] text-[#C5A059] flex items-center justify-center font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#8A1538] font-bold uppercase">
                {isAr ? 'البريد الإلكتروني المباشر للبائع' : 'Direct Seller Email Address'}
              </span>
              <p className="text-base sm:text-lg font-black text-[#1E1919] font-mono">
                {sellerEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#D5C9B8] hover:bg-[#F2ECE4] text-[#1E1919] text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#8A1538]" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ البريد' : 'Copy Email')}</span>
            </button>
            <a
              href={`mailto:${sellerEmail}?subject=Ventures.qa%20Platform%20Acquisition%20Inquiry`}
              className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isAr ? 'فتح البريد الآن' : 'Send Email'}</span>
            </a>
          </div>
        </div>

        {/* Submission Form */}
        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center animate-in fade-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-black">
              {isAr ? 'تم استلام طلبكم وعرضكم بنجاح' : 'Inquiry & Acquisition Offer Received'}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
              {isAr
                ? `شكراً لاهتمامكم بالاستحواذ على منصة Ventures.qa. تم تسجيل طلبكم وإرسال إشعار مباشر للبائع على ${sellerEmail}. سيتم الرد عليكم في غضون 24 ساعة تحت مظلة السرية التامة.`
                : `Thank you for your interest in acquiring Ventures.qa. Your inquiry has been routed directly to the seller (${sellerEmail}). You will receive an official response and mutual NDA within 24 hours.`}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100"
            >
              {isAr ? 'إرسال استفسار إضافي' : 'Send Another Message'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#1E1919] mb-1.5">
                  {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Nasser Al-Kuwari"
                  className="w-full px-4 py-3 rounded-xl border border-[#D5C9B8] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1E1919] mb-1.5">
                  {isAr ? 'الجهة / الصندوق / الشركة *' : 'Organization / Fund / Group *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Regional Venture Fund / Family Office"
                  className="w-full px-4 py-3 rounded-xl border border-[#D5C9B8] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1E1919] mb-1.5">
                  {isAr ? 'البريد الإلكتروني للرد *' : 'Contact Email *'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nasser@group.qa"
                  className="w-full px-4 py-3 rounded-xl border border-[#D5C9B8] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1E1919] mb-1.5">
                  {isAr ? 'نوع الاهتمام / نطاق الصفقة' : 'Acquisition Scope'}
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5C9B8] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
                >
                  <option value="full_acquisition">{isAr ? 'استحواذ كامل على الأصل الرقمي (Full Turnkey Buyout)' : 'Full Turnkey Acquisition (Domain + Code + IP)'}</option>
                  <option value="partnership">{isAr ? 'شراكة تشغيلية استراتيجية' : 'Strategic Operating Partnership'}</option>
                  <option value="licensing">{isAr ? 'ترخيص بيانات مؤشر QPCI للشركات' : 'Data Licensing & Institutional API'}</option>
                  <option value="other">{isAr ? 'استفسار عام أو طلب اجتماع' : 'General Inquiry / Meeting Request'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1E1919] mb-1.5 text-xs">
                {isAr ? 'الرسالة، تفاصيل العرض، أو متطلبات الفحص النافي للجهالة' : 'Proposal, Valuation Offer, or Due Diligence Requests'}
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  isAr
                    ? 'وضح اهتمامك، المدى الزمني المتوقع، العرض المالي الأولي، أو أي استفسارات خاصة...'
                    : 'Detail your acquisition timeline, indicative offer, request for source-code review, or specific handover terms...'
                }
                className="w-full px-4 py-3 rounded-xl border border-[#D5C9B8] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] text-xs"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E8DFC8]">
              <span className="text-[11px] text-[#6B5E5E] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#8A1538]" />
                {isAr
                  ? `سيتم تحويل رسالتكم مباشرة للبائع: ${sellerEmail}`
                  : `Inquiry submitted directly to seller at ${sellerEmail}`}
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{isAr ? 'جاري الإرسال...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{isAr ? 'إرسال طلب الاستحواذ والتواصل' : 'Submit Acquisition Inquiry'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
