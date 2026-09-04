import type { ComponentProps } from "react"
import { Toaster as Sonner } from "sonner"
import { controlTextClasses } from "~/lib/classes"
import { CircleCheckIcon, CircleHelpIcon, CircleXIcon, LoaderIcon } from "~/lib/icons"
import { cn } from "~/lib/variants"

/** The halo that lifts a solid-colored toast off whatever it floats over. */
const toastRingClasses = "ring ring-background/50"

export function Toaster({ className, ...props }: ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      className="pointer-events-auto"
      offset={16}
      toastOptions={{
        unstyled: true,
        classNames: {
          /*
           * Sonner joins `toast` with exactly one type key per toast (`default` for untyped
           * ones) as a plain string, so tailwind-merge never sees the pair. Anything that
           * differs per type — background, text, halo — therefore lives on the type keys
           * only, and never gets cancelled here.
           */
          toast: cn(
            `flex items-start gap-2 p-4 ${controlTextClasses} font-medium rounded-lg shadow-sm`,
            className,
          ),
          default: "bg-background border border-border text-foreground",
          info: cn("bg-foreground text-background", toastRingClasses),
          success: cn("bg-success text-white", toastRingClasses),
          error: cn("bg-danger text-white", toastRingClasses),
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
