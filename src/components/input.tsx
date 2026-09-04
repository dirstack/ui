import type { ComponentProps } from "react"
import { interactiveVariants } from "~/lib/interactive"
import { variants, cn, type VariantProps } from "~/lib/variants"

const inputVariants = variants({
  extend: interactiveVariants,
  base: "appearance-none min-h-0 w-full self-stretch bg-card text-foreground text-control break-words disabled:text-secondary-foreground/50",

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
    bordered: true,
    size: "md",
  },
})

type InputProps = Omit<ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>

function Input({ className, hover, focus, size, ...props }: InputProps) {
  return <input className={cn(inputVariants({ hover, focus, size }), className)} {...props} />
}

export { Input, inputVariants }
