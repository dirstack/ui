import { useState } from "react"
import { Button } from "~/components/button"
import { ResponsiveMenu, type ResponsiveMenuItem } from "~/components/responsive-menu"
import { Stack } from "~/components/stack"
import { ArrowRightIcon, CalendarIcon } from "./icons"

const presets = [
  [
    { label: "Today", shortcut: "D" },
    { label: "Yesterday", shortcut: "E" },
  ],
  [
    { label: "Last 7 days", shortcut: "W" },
    { label: "Last 30 days", shortcut: "T" },
    { label: "Last 90 days", shortcut: "N" },
  ],
  [
    { label: "All time", shortcut: "A" },
    { label: "Custom range…", shortcut: "C", disabled: true },
  ],
]

// Narrow the viewport under 40rem to get the bottom sheet instead of the dropdown.
function Demo() {
  const [value, setValue] = useState("Last 7 days")

  const groups: ResponsiveMenuItem[][] = presets.map(group =>
    group.map(preset => ({
      label: preset.label,
      shortcut: preset.shortcut,
      disabled: preset.disabled,
      selected: preset.label === value,
      onClick: () => setValue(preset.label),
    })),
  )

  return (
    <Stack direction="column" size="md">
      <ResponsiveMenu
        title="Date range"
        align="start"
        groups={groups}
        trigger={
          <Button variant="secondary" prefix={<CalendarIcon />} suffix={<ArrowRightIcon />} />
        }
      >
        {value}
      </ResponsiveMenu>

      <p className="text-muted-foreground text-sm">
        Selected: <code className="text-foreground">{value}</code>
      </p>
    </Stack>
  )
}

export default <Demo />
