import { Button } from "~/components/button"
import { Stack } from "~/components/stack"
import { ArrowRightIcon, PlusIcon } from "./icons"

const variants = ["primary", "secondary", "soft", "ghost", "destructive"] as const
const sizes = ["sm", "md", "lg"] as const

export default {
  variants: (
    <Stack direction="column" size="lg">
      {variants.map(variant => (
        <Stack key={variant}>
          {sizes.map(size => (
            <Button key={size} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
        </Stack>
      ))}
    </Stack>
  ),

  affixes: (
    <Stack>
      <Button prefix={<PlusIcon />}>New item</Button>
      <Button variant="secondary" suffix={<ArrowRightIcon />}>
        Continue
      </Button>
    </Stack>
  ),

  states: (
    <Stack>
      <Button disabled>Disabled</Button>
      <Button isPending>Loading</Button>
      <Button variant="secondary" isPending prefix={<PlusIcon />}>
        Saving
      </Button>
    </Stack>
  ),
}
