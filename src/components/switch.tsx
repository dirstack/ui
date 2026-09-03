"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { boxVariants } from "~/components/box"
import { cn } from "~/lib/variants"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        boxVariants({ focusWithin: true }),
        "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent! shadow-xs disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-3 rounded-full bg-background shadow-lg ring-0 transition-transform data-checked:translate-x-3 data-unchecked:translate-x-0" />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
