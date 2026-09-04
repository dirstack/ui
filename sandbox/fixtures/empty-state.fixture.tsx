import { Button } from "~/components/button"
import { EmptyState } from "~/components/empty-state"
import { Stack } from "~/components/stack"
import { MegaphoneIcon, PlusIcon } from "./icons"

export default {
  block: (
    <div className="w-96 rounded-xl border">
      <EmptyState
        icon={<MegaphoneIcon />}
        title="No ads yet"
        description="Create your first ad to start serving to advertisers."
        action={<Button prefix={<PlusIcon />}>New ad</Button>}
      />
    </div>
  ),

  inline: (
    <div className="w-96">
      <EmptyState variant="inline" title="No results found." />
    </div>
  ),

  dashed: (
    <Stack direction="column" size="lg" className="w-96">
      <EmptyState variant="dashed" title="No data for this range" />
    </Stack>
  ),
}
