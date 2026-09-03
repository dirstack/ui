"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { popoverAnimationClasses } from "~/lib/classes"
import { cn } from "~/lib/variants"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

function PopoverContent({
  className,
  align = "center",
  side,
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "side" | "sideOffset">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          className={cn(
            "min-w-72 w-(--anchor-width) rounded-md border bg-popover p-4 text-popover-foreground shadow-md backdrop-blur-xs outline-hidden",
            popoverAnimationClasses,
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
