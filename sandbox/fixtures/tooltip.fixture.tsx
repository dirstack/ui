import { Button } from "~/components/button"
import { Stack } from "~/components/stack"
import { Tooltip, TooltipProvider } from "~/components/tooltip"

export default (
  <TooltipProvider>
    <Stack>
      <Tooltip tooltip="Copied to clipboard">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>

      <Tooltip tooltip="Shown on the right" side="right">
        <Button variant="soft">Right side</Button>
      </Tooltip>
    </Stack>
  </TooltipProvider>
)
