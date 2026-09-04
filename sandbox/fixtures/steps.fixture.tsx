import { Stack } from "~/components/stack"
import { Steps } from "~/components/steps"

export default (
  <Stack direction="column" size="lg">
    <Steps current={1} total={4} className="w-44" />
    <Steps current={2} total={4} className="w-44" />
    <Steps current={3} total={4} className="w-44" />
    <Steps current={4} total={4} className="w-44" />
  </Stack>
)
