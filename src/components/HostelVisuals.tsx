import React from 'react';

interface RoomVisualProps {
  type: 'single' | 'double' | 'triple' | 'penthouse';
  className?: string;
  badgeText?: string;
}

export const RoomVisual: React.FC<RoomVisualProps> = ({ type, className = '', badgeText }) => {
  return (
    <div className={`relative overflow-hidden bg-stone-900 select-none ${className}`}>
      {/* Architectural schematic illustration */}
      <svg
        viewBox="0 0 400 250"
        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {type === 'single' && (
              <>
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </>
            )}
            {type === 'double' && (
              <>
                <stop offset="0%" stopColor="#1c1917" />
                <stop offset="100%" stopColor="#292524" />
              </>
            )}
            {type === 'triple' && (
              <>
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </>
            )}
            {type === 'penthouse' && (
              <>
                <stop offset="0%" stopColor="#2e1065" />
                <stop offset="100%" stopColor="#18181b" />
              </>
            )}
          </linearGradient>

          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Backdrop */}
        <rect width="400" height="250" fill={`url(#grad-${type})`} />
        <rect width="400" height="250" fill="url(#grid-pattern)" />

        {/* Room Architectural Floorplan Perspective */}
        {/* Wall & Window glow */}
        <path d="M 30 40 L 370 40 L 370 210 L 30 210 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        
        {/* Window with light rays */}
        <rect x="140" y="36" width="120" height="8" fill="#fef08a" opacity="0.8" rx="2" />
        <polygon points="140,44 100,160 300,160 260,44" fill="rgba(254, 240, 138, 0.08)" />

        {/* Bed 1 */}
        <g transform="translate(50, 70)">
          <rect width="80" height="110" rx="6" fill="#334155" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <rect x="6" y="6" width="68" height="30" rx="3" fill="#cbd5e1" opacity="0.9" />
          <rect x="14" y="10" width="52" height="14" rx="2" fill="#94a3b8" />
          <line x1="6" y1="46" x2="74" y2="46" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="40" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui" fontWeight="600">
            BED 1
          </text>
        </g>

        {/* Single or Double Bed Configuration */}
        {(type === 'double' || type === 'triple') && (
          <g transform="translate(270, 70)">
            <rect width="80" height="110" rx="6" fill="#334155" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect x="6" y="6" width="68" height="30" rx="3" fill="#cbd5e1" opacity="0.9" />
            <rect x="14" y="10" width="52" height="14" rx="2" fill="#94a3b8" />
            <line x1="6" y1="46" x2="74" y2="46" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,2" />
            <text x="40" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui" fontWeight="600">
              BED 2
            </text>
          </g>
        )}

        {type === 'triple' && (
          <g transform="translate(160, 70)">
            <rect width="80" height="110" rx="6" fill="#334155" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect x="6" y="6" width="68" height="30" rx="3" fill="#cbd5e1" opacity="0.9" />
            <rect x="14" y="10" width="52" height="14" rx="2" fill="#94a3b8" />
            <line x1="6" y1="46" x2="74" y2="46" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,2" />
            <text x="40" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui" fontWeight="600">
              BED 3
            </text>
          </g>
        )}

        {/* Study Desk & Chair for Single / Suite */}
        {type === 'single' && (
          <g transform="translate(240, 70)">
            <rect width="110" height="60" rx="4" fill="#475569" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect x="15" y="12" width="30" height="20" rx="2" fill="#64748b" />
            <circle cx="90" cy="22" r="6" fill="#f59e0b" />
            <text x="55" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="system-ui">
              Study Workstation
            </text>
            <circle cx="55" cy="85" r="14" fill="#334155" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <path d="M 45 85 Q 55 95 65 85" fill="none" stroke="#94a3b8" strokeWidth="2" />
          </g>
        )}

        {type === 'penthouse' && (
          <g transform="translate(200, 60)">
            <rect width="150" height="130" rx="8" fill="rgba(217, 119, 6, 0.08)" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="275" y="115" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="system-ui" fontWeight="600">
              Private Rooftop Terrace
            </text>
            <text x="275" y="135" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="system-ui">
              Panoramic City View
            </text>
          </g>
        )}

        {/* Attached Washroom indicator */}
        <g transform="translate(310, 160)">
          <rect width="50" height="40" rx="4" fill="#0f172a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="25" y="24" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="system-ui" fontWeight="600">
            ATTACHED
          </text>
          <text x="25" y="32" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="system-ui">
            BATH + GEYSER
          </text>
        </g>

        {/* Ambient lighting warm gradient */}
        <circle cx="200" cy="125" r="90" fill="url(#sun-glow)" opacity="0.1" />
      </svg>

      {/* Floating Pill-free tag */}
      {badgeText && (
        <div className="absolute top-3 right-3 bg-stone-900/90 border border-stone-700/80 text-amber-300 text-[11px] font-medium px-2.5 py-1 rounded tracking-wide backdrop-blur-sm">
          {badgeText}
        </div>
      )}

      {/* Floor specification note */}
      <div className="absolute bottom-2 left-3 text-[11px] text-stone-400 font-mono flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>VERIFIED INDORE CAMPUS SPEC</span>
      </div>
    </div>
  );
};

