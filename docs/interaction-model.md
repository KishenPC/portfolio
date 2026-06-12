# Interaction Model

This document defines the canonical interaction states for the portfolio interface. It describes expected visual treatment, motion behavior, and accessibility requirements for each state without prescribing implementation details.

---

## States

### Idle

The default resting state. No interaction is in progress.

**Visual:** Default styling as defined by the design system. No emphasis or overlay.

**Motion:** None.

**Accessibility:** All content available to screen readers. Focus ring not visible.

---

### Hover

A pointer device is positioned over an interactive element.

**Visual:** Subtle background or border change. Color shift consistent with theme tokens. No layout shift.

**Motion:** CSS transition, duration ≤ 150ms. No transformations that affect surrounding layout.

**Accessibility:** No change to accessible name or role. Hover must not be the sole trigger for important information disclosure.

---

### Focus

An interactive element has keyboard focus.

**Visual:** Visible focus ring (2px solid, offset 4px) using the `--focus` token. High contrast against background. Must be distinguishable from hover state alone.

**Motion:** Instant appearance. No transition delay.

**Accessibility:** Focus order matches DOM order. Focusable elements have accessible names. Focus must never be trapped unexpectedly.

---

### Active

An interactive element is being pressed or selected.

**Visual:** Pressed state using darker/lighter variant of hover. Scale reduction ≤ 2% if used.

**Motion:** Duration ≤ 100ms. Ease-out curve.

**Accessibility:** Active state must be conveyed through more than color alone (e.g., border change or scale). Must be visible in forced-colors mode.

---

### Loading

Content or assets are being fetched or processed.

**Visual:** Skeleton placeholder or subtle loading indicator. Preserve approximate layout dimensions to prevent layout shift. Do not flash empty containers.

**Motion:** Subtle pulse animation (opacity 0.4–0.6 cycling). Respect `prefers-reduced-motion` — stop animation.

**Accessibility:** Announce loading state via `aria-busy` or `aria-live` region. Provide meaningful label for loading indicators.

---

### Empty

A section exists but has no content to display.

**Visual:** Centered message with muted styling. Descriptive text explaining the empty state and potential next action.

**Motion:** None.

**Accessibility:** Empty state message must be announced to screen readers. Heading structure should remain consistent.

---

### Error

A recoverable failure has occurred (e.g., data fetch failure, validation error).

**Visual:** Error indicator with accent color for severity. Clear error message. Retry action button if recovery is possible. Do not show raw stack traces.

**Motion:** None beyond entry. No distracting animation.

**Accessibility:** Error message announced via `role="alert"` or `aria-live="assertive"`. Error text must be descriptive and actionable.

---

### Disabled

An interactive element is temporarily unavailable.

**Visual:** Reduced opacity (≤ 0.5). No hover or active changes. Cursor: `not-allowed` if clickable.

**Motion:** None.

**Accessibility:** `aria-disabled` or `disabled` attribute. Focus should still reach the element for explanation. Tooltip or adjacent text should explain why the element is disabled.
