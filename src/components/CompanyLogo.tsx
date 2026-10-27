import React, { useState, useMemo } from 'react';

export interface CompanyLogoProps {
  entityId?: string;
  name?: string;
  logo?: string;
  logoBg?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  entityId = '',
  name = '',
  logo = '',
  logoBg,
  size = 'md',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  // Normalize lookup key
  const key = (entityId || name || '').toLowerCase().replace(/[^a-z0-9]/g, '-');

  // Dimensions mapping
  const sizeClasses = {
    xs: 'w-6 h-6 rounded-md text-[10px]',
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-12 h-12 rounded-xl text-base',
    lg: 'w-16 h-16 rounded-2xl text-xl',
    xl: 'w-20 h-20 rounded-2xl text-2xl'
  }[size];

  const iconSizes = {
    xs: 14,
    sm: 18,
    md: 28,
    lg: 38,
    xl: 48
  }[size];

  // Resolve logo source URL:
  // 1) Explicit logo prop if it starts with '/', 'http', 'data:'
  // 2) Or if key matches a known logo in /logos/<key>.svg
  const resolvedLogoUrl = useMemo(() => {
    if (logo && (logo.startsWith('/') || logo.startsWith('http') || logo.startsWith('data:'))) {
      return logo;
    }
    // Check known mappings
    const map: Record<string, string> = {
      'snoonu': '/logos/snoonu.svg',
      'skipcash': '/logos/skipcash.svg',
      'cwallet': '/logos/cwallet.svg',
      'avey-health': '/logos/avey.svg',
      'avey': '/logos/avey.svg',
      'urbanpoint': '/logos/urbanpoint.svg',
      'droobi-health': '/logos/droobi.svg',
      'droobi': '/logos/droobi.svg',
      'karty': '/logos/karty.svg',
      'airlift-systems': '/logos/airlift.svg',
      'airlift': '/logos/airlift.svg',
      'rimads': '/logos/rimads.svg',
      'applab': '/logos/applab.svg',
      'subol': '/logos/subol.svg',
      'em5-education': '/logos/em5.svg',
      'em5': '/logos/em5.svg',
      'atpick': '/logos/atpick.svg',
      'spendwisor': '/logos/spendwisor.svg',
      'dohabuddy': '/logos/dohabuddy.svg',
      'ebutler': '/logos/ebutler.svg',
      'fatora': '/logos/fatora.svg',
      'meddy': '/logos/meddy.svg',
      'kenzz': '/logos/kenzz.svg',
      'debito': '/logos/debito.svg',
      'volante': '/logos/volante.svg',
      'q-tickets': '/logos/qtickets.svg',
      'qtickets': '/logos/qtickets.svg',
      'shamal-technologies': '/logos/shamal.svg',
      'shamal': '/logos/shamal.svg',
      'torod-logistics': '/logos/torod.svg',
      'torod': '/logos/torod.svg',
      'bonocle': '/logos/bonocle.svg',
      'paperfly': '/logos/paperfly.svg',
      'tean-edtech': '/logos/tean.svg',
      'tean': '/logos/tean.svg',
      'q-auto-tech': '/logos/qauto.svg',
      'qauto': '/logos/qauto.svg',
      'clever-clean': '/logos/cleverclean.svg',
      'cleverclean': '/logos/cleverclean.svg',
      'modaris': '/logos/modaris.svg',
      'pay2go': '/logos/pay2go.svg',
      'synergy-ai': '/logos/synergy.svg',
      'synergy': '/logos/synergy.svg',
      'aldelaimi-biosciences': '/logos/aldelaimi.svg',
      'aldelaimi': '/logos/aldelaimi.svg',
      'ooredoo': '/logos/ooredoo.svg',
      'qnb-group': '/logos/qnb.svg',
      'qnb': '/logos/qnb.svg',
      'rasmal-ventures': '/logos/rasmal.svg',
      'rasmal': '/logos/rasmal.svg',
      'doha-tech-angels': '/logos/dta.svg',
      'dta': '/logos/dta.svg',
      'al-mana-capital': '/logos/almana.svg',
      'almana': '/logos/almana.svg',
      'qstp-tech-venture-fund': '/logos/qstp.svg',
      'qstp': '/logos/qstp.svg',
      'qia-fund-of-funds': '/logos/qia.svg',
      'qia': '/logos/qia.svg',
      'jaidah-capital': '/logos/jaidah.svg',
      'jaidah': '/logos/jaidah.svg',
      'mannai-tech-investments': '/logos/mannai.svg',
      'mannai': '/logos/mannai.svg',
      'qfth-hub': '/logos/qfth.svg',
      'qfth': '/logos/qfth.svg',
      'tech-park-incubator': '/logos/techpark.svg',
      'techpark': '/logos/techpark.svg'
    };

    for (const [k, v] of Object.entries(map)) {
      if (key.includes(k)) return v;
    }
    return '';
  }, [logo, key]);

