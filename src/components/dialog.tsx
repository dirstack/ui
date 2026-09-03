"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import type { ComponentProps } from "react"
import { Button } from "~/components/button"
import { XIcon } from "~/components/icons"
import { Modal } from "~/components/modal"
import { Overlay } from "~/components/overlay"
import { variants, type VariantProps } from "~/lib/variants"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

function DialogOverlay({ ...props }: ComponentProps<typeof Overlay>) {
  return <DialogPrimitive.Backdrop render={<Overlay {...props} />} />
}

const dialogContentVariants = variants({
  base: [
    "grid border bg-card shadow-sm rounded-xl",
    "data-open:animate-in data-closed:animate-out",
    "data-open:fade-in-0 data-closed:fade-out-0",
    "data-open:slide-in-from-bottom-4 data-closed:slide-out-to-bottom-4",
  ],

  variants: {
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
    flush: false,
  },
})

type DialogContentProps = DialogPrimitive.Popup.Props &
  ComponentProps<typeof Modal> &
  VariantProps<typeof dialogContentVariants>

function DialogContent({
  className,
  children,
  size = "md",
  fixed,
  flush,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Popup
        initialFocus={false}
        render={<Modal size={size} fixed={fixed} />}
        className={dialogContentVariants({ flush, className })}
        {...props}
      >
        {children}

        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-xs opacity-70 ring-offset-background hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <XIcon className="size-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPortal>
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
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
