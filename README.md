# PIXEL Platform

A modular foundation for evolving PIXEL from a standalone HTML game into a maintainable React + TypeScript application.

## Current status

This is the **new platform shell**, not a feature-complete replacement for the legacy game yet. The original `index.html.html` and `to-mau-online-standalone.html` files are intentionally preserved unchanged for comparison. Multiplayer behavior and the full coloring workflow have not been migrated in this first scaffold.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Start

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm test
npm run typecheck
npm run build
```

## Architecture

- `src/app`: application composition and top-level shell
- `src/components`: reusable presentation components
- `src/core/plugins`: typed plugin contract and registry
- `src/features/coloring`: reusable coloring-domain primitives
- `src/features/scoring`: scoring rules
- `src/themes`: theme tokens and theme application
- `docs/architecture.md`: architecture decisions and migration plan

## Extension principles

1. Features own their domain logic; shared UI belongs in components.
2. Core domain code should not depend on React.
3. Plugins register through a typed API rather than mutating global state.
4. Themes are data tokens applied through CSS custom properties.
5. Migrate legacy behavior incrementally and compare it against the preserved HTML version.

## Legacy reference

Open `to-mau-online-standalone.html` from the repository to inspect the existing standalone implementation. Do not delete or replace the legacy files until parity tests and a migration decision are complete.
