import { Kbd } from "~/components/kbd"
import { Stack } from "~/components/stack"

export default {
  variants: (
    <Stack>
      <Kbd variant="secondary">K</Kbd>
      <Kbd variant="soft">K</Kbd>
    </Stack>
  ),

  modifiers: (
    <Stack>
      <Kbd meta>K</Kbd>
      <Kbd shift meta>
        P
      </Kbd>
      <Kbd ctrl alt>
        Del
      </Kbd>
      <Kbd>Esc</Kbd>
    </Stack>
  ),
}
