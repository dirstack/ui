import { mergeProps } from "@base-ui/react"
import { useRender } from "@base-ui/react/use-render"
import type { ReactNode } from "react"
import { slot } from "~/lib/slot"
import { cn, variants, type VariantProps } from "~/lib/variants"

const badgeVariants = variants({
  base: "inline-flex items-center rounded-sm font-display font-medium leading-tight border border-transparent whitespace-nowrap",

  variants: {
    variant: {
      secondary: "bg-background border-border hover:[&[href],&[type]]:bg-muted",
      soft: "bg-border/50 hover:[&[href],&[type]]:bg-border/75",
      success:
        "bg-success-subtle border-success/20 text-success-foreground hover:[&[href],&[type]]:opacity-75",
      warning:
        "bg-warning-subtle border-warning/20 text-warning-foreground hover:[&[href],&[type]]:opacity-75",
      danger:
        "bg-danger-subtle border-danger/20 text-danger-foreground hover:[&[href],&[type]]:opacity-75",
      // The neutral member of the `Tone` vocabulary, so a tone can map straight
      // to a variant. Renders like `secondary`; kept distinct because its
      // meaning (a muted status) is not `secondary`'s (a generic chip).
      neutral: "bg-background border-border hover:[&[href],&[type]]:bg-muted",
    },
    size: {
      sm: "px-1 py-px gap-1 text-[0.625rem]",
      md: "px-1.5 py-0.5 gap-1.5 text-xs",
      lg: "px-2 py-1 gap-2 text-sm rounded-md",
    },
  },

  defaultVariants: {
    variant: "soft",
    size: "md",
  },
})

type BadgeProps = Omit<useRender.ComponentProps<"span">, "prefix"> &
  VariantProps<typeof badgeVariants> & {
    /**
     * The slot to be rendered before the label.
     */
    prefix?: ReactNode

    /**
     * The slot to be rendered after the label.
     */
    suffix?: ReactNode
  }

const badgeAffixClasses = "shrink-0 size-[1.1em]"

function Badge({
  children,
  className,
  render,
  variant,
  size,
  prefix,
  suffix,
  ...rest
}: BadgeProps) {
  const props = mergeProps<"span">(
    {
      className: cn(badgeVariants({ variant, size, className })),
      children: (
        <>
          {slot(prefix, { className: badgeAffixClasses })}
          {children}
          {slot(suffix, { className: badgeAffixClasses })}
        </>
      ),
    },
    rest,
  )

  return useRender({ defaultTagName: "span", render, props })
}

export { Badge, badgeVariants }
