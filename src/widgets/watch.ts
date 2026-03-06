import type { PluginAPI } from '../types';

/**
 * Watch Widget Configuration
 *
 * This demonstrates:
 * - Widget type registration with multiple sizes
 * - Rich default config for the widget wizard
 * - Config panel options (style, timezone, 12/24h, show seconds)
 */

/** Default config for the watch widget */
export const WATCH_DEFAULT_CONFIG = {
  /** Display style: 'analog' or 'digital' */
  style: 'digital' as const,
  /** Show seconds hand/digits */
  showSeconds: true,
  /** Use 24-hour format (digital only) */
  use24Hour: true,
  /** IANA timezone (empty = local) */
  timezone: '',
  /** Show date below time */
  showDate: false,
  /** Accent color override (empty = theme accent) */
  accentColor: '',
};

export type WatchConfig = typeof WATCH_DEFAULT_CONFIG;

export function registerWatchWidget(api: PluginAPI): void {
  api.registerWidget({
    type: 'watch',
    name: 'Watch',
    description: 'Analog or digital watch with timezone support',
    icon: 'Clock',
    allowedSizes: ['Tiny', 'Small', 'Medium', 'Wide'],
    defaultSize: 'Small',
    defaultConfig: { ...WATCH_DEFAULT_CONFIG },
    defaultLabel: 'Watch',
    defaultIcon: 'Clock',
  });
}
