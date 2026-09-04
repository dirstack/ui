import { Button } from "~/components/button"
import { DetailRow } from "~/components/detail-row"
import { FormSection } from "~/components/form-section"
import { Input } from "~/components/input"
import { Switch } from "~/components/switch"

export default (
  <div className="w-[40rem] rounded-xl border bg-card">
    <FormSection
      title="General"
      description="Basic details for this workspace."
      actions={
        <Button variant="secondary" size="sm">
          Reset
        </Button>
      }
      footer={<Button type="submit">Save changes</Button>}
    >
      <DetailRow density="form" label="Name" description="Shown publicly on your ad units.">
        <Input defaultValue="Acme Inc" />
      </DetailRow>

      <DetailRow density="form" label="Public profile" valueClassName="sm:items-end">
        <Switch defaultChecked />
      </DetailRow>
    </FormSection>
  </div>
)
