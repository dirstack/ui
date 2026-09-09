import { useRender } from "@base-ui/react/use-render"
import type { Format } from "@number-flow/react"
import { type ComponentProps, isValidElement, type ReactNode } from "react"
import { AnimatedNumber } from "~/components/animated-number"
import { cardSurfaceClasses } from "~/components/card"
import { cn, variants, type VariantProps } from "~/lib/variants"

const stripVariants = variants({
  // Two-up on a phone, in a tighter cut (see the item); a lone last tile spans the row.
  base: "group/strip grid grid-cols-2 gap-y-1 max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 sm:flex sm:flex-wrap sm:gap-y-0",

  variants: {
    variant: {
      // A white card of figures, divided by full-height hairlines.
      plain: cardSurfaceClasses,
      // A canvas-toned track where the selected figure sits on a raised card, like a
      // segmented control; for strips that drive the panel beside them.
      // 13px gap: a 1px divider then sits 6px from the card on either side, matching the 6px inset.
      track: "rounded-xl bg-background p-1.5 sm:gap-x-[13px]",
    },
  },

  defaultVariants: {
    variant: "plain",
  },
})

type StatStripProps = ComponentProps<"div"> & VariantProps<typeof stripVariants>

function StatStrip({ className, variant, ...props }: StatStripProps) {
  return (
    <div
      data-variant={variant ?? "plain"}
      className={cn(stripVariants({ variant, className }))}
      {...props}
    />
  )
}

type StatStripItemProps = Omit<useRender.ComponentProps<"div">, "children"> & {
  label: string
  /**
   * A number (or a string with a `format`) spins through `AnimatedNumber`; any other node,
   * e.g. two `AnimatedNumber`s composing "1m 38s", renders as is.
   */
  value: ReactNode
  format?: Format
  hint?: string
  /**
   * Rendered at the end of the label row, e.g. a change against a previous period.
   */
  trend?: ReactNode
  /**
   * Marks the item as the one driving the panel beside it. Pass `render={<button ... />}`
   * to make it selectable.
   */
  selected?: boolean
}

function StatStripItem({
  label,
  value,
  format,
  hint,
  trend,
  selected,
  render,
  className,
  ...props
}: StatStripItemProps) {
  return useRender({
    render,
    defaultTagName: "div",
    props: {
      "data-selected": selected || undefined,
      className: cn(
        // The border is always laid out and only colored when selected, so toggling
        // never shifts the row.
        "relative min-w-0 flex-1 rounded-lg border border-transparent px-3 py-2 text-start sm:px-4 sm:py-3",
        // Hairline divider between neighbours. The plain strip hides it around the
        // selected fill; the track keeps it, centered in the gap between cards.
        "before:absolute before:inset-y-2 before:-left-px before:w-px before:bg-border first:before:hidden max-sm:before:hidden",
        "group-data-[variant=plain]/strip:data-selected:before:hidden group-data-[variant=plain]/strip:[[data-selected]+&]:before:hidden",
        // Offsets are measured from the padding box, so the 1px border is added to land
        // exactly halfway across the 13px gap.
        "group-data-[variant=track]/strip:before:-left-[8px]",
        "[&:is(button)]:hover:bg-foreground/3",
        // Plain card: roomier cells, full-height dividers, selected item on a soft fill.
        "group-data-[variant=plain]/strip:rounded-none group-data-[variant=plain]/strip:px-5 group-data-[variant=plain]/strip:py-4 group-data-[variant=plain]/strip:before:inset-y-0 group-data-[variant=plain]/strip:before:left-0",
        "group-data-[variant=plain]/strip:data-selected:bg-muted",
        // Track: the selected item is a raised card; unselected figures recede.
        "group-data-[variant=track]/strip:data-selected:border-border group-data-[variant=track]/strip:data-selected:bg-card group-data-[variant=track]/strip:data-selected:shadow-xs",
        "group-data-[variant=track]/strip:not-data-selected:[&_[data-value]]:text-muted-foreground",
        "group-data-[variant=track]/strip:[&:is(button)]:hover:not-data-selected:bg-card/60",
        className,
      ),
      children: (
        <>
          <p className="flex items-baseline justify-between gap-2 text-muted-foreground text-sm">
            <span className="min-w-0 truncate">{label}</span>
            {trend && <span className="shrink-0">{trend}</span>}
          </p>

          {/* Fixed line heights (28px / 36px) equal NumberFlow's rendered box at text-lg / text-2xl,
              so a string value ("—", "0:00") sits at exactly the same height as an animated one. */}
          <p
            data-value
            // Clipped, but no ellipsis: NumberFlow lays each digit out in its own box, so
            // the browser paints the "…" over the digits instead of after them.
            className="mt-0.5 overflow-hidden whitespace-nowrap font-display font-semibold text-lg leading-7 tabular-nums sm:text-2xl sm:leading-9"
          >
            {isValidElement(value) || (typeof value !== "number" && typeof value !== "string") ? (
              value
            ) : (
              <AnimatedNumber value={value} format={format} />
            )}
          </p>

          {hint && <p className="truncate text-muted-foreground text-xs">{hint}</p>}
        </>
      ),
      ...props,
    },
  })
}

export { StatStrip, StatStripItem }
