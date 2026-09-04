import type { ComponentProps } from "react"
import { cn } from "~/lib/variants"

type StepsProps = ComponentProps<"div"> & {
  /**
   * The current step, 1-based.
   */
  current: number

  /**
   * The total number of steps.
   */
  total: number
}

/**
 * Segmented progress bars for multi-step flows. Completed and current steps
 * are filled; the current one animates in. Screen readers get "Step n of m".
 */
export function Steps({ className, current, total, ...props }: StepsProps) {
  return (
    <div className={cn("flex w-44 gap-1.5", className)} {...props}>
      <p className="sr-only">
        Step {current} of {total}
      </p>

      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          aria-hidden
          className={cn(
            "h-1 flex-1 rounded-full",
            index < current - 1 && "bg-foreground",
            index === current - 1 && "origin-left animate-fill-bar bg-foreground",
            index > current - 1 && "bg-border",
          )}
        />
      ))}
    </div>
  )
}
