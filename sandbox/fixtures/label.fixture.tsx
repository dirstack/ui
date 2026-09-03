import { Input } from "~/components/input"
import { Label } from "~/components/label"
import { Stack } from "~/components/stack"

export default {
  default: <Label htmlFor="label-demo-name">Workspace name</Label>,

  required: (
    <Label htmlFor="label-demo-email" isRequired>
      Email address
    </Label>
  ),

  withControl: (
    <Stack direction="column" size="sm" className="w-64">
      <Label htmlFor="label-demo-name" isRequired>
        Workspace name
      </Label>
      <Input id="label-demo-name" placeholder="Acme Inc." />
    </Stack>
  ),
}
