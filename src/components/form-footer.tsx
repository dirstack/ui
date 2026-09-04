import type { ComponentProps } from "react"
import { DialogFooter } from "~/components/dialog"
import { cn } from "~/lib/variants"

export function FormFooter({ className, ...props }: ComponentProps<typeof DialogFooter>) {
  return <DialogFooter className={cn("col-span-full mt-2", className)} {...props} />
}
