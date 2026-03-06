# Watch Widget — Xeneon Plugin Demo

A demo plugin that adds a configurable watch widget to Xeneon Touch UI. Shows real-world patterns for building plugins with widgets, actions, and persistent storage.

## What It Does

- **Watch widget type** — Analog or digital clock display with timezone support
- **3 actions** — Toggle style, set timezone, show current time
- **Storage** — Persists user preferences (style, timezone) across restarts
- **Config options** — Style, 12/24h format, show seconds, show date, timezone, accent color

## Patterns Demonstrated

| Pattern | Where | What You Learn |
|---------|-------|---------------|
| Widget registration | `src/widgets/watch.ts` | `registerWidget()` with sizes, config, defaults |
| Action with parameters | `src/actions.ts` | `select` parameter type, categories, icons |
| Plugin storage | `src/index.ts`, `src/actions.ts` | `api.storage.get/set` for persistence |
| Logger | Throughout | `api.logger.info/debug` for debugging |
| Plugin lifecycle | `src/index.ts` | `onload`/`onunload` pattern |

## Setup

```bash
npm install
npm run build
```

## Install Locally

```bash
# macOS/Linux
ln -s $(pwd) ~/.xeneon/plugins/demo.watch-widget

# Windows
mklink /D %USERPROFILE%\.xeneon\plugins\demo.watch-widget %CD%
```

Restart Xeneon. The "Watch" widget type appears in the Add Widget wizard, and 3 new actions appear in the Command Palette under the "Watch" category.

## Widget Config

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `style` | `'analog' \| 'digital'` | `'digital'` | Display mode |
| `showSeconds` | boolean | `true` | Show seconds |
| `use24Hour` | boolean | `true` | 24-hour format (digital) |
| `timezone` | string | `''` (local) | IANA timezone ID |
| `showDate` | boolean | `false` | Show date below time |
| `accentColor` | string | `''` (theme) | Custom accent color |

## Renderer Component

This demo registers the widget type and actions in the main process. The actual React component for rendering the watch face would be registered in the renderer via `pluginComponentRegistry`. For now, the widget displays using the default plugin widget fallback.

A full renderer component implementation would look like:

```typescript
// In renderer/plugins — not part of this demo
pluginComponentRegistry.registerComponent('demo.watch-widget.watch', {
  component: WatchWidget,        // Your React component
  configPanel: WatchConfigPanel,  // Optional config panel
});
```

## Validate & Package

```bash
xeneon plugin validate .
xeneon plugin pack .
xeneon plugin publish .
```

## License

MIT
