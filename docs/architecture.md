# Architecture

## Purpose

This document defines the intended architecture for the future portfolio implementation. It describes boundaries, responsibilities, and integration strategies without introducing source code.

The architecture should support an interactive, content-driven portfolio where projects are modeled as systems and explored through relationships.

## Component Hierarchy

The future interface should be organized around a layered component model.

Application shell:

- Owns global layout structure.
- Provides persistent navigation surfaces.
- Coordinates theme, metadata, and global accessibility landmarks.
- Hosts high-level providers when needed.

Route-level views:

- Represent major portfolio sections.
- Own page-level data requirements.
- Compose feature sections without embedding low-level behavior.

Feature sections:

- Represent meaningful product areas such as system overview, project exploration, timeline, writing, or skill graph.
- Encapsulate interaction patterns specific to each area.
- Remain independent enough to be reordered or reused.

Visualization modules:

- Render graph, timeline, simulation, and spatial exploration experiences.
- Receive normalized data from content or service layers.
- Avoid owning content parsing or external API concerns.

Primitive components:

- Provide reusable interface building blocks.
- Remain presentational and predictable.
- Avoid project-specific business logic.

Content components:

- Render MDX-driven content blocks.
- Support consistent typography, callouts, technical annotations, and structured project narratives.

## Data Flow

Data should move through the system in a predictable direction.

Authoritative sources:

- MDX content for curated project, writing, timeline, and experience data.
- Structured local metadata for relationships and taxonomy.
- GitHub API responses for live or periodically refreshed repository activity.

Processing layer:

- Validates source data.
- Normalizes entities into shared content models.
- Resolves relationships between domains, projects, skills, timeline events, and experiences.
- Produces view-ready data for UI and visualization modules.

Presentation layer:

- Receives prepared data.
- Does not parse raw MDX metadata directly inside deeply nested UI.
- Does not call the GitHub API directly from visual components.
- Treats missing optional data gracefully.

The architecture should keep content modeling separate from rendering and interaction logic.

## Rendering Strategy

The portfolio should use a hybrid rendering model appropriate for content-heavy and interactive experiences.

Static rendering:

- Use for stable content such as project narratives, domain pages, writing, and timeline foundations.
- Prefer precomputed content relationships where possible.
- Keep baseline content available without client-side interaction.

Server rendering:

- Use for data preparation, metadata, and pages that benefit from search visibility.
- Keep server responsibilities focused on content assembly and external data access.

Client rendering:

- Use for interactive visualizations, graph exploration, motion orchestration, and 3D scenes.
- Isolate client-only behavior behind explicit boundaries.
- Avoid turning entire routes into client-rendered surfaces unless the route truly requires it.

Progressive enhancement:

- The experience should remain understandable when advanced animation or 3D is unavailable.
- Critical content should not depend on canvas-only rendering.
- Motion and spatial layers should enrich the experience rather than become the only way to navigate.

## Three.js Integration Strategy

Three.js should be treated as a visualization layer, not as the foundation of the entire application.

React Three Fiber should own React integration for 3D scenes. Drei should provide established helpers where they reduce complexity.

Three.js boundaries:

- 3D scenes should live in dedicated visualization modules.
- Scene state should be separated from global content state.
- Heavy assets should be lazy-loaded.
- Canvas rendering should never be required to access core portfolio content.
- Fallback views should exist for unsupported devices or reduced-capability contexts.

Scene responsibilities:

- Communicate relationships, systems, flow, or spatial models.
- Avoid purely decorative use when it adds performance cost without meaning.
- Expose accessible alternatives for important information.

Performance responsibilities:

- Limit draw calls and expensive post-processing.
- Use adaptive quality where appropriate.
- Respect reduced-motion preferences.
- Avoid blocking the main content path.

## GSAP Integration Strategy

GSAP should be used as an orchestration tool for meaningful transitions and scroll-linked storytelling.

GSAP boundaries:

- Keep animation setup close to the interactive section it supports.
- Avoid global animation timelines that make route behavior difficult to reason about.
- Clean up animations when sections unmount.
- Avoid mutating layout-critical state in ways that conflict with React rendering.

Animation responsibilities:

- Reveal hierarchy.
- Clarify system relationships.
- Guide attention during exploration.
- Preserve interaction availability.

GSAP should not be used to compensate for unclear content structure.

## MDX Architecture

MDX should serve as the primary format for curated narrative content.

MDX responsibilities:

- Store long-form project narratives.
- Support blog or essay content.
- Provide structured frontmatter for entity relationships.
- Allow controlled rich content components when needed.

Content boundaries:

- MDX files should not own application logic.
- Frontmatter should follow validated schemas.
- Shared content components should be limited, documented, and stable.
- Entity relationships should be modeled explicitly rather than inferred from prose.

The MDX system should support both human-authored storytelling and structured data extraction.

## GitHub API Architecture

GitHub data should supplement the portfolio with external activity signals.

Primary uses:

- Repository metadata.
- Contribution activity.
- Language and technology signals.
- Release or commit recency where relevant.
- Links between portfolio projects and public repositories.

Integration boundaries:

- API access should be isolated inside a service layer.
- UI components should consume normalized GitHub data, not raw API responses.
- Rate limits and failures should be expected.
- Cached or statically refreshed data should be preferred where possible.
- Secrets must never be exposed to the client.

GitHub data should not replace curated project narratives. It should provide supporting evidence and freshness.

## Cross-Cutting Architecture Requirements

Accessibility:

- Core content must be available outside canvas and animation layers.
- Keyboard navigation must be supported throughout major flows.
- Motion preferences must be respected.

Performance:

- Initial load should prioritize content and navigation.
- Heavy visualization layers should be deferred.
- Static content should be generated when possible.

Maintainability:

- Architecture decisions should be documented when they shape future constraints.
- Shared types should represent domain concepts clearly.
- Feature modules should have ownership boundaries.

Reliability:

- External data should fail gracefully.
- Optional enhancements should not break the core experience.
- Validation should happen close to data ingestion.
