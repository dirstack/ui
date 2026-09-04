import { CopyButton } from "~/components/copy-button"
import { Stack } from "~/components/stack"

export default {
  labelled: (
    <Stack>
      <CopyButton value="rvnl_sk_live_123" label="Copy" variant="secondary" />
      <CopyButton value="https://revinel.com/embed" label="Copy link" variant="soft" />
    </Stack>
  ),

  iconOnly: <CopyButton value="ws_acme_seed" variant="ghost" />,
}
