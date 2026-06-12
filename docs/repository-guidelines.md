# Repository Guidelines

## Purpose

These guidelines define how the repository should be maintained as the portfolio grows from planning into implementation.

The repository should remain clear, reviewable, and safe to evolve.

## Branching

Recommended branch categories:

- `main` for production-ready work.
- `feature/*` for new implementation phases or capabilities.
- `docs/*` for documentation-focused changes.
- `fix/*` for bug fixes.
- `chore/*` for maintenance and tooling.

Branches should stay focused on one meaningful change.

## Commits

Commits should explain intent.

Guidelines:

- Use concise, descriptive commit messages.
- Keep unrelated changes separate.
- Avoid mixing formatting churn with functional changes.
- Mention documentation changes when they affect architecture or process.

Preferred commit style:

- `docs: add architecture planning`
- `feat: add mdx content pipeline`
- `fix: handle missing repository metadata`
- `chore: configure lint workflow`

## Pull Requests

Pull requests should be small enough to review with confidence.

Each pull request should include:

- Summary of what changed.
- Reason for the change.
- Screenshots or recordings for UI changes when applicable.
- Testing or verification notes.
- Documentation updates when architecture, content, or workflow changes.

Review should prioritize correctness, accessibility, performance, maintainability, and alignment with the project vision.

## Issues

Issues should describe the problem or opportunity clearly.

Useful issue details:

- Context.
- Desired outcome.
- Constraints.
- Relevant documents.
- Acceptance criteria.

Large initiatives should map back to roadmap phases.

## Documentation Changes

Documentation is part of the product foundation.

Guidelines:

- Keep planning documents current.
- Avoid duplicating the same rule in many places.
- Use `docs/` for durable decisions and specifications.
- Use README for orientation and onboarding.
- Capture significant architectural tradeoffs before implementation hardens around them.

## GitHub Actions

GitHub Actions will be introduced in a later phase.

Expected workflow responsibilities:

- Type checking.
- Linting.
- Tests.
- Build verification.
- Accessibility checks where practical.
- Deployment validation.

Workflow files should be minimal, readable, and scoped to repository needs.

## Secrets and Environment

Secrets must never be committed.

Guidelines:

- Store tokens and private configuration in environment variables.
- Keep client-exposed variables intentionally limited.
- Document required environment variables when they are introduced.
- Use least-privilege tokens for GitHub API access.

## Dependencies

Dependencies should be added intentionally.

Guidelines:

- Prefer established libraries for complex domains such as 3D rendering, MDX processing, and animation orchestration.
- Avoid adding dependencies for trivial utilities.
- Review bundle impact for client-side packages.
- Keep experimental dependencies isolated until proven useful.

## Assets

Assets should support the content and technical story.

Guidelines:

- Keep public assets organized by purpose.
- Optimize images and media before production use.
- Avoid committing large unnecessary files.
- Prefer meaningful visuals over decorative filler.

## Release Readiness

Before production deployment, the repository should have:

- Passing validation workflows.
- Documented environment configuration.
- Performance review.
- Accessibility review.
- Production deployment checklist.
- Clear rollback or recovery notes.
