import { mergeProps } from "@base-ui/react"
import { useRender } from "@base-ui/react/use-render"
import { Children, isValidElement, type ReactNode } from "react"
import { boxVariants } from "~/components/box"
import { LoaderIcon } from "~/components/icons"
import { slot } from "~/lib/slot"
import { variants, cn, type VariantProps } from "~/lib/variants"

const buttonVariants = variants({
  base: [
    "group/button inline-flex items-center justify-center border-transparent! font-medium text-[0.8125rem]/tight text-start rounded-md overflow-clip hover:z-10 hover:border-transparent",
    "disabled:opacity-60 disabled:pointer-events-none aria-disabled:opacity-60 aria-disabled:pointer-events-none",
    "has-[.animate-spin:last-child]:[&>*:not(.animate-spin)]:text-transparent select-none",
  ],

  variants: {
    variant: {
      primary: "text-background bg-foreground hover:opacity-90",
      secondary: "border-border! bg-card text-secondary-foreground hover:border-ring!",
      soft: "bg-muted text-secondary-foreground hover:bg-muted/75 hover:text-foreground hover:outline-none",
      ghost:
        "text-secondary-foreground hover:bg-foreground/5 hover:text-foreground hover:outline-none",
      destructive: "bg-destructive text-white hover:bg-destructive/90",
    },
    size: {
      sm: "px-2 py-1 gap-[0.66ch]",
      // The default control height. A floor rather than a fixed height, so a row that leads
      // with something taller than the label (the sidebar's 20px avatar) still grows.
      md: "min-h-control px-3 py-2 gap-[0.75ch]",
      lg: "px-3.5 py-2.5 gap-[1ch] rounded-lg sm:text-sm/tight",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

const buttonAffixClasses =
  "shrink-0 first:-ml-[0.21425em] last:-mr-[0.21425em] [svg]:my-[0.077em] [svg]:size-[1.1em]"

export type ButtonProps = Omit<useRender.ComponentProps<"button">, "size" | "prefix"> &
  VariantProps<typeof buttonVariants> &
  Pick<VariantProps<typeof boxVariants>, "hover" | "focus"> & {
    /**
     * If set to `true`, the button will be rendered in the pending state.
     */
    isPending?: boolean

    /**
     * The slot to be rendered before the label.
     */
    prefix?: ReactNode

    /**
     * The slot to be rendered after the label.
     */
    suffix?: ReactNode
  }

function Button({
  children,
  className,
  disabled,
  render,
  isPending,
  prefix,
  suffix,
  variant,
  size,
  hover = true,
  focus = true,
  ...rest
}: ButtonProps) {
  const props = mergeProps<"button">(
    {
      disabled: disabled || isPending,
      className: cn(boxVariants({ hover, focus }), buttonVariants({ variant, size, className })),
      children: (
        <>
          {slot(prefix && isPending ? <LoaderIcon className="animate-spin" /> : prefix, {
            className: buttonAffixClasses,
          })}

          {Children.count(children) > 0 &&
            slot(isValidElement(children) ? children : <span>{children}</span>, {
              className: "flex-1 truncate only:text-center has-[div]:contents",
            })}

          {slot(suffix, { className: buttonAffixClasses })}

          {!prefix && !!isPending && <LoaderIcon className="absolute size-[1.25em] animate-spin" />}
        </>
      ),
    },
    rest,
  )

  return useRender({ defaultTagName: "button", render, props })
}

export { Button, buttonVariants }
