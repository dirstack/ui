import type { ComponentProps } from "react"
import { Button } from "~/components/button"
import { cn } from "~/lib/variants"

export function FormButton({ className, ...props }: ComponentProps<typeof Button>) {
  return <Button type="submit" className={cn("first:not-only:w-full", className)} {...props} />
}
