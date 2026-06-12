# Animation Specification

## Purpose

Animation should help users understand the portfolio as a living software system. It should clarify relationships, guide attention, and make transitions feel coherent.

Animation must never become the content itself. It should enhance meaning without blocking interaction, slowing comprehension, or hiding important information.

## Animation Philosophy

Motion should be purposeful, restrained, and legible.

Use animation to:

- Reveal structure.
- Show cause and effect.
- Connect related entities.
- Preserve spatial continuity.
- Indicate state changes.
- Help users understand progression through time or systems.

Avoid animation that exists only to create spectacle. If removing an animation does not reduce clarity, the animation should be reconsidered.

## Allowed Animation Types

Reveals:

- Gradual introduction of sections or details as they become relevant.
- Small opacity or position transitions that support hierarchy.

State transitions:

- Clear feedback for selection, filtering, expansion, and navigation.
- Transitions that show how one view relates to the next.

Relationship motion:

- Lines, nodes, or spatial elements that communicate dependency, flow, or grouping.
- Motion that helps explain how systems connect.

Timeline motion:

- Progression that reinforces chronology.
- Scroll-linked movement that supports narrative context.

Microinteractions:

- Button, control, and focus feedback.
- Small confirmations for user action.

3D camera movement:

- Controlled movement that improves spatial understanding.
- Must remain calm and interruptible.

## Forbidden Animation Types

The following motion patterns should be avoided:

- Animations that block scrolling or navigation.
- Long intro sequences before content is available.
- Decorative motion unrelated to content.
- Rapid flashing or strobing.
- Scroll hijacking that removes user control.
- Forced smooth scrolling for every navigation action.
- Parallax effects that reduce readability.
- Cursor-following effects that distract from content.
- Animations that depend on hover as the only way to reveal important information.
- Canvas-only transitions that hide accessible content.

Motion must never delay access to primary content.

## GSAP Usage Guidelines

GSAP should be used for animation orchestration when native CSS transitions are insufficient.

Use GSAP for:

- Coordinated timelines within a specific section.
- Complex sequencing that explains relationships.
- ScrollTrigger-driven progress where it supports content.
- Transitions involving SVG, canvas-adjacent overlays, or complex transforms.

Avoid using GSAP for:

- Basic hover or focus states.
- Simple color or opacity transitions that CSS can handle.
- Global effects that are difficult to clean up.
- Layout behavior that should be handled by document flow.

GSAP timelines should be scoped to the smallest useful interface area. Animations should be reversible or safely reset when users navigate away, resize, or change preferences.

## ScrollTrigger Guidelines

ScrollTrigger should support storytelling, not control it completely.

Allowed ScrollTrigger uses:

- Progress indicators for timeline or system exploration.
- Section-based reveal sequences.
- Relationship highlights as relevant content enters view.
- Pinning only when it improves understanding and remains comfortable.

ScrollTrigger constraints:

- Do not trap users inside pinned sections for excessive scroll distances.
- Do not require precise scroll positions to access content.
- Do not hide controls during scroll-linked sequences.
- Ensure content order remains logical without animation.
- Respect reduced-motion preferences with simplified behavior.
- Recalculate safely on resize and content changes.

Scroll-based animation should feel like guided reading, not a forced ride.

## Interaction Requirements

Animations must never block interaction.

All animated regions should:

- Keep controls usable during transitions where possible.
- Provide immediate feedback to user input.
- Avoid disabling interaction unless there is a clear, brief state transition.
- Preserve focus location and keyboard flow.
- Avoid unexpected layout shifts.

When interaction and animation conflict, interaction wins.

## Performance Requirements

Motion should preserve performance across device classes.

Requirements:

- Prefer transform and opacity for frequent animation.
- Avoid animating layout-heavy properties.
- Limit simultaneous animated elements.
- Defer heavy animation systems until needed.
- Keep expensive 3D or canvas work isolated.
- Provide reduced-motion and lower-cost fallbacks.

An animation that makes the portfolio feel slower or harder to read is a failed animation.
