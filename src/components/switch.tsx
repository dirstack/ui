"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { interactiveVariants } from "~/lib/interactive"
import { cn } from "~/lib/variants"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        interactiveVariants({ focus: true }),
        "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-px data-checked:bg-primary data-unchecked:bg-input disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-4 rounded-full bg-background shadow-sm transition-transform duration-200 ease-out-expo data-checked:translate-x-4" />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
