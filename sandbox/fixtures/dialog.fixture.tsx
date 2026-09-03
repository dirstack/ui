import { Button } from "~/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/dialog"

export default (
  <Dialog>
    <DialogTrigger render={<Button>Open dialog</Button>} />

    <DialogContent>
      <DialogTitle className="font-medium text-lg">Delete workspace</DialogTitle>
      <DialogDescription className="text-muted-foreground text-sm">
        This permanently removes the workspace and all of its data. This action cannot be undone.
      </DialogDescription>

      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
