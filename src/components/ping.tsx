import type { ComponentProps } from "react"
import type { Tone } from "~/lib/tone"
import { variants, cn, type VariantProps } from "~/lib/variants"

const pingVariants = variants({
  base: "relative flex shrink-0 size-2 rounded-full",

  variants: {
    tone: {
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      neutral: "text-muted-foreground",
    } satisfies Record<Tone, string>,
  },

  defaultVariants: {
    tone: "neutral",
  },
})

type PingProps = ComponentProps<"span"> &
  VariantProps<typeof pingVariants> & {
    /**
     * Pulse the dot. The glow overflows the box by half the dot size, so layout
     * stays the size of the dot itself.
     */
    animate?: boolean
  }

/**
 * A status dot: solid fill with an optional soft, slow pulse. Size it with `size-*`.
 */
export function Ping({ className, tone, animate = true, ...props }: PingProps) {
  return (
    <span className={cn(pingVariants({ tone, className }))} {...props}>
      {animate && (
        <>
          <span className="pointer-events-none absolute -inset-1/2 animate-ping rounded-full bg-current opacity-30 blur-[1px] [animation-duration:2s] motion-reduce:animate-none" />
          <span className="pointer-events-none absolute -inset-1/2 animate-pulse rounded-full bg-current opacity-30 motion-reduce:animate-none" />
        </>
      )}
      <span className="absolute inset-0 rounded-full bg-current" />
    </span>
  )
}
