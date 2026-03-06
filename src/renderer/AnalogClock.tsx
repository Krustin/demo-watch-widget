import React from 'react';

interface AnalogClockProps {
  hours: number;
  minutes: number;
  seconds: number;
  showSeconds: boolean;
  showDate: boolean;
  dateString: string;
  accentColor: string;
}

const HOUR_NUMBERS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const AnalogClock: React.FC<AnalogClockProps> = ({
  hours,
  minutes,
  seconds,
  showSeconds,
  showDate,
  dateString,
  accentColor,
}) => {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  const accent = accentColor || '#3b82f6';
  const accentDim = accentColor ? `${accentColor}88` : '#3b82f688';

  return (
    <svg viewBox="0 0 200 200" className="watch-analog">
      <defs>
        {/* Glow filters */}
        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-hand" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Outer ring gradient */}
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="100" cy="100" r="96" fill="none" stroke="url(#ring-grad)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="94" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.15" />

      {/* Minute tick marks */}
      {Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null;
        const angle = (i * 6 * Math.PI) / 180;
        return (
          <line
            key={`tick-${i}`}
            x1={100 + 88 * Math.sin(angle)}
            y1={100 - 88 * Math.cos(angle)}
            x2={100 + 91 * Math.sin(angle)}
            y2={100 - 91 * Math.cos(angle)}
            stroke={accent}
            strokeWidth="0.5"
            opacity="0.25"
          />
        );
      })}

      {/* Glowing hour numbers */}
      {HOUR_NUMBERS.map((num, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r = 78;
        const x = 100 + r * Math.sin(angle);
        const y = 100 - r * Math.cos(angle);
        const isQuarter = num % 3 === 0;
        return (
          <text
            key={num}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={accent}
            fontSize={isQuarter ? 14 : 10}
            fontFamily="'SF Mono', 'Fira Code', monospace"
            fontWeight={isQuarter ? 700 : 400}
            filter={isQuarter ? 'url(#glow-strong)' : 'url(#glow-soft)'}
            opacity={isQuarter ? 1 : 0.7}
          >
            {num}
          </text>
        );
      })}

      {/* Hour hand — thick, rounded, subtle glow */}
      <line
        x1="100" y1="108" x2="100" y2="50"
        stroke="#e2e8f0"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#glow-hand)"
        transform={`rotate(${hourAngle}, 100, 100)`}
      />

      {/* Minute hand — thinner, longer */}
      <line
        x1="100" y1="108" x2="100" y2="30"
        stroke="#e2e8f0"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow-hand)"
        transform={`rotate(${minuteAngle}, 100, 100)`}
      />

      {/* Seconds hand — accent colored with strong glow */}
      {showSeconds && (
        <g filter="url(#glow-strong)" className="watch-seconds-hand">
          <line
            x1="100" y1="118" x2="100" y2="24"
            stroke={accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            transform={`rotate(${secondAngle}, 100, 100)`}
          />
        </g>
      )}

      {/* Center hub */}
      <circle cx="100" cy="100" r="5" fill="#0f172a" stroke={accent} strokeWidth="1.5" filter="url(#glow-soft)" />
      <circle cx="100" cy="100" r="2" fill={accent} filter="url(#glow-strong)" />

      {/* Date window */}
      {showDate && (
        <g>
          <rect x="120" y="93" width="32" height="14" rx="3" fill="#0f172a" stroke={accentDim} strokeWidth="0.5" />
          <text
            x="136" y="100"
            textAnchor="middle"
            dominantBaseline="central"
            fill={accent}
            fontSize="7"
            fontFamily="'SF Mono', 'Fira Code', monospace"
            filter="url(#glow-soft)"
            opacity="0.9"
          >
            {dateString.split(', ')[0]?.replace(/\w+ /, '') || dateString}
          </text>
        </g>
      )}
    </svg>
  );
};
