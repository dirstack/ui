import { Button } from "~/components/button"
import { FieldRow } from "~/components/field-row"
import { Input } from "~/components/input"
import { Switch } from "~/components/switch"

export default (
  <div className="w-[36rem] divide-y">
    <FieldRow label="Workspace name" description="Shown publicly on your ad units.">
      <Input defaultValue="Acme Inc" />
    </FieldRow>

    <FieldRow
      label="Public profile"
      description="List this workspace in the directory."
      controlClassName="sm:items-end"
    >
      <Switch defaultChecked />
    </FieldRow>

    <FieldRow
      label="Delete workspace"
      description="This cannot be undone."
      controlClassName="sm:items-end"
    >
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    </FieldRow>
  </div>
)
