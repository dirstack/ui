import { Stack } from "~/components/stack"
import { ThemeSelect, useTheme } from "~/components/theme"

function CurrentTheme() {
  const [theme] = useTheme()

  return (
    <p className="text-muted-foreground text-sm">
      Current: <code className="text-foreground">{theme}</code> — persisted to{" "}
      <code>localStorage.theme</code>, mirrored to <code>&lt;html data-theme&gt;</code>.
    </p>
  )
}

export default {
  // Switch the whole sandbox between OS / light / dark; open a second tab to see them sync.
  select: (
    <Stack direction="column" size="md">
      <ThemeSelect />
      <CurrentTheme />
    </Stack>
  ),
}
