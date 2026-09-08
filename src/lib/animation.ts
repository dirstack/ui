import { useSyncExternalStore } from "react"

/**
 * Shared timing so number spins and chart draws feel like one coordinated motion.
 * `ANIMATION_EASING` mirrors the `--ease-out-expo` CSS token — JS cannot read a Tailwind theme
 * token, so the curve is duplicated here on purpose; change one and change the other. It stays
 * space-free so it satisfies recharts' `cubic-bezier(n,n,n,n)` template type (NumberFlow takes
 * any CSS easing).
 */
export const ANIMATION_DURATION = 500
export const ANIMATION_EASING = "cubic-bezier(0.16,1,0.3,1)" as const

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const query = matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/**
 * Whether the user asked the OS for less motion. CSS animations honour the media query on
 * their own; this is for the JS-driven ones (recharts' draws). False on the server and
 * through hydration, so the first client render matches the markup.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
}
