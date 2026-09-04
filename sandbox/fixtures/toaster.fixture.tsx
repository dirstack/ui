import { toast } from "sonner"
import { Button } from "~/components/button"
import { Stack } from "~/components/stack"
import { Toaster } from "~/components/toaster"

export default (
  <>
    <Stack>
      <Button variant="secondary" onClick={() => toast("Saved your changes")}>
        Default
      </Button>
      <Button variant="secondary" onClick={() => toast.success("Workspace created")}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.info("Heads up", { description: "This is an informational toast." })}
      >
        Info
      </Button>
    </Stack>

    <Toaster />
  </>
)
