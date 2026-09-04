import { Button } from "~/components/button"
import { DetailRow } from "~/components/detail-row"
import { Switch } from "~/components/switch"

export default {
  comfortable: (
    <dl className="w-96 divide-y">
      <DetailRow label="Status">Active</DetailRow>
      <DetailRow label="Plan" description="Billed monthly">
        Pro
      </DetailRow>
      <DetailRow label="Seats">12 of 20</DetailRow>
    </dl>
  ),

  form: (
    <div className="w-[32rem] divide-y">
      <DetailRow
        density="form"
        label="Public profile"
        description="Show this workspace on your ad units."
      >
        <Switch defaultChecked />
      </DetailRow>
      <DetailRow density="form" label="Danger zone" description="Delete this workspace for good.">
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DetailRow>
    </div>
  ),

  compact: (
    <dl className="w-72 divide-y">
      <DetailRow density="compact" label="Impressions">
        12,402
      </DetailRow>
      <DetailRow density="compact" label="Clicks">
        318
      </DetailRow>
      <DetailRow density="compact" label="CTR">
        2.56%
      </DetailRow>
    </dl>
  ),
}
