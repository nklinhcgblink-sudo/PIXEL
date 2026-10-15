# PIXEL Platform architecture

## Direction

PIXEL uses a modular monolith first: one deployable web app, clear internal boundaries, and no premature service split. React renders the UI; TypeScript models the domain; Vite builds the app; Vitest covers pure logic.

## Dependency boundaries

- `app` composes features and shared UI.
- `components` contains reusable presentational pieces.
- `features/*` owns user-facing capabilities and domain logic.
- `core` contains cross-feature contracts, including the plugin API.
- `themes` owns design tokens, not game rules.
- Domain modules should remain framework-agnostic wherever practical.

## Plugin API foundation

A plugin has a stable `id`, display name, version, and optional lifecycle hooks. The registry rejects duplicate IDs and exposes read-only listing. This is an in-process extension point, **not a sandbox**: only load trusted plugins. A future external plugin ecosystem will need permission declarations, compatibility checks, and isolation.

## Theme system

Theme tokens are strongly typed and mapped to CSS custom properties. Components consume semantic variables instead of hard-coding palette colors. A theme switch is local UI state for now; persistence can be added separately.

## Migration plan

1. Establish the build, test, and type-check workflow.
2. Extract and test pure coloring/scoring primitives.
3. Port the current canvas and palette into isolated React components.
4. Put PeerJS behind a multiplayer adapter and test connection lifecycle behavior.
5. Validate feature parity against the preserved standalone HTML before retiring anything.
