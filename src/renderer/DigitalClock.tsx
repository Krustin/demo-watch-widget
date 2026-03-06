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
  const accent = accentColor || 'var(--xeneon-accent, #3b82f6)';

  let displayHours = hours;
  let period = '';
  if (!use24Hour) {
    period = hours >= 12 ? 'PM' : 'AM';
    displayHours = hours % 12 || 12;
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  const timeStr = showSeconds
    ? `${pad(displayHours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(displayHours)}:${pad(minutes)}`;

  return (
    <div className="watch-digital">
      <div className="watch-digital-time" style={{ color: accent }}>
        <span className="watch-digital-digits">{timeStr}</span>
        {!use24Hour && <span className="watch-digital-period">{period}</span>}
      </div>
      {showDate && <div className="watch-digital-date">{dateString}</div>}
    </div>
  );
};
