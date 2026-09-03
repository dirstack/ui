import { Button } from "~/components/button"
import { Input } from "~/components/input"
import { Label } from "~/components/label"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/popover"
import { Stack } from "~/components/stack"

export default (
  <Popover>
    <PopoverTrigger render={<Button variant="secondary">Open popover</Button>} />

    <PopoverContent>
      <Stack direction="column" size="md" className="w-full">
        <div>
          <p className="font-medium text-sm">Dimensions</p>
          <p className="text-muted-foreground text-sm">Set the layout dimensions.</p>
        </div>

        <Stack direction="column" size="sm" className="w-full">
          <Label htmlFor="popover-width">Width</Label>
          <Input id="popover-width" defaultValue="100%" />
        </Stack>
      </Stack>
    </PopoverContent>
  </Popover>
)
