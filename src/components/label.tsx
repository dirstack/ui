"use client"

import type { ComponentProps } from "react"
import { cn, variants, type VariantProps } from "~/lib/variants"

const labelVariants = variants({
  base: "self-start text-sm font-medium text-foreground [&[for]]:cursor-pointer",

  variants: {
    isRequired: {
      true: "after:ml-0.5 after:text-danger after:content-['*']",
    },
  },
})

type LabelProps = ComponentProps<"label"> & VariantProps<typeof labelVariants>

function Label({ className, isRequired, ...props }: LabelProps) {
  // oxlint-disable-next-line jsx-a11y/label-has-associated-control -- htmlFor is supplied by callers (e.g. FormLabel)
  return <label className={cn(labelVariants({ isRequired, className }))} {...props} />
}

export { Label }
