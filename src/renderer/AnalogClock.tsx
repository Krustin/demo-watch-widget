import React from 'react';

interface AnalogClockProps {
  hours: number;
  minutes: number;
  seconds: number;
  showSeconds: boolean;
  accentColor: string;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({
  hours,
  minutes,
  seconds,
  showSeconds,
  accentColor,
}) => {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  const accent = accentColor || 'var(--xeneon-accent, #3b82f6)';

  return (
    <svg viewBox="0 0 200 200" className="watch-analog">
      {/* Face */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />

      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const isMajor = i % 3 === 0;
        const outerR = 90;
        const innerR = isMajor ? 78 : 82;
        return (
          <line
            key={i}
            x1={100 + innerR * Math.sin(angle)}
            y1={100 - innerR * Math.cos(angle)}
            x2={100 + outerR * Math.sin(angle)}
            y2={100 - outerR * Math.cos(angle)}
            stroke={isMajor ? accent : 'currentColor'}
            strokeWidth={isMajor ? 3 : 1.5}
            strokeLinecap="round"
            opacity={isMajor ? 1 : 0.5}
          />
        );
      })}

      {/* Hour hand */}
      <line
        x1="100" y1="100" x2="100" y2="45"
        stroke="currentColor" strokeWidth="4" strokeLinecap="round"
        transform={`rotate(${hourAngle}, 100, 100)`}
      />

      {/* Minute hand */}
      <line
        x1="100" y1="100" x2="100" y2="28"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        transform={`rotate(${minuteAngle}, 100, 100)`}
      />

      {/* Seconds hand */}
      {showSeconds && (
        <line
          x1="100" y1="115" x2="100" y2="22"
          stroke={accent} strokeWidth="1.2" strokeLinecap="round"
          className="watch-seconds-hand"
          transform={`rotate(${secondAngle}, 100, 100)`}
        />
      )}

      {/* Center dot */}
      <circle cx="100" cy="100" r="4" fill={accent} />
    </svg>
  );
};
