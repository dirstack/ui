import type { ComponentProps } from "react"
import { cn } from "~/lib/variants"

function Overlay({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-dashed backdrop-blur-xs",
        "data-open:animate-in data-closed:animate-out",
        "data-open:fade-in-0 data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  )
}

export { Overlay }
