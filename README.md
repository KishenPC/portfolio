# Portfolio

An interactive engineering portfolio designed as a living software system.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Content:** MDX with frontmatter validation
- **Graph Engine:** Custom graph model with traversal and state management
- **Testing:** Vitest

## Development

```bash
npm install
npm run dev
```

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm test
```

## Structure

```
├── content/          # Authored content (projects, domains, timeline, architecture)
├── docs/             # Architecture and design documentation
├── src/
│   ├── app/          # Next.js App Router routes
│   ├── components/   # UI components (layout, navigation, content)
│   ├── config/       # Navigation and site configuration
│   ├── content/      # Content engine (schemas, loaders, registry, API)
│   ├── engine/       # Future engines (graph, scene, animation)
│   ├── lib/          # Utilities, constants, metadata
│   └── types/        # Shared TypeScript types
└── public/           # Static assets
```

## Documentation

- [Vision](docs/vision.md) — purpose, metaphor, and design philosophy
- [Architecture](docs/architecture.md) — component hierarchy and data flow
- [Content Model](docs/content-model.md) — entity definitions and relationships
- [Content Engine](docs/content-engine.md) — MDX pipeline and content registry
- [Graph Engine](docs/graph-engine.md) — knowledge graph model and algorithms
- [UI Spec](docs/ui-spec.md) — navigation, sections, and accessibility
- [Interaction Model](docs/interaction-model.md) — canonical interaction states
- [Animation Spec](docs/animation-spec.md) — motion principles and rules
- [Development Standards](docs/development-standards.md) — conventions and guidelines
- [Repository Guidelines](docs/repository-guidelines.md) — workflows and practices

## License

MIT
