import { useSyncExternalStore } from "react"

/**
 * Below Tailwind's `sm` (40rem), i.e. the phone layout. Kept as a constant so this JS-driven
 * switch flips on exactly the same pixel as the `max-sm:` classes components style with.
 */
const BELOW_SM = "(max-width: 39.9375rem)"

function subscribe(onChange: () => void) {
  const query = matchMedia(BELOW_SM)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/**
 * Whether the viewport is under `sm`. False on the server and through hydration, so the first
 * client render matches the markup; a component that swaps on it remounts when the breakpoint
 * is crossed, which only ever happens on a resize.
 */
export function useBelowSm() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(BELOW_SM).matches,
    () => false,
  )
}
