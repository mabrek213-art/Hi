import fs from 'fs';
import path from 'path';

const logosDir = path.resolve(process.cwd(), 'public/logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

interface LogoDef {
  filename: string;
  bg: string;
  content: string;
}

const logos: Record<string, LogoDef> = {
  snoonu: {
    filename: 'snoonu.svg',
    bg: '#8A1538',
    content: `
      <!-- Snoonu Falcon / Swift In Flight -->
      <path d="M12 40C18 43 25 40 32 32C38 24 43 20 52 17C47 23 43 26 37 27C43 29 49 27 54 23C49 32 40 38 29 40C21 41 15 37 12 40Z" fill="#FFFFFF"/>
      <path d="M18 27C23 21 31 15 43 12C35 17 29 21 26 27C23 33 20 38 14 41C15 35 17 30 18 27Z" fill="#FEE2E2"/>
      <circle cx="43" cy="17" r="2.5" fill="#8A1538"/>
      <path d="M34 43L28 50L25 44" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    `
  },
  skipcash: {
    filename: 'skipcash.svg',
    bg: '#10B981',
    content: `
      <!-- SkipCash Contactless Card & S-Flow -->
      <rect x="11" y="16" width="42" height="32" rx="6" stroke="#FFFFFF" stroke-width="3.5" fill="none"/>
      <path d="M19 27C22 24 27 24 30 27" stroke="#A7F3D0" stroke-width="3" stroke-linecap="round"/>
      <path d="M18 32C24 27 32 27 38 32" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 40L41 32L32 24V29.5H24V34.5H32V40Z" fill="#FDE047"/>
    `
  },
  cwallet: {
    filename: 'cwallet.svg',
    bg: '#0D9488',
    content: `
      <!-- Cwallet Neo-Banking & Gold Coin -->
      <circle cx="32" cy="32" r="21" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="96 32" stroke-linecap="round" fill="none"/>
      <rect x="22" y="22" width="24" height="20" rx="4" fill="#FFFFFF"/>
      <circle cx="38" cy="32" r="5" fill="#F59E0B"/>
      <circle cx="38" cy="32" r="2" fill="#78350F"/>
      <path d="M18 32H24" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    `
  },
  'avey-health': {
    filename: 'avey.svg',
    bg: '#2563EB',
    content: `
      <!-- Avey AI Health Diagnostic Cross & Neural Wave -->
      <path d="M27 14H37V24H47V34H37V44H27V34H17V24H27V14Z" fill="#FFFFFF" fill-opacity="0.25" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>
      <path d="M16 29H25L28 19L35 41L38 29H48" stroke="#93C5FD" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="30" r="3" fill="#FDE047"/>
    `
  },
  urbanpoint: {
    filename: 'urbanpoint.svg',
    bg: '#E11D48',
    content: `
      <!-- UrbanPoint Geo-Pin & Gift Star -->
      <path d="M32 11C23.16 11 16 18.16 16 27C16 38 32 53 32 53C32 53 48 38 48 27C48 18.16 40.84 11 32 11Z" fill="#FFFFFF"/>
      <circle cx="32" cy="27" r="8" fill="#E11D48"/>
      <polygon points="32,22 34,26 38,27 35,30 36,34 32,32 28,34 29,30 26,27 30,26" fill="#FDE047"/>
    `
  },
  'droobi-health': {
    filename: 'droobi.svg',
    bg: '#14B8A6',
    content: `
      <!-- Droobi Therapeutic Water Drop & Pulse -->
      <path d="M32 13C32 13 16 32 16 39C16 47 23 52 32 52C41 52 48 47 48 39C48 32 32 13 32 13Z" fill="#FFFFFF"/>
      <path d="M21 40H26L29 34L34 45L37 37L39 40H43" stroke="#0D9488" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  karty: {
    filename: 'karty.svg',
    bg: '#F59E0B',
    content: `
      <!-- Karty Contactless Cards -->
      <rect x="13" y="21" width="35" height="24" rx="5" fill="#B45309"/>
      <rect x="18" y="15" width="35" height="24" rx="5" fill="#FFFFFF"/>
      <rect x="23" y="21" width="8" height="6" rx="1.5" fill="#F59E0B"/>
      <path d="M40 21C42.5 23.5 42.5 26.5 40 29" stroke="#D97706" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M44 19C48 23 48 27 44 31" stroke="#D97706" stroke-width="2.5" stroke-linecap="round"/>
    `
  },
  'airlift-systems': {
    filename: 'airlift.svg',
    bg: '#334155',
    content: `
      <!-- Airlift Quadcopter Drone -->
      <rect x="26" y="26" width="12" height="12" rx="3" fill="#38BDF8"/>
      <path d="M26 26L18 18M38 26L46 18M26 38L18 46M38 38L46 46" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <circle cx="16" cy="16" r="5" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
      <circle cx="48" cy="16" r="5" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
      <circle cx="16" cy="48" r="5" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
      <circle cx="48" cy="48" r="5" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
      <rect x="27.5" y="38" width="9" height="7" rx="1.5" fill="#FCD34D"/>
    `
  },
  rimads: {
    filename: 'rimads.svg',
    bg: '#9333EA',
    content: `
      <!-- Rimads Digital Pharmacy Capsule -->
      <rect x="22" y="25" width="20" height="32" rx="10" transform="rotate(-45 22 25)" fill="#FFFFFF"/>
      <path d="M19 32L32 19L40 27L27 40L19 32Z" fill="#F3E8FF"/>
      <line x1="19" y1="32" x2="32" y2="19" stroke="#9333EA" stroke-width="3"/>
      <path d="M11 25C16 25 19 22 22 17" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M42 47C45 42 48 39 53 39" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    `
  },
  applab: {
    filename: 'applab.svg',
    bg: '#0284C7',
    content: `
      <!-- Applab Isometric Code Cube -->
      <path d="M32 13L48 22L32 32L16 22L32 13Z" fill="#BAE6FD"/>
      <path d="M16 22L32 32V51L16 41V22Z" fill="#FFFFFF"/>
      <path d="M32 32L48 22V41L32 51V32Z" fill="#7DD3FC"/>
      <path d="M22 32L27 35L22 38" stroke="#0369A1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 32L37 35L42 38" stroke="#0369A1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  subol: {
    filename: 'subol.svg',
    bg: '#EA580C',
    content: `
      <!-- Subol IoT Safety Sensor Shield -->
      <polygon points="32,11 50,21 50,43 32,53 14,43 14,21" fill="#FFFFFF"/>
      <circle cx="32" cy="32" r="6" fill="#EA580C"/>
      <path d="M22 24C28 19 36 19 42 24" stroke="#EA580C" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 40C28 45 36 45 42 40" stroke="#EA580C" stroke-width="3" stroke-linecap="round"/>
    `
  },
  'em5-education': {
    filename: 'em5.svg',
    bg: '#8B5CF6',
    content: `
      <!-- EM5 Education Mortarboard & Play -->
      <path d="M32 14L51 24L32 34L13 24L32 14Z" fill="#FFFFFF"/>
      <path d="M19 29V38C19 43 25 46 32 46C39 46 45 43 45 38V29" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M50 26V40" stroke="#DDD6FE" stroke-width="3" stroke-linecap="round"/>
      <polygon points="29,21 38,24 29,27" fill="#7C3AED"/>
    `
  },
  atpick: {
    filename: 'atpick.svg',
    bg: '#D97706',
    content: `
      <!-- AtPick Smart Parcel Lockers -->
      <rect x="16" y="13" width="32" height="38" rx="5" stroke="#FFFFFF" stroke-width="3.5" fill="none"/>
      <line x1="16" y1="26" x2="48" y2="26" stroke="#FFFFFF" stroke-width="2.5"/>
      <line x1="16" y1="38" x2="48" y2="38" stroke="#FFFFFF" stroke-width="2.5"/>
      <line x1="32" y1="13" x2="32" y2="51" stroke="#FFFFFF" stroke-width="2.5"/>
      <rect x="18" y="15" width="12" height="9" fill="#FDE68A"/>
      <circle cx="27" cy="19" r="1.5" fill="#78350F"/>
    `
  },
  spendwisor: {
    filename: 'spendwisor.svg',
    bg: '#10B981',
    content: `
      <!-- Spendwisor Cashback Shopping Bag -->
      <path d="M19 24H45L42 49H22L19 24Z" fill="#FFFFFF"/>
      <path d="M26 24V18C26 14.5 28.5 12 32 12C35.5 12 38 14.5 38 18V24" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <circle cx="32" cy="37" r="7" fill="#F59E0B"/>
      <text x="32" y="40" text-anchor="middle" fill="#78350F" font-size="8" font-weight="900" font-family="sans-serif">%</text>
    `
  },
  dohabuddy: {
    filename: 'dohabuddy.svg',
    bg: '#3B82F6',
    content: `
      <!-- Dohabuddy AI Bot -->
      <line x1="32" y1="11" x2="32" y2="19" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="11" r="3" fill="#FDE047"/>
      <rect x="16" y="19" width="32" height="29" rx="10" fill="#FFFFFF"/>
      <circle cx="24" cy="32" r="4" fill="#2563EB"/>
      <circle cx="40" cy="32" r="4" fill="#2563EB"/>
      <path d="M26 38C28 41 36 41 38 38" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
    `
  },
  ebutler: {
    filename: 'ebutler.svg',
    bg: '#1E293B',
    content: `
      <!-- EButler Concierge Bowtie & Star -->
      <polygon points="16,21 29,27 16,33" fill="#FFFFFF"/>
      <polygon points="48,21 35,27 48,33" fill="#FFFFFF"/>
      <rect x="27.5" y="23" width="9" height="8" rx="2" fill="#F59E0B"/>
      <path d="M32 37V49M27 44H37" stroke="#FDE68A" stroke-width="3" stroke-linecap="round"/>
    `
  },
  fatora: {
    filename: 'fatora.svg',
    bg: '#059669',
    content: `
      <!-- Fatora Invoice Gateway -->
      <path d="M19 14H45V49L40 46L35 49L30 46L25 49L19 45V14Z" fill="#FFFFFF"/>
      <line x1="25" y1="22" x2="39" y2="22" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
      <line x1="25" y1="28" x2="35" y2="28" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="38" r="5.5" fill="#10B981"/>
      <path d="M30 38L31.5 39.5L34.5 36.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  meddy: {
    filename: 'meddy.svg',
    bg: '#0284C7',
    content: `
      <!-- Meddy Helium Health Stethoscope M -->
      <path d="M19 16V29C19 35 25 41 32 41C39 41 45 35 45 29V16" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M32 41V47C32 50 35 52 38 52H40" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="42" cy="52" r="4" fill="#FDE047"/>
      <circle cx="19" cy="16" r="3" fill="#FFFFFF"/>
      <circle cx="45" cy="16" r="3" fill="#FFFFFF"/>
    `
  },
  kenzz: {
    filename: 'kenzz.svg',
    bg: '#6366F1',
    content: `
      <!-- Kenzz Social E-Commerce Box -->
      <rect x="16" y="26" width="32" height="22" rx="3" fill="#FFFFFF"/>
      <path d="M16 26C16 19 22 14 32 14C42 14 48 19 48 26H16Z" fill="#C7D2FE"/>
      <circle cx="32" cy="32" r="4" fill="#F59E0B"/>
      <rect x="30.5" y="34" width="3" height="5" fill="#B45309"/>
    `
  },
  debito: {
    filename: 'debito.svg',
    bg: '#047857',
    content: `
      <!-- Debito Balance Scale -->
      <line x1="16" y1="22" x2="48" y2="22" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke="#FFFFFF" stroke-width="4"/>
      <line x1="24" y1="48" x2="40" y2="48" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <path d="M16 22L13 35H25L22 22" stroke="#A7F3D0" stroke-width="2.5" fill="none"/>
      <path d="M42 22L39 35H51L48 22" stroke="#A7F3D0" stroke-width="2.5" fill="none"/>
    `
  },
  volante: {
    filename: 'volante.svg',
    bg: '#0F172A',
    content: `
      <!-- Volante Luxury Mobility Wings -->
      <path d="M13 27C21 27 27 30 32 37C37 30 43 27 51 27C48 37 42 42 32 43C22 42 16 37 13 27Z" fill="#F59E0B"/>
      <circle cx="32" cy="32" r="8" fill="#FFFFFF"/>
      <path d="M32 27V37M27 32H37" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
    `
  },
  'q-tickets': {
    filename: 'qtickets.svg',
    bg: '#DC2626',
    content: `
      <!-- Q-Tickets Perforated Ticket -->
      <path d="M16 19H48V27C45.5 27 43 29.5 43 32C43 34.5 45.5 37 48 37V45H16V37C18.5 37 21 34.5 21 32C21 29.5 18.5 27 16 27V19Z" fill="#FFFFFF"/>
      <polygon points="32,25 34.5,30 40,31 36,34.5 37.5,40 32,37 26.5,40 28,34.5 24,31 29.5,30" fill="#DC2626"/>
    `
  },
  'shamal-technologies': {
    filename: 'shamal.svg',
    bg: '#0891B2',
    content: `
      <!-- Shamal Compass Rose & GIS Grid -->
      <polygon points="32,11 37,27 53,32 37,37 32,53 27,37 11,32 27,27" fill="#FFFFFF"/>
      <polygon points="32,11 37,27 32,32 27,27" fill="#0891B2"/>
      <circle cx="32" cy="32" r="4" fill="#38BDF8"/>
    `
  },
  'torod-logistics': {
    filename: 'torod.svg',
    bg: '#2563EB',
    content: `
      <!-- Torod Fast Courier Box -->
      <polygon points="32,13 49,22 32,32 15,22" fill="#93C5FD"/>
      <polygon points="15,22 32,32 32,51 15,41" fill="#FFFFFF"/>
      <polygon points="49,22 32,32 32,51 49,41" fill="#60A5FA"/>
      <path d="M24 22L32 27L40 22" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round"/>
    `
  },
  bonocle: {
    filename: 'bonocle.svg',
    bg: '#7C3AED',
    content: `
      <!-- Bonocle Assistive Braille Device -->
      <rect x="19" y="14" width="26" height="36" rx="13" fill="#FFFFFF"/>
      <circle cx="27" cy="24" r="3" fill="#7C3AED"/>
      <circle cx="37" cy="24" r="3" fill="#7C3AED"/>
      <circle cx="27" cy="32" r="3" fill="#7C3AED"/>
      <circle cx="37" cy="32" r="3" fill="#FBBF24"/>
      <circle cx="27" cy="40" r="3" fill="#7C3AED"/>
      <circle cx="37" cy="40" r="3" fill="#7C3AED"/>
    `
  },
  paperfly: {
    filename: 'paperfly.svg',
    bg: '#475569',
    content: `
      <!-- Paperfly Origami Airplane -->
      <polygon points="13,35 51,14 37,49 29,38" fill="#FFFFFF"/>
      <polygon points="29,38 51,14 32,35" fill="#CBD5E1"/>
      <path d="M11 46C18 45 23 41 26 37" stroke="#94A3B8" stroke-width="3" stroke-dasharray="3 3" stroke-linecap="round"/>
    `
  },
  'tean-edtech': {
    filename: 'tean.svg',
    bg: '#10B981',
    content: `
      <!-- Tean Learning Quill & Open Pages -->
      <path d="M16 45C22 42 29 42 32 45C35 42 42 42 48 45V22C42 19 35 19 32 22C29 19 22 19 16 22V45Z" fill="#FFFFFF"/>
      <path d="M32 11V45" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="32" cy="14" r="3" fill="#F59E0B"/>
    `
  },
  'q-auto-tech': {
    filename: 'qauto.svg',
    bg: '#B91C1C',
    content: `
      <!-- Q-Auto Tachometer Gauge -->
      <path d="M16 43C13 35 16 24 24 17C32 11 45 13 51 21C54 26 56 34 53 42" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/>
      <line x1="32" y1="38" x2="45" y2="22" stroke="#FDE047" stroke-width="4" stroke-linecap="round"/>
      <circle cx="32" cy="38" r="5" fill="#FFFFFF"/>
    `
  },
  'clever-clean': {
    filename: 'cleverclean.svg',
    bg: '#059669',
    content: `
      <!-- Clever Clean Solar Robot -->
      <polygon points="19,19 45,19 42,41 22,41" fill="#FFFFFF"/>
      <line x1="32" y1="19" x2="32" y2="41" stroke="#059669" stroke-width="2.5"/>
      <line x1="21" y1="30" x2="43" y2="30" stroke="#059669" stroke-width="2.5"/>
      <circle cx="45" cy="18" r="4" fill="#FDE047"/>
    `
  },
  modaris: {
    filename: 'modaris.svg',
    bg: '#2563EB',
    content: `
      <!-- Modaris Academic Book & Sun -->
      <path d="M14 45C21 40 27 40 32 43C37 40 43 40 50 45V24C43 21 37 21 32 24C27 21 21 21 14 24V45Z" fill="#FFFFFF"/>
      <circle cx="32" cy="16" r="5" fill="#FDE047"/>
      <line x1="32" y1="8" x2="32" y2="10" stroke="#FDE047" stroke-width="2.5"/>
      <line x1="26" y1="11" x2="28" y2="13" stroke="#FDE047" stroke-width="2.5"/>
      <line x1="38" y1="11" x2="36" y2="13" stroke="#FDE047" stroke-width="2.5"/>
    `
  },
  pay2go: {
    filename: 'pay2go.svg',
    bg: '#10B981',
    content: `
      <!-- Pay2Go Tap & Go Lightning -->
      <rect x="21" y="14" width="22" height="36" rx="5" stroke="#FFFFFF" stroke-width="3" fill="none"/>
      <polygon points="34,22 27,33 32,33 30,41 38,30 33,30" fill="#FDE047"/>
    `
  },
  'synergy-ai': {
    filename: 'synergy.svg',
    bg: '#3B82F6',
    content: `
      <!-- Synergy AI Synaptic Infinity -->
      <path d="M22 38C16 38 13 34 13 29C13 23 16 19 22 19C29 19 35 38 42 38C48 38 51 34 51 29C51 23 48 19 42 19C35 19 29 38 22 38Z" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="22" cy="29" r="4" fill="#93C5FD"/>
      <circle cx="42" cy="29" r="4" fill="#FDE047"/>
    `
  },
  'aldelaimi-biosciences': {
    filename: 'aldelaimi.svg',
    bg: '#14B8A6',
    content: `
      <!-- Al-Delaimi DNA Double Helix -->
      <path d="M19 16C29 26 35 38 45 48" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <path d="M45 16C35 26 29 38 19 48" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <line x1="24" y1="21" x2="40" y2="21" stroke="#A7F3D0" stroke-width="3" stroke-linecap="round"/>
      <line x1="29" y1="32" x2="35" y2="32" stroke="#FDE047" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="43" x2="40" y2="43" stroke="#A7F3D0" stroke-width="3" stroke-linecap="round"/>
    `
  },
  ooredoo: {
    filename: 'ooredoo.svg',
    bg: '#ED1C24',
    content: `
      <!-- Official Ooredoo Concentric Bubble Cluster -->
      <circle cx="22" cy="24" r="8" fill="#FFFFFF"/>
      <circle cx="22" cy="24" r="4" fill="#ED1C24"/>
      <circle cx="42" cy="24" r="8" fill="#FFFFFF"/>
      <circle cx="42" cy="24" r="4" fill="#ED1C24"/>
      <circle cx="32" cy="40" r="8" fill="#FFFFFF"/>
      <circle cx="32" cy="40" r="4" fill="#ED1C24"/>
    `
  },
  'qnb-group': {
    filename: 'qnb.svg',
    bg: '#7A0026',
    content: `
      <!-- QNB Signature Dual Arch Crest & Ribbon -->
      <path d="M16 46V26C16 18 22 11 32 11C42 11 48 18 48 26V46" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M24 46V29C24 25 27 22 32 22C37 22 40 25 40 29V46" stroke="#C5A059" stroke-width="3" stroke-linecap="round" fill="none"/>
      <rect x="29.5" y="35" width="5" height="11" fill="#FFFFFF"/>
      <circle cx="32" cy="16" r="2.5" fill="#C5A059"/>
    `
  },
  'rasmal-ventures': {
    filename: 'rasmal.svg',
    bg: '#8A1538',
    content: `
      <!-- Rasmal Ventures Growth Serif R & Gold Star -->
      <path d="M19 14H35C41 14 45 18 45 24C45 30 41 34 35 34H29V49H19V14Z" fill="#FFFFFF"/>
      <polygon points="29,34 45,49 37,49 24,34" fill="#C5A059"/>
      <circle cx="32" cy="24" r="3" fill="#8A1538"/>
      <circle cx="45" cy="16" r="4" fill="#FDE047"/>
    `
  },
  'doha-tech-angels': {
    filename: 'dta.svg',
    bg: '#4338CA',
    content: `
      <!-- Doha Tech Angels Wings & Central Seed -->
      <path d="M29 22C21 22 13 25 10 35C18 35 24 30 29 25" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M29 29C23 29 16 32 13 41C20 41 24 37 29 32" stroke="#A5B4FC" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M35 22C43 22 51 25 54 35C46 35 40 30 35 25" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M35 29C41 29 48 32 51 41C44 41 40 37 35 32" stroke="#A5B4FC" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="32,16 37,24 32,32 27,24" fill="#FDE047"/>
    `
  },
  'al-mana-capital': {
    filename: 'almana.svg',
    bg: '#047857',
    content: `
      <!-- Al-Mana Arch & Royal M -->
      <path d="M16 48V29C16 20 23 13 32 13C41 13 48 20 48 29V48" stroke="#C5A059" stroke-width="3" fill="none"/>
      <path d="M22 41V29L32 37L42 29V41" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="19" r="2.5" fill="#FDE047"/>
    `
  },
  'qstp-tech-venture-fund': {
    filename: 'qstp.svg',
    bg: '#7C3AED',
    content: `
      <!-- QSTP Crystalline Geometric Polygon Star -->
      <polygon points="32,11 45,22 53,37 43,51 21,51 11,37 19,22" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <polygon points="32,11 43,32 32,53 21,32" fill="#38BDF8" fill-opacity="0.5"/>
      <polygon points="32,11 45,22 32,32 19,22" fill="#C5A059"/>
      <polygon points="11,37 21,32 32,53 21,51" fill="#E9D5FF"/>
      <polygon points="53,37 43,32 32,53 43,51" fill="#FFFFFF"/>
    `
  },
  'qia-fund-of-funds': {
    filename: 'qia.svg',
    bg: '#8A1538',
    content: `
      <!-- QIA Sovereign Dhow Crest & Seal -->
      <circle cx="32" cy="32" r="21" stroke="#C5A059" stroke-width="3" fill="none"/>
      <path d="M19 38C26 42 38 42 45 38L42 42C35 45 29 45 22 42L19 38Z" fill="#FDE047"/>
      <polygon points="31,17 40,35 31,35" fill="#FFFFFF"/>
      <polygon points="29,21 23,35 29,35" fill="#E8DFC8"/>
      <circle cx="32" cy="14" r="2.5" fill="#FDE047"/>
    `
  },
  'jaidah-capital': {
    filename: 'jaidah.svg',
    bg: '#1E3A8A',
    content: `
      <!-- Jaidah Tower Sail -->
      <polygon points="19,45 32,16 45,45" stroke="#FFFFFF" stroke-width="3" fill="none"/>
      <polygon points="26,45 32,29 38,45" fill="#F59E0B"/>
      <line x1="14" y1="46" x2="50" y2="46" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    `
  },
  'mannai-tech-investments': {
    filename: 'mannai.svg',
    bg: '#0F766E',
    content: `
      <!-- Mannai Tech Prism -->
      <polygon points="32,13 50,24 50,43 32,53 14,43 14,24" stroke="#FFFFFF" stroke-width="3" fill="none"/>
      <line x1="32" y1="13" x2="32" y2="53" stroke="#5EEAD4" stroke-width="2.5"/>
      <line x1="14" y1="24" x2="50" y2="43" stroke="#5EEAD4" stroke-width="2.5"/>
      <line x1="50" y1="24" x2="14" y2="43" stroke="#5EEAD4" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="5" fill="#FDE047"/>
    `
  },
  'qfth-hub': {
    filename: 'qfth.svg',
    bg: '#0284C7',
    content: `
      <!-- QFTH FinTech Hub -->
      <circle cx="32" cy="32" r="13" fill="#FFFFFF"/>
      <path d="M27 27H37M27 32H34M27 37H37" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M19 22C22 16 29 13 35 13L32 10M35 13L32 16" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <path d="M45 42C42 48 35 51 29 51L32 54M29 51L32 48" stroke="#FDE047" stroke-width="3" stroke-linecap="round"/>
    `
  },
  'tech-park-incubator': {
    filename: 'techpark.svg',
    bg: '#7C3AED',
    content: `
      <!-- Tech Innovation Incubator Flask -->
      <path d="M29 16V26L19 45C17.5 48 20 51 24 51H40C44 51 46.5 48 45 45L35 26V16H29Z" stroke="#FFFFFF" stroke-width="3" fill="none"/>
      <circle cx="32" cy="38" r="4" fill="#FDE047"/>
      <circle cx="26" cy="43" r="2.5" fill="#C084FC"/>
      <circle cx="38" cy="43" r="2.5" fill="#C084FC"/>
    `
  }
};

let count = 0;
for (const [key, logo] of Object.entries(logos)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="${logo.bg}"/>
  ${logo.content.trim()}
</svg>`;
  fs.writeFileSync(path.join(logosDir, logo.filename), svg.trim(), 'utf-8');
  count++;
}

console.log('Successfully wrote ' + count + ' SVG logos to ' + logosDir);
