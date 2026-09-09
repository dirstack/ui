import { describe, expect, test } from "bun:test"
import { AnimatedNumber } from "~/components/animated-number"

/**
 * `animated={false}` is the path long lists of figures take (a ranked breakdown, a table
 * column): it must render the formatted text itself rather than mount a NumberFlow custom
 * element, which costs a shadow root and a span per digit for an animation that never runs.
 * The branch returns a string, so it can be called directly — no DOM.
 */
describe("AnimatedNumber, not animated", () => {
  test("formats the number itself instead of returning an element", () => {
    expect(AnimatedNumber({ value: 1234, animated: false })).toBe("1,234")
  })

  test("honours format, prefix and suffix", () => {
    expect(AnimatedNumber({ value: 0.87, animated: false, format: { style: "percent" } })).toBe(
      "87%",
    )
    expect(AnimatedNumber({ value: 38, animated: false, suffix: "s" })).toBe("38s")
    expect(AnimatedNumber({ value: 5, animated: false, prefix: "~" })).toBe("~5")
  })

  test("passes strings through, animated or not", () => {
    expect(AnimatedNumber({ value: "—" })).toBe("—")
    expect(AnimatedNumber({ value: "—", animated: false })).toBe("—")
  })

  test("animating still returns an element", () => {
    expect(typeof AnimatedNumber({ value: 1234 })).toBe("object")
  })
})
