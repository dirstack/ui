"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { createContext, useContext } from "react"
import { controlTextClasses } from "~/lib/classes"
import { interactiveVariants } from "~/lib/interactive"
import { cn, variants, type VariantProps } from "~/lib/variants"

const Tabs = TabsPrimitive.Root

const tabsListVariants = variants({
  slots: {
    list: "relative inline-flex items-center text-muted-foreground",
    indicator:
      "absolute top-1/2 left-0 z-0 h-[var(--active-tab-height)] w-[var(--active-tab-width)] -translate-y-1/2 translate-x-[var(--active-tab-left)] rounded-md transition-[translate,width] duration-500 ease-out-expo",
    trigger: cn(
      interactiveVariants({ focus: true }),
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium disabled:pointer-events-none disabled:opacity-50 hover:text-foreground data-active:text-foreground",
    ),
  },

  variants: {
    variant: {
      // Segmented control, sized like an `md` Button so it sits flush beside one in a header:
      // the same 13px text, the same `--spacing-control` height, and a 6px outer radius over a
      // 3px inset (so the inner pill radius is 3px).
      segmented: {
        list: "justify-center rounded-md border bg-card p-[3px]",
        indicator: "rounded-[3px] bg-muted",
        trigger: `rounded-[3px] px-2.5 py-[5px] ${controlTextClasses}`,
      },
      // Plain pills: no track, no gap and no padding around the row, so the first label sits
      // flush with whatever the list aligns to; the active tab sits on a soft pill. For
      // in-card view switchers.
      plain: {
        indicator: "bg-muted",
        trigger: "px-2.5 py-1.5 text-sm",
      },
    },
    // `sm` is a step down for a card header: a 28px track with 12px labels.
    size: {
      md: {},
      sm: {
        indicator: "rounded-[4px]",
        trigger: "rounded-[4px] px-2 py-[3px] text-xs/tight",
      },
    },
  },

  // The track heights and the small track's inset live here: `h-control` is a custom
  // spacing token the class merger can't pair with `h-7`, so setting both on the same slot
  // keeps both, and the inset belongs to the track, not to the size.
  compoundVariants: [
    { variant: "segmented", size: "md", class: { list: "h-control" } },
    { variant: "segmented", size: "sm", class: { list: "h-7 p-0.5" } },
  ],

  defaultVariants: {
    variant: "segmented",
    size: "md",
  },
})

type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>
type TabsSize = NonNullable<VariantProps<typeof tabsListVariants>["size"]>

const TabsVariantContext = createContext<{ variant: TabsVariant; size: TabsSize }>({
  variant: "segmented",
  size: "md",
})

/**
 * Sliding highlight that tracks the active tab via Base UI's --active-tab-*
 * CSS variables. Rendered automatically by TabsList, so every tab group shares
 * one pill. Duration/easing mirror the library's one motion curve — the
 * `--ease-out-expo` token, duplicated for JS in `~/lib/animation` — so the pill
 * glides in sync with the number spins and chart draws it sits beside.
 */
function TabsIndicator({ className, ...props }: TabsPrimitive.Indicator.Props) {
  const { variant, size } = useContext(TabsVariantContext)

  return (
    <TabsPrimitive.Indicator
      className={cn(tabsListVariants({ variant, size }).indicator(), className)}
      {...props}
    />
  )
}

type TabsListProps = TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>

function TabsList({
  className,
  children,
  variant = "segmented",
  size = "md",
  ...props
}: TabsListProps) {
  return (
    <TabsVariantContext value={{ variant, size }}>
      <TabsPrimitive.List
        className={cn(tabsListVariants({ variant, size }).list(), className)}
        {...props}
      >
        <TabsIndicator />
        {children}
      </TabsPrimitive.List>
    </TabsVariantContext>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  const { variant, size } = useContext(TabsVariantContext)

  return (
    <TabsPrimitive.Tab
      className={cn(tabsListVariants({ variant, size }).trigger(), className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger }
