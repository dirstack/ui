import { useRender } from "@base-ui/react/use-render"
import type { Format } from "@number-flow/react"
import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { AnimatedNumber } from "~/components/animated-number"
import { Skeleton } from "~/components/skeleton"
import { ArrowUpRightIcon } from "~/lib/icons"
import { cn } from "~/lib/variants"

/**
 * Ranked breakdown list: each row is a label sitting on a soft bar whose width is the row's
 * share of the largest value, measured across the label column, with the value right-aligned
 * beside it. Rows are plain divs by default — a row that links out carries its `href` on the
 * arrow beside the label. Pass `render={<button type="button" />}` (or a link) to make the
 * whole row a click target, e.g. click-to-filter.
 */
function BarListRoot({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />
}

const rowClasses = "flex h-7.5 w-full items-center gap-3 pr-2.5"

export type BarListRowProps = Omit<useRender.ComponentProps<"div">, "children"> & {
  /**
   * Row text; string labels truncate.
   */
  label: ReactNode
  /**
   * Leading visual (favicon, flag, icon tile), 16px.
   */
  icon?: ReactNode
  value: number
  /**
   * The largest value in the list; the bar spans `value / max` of the row.
   */
  max: number
  /**
   * Bar width as a fraction of the row, overriding `value / max`: e.g. a rank ladder so the
   * bars hold still while the rows' labels and values change under them.
   */
  share?: number
  format?: Format
  /**
   * An extra figure (revenue, conversion rate) in its own muted column before the value.
   */
  secondaryValue?: number | string
  secondaryFormat?: Format
  /**
   * External URL, shown as an arrow beside the label that opens in a new tab. Don't combine
   * with a `render` that makes the row itself a button or link — nested interactive content.
   */
  href?: string
}

function BarListRow({
  label,
  icon,
  value,
  max,
  share: shareOverride,
  format,
  secondaryValue,
  secondaryFormat,
  href,
  render,
  className,
  style,
  ...props
}: BarListRowProps) {
  const share = shareOverride ?? (max > 0 ? Math.max(value / max, 0) : 0)

  return useRender({
    render,
    defaultTagName: "div",
    props: {
      className: cn(
        rowClasses,
        "group/bar rounded-md text-start text-sm",
        // Rendered as a button or link, the row reads as a target: pointer, soft hover fill
        // and the shared focus outline.
        "[&:is(button,a)]:cursor-pointer [&:is(button,a)]:hover:bg-foreground/3",
        "focus-visible:outline-[3px] focus-visible:outline-border/50",
        className,
      ),
      style: { "--bar-share": share, ...style } as CSSProperties,
      children: (
        <>
          {/* The bar lives in the label column only: a 100% share reaches the gap before the
              value, never under it, so the numbers always sit on clean ground. */}
          <div className="relative flex h-full min-w-0 flex-1 items-center gap-2 pl-2.5">
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-[calc(var(--bar-share)*100%)] min-w-1.5 origin-left animate-fill-bar rounded-md bg-muted transition-[width,background-color] duration-500 ease-out-expo"
            />

            {icon && (
              <span className="relative flex size-4 shrink-0 items-center justify-center">
                {icon}
              </span>
            )}
            <span className="relative min-w-0 truncate">{label}</span>

            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={typeof label === "string" ? `Open ${label} website` : "Open website"}
                className="relative flex size-5 shrink-0 items-center justify-center rounded text-muted-foreground hover:text-foreground"
              >
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            )}
          </div>

          {secondaryValue !== undefined && (
            <span className="min-w-16 shrink-0 text-right text-muted-foreground tabular-nums">
              <AnimatedNumber value={secondaryValue} format={secondaryFormat} />
            </span>
          )}

          <span className="min-w-12 shrink-0 text-right text-muted-foreground tabular-nums">
            <AnimatedNumber value={value} format={format} />
          </span>
        </>
      ),
      ...props,
    },
  })
}

/**
 * Label bars step down like a ranked list would, so the swap to data reads as a fill-in
 * rather than a reflow.
 */
const skeletonShares = ["70%", "55%", "45%", "35%", "30%"] as const

export type BarListSkeletonProps = ComponentProps<"div"> & {
  /**
   * Rows to draw, matching the list that replaces it.
   */
  rows?: number
}

/**
 * Loading stand-in at the exact row height of `BarList.Row`, so swapping in data causes no
 * layout shift.
 */
function BarListSkeleton({ rows = 5, className, ...props }: BarListSkeletonProps) {
  return (
    <BarListRoot aria-hidden className={className} {...props}>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className={rowClasses}>
          <div className="relative h-full min-w-0 flex-1">
            <Skeleton
              className="absolute inset-y-0 left-0"
              style={{ width: skeletonShares[index % skeletonShares.length] }}
            />
          </div>

          <Skeleton className="h-3.5 w-8 shrink-0" />
        </div>
      ))}
    </BarListRoot>
  )
}

const BarList = Object.assign(BarListRoot, { Row: BarListRow, Skeleton: BarListSkeleton })

export { BarList }
