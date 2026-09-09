import { AnimatedNumber } from "~/components/animated-number"
import { Stack } from "~/components/stack"

export default {
  number: (
    <Stack size="lg" className="font-display font-semibold text-2xl tabular-nums">
      <AnimatedNumber value={1234} />
      <AnimatedNumber value={42} format={{ style: "currency", currency: "USD" }} />
      <AnimatedNumber value={0.87} format={{ style: "percent" }} />
    </Stack>
  ),

  // `animated={false}` renders formatted text and mounts no custom element, for long lists
  // of figures that should swap at once rather than spin.
  static: (
    <Stack size="lg" className="font-display font-semibold text-2xl tabular-nums">
      <AnimatedNumber value={1234} animated={false} />
      <AnimatedNumber value={42} format={{ style: "currency", currency: "USD" }} animated={false} />
      <AnimatedNumber value={0.87} format={{ style: "percent" }} animated={false} />
    </Stack>
  ),

  // A string value (an empty-value dash) renders as-is, without animation.
  stringPassthrough: (
    <p className="font-display font-semibold text-2xl tabular-nums">
      <AnimatedNumber value="—" />
    </p>
  ),
}
