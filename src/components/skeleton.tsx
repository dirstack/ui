import type { ComponentProps } from "react"
import { cn } from "~/lib/variants"

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("animate-pulse rounded-md bg-foreground/10", className)} {...props} />
}
