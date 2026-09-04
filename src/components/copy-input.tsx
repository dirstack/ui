import type { ComponentProps } from "react"
import { CopyButton } from "~/components/copy-button"
import { Input } from "~/components/input"
import { cn } from "~/lib/variants"

type CopyInputProps = Omit<ComponentProps<typeof Input>, "value" | "readOnly"> & {
  value: string
}

/**
 * Read-only input with a copy-to-clipboard button pinned to its right edge. Props go to the
 * input itself so `ref`, `aria-label` and font classes land on the field.
 */
export function CopyInput({ value, className, ...props }: CopyInputProps) {
  return (
    <div className="relative w-full">
      <Input readOnly value={value} className={cn("pr-10", className)} {...props} />

      <CopyButton
        value={value}
        variant="ghost"
        className="absolute top-1/2 right-1 -translate-y-1/2"
      />
    </div>
  )
}
