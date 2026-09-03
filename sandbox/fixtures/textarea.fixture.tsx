import { Stack } from "~/components/stack"
import { Textarea } from "~/components/textarea"

export default {
  default: (
    <Stack direction="column" size="md" className="w-72">
      <Textarea placeholder="Write a short description..." rows={3} />
      <Textarea defaultValue={"Line one\nLine two\nLine three"} />
      <Textarea disabled defaultValue="Disabled textarea" />
    </Stack>
  ),
}
