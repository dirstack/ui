import { useRender } from "@base-ui/react/use-render"
import { cn } from "~/lib/variants"

/**
 * Loading stand-in in the muted surface tone, the same colour as a `BarList` bar, so every
 * skeleton across a page reads as one thing. Size it with `className`; pass `render` for a
 * different element, e.g. `render={<span />}` inside a paragraph.
 */
export function Skeleton({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    render,
    defaultTagName: "div",
    props: { className: cn("animate-pulse rounded-md bg-muted", className), ...props },
  })
}
