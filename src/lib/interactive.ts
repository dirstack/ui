import { variants } from "~/lib/variants"

/**
 * The hover and focus treatment every interactive surface shares (buttons, inputs, select
 * triggers, switches, tabs): a soft 3px outline, plus a stronger border on surfaces that draw
 * one (`bordered`). Borderless surfaces keep a transparent border of the same width, so
 * nothing shifts between states. Components layer their own colors on top with `cn`, which
 * resolves conflicting utilities in order, so no `!important` is needed.
 */
export const interactiveVariants = variants({
  base: "border border-transparent outline-transparent",

  variants: {
    hover: {
      true: "not-disabled:cursor-pointer hover:not-disabled:outline-[3px] hover:not-disabled:outline-border/50",
    },
    focus: {
      true: "focus-visible:outline-[3px] focus-visible:outline-border/50",
    },
    bordered: {
      true: "border-border",
    },
  },

  compoundVariants: [
    { hover: true, bordered: true, class: "hover:not-disabled:border-ring" },
    { focus: true, bordered: true, class: "focus-visible:border-ring" },
  ],
})
