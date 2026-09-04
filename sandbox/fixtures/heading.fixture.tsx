import { Heading } from "~/components/heading"
import { Stack } from "~/components/stack"

const sizes = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

export default (
  <Stack direction="column" size="lg">
    {sizes.map(size => (
      <Heading key={size} size={size}>
        The quick brown fox ({size})
      </Heading>
    ))}
  </Stack>
)