export const BuildingFacadeVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden bg-stone-950 rounded-2xl border border-stone-800 shadow-xl ${className}`}>
      <svg
        viewBox="0 0 600 380"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="facadeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="50%" stopColor="#292524" />
            <stop offset="100%" stopColor="#1c1917" />
          </linearGradient>
        </defs>

        {/* Night / Sunset Sky */}
        <rect width="600" height="380" fill="url(#skyGrad)" />

        {/* Stars / Ambient dots */}
        <circle cx="80" cy="40" r="1" fill="#fff" opacity="0.6" />
        <circle cx="200" cy="25" r="1.5" fill="#fff" opacity="0.8" />
        <circle cx="450" cy="30" r="1" fill="#fff" opacity="0.5" />
        <circle cx="520" cy="60" r="1.2" fill="#fff" opacity="0.7" />

        {/* Building Exterior Main Block */}
        <rect x="120" y="80" width="360" height="260" fill="url(#facadeGrad)" stroke="#44403c" strokeWidth="2" />

        {/* Terrace Parapet */}
        <rect x="110" y="70" width="380" height="15" fill="#0c0a09" stroke="#78716c" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#d97706" fontSize="13" fontFamily="system-ui" fontWeight="700" letterSpacing="2">
          THE CLASSIC LIVING
        </text>
        <text x="300" y="47" textAnchor="middle" fill="#a8a29e" fontSize="9" fontFamily="system-ui" letterSpacing="1">
          SHRIRAM NAGAR · INDORE
        </text>

        {/* Floor 4 Windows (Penthouse level) */}
        <g transform="translate(150, 95)">
          {[0, 1, 2, 3].map((i) => (
            <g key={`f4-${i}`} transform={`translate(${i * 75}, 0)`}>
              <rect width="50" height="36" rx="2" fill="#fef08a" opacity="0.85" stroke="#78716c" strokeWidth="1" />
              <line x1="25" y1="0" x2="25" y2="36" stroke="#44403c" strokeWidth="1" />
              <line x1="0" y1="18" x2="50" y2="18" stroke="#44403c" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Floor 3 Windows */}
        <g transform="translate(150, 145)">
          {[0, 1, 2, 3].map((i) => (
            <g key={`f3-${i}`} transform={`translate(${i * 75}, 0)`}>
              <rect width="50" height="36" rx="2" fill={i === 1 ? '#bae6fd' : '#fef08a'} opacity="0.8" stroke="#78716c" strokeWidth="1" />
              <line x1="25" y1="0" x2="25" y2="36" stroke="#44403c" strokeWidth="1" />
              <line x1="0" y1="18" x2="50" y2="18" stroke="#44403c" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Floor 2 Windows */}
        <g transform="translate(150, 195)">
          {[0, 1, 2, 3].map((i) => (
            <g key={`f2-${i}`} transform={`translate(${i * 75}, 0)`}>
              <rect width="50" height="36" rx="2" fill="#fef08a" opacity={i === 2 ? '0.4' : '0.85'} stroke="#78716c" strokeWidth="1" />
              <line x1="25" y1="0" x2="25" y2="36" stroke="#44403c" strokeWidth="1" />
              <line x1="0" y1="18" x2="50" y2="18" stroke="#44403c" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Floor 1 & Ground Reception */}
        <g transform="translate(150, 245)">
          {[0, 1, 2].map((i) => (
            <g key={`f1-${i}`} transform={`translate(${i * 75}, 0)`}>
              <rect width="50" height="36" rx="2" fill="#fef08a" opacity="0.9" stroke="#78716c" strokeWidth="1" />
              <line x1="25" y1="0" x2="25" y2="36" stroke="#44403c" strokeWidth="1" />
              <line x1="0" y1="18" x2="50" y2="18" stroke="#44403c" strokeWidth="1" />
            </g>
          ))}
          {/* Main Glass Door Entry */}
          <g transform="translate(225, 10)">
            <rect width="60" height="85" fill="#38bdf8" opacity="0.3" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="30" y1="0" x2="30" y2="85" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="26" cy="45" r="2" fill="#e2e8f0" />
            <circle cx="34" cy="45" r="2" fill="#e2e8f0" />
            <text x="30" y="-5" textAnchor="middle" fill="#f8fafc" fontSize="7" fontFamily="system-ui" fontWeight="600">
              MAIN ENTRANCE
            </text>
          </g>
        </g>

        {/* Street & Landscaping */}
        <rect x="0" y="340" width="600" height="40" fill="#09090b" />
        <line x1="0" y1="340" x2="600" y2="340" stroke="#78716c" strokeWidth="2" />
        
        {/* Potted plants at entrance */}
        <g transform="translate(340, 315)">
          <path d="M 5 25 L 15 25 L 18 12 L 2 12 Z" fill="#b45309" />
          <circle cx="10" cy="8" r="9" fill="#15803d" />
        </g>
        <g transform="translate(230, 315)">
          <path d="M 5 25 L 15 25 L 18 12 L 2 12 Z" fill="#b45309" />
          <circle cx="10" cy="8" r="9" fill="#15803d" />
        </g>
      </svg>

      {/* Trust overlay marker */}
      <div className="absolute bottom-4 right-4 bg-stone-900/90 border border-stone-700/80 px-3 py-1.5 rounded-lg text-xs text-stone-300 backdrop-blur-md">
        <span className="font-semibold text-white">Priti Nagar, 24-B</span> · Shri Ram Nagar
      </div>
    </div>
  );
};
