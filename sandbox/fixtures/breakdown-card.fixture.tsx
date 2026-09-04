import { BreakdownCard } from "~/components/breakdown-card"
import { Button } from "~/components/button"

export default {
  basic: (
    <BreakdownCard
      className="w-96"
      title="Traffic sources"
      description="Where your impressions came from this month."
      actions={
        <Button size="sm" variant="secondary">
          Export
        </Button>
      }
    >
      <p className="text-muted-foreground text-sm">A breakdown list or bar chart sits here.</p>
    </BreakdownCard>
  ),

  flush: (
    <BreakdownCard className="w-96" flush title="Recent ads" description="Latest five placements.">
      <div className="divide-y">
        <div className="px-4 py-3 text-sm">Acme Pro</div>
        <div className="px-4 py-3 text-sm">Globex Cloud</div>
        <div className="px-4 py-3 text-sm">Initech Suite</div>
      </div>
    </BreakdownCard>
  ),
}
