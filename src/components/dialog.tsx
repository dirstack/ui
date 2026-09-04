"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import type { ComponentProps, ReactNode } from "react"
import { Button } from "~/components/button"
import {
  SectionHeader,
  SectionHeaderBody,
  SectionHeaderDescription,
  SectionHeaderTitle,
} from "~/components/section-header"
import { XIcon } from "~/lib/icons"
import { variants, cn, type VariantProps } from "~/lib/variants"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

/** The dashed, blurred backdrop behind the dialog. Rendered by `DialogContent`. */
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-dashed backdrop-blur-xs",
        "data-open:animate-in data-closed:animate-out",
        "data-open:fade-in-0 data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  )
}

const dialogContentVariants = variants({
  base: [
    "fixed left-1/2 z-50 grid w-[calc(100vw-2rem)] -translate-x-1/2 overflow-y-auto",
    "border bg-card shadow-sm rounded-xl",
    "data-open:animate-in data-closed:animate-out",
    "data-open:fade-in-0 data-closed:fade-out-0",
    "data-open:slide-in-from-bottom-4 data-closed:slide-out-to-bottom-4",
  ],

  variants: {
    size: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
    },

    /**
     * Pin the dialog near the top of the viewport instead of centering it, so its height can
     * change without the whole thing jumping. A dialog stacked on top of another one
     * (`[[role=dialog]~&]`) sits a little lower still, so both remain visible.
     */
    fixed: {
      true: "top-[10vh] max-h-[calc(90vh-2rem)] [[role=dialog]~&]:top-[15vh] [[role=dialog]~&]:max-h-[calc(85vh-2rem)]",
      false: "top-1/2 -translate-y-1/2 max-h-[calc(100vh-2rem)]",
    },

    /**
     * Drop the dialog's own padding and gap so sections can run edge to edge and draw their
     * own borders, e.g. a bordered header over a scrolling body over a bordered footer.
     */
    flush: {
      true: "gap-0 p-0",
      false: "gap-6 p-6",
    },
  },

  defaultVariants: {
    size: "md",
    fixed: true,
    flush: false,
  },
})

type DialogContentProps = Omit<DialogPrimitive.Popup.Props, "className"> &
  VariantProps<typeof dialogContentVariants> & {
    className?: string

    /**
     * Hide the close button in the top right corner, for a dialog that must be dismissed
     * through one of its own actions.
     */
    hideClose?: boolean
  }

function DialogContent({
  className,
  children,
  size,
  fixed,
  flush,
  hideClose,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />

      <DialogPrimitive.Popup
        className={dialogContentVariants({ size, fixed, flush, className })}
        {...props}
      >
        {children}

        {!hideClose && (
          <DialogPrimitive.Close
            render={<Button variant="ghost" size="sm" aria-label="Close" prefix={<XIcon />} />}
            className="absolute top-3 right-3"
          />
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

const dialogHeaderVariants = variants({
  variants: {
    /**
     * Give the header its own hairline and padding, for a `flush` dialog whose body scrolls
     * under it. The extra right padding clears the dialog's close button.
     */
    bordered: {
      true: "border-b px-6 py-5 pr-14",
    },
  },
})

type DialogHeaderProps = Omit<ComponentProps<typeof SectionHeader>, "title" | "description"> &
  VariantProps<typeof dialogHeaderVariants> & {
    title: ReactNode
    description?: ReactNode
  }

/**
 * The standard dialog heading: a card-scale `SectionHeader` whose title and description are wired to
 * Base UI's `DialogTitle` / `DialogDescription` for accessibility. Extra children render after
 * them.
 */
function DialogHeader({
  title,
  description,
  bordered,
  className,
  children,
  ...props
}: DialogHeaderProps) {
  return (
    <SectionHeader size="card" className={dialogHeaderVariants({ bordered, className })} {...props}>
      <SectionHeaderBody>
        <DialogTitle render={<SectionHeaderTitle />}>{title}</DialogTitle>

        {description && (
          <DialogDescription render={<SectionHeaderDescription />}>{description}</DialogDescription>
        )}
      </SectionHeaderBody>

      {children}
    </SectionHeader>
  )
}

const dialogFooterVariants = variants({
  base: "flex flex-col-reverse flex-wrap gap-x-2 gap-y-4 sm:flex-row sm:justify-end",

  variants: {
    /**
     * Give the footer its own hairline and padding, for a `flush` dialog where the body
     * scrolls behind it.
     */
    bordered: {
      true: "border-t px-6 py-4",
    },
  },
})

type DialogFooterProps = ComponentProps<"div"> & VariantProps<typeof dialogFooterVariants>

function DialogFooter({ className, bordered, ...props }: DialogFooterProps) {
  return <div className={dialogFooterVariants({ bordered, className })} {...props} />
}

function DialogClose({ ...props }: ComponentProps<typeof Button>) {
  return <DialogPrimitive.Close render={<Button variant="secondary" {...props} />} />
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
