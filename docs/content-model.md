# Content Model

## Purpose

This document defines the planned content entities for the portfolio and the relationships between them.

The content model should make the portfolio feel like an interconnected engineering system. It should support static content, MDX narratives, visual exploration, knowledge graph views, project simulations, and GitHub enrichment.

## Core Entities

## Domain

A Domain represents a major area of engineering focus.

Examples:

- Systems Thinking
- Developer Tools
- AI Infrastructure
- Full Stack Engineering
- Software Architecture

Responsibilities:

- Group related projects, skills, writing, and experience.
- Provide a high-level explanation of why the area matters.
- Help visitors understand the shape of the portfolio.

Relationships:

- Has many Projects.
- Has many Skills.
- Has many Blog entries.
- Has many TimelineEvents.
- May have related Domains.

## Project

A Project represents a built or planned system.

Responsibilities:

- Explain the system purpose.
- Describe architecture, constraints, decisions, tradeoffs, and outcomes.
- Link to related skills, timeline events, repositories, writing, and artifacts.
- Support both summary-level and deep technical exploration.

Relationships:

- Belongs to one or more Domains.
- Uses many Skills.
- Has many TimelineEvents.
- May have one or more GitHubRepository records.
- May reference Blog entries.
- May include ArchitectureDecision records.
- May include SystemNode records for future simulation or visualization.

## Blog

A Blog entry represents long-form technical writing.

Responsibilities:

- Communicate architecture thinking, lessons, technical decisions, or engineering reflections.
- Connect writing to projects and domains.
- Provide durable, linkable explanations.

Relationships:

- Belongs to one or more Domains.
- May reference Projects.
- May reference Skills.
- May reference TimelineEvents.

## TimelineEvent

A TimelineEvent represents a meaningful moment in the engineering journey.

Examples:

- Project started.
- Project shipped.
- Architecture changed.
- Major skill acquired.
- Tooling improved.
- Professional milestone reached.

Responsibilities:

- Show progression over time.
- Connect events to systems, skills, and experiences.
- Explain why a moment mattered.

Relationships:

- May belong to an Experience.
- May reference Projects.
- May reference Skills.
- May reference Domains.
- May reference Blog entries.

## Skill

A Skill represents a technical capability, practice, tool, or area of applied knowledge.

Examples:

- TypeScript
- System design
- API design
- CI automation
- AI application architecture
- React architecture

Responsibilities:

- Show capability depth.
- Connect practical skills to real projects.
- Help users understand how expertise compounds.

Relationships:

- Belongs to one or more Domains.
- Used by many Projects.
- May be demonstrated by Blog entries.
- May be acquired or deepened through TimelineEvents.
- May be associated with Experience records.

## Experience

An Experience represents a role, engagement, educational period, or sustained body of work.

Responsibilities:

- Provide professional and chronological context.
- Group timeline events and projects by period.
- Explain responsibilities, constraints, and growth.

Relationships:

- Has many TimelineEvents.
- May include Projects.
- Uses many Skills.
- May be associated with Domains.

## Supporting Entities

## ArchitectureDecision

An ArchitectureDecision captures a significant technical choice.

Responsibilities:

- Explain context, options, decision, consequences, and tradeoffs.
- Make engineering judgment visible.
- Connect decisions to projects and timeline events.

Relationships:

- Belongs to a Project.
- May reference Skills.
- May reference TimelineEvents.
- May reference Blog entries.

## GitHubRepository

A GitHubRepository represents external repository metadata associated with a project.

Responsibilities:

- Link portfolio projects to public engineering activity.
- Provide freshness signals such as recent updates, languages, or repository status.
- Support GitHub API enrichment.

Relationships:

- Belongs to one or more Projects.
- May provide metrics for Skills.
- May support TimelineEvents when releases or major updates matter.

## SystemNode

A SystemNode represents a conceptual part of a project system.

Examples:

- API boundary
- Database
- Worker
- UI layer
- Model integration
- Automation pipeline

Responsibilities:

- Support future project visualization and simulation.
- Describe how a project is decomposed.
- Connect technical components to decisions and skills.

Relationships:

- Belongs to a Project.
- May depend on other SystemNodes.
- May reference Skills.
- May be explained by ArchitectureDecision records.

## Artifact

An Artifact represents supporting evidence or output.

Examples:

- Repository link
- Demo link
- Diagram
- Screenshot
- Technical note
- Release note

Responsibilities:

- Provide proof or supporting context.
- Connect abstract claims to concrete work.

Relationships:

- May belong to a Project, Blog entry, Experience, or TimelineEvent.
- May reference a GitHubRepository.

## Entity Relationship Summary

Domains organize the portfolio at the highest level. Projects provide the central evidence of engineering capability. Skills explain reusable capability. Experiences and TimelineEvents provide chronology. Blog entries provide long-form reasoning. ArchitectureDecision records expose technical judgment. GitHubRepository records provide external activity signals. SystemNode records support future visualization and simulation.

The model should support many-to-many relationships where real engineering work overlaps multiple domains and skills.

## Modeling Principles

- Model relationships explicitly.
- Keep prose separate from structured metadata.
- Prefer stable identifiers over display names for relationships.
- Allow content to be rendered in multiple contexts.
- Treat missing optional data as normal.
- Keep curated narrative more important than automated metrics.
- Avoid turning the content model into a visual design model.
