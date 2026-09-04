import { EntityAvatar } from "~/components/entity-avatar"
import { Stack } from "~/components/stack"

const sizes = ["sm", "md", "lg"] as const

export default {
  withImage: (
    <Stack size="lg">
      {sizes.map(size => (
        <EntityAvatar
          key={size}
          size={size}
          name="Acme Inc"
          src="https://www.google.com/s2/favicons?domain=stripe.com&sz=64"
        />
      ))}
    </Stack>
  ),

  fallback: (
    <Stack size="lg">
      {sizes.map(size => (
        <EntityAvatar key={size} size={size} name="Acme Inc" />
      ))}
    </Stack>
  ),
}
