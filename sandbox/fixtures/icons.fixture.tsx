import * as icons from "~/components/icons"
import type { IconComponent } from "~/components/icons"

/**
 * Grid of every icon exported from the registry. Filters the namespace down to the icon
 * components (values whose name ends in `Icon`) so newly added icons show up automatically.
 */
const entries = Object.entries(icons).filter(
  (entry): entry is [string, IconComponent] => typeof entry[1] === "function",
)

export default (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-2">
    {entries.map(([name, Icon]) => (
      <div
        key={name}
        className="flex flex-col items-center gap-2 rounded-md border p-3 text-center"
      >
        <Icon className="size-6 text-foreground" />
        <span className="truncate text-[0.625rem] text-muted-foreground">{name}</span>
      </div>
    ))}
  </div>
)
