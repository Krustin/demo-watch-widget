import type { PluginAPI } from './types';

/**
 * Watch-related actions.
 *
 * Demonstrates:
 * - Actions with select parameters
 * - Using plugin storage to persist preferences
 * - Action categories for Command Palette grouping
 */

const TIMEZONE_OPTIONS = [
  { label: 'Local', value: '' },
  { label: 'UTC', value: 'UTC' },
  { label: 'New York (EST)', value: 'America/New_York' },
  { label: 'London (GMT)', value: 'Europe/London' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
];

export function registerWatchActions(api: PluginAPI): void {
  // Toggle watch style (analog/digital)
  api.registerAction({
    id: 'toggle-style',
    name: 'Toggle Watch Style',
    category: 'Watch',
    description: 'Switch between analog and digital watch display',
    icon: 'Clock',
    async execute() {
      const current = await api.storage.get<string>('lastStyle');
      const next = current === 'analog' ? 'digital' : 'analog';
      await api.storage.set('lastStyle', next);
      api.logger.info(`Watch style set to: ${next}`);
    },
  });

  // Set timezone via parameter
  api.registerAction({
    id: 'set-timezone',
    name: 'Set Watch Timezone',
    category: 'Watch',
    description: 'Change the timezone displayed by watch widgets',
    icon: 'Globe',
    parameters: [
      {
        name: 'timezone',
        type: 'select',
        label: 'Timezone',
        description: 'Select a timezone for the watch display',
        required: true,
        default: '',
        options: TIMEZONE_OPTIONS,
      },
    ],
    async execute(params) {
      const tz = (params?.timezone as string) || '';
      await api.storage.set('timezone', tz);
      const label = TIMEZONE_OPTIONS.find((o) => o.value === tz)?.label || tz || 'Local';
      api.logger.info(`Watch timezone set to: ${label}`);
    },
  });

  // Quick action: show current time in log
  api.registerAction({
    id: 'show-time',
    name: 'Show Current Time',
    category: 'Watch',
    description: 'Log the current time to the console',
    icon: 'Clock',
    async execute() {
      const tz = await api.storage.get<string>('timezone');
      const now = new Date();
      const timeStr = tz
        ? now.toLocaleTimeString('en-US', { timeZone: tz })
        : now.toLocaleTimeString();
      api.logger.info(`Current time: ${timeStr}`);
    },
  });
}
