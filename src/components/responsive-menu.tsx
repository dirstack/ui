"use client"

import { Fragment, useState, type ReactElement, type ReactNode } from "react"
import { Button } from "~/components/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "~/components/dialog"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "~/components/menu"
import { CheckIcon } from "~/lib/icons"
import { useBelowSm } from "~/lib/media"
import { cn } from "~/lib/variants"

export type ResponsiveMenuItem = {
  label: ReactNode
  onClick: () => void
  selected?: boolean

  /** Single key hint, desktop menu only */
  shortcut?: string
  disabled?: boolean
}

export type ResponsiveMenuProps = {
  /** The trigger element, e.g. a secondary Button; rendered via Base UI `render` in both modes */
  trigger: ReactElement

  /** The trigger's label (children of the trigger) */
  children?: ReactNode

  /** Sheet title under `sm`; the desktop menu has none */
  title: ReactNode

  /** Items in groups; groups are divided by a separator (menu) or a hairline (sheet) */
  groups: ResponsiveMenuItem[][]
  align?: "start" | "center" | "end"

  /** `MenuContent` className on desktop */
  className?: string
}

/**
 * One list of choices in the two shapes each viewport wants: a dropdown menu on desktop, the
 * phone-native bottom sheet under `sm`. A dropdown of many rows with shortcut badges is a
 * desktop shape; the same presets read better on a phone as full-width rows with no shortcuts.
 * Items are data so both renderings stay in step by construction.
 */
export function ResponsiveMenu({
  trigger,
  children,
  title,
  groups,
  align,
  className,
}: ResponsiveMenuProps) {
  const [open, setOpen] = useState(false)
  const isPhone = useBelowSm()

  if (isPhone) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={trigger}>{children}</DialogTrigger>

        <DialogContent size="sm" flush>
          <DialogHeader title={title} bordered />

          <div className="min-h-0 overflow-y-auto">
            {groups.map((group, index) => (
              <div key={index} className={cn("flex flex-col p-2", index > 0 && "border-t")}>
                {group.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                    className="w-full justify-start"
                    disabled={item.disabled}
                    // The check is always rendered, invisible when unselected: it is the
                    // button's only sibling of the label, which would otherwise centre itself.
                    suffix={<CheckIcon className={cn(!item.selected && "invisible")} />}
                    onClick={() => {
                      setOpen(false)
                      item.onClick()
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    // Not modal: a dropdown on a dashboard should not lock the page's scrollbar away.
    <Menu modal={false}>
      <MenuTrigger render={trigger}>{children}</MenuTrigger>

      <MenuContent align={align} className={cn("min-w-56", className)}>
        {groups.map((group, index) => (
          <Fragment key={index}>
            {index > 0 && <MenuSeparator />}

            <MenuGroup>
              {group.map((item, itemIndex) => (
                <MenuItem key={itemIndex} disabled={item.disabled} onClick={item.onClick}>
                  {item.label}

                  {(item.selected || item.shortcut) && (
                    <span className="ml-auto flex items-center gap-2">
                      {item.selected && <CheckIcon className="size-4 shrink-0" />}
                      {item.shortcut && (
                        <MenuShortcut className="ml-0">{item.shortcut}</MenuShortcut>
                      )}
                    </span>
                  )}
                </MenuItem>
              ))}
            </MenuGroup>
          </Fragment>
        ))}
      </MenuContent>
    </Menu>
  )
}
