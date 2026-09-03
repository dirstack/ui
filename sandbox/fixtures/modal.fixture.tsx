import { Modal } from "~/components/modal"

/**
 * `Modal` is the centered/positioned container Dialog renders into. Shown here on a plain
 * canvas (no portal/backdrop) so its sizing and card styling are visible in isolation.
 */
export default {
  centered: (
    <Modal fixed={false} size="sm" className="relative! left-0! translate-x-0! translate-y-0!">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="font-medium">Centered modal</p>
        <p className="text-muted-foreground text-sm">Size sm, vertically centered.</p>
      </div>
    </Modal>
  ),

  fixed: (
    <Modal size="lg" className="relative! left-0! top-0! translate-x-0!">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="font-medium">Fixed modal</p>
        <p className="text-muted-foreground text-sm">Size lg, pinned near the top.</p>
      </div>
    </Modal>
  ),
}
