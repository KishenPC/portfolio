# Development Standards

## Purpose

These standards define how future source code should be organized, named, typed, and maintained. They are intended to keep the project coherent as it grows into a large-scale interactive portfolio.

No application code exists in Phase 0.

## TypeScript

TypeScript should be strict, explicit, and domain-driven.

Standards:

- Prefer precise types over broad types.
- Avoid `any` unless there is a documented boundary reason.
- Use `unknown` for untrusted data before validation.
- Model portfolio concepts with clear shared types.
- Keep external API response types separate from normalized application types.
- Prefer discriminated unions for state that has distinct modes.
- Keep type definitions close to their ownership boundary unless they are shared across features.
- Validate content and external data at ingestion boundaries.

Type names should describe domain meaning rather than UI placement.

## Component Naming

Components should be named by responsibility.

Conventions:

- Use PascalCase for component names.
- Use names that describe what the component represents.
- Avoid vague names such as `Section`, `Card`, or `Item` unless they are true primitives.
- Prefer domain-specific names when a component represents portfolio meaning.
- Keep layout primitives separate from feature-specific components.

Examples of acceptable naming direction:

- `ProjectSystemView` for a future project system visualization.
- `DomainOverview` for a future domain summary.
- `TimelineExplorer` for a future timeline interaction.

These are naming examples only, not implementation requirements.

## Folder Structure

The initial planned structure is:

```text
src/
|-- app/
|-- components/
|-- content/
|-- hooks/
|-- lib/
`-- types/
```

Folder responsibilities:

- `src/app`: Next.js App Router routes, layouts, metadata, and route-level composition.
- `src/components`: Reusable UI and feature components.
- `src/content`: MDX and structured content sources.
- `src/hooks`: Reusable client-side React hooks.
- `src/lib`: Framework-independent utilities, services, validation, and data processing.
- `src/types`: Shared TypeScript types for cross-feature domain concepts.

Future feature folders may be introduced when a section becomes complex enough to need local ownership of components, helpers, tests, and types.

## File Naming

File names should be predictable and searchable.

Conventions:

- Use kebab-case for general file names.
- Use PascalCase only when a framework or local convention strongly benefits from matching a component name.
- Use `.tsx` only for files that contain JSX.
- Use `.ts` for types, utilities, services, and data processing.
- Use `.mdx` for authored content.
- Use `.md` for documentation.

Suggested suffixes:

- `*.types.ts` for shared type definitions.
- `*.schema.ts` for validation schemas.
- `*.service.ts` for external service boundaries.
- `*.adapter.ts` for transformation between external and internal models.
- `*.test.ts` or `*.test.tsx` for tests when testing is introduced.

## Imports

Imports should communicate ownership and avoid fragile paths.

Standards:

- Prefer absolute imports once project configuration supports them.
- Keep imports ordered by external packages, internal modules, then local files.
- Avoid deep imports across feature boundaries.
- Avoid circular dependencies.
- Keep server-only modules out of client components.
- Keep external API clients isolated in service modules.
- Do not import raw content directly into deeply nested visual components.

Import structure should make data boundaries obvious.

## Error Handling

Errors should be handled close to the boundary where uncertainty enters the system.

Standards:

- Validate MDX frontmatter and structured content before rendering.
- Validate GitHub API responses before normalization.
- Treat optional content as normal, not exceptional.
- Provide useful fallback states for missing data.
- Avoid swallowing errors silently.
- Separate user-facing fallback messages from developer diagnostics.
- Never expose secrets, tokens, or sensitive request details to the client.

Failure modes should preserve the core portfolio experience wherever possible.

## State Management

State should be introduced only where needed.

Standards:

- Prefer server-derived data for stable content.
- Keep local UI state close to the component or feature that owns it.
- Avoid global state for data that does not need to be global.
- Separate content state from visualization interaction state.
- Keep URL state in mind for shareable filters or selected entities.

The project should avoid adding a state management library until the need is proven.

## Styling

Styling should support consistency, responsiveness, and accessibility.

Standards:

- Use Tailwind CSS according to a clear design token strategy.
- Avoid one-off visual decisions that cannot scale.
- Keep responsive behavior explicit.
- Do not rely on color alone for meaning.
- Treat focus states as designed states.
- Keep animation-related styling separate from structural layout where possible.

## Testing Direction

Testing will be introduced in later phases when implementation begins.

Expected coverage areas:

- Content schema validation.
- Data normalization.
- GitHub API adapters.
- Critical UI flows.
- Accessibility checks.
- Rendering fallbacks for animation and 3D features.

Tests should scale with risk and shared behavior.

## Documentation

Documentation should evolve with the system.

Standards:

- Update architecture docs when ownership boundaries change.
- Update the content model when entities or relationships change.
- Update UI and animation specs when interaction rules change.
- Keep implementation comments rare and useful.
- Prefer architectural notes for decisions with long-term consequences.
