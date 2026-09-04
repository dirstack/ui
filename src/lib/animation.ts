/**
 * Shared timing so number spins and chart draws feel like one coordinated motion. The easing
 * matches the library's slide/fade curve; it stays space-free so it satisfies recharts'
 * `cubic-bezier(n,n,n,n)` template type (NumberFlow takes any CSS easing).
 */
export const ANIMATION_DURATION = 500
export const ANIMATION_EASING = "cubic-bezier(0.16,1,0.3,1)" as const
