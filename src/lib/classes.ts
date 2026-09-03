/**
 * Enter/exit animation classes for Base UI popups (Menu, Select, Popover, Tooltip, …).
 * Keyed on Base UI's `data-open`/`data-closed` state attributes and the positioner's
 * `data-[side=*]`, with the zoom anchored to the `--transform-origin` Base UI exposes on
 * the popup. Animation utilities (and their `duration-*`/`ease-*` bindings) come from
 * `tailwindcss-animate`.
 *
 * The `data-closed` animation is essential: Base UI keeps the popup mounted until the
 * exit animation finishes, so without it there is no close animation at all.
 *
 * Feel: a snappy 100ms, a barely-there 98% zoom, and a 2px directional slide. Enter eases
 * out (natural deceleration as it appears); exit eases in (accelerates away — it shouldn't
 * fight for attention). `data-instant` collapses the duration to 0 so Base UI's instant
 * transitions (keyboard nav between items, grouped tooltips) don't stutter.
 */
export const popoverAnimationClasses = [
  "origin-(--transform-origin) duration-100 data-instant:duration-0",
  "data-open:animate-in data-open:ease-out data-open:fade-in-0 data-open:zoom-in-98",
  "data-closed:animate-out data-closed:ease-in data-closed:fade-out-0 data-closed:zoom-out-98",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2",
  "data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2",
  "data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2",
  "data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2",
]

/**
 * Small muted label over a group of items: sidebar sections, menu groups. One place so every
 * eyebrow in the app shares its size and weight.
 */
export const eyebrowClasses = "text-[0.6875rem]/tight font-medium text-muted-foreground"

/**
 * Muted supporting copy under a heading, label, or control. Matches the description
 * size the settings rows already use, so a form reads the same in either layout.
 */
export const descriptionClasses = "text-pretty text-muted-foreground text-sm"
