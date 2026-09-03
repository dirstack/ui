import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

/**
 * Vite config consumed only by the react-cosmos sandbox (via `cosmos.config.json`). It is
 * never part of the published library build — tsdown owns that. The React plugin enables
 * JSX/Fast Refresh and `@tailwindcss/vite` runs the real Tailwind pipeline so fixtures render
 * against the same design tokens the components ship with. The `~` alias mirrors the tsconfig
 * `paths` so fixtures can import components straight from source (`~/components/button`).
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
