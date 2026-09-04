import type { ComponentProps } from "react"
import { eyebrowClasses } from "~/lib/classes"
import { cn, variants } from "~/lib/variants"

export function Nav({ className, ...props }: ComponentProps<"nav">) {
  return <nav className={cn("flex flex-col gap-0.5 px-3 py-2", className)} {...props} />
}

/**
 * Muted group label above a run of nav links.
 */
export function NavLabel({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("px-2.5 pt-1 pb-1.5", eyebrowClasses, className)} {...props} />
}

/**
 * The affixes of a nav row that leads with its own visual (an avatar, a skeleton) sit flush
 * against the row's inset, so the Button's optical pull-in is zeroed on both ends.
 */
const navAffixClasses = "[&>*:first-child]:ml-0 [&>*:last-child]:mr-0"

/**
 * The one nav row, applied to a `ghost` `md` `Button`: every item starts from the same width,
 * inset and gap, and each variant is the shape on top of it.
 *
 * `link` — a nav link or a settings tab: muted at rest, full color on hover, and a flat darker
 * tint with dark text when active. The 16px icon sits centered in a 20px box, so labels start on
 * the same column as a row that leads with a 20px avatar (10px inset + 20px avatar + 10px gap).
 * The active state keys off `data-status="active"`, which router links set on their own and plain
 * buttons set by hand, so the active color always wins over the resting one. Its tints are flat
 * foreground over the canvas, so hover and active share the canvas hue exactly.
 *
 * `bordered` — a bordered row on a card surface, for a row that leads with its own visual and
 * opens a menu.
 *
 * `flat` — the same row without the border or the surface.
 */
export const navItem = variants({
  base: "w-full justify-start gap-2.5 px-2.5",

  variants: {
    variant: {
      link: [
        "py-2 pointer-coarse:min-h-11 text-muted-foreground text-sm/tight hover:bg-foreground/3 hover:text-foreground [&>svg:first-child]:ml-0.5 [&>svg]:mr-0.5 [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[status=active]:bg-foreground/5 data-[status=active]:text-foreground data-[status=active]:hover:bg-foreground/5",
      ],
      bordered: [navAffixClasses, "border-border bg-card hover:bg-card hover:border-ring"],
      flat: navAffixClasses,
    },
  },

  defaultVariants: {
    variant: "link",
  },
})
