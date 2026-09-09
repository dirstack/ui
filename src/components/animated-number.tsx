"use client"

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
 *
 * With `animated={false}` it renders the formatted number as text and mounts nothing:
 * NumberFlow is a custom element carrying a shadow root and a span per digit, so a list of
 * static figures (a ranked breakdown, a table column) otherwise pays a few milliseconds per
 * row for an animation it never runs.
 */
export function AnimatedNumber({
  value,
  animated = true,
  locales,
  format,
  prefix,
  suffix,
  ...props
}: AnimatedNumberProps) {
  if (typeof value === "string") return value

  if (!animated) {
    return `${prefix ?? ""}${value.toLocaleString(locales, format)}${suffix ?? ""}`
  }

  return (
    <NumberFlow
      plugins={[continuous]}
      transformTiming={timing}
      opacityTiming={timing}
      value={value}
      locales={locales}
      format={format}
      prefix={prefix}
      suffix={suffix}
      {...props}
    />
  )
}
