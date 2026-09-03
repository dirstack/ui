"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import type { ReactElement, ReactNode } from "react"
import { popoverAnimationClasses } from "~/lib/classes"
import { cn } from "~/lib/variants"

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal
const TooltipArrow = TooltipPrimitive.Arrow

function TooltipContent({
  className,
  sideOffset = 4,
  side,
  align,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "sideOffset" | "side" | "align">) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        sideOffset={sideOffset}
        side={side}
        align={align}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          className={cn(
            "z-50 max-w-60 inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-xs text-background text-center text-pretty rounded-md will-change-[transform,opacity]",
            popoverAnimationClasses,
            className,
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

type TooltipProps = Omit<TooltipPrimitive.Root.Props, "children"> & {
  children: ReactElement
  tooltip: ReactNode
}

function Tooltip({ children, tooltip, open, defaultOpen, onOpenChange, ...rest }: TooltipProps) {
  if (!tooltip) {
    return children
  }

  return (
    <TooltipRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} {...rest}>
      <TooltipTrigger render={children} />

      <TooltipPortal>
        <TooltipContent>
          {tooltip}
          <TooltipArrow
            className={cn(
              "z-50 size-2.5 rotate-45 rounded-xs bg-foreground fill-foreground",
              "data-[side=top]:bottom-0 data-[side=top]:translate-y-[calc(50%-2px)]",
              "data-[side=bottom]:top-0 data-[side=bottom]:-translate-y-[calc(50%-2px)]",
              "data-[side=left]:right-0 data-[side=left]:translate-x-[calc(50%-2px)]",
              "data-[side=right]:left-0 data-[side=right]:-translate-x-[calc(50%-2px)]",
            )}
          />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  )
}

export { Tooltip, TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider }
