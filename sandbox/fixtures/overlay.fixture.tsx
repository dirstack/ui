import { Overlay } from "~/components/overlay"

/**
 * `Overlay` is the dashed, blurred backdrop behind Dialog. Rendered inside a relative frame
 * (rather than fixed to the viewport) so the dashed pattern is visible in the fixture.
 */
export default (
  <div className="relative h-64 w-full overflow-hidden rounded-lg border">
    <div className="p-6">
      <p className="font-medium">Content behind the backdrop</p>
      <p className="text-muted-foreground text-sm">The overlay sits on top of this.</p>
    </div>
    <Overlay className="absolute!" />
  </div>
)
