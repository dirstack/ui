import { Label } from "~/components/label"
import { Stack } from "~/components/stack"
import { Switch } from "~/components/switch"

export default {
  states: (
    <Stack direction="column" size="md">
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
      <Switch disabled defaultChecked />
    </Stack>
  ),

  withLabel: (
    <Stack size="sm">
      <Switch id="switch-demo" defaultChecked />
      <Label htmlFor="switch-demo">Enable notifications</Label>
    </Stack>
  ),
}
