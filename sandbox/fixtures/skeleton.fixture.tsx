import { Skeleton } from "~/components/skeleton"
import { Stack } from "~/components/stack"

export default {
  shapes: (
    <Stack size="md">
      <Skeleton className="size-10 rounded-full" />
      <Stack direction="column" size="sm">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-24" />
      </Stack>
    </Stack>
  ),

  card: (
    <div className="w-64 rounded-lg border p-4">
      <Stack direction="column" size="md" className="w-full">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </Stack>
    </div>
  ),
}
