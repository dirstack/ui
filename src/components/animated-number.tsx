import NumberFlow, { continuous } from "@number-flow/react"
import type { ComponentProps } from "react"
import { ANIMATION_DURATION, ANIMATION_EASING } from "~/lib/animation"

const timing = { duration: ANIMATION_DURATION, easing: ANIMATION_EASING }

type AnimatedNumberProps = Omit<ComponentProps<typeof NumberFlow>, "value"> & {
  /**
   * Strings (empty-value dashes like "—") render as-is, without animation.
   */
  value: number | string
}

/**
 * Number that spins to its new value on revalidation. Static on first mount and under
 * prefers-reduced-motion (NumberFlow defaults). The `continuous` plugin sweeps digits through
 * intermediate values as it climbs. Timing is shared with the performance chart so the two
 * move in sync.
 */
export function AnimatedNumber({ value, ...props }: AnimatedNumberProps) {
  if (typeof value === "string") return value

  return (
    <NumberFlow
      locales={navigator.language}
      plugins={[continuous]}
      transformTiming={timing}
      opacityTiming={timing}
      value={value}
      {...props}
    />
  )
}
