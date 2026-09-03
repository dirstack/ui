import "./styles.css"
import type { ReactNode } from "react"

/**
 * Global decorator applied to every fixture under `sandbox/`. Loads the sandbox stylesheet
 * (Tailwind + the library tokens) once and wraps each fixture in a padded, theme-aware canvas
 * so components have breathing room and inherit the real background/foreground colors.
 */
export default function CosmosDecorator({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background p-8 font-sans text-foreground antialiased">
      {children}
    </div>
  )
}
