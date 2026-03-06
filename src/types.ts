/**
 * Xeneon Plugin SDK Types
 * Standalone type definitions for external plugins.
 */

export interface Disposable {
  dispose(): void;
}

export interface XeneonPlugin {
  onload(api: PluginAPI): void | Promise<void>;
  onunload(): void | Promise<void>;
}

export interface PluginAPI {
  registerWidget(config: PluginWidgetRegistration): Disposable;
  registerAction(action: PluginActionDefinition): Disposable;
  registerSettingsTab(tab: PluginSettingsTab): Disposable;
  storage: PluginStorage;
  logger: PluginLogger;
  exec(command: string): Promise<{ stdout: string; stderr: string }>;
  ipc: {
    invoke(channel: string, ...args: unknown[]): Promise<unknown>;
  };
}

export interface PluginActionDefinition {
  id: string;
  absoluteId?: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  platforms?: ('win32' | 'darwin' | 'linux')[];
  parameters?: ActionParameter[];
  dangerous?: boolean;
  confirmationMessage?: string;
  execute: (params?: Record<string, unknown>) => Promise<void>;
}

export interface ActionParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  label: string;
  description?: string;
  required?: boolean;
  default?: unknown;
  options?: { label: string; value: string }[];
}

export interface PluginWidgetRegistration {
  type: string;
  absoluteType?: string;
  name: string;
  description: string;
  icon: string;
  allowedSizes: string[];
  defaultSize: string;
  defaultConfig: Record<string, unknown>;
  defaultLabel?: string;
  defaultIcon?: string;
}

export interface PluginSettingsTab {
  id: string;
  label: string;
  icon: string;
}

export interface PluginStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  keys(): Promise<string[]>;
  clear(): Promise<void>;
}

export interface PluginLogger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}
