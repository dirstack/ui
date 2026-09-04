import { mergeProps } from "@base-ui/react"
import { useRender } from "@base-ui/react/use-render"
import { Children, isValidElement, type ReactNode } from "react"
import { LoaderIcon } from "~/lib/icons"
import { interactiveVariants } from "~/lib/interactive"
import { slot } from "~/lib/slot"
import { variants, cn, type VariantProps } from "~/lib/variants"

const buttonVariants = variants({
  base: [
    "group/button inline-flex items-center justify-center font-medium text-control text-start rounded-md overflow-clip select-none hover:z-10",
    "disabled:opacity-60 disabled:pointer-events-none aria-disabled:opacity-60 aria-disabled:pointer-events-none",
  ],

  variants: {
    variant: {
      primary: "text-background bg-foreground hover:opacity-90",
      secondary: "bg-card text-secondary-foreground",
      soft: "bg-muted text-secondary-foreground hover:bg-muted/75 hover:text-foreground hover:outline-none",
      ghost:
        "text-secondary-foreground hover:bg-foreground/5 hover:text-foreground hover:outline-none",
      danger: "bg-danger text-white hover:bg-danger/90",
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

/** Hidden while the button is pending, so only the spinner reads as content. */
const buttonPendingClasses = "group-data-pending/button:text-transparent"

export type ButtonProps = Omit<useRender.ComponentProps<"button">, "size" | "prefix"> &
  VariantProps<typeof buttonVariants> &
  Pick<VariantProps<typeof interactiveVariants>, "hover" | "focus"> & {
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
      "aria-busy": isPending || undefined,
      className: cn(
        interactiveVariants({ hover, focus, bordered: variant === "secondary" }),
        buttonVariants({ variant, size, className }),
      ),
      children: (
        <>
          {slot(prefix && isPending ? <LoaderIcon className="animate-spin" /> : prefix, {
            className: buttonAffixClasses,
          })}

          {Children.count(children) > 0 &&
            slot(isValidElement(children) ? children : <span>{children}</span>, {
              className: cn(
                "flex-1 truncate only:text-center has-[div]:contents",
                buttonPendingClasses,
              ),
            })}

          {slot(suffix, { className: cn(buttonAffixClasses, buttonPendingClasses) })}

          {!prefix && !!isPending && <LoaderIcon className="absolute size-[1.25em] animate-spin" />}
        </>
      ),
    },
    rest,
  )

  // `data-pending` drives the label and suffix fade; it sits outside `mergeProps`, whose
  // button props type has no room for a custom data attribute.
  return useRender({
    defaultTagName: "button",
    render,
    props: { "data-pending": isPending || undefined, ...props },
  })
}

export { Button, buttonVariants }
