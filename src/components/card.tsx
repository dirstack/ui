import { useRender } from "@base-ui/react/use-render"
import type { ComponentProps } from "react"
import { Header } from "~/components/header"
import { variants, cn, type VariantProps } from "~/lib/variants"

const sectionVariants = variants({
  base: "flex flex-col",

  variants: {
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  defaultVariants: {
    gap: "lg",
  },
})

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
    theme: {
      gray: "bg-background",
    },
    sticky: {
      true: "sticky z-30 first:top-0 last:bottom-0",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

/**
 * The card heading: `Header` preset to the card scale (an `h4` title, tight spacing). Pass
 * `size="panel"` for the smaller dashboard-panel scale.
 */
function CardHeader(props: ComponentProps<typeof Header>) {
  return <Header size="card" {...props} />
}

export type CardProps = useRender.ComponentProps<"div"> & VariantProps<typeof cardVariants>

function CardRoot({ render, className, divided, ...props }: CardProps) {
  return useRender({
    render,
    defaultTagName: "div",
    props: { className: cn(cardVariants({ divided, className })), ...props },
  })
}

export type CardPanelProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof cardPanelVariants>

function CardPanel({ className, render, size, theme, sticky, ...props }: CardPanelProps) {
  return useRender({
    render,
    defaultTagName: "div",
    props: {
      className: cn(cardPanelVariants({ size, theme, sticky, className })),
      ...props,
    },
  })
}

function CardSection({
  className,
  size,
  gap,
  ...props
}: CardPanelProps & VariantProps<typeof sectionVariants>) {
  return <CardPanel size={size} className={cn(sectionVariants({ gap, className }))} {...props} />
}

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Panel: CardPanel,
  Section: CardSection,
})

export { Card }
