import { useState } from "react"
import { ViewTabs } from "~/components/view-tabs"

const options = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
  { value: "board", label: "Board" },
]

function ViewTabsFixture() {
  const [view, setView] = useState<string | undefined>(undefined)

  return (
    <div className="space-y-3">
      <ViewTabs value={view ?? "grid"} defaultValue="grid" options={options} onChange={setView} />
      <p className="text-muted-foreground text-sm">?view={view ?? "(default)"}</p>
    </div>
  )
}

export default <ViewTabsFixture />
