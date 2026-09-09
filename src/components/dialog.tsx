"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { type ComponentProps, createContext, type ReactNode, use } from "react"
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

/** `hideClose` from `DialogContent`, read by `DialogHeader` so its own X follows suit. */
const DialogCloseContext = createContext(false)

/** The one X: a ghost button in the header row when there is a header, else pinned to the corner. */
function DialogX({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Close
      render={<Button variant="ghost" size="sm" aria-label="Close" prefix={<XIcon />} />}
      className={cn("pointer-coarse:size-10", className)}
    />
  )
}
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
    "fixed z-50 grid overflow-y-auto border bg-card shadow-sm",
    // Under `sm` the dialog is a bottom sheet: full width, pinned to the bottom edge,
    // padded past the home indicator.
    "max-sm:inset-x-0 max-sm:bottom-0 max-sm:max-h-[calc(100dvh-3rem)] max-sm:rounded-t-2xl max-sm:border-b-0",
    "sm:left-1/2 sm:w-[calc(100vw-2rem)] sm:-translate-x-1/2 sm:rounded-xl",
    "data-open:animate-in data-closed:animate-out",
    "data-open:fade-in-0 data-closed:fade-out-0",
    "data-open:slide-in-from-bottom-4 data-closed:slide-out-to-bottom-4",
    "max-sm:data-open:slide-in-from-bottom-8 max-sm:data-closed:slide-out-to-bottom-8",
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
      true: "sm:top-[10vh] sm:max-h-[calc(90vh-2rem)] sm:[[role=dialog]~&]:top-[15vh] sm:[[role=dialog]~&]:max-h-[calc(85vh-2rem)]",
      false: "sm:top-1/2 sm:-translate-y-1/2 sm:max-h-[calc(100vh-2rem)]",
    },

    /**
     * Drop the dialog's own padding and gap so sections can run edge to edge and draw their
     * own borders, e.g. a bordered header over a scrolling body over a bordered footer.
     */
    flush: {
      true: "gap-0 p-0 max-sm:pb-[env(safe-area-inset-bottom)]",
      false: "gap-6 p-6 max-sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
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
        <DialogCloseContext value={!!hideClose}>{children}</DialogCloseContext>

        {/* Corner fallback for a dialog without a `DialogHeader`, which hosts the X itself */}
        {!hideClose && (
          <DialogX className="absolute top-3 right-3 z-20 pointer-coarse:top-1.5 pointer-coarse:right-1.5 [[data-slot=dialog-header]~&]:hidden" />
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

const dialogHeaderVariants = variants({
  // `relative` anchors the X, which leaves the row under `sm` where the card header stacks
  base: "relative",

  variants: {
    /**
     * Give the header its own hairline and padding, for a `flush` dialog whose body scrolls
     * under it.
     */
    bordered: {
      true: "border-b px-6 py-5",
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
 * them, and the dialog's X sits at the end of the row, centred on the title line.
 */
function DialogHeader({
  title,
  description,
  bordered,
  className,
  children,
  ...props
}: DialogHeaderProps) {
  const hideClose = use(DialogCloseContext)

  return (
    <SectionHeader
      size="card"
      data-slot="dialog-header"
      className={dialogHeaderVariants({ bordered, className })}
      {...props}
    >
      <SectionHeaderBody>
        {/* A step smaller in the bottom sheet, where the title is a row label, not a page heading */}
        <DialogTitle render={<SectionHeaderTitle className="max-sm:text-base" />}>
          {title}
        </DialogTitle>

        {description && (
          <DialogDescription render={<SectionHeaderDescription />}>{description}</DialogDescription>
        )}
      </SectionHeaderBody>

      {children}

      {!hideClose && (
        // A box the height of the title line (28px, 24px in the sheet), so the X centres on the
        // title whatever sits under it; pulled out by 6px so the glyph's edge sits on the same
        // inset as the title's. Under `sm` the card header stacks into a column, so the box
        // leaves the flow and pins itself to the title line instead.
        <div
          className={cn(
            "-mr-1.5 flex h-7 shrink-0 items-center self-start max-sm:absolute max-sm:mr-0 max-sm:h-6",
            bordered ? "max-sm:top-5 max-sm:right-4.5" : "max-sm:top-0 max-sm:-right-1.5",
          )}
        >
          <DialogX />
        </div>
      )}
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
