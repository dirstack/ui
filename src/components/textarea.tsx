import type { ComponentProps } from "react"
import { inputVariants } from "~/components/input"
import { cn, type VariantProps } from "~/lib/variants"

type TextareaProps = Omit<ComponentProps<"textarea">, "size"> & VariantProps<typeof inputVariants>

function Textarea({ className, hover, focus, size, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        inputVariants({ hover, focus, size }),
        "leading-normal! resize-none field-sizing-content",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
