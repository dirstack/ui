import { Button } from "~/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/dialog"

export default {
  standard: (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />

      <DialogContent>
        <DialogTitle className="font-medium text-lg">Delete workspace</DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          This permanently removes the workspace and all of its data. This action cannot be undone.
        </DialogDescription>

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  header: (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />

      <DialogContent>
        <DialogHeader
          title="Delete workspace"
          description="This permanently removes the workspace and all of its data."
        />

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  flush: (
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

  hideClose: (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Open without close</Button>} />

      <DialogContent hideClose size="sm">
        <DialogHeader
          title="Finishing setup"
          description="This dialog can only be dismissed through its own actions."
        />

        <DialogFooter>
          <DialogClose>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  centered: (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Open centered dialog</Button>} />

      <DialogContent fixed={false} size="lg">
        <DialogHeader title="Centered" description="Vertically centered instead of pinned." />
      </DialogContent>
    </Dialog>
  ),
}