  // Default background color lookup
  const brandBg = useMemo(() => {
    if (logoBg) return logoBg;
    if (key.includes('snoonu')) return '#8A1538';
    if (key.includes('skipcash')) return '#10B981';
    if (key.includes('cwallet')) return '#0D9488';
    if (key.includes('avey')) return '#2563EB';
    if (key.includes('urbanpoint')) return '#E11D48';
    if (key.includes('droobi')) return '#14B8A6';
    if (key.includes('karty')) return '#F59E0B';
    if (key.includes('airlift')) return '#334155';
    if (key.includes('rimads')) return '#9333EA';
    if (key.includes('applab')) return '#0284C7';
    if (key.includes('subol')) return '#EA580C';
    if (key.includes('em5')) return '#8B5CF6';
    if (key.includes('atpick')) return '#D97706';
    if (key.includes('spendwisor')) return '#10B981';
    if (key.includes('dohabuddy')) return '#3B82F6';
    if (key.includes('ebutler')) return '#1E293B';
    if (key.includes('fatora')) return '#059669';
    if (key.includes('meddy')) return '#0284C7';
    if (key.includes('kenzz')) return '#6366F1';
    if (key.includes('debito')) return '#047857';
    if (key.includes('volante')) return '#0F172A';
    if (key.includes('q-ticket') || key.includes('qtickets')) return '#DC2626';
    if (key.includes('shamal')) return '#0891B2';
    if (key.includes('torod')) return '#2563EB';
    if (key.includes('bonocle')) return '#7C3AED';
    if (key.includes('paperfly')) return '#475569';
    if (key.includes('tean')) return '#10B981';
    if (key.includes('q-auto') || key.includes('qauto')) return '#B91C1C';
    if (key.includes('clever-clean') || key.includes('cleverclean')) return '#059669';
    if (key.includes('modaris')) return '#2563EB';
    if (key.includes('pay2go')) return '#10B981';
    if (key.includes('synergy')) return '#3B82F6';
    if (key.includes('aldelaimi')) return '#14B8A6';
    if (key.includes('ooredoo')) return '#ED1C24';
    if (key.includes('qnb')) return '#7A0026';
    if (key.includes('rasmal')) return '#8A1538';
    if (key.includes('doha-tech') || key.includes('dta') || key.includes('angels')) return '#4338CA';
    if (key.includes('al-mana') || key.includes('almana')) return '#047857';
    if (key.includes('qstp')) return '#7C3AED';
    if (key.includes('qia')) return '#8A1538';
    if (key.includes('jaidah')) return '#1E3A8A';
    if (key.includes('mannai')) return '#0F766E';
    if (key.includes('qfth')) return '#0284C7';
    if (key.includes('tech-park') || key.includes('incubator')) return '#7C3AED';
    return '#8A1538';
  }, [logoBg, key]);

  // Fallback vector icon
  const renderFallbackVector = () => {
    if (key.includes('snoonu')) {
      return (
        <svg width={iconSizes} height={iconSizes} viewBox="0 0 40 40" fill="none">
          <path d="M8 26C12 28 17 26 21 21C25 16 28 13 34 11C31 15 28 17 24 18C28 19 32 18 35 15C32 21 26 25 19 26C14 27 10 24 8 26Z" fill="white" />
          <path d="M12 18C15 14 20 10 28 8C23 11 19 14 17 18C15 22 13 25 9 27C10 23 11 20 12 18Z" fill="#FEE2E2" />
          <circle cx="28" cy="11" r="1.5" fill="#8A1538" />
          <path d="M22 28L18 33L16 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    }
    if (key.includes('skipcash')) {
      return (
        <svg width={iconSizes} height={iconSizes} viewBox="0 0 40 40" fill="none">
          <rect x="7" y="10" width="26" height="20" rx="4" stroke="white" strokeWidth="2.2" />
          <path d="M12 17C14 15 17 15 19 17" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 20C15 17 20 17 24 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 25L26 20L20 15V18.5H15V21.5H20V25Z" fill="#FDE047" />
        </svg>
      );
    }
    if (key.includes('cwallet')) {
      return (
        <svg width={iconSizes} height={iconSizes} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="13" stroke="white" strokeWidth="2.5" strokeDasharray="60 20" strokeLinecap="round" />
          <rect x="14" y="14" width="15" height="12" rx="2.5" fill="white" />
          <circle cx="24" cy="20" r="3" fill="#F59E0B" />
        </svg>
      );
    }

    // Default 2-letter monogram
    const initials = (name || key).slice(0, 2).toUpperCase();
    return (
      <span className="font-mono font-black tracking-wider text-white select-none">
        {initials}
      </span>
    );
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 shadow-sm border border-white/20 overflow-hidden select-none transition-transform duration-200 group-hover:scale-105 ${sizeClasses} ${className}`}
      style={{ backgroundColor: brandBg }}
      title={name}
      aria-label={`${name} logo`}
    >
      {resolvedLogoUrl && !imageError ? (
        <img
          src={resolvedLogoUrl}
          alt={name || 'Company logo'}
          className="w-full h-full object-cover select-none"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        renderFallbackVector()
      )}
    </div>
  );
};
