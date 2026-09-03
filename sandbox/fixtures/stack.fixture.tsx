import { Stack } from "~/components/stack"

const sizes = ["xs", "sm", "md", "lg"] as const

function Tile({ label }: { label: string }) {
  return (
    <div className="flex size-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
      {label}
    </div>
  )
}

export default {
  row: (
    <Stack direction="column" size="lg">
      {sizes.map(size => (
        <Stack key={size} size={size}>
          <Tile label={size} />
          <Tile label={size} />
          <Tile label={size} />
        </Stack>
      ))}
    </Stack>
  ),

  column: (
    <Stack direction="column" size="md">
      <Tile label="1" />
      <Tile label="2" />
      <Tile label="3" />
    </Stack>
  ),

  wrap: (
    <Stack size="sm" className="max-w-40">
      {Array.from({ length: 8 }, (_, i) => (
        <Tile key={i} label={`${i + 1}`} />
      ))}
    </Stack>
  ),
}
