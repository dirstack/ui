import type { ComponentProps, ReactNode } from "react"
import { Card, CardHeader, CardPanel } from "~/components/card"
import { cn } from "~/lib/variants"

export type BreakdownCardProps = ComponentProps<typeof Card> & {
  title: ReactNode
  description?: ReactNode
  /**
   * Header actions, right-aligned beside the title (a menu, a time-range control).
   */
  actions?: ReactNode
  /**
   * A view switcher (e.g. `ViewTabs`) pinned to the top of the body, above the children.
   */
  tabs?: ReactNode
  /**
   * A compact hairline-topped strip under the body, for a "Details" link or a total.
   */
  footer?: ReactNode
  /**
   * Drop the body panel's padding, for a body that draws its own edges (a divided row list).
   */
  flush?: boolean
}

/**
 * A dashboard panel: a titled header panel above a flex body panel, hairline-divided, with an
 * optional footer strip. The body grows to fill the card so panels in the same row keep an
 * even height.
 */
export function BreakdownCard({
  title,
  description,
  actions,
  tabs,
  footer,
  flush,
  children,
  ...props
}: BreakdownCardProps) {
  return (
    <Card {...props}>
      <CardPanel className="p-4 md:p-4">
        <CardHeader
          size="panel"
          className="gap-y-0.5"
          title={title}
          description={description}
          actions={actions}
        />
      </CardPanel>

      <CardPanel className={cn("flex flex-1 flex-col gap-3 p-4 md:p-4", flush && "p-0 md:p-0")}>
        {tabs && <div className={cn("flex", flush && "px-4 pt-4")}>{tabs}</div>}
        {children}
      </CardPanel>

      {footer && <CardPanel className="px-4 py-2.5 text-sm md:px-4 md:py-2.5">{footer}</CardPanel>}
    </Card>
  )
}
