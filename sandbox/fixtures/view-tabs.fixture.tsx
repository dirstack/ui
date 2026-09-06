import { useState } from "react"
import { Stack } from "~/components/stack"
import { ViewTabs } from "~/components/view-tabs"

type View = "all" | "active" | "archived"

const options: { value: View; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
]

function Demo({ variant }: { variant?: "segmented" | "plain" }) {
  // Mirrors a `?view=` search param: `undefined` on the default view.
  const [view, setView] = useState<View | undefined>()

  return (
    <Stack direction="column" size="md">
      <ViewTabs
        value={view ?? "all"}
        defaultValue="all"
        options={options}
        onChange={setView}
        variant={variant}
      />

      <p className="text-muted-foreground text-sm">
        Emitted: <code className="text-foreground">{view === undefined ? "undefined" : view}</code>
      </p>
    </Stack>
  )
}

export default {
  // Segmented control for a page header; the default tab emits `undefined`.
  segmented: <Demo />,

  // Plain pills for an in-card switcher.
  plain: <Demo variant="plain" />,
}
