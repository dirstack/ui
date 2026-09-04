import type { ComponentProps, ReactNode } from "react"
import { Stack } from "~/components/stack"
import { slot } from "~/lib/slot"
import { variants, cn, type VariantProps } from "~/lib/variants"

const calloutVariants = variants({
  base: "w-full rounded-lg border px-3.5 py-2.5",

  variants: {
    variant: {
      default: "bg-muted text-secondary-foreground",
      warning: "bg-warning-subtle border-warning/20 text-warning-foreground/90",
      success: "bg-success-subtle border-success/20 text-success-foreground/90",
      danger: "bg-danger-subtle border-danger/20 text-danger-foreground/90",
    },
  },

  defaultVariants: {
    variant: "default",
  },
})

type CalloutProps = Omit<ComponentProps<typeof Stack>, "prefix" | "suffix"> &
  VariantProps<typeof calloutVariants> & {
    /**
     * The slot to be rendered before the content.
     */
    prefix?: ReactNode

    /**
     * The slot to be rendered after the content.
     */
    suffix?: ReactNode
  }

function Callout({ children, className, variant, prefix, suffix, ...props }: CalloutProps) {
  return (
    <Stack
      size="sm"
      wrap={false}
      role="alert"
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      {slot(prefix, { className: "mt-0.5 self-start shrink-0 size-4.5" })}
      {children}
      {slot(suffix, { className: "mt-0.5 self-start shrink-0 size-4.5" })}
    </Stack>
  )
}

function CalloutText({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("font-medium text-pretty text-sm/relaxed", className)} {...props} />
}

export { Callout, CalloutText }
