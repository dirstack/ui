/**
 * Shared timing so number spins and chart draws feel like one coordinated motion.
 * `ANIMATION_EASING` mirrors the `--ease-out-expo` CSS token — JS cannot read a Tailwind theme
 * token, so the curve is duplicated here on purpose; change one and change the other. It stays
 * space-free so it satisfies recharts' `cubic-bezier(n,n,n,n)` template type (NumberFlow takes
 * any CSS easing).
 */
export const ANIMATION_DURATION = 500
export const ANIMATION_EASING = "cubic-bezier(0.16,1,0.3,1)" as const
