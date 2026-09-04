import type { ComponentProps, ReactNode } from "react"
import { Card } from "~/components/card"
import { cn } from "~/lib/variants"

type BreakdownCardProps = Omit<ComponentProps<typeof Card>, "title"> & {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  /**
   * Drops the body padding, for a card whose body is a run of full-bleed
   * `ListRow`s rather than a bar list.
   */
  flush?: boolean
}

/**
 * The dashboard panel frame: a bordered header strip with a title, a muted one-line summary and
 * optional actions, over a body holding a tab switcher and a breakdown list.
 */
export function BreakdownCard({
  title,
  description,
  actions,
  flush,
  children,
  ...props
}: BreakdownCardProps) {
  return (
    <Card {...props}>
      <Card.Panel className="p-4 md:p-4">
        <Card.Header
          size="panel"
          className="gap-y-0.5"
          title={title}
          description={description}
          actions={actions}
        />
      </Card.Panel>

      <Card.Panel className={cn("flex flex-1 flex-col gap-3 p-4 md:p-4", flush && "p-0 md:p-0")}>
        {children}
      </Card.Panel>
    </Card>
  )
}
