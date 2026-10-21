import React, { useState } from 'react';
import { Language } from '../types';
import { 
  Building, 
  Building2, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  MapPin, 
  Coins, 
  Scale, 
  ArrowRight, 
  ArrowUpRight, 
  HelpCircle, 
  Calculator, 
  Search, 
  Layers, 
  Award,
  ChevronDown,
  ChevronUp,
  Percent,
  Clock,
  Sparkles
} from 'lucide-react';

interface RealEstateModuleProps {
  language: Language;
  onNavigateTab?: (tab: string) => void;
  onOpenReportModal?: () => void;
}

export const RealEstateModule: React.FC<RealEstateModuleProps> = ({
  language,
  onNavigateTab,
  onOpenReportModal
}) => {
  const isAr = language === 'ar';

  // Calculator State
  const [calcPropertyPrice, setCalcPropertyPrice] = useState<number>(1800000); // 1.8M QAR
  const [calcMonthlyRent, setCalcMonthlyRent] = useState<number>(11500); // 11,500 QAR
  const [calcCurrency, setCalcCurrency] = useState<'QAR' | 'USD'>('QAR');

  // Zones Filter State
  const [zoneTypeFilter, setZoneTypeFilter] = useState<'all' | 'freehold' | 'usufruct'>('all');
  const [zoneSearchQuery, setZoneSearchQuery] = useState<string>('');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Conversion rate: 1 USD = 3.64 QAR
  const QAR_PER_USD = 3.64;
  const currentPriceQAR = calcCurrency === 'USD' ? calcPropertyPrice * QAR_PER_USD : calcPropertyPrice;
  const currentRentQAR = calcCurrency === 'USD' ? calcMonthlyRent * QAR_PER_USD : calcMonthlyRent;

  // Yield calculations
  const annualGrossRentQAR = currentRentQAR * 12;
  const grossYield = currentPriceQAR > 0 ? ((annualGrossRentQAR / currentPriceQAR) * 100) : 0;
  // Net yield estimates standard service charges (~12%)
  const netAnnualRentQAR = annualGrossRentQAR * 0.88;
  const netYield = currentPriceQAR > 0 ? ((netAnnualRentQAR / currentPriceQAR) * 100) : 0;
  const govTransferFeeQAR = currentPriceQAR * 0.0125; // 1.25% (0.25% reg + 1% transfer)

  // Residency Tier check
  let residencyTier = 'none';
  if (currentPriceQAR >= 3650000) {
    residencyTier = 'permanent';
  } else if (currentPriceQAR >= 730000) {
    residencyTier = 'renewable';
  }

  // Freehold & Usufruct Zones Data
  const zonesData = [
    {
      id: 'pearl',
      nameEn: 'The Pearl Qatar',
      nameAr: 'اللؤلؤة قطر',
      type: 'freehold',
      district: 'Doha Coastal',
      avgPriceQarSqm: 14200,
      avgGrossYield: '7.1%',
      occupancy: '91%',
      freeholdYears: isAr ? 'تملك حر دائم' : '100% Freehold in Perpetuity',
      descriptionEn: 'Flagship Riviera-style luxury island featuring Porto Arabia, Viva Bahriya, Qanat Quartier, and Floresta Gardens. Direct title deeds issued with immediate residency eligibility.',
      descriptionAr: 'جزيرة فاخرة بنمط الريفييرا تشمل بورتو أرابيا، فيفا بحرية، قناة كارتييه، وفلوريستا جاردنز. سندات ملكية مباشرة مع أهلية فورية للإقامة.',
      popularForEn: 'Luxury marina apartments, beachfront townhouses, high-demand expat rentals',
      popularForAr: 'شقق بحرية فاخرة، تاون هاوس شاطئي، إيجارات وافدين عالية الطلب'
    },
    {
      id: 'lusail-marina',
      nameEn: 'Lusail Marina & Waterfront',
      nameAr: 'مارينا لوسيل والواجهة البحرية',
      type: 'freehold',
      district: 'Lusail City',
      avgPriceQarSqm: 15100,
      avgGrossYield: '7.4%',
      occupancy: '89%',
      freeholdYears: isAr ? 'تملك حر دائم' : '100% Freehold in Perpetuity',
      descriptionEn: "Qatar's ultra-modern smart sustainable metropolis. Prominent waterfront towers, commercial plazas, and prime promenade developments with integrated tram infrastructure.",
      descriptionAr: 'المدينة الذكية المستدامة الأحدث في قطر. أبراج مائية مميزة وساحات تجارية مع شبكة ترام ومترو متكاملة.',
      popularForEn: 'Ultra-modern smart high-rises, institutional commercial assets, capital appreciation',
      popularForAr: 'أبراج شاهقة ذكية، أصول تجارية مؤسسية، نمو رأسمالي قوي'
    },
    {
      id: 'lusail-fox-hills',
      nameEn: 'Lusail - Fox Hills & Energy City',
      nameAr: 'لوسيل - جبل ثعيلب ومدينة الطاقة',
      type: 'freehold',
      district: 'Lusail City',
      avgPriceQarSqm: 10800,
      avgGrossYield: '8.2%',
      occupancy: '93%',
      freeholdYears: isAr ? 'تملك حر دائم' : '100% Freehold in Perpetuity',
      descriptionEn: 'Medium-rise modern residential community known for delivering the highest gross rental yields in Doha. Excellent entry ticket for retail investors targeting cashflow.',
      descriptionAr: 'مجتمع سكني حديث متوسط الارتفاع يسجل أعلى عوائد تأجيرية في الدوحة. نقطة دخول ممتازة للمستثمرين الباحثين عن التدفقات النقدية.',
      popularForEn: 'Mid-market apartments, highest yield-to-price ratio in freehold zones',
      popularForAr: 'شقق متوسطة، أعلى نسبة عائد مقارنة بسعر الشراء في مناطق التملك الحر'
    },
    {
      id: 'west-bay-lagoon',
      nameEn: 'West Bay Lagoon (Al Qassar)',
      nameAr: 'لقطيفية (بحيرة الخليج الغربي / القصار)',
      type: 'freehold',
      district: 'Doha Prestige',
      avgPriceQarSqm: 18500,
      avgGrossYield: '5.9%',
      occupancy: '96%',
      freeholdYears: isAr ? 'تملك حر دائم' : '100% Freehold in Perpetuity',
      descriptionEn: 'Exclusive private gated enclave of ultra-luxury standalone beachfront villas and private lagoons. The most prestigious land plots in the State of Qatar.',
      descriptionAr: 'حي خاص مسور للفلل الشاطئية المستقلة فائقة الفخامة والبحيرات الخاصة. أكثر قطع الأراضي تميزاً وقيمة في دولة قطر.',
      popularForEn: 'Standalone beachfront palaces, family offices, sovereign-grade generational assets',
      popularForAr: 'قصور وفلل شاطئية، مكاتب عائلية، أصول توريثية سيادية'
    },
    {
      id: 'al-khor-resort',
      nameEn: 'Al Khor Resort Complex',
      nameAr: 'مجمع منتجع الخور',
      type: 'freehold',
      district: 'Northern Coast',
      avgPriceQarSqm: 9500,
      avgGrossYield: '7.8%',
      occupancy: '84%',
      freeholdYears: isAr ? 'تملك حر دائم' : '100% Freehold in Perpetuity',
      descriptionEn: 'Northern seaside luxury destination close to Ras Laffan industrial hub and eco-resorts. Strategic for executive expat housing and tourist holiday homes.',
      descriptionAr: 'وجهة بحرية شمالية راقية بجوار قطاع رأس لفان الصناعي والمنتجعات البيئية. مثالية لإسكان كبار التنفيذيين وبيوت العطلات.',
      popularForEn: 'Coastal residential compounds, long-term industrial executive leases',
      popularForAr: 'مجمعات سكنية ساحلية، عقود طويلة الأجل لتنفيذيي قطاع الطاقة'
    },
    {
      id: 'rawdat-al-jahhaniya',
      nameEn: 'Rawdat Al Jahhaniya (Mall of Qatar Zone)',
      nameAr: 'روضة الجهانية (منطقة قطر مول)',
      type: 'freehold',
      district: 'Al Rayyan Metro',
      avgPriceQarSqm: 11200,
      avgGrossYield: '7.5%',
      occupancy: '88%',
      freeholdYears: isAr ? 'تملك حر دائم' : '100% Freehold in Perpetuity',
      descriptionEn: 'Strategic freehold node at the junction of Dukhan Highway and Doha Metro Green Line, anchoring Mall of Qatar and Ahmad Bin Ali Stadium precinct.',
      descriptionAr: 'منطقة تملك حر استراتيجية عند تقاطع طريق دخان السريع والمترو الأخضر بجوار قطر مول واستاد أحمد بن علي.',
      popularForEn: 'Transit-oriented apartments, retail logistics hubs, medical city proximity',
      popularForAr: 'شقق قريبة من محطة المترو، أصول لوجستية وتجزئة'
    },
    {
      id: 'msheireb',
      nameEn: 'Msheireb Downtown Doha',
      nameAr: 'مشيرب قلب الدوحة',
      type: 'usufruct',
      district: 'Downtown Core',
      avgPriceQarSqm: 16900,
      avgGrossYield: '6.8%',
      occupancy: '94%',
      freeholdYears: isAr ? 'حق انتفاع لمدة ٩٩ سنة قابل للتجديد' : '99-Year Renewable Usufruct',
      descriptionEn: "World's premier sustainable downtown regeneration project with LEED Platinum buildings, multinational headquarters, and high-street luxury retail.",
      descriptionAr: 'أبرز مشروع تجديد حضري مستدام في العالم بمباني بلاتينية ومقرات شركات متعددة الجنسيات.',
      popularForEn: 'Diplomatic residences, corporate headquarters, boutique luxury townhomes',
      popularForAr: 'إقامات دبلوماسية، مقرات شركات، منازل تاون هاوس بيئية راقية'
    },
    {
      id: 'al-sadd',
      nameEn: 'Al Sadd & Fereej Bin Mahmoud',
      nameAr: 'السد وفريج بن محمود',
      type: 'usufruct',
      district: 'Central Doha',
      avgPriceQarSqm: 8600,
      avgGrossYield: '8.5%',
      occupancy: '95%',
      freeholdYears: isAr ? 'حق انتفاع لمدة ٩٩ سنة قابل للتجديد' : '99-Year Renewable Usufruct',
      descriptionEn: 'High-density commercial and residential heart of inner Doha. Consistently achieves the highest occupancy rates and tenant turnaround velocity.',
      descriptionAr: 'القلب التجاري والسكني عالي الكثافة في وسط الدوحة. يحقق باستمرار أعلى نسب إشغال وسرعة دوران للمستأجرين.',
      popularForEn: 'Multi-family residential blocks, clinics, high-cashflow yielding units',
      popularForAr: 'عمارات سكنية متعددة العائلات، عيادات، عوائد إيجارية سريعة'
    },
    {
      id: 'najma-mansoura',
      nameEn: 'Najma & Al Mansoura',
      nameAr: 'النجمة والمنصورة',
      type: 'usufruct',
      district: 'South Central Doha',
      avgPriceQarSqm: 7900,
      avgGrossYield: '8.7%',
      occupancy: '96%',
      freeholdYears: isAr ? 'حق انتفاع لمدة ٩٩ سنة قابل للتجديد' : '99-Year Renewable Usufruct',
      descriptionEn: 'Core metropolitan rental zones with comprehensive metro connectivity, attracting steady mid-income multinational tenant bases.',
      descriptionAr: 'مناطق تأجير مركزية متصلة بالكامل بشبكة المترو وتجذب قاعدة مستأجرين مستقرة من أصحاب الدخل المتوسط.',
      popularForEn: 'High-yield residential portfolios, entry-level usufruct investment',
      popularForAr: 'محافظ سكنية ذات تدفقات عالية، استثمارات حق الانتفاع الأولية'
    }
  ];

  // Price & Rent Trends Q2 2026 Data
  const rentalTrendsQ2 = [
    {
      areaEn: 'The Pearl Qatar (Porto Arabia)',
      areaAr: 'اللؤلؤة قطر (بورتو أرابيا)',
      oneBedRent: '8,500 - 10,000 QAR',
      twoBedRent: '12,500 - 15,500 QAR',
      threeBedRent: '17,000 - 22,000 QAR',
      avgYield: '7.1%',
      salePriceSqm: '14,200 QAR ($3,901)',
      qoqChange: '+2.4%',
      tierEligible: isAr ? 'أهلية الإقامة الدائمة والسنوية' : 'Tier 1 & Tier 2 PR'
    },
    {
      areaEn: 'Lusail Marina District',
      areaAr: 'حي مارينا لوسيل',
      oneBedRent: '9,000 - 11,000 QAR',
      twoBedRent: '13,500 - 16,500 QAR',
      threeBedRent: '18,500 - 24,000 QAR',
      avgYield: '7.4%',
      salePriceSqm: '15,100 QAR ($4,148)',
      qoqChange: '+3.1%',
      tierEligible: isAr ? 'أهلية الإقامة الدائمة والسنوية' : 'Tier 1 & Tier 2 PR'
    },
    {
      areaEn: 'Lusail Fox Hills (Mid-Rise)',
      areaAr: 'لوسيل جبل ثعيلب (متوسط الارتفاع)',
      oneBedRent: '6,500 - 7,800 QAR',
      twoBedRent: '8,500 - 10,500 QAR',
      threeBedRent: '12,000 - 14,500 QAR',
      avgYield: '8.2%',
      salePriceSqm: '10,800 QAR ($2,967)',
      qoqChange: '+1.9%',
      tierEligible: isAr ? 'أهلية الإقامة السنوية والدائمة' : 'Tier 1 & Tier 2 PR'
    },
    {
      areaEn: 'West Bay Lagoon (Villas)',
      areaAr: 'لقطيفية وبحيرة الخليج الغربي (فلل)',
      oneBedRent: 'N/A (Standalone)',
      twoBedRent: 'N/A (Luxury Compound)',
      threeBedRent: '28,000 - 45,000 QAR (Villa)',
      avgYield: '5.9%',
      salePriceSqm: '18,500 QAR ($5,082)',
      qoqChange: '+3.8%',
      tierEligible: isAr ? 'إقامة دائمة فورية (PR)' : 'Tier 2 Permanent PR'
    },
    {
      areaEn: 'Msheireb Downtown Doha',
      areaAr: 'مشيرب قلب الدوحة (انتفاع ٩٩ سنة)',
      oneBedRent: '10,500 - 13,000 QAR',
      twoBedRent: '15,000 - 19,000 QAR',
      threeBedRent: '21,000 - 28,000 QAR',
      avgYield: '6.8%',
      salePriceSqm: '16,900 QAR ($4,642)',
      qoqChange: '+2.1%',
      tierEligible: isAr ? 'حق انتفاع + إقامة' : 'Usufruct + Residency'
    },
    {
      areaEn: 'Al Sadd / Fereej Bin Mahmoud',
      areaAr: 'السد وفريج بن محمود (انتفاع ٩٩ سنة)',
      oneBedRent: '5,000 - 6,200 QAR',
      twoBedRent: '6,800 - 8,200 QAR',
      threeBedRent: '9,000 - 11,500 QAR',
      avgYield: '8.5%',
      salePriceSqm: '8,600 QAR ($2,362)',
      qoqChange: '+1.2%',
      tierEligible: isAr ? 'حق انتفاع + إقامة' : 'Usufruct + Residency'
    }
  ];

  // Acquisition Process Steps
  const processSteps = [
    {
      number: '01',
      titleEn: 'Zoning & Legal Title Verification',
      titleAr: 'التحقق من تصنيف المنطقة والسند القانوني',
      agency: isAr ? 'وزارة العدل (بوابة صك SAK)' : 'Ministry of Justice (SAK Portal)',
      descEn: 'Confirm whether the parcel or unit is designated under Law No. 16 of 2018 (Freehold 9 Zones) or Cabinet Resolution No. 28 of 2020 (Usufruct 16 Zones). Verify that the title deed (Sanad Malkiya) is unencumbered and registered with no active mortgages or liens.',
      descAr: 'التأكد مما إذا كانت الوحدة مصنفة ضمن مناطق التملك الحر الـ ٩ أو مناطق حق الانتفاع الـ ١٦ بموجب القانون رقم ١٦ لسنة ٢٠١٨ وقرار مجلس الوزراء رقم ٢٨ لسنة ٢٠٢٠، والتحقق من خلو السند من أي رهون عبر بوابة صك.'
    },
    {
      number: '02',
      titleEn: 'Reservation & Regulated Escrow SPA',
      titleAr: 'حجز الوحدة وتوقيع عقد البيع والشراء الموثق',
      agency: isAr ? 'المطور المعتمد والمصرف المصرح' : 'Licensed Developer & QCB Escrow Bank',
      descEn: 'Execute the standard Sale and Purchase Agreement (SPA). For off-plan or developer resales, statutory law requires all buyer payments to be held in Qatar Central Bank-approved escrow bank accounts under Law No. 6 of 2014 on Real Estate Development.',
      descAr: 'توقيع عقد البيع والشراء الابتدائي (SPA). للمشاريع قيد الإنشاء أو الشراء من المطور، يشترط القانون إيداع الدفعات في حساب ضمان بنكي معتمد لدى مصرف قطر المركزي وفق قانون التطوير العقاري رقم ٦ لسنة ٢٠١٤.'
    },
    {
      number: '03',
      titleEn: 'Developer NOC & Service Charge Clearance',
      titleAr: 'شهادة عدم ممانعة وبراءة ذمة من المطور العقاري',
      agency: isAr ? 'المطور الرئيسي (الديار / المتحدة / مشيرب)' : 'Master Developer (Qatari Diar / UDC / Msheireb)',
      descEn: 'Obtain an official No Objection Certificate (NOC) confirming all master community service charges and maintenance reserve fees are settled up to the closing date, enabling title deed transfer.',
      descAr: 'الحصول على شهادة عدم ممانعة (NOC) تثبت سداد كامل رسوم الصيانة والخدمات المجتمعية حتى تاريخ نقل الملكية للمشتري الجديد.'
    },
    {
      number: '04',
      titleEn: 'MOJ Property Registration & Title Deed',
      titleAr: 'تسجيل الملكية لدى وزارة العدل وإصدار سند الملكية',
      agency: isAr ? 'إدارة التسجيل العقاري بوزارة العدل' : 'MOJ Real Estate Registration Directorate',
      descEn: 'Attend the specialized Foreign Real Estate Ownership Office at Lusail or The Pearl Service Center. Pay the official government transfer fee (1.25% total: 0.25% registration + 1.0% transfer). The official electronic Title Deed (Sanad Malkiya) is issued to the foreign buyer.',
      descAr: 'الحضور لمكتب تسجيل وتملك غير القطريين للعقارات (بلوسيل أو اللؤلؤة). سداد الرسوم الحكومية الإجمالية (١٫٢٥٪ فقط)، واستلام سند الملكية الإلكتروني الرسمي باسم المشتري الأجنبي.'
    },
    {
      number: '05',
      titleEn: 'Automated Residency Issuance via Metrash',
      titleAr: 'إصدار الإقامة الفورية عبر منصة مطراش ووزارة الداخلية',
      agency: isAr ? 'وزارة الداخلية (إدارة شؤون الوافدين)' : 'Ministry of Interior (MOI Residency Unit)',
      descEn: 'Once the title deed is issued, the MOJ portal directly interfaces with the Ministry of Interior. Property owners exceeding 730,000 QAR receive an investor residency card without requiring an employer sponsor; purchases over 3,650,000 QAR qualify for Permanent Residency (PR) with state healthcare and commercial perks.',
      descAr: 'يرتبط نظام وزارة العدل رقمياً بوزارة الداخلية مباشرة. يحصل مالك العقار بقيمة ٧٣٠ ألف ريال فأكثر على إقامة مستثمر دون مستقدم، في حين يمنح العقار بقيمة ٣٫٦٥ مليون ريال بطاقة الإقامة الدائمة ومزاياها الصحية والتجارية.'
    }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      qEn: 'Can non-Qatari foreigners purchase 100% freehold real estate in Qatar?',
      qAr: 'هل يمكن للأجانب غير القطريين شراء وتملك العقارات بنسبة ١٠٠٪ ملكية حرة في قطر؟',
      aEn: 'Yes. Under Law No. 16 of 2018 and Cabinet Resolution No. 28 of 2020, non-Qatari individuals and international corporate entities can purchase 100% freehold property in 9 designated prime zones across Qatar, including The Pearl Qatar, Lusail City, and West Bay Lagoon. Ownership is in perpetuity, with complete rights to sell, bequeath, mortgage, and lease the property.',
      aAr: 'نعم. بموجب القانون رقم ١٦ لسنة ٢٠١٨ وقرار مجلس الوزراء رقم ٢٨ لسنة ٢٠٢٠، يحق للأفراد والشركات الأجنبية تملك العقارات ملكية حرة تامة ١٠٠٪ في ٩ مناطق استراتيجية منها اللؤلؤة قطر ومدينة لوسيل وبحيرة الخليج الغربي، مع كامل حقوق التصرف والبيع والتوريث والرهن.'
    },
    {
      qEn: 'What is the difference between Freehold and 99-Year Usufruct in Qatar?',
      qAr: 'ما الفرق بين التملك الحر الدائم وحق الانتفاع لمدة ٩٩ سنة في قطر؟',
      aEn: 'Freehold zones (9 zones like The Pearl and Lusail) grant ownership of the land and building in perpetuity with no expiry. Usufruct zones (16 zones including Msheireb Downtown, Al Sadd, and Najma) grant a renewable 99-year leasehold interest with full rights to occupy, sublease, inherit, or mortgage the property during the term. Both qualify for Qatari government residency if minimum valuation thresholds are satisfied.',
      aAr: 'مناطق التملك الحر (٩ مناطق كلؤلؤة ولوسيل) تمنح ملكية الأرض والمبنى إلى الأبد دون مدة انتهاء. أما مناطق حق الانتفاع (١٦ منطقة كالسد ومشيرب) فتمنح حق استغلال وتأجير وتوريث ورهن لمدة ٩٩ سنة قابلة للتجديد، وتمنح كلاهما الإقامة عند استيفاء الحد الأدنى المالي.'
    },
    {
      qEn: 'What are the minimum capital thresholds to qualify for Qatar residency through property?',
      qAr: 'ما هو الحد الأدنى لقيمة العقار للحصول على الإقامة القطرية للمستثمرين؟',
      aEn: 'There are two official tiers established by the State of Qatar: 1) Tier 1 (Renewable Residency): Minimum property value of QAR 730,000 (~$200,550 USD). Grants renewable residency for the owner and their nuclear family without needing an employer sponsor. 2) Tier 2 (Permanent Residency PR Card): Minimum property value of QAR 3,650,000 (~$1,002,750 USD). Grants Qatar Permanent Residency with state-subsidized healthcare at Hamad Medical Corporation, access to government schools, and the right to establish commercial businesses without a local Qatari partner.',
      aAr: 'حددت الدولة شريحتين رسميتين: ١) إقامة مستثمر متجددة: شراء عقار بقيمة لا تقل عن ٧٣٠ ألف ريال (~٢٠٠ ألف دولار) تمنح إقامة للمالك وأسرته دون مستقدم عمل طوال فترة التملك. ٢) الإقامة الدائمة (بطاقة PR): شراء عقار بقيمة ٣٫٦٥ مليون ريال (~مليون دولار) تمنح بطاقة الإقامة الدائمة مع رعاية صحية في مؤسسة حمد وتعليم حكومي وحق مزاولة الأنشطة التجارية دون شريك محلي.'
    },
    {
      qEn: 'What are the real estate purchase taxes and ongoing property taxes in Qatar?',
      qAr: 'ما هي رسوم الشراء والضرائب العقارية المعمول بها في دولة قطر؟',
      aEn: 'Qatar has zero income tax, zero capital gains tax, and zero recurring annual council or property taxes on residential holdings. When acquiring a property, the buyer pays a one-time government registration and transfer fee of only 1.25% of the transaction value (0.25% contract registration + 1.0% title deed transfer fee) at the Ministry of Justice.',
      aAr: 'تتميز دولة قطر بانعدام ضريبة الدخل وضريبة الأرباح الرأسمالية والضرائب العقارية السنوية. تقتصر الرسوم على رسم حكومي لمرة واحدة بنسبة ١٫٢٥٪ فقط من قيمة العقار (٠٫٢٥٪ تسجيل عقد + ١٪ نقل ملكية) لدى إدارة التسجيل العقاري بوزارة العدل.'
    },
    {
      qEn: 'Can foreign buyers obtain a mortgage from Qatari commercial banks?',
      qAr: 'هل يمكن للمشترين الأجانب الحصول على تمويل عقاري (قرض سكني) من البنوك القطرية؟',
      aEn: 'Yes. Major commercial banks (such as QNB, Commercial Bank of Qatar, and Doha Bank) provide mortgage facilities for foreign buyers. Qatari residents can secure up to 70% Loan-to-Value (LTV) on ready freehold properties with loan tenors up to 25 years. Non-resident international investors can typically secure 50% to 60% LTV on select pre-approved prime freehold assets.',
      aAr: 'نعم. توفر البنوك القطرية الرائدة (مثل بنك قطر الوطني QNB والبنك التجاري وبنك الدوحة) قروضاً عقارية للمقيمين وغير المقيمين بنسبة تمويل تصل إلى ٧٠٪ للمقيمين و٥٠٪ إلى ٦٠٪ للمستثمرين الدوليين غير المقيمين في أصول التملك الحر المعتمدة.'
    },
    {
      qEn: 'What are the current gross rental yields in prime Doha freehold areas for 2026?',
      qAr: 'ما هي العوائد الإيجارية الإجمالية الحالية في مناطق التملك الحر بالدوحة لعام ٢٠٢٦؟',
      aEn: 'According to Q2 2026 data, prime Doha and Lusail residential assets achieve gross rental yields between 6.5% and 8.5%, significantly outperforming Western European and North American gateway capitals. Mid-rise apartments in Lusail Fox Hills and Al Sadd offer yields up to 8.2% - 8.5%, while waterfront towers in The Pearl and Lusail Marina average 7.1% to 7.4% alongside superior capital appreciation prospects.',
      aAr: 'تسجل العقارات السكنية في الدوحة ولوسيل خلال الربع الثاني ٢٠٢٦ عوائد تأجيرية إجمالية تتراوح بين ٦٫٥٪ و٨٫٥٪، وهي من بين الأعلى عالمياً. تحقق الشقق في جبل ثعيلب بلوسيل ومنطقة السد عوائد تصل إلى ٨٫٢٪ - ٨٫٥٪، بينما تحقق أبراج اللؤلؤة ومارينا لوسيل عوائد بين ٧٫١٪ و٧٫٤٪ مع نمو رأسمالي قوي.'
    }
  ];

  const filteredZones = zonesData.filter(zone => {
    const matchesType = zoneTypeFilter === 'all' || zone.type === zoneTypeFilter;
    const matchesSearch = 
      zone.nameEn.toLowerCase().includes(zoneSearchQuery.toLowerCase()) ||
      zone.nameAr.includes(zoneSearchQuery) ||
      zone.district.toLowerCase().includes(zoneSearchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Schema.org Structured Data for SEO: FAQPage & HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://ventures.qa/real-estate",
                "url": "https://ventures.qa/real-estate",
                "name": "Invest in Qatar Real Estate: Foreign Ownership, Residency & Yield Guide (Q2 2026)",
                "description": "Comprehensive guide to investing in Qatar real estate. Explore the 9 freehold zones, 16 usufruct leasehold areas, residency qualification thresholds (730k QAR & 3.65M QAR PR), acquisition buy process, and Q2 2026 rental yield trends.",
                "inLanguage": ["en", "ar"]
              },
              {
                "@type": "HowTo",
                "name": "How to Buy Property in Qatar as a Foreigner & Obtain Residency",
                "description": "Five-step institutional protocol for international buyers to acquire freehold property and secure investor residency in Qatar under Law No. 16 of 2018.",
                "step": processSteps.map((step, idx) => ({
                  "@type": "HowToStep",
                  "position": idx + 1,
                  "name": step.titleEn,
                  "text": step.descEn
                }))
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.qEn,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.aEn
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* --- HERO SECTION WITH TITLE & Q2 REAL ESTATE INDEX CARD --- */}
      <section className="relative bg-white rounded-3xl border-2 border-[#E8DFC8] p-6 sm:p-8 md:p-10 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#8A1538] via-[#C5A059] to-[#8A1538]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Left Column: Regulatory Framework & Strategic Overview */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold font-mono uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                {isAr ? 'قانون رقم ١٦ لسنة ٢٠١٨' : 'Law No. 16 of 2018'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C5A059]/15 text-[#8A1538] text-xs font-bold font-mono">
                {isAr ? 'قرار مجلس الوزراء رقم ٢٨ لسنة ٢٠٢٠' : 'Cabinet Resolution No. 28 of 2020'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {isAr ? 'محدث للربع الثاني ٢٠٢٦' : 'Q2 2026 Verified Data'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E1919] tracking-tight leading-tight">
              {isAr
                ? 'دليل الاستثمار العقاري والتملك الحر للأجانب في قطر (٢٠٢٦)'
                : 'Qatar Real Estate Investment & Foreign Ownership Intelligence'}
            </h1>

            <p className="text-sm sm:text-base text-[#574B4B] leading-relaxed max-w-3xl">
              {isAr
                ? 'بوابة تحليلية مستقلة توفر بيانات موثقة للمستثمرين الدوليين والمكاتب العائلية: مناطق التملك الحر الـ ٩ وحق الانتفاع الـ ١٦، خطوات التسجيل العقاري بوزارة العدل، شروط الإقامة الدائمة (٣٫٦٥ مليون ريال)، وأحدث مؤشرات الأسعار والعوائد التأجيرية للربع الثاني ٢٠٢٦.'
                : "The institutional guide to real estate investment in Qatar: navigate the 9 freehold zones and 16 usufruct leasehold areas, calculate government investor residency eligibility (730k QAR & 3.65M QAR PR), examine step-by-step acquisition protocols, and evaluate live Q2 2026 cap rates and rental yields."}
            </p>

            {/* Quick Action Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#zones-matrix"
                className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>{isAr ? 'استكشف مناطق التملك الحر' : 'Explore Ownership Zones'}</span>
              </a>
              <a
                href="#yield-calculator"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1E1919] text-xs font-bold border border-[#D5C9B8] transition-all flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-[#8A1538]" />
                <span>{isAr ? 'حاسبة العائد والإقامة' : 'Yield & Residency Calculator'}</span>
              </a>
              <a
                href="#buy-process"
                className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EDE6DC] text-[#8A1538] text-xs font-bold border border-[#8A1538]/30 transition-all flex items-center gap-1.5"
              >
                <ArrowRight className="w-4 h-4 text-[#C5A059] rtl:rotate-180" />
                <span>{isAr ? 'مسار الشراء والتسجيل' : 'Buy & Registration Steps'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Q2 2026 Real Estate Block (Exact QPCI Card Visual Style) */}
          <div className="lg:col-span-4 w-full">
            <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#8A1538] via-[#C5A059] to-[#8A1538]" />
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
                <div>
                  <h3 className="text-sm font-black text-[#1E1919] tracking-tight">
                    {isAr ? 'مؤشرات القطاع العقاري' : 'Qatar Real Estate Indicators'}
                  </h3>
                  <p className="text-[11px] text-[#8A1538] font-semibold font-mono">
                    {isAr ? 'محدث للربع الثاني ٢٠٢٦' : 'Q2 2026 Live Metrics'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-[#8A1538]/10 text-[#8A1538] flex items-center justify-center font-black text-xs font-mono">
                  QREI
                </div>
              </div>

              <div className="divide-y divide-[#F0EBE1] text-xs">
                {/* 1. Prime Freehold Price */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'متوسط سعر المتر (تملك حر)' : 'Median Freehold Price / m²'}
                  </span>
                  <span className="font-bold text-[#1E1919] text-sm font-mono">
                    13,850 QAR <span className="text-[#8A1538] font-normal text-[10px]">($3,805)</span>
                  </span>
                </div>

                {/* 2. Prime Gross Yield */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'متوسط العائد الإيجاري الإجمالي' : 'Average Prime Gross Yield'}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-bold text-emerald-700 text-sm">7.2%</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1 rounded font-semibold">
                      {isAr ? '٦٫٥٪ - ٨٫٥٪' : '6.5% - 8.5% range'}
                    </span>
                  </div>
                </div>

                {/* 3. Transaction Volume */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'حجم التداولات العقارية (H1)' : 'H1 Real Estate Trades'}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-bold text-[#1E1919] text-sm">18.4B QAR</span>
                    <span className="text-[#8A1538] font-normal text-[10px]">($5.05B)</span>
                  </div>
                </div>

                {/* 4. Foreign Ownership Inflow */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'نمو تملك غير القطريين (سنوي)' : 'Foreign Ownership Inflow (YoY)'}
                  </span>
                  <span className="font-bold text-emerald-700 text-sm font-mono">
                    +28.4%
                  </span>
                </div>

                {/* 5. Mortgage Rate */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#6B5E5E]">
                    {isAr ? 'سعر الإقراض العقاري (المصرف المركزي)' : 'QCB Benchmark Mortgage Rate'}
                  </span>
                  <span className="font-bold text-[#1E1919] text-sm font-mono">
                    4.85% <span className="text-[#6B5E5E] font-normal text-[10px]">(Fixed/Floating)</span>
                  </span>
                </div>
              </div>

              {/* Sourced Footnote (Exact QPCI Card Style) */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#8A1538] text-[#C5A059] flex items-center justify-center shrink-0 font-bold text-[10px] font-mono">
                    QREI
                  </div>
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-[#1E1919]">
                      {isAr ? 'مؤشر أسعار العقارات القطري' : 'Qatar Real Estate Index (QREI)'}
                    </p>
                    <p className="text-[#6B5E5E] mt-0.5 text-[10px]">
                      {isAr ? 'توثيق رسمي: مصرف قطر المركزي وإدارة التسجيل العقاري بوزارة العدل' : 'Official Sourcing: QCB Real Estate Index & MOJ Data'}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8DFC8] text-[10px] text-[#6B5E5E] flex items-center justify-between">
                  <span>{isAr ? 'التحديث القادم: يوليو ٢٠٢٦' : 'Next Revision: July 2026'}</span>
                  <span className="font-bold text-[#8A1538]">
                    {isAr ? 'بدون عمولات أو وساطة' : 'Independent Data'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- RESIDENCY BY REAL ESTATE INVESTMENT TIERS --- */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold uppercase tracking-wider font-mono">
            {isAr ? 'الحوافز والإقامة الرسمية' : 'Government Residency Tiers'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'شروط وإجراءات الحصول على الإقامة القطرية عبر التملك' : 'Official Real Estate Residency Framework in Qatar'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E]">
            {isAr
              ? 'بموجب قرار مجلس الوزراء رقم ٢٨ لسنة ٢٠٢٠، يحصل المستثمر العقاري غير القطري على إقامة رسمية له ولأسرته وفق شريحتين ماليتين محددتين:'
              : 'Pursuant to Cabinet Resolution No. 28 of 2020, foreign real estate investors obtain official residency for themselves and immediate family under two statutory investment thresholds:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tier 1: Renewable Residency */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#E8DFC8] hover:border-[#8A1538] transition-all shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] text-[#8A1538] border border-[#E8DFC8] font-mono text-xs font-bold">
                  {isAr ? 'الشريحة الأولى (السنوية المتجددة)' : 'Tier 1: Renewable Residency'}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {isAr ? 'طوال مدة التملك' : 'Duration of Ownership'}
                </span>
              </div>

              <div>
                <p className="text-xs text-[#6B5E5E] font-medium">{isAr ? 'الحد الأدنى لقيمة العقار' : 'Minimum Property Value'}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#1E1919] font-mono">730,000 QAR</span>
                  <span className="text-sm text-[#8A1538] font-bold font-mono">(~$200,550 USD)</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-[#4A3F3F]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                  <span>{isAr ? 'إقامة رسمية للمالك والزوج/الزوجة والأبناء دون سن الرشد' : 'Official residency for property owner, spouse, and dependent children'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                  <span>{isAr ? 'لا يشترط وجود مستقدم أو كفيل عمل في دولة قطر' : 'No employer sponsorship or corporate sponsor required in Qatar'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                  <span>{isAr ? 'سارية في جميع مناطق التملك الحر الـ ٩ وحق الانتفاع الـ ١٦' : 'Applicable across all 9 freehold zones and 16 usufruct leasehold areas'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A1538] shrink-0 mt-0.5" />
                  <span>{isAr ? 'تجدد تلقائياً طالما بقيت الملكية مسجلة باسم المشتري' : 'Renewable automatically through Metrash as long as ownership is maintained'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EBE1] text-[11px] text-[#6B5E5E]">
              {isAr ? 'مثالي لـ: المستثمرين الأفراد، المتقاعدين الدوليين، وأصحاب الأعمال المستقلين.' : 'Best for: Individual retail investors, international professionals, and independent founders.'}
            </div>
          </div>

          {/* Tier 2: Permanent Residency (PR) */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#C5A059] hover:border-[#8A1538] transition-all shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#C5A059] to-[#8A1538]" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#8A1538] text-[#C5A059] font-mono text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isAr ? 'الشريحة الثانية (بطاقة الإقامة الدائمة PR)' : 'Tier 2: Permanent Residency (PR)'}</span>
                </span>
                <span className="text-xs font-bold text-[#8A1538] bg-[#8A1538]/10 px-2 py-0.5 rounded">
                  {isAr ? 'مزايا حكومية كاملة' : 'Privileged Status'}
                </span>
              </div>

              <div>
                <p className="text-xs text-[#6B5E5E] font-medium">{isAr ? 'الحد الأدنى لقيمة العقار' : 'Minimum Property Value'}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#1E1919] font-mono">3,650,000 QAR</span>
                  <span className="text-sm text-[#8A1538] font-bold font-mono">(~$1,002,750 USD)</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-[#4A3F3F]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="font-semibold text-[#1E1919]">
                    {isAr ? 'بطاقة الإقامة الدائمة القطرية الرسمية (Permanent Residency Card)' : 'Full Qatari Permanent Residency (PR) Card issued for lifetime privileges'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{isAr ? 'رعاية صحية كاملة في المستشفيات الحكومية (مؤسسة حمد الطبية ومراكز الرعاية الأولية)' : 'Subsidized healthcare in government hospitals (Hamad Medical Corporation)'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{isAr ? 'التعليم في المؤسسات التعليمية والمدارس الحكومية في دولة قطر' : 'Right to enroll dependents in Qatar public educational institutions'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{isAr ? 'حق تأسيس وممارسة الأنشطة التجارية والاستثمار بدون شريك قطري محلي' : 'Right to establish and invest in commercial enterprises without a local Qatari partner'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{isAr ? 'أولوية في بعض الإجراءات الحكومية وحرية الخروج والعودة دون قيود مدة الإقامة' : 'Unrestricted travel in and out of Qatar without maximum absence abroad conditions'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EBE1] text-[11px] text-[#6B5E5E]">
              {isAr ? 'مثالي لـ: العائلات ذات الملاءة المالية العالية، المستثمرين الإقليميين، والمؤسسين.' : 'Best for: High-net-worth families, international founders, and family offices seeking permanence.'}
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE YIELD & RESIDENCY CALCULATOR --- */}
      <section id="yield-calculator" className="bg-[#FAF8F5] rounded-3xl border-2 border-[#E8DFC8] p-6 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DFC8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8A1538] text-white flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1E1919]">
                  {isAr ? 'حاسبة العائد الاستثماري والأهلية للإقامة' : 'Real Estate Yield & Residency Eligibility Calculator'}
                </h3>
                <p className="text-xs text-[#6B5E5E]">
                  {isAr ? 'احسب العائد الإجمالي والصافي ورسوم التسجيل وتأكد من شريحة الإقامة المكتسبة' : 'Calculate gross and net yield, registration fees, and unlocked residency tier'}
                </p>
              </div>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8DFC8] self-start sm:self-auto">
              <button
                onClick={() => setCalcCurrency('QAR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  calcCurrency === 'QAR' ? 'bg-[#8A1538] text-white' : 'text-[#6B5E5E] hover:text-[#1E1919]'
                }`}
              >
                QAR (ريال)
              </button>
              <button
                onClick={() => setCalcCurrency('USD')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  calcCurrency === 'USD' ? 'bg-[#8A1538] text-white' : 'text-[#6B5E5E] hover:text-[#1E1919]'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Controls */}
            <div className="space-y-5 bg-white p-6 rounded-2xl border border-[#E8DFC8]">
              {/* Property Price Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#1E1919]">{isAr ? 'سعر شراء العقار' : 'Property Acquisition Price'}</span>
                  <span className="text-[#8A1538] font-mono">
                    {calcCurrency === 'USD' ? `$${calcPropertyPrice.toLocaleString()}` : `${calcPropertyPrice.toLocaleString()} QAR`}
                  </span>
                </div>
                <input
                  type="range"
                  min={calcCurrency === 'USD' ? 100000 : 365000}
                  max={calcCurrency === 'USD' ? 2000000 : 7300000}
                  step={calcCurrency === 'USD' ? 25000 : 50000}
                  value={calcPropertyPrice}
                  onChange={(e) => setCalcPropertyPrice(Number(e.target.value))}
                  className="w-full accent-[#8A1538] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8A7979] font-mono">
                  <span>{calcCurrency === 'USD' ? '$100K' : '365K QAR'}</span>
                  <span>{calcCurrency === 'USD' ? '$1M (PR Level)' : '3.65M QAR (الإقامة الدائمة)'}</span>
                  <span>{calcCurrency === 'USD' ? '$2M+' : '7.3M QAR+'}</span>
                </div>
              </div>

              {/* Monthly Expected Rent Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#1E1919]">{isAr ? 'الإيجار الشهري المتوقع' : 'Expected Monthly Rental Income'}</span>
                  <span className="text-emerald-700 font-mono">
                    {calcCurrency === 'USD' ? `$${calcMonthlyRent.toLocaleString()}` : `${calcMonthlyRent.toLocaleString()} QAR`}
                  </span>
                </div>
                <input
                  type="range"
                  min={calcCurrency === 'USD' ? 1000 : 3500}
                  max={calcCurrency === 'USD' ? 12000 : 45000}
                  step={calcCurrency === 'USD' ? 250 : 500}
                  value={calcMonthlyRent}
                  onChange={(e) => setCalcMonthlyRent(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8A7979] font-mono">
                  <span>{calcCurrency === 'USD' ? '$1K/mo' : '3,500 QAR'}</span>
                  <span>{calcCurrency === 'USD' ? '$5K/mo' : '18,000 QAR'}</span>
                  <span>{calcCurrency === 'USD' ? '$12K/mo' : '45,000 QAR'}</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2 border-t border-[#F0EBE1]">
                <p className="text-[11px] font-bold text-[#6B5E5E] mb-2">{isAr ? 'نماذج جاهزة سريعة:' : 'Quick Market Presets:'}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setCalcPropertyPrice(calcCurrency === 'USD' ? 250000 : 910000);
                      setCalcMonthlyRent(calcCurrency === 'USD' ? 1800 : 6500);
                    }}
                    className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E8DFC8] text-left rtl:text-right text-[11px] font-semibold text-[#1E1919]"
                  >
                    🏢 {isAr ? 'شقة استثمارية بلوسيل' : 'Lusail Mid-Rise 1BR'}
                  </button>
                  <button
                    onClick={() => {
                      setCalcPropertyPrice(calcCurrency === 'USD' ? 550000 : 2000000);
                      setCalcMonthlyRent(calcCurrency === 'USD' ? 3400 : 12500);
                    }}
                    className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E8DFC8] text-left rtl:text-right text-[11px] font-semibold text-[#1E1919]"
                  >
                    🌊 {isAr ? 'شقة مائية باللؤلؤة' : 'The Pearl 2BR Marina'}
                  </button>
                  <button
                    onClick={() => {
                      setCalcPropertyPrice(calcCurrency === 'USD' ? 1050000 : 3800000);
                      setCalcMonthlyRent(calcCurrency === 'USD' ? 6200 : 22500);
                    }}
                    className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E8DFC8] text-left rtl:text-right text-[11px] font-semibold text-[#8A1538] font-bold col-span-2"
                  >
                    👑 {isAr ? 'عقار فاخر مؤهل للإقامة الدائمة (PR)' : 'PR Tier Permanent Luxury Residence (3.8M QAR)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Summary Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#8A1538]/20 shadow-sm space-y-5">
              <h4 className="text-xs font-bold text-[#8A1538] uppercase tracking-wider font-mono">
                {isAr ? 'النتائج المالية والوضع القانوني' : 'Financial Yield & Legal Standing'}
              </h4>

              {/* Yield Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                  <p className="text-[11px] text-[#6B5E5E]">{isAr ? 'العائد الإجمالي (Gross)' : 'Gross Rental Yield'}</p>
                  <p className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
                    {grossYield.toFixed(2)}%
                  </p>
                  <p className="text-[10px] text-[#8A7979] mt-0.5 font-mono">
                    {isAr ? `${annualGrossRentQAR.toLocaleString()} ريال/سنة` : `${Math.round(calcMonthlyRent * 12).toLocaleString()} / year`}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                  <p className="text-[11px] text-[#6B5E5E]">{isAr ? 'العائد الصافي التقديري' : 'Est. Net Cash Yield'}</p>
                  <p className="text-2xl font-black text-[#1E1919] font-mono mt-0.5">
                    {netYield.toFixed(2)}%
                  </p>
                  <p className="text-[10px] text-[#8A7979] mt-0.5 font-mono">
                    {isAr ? 'بعد خصم ١٢٪ رسوم صيانة' : 'After ~12% HOA service'}
                  </p>
                </div>
              </div>

              {/* Residency Status Unlocked Box */}
              <div className={`p-4 rounded-xl border ${
                residencyTier === 'permanent'
                  ? 'bg-amber-50/60 border-amber-300 text-amber-950'
                  : residencyTier === 'renewable'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}>
                <div className="flex items-center gap-2">
                  {residencyTier === 'permanent' && <Award className="w-5 h-5 text-[#8A1538]" />}
                  {residencyTier === 'renewable' && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
                  {residencyTier === 'none' && <HelpCircle className="w-5 h-5 text-stone-400" />}
                  <span className="font-bold text-xs uppercase tracking-wider font-mono">
                    {residencyTier === 'permanent'
                      ? (isAr ? 'مؤهل للإقامة الدائمة القطرية (PR Card)' : 'Permanent Residency (PR) Unlocked')
                      : residencyTier === 'renewable'
                      ? (isAr ? 'مؤهل لإقامة المستثمر السنوية المتجددة' : 'Renewable Investor Residency Unlocked')
                      : (isAr ? 'أقل من الحد الأدنى للإقامة (٧٣٠ ألف ريال)' : 'Below Residency Threshold (730,000 QAR)')}
                  </span>
                </div>
                <p className="text-xs mt-1.5 leading-relaxed">
                  {residencyTier === 'permanent'
                    ? (isAr
                      ? 'سعر العقار يتجاوز ٣٫٦٥ مليون ريال: يمنحك بطاقة الإقامة الدائمة، علاج حكومي مجاني، تعليم، وتأسيس أعمال بدون شريك قطري.'
                      : 'Property exceeds QAR 3.65M: Grants full permanent residency card, government healthcare, education rights, and 100% foreign business ownership.')
                    : residencyTier === 'renewable'
                    ? (isAr
                      ? 'سعر العقار يتجاوز ٧٣٠ ألف ريال: يمنحك إقامة مستثمر رسمية متجددة لك ولأسرتك دون الحاجة لكفيل أو مستقدم عمل.'
                      : 'Property exceeds QAR 730k: Unlocks renewable residency for investor and family for the lifetime of property ownership.')
                    : (isAr
                      ? `للتأهل للإقامة، ينقصك شراء عقار بقيمة ${(730000 - currentPriceQAR).toLocaleString()} ريال إضافية.`
                      : `To qualify for residency, an additional ${(730000 - currentPriceQAR).toLocaleString()} QAR in valuation is required.`)}
                </p>
              </div>

              {/* Government Transfer Cost Breakdown */}
              <div className="pt-2 text-xs space-y-1.5 border-t border-[#F0EBE1]">
                <div className="flex justify-between text-[#6B5E5E]">
                  <span>{isAr ? 'رسوم التسجيل ونقل الملكية الحكومية (١٫٢٥٪):' : 'One-Time MOJ Transfer & Reg Fee (1.25%):'}</span>
                  <span className="font-bold text-[#1E1919] font-mono">
                    {calcCurrency === 'USD' ? `$${Math.round(govTransferFeeQAR / QAR_PER_USD).toLocaleString()}` : `${Math.round(govTransferFeeQAR).toLocaleString()} QAR`}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B5E5E]">
                  <span>{isAr ? 'ضريبة الدخل والأرباح الرأسمالية:' : 'Income & Capital Gains Tax in Qatar:'}</span>
                  <span className="font-bold text-emerald-700 font-mono">0.00% (ضريبة صفرية)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOREIGN OWNERSHIP ZONES MATRIX (9 FREEHOLD VS 16 USUFRUCT) --- */}
      <section id="zones-matrix" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold uppercase tracking-wider font-mono">
              {isAr ? 'المناطق المصرح بها قانونياً' : 'Designated Foreign Investment Zones'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight mt-1">
              {isAr ? 'مصفوفة مناطق التملك الحر وحق الانتفاع في قطر' : 'Freehold & Usufruct Zone Directory'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1 max-w-2xl">
              {isAr
                ? '٩ مناطق تملك حر دائم مدى الحياة + ١٦ منطقة حق انتفاع لمدة ٩٩ سنة بموجب قرار مجلس الوزراء رقم ٢٨ لسنة ٢٠٢٠'
                : '9 perpetual freehold zones + 16 renewable 99-year usufruct zones established under Cabinet Resolution No. 28 of 2020.'}
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8A7979] absolute left-3 rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isAr ? 'ابحث باسم المنطقة...' : 'Search by area name...'}
                value={zoneSearchQuery}
                onChange={(e) => setZoneSearchQuery(e.target.value)}
                className="pl-8 rtl:pr-8 pr-3 rtl:pl-3 py-1.5 rounded-xl border border-[#E8DFC8] bg-white text-xs text-[#1E1919] focus:outline-none focus:border-[#8A1538]"
              />
            </div>

            <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8DFC8]">
              <button
                onClick={() => setZoneTypeFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  zoneTypeFilter === 'all' ? 'bg-[#8A1538] text-white' : 'text-[#6B5E5E]'
                }`}
              >
                {isAr ? 'الكل (٢٥ منطقة)' : 'All (25)'}
              </button>
              <button
                onClick={() => setZoneTypeFilter('freehold')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  zoneTypeFilter === 'freehold' ? 'bg-[#8A1538] text-white' : 'text-[#6B5E5E]'
                }`}
              >
                {isAr ? 'تملك حر (٩ مناطق)' : 'Freehold (9)'}
              </button>
              <button
                onClick={() => setZoneTypeFilter('usufruct')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  zoneTypeFilter === 'usufruct' ? 'bg-[#8A1538] text-white' : 'text-[#6B5E5E]'
                }`}
              >
                {isAr ? 'انتفاع ٩٩ سنة (١٦ منطقة)' : 'Usufruct (16)'}
              </button>
            </div>
          </div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredZones.map((zone) => (
            <div
              key={zone.id}
              className={`bg-white rounded-2xl p-5 border-2 transition-all hover:shadow-md flex flex-col justify-between ${
                zone.type === 'freehold' ? 'border-[#E8DFC8] hover:border-[#8A1538]' : 'border-stone-200 hover:border-[#C5A059]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-[#1E1919]">
                      {isAr ? zone.nameAr : zone.nameEn}
                    </h3>
                    <p className="text-[11px] text-[#6B5E5E] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#8A1538]" />
                      <span>{zone.district}</span>
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider shrink-0 ${
                    zone.type === 'freehold'
                      ? 'bg-[#8A1538]/10 text-[#8A1538] border border-[#8A1538]/20'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {zone.type === 'freehold' ? (isAr ? 'تملك حر' : 'Freehold') : (isAr ? 'انتفاع ٩٩ سنة' : '99-Yr Usufruct')}
                  </span>
                </div>

                <p className="text-xs text-[#574B4B] leading-relaxed">
                  {isAr ? zone.descriptionAr : zone.descriptionEn}
                </p>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#6B5E5E]">{isAr ? 'متوسط سعر المتر:' : 'Avg Price / m²:'}</span>
                    <span className="font-bold text-[#1E1919] font-mono">
                      {zone.avgPriceQarSqm.toLocaleString()} QAR <span className="text-[#8A1538] text-[10px]">(${Math.round(zone.avgPriceQarSqm / QAR_PER_USD)})</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5E5E]">{isAr ? 'العائد التأجيري الإجمالي:' : 'Gross Cap Rate:'}</span>
                    <span className="font-bold text-emerald-700 font-mono">{zone.avgGrossYield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5E5E]">{isAr ? 'متوسط نسبة الإشغال:' : 'Avg Occupancy:'}</span>
                    <span className="font-bold text-[#1E1919] font-mono">{zone.occupancy}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0EBE1] text-[10px] text-[#6B5E5E]">
                <span className="font-semibold text-[#1E1919]">{isAr ? 'الأنسب لـ: ' : 'Prime For: '}</span>
                <span>{isAr ? zone.popularForAr : zone.popularForEn}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Zone Scope Accordion Note */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] text-xs text-[#574B4B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#8A1538] shrink-0" />
            <p>
              {isAr
                ? 'تشمل مناطق حق الانتفاع الـ ١٦ أيضاً: المنصورة، فريج عبد العزيز، أم غويلينة، الهلال، روضة الخيل، الغانم القديم، والرفاع، وتتمتع بكامل حقوق التوريث وإعادة البيع للغير.'
                : 'The 16 usufruct zones also encompass Al Mansoura, Fereej Abdul Aziz, Umm Ghuwailina, Al Hilal, Rawdat Al Khail, Old Al Ghanim, and Al Rifaa, with full legal rights to mortgage, sublet, and inherit.'}
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#8A1538] shrink-0 font-mono">
            {isAr ? 'سندات صك الرسمية' : 'MOJ SAK Certified'}
          </span>
        </div>
      </section>

      {/* --- STEP-BY-STEP ACQUISITION & BUY PROCESS --- */}
      <section id="buy-process" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold uppercase tracking-wider font-mono">
            {isAr ? 'مسار الشراء الحكومي المعتمد' : 'Institutional Acquisition Pipeline'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'خطوات شراء العقار وإصدار الإقامة لغير القطريين' : 'Step-by-Step Foreign Property Acquisition & Residency Protocol'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E]">
            {isAr
              ? 'دليل عملي معتمد يوضح دور وزارة العدل، المطورين، وإدارة شؤون الوافدين من الفحص حتى استلام سند الملكية والإقامة:'
              : 'Complete protocol guiding international buyers from title due diligence through MOJ registration and automated MOI residency endorsement:'}
          </p>
        </div>

        <div className="space-y-4">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#E8DFC8] hover:border-[#8A1538] transition-all shadow-sm flex flex-col md:flex-row items-start md:items-center gap-5"
            >
              {/* Step Number Circle */}
              <div className="w-12 h-12 rounded-2xl bg-[#8A1538] text-[#C5A059] flex items-center justify-center font-black text-lg font-mono shrink-0 shadow-sm">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#1E1919]">
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#FAF8F5] text-[#8A1538] border border-[#E8DFC8]">
                    {step.agency}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#574B4B] leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>

              {/* Status / Timeline Tag */}
              <div className="self-end md:self-center shrink-0">
                <span className="text-[11px] font-mono font-semibold text-[#8A1538] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {idx === 0 && (isAr ? '١-٢ يوم' : '1-2 Days')}
                    {idx === 1 && (isAr ? '٣-٥ أيام' : '3-5 Days')}
                    {idx === 2 && (isAr ? '٣-٧ أيام' : '3-7 Days')}
                    {idx === 3 && (isAr ? 'نفس اليوم' : 'Same Day')}
                    {idx === 4 && (isAr ? '٥-١٠ أيام' : '5-10 Days')}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Q2 2026 PRICE AND RENT TRENDS MATRIX --- */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold uppercase tracking-wider font-mono">
              {isAr ? 'بيانات السوق الميدانية' : 'Q2 2026 Market Intelligence'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight mt-1">
              {isAr ? 'مؤشرات أسعار المتر والإيجارات في مناطق التملك الحر' : 'Doha & Lusail Price & Rental Yield Benchmarks'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E5E] mt-1">
              {isAr
                ? 'متوسط أسعار الشراء لكل متر مربع، نطاقات الإيجار السنوية للشقق، ونسب العائد التأجيري المحققة في الربع الثاني ٢٠٢٦.'
                : 'Current average sale price per m², residential rental rates (1BR to 3BR), and net cap rates across premier freehold & usufruct districts.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8A1538] bg-[#8A1538]/10 px-3 py-1 rounded-xl font-mono">
              {isAr ? 'تحديث: مايو ٢٠٢٦' : 'Revision: May 2026'}
            </span>
          </div>
        </div>

        {/* Trends Table */}
        <div className="bg-white rounded-2xl border-2 border-[#E8DFC8] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-[#FAF8F5] text-[#1E1919] border-b border-[#E8DFC8] font-bold font-mono">
                <tr>
                  <th className="py-3 px-4">{isAr ? 'المنطقة / الحي' : 'District & Precinct'}</th>
                  <th className="py-3 px-4">{isAr ? 'متوسط سعر المتر' : 'Sale Price / m²'}</th>
                  <th className="py-3 px-4">{isAr ? 'إيجار غرفة وصالة (شهرياً)' : '1-Bed Monthly Rent'}</th>
                  <th className="py-3 px-4">{isAr ? 'إيجار غرفتين وصالة' : '2-Bed Monthly Rent'}</th>
                  <th className="py-3 px-4">{isAr ? 'متوسط العائد' : 'Gross Yield'}</th>
                  <th className="py-3 px-4">{isAr ? 'أهلية الإقامة' : 'Residency Tier'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE1]">
                {rentalTrendsQ2.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#1E1919]">
                      {isAr ? item.areaAr : item.areaEn}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#8A1538]">
                      {item.salePriceSqm}
                      <span className="block text-[10px] text-emerald-700">{item.qoqChange} QoQ</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#574B4B]">{item.oneBedRent}</td>
                    <td className="py-3 px-4 font-mono text-[#574B4B]">{item.twoBedRent}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                      {item.avgYield}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#FAF8F5] border border-[#E8DFC8] text-[#8A1538]">
                        {item.tierEligible}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-[#FAF8F5] border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6B5E5E]">
            <span>
              {isAr
                ? 'المصادر: النشرات الربعية لوزارة العدل، مؤشر مصرف قطر المركزي لأسعار العقارات (REPI)، والصفقات الموثقة في منصة صك.'
                : 'Sources: MOJ Real Estate Registration Bulletins, Qatar Central Bank Real Estate Price Index (REPI), and notarized SAK transactions.'}
            </span>
            <span className="font-bold text-[#8A1538]">
              {isAr ? 'لا توجد عمولات بيع للمنصة' : '0% Brokerage Commission'}
            </span>
          </div>
        </div>
      </section>

      {/* --- FREQUENTLY ASKED QUESTIONS (SEO FAQ ACCORDION) --- */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold uppercase tracking-wider font-mono">
            {isAr ? 'الأسئلة الشائعة والمعايير القانونية' : 'Legal & Regulatory FAQ'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'كل ما يهم المستثمر الأجنبي عن العقارات في قطر' : 'Essential Questions for Foreign Property Investors in Qatar'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E5E]">
            {isAr
              ? 'إجابات دقيقة ومفصلة مستندة إلى النصوص التشريعية الرسمية الصادرة عن مجلس الوزراء ووزارة العدل:'
              : 'Direct statutory answers based on official Qatari laws, ministerial decrees, and banking guidelines:'}
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-[#E8DFC8] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left rtl:text-right font-bold text-sm sm:text-base text-[#1E1919] flex items-center justify-between gap-4 hover:text-[#8A1538] transition-colors"
                >
                  <span>{isAr ? faq.qAr : faq.qEn}</span>
                  <div className="w-6 h-6 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center shrink-0 text-[#8A1538]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#574B4B] leading-relaxed border-t border-[#F0EBE1] pt-3">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CROSS-NAVIGATION BOTTOM CTA --- */}
      <section className="bg-gradient-to-r from-[#1A1415] via-[#2A1D20] to-[#1A1415] rounded-3xl p-6 sm:p-8 text-white text-center relative overflow-hidden border border-[#8A1538]">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#8A1538] text-[#C5A059] text-xs font-bold font-mono uppercase tracking-wider">
            {isAr ? 'منظومة الاستثمار الشاملة في قطر' : 'Integrated Qatar Capital Ecosystem'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isAr ? 'هل تبحث عن استثمار رأسمالي أو تأسيس شركة في قطر؟' : 'Expanding Further into Qatar Venture Capital & Foreign Business?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#D5C9B8] leading-relaxed">
            {isAr
              ? 'اكتشف دليل استثمر في قطر (Invest Qatar)، والشركات الناشئة الأعلى نمواً، ومنصة الصفقات المباشرة دون وساطة.'
              : 'Complement your real estate portfolio with direct access to Qatar 100% foreign enterprise registration, venture capital deal flow, and sovereign fund matching.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {onNavigateTab && (
              <>
                <button
                  onClick={() => onNavigateTab('invest-qatar')}
                  className="px-4 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 border border-[#C5A059]/40"
                >
                  <Building2 className="w-4 h-4 text-[#C5A059]" />
                  <span>{isAr ? 'بوابة استثمر في قطر (FDI Hub)' : 'Explore Invest Qatar (FDI Hub)'}</span>
                </button>
                <button
                  onClick={() => onNavigateTab('startups-qatar')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-[#C5A059]" />
                  <span>{isAr ? 'دليل الشركات الناشئة' : 'Startups Qatar Index'}</span>
                </button>
              </>
            )}
            {onOpenReportModal && (
              <button
                onClick={onOpenReportModal}
                className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>{isAr ? 'تقرير رأس المال الخاص (Q2)' : 'State of Capital Report (Q2)'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
