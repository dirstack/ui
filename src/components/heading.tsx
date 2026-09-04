import { useRender } from "@base-ui/react/use-render"
import type { ElementType, JSX } from "react"
import { variants, cn, type VariantProps } from "~/lib/variants"

const headingVariants = variants({
  base: "font-display font-medium",

  variants: {
    size: {
      h1: "text-3xl text-pretty font-semibold md:text-4xl",
      h2: "text-2xl font-semibold md:text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-base font-medium tracking-micro",
      h6: "text-sm font-medium",
    },
  },

  defaultVariants: {
    size: "h3",
  },
})

export type HeadingProps = Omit<useRender.ComponentProps<"h2">, "size"> &
  VariantProps<typeof headingVariants> & {
    /**
     * Render as a different element type (h1–h6, span, ...).
     */
    as?: ElementType
  }

function Heading({ className, as, render, size, ...props }: HeadingProps) {
  return useRender({
    render,
    defaultTagName: (as ?? size ?? "h2") as keyof JSX.IntrinsicElements,
    props: { className: cn(headingVariants({ size, className })), ...props },
  })
}

function H5(props: HeadingProps) {
  return <Heading size="h5" {...props} />
}

function H6(props: HeadingProps) {
  return <Heading size="h6" {...props} />
}

export { H5, H6, Heading }
