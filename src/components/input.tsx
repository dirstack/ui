import type { ComponentProps } from "react"
import { boxVariants } from "~/components/box"
import { variants, cn, type VariantProps } from "~/lib/variants"

const inputVariants = variants({
  extend: boxVariants,
  base: "appearance-none min-h-0 w-full self-stretch bg-card text-foreground text-[0.8125rem]/tight break-words disabled:text-secondary-foreground/50",

  variants: {
    size: {
      sm: "px-2 py-1 font-normal rounded-md",
      md: "px-3 py-2 rounded-md",
      lg: "px-4 py-2.5 rounded-lg sm:text-sm",
    },
  },

  defaultVariants: {
    hover: false,
    focus: true,
    size: "md",
  },
})

type InputProps = Omit<ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>

/**
 * Turns off browser and password-manager assistance for identifier-style inputs
 * (names, slugs, keys).
 */
const plainInputProps = {
  autoComplete: "off",
  autoCapitalize: "none",
  autoCorrect: "off",
  spellCheck: false,
  "data-1p-ignore": "",
} as const

function Input({ className, hover, focus, size, ...props }: InputProps) {
  return <input className={cn(inputVariants({ hover, focus, size }), className)} {...props} />
}

export { Input, inputVariants, plainInputProps }
