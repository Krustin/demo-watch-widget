import React, { useState, useEffect } from 'react';
import { AnalogClock } from './AnalogClock';
import { DigitalClock } from './DigitalClock';
import './styles.css';

interface WatchWidgetConfig {
  style: 'analog' | 'digital';
  showSeconds: boolean;
  use24Hour: boolean;
  timezone: string;
  showDate: boolean;
  accentColor: string;
}

interface WatchWidgetProps {
  config: WatchWidgetConfig;
}

function getTimeParts(timezone: string) {
  const now = new Date();
  if (timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
    return { hours: get('hour'), minutes: get('minute'), seconds: get('second') };
  }
  return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
}

function getDateString(timezone: string): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...(timezone ? { timeZone: timezone } : {}),
  };
  return new Intl.DateTimeFormat('en-US', options).format(now);
}

export const WatchWidget: React.FC<WatchWidgetProps> = ({ config }) => {
  const { style, showSeconds, use24Hour, timezone, showDate, accentColor } = config;
  const [time, setTime] = useState(() => getTimeParts(timezone));
  const [dateStr, setDateStr] = useState(() => getDateString(timezone));

  useEffect(() => {
    const tick = () => {
      setTime(getTimeParts(timezone));
      setDateStr(getDateString(timezone));
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <div className="watch-widget">
      {style === 'analog' ? (
        <AnalogClock
          hours={time.hours}
          minutes={time.minutes}
          seconds={time.seconds}
          showSeconds={showSeconds}
          accentColor={accentColor}
        />
      ) : (
        <DigitalClock
          hours={time.hours}
          minutes={time.minutes}
          seconds={time.seconds}
          showSeconds={showSeconds}
          use24Hour={use24Hour}
          showDate={showDate}
          dateString={dateStr}
          accentColor={accentColor}
        />
      )}
    </div>
  );
};
