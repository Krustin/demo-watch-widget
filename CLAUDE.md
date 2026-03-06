# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Demo Xeneon Touch UI plugin that adds a configurable watch widget (analog/digital clock with timezone support). Demonstrates the Xeneon plugin SDK patterns: widget registration, actions, persistent storage, and plugin lifecycle.

Plugin ID: `demo.watch-widget` (defined in `manifest.json`).

## Build Commands

```bash
npm install        # Install dependencies (only typescript)
npm run build      # Compile TypeScript → dist/
npm run watch      # Compile in watch mode
npm run clean      # Remove dist/
```

No test runner or linter is configured.

## Architecture

- **`src/index.ts`** — Plugin entry point. Exports `plugin` object with `onload`/`onunload` lifecycle hooks. Registers widget and actions via `PluginAPI`.
- **`src/types.ts`** — Standalone Xeneon Plugin SDK type definitions (`PluginAPI`, `XeneonPlugin`, `PluginWidgetRegistration`, `PluginActionDefinition`, `PluginStorage`, etc.). These are local types, not from an npm package.
- **`src/widgets/watch.ts`** — Widget type registration (`registerWidget()`) with allowed sizes, default config, and icon.
- **`src/actions.ts`** — Three actions registered via `registerAction()`: toggle style, set timezone, show time. Demonstrates `select` parameter type and storage persistence.
- **`manifest.json`** — Xeneon plugin manifest with ID, platforms, and permissions.

## Key Patterns

- All plugin features register through `PluginAPI` methods (`registerWidget`, `registerAction`, `registerSettingsTab`)
- Registration returns `Disposable` objects for cleanup
- State persistence uses `api.storage.get/set` (async, generic-typed)
- Actions appear in Xeneon's Command Palette grouped by `category`
- Widget rendering happens in the renderer process via `pluginComponentRegistry` (not part of this demo)
- TypeScript strict mode is enabled; target is ES2022 with CommonJS modules

## Local Installation

Symlink into `~/.xeneon/plugins/demo.watch-widget` and restart Xeneon.
