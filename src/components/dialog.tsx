"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Drawer } from "@base-ui/react/drawer"
import { type ComponentProps, createContext, type ReactNode, use } from "react"
import { Button } from "~/components/button"
import {
  SectionHeader,
  SectionHeaderBody,
  SectionHeaderDescription,
  SectionHeaderTitle,
} from "~/components/section-header"
import { XIcon } from "~/lib/icons"
import { useBelowSm } from "~/lib/media"
import { variants, cn, type VariantProps } from "~/lib/variants"

/**
 * Whether this dialog is the phone bottom sheet. Under `sm` the whole thing is a Base UI
 * Drawer instead of a Dialog: same parts, same markup, plus the swipe-down-to-dismiss and
 * rubber-banding a sheet is expected to have. Every part reads this to pick its own set.
 */
const SheetContext = createContext(false)

/** The drawer's parts under the dialog's names — the ones in play here are the same set. */
const DrawerParts = Drawer as unknown as typeof DialogPrimitive

function useParts() {
  return use(SheetContext) ? DrawerParts : DialogPrimitive
}

function Dialog(props: DialogPrimitive.Root.Props) {
  const sheet = useBelowSm()
  const Root = sheet ? DrawerParts.Root : DialogPrimitive.Root

  return (
    <SheetContext value={sheet}>
      <Root {...props} />
    </SheetContext>
  )
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  const { Trigger } = useParts()
  return <Trigger {...props} />
}

/** `hideClose` from `DialogContent`, read by `DialogHeader` so its own X follows suit. */
const DialogCloseContext = createContext(false)

/** The one X: a ghost button in the header row when there is a header, else pinned to the corner. */
function DialogX({ className }: { className?: string }) {
  const { Close } = useParts()

  return (
    <Close
      render={<Button variant="ghost" size="sm" aria-label="Close" prefix={<XIcon />} />}
      className={cn("pointer-coarse:size-10", className)}
    />
  )
}

function DialogTitle(props: DialogPrimitive.Title.Props) {
  const { Title } = useParts()
  return <Title {...props} />
}

function DialogDescription(props: DialogPrimitive.Description.Props) {
  const { Description } = useParts()
  return <Description {...props} />
}

/** The dashed, blurred backdrop behind the dialog. Rendered by `DialogContent`. */
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  const sheet = use(SheetContext)
  const { Backdrop } = useParts()

  return (
    <Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-dashed backdrop-blur-xs",
        sheet
          ? [
              // A transition, not a keyframe animation: the sheet stays mounted for its own
              // longer close, and a `fade-out` animation would end early and hand the backdrop
              // back at full strength for the rest of it. This also lets the backdrop thin out
              // under the finger, and leave on the curve the swipe's own momentum sets.
              "opacity-[calc(1-var(--drawer-swipe-progress,0))]",
              "transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0",
              "data-starting-style:opacity-0 data-ending-style:opacity-0",
              "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            ]
          : [
              "data-open:animate-in data-closed:animate-out data-open:fade-in-0 data-closed:fade-out-0",
            ],
        className,
      )}
      {...props}
    />
  )
}

const dialogContentVariants = variants({
  // Only ever rendered from `sm` up: under it the dialog is a drawer instead (`sheetPopup`).
  base: [
    "fixed left-1/2 z-50 grid w-[calc(100vw-2rem)] -translate-x-1/2 overflow-y-auto rounded-xl border bg-card shadow-sm",
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
      false: "top-1/2 max-h-[calc(100vh-2rem)] -translate-y-1/2",
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

/**
 * The sheet itself: full width against the bottom edge, following the finger down and then
 * either springing back or riding the swipe's own momentum out. `touch-none` hands vertical
 * drags to the drawer; the body inside takes them back with `touch-auto` and only gives them
 * up once it is scrolled to the top, so a swipe on a scrolled list scrolls it.
 */
const sheetPopup = [
  "flex max-h-[calc(100dvh-3rem)] w-full touch-none flex-col overflow-hidden rounded-t-2xl border border-b-0 bg-card shadow-sm outline-none",
  "[transform:translateY(var(--drawer-swipe-movement-y))]",
  "transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
  "data-swiping:select-none data-swiping:duration-0",
  "data-starting-style:[transform:translateY(100%)] data-ending-style:[transform:translateY(100%)]",
  "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
]

const sheetContentVariants = variants({
  // `relative` anchors the corner X, as `fixed` does on the dialog's own popup
  base: "relative grid min-h-0 flex-1 touch-auto overflow-y-auto overscroll-contain",

  variants: {
    /** As on the dialog, plus room past the home indicator; the grabber covers the top edge */
    flush: {
      true: "gap-0 p-0 pb-[env(safe-area-inset-bottom)]",
      false: "gap-6 p-6 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
    },
  },

  defaultVariants: {
    flush: false,
  },
})

function DialogContent({
  className,
  children,
  size,
  fixed,
  flush,
  hideClose,
  ...props
}: DialogContentProps) {
  const sheet = use(SheetContext)

  const body = (
    <>
      <DialogCloseContext value={!!hideClose}>{children}</DialogCloseContext>

      {/* Corner fallback for a dialog without a `DialogHeader`, which hosts the X itself */}
      {!hideClose && (
        <DialogX className="absolute top-3 right-3 z-20 pointer-coarse:top-1.5 pointer-coarse:right-1.5 [[data-slot=dialog-header]~&]:hidden" />
      )}
    </>
  )

  // A sheet spans the phone's width, so `size` has nothing to constrain and is dropped
  if (sheet) {
    return (
      <Drawer.Portal>
        <DialogOverlay />

        <Drawer.Viewport className="fixed inset-0 z-50 flex items-end">
          <Drawer.Popup
            className={cn(sheetPopup)}
            {...(props as ComponentProps<typeof Drawer.Popup>)}
          >
            {/* The grabber: says the sheet pulls down, and is the one part always in reach */}
            <div className="mx-auto my-2.5 h-1 w-9 shrink-0 rounded-full bg-border" />

            <Drawer.Content className={sheetContentVariants({ flush, className })}>
              {body}
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    )
  }

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />

      <DialogPrimitive.Popup
        className={dialogContentVariants({ size, fixed, flush, className })}
        {...props}
      >
        {body}
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
  const { Close } = useParts()
  return <Close render={<Button variant="secondary" {...props} />} />
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
