import type { ComponentProps } from "react"
import { Toaster as Sonner } from "sonner"
import { CircleCheckIcon, CircleHelpIcon, CircleXIcon, LoaderIcon } from "~/lib/icons"
import { cn } from "~/lib/variants"

export function Toaster({ className, ...props }: ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      className="pointer-events-auto"
      offset={16}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            "flex items-start gap-2 w-72 p-4 text-[13px] font-medium ring ring-background/50 rounded-lg shadow-sm",
            className,
          ),
          default: "bg-background border border-border text-foreground ring-0",
          info: "bg-foreground text-background!",
          success: "bg-success text-white!",
          error: "bg-destructive text-white!",
          content: "w-full",
          description: "font-normal opacity-80",
          icon: "mt-0.5",
        },
      }}
      icons={{
        info: <CircleHelpIcon className="size-4" />,
        success: <CircleCheckIcon className="size-4" />,
        error: <CircleXIcon className="size-4" />,
        loading: <LoaderIcon className="size-4 animate-spin" />,
      }}
      {...props}
    />
  )
}
