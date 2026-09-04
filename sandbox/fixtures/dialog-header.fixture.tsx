import { Button } from "~/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "~/components/dialog"
import { DialogHeader } from "~/components/dialog-header"

export default {
  standard: (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogContent>
        <DialogHeader
          title="Delete workspace"
          description="This permanently removes the workspace and all of its data."
        />
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  bordered: (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Open flush dialog</Button>} />
      <DialogContent flush>
        <DialogHeader
          bordered
          title="Edit advertiser"
          description="Update the advertiser's details."
        />
        <div className="p-6 text-muted-foreground text-sm">Scrolling body content.</div>
        <DialogFooter bordered>
          <DialogClose>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
