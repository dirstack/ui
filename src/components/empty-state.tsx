import type { ComponentProps, ReactNode } from "react"
import { descriptionClasses } from "~/lib/classes"
import { cn, variants, type VariantProps } from "~/lib/variants"

const emptyStateVariants = variants({
  slots: {
    root: "",
    icon: "flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5",
    content: "space-y-1",
    title: "",
    description: descriptionClasses,
    action: "",
  },

  variants: {
    variant: {
      block: {
        root: "flex flex-col items-center gap-3 px-6 py-12 text-center",
        title: "font-medium text-sm",
        description: "mx-auto max-w-sm",
        action: "mt-1",
      },
      inline: {
        root: "py-5",
        title: "text-muted-foreground text-sm",
        action: "mt-2",
      },
      dashed: {
        root: "bg-dashed flex h-32 items-center justify-center rounded-lg border",
        title: "rounded-md bg-background px-3 py-1.5 text-muted-foreground text-sm",
        action: "mt-2",
      },
    },
  },

  defaultVariants: {
    variant: "block",
  },
})

type EmptyStateProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof emptyStateVariants> & {
    icon?: ReactNode
    title: ReactNode
    description?: ReactNode
    action?: ReactNode
  }

/**
 * The one empty state. `block` fills a card or list with a centered icon, title and
 * description; `inline` is a single muted line inside a form section; `dashed` is a
 * short dashed panel that stands in for a missing chart.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  variant,
  className,
  ...props
}: EmptyStateProps) {
  const styles = emptyStateVariants({ variant })

  return (
    <div className={cn(styles.root(), className)} {...props}>
      {icon && <div className={styles.icon()}>{icon}</div>}

      <div className={styles.content()}>
        <p className={styles.title()}>{title}</p>
        {description && <p className={styles.description()}>{description}</p>}
      </div>

      {action && <div className={styles.action()}>{action}</div>}
    </div>
  )
}
