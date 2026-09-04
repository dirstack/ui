import { Callout, CalloutText } from "~/components/callout"
import { Stack } from "~/components/stack"
import { InfoIcon } from "./icons"

const variants = ["default", "warning", "success", "danger"] as const

export default {
  variants: (
    <Stack direction="column" size="md" className="w-96">
      {variants.map(variant => (
        <Callout key={variant} variant={variant} prefix={<InfoIcon />}>
          <CalloutText>This is a {variant} callout with a leading icon.</CalloutText>
        </Callout>
      ))}
    </Stack>
  ),

  plain: (
    <Callout className="w-96">
      <CalloutText>A plain callout with no prefix icon.</CalloutText>
    </Callout>
  ),
}
