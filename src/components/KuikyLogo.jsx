import React from 'react';

export const KuikyLogo = ({ height = 38, showSubtitle = false, variant = 'dark', className = "" }) => {
  const textColor = variant === 'light' ? '#ffffff' : '#0f172a';
  const subtitleColor = variant === 'light' ? 'rgba(255, 255, 255, 0.75)' : '#64748b';

  return (
    <div 
      className={`kuiky-logo ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        userSelect: 'none',
        lineHeight: 1
      }}
    >
      <svg 
        height={height} 
        viewBox="0 0 165 42" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}px`, width: 'auto', display: 'block' }}
      >
        <g transform="skewX(-13)">
          {/* Speed Streaks trailing off left */}
          <rect x="14" y="11" width="18" height="3" rx="1.5" fill="#10a349" />
          <rect x="6" y="16" width="28" height="3.2" rx="1.6" fill="#10a349" />
          <rect x="9" y="21.5" width="26" height="3.2" rx="1.6" fill="#10a349" />
          <rect x="16" y="27" width="18" height="3" rx="1.5" fill="#10a349" />
          <rect x="22" y="32" width="12" height="2.8" rx="1.4" fill="#10a349" />

          {/* Letter K */}
          <path 
            d="M36 10h6.5v9.2l8.8-9.2h8.5l-10.2 10.5 11 14.5h-8.2l-7.4-10.2-2.5 2.6v7.6H36V10z" 
            fill={textColor} 
          />

          {/* Letter u */}
          <path 
            d="M65 17h6v7.8c0 3.2 1.6 4.8 4.2 4.8 2.8 0 4.6-1.6 4.6-4.8V17h6v18h-5.8v-2.8c-1.4 2-3.4 3.2-6 3.2-5.2 0-9-3.6-9-9.2V17z" 
            fill={textColor} 
          />

          {/* Letter i (Stem) */}
          <path 
            d="M90 17h6v18h-6V17z" 
            fill={textColor} 
          />

          {/* Letter i (Green Dot Circle) */}
          <circle cx="93" cy="11.5" r="4.2" fill="#10a349" />

          {/* Letter k */}
          <path 
            d="M101 10h6v12.2l5.8-5.2h7.6l-7.2 6.5 8 11.5h-7.2l-5.4-8.2-1.8 1.6v6.6h-6V10z" 
            fill={textColor} 
          />

          {/* Letter y */}
          <path 
            d="M123 17h6.2l3.6 10.4 3.5-10.4h6l-7.2 18.2c-1.8 4.5-4.4 6.4-8.5 6.4h-3.2v-5h2.2c1.8 0 3-.8 3.8-2.6l.8-2.2-7.2-14.8z" 
            fill={textColor} 
          />
        </g>
      </svg>
      {showSubtitle && (
        <span style={{
          fontSize: '0.66rem',
          fontWeight: 600,
          color: subtitleColor,
          letterSpacing: '0.02em',
          marginTop: '3px',
          paddingLeft: '6px'
        }}>
          Quick Help, Anytime
        </span>
      )}
    </div>
  );
};

export default KuikyLogo;
