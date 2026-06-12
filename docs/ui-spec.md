# UI Specification

## Purpose

This document defines the planned user interface model for the portfolio. It focuses on structure, hierarchy, accessibility, and responsive behavior rather than implementation details.

The interface should communicate engineering depth through exploration, relationships, and clarity.

## Navigation Model

Navigation should feel like moving through a software system.

Primary navigation:

- Provides stable access to the major portfolio areas.
- Remains predictable across routes and viewport sizes.
- Uses clear labels over novelty.
- Supports direct access for users who do not want to explore spatially.

Exploratory navigation:

- Allows users to move through relationships between domains, projects, skills, experiences, and timeline events.
- May be graph-like, timeline-based, or system-map based in later phases.
- Must always provide orientation and a way back to known structure.

Contextual navigation:

- Appears inside project, domain, or writing views.
- Highlights related systems, referenced skills, linked repositories, and adjacent timeline events.
- Helps users continue exploration without losing context.

Navigation must not depend exclusively on animation, canvas, hover, or precise pointer input.

## Major Sections

The portfolio should eventually include the following major sections.

System overview:

- Introduces the portfolio as an interconnected engineering system.
- Provides a high-level map of domains, projects, capabilities, and timeline.
- Helps users decide where to explore first.

Domains:

- Organizes work by engineering focus area.
- Expected domains include systems thinking, developer tools, AI infrastructure, full stack engineering, and software architecture.
- Shows how skills and projects cluster around each domain.

Projects:

- Presents projects as systems with architecture, constraints, tradeoffs, outcomes, and related artifacts.
- Avoids reducing projects to image cards.
- Supports both quick scanning and deeper inspection.

Knowledge graph:

- Shows relationships between projects, skills, experiences, domains, and writing.
- Helps visitors understand how knowledge compounds.
- Should include non-visual alternatives for accessibility.

Timeline:

- Shows career and project evolution over time.
- Emphasizes progression, decision points, and accumulated capability.
- Connects events to projects and domains.

Writing:

- Hosts technical essays, architecture notes, and reflections.
- Should be readable, linkable, and searchable.

About:

- Provides personal context, values, and collaboration signal.
- Should remain concise and grounded.

Contact:

- Provides clear ways to reach out.
- Should not interrupt exploration.

## Information Hierarchy

The interface should support three levels of information depth.

Level 1: orientation

- Who this engineer is.
- What domains define the work.
- What kinds of systems are represented.
- Where the visitor can go next.

Level 2: exploration

- How projects relate to skills, tools, and experiences.
- Which domains are strongest.
- How the timeline connects to technical growth.
- Which systems are worth deeper inspection.

Level 3: deep detail

- Architecture reasoning.
- Tradeoffs and constraints.
- Implementation notes.
- Failure modes, lessons, and outcomes.
- Repository and artifact references.

The UI should let visitors move between these levels without feeling trapped in a linear presentation.

## Responsive Behavior

The portfolio should be designed mobile-first but not mobile-limited.

Small viewports:

- Prioritize readable content, clear navigation, and sequential exploration.
- Replace dense graph or spatial interactions with accessible list, timeline, or grouped views.
- Avoid hover-only interactions.
- Keep tap targets comfortable and consistent.

Medium viewports:

- Support split views where useful.
- Allow contextual panels alongside primary content when space permits.
- Preserve orientation cues as users explore.

Large viewports:

- Use space to show relationships, maps, and parallel context.
- Avoid excessive empty spectacle.
- Keep reading widths comfortable.
- Ensure visualizations remain anchored to useful information.

Across all viewports:

- Text must remain legible.
- Layout must not shift unexpectedly during interaction.
- Critical controls must remain reachable.
- Canvas and animation layers must not hide essential content.

## Accessibility Requirements

Accessibility is a core requirement, not an enhancement.

Navigation:

- All primary interactions must be keyboard accessible.
- Focus states must be visible and consistent.
- Users must be able to bypass repeated navigation.
- Interactive regions must have clear names and roles.

Content:

- Important content must be available as text.
- Headings must follow a logical order.
- Link text must describe its destination.
- Technical terms should be understandable from context.

Motion:

- Respect reduced-motion preferences.
- Avoid motion that causes disorientation.
- Do not make animation required to understand or access content.

Visual design:

- Maintain sufficient color contrast.
- Do not rely on color alone to communicate state.
- Support zoomed text and browser scaling.
- Avoid overlapping text and controls.

3D and canvas:

- Provide accessible alternatives for any meaningful visual data.
- Ensure canvas interactions do not trap focus.
- Avoid making core navigation canvas-only.
