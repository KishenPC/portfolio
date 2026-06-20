# AGENTS.md

## Source of truth (read first)

All planning and design docs live in `.docs/` and are **gitignored** — a fresh clone has no docs. Always read them before implementation decisions:

- `.docs/DESIGN.md` — visual language, color palette, typography scale, motion rules. The single source of truth for design.
- `.docs/PLAN.md` — implementation blueprint, architecture & section specs.
- `.docs/TASKS.md` — 25 executable tasks with commit messages, acceptance criteria, and STOP review gates. This is the task-by-task execution checklist.
- `.docs/PERSONAL_INFO.md` — real content facts (name, projects, experience, links).
- `.docs/REFERENCES.md` — design synthesis principles.

**Priority when conflicts arise:** `DESIGN.md` > `PERSONAL_INFO.md` > approved wireframe > `PLAN.md` > implementation assumptions. **Follow the documentation.** Never invent portfolio content — use placeholders where content is missing.

## Commands

```bash
npm run dev      # Next.js dev server
npm run build    # production build (run before perf checks)
npm run start    # serve production build
npm run lint     # next lint
```

No test framework yet (PLAN.md Phase 1 adds ESLint flat config + Prettier). TypeScript is **strict** — `tsc --noEmit` is the typecheck.

## Architecture quirks

- **Tailwind v4, CSS-first tokens.** There is no `tailwind.config.ts`. All design tokens (colors, fonts, spacing) are defined via `@theme` in `app/globals.css`. Generated utilities: `bg-bg`, `text-ink`, `text-ink-2`, `text-ink-3`, `border-line`, `bg-surface`, `text-accent`, `font-display`, `font-body`, `font-mono`.
- **Path alias `@/*` → `./*`** (root-relative, not `src/*`).
- **`app/wireframe/` is a frozen approved layout reference.** Do not modify it. Production components must match its hierarchy — keep it for lifetime diffing. `app/page.tsx` currently `redirect("/wireframe")`; the real homepage is built per PLAN.md Phase 7.
- **Fonts load via Fontshare CDN** in `app/layout.tsx` `<head>` (temporary — PLAN.md Phase 3 replaces with self-hosted `next/font`).
- **Stack:** Next.js 15 App Router, React 19, TypeScript strict, TailwindCSS v4. PLAN.md will add GSAP + Motion + shadcn/ui in later phases.

## Operational gotchas

- **`.next` cache corruption:** if `npm run dev` or `build` fails with `Cannot find module './XXX.js'` or React hydration errors (#418), delete `.next/` and restart. This happens after structural changes or when dev/build processes run concurrently.
- **Port conflicts:** if port 3000 is occupied, Next.js auto-selects another port — check the dev server output for the actual URL.

## Implementation rules

- **Content is data-driven.** Components import from `lib/data.ts` (planned), never directly from `content/` (planned). No hardcoded portfolio content in JSX. Use `[Placeholder]` text where content is missing.
- **Follow TASKS.md in order.** Each task is small, independently testable, and ends with a **STOP** review gate — do not start the next task until the current one is reviewed, tested, and committed manually.
- **Color palette is WCAG AA compliant** (see `.docs/DESIGN.md` Accessibility Rules). Muted `#6B7280` is for timestamps/eyebrows/indicators only — never for paragraph blocks. Accent `#4A6D8A` is for links/highlights only — never for large fills or colored sections.
- **Quality priority:** Readability > Hierarchy > Whitespace > Accessibility > Performance > Motion > Visual Novelty.
- **Motion is restrained.** Max 1–2 active animations per viewport. All motion gated by `prefers-reduced-motion`. Pinning/parallax disabled on mobile. See `.docs/DESIGN.md` Motion section.
