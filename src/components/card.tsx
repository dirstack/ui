import { useRender } from "@base-ui/react/use-render"
import type { ComponentProps } from "react"
import { SectionHeader } from "~/components/section-header"
import { variants, cn, type VariantProps } from "~/lib/variants"

/**
 * The one raised surface in the app: a white panel on the canvas, hairline border, 12px radius
 * and a whisper of shadow, clipping whatever sits in its corners. Every card, list card and
 * stat strip is this recipe — change it here and it changes everywhere.
 */
export const cardSurfaceClasses = "overflow-clip rounded-xl border bg-card shadow-xs"

const cardVariants = variants({
  base: [
    cardSurfaceClasses,
    "relative flex flex-col hover:[&[href]]:z-10 hover:[&[href]]:border-ring",
  ],

  variants: {
    /**
     * Separate the children with hairlines, for a card whose body is a run of rows or panels.
     */
    divided: {
      true: "divide-y",
    },
  },
})

const cardPanelVariants = variants({
  base: "border-t first:border-t-0",

  variants: {
    size: {
      md: "p-4 md:p-6",
      lg: "p-6 md:p-8",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

/**
 * The card heading: `SectionHeader` preset to the card scale (an `h4` title, tight spacing). Pass
 * `size="panel"` for the smaller dashboard-panel scale.
 */
function CardHeader(props: ComponentProps<typeof SectionHeader>) {
  return <SectionHeader size="card" {...props} />
}

export type CardProps = useRender.ComponentProps<"div"> & VariantProps<typeof cardVariants>

function Card({ render, className, divided, ...props }: CardProps) {
  return useRender({
    render,
    defaultTagName: "div",
    props: { className: cn(cardVariants({ divided, className })), ...props },
  })
}

export type CardPanelProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof cardPanelVariants>

function CardPanel({ className, render, size, ...props }: CardPanelProps) {
  return useRender({
    render,
    defaultTagName: "div",
    props: {
      className: cn(cardPanelVariants({ size, className })),
      ...props,
    },
  })
}

export { Card, CardHeader, CardPanel }
