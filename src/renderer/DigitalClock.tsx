import React from 'react';

interface DigitalClockProps {
  hours: number;
  minutes: number;
  seconds: number;
  showSeconds: boolean;
  use24Hour: boolean;
  showDate: boolean;
  dateString: string;
  accentColor: string;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
  hours,
  minutes,
  seconds,
  showSeconds,
  use24Hour,
  showDate,
  dateString,
  accentColor,
}) => {
  const accent = accentColor || '#3b82f6';

  let displayHours = hours;
  let period = '';
  if (!use24Hour) {
    period = hours >= 12 ? 'PM' : 'AM';
    displayHours = hours % 12 || 12;
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  const glowStyle = {
    textShadow: `0 0 10px ${accent}, 0 0 20px ${accent}, 0 0 40px ${accent}80, 0 0 80px ${accent}40`,
    color: accent,
  };

  const dimGlowStyle = {
    textShadow: `0 0 6px ${accent}80, 0 0 12px ${accent}40`,
    color: accent,
  };

  return (
    <div className="watch-digital">
      <div className="watch-digital-time">
        <span className="watch-digital-digits" style={glowStyle}>
          {pad(displayHours)}
        </span>
        <span className="watch-digital-colon watch-digital-colon-blink" style={glowStyle}>
          :
        </span>
        <span className="watch-digital-digits" style={glowStyle}>
          {pad(minutes)}
        </span>
        {showSeconds && (
          <>
            <span className="watch-digital-colon" style={dimGlowStyle}>:</span>
            <span className="watch-digital-seconds" style={dimGlowStyle}>
              {pad(seconds)}
            </span>
          </>
        )}
        {!use24Hour && (
          <span className="watch-digital-period" style={dimGlowStyle}>{period}</span>
        )}
      </div>
      {showDate && (
        <div className="watch-digital-date" style={dimGlowStyle}>
          {dateString}
        </div>
      )}
    </div>
  );
};
