import { Ping } from "~/components/ping"
import { Stack } from "~/components/stack"

const tones = ["success", "warning", "danger", "neutral"] as const

export default {
  tones: (
    <Stack size="lg">
      {tones.map(tone => (
        <Ping key={tone} tone={tone} />
      ))}
    </Stack>
  ),

  static: (
    <Stack size="lg">
      {tones.map(tone => (
        <Ping key={tone} tone={tone} animate={false} />
      ))}
    </Stack>
  ),

  sizes: (
    <Stack size="lg">
      <Ping tone="success" className="size-1.5" />
      <Ping tone="success" />
      <Ping tone="success" className="size-3" />
    </Stack>
  ),

  inline: (
    <Stack>
      <Ping tone="success" />
      <span className="text-sm">3 online</span>
    </Stack>
  ),
}
