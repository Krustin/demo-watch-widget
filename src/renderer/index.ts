export { WatchWidget } from './WatchWidget';

/**
 * Register the watch widget component with Xeneon's renderer.
 *
 * Call this from the renderer entry point:
 *   import { registerWatchComponent } from './renderer';
 *   registerWatchComponent();
 */
export function registerWatchComponent(): void {
  // pluginComponentRegistry is provided by the Xeneon renderer runtime
  const registry = (globalThis as Record<string, unknown>).pluginComponentRegistry as
    | { registerComponent(pluginId: string, widgetType: string, component: unknown): void }
    | undefined;

  if (registry) {
    // Lazy import to avoid pulling React into the main process bundle
    const { WatchWidget } = require('./WatchWidget');
    registry.registerComponent('demo.watch-widget', 'watch', WatchWidget);
  }
}
