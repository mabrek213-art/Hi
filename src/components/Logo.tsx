import React from 'react';
import { Language } from '../types';

interface LogoProps {
  language?: Language;
  variant?: 'full' | 'header' | 'footer' | 'mark' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const LogoMark: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg ${sizeClasses[size]} ${className}`}
    >
      <svg
        viewBox="0 0 128 128"
        className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoMaroonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A11B43" />
            <stop offset="50%" stopColor="#8A1538" />
            <stop offset="100%" stopColor="#580820" />
          </linearGradient>
          <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5D6" />
            <stop offset="30%" stopColor="#ECD08B" />
            <stop offset="70%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#936F2C" />
          </linearGradient>
          <linearGradient id="logoGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2D898" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#C5A059" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#846123" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="logoWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EAE3D5" />
          </linearGradient>
        </defs>

        {/* Base Squircle with Qatar Maroon Gradient */}
        <rect x="4" y="4" width="120" height="120" rx="28" fill="url(#logoMaroonGrad)" />

        {/* Inner Gold Frame */}
        <rect
          x="5.5"
          y="5.5"
          width="117"
          height="117"
          rx="26.5"
          stroke="url(#logoGoldBorder)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Subtle Capital Flow Orbital Guide */}
        <circle
          cx="64"
          cy="64"
          r="44"
          stroke="#C5A059"
          strokeWidth="0.75"
          strokeDasharray="2 3"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* Left Wing of "V": Pearl White with Qatar's 9-Point Flag Serration Motif */}
        <path d="M 28 35 L 45 35 L 64 86 L 51 86 Z" fill="url(#logoWhiteGrad)" />

        {/* Serrated Chevron Teeth on Left Wing (Qatari Al Adaam emblem) */}
        <polygon points="45,35 50.5,42.5 45,42.5" fill="#8A1538" />
        <polygon points="49.5,46.5 55,54 49.5,54" fill="#8A1538" />
        <polygon points="54,58 59.5,65.5 54,65.5" fill="#8A1538" />

        {/* Right Wing of "V": Ascending Gold Venture Vector (Capital Growth & Scale) */}
        <path d="M 64 86 L 77 86 L 102 22 L 85 22 Z" fill="url(#logoGoldGrad)" />

        {/* The "Q" Monogram Loop: Sweeping Golden Arc connecting base to apex */}
        <path
          d="M 68 80 C 82 82, 98 74, 98 55 C 98 44, 91 38, 83 38"
          stroke="url(#logoGoldGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Brilliant 8-Point Venture Star at the Q Zenith */}
        <g transform="translate(98, 48)">
          <polygon
            points="0,-8 2.2,-2.2 8,0 2.2,2.2 0,8 -2.2,2.2 -8,0 -2.2,-2.2"
            fill="#FFF8E0"
          />
          <polygon
            points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5"
            fill="#C5A059"
          />
        </g>

        {/* Doha Financial Center / Precision Base Pip */}
        <circle cx="64" cy="98" r="3.5" fill="url(#logoGoldGrad)" />
      </svg>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  language = 'en',
  variant = 'header',
  size = 'md',
  className = '',
  onClick
}) => {
  const isAr = language === 'ar';
  const isFooter = variant === 'footer';

  if (variant === 'mark') {
    return <LogoMark size={size} className={className} />;
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Brand Emblem */}
      <LogoMark size={isFooter ? 'md' : size} />

      {/* Typography & Brand Slogan */}
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`text-2xl font-black tracking-tight font-serif ${
              isFooter ? 'text-white' : 'text-[#1E1919]'
            }`}
          >
            Ventures
            <span className="text-[#8A1538] group-hover:text-[#A11B43] transition-colors">
              .qa
            </span>
          </span>

          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
              isFooter
                ? 'bg-[#2D2224] text-[#C5A059] border-[#C5A059]/30'
                : 'bg-[#8A1538]/10 text-[#8A1538] border-[#8A1538]/20'
            }`}
          >
            {isAr ? 'دولة قطر' : 'Qatar'}
          </span>
        </div>

        {variant !== 'compact' && (
          <p
            className={`text-[11px] font-medium tracking-wide ${
              isFooter ? 'text-[#A69999]' : 'text-[#7A6D6D]'
            }`}
          >
            {isAr
              ? 'استخبارات رأس المال الخاص والشركات الناشئة'
              : 'Private Capital & Startup Intelligence'}
          </p>
        )}
      </div>
    </div>
  );
};
