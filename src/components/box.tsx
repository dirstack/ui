import { variants } from "~/lib/variants"

export const boxVariants = variants({
  base: "border outline-transparent",

  variants: {
    hover: {
      true: "not-disabled:cursor-pointer hover:not-disabled:outline-[3px] hover:not-disabled:outline-border/50 hover:not-disabled:border-ring",
    },
    focus: {
      true: "focus-visible:outline-[3px] focus-visible:outline-border/50 focus-visible:border-ring",
    },
    focusWithin: {
      true: "focus-within:outline-[3px] focus-within:outline-border/50 focus-within:border-ring",
    },
  },
})
