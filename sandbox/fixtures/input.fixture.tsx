import { Input } from "~/components/input"
import { Stack } from "~/components/stack"

const sizes = ["sm", "md", "lg"] as const

export default {
  sizes: (
    <Stack direction="column" size="md" className="w-64">
      {sizes.map(size => (
        <Input key={size} size={size} placeholder={`Size ${size}`} />
      ))}
    </Stack>
  ),

  states: (
    <Stack direction="column" size="md" className="w-64">
      <Input placeholder="Default" />
      <Input defaultValue="With a value" />
      <Input disabled defaultValue="Disabled" />
      <Input type="number" placeholder="0" />
    </Stack>
  ),
}
