import { Button } from "~/components/button"
import { FieldRow } from "~/components/field-row"
import { FormButton } from "~/components/form-button"
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
      footer={<FormButton>Save changes</FormButton>}
    >
      <FieldRow label="Name" description="Shown publicly on your ad units.">
        <Input defaultValue="Acme Inc" />
      </FieldRow>

      <FieldRow label="Public profile" controlClassName="sm:items-end">
        <Switch defaultChecked />
      </FieldRow>
    </FormSection>
  </div>
)
