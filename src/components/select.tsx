"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from "~/components/icons"
import { inputVariants } from "~/components/input"
import { popoverAnimationClasses } from "~/lib/classes"
import { variants, cn, type VariantProps } from "~/lib/variants"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

function SelectTrigger({
  children,
  className,
  hover = true,
  focus = true,
  size,
  ...props
}: SelectPrimitive.Trigger.Props & VariantProps<typeof inputVariants>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        inputVariants({ hover, focus, size }),
        "flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>

      <SelectPrimitive.Icon
        render={<ChevronsUpDownIcon className="ml-1 size-4 shrink-0 opacity-50" />}
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectScrollUpButton({ className, ...props }: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className={cn("flex cursor-pointer items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({ className, ...props }: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className={cn("flex cursor-pointer items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

const selectScrollButtonVariants = variants({
  base: "absolute inset-x-0 z-10 bg-background animate-in fade-in-0 duration-300",
  variants: {
    position: {
      top: "top-0 mask-b-from-0",
      bottom: "bottom-0 mask-t-from-0",
    },
  },
})

function SelectContent({
  className,
  children,
  align,
  side,
  sideOffset = 4,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        side={side}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          className={cn(
            "relative z-50 isolate max-h-(--available-height) min-w-(--anchor-width) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md backdrop-blur-xs",
            !alignItemWithTrigger && popoverAnimationClasses,
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton className={selectScrollButtonVariants({ position: "top" })} />
          <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
          <SelectScrollDownButton className={selectScrollButtonVariants({ position: "bottom" })} />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn("px-2 py-1.5 text-sm font-medium", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, label, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      label={label ?? (typeof children === "string" ? children : undefined)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm text-secondary-foreground outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
