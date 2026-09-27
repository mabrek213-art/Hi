import {
  EntityProfile,
  MarketIntelligenceItem,
  CapitalIndexQuarter,
  RaisingOpportunity,
  InvestorDemand,
  StateOfCapitalReport,
  PlatformAnalytics,
  NewsArticle,
  EcosystemEvent,
  EcosystemJob,
  EcosystemResource
} from '../types';

export const SEED_ENTITIES: EntityProfile[] = [
  {
    "id": "snoonu",
    "slug": "snoonu",
    "name": "Snoonu",
    "nameAr": "سنونو",
    "tagline": "Qatar's leading super-app for hyper-local on-demand delivery, quick-commerce, and logistics",
    "taglineAr": "تطبيق التوصيل الرائد في قطر للتجارة السريعة والخدمات اللوجستية",
    "description": "Founded in 2019 by Hamad Al-Hajri, Snoonu has grown into one of Qatar’s premier technology scaleups. Operating restaurant delivery, grocery, pharmacy, electronics, and digital merchant solutions with over 500,000 active users and proprietary route-optimization logistics.",
    "descriptionAr": "تأسست في عام 2019 بواسطة حمد الهاجري، وتطورت لتصبح من أبرز الشركات التكنولوجية الصاعدة في قطر، شاملة توصيل المتاجر والمطاعم والتجارة السريعة لأكثر من 500 ألف مستخدم نشط.",
    "type": "startup",
    "sector": "Logistics & Supply Chain",
    "stage": "Series B+",
    "foundedYear": 2019,
    "teamSize": "350+ FTEs",
    "headquarters": "Lusail City, Qatar",
    "headquartersAr": "مدينة لوسيل، قطر",
    "website": "https://snoonu.com",
    "logo": "SN",
    "logoBg": "#8A1538",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "founders@snoonu.com",
    "sourceCitation": "Verified $17M USD total institutional equity across Series A ($5M, 2021) and Series B ($12M, 2022) sourced via Wamda and Bloomberg verified transaction disclosures.",
    "sourcingNote": "Verified via Wamda & Bloomberg disclosures",
    "totalFundingRaisedQar": "61,880,000 QAR",
    "totalFundingRaisedUsd": "$17,000,000 USD",
    "fundingRounds": [
      {
        "round": "Series B",
        "amountQar": "43.7M QAR",
        "amountUsd": "$12M USD",
        "date": "2022-04-15",
        "leadInvestor": "Institutional & Private Venture Syndicates (Source: Wamda & Bloomberg press disclosures)"
      },
      {
        "round": "Series A",
        "amountQar": "18.2M QAR",
        "amountUsd": "$5M USD",
        "date": "2021-04-10",
        "leadInvestor": "Qatari Angel Investors & Syndicate (Source: Official company disclosure)"
      }
    ],
    "institutionalBacking": [
      "Regional Tech Incubators",
      "Private Angel Syndicates",
      "GCC Venture Funds"
    ],
    "keyPeople": [
      {
        "name": "Hamad Al-Hajri",
        "nameAr": "حمد الهاجري",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      },
      {
        "name": "Sabah Al-Kuwari",
        "nameAr": "صباح الكواري",
        "role": "Chief Operating Officer",
        "roleAr": "رئيس العمليات"
      }
    ],
    "metrics": {
      "Monthly Orders": "1,200,000+",
      "Active Merchants": "4,500+",
      "Driver Fleet": "2,200+",
      "Domestic Market Share": "64%"
    },
    "isFeatured": true,
    "contactEmail": "partnerships@snoonu.com"
  },
  {
    "id": "skipcash",
    "slug": "skipcash",
    "name": "SkipCash",
    "nameAr": "سكيب كاش",
    "tagline": "Leading mobile payment gateway and digital point-of-sale platform in Qatar",
    "taglineAr": "بوابة المدفوعات ونقاط البيع الرقمية الرائدة في قطر",
    "description": "SkipCash delivers frictionless contactless payments, payment link invoicing, and integrated merchant checkouts for enterprise retailers and digital platforms across Qatar.",
    "descriptionAr": "منصة دفع رقمية مبتكرة تمكّن التجار والمستهلكين من إتمام المعاملات النقدية الرقمية وربط بوابات التجارة الإلكترونية بسلاسة وأمان.",
    "type": "startup",
    "sector": "FinTech",
    "stage": "Series A",
    "foundedYear": 2020,
    "teamSize": "40 FTEs",
    "headquarters": "West Bay, Doha",
    "headquartersAr": "الخليج الغربي، الدوحة",
    "website": "https://skipcash.com",
    "logo": "SC",
    "logoBg": "#10B981",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "info@skipcash.com",
    "sourceCitation": "Series A $5M + Seed $2M sourced via official press releases & Doha Tech Angels syndication",
    "totalFundingRaisedQar": "25,480,000 QAR",
    "totalFundingRaisedUsd": "$7,000,000 USD",
    "fundingRounds": [
      {
        "round": "Series A",
        "amountQar": "18.2M QAR",
        "amountUsd": "$5.0M USD",
        "date": "2023-11-10",
        "leadInvestor": "Private Family Capital & Regional VCs"
      },
      {
        "round": "Seed",
        "amountQar": "7.28M QAR",
        "amountUsd": "$2.0M USD",
        "date": "2021-06-05",
        "leadInvestor": "Angel Investors Network"
      }
    ],
    "institutionalBacking": [
      "FinTech Accelerators",
      "Commercial Banking Partners",
      "Private Angel Consortium"
    ],
    "keyPeople": [
      {
        "name": "Mohammed Al-Delaimi",
        "nameAr": "محمد الدليمي",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Processed Transactions": "1.5M+ transactions",
      "Merchant Network": "1,800+ stores",
      "Annual Processing Volume": "$180M+ USD"
    },
    "isFeatured": true,
    "contactEmail": "contact@skipcash.com"
  },
  {
    "id": "cwallet",
    "slug": "cwallet",
    "name": "Cwallet",
    "nameAr": "سي والت",
    "tagline": "Licensed neo-banking, mobile payroll, and financial inclusion ecosystem",
    "taglineAr": "منظومة مصرفية رقمية وحلول شمول مالي ودفع أجور مرخصة",
    "description": "Cwallet provides digital mobile payroll, low-cost cross-border remittances, utility payments, and micro-savings specifically tailored for resident workforces and unbanked communities.",
    "descriptionAr": "منصة تكنولوجيا مالية تقدم حلول دفع الأجور والتحويلات المالية الدولية والمدفوعات غير النقدية لتعزيز الشمول المالي.",
    "type": "startup",
    "sector": "FinTech",
    "stage": "Series A",
    "foundedYear": 2020,
    "teamSize": "45 FTEs",
    "headquarters": "Qatar Financial Centre (QFC), West Bay",
    "headquartersAr": "مركز قطر للمال، الخليج الغربي",
    "website": "https://cwallet.qa",
    "logo": "CW",
    "logoBg": "#0D9488",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "support@cwallet.qa",
    "sourceCitation": "Series A $4M (Rasmal Ventures & Al-Mana Capital) + Seed $2M (QFC filings)",
    "totalFundingRaisedQar": "21,840,000 QAR",
    "totalFundingRaisedUsd": "$6,000,000 USD",
    "fundingRounds": [
      {
        "round": "Series A",
        "amountQar": "14.5M QAR",
        "amountUsd": "$4.0M USD",
        "date": "2024-01-18",
        "leadInvestor": "Rasmal Ventures & Al-Mana Capital"
      },
      {
        "round": "Seed",
        "amountQar": "7.3M QAR",
        "amountUsd": "$2.0M USD",
        "date": "2021-12-10",
        "leadInvestor": "MBK Holding & Regional Angel Syndicate"
      }
    ],
    "institutionalBacking": [
      "FinTech Regulatory Sandbox",
      "Regional Seed Programs",
      "Family Office Syndicates"
    ],
    "keyPeople": [
      {
        "name": "Michael Javier",
        "nameAr": "مايكل خافيير",
        "role": "Co-Founder & CEO",
        "roleAr": "المؤسس الشريك والرئيس التنفيذي"
      },
      {
        "name": "Abdulaziz Al-Khal",
        "nameAr": "عبدالعزيز الخال",
        "role": "Co-Founder & Director",
        "roleAr": "مؤسس شريك وعضو مجلس الإدارة"
      }
    ],
    "metrics": {
      "Registered Wallets": "220,000+",
      "Payroll Volume (Monthly)": "45M QAR",
      "Corridor Partners": "12 Countries"
    },
    "isFeatured": true,
    "contactEmail": "support@cwallet.qa"
  },
  {
    "id": "avey-health",
    "slug": "avey-health",
    "name": "Avey AI Health",
    "nameAr": "آفي للذكاء الاصطناعي الصحي",
    "tagline": "DeepTech AI diagnostic self-assessment and medical triage intelligence",
    "taglineAr": "محرك تشخيص وتوجيه طبي متطور مدعوم بنماذج الذكاء الاصطناعي السريرية",
    "description": "Developed by computer scientists and physicians in Doha, Avey utilizes customized machine learning and clinical reasoning engines to provide instant medical diagnosis with higher than 92% clinical accuracy.",
    "descriptionAr": "منصة تكنولوجيا صحية طورتها فرق بحثية في الدوحة لتقديم استشارات وتشخيصات طبية مدعومة بالذكاء الاصطناعي.",
    "type": "startup",
    "sector": "HealthTech & Bio",
    "stage": "Series A",
    "foundedYear": 2021,
    "teamSize": "55 FTEs",
    "headquarters": "Qatar Science & Technology Park, Education City",
    "headquartersAr": "واحة قطر للعلوم والتكنولوجيا، المدينة التعليمية",
    "website": "https://avey.ai",
    "logo": "AV",
    "logoBg": "#2563EB",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "contact@avey.ai",
    "sourceCitation": "Series A $5.5M + Seed $3.0M sourced via QSTP announcements & bio-venture syndicates",
    "totalFundingRaisedQar": "31,000,000 QAR",
    "totalFundingRaisedUsd": "$8,500,000 USD",
    "fundingRounds": [
      {
        "round": "Series A",
        "amountQar": "20.0M QAR",
        "amountUsd": "$5.5M USD",
        "date": "2024-02-14",
        "leadInvestor": "Global Healthtech Syndicate & Doha Family Capital"
      },
      {
        "round": "Seed",
        "amountQar": "11.0M QAR",
        "amountUsd": "$3.0M USD",
        "date": "2022-01-20",
        "leadInvestor": "Health Venture Angels"
      }
    ],
    "institutionalBacking": [
      "Technology Park Research Fund",
      "Global Bio-Ventures Consortium"
    ],
    "keyPeople": [
      {
        "name": "Dr. Mohammad Hammoud",
        "nameAr": "د. محمد حمود",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Diagnostic Assessments": "3,400,000+",
      "Clinical Diagnostic Accuracy": "93.4%",
      "Global User Reach": "140+ Countries"
    },
    "isFeatured": true,
    "contactEmail": "contact@avey.ai"
  },
  {
    "id": "urbanpoint",
    "slug": "urbanpoint",
    "name": "UrbanPoint",
    "nameAr": "إربان بوينت",
    "tagline": "Enterprise customer loyalty, retention, and merchant discovery marketplace",
    "taglineAr": "منصة برامج الولاء للشركات وتفعيل عروض التجار والمطاعم",
    "description": "UrbanPoint is an enterprise customer engagement and lifestyle rewards platform that partners with major telecom carriers and financial institutions to drive local retail and hospitality transactions.",
    "descriptionAr": "منصة رقمية لبرامج ولاء العملاء والعروض الترويجية تعتمد على الشراكات مع كبرى شركات الاتصالات والبنوك.",
    "type": "startup",
    "sector": "Enterprise & SaaS",
    "stage": "Series A",
    "foundedYear": 2016,
    "teamSize": "30 FTEs",
    "headquarters": "Al Sadd, Doha",
    "headquartersAr": "السد، الدوحة",
    "website": "https://urbanpoint.com",
    "logo": "UP",
    "logoBg": "#E11D48",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "14,560,000 QAR",
    "totalFundingRaisedUsd": "$4,000,000 USD",
    "institutionalBacking": [
      "Telecom Innovation Alliances",
      "Regional Seed Accelerators"
    ],
    "keyPeople": [
      {
        "name": "Saif Qazi",
        "nameAr": "سيف قاضي",
        "role": "Co-Founder & Managing Director",
        "roleAr": "مؤسس شريك ومدير تنفيذي"
      },
      {
        "name": "Susanna Ingalls",
        "nameAr": "سوزانا إينغالز",
        "role": "Co-Founder & Head of Product",
        "roleAr": "مؤسسة شريكة ورئيسة المنتج"
      }
    ],
    "metrics": {
      "Active Subscribed Users": "320,000+",
      "Partner Merchant Outlets": "1,400+",
      "Customer Spend Driven": "$70M+ USD"
    },
    "isFeatured": false,
    "contactEmail": "hello@urbanpoint.com"
  },
  {
    "id": "droobi-health",
    "slug": "droobi-health",
    "name": "Droobi Health",
    "nameAr": "دروبي للصحة",
    "tagline": "Bilingual digital therapeutics for diabetes prevention and chronic condition care",
    "taglineAr": "منصة علاجية رقمية متقدمة لإدارة داء السكري والأمراض المزمنة باللغة العربية",
    "description": "Clinically validated digital health intervention app providing personalized lifestyle coaching, glucose tracking, and nutritionist consultations calibrated for Arab dietary patterns.",
    "descriptionAr": "تطبيق علاجي رقمي معتمد سريرياً يقدّم برامج توجيه صحي وتغذوي لإدارة داء السكري والوقاية منه.",
    "type": "startup",
    "sector": "HealthTech & Bio",
    "stage": "Series A",
    "foundedYear": 2018,
    "teamSize": "38 FTEs",
    "headquarters": "Education City, Doha",
    "headquartersAr": "المدينة التعليمية، الدوحة",
    "website": "https://droobihealth.com",
    "logo": "DH",
    "logoBg": "#14B8A6",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "team@droobihealth.com",
    "sourceCitation": "Series A $3.5M (Healthcare Venture Partners) + Seed $1.5M",
    "totalFundingRaisedQar": "18,200,000 QAR",
    "totalFundingRaisedUsd": "$5,000,000 USD",
    "institutionalBacking": [
      "Healthcare Research Consortiums",
      "Regional Venture Syndicate"
    ],
    "keyPeople": [
      {
        "name": "Majed Lababidi",
        "nameAr": "مجد لبابيدي",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Patients Monitored": "15,000+",
      "Average HbA1c Reduction": "-1.2%",
      "Clinical Health System Deployments": "6 Networks"
    },
    "isFeatured": false,
    "contactEmail": "team@droobihealth.com"
  },
  {
    "id": "karty",
    "slug": "karty",
    "name": "Karty",
    "nameAr": "كارتي",
    "tagline": "Smart consumer spend management, budget automation, and virtual Visa cards",
    "taglineAr": "إدارة الإنفاق الذكي والميزانيات التلقائية والبطاقات المالية الرقمية",
    "description": "Karty is an e-wallet platform approved under Qatar Central Bank testing sandbox regulations. Allows users to track daily expenses, categorize transactions automatically, and execute peer-to-peer transfers.",
    "descriptionAr": "محفظة مالية رقمية مرخصة من مصرف قطر المركزي توفر تتبع الإنفاق والبطاقات الذكية المدفوعة مسبقاً.",
    "type": "startup",
    "sector": "FinTech",
    "stage": "Seed",
    "foundedYear": 2021,
    "teamSize": "22 FTEs",
    "headquarters": "Qatar Financial Centre (QFC), Doha",
    "headquartersAr": "مركز قطر للمال، الدوحة",
    "website": "https://karty.qa",
    "logo": "KT",
    "logoBg": "#F59E0B",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "founders@karty.qa",
    "sourceCitation": "Seed $3.2M raised across angel syndicates & FinTech investors",
    "totalFundingRaisedQar": "11,648,000 QAR",
    "totalFundingRaisedUsd": "$3,200,000 USD",
    "institutionalBacking": [
      "FinTech Incubators",
      "Commercial Bank Sponsorship",
      "Regional Angel Group"
    ],
    "keyPeople": [
      {
        "name": "Mohammed Suleiman",
        "nameAr": "محمد سليمان",
        "role": "Co-Founder & CEO",
        "roleAr": "المؤسس الشريك والرئيس التنفيذي"
      },
      {
        "name": "Abdulaziz Al-Marri",
        "nameAr": "عبدالعزيز المري",
        "role": "Co-Founder & COO",
        "roleAr": "المؤسس الشريك ورئيس العمليات"
      }
    ],
    "metrics": {
      "Waitlist & Active Downloads": "95,000+",
      "Transactions Categorized": "1,200,000+",
      "Sandbox Authorization": "Completed"
    },
    "isFeatured": false,
    "contactEmail": "hello@karty.qa"
  },
  {
    "id": "airlift-systems",
    "slug": "airlift-systems",
    "name": "Airlift Systems",
    "nameAr": "إيرلفت سيستمز",
    "tagline": "Autonomous hardware robotics and solar-powered last-mile micro-fulfillment vehicles",
    "taglineAr": "أنظمة روبوتية ذاتية القيادة ومركبات كهربائية لتوصيل الشحنات والميل الأخير",
    "description": "Airlift designs and manufactures self-driving electric ground delivery robots and automated parcel lockers tailored for university campuses, hospitals, and smart master-planned communities.",
    "descriptionAr": "تصميم وتشغيل مركبات توصيل روبوتية ذاتية القيادة وخزائن طرود ذكية للمجمعات السكنية والجامعية.",
    "type": "startup",
    "sector": "Robotics & AI",
    "stage": "Seed",
    "foundedYear": 2020,
    "teamSize": "28 Engineers",
    "headquarters": "Qatar Science & Technology Park",
    "headquartersAr": "واحة قطر للعلوم والتكنولوجيا",
    "website": "https://airlift.qa",
    "logo": "AL",
    "logoBg": "#475569",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "contact@airlift.qa",
    "sourceCitation": "Seed $2.4M sourced via DeepTech angel syndicates and QSTP tech venture matching",
    "totalFundingRaisedQar": "8,736,000 QAR",
    "totalFundingRaisedUsd": "$2,400,000 USD",
    "institutionalBacking": [
      "DeepTech Venture Accelerators",
      "Autonomous Vehicle Testing Sandbox"
    ],
    "keyPeople": [
      {
        "name": "Ahmed Mohamedali",
        "nameAr": "أحمد محمد علي",
        "role": "CEO & Founder",
        "roleAr": "الرئيس التنفيذي والمؤسس"
      }
    ],
    "metrics": {
      "Autonomous Kilometers Logged": "45,000+ km",
      "Campus Delivery Missions": "12,000+",
      "Carbon Emissions Saved": "18 Metric Tons"
    },
    "isFeatured": false,
    "contactEmail": "contact@airlift.qa"
  },
  {
    "id": "rimads",
    "slug": "rimads",
    "name": "Rimads",
    "nameAr": "ريمادس",
    "tagline": "Digital pharmacy aggregator, prescription fulfillment, and home diagnostic delivery",
    "taglineAr": "منصة رقمية لربط الصيدليات وتوصيل الأدوية والوصفات الطبية المعتمدة",
    "description": "Health marketplace enabling patients to upload prescriptions, compare pharmaceutical inventories across 85+ licensed Doha pharmacies, and receive cold-chain doorstep delivery in under 45 minutes.",
    "descriptionAr": "منصة تكنولوجيا صحية تسهل طلب الأدوية ومستحضرات الرعاية الصحية من الصيدليات المعتمدة مع خدمة التوصيل السريع.",
    "type": "startup",
    "sector": "HealthTech & Bio",
    "stage": "Seed",
    "foundedYear": 2019,
    "teamSize": "24 FTEs",
    "headquarters": "Lusail Marina, Qatar",
    "headquartersAr": "مارينا لوسيل، قطر",
    "website": "https://rimads.com",
    "logo": "RM",
    "logoBg": "#9333EA",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "5,460,000 QAR",
    "totalFundingRaisedUsd": "$1,500,000 USD",
    "institutionalBacking": [
      "Health Innovation Syndicates",
      "Angel Investors"
    ],
    "keyPeople": [
      {
        "name": "Dr. Khalid Al-Ali",
        "nameAr": "د. خالد العلي",
        "role": "Co-Founder & Clinical Advisor",
        "roleAr": "مؤسس شريك ومستشار طبي"
      }
    ],
    "metrics": {
      "Fulfilled Prescriptions": "85,000+",
      "Partner Pharmacies": "85 Locations",
      "Delivery SLA": "< 45 Minutes"
    },
    "isFeatured": false,
    "contactEmail": "info@rimads.com"
  },
  {
    "id": "applab",
    "slug": "applab",
    "name": "Applab",
    "nameAr": "آب لاب",
    "tagline": "Leading software product engineering, digital design studio, and enterprise platform builder",
    "taglineAr": "استوديو تطوير البرمجيات والمنصات الرقمية وتطبيقات الشركات الكبرى",
    "description": "Founded in Doha, Applab is a recognized technology engineering company delivering high-traffic web and mobile platforms, government digital portals, and bespoke SaaS architectures across Qatar.",
    "descriptionAr": "شركة هندسة برمجيات قطرية متخصصة في بناء التطبيقات والحلول الرقمية للشركات والمؤسسات الحكومية والخاصة.",
    "type": "startup",
    "sector": "Enterprise & SaaS",
    "stage": "Growth",
    "foundedYear": 2016,
    "teamSize": "65 Engineers & Designers",
    "headquarters": "Lusail City, Qatar",
    "headquartersAr": "مدينة لوسيل، قطر",
    "website": "https://applab.qa",
    "logo": "AP",
    "logoBg": "#0284C7",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "9,100,000 QAR",
    "totalFundingRaisedUsd": "$2,500,000 USD",
    "institutionalBacking": [
      "Private Corporate Contracts",
      "Technology Ecosystem Syndicates"
    ],
    "keyPeople": [
      {
        "name": "Mohamed Al-Mulla",
        "nameAr": "محمد الملا",
        "role": "Managing Partner & Founder",
        "roleAr": "شريك إداري ومؤسس"
      }
    ],
    "metrics": {
      "Enterprise Platforms Delivered": "120+ Products",
      "Active Monthly End Users": "2.5M+",
      "Technical Team": "65+ FTEs"
    },
    "isFeatured": false,
    "contactEmail": "info@applab.qa"
  },
  {
    "id": "subol",
    "slug": "subol",
    "name": "Subol",
    "nameAr": "سبل للابتكار",
    "tagline": "Smart IoT hardware, LPWAN environmental sensing, and industrial safety devices",
    "taglineAr": "أجهزة استشعار وإنترنت الأشياء للسلامة الصناعية والمراقبة البيئية",
    "description": "Subol engineers proprietary IoT sensor hardware, developing the Sargas gas leak detection ecosystem that alerts homeowners and facilities teams to combustible gas accumulation in real time.",
    "descriptionAr": "شركة أجهزة تقنية وإنترنت الأشياء طورت جهاز سارجاس الذكي لكشف تسربات الغاز والإنذار المبكر في المنازل والمنشآت.",
    "type": "startup",
    "sector": "DeepTech & AI",
    "stage": "Seed",
    "foundedYear": 2018,
    "teamSize": "16 Hardware Engineers",
    "headquarters": "Qatar Science & Technology Park",
    "headquartersAr": "واحة قطر للعلوم والتكنولوجيا",
    "website": "https://subol.qa",
    "logo": "SB",
    "logoBg": "#EA580C",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "3,100,000 QAR",
    "totalFundingRaisedUsd": "$850,000 USD",
    "institutionalBacking": [
      "QSTP Product Development Fund",
      "Hardware Tech Angels"
    ],
    "keyPeople": [
      {
        "name": "Saleh Safran",
        "nameAr": "صالح سفران",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Sensors Deployed": "4,500+ Units",
      "Gas Leak Alerts Triggered": "140+ Prevented Incidents",
      "Patents Registered": "2 Patents"
    },
    "isFeatured": false,
    "contactEmail": "contact@subol.qa"
  },
  {
    "id": "em5-education",
    "slug": "em5-education",
    "name": "EM5 (Education Media)",
    "nameAr": "إي إم 5 للتعليم التفاعلي",
    "tagline": "Gamified EdTech platform, interactive curricula, and student engagement tooling",
    "taglineAr": "منصة تكنولوجيا تعليم تفاعلية ومناهج رقمية معززة بالألعاب للطلاب",
    "description": "EdTech venture developing customized interactive learning modules and gamified STEM assessments aligned with national educational standards for K-12 schools.",
    "descriptionAr": "منصة تعليمية متطورة تقدم حلول التعلم التفاعلي ومحتوى رقمي للمدارس والمؤسسات الأكاديمية.",
    "type": "startup",
    "sector": "Enterprise & SaaS",
    "stage": "Seed",
    "foundedYear": 2021,
    "teamSize": "14 Specialists",
    "headquarters": "Education City, Doha",
    "headquartersAr": "المدينة التعليمية، الدوحة",
    "website": "https://em5.qa",
    "logo": "EM",
    "logoBg": "#8B5CF6",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "2,184,000 QAR",
    "totalFundingRaisedUsd": "$600,000 USD",
    "institutionalBacking": [
      "Education Innovation Grants",
      "Angel Investors"
    ],
    "keyPeople": [
      {
        "name": "Fatima Al-Kuwari",
        "nameAr": "فاطمة الكواري",
        "role": "Founder & Curriculum Lead",
        "roleAr": "المؤسسة ومسؤولة المناهج"
      }
    ],
    "metrics": {
      "Enrolled Students": "35,000+",
      "Partner Schools": "28 Schools",
      "Learning Completion Rate": "88%"
    },
    "isFeatured": false,
    "contactEmail": "learn@em5.qa"
  },
  {
    "id": "atpick",
    "slug": "atpick",
    "name": "AtPick",
    "nameAr": "أت بيك",
    "tagline": "Smart click-and-collect ordering network and digital retail drive-thru solutions",
    "taglineAr": "شبكة الاستلام الذكي من المتاجر وحلول الدفع والاستلام بالسيارة",
    "description": "AtPick connects consumers to local cafes, bakeries, and boutique retail shops for seamless curb-side pick-up without waiting in line, optimizing drive-thru throughput.",
    "descriptionAr": "تطبيق ذكي يتيح طلب القهوة والمأكولات واستلامها من السيارة أو المتجر مباشرة دون انتظار.",
    "type": "startup",
    "sector": "Logistics & Supply Chain",
    "stage": "Seed",
    "foundedYear": 2020,
    "teamSize": "18 FTEs",
    "headquarters": "West Bay, Doha",
    "headquartersAr": "الخليج الغربي، الدوحة",
    "website": "https://atpick.qa",
    "logo": "AP",
    "logoBg": "#D97706",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "4,368,000 QAR",
    "totalFundingRaisedUsd": "$1,200,000 USD",
    "institutionalBacking": [
      "Retail Tech Angels",
      "Local Seed Accelerators"
    ],
    "keyPeople": [
      {
        "name": "Jassim Al-Emadi",
        "nameAr": "جاسم العمادي",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Registered Merchant Stores": "450+",
      "Orders Completed": "650,000+",
      "Average Wait Time": "2.1 minutes"
    },
    "isFeatured": false,
    "contactEmail": "contact@atpick.qa"
  },
  {
    "id": "spendwisor",
    "slug": "spendwisor",
    "name": "Spendwisor",
    "nameAr": "سبندوايزر",
    "tagline": "Mobile m-POS payment platform with integrated algorithmic consumer cashback loyalty",
    "taglineAr": "منصة دفع واسترداد نقدي ذكية تربط نقاط البيع ببرامج ولاء المستهلكين",
    "description": "FinTech scaleup providing merchants with POS mobile payment capabilities, targeted customer analytics, and real-time algorithmic discount incentives on every checkout.",
    "descriptionAr": "منصة تكنولوجيا مالية توفر حلول قبول المدفوعات عبر الهاتف واسترداد نقدي فوري للتجار والمتسوقين.",
    "type": "startup",
    "sector": "FinTech",
    "stage": "Pre-Series A",
    "foundedYear": 2020,
    "teamSize": "26 FTEs",
    "headquarters": "Qatar Financial Centre (QFC)",
    "headquartersAr": "مركز قطر للمال، الدوحة",
    "website": "https://spendwisor.com",
    "logo": "SW",
    "logoBg": "#10B981",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "6,552,000 QAR",
    "totalFundingRaisedUsd": "$1,800,000 USD",
    "institutionalBacking": [
      "FinTech Syndicate",
      "Regional Angel Group"
    ],
    "keyPeople": [
      {
        "name": "Safarudheen Farook",
        "nameAr": "سفر الدين فاروق",
        "role": "Co-Founder & CEO",
        "roleAr": "المؤسس الشريك والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Merchant Checkouts": "1,200+ Stores",
      "Transaction Volume Tracked": "$40M+ USD",
      "Active Loyalty Users": "110,000+"
    },
    "isFeatured": false,
    "contactEmail": "info@spendwisor.com"
  },
  {
    "id": "dohabuddy",
    "slug": "dohabuddy",
    "name": "Dohabuddy",
    "nameAr": "دوحة بادي",
    "tagline": "AI concierge, personalized city discovery, and digital tourism experience platform",
    "taglineAr": "مرشد ذكي ومنصة رقمية لتجارب السياحة واكتشاف الفعاليات في الدوحة",
    "description": "Travel tech startup using AI conversational agents and localized recommendation algorithms to guide visitors and residents to events, dining, and cultural attractions.",
    "descriptionAr": "تطبيق سياحي ذكي يقدم دليلاً تفاعلياً وتوصيات مخصصة للزوار والمقيمين لاكتشاف الفعاليات والمطاعم والمعالم.",
    "type": "startup",
    "sector": "DeepTech & AI",
    "stage": "Pre-Seed",
    "foundedYear": 2022,
    "teamSize": "10 Team Members",
    "headquarters": "The Pearl, Qatar",
    "headquartersAr": "اللؤلؤة، قطر",
    "website": "https://dohabuddy.qa",
    "logo": "DB",
    "logoBg": "#3B82F6",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "1,456,000 QAR",
    "totalFundingRaisedUsd": "$400,000 USD",
    "institutionalBacking": [
      "Tourism Innovation Incubator",
      "Private Angels"
    ],
    "keyPeople": [
      {
        "name": "Noora Al-Hajri",
        "nameAr": "نورة الهاجري",
        "role": "Founder & Product Lead",
        "roleAr": "المؤسسة ورئيسة المنتج"
      }
    ],
    "metrics": {
      "Monthly Itineraries Generated": "45,000+",
      "Attractions Cataloged": "1,800 Places",
      "Tourist Engagement Rating": "4.8 / 5"
    },
    "isFeatured": false,
    "contactEmail": "hi@dohabuddy.qa"
  },
  {
    "id": "ebutler",
    "slug": "ebutler",
    "name": "EButler",
    "nameAr": "إي باتلر",
    "tagline": "On-demand home services, facility maintenance, and lifestyle concierge super-app",
    "taglineAr": "تطبيق الخدمات المنزلية المتكاملة وصيانة المرافق والخدمات الشخصية",
    "description": "Connecting homeowners and businesses with vetted professionals across plumbing, AC maintenance, home cleaning, vehicle detailing, and specialized repair services.",
    "descriptionAr": "منصة توفر أكثر من 300 خدمة منزلية وتجارية عبر فنيين معتمدين بأسلوب رقمي سلس.",
    "type": "startup",
    "sector": "Logistics & Supply Chain",
    "stage": "Series A",
    "foundedYear": 2017,
    "teamSize": "42 FTEs",
    "headquarters": "Al Sadd, Doha",
    "headquartersAr": "السد، الدوحة",
    "website": "https://e-butler.com",
    "logo": "EB",
    "logoBg": "#1E293B",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "10,920,000 QAR",
    "totalFundingRaisedUsd": "$3,000,000 USD",
    "institutionalBacking": [
      "Regional Venture Funds",
      "Local Family Office Syndicates"
    ],
    "keyPeople": [
      {
        "name": "Omar Ashour",
        "nameAr": "عمر عاشور",
        "role": "Co-Founder & CEO",
        "roleAr": "المؤسس الشريك والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Jobs Completed": "350,000+ Services",
      "Vetted Service Providers": "420 Partners",
      "Customer Satisfaction": "94.2%"
    },
    "isFeatured": false,
    "contactEmail": "support@e-butler.com"
  },
  {
    "id": "fatora",
    "slug": "fatora",
    "name": "Fatora",
    "nameAr": "فاتورة",
    "tagline": "Smart invoicing software, online payment links, and SME micro-remittance tools",
    "taglineAr": "برمجيات الفوترة الذكية وروابط الدفع الإلكتروني للشركات الصغيرة والمتوسطة",
    "description": "Cloud billing and digital invoice collection platform enabling freelancers, SMEs, and online retailers to generate instant payment links and track collections.",
    "descriptionAr": "منصة حلول دفع وفواتير إلكترونية تمكّن الشركات ورواد الأعمال من إصدار الفواتير وتحصيل الأموال بسهولة.",
    "type": "startup",
    "sector": "FinTech",
    "stage": "Seed",
    "foundedYear": 2019,
    "teamSize": "20 FTEs",
    "headquarters": "Doha, Qatar",
    "headquartersAr": "الدوحة، قطر",
    "website": "https://fatora.io",
    "logo": "FT",
    "logoBg": "#059669",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "3,640,000 QAR",
    "totalFundingRaisedUsd": "$1,000,000 USD",
    "institutionalBacking": [
      "FinTech Incubators",
      "Seed Capital Angels"
    ],
    "keyPeople": [
      {
        "name": "Loay Qwaider",
        "nameAr": "لؤي قويدر",
        "role": "Co-Founder & CTO",
        "roleAr": "مؤسس شريك والمدير التقني"
      }
    ],
    "metrics": {
      "Invoices Processed": "800,000+ Invoices",
      "Active Merchants": "2,400+ Businesses",
      "Processed Volume": "$65M+ USD"
    },
    "isFeatured": false,
    "contactEmail": "contact@fatora.io"
  },
  {
    "id": "meddy",
    "slug": "meddy",
    "name": "Meddy (Helium Health)",
    "nameAr": "ميدي",
    "tagline": "Digital physician booking, patient reviews, and clinic management software",
    "taglineAr": "منصة حجز المواعيد الطبية وتقييمات الأطباء وإدارة العيادات الرقمية",
    "description": "Originally founded at Carnegie Mellon Qatar, Meddy grew into one of the region’s premier doctor-booking platforms before its landmark acquisition by Helium Health.",
    "descriptionAr": "منصة رائدة لحجز مواعيد الأطباء والاستشارات الطبية انطلقت من الدوحة وخدمت ملايين المرضى في قطر والخليج.",
    "type": "startup",
    "sector": "HealthTech & Bio",
    "stage": "Series A",
    "foundedYear": 2015,
    "teamSize": "32 FTEs",
    "headquarters": "QSTP, Education City",
    "headquartersAr": "واحة قطر للعلوم والتكنولوجيا، المدينة التعليمية",
    "website": "https://meddy.com",
    "logo": "MD",
    "logoBg": "#0284C7",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data (Acquired by Helium Health)",
    "totalFundingRaisedQar": "12,740,000 QAR",
    "totalFundingRaisedUsd": "$3,500,000 USD",
    "institutionalBacking": [
      "QSTP Tech Venture Fund",
      "Regional VCs (500 Startups, 212)"
    ],
    "keyPeople": [
      {
        "name": "Haris Aghadi",
        "nameAr": "حارس أغادي",
        "role": "Co-Founder & Former CEO",
        "roleAr": "مؤسس شريك ورئيس تنفيذي سابق"
      }
    ],
    "metrics": {
      "Patient Appointments Booked": "2.1M+ Visits",
      "Doctors Listed": "3,000+ Physicians",
      "M&A Status": "Acquired by Helium Health"
    },
    "isFeatured": false,
    "contactEmail": "press@meddy.com"
  },
  {
    "id": "kenzz",
    "slug": "kenzz",
    "name": "Kenzz",
    "nameAr": "كنز للتجارة الرقمية",
    "tagline": "Direct-to-consumer e-commerce, wholesale dropship engine, and marketplace",
    "taglineAr": "منصة تجارة إلكترونية وسوق رقمي يربط الموردين بالمستهلكين مباشرة",
    "description": "E-commerce platform facilitating reliable local delivery of lifestyle, home goods, and electronics with localized payment methods and direct merchant warehousing.",
    "descriptionAr": "منصة تسوق رقمية تركز على تلبية احتياجات المستهلكين المحليين بأسعار تنافسية وتوصيل سريع.",
    "type": "startup",
    "sector": "Enterprise & SaaS",
    "stage": "Seed",
    "foundedYear": 2021,
    "teamSize": "19 FTEs",
    "headquarters": "Industrial Area, Doha",
    "headquartersAr": "المنطقة الصناعية، الدوحة",
    "website": "https://kenzz.qa",
    "logo": "KZ",
    "logoBg": "#6366F1",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "4,004,000 QAR",
    "totalFundingRaisedUsd": "$1,100,000 USD",
    "institutionalBacking": [
      "Angel Investors",
      "Commercial Trading Syndicates"
    ],
    "keyPeople": [
      {
        "name": "Sultan Al-Kuwari",
        "nameAr": "سلطان الكواري",
        "role": "Managing Director",
        "roleAr": "المدير التنفيذي"
      }
    ],
    "metrics": {
      "SKUs Listed": "45,000+ Products",
      "Deliveries Fulfilled": "180,000+",
      "Warehouse Footprint": "3,500 sqm"
    },
    "isFeatured": false,
    "contactEmail": "contact@kenzz.qa"
  },
  {
    "id": "debito",
    "slug": "debito",
    "name": "Debito",
    "nameAr": "ديبيتو",
    "tagline": "Automated B2B debt recovery, cashflow optimization, and legal collections SaaS",
    "taglineAr": "منصة برمجية لأتمتة تحصيل ديون الشركات وإدارة التدفقات النقدية",
    "description": "Enterprise FinTech platform helping Qatari enterprises automate receivables management, client reminder sequences, and amicable debt settlement.",
    "descriptionAr": "منصة تكنولوجيا مالية متخصصة في إدارة ومتابعة وتحصيل الذمم المدينة للشركات بطرق نظامية وذكية.",
    "type": "startup",
    "sector": "FinTech",
    "stage": "Seed",
    "foundedYear": 2022,
    "teamSize": "15 FTEs",
    "headquarters": "Qatar Financial Centre (QFC)",
    "headquartersAr": "مركز قطر للمال، الدوحة",
    "website": "https://debito.qa",
    "logo": "DT",
    "logoBg": "#047857",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "2,730,000 QAR",
    "totalFundingRaisedUsd": "$750,000 USD",
    "institutionalBacking": [
      "QFC FinTech Program",
      "Corporate Angel Backers"
    ],
    "keyPeople": [
      {
        "name": "Hamad Al-Subaey",
        "nameAr": "حمد السبيعي",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Receivables Managed": "$35M+ USD",
      "Recovery Acceleration": "+38% Faster",
      "Enterprise Clients": "45 Corporations"
    },
    "isFeatured": false,
    "contactEmail": "info@debito.qa"
  },
  {
    "id": "volante",
    "slug": "volante",
    "name": "Volante",
    "nameAr": "فولانتي",
    "tagline": "Premium on-demand chauffeur mobility, luxury fleet telematics, and VIP transport",
    "taglineAr": "منصة تنقل فاخر وسيارات بسائق خاص وخدمات نقل كبار الشخصيات",
    "description": "Chauffeur and executive transportation app catering to business travelers, embassies, and luxury hospitality venues across Doha with integrated telematics.",
    "descriptionAr": "منصة رقمية لخدمات النقل الفاخر والسيارات الفارهة بسائق للشركات والوفود والفعاليات الكبرى.",
    "type": "startup",
    "sector": "Logistics & Supply Chain",
    "stage": "Pre-Series A",
    "foundedYear": 2020,
    "teamSize": "22 Operations & Tech",
    "headquarters": "West Bay, Doha",
    "headquartersAr": "الخليج الغربي، الدوحة",
    "website": "https://volante.qa",
    "logo": "VL",
    "logoBg": "#0F172A",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "5,824,000 QAR",
    "totalFundingRaisedUsd": "$1,600,000 USD",
    "institutionalBacking": [
      "Hospitality Capital Group",
      "Private Mobility Angels"
    ],
    "keyPeople": [
      {
        "name": "Nasser Al-Thani",
        "nameAr": "ناصر آل ثاني",
        "role": "Co-Founder & CEO",
        "roleAr": "مؤسس شريك ورئيس تنفيذي"
      }
    ],
    "metrics": {
      "Fleet Size": "150+ Luxury Vehicles",
      "VIP Rides Completed": "85,000+",
      "Corporate Accounts": "65 Groups"
    },
    "isFeatured": false,
    "contactEmail": "concierge@volante.qa"
  },
  {
    "id": "q-tickets",
    "slug": "q-tickets",
    "name": "Q-Tickets",
    "nameAr": "كيو تكتس",
    "tagline": "Digital ticketing infrastructure, cinema bookings, sports events, and RFID access",
    "taglineAr": "منصة بيع التذاكر الرقمية وحجوزات السينما والفعاليات الرياضية والترفيهية",
    "description": "One of Qatar’s long-standing entertainment ticketing platforms, processing admissions for cinema chains, concerts, and major international sporting events.",
    "descriptionAr": "منصة التذاكر الرائدة في قطر لحجز تذاكر السينما والفعاليات والمباريات والمهرجانات الترفيهية.",
    "type": "startup",
    "sector": "SportsTech & Media",
    "stage": "Growth",
    "foundedYear": 2014,
    "teamSize": "35 FTEs",
    "headquarters": "Doha, Qatar",
    "headquartersAr": "الدوحة، قطر",
    "website": "https://q-tickets.com",
    "logo": "QT",
    "logoBg": "#DC2626",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "15,288,000 QAR",
    "totalFundingRaisedUsd": "$4,200,000 USD",
    "institutionalBacking": [
      "Entertainment Group Investment",
      "Commercial Investors"
    ],
    "keyPeople": [
      {
        "name": "Tejinder Singh",
        "nameAr": "تيجندر سينغ",
        "role": "Founder & Managing Director",
        "roleAr": "المؤسس والمدير التنفيذي"
      }
    ],
    "metrics": {
      "Tickets Issued": "12M+ Admissions",
      "Cinemas Integrated": "100% of Commercial Multiplexes",
      "Annual Event Volume": "1,200+ Events"
    },
    "isFeatured": false,
    "contactEmail": "contact@q-tickets.com"
  },
  {
    "id": "shamal-technologies",
    "slug": "shamal-technologies",
    "name": "Shamal Technologies",
    "nameAr": "شمال للتقنيات الجيومكانية",
    "tagline": "Autonomous drone surveying, geospatial computer vision, and infrastructure AI",
    "taglineAr": "حلول المسح الجوي بالدرونز والذكاء الاصطناعي لفحص البنية التحتية والمشاريع",
    "description": "DeepTech scaleup deploying autonomous drone fleets and computer vision to deliver digital twins, photogrammetry, and inspection analytics for major civil infrastructure.",
    "descriptionAr": "شركة تقنية متقدمة تستخدم الطائرات بدون طيار وخوارزميات الرؤية الحاسوبية لمسح ومراقبة المشاريع الإنشائية والبنية التحتية.",
    "type": "startup",
    "sector": "DeepTech & AI",
    "stage": "Seed",
    "foundedYear": 2021,
    "teamSize": "18 Engineers",
    "headquarters": "Qatar Science & Technology Park",
    "headquartersAr": "واحة قطر للعلوم والتكنولوجيا",
    "website": "https://shamaltech.qa",
    "logo": "ST",
    "logoBg": "#0891B2",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "3,458,000 QAR",
    "totalFundingRaisedUsd": "$950,000 USD",
    "institutionalBacking": [
      "QSTP Innovation Program",
      "Infrastructure Tech Angels"
    ],
    "keyPeople": [
      {
        "name": "Abdullah Al-Kindi",
        "nameAr": "عبدالله الكندي",
        "role": "Founder & Chief Surveyor",
        "roleAr": "المؤسس ورئيس المسح"
      }
    ],
    "metrics": {
      "Square Kilometers Mapped": "1,400+ sq km",
      "Structural Inspections": "320+ Towers & Bridges",
      "Mapping Precision": "< 2cm Resolution"
    },
    "isFeatured": false,
    "contactEmail": "survey@shamaltech.qa"
  },
  {
    "id": "torod-logistics",
    "slug": "torod-logistics",
    "name": "Torod Logistics",
    "nameAr": "طرود للخدمات اللوجستية",
    "tagline": "B2B last-mile delivery orchestration API and multi-carrier smart routing engine",
    "taglineAr": "بوابة موحدة لربط وتوزيع الشحنات والميل الأخير لمتاجر التجارة الإلكترونية",
    "description": "Logistics SaaS engine that integrates e-commerce platforms with dozens of courier providers, automating order dispatch, tracking, and SLA enforcement through a single API.",
    "descriptionAr": "منصة برمجية تربط منصات التجارة الإلكترونية مع شركات التوصيل لاختيار المسار الأسرع والأقل تكلفة تلقائياً.",
    "type": "startup",
    "sector": "Logistics & Supply Chain",
    "stage": "Seed",
    "foundedYear": 2021,
    "teamSize": "16 FTEs",
    "headquarters": "Doha, Qatar",
    "headquartersAr": "الدوحة، قطر",
    "website": "https://torod.qa",
    "logo": "TR",
    "logoBg": "#2563EB",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "4,732,000 QAR",
    "totalFundingRaisedUsd": "$1,300,000 USD",
    "institutionalBacking": [
      "Supply Chain Angels",
      "Regional Seed Syndicates"
    ],
    "keyPeople": [
      {
        "name": "Faisal Al-Nuaimi",
        "nameAr": "فيصل النعيمي",
        "role": "Co-Founder & CEO",
        "roleAr": "المؤسس الشريك والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Shipments Dispatched": "750,000+ Parcels",
      "Courier Integrations": "14 Fleets",
      "Merchant Delivery Cost Saved": "22%"
    },
    "isFeatured": false,
    "contactEmail": "support@torod.qa"
  },
  {
    "id": "bonocle",
    "slug": "bonocle",
    "name": "Bonocle",
    "nameAr": "بونوكل",
    "tagline": "Assistive handheld digital Braille controller, e-learning device, and accessibility tech",
    "taglineAr": "جهاز ذكي محمول لقراءة برايل الرقمية وتعليم المكفوفين وضعاف البصر",
    "description": "Internationally awarded hardware accessibility device translating digital text, games, and classroom materials into dynamic tactile Braille on a pocket-sized handheld controller.",
    "descriptionAr": "جهاز ثوري مبتكر يمكن المكفوفين من قراءة الكتب والرسائل الرقمية وممارسة الألعاب بلغة برايل عبر الهاتف الذكي.",
    "type": "startup",
    "sector": "DeepTech & AI",
    "stage": "Seed",
    "foundedYear": 2018,
    "teamSize": "12 Specialists",
    "headquarters": "Qatar Science & Technology Park",
    "headquartersAr": "واحة قطر للعلوم والتكنولوجيا",
    "website": "https://bonocle.co",
    "logo": "BN",
    "logoBg": "#7C3AED",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "2,912,000 QAR",
    "totalFundingRaisedUsd": "$800,000 USD",
    "institutionalBacking": [
      "Accessibility Innovation Grants",
      "QSTP Tech Incubator"
    ],
    "keyPeople": [
      {
        "name": "Abdelrazek Aly",
        "nameAr": "عبدالرازق علي",
        "role": "Co-Founder & CEO",
        "roleAr": "مؤسس شريك ورئيس تنفيذي"
      },
      {
        "name": "Ramy Soliman",
        "nameAr": "رامي سليمان",
        "role": "Co-Founder & COO",
        "roleAr": "مؤسس شريك ورئيس العمليات"
      }
    ],
    "metrics": {
      "Global Devices Shipped": "2,500+ Units",
      "Supported Languages": "Arabic, English, French",
      "Awards Won": "World Summit Award, MIT Pan Arab"
    },
    "isFeatured": false,
    "contactEmail": "info@bonocle.co"
  },
  {
    "id": "paperfly",
    "slug": "paperfly",
    "name": "Paperfly",
    "nameAr": "بيبرفلاي",
    "tagline": "Enterprise cloud document intelligence, legal OCR parsing, and digital workflows",
    "taglineAr": "برمجيات أتمتة الوثائق السحابية والتعرف الضوئي على النصوص للشركات",
    "description": "Enterprise software startup streamlining contract reviews, Arabic OCR extraction, and regulatory compliance storage for corporate legal departments and real estate firms.",
    "descriptionAr": "منصة ذكاء اصطناعي لقراءة وفهرسة المستندات والوثائق القانونية باللغتين العربية والإنجليزية.",
    "type": "startup",
    "sector": "Enterprise & SaaS",
    "stage": "Seed",
    "foundedYear": 2022,
    "teamSize": "11 Engineers",
    "headquarters": "West Bay, Doha",
    "headquartersAr": "الخليج الغربي، الدوحة",
    "website": "https://paperfly.qa",
    "logo": "PF",
    "logoBg": "#475569",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "2,366,000 QAR",
    "totalFundingRaisedUsd": "$650,000 USD",
    "institutionalBacking": [
      "Angel Investor Syndicate"
    ],
    "keyPeople": [
      {
        "name": "Tarek Mansour",
        "nameAr": "طارق منصور",
        "role": "Founder & CTO",
        "roleAr": "المؤسس والمدير التقني"
      }
    ],
    "metrics": {
      "Documents Processed": "1.8M+ Pages",
      "Arabic OCR Accuracy": "97.8%",
      "Active Corporate Accounts": "34 Firms"
    },
    "isFeatured": false,
    "contactEmail": "contact@paperfly.qa"
  },
  {
    "id": "tean-edtech",
    "slug": "tean-edtech",
    "name": "Tean",
    "nameAr": "تيان للتعليم التكنولوجي",
    "tagline": "STEM robotics hardware kits, K-12 coding curricula, and maker lab educational platforms",
    "taglineAr": "حقائب تعليم الروبوتات والبرمجة ومختبرات الابتكار للطلاب والمدارس",
    "description": "Education hardware startup offering localized robotics assembly kits, coding tutorials, and school competition platforms to foster early engineering skills in Qatar.",
    "descriptionAr": "منصة ومجموعات أدوات لتعليم الأطفال واليافعين مبادئ الروبوت والذكاء الاصطناعي بأسلوب عملي شيق.",
    "type": "startup",
    "sector": "DeepTech & AI",
    "stage": "Pre-Seed",
    "foundedYear": 2023,
    "teamSize": "8 Educators & Engineers",
    "headquarters": "Education City, Doha",
    "headquartersAr": "المدينة التعليمية، الدوحة",
    "website": "https://tean.qa",
    "logo": "TN",
    "logoBg": "#10B981",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "1,274,000 QAR",
    "totalFundingRaisedUsd": "$350,000 USD",
    "institutionalBacking": [
      "EdTech Incubator Grant"
    ],
    "keyPeople": [
      {
        "name": "Sarah Al-Attiyah",
        "nameAr": "سارة العطية",
        "role": "Founder & Educational Lead",
        "roleAr": "المؤسسة والمسؤولة التعليمية"
      }
    ],
    "metrics": {
      "Robotics Kits Distributed": "3,800+ Kits",
      "School Workshops Run": "120 Sessions",
      "Student Engagement": "6,500+ Youth"
    },
    "isFeatured": false,
    "contactEmail": "info@tean.qa"
  },
  {
    "id": "q-auto-tech",
    "slug": "q-auto-tech",
    "name": "Q-Auto Tech",
    "nameAr": "كيو أوتو تك",
    "tagline": "Connected automotive diagnostics, mobile mechanic dispatch, and maintenance SaaS",
    "taglineAr": "منصة فحص وصيانة السيارات الذكية وطلب الميكانيكي المتنقل",
    "description": "AutoTech platform connecting vehicle owners with mobile certified mechanics, fleet diagnostics, and predictive parts ordering across Doha.",
    "descriptionAr": "تطبيق رقمي لحجز خدمات الصيانة الدورية للسيارات والفحص الفني المتنقل في المنزل أو العمل.",
    "type": "startup",
    "sector": "Enterprise & SaaS",
    "stage": "Seed",
    "foundedYear": 2021,
    "teamSize": "18 Operations & Tech",
    "headquarters": "Ain Khaled, Doha",
    "headquartersAr": "عين خالد، الدوحة",
    "website": "https://qautotech.qa",
    "logo": "QA",
    "logoBg": "#B91C1C",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "3,276,000 QAR",
    "totalFundingRaisedUsd": "$900,000 USD",
    "institutionalBacking": [
      "Automotive Angel Investors"
    ],
    "keyPeople": [
      {
        "name": "Ali Al-Marri",
        "nameAr": "علي المري",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Vehicles Serviced": "24,000+ Cars",
      "Mobile Vans Active": "18 Units",
      "Average Rating": "4.7 / 5"
    },
    "isFeatured": false,
    "contactEmail": "service@qautotech.qa"
  },
  {
    "id": "clever-clean",
    "slug": "clever-clean",
    "name": "Clever Clean",
    "nameAr": "كليفر كلين",
    "tagline": "Eco-friendly waterless vehicle cleaning, fleet detailing, and logistics booking app",
    "taglineAr": "تطبيق غسيل السيارات الذكي الصديق للبيئة بدون ماء وتقنيات النانو",
    "description": "Environmentally sustainable car detailing platform using biodegradable solutions saving 150+ liters of water per clean, operating at shopping destinations and office hubs.",
    "descriptionAr": "منصة تنظيف سيارات مستدامة توفر استهلاك المياه وتتيح حجز الغسيل في المواقف والمنازل.",
    "type": "startup",
    "sector": "Energy & CleanTech",
    "stage": "Seed",
    "foundedYear": 2020,
    "teamSize": "30 Team Members",
    "headquarters": "Doha, Qatar",
    "headquartersAr": "الدوحة، قطر",
    "website": "https://cleverclean.qa",
    "logo": "CC",
    "logoBg": "#059669",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "2,002,000 QAR",
    "totalFundingRaisedUsd": "$550,000 USD",
    "institutionalBacking": [
      "Sustainability Innovation Grants",
      "Angel Network"
    ],
    "keyPeople": [
      {
        "name": "Kareem Barghouthi",
        "nameAr": "كريم البرغوثي",
        "role": "Co-Founder & General Manager",
        "roleAr": "مؤسس شريك ومدير عام"
      }
    ],
    "metrics": {
      "Water Saved": "4.2M Liters",
      "Cleans Completed": "140,000+",
      "Mall Locations": "12 Master Locations"
    },
    "isFeatured": false,
    "contactEmail": "care@cleverclean.qa"
  },
  {
    "id": "modaris",
    "slug": "modaris",
    "name": "Modaris",
    "nameAr": "مدرّس",
    "tagline": "On-demand verified tutor booking, exam preparation, and academic marketplace",
    "taglineAr": "منصة حجز المدرسين الخصوصيين المعتمدين والمراجعات الأكاديمية",
    "description": "Educational marketplace connecting students and parents with credentialed university and school tutors across Doha for both in-person and digital tutoring.",
    "descriptionAr": "منصة تربط أولياء الأمور والطلاب بنخبة من المعلمين المعتمدين لجميع المراحل والمواد الدراسية.",
    "type": "startup",
    "sector": "Enterprise & SaaS",
    "stage": "Seed",
    "foundedYear": 2017,
    "teamSize": "15 FTEs",
    "headquarters": "Education City, Doha",
    "headquartersAr": "المدينة التعليمية، الدوحة",
    "website": "https://modaris.me",
    "logo": "MR",
    "logoBg": "#2563EB",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "2,548,000 QAR",
    "totalFundingRaisedUsd": "$700,000 USD",
    "institutionalBacking": [
      "EdTech Angel Backers"
    ],
    "keyPeople": [
      {
        "name": "Yasmin Al-Hassan",
        "nameAr": "ياسمين الحسن",
        "role": "Founder & Managing Director",
        "roleAr": "المؤسسة والمديرة التنفيذية"
      }
    ],
    "metrics": {
      "Tutoring Hours Completed": "85,000+ Hours",
      "Verified Tutors": "650+ Educators",
      "Subjects Taught": "45 Disciplines"
    },
    "isFeatured": false,
    "contactEmail": "support@modaris.me"
  },
  {
    "id": "pay2go",
    "slug": "pay2go",
    "name": "Pay2Go",
    "nameAr": "باي تو جو",
    "tagline": "Contactless QR payment settlement, merchant checkout, and digital invoice integration",
    "taglineAr": "حلول المدفوعات السريعة عبر رمز الاستجابة السريعة (QR) وتسوية المعاملات",
    "description": "FinTech payment service helping small merchants, pop-up markets, and delivery couriers accept card payments directly via smartphones without standalone POS hardware.",
    "descriptionAr": "حل تكنولوجي مالي يتيح للتجار تحويل هواتفهم إلى نقاط بيع إلكترونية لقبول بطاقات الدفع بسلاسة.",
    "type": "startup",
    "sector": "FinTech",
    "stage": "Seed",
    "foundedYear": 2022,
    "teamSize": "14 FTEs",
    "headquarters": "Qatar Financial Centre (QFC)",
    "headquartersAr": "مركز قطر للمال، الدوحة",
    "website": "https://pay2go.qa",
    "logo": "PG",
    "logoBg": "#10B981",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "3,094,000 QAR",
    "totalFundingRaisedUsd": "$850,000 USD",
    "institutionalBacking": [
      "FinTech Accelerators",
      "Angel Investors"
    ],
    "keyPeople": [
      {
        "name": "Hamad Al-Ghanim",
        "nameAr": "حمد الغانم",
        "role": "Founder & CEO",
        "roleAr": "المؤسس والرئيس التنفيذي"
      }
    ],
    "metrics": {
      "Registered Small Merchants": "1,400+ Merchants",
      "Monthly Processing Run-Rate": "$5.5M USD",
      "Transaction Success Rate": "99.4%"
    },
    "isFeatured": false,
    "contactEmail": "merchants@pay2go.qa"
  },
  {
    "id": "synergy-ai",
    "slug": "synergy-ai",
    "name": "Synergy AI",
    "nameAr": "سينرجي للذكاء الاصطناعي",
    "tagline": "Industrial computer vision, safety hazard detection, and automated site inspection",
    "taglineAr": "أنظمة الذكاء الاصطناعي الصناعي والرؤية الحاسوبية للسلامة ومراقبة المواقع",
    "description": "AI software company providing construction sites, manufacturing plants, and oil & gas facilities with real-time video analytics to prevent worker safety incidents.",
    "descriptionAr": "منصة ذكاء اصطناعي تحلل كاميرات المراقبة في المنشآت الصناعية والمشاريع لرصد المخاطر والتأكد من ارتداء معدات السلامة.",
    "type": "startup",
    "sector": "DeepTech & AI",
    "stage": "Seed",
    "foundedYear": 2021,
    "teamSize": "20 Machine Learning Engineers",
    "headquarters": "Lusail City, Qatar",
    "headquartersAr": "مدينة لوسيل، قطر",
    "website": "https://synergyai.qa",
    "logo": "SY",
    "logoBg": "#3B82F6",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "5,096,000 QAR",
    "totalFundingRaisedUsd": "$1,400,000 USD",
    "institutionalBacking": [
      "Industrial Tech VCs",
      "Energy Venture Angels"
    ],
    "keyPeople": [
      {
        "name": "Dr. Ziad Al-Khatib",
        "nameAr": "د. زياد الخطيب",
        "role": "Founder & Chief Scientist",
        "roleAr": "المؤسس وكبير العلماء"
      }
    ],
    "metrics": {
      "Video Feeds Monitored": "1,800+ Cameras",
      "Safety Incidents Averted": "850+ Hazards",
      "Inference Latency": "< 65 ms"
    },
    "isFeatured": false,
    "contactEmail": "contact@synergyai.qa"
  },
  {
    "id": "aldelaimi-biosciences",
    "slug": "aldelaimi-biosciences",
    "name": "Al-Delaimi BioSciences",
    "nameAr": "الدليمي للعلوم الحيوية",
    "tagline": "Clinical genomics, precision preventive medicine, and biomarker data analytics",
    "taglineAr": "أبحاث الجينوم السريري والطب الوقائي الدقيق وتحليلات المؤشرات الحيوية",
    "description": "BioTech laboratory venture working alongside regional researchers to commercialize personalized genomic risk scoring and cardiovascular disease prevention models.",
    "descriptionAr": "مختبر أبحاث تكنولوجيا حيوية يطور نماذج تحليل جيني مخصصة للتنبؤ بالأمراض المزمنة والوقاية المبكرة.",
    "type": "startup",
    "sector": "HealthTech & Bio",
    "stage": "Pre-Seed",
    "foundedYear": 2023,
    "teamSize": "12 Researchers",
    "headquarters": "Qatar Science & Technology Park",
    "headquartersAr": "واحة قطر للعلوم والتكنولوجيا",
    "website": "https://aldelaimibio.qa",
    "logo": "AD",
    "logoBg": "#14B8A6",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "totalFundingRaisedQar": "1,820,000 QAR",
    "totalFundingRaisedUsd": "$500,000 USD",
    "institutionalBacking": [
      "Research Innovation Fund",
      "BioTech Angels"
    ],
    "keyPeople": [
      {
        "name": "Dr. Mariam Al-Delaimi",
        "nameAr": "د. مريم الدليمي",
        "role": "Principal Investigator & Founder",
        "roleAr": "الباحثة الرئيسية والمؤسسة"
      }
    ],
    "metrics": {
      "Genomic Samples Sequenced": "1,200+ Cohorts",
      "Published Biomarker Papers": "6 Papers",
      "Clinical Collaborations": "3 Hospitals"
    },
    "isFeatured": false,
    "contactEmail": "research@aldelaimibio.qa"
  },
  {
    "id": "ooredoo",
    "slug": "ooredoo-qatar",
    "name": "Ooredoo Qatar",
    "nameAr": "أريدُ قطر",
    "tagline": "Leading multinational telecommunications, 5G cloud networks, and corporate venture backer",
    "taglineAr": "المزود الوطني للاتصالات وشبكات الجيل الخامس والحوسبة السحابية والاستثمار المؤسسي",
    "description": "Major established telecommunications and sovereign digital infrastructure enterprise providing nationwide 5G, enterprise data centers, and corporate venture acceleration programs for tech scaleups.",
    "descriptionAr": "المجموعة الوطنية الرائدة في قطاع الاتصالات والبنية التحتية الرقمية، تقدم شبكات 5G ومراكز البيانات وبرامج دعم وتطوير الشركات الناشئة.",
    "type": "soe",
    "sector": "Enterprise & Growth",
    "stage": "Growth",
    "foundedYear": 1987,
    "teamSize": "2,800+ Employees",
    "headquarters": "Ooredoo HQ, West Bay, Doha",
    "headquartersAr": "برج أريدُ، الخليج الغربي، الدوحة",
    "website": "https://ooredoo.qa",
    "logo": "OR",
    "logoBg": "#ED1C24",
    "verified": true,
    "claimed": false,
    "isEnterprise": true,
    "sourcingNote": "Unverified — sourced from public data (Established Public Enterprise)",
    "totalFundingRaisedQar": "Established Market Cap",
    "totalFundingRaisedUsd": "Multi-Billion Enterprise",
    "institutionalBacking": [
      "Publicly Traded Enterprise (QSE: ORDS)",
      "Sovereign Institutional Holdings"
    ],
    "keyPeople": [
      {
        "name": "Sheikh Ali Bin Jabor Al Thani",
        "nameAr": "الشيخ علي بن جبر آل ثاني",
        "role": "CEO - Ooredoo Qatar",
        "roleAr": "الرئيس التنفيذي - أريدُ قطر"
      }
    ],
    "metrics": {
      "5G Population Coverage": "99%+",
      "Active Mobile Customers": "3.2M+",
      "Data Centers in Qatar": "5 High-Tier Facilities"
    },
    "isFeatured": true,
    "contactEmail": "corporate@ooredoo.qa"
  },
  {
    "id": "qnb-group",
    "slug": "qnb-group",
    "name": "QNB Group (Qatar National Bank)",
    "nameAr": "مجموعة بنك قطر الوطني",
    "tagline": "Largest financial institution in the MEA region and backbone of Qatari venture banking",
    "taglineAr": "المؤسسة المصرفية والمالية الأكبر في منطقة الشرق الأوسط وإفريقيا",
    "description": "Established in 1964, QNB is the premier banking group in the Middle East and Africa, providing institutional lending, open banking APIs, corporate treasury, and startup commercial accounts.",
    "descriptionAr": "تأسست عام 1964 كأول بنك وطني قطري، وتقدم خدمات مصرفية متكاملة للشركات والشركات الناشئة وشراكات التكنولوجيا المالية.",
    "type": "soe",
    "sector": "Enterprise & Growth",
    "stage": "Growth",
    "foundedYear": 1964,
    "teamSize": "30,000+ Group Employees",
    "headquarters": "QNB Head Office, Corniche, Doha",
    "headquartersAr": "المقر الرئيسي لبنك قطر الوطني، الكورنيش، الدوحة",
    "website": "https://qnb.com",
    "logo": "QN",
    "logoBg": "#7A0026",
    "verified": true,
    "claimed": false,
    "isEnterprise": true,
    "sourcingNote": "Unverified — sourced from public data (Established Public Enterprise)",
    "totalFundingRaisedQar": "Established Banking Assets",
    "totalFundingRaisedUsd": "$300B+ Group Assets",
    "institutionalBacking": [
      "Publicly Traded Banking Group (QSE: QNBK)",
      "Sovereign Wealth Allocations"
    ],
    "keyPeople": [
      {
        "name": "Abdulla Mubarak Al-Khalifa",
        "nameAr": "عبدالله مبارك آل خليفة",
        "role": "Group Chief Executive Officer",
        "roleAr": "الرئيس التنفيذي للمجموعة"
      }
    ],
    "metrics": {
      "Total Group Assets": "$330B+ USD",
      "Global Presence": "31+ Countries",
      "Credit Rating": "Aa3 / A+"
    },
    "isFeatured": true,
    "contactEmail": "venture@qnb.com"
  },
  {
    "id": "rasmal-ventures",
    "slug": "rasmal-ventures",
    "name": "Rasmal Ventures",
    "nameAr": "راسمال فنتشرز",
    "tagline": "Independent QFC-regulated venture capital fund manager investing in MENA tech leaders",
    "taglineAr": "شركة إدارة صناديق استثمار جريء مستقلة ومرخصة في مركز قطر للمال",
    "description": "Rasmal Ventures is an independent venture capital firm headquartered in Doha, focusing on Series Seed and Series A investments in high-growth technology companies across enterprise SaaS, FinTech, and B2B marketplaces in Qatar and the broader MENA region.",
    "descriptionAr": "شركة استثمار جريء مستقلة مقرها الدوحة، تركز على الاستثمار في جولات التأسيس والأولى للشركات التكنولوجية سريعة النمو في قطر والشرق الأوسط.",
    "type": "investor",
    "sector": "Active Investors & VCs",
    "stage": "Growth",
    "foundedYear": 2023,
    "teamSize": "12 Partners & Associates",
    "headquarters": "Qatar Financial Centre Tower 1, West Bay",
    "headquartersAr": "برج مركز قطر للمال 1، الخليج الغربي",
    "website": "https://rasmalventures.com",
    "logo": "RV",
    "logoBg": "#8A1538",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "partners@rasmalventures.com",
    "aumUsd": "$100,000,000 USD",
    "checkSizeRange": "$500K – $3M USD",
    "institutionalBacking": [
      "Private Regional Family Offices",
      "High Net Worth Syndicates"
    ],
    "keyPeople": [
      {
        "name": "Alexander Wiedmer",
        "nameAr": "ألكسندر فيدمير",
        "role": "Founding Partner",
        "roleAr": "شريك مؤسس"
      },
      {
        "name": "Angus Montagu",
        "nameAr": "أنغوس مونتاغو",
        "role": "Founding Partner",
        "roleAr": "شريك مؤسس"
      }
    ],
    "metrics": {
      "Portfolio Companies": "11 Startups",
      "Fund I Target": "$100M USD",
      "Capital Deployed to Date": "$28.5M USD"
    },
    "isFeatured": true,
    "contactEmail": "dealflow@rasmalventures.com"
  },
  {
    "id": "doha-tech-angels",
    "slug": "doha-tech-angels",
    "name": "Doha Tech Angels (DTA)",
    "nameAr": "ملائكة التكنولوجيا بالدوحة",
    "tagline": "Premier private angel investor syndicate investing in early-stage technology innovations",
    "taglineAr": "شبكة المستثمرين الملائكيين المستقلة لدعم وتطوير الشركات الناشئة المبكرة",
    "description": "Doha Tech Angels brings together seasoned Qatari executives, serial entrepreneurs, and private family office principals to syndicate early-stage angel investments, providing seed capital and regional market access.",
    "descriptionAr": "شبكة استثمار ملائكي تضم نخبة من المستثمرين ورواد الأعمال والمدراء التنفيذيين في قطر لتمويل ودعم الشركات التقنية الناشئة.",
    "type": "investor",
    "sector": "Active Investors & VCs",
    "stage": "Pre-Seed",
    "foundedYear": 2018,
    "teamSize": "35 Angel Members",
    "headquarters": "West Bay, Doha",
    "headquartersAr": "الخليج الغربي، الدوحة",
    "website": "https://dohatechangels.com",
    "logo": "DA",
    "logoBg": "#4338CA",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "pitch@dohatechangels.com",
    "aumUsd": "$25,000,000 USD Syndicated",
    "checkSizeRange": "$100K – $500K USD",
    "institutionalBacking": [
      "Independent Private Angel Network"
    ],
    "keyPeople": [
      {
        "name": "Dr. Sudhir Nair",
        "nameAr": "د. سودهير ناير",
        "role": "Syndicate Lead & Angel Investor",
        "roleAr": "قائد الشبكة ومستثمر ملائكي"
      }
    ],
    "metrics": {
      "Syndicated Deals": "24 Investments",
      "Follow-on Funding Catalyzed": "$45M+ USD",
      "Average Syndicate Check": "$250,000 USD"
    },
    "isFeatured": true,
    "contactEmail": "pitch@dohatechangels.com"
  },
  {
    "id": "al-mana-capital",
    "slug": "al-mana-capital",
    "name": "Al-Mana Private Capital",
    "nameAr": "المانع للاستثمار الخاص",
    "tagline": "Private multi-family office venture allocation and growth equity division",
    "taglineAr": "مكتب استثماري عائلي خاص لإدارة استثمارات النمو ورأس المال الجريء",
    "description": "The venture and direct investment vehicle of one of Qatar’s prominent commercial trading groups, active in retail tech, consumer platforms, supply chain infrastructure, and digital logistics.",
    "descriptionAr": "الذراع الاستثماري لإحدى كبرى المجموعات التجارية العائلية في قطر، يركز على تكنولوجيا التجزئة والخدمات اللوجستية.",
    "type": "investor",
    "sector": "Active Investors & VCs",
    "stage": "Series A",
    "foundedYear": 2015,
    "teamSize": "15 Investment Professionals",
    "headquarters": "Al Mana Tower, Airport Road, Doha",
    "headquartersAr": "برج المانع، طريق المطار، الدوحة",
    "website": "https://almanacapital.qa",
    "logo": "AM",
    "logoBg": "#047857",
    "verified": true,
    "claimed": true,
    "claimedByEmail": "investments@almanacapital.qa",
    "aumUsd": "$220,000,000 USD",
    "checkSizeRange": "$1M – $5M USD",
    "institutionalBacking": [
      "Private Family Group Balance Sheet"
    ],
    "keyPeople": [
      {
        "name": "Tariq Al-Mana",
        "nameAr": "طارق المانع",
        "role": "Managing Director - Direct Investments",
        "roleAr": "العضو المنتدب - الاستثمارات المباشرة"
      }
    ],
    "metrics": {
      "Active Direct Investments": "16 Companies",
      "Average Hold Horizon": "5-7 Years",
      "Venture Allocation Share": "22% of Portfolio"
    },
    "isFeatured": false,
    "contactEmail": "investments@almanacapital.qa"
  },
  {
    "id": "qfth-hub",
    "slug": "qfth-hub",
    "name": "Qatar FinTech Hub (QFTH)",
    "nameAr": "مركز قطر للتكنولوجيا المالية",
    "tagline": "Specialized ecosystem incubator and global accelerator for FinTech and InsurTech",
    "taglineAr": "حاضنة ومسرّعة متخصصة لتطوير شركات التكنولوجيا المالية والتأمين الرقمي",
    "description": "Ecosystem platform that runs specialized incubation and acceleration cohorts connecting global and regional FinTech entrepreneurs with financial regulators, commercial banks, and venture mentors.",
    "descriptionAr": "مركز تكنولوجي ينظم دورات تسريع سنوية لتمكين رواد أعمال التكنولوجيا المالية من بناء حلول الدفع والامتثال.",
    "type": "incubator",
    "sector": "FinTech",
    "stage": "Pre-Seed",
    "foundedYear": 2019,
    "teamSize": "20 Mentors & Program Leads",
    "headquarters": "Tornado Tower, West Bay, Doha",
    "headquartersAr": "برج تورنادو، الخليج الغربي، الدوحة",
    "website": "https://fintech.qa",
    "logo": "QF",
    "logoBg": "#0284C7",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "institutionalBacking": [
      "Financial Ecosystem Stakeholders",
      "Global Industry Mentors"
    ],
    "keyPeople": [
      {
        "name": "Heba Al-Tamimi",
        "nameAr": "هبة التميمي",
        "role": "Head of Accelerator Programs",
        "roleAr": "رئيسة برامج التسريع"
      }
    ],
    "metrics": {
      "Graduated Startups": "65+ Companies",
      "Cohorts Completed": "6 Cycles",
      "Alumni Capital Raised": "$38M+ USD"
    },
    "isFeatured": true,
    "contactEmail": "apply@fintech.qa"
  },
  {
    "id": "tech-park-incubator",
    "slug": "tech-park-incubator",
    "name": "Tech Innovation Incubator",
    "nameAr": "حاضنة الابتكار التقني",
    "tagline": "DeepTech product incubation, prototype grants, and patent acceleration hub",
    "taglineAr": "حاضنة متقدمة للنماذج الأولية وبراءات الاختراع والتقنيات العميقة",
    "description": "Offering laboratory facilities, hardware rapid-prototyping suites, co-working studios, and seed coaching to tech founders in Education City.",
    "descriptionAr": "توفر مساحات عمل ومختبرات تصنيع نماذج أولية واستشارات تأسيس للشركات التكنولوجية.",
    "type": "incubator",
    "sector": "DeepTech & AI",
    "stage": "Pre-Seed",
    "foundedYear": 2017,
    "teamSize": "25 Specialists",
    "headquarters": "Tech Park Campus, Education City",
    "headquartersAr": "مجمع الواحة التكنولوجية، المدينة التعليمية",
    "website": "https://innovationincubator.qa",
    "logo": "TI",
    "logoBg": "#7C3AED",
    "verified": true,
    "claimed": false,
    "sourcingNote": "Unverified — sourced from public data",
    "institutionalBacking": [
      "Academic & Research Innovation Network"
    ],
    "keyPeople": [
      {
        "name": "Dr. Yousef Al-Saleh",
        "nameAr": "د. يوسف الصالح",
        "role": "Executive Director",
        "roleAr": "المدير التنفيذي"
      }
    ],
    "metrics": {
      "Active Incubatees": "34 Teams",
      "Patent Applications Filed": "42 Patents",
      "Prototype Success Rate": "78%"
    },
    "isFeatured": false,
    "contactEmail": "incubation@innovationincubator.qa"
  }
];

export const SEED_NEWS_ARTICLES: NewsArticle[] = [
  {
    "id": "seo-article-1",
    "slug": "every-funded-startup-in-qatar-tracked-in-one-place",
    "titleEn": "Every Funded Startup in Qatar, Tracked in One Place",
    "titleAr": "كل شركة ناشئة ممولة في قطر، موثقة في مكان واحد",
    "summaryEn": "An exhaustive independent briefing tracking all verified venture-backed scaleups, institutional seed deals, and expansion rounds across Qatar’s technology ecosystem.",
    "summaryAr": "تقرير استخباراتي شامل يرصد كافة الشركات التكنولوجية الناشئة الممولة وجولات الاستثمار التأسيسية والصاعدة الموثقة في قطر.",
    "contentEn": "### The State of Venture-Backed Technology in Doha\n\nNavigating early-stage venture activity in Qatar has historically suffered from fragmented disclosures, conflicting media figures, and the mixing of equity rounds with government grants. To establish true market transparency, the **Ventures.qa Intelligence Desk** has audited and compiled every verified equity-backed technology scaleup operating in Qatar.\n\nFrom quick-commerce super-apps to clinical AI diagnostic platforms, Qatari ventures have attracted over **$140M+ USD** in verified private institutional equity and co-investment capital to date.\n\n---\n\n### Key Venture Champions & Capital Raised\n\n#### 1. Logistics & Quick-Commerce\n* **Snoonu ($17M USD Verified Total Equity):** Founded by Hamad Al-Hajri, Snoonu closed a $5M Series A in 2021 followed by a $12M Series B in 2022 (verified via Wamda and Bloomberg disclosures). The company has scaled to over 500,000 active users, a 2,200+ driver fleet, and cross-border expansion into Oman.\n* **Airlift Systems ($2.4M USD Seed):** Autonomous ground delivery robotics and smart parcel locker hardware operating across university campuses and smart districts.\n* **AtPick & Torod ($2.5M USD Combined):** Next-generation click-and-collect drive-thru ordering and B2B multi-carrier last-mile dispatch APIs.\n\n#### 2. FinTech, Payments & Neo-Banking\n* **SkipCash ($7M USD Total):** Contactless digital point-of-sale and payment link gateway powering over 1,800 merchants and 1.5M+ processed transactions.\n* **Cwallet ($6M USD Total):** Licensed digital payroll and financial inclusion platform providing unbanked workforces with digital wage access and cross-border remittances across 12 corridors.\n* **Karty ($3.2M USD Seed):** Smart expense management e-wallet operating under the Qatar Central Bank regulatory sandbox with smart Visa debit card capabilities.\n* **Spendwisor, Fatora & Debito ($3.5M USD Combined):** Innovating across m-POS retail cashback loyalty, cloud billing software, and enterprise automated debt resolution.\n\n#### 3. DeepTech, HealthTech & Clinical Diagnostics\n* **Avey AI Health ($8.5M USD Total):** Self-developed clinical reasoning machine learning engine achieving 93.4% clinical diagnostic accuracy across 3.4M+ patient assessments.\n* **Droobi Health ($5M USD Total):** Bilingual digital therapeutics platform demonstrating clinically verified HbA1c reductions across 15,000+ monitored diabetic patients.\n* **Bonocle ($800K USD):** Award-winning handheld digital Braille controller transforming accessibility for visually impaired learners globally.\n\n---\n\n### Sector Allocation Breakdown\n\n| Sector | Venture Capital Share | Notable Entities |\n|---|---|---|\n| **FinTech & Payments** | 38% | SkipCash, Cwallet, Karty, Spendwisor, Fatora |\n| **Logistics & Commerce** | 29% | Snoonu, Airlift Systems, Torod, AtPick |\n| **HealthTech & Bio** | 18% | Avey AI, Droobi Health, Rimads, Al-Delaimi |\n| **Enterprise SaaS & AI** | 15% | Applab, Paperfly, Shamal Tech, Synergy AI |\n\n---\n\n### Verification Protocol\nEvery entity in the Ventures.qa directory is audited against four distinct criteria:\n1. Active commercial registration under MOCI, QFC, QSTP, or QFZ.\n2. Verified equity transaction records from primary sources or verified financial press.\n3. Separation of institutional equity rounds from non-dilutive prizes or research grants.\n4. Transparent distinction between direct corporate claims and public scraped data.",
    "contentAr": "### مشهد الشركات الناشئة الممولة في دولة قطر\nيرصد هذا التقرير الشامل كافة الشركات التكنولوجية الناشئة التي حصلت على جولات تمويل رأس مال جريء حقيقية وموثقة في دولة قطر، متجاوزاً التضارب الإعلامي لتقديم أرقام معيارية دقيقة.\n\nبلغ إجمالي رأس المال الجريء الموثق المستثمر في الشركات الناشئة القطرية أكثر من 140 مليون دولار أمريكي موزعة على قطاعات التكنولوجيا المالية واللوجستيات والصحة والبرمجيات المؤسسية.\n\n#### أبرز الشركات التكنولوجية الممولة:\n1. **سنونو (17 مليون دولار):** إجمالي الجولات المؤسسية الموثقة عبر الجولتين أ (5 مليون) وب (12 مليون).\n2. **سكيب كاش (7 ملايين دولار):** بوابة المدفوعات ونقاط البيع الرقمية الرائدة في قطر.\n3. **سي والت (6 ملايين دولار):** حلول دفع الأجور والشمول المالي المرخصة.\n4. **آفي للذكاء الاصطناعي الصحي (8.5 مليون دولار):** محرك التشخيص الطبي الدقيق.\n5. **دروبي هيلث (5 ملايين دولار):** منصة العلاجات الرقمية المعتمدة سريرياً لإدارة داء السكري.",
    "category": "Funding News",
    "publishedDate": "2026-09-25",
    "readTimeMinutes": 6,
    "author": "Ventures.qa Intelligence Research Desk",
    "sourceCitation": "Ventures.qa Directory Audit & Verified Public Filings 2026",
    "sourceUrl": "https://ventures.qa/directory",
    "isSpotlight": false,
    "likesCount": 88,
    "status": "published"
  },
  {
    "id": "seo-article-2",
    "slug": "what-qatars-funding-numbers-actually-mean-for-founders",
    "titleEn": "What Qatar’s Funding Numbers Actually Mean for Founders",
    "titleAr": "ماذا تعني أرقام التمويل في قطر فعلياً لرواد الأعمال والمؤسسين",
    "summaryEn": "Translating headline venture capital figures into practical founder reality: actual median seed ticket sizes, dilution expectations, burn multiples, and SAFE note terms in Doha.",
    "summaryAr": "قراءة واقعية في الأرقام الإجمالية لرأس المال الجريء في قطر: متوسط مبالغ الجولات، ونسب التخفيف الحقيقية، وشروط اتفاقيات SAFE للمؤسسين.",
    "contentEn": "### Beyond the Headlines: The Ground Truth on Qatari Venture Capital\n\nHeadline announcements often proclaim record sovereign investment funds, multi-million dollar co-matching facilities, and ambitious ecosystem targets. For an early-stage founder pitching investors in West Bay or Education City, however, the day-to-day reality of raising capital follows a much more rigorous, disciplined playbook.\n\nThis guide decodes what Qatar’s macro funding numbers actually mean for a founder building a product today.\n\n---\n\n### 1. Headline Commitments vs. Wired Equity Checks\nEcosystem announcements frequently aggregate:\n* **Sovereign Matching Guarantees:** Matching facilities from development institutions (e.g. QDB, QSTP) that require a private angel syndicate or VC to lead the round before matching funds are disbursed.\n* **Incubation Infrastructure & Cloud Credits:** Non-cash operational support, subsidized office flex-desks, and legal advisory vouchers.\n* **Actual Private Lead Equity:** The cash wired into your corporate bank account by private investors.\n\n**Founder Implication:** Do not expect sovereign funds to write first-dollar lead checks into early ideas without verified private syndication. Secure your private lead investor first, then unlock matching facilities.\n\n---\n\n### 2. Empirical Round Sizes & Valuation Ranges in Doha\n\n| Stage | What Headlines Report | Real Cash Wired (Median) | Real Pre-Money Valuation | Typical Dilution |\n|---|---|---|---|---|\n| **Pre-Seed** | \"$1M – $2M rounds\" | $100,000 – $350,000 | $1,500,000 – $3,000,000 | 10% – 15% |\n| **Seed** | \"$3M – $5M rounds\" | $500,000 – $1,500,000 | $4,000,000 – $7,000,000 | 15% – 20% |\n| **Series A** | \"$10M+ rounds\" | $2,500,000 – $6,000,000 | $14,000,000 – $25,000,000 | 15% – 22% |\n\n---\n\n### 3. What Qatari Investors Require Before Wiring Capital\n* **B2B Pilots with Enterprise Brands:** Qatari angels and family offices demand customer validation within Doha—such as letters of intent (LOIs) with major retail chains, banks, or telecom providers.\n* **Clean Jurisdiction Structuring:** Avoid informal handshake partnerships. Institutional syndicates prefer companies incorporated under the **Qatar Financial Centre (QFC)** or **QSTP Free Zone**, which natively support English Common Law, share classes, and post-money SAFE notes.\n* **The GCC Expansion Thesis:** Qatar’s domestic population is an affluent, concentrated market of ~3 million residents. A viable venture thesis requires a clear roadmap for expanding into Saudi Arabia, the UAE, or Oman within 18 months of closing Seed capital.",
    "contentAr": "### ما وراء العناوين: الواقع الفعلي لجمع التمويل في قطر\nكثيراً ما تعلن وسائل الإعلام عن مخصصات تمويلية حكومية ضخمة، إلا أن المؤسس يحتاج لفهم الآلية العملية التي يدار بها الاستثمار الخاص.\n\n#### حقائق أساسية للمؤسسين:\n1. **التمويل الحكومي المشترك لا يبدأ بمفرده:** تشترط المبادرات الحكومية مثل بنك قطر للتنمية وواحة العلوم وجود مستثمر رئيسي من القطاع الخاص قبل مطابقة التمويل.\n2. **متوسطات التمويل الحقيقية:**\n   * مرحلة ما قبل البذرة: 100 إلى 350 ألف دولار بتخفيف 10-15%.\n   * المرحلة التأسيسية: 500 ألف إلى 1.5 مليون دولار بتخفيف 15-20%.\n3. **أهمية البيئة القانونية:** يفضل المستثمرون المؤسسيون الشركات المسجلة في مركز قطر للمال (QFC) لسهولة تطبيق اتفاقيات SAFE وحماية فئات الأسهم.",
    "category": "Market Trends",
    "publishedDate": "2026-09-24",
    "readTimeMinutes": 5,
    "author": "Ventures.qa Founder Advisory Desk",
    "sourceCitation": "QPCI Capital Index Benchmark Reports 2026",
    "sourceUrl": "https://ventures.qa/resources",
    "isSpotlight": false,
    "likesCount": 74,
    "status": "published"
  },
  {
    "id": "seo-article-3",
    "slug": "raising-money-in-qatar-whos-actually-writing-checks",
    "titleEn": "Raising Money in Qatar: Who’s Actually Writing Checks",
    "titleAr": "جمع التمويل في قطر: من يكتب الشيكات الاستثمارية فعلياً في السوق؟",
    "summaryEn": "An unvarnished guide to active capital allocators in Doha: institutional venture managers, private angel syndicates, family offices, and how to approach each investor class.",
    "summaryAr": "دليل صريح للمؤسسين حول الجهات الاستثمارية التي تضخ رؤوس أموال حقيقية في قطر: صناديق الاستثمار الجريء، والشبكات الملائكية، والمكاتب العائلية.",
    "contentEn": "### Mapping the Active Check-Writers in Doha\n\nFundraising is an exercise in targeting the right capital partner for your specific stage, sector, and risk profile. Pitching a pre-revenue B2B SaaS startup to a growth-stage family office will result in months of polite delays, while approaching early-stage angel syndicates without a clean SAFE structure will stall closing.\n\nThis dispatch profiles the active investors writing checks in Qatar’s venture market today.\n\n---\n\n### 1. Institutional Venture Capital Fund Managers\n* **Rasmal Ventures:** \n  * **Profile:** Regulated by the Qatar Financial Centre (QFC), Rasmal is an independent venture firm led by seasoned partners including Alexander Wiedmer and Angus Montagu.\n  * **Target Fund:** $100M USD allocation targeting tech scaleups across Qatar and the GCC.\n  * **Check Size:** $500,000 to $3,000,000 USD.\n  * **Sectors:** Enterprise SaaS, FinTech, B2B marketplaces, supply chain tech.\n  * **What They Look For:** Clear unit economics, strong founder technical leadership, and scalable cross-border expansion potential.\n\n---\n\n### 2. Angel Investor Syndicates\n* **Doha Tech Angels (DTA):**\n  * **Profile:** Premier private syndicate comprised of Qatari tech executives, family office directors, and serial operators.\n  * **Check Size:** $100,000 to $500,000 USD aggregated syndicate checks ($25K–$50K individual member commitments).\n  * **Stage:** Pre-Seed and Seed.\n  * **What They Look For:** Working MVP, early local pilot traction, and responsive founding teams open to active board advisory.\n\n---\n\n### 3. Single & Multi-Family Office Venture Divisions\n* **Al-Mana Private Capital, Jaidah, Mannai, and Darwish Family Divisions:**\n  * **Profile:** Private commercial family conglomerates re-allocating 15%–20% of liquid assets into direct tech equity.\n  * **Check Size:** $1,000,000 to $5,000,000 USD (Series A and growth rounds).\n  * **Sectors:** Retail commerce, automated warehousing, dark store fulfillment, health tech, and enterprise integrations with existing family holdings.\n  * **What They Look For:** Strategic commercial synergies with their existing distribution networks and audited management financials.\n\n---\n\n### 4. Sovereign Co-Investment & Matching Facilities\n* **Qatar Development Bank (QDB):** Co-investment programs and accelerator grants that match verified private venture capital dollar-for-dollar.\n* **QSTP Tech Venture Fund:** Seed to Series A venture fund deploying capital into deep-tech, AI, and healthcare IP ventures incubated within Qatar Science & Technology Park.\n\n---\n\n### How to Prepare Before Pitching\n1. **Standardize on Post-Money SAFEs:** Using standardized agreements under QFC English Common Law prevents legal review stalemates.\n2. **Prepare a Verified Cap Table:** Ensure founder reverse vesting (4-year linear with 1-year cliff) is codified.\n3. **Know Your Key Numbers:** Monthly recurring revenue (MRR), burn rate, customer acquisition cost (CAC), and runway in months.",
    "contentAr": "### من يكتب الشيكات الاستثمارية في الدوحة؟\nيتطلب نجاح جمع التمويل مخاطبة المستثمر المناسب لمرحلة مشروعك ونوع نشاطك بدقة.\n\n#### تصنيف المستثمرين النشطين:\n1. **صناديق الاستثمار الجريء المؤسسية:**\n   * **راسمال فنتشرز (Rasmal Ventures):** صندوق مرخص في مركز قطر للمال برأس مال مستهدف 100 مليون دولار يكتب شيكات بين 500 ألف و3 ملايين دولار في البرمجيات والتقنية المالية.\n2. **الشبكات الملائكية:**\n   * **ملائكة التكنولوجيا بالدوحة (DTA):** شبكة تضم نخبة من التنفيذيين والمستثمرين وتوفر شيكات من 100 إلى 500 ألف دولار.\n3. **المكاتب العائلية الخاصة:**\n   * استثمارات المجموعات التجارية الكبرى (مثل المانع والجيدة ومناعي) التي تركز على الجولة (أ) بمبالغ من 1 إلى 5 ملايين دولار.\n4. **برامج التمويل المشترك:**\n   * بنك قطر للتنمية وصندوق واحة قطر للعلوم والتكنولوجيا لمطابقة استثمارات القطاع الخاص.",
    "category": "Funding News",
    "publishedDate": "2026-09-22",
    "readTimeMinutes": 7,
    "author": "Ventures.qa Venture Deal Flow Team",
    "sourceCitation": "Institutional Investor Survey & QPCI Capital Benchmarks",
    "sourceUrl": "https://ventures.qa/marketplace",
    "isSpotlight": false,
    "likesCount": 92,
    "status": "published"
  },
  {
    "id": "seo-article-4",
    "slug": "qatars-startup-scene-this-week-issue-1",
    "titleEn": "Qatar’s Startup Scene This Week (Issue #1): Sovereign Mandates & Scaleups",
    "titleAr": "مشهد الشركات الناشئة في قطر هذا الأسبوع (العدد الأول): صفقات وتوسع الشركات",
    "summaryEn": "The inaugural weekly intelligence digest: Snoonu’s cross-border logistics push into Oman, SkipCash passing 1.5M transactions, and the latest Q2 venture capital metrics.",
    "summaryAr": "العدد الأول من الموجز الاستخباراتي الأسبوعي: توسع سنونو الإقليمي، وإنجاز 1.5 مليون معاملة لسكيب كاش، وتحديثات مؤشر QPCI.",
    "contentEn": "### Welcome to Issue #1 of Qatar’s Startup Scene This Week\n\nEvery Monday morning, the **Ventures.qa Editorial & Intelligence Desk** compiles the most significant verified venture deals, scaleup milestones, regulatory shifts, and capital allocations across Doha.\n\nHere is what moved the needle across the ecosystem this week:\n\n---\n\n### 1. Scaleup Spotlight: Snoonu Accelerates Regional Logistics Footprint\nLusail-headquartered super-app **Snoonu** has officially expanded its dark grocery network (Snoomart) and pharmacy fulfillment operations into the Muscat metropolitan area in Oman. \n\nHaving raised a verified **$17,000,000 USD** across its Series A and Series B rounds from Qatari and regional venture syndicates, the expansion marks a critical validation of Qatar’s capacity to export scalable consumer logistics platforms across the wider GCC. Snoonu’s annualized gross merchandise value (GMV) continues to track above **$100M USD**.\n\n---\n\n### 2. FinTech Milestone: SkipCash Surpasses 1.5M Processed Transactions\nMobile payment orchestrator **SkipCash** announced a major milestone this week, crossing **1,500,000 processed contactless transactions** across its network of 1,800+ integrated merchants. The company’s annualized payment processing volume is now pacing at over **$180M USD**, driven by surge adoption in enterprise hospitality, retail checkouts, and government service integrations.\n\n---\n\n### 3. Regulatory Evolution: Central Bank Sandbox Expands Open Banking Testing\nThe Qatar Central Bank (QCB) has issued expanded operational guidelines for participants in the FinTech Regulatory Sandbox. The revisions streamline third-party payment initiation (PISP) and account information services (AISP), enabling licensed Qatari neo-banking scaleups (such as Cwallet and Karty) to initiate direct API integrations with national retail commercial banks.\n\n---\n\n### 4. QPCI Capital Index: Q2 Private Dry Powder Reaches $45M+\nThe proprietary **Qatar Private Capital Index (QPCI)** registered a solid benchmark reading of **118.4** for Q2 2026, supported by:\n* Disclosed quarterly venture deal volume of **$42.5M USD (154.7M QAR)**.\n* Verified active dry powder commitments exceeding **$45M+ USD** across institutional managers and angel syndicates.\n* **$35M+ USD** in active early-stage and Series A capital-raising mandates tracked on the Ventures.qa Deal-Flow platform.\n\n---\n\n### Weekly Quote from the Ecosystem\n> *\"Qatar is transitioning from an incubation-driven startup ecosystem into a commercial scaling testbed. The winners in 2026 are founders who prove unit economics locally and export regionally within 18 months.\"*\n> — *Alexander Wiedmer, Founding Partner at Rasmal Ventures*",
    "contentAr": "### العدد الأول من الموجز الأسبوعي لمنظومة الشركات الناشئة في قطر\nيقدم مكتب التحرير واستخبارات السوق في Ventures.qa ملخصاً أسبوعياً موثقاً لأهم الصفقات والقرارات التنظيمية وإنجازات الشركات.\n\n#### أبرز أحداث الأسبوع:\n1. **توسع سنونو في سلطنة عمان:** تسريع نشر متاجر سنومارت والخدمات اللوجستية في مسقط بعد توثيق 17 مليون دولار إجمالي تمويلاتها المؤسسية.\n2. **سكيب كاش تتجاوز 1.5 مليون معاملة:** معالجة مدفوعات سنوية بمعدل يتجاوز 180 مليون دولار لدى أكثر من 1800 متجر.\n3. **توسيع البيئة الرقابية التجريبية للخدمات المصرفية المفتوحة:** إرشادات جديدة من مصرف قطر المركزي تتيح الربط المباشر لواجهات برمجة التطبيقات مع البنوك التجارية.\n4. **مؤشر QPCI يسجل 118.4 نقطة:** سيولة استثمارية نشطة تتجاوز 45 مليون دولار وصفقات نشطة بقيمة 35 مليون دولار.",
    "category": "Funding News",
    "publishedDate": "2026-09-27",
    "readTimeMinutes": 4,
    "author": "Ventures.qa Intelligence Digest",
    "sourceCitation": "Ventures.qa Weekly Digest & Market Index 2026",
    "sourceUrl": "https://ventures.qa/news",
    "isSpotlight": true,
    "likesCount": 65,
    "status": "published"
  }
];

export const SEED_MARKET_INTELLIGENCE: MarketIntelligenceItem[] = [
  {
    id: 'mi-1',
    title: 'Snoonu Closes $12M Series B Syndicate for Regional Micro-Fulfillment Expansion',
    titleAr: 'سنونو تغلق جولة تمويلية (Series B) بقيمة 12 مليون دولار للتوسع الإقليمي',
    summary: 'Lead venture syndicates and private family offices finalize strategic growth round powering automated fulfillment hubs across Lusail and Al Wakra.',
    summaryAr: 'صناديق استثمارية ومكاتب عائلية خاصة تختتم جولة نمو استراتيجية لدعم مراكز التوزيع اللوجستي الذكية في لوسيل والوكرة.',
    category: 'funding',
    date: '2026-05-18',
    entityId: 'snoonu',
    dealSizeQar: '43,700,000 QAR',
    dealSizeUsd: '$12,000,000 USD',
    participants: ['Regional Venture Syndicates', 'Private Family Offices', 'Doha Angel Syndicate'],
    isPremium: false,
    fullDossier: {
      thesis: 'Scalable last-mile logistics infrastructure in Qatar demonstrates proven path to unit economics profitability with high merchant retention.',
      thesisAr: 'البنية التحتية للتوصيل السريع والميل الأخير في قطر تثبت كفاءتها الاقتصادية وربحيتها لكل وحدة مع معدلات احتفاظ استثنائية بالتجار.',
      regulatoryImpact: 'Accelerates private logistics sector modernization under updated commercial transport regulations.',
      regulatoryImpactAr: 'يسرع تحديث قطاع الخدمات اللوجستية الخاص في ظل لوائح النقل التجاري المحدثة.',
      valuationEstimate: '$85,000,000 USD post-money',
      keySignificance: 'Represents the largest domestic venture round in Qatar for the first half of 2026.',
      keySignificanceAr: 'تمثل أكبر جولة تمويل رأس مال جريء محلي في دولة قطر خلال النصف الأول من عام 2026.'
    }
  },
  {
    id: 'mi-2',
    title: 'SkipCash Secures $2.8M Strategic Extension Backed by FinTech Angels',
    titleAr: 'سكيب كاش تحصد 2.8 مليون دولار في جولة استراتيجية من مستثمرين ملائكيين',
    summary: 'Omnichannel payment orchestration gateway scales POS integration for over 4,000 retail endpoints across Doha and regional merchants.',
    summaryAr: 'بوابة الدفع الرقمي الشاملة توسع ربط نقاط البيع لدى أكثر من 4000 نقطة تجارية في الدوحة والمنطقة.',
    category: 'funding',
    date: '2026-04-09',
    entityId: 'skipcash',
    dealSizeQar: '10,200,000 QAR',
    dealSizeUsd: '$2,800,000 USD',
    participants: ['Doha Tech Angels', 'Gulf FinTech Partners', 'Strategic Merchant Backers'],
    isPremium: false,
    fullDossier: {
      thesis: 'Merchant digital payment volume acceleration driven by widespread cashless adoption and open API integrations.',
      thesisAr: 'تسارع حجم المدفوعات الرقمية للتجار مدفوعاً بتبني المعاملات غير النقدية وتكامل واجهات البرمجة المفتوحة.',
      regulatoryImpact: 'Compliant with Central Bank payment service provider (PSP) regulatory framework.',
      regulatoryImpactAr: 'متوافق تماماً مع الإطار التنظيمي لمزودي خدمات الدفع الصادر عن المصرف المركزي.',
      valuationEstimate: '$18,000,000 USD post-money',
      keySignificance: 'Positions SkipCash for cross-border merchant settlement across the GCC corridor.',
      keySignificanceAr: 'يؤهل سكيب كاش للتسويات التجارية العابرة للحدود عبر ممرات دول مجلس التعاون الخليجي.'
    }
  },
  {
    id: 'mi-3',
    title: 'Droobi Health Expands Digital Therapeutics Rollout with $3.5M Growth Tranche',
    titleAr: 'دروبي هيلث تتوسع في العلاجات الرقمية عبر شريحة نمو بقيمة 3.5 مليون دولار',
    summary: 'Arabic-first chronic condition management platform scales clinical AI integration and employer wellness provider contracts.',
    summaryAr: 'منصة إدارة الأمراض المزمنة باللغة العربية توسع نطاق الذكاء الاصطناعي الطبي وعقود التأمين الصحي للشركات.',
    category: 'funding',
    date: '2026-03-22',
    entityId: 'droobi',
    dealSizeQar: '12,740,000 QAR',
    dealSizeUsd: '$3,500,000 USD',
    participants: ['Healthcare Venture Partners', 'Regional Impact Investors'],
    isPremium: true,
    fullDossier: {
      thesis: 'Clinically validated Arabic digital therapeutics platform addresses massive regional unmet need in pre-diabetes and metabolic health.',
      thesisAr: 'العلاجات الرقمية المعتمدة سريرياً باللغة العربية تلبي حاجة إقليمية هائلة لإدارة السكري وصحة التمثيل الغذائي.',
      regulatoryImpact: 'Adheres to digital health privacy and clinical telemedicine standards.',
      regulatoryImpactAr: 'يلتزم بمعايير خصوصية البيانات الصحية الرقمية وتطبيب المرضى عن بعد.',
      valuationEstimate: '$24,000,000 USD',
      keySignificance: 'First Qatar-born digital therapeutics venture demonstrating hospital network adoption.',
      keySignificanceAr: 'أول شركة ناشئة للعلاجات الرقمية تأسست في قطر تثبت نجاحها في الاندماج مع الشبكات الطبية.'
    }
  },
  {
    id: 'mi-4',
    title: 'Avey AI Clinical Diagnostic Diagnostic System Achieves Peer-Reviewed Accuracy Milestones',
    titleAr: 'نظام التشخيص الطبي من إيفي يحقق إنجازات دقة معتمدة من لجان الأقران',
    summary: 'Self-developed proprietary medical algorithmic intelligence completes clinical trial validations across multi-specialty triage workflows.',
    summaryAr: 'الذكاء الاصطناعي الطبي المطور ذاتياً يكمل تجارب الفحص السريري عبر مسارات تشخيصية متعددة التخصصات.',
    category: 'policy',
    date: '2026-02-14',
    entityId: 'avey',
    dealSizeQar: '18,200,000 QAR',
    dealSizeUsd: '$5,000,000 USD',
    participants: ['Global AI Health Consortium', 'Doha BioTech Angels'],
    isPremium: false,
    fullDossier: {
      thesis: 'Next-generation proprietary NLP diagnostic engine reducing emergency triage congestion.',
      thesisAr: 'محرك معالجة اللغة الطبيعية للتشخيص الطبي يسهم في خفض الازدحام في غرف الطوارئ الطبية.',
      regulatoryImpact: 'Aligned with international algorithmic clinical safety protocols.',
      regulatoryImpactAr: 'متوافق مع البروتوكولات الدولية لسلامة الخوارزميات الطبية السريرية.',
      keySignificance: 'Validation of Qatar as an emerging intellectual property hub for DeepTech medical AI.',
      keySignificanceAr: 'تأكيد على مكانة قطر كمركز صاعد لحقوق الملكية الفكرية والذكاء الاصطناعي الطبي العميق.'
    }
  }
];

// --- CAPITAL INDEX (QPCI) HISTORICAL DATA ---
export const SEED_CAPITAL_INDEX: CapitalIndexQuarter[] = [
  {
    quarter: 'Q2 2026',
    totalDisclosedFundingUsdMillions: 42.5,
    totalDisclosedFundingQarMillions: 154.7,
    dealCount: 14,
    avgDealSizeUsdMillions: 3.03,
    sovereignCoInvestmentRatio: 48,
    topSector: 'Logistics & Supply Chain',
    growthYoY: 18.4,
    sectorBreakdown: [
      { sector: 'Logistics & Supply Chain', percentage: 35, volumeUsdM: 14.88 },
      { sector: 'FinTech', percentage: 28, volumeUsdM: 11.90 },
      { sector: 'HealthTech & Bio', percentage: 16, volumeUsdM: 6.80 },
      { sector: 'Enterprise & SaaS', percentage: 12, volumeUsdM: 5.10 },
      { sector: 'DeepTech & AI', percentage: 9, volumeUsdM: 3.82 }
    ],
    commentaryEn: 'A balanced quarter with private venture funds and family offices providing the majority of syndicated capital. Logistics scaleups and B2B SaaS showed the highest revenue multiple valuations.',
    commentaryAr: 'ربع سنوي متوازن شهد قيادة المكاتب العائلية وصناديق الاستثمار الخاصة لأغلبية جولات التمويل، مع استمرار قطاعي اللوجستيات والبرمجيات في تصدر التقييمات.'
  },
  {
    quarter: 'Q1 2026',
    totalDisclosedFundingUsdMillions: 36.8,
    totalDisclosedFundingQarMillions: 133.9,
    dealCount: 12,
    avgDealSizeUsdMillions: 3.06,
    sovereignCoInvestmentRatio: 52,
    topSector: 'FinTech',
    growthYoY: 22.1,
    sectorBreakdown: [
      { sector: 'FinTech', percentage: 38, volumeUsdM: 13.98 },
      { sector: 'Enterprise & SaaS', percentage: 24, volumeUsdM: 8.83 },
      { sector: 'Logistics & Supply Chain', percentage: 18, volumeUsdM: 6.62 },
      { sector: 'HealthTech & Bio', percentage: 12, volumeUsdM: 4.42 },
      { sector: 'DeepTech & AI', percentage: 8, volumeUsdM: 2.95 }
    ],
    commentaryEn: 'Driven by digital payments and mobile payroll expansion, FinTech absorbed over a third of total venture capital in Q1.',
    commentaryAr: 'سجل قطاع التكنولوجيا المالية نمواً قوياً بفضل توسع منصات المدفوعات وحلول الأجور الرقمية، مستحوذاً على أكثر من ثلث التدفقات الاستثمارية.'
  },
  {
    quarter: 'Q4 2025',
    totalDisclosedFundingUsdMillions: 31.2,
    totalDisclosedFundingQarMillions: 113.6,
    dealCount: 10,
    avgDealSizeUsdMillions: 3.12,
    sovereignCoInvestmentRatio: 55,
    topSector: 'Enterprise & SaaS',
    growthYoY: 15.6,
    sectorBreakdown: [
      { sector: 'Enterprise & SaaS', percentage: 32, volumeUsdM: 9.98 },
      { sector: 'FinTech', percentage: 30, volumeUsdM: 9.36 },
      { sector: 'Energy & CleanTech', percentage: 18, volumeUsdM: 5.62 },
      { sector: 'HealthTech & Bio', percentage: 12, volumeUsdM: 3.74 },
      { sector: 'Logistics & Supply Chain', percentage: 8, volumeUsdM: 2.50 }
    ],
    commentaryEn: 'Institutional family offices increased direct allocations to B2B software, recognizing strong cash-generation metrics among local enterprise providers.',
    commentaryAr: 'شهد الربع الأخير من عام 2025 زيادة تدفقات المكاتب العائلية نحو شركات البرمجيات الموجهة للشركات نظراً لربحيتها التشغيلية المرتفعة.'
  }
];

// --- RAISING OPPORTUNITIES (DEAL MARKETPLACE) ---
export const SEED_RAISING_OPPORTUNITIES: RaisingOpportunity[] = [
  {
    id: 'deal-1',
    companyId: 'skipcash',
    companyName: 'SkipCash',
    companyNameAr: 'سكيب كاش',
    sector: 'FinTech',
    roundStage: 'Series A',
    targetAmountQar: '29,120,000 QAR',
    targetAmountUsd: '$8,000,000 USD',
    raisedSoFarPercent: 65,
    minCheckUsd: '$500,000 USD',
    useOfFunds: [
      { category: 'Regional GCC POS Expansion', categoryAr: 'التوسع في نقاط البيع الإقليمية', percentage: 40 },
      { category: 'Enterprise API & Banking Integrations', categoryAr: 'تطوير واجهات الربط المصرفي', percentage: 30 },
      { category: 'Talent & Compliance Engineering', categoryAr: 'فريق العمل والامتثال المالي', percentage: 20 },
      { category: 'Merchant Acquisition Marketing', categoryAr: 'حملات استقطاب التجار', percentage: 10 }
    ],
    tractionARRUsd: '$3,800,000 ARR',
    momGrowthPercent: 12.4,
    customerCount: '1,800+ Active Merchants',
    pitchDeckAvailable: true,
    dataRoomProtected: true,
    isFeatured: true,
    status: 'active',
    location: 'Doha, Qatar',
    locationAr: 'الدوحة، قطر'
  },
  {
    id: 'deal-2',
    companyId: 'avey-health',
    companyName: 'Avey AI Health',
    companyNameAr: 'آفي للذكاء الاصطناعي الصحي',
    sector: 'HealthTech & Bio',
    roundStage: 'Series A',
    targetAmountQar: '36,400,000 QAR',
    targetAmountUsd: '$10,000,000 USD',
    raisedSoFarPercent: 45,
    minCheckUsd: '$1,000,000 USD',
    useOfFunds: [
      { category: 'FDA/CE Regulatory Approvals', categoryAr: 'الحصول على الاعتمادات التنظيمية الدولية', percentage: 35 },
      { category: 'Clinical AI Model Expansion', categoryAr: 'تطوير وتدريب النماذج السريرية', percentage: 30 },
      { category: 'North American Hospital Pilots', categoryAr: 'تجارب المستشفيات في أمريكا الشمالية', percentage: 25 },
      { category: 'IP & Patent Filing Strategy', categoryAr: 'حماية براءات الاختراع والملكية الفكرية', percentage: 10 }
    ],
    tractionARRUsd: '$1,650,000 ARR',
    momGrowthPercent: 16.8,
    customerCount: '3.4M Global App Users',
    pitchDeckAvailable: true,
    dataRoomProtected: true,
    isFeatured: true,
    status: 'active',
    location: 'Education City, Doha',
    locationAr: 'المدينة التعليمية، الدوحة'
  },
  {
    id: 'deal-3',
    companyId: 'airlift-systems',
    companyName: 'Airlift Systems',
    companyNameAr: 'أنظمة إيرلفت',
    sector: 'DeepTech & AI',
    roundStage: 'Seed',
    targetAmountQar: '10,920,000 QAR',
    targetAmountUsd: '$3,000,000 USD',
    raisedSoFarPercent: 80,
    minCheckUsd: '$250,000 USD',
    useOfFunds: [
      { category: 'Hardware Production Scaling', categoryAr: 'زيادة خطوط تجميع الروبوتات', percentage: 45 },
      { category: 'Sensor Array & Firmware R&D', categoryAr: 'تطوير البرمجيات والحساسات', percentage: 30 },
      { category: 'Commercial Campus Operations', categoryAr: 'تشغيل أساطيل المجمعات التجارية', percentage: 25 }
    ],
    tractionARRUsd: '$480,000 ARR',
    momGrowthPercent: 22.5,
    customerCount: '5 Active Campus Pilots',
    pitchDeckAvailable: true,
    dataRoomProtected: true,
    isFeatured: false,
    status: 'closing',
    location: 'Al Rayyan, Qatar',
    locationAr: 'الريان، قطر'
  }
];

// --- INVESTOR DEMANDS (BUY-SIDE MANDATES) ---
export const SEED_INVESTOR_DEMANDS: InvestorDemand[] = [
  {
    id: 'demand-1',
    investorId: 'rasmal-ventures',
    investorName: 'Rasmal Ventures',
    investorNameAr: 'راسمال فنتشرز',
    type: 'VC Fund',
    targetSectors: ['Enterprise & SaaS', 'FinTech', 'Logistics & Supply Chain'],
    stagePreference: ['Seed', 'Series A'],
    typicalCheckSize: '$1M – $3M USD',
    minCheckUsd: 500000,
    maxCheckUsd: 3000000,
    activeDeployingMandate: true,
    allocatedDryPowderUsd: '$45,000,000 USD',
    thesisSummaryEn: 'Investing in market-leading B2B software and digital payments infrastructure with proven unit economics, strong ARR traction (>$500K), and clear path to GCC expansion.',
    thesisSummaryAr: 'الاستثمار في شركات البرمجيات الموجهة للمؤسسات وحلول المدفوعات ذات الإيرادات المثبتة (أكثر من 500 ألف دولار سنوياً) مع خطة توسع إقليمية واضحة.'
  },
  {
    id: 'demand-2',
    investorId: 'doha-tech-angels',
    investorName: 'Doha Tech Angels',
    investorNameAr: 'ملائكة التكنولوجيا بالدوحة',
    type: 'Angel Syndicate',
    targetSectors: ['FinTech', 'DeepTech & AI', 'HealthTech & Bio'],
    stagePreference: ['Pre-Seed', 'Seed'],
    typicalCheckSize: '$100K – $350K USD',
    minCheckUsd: 50000,
    maxCheckUsd: 500000,
    activeDeployingMandate: true,
    allocatedDryPowderUsd: '$8,500,000 USD',
    thesisSummaryEn: 'Backing exceptional technical founders in Qatar building defensible software, proprietary AI diagnostic tools, and scalable consumer platforms at the earliest stages.',
    thesisSummaryAr: 'دعم المؤسسين التقنيين المتميزين في قطر في مراحل التأسيس الأولى في مجالات الذكاء الاصطناعي والتكنولوجيا المالية والحلول الصحية.'
  },
  {
    id: 'demand-3',
    investorId: 'al-mana-capital',
    investorName: 'Al-Mana Private Capital',
    investorNameAr: 'المانع للاستثمار الخاص',
    type: 'Family Office',
    targetSectors: ['Logistics & Supply Chain', 'PropTech & ConTech', 'AgriFood & FoodTech'],
    stagePreference: ['Series A', 'Series B+', 'Growth'],
    typicalCheckSize: '$2M – $5M USD',
    minCheckUsd: 1000000,
    maxCheckUsd: 7000000,
    activeDeployingMandate: true,
    allocatedDryPowderUsd: '$60,000,000 USD',
    thesisSummaryEn: 'Strategic capital partnerships with mature scaleups that can integrate directly into regional supply chain operations, retail centers, and industrial real estate assets.',
    thesisSummaryAr: 'شراكات استثمارية مع شركات مرحلة النمو القادرة على التكامل مع شبكات التوزيع والتجزئة والخدمات اللوجستية الإقليمية.'
  }
];

// --- ECOSYSTEM EVENTS CALENDAR ---
export const SEED_ECOSYSTEM_EVENTS: EcosystemEvent[] = [
  {
    id: 'event-1',
    titleEn: 'Doha Venture Pitch Day & Angel Demo Showcase',
    titleAr: 'يوم عروض رأس المال الجريء وملتقى المستثمرين الملائكيين بالدوحة',
    organizer: 'Independent Tech Syndicate & Angels',
    type: 'pitch',
    date: '2026-10-14',
    time: '09:00 – 14:00 AST',
    location: 'West Bay Conference Center, Doha',
    locationAr: 'مركز مؤتمرات الخليج الغربي، الدوحة',
    isVirtual: false,
    descriptionEn: 'An invitation-only investor pitch day featuring 10 curated Qatari and GCC early-stage software and FinTech startups presenting to angel networks and family offices.',
    descriptionAr: 'ملتقى استثماري خاص يجمع 10 شركات ناشئة مختارة في قطاعي البرمجيات والتقنية المالية لتقديم عروضها أمام ممثلي الصناديق والمكاتب العائلية.',
    registrationUrl: 'https://ventures.qa/events/doha-pitch-day',
    isFeatured: true
  },
  {
    id: 'event-2',
    titleEn: 'GCC FinTech Compliance & Digital Identity Roundtable',
    titleAr: 'طاولة مستديرة: الامتثال المالي والهوية الرقمية لشركات الفنتك الخليجية',
    organizer: 'QFC FinTech Working Group',
    type: 'workshop',
    date: '2026-10-22',
    time: '14:00 – 17:30 AST',
    location: 'QFC Tower 1 Auditorium, Doha',
    locationAr: 'قاعة مركز قطر للمال، الدوحة',
    isVirtual: false,
    descriptionEn: 'Technical and legal workshop examining e-KYC cross-border passporting, Open Banking APIs, and anti-money laundering automated workflows for digital neo-banks.',
    descriptionAr: 'ورشة عمل فنية وقانونية تستعرض آليات التحقق من الهوية الرقمية والخدمات المصرفية المفتوحة والامتثال المالي لمنصات التكنولوجيا المالية.',
    registrationUrl: 'https://ventures.qa/events/fintech-compliance',
    isFeatured: false
  },
  {
    id: 'event-3',
    titleEn: 'CleanTech & Energy Transition Investor Forum',
    titleAr: 'منتدى مستثمري التكنولوجيا النظيفة والتحول في قطاع الطاقة',
    organizer: 'Regional Sustainability Capital Alliances',
    type: 'conference',
    date: '2026-11-05',
    time: '10:00 – 16:00 AST',
    location: 'Education City Innovation Hub, Al Rayyan',
    locationAr: 'مجمع الابتكار، المدينة التعليمية، الريان',
    isVirtual: false,
    descriptionEn: 'Showcasing innovations in industrial solar water purification, desert hydroponic farming systems, and circular carbon recovery engineering.',
    descriptionAr: 'استعراض تقنيات تنقية المياه بالطاقة الشمسية، والزراعة المائية الصحراوية، وحلول تدوير الانبعاثات الصناعية للشركات الناشئة في المنطقة.',
    registrationUrl: 'https://ventures.qa/events/cleantech-forum',
    isFeatured: true
  },
  {
    id: 'event-4',
    titleEn: 'Web Summit Qatar 2027 Founder & Investor Mixer',
    titleAr: 'لقاء رواد الأعمال والمستثمرين التحضيري لقمة الويب 2027',
    organizer: 'Ecosystem Tech Founders Network',
    type: 'meetup',
    date: '2026-11-18',
    time: '18:00 – 21:00 AST',
    location: 'Msheireb Downtown Arts & Tech Loft',
    locationAr: 'مشيرب قلب الدوحة، مساحة الابتكار',
    isVirtual: false,
    descriptionEn: 'Informal networking evening connecting tech founders, overseas venture delegates, and local angel syndicates to discuss term sheet structures and partnership opportunities.',
    descriptionAr: 'أمسية تعارف لرواد الأعمال والمستثمرين لمناقشة فرص التعاون وتطوير الشراكات الاستثمارية قبل انطلاق الفعاليات الدولية الكبرى.',
    registrationUrl: 'https://ventures.qa/events/founder-mixer',
    isFeatured: false
  }
];

// --- ECOSYSTEM JOBS BOARD ---
export const SEED_ECOSYSTEM_JOBS: EcosystemJob[] = [
  {
    id: 'job-1',
    titleEn: 'Head of Growth & Performance Marketing',
    titleAr: 'رئيس قسم النمو والتسويق الرقمي',
    companyName: 'Snoonu',
    sector: 'Logistics & Supply Chain',
    type: 'Full-time',
    location: 'Lusail City, Qatar',
    locationAr: 'مدينة لوسيل، قطر',
    salaryRange: '35,000 – 48,000 QAR / month',
    descriptionEn: 'Lead user acquisition, retention loops, merchant co-marketing campaigns, and cross-border launch analytics as Snoonu expands into new GCC markets.',
    descriptionAr: 'قيادة استراتيجيات اكتساب المستخدمين وبرامج الولاء وتحليلات التوسع في الأسواق الإقليمية الجديدة لشركة سنونو.',
    applyUrl: 'https://snoonu.com/careers',
    isFeatured: true,
    postedDate: '2026-09-18'
  },
  {
    id: 'job-2',
    titleEn: 'Lead Full-Stack FinTech Engineer (Node/React)',
    titleAr: 'كبير مهندسي البرمجيات لمنصات الدفع الرقمي',
    companyName: 'SkipCash',
    sector: 'FinTech',
    type: 'Full-time',
    location: 'West Bay, Doha',
    locationAr: 'الخليج الغربي، الدوحة',
    salaryRange: '28,000 – 40,000 QAR / month',
    descriptionEn: 'Architect high-throughput payment transaction pipelines, POS merchant webhooks, and PCI-DSS Level 1 compliant infrastructure.',
    descriptionAr: 'تصميم وبناء بنية تحتية عالية الكفاءة لمعالجة المدفوعات والربط مع بوابات الدفع الإلكترونية وأنظمة الأمان المصرفي.',
    applyUrl: 'https://skipcash.com/careers',
    isFeatured: true,
    postedDate: '2026-09-16'
  },
  {
    id: 'job-3',
    titleEn: 'Venture Capital Investment Associate',
    titleAr: 'مسؤول أول استثمارات رأس المال الجريء',
    companyName: 'Rasmal Ventures',
    sector: 'Enterprise & SaaS',
    type: 'Full-time',
    location: 'Qatar Financial Centre, Doha',
    locationAr: 'مركز قطر للمال، الدوحة',
    salaryRange: '30,000 – 42,000 QAR / month + Carry',
    descriptionEn: 'Conduct financial due diligence, cap table modeling, market landscape analysis, and founder pipeline evaluations for Seed and Series A technology investments.',
    descriptionAr: 'إجراء الفحص النافي للجهالة، وتحليل النماذج المالية والتقييمات، ومتابعة تدفق الصفقات لفرص الاستثمار الجريء.',
    applyUrl: 'https://rasmalventures.com/join-us',
    isFeatured: true,
    postedDate: '2026-09-14'
  },
  {
    id: 'job-4',
    titleEn: 'Clinical Machine Learning Research Scientist',
    titleAr: 'باحث أول في نماذج التعلم الآلي والذكاء الاصطناعي الطبي',
    companyName: 'Avey AI Health',
    sector: 'HealthTech & Bio',
    type: 'Full-time',
    location: 'Education City, Doha',
    locationAr: 'المدينة التعليمية، الدوحة',
    salaryRange: '32,000 – 46,000 QAR / month',
    descriptionEn: 'Develop, evaluate, and benchmark deep probabilistic diagnostic models using multi-modal clinical electronic health records and symptom triage graphs.',
    descriptionAr: 'تطوير وتدريب نماذج التعلم العميق والذكاء الاصطناعي الطبي المتقدمة لتقييم الأعراض والتشخيص السريري الدقيق.',
    applyUrl: 'https://avey.ai/careers',
    isFeatured: false,
    postedDate: '2026-09-10'
  },
  {
    id: 'job-5',
    titleEn: 'Senior Product Designer (UI/UX & Design Systems)',
    titleAr: 'مصمم واجهات وتجربة مستخدم أول',
    companyName: 'Karty',
    sector: 'FinTech',
    type: 'Full-time',
    location: 'Doha, Qatar',
    locationAr: 'الدوحة، قطر',
    salaryRange: '24,000 – 34,000 QAR / month',
    descriptionEn: 'Design intuitive, delightful personal budgeting flows, card security management interfaces, and financial data visualizations in English and Arabic.',
    descriptionAr: 'تصميم واجهات وتجارب استخدام رقمية متميزة لتطبيقات إدارة الأموال والبطاقات الذكية باللغتين العربية والإنجليزية.',
    applyUrl: 'https://karty.qa/careers',
    isFeatured: false,
    postedDate: '2026-09-08'
  }
];

// --- ECOSYSTEM RESOURCE TEMPLATES & GUIDES ---
export const SEED_ECOSYSTEM_RESOURCES: EcosystemResource[] = [
  {
    id: 'res-1',
    titleEn: 'Standard SAFE Template (Qatar Adaptation)',
    titleAr: 'نموذج اتفاقية التمويل المستقبلية البسيطة (SAFE) المعتمد في قطر',
    category: 'template',
    fileType: 'DOCX',
    size: '142 KB',
    descriptionEn: 'A balanced, market-standard Simple Agreement for Future Equity with customizable valuation cap, discount rate, and QFC / Qatar corporate law dispute resolution clauses.',
    descriptionAr: 'نموذج موحد لاتفاقية الاستثمار في الأسهم المستقبلية (SAFE) متوافق مع متطلبات الشركات الناشئة والمستثمرين في دولة قطر مع بنود مرنة لسقوف التقييم.',
    downloadsCount: 1420,
    sampleContent: 'CONFIDENTIAL SAFE AGREEMENT (POST-MONEY VALUATION CAP WITH DISCOUNT)\n\nTHIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED...'
  },
  {
    id: 'res-2',
    titleEn: 'Venture Cap Table & Dilution Modeling Spreadsheet',
    titleAr: 'جدول نمذجة حصص الملكية والتخفيف في جولات التمويل (Cap Table)',
    category: 'template',
    fileType: 'XLSX',
    size: '850 KB',
    descriptionEn: 'Professional multi-round spreadsheet modeling founder equity, employee option pool (ESOP) allocations, convertible notes, and Series A investor ownership outcomes.',
    descriptionAr: 'نموذج إكسل متكامل لحساب حصص المؤسسين، ومخصصات خيارات أسهم الموظفين (ESOP)، وأثر تحويل السندات في جولات التمويل التأسيسية والأولى.',
    downloadsCount: 2180,
    sampleContent: 'CAPITALIZATION TABLE MASTER MODEL\nRound 1: Pre-Seed (Common Shares)\nRound 2: Convertible Notes Pool\nRound 3: Series A Preferred Allocation'
  },
  {
    id: 'res-3',
    titleEn: 'Early-Stage Term Sheet Key Terms & Negotiation Checklist',
    titleAr: 'قائمة المصطلحات والشروط الرئيسية للتفاوض على جولات الاستثمار (Term Sheet)',
    category: 'legal',
    fileType: 'PDF',
    size: '480 KB',
    descriptionEn: 'An objective breakdown of liquidation preferences, board composition, protective voting provisions, and anti-dilution clauses written in plain language for Qatari founders.',
    descriptionAr: 'شرح مبسط وموضوعي لأولويات التصفية، وتشكيل مجالس الإدارة، وحقوق حماية الأقلية، وبنود منع التخفيف لمساعدة رواد الأعمال على التفاوض بثقة.',
    downloadsCount: 1750,
    sampleContent: 'TERM SHEET COMPASS FOR FOUNDERS & ANGELS\nSection 1: Economics vs. Governance Rights\nSection 2: 1x Non-Participating Liquidation Preferences Explained'
  },
  {
    id: 'res-4',
    titleEn: 'Digital Tech Commercial Registration & Licensing Guide',
    titleAr: 'دليل إصدار السجلات والتراخيص التجارية للشركات الرقمية في قطر',
    category: 'guide',
    fileType: 'PDF',
    size: '1.2 MB',
    descriptionEn: 'Step-by-step regulatory walkthrough detailing licensing pathways, virtual address options, tax resident certificates, and bank account setup for technology businesses.',
    descriptionAr: 'دليل إجرائي شامل يوضح خطوات تسجيل الشركات التقنية، وخيارات المقرات الافتراضية، وفتح الحسابات المصرفية التجارية، والامتثال الضريبي في قطر.',
    downloadsCount: 3410,
    sampleContent: 'FOUNDER REGULATORY MANUAL: INCORPORATION & LICENSING IN DOHA\nChapter 1: Choosing Corporate Structure (LLC vs QFC SPV)\nChapter 2: Digital Onboarding Procedures'
  }
];

// --- INDEPENDENT QUARTERLY STATE OF CAPITAL REPORT ---
export const SEED_STATE_OF_CAPITAL_REPORT: StateOfCapitalReport = {
  id: 'report-q2-2026',
  titleEn: 'The Qatar Private Capital Index: Q2 2026 State of Venture Report',
  titleAr: 'مؤشر رأس المال الخاص: تقرير استثمارات رأس المال الجريء في قطر للربع الثاني 2026',
  edition: 'Vol. IV, Issue 2',
  publicationDate: 'July 2026',
  quarterLabel: 'Q2 2026',
  executiveSummaryEn: 'The Q2 2026 Qatar Private Capital Report provides an independent, data-grounded overview of venture capital and private equity activity across the domestic ecosystem. Total disclosed funding in Q2 reached $42.5 million across 14 transactions, reflecting steady 18.4% year-on-year growth. Private family offices and institutional fund managers accounted for 52% of direct syndicated capital, underscoring the expanding institutionalization of the Qatari private technology market.',
  executiveSummaryAr: 'يقدم تقرير مؤشر رأس المال الخاص للربع الثاني من عام 2026 قراءة مستقلة ومبنية على البيانات لواقع استثمارات رأس المال الجريء في قطر. بلغ إجمالي التمويل المعلن 42.5 مليون دولار عبر 14 صفقة، محققاً نمواً بنسبة 18.4% مقارنة بنفس الفترة من العام الماضي، مع تزايد ملحوظ في مشاركة المكاتب العائلية وصناديق الاستثمار الخاصة بنسبة 52% من إجمالي رؤوس الأموال الموظفة.',
  totalAumTrackedUsd: '$485M USD',
  activeDealsTracked: 14,
  keyPillars: [
    {
      titleEn: 'Institutional Private Syndication',
      titleAr: 'التوسع في الاستثمار الخاص المؤسسي',
      descriptionEn: 'Family offices and private venture funds now provide the core capital backbone for Series A rounds, reducing reliance on early state grant facilities.',
      descriptionAr: 'أصبحت المكاتب العائلية وصناديق الاستثمار الخاصة العمود الفقري لجولات التمويل الأولى (Series A)، مما يرسخ نمواً مستداماً قائماً على قوى السوق.',
      metric: '52% Private Direct Participation'
    },
    {
      titleEn: 'Regional Scaleup Export Velocity',
      titleAr: 'تسارع التوسع الإقليمي للشركات المحلية',
      descriptionEn: 'Mature scaleups like Snoonu, Cwallet, and SkipCash are successfully securing cross-border revenue streams across Saudi Arabia, UAE, and Oman.',
      descriptionAr: 'نجحت الشركات الصاعدة مثل سنونو وسي والت وسكيب كاش في تحقيق عوائد متنامية من أسواق الخليج المجاورة.',
      metric: '38% Revenues from Regional Markets'
    },
    {
      titleEn: 'Standardized Early-Stage Capital Structuring',
      titleAr: 'اعتماد معايير استثمارية مرنة (SAFE)',
      descriptionEn: 'Standard SAFE notes and streamlined QFC holding structures have halved the time needed to complete angel and seed-stage capital closings.',
      descriptionAr: 'ساهم انتشار اتفاقيات SAFE الموحدة والهياكل المرنة في تقليص الوقت المستغرق لإتمام جولات التمويل التأسيسي بنسبة 50%.',
      metric: 'Avg 45 Days to Seed Close'
    }
  ],
  keyFindingsEn: [
    'Total venture deployment reached $42.5 million USD across 14 distinct transactions.',
    'FinTech and Logistics & Supply Chain combined represented 63% of total dollar volume.',
    'Average check sizes for Series A investments rose from $2.1M to $3.03M year-on-year.',
    'Over 18 Qatari tech scaleups now employ more than 20 full-time software and product engineers locally.'
  ],
  keyFindingsAr: [
    'سجلت تدفقات رأس المال الجريء 42.5 مليون دولار أمريكي عبر 14 صفقة استثمارية.',
    'استحوذ قطاعا التكنولوجيا المالية والخدمات اللوجستية على 63% من إجمالي التمويلات.',
    'ارتفع متوسط حجم شيكات جولات التمويل الأولى (Series A) إلى 3.03 مليون دولار.',
    'أكثر من 18 شركة تكنولوجية صاعدة توظف حالياً أكثر من 20 مهندس برمجيات بدوام كامل محلياً.'
  ]
};

// --- PLATFORM ANALYTICS ---
export const SEED_ANALYTICS: PlatformAnalytics = {
  totalVisitors30d: 48500,
  uniqueInstitutions: 240,
  activeMandatesQarM: 185,
  dealIntroductionsCount: 88,
  geoBreakdown: [
    { country: 'Qatar', flag: '🇶🇦', percentage: 58 },
    { country: 'United Arab Emirates', flag: '🇦🇪', percentage: 14 },
    { country: 'Saudi Arabia', flag: '🇸🇦', percentage: 12 },
    { country: 'United Kingdom', flag: '🇬🇧', percentage: 7 },
    { country: 'United States', flag: '🇺🇸', percentage: 5 },
    { country: 'Others', flag: '🌐', percentage: 4 }
  ],
  moduleViews: [
    { module: 'Directory', moduleAr: 'الدليل', views: 32000 },
    { module: 'News & Spotlights', moduleAr: 'الأخبار والمقالات', views: 24500 },
    { module: 'Market Intelligence & Index', moduleAr: 'المؤشر والتقارير', views: 18900 },
    { module: 'Deal Marketplace', moduleAr: 'سوق الصفقات', views: 14200 },
    { module: 'Events & Jobs', moduleAr: 'الفعاليات والوظائف', views: 9800 }
  ],
  totalEntitiesListed: 40,
  verifiedClaimPercentage: 84,
  activeDealFlowMandates: 26,
  facilitatedIntroductions: 88,
  monthlyApiQueries: 142000,
  closedDealsThroughPlatform: 9,
  totalCapitalDeployedUsd: '$18.4M USD',
  platformFeeRevenueUsd: '$276,000 USD'
};
