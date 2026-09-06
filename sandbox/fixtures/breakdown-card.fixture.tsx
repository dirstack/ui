import { BarList } from "~/components/bar-list"
import { BreakdownCard } from "~/components/breakdown-card"
import { Button } from "~/components/button"
import { Tabs, TabsList, TabsTrigger } from "~/components/tabs"

const pages = [
  { label: "/", value: 12_840 },
  { label: "/pricing", value: 6_120 },
  { label: "/blog", value: 3_480 },
  { label: "/docs", value: 2_210 },
  { label: "/changelog", value: 940 },
]

const max = Math.max(...pages.map(row => row.value))

const list = (
  <BarList>
    {pages.map(row => (
      <BarList.Row key={row.label} label={row.label} value={row.value} max={max} />
    ))}
  </BarList>
)

const footer = (
  <a href="https://example.com" className="text-muted-foreground hover:text-foreground">
    Details
  </a>
)

export default {
  // Title, description and an action, over a padded body.
  header: (
    <BreakdownCard
      className="w-96"
      title="Top pages"
      description="Last 7 days"
      actions={
        <Button size="sm" variant="secondary">
          Export
        </Button>
      }
    >
      <p className="text-muted-foreground text-sm">Body content sits in the flex body panel.</p>
    </BreakdownCard>
  ),

  // A view switcher pinned above a BarList body.
  tabs: (
    <BreakdownCard
      className="w-96"
      title="Pages"
      tabs={
        <Tabs defaultValue="top">
          <TabsList variant="plain">
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="entry">Entry</TabsTrigger>
            <TabsTrigger value="exit">Exit</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      {list}
    </BreakdownCard>
  ),

  // A compact hairline-topped footer strip.
  footer: (
    <BreakdownCard className="w-96" title="Referrers" footer={footer}>
      {list}
    </BreakdownCard>
  ),

  // A flush body drawing its own edges.
  flush: (
    <BreakdownCard className="w-96" title="Events" flush footer={footer}>
      <div className="divide-y text-sm">
        {pages.map(row => (
          <div key={row.label} className="flex justify-between px-4 py-2.5">
            <span>{row.label}</span>
            <span className="text-muted-foreground tabular-nums">{row.value}</span>
          </div>
        ))}
      </div>
    </BreakdownCard>
  ),
}
