import type { XeneonPlugin, PluginAPI } from './types';
import { registerWatchWidget } from './widgets/watch';
import { registerWatchActions } from './actions';

/**
 * Watch Widget Plugin
 *
 * Registers:
 * - A "watch" widget type (analog/digital clock with timezone support)
 * - Actions to toggle between analog/digital and cycle timezones
 *
 * This demo plugin shows how to:
 * 1. Register widget types with rich config
 * 2. Register actions that interact with plugin storage
 * 3. Use the storage API for persisting preferences
 * 4. Use the logger for debugging
 */
export const plugin: XeneonPlugin = {
  async onload(api: PluginAPI) {
    api.logger.info('Loading Watch Widget...');

    registerWatchWidget(api);
    registerWatchActions(api);

    // Load saved preference (demo of storage API)
    const lastStyle = await api.storage.get<string>('lastStyle');
    if (lastStyle) {
      api.logger.debug(`Last used watch style: ${lastStyle}`);
    }

    api.logger.info('Watch Widget loaded');
  },

  async onunload() {
    // Nothing to clean up — widget rendering is handled by the renderer
  },
};
